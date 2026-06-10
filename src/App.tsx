import { useState, useCallback, useEffect } from "react"
import SplashScreen from "./components/SplashScreen"
import MainTabs from "./components/MainTabs"
import HomeScreen from "./components/HomeScreen"
import type { TabKey } from "./ui/registry"
import { AESTHETIC } from "./ui/tokens"
import FlagsScreen from "./components/FlagsScreen"
import QuizScreen from "./components/QuizScreen"
import ReverseQuizScreen from "./components/ReverseQuizScreen"
import CapitalQuizScreen from "./components/CapitalQuizScreen"
import ChallengeScreen from "./components/ChallengeScreen"
import ResultScreen from "./components/ResultScreen"
import AchievementsScreen from "./components/AchievementsScreen"
import ProfileScreen from "./components/ProfileScreen"
import FlashcardsScreen from "./components/FlashcardsScreen"
import LanguageQuizScreen from "./components/LanguageQuizScreen"
import CodexScreen from "./components/CodexScreen"
import GeoQuizScreen from "./components/GeoQuizScreen"
import GauntletScreen from "./components/GauntletScreen"
import SettingsScreen from "./components/SettingsScreen"
import TierListScreen from "./components/TierListScreen"
import OddOneOutScreen from "./components/OddOneOutScreen"
import TheCropScreen from "./components/TheCropScreen"
import FlagDNAScreen from "./components/FlagDNAScreen"
import BuildFlagScreen from "./components/BuildFlagScreen"
import ThePeelScreen from "./components/ThePeelScreen"
import ConfusablesScreen from "./components/ConfusablesScreen"
import TheComposerScreen from "./components/TheComposerScreen"
import SilhouetteScreen from "./components/SilhouetteScreen"
import FlagFamiliesScreen from "./components/FlagFamiliesScreen"
import FunFactScreen from "./components/FunFactScreen"
import ProgressMapScreen from "./components/ProgressMapScreen"
import HistoricalFlagScreen from "./components/HistoricalFlagScreen"
import type { HistoricalRegion } from "./data/historicalFlags"
import IdentityFlagScreen from "./components/IdentityFlagScreen"
import ProvinceRouletteScreen from "./components/ProvinceRouletteScreen"
import SubdivisionStumperScreen from "./components/SubdivisionStumperScreen"
import LineageScreen from "./components/LineageScreen"
import SubdivisionStatsScreen from "./components/SubdivisionStatsScreen"
import MegaCodexScreen from "./components/MegaCodexScreen"
import FlagleScreen from "./components/FlagleScreen"
import HigherLowerScreen from "./components/HigherLowerScreen"
import DeadOrAliveScreen from "./components/DeadOrAliveScreen"
import FrankenflagScreen from "./components/FrankenflagScreen"
import DescribeItScreen from "./components/DescribeItScreen"
import FlagBracketScreen from "./components/FlagBracketScreen"
import RealOrBotScreen from "./components/RealOrBotScreen"
import FlagTimelineScreen from "./components/FlagTimelineScreen"
import BorderMapScreen from "./components/BorderMapScreen"
import BorderChainScreen from "./components/BorderChainScreen"
import FlagGachaScreen from "./components/FlagGachaScreen"
import SymbolHuntScreen from "./components/SymbolHuntScreen"
import TwoTruthsScreen from "./components/TwoTruthsScreen"
import StarField from "./components/StarField"
import MapBackdrop from "./components/MapBackdrop"
import EarthLogo from "./components/EarthLogo"
import { FLAGS } from "./data/flags"
import type { FlagRecord } from "./data/flags"
import { loadState, saveState, markFlagLearned, markSubLearned, recordDailyResult, awardCrown, saveShareResult } from "./utils/storage"
import type { AppState, ShareResult } from "./utils/storage"
import { buildDailyQuiz, buildSetQuiz } from "./utils/quiz"
import type { Question } from "./utils/quiz"
import { todayString } from "./utils/prng"
import { loadTheme } from "./components/SettingsScreen"

type Screen = "splash" | "home" | "flags" | "quiz" | "reversequiz" | "result" | "achievements" | "profile" | "flashcards" | "language" | "capitalquiz" | "challenge" | "codex" | "geo" | "gauntlet" | "tierlist" | "settings" | "oddoneout" | "thecrop" | "flagdna" | "buildflag" | "thepeel" | "lookalikes" | "composer" | "silhouette" | "flagfamilies" | "funfact" | "progressmap" | "historical" | "identity" | "provinceroulette" | "substumper" | "lineage" | "substats" | "megacodex" | "flagle" | "higherlower" | "deadoralive" | "frankenflag" | "describeit" | "flagbracket" | "realorbot" | "timeline" | "bordermap" | "borderchain" | "gacha" | "symbolhunt" | "twotruths"

interface ActiveQuiz {
  questions: Question[]
  title: string
  isDaily: boolean
  setId: string
  setFlags: FlagRecord[]
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash")
  const [appState, setAppState] = useState<AppState>(() => loadState())
  const [activeQuiz, setActiveQuiz] = useState<ActiveQuiz | null>(null)
  const [lastResult, setLastResult] = useState<{ score: number; total: number; answers: ("correct" | "wrong")[] } | null>(null)
  const [histRegion, setHistRegion] = useState<HistoricalRegion | undefined>(undefined)
  const [tab, setTab] = useState<TabKey>("today")

  useEffect(() => { saveState(appState) }, [appState])

  const startDaily = useCallback(() => {
    const questions = buildDailyQuiz(todayString(), 10)
    setActiveQuiz({ questions, title: "Daily Game", isDaily: true, setId: "daily", setFlags: FLAGS })
    setScreen("quiz")
  }, [])

  const startSet = useCallback((setId: string, flags: FlagRecord[]) => {
    const seed = `${setId}-${Date.now()}`
    const questions = buildSetQuiz(flags, seed, flags.length)
    const label = setId.charAt(0).toUpperCase() + setId.slice(1).replace(/-/g, " ")
    setActiveQuiz({ questions, title: label, isDaily: false, setId, setFlags: flags })
    setScreen("quiz")
  }, [])

  const startQuickPlay = useCallback(() => {
    const seed = Date.now().toString()
    const questions = buildSetQuiz(FLAGS, seed, 10)
    setActiveQuiz({ questions, title: "Quick Play", isDaily: false, setId: "quickplay", setFlags: FLAGS })
    setScreen("quiz")
  }, [])

  const startReverseQuiz = useCallback(() => {
    const seed = Date.now().toString()
    const questions = buildSetQuiz(FLAGS, seed, 10)
    setActiveQuiz({ questions, title: "Flag ID Challenge", isDaily: false, setId: "reversequiz", setFlags: FLAGS })
    setScreen("reversequiz")
  }, [])

  const handleQuizFinish = useCallback((answers: ("correct" | "wrong")[]) => {
    if (!activeQuiz) return
    const score = answers.filter(a => a === "correct").length
    const total = answers.length
    let newState = { ...appState }
    activeQuiz.questions.forEach((q, i) => {
      if (answers[i] === "correct") newState = markFlagLearned(newState, q.target.code)
    })
    if (activeQuiz.isDaily) {
      newState = recordDailyResult(newState, { score, total, date: todayString(), answers })
    }
    const allLearned = activeQuiz.setFlags.every(f => newState.learnedFlags.includes(f.code))
    if (allLearned && !activeQuiz.isDaily) newState = awardCrown(newState, activeQuiz.setId)
    setAppState(newState)
    setLastResult({ score, total, answers })
    setScreen("result")
  }, [activeQuiz, appState])

  const handleSubLearned = useCallback((code: string) => {
    setAppState(s => markSubLearned(s, code))
  }, [])

  const handleRetry = useCallback(() => {
    if (!activeQuiz) return
    if (activeQuiz.setId === "quickplay") { startQuickPlay(); return }
    if (activeQuiz.setId === "reversequiz") { startReverseQuiz(); return }
    startSet(activeQuiz.setId, activeQuiz.setFlags)
  }, [activeQuiz, startQuickPlay, startReverseQuiz, startSet])

  useEffect(() => {
    document.body.classList.toggle("aesthetic-carto", AESTHETIC === "cartographer")
    const t = loadTheme()
    const r = document.documentElement.style
    r.setProperty('--bg-from', t.bgFrom)
    r.setProperty('--bg-to', t.bgTo)
    r.setProperty('--card-bg', t.cardBg)
    r.setProperty('--accent', t.accent)
    r.setProperty('--accent-light', t.accentLight)
    r.setProperty('--text-muted', t.muted)
  }, [])

  return (
    <div style={{ background: 'linear-gradient(135deg,var(--bg-from) 0%,var(--bg-to) 100%)', minHeight: "100vh" }}>
      {screen !== "splash" && <MapBackdrop />}
      {screen !== "splash" && <StarField />}

      {/* Persistent home logo — fixed top-left on every screen except splash/home.
          Tapping it always jumps back to the home page. */}
      {screen !== "splash" && screen !== "home" && screen !== "megacodex" && (
        <button
          onClick={() => setScreen("home")}
          aria-label="Home"
          title="Home"
          style={{
            position: "fixed", top: 10, right: 12, zIndex: 50,
            display: "flex", alignItems: "center", gap: 6,
            padding: "4px 10px 4px 6px", borderRadius: 999,
            background: "rgba(45,31,82,0.85)", border: "1px solid #8B6CFF44",
            backdropFilter: "blur(6px)", cursor: "pointer",
          }}
        >
          <EarthLogo size={24} />
          <span style={{ color: "#F5F3FF", fontWeight: 800, fontSize: 13 }}>Home</span>
        </button>
      )}

      {screen === "splash" && <SplashScreen onDone={() => setScreen("home")} />}

      {screen === "home" && AESTHETIC === "original" && (
        <HomeScreen state={appState} onStartDaily={startDaily}
          onGoFlags={() => setScreen("flags")}
          onGoAchievements={() => setScreen("achievements")}
          onGoProfile={() => setScreen("profile")}
          onGoFlashcards={() => setScreen("flashcards")}
          onGoLanguage={() => setScreen("language")}
          onQuickPlay={startQuickPlay}
          onGoReverseQuiz={startReverseQuiz}
          onGoCapitalQuiz={() => setScreen("capitalquiz")}
          onGoChallenge={() => setScreen("challenge")}
          onGoCodex={() => setScreen("codex")}
          onGoGeo={() => setScreen("geo")}
          onGoGauntlet={() => setScreen("gauntlet")}
          onGoTierList={() => setScreen("tierlist")}
          onGoSettings={() => setScreen("settings")}
          onGoOddOneOut={() => setScreen("oddoneout")}
          onGoTheCrop={() => setScreen("thecrop")}
          onGoFlagDNA={() => setScreen("flagdna")}
          onGoBuildFlag={() => setScreen("buildflag")}
          onGoThePeel={() => setScreen("thepeel")}
          onGoLookalikes={() => setScreen("lookalikes")}
          onGoComposer={() => setScreen("composer")}
          onGoSilhouette={() => setScreen("silhouette")}
          onGoFlagFamilies={() => setScreen("flagfamilies")}
          onGoFunFact={() => setScreen("funfact")}
          onGoProgressMap={() => setScreen("progressmap")}
          onGoHistorical={() => setScreen("historical")}
          onGoIdentity={() => setScreen("identity")}
          onGoProvinceRoulette={() => setScreen("provinceroulette")}
          onGoSubStumper={() => setScreen("substumper")}
          onGoLineage={() => setScreen("lineage")}
          onGoSubStats={() => setScreen("substats")}
          onGoFlagle={() => setScreen("flagle")}
          onGoHigherLower={() => setScreen("higherlower")}
          onGoDeadOrAlive={() => setScreen("deadoralive")}
          onGoFrankenflag={() => setScreen("frankenflag")}
          onGoDescribeIt={() => setScreen("describeit")}
          onGoFlagBracket={() => setScreen("flagbracket")} />
      )}

      {screen === "home" && AESTHETIC !== "original" && (
        <MainTabs state={appState} tab={tab} onTab={setTab}
          onNavigate={(s) => setScreen(s as Screen)}
          onQuickPlay={startQuickPlay} onStartDaily={startDaily} onReverseQuiz={startReverseQuiz} />
      )}

      {screen === "flags" && (
        <FlagsScreen state={appState} onBack={() => setScreen("home")} onStartSet={startSet}
          onStartHistorical={(region) => { setHistRegion(region); setScreen("historical") }}
          onGoIdentity={() => setScreen("identity")} />
      )}

      {screen === "flashcards" && (
        <FlashcardsScreen onBack={() => setScreen("home")} onQuizSet={flags => startSet("flashcards-all", flags)} />
      )}

      {screen === "language" && <LanguageQuizScreen onBack={() => setScreen("home")} />}
      {screen === "capitalquiz" && <CapitalQuizScreen onBack={() => setScreen("home")} />}
      {screen === "challenge" && <ChallengeScreen onBack={() => setScreen("home")} />}
      {screen === "codex" && <CodexScreen onBack={() => setScreen("home")} />}
      {screen === "geo" && <GeoQuizScreen onBack={() => setScreen("home")} />}
      {screen === "gauntlet" && <GauntletScreen onBack={() => setScreen("home")} />}
      {screen === "tierlist" && <TierListScreen onBack={() => setScreen("home")} />}
      {screen === "settings"   && <SettingsScreen onBack={() => setScreen("home")} onMegaCodex={() => setScreen("megacodex")} />}
      {screen === "oddoneout"  && <OddOneOutScreen  onBack={() => setScreen("home")} />}
      {screen === "thecrop"    && <TheCropScreen    onBack={() => setScreen("home")} />}
      {screen === "flagdna"    && <FlagDNAScreen     onBack={() => setScreen("home")} />}
      {screen === "buildflag"    && <BuildFlagScreen    onBack={() => setScreen("home")} />}
      {screen === "thepeel"      && <ThePeelScreen      onBack={() => setScreen("home")} />}
      {screen === "lookalikes"   && <ConfusablesScreen  onBack={() => setScreen("home")} />}
      {screen === "composer"     && <TheComposerScreen  onBack={() => setScreen("home")} />}
      {screen === "silhouette"   && <SilhouetteScreen   onBack={() => setScreen("home")} />}
      {screen === "flagfamilies" && <FlagFamiliesScreen onBack={() => setScreen("home")} />}
      {screen === "funfact"      && (
        <FunFactScreen state={appState} onBack={() => setScreen("home")}
          onStateChange={setAppState} />
      )}
      {screen === "profile" && (
        <ProfileScreen state={appState} onBack={() => setScreen("home")}
          onSetUsername={name => setAppState(s => ({ ...s, username: name }))} />
      )}
      {screen === "achievements" && <AchievementsScreen state={appState} onBack={() => setScreen("home")} />}
      {screen === "progressmap" && <ProgressMapScreen state={appState} onBack={() => setScreen("home")} />}
      {screen === "historical" && <HistoricalFlagScreen onBack={() => setScreen("home")} region={histRegion} />}
      {screen === "identity" && <IdentityFlagScreen onBack={() => setScreen("home")} />}
      {screen === "provinceroulette" && <ProvinceRouletteScreen onBack={() => setScreen("home")} onSubLearned={handleSubLearned} />}
      {screen === "substumper" && <SubdivisionStumperScreen onBack={() => setScreen("home")} onSubLearned={handleSubLearned} />}
      {screen === "lineage" && <LineageScreen onBack={() => setScreen("home")} />}
      {screen === "substats" && <SubdivisionStatsScreen state={appState} onBack={() => setScreen("home")} />}
      {screen === "megacodex" && <MegaCodexScreen onBack={() => setScreen("settings")} />}
      {screen === "flagle"       && <FlagleScreen       onBack={() => setScreen("home")} />}
      {screen === "higherlower"  && <HigherLowerScreen  onBack={() => setScreen("home")} />}
      {screen === "deadoralive"  && <DeadOrAliveScreen  onBack={() => setScreen("home")} />}
      {screen === "frankenflag"  && <FrankenflagScreen  onBack={() => setScreen("home")} />}
      {screen === "describeit"   && <DescribeItScreen   onBack={() => setScreen("home")} />}
      {screen === "flagbracket"  && <FlagBracketScreen  onBack={() => setScreen("home")} />}
      {screen === "realorbot"    && <RealOrBotScreen    onBack={() => setScreen("home")} />}
      {screen === "timeline"     && <FlagTimelineScreen onBack={() => setScreen("home")} />}
      {screen === "bordermap"    && <BorderMapScreen    onBack={() => setScreen("home")} />}
      {screen === "borderchain"  && <BorderChainScreen  onBack={() => setScreen("home")} />}
      {screen === "gacha"        && <FlagGachaScreen    onBack={() => setScreen("home")} />}
      {screen === "symbolhunt"   && <SymbolHuntScreen   onBack={() => setScreen("home")} />}
      {screen === "twotruths"    && <TwoTruthsScreen    onBack={() => setScreen("home")} />}

      {screen === "quiz" && activeQuiz && (
        <QuizScreen questions={activeQuiz.questions} title={activeQuiz.title}
          onFinish={handleQuizFinish} onBack={() => setScreen(activeQuiz.isDaily ? "home" : "flags")} />
      )}

      {screen === "reversequiz" && activeQuiz && (
        <ReverseQuizScreen questions={activeQuiz.questions} title={activeQuiz.title}
          onFinish={handleQuizFinish} onBack={() => setScreen("home")} />
      )}

      {screen === "result" && lastResult && activeQuiz && (
        <ResultScreen score={lastResult.score} total={lastResult.total} answers={lastResult.answers}
          isDaily={activeQuiz.isDaily} setLabel={activeQuiz.title}
          streak={appState.currentStreak}
          onHome={() => setScreen("home")} onRetry={activeQuiz.isDaily ? undefined : handleRetry}
          onSaveShare={(r: ShareResult) => setAppState(s => saveShareResult(s, r))} />
      )}
    </div>
  )
}

import { fp } from "./codex"

export type HistoricalRegion = "Europe" | "Asia & Oceania" | "Americas" | "Africa & Middle East"

export interface HistoricalEntity {
  id: string
  name: string
  era: string
  region: HistoricalRegion
  flagUrl: string
  note: string
  /** ISO-2 code of the modern country this state is surfaced under in the Codex.
   *  Left undefined when the flag already appears in that country's flag-history
   *  timeline, to keep the Codex "related states" section purely additive. */
  relatedCode?: string
  /** Additional modern countries this state is surfaced under — successor
   *  states of multi-national empires/federations (e.g. Yugoslavia → Bosnia,
   *  Croatia…). Same additive rule as relatedCode. */
  relatedCodes?: string[]
}

export const HISTORICAL_FLAGS: HistoricalEntity[] = [
  // ── Europe & the Mediterranean ──────────────────────────────────────────────
  {
    id: "austria-hungary", name: "Austria-Hungary", era: "1867–1918", region: "Europe",
    relatedCodes: ["BA", "HU", "CZ", "SK", "SI", "HR"],
    flagUrl: fp("Civil_ensign_of_Austria-Hungary_(1869-1918).svg"),
    note: "The civil ensign split 50/50, joining the Austrian red-white-red with Hungary's colors and both shields — the Dual Monarchy never agreed on a single flag for the whole empire.",
  },
  {
    id: "kingdom-yugoslavia", name: "Kingdom of Yugoslavia", era: "1918–1941", region: "Europe",
    flagUrl: fp("Flag_of_Yugoslavia_(1918–1941).svg"), relatedCode: "RS", relatedCodes: ["BA", "HR", "SI", "MK", "ME", "XK"],
    note: "The blue-white-red Pan-Slavic tricolor symbolized the union of Serbs, Croats, and Slovenes, flown by the Kingdom until the Axis invasion of 1941.",
  },
  {
    id: "sfr-yugoslavia", name: "Socialist Yugoslavia", era: "1945–1992", region: "Europe",
    flagUrl: fp("Flag_of_Yugoslavia_(1946-1992).svg"), relatedCode: "RS", relatedCodes: ["BA", "HR", "SI", "MK", "ME", "XK"],
    note: "Tito's Partisans added a red, gold-bordered star to the tricolor; it marked the country's communist character until the federation's violent breakup in the 1990s.",
  },
  {
    id: "czechoslovakia", name: "Czechoslovakia", era: "1920–1992", region: "Europe",
    flagUrl: fp("Flag_of_the_Czech_Republic.svg"), relatedCode: "CZ", relatedCodes: ["SK"],
    note: "Adopted in 1920 with a blue hoist wedge to tell it apart from Poland's flag. Czechia kept it after the 1993 split, despite a clause meant to bar successor states from reusing it.",
  },
  {
    id: "german-empire", name: "German Empire", era: "1871–1918", region: "Europe",
    flagUrl: fp("Flag_of_the_German_Empire.svg"), relatedCode: "DE",
    note: "The black-white-red tricolor combined Prussia's black-and-white with the Hanseatic red-and-white. It was officially adopted as the national flag only in 1892.",
  },
  {
    id: "weimar", name: "Weimar Republic", era: "1919–1933", region: "Europe",
    flagUrl: fp("Flag_of_Germany_(3-2_aspect_ratio).svg"), relatedCode: "DE",
    note: "The black-red-gold tricolor revived the colors of the 1848 liberal revolution, deliberately tying the new democracy to earlier anti-autocratic movements.",
  },
  {
    id: "nazi-germany", name: "Nazi Germany", era: "1935–1945", region: "Europe",
    flagUrl: fp("Flag_of_the_German_Reich_(1935–1945).svg"), relatedCode: "DE",
    note: "The swastika flag became Germany's sole national flag in 1935. It was outlawed after WWII, and Germany returned to the black-red-gold of the Weimar era.",
  },
  {
    id: "east-germany", name: "East Germany (GDR)", era: "1959–1990", region: "Europe",
    flagUrl: fp("Flag_of_East_Germany.svg"), relatedCode: "DE",
    note: "The hammer-and-compass-in-wheat emblem represented workers, intelligentsia, and farmers. Before 1959 East and West Germany flew the identical plain tricolor.",
  },
  {
    id: "prussia", name: "Kingdom of Prussia", era: "1701–1918", region: "Europe",
    flagUrl: fp("Flag_of_the_Kingdom_of_Prussia_(1803-1892).svg"), relatedCode: "DE",
    note: "The black eagle on a white field derives from the Teutonic Knights. Prussia's black-and-white later supplied two of the three colors of the German Empire's flag.",
  },
  {
    id: "russian-empire", name: "Russian Empire", era: "1858–1896", region: "Europe",
    relatedCodes: ["FI", "UA", "BY"],
    flagUrl: fp("Flag_of_the_Russian_Empire_(black-yellow-white).svg"),
    note: "The black-yellow-white 'imperial colors' were drawn from the state coat of arms by Alexander II, before Nicholas II demoted them for the white-blue-red tricolor.",
  },
  {
    id: "soviet-union", name: "Soviet Union", era: "1922–1991", region: "Europe",
    relatedCodes: ["UA", "BY", "MD", "GE", "AM", "AZ", "KZ", "KG", "TJ", "TM", "UZ", "LT", "LV", "EE"],
    flagUrl: fp("Flag_of_the_Soviet_Union.svg"),
    note: "The gold hammer and sickle beneath a red star stood for the worker-peasant alliance. The exact shade and proportions were fixed by Soviet law in 1955.",
  },
  {
    id: "byzantine", name: "Byzantine Empire", era: "1261–1453", region: "Europe",
    flagUrl: fp("Byzantine_imperial_flag,_14th_century.svg"), relatedCode: "GR", relatedCodes: ["TR"],
    note: "The four gold firesteels (often glossed 'King of Kings, Ruling over Kings') were the emblem of the Palaiologos dynasty, the last imperial house, which fell with Constantinople in 1453.",
  },
  {
    id: "holy-roman-empire", name: "Holy Roman Empire", era: "962–1806", region: "Europe",
    flagUrl: fp("Banner_of_the_Holy_Roman_Emperor_with_haloes_(1430-1806).svg"), relatedCode: "DE",
    note: "The black double-headed eagle on gold was the Emperor's banner. Its two heads symbolized claimed authority over both the secular and the spiritual realms.",
  },
  {
    id: "venice", name: "Republic of Venice", era: "697–1797", region: "Europe",
    flagUrl: fp("Flag_of_the_Republic_of_Venice.svg"), relatedCode: "IT",
    note: "The golden winged Lion of St Mark holds an open Gospel; by tradition the book was shown open in peacetime and the lion grasped a sword in war.",
  },
  {
    id: "two-sicilies", name: "Kingdom of the Two Sicilies", era: "1816–1861", region: "Europe",
    flagUrl: fp("Flag_of_the_Kingdom_of_the_Two_Sicilies_(1816).svg"), relatedCode: "IT",
    note: "The white Bourbon field carries an elaborate coat of arms of the many southern Italian domains the dynasty ruled, until Garibaldi's forces conquered it in 1860–61.",
  },
  {
    id: "papal-states", name: "Papal States", era: "1825–1870", region: "Europe",
    flagUrl: fp("Flag_of_the_Papal_States_(1825-1870).svg"), relatedCode: "VA",
    note: "The yellow-and-white vertical bicolor with the crossed keys of St Peter beneath the papal tiara is the direct ancestor of today's Vatican City flag.",
  },
  {
    id: "sardinia", name: "Kingdom of Sardinia", era: "1816–1848", region: "Europe",
    flagUrl: fp("Civil_Flag_and_Civil_Ensign_of_the_Kingdom_of_Sardinia_(1816-1848).svg"), relatedCode: "IT",
    note: "A white field with the red Savoy cross in a blue border. After 1848 Sardinia switched to the tricolor with the Savoy shield, which became the basis of the Kingdom of Italy's flag.",
  },
  {
    id: "genoa", name: "Republic of Genoa", era: "1099–1797", region: "Europe",
    flagUrl: fp("Flag_of_Genoa.svg"), relatedCode: "IT",
    note: "The red cross of St George on white was Genoa's medieval ensign. By one account England paid Genoa in 1190 for the right to fly it for naval protection.",
  },
  {
    id: "danzig", name: "Free City of Danzig", era: "1920–1939", region: "Europe",
    flagUrl: fp("Flag_of_the_Free_City_of_Danzig.svg"), relatedCode: "PL",
    note: "Two white crosses and a gold crown on red, from the city's medieval arms. This League of Nations-administered free city was the flashpoint where World War II began.",
  },
  {
    id: "cisalpine", name: "Cisalpine Republic", era: "1797–1802", region: "Europe",
    flagUrl: fp("Flag_of_the_Repubblica_Cisalpina.svg"), relatedCode: "IT",
    note: "This Napoleonic sister republic in northern Italy flew a vertical green-white-red tricolor modeled on revolutionary France — a direct forerunner of the modern Italian flag.",
  },
  {
    id: "florence", name: "Republic of Florence", era: "1115–1532", region: "Europe",
    flagUrl: fp("Flag_of_Florence.svg"), relatedCode: "IT",
    note: "The red giglio — a stylized lily — on white was the emblem of the medieval commune. Florence reversed the earlier white-on-red Ghibelline lily to mark its Guelph allegiance.",
  },
  {
    id: "siena", name: "Republic of Siena", era: "1125–1555", region: "Europe",
    flagUrl: fp("Flag_of_Siena.svg"), relatedCode: "IT",
    note: "The black-and-white Balzana is said to recall the white and black smoke that rose when Siena's legendary founders Senius and Aschius made sacrifices on the city's hills.",
  },
  {
    id: "noli", name: "Republic of Noli", era: "1192–1797", region: "Europe",
    flagUrl: fp("Flag_of_the_Republic_of_Noli.svg"), relatedCode: "IT",
    note: "One of the smallest and least-known Italian maritime republics, this tiny Ligurian town governed itself for six centuries under the protection of allied Genoa.",
  },
  {
    id: "duchy-of-savoy", name: "Duchy of Savoy", era: "1416–1860", region: "Europe",
    flagUrl: fp("Flag_of_Savoie.svg"), relatedCode: "IT",
    note: "The white cross on red of the House of Savoy, the dynasty that ruled an Alpine state straddling France and Italy and eventually became the royal house of a united Italy.",
  },
  {
    id: "duchy-of-modena", name: "Duchy of Modena and Reggio", era: "1452–1859", region: "Europe",
    flagUrl: fp("State_Flag_of_the_Duchy_of_Modena_and_Reggio_(1830-1859).svg"), relatedCode: "IT",
    note: "Ruled by the Este dynasty and later the Austrian Habsburg-Este line, the duchy flew a tricolour charged with the Este eagle until it was absorbed into unified Italy.",
  },
  {
    id: "duchy-of-mantua", name: "Duchy of Mantua", era: "1530–1708", region: "Europe",
    flagUrl: fp("Flag_of_the_Duchy_of_Mantua_(1575–1707).svg"), relatedCode: "IT",
    note: "The Gonzaga dynasty's duchy in the Po plain, a great Renaissance art and music centre, flew a flag quartered with their eagles and lions before passing to Austria.",
  },
  {
    id: "duchy-of-ferrara", name: "Duchy of Ferrara", era: "1471–1598", region: "Europe",
    flagUrl: fp("Flag_of_Ferrara.svg"), relatedCode: "IT",
    note: "The Este capital and a brilliant Renaissance court; when the last legitimate Este duke died without heirs in 1597, the Pope reclaimed Ferrara for the Papal States.",
  },
  {
    id: "duchy-of-urbino", name: "Duchy of Urbino", era: "1443–1631", region: "Europe",
    flagUrl: fp("Flag_of_Duchy_of_Urbino.svg"), relatedCode: "IT",
    note: "The Montefeltro and later Della Rovere dukes made Urbino one of the foremost humanist courts of the Renaissance, birthplace of the painter Raphael.",
  },
  {
    id: "montferrat", name: "Marquisate of Montferrat", era: "961–1574", region: "Europe",
    flagUrl: fp("Flag_of_Montferrat.svg"), relatedCode: "IT",
    note: "A long-lived northern Italian march whose Aleramici marquises led crusades and even briefly held the throne of the Kingdom of Thessalonica.",
  },
  {
    id: "kingdom-naples", name: "Kingdom of Naples", era: "1442–1816", region: "Europe",
    flagUrl: fp("Flag_of_the_Kingdom_of_Naples.svg"), relatedCode: "IT",
    note: "The independent southern kingdom before its 1816 merger with Sicily; its white flag bore the arms of the successive Aragonese, Spanish, and Bourbon dynasties that ruled it.",
  },
  {
    id: "kingdom-naples-1811", name: "Kingdom of Naples (Napoleonic)", era: "1808–1815", region: "Europe",
    flagUrl: fp("Flag_of_the_Kingdom_of_Naples_(1811).svg"), relatedCode: "IT",
    note: "Under Napoleon's marshal Joachim Murat, Naples flew a white field with a red border and a central emblem, before Murat was deposed and executed in 1815.",
  },
  {
    id: "transpadane", name: "Transpadane Republic", era: "1796–1797", region: "Europe",
    flagUrl: fp("Flag_of_the_Repubblica_Transpadana.svg"), relatedCode: "IT",
    note: "A short-lived Napoleonic sister republic around Milan that flew a vertical green-white-red tricolour, soon merged with the Cispadane Republic to form the Cisalpine Republic.",
  },
  {
    id: "roman-republic-1798", name: "Roman Republic (1798)", era: "1798–1799", region: "Europe",
    flagUrl: fp("Flag_of_the_Repubblica_Romana_(1798).svg"), relatedCode: "IT",
    note: "A Napoleonic republic proclaimed after French troops seized Rome and deposed Pope Pius VI; its black-white-red tricolour flew until Neapolitan and Austrian forces restored papal rule.",
  },
  {
    id: "regency-carnaro", name: "Italian Regency of Carnaro", era: "1919–1920", region: "Europe",
    flagUrl: fp("Ensign_of_the_Regency_of_Carnaro_(1920).svg"), relatedCode: "HR",
    note: "Poet Gabriele D'Annunzio's quasi-anarchic statelet at Fiume, whose flag bore the constellation of Ursa Major and the motto 'Quis contra nos?' — 'Who is against us?'.",
  },
  {
    id: "ossola", name: "Partisan Republic of Ossola", era: "1944", region: "Europe",
    flagUrl: fp("Flag_of_the_Italian_Partisan_Republic_of_Ossola.svg"), relatedCode: "IT",
    note: "A free zone liberated by anti-Fascist partisans in the Alps near the Swiss border, self-governing for forty days in 1944 before German and Fascist forces retook it.",
  },
  {
    id: "alba", name: "Partisan Republic of Alba", era: "1944", region: "Europe",
    flagUrl: fp("Flag_of_the_Republic_of_Alba.svg"), relatedCode: "IT",
    note: "A Piedmontese town held free by partisans for 23 days in 1944, immortalized in Beppe Fenoglio's novel 'I ventitré giorni della città di Alba'.",
  },
  {
    id: "italian-social-republic", name: "Italian Social Republic", era: "1943–1945", region: "Europe",
    flagUrl: fp("War_flag_of_the_Italian_Social_Republic.svg"), relatedCode: "IT",
    note: "Mussolini's German-backed rump state in northern Italy, often called the Republic of Salò; its war flag added a fasces-clutching eagle to the tricolour.",
  },
  {
    id: "smom", name: "Sovereign Military Order of Malta", era: "1113–present", region: "Europe",
    flagUrl: fp("Flag_of_the_Sovereign_Military_Order_of_Malta.svg"), relatedCode: "MT",
    note: "The white eight-pointed Maltese cross on red is the Knights Hospitaller's 'works' flag; the eight points are traditionally said to represent the eight Beatitudes.",
  },

  // ── Asia & Oceania ──────────────────────────────────────────────────────────
  {
    id: "qing", name: "Qing Dynasty", era: "1889–1912", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Qing_dynasty_(1889-1912).svg"),
    note: "The 'Yellow Dragon Flag' shows the Azure Dragon chasing a flaming pearl. It began as a triangular naval ensign in 1862 and became China's first true national flag in 1889.",
  },
  {
    id: "roc-fivecolor", name: "Republic of China (1912)", era: "1912–1928", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Republic_of_China_1912-1928.svg"),
    note: "The five stripes stood for the Han, Manchu, Mongol, Hui, and Tibetan peoples under the 'Five Races Under One Union' ideal, until the KMT's Blue Sky flag replaced it in 1928.",
  },
  {
    id: "manchukuo", name: "Manchukuo", era: "1932–1945", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Manchukuo.svg"), relatedCode: "CN",
    note: "The Japanese puppet state's yellow flag with a four-color canton. Its head of state was Puyi — the same man who had been the last Qing emperor as a child.",
  },
  {
    id: "tokugawa", name: "Tokugawa Shogunate", era: "1603–1868", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Tokugawa_Shogunate.svg"), relatedCode: "JP",
    note: "A white field bisected by a thick black stripe served as the standard of the Tokugawa bakufu, flown during the Sakoku period when Japan was largely closed to the world.",
  },
  {
    id: "empire-japan", name: "Empire of Japan", era: "1870–1945", region: "Asia & Oceania",
    flagUrl: fp("War_flag_of_the_Imperial_Japanese_Army.svg"),
    note: "The 16-rayed Rising Sun was adopted as the Imperial Japanese Army's war flag in 1870; the rays-only design is still used today by the Maritime Self-Defense Force.",
  },
  {
    id: "hawaii", name: "Kingdom of Hawaii", era: "1845–1893", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Hawaii.svg"), relatedCode: "US",
    note: "Identical to the modern US state flag: a Union Jack canton (a nod to British friendship under Kamehameha I) over eight stripes for the eight main islands.",
  },
  {
    id: "ezo", name: "Republic of Ezo", era: "1869", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Republic_of_Ezo.svg"), relatedCode: "JP",
    note: "Founded by rebel Tokugawa naval officer Enomoto Takeaki on Hokkaido, it is often called the first republic in Asia to hold an election. It lasted barely five months.",
  },
  {
    id: "empire-vietnam", name: "Empire of Vietnam", era: "1945", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Empire_of_Vietnam_(1945).svg"), relatedCode: "VN",
    note: "A yellow flag with a red 'li' trigram from the I Ching, symbolizing the south. It flew over the short-lived Japanese-sponsored Empire of Vietnam in 1945.",
  },
  {
    id: "south-vietnam", name: "South Vietnam", era: "1948–1975", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_South_Vietnam.svg"), relatedCode: "VN",
    note: "The 'Heritage Flag' — three red stripes on yellow for the three regions of Vietnam. It is still flown by Vietnamese diaspora communities worldwide.",
  },
  {
    id: "khmer-republic", name: "Khmer Republic", era: "1970–1975", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Khmer_Republic.svg"),
    note: "Lon Nol's republic replaced the royal flag; its three white stars stand for the nation, religion, and republic. Angkor Wat has appeared on every Cambodian flag since the 1800s.",
  },
  {
    id: "sarawak", name: "Kingdom of Sarawak", era: "1870–1946", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Raj_of_Sarawak_(1870).svg"), relatedCode: "MY",
    note: "Sarawak was privately ruled by the Brooke family, English 'White Rajahs', for over a century. The split black-and-red cross is from the Brooke coat of arms.",
  },
  {
    id: "sulu", name: "Sultanate of Sulu", era: "1457–1915", region: "Asia & Oceania",
    flagUrl: fp("Late_19th_Century_Flag_of_Sulu.svg"), relatedCode: "PH",
    note: "The Sulu Sultanate controlled the seas between the southern Philippines and Borneo; its 1878 lease of North Borneo is the root of the still-active Sabah dispute.",
  },
  {
    id: "malacca", name: "Sultanate of Malacca", era: "1400–1511", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Malacca.svg"), relatedCode: "MY",
    note: "The 15th-century sultanate was a great Malay trading power; no authenticated period banner survives, so its red-and-white colors live on in the modern Malacca state flag.",
  },
  {
    id: "tibet", name: "Tibet", era: "1916–1951", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Tibet.svg"), relatedCode: "CN",
    note: "The 'Snow Lion Flag' shows two snow lions holding a jewel before a sun over a snow mountain. Designed under the 13th Dalai Lama, it is banned in China today.",
  },
  {
    id: "siam", name: "Siam", era: "1855–1916", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Siam_(1855).svg"),
    note: "King Mongkut (Rama IV) placed a white royal elephant — a sacred symbol of royal power — on a plain red field after foreign traders couldn't distinguish Siam's earlier banner.",
  },

  // ── The Americas ────────────────────────────────────────────────────────────
  {
    id: "gran-colombia", name: "Gran Colombia", era: "1819–1831", region: "Americas",
    flagUrl: fp("Flag_of_the_Gran_Colombia.svg"), relatedCode: "CO", relatedCodes: ["VE", "EC", "PA"],
    note: "Bolívar's union of present-day Colombia, Venezuela, Ecuador, and Panama. Its yellow-blue-red tricolor is the direct ancestor of all three modern flags.",
  },
  {
    id: "central-america", name: "Federal Republic of Central America", era: "1823–1841", region: "Americas",
    flagUrl: fp("Flag_of_the_Federal_Republic_of_Central_America.svg"), relatedCode: "GT", relatedCodes: ["SV", "HN", "NI", "CR"],
    note: "Its blue-white-blue stripes survive almost unchanged in the flags of Honduras, Nicaragua, El Salvador, and Guatemala. White stood for the land between the two oceans.",
  },
  {
    id: "empire-brazil", name: "Empire of Brazil", era: "1822–1889", region: "Americas",
    flagUrl: fp("Flag_of_Brazil_(1870–1889).svg"),
    note: "A green field with a yellow rhombus bearing the imperial arms ringed by 20 stars. The republican coup of 1889 swapped the crowned arms for the celestial globe and 'Ordem e Progresso'.",
  },
  {
    id: "texas-republic", name: "Republic of Texas", era: "1839–1845", region: "Americas",
    flagUrl: fp("Flag_of_the_Republic_of_Texas.svg"), relatedCode: "US",
    note: "The 1839 Lone Star flag became the US state flag of Texas unchanged. Its predecessor, the 'Burnet flag', was a plain gold star on blue.",
  },
  {
    id: "california-republic", name: "California Republic", era: "1846", region: "Americas",
    flagUrl: fp("First_Bear_Flag_of_California_(1846).svg"), relatedCode: "US",
    note: "The original hand-painted Bear Flag of the 25-day Bear Flag Revolt was so crude its grizzly was mocked as looking like a pig. The 1846 original burned in the 1906 San Francisco earthquake.",
  },
  {
    id: "confederate", name: "Confederate States", era: "1861–1865", region: "Americas",
    flagUrl: fp("Flag_of_the_Confederate_States_(1861–1863).svg"), relatedCode: "US",
    note: "The first national 'Stars and Bars' was so easily confused with the US flag in battle smoke that the separate square Battle Flag was created for the field.",
  },
  {
    id: "vermont-republic", name: "Vermont Republic", era: "1777–1791", region: "Americas",
    flagUrl: fp("Flag_of_the_Vermont_Republic.svg"), relatedCode: "US",
    note: "The independent republic that existed before Vermont became the 14th US state governed itself for 14 years and abolished adult slavery in its 1777 constitution.",
  },
  {
    id: "west-florida", name: "Republic of West Florida", era: "1810", region: "Americas",
    flagUrl: fp("Bonnie_Blue_flag.svg"), relatedCode: "US",
    note: "A single white star on blue, this 'Bonnie Blue Flag' was the first lone-star flag in US history and directly inspired the Texas and Confederate lone-star imagery.",
  },
  {
    id: "new-granada", name: "Republic of New Granada", era: "1831–1858", region: "Americas",
    flagUrl: fp("Flag_of_New_Granada.svg"), relatedCode: "CO",
    note: "A vertical red-blue-yellow variant of the Gran Colombia colors, used after Venezuela and Ecuador split away. It later evolved into the horizontal flag of modern Colombia.",
  },
  {
    id: "rio-grande", name: "Republic of the Rio Grande", era: "1840", region: "Americas",
    flagUrl: fp("Flag_of_the_Republic_of_the_Rio_Grande_(historical).svg"), relatedCode: "MX",
    note: "A breakaway federalist republic of northern Mexico; its three stars stood for Coahuila, Nuevo León, and Tamaulipas. It was crushed by Mexican forces within a year.",
  },
  {
    id: "yucatan", name: "Republic of Yucatán", era: "1841–1848", region: "Americas",
    flagUrl: fp("Flag_of_the_Republic_of_Yucatan.svg"), relatedCode: "MX",
    note: "Red-white-red bands with a green hoist holding five white stars for its five departments. Yucatán declared independence from Mexico twice over centralist rule.",
  },
  {
    id: "first-mexican-empire", name: "First Mexican Empire", era: "1821–1823", region: "Americas",
    flagUrl: fp("First_flag_of_the_Mexican_Empire.svg"),
    note: "Agustín de Iturbide's empire flew the green-white-red tricolor with a crowned golden eagle. Removing the crown after the empire fell produced the basis of the republican flag.",
  },
  {
    id: "inca-wiphala", name: "Inca / Wiphala", era: "Andean", region: "Americas",
    flagUrl: fp("Wiphala.svg"), relatedCode: "BO",
    note: "The Wiphala is a square 7×7 rainbow patchwork; the color of its longest diagonal identifies the region. A modern Andean emblem — the Incas are not known to have used flags as such.",
  },
  {
    id: "iroquois", name: "Iroquois Confederacy", era: "Haudenosaunee", region: "Americas",
    flagUrl: fp("Flag_of_the_Iroquois_Confederacy.svg"), relatedCode: "US",
    note: "A purple field bearing the white Hiawatha Belt — the Tree of Peace flanked by squares for the union of the Five Nations. Designed in the 1980s for the Haudenosaunee lacrosse team.",
  },

  // ── Africa & the Middle East ────────────────────────────────────────────────
  {
    id: "ottoman", name: "Ottoman Empire", era: "1844–1922", region: "Africa & Middle East",
    relatedCodes: ["BA", "AL", "MK", "BG"],
    flagUrl: fp("Flag_of_the_Ottoman_Empire_(1844–1922).svg"),
    note: "The red field with white crescent and star was standardized in 1844; older Ottoman banners varied widely and often carried multiple crescents.",
  },
  {
    id: "abbasid", name: "Abbasid Caliphate", era: "750–1258", region: "Africa & Middle East",
    flagUrl: fp("Black_flag.svg"), relatedCode: "IQ",
    note: "The Abbasids were nicknamed the 'Black Flags' — black was their dynastic color, recalling the banner of the Abbasid Revolution. They ruled a golden age from Baghdad.",
  },
  {
    id: "umayyad", name: "Umayyad Caliphate", era: "661–750", region: "Africa & Middle East",
    flagUrl: fp("White_flag_3_to_2.svg"), relatedCode: "SY",
    note: "White was the Umayyad dynastic color, deliberately contrasting with the black of their Abbasid rivals. They ruled the largest empire the world had yet seen, from Damascus.",
  },
  {
    id: "fatimid", name: "Fatimid Caliphate", era: "909–1171", region: "Africa & Middle East",
    flagUrl: fp("Fatimid_Flag.svg"), relatedCode: "EG",
    note: "The Shia Ismaili Fatimids adopted green as their standard, and green's lasting association with Islam owes much to this dynasty. They founded Cairo as their capital.",
  },
  {
    id: "ethiopian-empire", name: "Ethiopian Empire", era: "1897–1974", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Ethiopia_(1897-1936;_1941-1974).svg"),
    note: "The crowned Lion of Judah symbolized the Solomonic dynasty's claimed descent from King Solomon and the Queen of Sheba. Its green-yellow-red became the model for Pan-African colors.",
  },
  {
    id: "kingdom-egypt", name: "Kingdom of Egypt", era: "1922–1953", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Egypt_(1922-1958).svg"),
    note: "Adopted under King Fuad I in 1922; the green field's three stars are commonly said to represent Egypt, Nubia, and Sudan.",
  },
  {
    id: "uar", name: "United Arab Republic", era: "1958–1971", region: "Africa & Middle East",
    relatedCodes: ["SY"],
    flagUrl: fp("Flag_of_the_United_Arab_Republic_(1958–1971).svg"),
    note: "The two green stars stood for the two members of the brief Egypt–Syria union. Syria later readopted this exact flag, which is why it doubles as a Syrian flag.",
  },
  {
    id: "biafra", name: "Biafra", era: "1967–1970", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Biafra.svg"), relatedCode: "NG",
    note: "The rising sun flew over the short-lived secessionist republic during the Nigerian Civil War: black mourned the slain, red the blood, green prosperity.",
  },
  {
    id: "rhodesia", name: "Rhodesia", era: "1968–1979", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Rhodesia_(1968–1979).svg"),
    note: "Adopted after Ian Smith's white-minority government declared independence; the central colonial arms feature a golden lion and the ancient Great Zimbabwe bird.",
  },
  {
    id: "apartheid-sa", name: "Apartheid South Africa", era: "1928–1994", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_South_Africa_(1928–1994).svg"),
    note: "Based on the Dutch Prinsenvlag, its white stripe carries three miniature flags — the Union Flag, the Orange Free State, and the Transvaal Vierkleur — for the territories of the Union.",
  },
  {
    id: "zanzibar", name: "Sultanate of Zanzibar", era: "1856–1964", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_the_Sultanate_of_Zanzibar.svg"), relatedCode: "TZ",
    note: "The plain red banner derives from the Sultanate of Oman, whose Busaidi dynasty ruled Zanzibar until the 1964 revolution that led to union with Tanganyika as Tanzania.",
  },
  {
    id: "orange-free-state", name: "Orange Free State", era: "1854–1902", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_the_Orange_Free_State.svg"), relatedCode: "ZA",
    note: "This Boer republic placed the Dutch tricolor in the canton over orange-and-white stripes. The flag was later embedded inside the apartheid-era South African flag.",
  },
  {
    id: "transvaal", name: "South African Republic (Transvaal)", era: "1857–1902", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Transvaal.svg"), relatedCode: "ZA",
    note: "The Boer 'Vierkleur' added a green vertical stripe to the Dutch red-white-blue. It flew over Paul Kruger's republic through the Anglo-Boer Wars.",
  },
  {
    id: "buganda", name: "Kingdom of Buganda", era: "Kingdom", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Buganda.svg"), relatedCode: "UG",
    note: "The vertical blue-yellow-blue bears a shield and crossed spears. Buganda, in present-day Uganda, remains one of Africa's oldest continuous monarchies under the Kabaka.",
  },
  {
    id: "dervish", name: "Dervish State", era: "1896–1920", region: "Africa & Middle East",
    flagUrl: fp("Dervish_flag.svg"), relatedCode: "SO",
    note: "The banner of the Dervish movement led by Sayyid Mohammed Abdullah Hassan, who resisted British, Italian, and Ethiopian forces in the Somali interior for over two decades.",
  },
  {
    id: "ashanti", name: "Ashanti Empire", era: "1701–1957", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Ashanti.svg"), relatedCode: "GH",
    note: "The gold-black-green flag bears the Golden Stool, the sacred soul of the Asante nation. The empire favored umbrellas and the Stool over flags; this design dates to 1935.",
  },

  // ── Wave 2 & 3: deep cuts ───────────────────────────────────────────────────
  // Europe — kingdoms & duchies
  {
    id: "kingdom-greece", name: "Kingdom of Greece", era: "1822–1978", region: "Europe",
    flagUrl: fp("Flag_of_Greece_(1822-1978).svg"), relatedCode: "GR",
    note: "The plain blue field with a white cross was the official land flag from 1822. The blue-and-white striped version initially served only as the naval ensign.",
  },
  {
    id: "cross-of-burgundy", name: "Cross of Burgundy", era: "1506–1785", region: "Europe",
    flagUrl: fp("Flag_of_Cross_of_Burgundy.svg"),
    note: "The red saw-tooth saltire represents two crossed, roughly-pruned branches. It flew over Spanish armies and colonies across the Americas for nearly three centuries.",
  },
  {
    id: "second-spanish-republic", name: "Second Spanish Republic", era: "1931–1939", region: "Europe",
    flagUrl: fp("Flag_of_the_Second_Spanish_Republic.svg"),
    note: "The republican tricolor added a purple lower band popularly linked to Castile, replacing the red-yellow monarchist flag until Franco's victory in 1939.",
  },
  {
    id: "kingdom-italy", name: "Kingdom of Italy", era: "1861–1946", region: "Europe",
    flagUrl: fp("Flag_of_Italy_(1861-1946).svg"),
    note: "The green-white-red tricolor charged with the crowned shield of the House of Savoy, flown through both World Wars until the 1946 referendum abolished the monarchy.",
  },
  {
    id: "kingdom-france", name: "Kingdom of France", era: "987–1792", region: "Europe",
    flagUrl: fp("Pavillon_royal_de_France.svg"),
    note: "The white field strewn with golden fleurs-de-lis was the banner of the Bourbon monarchy. White, not a tricolor, symbolized the king before the Revolution.",
  },
  {
    id: "tuscany", name: "Grand Duchy of Tuscany", era: "1765–1860", region: "Europe",
    flagUrl: fp("Flag_of_the_Grand_Duchy_of_Tuscany_(1840).svg"), relatedCode: "IT",
    note: "The red-white-red triband charged with the grand-ducal crown was used by the Habsburg-Lorraine grand dukes who ruled Florence and Tuscany.",
  },
  {
    id: "baden", name: "Grand Duchy of Baden", era: "1855–1891", region: "Europe",
    flagUrl: fp("Flag_of_the_Grand_Duchy_of_Baden_(1855–1891).svg"), relatedCode: "DE",
    note: "The red-over-yellow bicolor was Baden's flag from 1855. The southwestern grand duchy was one of the states that unified into the German Empire in 1871.",
  },
  {
    id: "hanover", name: "Kingdom of Hanover", era: "1837–1866", region: "Europe",
    flagUrl: fp("Flag_of_Hanover_1837-1866.svg"), relatedCode: "DE",
    note: "King Ernst August introduced the yellow-over-white bicolor in 1837 when Hanover's personal union with Britain ended. Its emblem was the white Saxon horse.",
  },
  {
    id: "bavaria", name: "Kingdom of Bavaria", era: "1806–1918", region: "Europe",
    flagUrl: fp("Flag_of_Bavaria_(lozengy).svg"), relatedCode: "DE",
    note: "The white-and-blue lozenge 'Rautenflagge' derives from the medieval arms of the Wittelsbachs. By rule it must show at least 21 lozenges with a white one in the top-right.",
  },
  {
    id: "westphalia", name: "Kingdom of Westphalia", era: "1807–1813", region: "Europe",
    flagUrl: fp("Flag_of_the_Kingdom_of_Westphalia.svg"), relatedCode: "DE",
    note: "This Napoleonic kingdom, ruled by Jérôme Bonaparte, flew a white-and-blue bicolor with crowned arms combining a Napoleonic eagle with the silver Saxon horse.",
  },
  // Europe — Russian Civil War & post-WWI micro-states
  {
    id: "kuban", name: "Kuban People's Republic", era: "1918–1920", region: "Europe",
    flagUrl: fp("Flag_of_Kuban_People%27s_Republic.svg"), relatedCode: "RU",
    note: "An anti-Bolshevik Cossack state on the Kuban river; its blue-raspberry-green bands stood for Cossacks, non-Cossack residents, and highlanders.",
  },
  {
    id: "don-republic", name: "Don Republic", era: "1918–1920", region: "Europe",
    flagUrl: fp("Flag_of_Don_Cossacks.svg"), relatedCode: "RU",
    note: "The Don Cossack state's blue-yellow-red tricolor stood for the Don Cossacks, Kalmyks, and Russian non-Cossack residents during the Russian Civil War.",
  },
  {
    id: "mountainous-caucasus", name: "Mountainous Republic of the Northern Caucasus", era: "1917–1921", region: "Europe",
    flagUrl: fp("Flag_of_the_Mountainous_Republic_of_the_Northern_Caucasus.svg"), relatedCode: "RU",
    note: "Green and white stripes with a blue canton bearing seven stars for the seven main highland peoples of the North Caucasus.",
  },
  {
    id: "central-lithuania", name: "Republic of Central Lithuania", era: "1920–1922", region: "Europe",
    flagUrl: fp("Flag_of_Central_Lithuania_1920.svg"), relatedCode: "LT",
    note: "A Polish client state around Vilnius; its red field bore the Polish White Eagle and the Lithuanian Vytis knight side by side, before annexation by Poland in 1922.",
  },
  {
    id: "lemko-rusyn", name: "Lemko-Rusyn Republic", era: "1918–1920", region: "Europe",
    flagUrl: fp("Flag_of_the_Lemko_Republic.svg"), relatedCode: "PL",
    note: "A pro-Russian Rusyn republic centered on Florynka in the western Lemko region, flying a blue-yellow-green tricolor after the collapse of Austria-Hungary.",
  },
  {
    id: "gouda", name: "City of Gouda", era: "medieval–present", region: "Europe",
    flagUrl: fp("Flag_of_Gouda.svg"), relatedCode: "NL",
    note: "Red-and-white vertical stripes with three silver six-pointed stars — the civic banner of the Dutch cheese city of Gouda, of medieval origin.",
  },
  // Americas — breakaways & precursors
  {
    id: "newfoundland", name: "Dominion of Newfoundland", era: "1869–1949", region: "Americas",
    flagUrl: fp("Newfoundland_Tricolour.svg"), relatedCode: "CA",
    note: "The unofficial 'Pink, White and Green' originated with St. John's fishermen's societies. Newfoundland was a self-governing dominion until it joined Canada in 1949.",
  },
  {
    id: "republic-canada-1837", name: "Republic of Canada (1837)", era: "1837–1838", region: "Americas",
    flagUrl: fp("Flag_of_the_Republic_of_Canada.svg"), relatedCode: "CA",
    note: "Blue-white-blue with two white stars for Upper and Lower Canada, flown by William Lyon Mackenzie's provisional government during the Upper Canada Rebellion.",
  },
  {
    id: "deseret", name: "State of Deseret", era: "1849–1851", region: "Americas",
    flagUrl: fp("Flag_of_Deseret_(reconstructed).svg"), relatedCode: "US",
    note: "A reconstructed beehive flag of the provisional Mormon state that covered much of the future US Southwest before Congress created Utah Territory.",
  },
  {
    id: "artsakh", name: "Republic of Artsakh", era: "1991–2023", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Artsakh.svg"), relatedCode: "AM",
    note: "The Armenian red-blue-orange tricolor interrupted by a white stepped chevron, flown by the breakaway Nagorno-Karabakh republic until its dissolution in 2023.",
  },
  {
    id: "maine-republic", name: "Republic of Maine (1901 ensign)", era: "1901–1909", region: "Americas",
    flagUrl: fp("Flag_of_Maine_(1901–1909).svg"), relatedCode: "US",
    note: "A buff field with a green pine tree and a blue North Star in the canton — the beloved 'pine tree' flag, recently the subject of campaigns to bring it back.",
  },
  {
    id: "spanish-haiti", name: "Republic of Spanish Haiti", era: "1821–1822", region: "Americas",
    flagUrl: fp("Flag_of_Spanish_Haiti.svg"), relatedCode: "DO",
    note: "A yellow-blue-red tricolor with silver stars, flown by the short-lived breakaway state of Santo Domingo before Haiti annexed it in 1822.",
  },
  {
    id: "peru-bolivian", name: "Peru-Bolivian Confederation", era: "1836–1839", region: "Americas",
    flagUrl: fp("Flag_of_the_Peru-Bolivian_Confederation.svg"), relatedCode: "PE", relatedCodes: ["BO"],
    note: "A red field bearing the combined arms of North Peru, South Peru, and Bolivia, under the brief union led by Andrés de Santa Cruz.",
  },
  {
    id: "south-peru", name: "Republic of South Peru", era: "1836–1839", region: "Americas",
    flagUrl: fp("Flag_of_South_Peru.svg"), relatedCode: "PE",
    note: "A green-white-red design with a gold sun and stars, one of the member states of the Peru-Bolivian Confederation.",
  },
  {
    id: "trinidad-principality", name: "Principality of Trinidad", era: "1893–1895", region: "Americas",
    flagUrl: fp("Flag_of_the_Principality_of_Trinidad.svg"), relatedCode: "BR",
    note: "A yellow field with a red cross, designed by adventurer James Harden-Hickey for his unrecognized micronation on the uninhabited Brazilian island of Trindade.",
  },
  {
    id: "counani", name: "Republic of Counani", era: "1887–1904", region: "Americas",
    flagUrl: fp("Flag_of_the_Republic_of_Independent_Guyana_(1887-1904).svg"), relatedCode: "BR",
    note: "A self-proclaimed republic in the disputed France–Brazil border zone of Guiana, promoted by French adventurers but never internationally recognized.",
  },
  {
    id: "araucania", name: "Kingdom of Araucanía and Patagonia", era: "1860–1862", region: "Americas",
    flagUrl: fp("Flag_of_the_Kingdom_of_Araucanía_and_Patagonia.svg"), relatedCode: "CL",
    note: "A blue-white-green tricolor for the unrecognized kingdom that French adventurer Orélie-Antoine de Tounens proclaimed over Mapuche territory in southern Chile.",
  },
  {
    id: "new-holland", name: "Dutch Brazil (New Holland)", era: "1630–1654", region: "Americas",
    flagUrl: fp("Flag_of_New_Holland.svg"), relatedCode: "BR",
    note: "A Dutch tricolor with the Dutch West India Company monogram, flown over the sugar colony the Dutch held in northeastern Brazil for a quarter-century.",
  },
  {
    id: "sons-of-liberty", name: "Sons of Liberty", era: "1765–1775", region: "Americas",
    flagUrl: fp("US_Sons_OfLiberty_9Stripes_Flag.svg"), relatedCode: "US",
    note: "Nine alternating vertical red and white stripes — the 'Rebellious Stripes' — representing the colonies at the 1765 Stamp Act Congress.",
  },
  {
    id: "grand-union", name: "Grand Union Flag", era: "1775–1777", region: "Americas",
    flagUrl: fp("Flag_of_the_United_States_(1776–1777).svg"), relatedCode: "US",
    note: "Thirteen red-white stripes with the British Union Jack in the canton — the de facto first US flag, flown before the stars replaced the Union Jack in 1777.",
  },
  // Europe — micro-states & revolutionary republics
  {
    id: "san-marco", name: "Republic of San Marco", era: "1848–1849", region: "Europe",
    flagUrl: fp("Flag_of_the_Republic_of_San_Marco.svg"), relatedCode: "IT",
    note: "Daniele Manin's revolutionary Venetian republic flew the Italian tricolor with the winged Lion of St Mark in the canton, until Austria retook Venice in 1849.",
  },
  {
    id: "cospaia", name: "Republic of Cospaia", era: "1440–1826", region: "Europe",
    flagUrl: fp("Flag_of_Cospaia.svg"), relatedCode: "IT",
    note: "A tiny accidental republic on the Tuscan–Papal border, created by a surveying error and famous for freely growing tobacco. Its flag is divided black and white diagonally.",
  },
  {
    id: "couto-misto", name: "Couto Misto", era: "medieval–1868", region: "Europe",
    flagUrl: fp("Flag_of_the_Couto_Misto.svg"), relatedCode: "ES",
    note: "A self-governing 'mixed county' of three villages on the Galicia–Portugal border with its own asylum rights, partitioned between Spain and Portugal in 1864.",
  },
  {
    id: "moresnet", name: "Neutral Moresnet", era: "1816–1920", region: "Europe",
    flagUrl: fp("Flag_of_Moresnet.svg"), relatedCode: "BE",
    note: "A neutral zinc-mining territory jointly administered by Prussia and the Netherlands (later Belgium) after the Congress of Vienna. Its flag is a black-white-blue tricolor.",
  },
  {
    id: "fiume", name: "Free State of Fiume", era: "1920–1924", region: "Europe",
    flagUrl: fp("Flag_of_the_Free_State_of_Fiume.svg"), relatedCode: "HR",
    note: "A short-lived independent city-state — modern Rijeka, Croatia — created by the Treaty of Rapallo and annexed by Italy in 1924. Its flag is a burgundy-yellow-blue tricolor.",
  },
  {
    id: "cretan-state", name: "Cretan State", era: "1898–1913", region: "Europe",
    flagUrl: fp("Flag_of_Cretan_State.svg"), relatedCode: "GR",
    note: "Autonomous Crete under Prince George of Greece; its blue flag with a white cross adds a red canton with a white star, symbolizing remaining Ottoman suzerainty.",
  },
  {
    id: "albania-1914", name: "Principality of Albania (1914)", era: "1914", region: "Europe",
    flagUrl: fp("Flag_of_the_Principality_of_Albania_(1914).svg"), relatedCode: "AL",
    note: "The brief principality under Prince Wilhelm of Wied: a deep-red field with a large black double-headed eagle, established just after Albanian independence.",
  },
  {
    id: "irish-republic-1916", name: "Irish Republic (1916)", era: "1916", region: "Europe",
    flagUrl: fp("Irish_Republic_Flag.svg"), relatedCode: "IE",
    note: "The green flag with gold lettering 'Irish Republic' flown over Dublin's General Post Office during the Easter Rising. The original captured banner survives in Dublin.",
  },
  {
    id: "batavian", name: "Batavian Republic", era: "1795–1806", region: "Europe",
    flagUrl: fp("Flag_of_the_navy_of_the_Batavian_Republic.svg"), relatedCode: "NL",
    note: "The Dutch revolutionary republic's flag placed a white canton on the tricolor enclosing a seated liberty maiden with a liberty-cap spear and the Dutch lion.",
  },
  {
    id: "north-caucasian-emirate", name: "North Caucasian Emirate", era: "1919–1920", region: "Europe",
    flagUrl: fp("Flag_of_North_Caucasian_Emirate.svg"), relatedCode: "RU",
    note: "A short-lived theocratic emirate under Uzun Hajji spanning Chechnya and Dagestan during the Russian Civil War; its green flag bears three white stars above a crescent.",
  },
  {
    id: "makhnovshchina", name: "Free Territory (Makhnovshchina)", era: "1918–1921", region: "Europe",
    flagUrl: fp("Махновское_знамя.svg"), relatedCode: "UA",
    note: "The Ukrainian anarchist movement under Nestor Makhno flew black banners reading 'Liberty or Death'. The popular skull-and-crossbones version is a debunked Soviet-propaganda myth.",
  },
  {
    id: "rif", name: "Republic of the Rif", era: "1921–1926", region: "Europe",
    flagUrl: fp("Flag_of_the_Republic_of_the_Rif.svg"), relatedCode: "MA",
    note: "Abd el-Krim's Berber state during the Rif War: a red field with a white diamond holding a green crescent and a six-pointed star.",
  },
  {
    id: "corsica-1736", name: "Kingdom of Corsica (1736)", era: "1736", region: "Europe",
    flagUrl: fp("Flag_of_Corsica_(before_1755).svg"), relatedCode: "FR",
    note: "The white Moor's-head flag of the brief kingdom created when German adventurer Theodore von Neuhoff was crowned King of Corsica for a few months in 1736.",
  },
  {
    id: "anglo-corsican", name: "Anglo-Corsican Kingdom", era: "1794–1796", region: "Europe",
    flagUrl: fp("Flag_of_the_Anglo-Corsican_Kingdom.svg"), relatedCode: "FR",
    note: "Combined the British Union Jack with the Corsican Moor's head during the brief union under George III in the French Revolutionary Wars.",
  },
  {
    id: "confederate-ireland", name: "Confederate Ireland", era: "1642–1652", region: "Europe",
    flagUrl: fp("Confederate_Ireland_battle_flag.svg"), relatedCode: "IE",
    note: "The Catholic Confederation based at Kilkenny flew a green field with a gold harp and a white canton bearing a red cross during the Eleven Years' War.",
  },
  {
    id: "septinsular", name: "Septinsular Republic", era: "1800–1807", region: "Europe",
    flagUrl: fp("Flag_of_the_Septinsular_Republic.svg"), relatedCode: "GR",
    note: "A blue field with the golden Lion of St Mark holding seven arrows for the seven Ionian islands — the first autonomous Greek state of the modern era.",
  },
  {
    id: "pindus", name: "Principality of Pindus", era: "1941–1944", region: "Europe",
    flagUrl: fp("Flag_of_the_Principality_of_Pindus_and_Voivodship_of_Macedonia.svg"), relatedCode: "GR",
    note: "A green-white-blue flag tied to a WWII Axis-sponsored Aromanian (Vlach) state in the Pindus mountains, whose actual existence is disputed by historians.",
  },
  {
    id: "ancona", name: "Anconine Republic", era: "1797–1798", region: "Europe",
    flagUrl: fp("Flag_of_the_Repubblica_Anconitana.svg"), relatedCode: "IT",
    note: "A Napoleonic sister republic around the Adriatic port of Ancona, flying a light blue–yellow–red tricolor with the republic's name lettered across it.",
  },
  {
    id: "parthenopean", name: "Parthenopean Republic", era: "1799", region: "Europe",
    flagUrl: fp("Flag_of_Parthenopaean_Republic_(1799).svg"), relatedCode: "IT",
    note: "A short-lived Neapolitan sister republic that joined French blue with the yellow and red of Naples, crushed within months by a royalist peasant army.",
  },
  {
    id: "rhodanic", name: "Rhodanic Republic", era: "1802–1810", region: "Europe",
    flagUrl: fp("Flag_of_the_Rhodanic_Republic.svg"), relatedCode: "CH",
    note: "The Napoleonic-era republic of Valais flew a vertical red-and-white field with stars for its districts, before being absorbed directly into France.",
  },
  {
    id: "cispadane", name: "Cispadane Republic", era: "1796–1797", region: "Europe",
    flagUrl: fp("Flag_of_the_Repubblica_Cispadana.svg"),
    note: "The first Italian horizontal red-white-green tricolor, with a central quiver of four arrows. Adopted on 7 January 1797, it is commemorated as Italy's Tricolour Day.",
  },
  // Asia & Oceania — empires, sultanates & island kingdoms
  {
    id: "korean-empire", name: "Korean Empire", era: "1897–1910", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Korea_(1882–1910).svg"), relatedCode: "KR",
    note: "The Taegukgi — white field with a blue-red taegeuk and four black trigrams — was adopted in 1883 and flew over the Joseon kingdom and the Korean Empire until Japan annexed Korea in 1910.",
  },
  {
    id: "sikh-empire", name: "Sikh Empire", era: "1799–1849", region: "Asia & Oceania",
    flagUrl: fp("Sikh_Empire_flag.svg"), relatedCode: "IN",
    note: "The triangular saffron Nishan Sahib of Ranjit Singh's Punjab empire, which united the Sikh misls and held the Khyber Pass against Afghan invasion.",
  },
  {
    id: "kandy", name: "Kingdom of Kandy", era: "1469–1815", region: "Asia & Oceania",
    flagUrl: fp("King_of_Kandy.svg"),
    note: "A maroon field bordered in gold with a golden lion holding a kastane sword. The royal standard of Sri Lanka's last independent kingdom became the basis of the modern flag.",
  },
  {
    id: "majapahit", name: "Majapahit Empire", era: "1293–1527", region: "Asia & Oceania",
    flagUrl: fp("Naval_flag_of_Majapahit_Kingdom.svg"), relatedCode: "ID",
    note: "Alternating red-and-white stripes flown by the great Javanese maritime empire — the ancestral colors that became modern Indonesia's flag.",
  },
  {
    id: "jaffna", name: "Jaffna Kingdom", era: "1215–1619", region: "Asia & Oceania",
    flagUrl: fp("Jaffna_Kingdom.svg"), relatedCode: "LK",
    note: "The saffron flag of the Aryacakravarti kings of northern Sri Lanka, bearing the sacred bull Nandi, a crescent and sun, conch, and parasol.",
  },
  {
    id: "formosa", name: "Republic of Formosa", era: "1895", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Republic_of_Formosa_(1895).svg"),
    note: "The 'Blue Ground Yellow Tiger Flag' of a republic that lasted from May to October 1895, declared on Taiwan to resist the Japanese takeover after the First Sino-Japanese War.",
  },
  {
    id: "ryukyu", name: "Kingdom of Ryukyu", era: "1429–1879", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Ryukyu_Kingdom.svg"), relatedCode: "JP",
    note: "A white field with the Shō dynasty's three-comma mitsudomoe swirl. The independent Okinawan trading kingdom was annexed by Japan in 1879.",
  },
  {
    id: "aceh", name: "Sultanate of Aceh", era: "1496–1903", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Aceh_Sultanate.svg"), relatedCode: "ID",
    note: "The Alam Peudeueng or 'Sword Standard' — a dark-red field with a white crescent, star, and sword, the crescent reflecting the sultanate's Ottoman alliance against the Portuguese.",
  },
  {
    id: "mataram", name: "Mataram Sultanate", era: "1587–1755", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Mataram_Sultanate.svg"), relatedCode: "ID",
    note: "The greatest Islamic kingdom of central Java, which fought the Dutch East India Company for decades before being split into the Yogyakarta and Surakarta courts.",
  },
  {
    id: "dutch-east-indies", name: "Dutch East India Company", era: "1602–1799", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Dutch_East_India_Company.svg"), relatedCode: "ID",
    note: "The red-white-blue tricolor with the 'VOC' monogram — the flag of the world's first multinational corporation, which ruled much of the Indies before the Dutch state took over.",
  },
  {
    id: "state-of-burma", name: "State of Burma (1943)", era: "1943–1945", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_State_of_Burma_(1943–1945).svg"), relatedCode: "MM",
    note: "A yellow-green-red triband with a central peacock disk, flag of Ba Maw's Japanese-sponsored wartime state.",
  },
  {
    id: "nejd", name: "Sultanate of Nejd", era: "1921–1926", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Sultanate_of_Nejd.svg"), relatedCode: "SA",
    note: "A green field with a white crescent, flown by the Al Saud state in central Arabia just before it conquered the Hejaz and became the Kingdom of Saudi Arabia.",
  },
  {
    id: "bora-bora", name: "Kingdom of Bora Bora", era: "1837–1842", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Kingdom_of_Bora_Bora_(1837-1842).svg"),
    note: "Red-and-white stripes with a canton of white stars, flown by the 19th-century Polynesian island kingdom before French annexation.",
  },
  // Africa & Middle East — kingdoms, Boer republics & Libyan states
  {
    id: "merina", name: "Merina Kingdom (Madagascar)", era: "1810–1896", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_the_Merina_Kingdom.svg"), relatedCode: "MG",
    note: "The Merina rulers of highland Madagascar flew white-and-red flags, the personal colors of King Radama I. These royal colors survive in Madagascar's modern flag.",
  },
  {
    id: "moheli", name: "Mohéli", era: "1997–1998", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Mohéli.svg"), relatedCode: "KM",
    note: "The small island declared independence from the Comoros in 1997; its yellow-and-red flag recalls the banner of 19th-century Queen Djoumbé Fatima.",
  },
  {
    id: "natalia", name: "Natalia Republic", era: "1839–1843", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Natalia_Republic.svg"), relatedCode: "ZA",
    note: "A short-lived Voortrekker republic in present-day KwaZulu-Natal, annexed by Britain in 1843; its flag was a Dutch-style design with a white hoist triangle.",
  },
  {
    id: "far", name: "Federation of Arab Republics", era: "1972–1977", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_the_Federation_of_Arab_Republics.svg"),
    note: "The red-white-black Arab Liberation tricolor with a golden Hawk of Quraish, flown simultaneously as the national flag of all three members — Egypt, Libya, and Syria.",
  },
  {
    id: "kingdom-libya", name: "Kingdom of Libya", era: "1951–1969", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Libya_(1951–1969).svg"),
    note: "A red-black-green triband with a double-height black band bearing a white crescent and star. Designed under King Idris and triumphantly restored after Gaddafi fell in 2011.",
  },
  {
    id: "jamahiriya", name: "Libyan Arab Jamahiriya", era: "1977–2011", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Libya_(1977–2011).svg"),
    note: "A plain solid green field — the only single-color national flag in modern history. Gaddafi adopted it after Egypt's peace with Israel broke up the Federation of Arab Republics.",
  },
  {
    id: "upper-volta", name: "Republic of Upper Volta", era: "1958–1984", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Upper_Volta.svg"),
    note: "A black-white-red tricolor for the Black, White, and Red Volta rivers, flown until Thomas Sankara renamed the country Burkina Faso in 1984.",
  },
  {
    id: "dahomey-kingdom", name: "Kingdom of Dahomey", era: "1600–1904", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Ghezo_of_Dahomey.svg"), relatedCode: "BJ",
    note: "A yellow field with a wide red border and a crowned white elephant, attributed to King Ghezo of the West African kingdom famed for its all-female Dahomey Amazon regiment.",
  },
  {
    id: "cyrenaica", name: "Emirate of Cyrenaica", era: "1949–1951", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Cyrenaica.svg"), relatedCode: "LY",
    note: "A solid black field with a white crescent and star, adopted by Emir Idris. With red and green stripes added, it became the basis of the Kingdom of Libya's flag.",
  },
  {
    id: "french-sudan", name: "French Sudan", era: "1958–1959", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_French_Sudan_(1958–1959).svg"), relatedCode: "ML",
    note: "A green-yellow-red tricolor with a black Kanaga (a Dogon stick-figure) on the center stripe. The Kanaga was dropped in 1961, leaving the present plain Mali flag.",
  },

  // ── Wave 4: deep space ──────────────────────────────────────────────────────
  // Middle East kingdoms
  {
    id: "riyadh-emirate", name: "Emirate of Riyadh", era: "1824–1891", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_the_First_and_Second_Saudi_State.svg"), relatedCode: "SA",
    note: "The plain green banner with the white Arabic shahada served both the First and Second Saudi States ruled from Riyadh, the forerunners of modern Saudi Arabia.",
  },
  {
    id: "hejaz", name: "Kingdom of Hejaz", era: "1916–1925", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Hejaz_(1917).svg"), relatedCode: "SA",
    note: "Sharif Hussein's black-green-white tricolor with a red hoist triangle was the flag of the Arab Revolt, the template for nearly every later pan-Arab flag.",
  },
  {
    id: "transjordan", name: "Emirate of Transjordan", era: "1921–1946", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_the_Emirate_of_Transjordan.svg"), relatedCode: "JO",
    note: "Black-white-green bands with a red chevron and a white seven-pointed star for the seven verses of Al-Fatiha — the direct precursor of the modern flag of Jordan.",
  },
  {
    id: "yemen-mutawakkilite", name: "Mutawakkilite Kingdom of Yemen", era: "1918–1962", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_the_Mutawakkilite_Kingdom_of_Yemen.svg"), relatedCode: "YE",
    note: "A red field with the white sword of Ali flanked by five white stars, flown by the Zaydi imams who ruled North Yemen until a 1962 coup founded a republic.",
  },
  {
    id: "ottoman-egypt", name: "Ottoman Egypt (Khedivate)", era: "1844–1867", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Egypt_(1844–1867).svg"), relatedCode: "EG",
    note: "A red field with three white crescents each cradling a star, flown under Muhammad Ali's dynasty while Egypt was an autonomous Ottoman province.",
  },
  // Europe — deep space
  {
    id: "ragusa", name: "Republic of Ragusa", era: "1358–1808", region: "Europe",
    flagUrl: fp("St._Blaise_-_National_Flag_of_the_Ragusan_Republic.svg"), relatedCode: "HR",
    note: "The Adriatic merchant republic of Dubrovnik flew a white flag bearing St Blaise, its patron, holding a model of the walled city. Its motto was 'Libertas'.",
  },
  {
    id: "county-nice", name: "County of Nice", era: "1388–1860", region: "Europe",
    flagUrl: fp("Flag_of_the_County_of_Nice.svg"), relatedCode: "FR",
    note: "A red eagle perched on three green hills on white — the arms of Nice during its centuries under the House of Savoy, before France annexed it in 1860.",
  },
  {
    id: "styria", name: "Duchy of Styria", era: "1180–1918", region: "Europe",
    flagUrl: fp("Flag_of_Styria.svg"), relatedCode: "AT",
    note: "The white-over-green Landesfarben of the Habsburg duchy; its arms bear a white fire-breathing panther. Styria is now split between Austria and Slovenia.",
  },
  {
    id: "carinthia", name: "Duchy of Carinthia", era: "976–1918", region: "Europe",
    flagUrl: fp("Flag_of_Carinthia_until_1946.svg"), relatedCode: "AT",
    note: "The yellow-red-white crown-land flag of one of the oldest duchies of the Holy Roman Empire, whose arms show three black lions on gold.",
  },
  {
    id: "gorizia", name: "County of Gorizia (Görz)", era: "1500–1918", region: "Europe",
    flagUrl: fp("Flag_of_Görz_und_Gradisca.svg"), relatedCode: "SI",
    note: "A white-and-red bicolour for the Habsburg princely county on the Adriatic frontier, whose arms feature a gold lion. Its land is now split between Italy and Slovenia.",
  },
  {
    id: "lordship-ireland", name: "Lordship of Ireland", era: "1171–1541", region: "Europe",
    flagUrl: fp("Banner_of_the_Lordship_of_Ireland.svg"), relatedCode: "IE",
    note: "Three gold crowns on light blue with a white border, the banner of the medieval English lordship before the gold-harp arms replaced it under Henry VIII.",
  },
  {
    id: "kingdom-mann", name: "Kingdom of Mann", era: "1079–1265", region: "Europe",
    flagUrl: fp("Flag_of_the_Isle_of_Man.svg"), relatedCode: "GB",
    note: "The gold three-legged triskelion on red descends from the Norse-Gaelic Kingdom of Mann and the Isles, which once ruled the Irish Sea from the Isle of Man.",
  },
  {
    id: "mingrelia", name: "Principality of Mingrelia", era: "1557–1867", region: "Europe",
    flagUrl: fp("Flag_of_the_Principality_of_Mingrelia.svg"), relatedCode: "GE",
    note: "A white flag with a St George crest, flown by the Dadiani princes of western Georgia until the principality was absorbed by the Russian Empire.",
  },
  {
    id: "samos", name: "Principality of Samos", era: "1834–1912", region: "Europe",
    flagUrl: fp("Flag_of_the_Principality_of_Samos_(1834–1912).svg"), relatedCode: "GR",
    note: "A cross flag with two red and two blue quarters, the red marking Ottoman suzerainty over this autonomous Greek island principality, which united with Greece in 1912.",
  },
  {
    id: "monaco-lozenge", name: "Monaco (Grimaldi lozenge banner)", era: "1339–1881", region: "Europe",
    flagUrl: fp("Lozenge_flag_of_Monaco.svg"), relatedCode: "MC",
    note: "The Grimaldi armorial banner of red-and-white lozenges, the dynasty's historic flag before Monaco adopted its plain red-over-white bicolour in 1881.",
  },
  // Asia & Oceania — Indonesian sultanates & Indian states
  {
    id: "gowa", name: "Sultanate of Gowa", era: "1300–1946", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Sultanate_of_Gowa.svg"), relatedCode: "ID",
    note: "The dominant Makassarese power of South Sulawesi flew a deep-red field with a white canton and a kris dagger, until it fell to the Dutch after the Makassar War.",
  },
  {
    id: "ternate", name: "Sultanate of Ternate", era: "1257–1914", region: "Asia & Oceania",
    flagUrl: fp("Bendera_Ternate_-_Almulk_Buldan_Ternate.svg"), relatedCode: "ID",
    note: "A yellow flag with a black ring reading 'the realm of Ternate'. This Moluccan clove kingdom was one of the original Spice Islands powers fought over by Europe.",
  },
  {
    id: "tidore", name: "Sultanate of Tidore", era: "1081–1967", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Sultanate_of_Tidore.png"), relatedCode: "ID",
    note: "Ternate's great spice-trade rival in Maluku, whose flag carried Arabic inscriptions. At its height Tidore claimed influence as far as western New Guinea.",
  },
  {
    id: "banten", name: "Sultanate of Banten", era: "1527–1813", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Sultanate_of_Banten.svg"), relatedCode: "ID",
    note: "A white field with two crossed golden swords, flown by the wealthy pepper-trading Islamic sultanate of western Java until the Dutch abolished it.",
  },
  {
    id: "hyderabad", name: "Hyderabad State", era: "1724–1948", region: "Asia & Oceania",
    flagUrl: fp("Asafia_flag_of_Hyderabad_State.svg"), relatedCode: "IN",
    note: "The yellow 'Asafia' flag of the fabulously wealthy Nizams, the largest princely state of British India, annexed by India in 1948.",
  },
  {
    id: "jammu-kashmir", name: "Princely State of Jammu and Kashmir", era: "1846–1947", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Princely_State_of_Jammu_and_Kashmir_(1836-1936).svg"), relatedCode: "IN",
    note: "A red field with a mountain range and a hand (panja) symbol, flown by the Dogra maharajas whose 1947 accession sparked the still-unresolved Kashmir dispute.",
  },
  {
    id: "travancore", name: "Princely State of Travancore", era: "1729–1949", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Kingdom_of_Travancore.svg"), relatedCode: "IN",
    note: "A red field with a white conch shell, the sankha of Vishnu and the dynastic emblem of the south Indian kingdom famed for its temples and backwaters.",
  },
  {
    id: "maratha", name: "Maratha Empire", era: "1674–1818", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Maratha_Empire.svg"), relatedCode: "IN",
    note: "The saffron swallow-tailed 'Bhagwa Dhwaj' of Shivaji's empire, which at its peak ruled most of the Indian subcontinent before the British.",
  },
  // Americas — deep space
  {
    id: "madawaska", name: "Republic of Madawaska", era: "1827", region: "Americas",
    flagUrl: fp("Flag_of_Madawaska.svg"), relatedCode: "CA",
    note: "A white field with an eagle and a ring of red stars, emblem of the self-declared 'republic' in the disputed Maine–New Brunswick borderland (the design itself is a later commemorative one).",
  },
  {
    id: "muskogee", name: "State of Muskogee", era: "1799–1803", region: "Americas",
    flagUrl: fp("State_of_Muskogee_(Florida,_1799-1803).svg"), relatedCode: "US",
    note: "A red field with a blue canton and sunburst, flown by the Creek–Seminole state that adventurer William Augustus Bowles tried to build in Spanish Florida.",
  },
  {
    id: "lower-california", name: "Republic of Lower California", era: "1853–1854", region: "Americas",
    flagUrl: fp("Flag_of_the_Republic_of_Lower_California.svg"), relatedCode: "MX",
    note: "The filibuster republic American mercenary William Walker declared in Baja California; its two stars stood for Baja California and Sonora.",
  },
  {
    id: "sonora-republic", name: "Republic of Sonora", era: "1854", region: "Americas",
    flagUrl: fp("Flag_of_the_Republic_of_Sonora.svg"), relatedCode: "MX",
    note: "Walker's renamed two-state mercenary republic. He was driven out of Mexico within months — and was later executed in Honduras after a similar scheme.",
  },
  {
    id: "piratini", name: "Riograndense Republic", era: "1836–1845", region: "Americas",
    flagUrl: fp("Flag_of_Piratini_Republic.svg"), relatedCode: "BR",
    note: "The breakaway republic of the decade-long Farroupilha (Ragamuffin) War in southern Brazil — three diagonal stripes of green, red, and yellow.",
  },
  {
    id: "juliana", name: "Republic of Juliana", era: "1839", region: "Americas",
    flagUrl: fp("Flag_of_República_Juliana_(1839).svg"), relatedCode: "BR",
    note: "A short-lived republic proclaimed at Laguna in Santa Catarina during the Ragamuffin War, allied with the Riograndense rebels. The Italian revolutionary Giuseppe Garibaldi fought for it.",
  },
  {
    id: "equator-confederation", name: "Confederation of the Equator", era: "1824", region: "Americas",
    flagUrl: fp("1824_Flag.svg"), relatedCode: "BR",
    note: "A short-lived secessionist confederation of northeastern Brazilian provinces revolting against the new emperor; a sky-blue field with a shield reading 'Confederação'.",
  },
  {
    id: "lares", name: "Republic of Puerto Rico (Lares)", era: "1868", region: "Americas",
    flagUrl: fp("Flag_of_Lares.svg"),
    note: "The Grito de Lares revolutionary flag — a white cross dividing blue and red quarters with a white star — raised in the brief 1868 uprising against Spanish rule.",
  },
  {
    id: "acre", name: "Republic of Acre", era: "1899–1903", region: "Americas",
    flagUrl: fp("Bandeira_do_Acre.svg"), relatedCode: "BR",
    note: "Rubber-tappers in the Bolivia–Brazil borderland declared an independent republic over the lucrative Acre territory; its diagonal yellow-green flag survives as the Brazilian state flag.",
  },
  {
    id: "buenos-aires-state", name: "State of Buenos Aires", era: "1852–1861", region: "Americas",
    flagUrl: fp("Flag_of_the_State_of_Buenos_Aires.svg"), relatedCode: "AR",
    note: "Blue-white-blue with a Sun of May and four red liberty caps, flown while Buenos Aires seceded from the rest of the Argentine Confederation for nearly a decade.",
  },
  {
    id: "entre-rios", name: "Republic of Entre Ríos", era: "1820–1821", region: "Americas",
    flagUrl: fp("Flag_of_Artigas.svg"), relatedCode: "AR",
    note: "Warlord Francisco Ramírez's federalist republic flew the blue-white-blue flag of Artigas, crossed by a red diagonal bar for the federal cause.",
  },
  // Oceania — Polynesian & Pacific kingdoms
  {
    id: "rarotonga", name: "Kingdom of Rarotonga", era: "1858–1888", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Rarotonga_1858-1888.svg"),
    note: "Red-white-red with three blue stars, flown by the Cook Islands kingdom before it became a British protectorate, then part of New Zealand.",
  },
  {
    id: "raiatea", name: "Kingdom of Raiatea", era: "1880–1888", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Kingdom_of_Raiatea_(1880-1888).svg"),
    note: "A red-and-white striped flag with a small French tricolor canton, from the Leeward Islands kingdom that resisted French annexation for years.",
  },
  {
    id: "tavolara", name: "Kingdom of Tavolara", era: "1836–1934", region: "Europe",
    flagUrl: fp("Flag_of_Tavolara.svg"), relatedCode: "IT",
    note: "A tiny island kingdom off Sardinia ruled by the Bertoleoni family, sometimes called the smallest kingdom in the world. Its flag bears a gold star beneath a crown.",
  },
  {
    id: "tubuai", name: "Kingdom of Tubuai", era: "1819–1881", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Tubuai.svg"),
    note: "A white field with a red cross and four blue stars, the historic flag of a kingdom in the Austral Islands of the South Pacific.",
  },
  {
    id: "rapa", name: "Kingdom of Rapa Iti", era: "1867–1887", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Rapa.svg"),
    note: "A remote Polynesian island kingdom whose flag carried a blue star beneath a crown with a French canton, before France absorbed it.",
  },
  {
    id: "mangareva", name: "Kingdom of Mangareva", era: "1832–1844", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Gambier_Islands.svg"),
    note: "The Gambier Islands kingdom flew a banded flag with corner stars, attributed to the French explorer Dumont d'Urville, before becoming a French protectorate.",
  },
  {
    id: "north-solomons", name: "Republic of the North Solomons", era: "1975", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Bougainville.svg"), relatedCode: "PG",
    note: "Bougainville's secessionists raised this blue flag with an 'upe' headdress and kapkap disc in 1975, days before Papua New Guinea's independence — the start of a long struggle.",
  },
  {
    id: "kingdom-fiji", name: "Kingdom of Fiji", era: "1871–1874", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Kingdom_of_Fiji_(1871-1874).svg"), relatedCode: "FJ",
    note: "King Cakobau's united Kingdom of Fiji flew a blue-and-white flag with a crowned shield, until he ceded the islands to Britain in 1874.",
  },
  {
    id: "ainu", name: "Ainu", era: "1973", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Ainu.svg"), relatedCode: "JP",
    note: "The flag of the indigenous Ainu of Hokkaido, designed in 1973: a blue field for sky and sea, a white wave for snow, and a red arrow for the aconite hunting poison.",
  },
  // Asia — empires, sultanates & revolutionary states
  {
    id: "maguindanao", name: "Sultanate of Maguindanao", era: "1520–1888", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Maguindanao.svg"), relatedCode: "PH",
    note: "A powerful Muslim sultanate of Mindanao that resisted Spanish conquest for centuries, flying a plain yellow banner — the royal color.",
  },
  {
    id: "taiping", name: "Taiping Heavenly Kingdom", era: "1851–1864", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Taiping_Heavenly_Kingdom.jpg"), relatedCode: "CN",
    note: "The vast quasi-Christian rebel kingdom whose civil war against the Qing killed an estimated 20 million people. It flew many ornate banners rather than one fixed flag.",
  },
  {
    id: "lanfang", name: "Lanfang Republic", era: "1777–1884", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Lanfang_Republic.svg"), relatedCode: "ID",
    note: "A Hakka Chinese mining state on Borneo, sometimes called one of Asia's first republics, with elected leaders — until the Dutch absorbed it.",
  },
  {
    id: "sedang", name: "Kingdom of Sedang", era: "1888–1890", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Sedang.svg"), relatedCode: "VN",
    note: "A blue flag with a white cross and red star, decreed by the French adventurer Charles-Marie David de Mayréna, who crowned himself King Marie I in the Vietnamese highlands.",
  },
  {
    id: "biak-na-bato", name: "Republic of Biak-na-Bato", era: "1897", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Biak-na-Bato.svg"), relatedCode: "PH",
    note: "Emilio Aguinaldo's short-lived 1897 republic in a mountain stronghold, flying a blue-over-red flag with a white triangle and sun — a step toward Philippine independence.",
  },
  {
    id: "katipunan", name: "Katipunan", era: "1896–1897", region: "Asia & Oceania",
    flagUrl: fp("Philippine_revolution_flag_kkk1.svg"), relatedCode: "PH",
    note: "The red banner with three white K's of the secret revolutionary society that launched the 1896 Philippine Revolution against Spain.",
  },
  {
    id: "azad-hind", name: "Azad Hind (Free India)", era: "1943–1945", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Indian_Legion.svg"), relatedCode: "IN",
    note: "Subhas Chandra Bose's Japanese-allied Provisional Government of Free India flew a saffron-white-green tricolor with a springing tiger.",
  },
  {
    id: "patani-pulo", name: "Patani (PULO)", era: "1968–1989", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Pattani_United_Liberation_Organisation_(1968-1989).svg"), relatedCode: "TH",
    note: "The banner of the movement seeking independence for the historically Malay-Muslim Patani region of southern Thailand: red-white stripes with a crescent and star.",
  },
  {
    id: "champasak", name: "Kingdom of Champasak", era: "1713–1947", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Kingdom_of_Champasak_(1713-1947).svg"), relatedCode: "LA",
    note: "A blue flag with a white multi-tiered parasol, flown by one of the three Lao kingdoms before they were merged into modern Laos.",
  },
  {
    id: "luang-prabang", name: "Kingdom of Luang Prabang", era: "1707–1893", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Kingdom_of_Luang_Phrabang_(1707-1893).svg"), relatedCode: "LA",
    note: "The royal Lao kingdom flew a red flag with the three-headed white elephant Erawan beneath a parasol — the same elephant later used by the Kingdom of Laos.",
  },
  {
    id: "delhi-sultanate", name: "Delhi Sultanate", era: "1206–1526", region: "Asia & Oceania",
    flagUrl: fp("Delhi_Sultanate_Flag.svg"), relatedCode: "IN",
    note: "The series of Muslim dynasties that ruled much of medieval India from Delhi, repelling the Mongols, before the Mughals supplanted them.",
  },
  {
    id: "goryeo", name: "Goryeo Dynasty", era: "918–1392", region: "Asia & Oceania",
    flagUrl: fp("Royal_flag_of_Goryeo_(Bong-gi).svg"), relatedCode: "KR",
    note: "The medieval Korean dynasty that gave the country its English name. This reconstructed royal phoenix banner stands in for an era that used no national flag.",
  },
  // Europe — Napoleonic, Baltic & Russian Civil War states
  {
    id: "courland", name: "Duchy of Courland and Semigallia", era: "1561–1795", region: "Europe",
    flagUrl: fp("Flag_of_Courland_(state).svg"), relatedCode: "LV",
    note: "A Polish-Lithuanian vassal duchy in modern Latvia that — astonishingly — founded colonies on Tobago in the Caribbean and an island in the Gambia in the 1650s.",
  },
  {
    id: "cossack-hetmanate", name: "Cossack Hetmanate", era: "1649–1764", region: "Europe",
    flagUrl: fp("Flag_of_the_Cossack_Hetmanat.svg"), relatedCode: "UA",
    note: "The Cossack state of central Ukraine, founded by Bohdan Khmelnytsky's uprising, flew a crimson banner with a Cossack bearing a musket.",
  },
  {
    id: "far-eastern-republic", name: "Far Eastern Republic", era: "1920–1922", region: "Europe",
    flagUrl: fp("Flag_of_Far_Eastern_Republic.svg"), relatedCode: "RU",
    note: "A nominally independent buffer state the Bolsheviks set up across Siberia to avoid war with Japan; once the Japanese withdrew, it was absorbed into Soviet Russia.",
  },
  {
    id: "donets-krivoy-rog", name: "Donets–Krivoy Rog Soviet Republic", era: "1918", region: "Europe",
    flagUrl: fp("Flag_of_the_Donets-Krivoy_Rog_Soviet_Republic.svg"), relatedCode: "UA",
    note: "A short-lived Bolshevik republic in the Donbas industrial basin that tried to stay part of Soviet Russia rather than join Ukraine — dissolved within months.",
  },
  {
    id: "abkhazia-ssr", name: "SSR of Abkhazia", era: "1921–1931", region: "Europe",
    flagUrl: fp("Flag_of_the_SSR_Abkhazia.svg"), relatedCode: "GE",
    note: "For a decade Abkhazia was a full Soviet republic with a hammer-and-sickle flag, before Stalin downgraded it to an autonomous republic within Georgia.",
  },
  {
    id: "kingdom-finland", name: "Kingdom of Finland", era: "1918", region: "Europe",
    flagUrl: fp("Flag_of_Finland_1918-1920_(State).svg"), relatedCode: "FI",
    note: "After independence Finland briefly elected a German prince as king and designed lion-bearing royal flags — but Germany's defeat in WWI ended the monarchy before he ever arrived.",
  },
  {
    id: "elba", name: "Principality of Elba", era: "1814–1815", region: "Europe",
    flagUrl: fp("Flag_of_the_Princedom_of_Elba.svg"), relatedCode: "IT",
    note: "The tiny Mediterranean island Napoleon was given to rule during his first exile; he designed its white flag with a red bar and three gold bees before escaping to retake France.",
  },
  {
    id: "etruria", name: "Kingdom of Etruria", era: "1801–1807", region: "Europe",
    flagUrl: fp("Flag_of_the_Kingdom_of_Etruria.svg"), relatedCode: "IT",
    note: "A short-lived Napoleonic client kingdom in Tuscany under the Bourbon-Parma dynasty, before Napoleon annexed it directly into France.",
  },
  // Africa — kingdoms & Boer micro-republics
  {
    id: "adal", name: "Sultanate of Adal", era: "1415–1577", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Adal_Sultanate.svg"), relatedCode: "SO",
    note: "A powerful medieval Muslim sultanate of the Horn of Africa that waged a devastating 16th-century war against the Christian Ethiopian Empire.",
  },
  {
    id: "stellaland", name: "Stellaland", era: "1882–1885", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Stellaland.svg"), relatedCode: "ZA",
    note: "A Boer republic — its name means 'star land' for a comet seen at its founding — with a green flag and a single white star, soon annexed into British Bechuanaland.",
  },
  {
    id: "goshen", name: "State of Goshen", era: "1882–1883", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_the_Republic_of_Goshen.svg"), relatedCode: "ZA",
    note: "A tiny Boer republic near the Transvaal border, which briefly merged with neighbouring Stellaland before Britain absorbed both.",
  },
  {
    id: "nieuwe-republiek", name: "Nieuwe Republiek", era: "1884–1888", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Nieuwe_Republiek.svg"), relatedCode: "ZA",
    note: "A Boer 'New Republic' around Vryheid, carved out of Zulu land as a reward for backing a claimant to the Zulu throne, before joining the Transvaal.",
  },
  {
    id: "sanwi", name: "Kingdom of Sanwi", era: "1740–present", region: "Africa & Middle East",
    flagUrl: fp("Kingdom_of_Sanwi_flag.svg"), relatedCode: "CI",
    note: "A traditional Akan kingdom in southeastern Côte d'Ivoire that has twice attempted to secede from the modern republic.",
  },
  {
    id: "mahdist", name: "Mahdist State", era: "1885–1899", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_the_Mahdi_movement_in_Sudan.svg"), relatedCode: "SD",
    note: "The Islamic state founded by the self-proclaimed Mahdi after his forces stormed Khartoum and killed General Gordon; its banners were covered in Arabic calligraphy.",
  },
  {
    id: "loango", name: "Kingdom of Loango", era: "1550–1883", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_the_Kingdom_of_Loango.svg"), relatedCode: "CG",
    note: "A coastal trading kingdom north of the Congo River, famed for its cloth and ivory, before it fell under French control.",
  },
  {
    id: "harar", name: "Emirate of Harar", era: "1647–1887", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Emirate_of_Harar.svg"), relatedCode: "ET",
    note: "An independent walled city-state in eastern Ethiopia, a revered centre of Islamic learning, until Emperor Menelik II conquered it in 1887. Its flag bears crossed swords.",
  },
  // Wave 7+: Indonesian sultanates, Balinese & Indian princely states
  {
    id: "siak", name: "Sultanate of Siak Sri Indrapura", era: "1723–1945", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Sultanate_of_Siak_Sri_Indrapura.svg"), relatedCode: "ID",
    note: "A Malay sultanate on Sumatra's east coast that grew rich on trade, flying black and yellow bands with a red hoist crest, until it joined the new Indonesian republic in 1945.",
  },
  {
    id: "pontianak", name: "Sultanate of Pontianak", era: "1771–1950", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Pontianak_Sultanate.svg"), relatedCode: "ID",
    note: "A Borneo sultanate founded at the mouth of the Kapuas River by an Arab sayyid, flying a yellow flag with a green crescent and star.",
  },
  {
    id: "bulungan", name: "Sultanate of Bulungan", era: "1731–1959", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Bulungan_Sultanate.svg"), relatedCode: "ID",
    note: "A North Kalimantan coastal sultanate with a simple yellow-over-blue flag, dissolved after a violent 1950s clash with the Indonesian republic.",
  },
  {
    id: "karangasem", name: "Kingdom of Karangasem", era: "1660–1908", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Kingdom_of_Karangasem.svg"), relatedCode: "ID",
    note: "A Balinese kingdom in the island's east that once ruled neighbouring Lombok, before falling to the Dutch in the early 1900s.",
  },
  {
    id: "buton", name: "Sultanate of Buton", era: "1332–1960", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Lordship_of_Butung_(Buton).svg"), relatedCode: "ID",
    note: "A long-lived island sultanate off southeast Sulawesi, strategically placed on the spice routes, with a distinctive constitution limiting the sultan's power.",
  },
  {
    id: "baroda", name: "Princely State of Baroda", era: "1721–1949", region: "Asia & Oceania",
    flagUrl: fp("Baroda_flag.svg"), relatedCode: "IN",
    note: "One of the wealthiest princely states of British India, ruled by the Maratha Gaekwad dynasty and famed for a pearl carpet and the gem-studded Star of the South diamond.",
  },
  {
    id: "gwalior", name: "Princely State of Gwalior", era: "1731–1948", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Gwalior_(State).svg"), relatedCode: "IN",
    note: "The Scindia dynasty's powerful Maratha state in central India, whose flag bears a sun flanked by cobras; its great hilltop fort guarded the route to the Deccan.",
  },
  {
    id: "indore", name: "Princely State of Indore", era: "1731–1948", region: "Asia & Oceania",
    flagUrl: fp("Indore_Flag.svg"), relatedCode: "IN",
    note: "The Holkar dynasty's Maratha state, founded by the remarkable queen-regent Ahilyabai Holkar, who built temples and rest-houses across India.",
  },
  // Wave 7+: Balkan, Soviet-era, Italian & Pacific states
  {
    id: "suvadiva", name: "United Suvadive Republic", era: "1959–1963", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_United_Suvadive_Republic.svg"), relatedCode: "MV",
    note: "The three southern atolls of the Maldives broke away under Abdullah Afeef for four years; their blue-green-red flag carried a crescent and three stars before the rebellion collapsed.",
  },
  {
    id: "huahine", name: "Kingdom of Huahine", era: "1846–1895", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Huahine.svg"),
    note: "A Society Islands kingdom that resisted France longer than its neighbours; its red-and-white flag with a French canton reflected an uneasy protectorate before annexation.",
  },
  {
    id: "naxos", name: "Duchy of the Archipelago", era: "1207–1579", region: "Europe",
    flagUrl: fp("Coat_of_Arms_of_the_House_of_Sanudo.svg"), relatedCode: "GR",
    note: "A Venetian crusader state ruling the Cyclades from Naxos, under the Sanudo dynasty whose white banner bore a red cross and four black crosslets.",
  },
  {
    id: "illyria", name: "Kingdom of Illyria", era: "1816–1849", region: "Europe",
    flagUrl: fp("Flag_of_the_Kingdom_of_Illyria.svg"), relatedCode: "SI",
    note: "An Austrian crown land carved from former Napoleonic territory along the Adriatic, covering parts of modern Slovenia, Croatia, and Austria.",
  },
  {
    id: "central-albania", name: "Republic of Central Albania", era: "1913–1914", region: "Europe",
    flagUrl: fp("Essad_Pasha%27s_flag.svg"), relatedCode: "AL",
    note: "Warlord Essad Pasha Toptani's short-lived statelet around Durrës during Albania's chaotic birth, flying a red flag with a white star.",
  },
  {
    id: "pontus", name: "Republic of Pontus", era: "1917–1922", region: "Europe",
    flagUrl: fp("Flag_of_Pontus.svg"), relatedCode: "GR",
    note: "A proposed homeland for the Pontic Greeks of the Black Sea coast, never realized; its black flag bore the eagle of the medieval Empire of Trebizond.",
  },
  {
    id: "crimean-pr", name: "Crimean People's Republic", era: "1917–1918", region: "Europe",
    flagUrl: fp("Flag_of_Crimean_People%27s_Republic_1917.svg"), relatedCode: "UA",
    note: "One of the first secular Muslim-led republics in the world, flying the sky-blue Kök Bayraq with a golden Tatar tamga, before the Bolsheviks crushed it within months.",
  },
  {
    id: "parma", name: "Duchy of Parma", era: "1545–1859", region: "Europe",
    flagUrl: fp("Flag_of_the_Duchy_of_Parma.svg"), relatedCode: "IT",
    note: "A northern Italian duchy long ruled by the Farnese and later Bourbon-Parma dynasties, its yellow flag bearing a blue fleur-de-lis shield, absorbed into unified Italy.",
  },
  {
    id: "lucca-piombino", name: "Principality of Lucca and Piombino", era: "1805–1809", region: "Europe",
    flagUrl: fp("Flag_of_the_Principality_of_Lucca_(1805-1809).svg"), relatedCode: "IT",
    note: "A Napoleonic state given to the emperor's sister Elisa Bonaparte, the only one of his siblings to rule in her own right.",
  },
  {
    id: "east-florida", name: "Republic of East Florida", era: "1812", region: "Americas",
    flagUrl: fp("East_Florida_Patriot_Flag.svg"), relatedCode: "US",
    note: "American 'Patriots' raised this flag of a charging soldier in a covert 1812 bid to seize Spanish East Florida — a filibuster the US government quietly encouraged, then disavowed.",
  },
  // Wave 7+: Congo secessions, Biafra proxy & Trucial emirates
  {
    id: "katanga", name: "State of Katanga", era: "1960–1963", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Katanga.svg"), relatedCode: "CD",
    note: "Moïse Tshombe's mineral-rich province seceded days after Congo's independence, triggering a UN war; its flag's three red croisettes are traditional Katangese copper crosses.",
  },
  {
    id: "south-kasai", name: "South Kasai", era: "1960–1962", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_South_Kasai.svg"), relatedCode: "CD",
    note: "A diamond-rich Congolese region that broke away alongside Katanga, flying a red-and-green flag with a gold 'V' for victory before the central government reconquered it.",
  },
  {
    id: "benin-1967", name: "Republic of Benin (1967)", era: "1967", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_the_Republic_of_Benin.svg"), relatedCode: "NG",
    note: "One of the shortest-lived states in history — declared in Benin City as a Biafran ally during the Nigerian Civil War, it existed for a single day before federal troops retook the city.",
  },
  {
    id: "dubai-trucial", name: "Emirate of Dubai (Trucial)", era: "1961–1971", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Dubai.svg"), relatedCode: "AE",
    note: "Before the UAE formed in 1971, Dubai flew a red field with a white hoist band, adopted to mark its ships at sea under the Trucial States agreements with Britain.",
  },
  {
    id: "abu-dhabi-trucial", name: "Emirate of Abu Dhabi (Trucial)", era: "1958–1971", region: "Africa & Middle East",
    flagUrl: fp("Flag_of_Abu_Dhabi.svg"), relatedCode: "AE",
    note: "The largest of the Trucial emirates flew a red flag with a white canton before joining the United Arab Emirates in 1971.",
  },
  // ── Americas: former states (List of former sovereign states) ──
  {
    id: "confederate-stainless", name: "Confederate States (Stainless Banner)", era: "1863–1865", region: "Americas",
    flagUrl: fp("Flag_of_the_Confederate_States_(1863–1865).svg"), relatedCode: "US",
    note: "The Confederacy's second national flag placed the square Battle Flag canton on a white field. Critics warned that when hanging limp it could be mistaken for a flag of surrender.",
  },
  {
    id: "confederate-bloodstained", name: "Confederate States (Blood-Stained Banner)", era: "1865", region: "Americas",
    flagUrl: fp("Flag_of_the_Confederate_States_(1865).svg"), relatedCode: "US",
    note: "The third and final Confederate national flag added a vertical red bar to the white 'Stainless Banner' to fix its surrender-flag problem — adopted barely a month before the war ended.",
  },
  {
    id: "confederate-battle", name: "Confederate Battle Flag", era: "1861–1865", region: "Americas",
    flagUrl: fp("Battle_flag_of_the_Confederate_States_of_America_(1-1).svg"), relatedCode: "US",
    note: "The square blue Saint Andrew's cross with thirteen stars was carried by the Army of Northern Virginia. Never an official national flag, it later became the basis of the rectangular 'rebel flag'.",
  },
  {
    id: "second-mexican-empire", name: "Second Mexican Empire", era: "1864–1867", region: "Americas",
    flagUrl: fp("Flag_of_the_Second_Mexican_Empire.svg"), relatedCode: "MX",
    note: "The empire of the Habsburg archduke Maximilian I, installed by Napoleon III. Its green-white-red tricolour bore a crowned eagle and four more eagles in the corners before he was executed in 1867.",
  },
  {
    id: "maximilian-standard", name: "Imperial Standard of Mexico (Maximilian)", era: "1864–1867", region: "Americas",
    flagUrl: fp("Imperial_Standard_of_Mexico_(1864-1867).svg"), relatedCode: "MX",
    note: "The personal standard of Emperor Maximilian I framed the imperial eagle with the motto 'Equidad en la Justicia' and golden corner eagles, used until the empire collapsed in 1867.",
  },
  {
    id: "first-mexican-republic", name: "First Mexican Republic", era: "1823–1864", region: "Americas",
    flagUrl: fp("Flag_of_Mexico_(1823-1864,_1867-1893).svg"), relatedCode: "MX",
    note: "After the First Empire fell, the federal republic stripped the crown from the eagle and added a snake, oak, and laurel — the design that, restored in 1867, defined the Mexican flag for decades.",
  },
  {
    id: "united-provinces-central-america", name: "United Provinces of Central America", era: "1823–1824", region: "Americas",
    flagUrl: fp("Flag_of_the_United_Provinces_of_Central_America.svg"), relatedCode: "GT", relatedCodes: ["SV", "HN", "NI", "CR"],
    note: "The first union of the Central American provinces after independence from Mexico, flying the blue-white-blue bands that preceded the Federal Republic and survive in five modern flags.",
  },
  {
    id: "greater-republic-central-america", name: "Greater Republic of Central America", era: "1896–1898", region: "Americas",
    flagUrl: fp("Flag_of_the_Greater_Republic_of_Central_America_(1898).svg"), relatedCode: "NI", relatedCodes: ["HN", "SV"],
    note: "A short-lived attempt to reunify Nicaragua, Honduras, and El Salvador; its blue-white-blue flag carried five volcanoes and stars before the union dissolved within two years.",
  },
  {
    id: "first-empire-haiti", name: "First Empire of Haiti", era: "1804–1806", region: "Americas",
    flagUrl: fp("Flag_of_the_First_Empire_of_Haiti.svg"), relatedCode: "HT",
    note: "Jean-Jacques Dessalines, who declared Haiti's independence, crowned himself Emperor Jacques I. His black-and-red vertical bicolour symbolized the union of black and mixed-race Haitians against France.",
  },
  {
    id: "state-of-haiti", name: "State of Haiti", era: "1806–1811", region: "Americas",
    flagUrl: fp("Flag_of_Haiti_(1806–1811).svg"), relatedCode: "HT",
    note: "Henri Christophe's northern republic before he proclaimed himself king, flying the blue-and-red bicolour that became the basis of the modern Haitian flag.",
  },
  {
    id: "first-dominican-republic", name: "First Dominican Republic", era: "1844", region: "Americas",
    flagUrl: fp("Flag_of_the_Dominican_Republic_(1844).svg"), relatedCode: "DO",
    note: "The flag raised when the Dominican Republic won independence from Haiti in 1844, a white cross dividing blue and red quarters — the design, with arms added, that endures today.",
  },
  {
    id: "state-of-cartagena", name: "State of Cartagena", era: "1811–1815", region: "Americas",
    flagUrl: fp("Flag_of_Cartagena.svg"), relatedCode: "CO",
    note: "Cartagena was the first province of New Granada to declare absolute independence from Spain in 1811; its red-yellow-green flag with a blue star is still flown by the Colombian city today.",
  },
  {
    id: "state-of-bolivar", name: "Sovereign State of Bolívar", era: "1857–1886", region: "Americas",
    flagUrl: fp("Flag_of_Bolívar_(Colombia).svg"), relatedCode: "CO",
    note: "One of the sovereign states of the federal United States of Colombia, centred on Cartagena, flying a yellow-blue-red flag before the 1886 constitution abolished the states.",
  },
  {
    id: "united-provinces-rio-plata", name: "United Provinces of the Río de la Plata", era: "1816–1820s", region: "Americas",
    flagUrl: fp("Flag_of_Argentina_(1818).svg"), relatedCode: "AR", relatedCodes: ["UY", "BO"],
    note: "The state that declared independence at Tucumán in 1816 and is the direct forerunner of Argentina; its sky-blue-white flag gained the golden Sun of May in 1818.",
  },
  {
    id: "republic-tucuman", name: "Republic of Tucumán", era: "1820–1821", region: "Americas",
    flagUrl: fp("Flag_of_the_Republic_of_Tucuman.svg"), relatedCode: "AR",
    note: "A short-lived independent province-state during the anarchy that followed the collapse of central authority in the Río de la Plata, before rejoining the Argentine confederation.",
  },
  {
    id: "treinta-y-tres", name: "Thirty-Three Orientals", era: "1825", region: "Americas",
    flagUrl: fp("Flag_of_the_Treinta_y_Tres.svg"), relatedCode: "UY",
    note: "The blue-white-red banner of the '33 Orientals' led by Lavalleja, whose 1825 landing began Uruguay's war of independence; its motto 'Libertad o Muerte' means 'Liberty or Death'.",
  },
  {
    id: "cisplatina", name: "Cisplatine Province", era: "1821–1828", region: "Americas",
    flagUrl: fp("Flag_of_the_Provincia_Cisplatina.svg"), relatedCode: "UY", relatedCodes: ["BR"],
    note: "The name given to present-day Uruguay while it was annexed first to Portugal and then to the Empire of Brazil, until the 1828 war secured its independence.",
  },
  {
    id: "protectorate-peru", name: "Protectorate of Peru", era: "1822–1825", region: "Americas",
    flagUrl: fp("Flag_of_Peru_(1822–1825).svg"), relatedCode: "PE",
    note: "An early Peruvian flag of the independence era, when San Martín and then Bolívar fought to expel Spanish royalists; the red-and-white colours were soon fixed in the modern arrangement.",
  },
  {
    id: "free-province-guayaquil", name: "Free Province of Guayaquil", era: "1820–1822", region: "Americas",
    flagUrl: fp("Bandera_de_la_Provincia_Libre_de_Guayaquil.svg"), relatedCode: "EC",
    note: "The Pacific port declared itself an independent province in 1820, flying a white flag with light-blue stripes and three stars, before Bolívar incorporated it into Gran Colombia.",
  },
  {
    id: "bolivia-1825", name: "Bolivia (first flag, 1825)", era: "1825–1826", region: "Americas",
    flagUrl: fp("Civil_flag_of_Bolivia_(1825-1826).svg"), relatedCode: "BO",
    note: "The very first flag of newly independent Bolivia: a green field bordered in red with golden stars, used briefly before the red-yellow-green tricolour took its place.",
  },
  {
    id: "patria-vieja-chile", name: "Chile (Patria Vieja transition)", era: "1817–1818", region: "Americas",
    flagUrl: fp("Flag_of_Chile_of_the_transition_(1817).svg"), relatedCode: "CL",
    note: "A transitional blue-white-red tricolour flown between the Patria Vieja and the definitive 1818 flag, during the years San Martín's army crossed the Andes to liberate Chile.",
  },
  {
    id: "patriotes-lower-canada", name: "Patriote Movement (Lower Canada)", era: "1837–1838", region: "Americas",
    flagUrl: fp("Drapeau_des_Patriotes_(avec_Patriote).svg"), relatedCode: "CA",
    note: "The green-white-red flag of the Patriotes who rose against British rule in the 1837–38 Lower Canada Rebellion; it remains a symbol of Quebec nationalism today.",
  },
  {
    id: "cherokee-nation", name: "Cherokee Nation", era: "1839–present", region: "Americas",
    flagUrl: fp("Flag_of_the_Cherokee_Nation.svg"), relatedCode: "US",
    note: "The seven-pointed star and ring of stars honour the seven clans and the Trail of Tears; one black star commemorates those who died on the forced removal to Indian Territory.",
  },
  // ── Asia & Oceania: former states (List of former sovereign states) ──
  {
    id: "kingdom-tahiti", name: "Kingdom of Tahiti", era: "1788–1880", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Kingdom_of_Tahiti.svg"), relatedCode: "PF",
    note: "The Pōmare dynasty's red-white-red flag flew over the Society Islands kingdom until France annexed Tahiti in 1880, ending nearly a century of independent Polynesian rule.",
  },
  {
    id: "kingdom-tonga-1862", name: "Kingdom of Tonga (1862)", era: "1862–1866", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Tonga_(1862-1866).svg"), relatedCode: "TO",
    note: "Tonga's first national flag was a plain white field with a red cross, but it proved too close to the new Red Cross emblem, so King George Tupou I added the red canton still used today.",
  },
  {
    id: "qing-triangular", name: "Qing Dynasty (Triangular Dragon)", era: "1862–1889", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_China_(1862–1889).svg"), relatedCode: "CN",
    note: "China's first national ensign was a triangular 'Yellow Dragon Flag' adopted for the imperial navy in 1862, before the familiar rectangular version replaced it in 1889.",
  },
  {
    id: "empire-china-1915", name: "Empire of China (1915–1916)", era: "1915–1916", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Empire_of_China_(1915–1916).svg"), relatedCode: "CN",
    note: "When president Yuan Shikai declared himself emperor in 1915, he revived a cross-and-stripes flag for his short-lived monarchy, which collapsed amid revolts within 83 days.",
  },
  {
    id: "roc-twelve-symbols", name: "Republic of China (Twelve Symbols)", era: "1913–1928", region: "Asia & Oceania",
    flagUrl: fp("Twelve_Symbols_national_emblem_of_China.svg"), relatedCode: "CN",
    note: "The early Republic's ornate state emblem, designed with input from the writer Lu Xun, combined the ancient Twelve Ornaments of imperial robes into a single republican coat of arms.",
  },
  {
    id: "mengjiang", name: "Mengjiang (Mengkukuo)", era: "1939–1945", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Mengjiang.svg"), relatedCode: "CN",
    note: "The Japanese-backed Mongol puppet state in Inner Mongolia flew a striped flag whose bands stood for the Mongol, Han, Japanese, Manchu, and Hui peoples it claimed to unite.",
  },
  {
    id: "first-east-turkestan", name: "First East Turkestan Republic", era: "1933–1934", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_First_East_Turkestan_Republic.svg"), relatedCode: "CN",
    note: "A short-lived Islamic republic proclaimed at Kashgar in Xinjiang, flying the sky-blue Kökbayraq with a white crescent and star, crushed within months by Chinese and Soviet-backed forces.",
  },
  {
    id: "second-east-turkestan", name: "Second East Turkestan Republic", era: "1944–1949", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Second_East_Turkestan_Republic.svg"), relatedCode: "CN",
    note: "A Soviet-supported Uyghur and Kazakh republic in northern Xinjiang, absorbed into the People's Republic of China in 1949 after its leaders died in a mysterious plane crash.",
  },
  {
    id: "bogd-khanate", name: "Bogd Khanate of Mongolia", era: "1921–1924", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Mongolia_(1921–1924).svg"), relatedCode: "MN",
    note: "After breaking from China, Mongolia was ruled by the Bogd Khan, a Buddhist theocrat, whose soyombo flag preceded the communist People's Republic proclaimed on his death in 1924.",
  },
  {
    id: "mongolian-pr-1924", name: "Mongolian People's Republic (1924)", era: "1924–1940", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Mongolia_(1924–1940).svg"), relatedCode: "MN",
    note: "Asia's first communist state after the USSR flew a red flag bearing the national soyombo symbol, a fire-and-yin-yang emblem that still anchors the modern Mongolian flag.",
  },
  {
    id: "tannu-tuva", name: "Tuvan People's Republic", era: "1921–1944", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Tannu_Tuva_(1921-1926).svg"), relatedCode: "RU",
    note: "A tiny Soviet-aligned republic in southern Siberia, recognized only by the USSR and Mongolia; its famous triangular stamps were prized by collectors before the USSR annexed it in 1944.",
  },
  {
    id: "empire-japan-naval", name: "Empire of Japan (Naval Ensign)", era: "1889–1945", region: "Asia & Oceania",
    flagUrl: fp("Naval_ensign_of_Japan_(1889–1945).svg"), relatedCode: "JP",
    note: "The 16-rayed Rising Sun naval ensign, with the disc offset toward the hoist, flew over the Imperial Japanese Navy and is still used by the Maritime Self-Defense Force today.",
  },
  {
    id: "korean-provisional-gov", name: "Provisional Government of Korea", era: "1919–1948", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Provisional_Government_of_the_Republic_of_Korea.svg"), relatedCode: "KR",
    note: "Exiled in Shanghai after Japan's annexation, Korea's provisional government flew an early Taegukgi as it lobbied for independence; its legacy is claimed by the modern Republic of Korea.",
  },
  {
    id: "safavid", name: "Safavid Empire", era: "1501–1736", region: "Asia & Oceania",
    flagUrl: fp("Safavid_Flag.svg"), relatedCode: "IR",
    note: "The Persian empire that made Twelver Shia Islam the state religion flew a green banner bearing a golden lion and sun, the Lion and Sun motif that would symbolize Iran for centuries.",
  },
  {
    id: "afsharid", name: "Afsharid Dynasty", era: "1736–1796", region: "Asia & Oceania",
    flagUrl: fp("Afsharid_Imperial_Standard.svg"), relatedCode: "IR",
    note: "The empire of the conqueror Nader Shah, who sacked Delhi and seized the Peacock Throne; his imperial standard carried the lion and sun on a red and yellow field.",
  },
  {
    id: "qajar-persia", name: "Qajar Persia", era: "1846–1925", region: "Asia & Oceania",
    flagUrl: fp("State_flag_of_Persia_(1907–1933).svg"), relatedCode: "IR",
    note: "The Lion and Sun on a tricolor of green, white, and red became Persia's flag under the Qajar shahs and endured through the empire until the 1979 revolution removed the emblem.",
  },
  {
    id: "pahlavi-iran", name: "Imperial State of Iran (Pahlavi)", era: "1964–1979", region: "Asia & Oceania",
    flagUrl: fp("State_flag_of_Iran_(1964–1980).svg"), relatedCode: "IR",
    note: "Under the Pahlavi shahs the green-white-red flag bore a crowned Lion and Sun; the crowned emblem was stripped away after the 1979 Islamic Revolution overthrew the monarchy.",
  },
  {
    id: "afghanistan-1880", name: "Emirate of Afghanistan (1880)", era: "1880–1901", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Afghanistan_(1880–1901).svg"), relatedCode: "AF",
    note: "A plain black banner flown under Emir Abdur Rahman Khan, the 'Iron Amir', who consolidated the modern borders of Afghanistan as a buffer between the British and Russian empires.",
  },
  {
    id: "afghanistan-1919", name: "Emirate of Afghanistan (1919)", era: "1919–1921", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Afghanistan_(1919–1921).svg"), relatedCode: "AF",
    note: "The black flag with a central mosque-and-mihrab emblem flew when Afghanistan won full independence from Britain in 1919 under the reformist King Amanullah Khan.",
  },
  {
    id: "afghanistan-1929", name: "Kingdom of Afghanistan (1929)", era: "1929", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Afghanistan_(1929).svg"), relatedCode: "AF",
    note: "The brief flag of the Tajik rebel Habibullah Kalakani, who seized Kabul for nine months in 1929 during the civil war that toppled King Amanullah's modernizing reforms.",
  },
  {
    id: "kingdom-afghanistan", name: "Kingdom of Afghanistan", era: "1931–1973", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Afghanistan_(1931–1973).svg"), relatedCode: "AF",
    note: "The black-red-green triband with a mosque emblem flew over the long reign of King Zahir Shah, until his cousin Daoud Khan abolished the monarchy in a 1973 coup.",
  },
  {
    id: "herat", name: "Principality of Herat", era: "1793–1863", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Herat_until_1842.svg"), relatedCode: "AF",
    note: "A semi-independent Afghan principality fought over by Persia and Britain in the 'Great Game', whose siege in 1837–38 helped trigger the First Anglo-Afghan War.",
  },
  {
    id: "trebizond", name: "Empire of Trebizond", era: "1204–1461", region: "Asia & Oceania",
    flagUrl: fp("Banner_of_the_Empire_of_Trebizond.svg"), relatedCode: "TR",
    note: "A Byzantine Greek successor state on the Black Sea coast of Anatolia, the last fragment of the Roman world, which outlasted Constantinople by eight years before falling to the Ottomans.",
  },
  {
    id: "asir-emirate", name: "Idrisid Emirate of Asir", era: "1906–1934", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Emirate_of_Asir.svg"), relatedCode: "SA",
    note: "A small emirate in the mountains of southwestern Arabia between the Hejaz and Yemen, independent for a generation before Saudi Arabia absorbed it after the 1934 Saudi-Yemeni war.",
  },
  {
    id: "state-of-aden", name: "State of Aden", era: "1963–1967", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_State_of_Aden.svg"), relatedCode: "YE",
    note: "The British colony of Aden joined the Federation of South Arabia as a constituent state, flying a green-and-blue flag, just before independence as South Yemen in 1967.",
  },
  {
    id: "federation-south-arabia", name: "Federation of South Arabia", era: "1962–1967", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Federation_of_South_Arabia.svg"), relatedCode: "YE",
    note: "A British-sponsored union of Aden and surrounding sultanates and emirates; its green-yellow-blue flag flew until the federation collapsed into independent South Yemen in 1967.",
  },
  {
    id: "south-yemen", name: "South Yemen (PDRY)", era: "1967–1990", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_South_Yemen.svg"), relatedCode: "YE",
    note: "The Arab world's only Marxist state added a sky-blue triangle with a red star to the pan-Arab tricolor, until it merged with North Yemen to form the Republic of Yemen in 1990.",
  },
  {
    id: "lahej", name: "Sultanate of Lahej", era: "1728–1967", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Sultanate_of_Lahej.svg"), relatedCode: "YE",
    note: "An Abdali sultanate north of Aden, one of the many South Arabian princely states, flying a green flag with a white border before being absorbed into independent South Yemen.",
  },
  {
    id: "mahra", name: "Mahra Sultanate", era: "1432–1967", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Mahra_Sultanate.svg"), relatedCode: "YE",
    note: "A long-lived sultanate of the Mahra people in far eastern South Arabia, which also ruled the island of Socotra, abolished when South Yemen became independent in 1967.",
  },
  {
    id: "muscat", name: "Sultanate of Muscat", era: "1820–1970", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Muscat.svg"), relatedCode: "OM",
    note: "A plain red banner flew over the coastal Sultanate of Muscat, distinct from the inland Imamate of Oman, until Sultan Qaboos united the country and modernized its flag in 1970.",
  },
  {
    id: "trucial-states", name: "Trucial States", era: "1968–1971", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Trucial_States_(1968–1971).svg"), relatedCode: "AE",
    note: "The collective flag of the British-protected sheikhdoms of the lower Gulf, a red field with a green-bordered white stripe, flown briefly before they federated as the United Arab Emirates.",
  },
  {
    id: "arab-federation", name: "Arab Federation", era: "1958", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Arab_Federation.svg"), relatedCode: "IQ", relatedCodes: ["JO"],
    note: "A short-lived union of the Hashemite kingdoms of Iraq and Jordan, formed as a counterweight to the Egypt-Syria union and dissolved within months when a coup overthrew Iraq's monarchy.",
  },
  {
    id: "kingdom-iraq", name: "Kingdom of Iraq", era: "1924–1959", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Iraq_(1924–1959).svg"), relatedCode: "IQ",
    note: "The Hashemite kingdom's black-green-white flag with a red trapezoid and two white stars derived from the Arab Revolt, flying until the 1958 coup that ended the monarchy.",
  },
  {
    id: "hatay", name: "Hatay State", era: "1938–1939", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Hatay.svg"), relatedCode: "TR",
    note: "A short-lived republic around Alexandretta, carved from French-mandate Syria with a flag nearly identical to Turkey's, before it voted to join Turkey in 1939.",
  },
  {
    id: "kingdom-mysore", name: "Kingdom of Mysore", era: "1399–1947", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Mysore.svg"), relatedCode: "IN",
    note: "Ruled by the Wadiyar dynasty, the south Indian kingdom flew a flag bearing the mythical Gandaberunda, a two-headed eagle still used as the state emblem of Karnataka.",
  },
  {
    id: "cochin", name: "Kingdom of Cochin", era: "1102–1949", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Kingdom_of_Cochin.svg"), relatedCode: "IN",
    note: "An ancient kingdom on India's Malabar coast, an early ally of the Portuguese and Dutch, whose spice ports made it one of the wealthiest of the southern Indian states.",
  },
  {
    id: "sikkim", name: "Kingdom of Sikkim", era: "1642–1975", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Sikkim_(1967-1975).svg"), relatedCode: "IN",
    note: "The Himalayan kingdom of the Namgyal dynasty flew a flag bearing a Buddhist gankyil and prayer wheel, until a 1975 referendum made it India's 22nd state.",
  },
  {
    id: "kingdom-nepal", name: "Kingdom of Nepal", era: "1743–2008", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Nepal_(1743–1962).svg"), relatedCode: "NP",
    note: "The world's only non-rectangular national flag, a double pennon of two stacked triangles bearing a moon and sun, flew over the Shah dynasty's kingdom until Nepal became a republic in 2008.",
  },
  {
    id: "bahawalpur", name: "Princely State of Bahawalpur", era: "1802–1955", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Bahawalpur.svg"), relatedCode: "PK",
    note: "A wealthy princely state in the Punjab desert ruled by the Abbasi Nawabs, whose ruler was among the first to accede to the new nation of Pakistan in 1947.",
  },
  {
    id: "khiva", name: "Khanate of Khiva", era: "1511–1920", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Khanate_of_Khiva.svg"), relatedCode: "UZ",
    note: "A Central Asian khanate on the oasis of Khwarezm, a major Silk Road and slave-trade center, which became a Russian protectorate before the Bolsheviks toppled its khan in 1920.",
  },
  {
    id: "kokand", name: "Khanate of Kokand", era: "1709–1876", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Khanate_of_Kokand.svg"), relatedCode: "UZ",
    note: "A khanate in the fertile Fergana Valley, one of the three great Uzbek states, conquered and annexed by the Russian Empire in 1876 during its advance across Central Asia.",
  },
  {
    id: "bukhara-emirate", name: "Emirate of Bukhara", era: "1785–1920", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Emirate_of_Bukhara.svg"), relatedCode: "UZ",
    note: "The last emir of this ancient Central Asian state, a Russian protectorate, fled when the Red Army stormed Bukhara in 1920, ending centuries of Uzbek dynastic rule.",
  },
  {
    id: "bukharan-psr", name: "Bukharan People's Soviet Republic", era: "1920–1925", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Bukharan_People's_Soviet_Republic.svg"), relatedCode: "UZ",
    note: "The Soviet-aligned republic that replaced the Emirate of Bukhara, flying a red flag with Arabic-script and a crescent, before being partitioned into the Uzbek and Turkmen SSRs.",
  },
  {
    id: "alash-autonomy", name: "Alash Autonomy", era: "1917–1920", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Alash_Autonomy.svg"), relatedCode: "KZ",
    note: "A short-lived Kazakh national government formed amid the Russian Civil War by the Alash Orda intelligentsia, suppressed by the Bolsheviks who then built the Kazakh SSR.",
  },
  {
    id: "deli", name: "Sultanate of Deli", era: "1632–1946", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Sultanate_of_Deli.svg"), relatedCode: "ID",
    note: "A Malay sultanate on Sumatra's east coast that grew immensely rich from Dutch tobacco plantations around Medan, before the 1946 social revolution swept away the Sumatran sultanates.",
  },
  {
    id: "johor", name: "Sultanate of Johor", era: "1528–1948", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Johor_(1855–1865).svg"), relatedCode: "MY",
    note: "Successor to the Malacca sultanate, Johor was a major Malay power on the peninsula's tip; its colors survive in the modern Malaysian state of Johor.",
  },
  {
    id: "riau-lingga", name: "Sultanate of Riau-Lingga", era: "1824–1911", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Riau-Lingga_Sultanate.svg"), relatedCode: "ID",
    note: "A Malay maritime sultanate of the islands between Sumatra and Borneo, formed when the British and Dutch split the old Johor realm, dissolved by the Dutch in 1911.",
  },
  {
    id: "north-borneo", name: "North Borneo (Chartered Company)", era: "1882–1946", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_North_Borneo_(1882–1902).svg"), relatedCode: "MY",
    note: "Modern Sabah was ruled for over sixty years by the British North Borneo Chartered Company, one of the last territories administered by a private trading company.",
  },
  {
    id: "first-philippine-republic", name: "First Philippine Republic", era: "1899–1901", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_Philippines_(1898–1901).svg"), relatedCode: "PH",
    note: "Asia's first constitutional republic, declared under Emilio Aguinaldo; its sun-and-stars flag — still the modern Philippine flag — flew in war against Spain and then the United States.",
  },
  {
    id: "republic-zamboanga", name: "Republic of Zamboanga", era: "1899–1903", region: "Asia & Oceania",
    flagUrl: fp("Purported_flag_of_the_Republic_of_Zamboanga.svg"), relatedCode: "PH",
    note: "A short-lived republic on the Zamboanga Peninsula of Mindanao that declared independence amid the collapse of Spanish rule, before American forces incorporated it into the Philippines.",
  },
  {
    id: "democratic-kampuchea", name: "Democratic Kampuchea", era: "1975–1979", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Democratic_Kampuchea.svg"), relatedCode: "KH",
    note: "The Khmer Rouge state flew a red flag with a yellow three-towered Angkor Wat; its brutal four-year rule under Pol Pot killed an estimated quarter of Cambodia's population.",
  },
  {
    id: "kingdom-laos", name: "Kingdom of Laos", era: "1947–1975", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Laos_(1952–1975).svg"), relatedCode: "LA",
    note: "The royal kingdom flew a red flag with a white three-headed elephant beneath a parasol, the sacred Erawan, until the communist Pathet Lao abolished the monarchy in 1975.",
  },
  {
    id: "state-east-indonesia", name: "State of East Indonesia", era: "1946–1950", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_the_State_of_East_Indonesia.svg"), relatedCode: "ID",
    note: "A Dutch-sponsored federal state covering Sulawesi and the eastern islands during the Indonesian National Revolution, dissolved into the unitary Republic of Indonesia in 1950.",
  },
  {
    id: "pasundan", name: "State of Pasundan", era: "1948–1950", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Pasundan.svg"), relatedCode: "ID",
    note: "A Dutch-backed Sundanese federal state in West Java set up during the revolution, one of several puppet states that were quickly absorbed into the unitary Indonesian republic.",
  },
  {
    id: "south-maluku", name: "Republic of South Maluku", era: "1950", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_Maluku.svg"), relatedCode: "ID",
    note: "Largely Christian Ambonese proclaimed an independent republic in the Moluccas in 1950; its blue-white-green-red flag is still flown by an exiled government-in-exile in the Netherlands.",
  },
]

/** Historical entities tied to a given modern country code, for the Codex. */
export function historicalFor(code: string): HistoricalEntity[] {
  return HISTORICAL_FLAGS.filter(h => h.relatedCode === code || h.relatedCodes?.includes(code))
}

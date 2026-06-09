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
}

export const HISTORICAL_FLAGS: HistoricalEntity[] = [
  // ── Europe & the Mediterranean ──────────────────────────────────────────────
  {
    id: "austria-hungary", name: "Austria-Hungary", era: "1867–1918", region: "Europe",
    flagUrl: fp("Civil_ensign_of_Austria-Hungary_(1869-1918).svg"),
    note: "The civil ensign split 50/50, joining the Austrian red-white-red with Hungary's colors and both shields — the Dual Monarchy never agreed on a single flag for the whole empire.",
  },
  {
    id: "kingdom-yugoslavia", name: "Kingdom of Yugoslavia", era: "1918–1941", region: "Europe",
    flagUrl: fp("Flag_of_Yugoslavia_(1918–1941).svg"), relatedCode: "RS",
    note: "The blue-white-red Pan-Slavic tricolor symbolized the union of Serbs, Croats, and Slovenes, flown by the Kingdom until the Axis invasion of 1941.",
  },
  {
    id: "sfr-yugoslavia", name: "Socialist Yugoslavia", era: "1945–1992", region: "Europe",
    flagUrl: fp("Flag_of_Yugoslavia_(1946-1992).svg"), relatedCode: "RS",
    note: "Tito's Partisans added a red, gold-bordered star to the tricolor; it marked the country's communist character until the federation's violent breakup in the 1990s.",
  },
  {
    id: "czechoslovakia", name: "Czechoslovakia", era: "1920–1992", region: "Europe",
    flagUrl: fp("Flag_of_the_Czech_Republic.svg"), relatedCode: "CZ",
    note: "Adopted in 1920 with a blue hoist wedge to tell it apart from Poland's flag. Czechia kept it after the 1993 split, despite a clause meant to bar successor states from reusing it.",
  },
  {
    id: "german-empire", name: "German Empire", era: "1871–1918", region: "Europe",
    flagUrl: fp("Flag_of_the_German_Empire.svg"),
    note: "The black-white-red tricolor combined Prussia's black-and-white with the Hanseatic red-and-white. It was officially adopted as the national flag only in 1892.",
  },
  {
    id: "weimar", name: "Weimar Republic", era: "1919–1933", region: "Europe",
    flagUrl: fp("Flag_of_Germany_(3-2_aspect_ratio).svg"),
    note: "The black-red-gold tricolor revived the colors of the 1848 liberal revolution, deliberately tying the new democracy to earlier anti-autocratic movements.",
  },
  {
    id: "east-germany", name: "East Germany (GDR)", era: "1959–1990", region: "Europe",
    flagUrl: fp("Flag_of_East_Germany.svg"),
    note: "The hammer-and-compass-in-wheat emblem represented workers, intelligentsia, and farmers. Before 1959 East and West Germany flew the identical plain tricolor.",
  },
  {
    id: "prussia", name: "Kingdom of Prussia", era: "1701–1918", region: "Europe",
    flagUrl: fp("Flag_of_the_Kingdom_of_Prussia_(1803-1892).svg"), relatedCode: "DE",
    note: "The black eagle on a white field derives from the Teutonic Knights. Prussia's black-and-white later supplied two of the three colors of the German Empire's flag.",
  },
  {
    id: "russian-empire", name: "Russian Empire", era: "1858–1896", region: "Europe",
    flagUrl: fp("Flag_of_the_Russian_Empire_(black-yellow-white).svg"),
    note: "The black-yellow-white 'imperial colors' were drawn from the state coat of arms by Alexander II, before Nicholas II demoted them for the white-blue-red tricolor.",
  },
  {
    id: "soviet-union", name: "Soviet Union", era: "1922–1991", region: "Europe",
    flagUrl: fp("Flag_of_the_Soviet_Union.svg"),
    note: "The gold hammer and sickle beneath a red star stood for the worker-peasant alliance. The exact shade and proportions were fixed by Soviet law in 1955.",
  },
  {
    id: "byzantine", name: "Byzantine Empire", era: "1261–1453", region: "Europe",
    flagUrl: fp("Byzantine_imperial_flag,_14th_century.svg"), relatedCode: "GR",
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
    id: "smom", name: "Sovereign Military Order of Malta", era: "1113–present", region: "Europe",
    flagUrl: fp("Flag_of_the_Sovereign_Military_Order_of_Malta.svg"), relatedCode: "MT",
    note: "The white eight-pointed Maltese cross on red is the Knights Hospitaller's 'works' flag; the eight points are traditionally said to represent the eight Beatitudes.",
  },

  // ── Asia & Oceania ──────────────────────────────────────────────────────────
  {
    id: "qing", name: "Qing Dynasty", era: "1889–1912", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_China_(1889–1912).svg"),
    note: "The 'Yellow Dragon Flag' shows the Azure Dragon chasing a flaming pearl. It began as a triangular naval ensign in 1862 and became China's first true national flag in 1889.",
  },
  {
    id: "roc-fivecolor", name: "Republic of China (1912)", era: "1912–1928", region: "Asia & Oceania",
    flagUrl: fp("Flag_of_China_(1912–1928).svg"),
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
    flagUrl: fp("Flag_of_the_Gran_Colombia.svg"), relatedCode: "CO",
    note: "Bolívar's union of present-day Colombia, Venezuela, Ecuador, and Panama. Its yellow-blue-red tricolor is the direct ancestor of all three modern flags.",
  },
  {
    id: "central-america", name: "Federal Republic of Central America", era: "1823–1841", region: "Americas",
    flagUrl: fp("Flag_of_the_Federal_Republic_of_Central_America.svg"), relatedCode: "GT",
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
]

/** Historical entities tied to a given modern country code, for the Codex. */
export function historicalFor(code: string): HistoricalEntity[] {
  return HISTORICAL_FLAGS.filter(h => h.relatedCode === code)
}

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
    flagUrl: fp("Flag_of_the_Peru-Bolivian_Confederation.svg"), relatedCode: "PE",
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
]

/** Historical entities tied to a given modern country code, for the Codex. */
export function historicalFor(code: string): HistoricalEntity[] {
  return HISTORICAL_FLAGS.filter(h => h.relatedCode === code)
}

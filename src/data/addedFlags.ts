// Historical flags added to the Codex during the 13 Jun 2026 sweep (after the
// World Cup work). Surfaced in Settings → Flag Check → Added so the new art can
// be eyeballed at a glance. `file` is the Codex-style flagUrl: a self-hosted
// '/flags/xx.svg' path (colonial predecessors that flew the metropole's own
// flag) or a Wikimedia filename resolved through fp().
export interface AddedFlag { country: string; era: string; file: string }

export const ADDED_FLAGS: AddedFlag[] = [
  // Europe
  { country: "Switzerland", era: "Helvetic Republic (1798–1803)", file: "Flag_of_the_Helvetic_Republic.svg" },
  { country: "Cyprus", era: "British Crown Colony (1922–1960)", file: "Flag_of_Cyprus_(1922-1960).svg" },
  { country: "Czech Republic", era: "Protectorate of Bohemia & Moravia (1939–45)", file: "Flag_of_the_Protectorate_of_Bohemia_and_Moravia.svg" },
  { country: "Iceland", era: "Hvítbláinn (1897–1915)", file: "Hvítbláinn.svg" },
  { country: "United Kingdom", era: "King's Colours, Union of the Crowns (1606)", file: "Union_flag_1606_(Kings_Colors).svg" },
  { country: "Serbia", era: "Kingdom of Serbia (1882–1918)", file: "Flag_of_Serbia_(1882–1918).svg" },
  // Oceania
  { country: "Kiribati", era: "Gilbert & Ellice Islands Colony (1937–1979)", file: "Flag_of_Gilbert_and_Ellice_Islands.svg" },
  { country: "Tuvalu", era: "Gilbert & Ellice Islands Colony (1937–1976)", file: "Flag_of_Gilbert_and_Ellice_Islands.svg" },
  { country: "Papua New Guinea", era: "Australian Territory of Papua (1906–1949)", file: "Flag_of_the_Territory_of_Papua.svg" },
  // Americas
  { country: "El Salvador", era: "Stars-and-stripes era (1875–1912)", file: "Flag_of_El_Salvador_(1875–1912).svg" },
  { country: "Suriname", era: "Autonomous Suriname (1959–1975)", file: "Flag_of_Suriname_(1959–1975).svg" },
  { country: "Haiti", era: "Second Empire of Haiti (1849–1859)", file: "Flag_of_Haiti_(1849–1859).svg" },
  // Middle East
  { country: "Iraq", era: "Kingdom of Iraq, Hashemite (1921–1958)", file: "Flag_of_Iraq_(1924–1959).svg" },
  { country: "Iraq", era: "Coalition-era interim (2004–2008)", file: "Flag_of_Iraq_(2004–2008).svg" },
  { country: "Oman", era: "Imamate of Oman, interior (1913–1959)", file: "Flag_of_the_Imamate_of_Oman_(1954–1959).svg" },
  { country: "Oman", era: "Sultanate of Muscat and Oman (1856–1970)", file: "Flag_of_Muscat.svg" },
  { country: "Oman", era: "Omani Empire (1696–1856)", file: "Flag_of_Muscat.svg" },
  // Asia
  { country: "Indonesia", era: "Dutch East Indies (1816–1945)", file: "/flags/nl.svg" },
  { country: "Bangladesh", era: "East Pakistan (1947–1971)", file: "/flags/pk.svg" },
  { country: "Pakistan", era: "British India / the Raj (1858–1947)", file: "British_Raj_Red_Ensign.svg" },
  { country: "Timor-Leste", era: "Portuguese Timor (1702–1975)", file: "/flags/pt.svg" },
  { country: "Timor-Leste", era: "Indonesian occupation (1976–1999)", file: "/flags/id.svg" },
  // Africa
  { country: "Côte d'Ivoire", era: "French Côte d'Ivoire (1893–1959)", file: "/flags/fr.svg" },
  { country: "Angola", era: "Portuguese Angola (1655–1975)", file: "/flags/pt.svg" },
  { country: "Botswana", era: "Bechuanaland Protectorate (1885–1966)", file: "/flags/gb.svg" },
  { country: "Eswatini", era: "Swaziland Protectorate (1903–1968)", file: "/flags/gb.svg" },
  { country: "Central African Republic", era: "French Ubangi-Shari (1903–1958)", file: "/flags/fr.svg" },
  { country: "Chad", era: "French Chad (1900–1959)", file: "/flags/fr.svg" },
  { country: "Djibouti", era: "French Somaliland / Afars & Issas (1888–1977)", file: "/flags/fr.svg" },
  { country: "Guinea", era: "French Guinea (1891–1958)", file: "/flags/fr.svg" },
  { country: "Guinea-Bissau", era: "Portuguese Guinea (1474–1974)", file: "/flags/pt.svg" },
  { country: "Kenya", era: "British East Africa / Kenya Colony (1895–1963)", file: "/flags/gb.svg" },
  { country: "Madagascar", era: "French Madagascar (1897–1958)", file: "/flags/fr.svg" },
  { country: "Mauritius", era: "British Mauritius (1810–1968)", file: "/flags/gb.svg" },
  { country: "Namibia", era: "South West Africa, S. African rule (1915–1990)", file: "Flag_of_South_Africa_(1928–1994).svg" },
  { country: "Niger", era: "French Niger (1922–1959)", file: "/flags/fr.svg" },
  { country: "Somalia", era: "Italian Somaliland (1889–1960)", file: "/flags/it.svg" },
  { country: "South Sudan", era: "Part of Sudan (1956–2011)", file: "/flags/sd.svg" },
  { country: "Uganda", era: "Uganda Protectorate (1894–1962)", file: "/flags/gb.svg" },
  { country: "São Tomé & Príncipe", era: "Portuguese rule (1753–1975)", file: "/flags/pt.svg" },

  // ── Deep re-audit (Europe A–K), Wikipedia-sourced ──
  { country: "Albania", era: "Albanian Republic (1925–1928)", file: "Flag_of_the_Albanian_Republic_(1925–1928).svg" },
  { country: "Albania", era: "German occupation (1943–1944)", file: "Flag_of_Albania_(1943–1944).svg" },
  { country: "Hungary", era: "Kingdom of Hungary, Austria-Hungary (1896–1915)", file: "Flag_of_Hungary_(1896-1915).svg" },
  { country: "Hungary", era: "Árpád stripes, medieval kingdom (1000–1301)", file: "Flag_of_Hungary_(11th_c._-_1301).svg" },
  { country: "Croatia", era: "Banovina of Croatia (1939–1941)", file: "Flag_of_Banate_of_Croatia_(1939-1941).svg" },
  { country: "Croatia", era: "Kingdom of Croatia, Austria-Hungary (1868–1918)", file: "Flag_of_the_Kingdom_of_Croatia_(Habsburg).svg" },
  { country: "Finland", era: "Part of Sweden (1249–1809)", file: "/flags/se.svg" },
  { country: "Bosnia & Herzegovina", era: "Austro-Hungarian Bosnia (1878–1918)", file: "Flag_of_Bosnia_(1878–1908).svg" },
  { country: "Bosnia & Herzegovina", era: "Bosnian uprising, Gradaščević (1831–1832)", file: "Flag_of_Bosnia_(1831–1832).svg" },

  // ── Deep re-audit (Europe L–S), Wikipedia-sourced ──
  { country: "Lithuania", era: "Grand Duchy of Lithuania, Vytis (1253–1795)", file: "Flag_of_Lithuania_(state).svg" },
  { country: "Luxembourg", era: "Roude Léiw, the Red Lion (1100–1845)", file: "Civil_Ensign_of_Luxembourg.svg" },
  { country: "Malta", era: "British Malta (1813–1943)", file: "/flags/gb.svg" },
  { country: "Malta", era: "Order of St John, Knights of Malta (1530–1798)", file: "Flag_of_the_Order_of_St._John_(various).svg" },
  { country: "Moldova", era: "Part of Romania / Bessarabia (1918–1940)", file: "/flags/ro.svg" },
  { country: "Moldova", era: "Principality of Moldavia (1346–1859)", file: "Flag_of_Moldavia.svg" },
  { country: "Montenegro", era: "Kingdom of Montenegro (1905–1918)", file: "Flag_of_Montenegro_(1905–1918).svg" },
  { country: "Norway", era: "Denmark–Norway (1524–1814)", file: "/flags/dk.svg" },
  { country: "Poland", era: "Kingdom of Poland, royal banner (1295–1795)", file: "Flag_of_the_Kingdom_of_Poland.svg" },
  { country: "Slovakia", era: "Part of Czechoslovakia (1918–1992)", file: "/flags/cz.svg" },
  { country: "Slovenia", era: "Carniola / Slovene lands (1836–1918)", file: "Flag_of_Krain.svg" },
  { country: "Ukraine", era: "Cossack Hetmanate (1649–1764)", file: "Flag_of_the_Cossack_Hetmanate.svg" },
  { country: "Vatican City", era: "Papal States, yellow-white (1808–1870)", file: "Flag_of_the_Papal_States_(1808-1870).svg" },
  { country: "Vatican City", era: "Papal States, yellow-red (1750–1808)", file: "Flag_of_the_Papal_States_(pre_1808).svg" },

  // ── Deep re-audit (Middle East), Wikipedia-sourced ──
  { country: "Saudi Arabia", era: "Kingdom of Hejaz, Hashemite (1916–1925)", file: "Flag_of_Hejaz_(1920).svg" },
  { country: "Syria", era: "Arab Kingdom of Syria (1920)", file: "Flag_of_Kingdom_of_Syria_(1920-03-08_to_1920-07-24).svg" },

  // ── Deep re-audit (Oceania), Wikipedia-sourced ──
  { country: "Fiji", era: "Kingdom of Fiji, Cakobau (1871–1874)", file: "Flag_of_the_Kingdom_of_Fiji_(1871-1874).svg" },
  { country: "Marshall Islands", era: "Japanese South Seas Mandate (1914–1944)", file: "/flags/jp.svg" },
  { country: "Micronesia", era: "Japanese South Seas Mandate (1914–1944)", file: "/flags/jp.svg" },
  { country: "Palau", era: "Japanese South Seas Mandate (1914–1944)", file: "/flags/jp.svg" },
  { country: "Nauru", era: "Australian-administered mandate (1920–1968)", file: "/flags/au.svg" },

  // ── Deep re-audit (Americas A–G), Wikipedia-sourced ──
  { country: "Canada", era: "New France (1534–1763)", file: "Pavillon_royal_de_la_France.svg" },
  { country: "Argentina", era: "Viceroyalty of the Río de la Plata (1776–1812)", file: "Flag_of_Cross_of_Burgundy.svg" },
  { country: "Chile", era: "Captaincy General of Chile, Spanish (1542–1810)", file: "Flag_of_Cross_of_Burgundy.svg" },
  { country: "Bolivia", era: "Upper Peru, Spanish (1559–1825)", file: "Flag_of_Cross_of_Burgundy.svg" },
  { country: "Cuba", era: "US military government (1898–1902)", file: "/flags/us.svg" },
]

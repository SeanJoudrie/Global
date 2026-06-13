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
]

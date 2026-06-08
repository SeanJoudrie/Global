export interface SubRegion {
  code: string
  name: string
  flagUrl: string
}

export interface ChallengeCountry {
  code: string
  name: string
  emoji: string
  subTitle: string
  subRegions: SubRegion[]
  locked: boolean
}

export interface ChallengeContinent {
  id: string
  name: string
  emoji: string
  locked: boolean
  countries: ChallengeCountry[]
}

const flag = (iso: string) => `https://flagcdn.com/w320/${iso.toLowerCase()}.png`

// ── NORTH AMERICA ─────────────────────────────────────────────────────────────

const US_STATES: SubRegion[] = [
  { code: "us-al", name: "Alabama", flagUrl: flag("us-al") },
  { code: "us-ak", name: "Alaska", flagUrl: flag("us-ak") },
  { code: "us-az", name: "Arizona", flagUrl: flag("us-az") },
  { code: "us-ar", name: "Arkansas", flagUrl: flag("us-ar") },
  { code: "us-ca", name: "California", flagUrl: flag("us-ca") },
  { code: "us-co", name: "Colorado", flagUrl: flag("us-co") },
  { code: "us-ct", name: "Connecticut", flagUrl: flag("us-ct") },
  { code: "us-de", name: "Delaware", flagUrl: flag("us-de") },
  { code: "us-fl", name: "Florida", flagUrl: flag("us-fl") },
  { code: "us-ga", name: "Georgia", flagUrl: flag("us-ga") },
  { code: "us-hi", name: "Hawaii", flagUrl: flag("us-hi") },
  { code: "us-id", name: "Idaho", flagUrl: flag("us-id") },
  { code: "us-il", name: "Illinois", flagUrl: flag("us-il") },
  { code: "us-in", name: "Indiana", flagUrl: flag("us-in") },
  { code: "us-ia", name: "Iowa", flagUrl: flag("us-ia") },
  { code: "us-ks", name: "Kansas", flagUrl: flag("us-ks") },
  { code: "us-ky", name: "Kentucky", flagUrl: flag("us-ky") },
  { code: "us-la", name: "Louisiana", flagUrl: flag("us-la") },
  { code: "us-me", name: "Maine", flagUrl: flag("us-me") },
  { code: "us-md", name: "Maryland", flagUrl: flag("us-md") },
  { code: "us-ma", name: "Massachusetts", flagUrl: flag("us-ma") },
  { code: "us-mi", name: "Michigan", flagUrl: flag("us-mi") },
  { code: "us-mn", name: "Minnesota", flagUrl: flag("us-mn") },
  { code: "us-ms", name: "Mississippi", flagUrl: flag("us-ms") },
  { code: "us-mo", name: "Missouri", flagUrl: flag("us-mo") },
  { code: "us-mt", name: "Montana", flagUrl: flag("us-mt") },
  { code: "us-ne", name: "Nebraska", flagUrl: flag("us-ne") },
  { code: "us-nv", name: "Nevada", flagUrl: flag("us-nv") },
  { code: "us-nh", name: "New Hampshire", flagUrl: flag("us-nh") },
  { code: "us-nj", name: "New Jersey", flagUrl: flag("us-nj") },
  { code: "us-nm", name: "New Mexico", flagUrl: flag("us-nm") },
  { code: "us-ny", name: "New York", flagUrl: flag("us-ny") },
  { code: "us-nc", name: "North Carolina", flagUrl: flag("us-nc") },
  { code: "us-nd", name: "North Dakota", flagUrl: flag("us-nd") },
  { code: "us-oh", name: "Ohio", flagUrl: flag("us-oh") },
  { code: "us-ok", name: "Oklahoma", flagUrl: flag("us-ok") },
  { code: "us-or", name: "Oregon", flagUrl: flag("us-or") },
  { code: "us-pa", name: "Pennsylvania", flagUrl: flag("us-pa") },
  { code: "us-ri", name: "Rhode Island", flagUrl: flag("us-ri") },
  { code: "us-sc", name: "South Carolina", flagUrl: flag("us-sc") },
  { code: "us-sd", name: "South Dakota", flagUrl: flag("us-sd") },
  { code: "us-tn", name: "Tennessee", flagUrl: flag("us-tn") },
  { code: "us-tx", name: "Texas", flagUrl: flag("us-tx") },
  { code: "us-ut", name: "Utah", flagUrl: flag("us-ut") },
  { code: "us-vt", name: "Vermont", flagUrl: flag("us-vt") },
  { code: "us-va", name: "Virginia", flagUrl: flag("us-va") },
  { code: "us-wa", name: "Washington", flagUrl: flag("us-wa") },
  { code: "us-wv", name: "West Virginia", flagUrl: flag("us-wv") },
  { code: "us-wi", name: "Wisconsin", flagUrl: flag("us-wi") },
  { code: "us-wy", name: "Wyoming", flagUrl: flag("us-wy") },
]

const CA_PROVINCES: SubRegion[] = [
  { code: "ca-ab", name: "Alberta", flagUrl: flag("ca-ab") },
  { code: "ca-bc", name: "British Columbia", flagUrl: flag("ca-bc") },
  { code: "ca-mb", name: "Manitoba", flagUrl: flag("ca-mb") },
  { code: "ca-nb", name: "New Brunswick", flagUrl: flag("ca-nb") },
  { code: "ca-nl", name: "Newfoundland and Labrador", flagUrl: flag("ca-nl") },
  { code: "ca-nt", name: "Northwest Territories", flagUrl: flag("ca-nt") },
  { code: "ca-ns", name: "Nova Scotia", flagUrl: flag("ca-ns") },
  { code: "ca-nu", name: "Nunavut", flagUrl: flag("ca-nu") },
  { code: "ca-on", name: "Ontario", flagUrl: flag("ca-on") },
  { code: "ca-pe", name: "Prince Edward Island", flagUrl: flag("ca-pe") },
  { code: "ca-qc", name: "Quebec", flagUrl: flag("ca-qc") },
  { code: "ca-sk", name: "Saskatchewan", flagUrl: flag("ca-sk") },
  { code: "ca-yt", name: "Yukon", flagUrl: flag("ca-yt") },
]

const MX_STATES: SubRegion[] = [
  { code: "mx-agu", name: "Aguascalientes", flagUrl: flag("mx-agu") },
  { code: "mx-bcn", name: "Baja California", flagUrl: flag("mx-bcn") },
  { code: "mx-bcs", name: "Baja California Sur", flagUrl: flag("mx-bcs") },
  { code: "mx-cam", name: "Campeche", flagUrl: flag("mx-cam") },
  { code: "mx-chp", name: "Chiapas", flagUrl: flag("mx-chp") },
  { code: "mx-chh", name: "Chihuahua", flagUrl: flag("mx-chh") },
  { code: "mx-cmx", name: "Mexico City", flagUrl: flag("mx-cmx") },
  { code: "mx-coa", name: "Coahuila", flagUrl: flag("mx-coa") },
  { code: "mx-col", name: "Colima", flagUrl: flag("mx-col") },
  { code: "mx-dur", name: "Durango", flagUrl: flag("mx-dur") },
  { code: "mx-gua", name: "Guanajuato", flagUrl: flag("mx-gua") },
  { code: "mx-gro", name: "Guerrero", flagUrl: flag("mx-gro") },
  { code: "mx-hid", name: "Hidalgo", flagUrl: flag("mx-hid") },
  { code: "mx-jal", name: "Jalisco", flagUrl: flag("mx-jal") },
  { code: "mx-mex", name: "State of Mexico", flagUrl: flag("mx-mex") },
  { code: "mx-mic", name: "Michoacan", flagUrl: flag("mx-mic") },
  { code: "mx-mor", name: "Morelos", flagUrl: flag("mx-mor") },
  { code: "mx-nay", name: "Nayarit", flagUrl: flag("mx-nay") },
  { code: "mx-nle", name: "Nuevo Leon", flagUrl: flag("mx-nle") },
  { code: "mx-oax", name: "Oaxaca", flagUrl: flag("mx-oax") },
  { code: "mx-pue", name: "Puebla", flagUrl: flag("mx-pue") },
  { code: "mx-que", name: "Queretaro", flagUrl: flag("mx-que") },
  { code: "mx-roo", name: "Quintana Roo", flagUrl: flag("mx-roo") },
  { code: "mx-slp", name: "San Luis Potosi", flagUrl: flag("mx-slp") },
  { code: "mx-sin", name: "Sinaloa", flagUrl: flag("mx-sin") },
  { code: "mx-son", name: "Sonora", flagUrl: flag("mx-son") },
  { code: "mx-tab", name: "Tabasco", flagUrl: flag("mx-tab") },
  { code: "mx-tam", name: "Tamaulipas", flagUrl: flag("mx-tam") },
  { code: "mx-tla", name: "Tlaxcala", flagUrl: flag("mx-tla") },
  { code: "mx-ver", name: "Veracruz", flagUrl: flag("mx-ver") },
  { code: "mx-yuc", name: "Yucatan", flagUrl: flag("mx-yuc") },
  { code: "mx-zac", name: "Zacatecas", flagUrl: flag("mx-zac") },
]

// ── SOUTH AMERICA ─────────────────────────────────────────────────────────────

const BR_STATES: SubRegion[] = [
  { code: "br-ac", name: "Acre", flagUrl: flag("br-ac") },
  { code: "br-al", name: "Alagoas", flagUrl: flag("br-al") },
  { code: "br-am", name: "Amazonas", flagUrl: flag("br-am") },
  { code: "br-ap", name: "Amapá", flagUrl: flag("br-ap") },
  { code: "br-ba", name: "Bahia", flagUrl: flag("br-ba") },
  { code: "br-ce", name: "Ceará", flagUrl: flag("br-ce") },
  { code: "br-df", name: "Distrito Federal", flagUrl: flag("br-df") },
  { code: "br-es", name: "Espírito Santo", flagUrl: flag("br-es") },
  { code: "br-go", name: "Goiás", flagUrl: flag("br-go") },
  { code: "br-ma", name: "Maranhão", flagUrl: flag("br-ma") },
  { code: "br-mg", name: "Minas Gerais", flagUrl: flag("br-mg") },
  { code: "br-ms", name: "Mato Grosso do Sul", flagUrl: flag("br-ms") },
  { code: "br-mt", name: "Mato Grosso", flagUrl: flag("br-mt") },
  { code: "br-pa", name: "Pará", flagUrl: flag("br-pa") },
  { code: "br-pb", name: "Paraíba", flagUrl: flag("br-pb") },
  { code: "br-pe", name: "Pernambuco", flagUrl: flag("br-pe") },
  { code: "br-pi", name: "Piauí", flagUrl: flag("br-pi") },
  { code: "br-pr", name: "Paraná", flagUrl: flag("br-pr") },
  { code: "br-rj", name: "Rio de Janeiro", flagUrl: flag("br-rj") },
  { code: "br-rn", name: "Rio Grande do Norte", flagUrl: flag("br-rn") },
  { code: "br-ro", name: "Rondônia", flagUrl: flag("br-ro") },
  { code: "br-rr", name: "Roraima", flagUrl: flag("br-rr") },
  { code: "br-rs", name: "Rio Grande do Sul", flagUrl: flag("br-rs") },
  { code: "br-sc", name: "Santa Catarina", flagUrl: flag("br-sc") },
  { code: "br-se", name: "Sergipe", flagUrl: flag("br-se") },
  { code: "br-sp", name: "São Paulo", flagUrl: flag("br-sp") },
  { code: "br-to", name: "Tocantins", flagUrl: flag("br-to") },
]

const AR_PROVINCES: SubRegion[] = [
  { code: "ar-a", name: "Salta", flagUrl: flag("ar-a") },
  { code: "ar-b", name: "Buenos Aires Province", flagUrl: flag("ar-b") },
  { code: "ar-c", name: "Buenos Aires City", flagUrl: flag("ar-c") },
  { code: "ar-d", name: "San Luis", flagUrl: flag("ar-d") },
  { code: "ar-e", name: "Entre Ríos", flagUrl: flag("ar-e") },
  { code: "ar-f", name: "La Rioja", flagUrl: flag("ar-f") },
  { code: "ar-g", name: "Santiago del Estero", flagUrl: flag("ar-g") },
  { code: "ar-h", name: "Chaco", flagUrl: flag("ar-h") },
  { code: "ar-j", name: "San Juan", flagUrl: flag("ar-j") },
  { code: "ar-k", name: "Catamarca", flagUrl: flag("ar-k") },
  { code: "ar-l", name: "La Pampa", flagUrl: flag("ar-l") },
  { code: "ar-m", name: "Mendoza", flagUrl: flag("ar-m") },
  { code: "ar-n", name: "Misiones", flagUrl: flag("ar-n") },
  { code: "ar-p", name: "Formosa", flagUrl: flag("ar-p") },
  { code: "ar-q", name: "Neuquén", flagUrl: flag("ar-q") },
  { code: "ar-r", name: "Río Negro", flagUrl: flag("ar-r") },
  { code: "ar-s", name: "Santa Fe", flagUrl: flag("ar-s") },
  { code: "ar-t", name: "Tucumán", flagUrl: flag("ar-t") },
  { code: "ar-u", name: "Chubut", flagUrl: flag("ar-u") },
  { code: "ar-v", name: "Tierra del Fuego", flagUrl: flag("ar-v") },
  { code: "ar-w", name: "Corrientes", flagUrl: flag("ar-w") },
  { code: "ar-x", name: "Córdoba", flagUrl: flag("ar-x") },
  { code: "ar-y", name: "Jujuy", flagUrl: flag("ar-y") },
  { code: "ar-z", name: "Santa Cruz", flagUrl: flag("ar-z") },
]

// ── EUROPE ────────────────────────────────────────────────────────────────────

const ES_COMMUNITIES: SubRegion[] = [
  { code: "es-an", name: "Andalusia", flagUrl: flag("es-an") },
  { code: "es-ar", name: "Aragon", flagUrl: flag("es-ar") },
  { code: "es-as", name: "Asturias", flagUrl: flag("es-as") },
  { code: "es-ib", name: "Balearic Islands", flagUrl: flag("es-ib") },
  { code: "es-pv", name: "Basque Country", flagUrl: flag("es-pv") },
  { code: "es-cn", name: "Canary Islands", flagUrl: flag("es-cn") },
  { code: "es-cb", name: "Cantabria", flagUrl: flag("es-cb") },
  { code: "es-cl", name: "Castile and León", flagUrl: flag("es-cl") },
  { code: "es-cm", name: "Castile-La Mancha", flagUrl: flag("es-cm") },
  { code: "es-ct", name: "Catalonia", flagUrl: flag("es-ct") },
  { code: "es-ex", name: "Extremadura", flagUrl: flag("es-ex") },
  { code: "es-ga", name: "Galicia", flagUrl: flag("es-ga") },
  { code: "es-ri", name: "La Rioja", flagUrl: flag("es-ri") },
  { code: "es-md", name: "Madrid", flagUrl: flag("es-md") },
  { code: "es-mc", name: "Murcia", flagUrl: flag("es-mc") },
  { code: "es-nc", name: "Navarre", flagUrl: flag("es-nc") },
  { code: "es-vc", name: "Valencian Community", flagUrl: flag("es-vc") },
]

const UK_NATIONS: SubRegion[] = [
  { code: "gb-eng", name: "England", flagUrl: flag("gb-eng") },
  { code: "gb-sct", name: "Scotland", flagUrl: flag("gb-sct") },
  { code: "gb-wls", name: "Wales", flagUrl: flag("gb-wls") },
  { code: "gb-nir", name: "Northern Ireland", flagUrl: flag("gb-nir") },
]

// ─────────────────────────────────────────────────────────────────────────────

export const CHALLENGE_CONTINENTS: ChallengeContinent[] = [
  // ── NORTH AMERICA (Northern + Central America) ───────────────────────────
  {
    id: "north-america",
    name: "North America",
    emoji: "🌎",
    locked: false,
    countries: [
      // Northern America
      { code: "US", name: "United States", emoji: "🇺🇸", subTitle: "50 States", subRegions: US_STATES, locked: false },
      { code: "CA", name: "Canada", emoji: "🇨🇦", subTitle: "13 Provinces & Territories", subRegions: CA_PROVINCES, locked: false },
      { code: "MX", name: "Mexico", emoji: "🇲🇽", subTitle: "32 States", subRegions: MX_STATES, locked: false },
      // Central America
      { code: "BZ", name: "Belize", emoji: "🇧🇿", subTitle: "6 Districts", subRegions: [], locked: true },
      { code: "GT", name: "Guatemala", emoji: "🇬🇹", subTitle: "22 Departments", subRegions: [], locked: true },
      { code: "HN", name: "Honduras", emoji: "🇭🇳", subTitle: "18 Departments", subRegions: [], locked: true },
      { code: "SV", name: "El Salvador", emoji: "🇸🇻", subTitle: "14 Departments", subRegions: [], locked: true },
      { code: "NI", name: "Nicaragua", emoji: "🇳🇮", subTitle: "15 Departments", subRegions: [], locked: true },
      { code: "CR", name: "Costa Rica", emoji: "🇨🇷", subTitle: "7 Provinces", subRegions: [], locked: true },
      { code: "PA", name: "Panama", emoji: "🇵🇦", subTitle: "10 Provinces", subRegions: [], locked: true },
    ],
  },

  // ── CARIBBEAN ─────────────────────────────────────────────────────────────
  {
    id: "caribbean",
    name: "Caribbean",
    emoji: "🏝️",
    locked: false,
    countries: [
      { code: "CU", name: "Cuba", emoji: "🇨🇺", subTitle: "15 Provinces", subRegions: [], locked: true },
      { code: "JM", name: "Jamaica", emoji: "🇯🇲", subTitle: "14 Parishes", subRegions: [], locked: true },
      { code: "HT", name: "Haiti", emoji: "🇭🇹", subTitle: "10 Departments", subRegions: [], locked: true },
      { code: "DO", name: "Dominican Republic", emoji: "🇩🇴", subTitle: "32 Provinces", subRegions: [], locked: true },
      { code: "TT", name: "Trinidad and Tobago", emoji: "🇹🇹", subTitle: "14 Regions", subRegions: [], locked: true },
      { code: "BB", name: "Barbados", emoji: "🇧🇧", subTitle: "11 Parishes", subRegions: [], locked: true },
      { code: "LC", name: "Saint Lucia", emoji: "🇱🇨", subTitle: "10 Districts", subRegions: [], locked: true },
      { code: "VC", name: "St Vincent & Grenadines", emoji: "🇻🇨", subTitle: "6 Parishes", subRegions: [], locked: true },
      { code: "GD", name: "Grenada", emoji: "🇬🇩", subTitle: "6 Parishes", subRegions: [], locked: true },
      { code: "AG", name: "Antigua and Barbuda", emoji: "🇦🇬", subTitle: "8 Parishes", subRegions: [], locked: true },
      { code: "DM", name: "Dominica", emoji: "🇩🇲", subTitle: "10 Parishes", subRegions: [], locked: true },
      { code: "KN", name: "Saint Kitts and Nevis", emoji: "🇰🇳", subTitle: "14 Parishes", subRegions: [], locked: true },
      { code: "BS", name: "Bahamas", emoji: "🇧🇸", subTitle: "32 Districts", subRegions: [], locked: true },
    ],
  },

  // ── SOUTH AMERICA ─────────────────────────────────────────────────────────
  {
    id: "south-america",
    name: "South America",
    emoji: "🌎",
    locked: false,
    countries: [
      { code: "BR", name: "Brazil", emoji: "🇧🇷", subTitle: "27 States", subRegions: BR_STATES, locked: false },
      { code: "AR", name: "Argentina", emoji: "🇦🇷", subTitle: "24 Provinces", subRegions: AR_PROVINCES, locked: false },
      { code: "CO", name: "Colombia", emoji: "🇨🇴", subTitle: "32 Departments", subRegions: [], locked: true },
      { code: "VE", name: "Venezuela", emoji: "🇻🇪", subTitle: "23 States", subRegions: [], locked: true },
      { code: "PE", name: "Peru", emoji: "🇵🇪", subTitle: "25 Regions", subRegions: [], locked: true },
      { code: "CL", name: "Chile", emoji: "🇨🇱", subTitle: "16 Regions", subRegions: [], locked: true },
      { code: "EC", name: "Ecuador", emoji: "🇪🇨", subTitle: "24 Provinces", subRegions: [], locked: true },
      { code: "BO", name: "Bolivia", emoji: "🇧🇴", subTitle: "9 Departments", subRegions: [], locked: true },
      { code: "PY", name: "Paraguay", emoji: "🇵🇾", subTitle: "17 Departments", subRegions: [], locked: true },
      { code: "UY", name: "Uruguay", emoji: "🇺🇾", subTitle: "19 Departments", subRegions: [], locked: true },
      { code: "GY", name: "Guyana", emoji: "🇬🇾", subTitle: "10 Regions", subRegions: [], locked: true },
      { code: "SR", name: "Suriname", emoji: "🇸🇷", subTitle: "10 Districts", subRegions: [], locked: true },
    ],
  },

  // ── EUROPE ────────────────────────────────────────────────────────────────
  {
    id: "europe",
    name: "Europe",
    emoji: "🌍",
    locked: false,
    countries: [
      { code: "ES", name: "Spain", emoji: "🇪🇸", subTitle: "17 Autonomous Communities", subRegions: ES_COMMUNITIES, locked: false },
      { code: "GB", name: "United Kingdom", emoji: "🇬🇧", subTitle: "4 Nations", subRegions: UK_NATIONS, locked: false },
      { code: "DE", name: "Germany", emoji: "🇩🇪", subTitle: "16 States", subRegions: [], locked: true },
      { code: "FR", name: "France", emoji: "🇫🇷", subTitle: "18 Regions", subRegions: [], locked: true },
      { code: "IT", name: "Italy", emoji: "🇮🇹", subTitle: "20 Regions", subRegions: [], locked: true },
      { code: "PT", name: "Portugal", emoji: "🇵🇹", subTitle: "18 Districts", subRegions: [], locked: true },
      { code: "NL", name: "Netherlands", emoji: "🇳🇱", subTitle: "12 Provinces", subRegions: [], locked: true },
      { code: "BE", name: "Belgium", emoji: "🇧🇪", subTitle: "10 Provinces", subRegions: [], locked: true },
      { code: "CH", name: "Switzerland", emoji: "🇨🇭", subTitle: "26 Cantons", subRegions: [], locked: true },
      { code: "AT", name: "Austria", emoji: "🇦🇹", subTitle: "9 States", subRegions: [], locked: true },
      { code: "PL", name: "Poland", emoji: "🇵🇱", subTitle: "16 Voivodeships", subRegions: [], locked: true },
      { code: "SE", name: "Sweden", emoji: "🇸🇪", subTitle: "21 Counties", subRegions: [], locked: true },
      { code: "NO", name: "Norway", emoji: "🇳🇴", subTitle: "15 Counties", subRegions: [], locked: true },
      { code: "DK", name: "Denmark", emoji: "🇩🇰", subTitle: "5 Regions", subRegions: [], locked: true },
      { code: "FI", name: "Finland", emoji: "🇫🇮", subTitle: "19 Regions", subRegions: [], locked: true },
      { code: "IE", name: "Ireland", emoji: "🇮🇪", subTitle: "4 Provinces", subRegions: [], locked: true },
      { code: "IS", name: "Iceland", emoji: "🇮🇸", subTitle: "8 Regions", subRegions: [], locked: true },
      { code: "GR", name: "Greece", emoji: "🇬🇷", subTitle: "13 Regions", subRegions: [], locked: true },
      { code: "RO", name: "Romania", emoji: "🇷🇴", subTitle: "41 Counties", subRegions: [], locked: true },
      { code: "HU", name: "Hungary", emoji: "🇭🇺", subTitle: "19 Counties", subRegions: [], locked: true },
      { code: "CZ", name: "Czech Republic", emoji: "🇨🇿", subTitle: "14 Regions", subRegions: [], locked: true },
      { code: "AD", name: "Andorra", emoji: "🇦🇩", subTitle: "7 Parishes", subRegions: [], locked: true },
    ],
  },

  // ── ASIA ──────────────────────────────────────────────────────────────────
  {
    id: "asia",
    name: "Asia",
    emoji: "🌏",
    locked: false,
    countries: [
      { code: "CN", name: "China", emoji: "🇨🇳", subTitle: "34 Provinces & Regions", subRegions: [], locked: true },
      { code: "IN", name: "India", emoji: "🇮🇳", subTitle: "28 States", subRegions: [], locked: true },
      { code: "JP", name: "Japan", emoji: "🇯🇵", subTitle: "47 Prefectures", subRegions: [], locked: true },
      { code: "KR", name: "South Korea", emoji: "🇰🇷", subTitle: "17 Provinces", subRegions: [], locked: true },
      { code: "ID", name: "Indonesia", emoji: "🇮🇩", subTitle: "38 Provinces", subRegions: [], locked: true },
      { code: "PH", name: "Philippines", emoji: "🇵🇭", subTitle: "17 Regions", subRegions: [], locked: true },
      { code: "VN", name: "Vietnam", emoji: "🇻🇳", subTitle: "58 Provinces", subRegions: [], locked: true },
      { code: "TH", name: "Thailand", emoji: "🇹🇭", subTitle: "77 Provinces", subRegions: [], locked: true },
      { code: "MY", name: "Malaysia", emoji: "🇲🇾", subTitle: "13 States", subRegions: [], locked: true },
      { code: "KZ", name: "Kazakhstan", emoji: "🇰🇿", subTitle: "17 Regions", subRegions: [], locked: true },
      { code: "PK", name: "Pakistan", emoji: "🇵🇰", subTitle: "4 Provinces", subRegions: [], locked: true },
      { code: "BD", name: "Bangladesh", emoji: "🇧🇩", subTitle: "8 Divisions", subRegions: [], locked: true },
      { code: "MM", name: "Myanmar", emoji: "🇲🇲", subTitle: "14 States & Regions", subRegions: [], locked: true },
      { code: "UZ", name: "Uzbekistan", emoji: "🇺🇿", subTitle: "12 Regions", subRegions: [], locked: true },
      { code: "MN", name: "Mongolia", emoji: "🇲🇳", subTitle: "21 Provinces", subRegions: [], locked: true },
    ],
  },

  // ── AFRICA ────────────────────────────────────────────────────────────────
  {
    id: "africa",
    name: "Africa",
    emoji: "🌍",
    locked: false,
    countries: [
      { code: "NG", name: "Nigeria", emoji: "🇳🇬", subTitle: "36 States", subRegions: [], locked: true },
      { code: "ZA", name: "South Africa", emoji: "🇿🇦", subTitle: "9 Provinces", subRegions: [], locked: true },
      { code: "ET", name: "Ethiopia", emoji: "🇪🇹", subTitle: "12 Regions", subRegions: [], locked: true },
      { code: "EG", name: "Egypt", emoji: "🇪🇬", subTitle: "27 Governorates", subRegions: [], locked: true },
      { code: "CD", name: "DR Congo", emoji: "🇨🇩", subTitle: "26 Provinces", subRegions: [], locked: true },
      { code: "TZ", name: "Tanzania", emoji: "🇹🇿", subTitle: "31 Regions", subRegions: [], locked: true },
      { code: "KE", name: "Kenya", emoji: "🇰🇪", subTitle: "47 Counties", subRegions: [], locked: true },
      { code: "GH", name: "Ghana", emoji: "🇬🇭", subTitle: "16 Regions", subRegions: [], locked: true },
      { code: "MA", name: "Morocco", emoji: "🇲🇦", subTitle: "12 Regions", subRegions: [], locked: true },
      { code: "DZ", name: "Algeria", emoji: "🇩🇿", subTitle: "58 Provinces", subRegions: [], locked: true },
      { code: "AO", name: "Angola", emoji: "🇦🇴", subTitle: "18 Provinces", subRegions: [], locked: true },
      { code: "MZ", name: "Mozambique", emoji: "🇲🇿", subTitle: "10 Provinces", subRegions: [], locked: true },
      { code: "CM", name: "Cameroon", emoji: "🇨🇲", subTitle: "10 Regions", subRegions: [], locked: true },
      { code: "SN", name: "Senegal", emoji: "🇸🇳", subTitle: "14 Regions", subRegions: [], locked: true },
    ],
  },

  // ── OCEANIA ───────────────────────────────────────────────────────────────
  {
    id: "oceania",
    name: "Oceania",
    emoji: "🌊",
    locked: false,
    countries: [
      { code: "AU", name: "Australia", emoji: "🇦🇺", subTitle: "8 States & Territories", subRegions: [], locked: true },
      { code: "NZ", name: "New Zealand", emoji: "🇳🇿", subTitle: "16 Regions", subRegions: [], locked: true },
      { code: "PG", name: "Papua New Guinea", emoji: "🇵🇬", subTitle: "22 Provinces", subRegions: [], locked: true },
      { code: "FJ", name: "Fiji", emoji: "🇫🇯", subTitle: "14 Provinces", subRegions: [], locked: true },
      { code: "SB", name: "Solomon Islands", emoji: "🇸🇧", subTitle: "10 Provinces", subRegions: [], locked: true },
      { code: "VU", name: "Vanuatu", emoji: "🇻🇺", subTitle: "6 Provinces", subRegions: [], locked: true },
      { code: "WS", name: "Samoa", emoji: "🇼🇸", subTitle: "11 Districts", subRegions: [], locked: true },
      { code: "TO", name: "Tonga", emoji: "🇹🇴", subTitle: "5 Districts", subRegions: [], locked: true },
    ],
  },

  // ── MIDDLE EAST ───────────────────────────────────────────────────────────
  {
    id: "middle-east",
    name: "Middle East",
    emoji: "🕌",
    locked: false,
    countries: [
      { code: "TR", name: "Turkey", emoji: "🇹🇷", subTitle: "81 Provinces", subRegions: [], locked: true },
      { code: "IR", name: "Iran", emoji: "🇮🇷", subTitle: "31 Provinces", subRegions: [], locked: true },
      { code: "SA", name: "Saudi Arabia", emoji: "🇸🇦", subTitle: "13 Regions", subRegions: [], locked: true },
      { code: "IQ", name: "Iraq", emoji: "🇮🇶", subTitle: "19 Governorates", subRegions: [], locked: true },
      { code: "AE", name: "UAE", emoji: "🇦🇪", subTitle: "7 Emirates", subRegions: [], locked: true },
      { code: "IL", name: "Israel", emoji: "🇮🇱", subTitle: "6 Districts", subRegions: [], locked: true },
      { code: "JO", name: "Jordan", emoji: "🇯🇴", subTitle: "12 Governorates", subRegions: [], locked: true },
      { code: "YE", name: "Yemen", emoji: "🇾🇪", subTitle: "22 Governorates", subRegions: [], locked: true },
      { code: "SY", name: "Syria", emoji: "🇸🇾", subTitle: "14 Governorates", subRegions: [], locked: true },
      { code: "LB", name: "Lebanon", emoji: "🇱🇧", subTitle: "8 Governorates", subRegions: [], locked: true },
      { code: "OM", name: "Oman", emoji: "🇴🇲", subTitle: "11 Governorates", subRegions: [], locked: true },
      { code: "KW", name: "Kuwait", emoji: "🇰🇼", subTitle: "6 Governorates", subRegions: [], locked: true },
      { code: "QA", name: "Qatar", emoji: "🇶🇦", subTitle: "8 Municipalities", subRegions: [], locked: true },
      { code: "BH", name: "Bahrain", emoji: "🇧🇭", subTitle: "4 Governorates", subRegions: [], locked: true },
    ],
  },
]

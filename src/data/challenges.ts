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

const ES_COMMUNITIES: SubRegion[] = [
  { code: "es-an", name: "Andalusia", flagUrl: flag("es-an") },
  { code: "es-ar", name: "Aragon", flagUrl: flag("es-ar") },
  { code: "es-as", name: "Asturias", flagUrl: flag("es-as") },
  { code: "es-ib", name: "Balearic Islands", flagUrl: flag("es-ib") },
  { code: "es-pv", name: "Basque Country", flagUrl: flag("es-pv") },
  { code: "es-cn", name: "Canary Islands", flagUrl: flag("es-cn") },
  { code: "es-cb", name: "Cantabria", flagUrl: flag("es-cb") },
  { code: "es-cl", name: "Castile and Leon", flagUrl: flag("es-cl") },
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

export const CHALLENGE_CONTINENTS: ChallengeContinent[] = [
  {
    id: "north-america",
    name: "North America",
    emoji: "🌎",
    locked: false,
    countries: [
      { code: "US", name: "United States", emoji: "🇺🇸", subTitle: "50 States", subRegions: US_STATES, locked: false },
      { code: "CA", name: "Canada", emoji: "🇨🇦", subTitle: "13 Provinces & Territories", subRegions: CA_PROVINCES, locked: false },
      { code: "MX", name: "Mexico", emoji: "🇲🇽", subTitle: "32 States", subRegions: MX_STATES, locked: false },
      { code: "GT", name: "Guatemala", emoji: "🇬🇹", subTitle: "22 Departments", subRegions: [], locked: true },
      { code: "CU", name: "Cuba", emoji: "🇨🇺", subTitle: "15 Provinces", subRegions: [], locked: true },
      { code: "DO", name: "Dominican Republic", emoji: "🇩🇴", subTitle: "32 Provinces", subRegions: [], locked: true },
      { code: "CR", name: "Costa Rica", emoji: "🇨🇷", subTitle: "7 Provinces", subRegions: [], locked: true },
      { code: "PA", name: "Panama", emoji: "🇵🇦", subTitle: "10 Provinces", subRegions: [], locked: true },
    ],
  },
  {
    id: "south-america",
    name: "South America",
    emoji: "🌎",
    locked: false,
    countries: [
      { code: "BR", name: "Brazil", emoji: "🇧🇷", subTitle: "26 States", subRegions: [], locked: true },
      { code: "AR", name: "Argentina", emoji: "🇦🇷", subTitle: "23 Provinces", subRegions: [], locked: true },
      { code: "CO", name: "Colombia", emoji: "🇨🇴", subTitle: "32 Departments", subRegions: [], locked: true },
      { code: "PE", name: "Peru", emoji: "🇵🇪", subTitle: "25 Regions", subRegions: [], locked: true },
      { code: "CL", name: "Chile", emoji: "🇨🇱", subTitle: "16 Regions", subRegions: [], locked: true },
      { code: "VE", name: "Venezuela", emoji: "🇻🇪", subTitle: "23 States", subRegions: [], locked: true },
      { code: "EC", name: "Ecuador", emoji: "🇪🇨", subTitle: "24 Provinces", subRegions: [], locked: true },
      { code: "BO", name: "Bolivia", emoji: "🇧🇴", subTitle: "9 Departments", subRegions: [], locked: true },
    ],
  },
  {
    id: "europe",
    name: "Europe",
    emoji: "🌍",
    locked: false,
    countries: [
      { code: "ES", name: "Spain", emoji: "🇪🇸", subTitle: "17 Autonomous Communities", subRegions: ES_COMMUNITIES, locked: false },
      { code: "GB", name: "United Kingdom", emoji: "🇬🇧", subTitle: "4 Nations", subRegions: UK_NATIONS, locked: false },
      { code: "PT", name: "Portugal", emoji: "🇵🇹", subTitle: "18 Districts", subRegions: [], locked: true },
      { code: "FR", name: "France", emoji: "🇫🇷", subTitle: "18 Regions", subRegions: [], locked: true },
      { code: "IE", name: "Ireland", emoji: "🇮🇪", subTitle: "4 Provinces", subRegions: [], locked: true },
      { code: "IS", name: "Iceland", emoji: "🇮🇸", subTitle: "8 Regions", subRegions: [], locked: true },
      { code: "AD", name: "Andorra", emoji: "🇦🇩", subTitle: "7 Parishes", subRegions: [], locked: true },
    ],
  },
  { id: "asia", name: "Asia", emoji: "🌏", locked: true, countries: [] },
  { id: "africa", name: "Africa", emoji: "🌍", locked: true, countries: [] },
  { id: "oceania", name: "Oceania", emoji: "🌊", locked: true, countries: [] },
  { id: "middle-east", name: "Middle East", emoji: "🕌", locked: true, countries: [] },
]

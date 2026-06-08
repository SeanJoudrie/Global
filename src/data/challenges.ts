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

export const CHALLENGE_CONTINENTS: ChallengeContinent[] = [
  {
    id: "americas",
    name: "The Americas",
    emoji: "🌎",
    locked: false,
    countries: [
      { code: "US", name: "United States", emoji: "🇺🇸", subTitle: "50 States", subRegions: US_STATES, locked: false },
      { code: "CA", name: "Canada", emoji: "🇨🇦", subTitle: "13 Provinces & Territories", subRegions: CA_PROVINCES, locked: false },
      { code: "MX", name: "Mexico", emoji: "🇲🇽", subTitle: "32 States", subRegions: [], locked: true },
      { code: "BR", name: "Brazil", emoji: "🇧🇷", subTitle: "26 States", subRegions: [], locked: true },
    ],
  },
  { id: "europe", name: "Europe", emoji: "🌍", locked: true, countries: [] },
  { id: "asia", name: "Asia", emoji: "🌏", locked: true, countries: [] },
  { id: "africa", name: "Africa", emoji: "🌍", locked: true, countries: [] },
  { id: "oceania", name: "Oceania", emoji: "🌊", locked: true, countries: [] },
  { id: "middleeast", name: "Middle East", emoji: "🕌", locked: true, countries: [] },
  { id: "antarctica", name: "Antarctica", emoji: "🧊", locked: true, countries: [] },
]

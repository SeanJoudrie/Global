export interface SubRegion {
  code: string
  name: string
  flagUrl: string
  group?: string
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

// flag-icons via jsDelivr — covers national flags and some major subdivisions (US states, gb-eng/sct/wls/nir)
const flag = (iso: string) => `https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/flags/4x3/${iso.toLowerCase()}.svg`
// Wikimedia Commons Special:FilePath — reliable redirect to actual CDN URL
const wiki = (file: string) => `https://commons.wikimedia.org/wiki/Special:FilePath/${file.replace(/ /g, '_')}`

// ── UNITED STATES (50 states) ─────────────────────────────────────────────────
const US_STATES: SubRegion[] = [
  { code: "us-al", name: "Alabama",        flagUrl: flag("us-al") },
  { code: "us-ak", name: "Alaska",         flagUrl: flag("us-ak") },
  { code: "us-az", name: "Arizona",        flagUrl: flag("us-az") },
  { code: "us-ar", name: "Arkansas",       flagUrl: flag("us-ar") },
  { code: "us-ca", name: "California",     flagUrl: flag("us-ca") },
  { code: "us-co", name: "Colorado",       flagUrl: flag("us-co") },
  { code: "us-ct", name: "Connecticut",    flagUrl: flag("us-ct") },
  { code: "us-de", name: "Delaware",       flagUrl: flag("us-de") },
  { code: "us-fl", name: "Florida",        flagUrl: flag("us-fl") },
  { code: "us-ga", name: "Georgia",        flagUrl: flag("us-ga") },
  { code: "us-hi", name: "Hawaii",         flagUrl: flag("us-hi") },
  { code: "us-id", name: "Idaho",          flagUrl: flag("us-id") },
  { code: "us-il", name: "Illinois",       flagUrl: flag("us-il") },
  { code: "us-in", name: "Indiana",        flagUrl: flag("us-in") },
  { code: "us-ia", name: "Iowa",           flagUrl: flag("us-ia") },
  { code: "us-ks", name: "Kansas",         flagUrl: flag("us-ks") },
  { code: "us-ky", name: "Kentucky",       flagUrl: flag("us-ky") },
  { code: "us-la", name: "Louisiana",      flagUrl: flag("us-la") },
  { code: "us-me", name: "Maine",          flagUrl: flag("us-me") },
  { code: "us-md", name: "Maryland",       flagUrl: flag("us-md") },
  { code: "us-ma", name: "Massachusetts",  flagUrl: flag("us-ma") },
  { code: "us-mi", name: "Michigan",       flagUrl: flag("us-mi") },
  { code: "us-mn", name: "Minnesota",      flagUrl: flag("us-mn") },
  { code: "us-ms", name: "Mississippi",    flagUrl: flag("us-ms") },
  { code: "us-mo", name: "Missouri",       flagUrl: flag("us-mo") },
  { code: "us-mt", name: "Montana",        flagUrl: flag("us-mt") },
  { code: "us-ne", name: "Nebraska",       flagUrl: flag("us-ne") },
  { code: "us-nv", name: "Nevada",         flagUrl: flag("us-nv") },
  { code: "us-nh", name: "New Hampshire",  flagUrl: flag("us-nh") },
  { code: "us-nj", name: "New Jersey",     flagUrl: flag("us-nj") },
  { code: "us-nm", name: "New Mexico",     flagUrl: flag("us-nm") },
  { code: "us-ny", name: "New York",       flagUrl: flag("us-ny") },
  { code: "us-nc", name: "North Carolina", flagUrl: flag("us-nc") },
  { code: "us-nd", name: "North Dakota",   flagUrl: flag("us-nd") },
  { code: "us-oh", name: "Ohio",           flagUrl: flag("us-oh") },
  { code: "us-ok", name: "Oklahoma",       flagUrl: flag("us-ok") },
  { code: "us-or", name: "Oregon",         flagUrl: flag("us-or") },
  { code: "us-pa", name: "Pennsylvania",   flagUrl: flag("us-pa") },
  { code: "us-ri", name: "Rhode Island",   flagUrl: flag("us-ri") },
  { code: "us-sc", name: "South Carolina", flagUrl: flag("us-sc") },
  { code: "us-sd", name: "South Dakota",   flagUrl: flag("us-sd") },
  { code: "us-tn", name: "Tennessee",      flagUrl: flag("us-tn") },
  { code: "us-tx", name: "Texas",          flagUrl: flag("us-tx") },
  { code: "us-ut", name: "Utah",           flagUrl: flag("us-ut") },
  { code: "us-vt", name: "Vermont",        flagUrl: flag("us-vt") },
  { code: "us-va", name: "Virginia",       flagUrl: flag("us-va") },
  { code: "us-wa", name: "Washington",     flagUrl: flag("us-wa") },
  { code: "us-wv", name: "West Virginia",  flagUrl: flag("us-wv") },
  { code: "us-wi", name: "Wisconsin",      flagUrl: flag("us-wi") },
  { code: "us-wy", name: "Wyoming",        flagUrl: flag("us-wy") },
]

// ── CANADA (13 provinces & territories) ──────────────────────────────────────
const CA_PROVINCES: SubRegion[] = [
  { code: "ca-ab", name: "Alberta",                    flagUrl: flag("ca-ab") },
  { code: "ca-bc", name: "British Columbia",           flagUrl: flag("ca-bc") },
  { code: "ca-mb", name: "Manitoba",                   flagUrl: flag("ca-mb") },
  { code: "ca-nb", name: "New Brunswick",              flagUrl: flag("ca-nb") },
  { code: "ca-nl", name: "Newfoundland and Labrador",  flagUrl: flag("ca-nl") },
  { code: "ca-nt", name: "Northwest Territories",      flagUrl: flag("ca-nt") },
  { code: "ca-ns", name: "Nova Scotia",                flagUrl: flag("ca-ns") },
  { code: "ca-nu", name: "Nunavut",                    flagUrl: flag("ca-nu") },
  { code: "ca-on", name: "Ontario",                    flagUrl: flag("ca-on") },
  { code: "ca-pe", name: "Prince Edward Island",       flagUrl: flag("ca-pe") },
  { code: "ca-qc", name: "Quebec",                     flagUrl: flag("ca-qc") },
  { code: "ca-sk", name: "Saskatchewan",               flagUrl: flag("ca-sk") },
  { code: "ca-yt", name: "Yukon",                      flagUrl: flag("ca-yt") },
]

// ── MEXICO (32 states) ────────────────────────────────────────────────────────
const MX_STATES: SubRegion[] = [
  { code: "mx-agu", name: "Aguascalientes",    flagUrl: flag("mx-agu") },
  { code: "mx-bcn", name: "Baja California",  flagUrl: flag("mx-bcn") },
  { code: "mx-bcs", name: "Baja California Sur", flagUrl: flag("mx-bcs") },
  { code: "mx-cam", name: "Campeche",          flagUrl: flag("mx-cam") },
  { code: "mx-chp", name: "Chiapas",           flagUrl: flag("mx-chp") },
  { code: "mx-chh", name: "Chihuahua",         flagUrl: flag("mx-chh") },
  { code: "mx-cmx", name: "Mexico City",       flagUrl: flag("mx-cmx") },
  { code: "mx-coa", name: "Coahuila",          flagUrl: flag("mx-coa") },
  { code: "mx-col", name: "Colima",            flagUrl: flag("mx-col") },
  { code: "mx-dur", name: "Durango",           flagUrl: flag("mx-dur") },
  { code: "mx-gua", name: "Guanajuato",        flagUrl: flag("mx-gua") },
  { code: "mx-gro", name: "Guerrero",          flagUrl: flag("mx-gro") },
  { code: "mx-hid", name: "Hidalgo",           flagUrl: flag("mx-hid") },
  { code: "mx-jal", name: "Jalisco",           flagUrl: flag("mx-jal") },
  { code: "mx-mex", name: "State of Mexico",   flagUrl: flag("mx-mex") },
  { code: "mx-mic", name: "Michoacán",         flagUrl: flag("mx-mic") },
  { code: "mx-mor", name: "Morelos",           flagUrl: flag("mx-mor") },
  { code: "mx-nay", name: "Nayarit",           flagUrl: flag("mx-nay") },
  { code: "mx-nle", name: "Nuevo León",        flagUrl: flag("mx-nle") },
  { code: "mx-oax", name: "Oaxaca",            flagUrl: flag("mx-oax") },
  { code: "mx-pue", name: "Puebla",            flagUrl: flag("mx-pue") },
  { code: "mx-que", name: "Querétaro",         flagUrl: flag("mx-que") },
  { code: "mx-roo", name: "Quintana Roo",      flagUrl: flag("mx-roo") },
  { code: "mx-slp", name: "San Luis Potosí",   flagUrl: flag("mx-slp") },
  { code: "mx-sin", name: "Sinaloa",           flagUrl: flag("mx-sin") },
  { code: "mx-son", name: "Sonora",            flagUrl: flag("mx-son") },
  { code: "mx-tab", name: "Tabasco",           flagUrl: flag("mx-tab") },
  { code: "mx-tam", name: "Tamaulipas",        flagUrl: flag("mx-tam") },
  { code: "mx-tla", name: "Tlaxcala",          flagUrl: flag("mx-tla") },
  { code: "mx-ver", name: "Veracruz",          flagUrl: flag("mx-ver") },
  { code: "mx-yuc", name: "Yucatán",           flagUrl: flag("mx-yuc") },
  { code: "mx-zac", name: "Zacatecas",         flagUrl: flag("mx-zac") },
]

// ── BELIZE (6 districts) ──────────────────────────────────────────────────────
const BZ_DISTRICTS: SubRegion[] = [
  { code: "bz-bz",  name: "Belize District", flagUrl: flag("bz-bz")  },
  { code: "bz-cy",  name: "Cayo",            flagUrl: flag("bz-cy")  },
  { code: "bz-czl", name: "Corozal",         flagUrl: flag("bz-czl") },
  { code: "bz-ow",  name: "Orange Walk",     flagUrl: flag("bz-ow")  },
  { code: "bz-sc",  name: "Stann Creek",     flagUrl: flag("bz-sc")  },
  { code: "bz-tol", name: "Toledo",          flagUrl: flag("bz-tol") },
]

// ── GUATEMALA (22 departments) ────────────────────────────────────────────────
const GT_DEPARTMENTS: SubRegion[] = [
  { code: "gt-av", name: "Alta Verapaz",    flagUrl: flag("gt-av") },
  { code: "gt-bv", name: "Baja Verapaz",    flagUrl: flag("gt-bv") },
  { code: "gt-cm", name: "Chimaltenango",   flagUrl: flag("gt-cm") },
  { code: "gt-cq", name: "Chiquimula",      flagUrl: flag("gt-cq") },
  { code: "gt-es", name: "Escuintla",       flagUrl: flag("gt-es") },
  { code: "gt-gu", name: "Guatemala",       flagUrl: flag("gt-gu") },
  { code: "gt-hu", name: "Huehuetenango",   flagUrl: flag("gt-hu") },
  { code: "gt-iz", name: "Izabal",          flagUrl: flag("gt-iz") },
  { code: "gt-ja", name: "Jalapa",          flagUrl: flag("gt-ja") },
  { code: "gt-ju", name: "Jutiapa",         flagUrl: flag("gt-ju") },
  { code: "gt-pe", name: "Petén",           flagUrl: flag("gt-pe") },
  { code: "gt-pr", name: "El Progreso",     flagUrl: flag("gt-pr") },
  { code: "gt-qc", name: "Quiché",          flagUrl: flag("gt-qc") },
  { code: "gt-qz", name: "Quetzaltenango",  flagUrl: flag("gt-qz") },
  { code: "gt-re", name: "Retalhuleu",      flagUrl: flag("gt-re") },
  { code: "gt-sa", name: "Sacatepéquez",    flagUrl: flag("gt-sa") },
  { code: "gt-sm", name: "San Marcos",      flagUrl: flag("gt-sm") },
  { code: "gt-so", name: "Sololá",          flagUrl: flag("gt-so") },
  { code: "gt-sr", name: "Santa Rosa",      flagUrl: flag("gt-sr") },
  { code: "gt-su", name: "Suchitepéquez",   flagUrl: flag("gt-su") },
  { code: "gt-to", name: "Totonicapán",     flagUrl: flag("gt-to") },
  { code: "gt-za", name: "Zacapa",          flagUrl: flag("gt-za") },
]

// ── HONDURAS (18 departments) ─────────────────────────────────────────────────
const HN_DEPARTMENTS: SubRegion[] = [
  { code: "hn-at", name: "Atlántida",        flagUrl: flag("hn-at") },
  { code: "hn-ch", name: "Choluteca",        flagUrl: flag("hn-ch") },
  { code: "hn-cl", name: "Colón",            flagUrl: flag("hn-cl") },
  { code: "hn-cm", name: "Comayagua",        flagUrl: flag("hn-cm") },
  { code: "hn-cp", name: "Copán",            flagUrl: flag("hn-cp") },
  { code: "hn-cr", name: "Cortés",           flagUrl: flag("hn-cr") },
  { code: "hn-ep", name: "El Paraíso",       flagUrl: flag("hn-ep") },
  { code: "hn-fm", name: "Francisco Morazán",flagUrl: flag("hn-fm") },
  { code: "hn-gd", name: "Gracias a Dios",   flagUrl: flag("hn-gd") },
  { code: "hn-ib", name: "Islas de la Bahía",flagUrl: flag("hn-ib") },
  { code: "hn-in", name: "Intibucá",         flagUrl: flag("hn-in") },
  { code: "hn-le", name: "Lempira",          flagUrl: flag("hn-le") },
  { code: "hn-lp", name: "La Paz",           flagUrl: flag("hn-lp") },
  { code: "hn-oc", name: "Ocotepeque",       flagUrl: flag("hn-oc") },
  { code: "hn-ol", name: "Olancho",          flagUrl: flag("hn-ol") },
  { code: "hn-sb", name: "Santa Bárbara",    flagUrl: flag("hn-sb") },
  { code: "hn-va", name: "Valle",            flagUrl: flag("hn-va") },
  { code: "hn-yo", name: "Yoro",             flagUrl: flag("hn-yo") },
]

// ── EL SALVADOR (14 departments) ──────────────────────────────────────────────
const SV_DEPARTMENTS: SubRegion[] = [
  { code: "sv-ah", name: "Ahuachapán",    flagUrl: flag("sv-ah") },
  { code: "sv-ca", name: "Cabañas",       flagUrl: flag("sv-ca") },
  { code: "sv-ch", name: "Chalatenango",  flagUrl: flag("sv-ch") },
  { code: "sv-cu", name: "Cuscatlán",     flagUrl: flag("sv-cu") },
  { code: "sv-li", name: "La Libertad",   flagUrl: flag("sv-li") },
  { code: "sv-mo", name: "Morazán",       flagUrl: flag("sv-mo") },
  { code: "sv-pa", name: "La Paz",        flagUrl: flag("sv-pa") },
  { code: "sv-sa", name: "Santa Ana",     flagUrl: flag("sv-sa") },
  { code: "sv-sm", name: "San Miguel",    flagUrl: flag("sv-sm") },
  { code: "sv-so", name: "Sonsonate",     flagUrl: flag("sv-so") },
  { code: "sv-ss", name: "San Salvador",  flagUrl: flag("sv-ss") },
  { code: "sv-sv", name: "San Vicente",   flagUrl: flag("sv-sv") },
  { code: "sv-un", name: "La Unión",      flagUrl: flag("sv-un") },
  { code: "sv-us", name: "Usulután",      flagUrl: flag("sv-us") },
]

// ── NICARAGUA (17 departments & autonomous regions) ───────────────────────────
const NI_DEPARTMENTS: SubRegion[] = [
  { code: "ni-an", name: "Costa Caribe Norte", flagUrl: flag("ni-an") },
  { code: "ni-as", name: "Costa Caribe Sur",   flagUrl: flag("ni-as") },
  { code: "ni-bo", name: "Boaco",              flagUrl: flag("ni-bo") },
  { code: "ni-ca", name: "Carazo",             flagUrl: flag("ni-ca") },
  { code: "ni-ci", name: "Chinandega",         flagUrl: flag("ni-ci") },
  { code: "ni-co", name: "Chontales",          flagUrl: flag("ni-co") },
  { code: "ni-es", name: "Estelí",             flagUrl: flag("ni-es") },
  { code: "ni-gr", name: "Granada",            flagUrl: flag("ni-gr") },
  { code: "ni-ji", name: "Jinotega",           flagUrl: flag("ni-ji") },
  { code: "ni-le", name: "León",               flagUrl: flag("ni-le") },
  { code: "ni-md", name: "Madriz",             flagUrl: flag("ni-md") },
  { code: "ni-mn", name: "Managua",            flagUrl: flag("ni-mn") },
  { code: "ni-ms", name: "Masaya",             flagUrl: flag("ni-ms") },
  { code: "ni-mt", name: "Matagalpa",          flagUrl: flag("ni-mt") },
  { code: "ni-ns", name: "Nueva Segovia",      flagUrl: flag("ni-ns") },
  { code: "ni-ri", name: "Rivas",              flagUrl: flag("ni-ri") },
  { code: "ni-sj", name: "Río San Juan",       flagUrl: flag("ni-sj") },
]

// ── COSTA RICA (7 provinces) ──────────────────────────────────────────────────
const CR_PROVINCES: SubRegion[] = [
  { code: "cr-a",  name: "Alajuela",    flagUrl: flag("cr-a")  },
  { code: "cr-c",  name: "Cartago",     flagUrl: flag("cr-c")  },
  { code: "cr-g",  name: "Guanacaste",  flagUrl: flag("cr-g")  },
  { code: "cr-h",  name: "Heredia",     flagUrl: flag("cr-h")  },
  { code: "cr-l",  name: "Limón",       flagUrl: flag("cr-l")  },
  { code: "cr-p",  name: "Puntarenas",  flagUrl: flag("cr-p")  },
  { code: "cr-sj", name: "San José",    flagUrl: flag("cr-sj") },
]

// ── PANAMA (10 provinces) ─────────────────────────────────────────────────────
const PA_PROVINCES: SubRegion[] = [
  { code: "pa-1",  name: "Bocas del Toro", flagUrl: flag("pa-1")  },
  { code: "pa-2",  name: "Coclé",          flagUrl: flag("pa-2")  },
  { code: "pa-3",  name: "Colón",          flagUrl: flag("pa-3")  },
  { code: "pa-4",  name: "Chiriquí",       flagUrl: flag("pa-4")  },
  { code: "pa-5",  name: "Darién",         flagUrl: flag("pa-5")  },
  { code: "pa-6",  name: "Herrera",        flagUrl: flag("pa-6")  },
  { code: "pa-7",  name: "Los Santos",     flagUrl: flag("pa-7")  },
  { code: "pa-8",  name: "Panamá",         flagUrl: flag("pa-8")  },
  { code: "pa-9",  name: "Veraguas",       flagUrl: flag("pa-9")  },
  { code: "pa-10", name: "Panamá Oeste",   flagUrl: flag("pa-10") },
]

// ── CUBA (15 provinces) ───────────────────────────────────────────────────────
const CU_PROVINCES: SubRegion[] = [
  { code: "cu-01", name: "Pinar del Río",    flagUrl: flag("cu-01") },
  { code: "cu-02", name: "Artemisa",         flagUrl: flag("cu-02") },
  { code: "cu-03", name: "La Habana",        flagUrl: flag("cu-03") },
  { code: "cu-04", name: "Mayabeque",        flagUrl: flag("cu-04") },
  { code: "cu-05", name: "Matanzas",         flagUrl: flag("cu-05") },
  { code: "cu-06", name: "Cienfuegos",       flagUrl: flag("cu-06") },
  { code: "cu-07", name: "Villa Clara",      flagUrl: flag("cu-07") },
  { code: "cu-08", name: "Sancti Spíritus",  flagUrl: flag("cu-08") },
  { code: "cu-09", name: "Ciego de Ávila",   flagUrl: flag("cu-09") },
  { code: "cu-10", name: "Camagüey",         flagUrl: flag("cu-10") },
  { code: "cu-11", name: "Las Tunas",        flagUrl: flag("cu-11") },
  { code: "cu-12", name: "Holguín",          flagUrl: flag("cu-12") },
  { code: "cu-13", name: "Granma",           flagUrl: flag("cu-13") },
  { code: "cu-14", name: "Santiago de Cuba", flagUrl: flag("cu-14") },
  { code: "cu-15", name: "Guantánamo",       flagUrl: flag("cu-15") },
]

// ── HAITI (10 departments) ────────────────────────────────────────────────────
const HT_DEPARTMENTS: SubRegion[] = [
  { code: "ht-ar", name: "Artibonite",  flagUrl: flag("ht-ar") },
  { code: "ht-ce", name: "Centre",      flagUrl: flag("ht-ce") },
  { code: "ht-ga", name: "Grande'Anse", flagUrl: flag("ht-ga") },
  { code: "ht-nd", name: "Nord",        flagUrl: flag("ht-nd") },
  { code: "ht-ne", name: "Nord-Est",    flagUrl: flag("ht-ne") },
  { code: "ht-no", name: "Nord-Ouest",  flagUrl: flag("ht-no") },
  { code: "ht-ni", name: "Nippes",      flagUrl: flag("ht-ni") },
  { code: "ht-ou", name: "Ouest",       flagUrl: flag("ht-ou") },
  { code: "ht-sd", name: "Sud",         flagUrl: flag("ht-sd") },
  { code: "ht-se", name: "Sud-Est",     flagUrl: flag("ht-se") },
]

// ── DOMINICAN REPUBLIC (32 provinces + National District = 33) ───────────────
const DO_PROVINCES: SubRegion[] = [
  { code: "do-01", name: "Distrito Nacional",   flagUrl: flag("do-01") },
  { code: "do-02", name: "Azua",                flagUrl: flag("do-02") },
  { code: "do-03", name: "Baoruco",             flagUrl: flag("do-03") },
  { code: "do-04", name: "Barahona",            flagUrl: flag("do-04") },
  { code: "do-05", name: "Dajabón",             flagUrl: flag("do-05") },
  { code: "do-06", name: "Duarte",              flagUrl: flag("do-06") },
  { code: "do-07", name: "Elías Piña",          flagUrl: flag("do-07") },
  { code: "do-08", name: "El Seibo",            flagUrl: flag("do-08") },
  { code: "do-09", name: "Espaillat",           flagUrl: flag("do-09") },
  { code: "do-10", name: "Independencia",       flagUrl: flag("do-10") },
  { code: "do-11", name: "La Altagracia",       flagUrl: flag("do-11") },
  { code: "do-12", name: "La Romana",           flagUrl: flag("do-12") },
  { code: "do-13", name: "La Vega",             flagUrl: flag("do-13") },
  { code: "do-14", name: "María Trinidad Sánchez", flagUrl: flag("do-14") },
  { code: "do-15", name: "Monte Cristi",        flagUrl: flag("do-15") },
  { code: "do-16", name: "Pedernales",          flagUrl: flag("do-16") },
  { code: "do-17", name: "Peravia",             flagUrl: flag("do-17") },
  { code: "do-18", name: "Puerto Plata",        flagUrl: flag("do-18") },
  { code: "do-19", name: "Hermanas Mirabal",    flagUrl: flag("do-19") },
  { code: "do-20", name: "Samaná",              flagUrl: flag("do-20") },
  { code: "do-21", name: "San Cristóbal",       flagUrl: flag("do-21") },
  { code: "do-22", name: "San Juan",            flagUrl: flag("do-22") },
  { code: "do-23", name: "San Pedro de Macorís",flagUrl: flag("do-23") },
  { code: "do-24", name: "Sánchez Ramírez",     flagUrl: flag("do-24") },
  { code: "do-25", name: "Santiago",            flagUrl: flag("do-25") },
  { code: "do-26", name: "Santiago Rodríguez",  flagUrl: flag("do-26") },
  { code: "do-27", name: "Valverde",            flagUrl: flag("do-27") },
  { code: "do-28", name: "Monseñor Nouel",      flagUrl: flag("do-28") },
  { code: "do-29", name: "Monte Plata",         flagUrl: flag("do-29") },
  { code: "do-30", name: "Hato Mayor",          flagUrl: flag("do-30") },
  { code: "do-31", name: "San José de Ocoa",    flagUrl: flag("do-31") },
  { code: "do-32", name: "Santo Domingo",       flagUrl: flag("do-32") },
]

// ── BRAZIL (27 states & DF) ───────────────────────────────────────────────────
const BR_STATES: SubRegion[] = [
  { code: "br-ac", name: "Acre",               flagUrl: flag("br-ac") },
  { code: "br-al", name: "Alagoas",            flagUrl: flag("br-al") },
  { code: "br-am", name: "Amazonas",           flagUrl: flag("br-am") },
  { code: "br-ap", name: "Amapá",              flagUrl: flag("br-ap") },
  { code: "br-ba", name: "Bahia",              flagUrl: flag("br-ba") },
  { code: "br-ce", name: "Ceará",              flagUrl: flag("br-ce") },
  { code: "br-df", name: "Distrito Federal",   flagUrl: flag("br-df") },
  { code: "br-es", name: "Espírito Santo",     flagUrl: flag("br-es") },
  { code: "br-go", name: "Goiás",              flagUrl: flag("br-go") },
  { code: "br-ma", name: "Maranhão",           flagUrl: flag("br-ma") },
  { code: "br-mg", name: "Minas Gerais",       flagUrl: flag("br-mg") },
  { code: "br-ms", name: "Mato Grosso do Sul", flagUrl: flag("br-ms") },
  { code: "br-mt", name: "Mato Grosso",        flagUrl: flag("br-mt") },
  { code: "br-pa", name: "Pará",               flagUrl: flag("br-pa") },
  { code: "br-pb", name: "Paraíba",            flagUrl: flag("br-pb") },
  { code: "br-pe", name: "Pernambuco",         flagUrl: flag("br-pe") },
  { code: "br-pi", name: "Piauí",              flagUrl: flag("br-pi") },
  { code: "br-pr", name: "Paraná",             flagUrl: flag("br-pr") },
  { code: "br-rj", name: "Rio de Janeiro",     flagUrl: flag("br-rj") },
  { code: "br-rn", name: "Rio Grande do Norte",flagUrl: flag("br-rn") },
  { code: "br-ro", name: "Rondônia",           flagUrl: flag("br-ro") },
  { code: "br-rr", name: "Roraima",            flagUrl: flag("br-rr") },
  { code: "br-rs", name: "Rio Grande do Sul",  flagUrl: flag("br-rs") },
  { code: "br-sc", name: "Santa Catarina",     flagUrl: flag("br-sc") },
  { code: "br-se", name: "Sergipe",            flagUrl: flag("br-se") },
  { code: "br-sp", name: "São Paulo",          flagUrl: flag("br-sp") },
  { code: "br-to", name: "Tocantins",          flagUrl: flag("br-to") },
]

// ── ARGENTINA (24 provinces) ──────────────────────────────────────────────────
const AR_PROVINCES: SubRegion[] = [
  { code: "ar-a", name: "Salta",              flagUrl: flag("ar-a") },
  { code: "ar-b", name: "Buenos Aires Prov.", flagUrl: flag("ar-b") },
  { code: "ar-c", name: "Buenos Aires City",  flagUrl: flag("ar-c") },
  { code: "ar-d", name: "San Luis",           flagUrl: flag("ar-d") },
  { code: "ar-e", name: "Entre Ríos",         flagUrl: flag("ar-e") },
  { code: "ar-f", name: "La Rioja",           flagUrl: flag("ar-f") },
  { code: "ar-g", name: "Santiago del Estero",flagUrl: flag("ar-g") },
  { code: "ar-h", name: "Chaco",              flagUrl: flag("ar-h") },
  { code: "ar-j", name: "San Juan",           flagUrl: flag("ar-j") },
  { code: "ar-k", name: "Catamarca",          flagUrl: flag("ar-k") },
  { code: "ar-l", name: "La Pampa",           flagUrl: flag("ar-l") },
  { code: "ar-m", name: "Mendoza",            flagUrl: flag("ar-m") },
  { code: "ar-n", name: "Misiones",           flagUrl: flag("ar-n") },
  { code: "ar-p", name: "Formosa",            flagUrl: flag("ar-p") },
  { code: "ar-q", name: "Neuquén",            flagUrl: flag("ar-q") },
  { code: "ar-r", name: "Río Negro",          flagUrl: flag("ar-r") },
  { code: "ar-s", name: "Santa Fe",           flagUrl: flag("ar-s") },
  { code: "ar-t", name: "Tucumán",            flagUrl: flag("ar-t") },
  { code: "ar-u", name: "Chubut",             flagUrl: flag("ar-u") },
  { code: "ar-v", name: "Tierra del Fuego",   flagUrl: flag("ar-v") },
  { code: "ar-w", name: "Corrientes",         flagUrl: flag("ar-w") },
  { code: "ar-x", name: "Córdoba",            flagUrl: flag("ar-x") },
  { code: "ar-y", name: "Jujuy",              flagUrl: flag("ar-y") },
  { code: "ar-z", name: "Santa Cruz",         flagUrl: flag("ar-z") },
]

// ── COLOMBIA (32 departments + Bogotá DC = 33) ────────────────────────────────
const CO_DEPARTMENTS: SubRegion[] = [
  { code: "co-ama", name: "Amazonas",        flagUrl: flag("co-ama") },
  { code: "co-ant", name: "Antioquia",       flagUrl: flag("co-ant") },
  { code: "co-ara", name: "Arauca",          flagUrl: flag("co-ara") },
  { code: "co-atl", name: "Atlántico",       flagUrl: flag("co-atl") },
  { code: "co-bol", name: "Bolívar",         flagUrl: flag("co-bol") },
  { code: "co-boy", name: "Boyacá",          flagUrl: flag("co-boy") },
  { code: "co-cal", name: "Caldas",          flagUrl: flag("co-cal") },
  { code: "co-caq", name: "Caquetá",         flagUrl: flag("co-caq") },
  { code: "co-cas", name: "Casanare",        flagUrl: flag("co-cas") },
  { code: "co-cau", name: "Cauca",           flagUrl: flag("co-cau") },
  { code: "co-ces", name: "Cesar",           flagUrl: flag("co-ces") },
  { code: "co-cho", name: "Chocó",           flagUrl: flag("co-cho") },
  { code: "co-cor", name: "Córdoba",         flagUrl: flag("co-cor") },
  { code: "co-cun", name: "Cundinamarca",    flagUrl: flag("co-cun") },
  { code: "co-dc",  name: "Bogotá D.C.",     flagUrl: flag("co-dc")  },
  { code: "co-gua", name: "Guainía",         flagUrl: flag("co-gua") },
  { code: "co-guv", name: "Guaviare",        flagUrl: flag("co-guv") },
  { code: "co-hui", name: "Huila",           flagUrl: flag("co-hui") },
  { code: "co-lag", name: "La Guajira",      flagUrl: flag("co-lag") },
  { code: "co-mag", name: "Magdalena",       flagUrl: flag("co-mag") },
  { code: "co-met", name: "Meta",            flagUrl: flag("co-met") },
  { code: "co-nar", name: "Nariño",          flagUrl: flag("co-nar") },
  { code: "co-nsa", name: "Norte de Santander", flagUrl: flag("co-nsa") },
  { code: "co-put", name: "Putumayo",        flagUrl: flag("co-put") },
  { code: "co-qui", name: "Quindío",         flagUrl: flag("co-qui") },
  { code: "co-ris", name: "Risaralda",       flagUrl: flag("co-ris") },
  { code: "co-sap", name: "San Andrés",      flagUrl: flag("co-sap") },
  { code: "co-suc", name: "Sucre",           flagUrl: flag("co-suc") },
  { code: "co-tol", name: "Tolima",          flagUrl: flag("co-tol") },
  { code: "co-vac", name: "Valle del Cauca", flagUrl: flag("co-vac") },
  { code: "co-vau", name: "Vaupés",          flagUrl: flag("co-vau") },
  { code: "co-vid", name: "Vichada",         flagUrl: flag("co-vid") },
]

// ── VENEZUELA (23 states + capital district) ──────────────────────────────────
const VE_STATES: SubRegion[] = [
  { code: "ve-a", name: "Distrito Capital", flagUrl: flag("ve-a") },
  { code: "ve-b", name: "Anzoátegui",       flagUrl: flag("ve-b") },
  { code: "ve-c", name: "Apure",            flagUrl: flag("ve-c") },
  { code: "ve-d", name: "Aragua",           flagUrl: flag("ve-d") },
  { code: "ve-e", name: "Barinas",          flagUrl: flag("ve-e") },
  { code: "ve-f", name: "Bolívar",          flagUrl: flag("ve-f") },
  { code: "ve-g", name: "Carabobo",         flagUrl: flag("ve-g") },
  { code: "ve-h", name: "Cojedes",          flagUrl: flag("ve-h") },
  { code: "ve-i", name: "Falcón",           flagUrl: flag("ve-i") },
  { code: "ve-j", name: "Guárico",          flagUrl: flag("ve-j") },
  { code: "ve-k", name: "Lara",             flagUrl: flag("ve-k") },
  { code: "ve-l", name: "Mérida",           flagUrl: flag("ve-l") },
  { code: "ve-m", name: "Miranda",          flagUrl: flag("ve-m") },
  { code: "ve-n", name: "Monagas",          flagUrl: flag("ve-n") },
  { code: "ve-o", name: "Nueva Esparta",    flagUrl: flag("ve-o") },
  { code: "ve-p", name: "Portuguesa",       flagUrl: flag("ve-p") },
  { code: "ve-r", name: "Sucre",            flagUrl: flag("ve-r") },
  { code: "ve-s", name: "Táchira",          flagUrl: flag("ve-s") },
  { code: "ve-t", name: "Trujillo",         flagUrl: flag("ve-t") },
  { code: "ve-u", name: "Yaracuy",          flagUrl: flag("ve-u") },
  { code: "ve-v", name: "Zulia",            flagUrl: flag("ve-v") },
  { code: "ve-x", name: "La Guaira",        flagUrl: flag("ve-x") },
  { code: "ve-y", name: "Delta Amacuro",    flagUrl: flag("ve-y") },
  { code: "ve-z", name: "Amazonas",         flagUrl: flag("ve-z") },
]

// ── CHILE (16 regions) ────────────────────────────────────────────────────────
const CL_REGIONS: SubRegion[] = [
  { code: "cl-ai", name: "Aysén",             flagUrl: flag("cl-ai") },
  { code: "cl-an", name: "Antofagasta",        flagUrl: flag("cl-an") },
  { code: "cl-ap", name: "Arica y Parinacota", flagUrl: flag("cl-ap") },
  { code: "cl-ar", name: "La Araucanía",       flagUrl: flag("cl-ar") },
  { code: "cl-at", name: "Atacama",            flagUrl: flag("cl-at") },
  { code: "cl-bi", name: "Biobío",             flagUrl: flag("cl-bi") },
  { code: "cl-co", name: "Coquimbo",           flagUrl: flag("cl-co") },
  { code: "cl-li", name: "O'Higgins",          flagUrl: flag("cl-li") },
  { code: "cl-ll", name: "Los Lagos",          flagUrl: flag("cl-ll") },
  { code: "cl-lr", name: "Los Ríos",           flagUrl: flag("cl-lr") },
  { code: "cl-ma", name: "Magallanes",         flagUrl: flag("cl-ma") },
  { code: "cl-ml", name: "Maule",              flagUrl: flag("cl-ml") },
  { code: "cl-nb", name: "Ñuble",              flagUrl: flag("cl-nb") },
  { code: "cl-rm", name: "Santiago Metro",     flagUrl: flag("cl-rm") },
  { code: "cl-ta", name: "Tarapacá",           flagUrl: flag("cl-ta") },
  { code: "cl-vs", name: "Valparaíso",         flagUrl: flag("cl-vs") },
]

// ── PERU (25 regions) ─────────────────────────────────────────────────────────
const PE_REGIONS: SubRegion[] = [
  { code: "pe-ama", name: "Amazonas",       flagUrl: flag("pe-ama") },
  { code: "pe-anc", name: "Áncash",         flagUrl: flag("pe-anc") },
  { code: "pe-apu", name: "Apurímac",       flagUrl: flag("pe-apu") },
  { code: "pe-are", name: "Arequipa",       flagUrl: flag("pe-are") },
  { code: "pe-aya", name: "Ayacucho",       flagUrl: flag("pe-aya") },
  { code: "pe-caj", name: "Cajamarca",      flagUrl: flag("pe-caj") },
  { code: "pe-cal", name: "Callao",         flagUrl: flag("pe-cal") },
  { code: "pe-cus", name: "Cusco",          flagUrl: flag("pe-cus") },
  { code: "pe-huc", name: "Huánuco",        flagUrl: flag("pe-huc") },
  { code: "pe-huv", name: "Huancavelica",   flagUrl: flag("pe-huv") },
  { code: "pe-ica", name: "Ica",            flagUrl: flag("pe-ica") },
  { code: "pe-jun", name: "Junín",          flagUrl: flag("pe-jun") },
  { code: "pe-lal", name: "La Libertad",    flagUrl: flag("pe-lal") },
  { code: "pe-lam", name: "Lambayeque",     flagUrl: flag("pe-lam") },
  { code: "pe-lim", name: "Lima Region",    flagUrl: flag("pe-lim") },
  { code: "pe-lor", name: "Loreto",         flagUrl: flag("pe-lor") },
  { code: "pe-mdd", name: "Madre de Dios",  flagUrl: flag("pe-mdd") },
  { code: "pe-moq", name: "Moquegua",       flagUrl: flag("pe-moq") },
  { code: "pe-pas", name: "Pasco",          flagUrl: flag("pe-pas") },
  { code: "pe-piu", name: "Piura",          flagUrl: flag("pe-piu") },
  { code: "pe-pun", name: "Puno",           flagUrl: flag("pe-pun") },
  { code: "pe-sam", name: "San Martín",     flagUrl: flag("pe-sam") },
  { code: "pe-tac", name: "Tacna",          flagUrl: flag("pe-tac") },
  { code: "pe-tum", name: "Tumbes",         flagUrl: flag("pe-tum") },
  { code: "pe-uca", name: "Ucayali",        flagUrl: flag("pe-uca") },
]

// ── ECUADOR (24 provinces) ────────────────────────────────────────────────────
const EC_PROVINCES: SubRegion[] = [
  { code: "ec-a", name: "Azuay",                        flagUrl: flag("ec-a") },
  { code: "ec-b", name: "Bolívar",                      flagUrl: flag("ec-b") },
  { code: "ec-c", name: "Carchi",                       flagUrl: flag("ec-c") },
  { code: "ec-d", name: "Orellana",                     flagUrl: flag("ec-d") },
  { code: "ec-e", name: "Esmeraldas",                   flagUrl: flag("ec-e") },
  { code: "ec-f", name: "Cañar",                        flagUrl: flag("ec-f") },
  { code: "ec-g", name: "Guayas",                       flagUrl: flag("ec-g") },
  { code: "ec-h", name: "Chimborazo",                   flagUrl: flag("ec-h") },
  { code: "ec-i", name: "Imbabura",                     flagUrl: flag("ec-i") },
  { code: "ec-j", name: "Loja",                         flagUrl: flag("ec-j") },
  { code: "ec-k", name: "Los Ríos",                     flagUrl: flag("ec-k") },
  { code: "ec-l", name: "Manabí",                       flagUrl: flag("ec-l") },
  { code: "ec-m", name: "Morona Santiago",              flagUrl: flag("ec-m") },
  { code: "ec-n", name: "Napo",                         flagUrl: flag("ec-n") },
  { code: "ec-o", name: "El Oro",                       flagUrl: flag("ec-o") },
  { code: "ec-p", name: "Pichincha",                    flagUrl: flag("ec-p") },
  { code: "ec-q", name: "Sucumbíos",                    flagUrl: flag("ec-q") },
  { code: "ec-r", name: "Tungurahua",                   flagUrl: flag("ec-r") },
  { code: "ec-s", name: "Zamora Chinchipe",             flagUrl: flag("ec-s") },
  { code: "ec-t", name: "Santo Domingo de los Tsáchilas", flagUrl: flag("ec-t") },
  { code: "ec-u", name: "Santa Elena",                  flagUrl: flag("ec-u") },
  { code: "ec-w", name: "Pastaza",                      flagUrl: flag("ec-w") },
  { code: "ec-x", name: "Cotopaxi",                     flagUrl: flag("ec-x") },
  { code: "ec-z", name: "Galápagos",                    flagUrl: flag("ec-z") },
]

// ── BOLIVIA (9 departments) ───────────────────────────────────────────────────
const BO_DEPARTMENTS: SubRegion[] = [
  { code: "bo-b", name: "El Beni",    flagUrl: flag("bo-b") },
  { code: "bo-c", name: "Cochabamba", flagUrl: flag("bo-c") },
  { code: "bo-h", name: "Chuquisaca", flagUrl: flag("bo-h") },
  { code: "bo-l", name: "La Paz",     flagUrl: flag("bo-l") },
  { code: "bo-n", name: "Pando",      flagUrl: flag("bo-n") },
  { code: "bo-o", name: "Oruro",      flagUrl: flag("bo-o") },
  { code: "bo-p", name: "Potosí",     flagUrl: flag("bo-p") },
  { code: "bo-s", name: "Santa Cruz", flagUrl: flag("bo-s") },
  { code: "bo-t", name: "Tarija",     flagUrl: flag("bo-t") },
]

// ── PARAGUAY (17 departments + Asunción = 18) ─────────────────────────────────
const PY_DEPARTMENTS: SubRegion[] = [
  { code: "py-asu", name: "Asunción",         flagUrl: flag("py-asu") },
  { code: "py-1",   name: "Concepción",       flagUrl: flag("py-1")   },
  { code: "py-2",   name: "San Pedro",        flagUrl: flag("py-2")   },
  { code: "py-3",   name: "Cordillera",       flagUrl: flag("py-3")   },
  { code: "py-4",   name: "Guairá",           flagUrl: flag("py-4")   },
  { code: "py-5",   name: "Caaguazú",         flagUrl: flag("py-5")   },
  { code: "py-6",   name: "Caazapá",          flagUrl: flag("py-6")   },
  { code: "py-7",   name: "Itapúa",           flagUrl: flag("py-7")   },
  { code: "py-8",   name: "Misiones",         flagUrl: flag("py-8")   },
  { code: "py-9",   name: "Paraguarí",        flagUrl: flag("py-9")   },
  { code: "py-10",  name: "Alto Paraná",      flagUrl: flag("py-10")  },
  { code: "py-11",  name: "Central",          flagUrl: flag("py-11")  },
  { code: "py-12",  name: "Ñeembucú",         flagUrl: flag("py-12")  },
  { code: "py-13",  name: "Amambay",          flagUrl: flag("py-13")  },
  { code: "py-14",  name: "Canindeyú",        flagUrl: flag("py-14")  },
  { code: "py-15",  name: "Presidente Hayes", flagUrl: flag("py-15")  },
  { code: "py-16",  name: "Alto Paraguay",    flagUrl: flag("py-16")  },
  { code: "py-17",  name: "Boquerón",         flagUrl: flag("py-17")  },
]

// ── URUGUAY (19 departments) ──────────────────────────────────────────────────
const UY_DEPARTMENTS: SubRegion[] = [
  { code: "uy-ar", name: "Artigas",      flagUrl: flag("uy-ar") },
  { code: "uy-ca", name: "Canelones",    flagUrl: flag("uy-ca") },
  { code: "uy-cl", name: "Cerro Largo",  flagUrl: flag("uy-cl") },
  { code: "uy-co", name: "Colonia",      flagUrl: flag("uy-co") },
  { code: "uy-du", name: "Durazno",      flagUrl: flag("uy-du") },
  { code: "uy-fd", name: "Florida",      flagUrl: flag("uy-fd") },
  { code: "uy-fs", name: "Flores",       flagUrl: flag("uy-fs") },
  { code: "uy-la", name: "Lavalleja",    flagUrl: flag("uy-la") },
  { code: "uy-ma", name: "Maldonado",    flagUrl: flag("uy-ma") },
  { code: "uy-mo", name: "Montevideo",   flagUrl: flag("uy-mo") },
  { code: "uy-pa", name: "Paysandú",     flagUrl: flag("uy-pa") },
  { code: "uy-rn", name: "Río Negro",    flagUrl: flag("uy-rn") },
  { code: "uy-ro", name: "Rocha",        flagUrl: flag("uy-ro") },
  { code: "uy-rv", name: "Rivera",       flagUrl: flag("uy-rv") },
  { code: "uy-sa", name: "Salto",        flagUrl: flag("uy-sa") },
  { code: "uy-sj", name: "San José",     flagUrl: flag("uy-sj") },
  { code: "uy-so", name: "Soriano",      flagUrl: flag("uy-so") },
  { code: "uy-ta", name: "Tacuarembó",   flagUrl: flag("uy-ta") },
  { code: "uy-tt", name: "Treinta y Tres", flagUrl: flag("uy-tt") },
]

// ── GUYANA (10 regions) ───────────────────────────────────────────────────────
const GY_REGIONS: SubRegion[] = [
  { code: "gy-ba", name: "Barima-Waini",                 flagUrl: flag("gy-ba") },
  { code: "gy-cu", name: "Cuyuni-Mazaruni",              flagUrl: flag("gy-cu") },
  { code: "gy-de", name: "Demerara-Mahaica",             flagUrl: flag("gy-de") },
  { code: "gy-ea", name: "East Berbice-Corentyne",       flagUrl: flag("gy-ea") },
  { code: "gy-es", name: "Essequibo Islands-W. Demerara",flagUrl: flag("gy-es") },
  { code: "gy-ma", name: "Mahaica-Berbice",              flagUrl: flag("gy-ma") },
  { code: "gy-pm", name: "Pomeroon-Supenaam",            flagUrl: flag("gy-pm") },
  { code: "gy-pt", name: "Potaro-Siparuni",              flagUrl: flag("gy-pt") },
  { code: "gy-ud", name: "Upper Demerara-Berbice",       flagUrl: flag("gy-ud") },
  { code: "gy-ut", name: "Upper Takutu-Upper Essequibo", flagUrl: flag("gy-ut") },
]

// ── SURINAME (10 districts) ───────────────────────────────────────────────────
const SR_DISTRICTS: SubRegion[] = [
  { code: "sr-br", name: "Brokopondo",  flagUrl: flag("sr-br") },
  { code: "sr-cm", name: "Commewijne",  flagUrl: flag("sr-cm") },
  { code: "sr-cr", name: "Coronie",     flagUrl: flag("sr-cr") },
  { code: "sr-ma", name: "Marowijne",   flagUrl: flag("sr-ma") },
  { code: "sr-ni", name: "Nickerie",    flagUrl: flag("sr-ni") },
  { code: "sr-pm", name: "Para",        flagUrl: flag("sr-pm") },
  { code: "sr-pr", name: "Paramaribo",  flagUrl: flag("sr-pr") },
  { code: "sr-sa", name: "Saramacca",   flagUrl: flag("sr-sa") },
  { code: "sr-si", name: "Sipaliwini",  flagUrl: flag("sr-si") },
  { code: "sr-wa", name: "Wanica",      flagUrl: flag("sr-wa") },
]

// ─────────────────────────────────────────────────────────────────────────────

export const CHALLENGE_CONTINENTS: ChallengeContinent[] = [
  // ── NORTH AMERICA (Northern + Central) ───────────────────────────────────
  {
    id: "north-america",
    name: "North America",
    emoji: "🌎",
    locked: false,
    countries: [
      // Northern
      { code: "US", name: "United States", emoji: "🇺🇸", subTitle: "50 States", subRegions: US_STATES, locked: false },
      { code: "CA", name: "Canada", emoji: "🇨🇦", subTitle: "13 Provinces & Territories", subRegions: CA_PROVINCES, locked: false },
      { code: "MX", name: "Mexico", emoji: "🇲🇽", subTitle: "32 States", subRegions: MX_STATES, locked: false },
      // Central America
      { code: "BZ", name: "Belize", emoji: "🇧🇿", subTitle: "6 Districts", subRegions: BZ_DISTRICTS, locked: true },
      { code: "GT", name: "Guatemala", emoji: "🇬🇹", subTitle: "22 Departments", subRegions: GT_DEPARTMENTS, locked: false },
      { code: "HN", name: "Honduras", emoji: "🇭🇳", subTitle: "18 Departments", subRegions: HN_DEPARTMENTS, locked: false },
      { code: "SV", name: "El Salvador", emoji: "🇸🇻", subTitle: "14 Departments", subRegions: SV_DEPARTMENTS, locked: false },
      { code: "NI", name: "Nicaragua", emoji: "🇳🇮", subTitle: "17 Departments", subRegions: NI_DEPARTMENTS, locked: false },
      { code: "CR", name: "Costa Rica", emoji: "🇨🇷", subTitle: "7 Provinces", subRegions: CR_PROVINCES, locked: false },
      { code: "PA", name: "Panama", emoji: "🇵🇦", subTitle: "10 Provinces", subRegions: PA_PROVINCES, locked: false },
    ],
  },

  // ── CARIBBEAN ─────────────────────────────────────────────────────────────
  {
    id: "caribbean",
    name: "Caribbean",
    emoji: "🏝️",
    locked: false,
    countries: [
      { code: "CU", name: "Cuba", emoji: "🇨🇺", subTitle: "15 Provinces", subRegions: CU_PROVINCES, locked: false },
      { code: "HT", name: "Haiti", emoji: "🇭🇹", subTitle: "10 Departments", subRegions: HT_DEPARTMENTS, locked: false },
      { code: "DO", name: "Dominican Republic", emoji: "🇩🇴", subTitle: "32 Provinces", subRegions: DO_PROVINCES, locked: false },
      { code: "JM", name: "Jamaica", emoji: "🇯🇲", subTitle: "14 Parishes", subRegions: [], locked: true },
      { code: "TT", name: "Trinidad and Tobago", emoji: "🇹🇹", subTitle: "9 Regions", subRegions: [], locked: true },
      { code: "BB", name: "Barbados", emoji: "🇧🇧", subTitle: "11 Parishes", subRegions: [], locked: true },
      { code: "LC", name: "Saint Lucia", emoji: "🇱🇨", subTitle: "10 Districts", subRegions: [], locked: true },
      { code: "VC", name: "St Vincent & Grenadines", emoji: "🇻🇨", subTitle: "6 Parishes", subRegions: [], locked: true },
      { code: "GD", name: "Grenada", emoji: "🇬🇩", subTitle: "6 Parishes", subRegions: [], locked: true },
      { code: "AG", name: "Antigua and Barbuda", emoji: "🇦🇬", subTitle: "6 Parishes", subRegions: [], locked: true },
      { code: "DM", name: "Dominica", emoji: "🇩🇲", subTitle: "10 Parishes", subRegions: [], locked: true },
      { code: "KN", name: "Saint Kitts and Nevis", emoji: "🇰🇳", subTitle: "14 Parishes", subRegions: [], locked: true },
      { code: "BS", name: "Bahamas", emoji: "🇧🇸", subTitle: "31 Districts", subRegions: [], locked: true },
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
      { code: "CO", name: "Colombia", emoji: "🇨🇴", subTitle: "32 Departments", subRegions: CO_DEPARTMENTS, locked: false },
      { code: "VE", name: "Venezuela", emoji: "🇻🇪", subTitle: "23 States", subRegions: VE_STATES, locked: false },
      { code: "PE", name: "Peru", emoji: "🇵🇪", subTitle: "25 Regions", subRegions: PE_REGIONS, locked: false },
      { code: "CL", name: "Chile", emoji: "🇨🇱", subTitle: "16 Regions", subRegions: CL_REGIONS, locked: false },
      { code: "EC", name: "Ecuador", emoji: "🇪🇨", subTitle: "24 Provinces", subRegions: EC_PROVINCES, locked: false },
      { code: "BO", name: "Bolivia", emoji: "🇧🇴", subTitle: "9 Departments", subRegions: BO_DEPARTMENTS, locked: false },
      { code: "PY", name: "Paraguay", emoji: "🇵🇾", subTitle: "17 Departments", subRegions: PY_DEPARTMENTS, locked: false },
      { code: "UY", name: "Uruguay", emoji: "🇺🇾", subTitle: "19 Departments", subRegions: UY_DEPARTMENTS, locked: false },
      { code: "GY", name: "Guyana", emoji: "🇬🇾", subTitle: "10 Regions", subRegions: GY_REGIONS, locked: true },
      { code: "SR", name: "Suriname", emoji: "🇸🇷", subTitle: "10 Districts", subRegions: SR_DISTRICTS, locked: true },
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

  // ── EUROPE ────────────────────────────────────────────────────────────────
  {
    id: "europe",
    name: "Europe",
    emoji: "🏰",
    locked: false,
    countries: [

      // ── Germany (16 Bundesländer) ────────────────────────────────────────
      {
        code: "DE", name: "Germany", emoji: "🇩🇪", subTitle: "16 States", locked: false,
        subRegions: [
          { code: "de-bb", name: "Brandenburg",            flagUrl: wiki("Flag of Brandenburg.svg") },
          { code: "de-be", name: "Berlin",                 flagUrl: wiki("Flag of Berlin.svg") },
          { code: "de-bw", name: "Baden-Württemberg",      flagUrl: wiki("Flag of Baden-Württemberg.svg") },
          { code: "de-by", name: "Bavaria",                flagUrl: wiki("Flag of Bavaria (striped).svg") },
          { code: "de-hb", name: "Bremen",                 flagUrl: wiki("Flag of Bremen.svg") },
          { code: "de-he", name: "Hesse",                  flagUrl: wiki("Flag of Hesse.svg") },
          { code: "de-hh", name: "Hamburg",                flagUrl: wiki("Flag of Hamburg.svg") },
          { code: "de-mv", name: "Mecklenburg-Vorpommern", flagUrl: wiki("Flag of Mecklenburg-Vorpommern.svg") },
          { code: "de-ni", name: "Lower Saxony",           flagUrl: wiki("Flag of Lower Saxony.svg") },
          { code: "de-nw", name: "North Rhine-Westphalia", flagUrl: wiki("Flag of North Rhine-Westphalia.svg") },
          { code: "de-rp", name: "Rhineland-Palatinate",   flagUrl: wiki("Flag of Rhineland-Palatinate.svg") },
          { code: "de-sh", name: "Schleswig-Holstein",     flagUrl: wiki("Flag of Schleswig-Holstein.svg") },
          { code: "de-sl", name: "Saarland",               flagUrl: wiki("Flag of Saarland.svg") },
          { code: "de-sn", name: "Saxony",                 flagUrl: wiki("Flag of Saxony.svg") },
          { code: "de-st", name: "Saxony-Anhalt",          flagUrl: wiki("Flag of Saxony-Anhalt.svg") },
          { code: "de-th", name: "Thuringia",              flagUrl: wiki("Flag of Thuringia.svg") },
        ],
      },

      // ── France (13 metropolitan + 5 overseas regions) ────────────────────
      {
        code: "FR", name: "France", emoji: "🇫🇷", subTitle: "18 Regions", locked: false,
        subRegions: [
          { code: "fr-ara", name: "Auvergne-Rhône-Alpes",       flagUrl: wiki("Flag of Auvergne-Rhône-Alpes.svg") },
          { code: "fr-bfc", name: "Bourgogne-Franche-Comté",    flagUrl: wiki("Flag of Bourgogne-Franche-Comté.svg") },
          { code: "fr-bre", name: "Brittany",                   flagUrl: wiki("Flag of Brittany (Gwenn ha du).svg") },
          { code: "fr-cvl", name: "Centre-Val de Loire",        flagUrl: wiki("Flag of Centre-Val de Loire.svg") },
          { code: "fr-cor", name: "Corsica",                    flagUrl: wiki("Flag of Corsica.svg") },
          { code: "fr-ges", name: "Grand Est",                  flagUrl: wiki("Flag of Grand Est.svg") },
          { code: "fr-hdf", name: "Hauts-de-France",            flagUrl: wiki("Flag of Hauts-de-France.svg") },
          { code: "fr-idf", name: "Île-de-France",              flagUrl: wiki("Flag of Île-de-France.svg") },
          { code: "fr-naq", name: "Nouvelle-Aquitaine",         flagUrl: wiki("Flag of Nouvelle-Aquitaine.svg") },
          { code: "fr-nor", name: "Normandy",                   flagUrl: wiki("Flag of Normandy.svg") },
          { code: "fr-occ", name: "Occitanie",                  flagUrl: wiki("Flag of Occitania (civil).svg") },
          { code: "fr-pac", name: "Provence-Alpes-Côte d'Azur", flagUrl: wiki("Flag of Provence-Alpes-Côte d'Azur.svg") },
          { code: "fr-pdl", name: "Pays de la Loire",           flagUrl: wiki("Flag of Pays de la Loire.svg") },
          { code: "fr-gua", name: "Guadeloupe",                 flagUrl: wiki("Flag of Guadeloupe.svg") },
          { code: "fr-guy", name: "French Guiana",              flagUrl: wiki("Flag of French Guiana.svg") },
          { code: "fr-lre", name: "La Réunion",                 flagUrl: wiki("Flag of Reunion.svg") },
          { code: "fr-may", name: "Mayotte",                    flagUrl: wiki("Flag of Mayotte.svg") },
          { code: "fr-mq",  name: "Martinique",                 flagUrl: wiki("Flag of Martinique.svg") },
        ],
      },

      // ── Spain (17 autonomous communities + 2 cities) ─────────────────────
      {
        code: "ES", name: "Spain", emoji: "🇪🇸", subTitle: "19 Regions", locked: false,
        subRegions: [
          { code: "es-an", name: "Andalusia",           flagUrl: wiki("Flag of Andalusia.svg") },
          { code: "es-ar", name: "Aragon",              flagUrl: wiki("Flag of Aragon.svg") },
          { code: "es-as", name: "Asturias",            flagUrl: wiki("Flag of Asturias.svg") },
          { code: "es-cb", name: "Cantabria",           flagUrl: wiki("Flag of Cantabria.svg") },
          { code: "es-ce", name: "Ceuta",               flagUrl: wiki("Flag of Ceuta.svg") },
          { code: "es-cl", name: "Castile and León",    flagUrl: wiki("Flag of Castile and León.svg") },
          { code: "es-cm", name: "Castile-La Mancha",   flagUrl: wiki("Flag of Castile-La Mancha.svg") },
          { code: "es-cn", name: "Canary Islands",      flagUrl: wiki("Flag of the Canary Islands.svg") },
          { code: "es-ct", name: "Catalonia",           flagUrl: wiki("Flag of Catalonia.svg") },
          { code: "es-ex", name: "Extremadura",         flagUrl: wiki("Flag of Extremadura.svg") },
          { code: "es-ga", name: "Galicia",             flagUrl: wiki("Flag of Galicia.svg") },
          { code: "es-ib", name: "Balearic Islands",    flagUrl: wiki("Flag of the Balearic Islands.svg") },
          { code: "es-mc", name: "Region of Murcia",    flagUrl: wiki("Flag of the Region of Murcia.svg") },
          { code: "es-md", name: "Community of Madrid", flagUrl: wiki("Flag of the Community of Madrid.svg") },
          { code: "es-me", name: "Melilla",             flagUrl: wiki("Flag of Melilla.svg") },
          { code: "es-nc", name: "Navarre",             flagUrl: wiki("Flag of Navarre.svg") },
          { code: "es-pv", name: "Basque Country",      flagUrl: wiki("Flag of the Basque Country.svg") },
          { code: "es-ri", name: "La Rioja",            flagUrl: wiki("Flag of La Rioja, Spain.svg") },
          { code: "es-vc", name: "Valencia",            flagUrl: wiki("Flag of the Valencian Community.svg") },
        ],
      },

      // ── Italy (20 regions) ───────────────────────────────────────────────
      {
        code: "IT", name: "Italy", emoji: "🇮🇹", subTitle: "20 Regions", locked: false,
        subRegions: [
          { code: "it-21", name: "Piedmont",                    flagUrl: wiki("Flag of Piedmont.svg") },
          { code: "it-23", name: "Aosta Valley",                flagUrl: wiki("Flag of Aosta Valley.svg") },
          { code: "it-25", name: "Lombardy",                    flagUrl: wiki("Flag of Lombardy.svg") },
          { code: "it-32", name: "Trentino-Alto Adige",         flagUrl: wiki("Flag of Trentino-Alto Adige.svg") },
          { code: "it-34", name: "Veneto",                      flagUrl: wiki("Flag of Veneto.svg") },
          { code: "it-36", name: "Friuli-Venezia Giulia",       flagUrl: wiki("Flag of Friuli-Venezia Giulia.svg") },
          { code: "it-42", name: "Liguria",                     flagUrl: wiki("Flag of Liguria.svg") },
          { code: "it-45", name: "Emilia-Romagna",              flagUrl: wiki("Flag of Emilia-Romagna.svg") },
          { code: "it-52", name: "Tuscany",                     flagUrl: wiki("Flag of Tuscany.svg") },
          { code: "it-55", name: "Umbria",                      flagUrl: wiki("Flag of Umbria.svg") },
          { code: "it-57", name: "Marche",                      flagUrl: wiki("Flag of Marche.svg") },
          { code: "it-62", name: "Lazio",                       flagUrl: wiki("Flag of Lazio.svg") },
          { code: "it-65", name: "Abruzzo",                     flagUrl: wiki("Flag of Abruzzo.svg") },
          { code: "it-67", name: "Molise",                      flagUrl: wiki("Flag of Molise.svg") },
          { code: "it-72", name: "Campania",                    flagUrl: wiki("Flag of Campania.svg") },
          { code: "it-75", name: "Apulia",                      flagUrl: wiki("Flag of Apulia.svg") },
          { code: "it-77", name: "Basilicata",                  flagUrl: wiki("Flag of Basilicata.svg") },
          { code: "it-78", name: "Calabria",                    flagUrl: wiki("Flag of Calabria.svg") },
          { code: "it-82", name: "Sicily",                      flagUrl: wiki("Flag of Sicily.svg") },
          { code: "it-88", name: "Sardinia",                    flagUrl: wiki("Flag of Sardinia.svg") },
        ],
      },

      // ── United Kingdom (England 9 regions · Scotland 32 · Wales 22 · NI 11) ──
      {
        code: "GB", name: "United Kingdom", emoji: "🇬🇧", subTitle: "74 Regions & Districts", locked: false,
        subRegions: [
          // England – 9 statistical regions
          { code: "gb-ne",  name: "North East England",           flagUrl: flag("gb-eng"), group: "England" },
          { code: "gb-nw",  name: "North West England",           flagUrl: flag("gb-eng"), group: "England" },
          { code: "gb-yh",  name: "Yorkshire & the Humber",       flagUrl: flag("gb-eng"), group: "England" },
          { code: "gb-em",  name: "East Midlands",                flagUrl: flag("gb-eng"), group: "England" },
          { code: "gb-wm",  name: "West Midlands",                flagUrl: flag("gb-eng"), group: "England" },
          { code: "gb-ee",  name: "East of England",              flagUrl: flag("gb-eng"), group: "England" },
          { code: "gb-lon", name: "Greater London",               flagUrl: flag("gb-lon"), group: "England" },
          { code: "gb-se",  name: "South East England",           flagUrl: flag("gb-eng"), group: "England" },
          { code: "gb-sw",  name: "South West England",           flagUrl: flag("gb-eng"), group: "England" },
          // Scotland – 32 council areas
          { code: "gb-abd", name: "Aberdeen City",                flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-abe", name: "Aberdeenshire",                flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-ans", name: "Angus",                        flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-agb", name: "Argyll and Bute",              flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-clk", name: "Clackmannanshire",             flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-dgy", name: "Dumfries and Galloway",        flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-dnd", name: "Dundee City",                  flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-eay", name: "East Ayrshire",                flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-edu", name: "East Dunbartonshire",          flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-eln", name: "East Lothian",                 flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-erw", name: "East Renfrewshire",            flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-edh", name: "Edinburgh",                    flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-els", name: "Na h-Eileanan Siar",           flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-fal", name: "Falkirk",                      flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-fif", name: "Fife",                         flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-glg", name: "Glasgow City",                 flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-hld", name: "Highland",                     flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-ivc", name: "Inverclyde",                   flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-mln", name: "Midlothian",                   flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-mry", name: "Moray",                        flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-nay", name: "North Ayrshire",               flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-nlk", name: "North Lanarkshire",            flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-ork", name: "Orkney Islands",               flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-pkn", name: "Perth and Kinross",            flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-rfw", name: "Renfrewshire",                 flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-scb", name: "Scottish Borders",             flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-zet", name: "Shetland Islands",             flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-say", name: "South Ayrshire",               flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-slk", name: "South Lanarkshire",            flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-stg", name: "Stirling",                     flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-wdu", name: "West Dunbartonshire",          flagUrl: flag("gb-sct"), group: "Scotland" },
          { code: "gb-wln", name: "West Lothian",                 flagUrl: flag("gb-sct"), group: "Scotland" },
          // Wales – 22 local authorities
          { code: "gb-agy", name: "Isle of Anglesey",             flagUrl: flag("gb-wls"), group: "Wales" },
          { code: "gb-bgw", name: "Blaenau Gwent",                flagUrl: flag("gb-wls"), group: "Wales" },
          { code: "gb-bge", name: "Bridgend",                     flagUrl: flag("gb-wls"), group: "Wales" },
          { code: "gb-cay", name: "Caerphilly",                   flagUrl: flag("gb-wls"), group: "Wales" },
          { code: "gb-crf", name: "Cardiff",                      flagUrl: flag("gb-wls"), group: "Wales" },
          { code: "gb-cmn", name: "Carmarthenshire",              flagUrl: flag("gb-wls"), group: "Wales" },
          { code: "gb-cgn", name: "Ceredigion",                   flagUrl: flag("gb-wls"), group: "Wales" },
          { code: "gb-cwy", name: "Conwy",                        flagUrl: flag("gb-wls"), group: "Wales" },
          { code: "gb-den", name: "Denbighshire",                 flagUrl: flag("gb-wls"), group: "Wales" },
          { code: "gb-fln", name: "Flintshire",                   flagUrl: flag("gb-wls"), group: "Wales" },
          { code: "gb-gwn", name: "Gwynedd",                      flagUrl: flag("gb-wls"), group: "Wales" },
          { code: "gb-mty", name: "Merthyr Tydfil",               flagUrl: flag("gb-wls"), group: "Wales" },
          { code: "gb-mon", name: "Monmouthshire",                flagUrl: flag("gb-wls"), group: "Wales" },
          { code: "gb-ntl", name: "Neath Port Talbot",            flagUrl: flag("gb-wls"), group: "Wales" },
          { code: "gb-nwp", name: "Newport",                      flagUrl: flag("gb-wls"), group: "Wales" },
          { code: "gb-pem", name: "Pembrokeshire",                flagUrl: flag("gb-wls"), group: "Wales" },
          { code: "gb-pow", name: "Powys",                        flagUrl: flag("gb-wls"), group: "Wales" },
          { code: "gb-rct", name: "Rhondda Cynon Taf",            flagUrl: flag("gb-wls"), group: "Wales" },
          { code: "gb-swa", name: "Swansea",                      flagUrl: flag("gb-wls"), group: "Wales" },
          { code: "gb-tof", name: "Torfaen",                      flagUrl: flag("gb-wls"), group: "Wales" },
          { code: "gb-vgl", name: "Vale of Glamorgan",            flagUrl: flag("gb-wls"), group: "Wales" },
          { code: "gb-wrx", name: "Wrexham",                      flagUrl: flag("gb-wls"), group: "Wales" },
          // Northern Ireland – 11 districts
          { code: "gb-abc", name: "Armagh, Banbridge & Craigavon", flagUrl: flag("gb-nir"), group: "Northern Ireland" },
          { code: "gb-and", name: "Antrim & Newtownabbey",        flagUrl: flag("gb-nir"), group: "Northern Ireland" },
          { code: "gb-ann", name: "Ards & North Down",            flagUrl: flag("gb-nir"), group: "Northern Ireland" },
          { code: "gb-bfs", name: "Belfast",                      flagUrl: flag("gb-nir"), group: "Northern Ireland" },
          { code: "gb-ccg", name: "Causeway Coast & Glens",       flagUrl: flag("gb-nir"), group: "Northern Ireland" },
          { code: "gb-drs", name: "Derry City & Strabane",        flagUrl: flag("gb-nir"), group: "Northern Ireland" },
          { code: "gb-fmo", name: "Fermanagh & Omagh",            flagUrl: flag("gb-nir"), group: "Northern Ireland" },
          { code: "gb-lbc", name: "Lisburn & Castlereagh",        flagUrl: flag("gb-nir"), group: "Northern Ireland" },
          { code: "gb-mea", name: "Mid & East Antrim",            flagUrl: flag("gb-nir"), group: "Northern Ireland" },
          { code: "gb-mul", name: "Mid Ulster",                   flagUrl: flag("gb-nir"), group: "Northern Ireland" },
          { code: "gb-nmd", name: "Newry, Mourne & Down",         flagUrl: flag("gb-nir"), group: "Northern Ireland" },
        ],
      },

      // ── Isle of Man (6 sheadings) ─────────────────────────────────────────
      {
        code: "IM", name: "Isle of Man", emoji: "🇮🇲", subTitle: "6 Sheadings", locked: false,
        subRegions: [
          { code: "im-ay", name: "Ayre",     flagUrl: wiki("Flag of the Isle of Man.svg") },
          { code: "im-ga", name: "Garff",    flagUrl: wiki("Flag of the Isle of Man.svg") },
          { code: "im-gf", name: "Glenfaba", flagUrl: wiki("Flag of the Isle of Man.svg") },
          { code: "im-mi", name: "Michael",  flagUrl: wiki("Flag of the Isle of Man.svg") },
          { code: "im-md", name: "Middle",   flagUrl: wiki("Flag of the Isle of Man.svg") },
          { code: "im-ru", name: "Rushen",   flagUrl: wiki("Flag of the Isle of Man.svg") },
        ],
      },

      // ── Jersey (12 parishes) ─────────────────────────────────────────────
      {
        code: "JE", name: "Jersey", emoji: "🇯🇪", subTitle: "12 Parishes", locked: false,
        subRegions: [
          { code: "je-gr", name: "Grouville",    flagUrl: wiki("Flag of Grouville.svg") },
          { code: "je-sb", name: "St. Brelade",  flagUrl: wiki("Flag of Saint Brelade.svg") },
          { code: "je-sc", name: "St. Clement",  flagUrl: wiki("Flag of Saint Clement, Jersey.svg") },
          { code: "je-sh", name: "St. Helier",   flagUrl: wiki("Flag of Saint Helier.svg") },
          { code: "je-sj", name: "St. John",     flagUrl: wiki("Flag of Saint John, Jersey.svg") },
          { code: "je-sl", name: "St. Lawrence", flagUrl: wiki("Flag of Saint Lawrence, Jersey.svg") },
          { code: "je-sm", name: "St. Martin",   flagUrl: wiki("Flag of Saint Martin, Jersey.svg") },
          { code: "je-sy", name: "St. Mary",     flagUrl: wiki("Flag of Saint Mary, Jersey.svg") },
          { code: "je-so", name: "St. Ouen",     flagUrl: wiki("Flag of Saint Ouen, Jersey.svg") },
          { code: "je-sp", name: "St. Peter",    flagUrl: wiki("Flag of Saint Peter, Jersey.svg") },
          { code: "je-ss", name: "St. Saviour",  flagUrl: wiki("Flag of Saint Saviour, Jersey.svg") },
          { code: "je-tr", name: "Trinity",      flagUrl: wiki("Flag of Trinity, Jersey.svg") },
        ],
      },

      // ── Guernsey (10 parishes) ───────────────────────────────────────────
      {
        code: "GG", name: "Guernsey", emoji: "🇬🇬", subTitle: "10 Parishes", locked: false,
        subRegions: [
          { code: "gg-ca", name: "Castel",           flagUrl: wiki("Flag of Castel, Guernsey.svg") },
          { code: "gg-fo", name: "Forest",           flagUrl: wiki("Flag of Forest, Guernsey.svg") },
          { code: "gg-sa", name: "St. Andrew",       flagUrl: wiki("Flag of Saint Andrew, Guernsey.svg") },
          { code: "gg-sm", name: "St. Martin",       flagUrl: wiki("Flag of Saint Martin, Guernsey.svg") },
          { code: "gg-sp", name: "St. Peter Port",   flagUrl: wiki("Flag of Saint Peter Port.svg") },
          { code: "gg-sd", name: "St. Pierre du Bois",flagUrl: wiki("Flag of Saint Pierre du Bois.svg") },
          { code: "gg-ss", name: "St. Sampson",      flagUrl: wiki("Flag of Saint Sampson, Guernsey.svg") },
          { code: "gg-sv", name: "St. Saviour",      flagUrl: wiki("Flag of Saint Saviour, Guernsey.svg") },
          { code: "gg-to", name: "Torteval",         flagUrl: wiki("Flag of Torteval.svg") },
          { code: "gg-va", name: "Vale",             flagUrl: wiki("Flag of Vale, Guernsey.svg") },
        ],
      },

      // ── Gibraltar (4 major areas) ────────────────────────────────────────
      {
        code: "GI", name: "Gibraltar", emoji: "🇬🇮", subTitle: "4 Areas", locked: false,
        subRegions: [
          { code: "gi-nr", name: "North District",  flagUrl: wiki("Flag of North Gibraltar.svg") },
          { code: "gi-sw", name: "South District",  flagUrl: wiki("Flag of South Gibraltar.svg") },
          { code: "gi-wt", name: "Town Area",       flagUrl: wiki("Flag of Gibraltar town.svg") },
          { code: "gi-ea", name: "East Side",       flagUrl: wiki("Flag of East Side Gibraltar.svg") },
        ],
      },

      // ── Faroe Islands (7 traditional regions) ───────────────────────────
      {
        code: "FO", name: "Faroe Islands", emoji: "🇫🇴", subTitle: "7 Regions", locked: false,
        subRegions: [
          { code: "fo-ea", name: "Eysturoy",    flagUrl: wiki("Flag of Eysturoy.svg") },
          { code: "fo-no", name: "Norðoyggjar", flagUrl: wiki("Flag of Norðoyggjar.svg") },
          { code: "fo-os", name: "Osterø",      flagUrl: wiki("Flag of Osterø.svg") },
          { code: "fo-sa", name: "Sandoy",      flagUrl: wiki("Flag of Sandoy.svg") },
          { code: "fo-st", name: "Streymoy",    flagUrl: wiki("Flag of Streymoy.svg") },
          { code: "fo-su", name: "Suðuroy",     flagUrl: wiki("Flag of Suðuroy.svg") },
          { code: "fo-va", name: "Vágar",       flagUrl: wiki("Flag of Vágar.svg") },
        ],
      },

      // ── Switzerland (26 cantons) ─────────────────────────────────────────
      {
        code: "CH", name: "Switzerland", emoji: "🇨🇭", subTitle: "26 Cantons", locked: false,
        subRegions: [
          { code: "ch-ag", name: "Aargau",                  flagUrl: wiki("Flag of Aargau.svg") },
          { code: "ch-ai", name: "Appenzell Innerrhoden",   flagUrl: wiki("Flag of Appenzell Innerrhoden.svg") },
          { code: "ch-ar", name: "Appenzell Ausserrhoden",  flagUrl: wiki("Flag of Appenzell Ausserrhoden.svg") },
          { code: "ch-be", name: "Bern",                    flagUrl: wiki("Flag of the canton of Bern.svg") },
          { code: "ch-bl", name: "Basel-Landschaft",        flagUrl: wiki("Flag of Basel-Landschaft.svg") },
          { code: "ch-bs", name: "Basel-Stadt",             flagUrl: wiki("Flag of Basel-Stadt.svg") },
          { code: "ch-fr", name: "Fribourg",                flagUrl: wiki("Flag of Fribourg.svg") },
          { code: "ch-ge", name: "Geneva",                  flagUrl: wiki("Flag of the canton of Geneva.svg") },
          { code: "ch-gl", name: "Glarus",                  flagUrl: wiki("Flag of Glarus.svg") },
          { code: "ch-gr", name: "Graubünden",              flagUrl: wiki("Flag of the canton of Graubünden.svg") },
          { code: "ch-ju", name: "Jura",                    flagUrl: wiki("Flag of Jura.svg") },
          { code: "ch-lu", name: "Lucerne",                 flagUrl: wiki("Flag of Lucerne.svg") },
          { code: "ch-ne", name: "Neuchâtel",               flagUrl: wiki("Flag of Neuchâtel (canton).svg") },
          { code: "ch-nw", name: "Nidwalden",               flagUrl: wiki("Flag of Nidwalden.svg") },
          { code: "ch-ow", name: "Obwalden",                flagUrl: wiki("Flag of Obwalden.svg") },
          { code: "ch-sg", name: "St. Gallen",              flagUrl: wiki("Flag of the canton of St. Gallen.svg") },
          { code: "ch-sh", name: "Schaffhausen",            flagUrl: wiki("Flag of Schaffhausen.svg") },
          { code: "ch-so", name: "Solothurn",               flagUrl: wiki("Flag of Solothurn.svg") },
          { code: "ch-sz", name: "Schwyz",                  flagUrl: wiki("Flag of Schwyz.svg") },
          { code: "ch-tg", name: "Thurgau",                 flagUrl: wiki("Flag of Thurgau.svg") },
          { code: "ch-ti", name: "Ticino",                  flagUrl: wiki("Flag of Ticino.svg") },
          { code: "ch-ur", name: "Uri",                     flagUrl: wiki("Flag of the canton of Uri.svg") },
          { code: "ch-vd", name: "Vaud",                    flagUrl: wiki("Flag of Vaud.svg") },
          { code: "ch-vs", name: "Valais",                  flagUrl: wiki("Flag of Valais.svg") },
          { code: "ch-zg", name: "Zug",                     flagUrl: wiki("Flag of Zug.svg") },
          { code: "ch-zh", name: "Zurich",                  flagUrl: wiki("Flag of the canton of Zurich.svg") },
        ],
      },

      // ── Austria (9 states) ───────────────────────────────────────────────
      {
        code: "AT", name: "Austria", emoji: "🇦🇹", subTitle: "9 States", locked: false,
        subRegions: [
          { code: "at-1", name: "Burgenland",    flagUrl: wiki("Flag of Burgenland.svg") },
          { code: "at-2", name: "Carinthia",     flagUrl: wiki("Flag of Carinthia.svg") },
          { code: "at-3", name: "Lower Austria", flagUrl: wiki("Flag of Lower Austria.svg") },
          { code: "at-4", name: "Upper Austria", flagUrl: wiki("Flag of Upper Austria.svg") },
          { code: "at-5", name: "Salzburg",      flagUrl: wiki("Flag of Salzburg (state).svg") },
          { code: "at-6", name: "Styria",        flagUrl: wiki("Flag of Styria.svg") },
          { code: "at-7", name: "Tyrol",         flagUrl: wiki("Flag of Tyrol.svg") },
          { code: "at-8", name: "Vorarlberg",    flagUrl: wiki("Flag of Vorarlberg.svg") },
          { code: "at-9", name: "Vienna",        flagUrl: wiki("Flag of Vienna.svg") },
        ],
      },

      // ── Netherlands (12 provinces) ───────────────────────────────────────
      {
        code: "NL", name: "Netherlands", emoji: "🇳🇱", subTitle: "12 Provinces", locked: false,
        subRegions: [
          { code: "nl-dr", name: "Drenthe",       flagUrl: wiki("Flag of Drenthe.svg") },
          { code: "nl-fl", name: "Flevoland",     flagUrl: wiki("Flag of Flevoland.svg") },
          { code: "nl-fr", name: "Friesland",     flagUrl: wiki("Flag of Friesland.svg") },
          { code: "nl-ge", name: "Gelderland",    flagUrl: wiki("Flag of Gelderland.svg") },
          { code: "nl-gr", name: "Groningen",     flagUrl: wiki("Flag of Groningen (province).svg") },
          { code: "nl-li", name: "Limburg",       flagUrl: wiki("Flag of Limburg (Netherlands).svg") },
          { code: "nl-nb", name: "North Brabant", flagUrl: wiki("Flag of North Brabant.svg") },
          { code: "nl-nh", name: "North Holland", flagUrl: wiki("Flag of North Holland.svg") },
          { code: "nl-ov", name: "Overijssel",    flagUrl: wiki("Flag of Overijssel.svg") },
          { code: "nl-ut", name: "Utrecht",       flagUrl: wiki("Flag of Utrecht (province).svg") },
          { code: "nl-ze", name: "Zeeland",       flagUrl: wiki("Flag of Zeeland.svg") },
          { code: "nl-zh", name: "South Holland", flagUrl: wiki("Flag of South Holland.svg") },
        ],
      },

      // ── Belgium (3 regions + 10 provinces) ──────────────────────────────
      {
        code: "BE", name: "Belgium", emoji: "🇧🇪", subTitle: "11 Provinces & Regions", locked: false,
        subRegions: [
          { code: "be-bru", name: "Brussels-Capital Region", flagUrl: wiki("Flag of Brussels.svg") },
          { code: "be-van", name: "Antwerp",                 flagUrl: wiki("Flag of the province of Antwerp.svg") },
          { code: "be-wht", name: "Hainaut",                 flagUrl: wiki("Flag of Hainaut.svg") },
          { code: "be-vli", name: "Limburg",                 flagUrl: wiki("Flag of Belgian Limburg.svg") },
          { code: "be-wlg", name: "Liège",                   flagUrl: wiki("Flag of the Province of Liège.svg") },
          { code: "be-wlx", name: "Luxembourg",              flagUrl: wiki("Flag of the Province of Luxembourg.svg") },
          { code: "be-wna", name: "Namur",                   flagUrl: wiki("Flag of the Province of Namur.svg") },
          { code: "be-vwv", name: "West Flanders",           flagUrl: wiki("Flag of West Flanders.svg") },
          { code: "be-vov", name: "East Flanders",           flagUrl: wiki("Flag of East Flanders.svg") },
          { code: "be-vbr", name: "Flemish Brabant",         flagUrl: wiki("Flag of Flemish Brabant.svg") },
          { code: "be-wbr", name: "Walloon Brabant",         flagUrl: wiki("Flag of Walloon Brabant.svg") },
        ],
      },

      // ── Portugal (18 districts + 2 autonomous regions) ──────────────────
      {
        code: "PT", name: "Portugal", emoji: "🇵🇹", subTitle: "20 Districts & Regions", locked: false,
        subRegions: [
          { code: "pt-01", name: "Aveiro",         flagUrl: wiki("Flag of Aveiro.svg") },
          { code: "pt-02", name: "Beja",           flagUrl: wiki("Flag of Beja.svg") },
          { code: "pt-03", name: "Braga",          flagUrl: wiki("Flag of Braga.svg") },
          { code: "pt-04", name: "Bragança",       flagUrl: wiki("Flag of Bragança.svg") },
          { code: "pt-05", name: "Castelo Branco", flagUrl: wiki("Flag of Castelo Branco.svg") },
          { code: "pt-06", name: "Coimbra",        flagUrl: wiki("Flag of Coimbra.svg") },
          { code: "pt-07", name: "Évora",          flagUrl: wiki("Flag of Évora.svg") },
          { code: "pt-08", name: "Faro",           flagUrl: wiki("Flag of Faro.svg") },
          { code: "pt-09", name: "Guarda",         flagUrl: wiki("Flag of Guarda.svg") },
          { code: "pt-10", name: "Leiria",         flagUrl: wiki("Flag of Leiria.svg") },
          { code: "pt-11", name: "Lisbon",         flagUrl: wiki("Flag of Lisbon.svg") },
          { code: "pt-12", name: "Portalegre",     flagUrl: wiki("Flag of Portalegre.svg") },
          { code: "pt-13", name: "Porto",          flagUrl: wiki("Flag of Porto.svg") },
          { code: "pt-14", name: "Santarém",       flagUrl: wiki("Flag of Santarém.svg") },
          { code: "pt-15", name: "Setúbal",        flagUrl: wiki("Flag of Setúbal.svg") },
          { code: "pt-16", name: "Viana do Castelo", flagUrl: wiki("Flag of Viana do Castelo.svg") },
          { code: "pt-17", name: "Vila Real",      flagUrl: wiki("Flag of Vila Real.svg") },
          { code: "pt-18", name: "Viseu",          flagUrl: wiki("Flag of Viseu.svg") },
          { code: "pt-20", name: "Azores",         flagUrl: wiki("Flag of the Azores.svg") },
          { code: "pt-30", name: "Madeira",        flagUrl: wiki("Flag of Madeira.svg") },
        ],
      },

      // ── Sweden (21 counties) ─────────────────────────────────────────────
      {
        code: "SE", name: "Sweden", emoji: "🇸🇪", subTitle: "21 Counties", locked: false,
        subRegions: [
          { code: "se-ab", name: "Stockholm",       flagUrl: wiki("Flag of Stockholm County.svg") },
          { code: "se-ac", name: "Västerbotten",    flagUrl: wiki("Flag of Västerbotten County.svg") },
          { code: "se-bd", name: "Norrbotten",      flagUrl: wiki("Flag of Norrbotten County.svg") },
          { code: "se-c",  name: "Uppsala",         flagUrl: wiki("Flag of Uppsala County.svg") },
          { code: "se-d",  name: "Södermanland",    flagUrl: wiki("Flag of Södermanland County.svg") },
          { code: "se-e",  name: "Östergötland",    flagUrl: wiki("Flag of Östergötland County.svg") },
          { code: "se-f",  name: "Jönköping",       flagUrl: wiki("Flag of Jönköping County.svg") },
          { code: "se-g",  name: "Kronoberg",       flagUrl: wiki("Flag of Kronoberg County.svg") },
          { code: "se-h",  name: "Kalmar",          flagUrl: wiki("Flag of Kalmar County.svg") },
          { code: "se-i",  name: "Gotland",         flagUrl: wiki("Flag of Gotland County.svg") },
          { code: "se-k",  name: "Blekinge",        flagUrl: wiki("Flag of Blekinge County.svg") },
          { code: "se-m",  name: "Skåne",           flagUrl: wiki("Flag of Scania County.svg") },
          { code: "se-n",  name: "Halland",         flagUrl: wiki("Flag of Halland County.svg") },
          { code: "se-o",  name: "Västra Götaland", flagUrl: wiki("Flag of Västra Götaland County.svg") },
          { code: "se-s",  name: "Värmland",        flagUrl: wiki("Flag of Värmland County.svg") },
          { code: "se-t",  name: "Örebro",          flagUrl: wiki("Flag of Örebro County.svg") },
          { code: "se-u",  name: "Västmanland",     flagUrl: wiki("Flag of Västmanland County.svg") },
          { code: "se-w",  name: "Dalarna",         flagUrl: wiki("Flag of Dalarna County.svg") },
          { code: "se-x",  name: "Gävleborg",       flagUrl: wiki("Flag of Gävleborg County.svg") },
          { code: "se-y",  name: "Västernorrland",  flagUrl: wiki("Flag of Västernorrland County.svg") },
          { code: "se-z",  name: "Jämtland",        flagUrl: wiki("Flag of Jämtland County.svg") },
        ],
      },

      // ── Norway (15 counties) ─────────────────────────────────────────────
      {
        code: "NO", name: "Norway", emoji: "🇳🇴", subTitle: "15 Counties", locked: false,
        subRegions: [
          { code: "no-03", name: "Oslo",                flagUrl: wiki("Flag of Oslo.svg") },
          { code: "no-11", name: "Rogaland",            flagUrl: wiki("Flag of Rogaland.svg") },
          { code: "no-15", name: "Møre og Romsdal",     flagUrl: wiki("Flag of Møre og Romsdal.svg") },
          { code: "no-18", name: "Nordland",            flagUrl: wiki("Flag of Nordland.svg") },
          { code: "no-30", name: "Viken",               flagUrl: wiki("Flag of Viken.svg") },
          { code: "no-34", name: "Innlandet",           flagUrl: wiki("Flag of Innlandet.svg") },
          { code: "no-38", name: "Vestfold og Telemark",flagUrl: wiki("Flag of Vestfold og Telemark.svg") },
          { code: "no-42", name: "Agder",               flagUrl: wiki("Flag of Agder.svg") },
          { code: "no-46", name: "Vestland",            flagUrl: wiki("Flag of Vestland.svg") },
          { code: "no-50", name: "Trøndelag",           flagUrl: wiki("Flag of Trøndelag.svg") },
          { code: "no-54", name: "Troms og Finnmark",   flagUrl: wiki("Flag of Troms og Finnmark.svg") },
        ],
      },

      // ── Denmark (5 regions) ──────────────────────────────────────────────
      {
        code: "DK", name: "Denmark", emoji: "🇩🇰", subTitle: "5 Regions", locked: false,
        subRegions: [
          { code: "dk-81", name: "North Denmark",    flagUrl: wiki("Flag of North Denmark Region.svg") },
          { code: "dk-82", name: "Central Denmark",  flagUrl: wiki("Flag of Central Denmark Region.svg") },
          { code: "dk-83", name: "Southern Denmark", flagUrl: wiki("Flag of Region of Southern Denmark.svg") },
          { code: "dk-84", name: "Capital Region",   flagUrl: wiki("Flag of Capital Region of Denmark.svg") },
          { code: "dk-85", name: "Zealand",          flagUrl: wiki("Flag of Region Zealand.svg") },
        ],
      },

      // ── Finland (19 regions) ─────────────────────────────────────────────
      {
        code: "FI", name: "Finland", emoji: "🇫🇮", subTitle: "19 Regions", locked: false,
        subRegions: [
          { code: "fi-01", name: "Uusimaa",                    flagUrl: wiki("Flag of Uusimaa.svg") },
          { code: "fi-02", name: "South Karelia",              flagUrl: wiki("Flag of South Karelia.svg") },
          { code: "fi-03", name: "South Ostrobothnia",         flagUrl: wiki("Flag of South Ostrobothnia.svg") },
          { code: "fi-04", name: "South Savo",                 flagUrl: wiki("Flag of South Savo.svg") },
          { code: "fi-05", name: "Kainuu",                     flagUrl: wiki("Flag of Kainuu.svg") },
          { code: "fi-06", name: "Tavastia Proper",            flagUrl: wiki("Flag of Tavastia Proper.svg") },
          { code: "fi-07", name: "Central Ostrobothnia",       flagUrl: wiki("Flag of Central Ostrobothnia.svg") },
          { code: "fi-08", name: "Central Finland",            flagUrl: wiki("Flag of Central Finland.svg") },
          { code: "fi-09", name: "Kymenlaakso",                flagUrl: wiki("Flag of Kymenlaakso.svg") },
          { code: "fi-10", name: "Lapland",                    flagUrl: wiki("Flag of Lapland (Finland).svg") },
          { code: "fi-11", name: "Pirkanmaa",                  flagUrl: wiki("Flag of Pirkanmaa.svg") },
          { code: "fi-12", name: "Ostrobothnia",               flagUrl: wiki("Flag of Ostrobothnia (region).svg") },
          { code: "fi-13", name: "North Karelia",              flagUrl: wiki("Flag of North Karelia.svg") },
          { code: "fi-14", name: "North Ostrobothnia",         flagUrl: wiki("Flag of North Ostrobothnia.svg") },
          { code: "fi-15", name: "North Savo",                 flagUrl: wiki("Flag of North Savo.svg") },
          { code: "fi-16", name: "Päijänne Tavastia",          flagUrl: wiki("Flag of Päijät-Häme.svg") },
          { code: "fi-17", name: "Satakunta",                  flagUrl: wiki("Flag of Satakunta.svg") },
          { code: "fi-18", name: "Southwest Finland",          flagUrl: wiki("Flag of Southwest Finland.svg") },
          { code: "fi-19", name: "Åland Islands",              flagUrl: wiki("Flag of Åland.svg") },
        ],
      },

      // ── Poland (16 voivodeships) ─────────────────────────────────────────
      {
        code: "PL", name: "Poland", emoji: "🇵🇱", subTitle: "16 Voivodeships", locked: false,
        subRegions: [
          { code: "pl-ds", name: "Lower Silesian",       flagUrl: wiki("Flag of Lower Silesian Voivodeship.svg") },
          { code: "pl-kp", name: "Kuyavian-Pomeranian",  flagUrl: wiki("Flag of Kuyavian-Pomeranian Voivodeship.svg") },
          { code: "pl-lb", name: "Lubusz",               flagUrl: wiki("Flag of Lubusz Voivodeship.svg") },
          { code: "pl-ld", name: "Łódź",                 flagUrl: wiki("Flag of Łódź Voivodeship.svg") },
          { code: "pl-lu", name: "Lublin",               flagUrl: wiki("Flag of Lublin Voivodeship.svg") },
          { code: "pl-ma", name: "Lesser Poland",        flagUrl: wiki("Flag of Lesser Poland Voivodeship.svg") },
          { code: "pl-mz", name: "Masovian",             flagUrl: wiki("Flag of Masovian Voivodeship.svg") },
          { code: "pl-op", name: "Opole",                flagUrl: wiki("Flag of Opole Voivodeship.svg") },
          { code: "pl-pd", name: "Podlaskie",            flagUrl: wiki("Flag of Podlaskie Voivodeship.svg") },
          { code: "pl-pk", name: "Subcarpathian",        flagUrl: wiki("Flag of Subcarpathian Voivodeship.svg") },
          { code: "pl-pm", name: "Pomeranian",           flagUrl: wiki("Flag of Pomeranian Voivodeship.svg") },
          { code: "pl-sk", name: "Świętokrzyskie",       flagUrl: wiki("Flag of Świętokrzyskie Voivodeship.svg") },
          { code: "pl-sl", name: "Silesian",             flagUrl: wiki("Flag of Silesian Voivodeship.svg") },
          { code: "pl-wn", name: "Warmian-Masurian",     flagUrl: wiki("Flag of Warmian-Masurian Voivodeship.svg") },
          { code: "pl-wp", name: "Greater Poland",       flagUrl: wiki("Flag of Greater Poland Voivodeship.svg") },
          { code: "pl-zp", name: "West Pomeranian",      flagUrl: wiki("Flag of West Pomeranian Voivodeship.svg") },
        ],
      },

      // ── Greece (13 regions) ──────────────────────────────────────────────
      {
        code: "GR", name: "Greece", emoji: "🇬🇷", subTitle: "13 Regions", locked: false,
        subRegions: [
          { code: "gr-a", name: "East Macedonia & Thrace", flagUrl: wiki("Flag of East Macedonia and Thrace.svg") },
          { code: "gr-b", name: "Central Macedonia",       flagUrl: wiki("Flag of Central Macedonia.svg") },
          { code: "gr-c", name: "West Macedonia",          flagUrl: wiki("Flag of West Macedonia.svg") },
          { code: "gr-d", name: "Epirus",                  flagUrl: wiki("Flag of Epirus.svg") },
          { code: "gr-e", name: "Thessaly",                flagUrl: wiki("Flag of Thessaly.svg") },
          { code: "gr-f", name: "Ionian Islands",          flagUrl: wiki("Flag of Ionian Islands region.svg") },
          { code: "gr-g", name: "West Greece",             flagUrl: wiki("Flag of West Greece.svg") },
          { code: "gr-h", name: "Central Greece",          flagUrl: wiki("Flag of Central Greece.svg") },
          { code: "gr-i", name: "Attica",                  flagUrl: wiki("Flag of Attica.svg") },
          { code: "gr-j", name: "Peloponnese",             flagUrl: wiki("Flag of Peloponnese (region).svg") },
          { code: "gr-k", name: "North Aegean",            flagUrl: wiki("Flag of North Aegean.svg") },
          { code: "gr-l", name: "South Aegean",            flagUrl: wiki("Flag of South Aegean.svg") },
          { code: "gr-m", name: "Crete",                   flagUrl: wiki("Flag of Crete.svg") },
        ],
      },

      // ── Czech Republic (14 regions) ──────────────────────────────────────
      {
        code: "CZ", name: "Czech Republic", emoji: "🇨🇿", subTitle: "14 Regions", locked: false,
        subRegions: [
          { code: "cz-10", name: "Prague",              flagUrl: wiki("Flag of Prague.svg") },
          { code: "cz-20", name: "Central Bohemia",     flagUrl: wiki("Flag of Central Bohemian Region.svg") },
          { code: "cz-31", name: "South Bohemia",       flagUrl: wiki("Flag of South Bohemian Region.svg") },
          { code: "cz-32", name: "Pilsen",              flagUrl: wiki("Flag of Plzeň Region.svg") },
          { code: "cz-41", name: "Karlovy Vary",        flagUrl: wiki("Flag of Karlovy Vary Region.svg") },
          { code: "cz-42", name: "Ústí nad Labem",      flagUrl: wiki("Flag of Ústí nad Labem Region.svg") },
          { code: "cz-51", name: "Liberec",             flagUrl: wiki("Flag of Liberec Region.svg") },
          { code: "cz-52", name: "Hradec Králové",      flagUrl: wiki("Flag of Hradec Králové Region.svg") },
          { code: "cz-53", name: "Pardubice",           flagUrl: wiki("Flag of Pardubice Region.svg") },
          { code: "cz-63", name: "Vysočina",            flagUrl: wiki("Flag of Vysočina Region.svg") },
          { code: "cz-64", name: "South Moravia",       flagUrl: wiki("Flag of South Moravian Region.svg") },
          { code: "cz-71", name: "Olomouc",             flagUrl: wiki("Flag of Olomouc Region.svg") },
          { code: "cz-72", name: "Zlín",                flagUrl: wiki("Flag of Zlín Region.svg") },
          { code: "cz-80", name: "Moravian-Silesian",   flagUrl: wiki("Flag of Moravian-Silesian Region.svg") },
        ],
      },

      // ── Hungary (19 counties + Budapest) ────────────────────────────────
      {
        code: "HU", name: "Hungary", emoji: "🇭🇺", subTitle: "20 Counties", locked: false,
        subRegions: [
          { code: "hu-ba", name: "Baranya",               flagUrl: wiki("Flag of Baranya County.svg") },
          { code: "hu-be", name: "Békés",                 flagUrl: wiki("Flag of Békés County.svg") },
          { code: "hu-bk", name: "Bács-Kiskun",           flagUrl: wiki("Flag of Bács-Kiskun County.svg") },
          { code: "hu-bu", name: "Budapest",              flagUrl: wiki("Flag of Budapest.svg") },
          { code: "hu-bz", name: "Borsod-Abaúj-Zemplén", flagUrl: wiki("Flag of Borsod-Abaúj-Zemplén County.svg") },
          { code: "hu-cs", name: "Csongrád-Csanád",       flagUrl: wiki("Flag of Csongrád County.svg") },
          { code: "hu-fe", name: "Fejér",                 flagUrl: wiki("Flag of Fejér County.svg") },
          { code: "hu-gs", name: "Győr-Moson-Sopron",     flagUrl: wiki("Flag of Győr-Moson-Sopron County.svg") },
          { code: "hu-hb", name: "Hajdú-Bihar",           flagUrl: wiki("Flag of Hajdú-Bihar County.svg") },
          { code: "hu-he", name: "Heves",                 flagUrl: wiki("Flag of Heves County.svg") },
          { code: "hu-jn", name: "Jász-Nagykun-Szolnok",  flagUrl: wiki("Flag of Jász-Nagykun-Szolnok County.svg") },
          { code: "hu-ke", name: "Komárom-Esztergom",     flagUrl: wiki("Flag of Komárom-Esztergom County.svg") },
          { code: "hu-no", name: "Nógrád",                flagUrl: wiki("Flag of Nógrád County.svg") },
          { code: "hu-pe", name: "Pest",                  flagUrl: wiki("Flag of Pest County.svg") },
          { code: "hu-so", name: "Somogy",                flagUrl: wiki("Flag of Somogy County.svg") },
          { code: "hu-sz", name: "Szabolcs-Szatmár-Bereg",flagUrl: wiki("Flag of Szabolcs-Szatmár-Bereg County.svg") },
          { code: "hu-to", name: "Tolna",                 flagUrl: wiki("Flag of Tolna County.svg") },
          { code: "hu-va", name: "Vas",                   flagUrl: wiki("Flag of Vas County.svg") },
          { code: "hu-ve", name: "Veszprém",              flagUrl: wiki("Flag of Veszprém County.svg") },
          { code: "hu-za", name: "Zala",                  flagUrl: wiki("Flag of Zala County.svg") },
        ],
      },

      // ── Romania (41 counties + Bucharest) ───────────────────────────────
      {
        code: "RO", name: "Romania", emoji: "🇷🇴", subTitle: "42 Counties", locked: false,
        subRegions: [
          { code: "ro-ab", name: "Alba",           flagUrl: wiki("Flag of Alba County.svg") },
          { code: "ro-ar", name: "Arad",           flagUrl: wiki("Flag of Arad County.svg") },
          { code: "ro-ag", name: "Argeș",          flagUrl: wiki("Flag of Argeș County.svg") },
          { code: "ro-bc", name: "Bacău",          flagUrl: wiki("Flag of Bacău County.svg") },
          { code: "ro-bh", name: "Bihor",          flagUrl: wiki("Flag of Bihor County.svg") },
          { code: "ro-bn", name: "Bistrița-Năsăud",flagUrl: wiki("Flag of Bistrița-Năsăud County.svg") },
          { code: "ro-bt", name: "Botoșani",       flagUrl: wiki("Flag of Botoșani County.svg") },
          { code: "ro-bv", name: "Brașov",         flagUrl: wiki("Flag of Brașov County.svg") },
          { code: "ro-br", name: "Brăila",         flagUrl: wiki("Flag of Brăila County.svg") },
          { code: "ro-b",  name: "Bucharest",      flagUrl: wiki("Flag of Bucharest.svg") },
          { code: "ro-bz", name: "Buzău",          flagUrl: wiki("Flag of Buzău County.svg") },
          { code: "ro-cs", name: "Caraș-Severin",  flagUrl: wiki("Flag of Caraș-Severin County.svg") },
          { code: "ro-cj", name: "Cluj",           flagUrl: wiki("Flag of Cluj County.svg") },
          { code: "ro-ct", name: "Constanța",      flagUrl: wiki("Flag of Constanța County.svg") },
          { code: "ro-cv", name: "Covasna",        flagUrl: wiki("Flag of Covasna County.svg") },
          { code: "ro-db", name: "Dâmbovița",      flagUrl: wiki("Flag of Dâmbovița County.svg") },
          { code: "ro-dj", name: "Dolj",           flagUrl: wiki("Flag of Dolj County.svg") },
          { code: "ro-gl", name: "Galați",         flagUrl: wiki("Flag of Galați County.svg") },
          { code: "ro-gr", name: "Giurgiu",        flagUrl: wiki("Flag of Giurgiu County.svg") },
          { code: "ro-gj", name: "Gorj",           flagUrl: wiki("Flag of Gorj County.svg") },
          { code: "ro-hr", name: "Harghita",       flagUrl: wiki("Flag of Harghita County.svg") },
          { code: "ro-hd", name: "Hunedoara",      flagUrl: wiki("Flag of Hunedoara County.svg") },
          { code: "ro-il", name: "Ialomița",       flagUrl: wiki("Flag of Ialomița County.svg") },
          { code: "ro-is", name: "Iași",           flagUrl: wiki("Flag of Iași County.svg") },
          { code: "ro-if", name: "Ilfov",          flagUrl: wiki("Flag of Ilfov County.svg") },
          { code: "ro-mm", name: "Maramureș",      flagUrl: wiki("Flag of Maramureș County.svg") },
          { code: "ro-mh", name: "Mehedinți",      flagUrl: wiki("Flag of Mehedinți County.svg") },
          { code: "ro-ms", name: "Mureș",          flagUrl: wiki("Flag of Mureș County.svg") },
          { code: "ro-nt", name: "Neamț",          flagUrl: wiki("Flag of Neamț County.svg") },
          { code: "ro-ot", name: "Olt",            flagUrl: wiki("Flag of Olt County.svg") },
          { code: "ro-ph", name: "Prahova",        flagUrl: wiki("Flag of Prahova County.svg") },
          { code: "ro-sm", name: "Satu Mare",      flagUrl: wiki("Flag of Satu Mare County.svg") },
          { code: "ro-sj", name: "Sălaj",          flagUrl: wiki("Flag of Sălaj County.svg") },
          { code: "ro-sb", name: "Sibiu",          flagUrl: wiki("Flag of Sibiu County.svg") },
          { code: "ro-sv", name: "Suceava",        flagUrl: wiki("Flag of Suceava County.svg") },
          { code: "ro-tr", name: "Teleorman",      flagUrl: wiki("Flag of Teleorman County.svg") },
          { code: "ro-tm", name: "Timiș",          flagUrl: wiki("Flag of Timiș County.svg") },
          { code: "ro-tl", name: "Tulcea",         flagUrl: wiki("Flag of Tulcea County.svg") },
          { code: "ro-vs", name: "Vaslui",         flagUrl: wiki("Flag of Vaslui County.svg") },
          { code: "ro-vl", name: "Vâlcea",         flagUrl: wiki("Flag of Vâlcea County.svg") },
          { code: "ro-vn", name: "Vrancea",        flagUrl: wiki("Flag of Vrancea County.svg") },
          { code: "ro-cl", name: "Călărași",       flagUrl: wiki("Flag of Călărași County.svg") },
        ],
      },

      // ── Bulgaria (28 provinces) ──────────────────────────────────────────
      {
        code: "BG", name: "Bulgaria", emoji: "🇧🇬", subTitle: "28 Provinces", locked: false,
        subRegions: [
          { code: "bg-01", name: "Blagoevgrad",    flagUrl: wiki("Flag of Blagoevgrad Province.svg") },
          { code: "bg-02", name: "Burgas",         flagUrl: wiki("Flag of Burgas Province.svg") },
          { code: "bg-03", name: "Varna",          flagUrl: wiki("Flag of Varna Province.svg") },
          { code: "bg-04", name: "Veliko Tarnovo", flagUrl: wiki("Flag of Veliko Tarnovo Province.svg") },
          { code: "bg-05", name: "Vidin",          flagUrl: wiki("Flag of Vidin Province.svg") },
          { code: "bg-06", name: "Vratsa",         flagUrl: wiki("Flag of Vratsa Province.svg") },
          { code: "bg-07", name: "Gabrovo",        flagUrl: wiki("Flag of Gabrovo Province.svg") },
          { code: "bg-08", name: "Dobrich",        flagUrl: wiki("Flag of Dobrich Province.svg") },
          { code: "bg-09", name: "Kardzhali",      flagUrl: wiki("Flag of Kardzhali Province.svg") },
          { code: "bg-10", name: "Kyustendil",     flagUrl: wiki("Flag of Kyustendil Province.svg") },
          { code: "bg-11", name: "Lovech",         flagUrl: wiki("Flag of Lovech Province.svg") },
          { code: "bg-12", name: "Montana",        flagUrl: wiki("Flag of Montana Province.svg") },
          { code: "bg-13", name: "Pazardzhik",     flagUrl: wiki("Flag of Pazardzhik Province.svg") },
          { code: "bg-14", name: "Pernik",         flagUrl: wiki("Flag of Pernik Province.svg") },
          { code: "bg-15", name: "Pleven",         flagUrl: wiki("Flag of Pleven Province.svg") },
          { code: "bg-16", name: "Plovdiv",        flagUrl: wiki("Flag of Plovdiv Province.svg") },
          { code: "bg-17", name: "Razgrad",        flagUrl: wiki("Flag of Razgrad Province.svg") },
          { code: "bg-18", name: "Ruse",           flagUrl: wiki("Flag of Ruse Province.svg") },
          { code: "bg-19", name: "Silistra",       flagUrl: wiki("Flag of Silistra Province.svg") },
          { code: "bg-20", name: "Sliven",         flagUrl: wiki("Flag of Sliven Province.svg") },
          { code: "bg-21", name: "Smolyan",        flagUrl: wiki("Flag of Smolyan Province.svg") },
          { code: "bg-22", name: "Sofia City",     flagUrl: wiki("Flag of Sofia.svg") },
          { code: "bg-23", name: "Sofia Province", flagUrl: wiki("Flag of Sofia Province.svg") },
          { code: "bg-24", name: "Stara Zagora",   flagUrl: wiki("Flag of Stara Zagora Province.svg") },
          { code: "bg-25", name: "Targovishte",    flagUrl: wiki("Flag of Targovishte Province.svg") },
          { code: "bg-26", name: "Haskovo",        flagUrl: wiki("Flag of Haskovo Province.svg") },
          { code: "bg-27", name: "Shumen",         flagUrl: wiki("Flag of Shumen Province.svg") },
          { code: "bg-28", name: "Yambol",         flagUrl: wiki("Flag of Yambol Province.svg") },
        ],
      },

      // ── Croatia (20 counties + City of Zagreb) ───────────────────────────
      {
        code: "HR", name: "Croatia", emoji: "🇭🇷", subTitle: "21 Counties", locked: false,
        subRegions: [
          { code: "hr-01", name: "Zagreb County",       flagUrl: wiki("Flag of Zagreb County.svg") },
          { code: "hr-02", name: "Krapina-Zagorje",     flagUrl: wiki("Flag of Krapina-Zagorje County.svg") },
          { code: "hr-03", name: "Sisak-Moslavina",     flagUrl: wiki("Flag of Sisak-Moslavina County.svg") },
          { code: "hr-04", name: "Karlovac",            flagUrl: wiki("Flag of Karlovac County.svg") },
          { code: "hr-05", name: "Varaždin",            flagUrl: wiki("Flag of Varaždin County.svg") },
          { code: "hr-06", name: "Koprivnica-Križevci", flagUrl: wiki("Flag of Koprivnica-Križevci County.svg") },
          { code: "hr-07", name: "Bjelovar-Bilogora",   flagUrl: wiki("Flag of Bjelovar-Bilogora County.svg") },
          { code: "hr-08", name: "Primorje-Gorski Kotar",flagUrl: wiki("Flag of Primorje-Gorski Kotar County.svg") },
          { code: "hr-09", name: "Lika-Senj",           flagUrl: wiki("Flag of Lika-Senj County.svg") },
          { code: "hr-10", name: "Virovitica-Podravina", flagUrl: wiki("Flag of Virovitica-Podravina County.svg") },
          { code: "hr-11", name: "Požega-Slavonia",     flagUrl: wiki("Flag of Požega-Slavonia County.svg") },
          { code: "hr-12", name: "Brod-Posavina",       flagUrl: wiki("Flag of Brod-Posavina County.svg") },
          { code: "hr-13", name: "Zadar",               flagUrl: wiki("Flag of Zadar County.svg") },
          { code: "hr-14", name: "Osijek-Baranja",      flagUrl: wiki("Flag of Osijek-Baranja County.svg") },
          { code: "hr-15", name: "Šibenik-Knin",        flagUrl: wiki("Flag of Šibenik-Knin County.svg") },
          { code: "hr-16", name: "Vukovar-Srijem",      flagUrl: wiki("Flag of Vukovar-Srijem County.svg") },
          { code: "hr-17", name: "Split-Dalmatia",      flagUrl: wiki("Flag of Split-Dalmatia County.svg") },
          { code: "hr-18", name: "Istria",              flagUrl: wiki("Flag of Istria County.svg") },
          { code: "hr-19", name: "Dubrovnik-Neretva",   flagUrl: wiki("Flag of Dubrovnik-Neretva County.svg") },
          { code: "hr-20", name: "Međimurje",           flagUrl: wiki("Flag of Međimurje County.svg") },
          { code: "hr-21", name: "City of Zagreb",      flagUrl: wiki("Flag of Zagreb.svg") },
        ],
      },

      // ── Slovakia (8 regions) ─────────────────────────────────────────────
      {
        code: "SK", name: "Slovakia", emoji: "🇸🇰", subTitle: "8 Regions", locked: false,
        subRegions: [
          { code: "sk-bc", name: "Banská Bystrica", flagUrl: wiki("Flag of Banská Bystrica Region.svg") },
          { code: "sk-bl", name: "Bratislava",      flagUrl: wiki("Flag of Bratislava Region.svg") },
          { code: "sk-ki", name: "Košice",          flagUrl: wiki("Flag of Košice Region.svg") },
          { code: "sk-ni", name: "Nitra",           flagUrl: wiki("Flag of Nitra Region.svg") },
          { code: "sk-pv", name: "Prešov",          flagUrl: wiki("Flag of Prešov Region.svg") },
          { code: "sk-ta", name: "Trnava",          flagUrl: wiki("Flag of Trnava Region.svg") },
          { code: "sk-tc", name: "Trenčín",         flagUrl: wiki("Flag of Trenčín Region.svg") },
          { code: "sk-zi", name: "Žilina",          flagUrl: wiki("Flag of Žilina Region.svg") },
        ],
      },

      // ── Lithuania (10 counties) ──────────────────────────────────────────
      {
        code: "LT", name: "Lithuania", emoji: "🇱🇹", subTitle: "10 Counties", locked: false,
        subRegions: [
          { code: "lt-al", name: "Alytus",      flagUrl: wiki("Flag of Alytus County.svg") },
          { code: "lt-kl", name: "Klaipėda",   flagUrl: wiki("Flag of Klaipėda County.svg") },
          { code: "lt-ku", name: "Kaunas",      flagUrl: wiki("Flag of Kaunas County.svg") },
          { code: "lt-mr", name: "Marijampolė",flagUrl: wiki("Flag of Marijampolė County.svg") },
          { code: "lt-pn", name: "Panevėžys",  flagUrl: wiki("Flag of Panevėžys County.svg") },
          { code: "lt-sa", name: "Šiauliai",   flagUrl: wiki("Flag of Šiauliai County.svg") },
          { code: "lt-ta", name: "Tauragė",    flagUrl: wiki("Flag of Tauragė County.svg") },
          { code: "lt-te", name: "Telšiai",    flagUrl: wiki("Flag of Telšiai County.svg") },
          { code: "lt-ut", name: "Utena",      flagUrl: wiki("Flag of Utena County.svg") },
          { code: "lt-vl", name: "Vilnius",    flagUrl: wiki("Flag of Vilnius County.svg") },
        ],
      },

      // ── Latvia (6 planning regions) ──────────────────────────────────────
      {
        code: "LV", name: "Latvia", emoji: "🇱🇻", subTitle: "6 Regions", locked: false,
        subRegions: [
          { code: "lv-rix", name: "Riga",        flagUrl: wiki("Flag of Riga.svg") },
          { code: "lv-pie", name: "Pierīga",     flagUrl: wiki("Flag of Pierīga Region.svg") },
          { code: "lv-vid", name: "Vidzeme",     flagUrl: wiki("Flag of Vidzeme.svg") },
          { code: "lv-kur", name: "Kurzeme",     flagUrl: wiki("Flag of Kurzeme.svg") },
          { code: "lv-zem", name: "Zemgale",     flagUrl: wiki("Flag of Zemgale.svg") },
          { code: "lv-lat", name: "Latgale",     flagUrl: wiki("Flag of Latgale.svg") },
        ],
      },

      // ── Estonia (15 counties) ────────────────────────────────────────────
      {
        code: "EE", name: "Estonia", emoji: "🇪🇪", subTitle: "15 Counties", locked: false,
        subRegions: [
          { code: "ee-37", name: "Harju",       flagUrl: wiki("Flag of Harju County.svg") },
          { code: "ee-39", name: "Hiiu",        flagUrl: wiki("Flag of Hiiu County.svg") },
          { code: "ee-44", name: "Ida-Viru",    flagUrl: wiki("Flag of Ida-Viru County.svg") },
          { code: "ee-49", name: "Jõgeva",      flagUrl: wiki("Flag of Jõgeva County.svg") },
          { code: "ee-51", name: "Järva",       flagUrl: wiki("Flag of Järva County.svg") },
          { code: "ee-57", name: "Lääne",       flagUrl: wiki("Flag of Lääne County.svg") },
          { code: "ee-59", name: "Lääne-Viru",  flagUrl: wiki("Flag of Lääne-Viru County.svg") },
          { code: "ee-65", name: "Põlva",       flagUrl: wiki("Flag of Põlva County.svg") },
          { code: "ee-67", name: "Pärnu",       flagUrl: wiki("Flag of Pärnu County.svg") },
          { code: "ee-70", name: "Rapla",       flagUrl: wiki("Flag of Rapla County.svg") },
          { code: "ee-74", name: "Saare",       flagUrl: wiki("Flag of Saare County.svg") },
          { code: "ee-78", name: "Tartu",       flagUrl: wiki("Flag of Tartu County.svg") },
          { code: "ee-82", name: "Valga",       flagUrl: wiki("Flag of Valga County.svg") },
          { code: "ee-84", name: "Viljandi",    flagUrl: wiki("Flag of Viljandi County.svg") },
          { code: "ee-86", name: "Võru",        flagUrl: wiki("Flag of Võru County.svg") },
        ],
      },

      // ── Ireland (26 counties) ────────────────────────────────────────────
      {
        code: "IE", name: "Ireland", emoji: "🇮🇪", subTitle: "26 Counties", locked: false,
        subRegions: [
          // Leinster – 12 counties
          { code: "ie-cw", name: "Carlow",    flagUrl: wiki("Flag of County Carlow.svg"), group: "Leinster" },
          { code: "ie-d",  name: "Dublin",    flagUrl: wiki("Flag of County Dublin.svg"), group: "Leinster" },
          { code: "ie-ke", name: "Kildare",   flagUrl: wiki("Flag of County Kildare.svg"), group: "Leinster" },
          { code: "ie-kk", name: "Kilkenny",  flagUrl: wiki("Flag of County Kilkenny.svg"), group: "Leinster" },
          { code: "ie-ls", name: "Laois",     flagUrl: wiki("Flag of County Laois.svg"), group: "Leinster" },
          { code: "ie-ld", name: "Longford",  flagUrl: wiki("Flag of County Longford.svg"), group: "Leinster" },
          { code: "ie-lh", name: "Louth",     flagUrl: wiki("Flag of County Louth.svg"), group: "Leinster" },
          { code: "ie-mh", name: "Meath",     flagUrl: wiki("Flag of County Meath.svg"), group: "Leinster" },
          { code: "ie-oy", name: "Offaly",    flagUrl: wiki("Flag of County Offaly.svg"), group: "Leinster" },
          { code: "ie-wh", name: "Westmeath", flagUrl: wiki("Flag of County Westmeath.svg"), group: "Leinster" },
          { code: "ie-wx", name: "Wexford",   flagUrl: wiki("Flag of County Wexford.svg"), group: "Leinster" },
          { code: "ie-ww", name: "Wicklow",   flagUrl: wiki("Flag of County Wicklow.svg"), group: "Leinster" },
          // Munster – 6 counties
          { code: "ie-ce", name: "Clare",     flagUrl: wiki("Flag of County Clare.svg"), group: "Munster" },
          { code: "ie-co", name: "Cork",      flagUrl: wiki("Flag of County Cork.svg"), group: "Munster" },
          { code: "ie-ky", name: "Kerry",     flagUrl: wiki("Flag of County Kerry.svg"), group: "Munster" },
          { code: "ie-lk", name: "Limerick",  flagUrl: wiki("Flag of County Limerick.svg"), group: "Munster" },
          { code: "ie-ta", name: "Tipperary", flagUrl: wiki("Flag of County Tipperary.svg"), group: "Munster" },
          { code: "ie-wd", name: "Waterford", flagUrl: wiki("Flag of County Waterford.svg"), group: "Munster" },
          // Connacht – 5 counties
          { code: "ie-g",  name: "Galway",    flagUrl: wiki("Flag of County Galway.svg"), group: "Connacht" },
          { code: "ie-lm", name: "Leitrim",   flagUrl: wiki("Flag of County Leitrim.svg"), group: "Connacht" },
          { code: "ie-mo", name: "Mayo",      flagUrl: wiki("Flag of County Mayo.svg"), group: "Connacht" },
          { code: "ie-rn", name: "Roscommon", flagUrl: wiki("Flag of County Roscommon.svg"), group: "Connacht" },
          { code: "ie-so", name: "Sligo",     flagUrl: wiki("Flag of County Sligo.svg"), group: "Connacht" },
          // Ulster (Irish counties) – 3 counties
          { code: "ie-cn", name: "Cavan",     flagUrl: wiki("Flag of County Cavan.svg"), group: "Ulster" },
          { code: "ie-dl", name: "Donegal",   flagUrl: wiki("Flag of County Donegal.svg"), group: "Ulster" },
          { code: "ie-mn", name: "Monaghan",  flagUrl: wiki("Flag of County Monaghan.svg"), group: "Ulster" },
        ],
      },

      // ── Serbia (25 districts + Belgrade) ────────────────────────────────
      {
        code: "RS", name: "Serbia", emoji: "🇷🇸", subTitle: "25 Districts", locked: false,
        subRegions: [
          // Belgrade City
          { code: "rs-00", name: "Belgrade",           flagUrl: wiki("Flag of Belgrade.svg") },
          // Central Serbia – 17 districts
          { code: "rs-01", name: "Braničevo",          flagUrl: wiki("Flag of Braničevo District.svg") },
          { code: "rs-02", name: "Jablanica",          flagUrl: wiki("Flag of Jablanica District.svg") },
          { code: "rs-03", name: "Kolubara",           flagUrl: wiki("Flag of Kolubara District.svg") },
          { code: "rs-04", name: "Mačva",              flagUrl: wiki("Flag of Mačva District.svg") },
          { code: "rs-05", name: "Moravica",           flagUrl: wiki("Flag of Moravica District.svg") },
          { code: "rs-06", name: "Nišava",             flagUrl: wiki("Flag of Nišava District.svg") },
          { code: "rs-07", name: "Pčinja",             flagUrl: wiki("Flag of Pčinja District.svg") },
          { code: "rs-08", name: "Pirot",              flagUrl: wiki("Flag of Pirot District.svg") },
          { code: "rs-09", name: "Podunavlje",         flagUrl: wiki("Flag of Podunavlje District.svg") },
          { code: "rs-10", name: "Pomoravlje",         flagUrl: wiki("Flag of Pomoravlje District.svg") },
          { code: "rs-11", name: "Rasina",             flagUrl: wiki("Flag of Rasina District.svg") },
          { code: "rs-12", name: "Raška",              flagUrl: wiki("Flag of Raška District.svg") },
          { code: "rs-13", name: "Toplica",            flagUrl: wiki("Flag of Toplica District.svg") },
          { code: "rs-14", name: "Zaječar",            flagUrl: wiki("Flag of Zaječar District.svg") },
          { code: "rs-15", name: "Zlatibor",           flagUrl: wiki("Flag of Zlatibor District.svg") },
          { code: "rs-16", name: "Šumadija",           flagUrl: wiki("Flag of Šumadija District.svg") },
          { code: "rs-17", name: "Bor",                flagUrl: wiki("Flag of Bor District.svg") },
          // Vojvodina – 7 districts
          { code: "rs-19", name: "South Bačka",        flagUrl: wiki("Flag of South Bačka District.svg") },
          { code: "rs-20", name: "North Bačka",        flagUrl: wiki("Flag of North Bačka District.svg") },
          { code: "rs-21", name: "West Bačka",         flagUrl: wiki("Flag of West Bačka District.svg") },
          { code: "rs-22", name: "North Banat",        flagUrl: wiki("Flag of North Banat District.svg") },
          { code: "rs-23", name: "Central Banat",      flagUrl: wiki("Flag of Central Banat District.svg") },
          { code: "rs-24", name: "South Banat",        flagUrl: wiki("Flag of South Banat District.svg") },
          { code: "rs-25", name: "Srem",               flagUrl: wiki("Flag of Srem District.svg") },
        ],
      },

      // ── Bosnia and Herzegovina (FBiH cantons + RS + Brčko) ───────────────
      {
        code: "BA", name: "Bosnia & Herzegovina", emoji: "🇧🇦", subTitle: "12 Cantons & Entities", locked: false,
        subRegions: [
          // Federation of B&H – 10 cantons
          { code: "ba-f01", name: "Una-Sana",            flagUrl: wiki("Flag of Una-Sana Canton.svg") },
          { code: "ba-f02", name: "Posavina",            flagUrl: wiki("Flag of Posavina Canton.svg") },
          { code: "ba-f03", name: "Tuzla",               flagUrl: wiki("Flag of Tuzla Canton.svg") },
          { code: "ba-f04", name: "Zenica-Doboj",        flagUrl: wiki("Flag of Zenica-Doboj Canton.svg") },
          { code: "ba-f05", name: "Bosnian Podrinje",    flagUrl: wiki("Flag of Bosnian Podrinje Canton.svg") },
          { code: "ba-f06", name: "Central Bosnia",      flagUrl: wiki("Flag of Central Bosnia Canton.svg") },
          { code: "ba-f07", name: "Herzegovina-Neretva", flagUrl: wiki("Flag of Herzegovina-Neretva Canton.svg") },
          { code: "ba-f08", name: "West Herzegovina",    flagUrl: wiki("Flag of West Herzegovina Canton.svg") },
          { code: "ba-f09", name: "Sarajevo",            flagUrl: wiki("Flag of Sarajevo Canton.svg") },
          { code: "ba-f10", name: "Canton 10 (Livno)",   flagUrl: wiki("Flag of Canton 10.svg") },
          // Other entities
          { code: "ba-srp", name: "Republika Srpska",    flagUrl: wiki("Flag of Republika Srpska.svg") },
          { code: "ba-brc", name: "Brčko District",      flagUrl: wiki("Flag of Brčko District.svg") },
        ],
      },

      // ── Albania (12 counties) ────────────────────────────────────────────
      {
        code: "AL", name: "Albania", emoji: "🇦🇱", subTitle: "12 Counties", locked: false,
        subRegions: [
          { code: "al-br", name: "Berat",     flagUrl: wiki("Flag of Berat County.svg") },
          { code: "al-di", name: "Dibër",     flagUrl: wiki("Flag of Dibër County.svg") },
          { code: "al-dl", name: "Durrës",    flagUrl: wiki("Flag of Durrës County.svg") },
          { code: "al-el", name: "Elbasan",   flagUrl: wiki("Flag of Elbasan County.svg") },
          { code: "al-fr", name: "Fier",      flagUrl: wiki("Flag of Fier County.svg") },
          { code: "al-gj", name: "Gjirokastër",flagUrl: wiki("Flag of Gjirokastër County.svg") },
          { code: "al-ko", name: "Korçë",     flagUrl: wiki("Flag of Korçë County.svg") },
          { code: "al-ku", name: "Kukës",     flagUrl: wiki("Flag of Kukës County.svg") },
          { code: "al-le", name: "Lezhë",     flagUrl: wiki("Flag of Lezhë County.svg") },
          { code: "al-mr", name: "Shkodër",   flagUrl: wiki("Flag of Shkodër County.svg") },
          { code: "al-ti", name: "Tirana",    flagUrl: wiki("Flag of Tirana County.svg") },
          { code: "al-vl", name: "Vlorë",     flagUrl: wiki("Flag of Vlorë County.svg") },
        ],
      },

      // ── North Macedonia (8 statistical regions) ──────────────────────────
      {
        code: "MK", name: "North Macedonia", emoji: "🇲🇰", subTitle: "8 Regions", locked: false,
        subRegions: [
          { code: "mk-101", name: "Vardar",          flagUrl: wiki("Flag of the Vardar Statistical Region.svg") },
          { code: "mk-201", name: "East",            flagUrl: wiki("Flag of the East Statistical Region.svg") },
          { code: "mk-301", name: "Southwest",       flagUrl: wiki("Flag of the Southwest Statistical Region.svg") },
          { code: "mk-401", name: "Southeast",       flagUrl: wiki("Flag of the Southeast Statistical Region.svg") },
          { code: "mk-501", name: "Pelagonia",       flagUrl: wiki("Flag of the Pelagonia Statistical Region.svg") },
          { code: "mk-601", name: "Polog",           flagUrl: wiki("Flag of the Polog Statistical Region.svg") },
          { code: "mk-701", name: "Northeast",       flagUrl: wiki("Flag of the Northeast Statistical Region.svg") },
          { code: "mk-801", name: "Skopje",          flagUrl: wiki("Flag of Skopje.svg") },
        ],
      },

      // ── Montenegro (25 municipalities) — listed as regions ───────────────
      {
        code: "ME", name: "Montenegro", emoji: "🇲🇪", subTitle: "25 Municipalities", locked: false,
        subRegions: [
          { code: "me-01", name: "Andrijevica",  flagUrl: wiki("Flag of Andrijevica.svg") },
          { code: "me-02", name: "Bar",          flagUrl: wiki("Flag of Bar, Montenegro.svg") },
          { code: "me-03", name: "Berane",       flagUrl: wiki("Flag of Berane.svg") },
          { code: "me-04", name: "Bijelo Polje", flagUrl: wiki("Flag of Bijelo Polje.svg") },
          { code: "me-05", name: "Budva",        flagUrl: wiki("Flag of Budva.svg") },
          { code: "me-06", name: "Cetinje",      flagUrl: wiki("Flag of Cetinje.svg") },
          { code: "me-07", name: "Danilovgrad",  flagUrl: wiki("Flag of Danilovgrad.svg") },
          { code: "me-08", name: "Herceg Novi",  flagUrl: wiki("Flag of Herceg Novi.svg") },
          { code: "me-09", name: "Kolašin",      flagUrl: wiki("Flag of Kolašin.svg") },
          { code: "me-10", name: "Kotor",        flagUrl: wiki("Flag of Kotor.svg") },
          { code: "me-11", name: "Mojkovac",     flagUrl: wiki("Flag of Mojkovac.svg") },
          { code: "me-12", name: "Nikšić",       flagUrl: wiki("Flag of Nikšić.svg") },
          { code: "me-13", name: "Plav",         flagUrl: wiki("Flag of Plav.svg") },
          { code: "me-14", name: "Pljevlja",     flagUrl: wiki("Flag of Pljevlja.svg") },
          { code: "me-15", name: "Plužine",      flagUrl: wiki("Flag of Plužine.svg") },
          { code: "me-16", name: "Podgorica",    flagUrl: wiki("Flag of Podgorica.svg") },
          { code: "me-17", name: "Rožaje",       flagUrl: wiki("Flag of Rožaje.svg") },
          { code: "me-18", name: "Šavnik",       flagUrl: wiki("Flag of Šavnik.svg") },
          { code: "me-19", name: "Tivat",        flagUrl: wiki("Flag of Tivat.svg") },
          { code: "me-20", name: "Ulcinj",       flagUrl: wiki("Flag of Ulcinj.svg") },
          { code: "me-21", name: "Žabljak",      flagUrl: wiki("Flag of Žabljak.svg") },
          { code: "me-22", name: "Petnjica",     flagUrl: wiki("Flag of Petnjica.svg") },
          { code: "me-23", name: "Gusinje",      flagUrl: wiki("Flag of Gusinje.svg") },
          { code: "me-24", name: "Tuzi",         flagUrl: wiki("Flag of Tuzi.svg") },
          { code: "me-25", name: "Zeta",         flagUrl: wiki("Flag of Zeta (municipality).svg") },
        ],
      },

      // ── Slovenia (12 statistical regions) ───────────────────────────────
      {
        code: "SI", name: "Slovenia", emoji: "🇸🇮", subTitle: "12 Regions", locked: false,
        subRegions: [
          { code: "si-01", name: "Pomurska",            flagUrl: wiki("Flag of Pomurska statistical region.svg") },
          { code: "si-02", name: "Podravska",           flagUrl: wiki("Flag of Podravska statistical region.svg") },
          { code: "si-03", name: "Koroška",             flagUrl: wiki("Flag of Koroška statistical region.svg") },
          { code: "si-04", name: "Savinjska",           flagUrl: wiki("Flag of Savinjska statistical region.svg") },
          { code: "si-05", name: "Zasavska",            flagUrl: wiki("Flag of Zasavska statistical region.svg") },
          { code: "si-06", name: "Posavska",            flagUrl: wiki("Flag of Posavska statistical region.svg") },
          { code: "si-07", name: "Southeast Slovenia",  flagUrl: wiki("Flag of Jugovzhodna Slovenija statistical region.svg") },
          { code: "si-08", name: "Primorska-Notranjska",flagUrl: wiki("Flag of Primorsko-notranjska statistical region.svg") },
          { code: "si-09", name: "Gorenjska",           flagUrl: wiki("Flag of Gorenjska statistical region.svg") },
          { code: "si-10", name: "Primorsko-Kraška",    flagUrl: wiki("Flag of Obalno-kraška statistical region.svg") },
          { code: "si-11", name: "Goriška",             flagUrl: wiki("Flag of Goriška statistical region.svg") },
          { code: "si-12", name: "Obalno-Kraška",       flagUrl: wiki("Flag of Obalno-kraška statistical region.svg") },
        ],
      },

      // ── Ukraine (25 oblasts + Kyiv city) ────────────────────────────────
      {
        code: "UA", name: "Ukraine", emoji: "🇺🇦", subTitle: "27 Oblasts", locked: false,
        subRegions: [
          { code: "ua-05", name: "Vinnytsia",   flagUrl: wiki("Flag of Vinnytsia Oblast.svg") },
          { code: "ua-07", name: "Volyn",       flagUrl: wiki("Flag of Volyn Oblast.svg") },
          { code: "ua-09", name: "Luhansk",     flagUrl: wiki("Flag of Luhansk Oblast.svg") },
          { code: "ua-12", name: "Dnipropetrovsk",flagUrl: wiki("Flag of Dnipropetrovsk Oblast.svg") },
          { code: "ua-14", name: "Donetsk",     flagUrl: wiki("Flag of Donetsk Oblast.svg") },
          { code: "ua-18", name: "Zhytomyr",    flagUrl: wiki("Flag of Zhytomyr Oblast.svg") },
          { code: "ua-21", name: "Zakarpattia", flagUrl: wiki("Flag of Zakarpattia Oblast.svg") },
          { code: "ua-23", name: "Zaporizhzhia",flagUrl: wiki("Flag of Zaporizhzhia Oblast.svg") },
          { code: "ua-26", name: "Ivano-Frankivsk",flagUrl: wiki("Flag of Ivano-Frankivsk Oblast.svg") },
          { code: "ua-30", name: "Kyiv City",   flagUrl: wiki("Flag of Kyiv.svg") },
          { code: "ua-32", name: "Kyiv Oblast", flagUrl: wiki("Flag of Kyiv Oblast.svg") },
          { code: "ua-35", name: "Kirovohrad",  flagUrl: wiki("Flag of Kirovohrad Oblast.svg") },
          { code: "ua-40", name: "Sevastopol",  flagUrl: wiki("Flag of Sevastopol.svg") },
          { code: "ua-43", name: "Crimea",      flagUrl: wiki("Flag of Crimea.svg") },
          { code: "ua-46", name: "Lviv",        flagUrl: wiki("Flag of Lviv Oblast.svg") },
          { code: "ua-48", name: "Mykolaiv",    flagUrl: wiki("Flag of Mykolaiv Oblast.svg") },
          { code: "ua-51", name: "Odessa",      flagUrl: wiki("Flag of Odessa Oblast.svg") },
          { code: "ua-53", name: "Poltava",     flagUrl: wiki("Flag of Poltava Oblast.svg") },
          { code: "ua-56", name: "Rivne",       flagUrl: wiki("Flag of Rivne Oblast.svg") },
          { code: "ua-59", name: "Sumy",        flagUrl: wiki("Flag of Sumy Oblast.svg") },
          { code: "ua-61", name: "Ternopil",    flagUrl: wiki("Flag of Ternopil Oblast.svg") },
          { code: "ua-63", name: "Kharkiv",     flagUrl: wiki("Flag of Kharkiv Oblast.svg") },
          { code: "ua-65", name: "Kherson",     flagUrl: wiki("Flag of Kherson Oblast.svg") },
          { code: "ua-68", name: "Khmelnytskyi",flagUrl: wiki("Flag of Khmelnytskyi Oblast.svg") },
          { code: "ua-71", name: "Cherkasy",    flagUrl: wiki("Flag of Cherkasy Oblast.svg") },
          { code: "ua-74", name: "Chernihiv",   flagUrl: wiki("Flag of Chernihiv Oblast.svg") },
          { code: "ua-77", name: "Chernivtsi",  flagUrl: wiki("Flag of Chernivtsi Oblast.svg") },
        ],
      },

      // ── Belarus (6 oblasts + Minsk city) ────────────────────────────────
      {
        code: "BY", name: "Belarus", emoji: "🇧🇾", subTitle: "7 Oblasts", locked: false,
        subRegions: [
          { code: "by-br", name: "Brest",       flagUrl: wiki("Flag of Brest Oblast.svg") },
          { code: "by-ho", name: "Homiel",      flagUrl: wiki("Flag of Gomel Oblast.svg") },
          { code: "by-hr", name: "Hrodna",      flagUrl: wiki("Flag of Grodno Oblast.svg") },
          { code: "by-ma", name: "Mahilyow",    flagUrl: wiki("Flag of Mogilev Oblast.svg") },
          { code: "by-mi", name: "Minsk City",  flagUrl: wiki("Flag of Minsk.svg") },
          { code: "by-mo", name: "Minsk Oblast",flagUrl: wiki("Flag of Minsk Oblast.svg") },
          { code: "by-vi", name: "Vitsebsk",    flagUrl: wiki("Flag of Vitebsk Oblast.svg") },
        ],
      },

      // ── Moldova (10 districts) ───────────────────────────────────────────
      {
        code: "MD", name: "Moldova", emoji: "🇲🇩", subTitle: "10 Districts", locked: false,
        subRegions: [
          { code: "md-an", name: "Anenii Noi",  flagUrl: wiki("Flag of Anenii Noi District.svg") },
          { code: "md-ba", name: "Bălți",       flagUrl: wiki("Flag of Bălți.svg") },
          { code: "md-ca", name: "Cahul",       flagUrl: wiki("Flag of Cahul District.svg") },
          { code: "md-ch", name: "Chișinău",    flagUrl: wiki("Flag of Chișinău.svg") },
          { code: "md-ed", name: "Edineț",      flagUrl: wiki("Flag of Edineț District.svg") },
          { code: "md-ga", name: "Gagauzia",    flagUrl: wiki("Flag of Gagauzia.svg") },
          { code: "md-or", name: "Orhei",       flagUrl: wiki("Flag of Orhei District.svg") },
          { code: "md-so", name: "Soroca",      flagUrl: wiki("Flag of Soroca District.svg") },
          { code: "md-ti", name: "Tiraspol",    flagUrl: wiki("Flag of Tiraspol.svg") },
          { code: "md-un", name: "Ungheni",     flagUrl: wiki("Flag of Ungheni District.svg") },
        ],
      },

      // ── Andorra (7 parishes) ─────────────────────────────────────────────
      {
        code: "AD", name: "Andorra", emoji: "🇦🇩", subTitle: "7 Parishes", locked: false,
        subRegions: [
          { code: "ad-02", name: "Canillo",              flagUrl: wiki("Flag of Canillo.svg") },
          { code: "ad-03", name: "Encamp",               flagUrl: wiki("Flag of Encamp.svg") },
          { code: "ad-04", name: "La Massana",           flagUrl: wiki("Flag of La Massana.svg") },
          { code: "ad-05", name: "Ordino",               flagUrl: wiki("Flag of Ordino.svg") },
          { code: "ad-06", name: "Sant Julià de Lòria",  flagUrl: wiki("Flag of Sant Julià de Lòria.svg") },
          { code: "ad-07", name: "Andorra la Vella",     flagUrl: wiki("Flag of Andorra la Vella.svg") },
          { code: "ad-08", name: "Escaldes-Engordany",   flagUrl: wiki("Flag of Escaldes-Engordany.svg") },
        ],
      },

      // ── Cyprus (6 districts) ─────────────────────────────────────────────
      {
        code: "CY", name: "Cyprus", emoji: "🇨🇾", subTitle: "6 Districts", locked: false,
        subRegions: [
          { code: "cy-01", name: "Nicosia",   flagUrl: wiki("Flag of Nicosia.svg") },
          { code: "cy-02", name: "Limassol",  flagUrl: wiki("Flag of Limassol.svg") },
          { code: "cy-03", name: "Larnaca",   flagUrl: wiki("Flag of Larnaca.svg") },
          { code: "cy-04", name: "Famagusta", flagUrl: wiki("Flag of Famagusta.svg") },
          { code: "cy-05", name: "Paphos",    flagUrl: wiki("Flag of Paphos.svg") },
          { code: "cy-06", name: "Kyrenia",   flagUrl: wiki("Flag of Kyrenia.svg") },
        ],
      },

      // ── Iceland (8 regions) ──────────────────────────────────────────────
      {
        code: "IS", name: "Iceland", emoji: "🇮🇸", subTitle: "8 Regions", locked: false,
        subRegions: [
          { code: "is-1", name: "Capital Region",     flagUrl: wiki("Flag of the Capital Region of Iceland.svg") },
          { code: "is-2", name: "Southern Peninsula", flagUrl: wiki("Flag of Suðurnes.svg") },
          { code: "is-3", name: "West",               flagUrl: wiki("Flag of Vesturland.svg") },
          { code: "is-4", name: "Westfjords",         flagUrl: wiki("Flag of the Westfjords.svg") },
          { code: "is-5", name: "Northwest",          flagUrl: wiki("Flag of Norðurland vestra.svg") },
          { code: "is-6", name: "Northeast",          flagUrl: wiki("Flag of Norðurland eystra.svg") },
          { code: "is-7", name: "East",               flagUrl: wiki("Flag of Austurland.svg") },
          { code: "is-8", name: "South",              flagUrl: wiki("Flag of Suðurland.svg") },
        ],
      },

      // ── Kosovo (7 districts) ─────────────────────────────────────────────
      {
        code: "XK", name: "Kosovo", emoji: "🇽🇰", subTitle: "7 Districts", locked: false,
        subRegions: [
          { code: "xk-pr", name: "Pristina",  flagUrl: wiki("Flag of Pristina.svg") },
          { code: "xk-pe", name: "Peja",      flagUrl: wiki("Flag of Peja.svg") },
          { code: "xk-gj", name: "Gjakova",   flagUrl: wiki("Flag of Gjakova.svg") },
          { code: "xk-mi", name: "Mitrovica", flagUrl: wiki("Flag of Mitrovica, Kosovo.svg") },
          { code: "xk-pz", name: "Prizren",   flagUrl: wiki("Flag of Prizren.svg") },
          { code: "xk-fe", name: "Ferizaj",   flagUrl: wiki("Flag of Ferizaj.svg") },
          { code: "xk-gi", name: "Gjilan",    flagUrl: wiki("Flag of Gjilan.svg") },
        ],
      },

      // ── Liechtenstein (11 communes) ──────────────────────────────────────
      {
        code: "LI", name: "Liechtenstein", emoji: "🇱🇮", subTitle: "11 Communes", locked: false,
        subRegions: [
          { code: "li-01", name: "Balzers",       flagUrl: wiki("Flag of Balzers.svg") },
          { code: "li-02", name: "Eschen",        flagUrl: wiki("Flag of Eschen.svg") },
          { code: "li-03", name: "Gamprin",       flagUrl: wiki("Flag of Gamprin.svg") },
          { code: "li-04", name: "Mauren",        flagUrl: wiki("Flag of Mauren.svg") },
          { code: "li-05", name: "Planken",       flagUrl: wiki("Flag of Planken.svg") },
          { code: "li-06", name: "Ruggell",       flagUrl: wiki("Flag of Ruggell.svg") },
          { code: "li-07", name: "Schaan",        flagUrl: wiki("Flag of Schaan.svg") },
          { code: "li-08", name: "Schellenberg",  flagUrl: wiki("Flag of Schellenberg.svg") },
          { code: "li-09", name: "Triesen",       flagUrl: wiki("Flag of Triesen.svg") },
          { code: "li-10", name: "Triesenberg",   flagUrl: wiki("Flag of Triesenberg.svg") },
          { code: "li-11", name: "Vaduz",         flagUrl: wiki("Flag of Vaduz.svg") },
        ],
      },

      // ── Luxembourg (12 cantons) ──────────────────────────────────────────
      {
        code: "LU", name: "Luxembourg", emoji: "🇱🇺", subTitle: "12 Cantons", locked: false,
        subRegions: [
          { code: "lu-ca", name: "Capellen",        flagUrl: wiki("Flag of Capellen (canton).svg") },
          { code: "lu-cl", name: "Clervaux",        flagUrl: wiki("Flag of Clervaux.svg") },
          { code: "lu-di", name: "Diekirch",        flagUrl: wiki("Flag of Diekirch.svg") },
          { code: "lu-ec", name: "Echternach",      flagUrl: wiki("Flag of Echternach.svg") },
          { code: "lu-es", name: "Esch-sur-Alzette",flagUrl: wiki("Flag of Esch-sur-Alzette.svg") },
          { code: "lu-gr", name: "Grevenmacher",    flagUrl: wiki("Flag of Grevenmacher.svg") },
          { code: "lu-lu", name: "Luxembourg",      flagUrl: wiki("Flag of Luxembourg City.svg") },
          { code: "lu-me", name: "Mersch",          flagUrl: wiki("Flag of Mersch.svg") },
          { code: "lu-rd", name: "Redange",         flagUrl: wiki("Flag of Redange.svg") },
          { code: "lu-rm", name: "Remich",          flagUrl: wiki("Flag of Remich.svg") },
          { code: "lu-vd", name: "Vianden",         flagUrl: wiki("Flag of Vianden.svg") },
          { code: "lu-wi", name: "Wiltz",           flagUrl: wiki("Flag of Wiltz.svg") },
        ],
      },

      // ── Malta (5 regions) ────────────────────────────────────────────────
      {
        code: "MT", name: "Malta", emoji: "🇲🇹", subTitle: "5 Regions", locked: false,
        subRegions: [
          { code: "mt-01", name: "Gozo & Comino",    flagUrl: wiki("Flag of Gozo.svg") },
          { code: "mt-02", name: "Northern",         flagUrl: wiki("Flag of Northern Region, Malta.svg") },
          { code: "mt-03", name: "Northern Harbour", flagUrl: wiki("Flag of Northern Harbour Region.svg") },
          { code: "mt-04", name: "South Eastern",    flagUrl: wiki("Flag of South Eastern Region, Malta.svg") },
          { code: "mt-05", name: "Southern Harbour", flagUrl: wiki("Flag of Southern Harbour Region.svg") },
        ],
      },

      // ── Monaco (4 quarters) ──────────────────────────────────────────────
      {
        code: "MC", name: "Monaco", emoji: "🇲🇨", subTitle: "4 Quarters", locked: false,
        subRegions: [
          { code: "mc-cl", name: "La Colle",     flagUrl: wiki("Flag of La Colle, Monaco.svg") },
          { code: "mc-co", name: "La Condamine", flagUrl: wiki("Flag of La Condamine.svg") },
          { code: "mc-fo", name: "Fontvieille",  flagUrl: wiki("Flag of Fontvieille, Monaco.svg") },
          { code: "mc-mc", name: "Monaco-Ville", flagUrl: wiki("Flag of Monaco-Ville.svg") },
        ],
      },

      // ── San Marino (9 municipalities) ────────────────────────────────────
      {
        code: "SM", name: "San Marino", emoji: "🇸🇲", subTitle: "9 Municipalities", locked: false,
        subRegions: [
          { code: "sm-01", name: "Acquaviva",      flagUrl: wiki("Flag of Acquaviva, San Marino.svg") },
          { code: "sm-02", name: "Borgo Maggiore", flagUrl: wiki("Flag of Borgo Maggiore.svg") },
          { code: "sm-03", name: "Chiesanuova",    flagUrl: wiki("Flag of Chiesanuova.svg") },
          { code: "sm-04", name: "Domagnano",      flagUrl: wiki("Flag of Domagnano.svg") },
          { code: "sm-05", name: "Faetano",        flagUrl: wiki("Flag of Faetano.svg") },
          { code: "sm-06", name: "Fiorentino",     flagUrl: wiki("Flag of Fiorentino, San Marino.svg") },
          { code: "sm-07", name: "Montegiardino",  flagUrl: wiki("Flag of Montegiardino.svg") },
          { code: "sm-08", name: "San Marino",     flagUrl: wiki("Flag of the City of San Marino.svg") },
          { code: "sm-09", name: "Serravalle",     flagUrl: wiki("Flag of Serravalle, San Marino.svg") },
        ],
      },

      // ── Vatican City (4 areas) ───────────────────────────────────────────
      {
        code: "VA", name: "Vatican City", emoji: "🇻🇦", subTitle: "4 Areas", locked: false,
        subRegions: [
          { code: "va-vt", name: "Vatican Hill",   flagUrl: wiki("Flag of Vatican City.svg") },
          { code: "va-pa", name: "Papal Gardens",  flagUrl: wiki("Flag of Vatican City.svg") },
          { code: "va-st", name: "St. Peter's",    flagUrl: wiki("Flag of Vatican City.svg") },
          { code: "va-ca", name: "Castel Gandolfo",flagUrl: wiki("Flag of Vatican City.svg") },
        ],
      },
    ],
  },
]

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

// flag-icons via jsDelivr — covers all ISO 3166-2 subdivisions including MX, CO, VE etc.
const flag = (iso: string) => `https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/flags/4x3/${iso.toLowerCase()}.svg`

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

// ── EUROPE ────────────────────────────────────────────────────────────────────
const ES_COMMUNITIES: SubRegion[] = [
  { code: "es-an", name: "Andalusia",           flagUrl: flag("es-an") },
  { code: "es-ar", name: "Aragon",              flagUrl: flag("es-ar") },
  { code: "es-as", name: "Asturias",            flagUrl: flag("es-as") },
  { code: "es-ib", name: "Balearic Islands",    flagUrl: flag("es-ib") },
  { code: "es-pv", name: "Basque Country",      flagUrl: flag("es-pv") },
  { code: "es-cn", name: "Canary Islands",      flagUrl: flag("es-cn") },
  { code: "es-cb", name: "Cantabria",           flagUrl: flag("es-cb") },
  { code: "es-cl", name: "Castile and León",    flagUrl: flag("es-cl") },
  { code: "es-cm", name: "Castile-La Mancha",   flagUrl: flag("es-cm") },
  { code: "es-ct", name: "Catalonia",           flagUrl: flag("es-ct") },
  { code: "es-ex", name: "Extremadura",         flagUrl: flag("es-ex") },
  { code: "es-ga", name: "Galicia",             flagUrl: flag("es-ga") },
  { code: "es-ri", name: "La Rioja",            flagUrl: flag("es-ri") },
  { code: "es-md", name: "Madrid",              flagUrl: flag("es-md") },
  { code: "es-mc", name: "Murcia",              flagUrl: flag("es-mc") },
  { code: "es-nc", name: "Navarre",             flagUrl: flag("es-nc") },
  { code: "es-vc", name: "Valencian Community", flagUrl: flag("es-vc") },
]

const UK_NATIONS: SubRegion[] = [
  { code: "gb-eng", name: "England",          flagUrl: flag("gb-eng") },
  { code: "gb-sct", name: "Scotland",         flagUrl: flag("gb-sct") },
  { code: "gb-wls", name: "Wales",            flagUrl: flag("gb-wls") },
  { code: "gb-nir", name: "Northern Ireland", flagUrl: flag("gb-nir") },
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
          { code: "de-bb", name: "Brandenburg",            flagUrl: flag("de-bb") },
          { code: "de-be", name: "Berlin",                 flagUrl: flag("de-be") },
          { code: "de-bw", name: "Baden-Württemberg",      flagUrl: flag("de-bw") },
          { code: "de-by", name: "Bavaria",                flagUrl: flag("de-by") },
          { code: "de-hb", name: "Bremen",                 flagUrl: flag("de-hb") },
          { code: "de-he", name: "Hesse",                  flagUrl: flag("de-he") },
          { code: "de-hh", name: "Hamburg",                flagUrl: flag("de-hh") },
          { code: "de-mv", name: "Mecklenburg-Vorpommern", flagUrl: flag("de-mv") },
          { code: "de-ni", name: "Lower Saxony",           flagUrl: flag("de-ni") },
          { code: "de-nw", name: "North Rhine-Westphalia", flagUrl: flag("de-nw") },
          { code: "de-rp", name: "Rhineland-Palatinate",   flagUrl: flag("de-rp") },
          { code: "de-sh", name: "Schleswig-Holstein",     flagUrl: flag("de-sh") },
          { code: "de-sl", name: "Saarland",               flagUrl: flag("de-sl") },
          { code: "de-sn", name: "Saxony",                 flagUrl: flag("de-sn") },
          { code: "de-st", name: "Saxony-Anhalt",          flagUrl: flag("de-st") },
          { code: "de-th", name: "Thuringia",              flagUrl: flag("de-th") },
        ],
      },

      // ── France (13 metropolitan + 5 overseas regions) ────────────────────
      {
        code: "FR", name: "France", emoji: "🇫🇷", subTitle: "18 Regions", locked: false,
        subRegions: [
          { code: "fr-ara", name: "Auvergne-Rhône-Alpes",       flagUrl: flag("fr-ara") },
          { code: "fr-bfc", name: "Bourgogne-Franche-Comté",    flagUrl: flag("fr-bfc") },
          { code: "fr-bre", name: "Brittany",                   flagUrl: flag("fr-bre") },
          { code: "fr-cvl", name: "Centre-Val de Loire",        flagUrl: flag("fr-cvl") },
          { code: "fr-cor", name: "Corsica",                    flagUrl: flag("fr-cor") },
          { code: "fr-ges", name: "Grand Est",                  flagUrl: flag("fr-ges") },
          { code: "fr-hdf", name: "Hauts-de-France",            flagUrl: flag("fr-hdf") },
          { code: "fr-idf", name: "Île-de-France",              flagUrl: flag("fr-idf") },
          { code: "fr-naq", name: "Nouvelle-Aquitaine",         flagUrl: flag("fr-naq") },
          { code: "fr-nor", name: "Normandy",                   flagUrl: flag("fr-nor") },
          { code: "fr-occ", name: "Occitanie",                  flagUrl: flag("fr-occ") },
          { code: "fr-pac", name: "Provence-Alpes-Côte d'Azur", flagUrl: flag("fr-pac") },
          { code: "fr-pdl", name: "Pays de la Loire",           flagUrl: flag("fr-pdl") },
          { code: "fr-gua", name: "Guadeloupe",                 flagUrl: flag("fr-gua") },
          { code: "fr-guy", name: "French Guiana",              flagUrl: flag("fr-guy") },
          { code: "fr-lre", name: "La Réunion",                 flagUrl: flag("fr-lre") },
          { code: "fr-may", name: "Mayotte",                    flagUrl: flag("fr-may") },
          { code: "fr-mq",  name: "Martinique",                 flagUrl: flag("fr-mq")  },
        ],
      },

      // ── Spain (17 autonomous communities + 2 cities) ─────────────────────
      {
        code: "ES", name: "Spain", emoji: "🇪🇸", subTitle: "19 Regions", locked: false,
        subRegions: [
          { code: "es-an", name: "Andalusia",             flagUrl: flag("es-an") },
          { code: "es-ar", name: "Aragon",                flagUrl: flag("es-ar") },
          { code: "es-as", name: "Asturias",              flagUrl: flag("es-as") },
          { code: "es-cb", name: "Cantabria",             flagUrl: flag("es-cb") },
          { code: "es-ce", name: "Ceuta",                 flagUrl: flag("es-ce") },
          { code: "es-cl", name: "Castile and León",      flagUrl: flag("es-cl") },
          { code: "es-cm", name: "Castile-La Mancha",     flagUrl: flag("es-cm") },
          { code: "es-cn", name: "Canary Islands",        flagUrl: flag("es-cn") },
          { code: "es-ct", name: "Catalonia",             flagUrl: flag("es-ct") },
          { code: "es-ex", name: "Extremadura",           flagUrl: flag("es-ex") },
          { code: "es-ga", name: "Galicia",               flagUrl: flag("es-ga") },
          { code: "es-ib", name: "Balearic Islands",      flagUrl: flag("es-ib") },
          { code: "es-mc", name: "Region of Murcia",      flagUrl: flag("es-mc") },
          { code: "es-md", name: "Community of Madrid",   flagUrl: flag("es-md") },
          { code: "es-me", name: "Melilla",               flagUrl: flag("es-me") },
          { code: "es-nc", name: "Navarre",               flagUrl: flag("es-nc") },
          { code: "es-pv", name: "Basque Country",        flagUrl: flag("es-pv") },
          { code: "es-ri", name: "La Rioja",              flagUrl: flag("es-ri") },
          { code: "es-vc", name: "Valencia",              flagUrl: flag("es-vc") },
        ],
      },

      // ── Italy (20 regions) ───────────────────────────────────────────────
      {
        code: "IT", name: "Italy", emoji: "🇮🇹", subTitle: "20 Regions", locked: false,
        subRegions: [
          { code: "it-21", name: "Piedmont",                    flagUrl: flag("it-21") },
          { code: "it-23", name: "Aosta Valley",                flagUrl: flag("it-23") },
          { code: "it-25", name: "Lombardy",                    flagUrl: flag("it-25") },
          { code: "it-32", name: "Trentino-Alto Adige",         flagUrl: flag("it-32") },
          { code: "it-34", name: "Veneto",                      flagUrl: flag("it-34") },
          { code: "it-36", name: "Friuli-Venezia Giulia",       flagUrl: flag("it-36") },
          { code: "it-42", name: "Liguria",                     flagUrl: flag("it-42") },
          { code: "it-45", name: "Emilia-Romagna",              flagUrl: flag("it-45") },
          { code: "it-52", name: "Tuscany",                     flagUrl: flag("it-52") },
          { code: "it-55", name: "Umbria",                      flagUrl: flag("it-55") },
          { code: "it-57", name: "Marche",                      flagUrl: flag("it-57") },
          { code: "it-62", name: "Lazio",                       flagUrl: flag("it-62") },
          { code: "it-65", name: "Abruzzo",                     flagUrl: flag("it-65") },
          { code: "it-67", name: "Molise",                      flagUrl: flag("it-67") },
          { code: "it-72", name: "Campania",                    flagUrl: flag("it-72") },
          { code: "it-75", name: "Apulia",                      flagUrl: flag("it-75") },
          { code: "it-77", name: "Basilicata",                  flagUrl: flag("it-77") },
          { code: "it-78", name: "Calabria",                    flagUrl: flag("it-78") },
          { code: "it-82", name: "Sicily",                      flagUrl: flag("it-82") },
          { code: "it-88", name: "Sardinia",                    flagUrl: flag("it-88") },
        ],
      },

      // ── United Kingdom (England 9 regions · Scotland 32 · Wales 22 · NI 11) ──
      {
        code: "GB", name: "United Kingdom", emoji: "🇬🇧", subTitle: "74 Regions & Districts", locked: false,
        subRegions: [
          // England – 9 statistical regions
          { code: "gb-ne",  name: "North East England",           flagUrl: flag("gb-eng") },
          { code: "gb-nw",  name: "North West England",           flagUrl: flag("gb-eng") },
          { code: "gb-yh",  name: "Yorkshire & the Humber",       flagUrl: flag("gb-eng") },
          { code: "gb-em",  name: "East Midlands",                flagUrl: flag("gb-eng") },
          { code: "gb-wm",  name: "West Midlands",                flagUrl: flag("gb-eng") },
          { code: "gb-ee",  name: "East of England",              flagUrl: flag("gb-eng") },
          { code: "gb-lon", name: "Greater London",               flagUrl: flag("gb-lon") },
          { code: "gb-se",  name: "South East England",           flagUrl: flag("gb-eng") },
          { code: "gb-sw",  name: "South West England",           flagUrl: flag("gb-eng") },
          // Scotland – 32 council areas
          { code: "gb-abd", name: "Aberdeen City",                flagUrl: flag("gb-abd") },
          { code: "gb-abe", name: "Aberdeenshire",                flagUrl: flag("gb-abe") },
          { code: "gb-ans", name: "Angus",                        flagUrl: flag("gb-ans") },
          { code: "gb-agb", name: "Argyll and Bute",              flagUrl: flag("gb-agb") },
          { code: "gb-clk", name: "Clackmannanshire",             flagUrl: flag("gb-clk") },
          { code: "gb-dgy", name: "Dumfries and Galloway",        flagUrl: flag("gb-dgy") },
          { code: "gb-dnd", name: "Dundee City",                  flagUrl: flag("gb-dnd") },
          { code: "gb-eay", name: "East Ayrshire",                flagUrl: flag("gb-eay") },
          { code: "gb-edu", name: "East Dunbartonshire",          flagUrl: flag("gb-edu") },
          { code: "gb-eln", name: "East Lothian",                 flagUrl: flag("gb-eln") },
          { code: "gb-erw", name: "East Renfrewshire",            flagUrl: flag("gb-erw") },
          { code: "gb-edh", name: "Edinburgh",                    flagUrl: flag("gb-edh") },
          { code: "gb-els", name: "Na h-Eileanan Siar",           flagUrl: flag("gb-els") },
          { code: "gb-fal", name: "Falkirk",                      flagUrl: flag("gb-fal") },
          { code: "gb-fif", name: "Fife",                         flagUrl: flag("gb-fif") },
          { code: "gb-glg", name: "Glasgow City",                 flagUrl: flag("gb-glg") },
          { code: "gb-hld", name: "Highland",                     flagUrl: flag("gb-hld") },
          { code: "gb-ivc", name: "Inverclyde",                   flagUrl: flag("gb-ivc") },
          { code: "gb-mln", name: "Midlothian",                   flagUrl: flag("gb-mln") },
          { code: "gb-mry", name: "Moray",                        flagUrl: flag("gb-mry") },
          { code: "gb-nay", name: "North Ayrshire",               flagUrl: flag("gb-nay") },
          { code: "gb-nlk", name: "North Lanarkshire",            flagUrl: flag("gb-nlk") },
          { code: "gb-ork", name: "Orkney Islands",               flagUrl: flag("gb-ork") },
          { code: "gb-pkn", name: "Perth and Kinross",            flagUrl: flag("gb-pkn") },
          { code: "gb-rfw", name: "Renfrewshire",                 flagUrl: flag("gb-rfw") },
          { code: "gb-scb", name: "Scottish Borders",             flagUrl: flag("gb-scb") },
          { code: "gb-zet", name: "Shetland Islands",             flagUrl: flag("gb-zet") },
          { code: "gb-say", name: "South Ayrshire",               flagUrl: flag("gb-say") },
          { code: "gb-slk", name: "South Lanarkshire",            flagUrl: flag("gb-slk") },
          { code: "gb-stg", name: "Stirling",                     flagUrl: flag("gb-stg") },
          { code: "gb-wdu", name: "West Dunbartonshire",          flagUrl: flag("gb-wdu") },
          { code: "gb-wln", name: "West Lothian",                 flagUrl: flag("gb-wln") },
          // Wales – 22 local authorities
          { code: "gb-agy", name: "Isle of Anglesey",             flagUrl: flag("gb-agy") },
          { code: "gb-bgw", name: "Blaenau Gwent",                flagUrl: flag("gb-bgw") },
          { code: "gb-bge", name: "Bridgend",                     flagUrl: flag("gb-bge") },
          { code: "gb-cay", name: "Caerphilly",                   flagUrl: flag("gb-cay") },
          { code: "gb-crf", name: "Cardiff",                      flagUrl: flag("gb-crf") },
          { code: "gb-cmn", name: "Carmarthenshire",              flagUrl: flag("gb-cmn") },
          { code: "gb-cgn", name: "Ceredigion",                   flagUrl: flag("gb-cgn") },
          { code: "gb-cwy", name: "Conwy",                        flagUrl: flag("gb-cwy") },
          { code: "gb-den", name: "Denbighshire",                 flagUrl: flag("gb-den") },
          { code: "gb-fln", name: "Flintshire",                   flagUrl: flag("gb-fln") },
          { code: "gb-gwn", name: "Gwynedd",                      flagUrl: flag("gb-gwn") },
          { code: "gb-mty", name: "Merthyr Tydfil",               flagUrl: flag("gb-mty") },
          { code: "gb-mon", name: "Monmouthshire",                flagUrl: flag("gb-mon") },
          { code: "gb-ntl", name: "Neath Port Talbot",            flagUrl: flag("gb-ntl") },
          { code: "gb-nwp", name: "Newport",                      flagUrl: flag("gb-nwp") },
          { code: "gb-pem", name: "Pembrokeshire",                flagUrl: flag("gb-pem") },
          { code: "gb-pow", name: "Powys",                        flagUrl: flag("gb-pow") },
          { code: "gb-rct", name: "Rhondda Cynon Taf",            flagUrl: flag("gb-rct") },
          { code: "gb-swa", name: "Swansea",                      flagUrl: flag("gb-swa") },
          { code: "gb-tof", name: "Torfaen",                      flagUrl: flag("gb-tof") },
          { code: "gb-vgl", name: "Vale of Glamorgan",            flagUrl: flag("gb-vgl") },
          { code: "gb-wrx", name: "Wrexham",                      flagUrl: flag("gb-wrx") },
          // Northern Ireland – 11 districts
          { code: "gb-abc", name: "Armagh, Banbridge & Craigavon", flagUrl: flag("gb-abc") },
          { code: "gb-and", name: "Antrim & Newtownabbey",        flagUrl: flag("gb-and") },
          { code: "gb-ann", name: "Ards & North Down",            flagUrl: flag("gb-ann") },
          { code: "gb-bfs", name: "Belfast",                      flagUrl: flag("gb-bfs") },
          { code: "gb-ccg", name: "Causeway Coast & Glens",       flagUrl: flag("gb-ccg") },
          { code: "gb-drs", name: "Derry City & Strabane",        flagUrl: flag("gb-drs") },
          { code: "gb-fmo", name: "Fermanagh & Omagh",            flagUrl: flag("gb-fmo") },
          { code: "gb-lbc", name: "Lisburn & Castlereagh",        flagUrl: flag("gb-lbc") },
          { code: "gb-mea", name: "Mid & East Antrim",            flagUrl: flag("gb-mea") },
          { code: "gb-mul", name: "Mid Ulster",                   flagUrl: flag("gb-mul") },
          { code: "gb-nmd", name: "Newry, Mourne & Down",         flagUrl: flag("gb-nmd") },
        ],
      },

      // ── Isle of Man (6 sheadings) ─────────────────────────────────────────
      {
        code: "IM", name: "Isle of Man", emoji: "🇮🇲", subTitle: "6 Sheadings", locked: false,
        subRegions: [
          { code: "im-ay", name: "Ayre",     flagUrl: flag("im-ay") },
          { code: "im-ga", name: "Garff",    flagUrl: flag("im-ga") },
          { code: "im-gf", name: "Glenfaba", flagUrl: flag("im-gf") },
          { code: "im-mi", name: "Michael",  flagUrl: flag("im-mi") },
          { code: "im-md", name: "Middle",   flagUrl: flag("im-md") },
          { code: "im-ru", name: "Rushen",   flagUrl: flag("im-ru") },
        ],
      },

      // ── Jersey (12 parishes) ─────────────────────────────────────────────
      {
        code: "JE", name: "Jersey", emoji: "🇯🇪", subTitle: "12 Parishes", locked: false,
        subRegions: [
          { code: "je-gr", name: "Grouville",    flagUrl: flag("je-gr") },
          { code: "je-sb", name: "St. Brelade",  flagUrl: flag("je-sb") },
          { code: "je-sc", name: "St. Clement",  flagUrl: flag("je-sc") },
          { code: "je-sh", name: "St. Helier",   flagUrl: flag("je-sh") },
          { code: "je-sj", name: "St. John",     flagUrl: flag("je-sj") },
          { code: "je-sl", name: "St. Lawrence", flagUrl: flag("je-sl") },
          { code: "je-sm", name: "St. Martin",   flagUrl: flag("je-sm") },
          { code: "je-sy", name: "St. Mary",     flagUrl: flag("je-sy") },
          { code: "je-so", name: "St. Ouen",     flagUrl: flag("je-so") },
          { code: "je-sp", name: "St. Peter",    flagUrl: flag("je-sp") },
          { code: "je-ss", name: "St. Saviour",  flagUrl: flag("je-ss") },
          { code: "je-tr", name: "Trinity",      flagUrl: flag("je-tr") },
        ],
      },

      // ── Guernsey (10 parishes) ───────────────────────────────────────────
      {
        code: "GG", name: "Guernsey", emoji: "🇬🇬", subTitle: "10 Parishes", locked: false,
        subRegions: [
          { code: "gg-ca", name: "Castel",           flagUrl: flag("gg-ca") },
          { code: "gg-fo", name: "Forest",           flagUrl: flag("gg-fo") },
          { code: "gg-sa", name: "St. Andrew",       flagUrl: flag("gg-sa") },
          { code: "gg-sm", name: "St. Martin",       flagUrl: flag("gg-sm") },
          { code: "gg-sp", name: "St. Peter Port",   flagUrl: flag("gg-sp") },
          { code: "gg-sd", name: "St. Pierre du Bois",flagUrl: flag("gg-sd") },
          { code: "gg-ss", name: "St. Sampson",      flagUrl: flag("gg-ss") },
          { code: "gg-sv", name: "St. Saviour",      flagUrl: flag("gg-sv") },
          { code: "gg-to", name: "Torteval",         flagUrl: flag("gg-to") },
          { code: "gg-va", name: "Vale",             flagUrl: flag("gg-va") },
        ],
      },

      // ── Gibraltar (4 major areas) ────────────────────────────────────────
      {
        code: "GI", name: "Gibraltar", emoji: "🇬🇮", subTitle: "4 Areas", locked: false,
        subRegions: [
          { code: "gi-nr", name: "North District",  flagUrl: flag("gi-nr") },
          { code: "gi-sw", name: "South District",  flagUrl: flag("gi-sw") },
          { code: "gi-wt", name: "Town Area",       flagUrl: flag("gi-wt") },
          { code: "gi-ea", name: "East Side",       flagUrl: flag("gi-ea") },
        ],
      },

      // ── Faroe Islands (7 traditional regions) ───────────────────────────
      {
        code: "FO", name: "Faroe Islands", emoji: "🇫🇴", subTitle: "7 Regions", locked: false,
        subRegions: [
          { code: "fo-ea", name: "Eysturoy",    flagUrl: flag("fo-ea") },
          { code: "fo-no", name: "Norðoyggjar", flagUrl: flag("fo-no") },
          { code: "fo-os", name: "Osterø",      flagUrl: flag("fo-os") },
          { code: "fo-sa", name: "Sandoy",      flagUrl: flag("fo-sa") },
          { code: "fo-st", name: "Streymoy",    flagUrl: flag("fo-st") },
          { code: "fo-su", name: "Suðuroy",     flagUrl: flag("fo-su") },
          { code: "fo-va", name: "Vágar",       flagUrl: flag("fo-va") },
        ],
      },

      // ── Switzerland (26 cantons) ─────────────────────────────────────────
      {
        code: "CH", name: "Switzerland", emoji: "🇨🇭", subTitle: "26 Cantons", locked: false,
        subRegions: [
          { code: "ch-ag", name: "Aargau",                  flagUrl: flag("ch-ag") },
          { code: "ch-ai", name: "Appenzell Innerrhoden",   flagUrl: flag("ch-ai") },
          { code: "ch-ar", name: "Appenzell Ausserrhoden",  flagUrl: flag("ch-ar") },
          { code: "ch-be", name: "Bern",                    flagUrl: flag("ch-be") },
          { code: "ch-bl", name: "Basel-Landschaft",        flagUrl: flag("ch-bl") },
          { code: "ch-bs", name: "Basel-Stadt",             flagUrl: flag("ch-bs") },
          { code: "ch-fr", name: "Fribourg",                flagUrl: flag("ch-fr") },
          { code: "ch-ge", name: "Geneva",                  flagUrl: flag("ch-ge") },
          { code: "ch-gl", name: "Glarus",                  flagUrl: flag("ch-gl") },
          { code: "ch-gr", name: "Graubünden",              flagUrl: flag("ch-gr") },
          { code: "ch-ju", name: "Jura",                    flagUrl: flag("ch-ju") },
          { code: "ch-lu", name: "Lucerne",                 flagUrl: flag("ch-lu") },
          { code: "ch-ne", name: "Neuchâtel",               flagUrl: flag("ch-ne") },
          { code: "ch-nw", name: "Nidwalden",               flagUrl: flag("ch-nw") },
          { code: "ch-ow", name: "Obwalden",                flagUrl: flag("ch-ow") },
          { code: "ch-sg", name: "St. Gallen",              flagUrl: flag("ch-sg") },
          { code: "ch-sh", name: "Schaffhausen",            flagUrl: flag("ch-sh") },
          { code: "ch-so", name: "Solothurn",               flagUrl: flag("ch-so") },
          { code: "ch-sz", name: "Schwyz",                  flagUrl: flag("ch-sz") },
          { code: "ch-tg", name: "Thurgau",                 flagUrl: flag("ch-tg") },
          { code: "ch-ti", name: "Ticino",                  flagUrl: flag("ch-ti") },
          { code: "ch-ur", name: "Uri",                     flagUrl: flag("ch-ur") },
          { code: "ch-vd", name: "Vaud",                    flagUrl: flag("ch-vd") },
          { code: "ch-vs", name: "Valais",                  flagUrl: flag("ch-vs") },
          { code: "ch-zg", name: "Zug",                     flagUrl: flag("ch-zg") },
          { code: "ch-zh", name: "Zurich",                  flagUrl: flag("ch-zh") },
        ],
      },

      // ── Austria (9 states) ───────────────────────────────────────────────
      {
        code: "AT", name: "Austria", emoji: "🇦🇹", subTitle: "9 States", locked: false,
        subRegions: [
          { code: "at-1", name: "Burgenland",    flagUrl: flag("at-1") },
          { code: "at-2", name: "Carinthia",     flagUrl: flag("at-2") },
          { code: "at-3", name: "Lower Austria", flagUrl: flag("at-3") },
          { code: "at-4", name: "Upper Austria", flagUrl: flag("at-4") },
          { code: "at-5", name: "Salzburg",      flagUrl: flag("at-5") },
          { code: "at-6", name: "Styria",        flagUrl: flag("at-6") },
          { code: "at-7", name: "Tyrol",         flagUrl: flag("at-7") },
          { code: "at-8", name: "Vorarlberg",    flagUrl: flag("at-8") },
          { code: "at-9", name: "Vienna",        flagUrl: flag("at-9") },
        ],
      },

      // ── Netherlands (12 provinces) ───────────────────────────────────────
      {
        code: "NL", name: "Netherlands", emoji: "🇳🇱", subTitle: "12 Provinces", locked: false,
        subRegions: [
          { code: "nl-dr", name: "Drenthe",       flagUrl: flag("nl-dr") },
          { code: "nl-fl", name: "Flevoland",     flagUrl: flag("nl-fl") },
          { code: "nl-fr", name: "Friesland",     flagUrl: flag("nl-fr") },
          { code: "nl-ge", name: "Gelderland",    flagUrl: flag("nl-ge") },
          { code: "nl-gr", name: "Groningen",     flagUrl: flag("nl-gr") },
          { code: "nl-li", name: "Limburg",       flagUrl: flag("nl-li") },
          { code: "nl-nb", name: "North Brabant", flagUrl: flag("nl-nb") },
          { code: "nl-nh", name: "North Holland", flagUrl: flag("nl-nh") },
          { code: "nl-ov", name: "Overijssel",    flagUrl: flag("nl-ov") },
          { code: "nl-ut", name: "Utrecht",       flagUrl: flag("nl-ut") },
          { code: "nl-ze", name: "Zeeland",       flagUrl: flag("nl-ze") },
          { code: "nl-zh", name: "South Holland", flagUrl: flag("nl-zh") },
        ],
      },

      // ── Belgium (3 regions + 10 provinces) ──────────────────────────────
      {
        code: "BE", name: "Belgium", emoji: "🇧🇪", subTitle: "11 Provinces & Regions", locked: false,
        subRegions: [
          { code: "be-bru", name: "Brussels-Capital Region", flagUrl: flag("be-bru") },
          { code: "be-van", name: "Antwerp",                 flagUrl: flag("be-van") },
          { code: "be-wht", name: "Hainaut",                 flagUrl: flag("be-wht") },
          { code: "be-vli", name: "Limburg",                 flagUrl: flag("be-vli") },
          { code: "be-wlg", name: "Liège",                   flagUrl: flag("be-wlg") },
          { code: "be-wlx", name: "Luxembourg",              flagUrl: flag("be-wlx") },
          { code: "be-wna", name: "Namur",                   flagUrl: flag("be-wna") },
          { code: "be-vwv", name: "West Flanders",           flagUrl: flag("be-vwv") },
          { code: "be-vov", name: "East Flanders",           flagUrl: flag("be-vov") },
          { code: "be-vbr", name: "Flemish Brabant",         flagUrl: flag("be-vbr") },
          { code: "be-wbr", name: "Walloon Brabant",         flagUrl: flag("be-wbr") },
        ],
      },

      // ── Portugal (18 districts + 2 autonomous regions) ──────────────────
      {
        code: "PT", name: "Portugal", emoji: "🇵🇹", subTitle: "20 Districts & Regions", locked: false,
        subRegions: [
          { code: "pt-01", name: "Aveiro",         flagUrl: flag("pt-01") },
          { code: "pt-02", name: "Beja",           flagUrl: flag("pt-02") },
          { code: "pt-03", name: "Braga",          flagUrl: flag("pt-03") },
          { code: "pt-04", name: "Bragança",       flagUrl: flag("pt-04") },
          { code: "pt-05", name: "Castelo Branco", flagUrl: flag("pt-05") },
          { code: "pt-06", name: "Coimbra",        flagUrl: flag("pt-06") },
          { code: "pt-07", name: "Évora",          flagUrl: flag("pt-07") },
          { code: "pt-08", name: "Faro",           flagUrl: flag("pt-08") },
          { code: "pt-09", name: "Guarda",         flagUrl: flag("pt-09") },
          { code: "pt-10", name: "Leiria",         flagUrl: flag("pt-10") },
          { code: "pt-11", name: "Lisbon",         flagUrl: flag("pt-11") },
          { code: "pt-12", name: "Portalegre",     flagUrl: flag("pt-12") },
          { code: "pt-13", name: "Porto",          flagUrl: flag("pt-13") },
          { code: "pt-14", name: "Santarém",       flagUrl: flag("pt-14") },
          { code: "pt-15", name: "Setúbal",        flagUrl: flag("pt-15") },
          { code: "pt-16", name: "Viana do Castelo", flagUrl: flag("pt-16") },
          { code: "pt-17", name: "Vila Real",      flagUrl: flag("pt-17") },
          { code: "pt-18", name: "Viseu",          flagUrl: flag("pt-18") },
          { code: "pt-20", name: "Azores",         flagUrl: flag("pt-20") },
          { code: "pt-30", name: "Madeira",        flagUrl: flag("pt-30") },
        ],
      },

      // ── Sweden (21 counties) ─────────────────────────────────────────────
      {
        code: "SE", name: "Sweden", emoji: "🇸🇪", subTitle: "21 Counties", locked: false,
        subRegions: [
          { code: "se-ab", name: "Stockholm",       flagUrl: flag("se-ab") },
          { code: "se-ac", name: "Västerbotten",    flagUrl: flag("se-ac") },
          { code: "se-bd", name: "Norrbotten",      flagUrl: flag("se-bd") },
          { code: "se-c",  name: "Uppsala",         flagUrl: flag("se-c")  },
          { code: "se-d",  name: "Södermanland",    flagUrl: flag("se-d")  },
          { code: "se-e",  name: "Östergötland",    flagUrl: flag("se-e")  },
          { code: "se-f",  name: "Jönköping",       flagUrl: flag("se-f")  },
          { code: "se-g",  name: "Kronoberg",       flagUrl: flag("se-g")  },
          { code: "se-h",  name: "Kalmar",          flagUrl: flag("se-h")  },
          { code: "se-i",  name: "Gotland",         flagUrl: flag("se-i")  },
          { code: "se-k",  name: "Blekinge",        flagUrl: flag("se-k")  },
          { code: "se-m",  name: "Skåne",           flagUrl: flag("se-m")  },
          { code: "se-n",  name: "Halland",         flagUrl: flag("se-n")  },
          { code: "se-o",  name: "Västra Götaland", flagUrl: flag("se-o")  },
          { code: "se-s",  name: "Värmland",        flagUrl: flag("se-s")  },
          { code: "se-t",  name: "Örebro",          flagUrl: flag("se-t")  },
          { code: "se-u",  name: "Västmanland",     flagUrl: flag("se-u")  },
          { code: "se-w",  name: "Dalarna",         flagUrl: flag("se-w")  },
          { code: "se-x",  name: "Gävleborg",       flagUrl: flag("se-x")  },
          { code: "se-y",  name: "Västernorrland",  flagUrl: flag("se-y")  },
          { code: "se-z",  name: "Jämtland",        flagUrl: flag("se-z")  },
        ],
      },

      // ── Norway (15 counties) ─────────────────────────────────────────────
      {
        code: "NO", name: "Norway", emoji: "🇳🇴", subTitle: "15 Counties", locked: false,
        subRegions: [
          { code: "no-03", name: "Oslo",                flagUrl: flag("no-03") },
          { code: "no-11", name: "Rogaland",            flagUrl: flag("no-11") },
          { code: "no-15", name: "Møre og Romsdal",     flagUrl: flag("no-15") },
          { code: "no-18", name: "Nordland",            flagUrl: flag("no-18") },
          { code: "no-30", name: "Viken",               flagUrl: flag("no-30") },
          { code: "no-34", name: "Innlandet",           flagUrl: flag("no-34") },
          { code: "no-38", name: "Vestfold og Telemark",flagUrl: flag("no-38") },
          { code: "no-42", name: "Agder",               flagUrl: flag("no-42") },
          { code: "no-46", name: "Vestland",            flagUrl: flag("no-46") },
          { code: "no-50", name: "Trøndelag",           flagUrl: flag("no-50") },
          { code: "no-54", name: "Troms og Finnmark",   flagUrl: flag("no-54") },
        ],
      },

      // ── Denmark (5 regions) ──────────────────────────────────────────────
      {
        code: "DK", name: "Denmark", emoji: "🇩🇰", subTitle: "5 Regions", locked: false,
        subRegions: [
          { code: "dk-81", name: "North Denmark",    flagUrl: flag("dk-81") },
          { code: "dk-82", name: "Central Denmark",  flagUrl: flag("dk-82") },
          { code: "dk-83", name: "Southern Denmark", flagUrl: flag("dk-83") },
          { code: "dk-84", name: "Capital Region",   flagUrl: flag("dk-84") },
          { code: "dk-85", name: "Zealand",          flagUrl: flag("dk-85") },
        ],
      },

      // ── Finland (19 regions) ─────────────────────────────────────────────
      {
        code: "FI", name: "Finland", emoji: "🇫🇮", subTitle: "19 Regions", locked: false,
        subRegions: [
          { code: "fi-01", name: "Uusimaa",                    flagUrl: flag("fi-01") },
          { code: "fi-02", name: "South Karelia",              flagUrl: flag("fi-02") },
          { code: "fi-03", name: "South Ostrobothnia",         flagUrl: flag("fi-03") },
          { code: "fi-04", name: "South Savo",                 flagUrl: flag("fi-04") },
          { code: "fi-05", name: "Kainuu",                     flagUrl: flag("fi-05") },
          { code: "fi-06", name: "Tavastia Proper",            flagUrl: flag("fi-06") },
          { code: "fi-07", name: "Central Ostrobothnia",       flagUrl: flag("fi-07") },
          { code: "fi-08", name: "Central Finland",            flagUrl: flag("fi-08") },
          { code: "fi-09", name: "Kymenlaakso",                flagUrl: flag("fi-09") },
          { code: "fi-10", name: "Lapland",                    flagUrl: flag("fi-10") },
          { code: "fi-11", name: "Pirkanmaa",                  flagUrl: flag("fi-11") },
          { code: "fi-12", name: "Ostrobothnia",               flagUrl: flag("fi-12") },
          { code: "fi-13", name: "North Karelia",              flagUrl: flag("fi-13") },
          { code: "fi-14", name: "North Ostrobothnia",         flagUrl: flag("fi-14") },
          { code: "fi-15", name: "North Savo",                 flagUrl: flag("fi-15") },
          { code: "fi-16", name: "Päijänne Tavastia",          flagUrl: flag("fi-16") },
          { code: "fi-17", name: "Satakunta",                  flagUrl: flag("fi-17") },
          { code: "fi-18", name: "Southwest Finland",          flagUrl: flag("fi-18") },
          { code: "fi-19", name: "Åland Islands",              flagUrl: flag("fi-19") },
        ],
      },

      // ── Poland (16 voivodeships) ─────────────────────────────────────────
      {
        code: "PL", name: "Poland", emoji: "🇵🇱", subTitle: "16 Voivodeships", locked: false,
        subRegions: [
          { code: "pl-ds", name: "Lower Silesian",       flagUrl: flag("pl-ds") },
          { code: "pl-kp", name: "Kuyavian-Pomeranian",  flagUrl: flag("pl-kp") },
          { code: "pl-lb", name: "Lubusz",               flagUrl: flag("pl-lb") },
          { code: "pl-ld", name: "Łódź",                 flagUrl: flag("pl-ld") },
          { code: "pl-lu", name: "Lublin",               flagUrl: flag("pl-lu") },
          { code: "pl-ma", name: "Lesser Poland",        flagUrl: flag("pl-ma") },
          { code: "pl-mz", name: "Masovian",             flagUrl: flag("pl-mz") },
          { code: "pl-op", name: "Opole",                flagUrl: flag("pl-op") },
          { code: "pl-pd", name: "Podlaskie",            flagUrl: flag("pl-pd") },
          { code: "pl-pk", name: "Subcarpathian",        flagUrl: flag("pl-pk") },
          { code: "pl-pm", name: "Pomeranian",           flagUrl: flag("pl-pm") },
          { code: "pl-sk", name: "Świętokrzyskie",       flagUrl: flag("pl-sk") },
          { code: "pl-sl", name: "Silesian",             flagUrl: flag("pl-sl") },
          { code: "pl-wn", name: "Warmian-Masurian",     flagUrl: flag("pl-wn") },
          { code: "pl-wp", name: "Greater Poland",       flagUrl: flag("pl-wp") },
          { code: "pl-zp", name: "West Pomeranian",      flagUrl: flag("pl-zp") },
        ],
      },

      // ── Greece (13 regions) ──────────────────────────────────────────────
      {
        code: "GR", name: "Greece", emoji: "🇬🇷", subTitle: "13 Regions", locked: false,
        subRegions: [
          { code: "gr-a", name: "East Macedonia & Thrace", flagUrl: flag("gr-a") },
          { code: "gr-b", name: "Central Macedonia",       flagUrl: flag("gr-b") },
          { code: "gr-c", name: "West Macedonia",          flagUrl: flag("gr-c") },
          { code: "gr-d", name: "Epirus",                  flagUrl: flag("gr-d") },
          { code: "gr-e", name: "Thessaly",                flagUrl: flag("gr-e") },
          { code: "gr-f", name: "Ionian Islands",          flagUrl: flag("gr-f") },
          { code: "gr-g", name: "West Greece",             flagUrl: flag("gr-g") },
          { code: "gr-h", name: "Central Greece",          flagUrl: flag("gr-h") },
          { code: "gr-i", name: "Attica",                  flagUrl: flag("gr-i") },
          { code: "gr-j", name: "Peloponnese",             flagUrl: flag("gr-j") },
          { code: "gr-k", name: "North Aegean",            flagUrl: flag("gr-k") },
          { code: "gr-l", name: "South Aegean",            flagUrl: flag("gr-l") },
          { code: "gr-m", name: "Crete",                   flagUrl: flag("gr-m") },
        ],
      },

      // ── Czech Republic (14 regions) ──────────────────────────────────────
      {
        code: "CZ", name: "Czech Republic", emoji: "🇨🇿", subTitle: "14 Regions", locked: false,
        subRegions: [
          { code: "cz-10", name: "Prague",              flagUrl: flag("cz-10") },
          { code: "cz-20", name: "Central Bohemia",     flagUrl: flag("cz-20") },
          { code: "cz-31", name: "South Bohemia",       flagUrl: flag("cz-31") },
          { code: "cz-32", name: "Pilsen",              flagUrl: flag("cz-32") },
          { code: "cz-41", name: "Karlovy Vary",        flagUrl: flag("cz-41") },
          { code: "cz-42", name: "Ústí nad Labem",      flagUrl: flag("cz-42") },
          { code: "cz-51", name: "Liberec",             flagUrl: flag("cz-51") },
          { code: "cz-52", name: "Hradec Králové",      flagUrl: flag("cz-52") },
          { code: "cz-53", name: "Pardubice",           flagUrl: flag("cz-53") },
          { code: "cz-63", name: "Vysočina",            flagUrl: flag("cz-63") },
          { code: "cz-64", name: "South Moravia",       flagUrl: flag("cz-64") },
          { code: "cz-71", name: "Olomouc",             flagUrl: flag("cz-71") },
          { code: "cz-72", name: "Zlín",                flagUrl: flag("cz-72") },
          { code: "cz-80", name: "Moravian-Silesian",   flagUrl: flag("cz-80") },
        ],
      },

      // ── Hungary (19 counties + Budapest) ────────────────────────────────
      {
        code: "HU", name: "Hungary", emoji: "🇭🇺", subTitle: "20 Counties", locked: false,
        subRegions: [
          { code: "hu-ba", name: "Baranya",               flagUrl: flag("hu-ba") },
          { code: "hu-be", name: "Békés",                 flagUrl: flag("hu-be") },
          { code: "hu-bk", name: "Bács-Kiskun",           flagUrl: flag("hu-bk") },
          { code: "hu-bu", name: "Budapest",              flagUrl: flag("hu-bu") },
          { code: "hu-bz", name: "Borsod-Abaúj-Zemplén", flagUrl: flag("hu-bz") },
          { code: "hu-cs", name: "Csongrád-Csanád",       flagUrl: flag("hu-cs") },
          { code: "hu-fe", name: "Fejér",                 flagUrl: flag("hu-fe") },
          { code: "hu-gs", name: "Győr-Moson-Sopron",     flagUrl: flag("hu-gs") },
          { code: "hu-hb", name: "Hajdú-Bihar",           flagUrl: flag("hu-hb") },
          { code: "hu-he", name: "Heves",                 flagUrl: flag("hu-he") },
          { code: "hu-jn", name: "Jász-Nagykun-Szolnok",  flagUrl: flag("hu-jn") },
          { code: "hu-ke", name: "Komárom-Esztergom",     flagUrl: flag("hu-ke") },
          { code: "hu-no", name: "Nógrád",                flagUrl: flag("hu-no") },
          { code: "hu-pe", name: "Pest",                  flagUrl: flag("hu-pe") },
          { code: "hu-so", name: "Somogy",                flagUrl: flag("hu-so") },
          { code: "hu-sz", name: "Szabolcs-Szatmár-Bereg",flagUrl: flag("hu-sz") },
          { code: "hu-to", name: "Tolna",                 flagUrl: flag("hu-to") },
          { code: "hu-va", name: "Vas",                   flagUrl: flag("hu-va") },
          { code: "hu-ve", name: "Veszprém",              flagUrl: flag("hu-ve") },
          { code: "hu-za", name: "Zala",                  flagUrl: flag("hu-za") },
        ],
      },

      // ── Romania (41 counties + Bucharest) ───────────────────────────────
      {
        code: "RO", name: "Romania", emoji: "🇷🇴", subTitle: "42 Counties", locked: false,
        subRegions: [
          { code: "ro-ab", name: "Alba",           flagUrl: flag("ro-ab") },
          { code: "ro-ar", name: "Arad",           flagUrl: flag("ro-ar") },
          { code: "ro-ag", name: "Argeș",          flagUrl: flag("ro-ag") },
          { code: "ro-bc", name: "Bacău",          flagUrl: flag("ro-bc") },
          { code: "ro-bh", name: "Bihor",          flagUrl: flag("ro-bh") },
          { code: "ro-bn", name: "Bistrița-Năsăud",flagUrl: flag("ro-bn") },
          { code: "ro-bt", name: "Botoșani",       flagUrl: flag("ro-bt") },
          { code: "ro-bv", name: "Brașov",         flagUrl: flag("ro-bv") },
          { code: "ro-br", name: "Brăila",         flagUrl: flag("ro-br") },
          { code: "ro-b",  name: "Bucharest",      flagUrl: flag("ro-b")  },
          { code: "ro-bz", name: "Buzău",          flagUrl: flag("ro-bz") },
          { code: "ro-cs", name: "Caraș-Severin",  flagUrl: flag("ro-cs") },
          { code: "ro-cj", name: "Cluj",           flagUrl: flag("ro-cj") },
          { code: "ro-ct", name: "Constanța",      flagUrl: flag("ro-ct") },
          { code: "ro-cv", name: "Covasna",        flagUrl: flag("ro-cv") },
          { code: "ro-db", name: "Dâmbovița",      flagUrl: flag("ro-db") },
          { code: "ro-dj", name: "Dolj",           flagUrl: flag("ro-dj") },
          { code: "ro-gl", name: "Galați",         flagUrl: flag("ro-gl") },
          { code: "ro-gr", name: "Giurgiu",        flagUrl: flag("ro-gr") },
          { code: "ro-gj", name: "Gorj",           flagUrl: flag("ro-gj") },
          { code: "ro-hr", name: "Harghita",       flagUrl: flag("ro-hr") },
          { code: "ro-hd", name: "Hunedoara",      flagUrl: flag("ro-hd") },
          { code: "ro-il", name: "Ialomița",       flagUrl: flag("ro-il") },
          { code: "ro-is", name: "Iași",           flagUrl: flag("ro-is") },
          { code: "ro-if", name: "Ilfov",          flagUrl: flag("ro-if") },
          { code: "ro-mm", name: "Maramureș",      flagUrl: flag("ro-mm") },
          { code: "ro-mh", name: "Mehedinți",      flagUrl: flag("ro-mh") },
          { code: "ro-ms", name: "Mureș",          flagUrl: flag("ro-ms") },
          { code: "ro-nt", name: "Neamț",          flagUrl: flag("ro-nt") },
          { code: "ro-ot", name: "Olt",            flagUrl: flag("ro-ot") },
          { code: "ro-ph", name: "Prahova",        flagUrl: flag("ro-ph") },
          { code: "ro-sm", name: "Satu Mare",      flagUrl: flag("ro-sm") },
          { code: "ro-sj", name: "Sălaj",          flagUrl: flag("ro-sj") },
          { code: "ro-sb", name: "Sibiu",          flagUrl: flag("ro-sb") },
          { code: "ro-sv", name: "Suceava",        flagUrl: flag("ro-sv") },
          { code: "ro-tr", name: "Teleorman",      flagUrl: flag("ro-tr") },
          { code: "ro-tm", name: "Timiș",          flagUrl: flag("ro-tm") },
          { code: "ro-tl", name: "Tulcea",         flagUrl: flag("ro-tl") },
          { code: "ro-vs", name: "Vaslui",         flagUrl: flag("ro-vs") },
          { code: "ro-vl", name: "Vâlcea",         flagUrl: flag("ro-vl") },
          { code: "ro-vn", name: "Vrancea",        flagUrl: flag("ro-vn") },
          { code: "ro-cl", name: "Călărași",       flagUrl: flag("ro-cl") },
        ],
      },

      // ── Bulgaria (28 provinces) ──────────────────────────────────────────
      {
        code: "BG", name: "Bulgaria", emoji: "🇧🇬", subTitle: "28 Provinces", locked: false,
        subRegions: [
          { code: "bg-01", name: "Blagoevgrad",    flagUrl: flag("bg-01") },
          { code: "bg-02", name: "Burgas",         flagUrl: flag("bg-02") },
          { code: "bg-03", name: "Varna",          flagUrl: flag("bg-03") },
          { code: "bg-04", name: "Veliko Tarnovo", flagUrl: flag("bg-04") },
          { code: "bg-05", name: "Vidin",          flagUrl: flag("bg-05") },
          { code: "bg-06", name: "Vratsa",         flagUrl: flag("bg-06") },
          { code: "bg-07", name: "Gabrovo",        flagUrl: flag("bg-07") },
          { code: "bg-08", name: "Dobrich",        flagUrl: flag("bg-08") },
          { code: "bg-09", name: "Kardzhali",      flagUrl: flag("bg-09") },
          { code: "bg-10", name: "Kyustendil",     flagUrl: flag("bg-10") },
          { code: "bg-11", name: "Lovech",         flagUrl: flag("bg-11") },
          { code: "bg-12", name: "Montana",        flagUrl: flag("bg-12") },
          { code: "bg-13", name: "Pazardzhik",     flagUrl: flag("bg-13") },
          { code: "bg-14", name: "Pernik",         flagUrl: flag("bg-14") },
          { code: "bg-15", name: "Pleven",         flagUrl: flag("bg-15") },
          { code: "bg-16", name: "Plovdiv",        flagUrl: flag("bg-16") },
          { code: "bg-17", name: "Razgrad",        flagUrl: flag("bg-17") },
          { code: "bg-18", name: "Ruse",           flagUrl: flag("bg-18") },
          { code: "bg-19", name: "Silistra",       flagUrl: flag("bg-19") },
          { code: "bg-20", name: "Sliven",         flagUrl: flag("bg-20") },
          { code: "bg-21", name: "Smolyan",        flagUrl: flag("bg-21") },
          { code: "bg-22", name: "Sofia City",     flagUrl: flag("bg-22") },
          { code: "bg-23", name: "Sofia Province", flagUrl: flag("bg-23") },
          { code: "bg-24", name: "Stara Zagora",   flagUrl: flag("bg-24") },
          { code: "bg-25", name: "Targovishte",    flagUrl: flag("bg-25") },
          { code: "bg-26", name: "Haskovo",        flagUrl: flag("bg-26") },
          { code: "bg-27", name: "Shumen",         flagUrl: flag("bg-27") },
          { code: "bg-28", name: "Yambol",         flagUrl: flag("bg-28") },
        ],
      },

      // ── Croatia (20 counties + City of Zagreb) ───────────────────────────
      {
        code: "HR", name: "Croatia", emoji: "🇭🇷", subTitle: "21 Counties", locked: false,
        subRegions: [
          { code: "hr-01", name: "Zagreb County",       flagUrl: flag("hr-01") },
          { code: "hr-02", name: "Krapina-Zagorje",     flagUrl: flag("hr-02") },
          { code: "hr-03", name: "Sisak-Moslavina",     flagUrl: flag("hr-03") },
          { code: "hr-04", name: "Karlovac",            flagUrl: flag("hr-04") },
          { code: "hr-05", name: "Varaždin",            flagUrl: flag("hr-05") },
          { code: "hr-06", name: "Koprivnica-Križevci", flagUrl: flag("hr-06") },
          { code: "hr-07", name: "Bjelovar-Bilogora",   flagUrl: flag("hr-07") },
          { code: "hr-08", name: "Primorje-Gorski Kotar",flagUrl: flag("hr-08") },
          { code: "hr-09", name: "Lika-Senj",           flagUrl: flag("hr-09") },
          { code: "hr-10", name: "Virovitica-Podravina", flagUrl: flag("hr-10") },
          { code: "hr-11", name: "Požega-Slavonia",     flagUrl: flag("hr-11") },
          { code: "hr-12", name: "Brod-Posavina",       flagUrl: flag("hr-12") },
          { code: "hr-13", name: "Zadar",               flagUrl: flag("hr-13") },
          { code: "hr-14", name: "Osijek-Baranja",      flagUrl: flag("hr-14") },
          { code: "hr-15", name: "Šibenik-Knin",        flagUrl: flag("hr-15") },
          { code: "hr-16", name: "Vukovar-Srijem",      flagUrl: flag("hr-16") },
          { code: "hr-17", name: "Split-Dalmatia",      flagUrl: flag("hr-17") },
          { code: "hr-18", name: "Istria",              flagUrl: flag("hr-18") },
          { code: "hr-19", name: "Dubrovnik-Neretva",   flagUrl: flag("hr-19") },
          { code: "hr-20", name: "Međimurje",           flagUrl: flag("hr-20") },
          { code: "hr-21", name: "City of Zagreb",      flagUrl: flag("hr-21") },
        ],
      },

      // ── Slovakia (8 regions) ─────────────────────────────────────────────
      {
        code: "SK", name: "Slovakia", emoji: "🇸🇰", subTitle: "8 Regions", locked: false,
        subRegions: [
          { code: "sk-bc", name: "Banská Bystrica", flagUrl: flag("sk-bc") },
          { code: "sk-bl", name: "Bratislava",      flagUrl: flag("sk-bl") },
          { code: "sk-ki", name: "Košice",          flagUrl: flag("sk-ki") },
          { code: "sk-ni", name: "Nitra",           flagUrl: flag("sk-ni") },
          { code: "sk-pv", name: "Prešov",          flagUrl: flag("sk-pv") },
          { code: "sk-ta", name: "Trnava",          flagUrl: flag("sk-ta") },
          { code: "sk-tc", name: "Trenčín",         flagUrl: flag("sk-tc") },
          { code: "sk-zi", name: "Žilina",          flagUrl: flag("sk-zi") },
        ],
      },

      // ── Lithuania (10 counties) ──────────────────────────────────────────
      {
        code: "LT", name: "Lithuania", emoji: "🇱🇹", subTitle: "10 Counties", locked: false,
        subRegions: [
          { code: "lt-al", name: "Alytus",      flagUrl: flag("lt-al") },
          { code: "lt-kl", name: "Klaipėda",   flagUrl: flag("lt-kl") },
          { code: "lt-ku", name: "Kaunas",      flagUrl: flag("lt-ku") },
          { code: "lt-mr", name: "Marijampolė",flagUrl: flag("lt-mr") },
          { code: "lt-pn", name: "Panevėžys",  flagUrl: flag("lt-pn") },
          { code: "lt-sa", name: "Šiauliai",   flagUrl: flag("lt-sa") },
          { code: "lt-ta", name: "Tauragė",    flagUrl: flag("lt-ta") },
          { code: "lt-te", name: "Telšiai",    flagUrl: flag("lt-te") },
          { code: "lt-ut", name: "Utena",      flagUrl: flag("lt-ut") },
          { code: "lt-vl", name: "Vilnius",    flagUrl: flag("lt-vl") },
        ],
      },

      // ── Latvia (6 planning regions) ──────────────────────────────────────
      {
        code: "LV", name: "Latvia", emoji: "🇱🇻", subTitle: "6 Regions", locked: false,
        subRegions: [
          { code: "lv-rix", name: "Riga",        flagUrl: flag("lv-rix") },
          { code: "lv-pie", name: "Pierīga",     flagUrl: flag("lv-pie") },
          { code: "lv-vid", name: "Vidzeme",     flagUrl: flag("lv-vid") },
          { code: "lv-kur", name: "Kurzeme",     flagUrl: flag("lv-kur") },
          { code: "lv-zem", name: "Zemgale",     flagUrl: flag("lv-zem") },
          { code: "lv-lat", name: "Latgale",     flagUrl: flag("lv-lat") },
        ],
      },

      // ── Estonia (15 counties) ────────────────────────────────────────────
      {
        code: "EE", name: "Estonia", emoji: "🇪🇪", subTitle: "15 Counties", locked: false,
        subRegions: [
          { code: "ee-37", name: "Harju",       flagUrl: flag("ee-37") },
          { code: "ee-39", name: "Hiiu",        flagUrl: flag("ee-39") },
          { code: "ee-44", name: "Ida-Viru",    flagUrl: flag("ee-44") },
          { code: "ee-49", name: "Jõgeva",      flagUrl: flag("ee-49") },
          { code: "ee-51", name: "Järva",       flagUrl: flag("ee-51") },
          { code: "ee-57", name: "Lääne",       flagUrl: flag("ee-57") },
          { code: "ee-59", name: "Lääne-Viru",  flagUrl: flag("ee-59") },
          { code: "ee-65", name: "Põlva",       flagUrl: flag("ee-65") },
          { code: "ee-67", name: "Pärnu",       flagUrl: flag("ee-67") },
          { code: "ee-70", name: "Rapla",       flagUrl: flag("ee-70") },
          { code: "ee-74", name: "Saare",       flagUrl: flag("ee-74") },
          { code: "ee-78", name: "Tartu",       flagUrl: flag("ee-78") },
          { code: "ee-82", name: "Valga",       flagUrl: flag("ee-82") },
          { code: "ee-84", name: "Viljandi",    flagUrl: flag("ee-84") },
          { code: "ee-86", name: "Võru",        flagUrl: flag("ee-86") },
        ],
      },

      // ── Ireland (4 provinces) ────────────────────────────────────────────
      {
        code: "IE", name: "Ireland", emoji: "🇮🇪", subTitle: "4 Provinces", locked: false,
        subRegions: [
          { code: "ie-c", name: "Connacht", flagUrl: flag("ie-c") },
          { code: "ie-l", name: "Leinster", flagUrl: flag("ie-l") },
          { code: "ie-m", name: "Munster",  flagUrl: flag("ie-m") },
          { code: "ie-u", name: "Ulster",   flagUrl: flag("ie-u") },
        ],
      },

      // ── Serbia (districts / autonomous provinces) ────────────────────────
      {
        code: "RS", name: "Serbia", emoji: "🇷🇸", subTitle: "5 Regions", locked: false,
        subRegions: [
          { code: "rs-vo", name: "Vojvodina",          flagUrl: flag("rs-vo") },
          { code: "rs-00", name: "Belgrade",           flagUrl: flag("rs-00") },
          { code: "rs-02", name: "Šumadija & W Serbia",flagUrl: flag("rs-02") },
          { code: "rs-03", name: "S & E Serbia",       flagUrl: flag("rs-03") },
          { code: "rs-km", name: "Kosovo & Metohija",  flagUrl: flag("rs-km") },
        ],
      },

      // ── Bosnia and Herzegovina ───────────────────────────────────────────
      {
        code: "BA", name: "Bosnia & Herzegovina", emoji: "🇧🇦", subTitle: "3 Entities", locked: false,
        subRegions: [
          { code: "ba-bih", name: "Federation of B&H", flagUrl: flag("ba-bih") },
          { code: "ba-srp", name: "Republika Srpska",  flagUrl: flag("ba-srp") },
          { code: "ba-brc", name: "Brčko District",    flagUrl: flag("ba-brc") },
        ],
      },

      // ── Albania (12 counties) ────────────────────────────────────────────
      {
        code: "AL", name: "Albania", emoji: "🇦🇱", subTitle: "12 Counties", locked: false,
        subRegions: [
          { code: "al-br", name: "Berat",     flagUrl: flag("al-br") },
          { code: "al-di", name: "Dibër",     flagUrl: flag("al-di") },
          { code: "al-dl", name: "Durrës",    flagUrl: flag("al-dl") },
          { code: "al-el", name: "Elbasan",   flagUrl: flag("al-el") },
          { code: "al-fr", name: "Fier",      flagUrl: flag("al-fr") },
          { code: "al-gj", name: "Gjirokastër",flagUrl: flag("al-gj") },
          { code: "al-ko", name: "Korçë",     flagUrl: flag("al-ko") },
          { code: "al-ku", name: "Kukës",     flagUrl: flag("al-ku") },
          { code: "al-le", name: "Lezhë",     flagUrl: flag("al-le") },
          { code: "al-mr", name: "Shkodër",   flagUrl: flag("al-mr") },
          { code: "al-ti", name: "Tirana",    flagUrl: flag("al-ti") },
          { code: "al-vl", name: "Vlorë",     flagUrl: flag("al-vl") },
        ],
      },

      // ── North Macedonia (8 statistical regions) ──────────────────────────
      {
        code: "MK", name: "North Macedonia", emoji: "🇲🇰", subTitle: "8 Regions", locked: false,
        subRegions: [
          { code: "mk-101", name: "Vardar",          flagUrl: flag("mk-101") },
          { code: "mk-201", name: "East",            flagUrl: flag("mk-201") },
          { code: "mk-301", name: "Southwest",       flagUrl: flag("mk-301") },
          { code: "mk-401", name: "Southeast",       flagUrl: flag("mk-401") },
          { code: "mk-501", name: "Pelagonia",       flagUrl: flag("mk-501") },
          { code: "mk-601", name: "Polog",           flagUrl: flag("mk-601") },
          { code: "mk-701", name: "Northeast",       flagUrl: flag("mk-701") },
          { code: "mk-801", name: "Skopje",          flagUrl: flag("mk-801") },
        ],
      },

      // ── Montenegro (25 municipalities) — listed as regions ───────────────
      {
        code: "ME", name: "Montenegro", emoji: "🇲🇪", subTitle: "25 Municipalities", locked: false,
        subRegions: [
          { code: "me-01", name: "Andrijevica",  flagUrl: flag("me-01") },
          { code: "me-02", name: "Bar",          flagUrl: flag("me-02") },
          { code: "me-03", name: "Berane",       flagUrl: flag("me-03") },
          { code: "me-04", name: "Bijelo Polje", flagUrl: flag("me-04") },
          { code: "me-05", name: "Budva",        flagUrl: flag("me-05") },
          { code: "me-06", name: "Cetinje",      flagUrl: flag("me-06") },
          { code: "me-07", name: "Danilovgrad",  flagUrl: flag("me-07") },
          { code: "me-08", name: "Herceg Novi",  flagUrl: flag("me-08") },
          { code: "me-09", name: "Kolašin",      flagUrl: flag("me-09") },
          { code: "me-10", name: "Kotor",        flagUrl: flag("me-10") },
          { code: "me-11", name: "Mojkovac",     flagUrl: flag("me-11") },
          { code: "me-12", name: "Nikšić",       flagUrl: flag("me-12") },
          { code: "me-13", name: "Plav",         flagUrl: flag("me-13") },
          { code: "me-14", name: "Pljevlja",     flagUrl: flag("me-14") },
          { code: "me-15", name: "Plužine",      flagUrl: flag("me-15") },
          { code: "me-16", name: "Podgorica",    flagUrl: flag("me-16") },
          { code: "me-17", name: "Rožaje",       flagUrl: flag("me-17") },
          { code: "me-18", name: "Šavnik",       flagUrl: flag("me-18") },
          { code: "me-19", name: "Tivat",        flagUrl: flag("me-19") },
          { code: "me-20", name: "Ulcinj",       flagUrl: flag("me-20") },
          { code: "me-21", name: "Žabljak",      flagUrl: flag("me-21") },
          { code: "me-22", name: "Petnjica",     flagUrl: flag("me-22") },
          { code: "me-23", name: "Gusinje",      flagUrl: flag("me-23") },
          { code: "me-24", name: "Tuzi",         flagUrl: flag("me-24") },
          { code: "me-25", name: "Zeta",         flagUrl: flag("me-25") },
        ],
      },

      // ── Slovenia (12 statistical regions) ───────────────────────────────
      {
        code: "SI", name: "Slovenia", emoji: "🇸🇮", subTitle: "12 Regions", locked: false,
        subRegions: [
          { code: "si-01", name: "Pomurska",            flagUrl: flag("si-01") },
          { code: "si-02", name: "Podravska",           flagUrl: flag("si-02") },
          { code: "si-03", name: "Koroška",             flagUrl: flag("si-03") },
          { code: "si-04", name: "Savinjska",           flagUrl: flag("si-04") },
          { code: "si-05", name: "Zasavska",            flagUrl: flag("si-05") },
          { code: "si-06", name: "Posavska",            flagUrl: flag("si-06") },
          { code: "si-07", name: "Southeast Slovenia",  flagUrl: flag("si-07") },
          { code: "si-08", name: "Primorska-Notranjska",flagUrl: flag("si-08") },
          { code: "si-09", name: "Gorenjska",           flagUrl: flag("si-09") },
          { code: "si-10", name: "Primorsko-Kraška",    flagUrl: flag("si-10") },
          { code: "si-11", name: "Goriška",             flagUrl: flag("si-11") },
          { code: "si-12", name: "Obalno-Kraška",       flagUrl: flag("si-12") },
        ],
      },

      // ── Ukraine (25 oblasts + Kyiv city) ────────────────────────────────
      {
        code: "UA", name: "Ukraine", emoji: "🇺🇦", subTitle: "27 Oblasts", locked: false,
        subRegions: [
          { code: "ua-05", name: "Vinnytsia",   flagUrl: flag("ua-05") },
          { code: "ua-07", name: "Volyn",       flagUrl: flag("ua-07") },
          { code: "ua-09", name: "Luhansk",     flagUrl: flag("ua-09") },
          { code: "ua-12", name: "Dnipropetrovsk",flagUrl: flag("ua-12") },
          { code: "ua-14", name: "Donetsk",     flagUrl: flag("ua-14") },
          { code: "ua-18", name: "Zhytomyr",    flagUrl: flag("ua-18") },
          { code: "ua-21", name: "Zakarpattia", flagUrl: flag("ua-21") },
          { code: "ua-23", name: "Zaporizhzhia",flagUrl: flag("ua-23") },
          { code: "ua-26", name: "Ivano-Frankivsk",flagUrl: flag("ua-26") },
          { code: "ua-30", name: "Kyiv City",   flagUrl: flag("ua-30") },
          { code: "ua-32", name: "Kyiv Oblast", flagUrl: flag("ua-32") },
          { code: "ua-35", name: "Kirovohrad",  flagUrl: flag("ua-35") },
          { code: "ua-40", name: "Sevastopol",  flagUrl: flag("ua-40") },
          { code: "ua-43", name: "Crimea",      flagUrl: flag("ua-43") },
          { code: "ua-46", name: "Lviv",        flagUrl: flag("ua-46") },
          { code: "ua-48", name: "Mykolaiv",    flagUrl: flag("ua-48") },
          { code: "ua-51", name: "Odessa",      flagUrl: flag("ua-51") },
          { code: "ua-53", name: "Poltava",     flagUrl: flag("ua-53") },
          { code: "ua-56", name: "Rivne",       flagUrl: flag("ua-56") },
          { code: "ua-59", name: "Sumy",        flagUrl: flag("ua-59") },
          { code: "ua-61", name: "Ternopil",    flagUrl: flag("ua-61") },
          { code: "ua-63", name: "Kharkiv",     flagUrl: flag("ua-63") },
          { code: "ua-65", name: "Kherson",     flagUrl: flag("ua-65") },
          { code: "ua-68", name: "Khmelnytskyi",flagUrl: flag("ua-68") },
          { code: "ua-71", name: "Cherkasy",    flagUrl: flag("ua-71") },
          { code: "ua-74", name: "Chernihiv",   flagUrl: flag("ua-74") },
          { code: "ua-77", name: "Chernivtsi",  flagUrl: flag("ua-77") },
        ],
      },

      // ── Belarus (6 oblasts + Minsk city) ────────────────────────────────
      {
        code: "BY", name: "Belarus", emoji: "🇧🇾", subTitle: "7 Oblasts", locked: false,
        subRegions: [
          { code: "by-br", name: "Brest",       flagUrl: flag("by-br") },
          { code: "by-ho", name: "Homiel",      flagUrl: flag("by-ho") },
          { code: "by-hr", name: "Hrodna",      flagUrl: flag("by-hr") },
          { code: "by-ma", name: "Mahilyow",    flagUrl: flag("by-ma") },
          { code: "by-mi", name: "Minsk City",  flagUrl: flag("by-mi") },
          { code: "by-mo", name: "Minsk Oblast",flagUrl: flag("by-mo") },
          { code: "by-vi", name: "Vitsebsk",    flagUrl: flag("by-vi") },
        ],
      },

      // ── Moldova (10 districts) ───────────────────────────────────────────
      {
        code: "MD", name: "Moldova", emoji: "🇲🇩", subTitle: "10 Districts", locked: false,
        subRegions: [
          { code: "md-an", name: "Anenii Noi",  flagUrl: flag("md-an") },
          { code: "md-ba", name: "Bălți",       flagUrl: flag("md-ba") },
          { code: "md-ca", name: "Cahul",       flagUrl: flag("md-ca") },
          { code: "md-ch", name: "Chișinău",    flagUrl: flag("md-ch") },
          { code: "md-ed", name: "Edineț",      flagUrl: flag("md-ed") },
          { code: "md-ga", name: "Gagauzia",    flagUrl: flag("md-ga") },
          { code: "md-or", name: "Orhei",       flagUrl: flag("md-or") },
          { code: "md-so", name: "Soroca",      flagUrl: flag("md-so") },
          { code: "md-ti", name: "Tiraspol",    flagUrl: flag("md-ti") },
          { code: "md-un", name: "Ungheni",     flagUrl: flag("md-un") },
        ],
      },

      // ── Andorra (7 parishes) ─────────────────────────────────────────────
      {
        code: "AD", name: "Andorra", emoji: "🇦🇩", subTitle: "7 Parishes", locked: false,
        subRegions: [
          { code: "ad-02", name: "Canillo",              flagUrl: flag("ad-02") },
          { code: "ad-03", name: "Encamp",               flagUrl: flag("ad-03") },
          { code: "ad-04", name: "La Massana",           flagUrl: flag("ad-04") },
          { code: "ad-05", name: "Ordino",               flagUrl: flag("ad-05") },
          { code: "ad-06", name: "Sant Julià de Lòria",  flagUrl: flag("ad-06") },
          { code: "ad-07", name: "Andorra la Vella",     flagUrl: flag("ad-07") },
          { code: "ad-08", name: "Escaldes-Engordany",   flagUrl: flag("ad-08") },
        ],
      },

      // ── Cyprus (6 districts) ─────────────────────────────────────────────
      {
        code: "CY", name: "Cyprus", emoji: "🇨🇾", subTitle: "6 Districts", locked: false,
        subRegions: [
          { code: "cy-01", name: "Nicosia",   flagUrl: flag("cy-01") },
          { code: "cy-02", name: "Limassol",  flagUrl: flag("cy-02") },
          { code: "cy-03", name: "Larnaca",   flagUrl: flag("cy-03") },
          { code: "cy-04", name: "Famagusta", flagUrl: flag("cy-04") },
          { code: "cy-05", name: "Paphos",    flagUrl: flag("cy-05") },
          { code: "cy-06", name: "Kyrenia",   flagUrl: flag("cy-06") },
        ],
      },

      // ── Iceland (8 regions) ──────────────────────────────────────────────
      {
        code: "IS", name: "Iceland", emoji: "🇮🇸", subTitle: "8 Regions", locked: false,
        subRegions: [
          { code: "is-1", name: "Capital Region",     flagUrl: flag("is-1") },
          { code: "is-2", name: "Southern Peninsula", flagUrl: flag("is-2") },
          { code: "is-3", name: "West",               flagUrl: flag("is-3") },
          { code: "is-4", name: "Westfjords",         flagUrl: flag("is-4") },
          { code: "is-5", name: "Northwest",          flagUrl: flag("is-5") },
          { code: "is-6", name: "Northeast",          flagUrl: flag("is-6") },
          { code: "is-7", name: "East",               flagUrl: flag("is-7") },
          { code: "is-8", name: "South",              flagUrl: flag("is-8") },
        ],
      },

      // ── Kosovo (7 districts) ─────────────────────────────────────────────
      {
        code: "XK", name: "Kosovo", emoji: "🇽🇰", subTitle: "7 Districts", locked: false,
        subRegions: [
          { code: "xk-pr", name: "Pristina",  flagUrl: flag("xk-pr") },
          { code: "xk-pe", name: "Peja",      flagUrl: flag("xk-pe") },
          { code: "xk-gj", name: "Gjakova",   flagUrl: flag("xk-gj") },
          { code: "xk-mi", name: "Mitrovica", flagUrl: flag("xk-mi") },
          { code: "xk-pz", name: "Prizren",   flagUrl: flag("xk-pz") },
          { code: "xk-fe", name: "Ferizaj",   flagUrl: flag("xk-fe") },
          { code: "xk-gi", name: "Gjilan",    flagUrl: flag("xk-gi") },
        ],
      },

      // ── Liechtenstein (11 communes) ──────────────────────────────────────
      {
        code: "LI", name: "Liechtenstein", emoji: "🇱🇮", subTitle: "11 Communes", locked: false,
        subRegions: [
          { code: "li-01", name: "Balzers",       flagUrl: flag("li-01") },
          { code: "li-02", name: "Eschen",        flagUrl: flag("li-02") },
          { code: "li-03", name: "Gamprin",       flagUrl: flag("li-03") },
          { code: "li-04", name: "Mauren",        flagUrl: flag("li-04") },
          { code: "li-05", name: "Planken",       flagUrl: flag("li-05") },
          { code: "li-06", name: "Ruggell",       flagUrl: flag("li-06") },
          { code: "li-07", name: "Schaan",        flagUrl: flag("li-07") },
          { code: "li-08", name: "Schellenberg",  flagUrl: flag("li-08") },
          { code: "li-09", name: "Triesen",       flagUrl: flag("li-09") },
          { code: "li-10", name: "Triesenberg",   flagUrl: flag("li-10") },
          { code: "li-11", name: "Vaduz",         flagUrl: flag("li-11") },
        ],
      },

      // ── Luxembourg (12 cantons) ──────────────────────────────────────────
      {
        code: "LU", name: "Luxembourg", emoji: "🇱🇺", subTitle: "12 Cantons", locked: false,
        subRegions: [
          { code: "lu-ca", name: "Capellen",        flagUrl: flag("lu-ca") },
          { code: "lu-cl", name: "Clervaux",        flagUrl: flag("lu-cl") },
          { code: "lu-di", name: "Diekirch",        flagUrl: flag("lu-di") },
          { code: "lu-ec", name: "Echternach",      flagUrl: flag("lu-ec") },
          { code: "lu-es", name: "Esch-sur-Alzette",flagUrl: flag("lu-es") },
          { code: "lu-gr", name: "Grevenmacher",    flagUrl: flag("lu-gr") },
          { code: "lu-lu", name: "Luxembourg",      flagUrl: flag("lu-lu") },
          { code: "lu-me", name: "Mersch",          flagUrl: flag("lu-me") },
          { code: "lu-rd", name: "Redange",         flagUrl: flag("lu-rd") },
          { code: "lu-rm", name: "Remich",          flagUrl: flag("lu-rm") },
          { code: "lu-vd", name: "Vianden",         flagUrl: flag("lu-vd") },
          { code: "lu-wi", name: "Wiltz",           flagUrl: flag("lu-wi") },
        ],
      },

      // ── Malta (5 regions) ────────────────────────────────────────────────
      {
        code: "MT", name: "Malta", emoji: "🇲🇹", subTitle: "5 Regions", locked: false,
        subRegions: [
          { code: "mt-01", name: "Gozo & Comino",    flagUrl: flag("mt-01") },
          { code: "mt-02", name: "Northern",         flagUrl: flag("mt-02") },
          { code: "mt-03", name: "Northern Harbour", flagUrl: flag("mt-03") },
          { code: "mt-04", name: "South Eastern",    flagUrl: flag("mt-04") },
          { code: "mt-05", name: "Southern Harbour", flagUrl: flag("mt-05") },
        ],
      },

      // ── Monaco (4 quarters) ──────────────────────────────────────────────
      {
        code: "MC", name: "Monaco", emoji: "🇲🇨", subTitle: "4 Quarters", locked: false,
        subRegions: [
          { code: "mc-cl", name: "La Colle",     flagUrl: flag("mc-cl") },
          { code: "mc-co", name: "La Condamine", flagUrl: flag("mc-co") },
          { code: "mc-fo", name: "Fontvieille",  flagUrl: flag("mc-fo") },
          { code: "mc-mc", name: "Monaco-Ville", flagUrl: flag("mc-mc") },
        ],
      },

      // ── San Marino (9 municipalities) ────────────────────────────────────
      {
        code: "SM", name: "San Marino", emoji: "🇸🇲", subTitle: "9 Municipalities", locked: false,
        subRegions: [
          { code: "sm-01", name: "Acquaviva",      flagUrl: flag("sm-01") },
          { code: "sm-02", name: "Borgo Maggiore", flagUrl: flag("sm-02") },
          { code: "sm-03", name: "Chiesanuova",    flagUrl: flag("sm-03") },
          { code: "sm-04", name: "Domagnano",      flagUrl: flag("sm-04") },
          { code: "sm-05", name: "Faetano",        flagUrl: flag("sm-05") },
          { code: "sm-06", name: "Fiorentino",     flagUrl: flag("sm-06") },
          { code: "sm-07", name: "Montegiardino",  flagUrl: flag("sm-07") },
          { code: "sm-08", name: "San Marino",     flagUrl: flag("sm-08") },
          { code: "sm-09", name: "Serravalle",     flagUrl: flag("sm-09") },
        ],
      },

      // ── Vatican City (4 areas) ───────────────────────────────────────────
      {
        code: "VA", name: "Vatican City", emoji: "🇻🇦", subTitle: "4 Areas", locked: false,
        subRegions: [
          { code: "va-vt", name: "Vatican Hill",   flagUrl: flag("va-vt") },
          { code: "va-pa", name: "Papal Gardens",  flagUrl: flag("va-pa") },
          { code: "va-st", name: "St. Peter's",    flagUrl: flag("va-st") },
          { code: "va-ca", name: "Castel Gandolfo",flagUrl: flag("va-ca") },
        ],
      },
    ],
  },
]

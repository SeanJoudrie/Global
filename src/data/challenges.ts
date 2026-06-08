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
]

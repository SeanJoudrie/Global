export interface FlagRecord {
  code: string
  name: string
  region: 'Europe' | 'Africa' | 'Asia' | 'Americas' | 'Oceania' | 'Middle East'
  subdivisionGroup: string | null
  flagUrl: string
  confusableWith: string[]
  distinguishingTip: string
  funFact: string
}

export const FLAGS: FlagRecord[] = [
  // ── AFRICA ────────────────────────────────────────────────
  {
    code: 'TD', name: 'Chad', region: 'Africa', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/td.png',
    confusableWith: ['RO', 'AD', 'MD'],
    distinguishingTip: "Chad's blue is darker and sits on the LEFT; Romania's blue is brighter and Chad's proportions are slightly taller.",
    funFact: "Lake Chad, which borders Chad, was once one of the largest lakes in the world but has shrunk by 90% since the 1960s.",
  },
  {
    code: 'GH', name: 'Ghana', region: 'Africa', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/gh.png',
    confusableWith: ['SN', 'ML', 'CM'],
    distinguishingTip: "Ghana has a single black star in the centre of a red-gold-green horizontal tricolour. Senegal has a green star on white-green-red.",
    funFact: "Ghana was the first sub-Saharan African country to gain independence from colonial rule, in 1957.",
  },
  {
    code: 'SN', name: 'Senegal', region: 'Africa', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/sn.png',
    confusableWith: ['ML', 'GH', 'GM'],
    distinguishingTip: "Senegal is green-yellow-red with a GREEN star. Mali is identical stripes but has NO star.",
    funFact: "Dakar, Senegal's capital, was the finish line of the famous Paris-Dakar Rally for nearly 30 years.",
  },
  {
    code: 'ML', name: 'Mali', region: 'Africa', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/ml.png',
    confusableWith: ['SN', 'GN', 'CM'],
    distinguishingTip: "Mali is green-yellow-red with NO central symbol. Senegal has a green star, Guinea has the same colours reversed.",
    funFact: "Timbuktu, a city in Mali, was once one of the wealthiest cities in the world and a major centre of Islamic scholarship.",
  },
  {
    code: 'BF', name: 'Burkina Faso', region: 'Africa', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/bf.png',
    confusableWith: ['CN', 'VN', 'SU'],
    distinguishingTip: "Burkina Faso has horizontal red-green stripes with a YELLOW five-pointed star in the centre — not a plain red field like China or Vietnam.",
    funFact: "Burkina Faso means 'Land of Incorruptible People' in the Mossi and Dioula languages.",
  },
  {
    code: 'ZA', name: 'South Africa', region: 'Africa', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/za.png',
    confusableWith: ['ZW', 'ER'],
    distinguishingTip: "South Africa has a unique Y-shaped green chevron splitting red-blue horizontals from a black-yellow-white wedge at the hoist.",
    funFact: "South Africa has THREE capital cities: Pretoria (executive), Cape Town (legislative), and Bloemfontein (judicial).",
  },
  {
    code: 'ET', name: 'Ethiopia', region: 'Africa', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/et.png',
    confusableWith: ['GH', 'CM', 'SN'],
    distinguishingTip: "Ethiopia is green-yellow-red (top to bottom) with a blue disc and yellow star in the centre.",
    funFact: "Ethiopia is the only African country never to be colonised — it successfully defeated Italy at the Battle of Adwa in 1896.",
  },
  {
    code: 'NG', name: 'Nigeria', region: 'Africa', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/ng.png',
    confusableWith: ['SB', 'GN'],
    distinguishingTip: "Nigeria is simply two vertical green stripes flanking a white centre — no symbol, no other colours.",
    funFact: "Nigeria is Africa's most populous country and home to more than 500 distinct languages.",
  },
  // ── EUROPE ────────────────────────────────────────────────
  {
    code: 'RO', name: 'Romania', region: 'Europe', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/ro.png',
    confusableWith: ['TD', 'AD', 'MD'],
    distinguishingTip: "Romania's blue is brighter and more cobalt. Chad's blue is darker. Romania's flag is wider (2:3 ratio).",
    funFact: "Romania is home to 'Dracula's Castle' — Bran Castle — but Vlad the Impaler, the inspiration for Dracula, barely visited it.",
  },
  {
    code: 'AD', name: 'Andorra', region: 'Europe', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/ad.png',
    confusableWith: ['TD', 'RO', 'MD'],
    distinguishingTip: "Andorra has blue-yellow-red vertical stripes with a coat of arms in the yellow centre band.",
    funFact: "Andorra has no army of its own and relies on France and Spain for defence. It is one of the smallest countries in Europe.",
  },
  {
    code: 'MD', name: 'Moldova', region: 'Europe', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/md.png',
    confusableWith: ['RO', 'TD', 'AD'],
    distinguishingTip: "Moldova looks like Romania (blue-yellow-red) but has an eagle with a shield in the centre of the yellow stripe.",
    funFact: "Moldova produces more wine per capita than any other country in the world.",
  },
  {
    code: 'NL', name: 'Netherlands', region: 'Europe', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/nl.png',
    confusableWith: ['LU', 'RU', 'FR'],
    distinguishingTip: "Netherlands is red-white-blue (top to bottom). Luxembourg looks identical but has a lighter blue. Russia's is also red-white-blue but HORIZONTAL.",
    funFact: "The Netherlands has more bicycles than people — about 23 million bikes for 17 million residents.",
  },
  {
    code: 'LU', name: 'Luxembourg', region: 'Europe', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/lu.png',
    confusableWith: ['NL', 'FR'],
    distinguishingTip: "Luxembourg is nearly identical to the Netherlands but the blue stripe is lighter — more sky blue vs. navy. Luxembourg is also slightly wider.",
    funFact: "Luxembourg has the highest GDP per capita in the world, largely due to its financial sector.",
  },
  {
    code: 'DE', name: 'Germany', region: 'Europe', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/de.png',
    confusableWith: ['BE', 'YE', 'EH'],
    distinguishingTip: "Germany is horizontal black-red-gold. Belgium is VERTICAL black-yellow-red. Yemen is horizontal red-white-black.",
    funFact: "Germany has over 1,500 different types of beer and about 1,300 breweries.",
  },
  {
    code: 'BE', name: 'Belgium', region: 'Europe', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/be.png',
    confusableWith: ['DE', 'TD', 'CM'],
    distinguishingTip: "Belgium is VERTICAL black-yellow-red stripes. Germany's similar colours are HORIZONTAL.",
    funFact: "Belgium invented french fries — they call them 'frites' and consider the American name a misattribution.",
  },
  {
    code: 'FR', name: 'France', region: 'Europe', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/fr.png',
    confusableWith: ['NL', 'IT', 'IE'],
    distinguishingTip: "France is vertical blue-white-red. Italy is vertical green-white-red. Ireland is also vertical but green-white-ORANGE.",
    funFact: "France is the most visited country in the world, receiving around 90 million tourists a year.",
  },
  {
    code: 'IT', name: 'Italy', region: 'Europe', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/it.png',
    confusableWith: ['FR', 'IE', 'MX'],
    distinguishingTip: "Italy is vertical green-white-red. France is blue-white-red. Ireland is green-white-orange.",
    funFact: "Italy is home to more UNESCO World Heritage Sites than any other country in the world — 58 as of 2023.",
  },
  {
    code: 'IE', name: 'Ireland', region: 'Europe', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/ie.png',
    confusableWith: ['IT', 'CI', 'MX'],
    distinguishingTip: "Ireland is green-white-ORANGE (right side is orange, not red). Côte d'Ivoire is the REVERSE: orange-white-green.",
    funFact: "Ireland is one of the only countries where Halloween — based on the Celtic festival Samhain — actually originated.",
  },
  {
    code: 'NO', name: 'Norway', region: 'Europe', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/no.png',
    confusableWith: ['IS', 'DK', 'FI'],
    distinguishingTip: "Norway is red with a blue-bordered white Nordic cross offset to the left. Iceland swaps the colours: blue with a red-bordered white cross.",
    funFact: "Norway's sovereign wealth fund — the Government Pension Fund Global — is the largest in the world at over $1.4 trillion.",
  },
  {
    code: 'DK', name: 'Denmark', region: 'Europe', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/dk.png',
    confusableWith: ['NO', 'CH', 'IS'],
    distinguishingTip: "Denmark (Dannebrog) is red with a white Nordic cross. Switzerland is a square red flag with a white PLUS sign, not a cross touching edges.",
    funFact: "The Danish flag, the Dannebrog, is the oldest continuously used national flag in the world, dating to 1219.",
  },
  {
    code: 'CH', name: 'Switzerland', region: 'Europe', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/ch.png',
    confusableWith: ['DK', 'VA'],
    distinguishingTip: "Switzerland's flag is SQUARE (not rectangular) with a bold white plus/cross that does NOT reach the edges. Denmark's cross reaches all four edges.",
    funFact: "Switzerland has not been at war with another country since 1815, making it one of the world's oldest neutral nations.",
  },
  // ── ASIA ────────────────────────────────────────────────
  {
    code: 'CN', name: 'China', region: 'Asia', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/cn.png',
    confusableWith: ['VN', 'BF', 'TR'],
    distinguishingTip: "China is red with one large yellow star and four small ones in the top-left. Vietnam is red with a single large yellow star in the centre.",
    funFact: "China is the world's oldest continuous civilisation, with a recorded history of over 5,000 years.",
  },
  {
    code: 'VN', name: 'Vietnam', region: 'Asia', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/vn.png',
    confusableWith: ['CN', 'BF', 'TR'],
    distinguishingTip: "Vietnam is plain red with ONE large five-pointed yellow star centred. China has FIVE stars clustered in the upper-left.",
    funFact: "Vietnam is one of the world's largest exporters of coffee, second only to Brazil.",
  },
  {
    code: 'JP', name: 'Japan', region: 'Asia', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/jp.png',
    confusableWith: ['BD', 'PW'],
    distinguishingTip: "Japan (Hinomaru) is white with a red circle slightly left of centre. Bangladesh is green with a red circle slightly left of centre.",
    funFact: "Japan has the world's oldest company — Kongō Gumi — a construction firm founded in 578 AD.",
  },
  {
    code: 'BD', name: 'Bangladesh', region: 'Asia', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/bd.png',
    confusableWith: ['JP', 'PW'],
    distinguishingTip: "Bangladesh is GREEN with a red disc offset slightly to the left. Japan is WHITE with a red disc in the same position.",
    funFact: "Bangladesh is home to the Sundarbans, the world's largest mangrove forest, shared with India.",
  },
  {
    code: 'IN', name: 'India', region: 'Asia', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/in.png',
    confusableWith: ['NE', 'IR'],
    distinguishingTip: "India is horizontal saffron-white-green with a blue 24-spoke Ashoka Chakra (wheel) in the white stripe.",
    funFact: "India invented the number zero, chess, and the decimal system.",
  },
  {
    code: 'KR', name: 'South Korea', region: 'Asia', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/kr.png',
    confusableWith: ['KP'],
    distinguishingTip: "South Korea (Taegukgi) is white with a red-blue yin-yang circle and four black trigrams in the corners.",
    funFact: "South Korea has the world's fastest average internet speed and is home to the largest indoor theme park.",
  },
  {
    code: 'ID', name: 'Indonesia', region: 'Asia', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/id.png',
    confusableWith: ['MC', 'SG', 'PL'],
    distinguishingTip: "Indonesia is horizontal red-over-white. Monaco is also red-over-white but in a 4:5 ratio. Poland is the REVERSE: white-over-red.",
    funFact: "Indonesia is the world's largest archipelago, comprising over 17,000 islands.",
  },
  {
    code: 'MC', name: 'Monaco', region: 'Europe', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/mc.png',
    confusableWith: ['ID', 'SG', 'PL'],
    distinguishingTip: "Monaco is red-over-white in a roughly 4:5 ratio. Indonesia uses the same colours but is wider (2:3). Poland is the REVERSE: white-over-red.",
    funFact: "Monaco is the world's most densely populated country and has no income tax.",
  },
  // ── AMERICAS ────────────────────────────────────────────
  {
    code: 'MX', name: 'Mexico', region: 'Americas', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/mx.png',
    confusableWith: ['IT', 'IE', 'CI'],
    distinguishingTip: "Mexico is green-white-red VERTICAL with a detailed coat of arms (eagle on cactus) in the white band.",
    funFact: "Mexico City is built on a former lake bed and sinks about 20 cm per year.",
  },
  {
    code: 'BR', name: 'Brazil', region: 'Americas', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/br.png',
    confusableWith: ['CO', 'EC', 'VE'],
    distinguishingTip: "Brazil has a unique green field with a yellow diamond, a blue circle with stars, and the motto 'ORDEM E PROGRESSO'.",
    funFact: "Brazil is the only country in the Americas to have Portuguese as its official language.",
  },
  {
    code: 'AR', name: 'Argentina', region: 'Americas', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/ar.png',
    confusableWith: ['UY', 'GT', 'HN'],
    distinguishingTip: "Argentina has light blue horizontal stripes with white, and a yellow 'Sun of May' in the centre.",
    funFact: "Argentina has produced more Nobel Prize winners in the sciences than any other Latin American country.",
  },
  {
    code: 'CA', name: 'Canada', region: 'Americas', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/ca.png',
    confusableWith: ['DK', 'US'],
    distinguishingTip: "Canada is red-white-red vertical with a red maple leaf in the white centre — completely unique.",
    funFact: "Canada has the longest coastline of any country, stretching over 202,000 km.",
  },
  {
    code: 'US', name: 'United States', region: 'Americas', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/us.png',
    confusableWith: ['LR', 'MY', 'CL'],
    distinguishingTip: "The US flag has 13 red-white stripes and a blue canton with 50 white stars in the upper left.",
    funFact: "The US flag has been redesigned 27 times as new states joined the union.",
  },
  // ── MIDDLE EAST ───────────────────────────────────────
  {
    code: 'AE', name: 'UAE', region: 'Middle East', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/ae.png',
    confusableWith: ['JO', 'EG', 'SD'],
    distinguishingTip: "UAE is green-white-black horizontal with a vertical red bar at the hoist (left side).",
    funFact: "The UAE is home to the world's tallest building, the Burj Khalifa, standing at 828 metres.",
  },
  {
    code: 'SA', name: 'Saudi Arabia', region: 'Middle East', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/sa.png',
    confusableWith: ['PK', 'LY'],
    distinguishingTip: "Saudi Arabia is dark green with white Arabic script (the Shahada) and a white sword below it.",
    funFact: "Saudi Arabia is the world's largest country with no river.",
  },
  {
    code: 'TR', name: 'Turkey', region: 'Middle East', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/tr.png',
    confusableWith: ['TN', 'PK', 'AZ'],
    distinguishingTip: "Turkey is red with a white crescent and a white five-pointed star. Tunisia is similar but has a red circle (disc) behind the crescent.",
    funFact: "Turkey bridges two continents — Istanbul straddles both Europe and Asia.",
  },
  // ── OCEANIA ───────────────────────────────────────────
  {
    code: 'AU', name: 'Australia', region: 'Oceania', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/au.png',
    confusableWith: ['NZ', 'FJ', 'TV'],
    distinguishingTip: "Australia has the Union Jack, a large 7-pointed Commonwealth Star below it, and the Southern Cross (5 stars) on the right. New Zealand's Southern Cross has only 4 stars.",
    funFact: "Australia is the only continent that is also a single country.",
  },
  {
    code: 'NZ', name: 'New Zealand', region: 'Oceania', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/nz.png',
    confusableWith: ['AU', 'FJ'],
    distinguishingTip: "New Zealand's flag has the Union Jack and 4 red stars (Southern Cross). Australia has 5 stars and a larger Commonwealth Star below the Union Jack.",
    funFact: "New Zealand was the first country to grant women the right to vote, in 1893.",
  },
  // Côte d'Ivoire (mirror of Ireland)
  {
    code: 'CI', name: "Côte d'Ivoire", region: 'Africa', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/ci.png',
    confusableWith: ['IE', 'IT', 'MX'],
    distinguishingTip: "Côte d'Ivoire is ORANGE-white-green (left to right). Ireland is the exact mirror: green-white-orange.",
    funFact: "Côte d'Ivoire produces about 40% of the world's cocoa supply.",
  },
  {
    code: 'PL', name: 'Poland', region: 'Europe', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/pl.png',
    confusableWith: ['ID', 'MC', 'SG'],
    distinguishingTip: "Poland is white-over-red (white on top). Indonesia and Monaco are red-over-white (red on top).",
    funFact: "Poland has the largest population of storks in Europe — around 25% of the world's white stork population.",
  },
  {
    code: 'GR', name: 'Greece', region: 'Europe', subdivisionGroup: null,
    flagUrl: 'https://flagcdn.com/w320/gr.png',
    confusableWith: ['HN', 'FI', 'SE'],
    distinguishingTip: "Greece has alternating blue and white horizontal stripes (9 stripes) with a blue canton holding a white cross in the upper left.",
    funFact: "Greece has more archaeological museums than any other country in the world.",
  },
]

export const REGIONS = ['Europe', 'Africa', 'Asia', 'Americas', 'Oceania', 'Middle East'] as const
export type Region = typeof REGIONS[number]

export function getFlagsByRegion(region: Region): FlagRecord[] {
  return FLAGS.filter(f => f.region === region)
}

export function getFlagByCode(code: string): FlagRecord | undefined {
  return FLAGS.find(f => f.code === code)
}

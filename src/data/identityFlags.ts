import { fp } from "./codex"

export type IdentityCategory =
  | "Pride & LGBTQ+"
  | "Civic & Ideological"
  | "Pan-National & Ethnic"
  | "Indigenous Peoples"
  | "Separatist & Autonomous"
  | "Micronations"
  | "Maritime & Signal"

export interface IdentityFlag {
  id: string
  name: string
  category: IdentityCategory
  flagUrl: string
  note: string
}

export const IDENTITY_FLAGS: IdentityFlag[] = [
  // ── Pride & Identity ────────────────────────────────────────────────────────
  {
    id: "pride-8", name: "Original 8-Stripe Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Gay_flag_8.svg"),
    note: "Gilbert Baker's original 1978 design for San Francisco's Gay Freedom Day. It had eight stripes, including hot pink (sex) and turquoise (magic), soon dropped for the six-stripe version.",
  },
  {
    id: "pride-6", name: "Rainbow Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Gay_Pride_Flag.svg"),
    note: "The globally recognized six-stripe rainbow — red, orange, yellow, green, blue, violet — simplified from Baker's original around 1979, partly due to fabric availability.",
  },
  {
    id: "pride-progress", name: "Progress Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("LGBTQ%2B_rainbow_flag_Quasar_%22Progress%22_variant.svg"),
    note: "Daniel Quasar's 2018 redesign adds a chevron of black and brown stripes (marginalized communities) plus the trans flag's blue, pink, and white to emphasize forward progress.",
  },
  {
    id: "pride-trans", name: "Transgender Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Transgender_Pride_flag.svg"),
    note: "Designed by Monica Helms in 1999. Its light blue, pink, and white stripes are symmetrical, so the flag is always correct no matter which way it is flown.",
  },
  {
    id: "pride-bi", name: "Bisexual Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Bisexual_Pride_Flag.svg"),
    note: "Michael Page's 1998 design: magenta for same-gender attraction, blue for opposite-gender, and an overlapping purple stripe for attraction across the spectrum.",
  },
  {
    id: "pride-pan", name: "Pansexual Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Pansexuality_Pride_Flag.svg"),
    note: "A pink-yellow-cyan tricolor from around 2010, where the central yellow stripe represents attraction to non-binary and all other gender identities.",
  },
  {
    id: "pride-ace", name: "Asexual Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Asexual_Pride_Flag.svg"),
    note: "Created by the AVEN community in 2010: black for asexuality, grey for the grey-area, white for allies and partners, and purple for community.",
  },
  {
    id: "pride-nb", name: "Non-Binary Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Nonbinary_flag.svg"),
    note: "Designed by 17-year-old Kye Rowan in 2014: yellow for genders outside the binary, white for all genders, purple for a mix, and black for agender.",
  },
  {
    id: "philadelphia-pride", name: "Philadelphia Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Philadelphia_Pride_Flag.svg"),
    note: "The 2017 'More Color, More Pride' flag added black and brown stripes above the rainbow to explicitly honor LGBTQ+ people of color.",
  },
  {
    id: "intersex-progress", name: "Intersex-Inclusive Progress Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Intersex-inclusive_pride_flag.svg"),
    note: "Valentino Vecchietti's 2021 update adds a yellow triangle with a purple circle (the intersex symbol) to the Progress chevron — the current leading standard.",
  },
  {
    id: "lesbian-sunset", name: "Lesbian Flag (Sunset)", category: "Pride & LGBTQ+",
    flagUrl: fp("Lesbian_pride_flag_2018.svg"),
    note: "The current community-standard lesbian flag (2018), with sunset stripes from orange (gender non-conformity) through white to pink (femininity).",
  },
  {
    id: "lesbian-labrys", name: "Labrys Lesbian Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Labrys_Lesbian_Flag.svg"),
    note: "A 1999 design: a white labrys (double-headed Amazonian axe) over a reclaimed black triangle on violet, rooted in lesbian-feminist symbolism.",
  },
  {
    id: "lesbian-lipstick", name: "Lipstick Lesbian Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Lipstick_lesbian_Pride_Flag.svg"),
    note: "A 2010 flag of pink and red stripes with a red lip-kiss mark; later largely retired for excluding butch lesbians and over controversy about its creator.",
  },
  {
    id: "lesbian-pink", name: "Pink Lesbian Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Lesbian_Pride_pink_flag.svg"),
    note: "The lipstick flag with the kiss mark removed — widely circulated through the 2010s before the sunset flag became the accepted standard.",
  },
  {
    id: "achillean", name: "Achillean / MLM Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("MLM_flag.svg"),
    note: "A men-loving-men flag with two green carnations — a nod to Oscar Wilde, who wore a green carnation to subtly signal his orientation.",
  },
  {
    id: "gay-mens", name: "Gay Men's Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("New_Gay_Pride_Flag.svg"),
    note: "A 2019 counterpart to the sunset lesbian flag, with green-to-blue stripes for community, healing, and diversity among gay and queer men.",
  },
  {
    id: "polysexual", name: "Polysexual Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Polysexuality_Pride_Flag.svg"),
    note: "Attraction to multiple — but not necessarily all — genders. A 2012 pink-green-blue tricolor.",
  },
  {
    id: "omnisexual", name: "Omnisexual Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Omnisexual_Pride-Flag.svg"),
    note: "Attraction to all genders, where gender is still a factor (unlike pansexuality). Five stripes from light pink through dark purple to light blue.",
  },
  {
    id: "aromantic", name: "Aromantic Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Aromantic_Pride_Flag.svg"),
    note: "For those who experience little or no romantic attraction. The 2014 design uses dark and light green, white, grey, and black stripes.",
  },
  {
    id: "demisexual", name: "Demisexual Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Demisexual_Pride_Flag.svg"),
    note: "For attraction that forms only after a deep emotional bond: a black hoist triangle, white and grey halves, and a purple central stripe.",
  },
  {
    id: "demiromantic", name: "Demiromantic Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Demiromantic_Pride_Flag.svg"),
    note: "The romantic-attraction counterpart to demisexual, mirroring its layout but using green in place of purple.",
  },
  {
    id: "graysexual", name: "Graysexual Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Grey_asexuality_flag.svg"),
    note: "For the spectrum between asexual and allosexual — attraction felt rarely or only under specific conditions. Purple-grey-white-grey-purple stripes.",
  },
  {
    id: "abrosexual", name: "Abrosexual Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Abrosexual_flag.svg"),
    note: "For an orientation that is fluid and changes over time, with green-to-pink stripes.",
  },
  {
    id: "genderqueer", name: "Genderqueer Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Genderqueer_Pride_Flag.svg"),
    note: "Marilyn Roxie's 2011 design: lavender for androgyny, white for agender identity, and chartreuse green for identities outside the binary.",
  },
  {
    id: "genderfluid", name: "Genderfluid Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Genderfluidity_Pride-Flag.svg"),
    note: "For a gender identity that fluctuates over time, with pink, white, purple, black, and blue stripes (2012).",
  },
  {
    id: "agender", name: "Agender Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Agender_pride_flag.svg"),
    note: "A symmetrical seven-stripe flag (2014) for the absence of gender: black and white for no gender, grey for partial, and green for non-binary.",
  },
  {
    id: "bigender", name: "Bigender Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Bigender_Flag.svg"),
    note: "For identifying as two genders at once or fluctuating between them, in shades of pink, purple, white, and blue.",
  },
  {
    id: "intersex", name: "Intersex Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Intersex_Pride_Flag.svg"),
    note: "Morgan Carpenter's 2013 design: a purple circle on golden yellow, deliberately avoiding pink and blue, symbolizing wholeness and bodily autonomy.",
  },
  {
    id: "two-spirit", name: "Two-Spirit Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Two-Spirit_Flag.svg"),
    note: "A pan-Indigenous North American umbrella term for traditional third-gender roles; the flag pairs two feathers with a circle over a rainbow field.",
  },
  {
    id: "poly-original", name: "Polyamory Flag (1995)", category: "Pride & LGBTQ+",
    flagUrl: fp("Polyamory_Pride_Flag.svg"),
    note: "Jim Evans's 1995 design — blue (honesty), red (love), black (solidarity) — with a gold Greek pi for 'infinite love'.",
  },
  {
    id: "poly-modern", name: "Polyamory Flag (2022)", category: "Pride & LGBTQ+",
    flagUrl: fp("Polyamory_flag_with_infinity_heart.svg"),
    note: "A widely adopted 2022 redesign: a red-blue-black tricolor with a white infinity-heart at the center.",
  },
  {
    id: "straight-ally", name: "Straight Ally Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Straight_Ally_flag.svg"),
    note: "Black-and-white stripes (straight/cis identity) with a rainbow-filled 'A' for ally, showing support for the LGBTQ+ community.",
  },

  // ── Civic & Ideological ─────────────────────────────────────────────────────
  {
    id: "thin-blue-line", name: "Thin Blue Line", category: "Civic & Ideological",
    flagUrl: fp("Thin_Blue_Line_Flag_(United_States).svg"),
    note: "A monochrome US flag with a single blue stripe, used to signal solidarity with law enforcement — and a lightning rod in debates over policing.",
  },
  {
    id: "thin-red-line", name: "Thin Red Line", category: "Civic & Ideological",
    flagUrl: fp("Thin_Red_Line_Flag_(United_States).svg"),
    note: "The same monochrome US-flag concept with a red stripe, representing firefighters and the fire service.",
  },
  {
    id: "gadsden", name: "Gadsden Flag", category: "Civic & Ideological",
    flagUrl: fp("Gadsden_flag.svg"),
    note: "A 1775 American Revolutionary banner — a coiled rattlesnake over 'DONT TREAD ON ME' on yellow — that has become a major modern symbol of individualism and protest.",
  },
  {
    id: "ancap", name: "Anarcho-Capitalism Flag", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_Anarcho-capitalism.svg"),
    note: "A diagonal black-and-gold split: black for anarchism, gold for the free market. A staple of online libertarian iconography.",
  },
  {
    id: "ancom", name: "Anarcho-Communism Flag", category: "Civic & Ideological",
    flagUrl: fp("Anarchist_flag.svg"),
    note: "The diagonal black-and-red flag of anarcho-communism and anarcho-syndicalism: black for anarchism, red for the labor and socialist movement.",
  },
  {
    id: "antifa", name: "Antifa (Antifaschistische Aktion)", category: "Civic & Ideological",
    flagUrl: fp("Antifaschistische_Aktion_logo.svg"),
    note: "Two flags — one red, one black — in a circle, derived from a 1932 German Communist Party anti-fascist emblem and revived worldwide decades later.",
  },
  {
    id: "earth-flag", name: "Flag of Earth (McConnell)", category: "Civic & Ideological",
    flagUrl: fp("John_McConnell%27s_Flag_of_Earth_1970.svg"),
    note: "John McConnell's 1969 Earth Day flag: NASA's 'Blue Marble' photograph of Earth on a dark blue field, an emblem of the environmental movement.",
  },
  {
    id: "esperanto", name: "Esperanto Flag", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_Esperanto.svg"),
    note: "The green flag with a white canton and green 'verda stelo' star, adopted in 1905 as the symbol of the international constructed language and its movement.",
  },
  {
    id: "francophonie", name: "La Francophonie", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_La_Francophonie.svg"),
    note: "The emblem of the international organization of French-speaking nations: five interlocking colored arcs forming a ring on white.",
  },
  {
    id: "jolly-roger", name: "Jolly Roger", category: "Civic & Ideological",
    flagUrl: fp("Jolly-roger.svg"),
    note: "The classic black pirate flag with a white skull over crossed bones — historically a signal of 'no quarter', now a universal pop-culture symbol of rebellion.",
  },
  {
    id: "red-cross", name: "Red Cross", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_the_Red_Cross.svg"),
    note: "A red cross on white, protected under the Geneva Conventions as a symbol of medical neutrality — the reverse of the Swiss flag, honoring the movement's Swiss founder.",
  },
  {
    id: "red-crescent", name: "Red Crescent", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_the_Red_Crescent.svg"),
    note: "The equivalent humanitarian emblem used across much of the Muslim world, carrying the same protected status as the Red Cross.",
  },
  {
    id: "red-crystal", name: "Red Crystal", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_the_Red_Crystal.svg"),
    note: "A neutral third emblem — a red diamond outline on white — adopted in 2005 for contexts where neither the cross nor crescent is acceptable.",
  },

  // ── Pan-National & Ethnic ───────────────────────────────────────────────────
  {
    id: "pan-arab", name: "Pan-Arab Flag (Arab Revolt)", category: "Pan-National & Ethnic",
    flagUrl: fp("Flag_arab_revolution.svg"),
    note: "The 1916 Arab Revolt flag — black, green, and white stripes with a red hoist triangle — the source of the pan-Arab colors used by many Arab national flags.",
  },
  {
    id: "pan-slavic", name: "Pan-Slavic Flag", category: "Pan-National & Ethnic",
    flagUrl: fp("Pan-Slavic_flag.svg"),
    note: "Adopted at the 1848 Prague Slavic Congress, this blue-white-red tricolor inspired the flags of Russia, Serbia, Slovakia, Slovenia, and others.",
  },
  {
    id: "pan-african", name: "Pan-African Flag (UNIA)", category: "Pan-National & Ethnic",
    flagUrl: fp("Flag_of_the_UNIA.svg"),
    note: "Marcus Garvey's 1920 red-black-green flag for the Universal Negro Improvement Association: red for blood, black for the people, green for the land.",
  },
  {
    id: "amazigh", name: "Berber / Amazigh Flag", category: "Pan-National & Ethnic",
    flagUrl: fp("Berber_flag.svg"),
    note: "Blue, green, and yellow bands with a red Yaz (ⵣ) — the Tifinagh letter for the free Amazigh people of North Africa.",
  },
  {
    id: "romani", name: "Romani Flag", category: "Pan-National & Ethnic",
    flagUrl: fp("Flag_of_the_Romani_people.svg"),
    note: "Adopted at the 1971 World Romani Congress: blue sky over green earth with a red 16-spoke chakra echoing the wheel of the Indian flag, marking Romani origins in India.",
  },
  {
    id: "sami", name: "Sámi Flag", category: "Pan-National & Ethnic",
    flagUrl: fp("Sami_flag.svg"),
    note: "The flag of the indigenous Sámi of northern Scandinavia, adopted in 1986; its offset circle represents the sun (red) and moon (blue).",
  },
  {
    id: "assyrian", name: "Assyrian Flag", category: "Pan-National & Ethnic",
    flagUrl: fp("Flag_of_the_Assyrians.svg"),
    note: "A golden star of Shamash with red and blue wavy rays radiating to the four corners, the modern emblem of the Assyrian people.",
  },
  {
    id: "syriac", name: "Syriac-Aramean Flag", category: "Pan-National & Ethnic",
    flagUrl: fp("Flag_of_the_Syriac-Aramaic_People.svg"),
    note: "A red field with a golden winged sun disc based on an ancient Tell Halaf relief, used by the Syriac-Aramean people.",
  },
  {
    id: "circassian", name: "Circassian Flag", category: "Pan-National & Ethnic",
    flagUrl: fp("Circassian_flag.svg"),
    note: "A green field with twelve gold stars (for the historic Circassian tribes) over three crossed arrows, dating to the 19th-century Caucasian War.",
  },
  {
    id: "druze", name: "Druze Flag", category: "Pan-National & Ethnic",
    flagUrl: fp("Flag_of_Druze.svg"),
    note: "Five colors for the five cosmic principles of the Druze faith: green (mind), red (soul), yellow (word), blue (will), and white (realization).",
  },

  // ── Indigenous Peoples ──────────────────────────────────────────────────────
  {
    id: "mapuche", name: "Mapuche Flag (Wenüfoye)", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Mapuches_(1992).svg"),
    note: "The 1992 flag of the Mapuche people of Chile and Argentina, centered on a kultrun drag and a stepped cross (guñelve) star.",
  },
  {
    id: "maori", name: "Māori Flag (Tino Rangatiratanga)", category: "Indigenous Peoples",
    flagUrl: fp("Tino_Rangatiratanga_Maori_Flag.svg"),
    note: "Designed in 1990, this black-red-white koru flag was recognized by the New Zealand government in 2009 as the national Māori flag.",
  },
  {
    id: "aboriginal-au", name: "Australian Aboriginal Flag", category: "Indigenous Peoples",
    flagUrl: fp("Australian_Aboriginal_Flag.svg"),
    note: "Harold Thomas's 1971 design — black for the people, red for the earth, a yellow sun — became an official flag of Australia; its copyright was freed to the public in 2022.",
  },
  {
    id: "torres-strait", name: "Torres Strait Islander Flag", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Torres_Strait_Islanders.svg"),
    note: "Bernard Namok's 1992 design with a white dhari (headdress) and a five-pointed star for the island groups, between green stripes for the land.",
  },
  {
    id: "vergina", name: "Sun of Vergina (Macedonian Greeks)", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_Greek_Macedonia.svg"),
    note: "A 16-rayed golden sun on blue — the Argead star found at the royal tombs of Vergina — used as an emblem of Greek Macedonia.",
  },
  {
    id: "kanaka-maoli", name: "Kanaka Maoli (Native Hawaiian)", category: "Indigenous Peoples",
    flagUrl: fp("Kanaka_Maoli_flag.svg"),
    note: "An indigenous Hawaiian flag with a green-red-yellow field and a central shield flanked by crossed kāhili (royal standards) over a paddle.",
  },
  {
    id: "wiphala-id", name: "Wiphala", category: "Indigenous Peoples",
    flagUrl: fp("Wiphala.svg"),
    note: "The 7×7 rainbow checkerboard of the Andean peoples, now an official dual flag of Bolivia alongside the tricolor.",
  },

  // ── Separatist & Autonomous ─────────────────────────────────────────────────
  {
    id: "estelada-blava", name: "Estelada Blava (Catalonia)", category: "Separatist & Autonomous",
    flagUrl: fp("Estelada_blava.svg"),
    note: "The Catalan independence flag: the red-and-yellow Senyera with a blue triangle and white star at the hoist, inspired by the Cuban and Puerto Rican flags.",
  },
  {
    id: "estelada-vermella", name: "Estelada Vermella (Catalonia)", category: "Separatist & Autonomous",
    flagUrl: fp("Estelada_roja.svg"),
    note: "The left-wing, socialist variant of the Catalan independence flag, with a yellow triangle and a red star.",
  },
  {
    id: "ikurrina", name: "Ikurriña (Basque Country)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_the_Basque_Country.svg"),
    note: "Designed by the Arana brothers in 1894: a red field with a green saltire and white cross, now the official flag of the Basque Autonomous Community.",
  },
  {
    id: "kurdistan", name: "Kurdistan (Ala Rengîn)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Kurdistan.svg"),
    note: "Red-white-green stripes with a 21-ray golden sun (Roj). It is the official flag of Iraqi Kurdistan and a symbol for Kurds across the region.",
  },
  {
    id: "somaliland", name: "Somaliland", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Somaliland.svg"),
    note: "The flag of the self-declared republic that broke from Somalia in 1991: green with the Islamic shahada, white, and red with a black star. Recognized by no UN member.",
  },
  {
    id: "transnistria", name: "Transnistria", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Transnistria_(state).svg"),
    note: "The breakaway sliver of Moldova is the only territory still officially flying the Soviet hammer and sickle on its flag.",
  },
  {
    id: "abkhazia", name: "Abkhazia", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_the_Republic_of_Abkhazia.svg"),
    note: "The breakaway Georgian region's flag: seven green and white stripes with a red canton bearing an open hand and seven stars.",
  },
  {
    id: "south-ossetia", name: "South Ossetia", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_South_Ossetia.svg"),
    note: "A white-red-yellow tricolor shared with North Ossetia in Russia, flown by the breakaway Georgian region recognized by only a handful of states.",
  },
  {
    id: "trnc", name: "Northern Cyprus (TRNC)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_the_Turkish_Republic_of_Northern_Cyprus.svg"),
    note: "An inverted-color Turkish flag with two red stripes, used by the Turkish-occupied north of Cyprus, recognized only by Turkey.",
  },
  {
    id: "east-turkestan", name: "East Turkestan (Kökbayraq)", category: "Separatist & Autonomous",
    flagUrl: fp("Kokbayraq_flag.svg"),
    note: "A sky-blue flag with a white crescent and star, the banner of the Uyghur independence movement in China's Xinjiang region.",
  },
  {
    id: "ichkeria", name: "Chechen Republic of Ichkeria", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_the_Chechen_Republic_of_Ichkeria.svg"),
    note: "The green flag of the 1990s separatist Chechen republic, still flown by those who reject Russian rule over Chechnya.",
  },
  {
    id: "west-papua", name: "West Papua (Morning Star)", category: "Separatist & Autonomous",
    flagUrl: fp("Morning_Star_flag.svg"),
    note: "The Morning Star flag of the West Papuan independence movement, first raised in 1961; raising it in Indonesia can bring a long prison sentence.",
  },
  {
    id: "kanaky", name: "Kanaky (FLNKS)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_FLNKS.svg"),
    note: "The Kanak independence flag of New Caledonia, with a yellow sun and a flèche faîtière roof-spear, flown officially alongside the French tricolor.",
  },
  {
    id: "azawad", name: "Azawad", category: "Separatist & Autonomous",
    flagUrl: fp("Drapeau_de_l%27Azawad.svg"),
    note: "The flag of the Tuareg state declared in northern Mali in 2012, which survived only months before being overrun.",
  },
  {
    id: "ambazonia", name: "Ambazonia", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_the_Federal_Republic_of_Southern_Cameroons.svg"),
    note: "The blue-and-white flag with a dove and thirteen stars, declared by separatists in Cameroon's English-speaking regions.",
  },
  {
    id: "cabinda", name: "Cabinda", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_the_Republic_of_Cabinda.svg"),
    note: "The flag of the oil-rich Angolan exclave whose separatists have long sought independence, bearing the Simulambuco monument.",
  },
  {
    id: "gagauzia", name: "Gagauzia", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Gagauzia.svg"),
    note: "The flag of the Turkic Christian autonomous region of Moldova: blue-white-red with three yellow stars at the hoist.",
  },
  {
    id: "ryukyu-indep", name: "Ryukyu Independence", category: "Separatist & Autonomous",
    flagUrl: fp("Ryukyu_independence_flag.svg"),
    note: "A blue flag with the Shō dynasty's three-comma mitsudomoe, used by advocates of independence for Okinawa and the Ryukyu Islands.",
  },
  {
    id: "cascadia", name: "Cascadia (Doug Flag)", category: "Separatist & Autonomous",
    flagUrl: fp("Cascadia_WM.svg"),
    note: "The blue-white-green 'Doug' flag with a Douglas fir, emblem of the Pacific Northwest bioregional movement spanning the US and Canada.",
  },

  // ── Micronations ────────────────────────────────────────────────────────────
  {
    id: "sealand", name: "Principality of Sealand", category: "Micronations",
    flagUrl: fp("Flag_of_Sealand.svg"),
    note: "A WWII anti-aircraft platform off the English coast, declared a principality in 1967 and still defended by the Bates family.",
  },
  {
    id: "molossia", name: "Republic of Molossia", category: "Micronations",
    flagUrl: fp("Flag_of_the_Republic_of_Molossia.svg"),
    note: "A tongue-in-cheek micronation in the Nevada desert led by 'President' Kevin Baugh, with its own currency, time zone, and tiny navy.",
  },
  {
    id: "seborga", name: "Principality of Seborga", category: "Micronations",
    flagUrl: fp("Flag_of_the_Principality_of_Seborga.svg"),
    note: "A Ligurian village that claims it was never legally part of unified Italy, electing its own prince since the 1960s.",
  },
  {
    id: "christiania", name: "Freetown Christiania", category: "Micronations",
    flagUrl: fp("Flag_of_Christiania.svg"),
    note: "A self-governing squatter commune in Copenhagen since 1971; its red flag's three yellow dots are the dots over the i's in 'Christiania'.",
  },
  {
    id: "hutt-river", name: "Principality of Hutt River", category: "Micronations",
    flagUrl: fp("Hutt_River_Flag.svg"),
    note: "An Australian farm that 'seceded' in 1970 over a wheat-quota dispute, running as a principality for 50 years before closing in 2020.",
  },
  {
    id: "rose-island", name: "Republic of Rose Island", category: "Micronations",
    flagUrl: fp("Rose_Island_Micronation_flag.svg"),
    note: "A 1968 artificial platform in the Adriatic that declared independence in Esperanto, before the Italian navy demolished it months later.",
  },
  {
    id: "conch-republic", name: "Conch Republic (Key West)", category: "Micronations",
    flagUrl: fp("Flag_of_Key_West,_Florida.svg"),
    note: "Key West mock-seceded in 1982 to protest a US Border Patrol roadblock, adopting the motto 'We Seceded Where Others Failed'.",
  },
  {
    id: "talossa", name: "Kingdom of Talossa", category: "Micronations",
    flagUrl: fp("Flag_of_the_Kingdom_of_Talossa.svg"),
    note: "Founded by a 14-year-old in his Milwaukee bedroom in 1979, Talossa even invented its own elaborate constructed language.",
  },
  {
    id: "aerican", name: "Aerican Empire", category: "Micronations",
    flagUrl: fp("Flag_of_Aerica.svg"),
    note: "A whimsical micronation founded in 1987 that claims a piece of Mars and Pluto; its flag bears a giant yellow smiley face.",
  },
  {
    id: "asgardia", name: "Asgardia (Space Nation)", category: "Micronations",
    flagUrl: fp("Flag_of_the_Asgardia.svg"),
    note: "A proposed 'space nation' founded in 2016 that has launched a small satellite and claims hundreds of thousands of online citizens.",
  },
  {
    id: "liberland", name: "Liberland", category: "Micronations",
    flagUrl: fp("Flag_of_Liberland.svg"),
    note: "A libertarian micronation proclaimed in 2015 on a disputed scrap of land between Croatia and Serbia that neither country claims.",
  },
  {
    id: "atlantium", name: "Empire of Atlantium", category: "Micronations",
    flagUrl: fp("Bandera_d%27Atlantium.svg"),
    note: "An Australian-based micronation promoting global citizenship, whose flag bears a lemniscate (infinity) symbol.",
  },
  {
    id: "glacier-republic", name: "Glacier Republic", category: "Micronations",
    flagUrl: fp("Glacier_Republic_Flag.svg"),
    note: "A 2014 Greenpeace stunt-state planted on an Andean glacier to highlight a legal gap in Chile's protection of its glaciers.",
  },

  // ── Maritime & Signal ───────────────────────────────────────────────────────
  // The 26 International Code of Signals flags. Each has a meaning when flown alone.
  {
    id: "ics-alpha", name: "Alpha (A)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Alpha.svg"),
    note: "Blue-and-white swallowtail. Flown alone it means 'I have a diver down; keep well clear at slow speed' — also the international diver-down flag.",
  },
  {
    id: "ics-bravo", name: "Bravo (B)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Bravo.svg"),
    note: "A red swallowtail. Alone: 'I am taking in, discharging, or carrying dangerous goods.'",
  },
  {
    id: "ics-charlie", name: "Charlie (C)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Charlie.svg"),
    note: "Blue-white-red-white-blue horizontal bands. Alone it means 'Affirmative — Yes.'",
  },
  {
    id: "ics-delta", name: "Delta (D)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Delta.svg"),
    note: "Yellow-blue-yellow. Alone: 'Keep clear of me; I am manoeuvring with difficulty.'",
  },
  {
    id: "ics-echo", name: "Echo (E)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Echo.svg"),
    note: "Blue over red. Alone: 'I am altering my course to starboard.'",
  },
  {
    id: "ics-foxtrot", name: "Foxtrot (F)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Foxtrot.svg"),
    note: "A red diamond on white. Alone: 'I am disabled; communicate with me.'",
  },
  {
    id: "ics-golf", name: "Golf (G)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Golf.svg"),
    note: "Yellow and blue vertical stripes. Alone: 'I require a pilot.'",
  },
  {
    id: "ics-hotel", name: "Hotel (H)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Hotel.svg"),
    note: "White and red halves. Alone: 'I have a pilot on board.'",
  },
  {
    id: "ics-india", name: "India (I)", category: "Maritime & Signal",
    flagUrl: fp("ICS_India.svg"),
    note: "A black disc on yellow. Alone: 'I am altering my course to port.'",
  },
  {
    id: "ics-juliet", name: "Juliet (J)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Juliet.svg"),
    note: "Blue-white-blue. Alone: 'I am on fire and have dangerous cargo — keep clear.'",
  },
  {
    id: "ics-kilo", name: "Kilo (K)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Kilo.svg"),
    note: "Yellow and blue halves. Alone: 'I wish to communicate with you.'",
  },
  {
    id: "ics-lima", name: "Lima (L)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Lima.svg"),
    note: "A yellow-and-black checkerboard. Alone: 'You should stop your vessel instantly.'",
  },
  {
    id: "ics-mike", name: "Mike (M)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Mike.svg"),
    note: "A white saltire (X) on blue. Alone: 'My vessel is stopped and making no way.'",
  },
  {
    id: "ics-november", name: "November (N)", category: "Maritime & Signal",
    flagUrl: fp("ICS_November.svg"),
    note: "A blue-and-white checkerboard. Alone: 'Negative — No.'",
  },
  {
    id: "ics-oscar", name: "Oscar (O)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Oscar.svg"),
    note: "Red and yellow diagonal halves. Alone: 'Man overboard.'",
  },
  {
    id: "ics-papa", name: "Papa (P)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Papa.svg"),
    note: "The 'Blue Peter' — a white square on blue. In harbor: 'All aboard; the vessel is about to sail.'",
  },
  {
    id: "ics-quebec", name: "Quebec (Q)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Quebec.svg"),
    note: "A solid yellow flag. Alone: 'My vessel is healthy and I request free pratique (clearance to enter port).'",
  },
  {
    id: "ics-romeo", name: "Romeo (R)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Romeo.svg"),
    note: "A yellow cross on red. Used mainly in coded groups and to acknowledge signals.",
  },
  {
    id: "ics-sierra", name: "Sierra (S)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Sierra.svg"),
    note: "A blue square on white. Alone: 'I am operating astern propulsion' (engines going backward).",
  },
  {
    id: "ics-tango", name: "Tango (T)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Tango.svg"),
    note: "Red-white-blue vertical bands. Alone: 'Keep clear of me; I am engaged in pair trawling.'",
  },
  {
    id: "ics-uniform", name: "Uniform (U)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Uniform.svg"),
    note: "A red-and-white checkerboard. Alone it is an urgent warning: 'You are running into danger.'",
  },
  {
    id: "ics-victor", name: "Victor (V)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Victor.svg"),
    note: "A red saltire (X) on white. Alone: 'I require assistance.'",
  },
  {
    id: "ics-whiskey", name: "Whiskey (W)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Whiskey.svg"),
    note: "Blue-white-red nested squares. Alone: 'I require medical assistance.'",
  },
  {
    id: "ics-xray", name: "X-ray (X)", category: "Maritime & Signal",
    flagUrl: fp("ICS_X-ray.svg"),
    note: "A blue cross on white. Alone: 'Stop carrying out your intentions and watch for my signals.'",
  },
  {
    id: "ics-yankee", name: "Yankee (Y)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Yankee.svg"),
    note: "Yellow and red diagonal stripes. Alone: 'I am dragging my anchor.'",
  },
  {
    id: "ics-zulu", name: "Zulu (Z)", category: "Maritime & Signal",
    flagUrl: fp("ICS_Zulu.svg"),
    note: "Black, blue, red, and yellow triangles meeting at the center. Alone: 'I require a tug.'",
  },
  {
    id: "diver-down", name: "Diver Down (North America)", category: "Maritime & Signal",
    flagUrl: fp("Diver_Down_flag.svg"),
    note: "A red flag with a white diagonal stripe, used in North American waters to mark a diver below — the regional counterpart to the international Alpha flag.",
  },

  // ── More Indigenous Peoples ──────────────────────────────────────────────
  {
    id: "iroquois", name: "Iroquois Confederacy (Haudenosaunee)", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Iroquois_Confederacy.svg"),
    note: "Based on the Hiawatha Wampum Belt: a central white pine tree flanked by four squares on a purple field, representing the founding Mohawk, Oneida, Onondaga, Cayuga and Seneca nations. Still flown today — the Haudenosaunee even field their own lacrosse team under it.",
  },
  {
    id: "sami", name: "Sámi Flag (Sápmi)", category: "Indigenous Peoples",
    flagUrl: fp("Sami_flag.svg"),
    note: "Adopted in 1986 for the Sámi people of northern Scandinavia and Russia. The circle echoes a shaman's drum and the sun & moon; the red-green-yellow-blue draws on traditional gákti dress.",
  },
  {
    id: "metis", name: "Métis Nation Flag", category: "Indigenous Peoples",
    flagUrl: fp("Métis_flag.svg"),
    note: "A white infinity symbol on blue (a red variant also exists) — one of North America's oldest Indigenous flags, dating to about 1815. The infinity represents the joining of two peoples and the endurance of the Métis Nation.",
  },
  {
    id: "cherokee", name: "Cherokee Nation Flag", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Cherokee_Nation.svg"),
    note: "Orange field with the Great Seal ringed by seven yellow stars for the seven clans, plus a black star remembering those lost on the Trail of Tears.",
  },
  {
    id: "navajo", name: "Navajo Nation Flag", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Navajo_Nation.svg"),
    note: "Adopted 1968: a map of the Navajo Nation on a tan field, bounded by the four sacred mountains, with a rainbow arc of sovereignty over the homeland.",
  },

  // ── More Separatist & Autonomous ─────────────────────────────────────────
  {
    id: "tibet", name: "Tibet (Snow Lion Flag)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Tibet.svg"),
    note: "Two snow lions holding a flaming jewel before a sunburst mountain. Used by the Tibetan government until 1959 and by the government-in-exile today; banned within China.",
  },
  {
    id: "sadr", name: "Western Sahara (SADR)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_the_Sahrawi_Arab_Democratic_Republic.svg"),
    note: "Flag of the Sahrawi Arab Democratic Republic, claimed by the Polisario Front over Western Sahara — a pan-Arab tricolour with a red star and crescent.",
  },
  {
    id: "artsakh", name: "Artsakh (Nagorno-Karabakh)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Artsakh.svg"),
    note: "The Armenian tricolour with a white stepped pattern at the fly, used by the self-declared Republic of Artsakh until its dissolution in 2024.",
  },
  {
    id: "corsica", name: "Corsica (Moor's Head)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Corsica.svg"),
    note: "A black Moor's head with a white bandana on white — adopted by Corsican nationalist Pasquale Paoli in 1755 and a symbol of the island's autonomy movement.",
  },
  {
    id: "sardinia", name: "Sardinia (Four Moors)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Sardinia,_Italy.svg"),
    note: "The 'Four Moors' — a red St George's cross with a bandaged Moor's head in each quarter — flag of the autonomous region and Sardinian independence movements.",
  },
  {
    id: "brittany", name: "Brittany (Gwenn ha Du)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Brittany.svg"),
    note: "The 'White and Black': nine stripes for Brittany's historic dioceses and a field of black ermine spots. Designed in 1923, now the region's everyday flag.",
  },
  {
    id: "cornwall", name: "Cornwall (St Piran's Flag)", category: "Separatist & Autonomous",
    flagUrl: fp("Saint_Piran's_Flag.svg"),
    note: "A white cross on black, said to represent tin (white) running from ore (black). The banner of Cornish identity and the Cornish self-government movement.",
  },
  {
    id: "tamil-eelam", name: "Tamil Eelam", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Tamil_Eelam.svg"),
    note: "A roaring tiger before crossed rifles ringed by bayonets — emblem of the proposed independent Tamil state in north-east Sri Lanka.",
  },
  {
    id: "bougainville", name: "Bougainville", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Bougainville.svg"),
    note: "Flag of the autonomous region of Papua New Guinea that voted ~98% for independence in 2019; the central upe is a traditional ceremonial headdress.",
  },
  {
    id: "rojava", name: "Rojava (North & East Syria)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Rojava.svg"),
    note: "Flag of the Autonomous Administration of North and East Syria — a Kurdish-led, multi-ethnic self-governing region established during the Syrian civil war.",
  },

  // ── More Micronations ────────────────────────────────────────────────────
  {
    id: "ladonia", name: "Ladonia", category: "Micronations",
    flagUrl: fp("Flag_of_Ladonia.svg"),
    note: "A green Nordic cross on green — a deliberately 'invisible' flag for the Swedish art micronation founded in 1996 by sculptor Lars Vilks around his driftwood works.",
  },
  {
    id: "westarctica", name: "Grand Duchy of Westarctica", category: "Micronations",
    flagUrl: fp("Flag_of_Westarctica.svg"),
    note: "Claims Marie Byrd Land — the one slice of Antarctica no country claims. Its blue-and-white flag now doubles as a vehicle for climate-change awareness.",
  },
  {
    id: "uzupis", name: "Republic of Užupis", category: "Micronations",
    flagUrl: fp("Flag_of_Užupis.svg"),
    note: "A bohemian artists' 'republic' in a Vilnius neighbourhood, declared on 1 April 1997. Its flag shows a hand with a hole in the palm — 'you can't take anything with you.'",
  },
]

// Maritime & Signal (the ICS / phonetic-alphabet signal flags) are their own
// thing — they live in a separate section, NOT under Identity.
export const IDENTITY_CATEGORIES: IdentityCategory[] = [
  "Pride & LGBTQ+",
  "Pan-National & Ethnic",
  "Indigenous Peoples",
  "Separatist & Autonomous",
  "Micronations",
  "Civic & Ideological",
]

/** LGBTQ+ pride/identity flags, kept distinct from the civic/ethnic/separatist set. */
export const LGBTQ_FLAGS: IdentityFlag[] = IDENTITY_FLAGS.filter(f => f.category === "Pride & LGBTQ+")

/** Civic, ethnic, indigenous, separatist & micronation flags (no LGBTQ, no signal). */
export const OTHER_IDENTITY_FLAGS: IdentityFlag[] = IDENTITY_FLAGS.filter(
  f => f.category !== "Pride & LGBTQ+" && f.category !== "Maritime & Signal"
)

/** Maritime / international signal flags (Alpha, Bravo, Charlie …) — own section. */
export const SIGNAL_FLAGS: IdentityFlag[] = IDENTITY_FLAGS.filter(f => f.category === "Maritime & Signal")

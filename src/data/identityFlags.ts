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

  // ── More Pan-National & Ethnic ───────────────────────────────────────────
  {
    id: "yazidi", name: "Yazidi Flag", category: "Pan-National & Ethnic",
    flagUrl: fp("Flag_of_the_Yazidis.svg"),
    note: "A golden sun on white with a red-bordered field, used by the Yazidi people of northern Iraq, Syria and beyond; the sun reflects their veneration of light.",
  },
  {
    id: "pan-celtic", name: "Pan-Celtic Flag", category: "Pan-National & Ethnic",
    flagUrl: fp("Pan-Celtic_flag.svg"),
    note: "Joins the symbols of the six Celtic nations — Ireland, Scotland, Wales, Brittany, Cornwall and the Isle of Man — used at inter-Celtic festivals.",
  },

  // ── More Indigenous Peoples ──────────────────────────────────────────────
  {
    id: "mikmaq", name: "Mi'kmaq Grand Council", category: "Indigenous Peoples",
    flagUrl: fp("Mi'kmaq_State_Flag.svg"),
    note: "A red cross, sun and crescent moon on white — the historic flag of the Mi'kmaq Grand Council of Atlantic Canada, one of the oldest Indigenous flags in North America.",
  },
  {
    id: "cusco-inca", name: "Cusco / Inca Rainbow", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_Cusco.svg"),
    note: "A seven-colour rainbow flag flown over Cusco, Peru and widely embraced as a symbol of Andean and Inca (Tawantinsuyu) Indigenous identity. (Not to be confused with the Pride flag.)",
  },

  // ── More Separatist & Autonomous ─────────────────────────────────────────
  {
    id: "biafra", name: "Biafra", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Biafra.svg"),
    note: "Red-black-green with a rising golden sun — flag of the short-lived Republic of Biafra (1967–70) and of present-day south-eastern Nigerian separatism.",
  },
  {
    id: "padania", name: "Padania", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Padania.svg"),
    note: "The green 'Sun of the Alps' on white, devised by Italy's Lega Nord for its proposed northern Italian state of Padania.",
  },
  {
    id: "veneto", name: "Veneto (Lion of St Mark)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Veneto.svg"),
    note: "The winged Lion of St Mark on a many-tailed banner — flag of the autonomous Veneto region and of Venetian independence sentiment.",
  },
  {
    id: "flanders", name: "Flanders (Flemish Lion)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Flanders.svg"),
    note: "A black lion on yellow — emblem of Dutch-speaking Flanders and the Flemish Movement within Belgium.",
  },
  {
    id: "occitania", name: "Occitania", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Occitania.svg"),
    note: "The Occitan cross of Toulouse, sometimes with a star, representing the Occitan-speaking lands of southern France and their cultural revival.",
  },
  {
    id: "faroe", name: "Faroe Islands (Merkið)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_the_Faroe_Islands.svg"),
    note: "A red-and-blue Nordic cross on white for the self-governing Faroe Islands, an autonomous nation within the Kingdom of Denmark.",
  },
  {
    id: "greenland", name: "Greenland (Erfalasorput)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Greenland.svg"),
    note: "Red-and-white halves with an offset circle evoking the midnight sun on ice — flag of autonomous Greenland (Kalaallit Nunaat), adopted 1985.",
  },
  {
    id: "aland", name: "Åland Islands", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Åland.svg"),
    note: "A red Nordic cross over a yellow one on blue — flag of the autonomous, Swedish-speaking Åland Islands of Finland.",
  },
  {
    id: "republika-srpska", name: "Republika Srpska", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Republika_Srpska.svg"),
    note: "A red-blue-white Serbian tricolour — flag of the Serb-majority autonomous entity within Bosnia and Herzegovina.",
  },

  // ── International & ideological (Civic & Ideological) ─────────────────────
  {
    id: "united-nations", name: "United Nations", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_the_United_Nations.svg"),
    note: "A world map seen from the North Pole wrapped in olive branches of peace, on UN blue — adopted 1946.",
  },
  {
    id: "flag-of-europe", name: "Flag of Europe", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_Europe.svg"),
    note: "A ring of twelve gold stars on blue — symbol of unity used by both the Council of Europe and the European Union; the twelve is fixed, not a count of members.",
  },
  {
    id: "olympic", name: "Olympic Movement", category: "Civic & Ideological",
    flagUrl: fp("Olympic_flag.svg"),
    note: "Five interlocking rings for the five inhabited continents, in colours chosen so every national flag contains at least one. Designed by Pierre de Coubertin in 1913.",
  },
  {
    id: "commonwealth", name: "Commonwealth of Nations", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_the_Commonwealth_of_Nations.svg"),
    note: "A golden globe radiating spokes on blue — flag of the 56-member association of mostly former British Empire states.",
  },
  {
    id: "nato", name: "NATO", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_NATO.svg"),
    note: "A white compass star inside a circle on dark blue — emblem of the North Atlantic Treaty Organization, adopted 1953.",
  },
  {
    id: "african-union", name: "African Union", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_the_African_Union.svg"),
    note: "A gold map of Africa ringed by 55 stars (one per member) on green — flag of the African Union, adopted 2010.",
  },
  {
    id: "arab-league", name: "Arab League", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_the_Arab_League.svg"),
    note: "A green field with the league's name in white Arabic script encircled by a chain and laurel — the League of Arab States.",
  },
  {
    id: "asean", name: "ASEAN", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_ASEAN.svg"),
    note: "Ten rice stalks bound together in a red circle on blue — the Association of Southeast Asian Nations, the stalks standing for its founding aspiration of unity.",
  },
  {
    id: "buddhist", name: "Buddhist Flag", category: "Civic & Ideological",
    flagUrl: fp("Buddhist_flag.svg"),
    note: "Five vertical colour bands plus a sixth combined band, designed in 1885 to represent the aura of the Buddha; now flown by Buddhists worldwide.",
  },
  {
    id: "christian", name: "Christian Flag", category: "Civic & Ideological",
    flagUrl: fp("Christian_flag.svg"),
    note: "A red Latin cross on a blue canton over white — an interdenominational flag dating to 1897 in the United States.",
  },
  {
    id: "sikh", name: "Sikh Nishan Sahib", category: "Civic & Ideological",
    flagUrl: fp("Nishan_Sahib.svg"),
    note: "The saffron (or blue) triangular flag bearing the Khanda emblem, flown at every gurdwara — the standard of the Sikh faith.",
  },
  {
    id: "jain", name: "Jain Flag", category: "Civic & Ideological",
    flagUrl: fp("Jain_Flag.svg"),
    note: "Five horizontal bands with a central swastika (an ancient symbol of well-being) and the three dots and crescent of Jain cosmology.",
  },
  {
    id: "interpol", name: "Interpol", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_Interpol.svg"),
    note: "The globe, scales of justice and olive branches of the International Criminal Police Organization, which links the police of 196 countries.",
  },
  {
    id: "who", name: "World Health Organization", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_the_World_Health_Organization.svg"),
    note: "The UN emblem with the Rod of Asclepius (a snake-entwined staff of medicine) on UN blue.",
  },
  {
    id: "unesco", name: "UNESCO", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_UNESCO.svg"),
    note: "A stylised temple façade on blue — the UN's education, science and culture agency, keeper of the World Heritage list.",
  },
  {
    id: "oas", name: "Organization of American States", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_the_Organization_of_American_States.svg"),
    note: "The member states' flags furled around a central staff on blue — the main political body of the Americas.",
  },
  {
    id: "oic", name: "Organisation of Islamic Cooperation", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_the_Organisation_of_Islamic_Cooperation.svg"),
    note: "A red crescent within a white disc tilted on green — the 57-member bloc that calls itself the collective voice of the Muslim world.",
  },
  {
    id: "scouts", name: "World Scout Movement", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_the_World_Organization_of_the_Scout_Movement.svg"),
    note: "A white fleur-de-lis encircled by rope tied in a reef knot, on purple — the worldwide emblem of Scouting.",
  },
  {
    id: "eaeu", name: "Eurasian Economic Union", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_the_Eurasian_Economic_Union.svg"),
    note: "A circle of gold lines forming a stylised globe on white — the Russia-led economic union of post-Soviet states.",
  },
  {
    id: "mercosur", name: "Mercosur", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_Mercosur.svg"),
    note: "The Southern Cross over a green wreath on blue — South America's main trade bloc.",
  },
  {
    id: "caricom", name: "CARICOM", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_CARICOM.svg"),
    note: "A blue-and-green field with a yellow disc broken by a black ring — the Caribbean Community of fifteen member states.",
  },

  // ── More Separatist & Autonomous ─────────────────────────────────────────
  {
    id: "quebec", name: "Quebec (Fleurdelisé)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Quebec.svg"),
    note: "A white cross and four fleurs-de-lis on blue — flag of the French-speaking Canadian province and a banner of Québécois sovereignty.",
  },
  {
    id: "crimean-tatar", name: "Crimean Tatars", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_the_Crimean_Tatar_people.svg"),
    note: "A golden tamga (clan seal) on light blue — emblem of the Indigenous Crimean Tatar people of the Black Sea peninsula.",
  },
  {
    id: "khalistan", name: "Khalistan", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Khalistan.svg"),
    note: "A yellow field with the Khanda — flag of the movement for a sovereign Sikh state in the Punjab.",
  },
  {
    id: "aceh", name: "Aceh (Free Aceh Movement)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_the_Free_Aceh_Movement.svg"),
    note: "A red field with white and black bands and a star and crescent — banner of the long Acehnese independence struggle in Indonesia.",
  },
  {
    id: "south-moluccas", name: "South Moluccas (RMS)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_the_South_Moluccas.svg"),
    note: "Blue-white-green-red bands — flag of the self-proclaimed Republic of South Maluku, declared against Indonesia in 1950.",
  },
  {
    id: "tigray", name: "Tigray", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_the_Tigray_Region.svg"),
    note: "A red field with a central yellow sunburst — flag of Ethiopia's northern Tigray Region.",
  },
  {
    id: "katanga", name: "Katanga", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Katanga.svg"),
    note: "Green-white-red with three red crosses — flag of the mineral-rich State of Katanga that seceded from the Congo, 1960–63.",
  },
  {
    id: "zanzibar", name: "Zanzibar", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Zanzibar.svg"),
    note: "Black, blue and green bands with the green flag of Tanzania in the canton — flag of the semi-autonomous archipelago of Tanzania.",
  },
  {
    id: "bangsamoro", name: "Bangsamoro", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Bangsamoro.svg"),
    note: "Green with a yellow sword, crescent and seven-rayed star — flag of the Bangsamoro autonomous region of the southern Philippines.",
  },
  {
    id: "shan", name: "Shan State", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_the_Shan_State.svg"),
    note: "Yellow-green-red with a white disc — flag of the Shan people and their long campaign for autonomy within Myanmar.",
  },

  // ── More Indigenous Peoples (tribal nations) ─────────────────────────────
  {
    id: "choctaw", name: "Choctaw Nation", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Choctaw_Nation.svg"),
    note: "A blue field with the Choctaw seal — an unstrung bow, three arrows and a peace pipe — of the Choctaw Nation of Oklahoma.",
  },
  {
    id: "chickasaw", name: "Chickasaw Nation", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Chickasaw_Nation.svg"),
    note: "A Chickasaw warrior emblem on a light field — flag of one of the 'Five Tribes' of the American South-east.",
  },
  {
    id: "muscogee", name: "Muscogee (Creek) Nation", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Muscogee_Nation.svg"),
    note: "A golden field bearing a sheaf of wheat and a ceremonial plough — flag of the Muscogee (Creek) Nation.",
  },
  {
    id: "seminole", name: "Seminole Tribe of Florida", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Seminole_Tribe_of_Florida.svg"),
    note: "Bands of the four sacred colours with a chickee, fire and figures — flag of the Florida Seminole, the 'Unconquered' people.",
  },
  {
    id: "comanche", name: "Comanche Nation", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Comanche_Nation.svg"),
    note: "A red-and-blue field with the Comanche seal — flag of the Lords of the Southern Plains.",
  },

  // ── More Pan-National & Ethnic ───────────────────────────────────────────
  {
    id: "coptic", name: "Coptic Flag", category: "Pan-National & Ethnic",
    flagUrl: fp("Coptic_flag.svg"),
    note: "Bears the Coptic cross — identity flag of Egypt's Coptic Christians, one of the world's oldest Christian communities.",
  },
  {
    id: "tuareg", name: "Tuareg Flag", category: "Pan-National & Ethnic",
    flagUrl: fp("Tuareg_flag.svg"),
    note: "Blue, green and yellow with a red tifinagh symbol — used by the Tuareg, the Amazigh nomads of the Sahara and Sahel.",
  },

  // ── More Micronations ────────────────────────────────────────────────────
  {
    id: "minerva", name: "Republic of Minerva", category: "Micronations",
    flagUrl: fp("Flag_of_the_Republic_of_Minerva.svg"),
    note: "A torch on blue for the 1972 libertarian project to build a nation on reclaimed reefs near Tonga — promptly annexed by Tonga.",
  },
  {
    id: "whangamomona", name: "Republic of Whangamomona", category: "Micronations",
    flagUrl: fp("Flag_of_Whangamomona.svg"),
    note: "A New Zealand village that declared itself a republic in 1989 after a council boundary change; it has elected a goat and a poodle as president.",
  },

  // ── More regional / autonomy flags ───────────────────────────────────────
  {
    id: "andalusia", name: "Andalusia", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Andalusia.svg"),
    note: "Green-white-green with the coat of arms of Hercules — flag of Spain's most populous autonomous community and of Andalusian nationalism.",
  },
  {
    id: "canary-islands", name: "Canary Islands", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_the_Canary_Islands.svg"),
    note: "White-blue-yellow vertical bands for the Spanish archipelago off Africa; independence groups fly a seven-green-star variant.",
  },
  {
    id: "friesland", name: "Frisia (Friesland)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Friesland.svg"),
    note: "Diagonal blue-and-white stripes strewn with red pompeblêden (water-lily leaves) — flag of the Frisian people of the Netherlands.",
  },
  {
    id: "scania", name: "Scania (Skåne)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Scania.svg"),
    note: "A yellow Nordic cross on red — regionalist flag of Scania, the southernmost province of Sweden, once part of Denmark.",
  },
  {
    id: "vojvodina", name: "Vojvodina", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Vojvodina.svg"),
    note: "Red-blue-green bands with a wreathed star — flag of the multi-ethnic autonomous province of northern Serbia.",
  },
  {
    id: "bavaria", name: "Bavaria (Lozengy)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Bavaria_(lozengy).svg"),
    note: "The white-and-blue diamond pattern of the German Free State of Bavaria, whose regionalist Bavaria Party has long sought independence.",
  },
  {
    id: "jammu-kashmir", name: "Jammu & Kashmir (1952–2019)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Jammu_and_Kashmir_(1952–2019).svg"),
    note: "A red field with a plough and three white stripes — the former state flag of Indian-administered Jammu & Kashmir, abolished in 2019.",
  },
  {
    id: "kawthoolei", name: "Karen (Kawthoolei)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Kawthoolei.svg"),
    note: "Red, white and blue with a rising sun and a Karen frog-drum — flag of the Karen people's decades-long push for a homeland in Myanmar.",
  },

  // ── More Pan-National & Ethnic ───────────────────────────────────────────
  {
    id: "lusatia", name: "Sorbs (Lusatia)", category: "Pan-National & Ethnic",
    flagUrl: fp("Flag_of_Lusatia.svg"),
    note: "Blue-red-white bands for the Sorbs, a West Slavic minority of eastern Germany — one of Europe's smallest surviving Slavic peoples.",
  },

  // ── More Indigenous Peoples ──────────────────────────────────────────────
  {
    id: "osage", name: "Osage Nation", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Osage_Nation.svg"),
    note: "A blue field with an eagle feather, pipe and the four-pointed star of the Osage Nation of Oklahoma.",
  },

  // ── More Civic & Ideological ─────────────────────────────────────────────
  {
    id: "antarctica", name: "Antarctica (Bartram)", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_Antarctica.svg"),
    note: "A white outline of the continent on UN blue — Graham Bartram's widely-used flag for the only land governed by an international treaty, not a nation.",
  },

  // ── More Indigenous Peoples (tribal nations) ─────────────────────────────
  {
    id: "mohawk-warrior", name: "Mohawk Warrior (Unity)", category: "Indigenous Peoples",
    flagUrl: fp("Mohawk_Warrior_Flag.svg"),
    note: "A profile of a Native warrior before a red sun on red — the Kanien'kehá:ka 'Unity' flag, widely flown as a pan-Indigenous symbol of resistance since the 1990 Oka Crisis.",
  },
  {
    id: "rapa-nui", name: "Rapa Nui (Easter Island)", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_Rapa_Nui,_Chile.svg"),
    note: "A white field with a red reimiro (a crescent-shaped pectoral ornament) — flag of the Rapa Nui people of Easter Island.",
  },
  {
    id: "n-cheyenne", name: "Northern Cheyenne", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Northern_Cheyenne.svg"),
    note: "Flag of the Northern Cheyenne Nation of Montana, the 'Morning Star People'.",
  },
  {
    id: "san-carlos-apache", name: "San Carlos Apache", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_San_Carlos_Apache_Tribe.svg"),
    note: "Flag of the San Carlos Apache Tribe of Arizona.",
  },
  {
    id: "blackfeet", name: "Blackfeet Nation", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Blackfeet_Nation.svg"),
    note: "Flag of the Blackfeet (Niitsítapi) Nation of the northern Plains.",
  },
  {
    id: "crow", name: "Crow Nation", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Crow_Tribe.svg"),
    note: "Flag of the Apsáalooke (Crow) Nation of Montana.",
  },
  {
    id: "oglala", name: "Oglala Lakota (Sioux)", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Oglala_Sioux.svg"),
    note: "Red field with eight white tipis in a circle — flag of the Oglala Lakota Nation of Pine Ridge.",
  },
  {
    id: "ho-chunk", name: "Ho-Chunk Nation", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Ho-Chunk_Nation.svg"),
    note: "Flag of the Ho-Chunk Nation of Wisconsin.",
  },
  {
    id: "kiowa", name: "Kiowa Tribe", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Kiowa_Tribe.svg"),
    note: "Flag of the Kiowa Tribe of Oklahoma.",
  },
  {
    id: "pawnee", name: "Pawnee Nation", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Pawnee_Nation.svg"),
    note: "Flag of the Pawnee Nation of Oklahoma.",
  },
  {
    id: "standing-rock", name: "Standing Rock Sioux", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Standing_Rock_Sioux_Tribe.svg"),
    note: "Flag of the Standing Rock Sioux Tribe of the Dakotas, prominent in the 2016 Dakota Access Pipeline protests.",
  },

  // ── More autonomous republics & regions ──────────────────────────────────
  {
    id: "tatarstan", name: "Tatarstan", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Tatarstan.svg"),
    note: "Green-white-red bands — flag of the Tatar-majority republic within Russia.",
  },
  {
    id: "bashkortostan", name: "Bashkortostan", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Bashkortostan.svg"),
    note: "Blue-white-green with a golden kurai flower — flag of the Bashkir republic within Russia.",
  },
  {
    id: "sakha", name: "Sakha (Yakutia)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Sakha.svg"),
    note: "A white sun disc on blue above red, green and white bands — flag of the vast Sakha Republic in Siberia.",
  },
  {
    id: "tuva", name: "Tuva", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Tuva.svg"),
    note: "A blue field split by yellow stripes — flag of the Tuvan republic of southern Siberia, an independent state from 1921–44.",
  },
  {
    id: "karelia", name: "Karelia", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Karelia.svg"),
    note: "Red-blue-green bands — flag of the Republic of Karelia, a Finnic region of north-west Russia.",
  },
  {
    id: "galicia-es", name: "Galicia", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Galicia.svg"),
    note: "A blue diagonal stripe on white — flag of the Celtic-rooted autonomous community of north-west Spain.",
  },
  {
    id: "asturias", name: "Asturias", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Asturias.svg"),
    note: "A blue field with the golden Victory Cross — flag of the Principality of Asturias in northern Spain.",
  },
  {
    id: "wallonia", name: "Wallonia", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Wallonia.svg"),
    note: "A red rooster ('coq hardi') on yellow — flag of French-speaking Wallonia in southern Belgium.",
  },
  {
    id: "puerto-rico-ind", name: "Puerto Rico", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Puerto_Rico.svg"),
    note: "The single-starred flag of Puerto Rico — a US territory whose status is still debated; this flag was once banned as a separatist symbol.",
  },

  // ── More Civic & Ideological ─────────────────────────────────────────────
  {
    id: "anarcho-syndicalism", name: "Anarcho-Syndicalism", category: "Civic & Ideological",
    flagUrl: fp("Anarcho-syndicalism_flag.svg"),
    note: "A diagonally split red-and-black flag — red for the labour movement, black for anarchism.",
  },
  {
    id: "unicef", name: "UNICEF", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_UNICEF.svg"),
    note: "A mother and child before a globe inside olive branches — the UN's children's agency.",
  },
  {
    id: "fao", name: "FAO", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_the_FAO.svg"),
    note: "A wheat-wreathed UN emblem with the motto 'Fiat Panis' (Let there be bread) — the UN Food and Agriculture Organization.",
  },

  // ── Pride & LGBTQ+ (batch 2) ──────────────────────────────────────────────
  {
    id: "pride-aroace", name: "Aroace Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Aroace_flag.svg"),
    note: "Orange-to-yellow over white and two shades of blue, combining aromantic and asexual identity for people who are both.",
  },
  {
    id: "pride-queer", name: "Queer Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Queer_Pride_Flag.svg"),
    note: "Lavender, white and green bands — an umbrella flag reclaiming 'queer' for the whole community.",
  },
  {
    id: "pride-leather", name: "Leather Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Leather,_Latex,_and_BDSM_pride_-_Light.svg"),
    note: "Black and blue stripes with a white line and a red heart — Tony DeBlase's 1989 design for the leather/BDSM subculture.",
  },
  {
    id: "pride-bear", name: "Bear Brotherhood Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Bear_Brotherhood_flag.svg"),
    note: "Earthy brown-to-tan stripes with a bear paw — for the burly, hairy 'bear' community of gay culture.",
  },
  {
    id: "pride-rubber", name: "Rubber Pride Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Rubber_pride_flag.svg"),
    note: "Black and red with a yellow chevron — a 1995 flag for the rubber and latex fetish community.",
  },
  {
    id: "pride-demiboy", name: "Demiboy Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Demiboy_flag.svg"),
    note: "Grey, blue and white stripes for someone who partially, but not wholly, identifies as a boy or man.",
  },
  {
    id: "pride-demigirl", name: "Demigirl Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Demigirl_flag.svg"),
    note: "Grey, pink and white stripes for someone who partially identifies as a girl or woman.",
  },
  {
    id: "pride-maverique", name: "Maverique Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Maverique_flag.svg"),
    note: "Yellow, white and orange — a non-binary gender independent of the male/female binary, defined by autonomy.",
  },
  {
    id: "pride-neutrois", name: "Neutrois Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Neutrois_flag.svg"),
    note: "White, green and black — a neutral or null gender within the non-binary spectrum.",
  },
  {
    id: "pride-pangender", name: "Pangender Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Pangender_Pride_Flag.svg"),
    note: "Soft pinks, yellows and white for people who experience many or all genders.",
  },
  {
    id: "pride-androgyne", name: "Androgyne Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Androgyne_flag.svg"),
    note: "Pink, purple and blue for a gender blending masculine and feminine.",
  },
  {
    id: "pride-trigender", name: "Trigender Flag", category: "Pride & LGBTQ+",
    flagUrl: fp("Trigender_Pride_flag.svg"),
    note: "Five symmetric stripes for those who move between three genders.",
  },

  // ── Pan-National & Ethnic (batch 2) ───────────────────────────────────────
  {
    id: "turkic-states", name: "Organization of Turkic States", category: "Pan-National & Ethnic",
    flagUrl: fp("Flag_of_the_Organization_of_Turkic_States.svg"),
    note: "A sky-blue field with the emblems of its member states — a pan-Turkic body spanning Turkey to Central Asia.",
  },
  {
    id: "pan-iranian", name: "Pan-Iranian Flag", category: "Pan-National & Ethnic",
    flagUrl: fp("Pan_Iranian_flag.svg"),
    note: "A green-white-red tricolour with a golden lion and sun — a symbol of pan-Iranian (Iranic peoples') unity.",
  },
  {
    id: "hispanidad", name: "Flag of the Hispanic People", category: "Pan-National & Ethnic",
    flagUrl: fp("Flag_of_the_Hispanic_People.svg"),
    note: "Three crosses on white with a blazing sun — representing the shared heritage of the Spanish-speaking world (Hispanidad).",
  },
  {
    id: "yoruba", name: "Yoruba People", category: "Pan-National & Ethnic",
    flagUrl: fp("Flag_of_the_Yoruba_people.svg"),
    note: "A flag for the Yoruba, one of West Africa's largest ethnic groups, spread across Nigeria, Benin and Togo.",
  },
  {
    id: "nordic-council", name: "Nordic Council", category: "Pan-National & Ethnic",
    flagUrl: fp("Flag_of_the_Nordic_Council.svg"),
    note: "A white swan on blue — the symbol of Nordic cooperation among Denmark, Norway, Sweden, Finland and Iceland.",
  },
  {
    id: "hmong", name: "Hmong Flag", category: "Pan-National & Ethnic",
    flagUrl: fp("Hmong_flag.svg"),
    note: "A flag for the Hmong, a stateless people scattered across China, Vietnam, Laos and the global diaspora.",
  },

  // ── Indigenous Peoples (batch 2) ──────────────────────────────────────────
  {
    id: "inuit-circumpolar", name: "Inuit Circumpolar Council", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Inuit_Circumpolar_Council.svg"),
    note: "Represents the Inuit of Greenland, Canada, Alaska and Chukotka — a single people across four states.",
  },
  {
    id: "afn", name: "Assembly of First Nations", category: "Indigenous Peoples",
    flagUrl: fp("Assembly_of_First_Nations_flag.svg"),
    note: "The national advocacy body for the First Nations peoples of Canada.",
  },
  {
    id: "hopi", name: "Hopi Tribe", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Hopi.svg"),
    note: "A Puebloan people of northeastern Arizona, known for mesa-top villages among the oldest continuously inhabited in North America.",
  },
  {
    id: "cree", name: "Cree Nation", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Cree_Nation.svg"),
    note: "One of the largest Indigenous groups in North America, spanning the Canadian Subarctic and Plains.",
  },
  {
    id: "ainu", name: "Ainu Flag", category: "Indigenous Peoples",
    flagUrl: fp("Ainu_flag.svg"),
    note: "Designed in 1973 for the Ainu, the Indigenous people of Hokkaido, Sakhalin and the Kurils.",
  },
  {
    id: "taino", name: "Taíno Flag", category: "Indigenous Peoples",
    flagUrl: fp("Taino_flag.svg"),
    note: "A revival symbol of the Taíno, the Indigenous people of the Caribbean encountered by Columbus in 1492.",
  },
  {
    id: "garifuna", name: "Garifuna Flag", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Garifuna.svg"),
    note: "Black, white and yellow stripes for the Garifuna, an Afro-Indigenous people of Central America's Caribbean coast.",
  },
  {
    id: "nez-perce", name: "Nez Perce Tribe", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Nez_Perce.svg"),
    note: "A Plateau people of the U.S. Pacific Northwest, famed for the 1877 flight led by Chief Joseph.",
  },
  {
    id: "anishinaabe", name: "Anishinaabe / Ojibwe", category: "Indigenous Peoples",
    flagUrl: fp("Anishinaabe_flag.svg"),
    note: "Among the most populous Indigenous nations of the Great Lakes region.",
  },
  {
    id: "wampanoag", name: "Wampanoag", category: "Indigenous Peoples",
    flagUrl: fp("Flag_of_the_Wampanoag.svg"),
    note: "The people of present-day Massachusetts who met the Plymouth colonists in 1620.",
  },

  // ── Separatist & Autonomous (batch 2) ─────────────────────────────────────
  {
    id: "catalonia-senyera", name: "Catalonia (Senyera)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Catalonia.svg"),
    note: "Four red bars on gold — one of Europe's oldest flags and the official banner of Catalonia.",
  },
  {
    id: "scotland", name: "Scotland (Saltire)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Scotland.svg"),
    note: "The white St Andrew's cross on blue — emblem of Scotland and its independence movement.",
  },
  {
    id: "wales", name: "Wales (Y Ddraig Goch)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Wales.svg"),
    note: "The red dragon on green and white — a Welsh national symbol that flies no place on the Union Jack.",
  },
  {
    id: "england", name: "England (St George)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_England.svg"),
    note: "The red St George's cross on white — the flag of England within the United Kingdom.",
  },
  {
    id: "ulster-banner", name: "Ulster Banner", category: "Separatist & Autonomous",
    flagUrl: fp("Ulster_Banner.svg"),
    note: "The former flag of Northern Ireland (1953–72), still used by unionists at sporting events.",
  },
  {
    id: "texas", name: "Texas (Lone Star)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Texas.svg"),
    note: "Once the banner of the independent Republic of Texas (1836–45), now a touchstone for secessionist sentiment.",
  },
  {
    id: "california-republic", name: "California Republic", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_California.svg"),
    note: "The Bear Flag of the short-lived 1846 California Republic, now the state flag and a 'Calexit' symbol.",
  },
  {
    id: "hawaii-kingdom", name: "Hawaiian Kingdom", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Hawaii.svg"),
    note: "The flag of the former Kingdom of Hawai'i, central to the Native Hawaiian sovereignty movement.",
  },
  {
    id: "crimea", name: "Crimea", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Crimea.svg"),
    note: "The flag of the contested Crimean peninsula, annexed by Russia in 2014.",
  },
  {
    id: "rif-republic", name: "Republic of the Rif", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_the_Republic_of_the_Rif.svg"),
    note: "A red field with a white diamond bearing a green crescent and star — the 1920s Berber republic of northern Morocco.",
  },
  {
    id: "kabylia", name: "Kabylia", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Kabylie.svg"),
    note: "The flag of the Kabyle Berber region of Algeria and its autonomy movement.",
  },
  {
    id: "balochistan", name: "Balochistan", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Balochistan.svg"),
    note: "A symbol of Baloch nationalism spanning Pakistan, Iran and Afghanistan.",
  },
  {
    id: "south-yemen", name: "South Yemen", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_South_Yemen.svg"),
    note: "The banner of the former independent south, revived by the Southern Movement.",
  },
  {
    id: "hong-kong-colonial", name: "Hong Kong (Colonial)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Hong_Kong_(1959–1997).svg"),
    note: "The pre-handover colonial ensign, waved by some pro-democracy and localist protesters.",
  },
  {
    id: "newfoundland-tricolour", name: "Newfoundland (Tricolour)", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Newfoundland_(Tricolour).svg"),
    note: "The unofficial pink-white-green flag, a symbol of Newfoundland identity.",
  },
  {
    id: "acadia", name: "Acadia", category: "Separatist & Autonomous",
    flagUrl: fp("Flag_of_Acadia.svg"),
    note: "The French tricolour with a gold star, flag of the Acadian people of Atlantic Canada.",
  },

  // ── Micronations (batch 2) ────────────────────────────────────────────────
  {
    id: "kugelmugel", name: "Republic of Kugelmugel", category: "Micronations",
    flagUrl: fp("Flag_of_Kugelmugel.svg"),
    note: "A spherical house turned micronation in Vienna, declared by artist Edwin Lipburger in 1984.",
  },
  {
    id: "wirtland", name: "Wirtland", category: "Micronations",
    flagUrl: fp("Flag_of_Wirtland.svg"),
    note: "One of the first 'countries' to exist purely online, founded in 2008.",
  },
  {
    id: "slowjamastan", name: "Slowjamastan", category: "Micronations",
    flagUrl: fp("Flag_of_Slowjamastan.svg"),
    note: "A patch of California desert declared a 'republic' in 2021 by radio DJ Randy Williams.",
  },
  {
    id: "akhzivland", name: "Akhzivland", category: "Micronations",
    flagUrl: fp("Flag_of_Akhzivland.svg"),
    note: "A beachside micronation on the Israeli coast founded by Eli Avivi in the 1970s.",
  },
  {
    id: "filettino", name: "Principality of Filettino", category: "Micronations",
    flagUrl: fp("Flag_of_Filettino.svg"),
    note: "An Italian village that declared itself a principality in 2011 to protest a merger.",
  },
  {
    id: "forvik", name: "Forvik", category: "Micronations",
    flagUrl: fp("Flag_of_Forvik.svg"),
    note: "A tiny Shetland island declared a Crown dependency by Stuart Hill in 2008.",
  },

  // ── Civic & Ideological (batch 2) ─────────────────────────────────────────
  {
    id: "disability-pride", name: "Disability Pride Flag", category: "Civic & Ideological",
    flagUrl: fp("Disability_Pride_Flag.svg"),
    note: "A charcoal field with a diagonal band of five colours — Ann Magill's 2019 design for the disability community.",
  },
  {
    id: "vegan-flag", name: "Vegan Flag", category: "Civic & Ideological",
    flagUrl: fp("Vegan_flag.svg"),
    note: "Two blue and green triangles forming a 'V' — a 2017 international symbol of veganism.",
  },
  {
    id: "ecology-flag", name: "Ecology Flag", category: "Civic & Ideological",
    flagUrl: fp("Ecology_Flag.svg"),
    note: "Green and white stripes with a theta-like symbol — a 1969 banner of the environmental movement.",
  },
  {
    id: "peace-flag", name: "Peace Flag (PACE)", category: "Civic & Ideological",
    flagUrl: fp("Flag_of_Peace.svg"),
    note: "The rainbow 'PACE' banner widely flown in peace marches, especially in Italy.",
  },
  {
    id: "paralympic", name: "Paralympic Movement", category: "Civic & Ideological",
    flagUrl: fp("Paralympic_flag.svg"),
    note: "Three 'agitos' in red, blue and green on white — the symbol of the Paralympic Games.",
  },
  {
    id: "happy-human", name: "Humanism (Happy Human)", category: "Civic & Ideological",
    flagUrl: fp("Happy_Human.svg"),
    note: "A stylised figure with arms raised — the international icon of secular humanism.",
  },
  {
    id: "extinction-rebellion", name: "Extinction Rebellion", category: "Civic & Ideological",
    flagUrl: fp("Extinction_Symbol.svg"),
    note: "An hourglass inside a circle — the emblem of the climate-action movement, signalling time running out.",
  },
  {
    id: "red-flag", name: "Red Flag (Socialism)", category: "Civic & Ideological",
    flagUrl: fp("Red_flag.svg"),
    note: "The plain red banner — a universal symbol of socialism and the labour movement since the 19th century.",
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

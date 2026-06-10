import { CHALLENGE_CONTINENTS } from "./challenges"

export interface SubFlag {
  code: string
  name: string
  flagUrl: string
  countryCode: string
  countryName: string
  countryEmoji: string
  continent: string
}

// Flat list of every subdivision that actually has a flag image to guess
// (excludes confirmed "no flag" entries and group/header rows).
export const SUB_FLAGS: SubFlag[] = []
for (const cont of CHALLENGE_CONTINENTS) {
  for (const country of cont.countries) {
    for (const sr of country.subRegions) {
      if (sr.flagUrl && !sr.noFlag && !sr.groupHeader) {
        SUB_FLAGS.push({
          code: sr.code,
          name: sr.name,
          flagUrl: sr.flagUrl,
          countryCode: country.code,
          countryName: country.name,
          countryEmoji: country.emoji,
          continent: cont.name,
        })
      }
    }
  }
}

export const SUB_CONTINENTS = CHALLENGE_CONTINENTS.map(c => ({ id: c.id, name: c.name, emoji: c.emoji }))

export interface CountrySubStat {
  code: string
  name: string
  emoji: string
  total: number
}

// Countries (with at least one flagged subdivision) for a given continent name,
// each with its total count of guessable subdivision flags.
export function countriesWithSubs(continentName: string): CountrySubStat[] {
  const cont = CHALLENGE_CONTINENTS.find(c => c.name === continentName)
  if (!cont) return []
  return cont.countries
    .map(country => ({
      code: country.code,
      name: country.name,
      emoji: country.emoji,
      total: country.subRegions.filter(sr => sr.flagUrl && !sr.noFlag && !sr.groupHeader).length,
    }))
    .filter(c => c.total > 0)
    .sort((a, b) => a.name.localeCompare(b.name))
}

// Subdivision codes belonging to a country (the guessable ones).
export function subCodesForCountry(countryCode: string): string[] {
  return SUB_FLAGS.filter(s => s.countryCode === countryCode).map(s => s.code)
}

export function sorterAlfabetisk(forelder) {
    forelder.underNotat = Object.fromEntries(Object.values(forelder.underNotat)
        .sort((a, b) => a.tittel.localeCompare(b.tittel, 'nn'))
        .map(notat => [notat.id, notat]));
}

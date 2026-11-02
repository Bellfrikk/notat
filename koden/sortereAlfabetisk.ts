export function sorterAlfabetisk(forelder: Notat | HovedNotat): void {
  forelder.underNotat = Object.fromEntries(
    Object.values(forelder.underNotat)
      .sort((a, b) => {
        if (!a.tittel.trim()) return -1;
        if (!b.tittel.trim()) return 1;
        return a.tittel.localeCompare(b.tittel, 'nn');
      })
      .map(notat => [notat.id, notat])
  );
}
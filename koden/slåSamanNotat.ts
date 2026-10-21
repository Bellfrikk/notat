// Sjekker dato på alle notat og bruker det soom er nyast.
export function slåSamanNotat( google: HovedNotat, lokalt: HovedNotat): HovedNotat {
  return { underNotat: slåSamanUnderNotat( google.underNotat, lokalt.underNotat ) };
}

function slåSamanUnderNotat(
  google: Record<string, Notat>,
  lokalt: Record<string, Notat>
): Record<string, Notat> {

  const resultat: Record<string, Notat> = {};

  const alleID = new Set([
    ...Object.keys(google),
    ...Object.keys(lokalt)
  ]);

  for (const id of alleID) {

    const googleNotat = google[id];
    const lokaltNotat = lokalt[id];

    if(googleNotat){
      //endre fra boolen til teks pga kompabilitet
    //  if( googleNotat.sletta === true) googleNotat.sletta = 'søppel';
    // else if(googleNotat.sletta === false) googleNotat.sletta = 'ok';
         // vil ikkje ha notat som er evig sletta
     if(googleNotat.sletta === 'evigSletta') continue;
    }
    if(lokaltNotat) {
    //  if(lokaltNotat.sletta === true) lokaltNotat.sletta = 'søppel';
    //  else if(lokaltNotat && lokaltNotat.sletta === false) lokaltNotat.sletta = 'ok';
          // vil ikkje ha notat som er evig sletta
      if(lokaltNotat.sletta === 'evigSletta') continue;
    }

    // vil ikkje ha notat som er evig sletta

    // Berre på Google
    if (!lokaltNotat ) {
      resultat[id] = structuredClone(googleNotat);
      continue;
    }

    // Berre lokalt
    if (!googleNotat) {
      resultat[id] = structuredClone(lokaltNotat);
      continue;
    }

    // Begge har notatet – vel den nyaste
    const nyaste =
      googleNotat.sistEndra >= lokaltNotat.sistEndra
        ? googleNotat
        : lokaltNotat;

    resultat[id] = {
      ...structuredClone(nyaste),

      // UnderNotat må også slåast saman
      underNotat: slåSamanUnderNotat(
        googleNotat.underNotat,
        lokaltNotat.underNotat
      )
    };
  }

  return resultat;
}

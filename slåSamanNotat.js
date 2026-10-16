// Sjekker dato på alle notat og bruker det soom er nyast.
export function slåSamanNotat(google, lokalt) {
    return { underNotat: slåSamanUnderNotat(google.underNotat, lokalt.underNotat) };
}
function slåSamanUnderNotat(google, lokalt) {
    const resultat = {};
    const alleIdar = new Set([
        ...Object.keys(google),
        ...Object.keys(lokalt)
    ]);
    for (const id of alleIdar) {
        const googleNotat = google[id];
        const lokaltNotat = lokalt[id];
        // Berre på Google
        if (!lokaltNotat) {
            resultat[id] = structuredClone(googleNotat);
            continue;
        }
        // Berre lokalt
        if (!googleNotat) {
            resultat[id] = structuredClone(lokaltNotat);
            continue;
        }
        // Begge har notatet – vel den nyaste
        const nyaste = googleNotat.sistEndra >= lokaltNotat.sistEndra
            ? googleNotat
            : lokaltNotat;
        resultat[id] = {
            ...structuredClone(nyaste),
            // UnderNotat må også slåast saman
            underNotat: slåSamanUnderNotat(googleNotat.underNotat, lokaltNotat.underNotat)
        };
    }
    return resultat;
}

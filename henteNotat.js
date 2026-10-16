import { filId, accessToken } from "./googlePålogging.js";
import { slåSamanNotat } from "./slåSamanNotat.js";
import { tegnVanligeNotat } from "./hoved.js";
export let hovedNotat = { underNotat: {} };
export async function hentNotat() {
    let googleNotat = await hentNotatFraGoogle();
    console.log('googleNotat', googleNotat);
    let lokaltNotat = hentLokaltNotat();
    console.log('lokaltNotat', lokaltNotat);
    let notat = slåSamanNotat(googleNotat, lokaltNotat);
    hovedNotat = notat;
    tegnVanligeNotat();
}
export function tomtNotat() {
    return { underNotat: {} };
}
function hentLokaltNotat() {
    const data = localStorage.getItem('notato');
    if (data === null)
        return tomtNotat();
    return JSON.parse(data);
}
async function hentNotatFraGoogle() {
    if (!accessToken || !filId)
        return tomtNotat();
    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${filId}?alt=media`, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });
    const tekst = await response.text();
    return JSON.parse(tekst);
}

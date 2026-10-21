import { hovedNotat } from "./henteNotat.js";
import { filId, accessToken } from "./googlePålogging.js";
import { sorterAlfabetisk } from "./sortereAlfabetisk.js";
export function lagreNotat() {
    lagreLokalt(hovedNotat);
    lagreTilGoogleDrive(hovedNotat);
}
function lagreLokalt(data) {
    localStorage.setItem('notat', JSON.stringify(data));
    console.log('lagra lokalt');
}
async function lagreTilGoogleDrive(data) {
    if (!accessToken || !filId)
        return;
    const tekst = JSON.stringify(data, null, 2);
    const response = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${filId}?uploadType=media`, {
        method: 'PATCH',
        headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'text/plain; charset=UTF-8' },
        body: tekst
    });
    console.log('lagra på google');
    if (!response.ok)
        throw new Error(await response.text());
}
export function lagreTittel(forelderData, denneData, nyTittel) {
    denneData.tittel = nyTittel;
    denneData.sistEndra = Date.now();
    sorterAlfabetisk(forelderData);
    lagreNotat();
}

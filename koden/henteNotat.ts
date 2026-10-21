import { filId, accessToken } from "./googlePålogging.js";
import { slåSamanNotat } from "./slåSamanNotat.js";
import { tegnVanligeNotat } from "./hoved.js";

export let hovedNotat:HovedNotat = { underNotat: { } };

export async function hentNotat() {  
  let googleNotat:HovedNotat = await hentNotatFraGoogle();
  console.log('googleNotat', googleNotat);
  let lokaltNotat:HovedNotat = hentLokaltNotat();
  console.log('lokaltNotat', lokaltNotat);
  let notat:HovedNotat = slåSamanNotat(googleNotat, lokaltNotat);
  hovedNotat = notat;
  tegnVanligeNotat();
}

export function tomtNotat() {
  return { underNotat: { } }
}


function hentLokaltNotat():HovedNotat {
  const data = localStorage.getItem('notat');

  if (data === null) return tomtNotat();

  return JSON.parse(data) as HovedNotat;
}


async function hentNotatFraGoogle(): Promise<HovedNotat> {
  if (!accessToken || !filId) return tomtNotat();

  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${filId}?alt=media`,
    {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    }
  );

  const tekst = await response.text();

  return JSON.parse(tekst) as HovedNotat;
}




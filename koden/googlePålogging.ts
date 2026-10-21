import { tomtNotat, hentNotat } from "./henteNotat.js";
import { påLogga } from "./topplinje.js";
const CLIENT_ID =
  '799272959741-8ddqungsiflk6mu7581gvq8jospbjgqt.apps.googleusercontent.com';

const SCOPES =
  'https://www.googleapis.com/auth/drive.appdata';

export let accessToken: string | null = null;
export let filId: string | null = null;
declare const google: any;
let tokenClient: any;


export function startGoogle() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: async (response: any) => {
      if (response.error) {
        console.error(response);
        påLogga(false);
        return;
      }

      accessToken = response.access_token;

      try {
        await finnNotatFil();
      } catch (feil) {
        console.error('Feil ved Google Drive:', feil);
        påLogga(false);
      }
    }
  });

  tokenClient.requestAccessToken({
    prompt: 'none'
  });
}


async function finnNotatFil() {

  if (!accessToken) {
    påLogga(false);
    return;
  }

  const url =
    'https://www.googleapis.com/drive/v3/files?' +
    new URLSearchParams({
      spaces: 'appDataFolder',
      q: "name = 'notato.txt' and trashed = false",
      fields: 'files(id,name)',
    });

  const response = await fetch(url, { headers: { Authorization: 'Bearer ' + accessToken } });
  if (!response.ok) throw new Error(await response.text());
  const resultat = await response.json();

  if (resultat.files.length > 0) {
    filId = resultat.files[0].id;
    console.log('Fant notato.txt:', filId);
    påLogga(true);
    hentNotat();
  } else {
    filId = await lagNyFil();
    console.log('Oppretta notato.txt:', filId);
  }
}

async function lagNyFil(): Promise<string> {
  if (!accessToken) throw new Error('Ikkje kobla til Google');
  const metadata = { name: 'notato.txt', parents: ['appDataFolder'], mimeType: 'text/plain'};
  const tekst = JSON.stringify( tomtNotat(), null, 2 );
  const boundary = 'notatBoundary';
  const body =
    '--' + boundary + '\r\n' +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    '\r\n--' + boundary + '\r\n' +
    'Content-Type: text/plain; charset=UTF-8\r\n\r\n' +
    tekst +
    '\r\n--' + boundary + '--';

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?' +
    new URLSearchParams({
      uploadType: 'multipart',
      fields: 'id'
    }),
    { method: 'POST',
      headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'multipart/related; boundary=' + boundary },
      body: body
    }
  );
  if (!response.ok) throw new Error(await response.text());
  const resultat = await response.json();
  return resultat.id;
}



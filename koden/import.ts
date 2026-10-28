import { nyId, tegnVanligeNotat } from './hoved.js';
import { nyFarge } from './farge.js';
interface Window {
    showDirectoryPicker(): Promise<FileSystemDirectoryHandle>;
}
import { hovedNotat } from './henteNotat.js';
import { lagreNotat } from './lagreNotat.js';

// Les XML-fila Note.znel frå TAR-innhaldet i ei .znote-fil.
async function lesZnote(fil: File): Promise<{
  tittel: string;
  tekst: string;
}> {
  const data = new Uint8Array(await fil.arrayBuffer());
  const dekodar = new TextDecoder();
  let posisjon = 0;

  while (posisjon + 512 <= data.length) {
    const header = data.subarray(posisjon, posisjon + 512);

    if (header.every(byte => byte === 0)) break;

    const namn = dekodar.decode(header.subarray(0, 100))
      .replace(/\0.*$/, "");

    const storleikTekst = dekodar.decode(
      header.subarray(124, 136)
    ).replace(/\0.*$/, "").trim();

    const storleik = parseInt(storleikTekst || "0", 8);
    const start = posisjon + 512;

    if (namn.endsWith("/Note.znel") || namn === "Note.znel") {
      const xmlTekst = dekodar.decode(
        data.subarray(start, start + storleik)
      );

      const xml = new DOMParser().parseFromString(
        xmlTekst,
        "application/xml"
      );

      if (xml.querySelector("parsererror")) {
        throw new Error("Ugyldig XML i " + fil.name);
      }

      return {
        tittel:
          xml.querySelector("ZMeta > ZTitle")?.textContent?.trim()
          || "Utan tittel",

        // ZContent inneheld HTML i ein CDATA-seksjon.
        // Behald HTML-en dersom notatappen din lagrar HTML.
        tekst: xml.querySelector("ZContent")?.textContent || ""
      };
    }

    posisjon = start + Math.ceil(storleik / 512) * 512;
  }

  throw new Error("Fann ikkje Note.znel i " + fil.name);
}

function lagImportertNotat(
  tittel: string,
  tekst: string,
  forelderFarge: string
): Notat {
  const id = nyId();

  return {
    id,
    tittel,
    farge: nyFarge(forelderFarge),
    underNotat: {},
    tekst,
    sistEndra: Date.now(),
    sletta: "ok"
  };
}

// Importerer ei mappe og alle undermappene rekursivt.
// Kvar mappe blir eit undernotat.
// Kvar .znote-fil blir eit barn av mappa.
export async function importerMappe(
  mappe: FileSystemDirectoryHandle,
  forelder: HovedNotat | Notat,
  forelderFarge: string
): Promise<void> {

  let mappenotat: Notat | null = null;

  // Les meta.json dersom mappa representerer ei notatgruppe.
  try {
    const metaFil = await mappe.getFileHandle("meta.json");
    const meta = JSON.parse(
      await (await metaFil.getFile()).text()
    );

    if (meta.data_type === "NOTEGROUP") {
      mappenotat = lagImportertNotat(
        meta.name || mappe.name,
        "",
        forelderFarge
      );

      forelder.underNotat[mappenotat.id] = mappenotat;
    }
  } catch {
    // Rotmappa kan mangle meta.json.
  }

  // Dersom dette er ei notatgruppe, legg innhaldet der.
  // Elles blir innhaldet lagt i forelderen.
  const mål = mappenotat || forelder;
  const farge = mappenotat?.farge || forelderFarge;

  for await (const [namn, element] of mappe.entries()) {
    if (element.kind === "file" && namn.endsWith(".znote")) {
      try {
        const fil = await (element as FileSystemFileHandle).getFile();
        const innhald = await lesZnote(fil);

        const notat = lagImportertNotat(
          innhald.tittel,
          reinsTekst(innhald.tekst),
          farge
        );

        mål.underNotat[notat.id] = notat;
      } catch (feil) {
        console.error("Kunne ikkje importere", namn, feil);
      }
    }

    if (element.kind === "directory") {
      await importerMappe(
        element as FileSystemDirectoryHandle,
        mål,
        farge
      );
    }
  }
}

export async function startImport() {
  try {
    const mappe = await window.showDirectoryPicker();

    await importerMappe(
      mappe,
      hovedNotat,
      "#ffffff"
    );

    lagreNotat();
    tegnVanligeNotat();
  } catch (feil) {
    if ((feil as DOMException).name !== "AbortError") {
      console.error("Importen feila:", feil);
    }
  }
}

function reinsTekst(tekst: string): string {
    const element = document.createElement('div');
    element.innerHTML = tekst;

    element.querySelectorAll('br').forEach(br => {
        br.replaceWith('\n');
    });

    return element.textContent?.trim() ?? '';
}


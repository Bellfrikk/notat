import { startGoogle } from './googlePålogging.js';
import { hovedNotat } from './henteNotat.js';
import { nyId, hovedNotatBoks, tegnSøppelNotat, tegnVanligeNotat } from './hoved.js';
import { lagreNotat } from './lagreNotat.js';
import { tegnNotat } from './tegnNotat.js';
import { nyFarge } from './farge.js';
import { søkNotat, nesteTreff } from './søk.js';
export function lagTopplinje() {

    const toppLinje = document.createElement('div');
    toppLinje.className = 'toppLinje';
    document.body.appendChild(toppLinje);
    
    const logo = document.createElement('img');
    logo.src = 'ikon-512.png';
    logo.className = 'vanligKnapp';
    toppLinje.appendChild(logo);
    
    const googleKnapp = document.createElement('button');
    googleKnapp.id = 'googleKnapp';
    googleKnapp.textContent = 'G';
    googleKnapp.className = 'vanligKnapp';
    googleKnapp.addEventListener('click', (event) => {
        event.stopPropagation();
        startGoogle();
    });
    toppLinje.appendChild(googleKnapp);
    // søppel knapp
    const søppelKnapp = document.createElement('button');
    søppelKnapp.textContent = '🗑️';
    søppelKnapp.className = 'vanligKnapp';
    søppelKnapp.addEventListener('click', (event) => {
        event.stopPropagation();
        notatKnapp.style.display = '';
        søppelKnapp.style.display = 'none';
        søkefelt.style.display = 'none';
        nesteTreffKnapp.style.display = 'none';
        tegnSøppelNotat();
    });
    toppLinje.appendChild(søppelKnapp);
    // visnotat knapp
    const notatKnapp = document.createElement('button');
    notatKnapp.textContent = '📚';
    notatKnapp.className = 'vanligKnapp';
    notatKnapp.style.display = 'none';
    notatKnapp.addEventListener('click', (event) => {
        event.stopPropagation();
        søppelKnapp.style.display = '';
        søkefelt.style.display = '';
        nesteTreffKnapp.style.display = '';
        notatKnapp.style.display = 'none';
        tegnVanligeNotat();
    });
    toppLinje.appendChild(notatKnapp);
    // + knapp
    const nyKnapp = document.createElement('button');
    nyKnapp.textContent = '➕';
    nyKnapp.className = 'vanligKnapp';
    nyKnapp.addEventListener('click', (event) => {
        event.stopPropagation();
        const id = nyId();
        hovedNotat.underNotat[id] = { id: id, tittel: 'tittel', farge: nyFarge('#FFFFFF'), underNotat: {}, tekst: '', sistEndra: Date.now(), sletta: false };
        lagreNotat();
        tegnNotat(hovedNotatBoks, hovedNotat, hovedNotat.underNotat[id], 'vanlig');
    });
    toppLinje.appendChild(nyKnapp);
    //søkfelt
    const søkefelt = document.createElement('input');
    søkefelt.id = 'søkefelt';
    søkefelt.type = 'search';
    søkefelt.placeholder = 'Søk';
    søkefelt.addEventListener('input', () => { søkNotat(hovedNotat, søkefelt.value); });
    toppLinje.appendChild(søkefelt);
    const nesteTreffKnapp = document.createElement('button');
    nesteTreffKnapp.id = 'nesteTreff';
    nesteTreffKnapp.className = 'vanligKnapp';
    nesteTreffKnapp.textContent = '->';
    nesteTreffKnapp.addEventListener('click', nesteTreff);
    toppLinje.appendChild(nesteTreffKnapp);
}
export function påLogga(loggaPå) {
    const googleKnapp = document.getElementById('googleKnapp');
    if (!googleKnapp)
        return;
    if (loggaPå) {
        googleKnapp.style.color = '#24e14a';
    }
    else {
        googleKnapp.style.color = 'red';
    }
}

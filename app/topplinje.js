import { startGoogle } from './googlePålogging.js';
import { hovedNotat } from './henteNotat.js';
import { nyId, hovedNotatBoks } from './hoved.js';
import { lagreNotat } from './lagreNotat.js';
import { tegnNotat } from './tegnNotat.js';
import { opneLukkNotat } from './opneLukkNotat.js';
import { søkNotat, nesteTreff } from './søk.js';
import { lagTomtNotat } from './lagTomtNotat.js';
export function lagTopplinje() {
    const toppLinje = document.createElement('div');
    toppLinje.className = 'toppLinje';
    document.body.appendChild(toppLinje);
    const logo = document.createElement('img');
    logo.src = './ikon/ikon-512.png';
    logo.className = 'ikon';
    toppLinje.appendChild(logo);
    const googleKnapp = document.createElement('button');
    googleKnapp.id = 'googleKnapp';
    googleKnapp.style.background = "url(./ikon/synk.png) center / contain no-repeat";
    googleKnapp.className = 'knapp';
    googleKnapp.addEventListener('click', (event) => {
        event.stopPropagation();
        startGoogle();
    });
    toppLinje.appendChild(googleKnapp);
    // søppel knapp
    const søppelKnapp = document.createElement('button');
    søppelKnapp.className = 'knapp søppelMenyKnapp';
    søppelKnapp.addEventListener('click', (event) => {
        event.stopPropagation();
        document.body.classList.toggle('visSøppel');
    });
    toppLinje.appendChild(søppelKnapp);
    // + knapp
    const nyKnapp = document.createElement('button');
    nyKnapp.style.backgroundImage = 'url(./ikon/nyttnotat.png)';
    nyKnapp.className = 'knapp';
    nyKnapp.addEventListener('click', (event) => {
        event.stopPropagation();
        const id = nyId();
        hovedNotat.underNotat[id] = lagTomtNotat(id, '#ffffff');
        lagreNotat();
        tegnNotat(hovedNotatBoks, hovedNotat, hovedNotat.underNotat[id]);
        const denneNotatBoks = document.getElementById(id);
        if (!denneNotatBoks)
            return;
        opneLukkNotat(id);
    });
    toppLinje.appendChild(nyKnapp);
    //søkfelt
    const søkefelt = document.createElement('input');
    søkefelt.id = 'søkefelt';
    søkefelt.type = 'search';
    søkefelt.placeholder = 'Søk';
    søkefelt.addEventListener('input', () => {
        console.log('Søkefelt endra:', søkefelt.value);
        søkNotat(hovedNotat, søkefelt.value);
    });
    toppLinje.appendChild(søkefelt);
    const nesteTreffKnapp = document.createElement('button');
    nesteTreffKnapp.id = 'nesteTreff';
    nesteTreffKnapp.className = 'knapp';
    nesteTreffKnapp.style.backgroundImage = 'url(./ikon/nestepil.png)';
    nesteTreffKnapp.addEventListener('click', nesteTreff);
    toppLinje.appendChild(nesteTreffKnapp);
}
export function påLogga(loggaPå) {
    const googleKnapp = document.getElementById('googleKnapp');
    if (!googleKnapp)
        return;
    if (loggaPå) {
        googleKnapp.style.background = "#03f4176e url(./ikon/synkok.png) center / contain no-repeat";
    }
    else {
        googleKnapp.style.background = "#f94417bc url(./ikon/synk.png) center / contain no-repeat";
    }
}

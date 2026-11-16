import { hentNotat, hovedNotat } from "./henteNotat.js";
import { lagTopplinje } from "./topplinje.js";
import { tegnNotat } from "./tegnNotat.js";

export function nyId():string {
  return crypto.randomUUID();
}
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .catch(feil => {
        console.error('Service worker-feil:', feil);
      });
  });
}

document.addEventListener('DOMContentLoaded', ()=> { start();
});

export const hovedNotatBoks = document.createElement('div');
hovedNotatBoks.id = 'hovedNotat';
hovedNotatBoks.className = 'hovedNotatBoks';

export async function start(){
  lagTopplinje();
  
  hentNotat();
}

export function tegnAlleNotat() {
  hovedNotatBoks.innerHTML = '';
  hovedNotatBoks.id = 'hovedNotatBoks';
  document.body.appendChild(hovedNotatBoks);
  let undernotatListe = Object.keys(hovedNotat.underNotat);
  
  if(undernotatListe.length > 0) { 
    undernotatListe.forEach(( id ) => { 
      tegnNotat(hovedNotatBoks, hovedNotat, hovedNotat.underNotat[id]); 
    });
  }
}

    

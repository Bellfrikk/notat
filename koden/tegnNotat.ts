import { lagreNotat, lagreTittel } from "./lagreNotat.js";
import { nyId } from "./hoved.js";
import { endreFarge, nyFarge } from "./farge.js";
import { slettNotat, uSlettNotat } from "./slett.js";

export function tegnNotat( overNotat:HTMLElement, forelderData:Notat|HovedNotat, denneData:Notat, type:'vanlig'|'hovedSøppel'|'underSøppel') {

  const notatBoks = document.createElement('div');
  notatBoks.className = 'notatBoks';
  notatBoks.style.backgroundColor = denneData.farge;

    //tittelboks
    const tittelBoks = document.createElement('div');
    tittelBoks.className = 'tittelBoks';
    tittelBoks.addEventListener('click', opneNotat);
    notatBoks.appendChild(tittelBoks);

    function opneNotat() {
      tittelBoks.querySelectorAll<HTMLElement>('.notatLukka').forEach((knapp) => {
        knapp.classList.remove('notatLukka');
        knapp.classList.add('notatOpent');
      });
        notat.classList.remove('notatLukka');
        notat.classList.add('notatOpent');
    
      tittelBoks.removeEventListener('click', opneNotat);
      tittel.contentEditable = 'true';
    }

      // Tilbakeknapp
      const tilbakeKnapp = document.createElement('button');
      tilbakeKnapp.style.backgroundImage = 'url(./ikon/tilbake.png)';
      tilbakeKnapp.className = 'knapp notatLukka';
      tilbakeKnapp.addEventListener('click', (event) => {
        event.stopPropagation();
        tittel.contentEditable = 'false';
        //lagra tittel
        const nyTittel = tittel.textContent ?? '';
        lagreTittel(forelderData, denneData, nyTittel);
        //skjul notat
        notatBoks.querySelectorAll<HTMLElement>('.notatOpent').forEach((ting) => { 
          ting.classList.remove('notatOpent');
          ting.classList.add('notatLukka');
        });
      tittelBoks.addEventListener('click', opneNotat);
      });
      tittelBoks.appendChild(tilbakeKnapp);

      // tittel
      const tittel = document.createElement('h2');
      tittel.innerText = denneData.tittel;
      tittel.className = 'tittel';
      tittel.addEventListener('input', () => {
        const nyTittel = tittel.textContent ?? '';
        lagreTittel(forelderData, denneData, nyTittel);
      });  
      tittelBoks.appendChild(tittel);

if(type === 'vanlig'){
      // Slettknapp
      const slettKnapp = document.createElement('button');
      slettKnapp.style.backgroundImage = 'url(./ikon/slett.png)';
      slettKnapp.className = 'knapp notatLukka';
      slettKnapp.addEventListener('click', (event) => {
        event.stopPropagation();
        slettNotat(denneData, notatBoks);
      });
      tittelBoks.appendChild(slettKnapp);
}
if(type === 'hovedSøppel'){
      // U slett knapp, skal bare vise i søppel
      const uSlettKnapp = document.createElement('button');
      uSlettKnapp.style.backgroundImage = 'url(./ikon/uSlett.png)';
      uSlettKnapp.className = 'søppelKnapp notatLukka';
      uSlettKnapp.addEventListener('click', (event) => {
        event.stopPropagation();
        uSlettNotat(denneData, notatBoks);
      });
      tittelBoks.appendChild(uSlettKnapp);
}
if(type === 'vanlig'){
      // Fargeknapp
      const fargeKnapp = document.createElement('button');
      fargeKnapp.style.backgroundImage = 'url(./ikon/farge.png)';
      fargeKnapp.className = 'knapp notatLukka';
      fargeKnapp.addEventListener('click', (event) => { event.stopPropagation(); endreFarge(denneData, notatBoks); });
      tittelBoks.appendChild(fargeKnapp);
      
      // + knapp
      const nyKnapp = document.createElement('button');
      nyKnapp.style.backgroundImage = 'url(./ikon/nyttnotat.png)';
      nyKnapp.className = 'knapp notatLukka';
      nyKnapp.addEventListener('click', (event) => {
        event.stopPropagation();
        const id:string = nyId();
        denneData.underNotat[id] = { id:id, tittel:'tittel', farge:nyFarge(denneData.farge), underNotat:{}, tekst:'', sistEndra:Date.now(), sletta:false };
        lagreNotat();
        tegnNotat(underNotatBoks,denneData, denneData.underNotat[id], 'vanlig');
      });
      tittelBoks.appendChild(nyKnapp);
}
    //notat underboks
    const notat = document.createElement('div');
    notat.id = denneData.id;
    notat.className = 'notat notatLukka';
      
    //undernotat
      const underNotatBoks = document.createElement('div');
      notat.appendChild(underNotatBoks);
      let alleUndernotat = Object.keys(denneData.underNotat);
      if(alleUndernotat.length > 0) {
        alleUndernotat.forEach(( id ) => { 
          tegnNotat(
            underNotatBoks, 
            denneData, 
            denneData.underNotat[id], 
            (type === 'vanlig') ? 'vanlig' : 'underSøppel'); //alle undernotat av søppel skal være undersøppel
          });
      }
    
    //notat tekst
    const tekst = document.createElement('div');
    tekst.className = 'tekst';
    tekst.textContent = denneData.tekst;
    tekst.contentEditable = 'true';
    tekst.addEventListener('input', () => {
      denneData.tekst = tekst.textContent ?? '';
      denneData.sistEndra = Date.now();
      lagreNotat();
    }); 
    notat.appendChild(tekst);

  notatBoks.appendChild(notat);  
overNotat.appendChild(notatBoks);
}
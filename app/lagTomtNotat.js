import { nyFarge } from "./farge.js";
export function lagTomtNotat(id, forelderFarge) {
    return {
        id: id,
        tittel: '',
        farge: nyFarge(forelderFarge),
        underNotat: {},
        tekst: '',
        sistEndra: Date.now(),
        sletta: 'ok'
    };
}

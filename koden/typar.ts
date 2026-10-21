
type Notat = {
  id:string,
  tittel:string, 
  farge:string,
  underNotat:Record<string,Notat>,
  tekst:string,
  sistEndra:number,
  sletta:'ok'|'søppel'|'evigSletta'
}

type HovedNotat = {
  underNotat:Record<string,Notat>
}
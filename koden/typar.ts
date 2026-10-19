
type Notat = {
  id:string,
  tittel:string, 
  farge:string,
  underNotat:Record<string,Notat>,
  tekst:string,
  sistEndra:number
  sletta:boolean
}

type HovedNotat = {
  underNotat:Record<string,Notat>
}
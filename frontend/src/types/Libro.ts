export interface Libro {
  titolo: string;
  autore: string;
  numeroInventario: string;
  collocazione: string;

  nome: string;
  cognome: string;
  dataInizioPrestito: string;  // ISO string da Java
  dataFinePrestito: string;
}

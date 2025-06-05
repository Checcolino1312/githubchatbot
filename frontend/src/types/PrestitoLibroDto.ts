export interface LibroDto {
  titolo: string;
  autore: string;
  numeroInventario: string;
  collocazione: string;
}

export interface PrestitoLibroDto {
  nome: string;
  cognome: string;
  indirizzo: string;
  cellulare: string;
  email: string;
  nomeVolontario: string;
  libri: LibroDto[];
}

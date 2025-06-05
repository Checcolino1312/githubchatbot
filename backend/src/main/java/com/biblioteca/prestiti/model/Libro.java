package com.biblioteca.prestiti.model;

public class Libro {
    private String titolo;
    private String autore;
    private String numeroInventario;
    private String collocazione;

    // --- GETTER ---
    public String getTitolo() { return titolo; }
    public String getAutore() { return autore; }
    public String getNumeroInventario() { return numeroInventario; }
    public String getCollocazione() { return collocazione; }

    // --- SETTER ---
    public void setTitolo(String titolo) { this.titolo = titolo; }
    public void setAutore(String autore) { this.autore = autore; }
    public void setNumeroInventario(String numeroInventario) { this.numeroInventario = numeroInventario; }
    public void setCollocazione(String collocazione) { this.collocazione = collocazione; }
}

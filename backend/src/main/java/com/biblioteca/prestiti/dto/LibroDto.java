package com.biblioteca.prestiti.dto;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public class LibroDto {

    @NotBlank
    private String titolo;

    @NotBlank
    private String autore;

    @NotBlank
    private String numeroInventario;

    @NotBlank
    private String collocazione;

    // ✅ Nuovi campi per mostrare chi ha preso il libro e quando
    private String nome;
    private String cognome;
    private LocalDate dataInizioPrestito;
    private LocalDate dataFinePrestito;

    // --- GETTER ---
    public String getTitolo() { return titolo; }
    public String getAutore() { return autore; }
    public String getNumeroInventario() { return numeroInventario; }
    public String getCollocazione() { return collocazione; }
    public String getNome() { return nome; }
    public String getCognome() { return cognome; }
    public LocalDate getDataInizioPrestito() { return dataInizioPrestito; }
    public LocalDate getDataFinePrestito() { return dataFinePrestito; }

    // --- SETTER ---
    public void setTitolo(String titolo) { this.titolo = titolo; }
    public void setAutore(String autore) { this.autore = autore; }
    public void setNumeroInventario(String numeroInventario) { this.numeroInventario = numeroInventario; }
    public void setCollocazione(String collocazione) { this.collocazione = collocazione; }
    public void setNome(String nome) { this.nome = nome; }
    public void setCognome(String cognome) { this.cognome = cognome; }
    public void setDataInizioPrestito(LocalDate dataInizioPrestito) { this.dataInizioPrestito = dataInizioPrestito; }
    public void setDataFinePrestito(LocalDate dataFinePrestito) { this.dataFinePrestito = dataFinePrestito; }
}

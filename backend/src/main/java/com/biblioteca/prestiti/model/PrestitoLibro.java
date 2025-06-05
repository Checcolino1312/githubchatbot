package com.biblioteca.prestiti.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "prestiti")
public class PrestitoLibro {

    @Id
    private String id;

    private String nome;
    private String cognome;
    private String indirizzo;
    private String cellulare;
    private String email;
    private LocalDate dataInizioPrestito;
    private LocalDate dataFinePrestito;
    private String nomeVolontario;

    private List<Libro> libri;

    // --- GETTER ---
    public String getId() { return id; }
    public String getNome() { return nome; }
    public String getCognome() { return cognome; }
    public String getIndirizzo() { return indirizzo; }
    public String getCellulare() { return cellulare; }
    public String getEmail() { return email; }
    public LocalDate getDataInizioPrestito() { return dataInizioPrestito; }
    public LocalDate getDataFinePrestito() { return dataFinePrestito; }
    public String getNomeVolontario() { return nomeVolontario; }
    public List<Libro> getLibri() { return libri; }

    // --- SETTER ---
    public void setId(String id) { this.id = id; }
    public void setNome(String nome) { this.nome = nome; }
    public void setCognome(String cognome) { this.cognome = cognome; }
    public void setIndirizzo(String indirizzo) { this.indirizzo = indirizzo; }
    public void setCellulare(String cellulare) { this.cellulare = cellulare; }
    public void setEmail(String email) { this.email = email; }
    public void setDataInizioPrestito(LocalDate dataInizioPrestito) { this.dataInizioPrestito = dataInizioPrestito; }
    public void setDataFinePrestito(LocalDate dataFinePrestito) { this.dataFinePrestito = dataFinePrestito; }
    public void setNomeVolontario(String nomeVolontario) { this.nomeVolontario = nomeVolontario; }
    public void setLibri(List<Libro> libri) { this.libri = libri; }
}

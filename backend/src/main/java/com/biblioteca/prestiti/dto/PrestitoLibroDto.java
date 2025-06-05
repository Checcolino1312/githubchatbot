package com.biblioteca.prestiti.dto;

import jakarta.validation.constraints.*;
import java.util.List;

public class PrestitoLibroDto {

    @NotBlank
    private String nome;

    @NotBlank
    private String cognome;

    @NotBlank
    private String indirizzo;

    @Pattern(regexp = "^\\d{10}$", message = "Numero di telefono non valido")
    private String cellulare;

    @Email
    private String email;

    @NotEmpty
    private List<LibroDto> libri;

    @NotBlank
    private String nomeVolontario;

    // Getter
    public String getNome() { return nome; }
    public String getCognome() { return cognome; }
    public String getIndirizzo() { return indirizzo; }
    public String getCellulare() { return cellulare; }
    public String getEmail() { return email; }
    public List<LibroDto> getLibri() { return libri; }
    public String getNomeVolontario() { return nomeVolontario; }
}

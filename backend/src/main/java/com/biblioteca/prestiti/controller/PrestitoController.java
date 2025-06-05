package com.biblioteca.prestiti.controller;

import com.biblioteca.prestiti.dto.LibroDto;
import com.biblioteca.prestiti.dto.PrestitoLibroDto;
import com.biblioteca.prestiti.model.Libro;
import com.biblioteca.prestiti.model.PrestitoLibro;
import com.biblioteca.prestiti.repository.PrestitoLibroRepository;
import com.biblioteca.prestiti.util.PdfGenerator;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/prestiti")
public class PrestitoController {

    private final PrestitoLibroRepository prestitoRepository;

    public PrestitoController(PrestitoLibroRepository prestitoRepository) {
        this.prestitoRepository = prestitoRepository;
    }

    @GetMapping("/libri-in-giro")
    public ResponseEntity<List<LibroDto>> getLibriInGiro() {
        List<PrestitoLibro> prestiti = prestitoRepository.findAll();

        List<LibroDto> libriInGiro = prestiti.stream()
                .flatMap(prestito -> prestito.getLibri().stream().map(libro -> {
                    LibroDto dto = new LibroDto();
                    dto.setTitolo(libro.getTitolo());
                    dto.setAutore(libro.getAutore());
                    dto.setNumeroInventario(libro.getNumeroInventario());
                    dto.setCollocazione(libro.getCollocazione());

                    // Aggiunta info sul prestito
                    dto.setNome(prestito.getNome());
                    dto.setCognome(prestito.getCognome());
                    dto.setDataInizioPrestito(prestito.getDataInizioPrestito());
                    dto.setDataFinePrestito(prestito.getDataFinePrestito());

                    return dto;
                }))
                .toList();

        return ResponseEntity.ok(libriInGiro);
    }

    @PostMapping
    public ResponseEntity<byte[]> creaPrestito(@Valid @RequestBody PrestitoLibroDto dto) {
        try {
            // Mappa LibroDto → Libro
            List<Libro> libri = dto.getLibri().stream().map(libroDto -> {
                Libro libro = new Libro();
                libro.setTitolo(libroDto.getTitolo());
                libro.setAutore(libroDto.getAutore());
                libro.setNumeroInventario(libroDto.getNumeroInventario());
                libro.setCollocazione(libroDto.getCollocazione());
                return libro;
            }).toList();

            // Crea oggetto PrestitoLibro
            PrestitoLibro prestito = new PrestitoLibro();
            prestito.setNome(dto.getNome());
            prestito.setCognome(dto.getCognome());
            prestito.setIndirizzo(dto.getIndirizzo());
            prestito.setCellulare(dto.getCellulare());
            prestito.setEmail(dto.getEmail());
            prestito.setNomeVolontario(dto.getNomeVolontario());
            prestito.setDataInizioPrestito(LocalDate.now());
            prestito.setDataFinePrestito(LocalDate.now().plusDays(30));
            prestito.setLibri(libri);

            // Salva su MongoDB
            prestitoRepository.save(prestito);

            // Genera PDF
            byte[] pdfBytes = PdfGenerator.generatePdf(dto);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData(
                    "filename", "prestito_" + dto.getNome() + "_" + dto.getCognome() + ".pdf"
            );

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

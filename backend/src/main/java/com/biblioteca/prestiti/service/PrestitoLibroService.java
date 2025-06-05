package com.biblioteca.prestiti.service;

import com.biblioteca.prestiti.dto.LibroDto;
import com.biblioteca.prestiti.dto.PrestitoLibroDto;
import com.biblioteca.prestiti.model.Libro;
import com.biblioteca.prestiti.model.PrestitoLibro;
import com.biblioteca.prestiti.repository.PrestitoLibroRepository;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class PrestitoLibroService {

    private final PrestitoLibroRepository repository;

    public PrestitoLibroService(PrestitoLibroRepository repository) {
        this.repository = repository;
    }

    public PrestitoLibro salvaPrestito(PrestitoLibroDto dto) {
        PrestitoLibro p = new PrestitoLibro();
        p.setNome(dto.getNome());
        p.setCognome(dto.getCognome());
        p.setIndirizzo(dto.getIndirizzo());
        p.setCellulare(dto.getCellulare());
        p.setEmail(dto.getEmail());
        p.setNomeVolontario(dto.getNomeVolontario());
        p.setDataInizioPrestito(LocalDate.now());
        p.setDataFinePrestito(LocalDate.now().plusDays(30));

        // Inizializza e popola la lista di libri
        List<Libro> libri = new ArrayList<>();
        for (LibroDto libroDto : dto.getLibri()) {
            Libro libro = new Libro();
            libro.setTitolo(libroDto.getTitolo());
            libro.setAutore(libroDto.getAutore());
            libro.setNumeroInventario(libroDto.getNumeroInventario());
            libro.setCollocazione(libroDto.getCollocazione());
            libri.add(libro);
        }

        p.setLibri(libri);

        return repository.save(p);
    }

    public byte[] generaPdf(PrestitoLibro prestito) {
        try {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PdfWriter writer = new PdfWriter(outputStream);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            document.add(new Paragraph("📚 Prestito Libri").setBold().setFontSize(16));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Il sottoscritto: " + prestito.getNome() + " " + prestito.getCognome()));
            document.add(new Paragraph("Residente a: " + prestito.getIndirizzo()));
            document.add(new Paragraph("Cellulare: " + prestito.getCellulare()));
            document.add(new Paragraph("Email: " + prestito.getEmail()));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Dichiara di aver preso in prestito i seguenti libri:").setBold());

            for (Libro libro : prestito.getLibri()) {
                document.add(new Paragraph("• " + libro.getTitolo() + " di " + libro.getAutore()));
                document.add(new Paragraph("  Inventario: " + libro.getNumeroInventario() + ", Collocazione: " + libro.getCollocazione()));
                document.add(new Paragraph(" "));
            }

            document.add(new Paragraph("Data inizio prestito: " + prestito.getDataInizioPrestito()));
            document.add(new Paragraph("Data fine prestito: " + prestito.getDataFinePrestito()));
            document.add(new Paragraph("Volontario autorizzante: " + prestito.getNomeVolontario()));

            document.add(new Paragraph("\n\nFirma utente: _______________________"));
            document.add(new Paragraph("Firma volontario: ____________________"));

            document.close();

            return outputStream.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Errore nella generazione del PDF", e);
        }
    }
}

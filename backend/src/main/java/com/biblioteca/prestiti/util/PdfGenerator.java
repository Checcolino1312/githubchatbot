package com.biblioteca.prestiti.util;

import com.biblioteca.prestiti.dto.LibroDto;
import com.biblioteca.prestiti.dto.PrestitoLibroDto;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.List;

public class PdfGenerator {

    public static byte[] generatePdf(PrestitoLibroDto dto) throws Exception {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, out);

        document.open();

        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
        Font textFont = FontFactory.getFont(FontFactory.HELVETICA, 12);

        Paragraph title = new Paragraph("Modulo di Prestito", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);

        document.add(new Paragraph("\n"));

        // Dati utente
        document.add(new Paragraph("Il/La sottoscritto/a " + dto.getNome() + " " + dto.getCognome(), textFont));
        document.add(new Paragraph("Residente a " + dto.getIndirizzo(), textFont));
        document.add(new Paragraph("Telefono: " + dto.getCellulare(), textFont));
        document.add(new Paragraph("Email: " + dto.getEmail(), textFont));
        document.add(new Paragraph("\n"));

        // Elenco libri
        document.add(new Paragraph("Dichiara di prendere in prestito i seguenti libri:", textFont));
        document.add(new Paragraph("\n"));

        List<LibroDto> libri = dto.getLibri();
        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100);
        table.setWidths(new int[]{4, 4, 3, 3});

        table.addCell("Titolo");
        table.addCell("Autore");
        table.addCell("N. Inventario");
        table.addCell("Collocazione");

        for (LibroDto libro : libri) {
            table.addCell(libro.getTitolo());
            table.addCell(libro.getAutore());
            table.addCell(libro.getNumeroInventario());
            table.addCell(libro.getCollocazione());
        }

        document.add(table);

        document.add(new Paragraph("\n"));
        document.add(new Paragraph("Data: " + LocalDate.now(), textFont));
        document.add(new Paragraph("Firma utente: ____________________________", textFont));
        document.add(new Paragraph("Firma volontario (" + dto.getNomeVolontario() + "): ____________________________", textFont));

        document.close();
        return out.toByteArray();
    }
}

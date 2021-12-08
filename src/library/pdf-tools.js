import PdfPrinter from "pdfmake"
export const getPDFReadableStream = () => {
    const fonts = {
      Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
      },
    }
  
    const printer = new PdfPrinter(fonts)
  
    const docDefinition = {
      content: [
        ali
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 15,
          bold: true,
        },
        // quote: {
        //   italics: true,
        // },
        small: {
          fontSize: 8,
        },
      },
      defaultStyle: {
        font: "Helvetica",
      },
    }
  
    const options = {
      // ...
    }
  
    const pdfReadableStream = printer.createPdfKitDocument(docDefinition, options)
    // pdfReadableStream.pipe(fs.createWriteStream("document.pdf")) // pipe is the old syntax for piping two streams together
    pdfReadableStream.end()
  
    return pdfReadableStream
  }

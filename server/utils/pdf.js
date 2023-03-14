import PdfPrinter from "pdfmake";
import path from "path";

function extend(target) {
  var sources = [].slice.call(arguments, 1);
  sources.forEach(function (source) {
    for (var prop in source) {
      target[prop] = source[prop];
    }
  });
  return target;
}

function createPdfBinary(pdfDoc, callback) {
  const fontDescriptors = {
    Roboto: {
      normal: path.join(
        __dirname,
        "..",
        "utils/files/fonts/Roboto/Roboto-Regular.ttf"
      ),
      bold: path.join(
        __dirname,
        "..",
        "utils/files/fonts/Roboto/Roboto-Medium.ttf"
      ),
      italics: path.join(
        __dirname,
        "..",
        "utils/files/fonts/Roboto/Roboto-Italic.ttf"
      ),
      bolditalics: path.join(
        __dirname,
        "..",
        "utils/files/fonts/Roboto/Roboto-MediumItalic.ttf"
      ),
    },
  };
  const printer = new PdfPrinter(fontDescriptors);

  const doc = printer.createPdfKitDocument(pdfDoc, {});

  const chunks = [];
  let result;

  doc.on("data", function (chunk) {
    chunks.push(chunk);
  });
  doc.on("end", function () {
    result = Buffer.concat(chunks);
    callback(result.toString("base64"));
  });
  doc.end();
}

module.exports = {
  extend,
  createPdfBinary,
};

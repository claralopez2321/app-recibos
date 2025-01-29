// Importar jsPDF al inicio del archivo (si usas módulos)
import { jsPDF } from 'jspdf';

document.addEventListener("DOMContentLoaded", () => {
    console.log("Página cargada correctamente.");
});

document.getElementById('generateRemito').addEventListener('click', function() {
    // Obtener los valores de los inputs
    const nombreRemito = document.getElementById('nombreRemito').value;
    const fecha = document.getElementById('fecha').value;
    const cliente = document.getElementById('cliente').value;
    const detalle = document.getElementById('detalle').value;
    const total = document.getElementById('total').value;

    // Verificar si todos los campos están completos
    if (!nombreRemito || !fecha || !cliente || !detalle || !total) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Crear un nuevo documento PDF
    const doc = new jsPDF();

    // Agregar la imagen al PDF (antes de los campos)
    const imgPath = './assets/img/header-19.png'; // Ruta de la imagen
    doc.addImage(imgPath, 'PNG', 10, 10, 180, 30); // Ajusta las coordenadas y tamaño según necesites

    // Agregar un espacio en blanco para evitar la superposición
    let yPosition = 50; // Espacio después de la imagen

    // Título en mayúsculas y en negrita
    doc.setFont('helvetica', 'bold');  // Establecer fuente en negrita
    doc.setFontSize(20);
    doc.text('REMITO', 20, yPosition); // Título en mayúsculas
    yPosition += 20; // Más espacio después del título (aumentado a 20)

    // Títulos y campos
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`Fecha:`, 20, yPosition);  // Campo "Fecha"
    doc.setFont('helvetica', 'normal');
    doc.text(fecha, 80, yPosition);
    yPosition += 15;

    doc.setFont('helvetica', 'bold');
    doc.text(`Cliente:`, 20, yPosition);  // Campo "Cliente"
    doc.setFont('helvetica', 'normal');
    doc.text(cliente, 80, yPosition);
    yPosition += 15;

    doc.setFont('helvetica', 'bold');
    doc.text(`Detalle:`, 20, yPosition);  // Campo "Detalle"
    doc.setFont('helvetica', 'normal');

    // Dividir el campo "Detalle" en líneas si es necesario
    const lineHeight = 10;
    const margin = 20;
    const pageWidth = doc.internal.pageSize.width; // Obtener el ancho de la página
    const maxLineLength = pageWidth - margin * 2; // Ajustar al ancho de la página

    // Dividir el texto del "Detalle" en líneas
    const lines = doc.splitTextToSize(detalle, maxLineLength);  // Dividir el texto en líneas
    doc.text(lines, margin, yPosition + 10); // Mostrar las líneas divididas

    // Ajustar la posición y según el número de líneas
    yPosition += lineHeight * lines.length + 15;  // Ajustar la posición después del campo "Detalle"

    doc.setFont('helvetica', 'bold');
    doc.text(`Total:`, 20, yPosition);  // Campo "Total"
    doc.setFont('helvetica', 'normal');
    doc.text(total, 80, yPosition);

    // Guardar el PDF con el nombre dado en el campo "Nombre del Remito" (sin mostrarlo en el cuerpo del PDF)
    doc.save(`${nombreRemito}.pdf`);
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("Página cargada correctamente.");
});

document.getElementById('generateRecibo').addEventListener('click', function() {
    // Obtener los valores de los inputs
    const nombreRecibo = document.getElementById('nombreRecibo').value;
    const fechaRecibo = document.getElementById('fechaRecibo').value;
    const clienteRecibo = document.getElementById('clienteRecibo').value;
    const detalleRecibo = document.getElementById('detalleRecibo').value;
    const totalRecibo = document.getElementById('totalRecibo').value;

    // Verificar si todos los campos están completos
    if (!nombreRecibo || !fechaRecibo || !clienteRecibo || !detalleRecibo || !totalRecibo) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Crear un nuevo documento PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Agregar la imagen al PDF (antes de los campos)
    const imgPath = './assets/img/header-19.png'; // Ruta de la imagen
    doc.addImage(imgPath, 'PNG', 10, 10, 180, 30); // Ajusta las coordenadas y tamaño según necesites

    // Agregar un espacio en blanco para evitar la superposición
    let yPosition = 50; // Espacio después de la imagen

    // Título en mayúsculas y en negrita
    doc.setFont('helvetica', 'bold');  // Establecer fuente en negrita
    doc.setFontSize(20);
    doc.text('RECIBO', 20, yPosition); // Título en mayúsculas
    yPosition += 20; // Más espacio después del título (aumentado a 20)

    // Títulos y campos
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`Fecha:`, 20, yPosition);  // Campo "Fecha"
    doc.setFont('helvetica', 'normal');
    doc.text(fechaRecibo, 80, yPosition);
    yPosition += 15;

    doc.setFont('helvetica', 'bold');
    doc.text(`Cliente:`, 20, yPosition);  // Campo "Cliente"
    doc.setFont('helvetica', 'normal');
    doc.text(clienteRecibo, 80, yPosition);
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
    const lines = doc.splitTextToSize(detalleRecibo, maxLineLength);  // Dividir el texto en líneas
    doc.text(lines, margin, yPosition + 10); // Mostrar las líneas divididas

    // Ajustar la posición y según el número de líneas
    yPosition += lineHeight * lines.length + 15;  // Ajustar la posición después del campo "Detalle"

    doc.setFont('helvetica', 'bold');
    doc.text(`Total:`, 20, yPosition);  // Campo "Total"
    doc.setFont('helvetica', 'normal');
    doc.text(totalRecibo, 80, yPosition);

    // Guardar el PDF con el nombre dado en el campo "Nombre del Recibo" (sin mostrarlo en el cuerpo del PDF)
    doc.save(`${nombreRecibo}.pdf`);
});

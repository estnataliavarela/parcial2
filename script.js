/**
 * Universidad - Facultad de Ingeniería
 * Asignatura: Introducción a la Computación Gráfica
 * * Estudiante: Natalia Varela Grajales
 * * Tarea: Implementar los algoritmos de rasterización manual.
 */

// Función de apoyo para dibujar un píxel individual
function drawPixel(ctx, x, y, color = "#000000") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

/**
 * Implementación del algoritmo de Bresenham para líneas.
 * @param {number} x0, y0 - Coordenadas iniciales
 * @param {number} x1, y1 - Coordenadas finales
 * @returns {void}
 */
function bresenhamLine(x0, y0, x1, y1, color) {
    // Obtenemos el contexto internamente para no alterar los parámetros base de la función
    const canvas = document.getElementById("miCanvas");
    const ctx = canvas.getContext("2d");

    x0 = Math.floor(x0); y0 = Math.floor(y0);
    x1 = Math.floor(x1); y1 = Math.floor(y1);

    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = (x0 < x1) ? 1 : -1;
    const sy = (y0 < y1) ? 1 : -1;

    // Parámetro de decisión (err): 
    // Mantiene aritmética entera (dx - dy) evaluando qué píxel está más cerca de la línea ideal.
    let err = dx - dy;

    while (true) {
        drawPixel(ctx, x0, y0, color);
        
        if (x0 === x1 && y0 === y1) break;

        const e2 = 2 * err;

        if (e2 > -dy) {
            err -= dy; // Ajuste de error en la componente Y
            x0 += sx;
        }
        
        if (e2 < dx) {
            err += dx; // Ajuste de error en la componente X
            y0 += sy;
        }
    }
}
function getPolygonVertices(centerX, centerY, sides, radius) {
    // Desarrollo del estudiante (Uso de Math.sin/Math.cos y retorno de datos)
}
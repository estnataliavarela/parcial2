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
/**
 * IMPLEMENTACIÓN ADICIONAL: Algoritmo de Punto Medio para circunferencias.
 * Sirve para trazar círculos píxel a píxel sin usar funciones nativas como arc().
 * Aprovecha la simetría de 8 vías para optimizar el rendimiento.
 * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
 * @param {number} xc, yc - Coordenadas del centro de la circunferencia
 * @param {number} r - Radio de la circunferencia
 * @param {string} color - Color del trazo
 */
function drawMidpointCircle(ctx, xc, yc, r, color) {
    xc = Math.floor(xc); yc = Math.floor(yc); r = Math.floor(r);
    let x = 0;
    let y = r;

    // Parámetro de decisión p: 
    // Determina matemáticamente si el siguiente píxel a pintar debe mantener 
    // su coordenada Y o debe disminuir, basado en la ecuación del círculo.
    let p = 1 - r;

    // Función auxiliar para pintar 8 píxeles simultáneamente por simetría
    const plotSymmetricalPixels = (x, y) => {
        drawPixel(ctx, xc + x, yc + y, color);
        drawPixel(ctx, xc - x, yc + y, color);
        drawPixel(ctx, xc + x, yc - y, color);
        drawPixel(ctx, xc - x, yc - y, color);
        drawPixel(ctx, xc + y, yc + x, color);
        drawPixel(ctx, xc - y, yc + x, color);
        drawPixel(ctx, xc + y, yc - x, color);
        drawPixel(ctx, xc - y, yc - x, color);
    };

    plotSymmetricalPixels(x, y);

    while (x < y) {
        x++;
        if (p < 0) {
            p += 2 * x + 1; // El punto ideal está dentro, mantenemos 'y'
        } else {
            y--;
            p += 2 * (x - y) + 1; // El punto ideal está fuera, reducimos 'y'
        }
        plotSymmetricalPixels(x, y);
    }
}
/**
 * Calcula los vértices de un polígono regular.
 * @param {number} centerX, centerY - Centro
 * @param {number} sides - Número de lados
 * @param {number} radius - Radio
 * @returns {Array} Arreglo de objetos {x, y}
 */
function getPolygonVertices(centerX, centerY, sides, radius) {
    const vertices = [];
    for (let i = 0; i < sides; i++) {
        // Cálculo del ángulo en radianes. Restamos Math.PI / 2 para que el polígono
        // se dibuje "derecho" (el primer vértice apuntando a las 12 del reloj).
        const angle = (i * 2 * Math.PI / sides) - (Math.PI / 2);
        
        // Transformación de coordenadas polares a coordenadas cartesianas (x, y)
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        vertices.push({ x, y });
    }
    return vertices; // Retorna el arreglo de coordenadas exigido
}
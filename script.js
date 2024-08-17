document.getElementById("generateImage").addEventListener("click", function () {
  const code = document.getElementById("codeInput").value;
  if (!code.trim()) {
    alert("ESCRIBE TU CODIGO");
    return;
  }

  const canvas = document.getElementById("codeCanvas");
  const context = canvas.getContext("2d");

  context.font = "24px 'Courier New', monospace";

  const lines = code.split("\n");
  const lineHeight = 30;
  const padding = 40;
  const canvasWidth = 1920; // Mantenemos el ancho en Full HD
  const canvasHeight = Math.max(
    1080,
    lineHeight * lines.length + padding * 2 + 40
  );

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  context.fillStyle = "#282c34";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const circleRadius = 10;
  const circleSpacing = 10;
  const colors = ["#FF0000", "#FFFF00", "#00FF00"];

  colors.forEach((color, index) => {
    context.beginPath();
    context.arc(
      padding + index * (circleRadius * 2 + circleSpacing),
      20,
      circleRadius,
      0,
      2 * Math.PI
    );
    context.fillStyle = color;
    context.fill();
  });

  context.font = "24px 'Courier New', monospace";

  function colorKeyword(word) {
    const keywords = {
      // Estructuras de control
      Algoritmo: "#c678dd", // Morado
      FinAlgoritmo: "#e06c75", // Rojo claro
      Si: "#61afef", // Azul claro
      Entonces: "#98c379", // Verde
      SiNo: "#e5c07b", // Amarillo claro
      FinSi: "#d19a66", // Naranja
      Para: "#56b6c2", // Turquesa
      Hasta: "#8a3fa3", // Púrpura oscuro
      Con: "#c678dd", // Morado
      Paso: "#4f88c7", // Azul cielo
      FinPara: "#d19a66", // Naranja
      Mientras: "#e06c75", // Rojo claro
      Hacer: "#61afef", // Azul claro
      FinMientras: "#98c379", // Verde
      Repetir: "#c678dd", // Morado
      "Hasta Que": "#e5c07b", // Amarillo claro
      Segun: "#d19a66", // Naranja
      "De Otro Modo": "#56b6c2", // Turquesa
      FinSegun: "#c678dd", // Morado

      // Declaraciones y tipos
      Definir: "#e06c75", // Rojo claro
      Como: "#61afef", // Azul claro
      Dimension: "#98c379", // Verde
      Entero: "#d19a66", // Naranja
      Real: "#56b6c2", // Turquesa
      Logico: "#e5c07b", // Amarillo claro
      Caracter: "#c678dd", // Morado
      Cadena: "#61afef", // Azul claro
      Numero: "#4f88c7", // Azul cielo
      Decimal: "#8a3fa3", // Púrpura oscuro

      // Entrada/Salida
      Escribir: "#98c379", // Verde
      Leer: "#e06c75", // Rojo claro
      Imprimir: "#61afef", // Azul claro
      Mostrar: "#c678dd", // Morado

      // Operadores
      Y: "#d19a66", // Naranja
      O: "#56b6c2", // Turquesa
      NO: "#e06c75", // Rojo claro
      MOD: "#c678dd", // Morado
      "^": "#4f88c7", // Azul cielo

      // Funciones matemáticas
      Abs: "#d19a66", // Naranja
      Sen: "#61afef", // Azul claro
      Cos: "#e06c75", // Rojo claro
      Tan: "#98c379", // Verde
      Asen: "#c678dd", // Morado
      Acos: "#d19a66", // Naranja
      Atan: "#4f88c7", // Azul cielo
      Ln: "#8a3fa3", // Púrpura oscuro
      Exp: "#56b6c2", // Turquesa
      Raiz: "#e5c07b", // Amarillo claro
      Pi: "#e06c75", // Rojo claro
      Aleatorio: "#c678dd", // Morado
      Azar: "#d19a66", // Naranja

      // Funciones de cadenas
      Longitud: "#4f88c7", // Azul cielo
      Subcadena: "#56b6c2", // Turquesa
      Mayusculas: "#98c379", // Verde
      Minusculas: "#c678dd", // Morado
      ConvertirANumero: "#e5c07b", // Amarillo claro
      ConvertirATexto: "#e06c75", // Rojo claro

      // Otros
      Verdadero: "#61afef", // Azul claro
      Falso: "#d19a66", // Naranja
      Funcion: "#c678dd", // Morado
      FinFuncion: "#e06c75", // Rojo claro
      Procedimiento: "#56b6c2", // Turquesa
      FinProcedimiento: "#98c379", // Verde
      Retornar: "#c678dd", // Morado
      // Nuevas palabras clave
      LimpiarPantalla: "#4f88c7", // Azul cielo
      Esperar: "#e5c07b", // Amarillo claro
      Segundos: "#8a3fa3", // Púrpura oscuro
      Milisegundos: "#61afef", // Azul claro
      TocarMusica: "#d19a66", // Naranja
      Subproceso: "#c678dd", // Morado
      FinSubproceso: "#56b6c2", // Turquesa
    };

    return keywords[word] || "#abb2bf";
  }

  function colorComment(line) {
    const commentIndex = line.indexOf("//");
    if (commentIndex !== -1) {
      return {
        code: line.substring(0, commentIndex),
        comment: line.substring(commentIndex),
      };
    }
    return null;
  }

  let y = padding + 40;
  lines.forEach((line) => {
    const comment = colorComment(line);
    if (comment) {
      // Dibuja el código antes del comentario
      const words = comment.code.split(/(\s+)/);
      let x = padding;
      words.forEach((word) => {
        context.fillStyle = colorKeyword(word.trim());
        context.fillText(word, x, y);
        x += context.measureText(word).width;
      });

      // Dibuja el comentario
      context.fillStyle = "#6A9955"; // Color verde para comentarios
      context.fillText(comment.comment, x, y);
    } else {
      // Dibuja la línea completa si no es un comentario
      const words = line.split(/(\s+)/);
      let x = padding;
      words.forEach((word) => {
        context.fillStyle = colorKeyword(word.trim());
        context.fillText(word, x, y);
        x += context.measureText(word).width;
      });
    }
    y += lineHeight;
  });

  const dataURL = canvas.toDataURL("image/png", 1.0);

  const downloadLink = document.getElementById("downloadLink");
  downloadLink.href = dataURL;
  downloadLink.style.display = "inline-block";

  const previewImage = document.getElementById("previewImage");
  previewImage.src = dataURL;
  previewImage.style.display = "block";
});

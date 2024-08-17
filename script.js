document.getElementById("generateImage").addEventListener("click", function () {
  const code = document.getElementById("codeInput").value;
  if (!code.trim()) {
    alert("Por favor, ingresa código PSeint.");
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
      Algoritmo: "#c678dd",
      FinAlgoritmo: "#c678dd",
      Si: "#c678dd",
      Entonces: "#c678dd",
      SiNo: "#c678dd",
      FinSi: "#c678dd",
      Para: "#c678dd",
      Hasta: "#c678dd",
      Con: "#c678dd",
      Paso: "#c678dd",
      FinPara: "#c678dd",
      Mientras: "#c678dd",
      Hacer: "#c678dd",
      FinMientras: "#c678dd",
      Repetir: "#c678dd",
      "Hasta Que": "#c678dd",
      Segun: "#c678dd",
      "De Otro Modo": "#c678dd",
      FinSegun: "#c678dd",

      // Declaraciones y tipos
      Definir: "#61afef",
      Como: "#61afef",
      Dimension: "#61afef",
      Entero: "#56b6c2",
      Real: "#56b6c2",
      Logico: "#56b6c2",
      Caracter: "#56b6c2",
      Cadena: "#56b6c2",
      Numero: "#56b6c2",

      // Entrada/Salida
      Escribir: "#98c379",
      Leer: "#98c379",
      Imprimir: "#98c379",

      // Operadores
      Y: "#c678dd",
      O: "#c678dd",
      NO: "#c678dd",
      MOD: "#56b6c2",
      "^": "#56b6c2",

      // Funciones matemáticas
      Abs: "#d19a66",
      Sen: "#d19a66",
      Cos: "#d19a66",
      Tan: "#d19a66",
      Asen: "#d19a66",
      Acos: "#d19a66",
      Atan: "#d19a66",
      Ln: "#d19a66",
      Exp: "#d19a66",
      Raiz: "#d19a66",
      Pi: "#d19a66",
      Aleatorio: "#d19a66",
      Azar: "#d19a66",

      // Funciones de cadenas
      Longitud: "#d19a66",
      Subcadena: "#d19a66",
      Mayusculas: "#d19a66",
      Minusculas: "#d19a66",
      ConvertirANumero: "#d19a66",
      ConvertirATexto: "#d19a66",

      // Otros
      Verdadero: "#d19a66",
      Falso: "#d19a66",
      Funcion: "#c678dd",
      FinFuncion: "#c678dd",
      Procedimiento: "#c678dd",
      FinProcedimiento: "#c678dd",
      Retornar: "#c678dd",
    };
    return keywords[word] || "#abb2bf";
  }

  let y = padding + 40;
  lines.forEach((line) => {
    const words = line.split(/(\s+)/);
    let x = padding;
    words.forEach((word) => {
      context.fillStyle = colorKeyword(word.trim());
      context.fillText(word, x, y);
      x += context.measureText(word).width;
    });
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

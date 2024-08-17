document.getElementById("compareButton").addEventListener("click", function () {
  const code1 = document.getElementById("code1").value;
  const code2 = document.getElementById("code2").value;

  const version1Lines = code1.split("\n");
  const version2Lines = code2.split("\n");

  let output = "";

  const maxLength = Math.max(version1Lines.length, version2Lines.length);

  for (let i = 0; i < maxLength; i++) {
    const line1 = version1Lines[i] || "";
    const line2 = version2Lines[i] || "";

    if (line1 === line2) {
      output += `<div class="highlight-sim">${line1}</div>\n`;
    } else {
      output += `<div class="highlight-diff">${line1}</div>\n`;
      output += `<div class="highlight-diff">${line2}</div>\n`;
    }
  }

  document.getElementById("output").innerHTML = output;
});

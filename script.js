let fields = [null, null, null, null, null, null, null, null, null];

function placeSymbol(index) {
  if (fields[index] === null) {
    // wenn die stelle des fields null ist (leer) dann wird es ausgeführt
    fields[index] = currentPlayer(); // funktion currenPlayer() wird aufgerufen
    document.getElementById("cell" + index).innerHTML = fields[index]; // Das feld wird mit dem index gefüllt, und wird dem array übergeben
    const winner = checkWinner(); // Überprüfe nach jedem Zug auf Gewinner
  }
}

function currentPlayer() {
  let countX = fields.filter(
    (symbol) => symbol === generateAnimatedXSVG()
  ).length; // schaut ob die felder ein x haben
  let countO = fields.filter((symbol) => symbol === generateCircleSVG()).length; // schaut ob die felder ein o haben
  return countX === countO ? generateAnimatedXSVG() : generateCircleSVG(); // wenn countX und countO gleich sind, ist X wieder dran
}

function generateCircleSVG() {
  const circleSVG = `
    <svg width="100" height="100" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
    <circle cx="35" cy="35" r="30" fill="none" stroke="#00B0EF" stroke-width="7">
        <animate attributeName="r" from="0" to="30" dur="1s" fill="freeze" />
        <animate attributeName="stroke-dasharray" from="0 188" to="188 188" dur="1s" fill="freeze" />
    </circle>
</svg>
`;
  return circleSVG;
}

function generateAnimatedXSVG() {
  const xHTML = `
    <svg width="100px" height="100px" viewBox="0 0 100 100">
    <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:yellow;stop-opacity:1" />
            <stop offset="100%" style="stop-color:yellow;stop-opacity:1" />
        </linearGradient>
    </defs>
    <path d="M 10 10 L 90 90" stroke="url(#grad)" stroke-width="20">
        <animate attributeName="stroke-opacity" from="0" to="1" dur="1s" fill="freeze" />
    </path>
    <path d="M 90 10 L 10 90" stroke="url(#grad)" stroke-width="20">
        <animate attributeName="stroke-opacity" from="0" to="1" dur="1s" fill="freeze" />
    </path>
</svg>
`;
  return xHTML;
}

function checkWinner() {
  // Alle möglichen Gewinnkombinationen
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Horizontale Reihen
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Vertikale Reihen
    [0, 4, 8],
    [2, 4, 6], // Diagonale Reihen
  ];

  // Überprüfe alle Gewinnkombinationen
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      // Wenn ein Spieler gewonnen hat
      markWinnerCells(combination); // Markiere die Felder des Gewinners
      return fields[a]; // Gebe das Gewinnersymbol zurück
    }
  }

  // Falls kein Spieler gewonnen hat
  return null;
}

function markWinnerCells(cells) {
  // Bestimme die Koordinaten der ersten und letzten Zelle
  const firstCell = document.getElementById("cell" + cells[0]);
  const lastCell = document.getElementById("cell" + cells[cells.length - 1]);

  // Berechne die Koordinaten des Strichs
  const x1 = firstCell.offsetLeft + firstCell.offsetWidth / 2;
  const y1 = firstCell.offsetTop + firstCell.offsetHeight / 2;
  const x2 = lastCell.offsetLeft + lastCell.offsetWidth / 2;
  const y2 = lastCell.offsetTop + lastCell.offsetHeight / 2;

  // Berechne die Länge und Winkel des Strichs
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  // Markiere die Gewinnerzellen mit einem weißen Strich
  for (let cellIndex of cells) {
    const cellElement = document.getElementById("cell" + cellIndex);
    cellElement.style.backgroundImage = `linear-gradient(${angle}deg, transparent calc(50% - 10px), white, transparent calc(50% + 10px))`;
    cellElement.style.backgroundSize = `${length}px 100%`;
    cellElement.style.backgroundRepeat = "no-repeat";
    cellElement.style.backgroundPosition = "center";
  }
}

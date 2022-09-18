import './style.css'
import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js@3.1.1";
import { random } from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.37";

console.clear();

let draw, squareSize, numRows, numCols, colors, colorPalette;
let giorno, mese, anno;

const container = document.querySelector(".container")
/*
Block Design Functions
*/

function drawBlock(x, y, background) {
  // Create group element
  const group = draw.group().addClass("draw-box");
  let radiuosSize = Math.abs(random(squareSize - 50, squareSize - 20, true));  
  let deltaCenter = (squareSize - radiuosSize) / 2 
  // Draw Block  
  group.rect(radiuosSize, radiuosSize).fill(background).move(x + deltaCenter, y + deltaCenter);
}


function drawCircle(x, y, background) {
  // Create group element
  const group = draw.group().addClass("draw-box");
  let radiuosSize = random(squareSize - 50, squareSize - 20, true);
  // Draw Block
  group.circle(radiuosSize).fill(background).move(x, y);
}

/*
Create New Piece
*/

function generateNewGrid() {
  // Remove SVG
  container.innerHTML = "";
  drawGrid();
}

async function drawGrid() {
  // Set Random Palette  
  colorPalette = random(colors);

  squareSize = random(20, 100, true);

  console.log(squareSize)
  
  // Set Variables  
  const rect = container.getBoundingClientRect();
  numRows = parseInt(rect.width / squareSize)
  numCols = parseInt(rect.height / squareSize)
  
  // Create parent SVG
  draw = SVG()
    .addTo(".container")
    .size("100%", "100%")
    .viewbox(`0 0 ${numRows * squareSize} ${numCols * squareSize}`);

  // Create Grid
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      generateLittleBlock(i, j);
    }
  }
}

function generateLittleBlock(i, j) {
  const xPos = i * squareSize;
  const yPos = j * squareSize;

  const background = random(colorPalette);

  drawBlock(xPos, yPos, background);
}

async function init() {
  // Get color palettes
  colors = await fetch(
    "https://unpkg.com/nice-color-palettes@3.0.0/100.json"
  ).then((response) => response.json());


  generateNewGrid();
  document.querySelector(".button").addEventListener("click", generateNewGrid);
}

init();
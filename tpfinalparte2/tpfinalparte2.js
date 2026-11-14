let fondo;
let fondoCapas = [];
let conejo_img = [];
let conejo_sonido;

let juego;

function preload() {
  fondo = loadImage("assets/images/bg/background.png");
  fondoCapas = preload_files("assets/images/bg/background", 6, ".png", loadImage, 1);
  conejo_img = preload_files("assets/images/enemies/bunny", 3, ".png", loadImage, 0);
  conejo_sonido = loadSound("assets/audio/sfx/bunny0.mp3")
}

function setup() {
  createCanvas(800, 400);

  juego = new Principal(11, 60);
}

function draw() {
  juego.actualizar();
}

function mousePressed() {
  juego.clicks();
}

function preload_files(arch_path, cant_files, formato, tipo, inicio) {
  let arch = [];

  for (let i = inicio; i < cant_files; i++) {
    arch.push(tipo(arch_path + i + formato));
  }
  return arch;
}
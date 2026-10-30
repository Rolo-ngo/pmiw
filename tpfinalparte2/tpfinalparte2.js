let conejo_img = [];
let conejo_sonido;

let juego;

function preload() {
  conejo_img = preload_files("assets/images/enemies/bunny", 1, ".png", loadImage, 0);
  conejo_sonido = loadSound("assets/audio/sfx/bunny0.mp3")
  //preload_files("assets/audio/sfx/bunny", 1, ".mp3", loadSound, 0);
}

function setup() {
  createCanvas(800, 400);

  juego = new Principal(32);
}

function draw() {
  background(255, 0, 0);
  juego.mostrar();
}

function mousePressed() {
  juego.sonido();
}

function preload_files(arch_path, cant_files, formato, tipo, inicio) {
  let arch = [];

  for (let i = inicio; i < cant_files; i++) {
    arch.push(tipo(arch_path + i + formato));
  }
  return arch;
}
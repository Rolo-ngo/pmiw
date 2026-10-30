let bunny = [];


function preload() {
  bunny = preload_files("assets/images/enemies/bunny", 1, ".png", loadImage, 0);
  //bunny = loadImage("assets/images/enemies/bunny0.png");
}

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(255, 0, 0);
  image(bunny[bunny.length - 1], 0, 0, 128, 128);
}

function preload_files(arch_path, cant_files, formato, tipo, inicio) {
  let arch = [];

  for (let i = inicio; i < cant_files; i++) {
    arch.push(tipo(arch_path + i + formato));
  }
  return arch;
}
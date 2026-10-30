let conejo_img = [];
let conejo_sonido = [];
let new_conejo;

function preload() {
  conejo_img = preload_files("assets/images/enemies/bunny", 1, ".png", loadImage, 0);
  conejo_sonido = preload_files("assets/audio/sfx/bunny", 1, ".mp3", loadSound, 0);
}

function setup() {
  createCanvas(800, 400);
  
  new_conejo = new Conejo(400, 200, 64, 64, conejo_img[conejo_img.length - 1]), conejo_sonido[conejo_sonido.length - 1];
}

function draw() {
  background(255, 0, 0);
  new_conejo.mostrar();
}

function mousePressed() {
  if (new_conejo.areaInteraccion()) {
    conejo_sonido[0].rate(random(0.8, 1.2))
    conejo_sonido[0].play();
  }
}

function preload_files(arch_path, cant_files, formato, tipo, inicio) {
  let arch = [];

  for (let i = inicio; i < cant_files; i++) {
    arch.push(tipo(arch_path + i + formato));
  }
  return arch;
}
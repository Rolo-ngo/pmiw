let anim_actual = 0;

function preload() {
  // Cargar animaciones
}

function setup() {
  createCanvas(800, 450);
}

function draw() {
  background(255, 0, 0);
}

function preload_anim(image_path, cant_frames) {
  let anim = [];

  for (let i = 0; i < cant_frames; i++) {
    anim.push(loadImage(image_path + i + ".png"));
  }

  return anim;
}

function iniciar_anim(nombre_anim, tiempo, pos_x, pos_y, tam_x, tam_y) {
  image(nombre_anim[anim_actual], pos_x, pos_y, tam_x, tam_y);

  if (frameCount % tiempo === 0) { // Si frameCount es un múltiplo
    anim_actual++;

    if (anim_actual >= nombre_anim.length) {
      anim_actual = 0;
    }
  }
}
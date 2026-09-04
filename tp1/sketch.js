let bg_img;
let anim_actual = 0;
let mario_anim;
let luigi_anim;
let mario_x_pos = -128;
let luigi_x_pos = -128;
let tam_sprites = 16 * 2.5;
let estado = 0;
let tiempo_estado = 0;

function preload() {
  anim_actual = 0;
  mario_anim = preload_anim("assets/mario/mario", 3);
  luigi_anim = preload_anim("assets/luigi/luigi", 3);
  bg_img = loadImage("assets/bg/bg.png");
}

function setup() {
  createCanvas(800, 600);
  //Hace más nítidos los pixeles
  noSmooth();
}

function draw() {
  //Fondo
  background(255, 0, 0);
  image(bg_img, 0, 0, bg_img.width * 2.5, bg_img.height * 2.5);

  //Animación
  tiempo_estado++;
  
  if (estado === 0) {
    iniciar_anim(mario_anim, 3, mario_x_pos + tiempo_estado*5, 480, tam_sprites, tam_sprites);

    if (tiempo_estado >= 200) {
      estado = 1;
      tiempo_estado = 0;
      anim_actual = 0;
    }
  }
  
  if (estado === 1) {
    iniciar_anim(luigi_anim, 3, luigi_x_pos + tiempo_estado*5, 480, tam_sprites, tam_sprites);

    if (tiempo_estado >= 200) {
      estado = 0;
      tiempo_estado = 0;
      anim_actual = 0;
    }
  }
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
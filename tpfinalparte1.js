let anim_actual = 0;
let escena_actual = 0;

// Imagenes
let menu_inicio;

// Sonidos
let background_music;

function preload() {
  // Cargar imagenes
  menu_inicio = loadImage("assets/images/bg/menu_inicio.png");

  // Cargar sonidos
  background_music = loadSound("assets/audio/music/background.mp3");

}

function setup() {
  createCanvas(800, 450);
  background(255, 0, 0);
}

function draw() {
  if (escena_actual === 0) {
    draw_menu_inicio();
  }
  else if (escena_actual === 1) {
    draw_creditos();
  }
}

function mousePressed() {
  if (!background_music.isPlaying()) {
    background_music.loop();
  }

  if (escena_actual === 0) {
    mouse_menu_inicio();
  }
  else if (escena_actual === 1) {
    mouse_creditos();
  }
}

function draw_menu_inicio() {
  image(menu_inicio, 0, 0);
  dibujar_boton(128, 360, 160, 50, "Empezar", 0);
}

function mouse_menu_inicio() {
  if (detectar_zona(128, 360, 160, 50)) {
    escena_actual = 1;
  }
}

function draw_creditos() {
  background(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Créditos", width / 2, height / 2 - 50);
  textSize(24);
  text("Desarrollado por:", width / 2, height / 2);
  text("Thiago Lionel Costa", width / 2, height / 2 + 30);
  text("Sebastián López Alegre", width / 2, height / 2 + 60);

  dibujar_boton(width / 2 - 80, 360, 160, 50, "Volver al menu", 0);
}

function mouse_creditos() {
  if (detectar_zona(width / 2 - 80, 360, 160, 50)) {
    escena_actual = 0;
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

function dibujar_boton(pos_x, pos_y, tam_x, tam_y, texto, bordes) {
  if (detectar_zona(pos_x, pos_y, tam_x, tam_y)) {
    fill(100);
  }
  else {
    fill(0);
  }

  rect(pos_x, pos_y, tam_x, tam_y, bordes);
  textSize(tam_y / 3);
  textAlign(CENTER, CENTER);
  fill(255);
  text(texto, pos_x + tam_x / 2, pos_y + tam_y / 2);


}

function detectar_zona(pos_x, pos_y, tam_x, tam_y) {
  if (mouseX > pos_x && mouseX < pos_x + tam_x && mouseY > pos_y && mouseY < pos_y + tam_y) {
    return true;
  }
  else {
    return false;
  }
}
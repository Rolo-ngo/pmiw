let anim_actual = 0;

// Escenas
let MENU = 0;
let CREDITOS = 3;
let ESCENA1 = 1;
let ESCENA2 = 2;
let escena_actual = MENU;

// Imagenes
let menu_inicio_img;
let menu_creditos_img;
let escenas_img;
// Sonidos
let background_music;

function preload() {
  // Cargar imagenes
  menu_inicio_img = loadImage("assets/images/bg/_menu_inicio.png");
  //menu_creditos_img = loadImage("assets/images/bg/menu_creditos.png");
  escenas_img = preload_anim("assets/images/bg/p", 3);

  // Cargar sonidos
  background_music = loadSound("assets/audio/music/background.mp3");

}

function setup() {
  createCanvas(800, 450);
  background(255, 0, 0);
  print(escena_actual);
  print(escenas_img);
}

function draw() {
  if (escena_actual === MENU) {
    draw_menu_inicio();
  }
  else if (escena_actual === CREDITOS) {
    draw_creditos();
  }
  else if (escena_actual === ESCENA1) {
    draw_escena1();
  }
  else if (escena_actual === ESCENA2) {
    draw_escena2();
  }
}

function mousePressed() {
  if (!background_music.isPlaying()) {
    //background_music.loop();
  }

  if (escena_actual === MENU) {
    mouse_menu_inicio();
  }
  else if (escena_actual === CREDITOS) {
    mouse_creditos();
  }
  else if (escena_actual === ESCENA1) {
    mouse_escena1();
  }
  else if (escena_actual === ESCENA2) {
    mouse_escena2();
  }
}

function draw_menu_inicio() {
  image(menu_inicio_img, 0, 0);
  dibujar_boton(128, 360, 160, 50, "Empezar", 0);
}

function mouse_menu_inicio() {
  if (detectar_zona(128, 360, 160, 50)) {
    escena_actual = ESCENA1;
  }
}

function draw_escena1() {
  background(0);
  //image(escenas_img[0], 0, 0);
  dibujar_boton(width / 2 - 80, 360, 160, 50, "Cambiar escena", 0);
}

function mouse_escena1() {
  if (detectar_zona(width / 2 - 80, 360, 160, 50)) {
    escena_actual = ESCENA2;
  }
}

function draw_escena2() {
  background(128);
  //image(escenas_img[1], 0, 0);
  dibujar_boton(width / 2 - 80, 360, 160, 50, "Cambiar escena", 0);
}

function mouse_escena2() {
  if (detectar_zona(width / 2 - 80, 360, 160, 50)) {
    escena_actual = CREDITOS;
  }
}

function draw_creditos() {
  background(64);
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
    escena_actual = MENU;
  }
}


function preload_anim(image_path, cant_frames) {
  let anim = [];

  for (let i = 1; i < cant_frames; i++) {
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
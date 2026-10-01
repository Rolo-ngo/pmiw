let anim_actual = 0;
let click = false;

// Escenas
let MENU = 0, ESCENA1 = 1, ESCENA2 = 2, CREDITOS = 3;
let escena_actual = MENU;
let total_escenas = 3;

// Imagenes
let escenas = [];
let textos = [];

// Sonidos
let background_music;

// Textos
let texto_creditos;

function preload() {
  // Cargar imagenes
  escenas = preload_files("assets/images/bg/p", total_escenas, ".png", loadImage);

  // Cargar sonidos
  background_music = loadSound("assets/audio/music/background.mp3");

  // Cargar textos
  texto_creditos = loadStrings("assets/texts/creditos.txt");
  //textos = preload_files("assets/texts/pantalla", 2, ".txt", loadStrings);

}

function setup() {
  createCanvas(800, 450);
}

function draw() {
  if (escena_actual === MENU) {
    draw_menu_inicio();
  }
  else if (escena_actual === CREDITOS) {
    draw_creditos();
  }
  else if (escena_actual === ESCENA1) {
    dibujar_escenas();
  }
  else if (escena_actual === ESCENA2) {
    dibujar_escenas();
  }
  click = false;
}

function mousePressed() {
  if (!background_music.isPlaying()) {
    //background_music.loop();
  }
  click = true;
  print("escena_actual: " + escena_actual);
}

function draw_menu_inicio() {
  image(escenas[0], 0, 0);

  dibujar_boton(128, 360, 160, 50, "Empezar", 0);
  if (click && detectar_zona(128, 360, 160, 50)) {
    escena_actual = ESCENA1;
  }
}

function draw_creditos() {
  background(64);

  estilo_texto(20, 255, CENTER, CENTER);
  text(texto_creditos.join("\n"), width / 2, height / 2);

  dibujar_boton(width / 2 - 80, 360, 160, 50, "Volver al menu", 0);
  if (click && detectar_zona(width / 2 - 80, 360, 160, 50)) {
    escena_actual = MENU;
  }
}

function preload_files(arch_path, cant_files, formato, tipo) {
  let arch = [];

  for (let i = 0; i < cant_files; i++) {
    arch.push(tipo(arch_path + i + formato));
  }
  return arch;
}

function dibujar_escenas() {
  background(255);
  image(escenas[escena_actual], 0, 0, width, height);

  dibujar_boton(width / 2 - 80, 360, 160, 50, "Cambiar escena", 0);
  if (click && detectar_zona(width / 2 - 80, 360, 160, 50)) {
    escena_actual++;
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
  estilo_texto(tam_y / 3, 255, CENTER, CENTER);
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

function estilo_texto(tam, color, align_x, align_y) {
  textSize(tam);
  fill(color);
  textAlign(align_x, align_y);
}

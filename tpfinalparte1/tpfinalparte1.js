let caracter_actual = 0;
let click = false;

// Escenas
let MENU = 0, ESCENA1 = 1, ESCENA2 = 2, ESCENA3 = 3, ESCENA4 = 4, ESCENA5 = 5, ESCENA6 = 6, ESCENA7 = 7, ESCENA8 = 8, ESCENA9 = 9, ESCENA10 = 10, CREDITOS = 11;
let escena_actual = MENU;
let total_escenas = 11;

// Imagenes
let escenas = [];

// Sonidos
let background_music = [];
let ui_sounds = [];

// Textos
let textos = [];
let texto_creditos;

function preload() {
  // Cargar imagenes
  escenas = preload_files("assets/images/bg/p", total_escenas, ".png", loadImage, 0);

  // Cargar sonidos
  background_music = loadSound("assets/audio/music/background.mp3");
  ui_sounds = preload_files("assets/audio/sfx/boton", 2, ".mp3", loadSound, 0);

  // Cargar textos
  texto_creditos = loadStrings("assets/texts/creditos.txt");
  textos = preload_files("assets/texts/pantalla", 11, ".txt", loadStrings, 1);
}

function setup() {
  createCanvas(800, 450);
}

function draw() {
  if (escena_actual === MENU) {
    draw_menu_inicio();
  } else if (escena_actual === CREDITOS) {
    draw_creditos();
  } else if (escena_actual === ESCENA1) {
    dibujar_escenas(ESCENA2, "Continuar");
  } else if (escena_actual === ESCENA2) {
    dibujar_escenas(ESCENA3);
  } else if (escena_actual === ESCENA3) {
    dibujar_escenas(ESCENA4, "esconder", ESCENA6, "enfrentar", ESCENA8, "huir");
  } else if (escena_actual === ESCENA4) {
    dibujar_escenas(ESCENA5);
  } else if (escena_actual === ESCENA5) {
    dibujar_escenas(ESCENA6);
  } else if (escena_actual === ESCENA6) {
    dibujar_escenas(ESCENA7);
  } else if (escena_actual === ESCENA7) {
    dibujar_escenas(ESCENA8);
  } else if (escena_actual === ESCENA8) {
    dibujar_escenas(ESCENA9);
  } else if (escena_actual === ESCENA9) {
    dibujar_escenas(ESCENA10);
  } else if (escena_actual === ESCENA10) {
    dibujar_escenas(CREDITOS);
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

  estilo_texto(20, 255, CENTER, CENTER, "courier");
  text(texto_creditos.join("\n"), width / 2, height / 2);

  dibujar_boton(width / 2 - 80, 360, 160, 50, "Volver al menu", 0, 100, 150);
  if (click && detectar_zona(width / 2 - 80, 360, 160, 50)) {
    escena_actual = MENU;
  }
}

function dibujar_escenas(escena_siguiente1, texto1, escena_siguiente2, texto2, escena_siguiente3, texto3) {
  image(escenas[escena_actual], 0, 0, width, height);

  fill(0, 200);
  rect(0, 0 + (height / 3) * 2, width, height / 3);

  estilo_texto(16, 255, LEFT, TOP, "courier");
  let texto_actual = textos[escena_actual - 1].join("\n").substring(0, caracter_actual);
  text(texto_actual, 20, (height / 3) * 2 + 10, width - 40, height / 3 - 20);
  caracter_actual += 0.4;

  if (escena_siguiente2 === undefined) {
    dibujar_boton(width / 2 - 80, 380, 150, 40, "Continuar", 0, escena_siguiente1);
  }
  else if(escena_siguiente3 === undefined){
    dibujar_boton(width / 5 - 80, 380, 140, 40, texto1, 0, escena_siguiente1);
    dibujar_boton(width / 1.2 - 80, 380, 140, 40, texto2, 0, escena_siguiente2);
  }
  else {
    dibujar_boton(width / 5 - 80, 380, 140, 40, texto1, 0, escena_siguiente1);
    dibujar_boton(width / 2 - 80, 380, 140, 40, texto2, 0, escena_siguiente2);
    dibujar_boton(width / 1.2 - 80, 380, 140, 40, texto3, 0, escena_siguiente3);
  }

}

function dibujar_boton(pos_x, pos_y, tam_x, tam_y, texto, bordes, escena_siguiente) {
  if (detectar_zona(pos_x, pos_y, tam_x, tam_y)) {
    fill(100);
  }
  else {
    fill(0);
  }
  if (click && detectar_zona(pos_x, pos_y, tam_x, tam_y)) {
    ui_sounds[1].play();
    caracter_actual = 0;
    escena_actual = escena_siguiente;
  }

  rect(pos_x, pos_y, tam_x, tam_y, bordes);
  estilo_texto(tam_y / 3, 255, CENTER, CENTER, "courier");
  text(texto, pos_x + tam_x / 2, pos_y + tam_y / 2);
}

function preload_files(arch_path, cant_files, formato, tipo, inicio) {
  let arch = [];

  for (let i = inicio; i < cant_files; i++) {
    arch.push(tipo(arch_path + i + formato));
  }
  return arch;
}



function detectar_zona(pos_x, pos_y, tam_x, tam_y) {
  if (mouseX > pos_x && mouseX < pos_x + tam_x && mouseY > pos_y && mouseY < pos_y + tam_y) {
    return true;
  }
  else {
    return false;
  }
}

function estilo_texto(tam, color, align_x, align_y, fuente) {
  textSize(tam);
  fill(color);
  textAlign(align_x, align_y);
  textFont(fuente);
}

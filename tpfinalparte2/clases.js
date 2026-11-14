class Principal {
    constructor(cant_conejos, tiempo) {
        this.fondo = new Fondo(fondo, fondoCapas);
        this.pantallas = new Pantallas();
        this.cant = cant_conejos;
        this.conejos = [];
        this.contador = new Contador(cant_conejos);
        this.timer = new Timer(tiempo);

        for (let i = 0; i < this.cant; i++) {
            let x, y;
            let zona = floor(random(5));

            if (zona === 0) {//ventana
                x = random(0, 160);
                y = random(200, 160);
            }
            else if (zona === 1) {//detras del sillon
                x = random(0, 50);
                y = random(335, 400);
            }
            else if (zona === 2) {//mueble
                x = random(350, 560);
                y = random(360, 400);
            }
            else if (zona === 3) {//tele
                x = random(530, 590);
                y = random(215, 242);
            }
            else { //cortinas
                x = random(700, 730);
                y = random(190, 315);
            }
            this.conejos[i] = new Conejo(x, y, random(50, 60), random(conejo_img), conejo_sonido);
        }
    }

    actualizar() {
        this.pantallas.actualizar(this);

        if (this.timer.seconds <= 0 && this.pantallas.estado === "juego") {
            this.pantallas.estado = "derrota";
        }
    }

    clicks() {
        this.pantallas.clics(this);
    }

    mostrar() {
        this.fondo.mostrarFondo();
        for (let i = 0; i < this.cant; i++) {
            this.conejos[i].mostrar();
        }
this.fondo.mostrarCapas();
        this.contador.mostrar_fondo();
        this.contador.cantidad_conejos();
        this.timer.actualizar();
    }

    sonido() {
        for (let i = 0; i < this.cant; i++) {
            if (this.conejos[i].activo && this.conejos[i].areaInteraccion()) {
                this.conejos[i].sonido();
                this.conejos[i].activo = false;
                this.contador.cant_conejos--;
            }
        }
    }
}
class Fondo {
    constructor(fondo, fondoCapas) {
        this.fondo = fondo;
        this.fondoCapas = fondoCapas;
    }

    mostrarFondo() {
        image(this.fondo, 0, 0, width, height);
    }
    mostrarCapas() {
        for (let i = 0; i < this.fondoCapas.length; i++) {
            image(this.fondoCapas[i], 0, 0, width, height);
        }
    }
}

class Conejo {
    constructor(x, y, tam, img, audio) {
        this.pos_x = x;
        this.pos_y = y;
        this.tam_x = tam;
        this.tam_y = tam;
        this.img = img;
        this.audio = audio;
        this.activo = true;
    }

    mostrar() {
        if (!this.activo) {
            return;
        }

        // Muestra el área de interacción - BORRAR/COMENTAR DESPUES DE TESTEAR POR FAVORRRR
        //fill(0, 255, 0);
        //rect(this.pos_x, this.pos_y, this.tam_x, this.tam_y);

        image(this.img, this.pos_x, this.pos_y, this.tam_x, this.tam_y);
    }

    sonido() {
        if (!this.activo) {
            return;
        }
        if (!this.audio.isPlaying()) {
            this.audio.rate(0.4, 1.4);
            this.audio.play();
        }
    }

    areaInteraccion() {
        return (mouseX > this.pos_x && mouseX < this.pos_x + this.tam_x && mouseY > this.pos_y && mouseY < this.pos_y + this.tam_y);
    }
}

class Timer {
    constructor(tiempo) {
        this.seconds = tiempo;
        this.ultimoTiempo = millis();
        this.texto = "Tiempo: 0.00s";
    }

    actualizar() {
        if (this.seconds <= 60 && frameCount % 60 == 0) {
            this.seconds--;
        }

        text("Tiempo: " + this.seconds + "s", width - 80, 20);
    }
}

class Contador {
    constructor(cant_conejos) {
        this.cant_conejos = cant_conejos;
    }

    mostrar_fondo() {
        fill(32);
        stroke(200);
        rectMode(CENTER, CENTER);
        rect(width / 2, 0, width, 80);
    }

    cantidad_conejos() {
        fill(255);
        textSize(16);
        textAlign(CENTER, CENTER);
        text("Cantidad de conejos: " + this.cant_conejos, width / 2, 20);
    }
}

class Pantallas {
    constructor() {
        this.estado = "inicio";
    }
    actualizar(juego) {
        if (this.estado === "inicio") {
            this.mostrarInicio();
        }
        else if (this.estado === "juego") {
            juego.mostrar();

            if (juego.contador.cant_conejos <= 0) {
                this.estado = "victoria";
            }
        }
        else if (this.estado === "victoria") {
            this.mostrarVictoria();
        }
        else if (this.estado === "derrota") {
            this.mostrarDerrota();
        }
    }
    clics(juego) {
        if (this.estado === "inicio") {
            this.estado = "juego";
        }
        else if (this.estado === "juego") {
            juego.sonido();
        }
        else if (this.estado === "victoria") {
            setup();
            this.estado = "inicio";
        }
        else if (this.estado === "derrota") {
            setup();
            this.estado = "inicio";
        }
    }
    mostrarInicio() {
        image(fondo, 0, 0, width, height);
        //background(228, 34, 73);
        background(0, 225);
        fill(255);
        textAlign(CENTER, CENTER);
        textFont("courier");

        textSize(32);
        text("Reglas", width / 2, 160);

        rectMode(CENTER, TOP);
        rect(width / 2, 178, 200, 2, 16);

        textSize(16);
        text("Encuentra a todos los conejos para ganar", width / 2, 220);

        textSize(12);
        text("Clickea en cualquier parte para empezar", width / 2, 320);
    }

    mostrarVictoria() {
        //background(228, 34, 73);
        background(12);
        fill(255);
        textAlign(CENTER, CENTER);
        textFont("courier");

        textSize(32);
        text("Ganaste", width / 2, 160);

        textSize(16);
        text("Encontraste a todos los conejos", width / 2, 220);

        textSize(12);
        fill(255);

        text("Clickea en cualquier parte para reiniciar", width / 2, 320);
    }

    mostrarDerrota() {
        //background(228, 34, 73);
        background(12);
        fill(255);
        textAlign(CENTER, CENTER);
        textFont("courier");

        textSize(32);
        text("Perdiste", width / 2, 160);

        textSize(16);
        text("No encontraste a todos los conejos", width / 2, 220);

        textSize(12);
        fill(255);
        text("Clickea en cualquier parte para reiniciar", width / 2, 320);
    }
}
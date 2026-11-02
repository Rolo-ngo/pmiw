class Principal {
    constructor(cant_conejos) {
        this.cant = cant_conejos;
        this.conejos = [];
        this.contador = new Contador(cant_conejos);

        for (let i = 0; i < this.cant; i++) {
            this.conejos[i] = new Conejo(random(width), random(height), random(32, 64), conejo_img[conejo_img.length - 1], conejo_sonido);
        }
    }

    mostrar() {
        for (let i = 0; i < this.cant; i++) {
            this.conejos[i].mostrar();
        }

        this.contador.mostrar_fondo();
        this.contador.cantidad_conejos();
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
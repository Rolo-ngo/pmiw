class Principal {
    constructor(cant_conejos) {
        this.fondo = new Fondo(fondo, fondoCapas);
        this.cant = cant_conejos;
        this.conejos = [];
        this.contador = new Contador(cant_conejos);

        for (let i = 0; i < this.cant; i++) {
            let x, y;
            let zona=floor(random(5));
            if(zona === 0){//dventana
                x = random(0,230);
                y = random(30,130);                
            }
            else if(zona === 1){//detras del sillon
            x = random(0,150);
            y = random(300, 380);
            }
            else if (zona === 2){//mueble
                x = random(480, 720);
                y = random(180, 270);
            }
            else if(zona === 3){//tele
                x = random(400, 600);
                y = random(185, 252);
            }
            else{
                x = random(700, 760);
                y = random(190, 315);
            }
            this.conejos[i] = new Conejo(x, y, random(32, 48), conejo_img[conejo_img.length - 1], conejo_sonido);
        }
    }

    mostrar() {
        this.fondo.mostrarFondo();

        for (let i = 0; i < this.cant; i++) {
            this.conejos[i].mostrar();
        }

        this.fondo.mostrarCapas();

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
class Fondo {
constructor (fondo, fondoCapas) {
this.fondo = fondo;
this.fondoCapas = fondoCapas;
}

mostrarFondo(){
image(this.fondo, 0, 0, width, height);
}
mostrarCapas(){
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
class Principal {
    constructor() {

    }
}

class Conejo {
    constructor(x, y, tam_x, tam_y, img, sonido) {
        this.pos_x = x;
        this.pos_y = y;
        this.tam_x = tam_x;
        this.tam_y = tam_y;
        this.img = img;
        this.sonido = sonido;
    }

    mostrar() {
        // Muestra el área de interracción - BORRAR/COMENTAR DESPUES DE TESTEAR POR FAVORRRR
        fill(0, 255, 0)
        rect(this.pos_x, this.pos_y, this.tam_x, this.tam_y)
        
        image(this.img, this.pos_x, this.pos_y, this.tam_x, this.tam_y);
    }

    sonido() {
        if (!this.sonido.isPlaying()) {
            this.sonido.play();
        }
    }

    areaInteraccion() {
        return (mouseX > this.pos_x && mouseX < this.pos_x + this.tam_x && mouseY > this.pos_y && mouseY < this.pos_y + this.tam_y)
    }
}
let TAU = Math.PI * 2

class Vector extends p5.Vector {
    constructor(r, th) {
        super(r * Math.cos(th), r * Math.sin(th))
    }
    r() {
        return this.mag()
    }
    th() {      // -PI < th <= PI
        return createVector(1, 0).angleBetween(this)
    }
}
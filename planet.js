let planet = {
    width: 2e10,
    r: new Vector(1.49e11, 0),
    v: new Vector(2.989e4, Math.PI / 2),
    draw() {
        noStroke()
        fill(150, 80, 80)
        console.log(this.r.th())
        circle(this.r.x, this.r.y, this.width)
    },
    move() {
        this.r.rotate(0.01)
    }
}
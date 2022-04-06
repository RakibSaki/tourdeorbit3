let star = {
    mass: 1.9891e30,
    mu: 1.9891e30 * 6.67408e-11,
    width: 7e10,
    resetMass(mass) {
        this.mass = mass
        this.mu = mass * 6.67408e-11
    },
    // draw() {
    //     noStroke()
    //     fill(0, 0, 100)
    //     circle(0, 0, 5e10)
    // }
    initiateDraw() {
        // give a radial gradient from white to transparent
        this.gradient = drawingContext.createRadialGradient(0, 0, 0, 0, 0, this.width / 2)
        this.gradient.addColorStop(0, color(0, 0, 100, 100))
        this.gradient.addColorStop(0.5, color(0, 0, 100, 90))
        this.gradient.addColorStop(1, color(0, 0, 0, 0))
    },
    draw() {
        noStroke()
        fill(0) // otherwise drawingContext.fillStyle messes everything up

        drawingContext.fillStyle = this.gradient

        circle(0, 0, this.width)
        drawingContext.fillStyle = 'black'
    }
}
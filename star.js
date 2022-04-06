let star = {
    mass: 1.9891e30,
    mu: 1.9891e30 * 6.67408e-11,
    width: 1e11,
    resetMass(mass) {
        this.mass = mass
        this.mu = mass * 6.67408e-11
    },
    // draw() {
    //     noStroke()
    //     fill(0, 0, 100)
    //     circle(0, 0, 5e10)
    // }
    draw() {
        noStroke()
        fill(0) // otherwise drawingContext.fillStyle messes everything up
        for (let i = 0; i < 50 * userZoom; i+= 1) {
            let factor = (i + 1) / (50 * userZoom)
            fill(0, 0, 100, (Math.pow(1 - factor, 5) * 100))
            circle(0, 0, factor * this.width)
        }
        drawingContext.fillStyle = 'black'
    }
}
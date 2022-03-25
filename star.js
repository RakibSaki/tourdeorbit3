let star = {
    mass: 1.9891e30,
    mu: 5.9891e29 * 6.67408e-11,
    resetMass(mass) {
        this.mass = mass
        this.mu = mass * 6.67408e-11
    },
    draw() {
        noStroke()
        fill(0, 0, 100)
        circle(0, 0, 5e10)
    }
}
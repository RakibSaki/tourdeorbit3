[PI, sq, sqrt, mu, acos] = [Math.PI, x => x * x, Math.sqrt, star.mu, x => Math.acos(clipNails(x))]

let planet = {
    width: 2e10,
    r: new Vector(1.19e11, 0),
    v: new Vector(2.989e4, PI / 2),
    drawOrbit() {

    },
    draw() {
        this.drawOrbit()
        noStroke()
        fill(150, 80, 80)
        circle(this.r.x, this.r.y, this.width)
    },
    drawVelocity() {
        stroke(0, 50, 100)
        let vdraw = this.v.copy()
        vdraw.normalize()
        vdraw.mult(this.width * 2.5)
        vdraw.add(this.r)
        line(this.r.x, this.r.y, vdraw.x, vdraw.y)
    },
    drawEllipticOrbit() {
        rotate(this.phi)
        translate(-this.ae, 0)
        // position of planet from origin of ellipse in the rotated frame where orbit is horizontal
        let phiPlanet = this.r.copy()
        phiPlanet.rotate(-this.phi)
        phiPlanet.add(new Vector(this.ae, 0))
        stroke(0, 0, 100, 30)
        // lines to foci
        line(phiPlanet.x, phiPlanet.y, this.ae, 0)
        line(phiPlanet.x, phiPlanet.y, -this.ae, 0)
        // directrices
        line(this.atoe, biggestVisible(), this.atoe, -biggestVisible())
        line(-this.atoe, biggestVisible(), -this.atoe, -biggestVisible())
        // lines to directrices
        stroke(200, 50, 100, 20)
        line(this.atoe, phiPlanet.y, phiPlanet.x, phiPlanet.y)
        line(-this.atoe, phiPlanet.y, phiPlanet.x, phiPlanet.y)
        stroke(0, 0, 100)
        noFill()
        ellipse(0, 0, this.a * 2, this.b * 2)
        translate(this.ae, 0)
        rotate(-this.phi)
    },
    move() {
        this.v.rotate(0.01)
        this.r.rotate(0.001)
        this.r.mult(1.001)
        this.calculateOrbit()
    },
    calculateOrbit() {
        this.E = (0.5 * sq(this.v.mag())) - (mu / this.r.mag())
        this.h = this.r.cross(this.v).z
        this.e = sqrt(1 + (this.E * 2 * sq(this.h) / sq(mu)))
        this.th = Math.acos(clipNails(((sq(this.h) / (mu * this.r.mag())) - 1) / this.e))
        console.log(this.th)
        if (this.r.dot(this.v) < 0) {   // if planet is approaching 0 phase (getting closer), then phase is negative
            this.th *= -1
        }
        this.phi = this.r.th() - this.th    // inclination of orbit relative to 'x-axis' of screen
        if (this.h < 0) {   // if rotating in negative direction, phi shoulb be reversed
            this.phi = this.r.th() + this.th
        }
        if (this.e < 1) {   // elliptic
            this.a = 0.5 * mu / (-this.E)
            this.ae = this.a * this.e
            this.atoe = this.a / this.e
            this.b = sqrt(sq(this.a) - sq(this.ae))
            this.drawOrbit = this.drawEllipticOrbit
        }
    },
}

function clipNails(x) {
    if (x > 1 && x - 1 < 0.00001) {
        return 1
    } else if (x < -1 && -1 - x < 0.00001) {
        return -1
    }
    return x
}
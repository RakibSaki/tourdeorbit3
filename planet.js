[PI, sq, sqrt, mu, acos] = [Math.PI, x => x * x, Math.sqrt, star.mu, x => Math.acos(clipNails(x))]

let planet = {
    width: 2e10,
    r: new Vector(1.49e11, 0),
    v: new Vector(3.229e4, -PI / 2),
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
    drawOpenOrbit() {
        rotate(this.phi)
        noFill()
        stroke(0, 0, 100)
        for (point of this.path) {
            circle(point[0], point[1], this.width / 10)
        }
        translate(-this.atoe, 0)
        stroke(0, 0, 100, 30)
        // directrix
        line(this.ae, biggestVisible(), this.ae, -biggestVisible())
        // position of planet from origin of hyperbola in the rotated frame where orbit is horizontal
        let phiPlanet = this.r.copy()
        phiPlanet.rotate(-this.phi)
        phiPlanet.add(new Vector(this.atoe, 0))
        // line to star
        line(phiPlanet.x, phiPlanet.y, this.atoe, 0)
        // line to directrix
        stroke(200, 50, 100, 20)
        line(this.ae, phiPlanet.y, phiPlanet.x, phiPlanet.y)
        translate(this.atoe, 0)
        rotate(-this.phi)
    },
    move(time) {
        let costh0 = Math.cos(this.th)
        let cosu0 = (this.e + costh0) / (1 + (this.e * costh0))
        let u0 = Math.acos(clipNails(cosu0))
        if (this.th > PI) {
            u0 = (2 * PI) - u0
        }
        let sinu0 = Math.sin(u0)
        let M0 = u0 - (this.e * sinu0)
        let tof0 = this.T * M0 / (2 * PI)
        let tof1 = (tof0 + time) % this.T
        let M1 = tof1 * 2 * PI / this.T
        let [u, u1] = [0, M1]
        while (Math.abs(u1 - u) > 0.0001) {
            [u, u1] = [u1, M1 + (this.e * Math.sin(u1))]
        }
        let cosu1 = Math.cos(u1)
        let costh1 = (cosu1 - this.e) / (1 - (this.e * cosu1))
        this.th = Math.acos(clipNails(costh1))
        if (tof1 > this.T / 2) {
            this.th = (2 * PI) - this.th
        }
        let rmag = this.h * this.h / (mu * (1 + (this.e * Math.cos(this.th))))
        if (this.h > 0) {
            this.r = new Vector(rmag, this.phi + this.th)
        } else {
            this.r = new Vector(rmag, this.phi - this.th)
        }
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
            this.T = sqrt(4 * sq(PI) * Math.pow(this.a, 3) / mu)
            this.drawOrbit = this.drawEllipticOrbit
        } else {
            // find path
            this.path = []
            this.farthestAngle = Math.acos(- 1 / this.e)
            let steps = 30
            for (let i = 1; i < steps; i++) {
                let th = this.farthestAngle - (2 * this.farthestAngle * i / steps)
                let r = new Vector(this.h * this.h / (mu * (1 + (this.e * Math.cos(th)))), th)
                this.path.push([r.x, r.y])
                this.path.push([r.x, -r.y])
            }
            // other calculations
            this.a = 0.5 * mu / (this.E)
            this.ae = this.a * this.e
            this.atoe = this.a / this.e
            this.drawOrbit = this.drawOpenOrbit
        }
    },
}

planet.r.rotate(PI / 3)
planet.v.rotate(PI / 3)

function clipNails(x) {
    if (x > 1 && x - 1 < 0.00001) {
        return 1
    } else if (x < -1 && -1 - x < 0.00001) {
        return -1
    }
    return x
}
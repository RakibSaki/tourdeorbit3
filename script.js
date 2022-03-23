function setup() {
    createCanvas(windowWidth, windowHeight)
    colorMode(HSB, 360, 100, 100, 100)
    planet.calculateOrbit()
}

let unitsZoom = 1 / 1e9     // 1 pixel shows 1 billion meters
let userZoom = 1        // user can further control zoom
let biggestVisible = () => (width + height) / (unitsZoom * userZoom)

function draw() {
    background(0)
    translate(width / 2, height / 2)
    scale(1, -1)
    scale(unitsZoom * userZoom)
    strokeWeight(1 / (unitsZoom * userZoom))
    planet.drawVelocity()
    planet.draw()
    star.draw()
    planet.move()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}
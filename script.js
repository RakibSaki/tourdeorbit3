function setup() {
    createCanvas(windowWidth, windowHeight)
    colorMode(HSB, 360, 100, 100, 100)
    planet.calculateOrbit()
}

let unitsZoom = 1 / 1e9     // 1 pixel shows 1 billion meters
let userZoom = 1        // user can further control zoom
let biggestVisible = () => (width + height) / (unitsZoom * userZoom)

let tscale = 6311.52    // 1 real millisecond represents this many virtual seconds (so an earth year is shown in five seconds)
let lastTime = 0

function draw() {
    background(0)
    translate(width / 2, height / 2)
    scale(1, -1)
    scale(unitsZoom * userZoom)
    strokeWeight(1 / (unitsZoom * userZoom))
    planet.drawVelocity()
    planet.draw()
    star.draw()
    planet.move((millis() - lastTime) * tscale)
    lastTime = millis()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

function zoomIn() {
    userZoom *= 1.1
    document.querySelector('#sscale').innerHTML = (150 / (userZoom * unitsZoom)).toPrecision(3)
}

function zoomOut() {
    userZoom /= 1.1
    document.querySelector('#sscale').innerHTML = (150 / (userZoom * unitsZoom)).toPrecision(3)
}
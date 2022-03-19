function setup() {
    createCanvas(windowWidth, windowHeight)
    colorMode(HSB, 360, 100, 100, 100)
}

let unitsZoom = 1 / 1e9     // 1 pixel shows 1 billion meters
let userZoom = 1        // user can further control zoom

function draw() {
    background(0)
    translate(width / 2, height / 2)
    scale(1, -1)
    scale(unitsZoom * userZoom)
    // planet.draw()
    star.draw()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}
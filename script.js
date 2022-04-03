function setup() {
    createCanvas(windowWidth, windowHeight)
    colorMode(HSB, 360, 100, 100, 100)
    planet.calculateOrbit()
}

let unitsZoom = 1 / 1e9     // 1 pixel shows 1 billion meters
let userZoom = 1        // user can further control zoom
let biggestVisible = () => (width + height) / (unitsZoom * userZoom)

let itscale = 6311.52
let tscale = 6311.52    // 1 real millisecond represents this many virtual seconds (so an earth year is shown in five seconds)
let lastTime = 0

let play = false

let toChange = null


function logItem(property, units, calculator) {
    return {
        property,
        units,
        calculator
    }
}

let logList = [
    logItem('Distance', 'meters', () => planet.r.mag()),
    logItem('Speed', 'meters per second', () => planet.v.mag())
]

function draw() {
    background(0)
    translate(width / 2, height / 2)
    scale(1, -1)
    scale(unitsZoom * userZoom)
    strokeWeight(1 / (unitsZoom * userZoom))
    planet.drawVelocity()
    planet.draw()
    star.draw()
    if (play) {
        planet.move((millis() - lastTime) * tscale)
        lastTime = millis()
    }
    let values = document.querySelectorAll('#logger p .property-value')
    for (let i = 0; i < values.length; i++ ) {
        values[i].innerHTML = logList[i].calculator().toPrecision(4).toString()
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

function mouseDragged() {
    if (toChange) {
        if (toChange == 'Position') {
            let factor = 1 / (userZoom * unitsZoom)
            planet.r.add((mouseX - pmouseX) * factor, (pmouseY - mouseY) * factor)
        } else if (toChange == 'Velocity') {
            let factor = planet.v.mag() / 100
            planet.v.add((mouseX - pmouseX) * factor, (pmouseY - mouseY) * factor)
        } else if (toChange == 'Star Mass') {
            star.resetMass(star.mass * (1 + ((mouseX - pmouseX) / 500)))
        }
        planet.calculateOrbit()
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#play').addEventListener('click', e => {
        if (!play) {
            lastTime = millis()
            e.target.innerHTML = 'pause_circle'
        } else {
            e.target.innerHTML = 'play_circle'
        }
        play = !play
    })
    let changeButtons = document.querySelectorAll('#change div span')
    let changeGuide = document.querySelector('#change-guide')
    for (let button of changeButtons) {
        button.addEventListener('click', () => {
            if (button.classList.value == 'selected') {
                button.classList.remove('selected')
                changeGuide.innerHTML = 'Select a property to change'
                toChange = null
            } else {
                for (let otherButton of changeButtons) {
                    otherButton.classList.remove('selected')
                }
                button.classList.add('selected')
                changeGuide.innerHTML = 'Drag mouse to change ' + button.innerHTML
                toChange = button.innerHTML
            }
        })
    }
    document.querySelector('#menu').addEventListener('click', e => {
        if (e.target.innerHTML.trim() == 'menu') {
            document.querySelector('#tools').style.display = 'none'
            e.target.innerHTML = 'menu_open'
        } else {
            document.querySelector('#tools').style.display = 'block'
            e.target.innerHTML = 'menu'
        }
    })
    let logger = document.querySelector('#logger')
    for (let property in logList) {
        let p = document.createElement('p')
        let pr = document.createElement('span')
        let un = document.createElement('span')
        let va = document.createElement('span')
        pr.innerHTML = property.property
        un.innerHTML = property.units
        va.innerHTML = property.calculator().toPrecision(4).toString()
        va.classList.add('property-value')
        p.appendChild(pr)
        p.appendChild(un)
        p.appendChild(va)
        logger.appendChild(p)
    }
})

function zoomIn() {
    userZoom *= 1.1
    document.querySelector('#sscale').innerHTML = (150 / (userZoom * unitsZoom)).toPrecision(3)
}

function zoomOut() {
    userZoom /= 1.1
    document.querySelector('#sscale').innerHTML = (150 / (userZoom * unitsZoom)).toPrecision(3)
}

function faster() {
    tscale *= 1.1
    document.querySelector('#tscale').innerHTML = (5 * itscale / tscale).toPrecision(3)
}

function slower() {
    tscale /= 1.1
    document.querySelector('#tscale').innerHTML = (5 * itscale / tscale).toPrecision(3)
}
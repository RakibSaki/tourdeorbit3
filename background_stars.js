let backgroundStars = {
    "positions": [],    // vectors
    "widths": [],       // strokeWeights
    "hues": [],         // hue of color
    "periods": [],      // period of twinkling
    "fades": [],        // maximum fading during twinkling
    "populated": 0,     // upto how far from origin stars have been drawn
    draw() {
        for (let i = 0; i < this["positions"].length; i++) {
            stroke(this["hues"][i], 15, 90, 100 - parseInt(periodize(this["fades"][i], millis() % this["periods"][i], this["periods"][i])))
            strokeWeight(this["widths"][i])
            point(this["positions"][i].x, this["positions"][i].y)
        }
    }
}

function populateBackgroundStars(width, height) {
    r = Math.sqrt((width * width) + (height * height))
    for (let i = backgroundStars["populated"]; i < r; i++) {
        stars = parseInt(Math.random() * 1 + (2 * PI * i / 7000))
        for (let j = 0; j < stars; j++) {
            backgroundStars["positions"].push(new Vector(i, Math.random() * TAU))
            backgroundStars["widths"].push(parseInt(4 * Math.random()))
            backgroundStars["hues"].push(parseInt(Math.random() * 360))
            backgroundStars["periods"].push(400 + parseInt(Math.random() * 8000))
            backgroundStars["fades"].push(Math.random() * 70)
        }
    }
    backgroundStars["populated"] = r
}

function periodize(maxV, phase, period) {
    // phase = TAU * phase / period
    // console.log("period is", period)
    // return (maxV / 2) + (sin(phase) * (maxV / 2))
    phase = phase / period
    if (phase < 0.5) {
        return maxV * phase / 0.5
    } else {
        return maxV * (1 - phase) / 0.5
    }
}
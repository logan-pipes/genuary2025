/*
 * Genuary 2025 Day 2
 * Layers upon layers upon layers.
 *
 * Logan Pipes
 */

let width = 400;
let num_layers_init = 50;
let thickness = 3;
let scaling_const_min = 0.95;
let scaling_const_max = 1.05;
let scaling_const;
let layers;

function setup() {
    createCanvas(width, width);
    background(255);
    strokeWeight(thickness);
    scaling_const = 1.01;
    layers = [];

    let root = Math.pow(width, 1/num_layers_init);

    for (let layer = 0; layer < num_layers_init; layer++) {
        let p = p5.Vector.random2D();
        let dist = Math.pow(root, layer);
        p.setMag(dist);

        let pair = {
            vec: p,
            color: randomColor()
        };
        layers.push(pair);
    }
}

function draw() {
    translate(width/2, width/2);

    let delta = scaling_const_max - scaling_const_min;
    let percentage = min(max(0.0, mouseX/width), 1.0);
    scaling_const = scaling_const_min + delta*percentage;

    layers.sort((a, b) => a.vec.mag() - b.vec.mag());
    for (let layer = 0; layer < layers.length; layer++) {
        let p = layers[layer].vec;
        fill(layers[layer].color);
        edge(p);

        p.mult(scaling_const);
        if (scaling_const > 1 && p.mag() > width) {
            let new_point = p5.Vector.random2D();
            new_point.setMag(random());
            let new_color = randomColor();
            layers[layer].vec = new_point;
            layers[layer].color = new_color;
        } else if (scaling_const < 1 && p.mag() < 1) {
            let new_point = p5.Vector.random2D();
            new_point.setMag(width + random());
            let new_color = randomColor();
            layers[layer].vec = new_point;
            layers[layer].color = new_color;
        }
    }
}

function edge(p) {
    let unit = p5.Vector.normalize(p);
    let normal_1 = p5.Vector.rotate(unit, HALF_PI);
    let normal_2 = p5.Vector.rotate(unit, -HALF_PI);
    let e = unit.copy();
    normal_1.setMag(width);
    normal_2.setMag(width);
    e.setMag(2*width);

    let c1 = p5.Vector.add(p, normal_1);
    let c2 = p5.Vector.add(p, normal_2);
    let c3 = p5.Vector.add(c2, e);
    let c4 = p5.Vector.add(c1, e);
    quad(c1.x, c1.y, c2.x, c2.y, c3.x, c3.y, c4.x, c4.y);
}

function randomColor() {
    let r = random(255);
    let g = random(255);
    let b = random(255);
    return color(r, g, b);
}

new p5();

class Boid
{
    constructor(x = random(width), y = random(height))
    {
        this.position = createVector(x, y);

        this.velocity = createVector(random(-11, 11), random(-11, 11));
        this.velocity.normalize(); //Creates a unit vector
        this.velocity.setMag(random(0.5, 1.5))

        this.acceleration = createVector();
        this.maxForce = 0.2;
        this.maxSpeed = 3;
    }

    flock(boids)
    {
        let cohesion = this.cohesion(boids).mult(1.5);
        let seperation = this.seperation(boids).mult(1.5);
        let alignment = this.alignment(boids).mult(1.5);

        this.acceleration = cohesion;
        this.acceleration.add(seperation);
        this.acceleration.add(alignment);
        this.acceleration.limit(this.maxForce);
    }

    cohesion(boids)
    {
        let steering = createVector(0, 0);
        let num = 0;
        let maxRadius = 50;

        for (let other of boids)
        {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (d<=maxRadius && other!=this)
            {
                steering.add(other.position)
                num++;
            }
            // num++;
        }
        if (num > 0)
        {
            steering.div(num);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        // console.log(steering);
        return steering;
    }

    seperation(boids)
    {
        let steering = createVector(0, 0);
        let num = 0;
        let maxRadius = 50;
        let mag = 0;

        for (let other of boids)
        {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (d<=maxRadius && other!=this)
            {
                let diff = p5.Vector.sub(this.position, other.position); //try normalize instead of div!!!!
                diff.div(d);
                steering.add(diff);
                num++;
            }
            // num++;
        }
        if (num>0)
        {
            steering.div(num);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        // else if (num==0)
        // {   

        //     steering = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
        // }
        return steering;
    }

    alignment(boids)
    {
        let steering = createVector(0,0);
        let maxRadius = 50;
        let total = 0;
        for (let other of boids)
        {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y)
            if (d <= maxRadius && other != this)
            {
                steering.add(other.velocity);
                total++;
            }
        }
        if (total > 0)
        {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
            // this.velocity = avg;
        }
        return steering;
    }

    show()
    {
        let theta = this.velocity.heading() + radians(90);
        fill(127);
        stroke(200);
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);
        beginShape();
        vertex(0, -3 * 2);
        vertex(-3, 3 * 2);
        vertex(3, 3 * 2);
        endShape(CLOSE);
        pop();
    }

    edges()
    {
        if (this.position.x>=width)
        {
            this.position.x = 0;
        }
        else if (this.position.x<=0)
        {
            this.position.x = width;
        }
        if (this.position.y>=height)
        {
            this.position.y = 0;
        }
        else if (this.position.y<=0)
        {
            this.position.y = height;
        }
    }

    update()
    {
        // this.acceleration = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
    }
}

function setup(){
    createCanvas(900, 500);
    // console.log("hello");
    boids = [];
    num = 40;
    for(let i=0; i<num;i++)
    {
        boids[i] = new Boid(); 
    }
}

function draw()
{
    background(51);
    for (let i=0;i<num;i++)
    {
        boids[i].flock(boids, 20);
        boids[i].edges();
        boids[i].update();
        // A.edge();
    }
    for (let i=0;i<num;i++)
    {
        boids[i].show();
        // A.edge();
    }
}

// function mousePressed(event)
// {
//     console.log(event.x, event.y);
//     boids[num+1] = new Boid(event.x, event.y);
//     num++;
// }

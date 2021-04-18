import { PhysicsBody } from './physics-body.js';

export class Attractor extends PhysicsBody {
  constructor(initialPosition, mass) {
    super(initialPosition, mass);

    this.G = 1;
  }

  attract(body) {
    const force = new p5.Vector.sub(this.position, body.position);
    const distance = constrain(force.mag(), 5.0, 15);

    force.normalize();
    force.mult(
      (this.G * this.mass * body.mass) / (distance * distance)
    );

    body.applyForce(force);
  }
}
export class PhysicsBody {

  constructor(initPosition, mass) {
    
    this.position = initPosition;
    this.mass = mass || 1;

    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);

    this._active = true;
  }

  applyForce(force) {
    const force_ = force.copy();
    this.acceleration = this.acceleration.add(force_.div(this.mass));
  }

  applyCollinearForce(mag) {
    const force_ = this.velocity.copy();
    force_.normalize();
    force_.mult(mag);

    this.applyForce(force_);
  }

  applyFriction(coeff) {
    this.applyCollinearForce(-coeff);
  }

  draw() {}

  update() {
    this.draw();
    this._move();
  }

  _move() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    this.acceleration.mult(0);
  }
}

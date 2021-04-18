class PhysicsBody {

  constructor(initPosition, mass) {
    
    this.position = initPosition;
    this.mass = mass || 0;

    this.velocity = initPosition || new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);

    this._active = true;
  }

  pause() {
    this._active = false;
  }
  start() {
    this._active = true;
    this._update();
  }

  applyForce(force) {
    const force_ = new p5.Vector(force);
    this.acceleration.add(force_.div(mass));
  }

  applyCollinearForce(mag) {
    const force_ = new p5.Vector(this.velocity);
    force_.normalize();
    force_.apply(mag);

    this.applyForce(force_);
  }

  applyFriction(coeff) {
    this.applyCollinearForce(-coeff);
  }

  draw() {}

  _move() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    this.acceleration.mult(0);
  }

  _update() {
    this.draw();
    this._move();

    if (this._active) {
      requestAnimationFrame(this._update.bind(this));
    }
  }
}

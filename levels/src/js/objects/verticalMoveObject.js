class VerticalMoveObject extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, spriteName, symmetry, deepVal) {
    super(scene, x, y, spriteName);
    this.scene = scene;
    this.direction =
      x < this.scene.cameraWidth / 2
        ? new Phaser.Math.Vector2(-12 / 11, 1)
        : new Phaser.Math.Vector2(12 / 11, 1);
    this.velocity = 0.2;
    this.scaleSpeed = 0.0002;
    this.minScale = 0.1;
    this.maxScale = 1;
    this.symmetry = symmetry;
    this.deepVal = deepVal;

    this.init();
  }

  init() {
    this.scene.add.existing(this);
    // Set properties
    this.scene.envGroup.add(this);
    this.setOrigin(0.5, 1);
    this.scaleX = this.symmetry ? -this.minScale : this.minScale;
    this.scaleY = this.minScale;
    this.depth = this.deepVal;
  }

  update(deltaTime) {
    // Movement
    let newX = this.direction.x * this.velocity * deltaTime;
    let newY = this.direction.y * this.velocity * deltaTime;
    this.x += newX;
    this.y += newY;
    // Scale
    let newScale = Phaser.Math.Clamp(
      this.scaleY + deltaTime * this.scaleSpeed,
      this.minScale,
      this.maxScale
    );
    this.scaleX = this.symmetry ? -newScale : newScale;
    this.scaleY = newScale;

    if (this.y > this.scene.cameraHeight + 100) {
      this.destroy();
    }
  }
}

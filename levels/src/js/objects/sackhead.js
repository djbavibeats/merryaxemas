class Sackhead extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, spriteName, id) {
    super(scene, x, y, spriteName);
    this.scene = scene;
    this.houseCollider;
    this.chimneyCollider;
    this.bounceCount = 0;
    this.maxBounce = 2;
    this.scoreValue = 400;
    this.chimneyHitBlinkCount = 6;
    this.currentBlinkCount = 0;
    this.tintChanged = false;
    this.hitProgress = false;
    this.id = id;
    this.init();
  }

  init() {
    this.scene.add.existing(this);
    // Set properties
    this.setScale(0.4);
    this.setDepth(101);
    this.scene.headGroup.add(this);
    this.body.setSize(150, 150);
    this.body.setOffset(25, 25);
    this.body.setVelocity(-400, -600);
    this.body.setBounce(0.6);
    // Add colliders
    this.houseCollider = this.scene.physics.add.collider(
      this,
      this.scene.houseGroup,
      this.headHitHouse,
      null,
      this
    );
    this.chimneyCollider = this.scene.physics.add.overlap(
      this,
      this.scene.chimneyGroup,
      this.headHitChimney,
      null,
      this
    );
  }

  headHitHouse() {
    this.scene.physics.world.removeCollider(this.chimneyCollider);
    this.bounceCount++;
    if (this.bounceCount == this.maxBounce)
      this.scene.physics.world.removeCollider(this.houseCollider);
  }

  headHitChimney(head, chimney) {
    this.scene.updateScore(this.scoreValue, this.scene.prevHitHeadId, head.id);

    var hitBlink = setInterval(
      function() {
        if (this.currentBlinkCount < this.chimneyHitBlinkCount) {
          if (this.tintChanged) {
            chimney.clearTint();
            this.tintChanged = false;
          } else {
            chimney.setTintFill(0xff0000);
            this.tintChanged = true;
          }
          this.currentBlinkCount++;
        } else {
          clearInterval(hitBlink);
          this.currentBlinkCount = 0;
          // if (this.scene.santaChimneyCollideSFX)
          //   this.scene.santaChimneyCollideSFX.stop();
        }
      }.bind(this),
      50
    );
    this.visible = false;
    this.destroy();
  }
}

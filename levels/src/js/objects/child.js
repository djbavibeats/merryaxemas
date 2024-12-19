class Child extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, spriteName, id, depth) {
    super(scene, x, y, spriteName);
    this.scene = scene;
    this.id = id;
    this.depth = depth;
    this.dieBodyName = spriteName + "_die_body";
    this.dieHeadName = spriteName + "_die_head";
    this.dieBody = null;
    this.dieHead = null;
    this.childCollider = null;
    this.maxDeltaX = 50;
    this.direction =
      x < this.scene.cameraWidth / 2
        ? new Phaser.Math.Vector2(
          (12 / 16) * ((x - this.scene.cameraWidth / 2) / this.maxDeltaX),
          1
        )
        : new Phaser.Math.Vector2(
          (12 / 16) * ((x - this.scene.cameraWidth / 2) / this.maxDeltaX),
          1
        );
    this.velocity = 0.2;
    this.scaleSpeed = 0.0002;
    this.minScale = 0.1;
    this.maxScale = 0.8;
    this.dieTrigger = false;
    this.scoreValue = 300;

    this.init();
  }

  init() {
    this.scene.add.existing(this);
    // Set properties
    this.scene.childGroup.add(this);
    this.setOrigin(0.5, 1);
    this.setScale(this.minScale);
    this.setDepth(this.depth);
    this.body.setSize(this.width / 2, 50);
    this.body.setOffset(this.width / 2 - this.width / 4, this.height / 2 - 25);
    this.body.allowGravity = false;
    // Add die objects
    this.dieBody = this.scene.add.sprite(this.x, this.y, this.dieBodyName);
    this.dieBody.setOrigin(0.5, 1);
    this.dieBody.setScale(this.minScale);
    this.dieBody.visible = false;
    this.dieBody.setDepth(this.depth - 1);
    this.dieHead = this.scene.physics.add.sprite(
      this.x,
      this.y,
      this.dieHeadName
    );
    this.dieHead.setOrigin(0.5, 1);
    this.dieHead.setScale(this.minScale);
    this.dieHead.visible = false;
    this.dieHead.body.allowGravity = false;
    this.dieHead.setDepth(this.depth - 1);
    // Add colliders
    this.childCollider = this.scene.physics.add.overlap(
      this,
      this.scene.santa,
      this.axeHitHead,
      null,
      this
    );
  }

  update(deltaTime) {
    // Movement
    let newX = this.direction.x * this.velocity * deltaTime;
    let newY = this.direction.y * this.velocity * deltaTime;
    this.x += newX;
    this.y += newY;
    this.dieBody.x += newX;
    this.dieBody.y += newY;
    if (!this.dieTrigger) {
      this.dieHead.x += newX;
      this.dieHead.y += newY;
    }
    // Scale
    let newScale = Phaser.Math.Clamp(
      this.scale + deltaTime * this.scaleSpeed,
      this.minScale,
      this.maxScale
    );
    this.setScale(newScale);
    this.dieBody.setScale(newScale);
    this.dieHead.setScale(newScale);

    if (this.y > this.scene.cameraHeight) {
      this.destroy();
      this.dieBody.destroy();
      this.dieHead.destroy();
    }
  }

  axeHitHead(child, santa) {
    if (!santa.axeTrigger) return;
    this.scene.physics.world.removeCollider(this.childCollider);
    this.visible = false;
    this.dieBody.visible = true;
    this.dieHead.visible = true;
    this.dieBody.play(this.dieBodyName + "_anim", true);
    this.dieHead.play(this.dieHeadName + "_anim", true);
    this.dieHead.body.allowGravity = true;
    this.dieHead.body.setVelocity(
      Math.random() * 1400 - 700,
      -(Math.random() * 400 + 600)
    );
    this.dieTrigger = true;

    // this.scene.updateHealth(
    //   Math.floor(
    //     this.scene.health -
    //       this.scene.maxHealth / this.scene.santa.availableHitChild
    //   )
    // );

    this.scene.updateScore(
      this.scoreValue,
      this.scene.prevHitChildId,
      child.id
    );
  }
}

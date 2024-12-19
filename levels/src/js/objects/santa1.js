class Santa1 extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, spriteName) {
    super(scene, x, y, spriteName);
    this.scene = scene;
    this.prevOverlappedChimney = null;
    this.availableHitChimney = 3;
    this.isLevelCompleted = false;
    this.chimneyCollider = null;
    this.santaDamagedBlinkCount = 6;
    this.currentBlinkCount = 0;
    this.tintChanged = false;
    this.damagedProgress = false;
    this.init();
  }

  init() {
    this.scene.add.existing(this);
    // Set properties
    this.scene.santaGroup.add(this);
    this.setScale(0.8);
    this.depth = 100;
    // this.body.setCollideWorldBounds(true);
    this.body.setSize(20, 380);
    this.body.setOffset(260, 0);
    this.body.setBounce(0.2);
    // Add colliders
    this.chimneyCollider = this.scene.physics.add.overlap(
      this,
      this.scene.chimneyGroup,
      this.santaHitChimney,
      null,
      this
    );

    // this.scene.input.on(
    //   "pointerdown",
    //   function(pointer) {
    //     if (this.body.touching.down) {
    //       this.scene.addHead(this.scene.headCount);
    //       this.body.setVelocityY(-1000);
    //     }
    //   },
    //   this
    // );
  }

  update(deltaTime) {
    if (this.isLevelCompleted) {
      this.scene.physics.world.removeCollider(this.chimneyCollider);
      this.x += deltaTime * 1.2;
      this.anims.play("run", true);

      if (this.x > this.scene.cameras.cameras[0].width) {
        this.scene.levelCompleted();
      }
      return;
    }

    if (this.body.touching.down) {
      this.anims.play("run", true);
    } else {
      this.anims.play("jump", true);
    }

    if (
      (this.scene.input.activePointer.isDown || this.scene.spacebar.isDown) &&
      this.body.touching.down &&
      !this.scene.btnOver
    ) {
      var willAddHead = Math.random() >= 0.5;
      if (willAddHead) this.scene.addHead(this.scene.headCount);
      this.body.setVelocityY(-1100);
    }

    // if (this.scene.pointer.leftButtonDown() && this.body.touching.down) {
    //   this.play("jump", true);
    //   this.scene.addHead(this.scene.headCount);
    //   this.body.setVelocityY(-1000);
    // } else if (!this.scene.pointer.isDown && this.body.touching.down) {
    //   this.play("run", true);
    // }
  }

  santaHitChimney(santa, chimney) {
    if (this.prevOverlappedChimney != chimney) {
      if (this.scene.santaChimneyCollideSFX && !this.scene.mute)
        this.scene.santaChimneyCollideSFX.play();
      this.scene.updateHealth(
        Math.floor(
          this.scene.health - this.scene.maxHealth / this.availableHitChimney
        )
      );
      if (this.damagedProgress) return;
      this.damagedProgress = true;
      this.prevOverlappedChimney = chimney;
      var damageBlink = setInterval(
        function () {
          if (this.currentBlinkCount < this.santaDamagedBlinkCount) {
            if (this.tintChanged) {
              santa.clearTint();
              this.tintChanged = false;
            } else {
              santa.setTintFill(0xff0000);
              this.tintChanged = true;
            }
            this.currentBlinkCount++;
          } else {
            clearInterval(damageBlink);
            this.currentBlinkCount = 0;
            this.damagedProgress = false;
            if (this.scene.santaChimneyCollideSFX)
              this.scene.santaChimneyCollideSFX.stop();
          }
        }.bind(this),
        50
      );
    }
  }

  animationPause() {
    this.anims.pause();
  }

  animationResume() {
    this.anims.resume();
  }

  levelCompleted() {
    this.isLevelCompleted = true;
    this.scene.mainCamera.fadeOut(1500);

  }
}

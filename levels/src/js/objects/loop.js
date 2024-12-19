class Loop extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, spriteName) {
    super(scene, x, y, spriteName);
    this.scene = scene;
    this.axeTrigger = 0;
    this.availableHitChild = 7;
    this.floor = 0;

    this.initPosY = y;
    this.direction = new Phaser.Math.Vector2(0, 1);
    this.velocity = 0.5;
    this.scaleSpeed = 0.15;
    this.minScale = 0.1;
    this.maxScale = 1;
    this.deep = 300;
    this.currentH = 0;
    this.pointerPosX = 0;
    this.distPointObj = 0;

    this.death = new Phaser.GameObjects.Sprite(scene, this.x, this.y + 400, "death");
    this.scene.add.existing(this.death);
    this.scene.santaGroup.add(this.death);
    this.death.setDepth(1009);
    this.death.body.setSize(100, 100);
    this.death.body.setOffset(this.width, this.height - 20);
    this.death.body.allowGravity = false;
    this.death.visible = false;
    this.init();
  }

  init() {
    this.scene.add.existing(this);
    // Set properties
    this.scene.santaGroup.add(this);
    this.setDepth(1100);
    this.body.setSize(50, 50);
    this.body.setOffset(this.width - 110, this.height / 2);
    this.body.allowGravity = false;
    // Add pointer eventListeners
    this.scene.input.on(
      "pointermove",
      function (pointer) {
        this.pointerPosX = pointer.x;
        if (this.axeTrigger != 0) return;

        this.x = pointer.x - this.distPointObj;
      },
      this
    );
    this.scene.input.on(
      "pointerup",
      function (pointer) {
        if (this.axeTrigger) return;
        this.axeTrigger = 1;
      },
      this
    );
  }

  update(deltaTime, fastFlag = false) {
    this.death.y = this.y + 400;
    this.death.x = this.x;
    if (this.axeTrigger == 0) return;

    if (this.currentH < -300 && this.axeTrigger == 3) {
      this.axeTrigger = 0;
      this.direction.y = 1;
      this.y = this.initPosY;
      this.death.visible = false;
      this.currentH = 0;
    }
    if (this.currentH < 0 && this.axeTrigger == 2) {
      this.axeTrigger = 0;
      // this.distPointObj = this.pointerPosX - this.x;
      this.distPointObj = 0;
      this.direction.y = 1
      this.y = this.initPosY;
    }
    if (this.currentH > this.deep && this.axeTrigger == 1) {
      this.axeTrigger = 2;
      this.direction.y = -1;
    }

    let conff = (fastFlag) ? 1.2 : 1;
    let newY = this.direction.y * this.velocity * deltaTime * conff;
    // this.x += newX;
    this.y += newY;
    this.currentH += newY;
  }

  isKill(caroler) {
    // console.log("caroler.distFromLoop", (caroler.y - this.y) < caroler.distFromLoop, Math.abs(this.x - caroler.x) < 100);
    if ((caroler.y - this.y) < caroler.distFromLoop && Math.abs(this.x - caroler.x) < 50) {
      caroler.Death();
      this.death.visible = true;
      this.axeTrigger = 3;
      this.direction.y = -1;
      return true;
    }
    return false;
  }
}

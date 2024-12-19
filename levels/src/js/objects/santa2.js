class Santa2 extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, spriteName) {
    super(scene, x, y, spriteName);
    this.scene = scene;
    this.axeTrigger = false;
    this.availableHitChild = 7;
    this.init();
  }

  init() {
    this.scene.add.existing(this);
    // Set properties
    this.scene.santaGroup.add(this);
    this.setDepth(1000);
    this.body.setSize(50, 50);
    this.body.setOffset(this.width - 110, this.height / 2);
    this.body.allowGravity = false;
    // Add pointer eventListeners
    this.scene.input.on(
      "pointermove",
      function (pointer) {
        if (this.scene.pauseTrigger) return;
        this.x = pointer.x;
      },
      this
    );
    this.scene.input.on(
      "pointerdown",
      function (pointer) {
        this.axeTrigger = true;
        this.play("hit_axe", true);
        let _this = this;
        if (this.scene.pauseTrigger) return;
        setTimeout(
          function () {
            _this.axeTrigger = false;
            _this.play("ready_axe", true);
          }.bind(_this),
          100
        );
      },
      this
    );
    this.scene.input.on(
      "pointerup",
      function (pointer) {
        if (this.scene.pauseTrigger) return;
        this.axeTrigger = false;
        this.play("ready_axe", true);
      },
      this
    );
  }

  update(deltaTime) { }
}

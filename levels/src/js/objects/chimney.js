class Chimney extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, spriteName, id) {
    super(scene, x, y, spriteName);
    this.scene = scene;
    this.id = id;
    this.init();
  }

  init() {
    this.scene.add.existing(this);

    this.setScale(0.7);
    this.setOrigin(0, 1);
    this.setDepth(2);

    this.scene.chimneyGroup.add(this);
    this.body.setMass(1000);
    this.body.setSize(this.width * 0.2, this.height);
    this.body.setBounce(0);
  }
}

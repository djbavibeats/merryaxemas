class Boot extends Phaser.Scene {
  constructor() {
    super("boot");
  }

  init() {
    console.log("boot-init");
  }

  preload() {
    console.log("boot-preload");
    this.load.image(
      "portrait_to_landscape",
      "../src/img/portrait_to_landscape.png"
    );
  }

  create() {
    console.log("boot-create");
    this.scene.start("levelOneLoading");
  }
}

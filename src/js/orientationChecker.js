class OrientationChecker extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, 0, 0, "portrait_to_landscape");
    this.scene = scene;

    this.init();
  }

  init() {
    this.scene.add.existing(this);
    // Add change orientation image
    this.setDepth(500);
    this.setOrigin(0, 0);
    let isPortrait = window.innerHeight > window.innerWidth;
    if (isPortrait) {
      this.portraitMode();
    } else {
      this.landscapeMode();
    }

    this.updateOrientation();

    // this.scene.scale.on(
    //   "orientationchange",
    //   function(orientation) {
    //     if (orientation === Phaser.Scale.PORTRAIT) {
    //       alert("port");
    //       this.portraitMode();
    //     } else if (orientation === Phaser.Scale.LANDSCAPE) {
    //       alert("lands");
    //       this.landscapeMode();
    //     }
    //   }.bind(this)
    // );
  }

  portraitMode() {
    this.visible = true;
    if (this.scene) {
      // this.scene.physics.pause();
      this.scene.scene.pause();
      this.scene.prevElapsedTime = null;
    }
  }

  landscapeMode() {
    this.visible = false;
    if (this.scene) {
      // this.scene.physics.resume();
      this.scene.scene.resume();
      this.scene.prevElapsedTime = null;
    }
  }

  updateOrientation() {
    if (!this.scene) return;

    let isPortrait = window.innerHeight > window.innerWidth;
    if (isPortrait) {
      this.portraitMode();
    } else {
      this.landscapeMode();
    }

    setTimeout(this.updateOrientation.bind(this), 100);
  }
}

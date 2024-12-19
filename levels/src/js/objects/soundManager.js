class SoundManager extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, 550,
      450,
      "sound_off_game");
    this.scene.add.existing(this);
    this.scene.santaGroup.add(this);
    this.setDepth(2000);

    this.soundBtn = new Phaser.GameObjects.Sprite(scene, 550, 900, "sound_on_game");
    this.scene.add.existing(this.soundBtn);
    this.scene.santaGroup.add(this.soundBtn);
    this.soundBtn.setDepth(3009);
    this.soundBtn.body.setSize(100, 100);
    this.soundBtn.body.setOffset(this.width, this.height - 20);
    this.soundBtn.body.allowGravity = false;

    this.init();
  }

  init() {
    // this.soundBtn.setTexture(this.spriteName);

    this.scene.add.existing(this);
    this.scene.santaGroup.add(this);
    this.setDepth(3000);
    this.body.allowGravity = false;
    console.log("this.soundBtn", this.soundBtn);
    this.soundBtn.on("pointerover", () => {
      this.scene.btnOver = true;
      this.soundBtn.setTint(0x999999);
    });
    this.soundBtn.on("pointerout", () => {
      this.scene.btnOver = false;
      this.soundBtn.setTint(0xffffff);
    });
    this.soundBtn.on("pointerdown", () => {
      this.soundBtn.setTint(0x999999);
    });
    this.soundBtn.on("pointerup", () => {
      this.soundBtn.setTint(0xffffff);
      this.muteScene();
    });

  }
  muteScene() {
    if (levelOneScene.mute) {
      this.scene.mute = false;
      this.soundBtn.setTexture("sound_on_game");
      localStorage.setItem("mute", false);
      this.scene.game.sound.mute = false;
    } else {
      this.scene.mute = true;
      this.soundBtn.setTexture("sound_off_game");
      localStorage.setItem("mute", true);
      this.scene.game.sound.mute = true;
    }
  }

  update(deltaTime) { }
}

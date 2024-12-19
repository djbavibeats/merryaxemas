var congratuationScene;
class Congratuation extends Phaser.Scene {
  constructor() {
    super("congratuation");
    congratuationScene = this;
    congratuationScene.background = null;
    congratuationScene.replayBtn = null;
    congratuationScene.nextBtn = null;
    congratuationScene.levelCompletedSFX = null;
    congratuationScene.playBtnClickSFX = null;
    congratuationScene.mute = false;
  }

  create(originScene) {
    congratuationScene.mute = localStorage.getItem("mute");
    // Add SFX
    congratuationScene.addSFX();
    if (congratuationScene.mute != "true") {
      congratuationScene.levelCompletedSFX.play();
      congratuationScene.levelCompletedSFX.setLoop(true);
    }
    // Add environment
    congratuationScene.addEnv();
    // Add replay button
    congratuationScene.replayBtn = congratuationScene.add.sprite(800, 900, "replay_btn");
    this.addUILabel("REPLAY", 800, 970, "yellow");
    congratuationScene.replayBtn.setInteractive();
    congratuationScene.replayBtn.on("pointerover", () => {
      congratuationScene.replayBtn.setTint(0x999999);
    });
    congratuationScene.replayBtn.on("pointerout", () => {
      congratuationScene.replayBtn.setTint(0xffffff);
    });
    congratuationScene.replayBtn.on("pointerdown", () => {
      congratuationScene.levelCompletedSFX.stop();
      congratuationScene.playBtnClickSFX.play();
      setTimeout(function () {
        originScene.scene.restart();
        congratuationScene.scene.stop();
        // congratuationScene.scene.start(originScene);
      }, 1000);
      congratuationScene.replayBtn.disableInteractive();
    });
    // Add next button
    congratuationScene.nextBtn = congratuationScene.add.sprite(1120, 900, "next_btn");
    this.addUILabel("CONTINUE", 1120, 970, "green");

    congratuationScene.nextBtn.setInteractive();
    congratuationScene.nextBtn.on("pointerover", () => {
      congratuationScene.nextBtn.setTint(0x999999);
    });
    congratuationScene.nextBtn.on("pointerout", () => {
      congratuationScene.nextBtn.setTint(0xffffff);
    });
    congratuationScene.nextBtn.on("pointerdown", () => {
      congratuationScene.nextBtn.setTint(0x999999);
      congratuationScene.levelCompletedSFX.stop();
      if (!congratuationScene.mute) congratuationScene.playBtnClickSFX.play();
      setTimeout(function () {
        var sn = originScene.nextLevel;
        congratuationScene.scene.stop();
        congratuationScene.scene.start(sn);

      }, 1000);
      congratuationScene.nextBtn.disableInteractive();
    });
    new OrientationChecker(congratuationScene);
  }

  update() { }

  addEnv() {
    // Add background
    // congratuationScene.background = congratuationScene.add.image(0, 0, "level_completed");
    // congratuationScene.background.setOrigin(0, 0);
  }

  addSFX() {
    congratuationScene.levelCompletedSFX = congratuationScene.sound.add(
      "level_completed_sfx"
    );
    congratuationScene.playBtnClickSFX = this.sound.add("play_btn_click_sfx");
  }
  addUILabel(text, x, y, color) {
    congratuationScene.add.text(x, y, text, {
      font: "30px UI-Font",
      fill: color
    }).setOrigin(0.5, 0.5);
  }
}

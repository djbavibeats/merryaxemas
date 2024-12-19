var failScene;
class Fail extends Phaser.Scene {
  constructor() {
    super("fail");
    failScene = this;
    failScene.background = null;
    failScene.replayBtn = null;
    failScene.gameOverSFX = null;
    failScene.playBtnClickSFX = null;
    failScene.mute = false;
    failScene.originScene = null;
    failScene.failReason = "";
  }

  create(data) {
    failScene.originScene = data.originScene;
    failScene.failReason = data.reason;
    failScene.mute = localStorage.getItem("mute");
    // Add SFX
    failScene.addSFX();
    if (failScene.mute != "true") failScene.gameOverSFX.play();
    // failScene.gameOverSFX.setLoop(true);
    // Add environment
    failScene.addEnv();
    // Add replay button
    failScene.replayBtn = failScene.add.sprite(960, 900, "replay_btn");
    failScene.replayBtn.setInteractive();
    failScene.replayBtn.on("pointerover", () => {
      failScene.replayBtn.setTint(0x999999);
    });
    failScene.replayBtn.on("pointerout", () => {
      failScene.replayBtn.setTint(0xffffff);
    });
    failScene.replayBtn.on("pointerdown", () => {
      failScene.replayBtn.setTint(0x999999);
      failScene.gameOverSFX.stop();
      if (failScene.mute != "true") failScene.playBtnClickSFX.play();
      setTimeout(function () {
        failScene.scene.stop();
        failScene.originScene.scene.restart();
        // failScene.scene.start(originScene);
      }, 1000);
      failScene.replayBtn.disableInteractive();
    });
    // Type reason text
    // failScene.typeText(failScene.failReason);
    failScene.failReasonTxt = failScene.add.text(
      960,
      750,
      failScene.failReason,
      {
        fontFamily: "Arial",
        fontSize: "30px",
        color: "yellow",
        fontStyle: "bold"
      }
    );
    failScene.failReasonTxt.setOrigin(0.5, 0);

    // Band and song text
    failScene.bandTxt = failScene.add.text(
      960,
      100,
      ' ',
      {
        fontFamily: "Arial",
        fontSize: "22px",
        color: "white"
      }
    );
    failScene.bandTxt.setOrigin(0.5, 0);
    new OrientationChecker(failScene);
  }

  update() {
    var glitchSpeed = Math.random() * 4;
    if (failScene.hahaha) failScene.hahaha.anims.setTimeScale(glitchSpeed);
  }

  addEnv() {
    // Add background
    failScene.background = failScene.add.image(0, 0, "level_failed");
    failScene.background.setOrigin(0, 0);
    // Add hahaha
    // failScene.hahaha = failScene.add.sprite(960, 500, "hahaha");
    // failScene.hahaha.setScale(2);
    // failScene.hahaha.anims.play("hahaha_anim");
  }

  addSFX() {
    failScene.gameOverSFX = failScene.sound.add("game_over_sfx");
    failScene.playBtnClickSFX = this.sound.add("play_btn_click_sfx");
  }

  // typeText(text) {
  //   var txt = failScene.add.text(960, 750, text, {
  //     fontFamily: "Arial",
  //     fontSize: "30px",
  //     color: "yellow",
  //     fontStyle: "bold"
  //   });
  //   txt.setOrigin(0.5, 0.5);
  //   txt.typing = failScene.plugins.get("rexTextTyping").add(txt, {
  //     speed: 0.06 * 1000
  //     //typeMode: 'middle-to-sides',
  //     //setTextCallback: myTypingFn
  //   });
  //   txt.typing.start(text);
  //   txt.typing.on(
  //     "type",
  //     function() {
  //       console.log(txt.text);
  //     },
  //     txt
  //   );
  // }
}

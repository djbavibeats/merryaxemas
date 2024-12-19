var levelThreeScene;
class Level3 extends Phaser.Scene {
  constructor() {
    super("level3");
    levelThreeScene = this;
  }

  create() {
    
    levelThreeScene.registry.destroy();
    levelThreeScene.events.off();
    levelThreeScene.initAttributes();
    levelThreeScene.cameraWidth = levelThreeScene.cameras.cameras[0].width;
    levelThreeScene.cameraHeight = levelThreeScene.cameras.cameras[0].height;

    levelThreeScene.cursors = levelThreeScene.input.keyboard.createCursorKeys();
    levelThreeScene.pointer = levelThreeScene.input.activePointer;
    levelThreeScene.input.mouse.disableContextMenu();
    levelThreeScene.envGroup = levelThreeScene.add.group();
    levelThreeScene.santaGroup = levelThreeScene.physics.add.group();
    levelThreeScene.addEnv();
    levelThreeScene.addSanta();
    levelThreeScene.addSFX();
    levelThreeScene.childGroup = levelThreeScene.physics.add.group();
    // levelThreeScene.addChild();
    levelThreeScene.addUI();


    //   levelThreeScene.physics.add.collider(levelThreeScene.santa, levelThreeScene.childGroup);
    new OrientationChecker(this);
    levelThreeScene.mainCamera.fadeIn(2000);
  }

  update() {
    if (levelThreeScene.gameOverTrigger || levelThreeScene.levelCompletedTrigger || levelThreeScene.pauseTrigger)
      return;
    if (!levelThreeScene.prevElapsedTime) {
      levelThreeScene.prevElapsedTime = levelThreeScene.time.now;
      return;
    }
    var deltaTime = levelThreeScene.time.now - levelThreeScene.prevElapsedTime;
    levelThreeScene.totalTime += deltaTime;
    levelThreeScene.loop.update(deltaTime);

    // console.log("levelThreeScene.totalTime: ", levelThreeScene.totalTime);
    this.updateHealth(levelThreeScene.maxHealth - levelThreeScene.totalTime);
    for (var i = 0; i < 8; i++) {
      if (levelThreeScene.caroler[i].status == "dead") continue;
      levelThreeScene.caroler[i].update(deltaTime, (levelThreeScene.totalTime > (levelThreeScene.timeLimit * 0.6)));
      if (levelThreeScene.loop.isKill(levelThreeScene.caroler[i])) {
        levelThreeScene.score++;
        this.updateScore(levelThreeScene.score);
      };
    }

    if (levelThreeScene.score == 8) {
      this.complete();
      return;
    }
    if (levelThreeScene.totalTime > levelThreeScene.timeLimit && !levelThreeScene.excitedTrigger) {
      levelThreeScene.excitedTrigger = true;
      this.gameOver();
      return;
    }
    levelThreeScene.prevElapsedTime = levelThreeScene.time.now;


  }

  initAttributes() {
    levelThreeScene.mainCamera = levelThreeScene.cameras.main;
    levelThreeScene.name = "level3";
    levelThreeScene.physics;
    levelThreeScene.cursors;
    levelThreeScene.pointer;
    levelThreeScene.background = null;
    levelThreeScene.road = null;
    levelThreeScene.field = null;
    levelThreeScene.statusBar = null;
    levelThreeScene.largeSkull = null;
    levelThreeScene.envGroup = null;
    levelThreeScene.santaGroup = null;
    levelThreeScene.childGroup = null;
    levelThreeScene.childNameArr = ["child1", "child2", "child3"];
    levelThreeScene.treeNameArr = ["black_tree1", "black_tree2", "black_candy"];
    levelThreeScene.dotNameArr = ["black_shadow"];
    levelThreeScene.uiHealthBar = null;
    levelThreeScene.uiHealthBarBlank = null;
    levelThreeScene.uiHealthBarGroup = null;
    levelThreeScene.uiHealthBarMask = null;

    levelThreeScene.cameraWidth = 0;
    levelThreeScene.cameraHeight = 0;
    levelThreeScene.health = 100;
    levelThreeScene.score = 0;
    levelThreeScene.comboScore = 50;
    levelThreeScene.uiHealthBarWidth = 300;
    levelThreeScene.uiHealthBarHeight = 70;
    levelThreeScene.childMaxDepth = 999;
    levelThreeScene.childMinDepth = 50;
    levelThreeScene.childCurrentDepth = levelThreeScene.childMaxDepth;
    levelThreeScene.childId = 0;
    levelThreeScene.prevHitChildId = 0;
    levelThreeScene.comboCount = 0;
    levelThreeScene.excitedTrigger = false;
    levelThreeScene.excitedCount = 0;
    levelThreeScene.excitedPos = null;
    levelThreeScene.excitedPrevElapsedTime = 0;
    levelThreeScene.gameOverTrigger = false;
    levelThreeScene.levelCompletedTrigger = false;
    levelThreeScene.tintChanged = false;

    levelThreeScene.levelBgSFX = null;
    levelThreeScene.santaChildCollideSFX = null;
    levelThreeScene.levelExcitedSFX = null;
    levelThreeScene.gameOverSFX = null;
    levelThreeScene.levelCompletedSFX = null;
    levelThreeScene.caroler = [];
    levelThreeScene.bottomF = [];
    levelThreeScene.bottomB = [];
    levelThreeScene.totalTime = 0;
    levelThreeScene.mute = localStorage.getItem("mute") == "true" ? true : false;

    levelThreeScene.soundBtn = null;

    if (levelThreeScene.mute) {
      levelThreeScene.game.sound.mute = true;
    }
    levelThreeScene.uiHeight = 50;
    levelThreeScene.timeLimit = 30000;
    levelThreeScene.maxHealth = levelThreeScene.timeLimit;
  }

  addEnv() {
    levelThreeScene.road = levelThreeScene.add.image(0, 0, "backsky");
    levelThreeScene.road.setOrigin(0, 0);
    levelThreeScene.road.setDepth(100);
    // Add background
    levelThreeScene.background = levelThreeScene.add.image(0, 0, "background3");
    levelThreeScene.background.setOrigin(0, 0);
    levelThreeScene.background.setDepth(101);
    // Add background bottom temp0
    levelThreeScene.Bottom_temp = levelThreeScene.add.image(0, 890, "Bottom_temp");
    levelThreeScene.Bottom_temp.setOrigin(0, 0);
    levelThreeScene.Bottom_temp.setDepth(950);

    // Add background bottom temp1
    levelThreeScene.Bottom_temp1 = levelThreeScene.add.image(0, 970, "Bottom_temp");
    levelThreeScene.Bottom_temp1.setOrigin(0, 0);
    levelThreeScene.Bottom_temp1.setDepth(1100);

    // new SoundManager(levelThreeScene);
    levelThreeScene.addCaroler();
  }

  addCaroler() {
    let posXArr = [600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400];
    let posYArr = [725, 650, 725, 650, 725, 650, 725, 650, 725];
    let carolerName = ["caroler2", "caroler1", "caroler3", "caroler3", "caroler2", "caroler3", "caroler2", "caroler1"];
    for (var i = 0; i < 8; i++) {
      levelThreeScene.caroler[i] = new Caroler(this, 400 + 150 * i, posYArr[i], carolerName[i], 0.5 + i * 0.2, (i % 2) ? 900 : 1000);
    }
  }

  addSFX() {
    levelThreeScene.levelBgSFX = levelThreeScene.sound.add("level3_bg_sfx");
    setTimeout(() => {
      if (levelThreeScene.mute) {
        levelThreeScene.game.sound.mute = true;
      }
      levelThreeScene.levelBgSFX.play();
      levelThreeScene.levelBgSFX.setLoop(true);
      // alert(levelOneScene.levelBgSFX);
    }, (1000));

  }

  addUI() {
    // Add labels
    levelThreeScene.text1 = levelThreeScene.addUILabel("X-MAS-SPIRIT", 350, levelThreeScene.uiHeight);
    levelThreeScene.text2 = levelThreeScene.addUILabel("SCORE", 1250, levelThreeScene.uiHeight);
    // Add health bar
    levelThreeScene.addUIHealthBar();
    // Add score
    levelThreeScene.uiScore = levelThreeScene.addUIChangeableLabel(
      levelThreeScene.score,
      1450,
      levelThreeScene.uiHeight
    );

    // Add pause btn
    levelThreeScene.pauseBtn = levelThreeScene.add.sprite(150, 950, "pause_btn");
    levelThreeScene.pauseBtn.setInteractive();
    levelThreeScene.pauseBtn.setDepth(3001);
    levelThreeScene.pauseBtn.setScale(0.7);
    levelThreeScene.pauseBtn.on("pointerover", () => {
      levelThreeScene.btnOver = true;
      levelThreeScene.pauseBtn.setTint(0x999999);
    });
    levelThreeScene.pauseBtn.on("pointerout", () => {
      levelThreeScene.btnOver = false;
      levelThreeScene.pauseBtn.setTint(0xffffff);
    });
    levelThreeScene.pauseBtn.on("pointerdown", () => {
      levelThreeScene.pauseBtn.setTint(0x999999);
    });

    levelThreeScene.pauseBtn.on("pointerup", () => {
      if (levelThreeScene.isShowingPopup) return;
      levelThreeScene.pauseBtn.setTint(0xffffff);
      levelThreeScene.pauseScene();
    });

    // Add replay btn
    levelThreeScene.replayBtn = levelThreeScene.add.sprite(350, 950, "replay_btn");
    levelThreeScene.replayBtn.setInteractive();
    levelThreeScene.replayBtn.setDepth(3002);
    levelThreeScene.replayBtn.setScale(0.7);
    levelThreeScene.replayBtn.on("pointerover", () => {
      levelThreeScene.btnOver = true;
      levelThreeScene.replayBtn.setTint(0x999999);
    });
    levelThreeScene.replayBtn.on("pointerout", () => {
      levelThreeScene.btnOver = false;
      levelThreeScene.replayBtn.setTint(0xffffff);
    });
    levelThreeScene.replayBtn.on("pointerdown", () => {
      levelThreeScene.replayBtn.setTint(0x999999);
    });
    levelThreeScene.replayBtn.on("pointerup", () => {
      if (levelThreeScene.isShowingPopup) return;
      levelThreeScene.replayBtn.setTint(0xffffff);
      levelThreeScene.scene.restart();
      levelThreeScene.game.sound.stopAll();
    });


    levelThreeScene.soundBtn = levelThreeScene.add.sprite(
      550,
      950,
      levelThreeScene.mute ? "sound_off_game" : "sound_on_game"
    );
    levelThreeScene.soundBtn.setInteractive();
    levelThreeScene.soundBtn.setDepth(3000);
    levelThreeScene.soundBtn.setScale(0.7);
    levelThreeScene.soundBtn.on("pointerover", () => {
      levelThreeScene.btnOver = true;
      levelThreeScene.soundBtn.setTint(0x999999);
    });
    levelThreeScene.soundBtn.on("pointerout", () => {
      levelThreeScene.btnOver = false;
      levelThreeScene.soundBtn.setTint(0xffffff);
    });
    levelThreeScene.soundBtn.on("pointerdown", () => {
      levelThreeScene.soundBtn.setTint(0x999999);
    });
    levelThreeScene.soundBtn.on("pointerup", () => {
      if (levelThreeScene.isShowingPopup) return;
      levelThreeScene.soundBtn.setTint(0xffffff);
      levelThreeScene.muteScene();
    });

    levelThreeScene.howtoButton = levelThreeScene.add.sprite(0, 380, "question_btn");
    levelThreeScene.howtoButton.setInteractive();
    levelThreeScene.howtoButton.setOrigin(0, 0);
    levelThreeScene.howtoButton.visible = true;
    levelThreeScene.howtoButton.setDepth(2000);
    levelThreeScene.howtoButton.on("pointerover", () => {
      levelThreeScene.btnOver = true;
      levelThreeScene.howtoButton.setTint(0x999999);
    });
    levelThreeScene.howtoButton.on("pointerout", () => {
      levelThreeScene.btnOver = false;
      levelThreeScene.howtoButton.setTint(0xffffff);
    });
    levelThreeScene.howtoButton.on("pointerdown", () => {
      levelThreeScene.howtoButton.setTint(0x999999);
    });
    levelThreeScene.howtoButton.on("pointerup", () => {
      levelThreeScene.howtoButton.setTint(0xffffff);
      levelThreeScene.showHowTo();
    });


    levelThreeScene.howtoPopup = levelThreeScene.add.sprite(960, 500, "popup3");
    levelThreeScene.howtoPopup.setOrigin(0.5, 0.5);
    levelThreeScene.howtoPopup.setDepth(5000);
    levelThreeScene.howtoPopup.visible = false;


    levelThreeScene.howtoPopup.setInteractive();

    levelThreeScene.howtoPopup.on("pointerover", () => {
      levelThreeScene.btnOver = true;
      levelThreeScene.howtoPopup.setTint(0x999999);
    });
    levelThreeScene.howtoPopup.on("pointerout", () => {
      levelThreeScene.btnOver = false;
      levelThreeScene.howtoPopup.setTint(0xffffff);
    });
    levelThreeScene.howtoPopup.on("pointerdown", () => {
      levelThreeScene.howtoPopup.setTint(0x999999);
    });
    levelThreeScene.howtoPopup.on("pointerup", () => {
      levelThreeScene.howtoPopup.setTint(0xffffff);
      levelThreeScene.closeHowTo();
    });


  }

  addUILabel(text, x, y) {
    return levelThreeScene.add
      .text(x, y, text, {
        font: "30px UI-Font",
        fill: "white"
      })
      .setOrigin(0, 0)
      .setDepth(1100);
  }

  addUIChangeableLabel(text, x, y) {
    var textObj = levelThreeScene.add
      .text(x, y, text, {
        fontFamily: "UI-Font",
        fontSize: "35px",
        // stroke: "#fff",
        // strokeThickness: 10,
        color: "yellow",
        fontStyle: "bold"
      })
      .setOrigin(0, 0)
      .setDepth(1100);

    return textObj;
  }

  addUIHealthBar() {
    levelThreeScene.uiHealthBarGroup = levelThreeScene.add.group();

    levelThreeScene.uiHealthBarMask = levelThreeScene.add.sprite(
      1050,
      levelThreeScene.uiHeight,
      "health_mask"
    );
    levelThreeScene.uiHealthBarMask.setOrigin(1, 0.2);
    levelThreeScene.uiHealthBarMask.displayHeight =
      levelThreeScene.uiHealthBarHeight;
    levelThreeScene.uiHealthBarMask.displayWidth = levelThreeScene.uiHealthBarWidth;
    levelThreeScene.uiHealthBarMask.height =
      levelThreeScene.uiHealthBarMask.displayHeight;
    levelThreeScene.uiHealthBarMask.width =
      levelThreeScene.uiHealthBarMask.displayWidth;
    levelThreeScene.uiHealthBarMask.visible = false;

    levelThreeScene.uiHealthBar = levelThreeScene.add.sprite(1050, levelThreeScene.uiHeight, "health");
    levelThreeScene.uiHealthBar.setOrigin(1, 0.2);
    levelThreeScene.uiHealthBar.displayHeight = levelThreeScene.uiHealthBarHeight;
    levelThreeScene.uiHealthBar.displayWidth = levelThreeScene.uiHealthBarWidth;
    levelThreeScene.uiHealthBar.height = levelThreeScene.uiHealthBar.displayHeight;
    levelThreeScene.uiHealthBar.width = levelThreeScene.uiHealthBar.displayWidth;
    levelThreeScene.uiHealthBar.setDepth(1100);
    levelThreeScene.uiHealthBarGroup.add(levelThreeScene.uiHealthBar);

    levelThreeScene.uiHealthBar.mask = new Phaser.Display.Masks.BitmapMask(
      this,
      levelThreeScene.uiHealthBarMask
    );

    levelThreeScene.uiHealthBarBlank = levelThreeScene.add.sprite(
      1050,
      levelThreeScene.uiHeight,
      "health_blank"
    );
    levelThreeScene.uiHealthBarBlank.setOrigin(1, 0.2);
    levelThreeScene.uiHealthBarBlank.displayHeight =
      levelThreeScene.uiHealthBarHeight;
    levelThreeScene.uiHealthBarBlank.displayWidth =
      levelThreeScene.uiHealthBarWidth;
    levelThreeScene.uiHealthBarBlank.height =
      levelThreeScene.uiHealthBarBlank.displayHeight;
    levelThreeScene.uiHealthBarBlank.width =
      levelThreeScene.uiHealthBarBlank.displayWidth;
    levelThreeScene.uiHealthBarBlank.setDepth(1050);
    levelThreeScene.uiHealthBarGroup.add(levelThreeScene.uiHealthBarBlank);
  }

  addSanta() {
    levelThreeScene.loop = new Loop(
      this,
      levelThreeScene.cameraWidth / 2,
      1,
      "loop"
    );
  }

  updateHealth(health) {
    if (levelThreeScene.excitedTrigger) return;
    levelThreeScene.health = health;
    var tween = levelThreeScene.tweens.add({
      targets: levelThreeScene.uiHealthBarMask,
      displayWidth: {
        from: levelThreeScene.uiHealthBarMask.displayWidth,
        to: levelThreeScene.uiHealthBarWidth * (health / levelThreeScene.maxHealth)
      },
      width: {
        from: levelThreeScene.uiHealthBarMask.displayWidth,
        to: levelThreeScene.uiHealthBarWidth * (health / levelThreeScene.maxHealth)
      },
      ease: "Quart.easeOut", // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 500,
      repeat: 0, // -1: infinity
      yoyo: false,
      onComplete: function () {
        if (health <= 0 && !levelThreeScene.excitedTrigger) {
          levelThreeScene.levelBgSFX.stop();
          levelThreeScene.excitedTrigger = true;
          setTimeout(function () {
            levelThreeScene.scene.stop();
            levelThreeScene.scene.start("fail", {
              originScene: levelThreeScene,
              reason: "You've run out of Xmas spirit!"
            })
          }, 1000);
          return;

        }
      }.bind(this)
    });
  }

  updateScore(score) {
    var tween = levelThreeScene.tweens.add({
      targets: levelThreeScene.uiScore,
      text: {
        from: Number(levelThreeScene.uiScore.text),
        to: levelThreeScene.score
      },
      ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 500,
      repeat: 0, // -1: infinity
      yoyo: false,
      onUpdate: function () {
        levelThreeScene.uiScore.text = Math.ceil(levelThreeScene.uiScore.text);
      }.bind(this)
    });
  }

  muteScene() {
    if (levelThreeScene.mute) {
      levelThreeScene.mute = false;
      levelThreeScene.soundBtn.setTexture("sound_on_game");
      localStorage.setItem("mute", false);
      levelThreeScene.game.sound.mute = false;
    } else {
      levelThreeScene.mute = true;
      levelThreeScene.soundBtn.setTexture("sound_off_game");
      localStorage.setItem("mute", true);
      levelThreeScene.game.sound.mute = true;
    }
  }
  pauseScene() {
    if (levelThreeScene.pauseTrigger) {
      levelThreeScene.physics.resume();
      levelThreeScene.pauseTrigger = false;
      levelThreeScene.pauseBtn.setTexture("pause_btn");
      levelThreeScene.game.sound.resumeAll();
    } else {
      levelThreeScene.physics.pause();
      levelThreeScene.pauseTrigger = true;
      levelThreeScene.pauseBtn.setTexture("play_btn");
      levelThreeScene.game.sound.pauseAll();
    }
  }

  complete() {
    levelThreeScene.levelCompletedTrigger = true;
    levelThreeScene.mainCamera.fadeOut(2000);
    levelThreeScene.time.delayedCall(2000, function () {
      levelThreeScene.levelBgSFX.stop();
      levelThreeScene.scene.stop();
      levelThreeScene.scene.start("complete", levelThreeScene);
    });


  }
  gameOver() {
    levelThreeScene.gameOverTrigger = true;
    levelThreeScene.mainCamera.fadeOut(2000);
    levelThreeScene.time.delayedCall(2000, function () {
      levelThreeScene.levelBgSFX.stop();
      levelThreeScene.scene.stop();
      levelThreeScene.scene.start("fail", {
        originScene: levelThreeScene,
        reason: "You've run out of Xmas spirit!"
      })
    });

  }

  showHowTo() {
    levelThreeScene.pauseTrigger = false;
    levelThreeScene.howtoPopup.visible = true;
    levelThreeScene.isShowingPopup = true;
    this.pauseScene();
  }

  closeHowTo() {
    levelThreeScene.pauseTrigger = true;
    levelThreeScene.howtoPopup.visible = false;
    levelThreeScene.isShowingPopup = false;
    this.pauseScene();
  }

  showHowTo() {
    levelThreeScene.pauseTrigger = false;
    levelThreeScene.howtoPopup.visible = true;
    levelThreeScene.isShowingPopup = true;
    this.pauseScene();
  }

  closeHowTo() {
    levelThreeScene.pauseTrigger = true;
    levelThreeScene.howtoPopup.visible = false;
    levelThreeScene.isShowingPopup = false;
    this.pauseScene();
  }
}

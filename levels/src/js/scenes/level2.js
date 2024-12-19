var levelTwoScene;
class Level2 extends Phaser.Scene {
  constructor() {
    super("level2");
    levelTwoScene = this;
  }

  create() {
    
    levelTwoScene.registry.destroy();
    levelTwoScene.events.off();
    levelTwoScene.initAttributes();
    levelTwoScene.cameraWidth = levelTwoScene.cameras.cameras[0].width;
    levelTwoScene.cameraHeight = levelTwoScene.cameras.cameras[0].height;
    levelTwoScene.addSFX();

    levelTwoScene.cursors = levelTwoScene.input.keyboard.createCursorKeys();
    levelTwoScene.pointer = levelTwoScene.input.activePointer;
    levelTwoScene.input.mouse.disableContextMenu();
    levelTwoScene.envGroup = levelTwoScene.add.group();
    levelTwoScene.addEnv();
    // Add santa
    levelTwoScene.santaGroup = levelTwoScene.physics.add.group();
    levelTwoScene.addSanta();
    // Add childGroup
    levelTwoScene.childGroup = levelTwoScene.physics.add.group();
    levelTwoScene.addChild();
    // Add ui
    levelTwoScene.addUI();

    //   levelTwoScene.physics.add.collider(levelTwoScene.santa, levelTwoScene.childGroup);
    new OrientationChecker(this);
    levelTwoScene.mainCamera.fadeIn(2000);
  }

  update() {
    if (levelTwoScene.gameOverTrigger || levelTwoScene.levelCompletedTrigger || levelTwoScene.pauseTrigger)
      return;
    if (!levelTwoScene.prevElapsedTime) {
      levelTwoScene.prevElapsedTime = levelTwoScene.time.now;
      return;
    }
    var deltaTime = levelTwoScene.time.now - levelTwoScene.prevElapsedTime;
    levelTwoScene.totalRunTime -= deltaTime;
    levelTwoScene.santa.update(deltaTime);

    this.updateHealth(levelTwoScene.totalRunTime);
    levelTwoScene.childGroup.children.entries.forEach(function (child) {
      child.update(deltaTime);
    });
    levelTwoScene.envGroup.children.entries.forEach(function (element) {
      element.update(deltaTime);
    });

    levelTwoScene.launchTimeLimit -= deltaTime;
    if (levelTwoScene.launchTimeLimit < 0) {
      this.addChild();
    }

    levelTwoScene.prevElapsedTime = levelTwoScene.time.now;
    // if (
    //   levelTwoScene.excitedTrigger &&
    //   levelTwoScene.excitedPrevElapsedTime == 0
    // ) {
    //   levelTwoScene.excitedPrevElapsedTime = levelTwoScene.time.now;
    // }
    if (
      levelTwoScene.totalRunTime < 0
    ) {
      if (levelTwoScene.score < levelTwoScene.targetPoint) {

        levelTwoScene.gameOverTrigger = true;
        levelTwoScene.gameOver();

      } else {
        levelTwoScene.gameComplete();
      }
    }
  }

  initAttributes() {
    levelTwoScene.mainCamera = levelTwoScene.cameras.main;
    levelTwoScene.name = "level2";
    levelTwoScene.physics;
    levelTwoScene.cursors;
    levelTwoScene.pointer;
    levelTwoScene.background = null;
    levelTwoScene.road = null;
    levelTwoScene.field = null;
    levelTwoScene.statusBar = null;
    levelTwoScene.largeSkull = null;
    levelTwoScene.envGroup = null;
    levelTwoScene.santaGroup = null;
    levelTwoScene.childGroup = null;
    levelTwoScene.childNameArr = ["child1", "child2", "child3"];
    levelTwoScene.treeNameArr = ["black_tree1", "black_tree2", "black_candy"];
    levelTwoScene.dotNameArr = ["black_shadow"];
    levelTwoScene.uiHealthBar = null;
    levelTwoScene.uiHealthBarBlank = null;
    levelTwoScene.uiHealthBarGroup = null;
    levelTwoScene.uiHealthBarMask = null;
    levelTwoScene.nextLevel = "levelThreeLoading";

    levelTwoScene.cameraWidth = 0;
    levelTwoScene.cameraHeight = 0;
    levelTwoScene.health = 100;
    // levelTwoScene.maxHealth = 100;
    levelTwoScene.score = levelOneScene.score;
    levelTwoScene.comboScore = 50;
    levelTwoScene.uiHealthBarWidth = 300;
    levelTwoScene.uiHealthBarHeight = 70;
    levelTwoScene.childMaxDepth = 999;
    levelTwoScene.childMinDepth = 50;
    levelTwoScene.childCurrentDepth = levelTwoScene.childMaxDepth;
    levelTwoScene.childId = 0;
    levelTwoScene.prevHitChildId = 0;
    levelTwoScene.comboCount = 0;
    levelTwoScene.excitedTrigger = false;
    levelTwoScene.excitedCount = 0;
    levelTwoScene.excitedPos = null;
    levelTwoScene.excitedPrevElapsedTime = 0;
    levelTwoScene.gameOverTrigger = false;
    levelTwoScene.levelCompletedTrigger = false;
    levelTwoScene.tintChanged = false;

    levelTwoScene.levelBgSFX = null;
    levelTwoScene.santaChildCollideSFX = null;
    levelTwoScene.levelExcitedSFX = null;
    levelTwoScene.gameOverSFX = null;
    levelTwoScene.levelCompletedSFX = null;
    levelTwoScene.limitTime = 30000;
    levelTwoScene.targetPoint = 20000;
    levelTwoScene.maxHealth = levelTwoScene.limitTime;
    levelTwoScene.totalRunTime = levelTwoScene.limitTime;
    levelTwoScene.mute = localStorage.getItem("mute") == "true" ? true : false;

    levelTwoScene.soundBtn = null;


    levelTwoScene.launchTimeLimit = 200;
    levelTwoScene.pauseTrigger = false;




  }

  addEnv() {
    // Add background
    levelTwoScene.background = levelTwoScene.add.image(0, 0, "background2");
    levelTwoScene.background.setOrigin(0, 0);
    // Add field
    levelTwoScene.field = levelTwoScene.add.image(0, 0, "field");
    levelTwoScene.field.setOrigin(0, 0);
    levelTwoScene.field.setDepth(1);
    // Add large skull
    levelTwoScene.largeSkull = levelTwoScene.add.sprite(
      960,
      200,
      "large_skull"
    );
    levelTwoScene.largeSkull.setDepth(2);
    levelTwoScene.largeSkull.visible = false;
    // Add road
    levelTwoScene.road = levelTwoScene.add.image(0, 0, "road");
    levelTwoScene.road.setOrigin(0, 0);
    levelTwoScene.road.setDepth(3);
    // Add status bar
    levelTwoScene.statusBar = levelTwoScene.add.image(0, 1080, "status_bar");
    levelTwoScene.statusBar.setOrigin(0, 1);
    levelTwoScene.statusBar.setDepth(1050);
    // Add environment objects
    levelTwoScene.addTree();
    levelTwoScene.addFreeTree();
    levelTwoScene.addDots();
  }

  addTree() {
    let posXArr = [850, 1070];
    for (let i = 0; i < 2; i++) {
      let x = posXArr[i];
      let y = 230;
      let treeName = levelTwoScene.treeNameArr[Math.floor(Math.random() * 3)];
      let symmetry = i == 0 ? false : true;
      new VerticalMoveObject(this, x, y, treeName, symmetry, 50);
    }

    // setTimeout(levelTwoScene.addTree.bind(this), 1000);
    var timer = levelTwoScene.scene.scene.time.addEvent({
      delay: 1000, // ms
      callback: levelTwoScene.addTree.bind(this),
      loop: false
    });
  }

  addDots() {
    let posXArr = [
      Math.floor(Math.random() * 900),
      Math.floor(Math.random() * 900 + 1020)
    ];
    for (let i = 0; i < 2; i++) {
      let x = posXArr[i];
      let y = 230;
      let dotName = levelTwoScene.dotNameArr[0];
      let symmetry = i == 0 ? false : true;
      new VerticalMoveObject(this, x, y, dotName, symmetry, 30);
    }

    let nextGenerationTime = Math.floor(Math.random() * 50 + 100);

    var timer = levelTwoScene.scene.scene.time.addEvent({
      delay: nextGenerationTime, // ms
      callback: levelTwoScene.addDots.bind(this),
      loop: false
    });
  }

  addFreeTree() {
    let posXArr = [
      Math.floor(Math.random() * 800),
      Math.floor(Math.random() * 800 + 1120)
    ];
    for (let i = 0; i < 2; i++) {
      let x = posXArr[i];
      let y = 230;
      let treeName = levelTwoScene.treeNameArr[0];
      let symmetry = i == 0 ? false : true;
      new VerticalMoveObject(this, x, y, treeName, symmetry, 40);
    }

    let nextGenerationTime = Math.floor(Math.random() * 1000 + 1000);

    var timer = levelTwoScene.scene.scene.time.addEvent({
      delay: nextGenerationTime, // ms
      callback: levelTwoScene.addFreeTree.bind(this),
      loop: false
    });
    // setTimeout(levelTwoScene.addFreeTree.bind(this), nextGenerationTime);
  }

  addSFX() {
    levelTwoScene.levelBgSFX = levelTwoScene.sound.add("level2_bg_sfx");
    setTimeout(() => {
      if (levelTwoScene.mute) {
        levelTwoScene.game.sound.mute = true;
      }
      levelTwoScene.levelBgSFX.play();
      levelTwoScene.levelBgSFX.setLoop(true);
      // alert(levelOneScene.levelBgSFX);
    }, (1000));
    console.log("levelTwoScene.mute: ", levelTwoScene.mute);
    if (levelTwoScene.mute) {
      levelTwoScene.game.sound.mute = true;
    }
  }

  addUI() {
    // Add labels
    levelTwoScene.text1 = levelTwoScene.addUILabel("X-MAS-SPIRIT", 350, 955);
    levelTwoScene.text2 = levelTwoScene.addUILabel("SCORE", 1250, 955);
    // Add health bar
    levelTwoScene.addUIHealthBar();
    // Add score
    levelTwoScene.uiScore = levelTwoScene.addUIChangeableLabel(
      levelTwoScene.score,
      1450,
      955
    );

    // Add pause btn
    levelTwoScene.pauseBtn = levelTwoScene.add.sprite(150, 50, "pause_btn");
    levelTwoScene.pauseBtn.setInteractive();
    levelTwoScene.pauseBtn.setDepth(3001);
    levelTwoScene.pauseBtn.setScale(0.7);
    levelTwoScene.pauseBtn.on("pointerover", () => {
      levelTwoScene.btnOver = true;
      levelTwoScene.pauseBtn.setTint(0x999999);
    });
    levelTwoScene.pauseBtn.on("pointerout", () => {
      levelTwoScene.btnOver = false;
      levelTwoScene.pauseBtn.setTint(0xffffff);
    });
    levelTwoScene.pauseBtn.on("pointerdown", () => {
      levelTwoScene.pauseBtn.setTint(0x999999);
    });
    levelTwoScene.pauseBtn.on("pointerup", () => {
      if (levelTwoScene.isShowingPopup) return;

      levelTwoScene.pauseBtn.setTint(0xffffff);
      levelTwoScene.pauseScene();
    });

    // Add replay btn
    levelTwoScene.replayBtn = levelTwoScene.add.sprite(350, 50, "replay_btn");
    levelTwoScene.replayBtn.setInteractive();
    levelTwoScene.replayBtn.setDepth(3002);
    levelTwoScene.replayBtn.setScale(0.7);
    levelTwoScene.replayBtn.on("pointerover", () => {
      levelTwoScene.btnOver = true;
      levelTwoScene.replayBtn.setTint(0x999999);
    });
    levelTwoScene.replayBtn.on("pointerout", () => {
      levelTwoScene.btnOver = false;
      levelTwoScene.replayBtn.setTint(0xffffff);
    });
    levelTwoScene.replayBtn.on("pointerdown", () => {
      levelTwoScene.replayBtn.setTint(0x999999);
    });
    levelTwoScene.replayBtn.on("pointerup", () => {
      if (levelTwoScene.isShowingPopup) return;
      levelTwoScene.replayBtn.setTint(0xffffff);
      levelTwoScene.scene.restart();
      levelTwoScene.game.sound.stopAll();
    });


    console.log("levelTwoScene.mute: ", levelTwoScene.mute);
    levelTwoScene.soundBtn = levelTwoScene.add.sprite(
      550,
      50,
      levelTwoScene.mute ? "sound_off_game" : "sound_on_game"
    );
    levelTwoScene.soundBtn.setInteractive();
    levelTwoScene.soundBtn.setDepth(3000);
    levelTwoScene.soundBtn.setScale(0.7);
    levelTwoScene.soundBtn.on("pointerover", () => {
      levelTwoScene.btnOver = true;
      levelTwoScene.soundBtn.setTint(0x999999);
    });
    levelTwoScene.soundBtn.on("pointerout", () => {
      levelTwoScene.btnOver = false;
      levelTwoScene.soundBtn.setTint(0xffffff);
    });
    levelTwoScene.soundBtn.on("pointerdown", () => {
      levelTwoScene.soundBtn.setTint(0x999999);
    });
    levelTwoScene.soundBtn.on("pointerup", () => {
      if (levelTwoScene.isShowingPopup) return;
      levelTwoScene.soundBtn.setTint(0xffffff);
      levelTwoScene.muteScene();
    });

    levelTwoScene.howtoButton = levelTwoScene.add.sprite(0, 380, "question_btn");
    levelTwoScene.howtoButton.setInteractive();
    levelTwoScene.howtoButton.setOrigin(0, 0);
    levelTwoScene.howtoButton.visible = true;
    levelTwoScene.howtoButton.setDepth(2000);
    levelTwoScene.howtoButton.on("pointerover", () => {
      levelTwoScene.btnOver = true;
      levelTwoScene.howtoButton.setTint(0x999999);
    });
    levelTwoScene.howtoButton.on("pointerout", () => {
      levelTwoScene.btnOver = false;
      levelTwoScene.howtoButton.setTint(0xffffff);
    });
    levelTwoScene.howtoButton.on("pointerdown", () => {
      levelTwoScene.howtoButton.setTint(0x999999);
    });
    levelTwoScene.howtoButton.on("pointerup", () => {
      if (levelTwoScene.isShowingPopup) return;
      levelTwoScene.howtoButton.setTint(0xffffff);
      levelTwoScene.showHowTo();
    });


    levelTwoScene.howtoPopup = levelTwoScene.add.sprite(960, 500, "popup2");
    levelTwoScene.howtoPopup.setOrigin(0.5, 0.5);
    levelTwoScene.howtoPopup.setDepth(5000);
    levelTwoScene.howtoPopup.visible = false;


    levelTwoScene.howtoPopup.setInteractive();

    levelTwoScene.howtoPopup.on("pointerover", () => {
      levelTwoScene.btnOver = true;
      levelTwoScene.howtoPopup.setTint(0x999999);
    });
    levelTwoScene.howtoPopup.on("pointerout", () => {
      levelTwoScene.btnOver = false;
      levelTwoScene.howtoPopup.setTint(0xffffff);
    });
    levelTwoScene.howtoPopup.on("pointerdown", () => {
      levelTwoScene.howtoPopup.setTint(0x999999);
    });
    levelTwoScene.howtoPopup.on("pointerup", () => {
      levelTwoScene.howtoPopup.setTint(0xffffff);
      levelTwoScene.closeHowTo();
    });

  }

  addUILabel(text, x, y) {
    return levelTwoScene.add
      .text(x, y, text, {
        font: "30px UI-Font",
        fill: "white"
      })
      .setOrigin(0, 0)
      .setDepth(1100);
  }

  addUIChangeableLabel(text, x, y) {
    var textObj = levelTwoScene.add
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
    levelTwoScene.uiHealthBarGroup = levelTwoScene.add.group();

    levelTwoScene.uiHealthBarMask = levelTwoScene.add.sprite(
      1050,
      955,
      "health_mask"
    );
    levelTwoScene.uiHealthBarMask.setOrigin(1, 0.2);
    levelTwoScene.uiHealthBarMask.displayHeight =
      levelTwoScene.uiHealthBarHeight;
    levelTwoScene.uiHealthBarMask.displayWidth = levelTwoScene.uiHealthBarWidth;
    levelTwoScene.uiHealthBarMask.height =
      levelTwoScene.uiHealthBarMask.displayHeight;
    levelTwoScene.uiHealthBarMask.width =
      levelTwoScene.uiHealthBarMask.displayWidth;
    levelTwoScene.uiHealthBarMask.visible = false;

    levelTwoScene.uiHealthBar = levelTwoScene.add.sprite(1050, 955, "health");
    levelTwoScene.uiHealthBar.setOrigin(1, 0.2);
    levelTwoScene.uiHealthBar.displayHeight = levelTwoScene.uiHealthBarHeight;
    levelTwoScene.uiHealthBar.displayWidth = levelTwoScene.uiHealthBarWidth;
    levelTwoScene.uiHealthBar.height = levelTwoScene.uiHealthBar.displayHeight;
    levelTwoScene.uiHealthBar.width = levelTwoScene.uiHealthBar.displayWidth;
    levelTwoScene.uiHealthBar.setDepth(1100);
    levelTwoScene.uiHealthBarGroup.add(levelTwoScene.uiHealthBar);

    levelTwoScene.uiHealthBar.mask = new Phaser.Display.Masks.BitmapMask(
      this,
      levelTwoScene.uiHealthBarMask
    );

    levelTwoScene.uiHealthBarBlank = levelTwoScene.add.sprite(
      1050,
      955,
      "health_blank"
    );
    levelTwoScene.uiHealthBarBlank.setOrigin(1, 0.2);
    levelTwoScene.uiHealthBarBlank.displayHeight =
      levelTwoScene.uiHealthBarHeight;
    levelTwoScene.uiHealthBarBlank.displayWidth =
      levelTwoScene.uiHealthBarWidth;
    levelTwoScene.uiHealthBarBlank.height =
      levelTwoScene.uiHealthBarBlank.displayHeight;
    levelTwoScene.uiHealthBarBlank.width =
      levelTwoScene.uiHealthBarBlank.displayWidth;
    levelTwoScene.uiHealthBarBlank.setDepth(1050);
    levelTwoScene.uiHealthBarGroup.add(levelTwoScene.uiHealthBarBlank);
  }

  addSanta() {
    levelTwoScene.santa = new Santa2(
      this,
      levelTwoScene.cameraWidth / 2,
      680,
      "santa2"
    );
  }

  addChild() {
    let y = 230;
    let childName = levelTwoScene.childNameArr[Math.floor(Math.random() * 3)];
    levelTwoScene.childCurrentDepth <= levelTwoScene.childMinDepth
      ? (levelTwoScene.childCurrentDepth = levelTwoScene.childMaxDepth)
      : (levelTwoScene.childCurrentDepth -= 2);
    // let childCount = Math.floor(Math.random() * 2 + 1);
    if (levelTwoScene.totalRunTime < levelTwoScene.maxHealth / 2.0) {
      levelTwoScene.excitedLevel();
      if (levelTwoScene.excitedCount == 0) {
        let prevExcitedPos = levelTwoScene.excitedPos;
        while (Math.abs(prevExcitedPos - levelTwoScene.excitedPos) < 50) {
          levelTwoScene.excitedPos = Math.floor(Math.random() * 100 + 910);
        }
        levelTwoScene.excitedCount = Math.floor(Math.random() * 10 + 5);
        levelTwoScene.childCurrentDepth = levelTwoScene.childMaxDepth;
      }
      new Child(
        this,
        levelTwoScene.excitedPos,
        y,
        childName,
        levelTwoScene.childId++,
        levelTwoScene.childCurrentDepth
      );
      levelTwoScene.excitedCount--;

      levelTwoScene.launchTimeLimit = 200;
    } else {
      let x = Math.floor(Math.random() * 100 + 910);
      new Child(
        this,
        x,
        y,
        childName,
        levelTwoScene.childId++,
        levelTwoScene.childCurrentDepth
      );

      let nextGenerationTime = Math.floor(Math.random() * 2000);
      levelTwoScene.launchTimeLimit = nextGenerationTime;
    }
  }

  updateHealth(health) {
    // if (levelTwoScene.excitedTrigger) return;
    levelTwoScene.health = health;
    var tween = levelTwoScene.tweens.add({
      targets: levelTwoScene.uiHealthBarMask,
      displayWidth: {
        from: levelTwoScene.uiHealthBarMask.displayWidth,
        to: levelTwoScene.uiHealthBarWidth * (health / levelTwoScene.maxHealth)
      },
      width: {
        from: levelTwoScene.uiHealthBarMask.displayWidth,
        to: levelTwoScene.uiHealthBarWidth * (health / levelTwoScene.maxHealth)
      },
      ease: "Quart.easeOut", // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 500,
      repeat: 0, // -1: infinity
      yoyo: false,
      onComplete: function () {
        if (health <= 0) {
          levelTwoScene.excitedLevel();
        }
      }.bind(this)
    });
  }

  updateScore(score, prevHitChildId, childId) {
    if (childId - 1 == prevHitChildId) {
      levelTwoScene.comboCount++;
      //   levelTwoScene.addComboLabel(levelTwoScene.comboCount);
      levelTwoScene.score += levelTwoScene.comboScore;
    } else {
      levelTwoScene.comboCount = 0;
    }
    levelTwoScene.score += score;
    var tween = levelTwoScene.tweens.add({
      targets: levelTwoScene.uiScore,
      text: {
        from: Number(levelTwoScene.uiScore.text),
        to: levelTwoScene.score
      },
      ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 500,
      repeat: 0, // -1: infinity
      yoyo: false,
      onUpdate: function () {
        levelTwoScene.uiScore.text = Math.ceil(levelTwoScene.uiScore.text);
      }.bind(this)
    });
    levelTwoScene.prevHitChildId = childId;
  }

  excitedLevel() {
    levelTwoScene.largeSkull.visible = true;
    levelTwoScene.largeSkull.play("large_skull_anim", true);
    levelTwoScene.tintAnimate();
  }

  tintAnimate() {
    if (levelTwoScene.tintChanged) {
      levelTwoScene.field.setTint(0x5dd160);
      levelTwoScene.statusBar.setTint(0xffffff);
      levelTwoScene.tintChanged = false;
    } else {
      levelTwoScene.field.setTint(0xff0000);
      levelTwoScene.statusBar.setTint(0xd15d5d);
      levelTwoScene.tintChanged = true;
    }
    var tintBlink = levelTwoScene.scene.scene.time.addEvent({
      delay: 100, // ms
      callback: levelTwoScene.tintAnimate.bind(this),
      loop: false
    });
  }
  Destroy() {
    levelTwoScene.field.destroy();
    levelTwoScene.text1.destroy();
    levelTwoScene.text2.destroy();
    levelTwoScene.background.destroy();
    levelTwoScene.largeSkull.destroy();
    levelTwoScene.road.destroy();
    levelTwoScene.statusBar.destroy();

    console.log("levelTwoScene: ", levelTwoScene);

  }

  muteScene() {
    if (levelTwoScene.mute) {
      levelTwoScene.mute = false;
      levelTwoScene.soundBtn.setTexture("sound_on_game");
      localStorage.setItem("mute", false);
      levelTwoScene.game.sound.mute = false;
    } else {
      levelTwoScene.mute = true;
      levelTwoScene.soundBtn.setTexture("sound_off_game");
      localStorage.setItem("mute", true);
      levelTwoScene.game.sound.mute = true;
    }
  }
  pauseScene() {
    if (levelTwoScene.pauseTrigger) {
      levelTwoScene.physics.resume();
      levelTwoScene.pauseTrigger = false;
      levelTwoScene.pauseBtn.setTexture("pause_btn");
      levelTwoScene.game.sound.resumeAll();
    } else {
      levelTwoScene.physics.pause();
      levelTwoScene.pauseTrigger = true;
      levelTwoScene.pauseBtn.setTexture("play_btn");
      levelTwoScene.game.sound.pauseAll();
    }
  }
  showHowTo() {
    levelTwoScene.pauseTrigger = false;
    levelTwoScene.howtoPopup.visible = true;
    levelTwoScene.isShowingPopup = true;
    this.pauseScene();
  }

  closeHowTo() {
    levelTwoScene.pauseTrigger = true;
    levelTwoScene.howtoPopup.visible = false;
    levelTwoScene.isShowingPopup = false;
    this.pauseScene();
  }

  gameOver() {
    levelTwoScene.mainCamera.fadeOut(2000);
    levelTwoScene.time.delayedCall(2000, function () {
      levelTwoScene.levelBgSFX.stop();
      levelTwoScene.scene.stop();
      levelTwoScene.scene.start("fail", {
        originScene: levelTwoScene,
        reason: "You've run out of Xmas spirit!"
      });
    });
  }
  gameComplete() {
    levelTwoScene.levelCompletedTrigger = true;
    levelTwoScene.mainCamera.fadeOut(2000);
    levelTwoScene.time.delayedCall(2000, function () {
      levelTwoScene.levelBgSFX.stop();
      levelTwoScene.scene.stop();
      levelTwoScene.scene.start("complete", levelTwoScene);
    });

  }

}

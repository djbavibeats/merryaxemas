var levelOneScene;
class Level1 extends Phaser.Scene {
  constructor() {
    super("level1");
    levelOneScene = this;
  }

  create() {


    
    levelOneScene.name = "level1";
    levelOneScene.registry.destroy();
    levelOneScene.events.off();
    levelOneScene.initAttributes();
    levelOneScene.cursors = levelOneScene.input.keyboard.createCursorKeys();
    levelOneScene.spacebar = levelOneScene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    levelOneScene.pointer = levelOneScene.input.activePointer;
    levelOneScene.input.mouse.disableContextMenu();

    levelOneScene.mute = localStorage.getItem("mute") == "true" ? true : false;
    // Add SFX
    levelOneScene.addSFX();
    // if (levelOneScene.mute) {
    //   levelOneScene.game.sound.mute = true;
    // }
    // levelOneScene.levelBgSFX.play();
    // levelOneScene.levelBgSFX.setLoop(true);
    // Add environment
    levelOneScene.addEnv();
    // Add chimneyGroup
    levelOneScene.chimneyGroup = levelOneScene.physics.add.group();
    // levelOneScene.addChimney();
    // Add headGroup
    levelOneScene.headGroup = levelOneScene.physics.add.group();
    // Add santa
    levelOneScene.santaGroup = levelOneScene.physics.add.group();
    levelOneScene.addSanta();
    // Add ui
    levelOneScene.addUI();

    levelOneScene.physics.add.collider(
      levelOneScene.santa,
      levelOneScene.houseGroup
    );
    levelOneScene.physics.add.collider(
      levelOneScene.chimneyGroup,
      levelOneScene.houseGroup
    );
    new OrientationChecker(levelOneScene);

    levelOneScene.mainCamera.fadeIn(2000);

  }

  update() {
    // levelOneScene.scene.pause();
    if (levelOneScene.gameOverTrigger || levelOneScene.levelCompletedTrigger)
      return;
    if (!levelOneScene.prevElapsedTime) {
      levelOneScene.prevElapsedTime = levelOneScene.time.now;
      return;
    }

    levelOneScene.mute = localStorage.getItem("mute") == "true" ? true : false;
    if (levelOneScene.mute) {
      levelOneScene.soundBtn.setTexture("sound_off_game");
      localStorage.setItem("mute", true);
      levelOneScene.game.sound.mute = true;
    } else {
      levelOneScene.soundBtn.setTexture("sound_on_game");
      localStorage.setItem("mute", false);
      levelOneScene.game.sound.mute = false;
    }

    if (levelOneScene.pauseTrigger) return;

    var deltaTime = levelOneScene.time.now - levelOneScene.prevElapsedTime;
    levelOneScene.cloud1Group.children.entries.forEach(function (element) {
      levelOneScene.moveElement(
        element,
        deltaTime * levelOneScene.cloud1Vel,
        true,
        false
      );
    });
    levelOneScene.cloud2Group.children.entries.forEach(function (element) {
      levelOneScene.moveElement(
        element,
        deltaTime * levelOneScene.cloud2Vel,
        true,
        false
      );
    });
    levelOneScene.apartment1Group.children.entries.forEach(function (element) {
      levelOneScene.moveElement(
        element,
        deltaTime * levelOneScene.apartment1Vel,
        true,
        false
      );
    });
    levelOneScene.apartment2Group.children.entries.forEach(function (element) {
      levelOneScene.moveElement(
        element,
        deltaTime * levelOneScene.apartment2Vel,
        true,
        false
      );
    });
    levelOneScene.roofGroup.children.entries.forEach(function (element) {
      levelOneScene.moveElement(
        element,
        deltaTime * levelOneScene.roofVel,
        false,
        true
      );
    });
    levelOneScene.chimneyGroup.children.entries.forEach(function (element) {
      levelOneScene.moveElement(
        element,
        deltaTime * levelOneScene.roofVel,
        false,
        false
      );
    });
    levelOneScene.santa.update(deltaTime);
    levelOneScene.prevElapsedTime = levelOneScene.time.now;
  }

  initAttributes() {
    levelOneScene.physics;
    levelOneScene.cursors;
    levelOneScene.spacebar;
    levelOneScene.pointer;
    levelOneScene.mute = false;
    levelOneScene.pauseTrigger = false;
    levelOneScene.nextLevel = "levelTwoLoading";
    levelOneScene.background = null;
    levelOneScene.cloud1Group = null;
    levelOneScene.cloud11 = null;
    levelOneScene.cloud12 = null;
    levelOneScene.cloud2Group = null;
    levelOneScene.cloud21 = null;
    levelOneScene.cloud22 = null;
    levelOneScene.apartment1Group = null;
    levelOneScene.apartment11 = null;
    levelOneScene.apartment12 = null;
    levelOneScene.apartment2Group = null;
    levelOneScene.apartment21 = null;
    levelOneScene.apartment22 = null;
    levelOneScene.houseGroup = null;
    levelOneScene.chimneyGroup = null;
    levelOneScene.headGroup = null;
    levelOneScene.santaGroup = null;
    levelOneScene.santa = null;
    levelOneScene.prevElapsedTime = null;
    levelOneScene.cloud1Vel = 0.05;
    levelOneScene.cloud2Vel = 0.1;
    levelOneScene.apartment1Vel = 0.2;
    levelOneScene.apartment2Vel = 0.3;
    levelOneScene.roofVel = 1;
    levelOneScene.uiSkull = null;
    levelOneScene.uiHead = null;
    levelOneScene.health = 100;
    levelOneScene.maxHealth = 100;
    levelOneScene.uiHealthBar = null;
    levelOneScene.uiHealthBarBlank = null;
    levelOneScene.uiHealthBarGroup = null;
    levelOneScene.uiHealthBarMask = null;
    levelOneScene.neededSpace = 300;
    levelOneScene.uiHeadWidth = 40;
    levelOneScene.uiMarginX = 100;
    levelOneScene.uiMarginY = 50;
    levelOneScene.uiRowSpace = 50;
    levelOneScene.uiColSpace = 65;
    levelOneScene.uiHealthBarWidth = 300;
    levelOneScene.uiHealthBarHeight = 70;
    levelOneScene.score = 0;
    levelOneScene.uiScore = null;
    levelOneScene.comboScore = 50;
    levelOneScene.startHeadCount = 7;
    levelOneScene.headCount = 10;
    levelOneScene.hitHeadCount = 0;
    levelOneScene.uiHeadCount = null;
    levelOneScene.chimneyId = 0;
    levelOneScene.headId = 0;
    levelOneScene.prevHitHeadId;
    levelOneScene.comboCount = 0;
    levelOneScene.gameOverTrigger = false;
    levelOneScene.levelCompletedTrigger = false;
    levelOneScene.btnOver = false;
    levelOneScene.chimneyNameArr = ["chimney1", "chimney2"];
    levelOneScene.houseNameArr = ["house1", "house2", "house3"];
    levelOneScene.bgApartmentNameArr = ["apartment2_1", "apartment2_2"];

    levelOneScene.levelBgSFX = null;
    levelOneScene.santaChimneyCollideSFX = null;
    levelOneScene.headChimneyCollideSFX = null;

    this.howtoButton = null;
    levelOneScene.mainCamera = levelOneScene.cameras.main;
  }

  moveElement(element, speed, reposition, renew) {
    element.x -= speed;
    if (element.x < -element.width) {
      if (renew) {
        element.destroy();
        let currentRoofs = levelOneScene.roofGroup.children.entries;
        let lastRoof = currentRoofs[currentRoofs.length - 1];
        levelOneScene.setElement(lastRoof.x + lastRoof.width);
      } else if (reposition) {
        element.x = 1920;
      } else {
        element.destroy();
      }
    }
  }

  setElement(deltaDistance) {
    let roofName = levelOneScene.houseNameArr[Math.floor(Math.random() * 3)];
    let newRoof = levelOneScene.add.sprite(deltaDistance, 1080, roofName);
    newRoof.setOrigin(0, 1);
    levelOneScene.roofGroup.add(newRoof);
    levelOneScene.addChimney(deltaDistance, newRoof.width - 150);
  }

  addEnv() {
    // Add background
    levelOneScene.background = levelOneScene.add.image(0, 0, "background");
    levelOneScene.background.setOrigin(0, 0);
    // Add cloud1Group
    levelOneScene.cloud1Group = levelOneScene.add.group();
    levelOneScene.cloud11 = levelOneScene.add.sprite(0, 0, "cloud1");
    levelOneScene.cloud11.setOrigin(0, 0);
    levelOneScene.cloud12 = levelOneScene.add.sprite(1920, 0, "cloud1");
    levelOneScene.cloud12.setOrigin(0, 0);
    levelOneScene.cloud1Group.add(levelOneScene.cloud11);
    levelOneScene.cloud1Group.add(levelOneScene.cloud12);
    // Add cloud2Group
    levelOneScene.cloud2Group = levelOneScene.add.group();
    levelOneScene.cloud21 = levelOneScene.add.sprite(0, 0, "cloud2");
    levelOneScene.cloud21.setOrigin(0, 0);
    levelOneScene.cloud22 = levelOneScene.add.sprite(1920, 0, "cloud2");
    levelOneScene.cloud22.setOrigin(0, 0);
    levelOneScene.cloud2Group.add(levelOneScene.cloud21);
    levelOneScene.cloud2Group.add(levelOneScene.cloud22);
    // Add apartment1Group
    levelOneScene.apartment1Group = levelOneScene.add.group();
    levelOneScene.apartment11 = levelOneScene.add.sprite(0, 0, "apartment1");
    levelOneScene.apartment11.setOrigin(0, 0);
    levelOneScene.apartment12 = levelOneScene.add.sprite(1920, 0, "apartment1");
    levelOneScene.apartment12.setOrigin(0, 0);
    levelOneScene.apartment1Group.add(levelOneScene.apartment11);
    levelOneScene.apartment1Group.add(levelOneScene.apartment12);
    // Add apartment2Group
    levelOneScene.apartment2Group = levelOneScene.add.group();
    levelOneScene.apartment21 = levelOneScene.add.sprite(0, 0, "apartment2_1");
    levelOneScene.apartment21.setOrigin(0, 0);
    levelOneScene.apartment22 = levelOneScene.add.sprite(
      1920,
      0,
      "apartment2_2"
    );
    levelOneScene.apartment22.setOrigin(0, 0);
    levelOneScene.apartment2Group.add(levelOneScene.apartment21);
    levelOneScene.apartment2Group.add(levelOneScene.apartment22);
    // Add houseGroup
    levelOneScene.houseGroup = levelOneScene.physics.add.staticGroup();
    let house1 = levelOneScene.add.sprite(0, 767, "house");
    house1.setOrigin(0, 0);
    house1.visible = false;
    let house2 = levelOneScene.add.sprite(1920, 767, "house");
    house2.setOrigin(0, 0);
    house2.visible = false;
    let house3 = levelOneScene.add.sprite(-1920, 767, "house");
    house3.setOrigin(0, 0);
    house3.visible = false;
    levelOneScene.houseGroup.add(house1);
    levelOneScene.houseGroup.add(house2);
    levelOneScene.houseGroup.add(house3);
    levelOneScene.roofGroup = levelOneScene.add.group();
    let roof1 = levelOneScene.add.sprite(0, 1080, "house1");
    roof1.setOrigin(0, 1);
    let roof2 = levelOneScene.add.sprite(roof1.width, 1080, "house2");
    roof2.setOrigin(0, 1);
    let roof3 = levelOneScene.add.sprite(
      roof1.width + roof2.width,
      1080,
      "house3"
    );
    roof3.setOrigin(0, 1);
    levelOneScene.roofGroup.add(roof1);
    levelOneScene.roofGroup.add(roof2);
    levelOneScene.roofGroup.add(roof3);

  }

  addSFX() {
    levelOneScene.levelBgSFX = levelOneScene.sound.add("level1_bg_sfx");

    setTimeout(() => {
      if (levelOneScene.mute) {
        levelOneScene.game.sound.mute = true;
      }
      levelOneScene.levelBgSFX.play();
      levelOneScene.levelBgSFX.setLoop(true);
      // alert(levelOneScene.levelBgSFX);
    }, (1000));
    levelOneScene.santaChimneyCollideSFX = levelOneScene.sound.add(
      "santa_chimney_collide_sfx"
    );
    levelOneScene.headChimneyCollideSFX = levelOneScene.sound.add(
      "head_chimney_collide_sfx"
    );
  }

  addUI() {
    // Add labels
    levelOneScene.text1 = levelOneScene.addUILabel("ST.NICK");
    levelOneScene.text2 = levelOneScene.addUILabel("X-MAS-SPIRIT");
    levelOneScene.text3 = levelOneScene.addUILabel("SCORE");
    // Add head
    levelOneScene.uiHead = levelOneScene.add.sprite(0, 0, "head");
    levelOneScene.uiHead.displayHeight =
      levelOneScene.uiHead.displayHeight *
      (levelOneScene.uiHeadWidth / levelOneScene.uiHead.displayWidth);
    levelOneScene.uiHead.displayWidth = levelOneScene.uiHeadWidth;
    levelOneScene.uiHead.height = levelOneScene.uiHead.displayHeight;
    levelOneScene.uiHead.width = levelOneScene.uiHead.displayWidth;
    // Add score
    levelOneScene.uiScore = levelOneScene.addUIChangeableLabel(
      levelOneScene.score
    );
    // Add head count
    levelOneScene.uiHeadCount = levelOneScene.addUIChangeableLabel(
      levelOneScene.headCount
    );
    // Add health bar
    levelOneScene.addUIHealthBar();
    // Column 1
    var row1 = new uiWidgets.Row(levelOneScene, 0, 0);
    row1.addNode(levelOneScene.text1, levelOneScene.uiRowSpace, 0);
    row1.addNode(levelOneScene.addUISkull(), levelOneScene.uiRowSpace, 0);
    row1.addNode(levelOneScene.addUISkull(), levelOneScene.uiRowSpace / 3, 0);
    row1.addNode(levelOneScene.addUISkull(), levelOneScene.uiRowSpace / 3, 0);

    var row2 = new uiWidgets.Row(levelOneScene, 0, 0);
    row2.addNode(levelOneScene.text2, levelOneScene.uiRowSpace, 0);

    var column1 = new uiWidgets.Column(
      levelOneScene,
      levelOneScene.uiMarginX,
      levelOneScene.uiMarginY
    );
    column1.addNode(row1, 0, levelOneScene.uiColSpace);
    column1.addNode(row2, 0, levelOneScene.uiColSpace);

    // Column 2
    var row3 = new uiWidgets.Row(levelOneScene, 0, 0);
    row3.addNode(levelOneScene.text3, levelOneScene.uiRowSpace, 0);
    row3.addNode(levelOneScene.uiScore, levelOneScene.uiRowSpace, 0);

    var row4 = new uiWidgets.Row(levelOneScene, 0, 0);
    row4.addNode(levelOneScene.uiHead, levelOneScene.uiRowSpace, 0);
    row4.addNode(
      levelOneScene.addUIChangeableLabel("X"),
      levelOneScene.uiRowSpace,
      0
    );
    row4.addNode(levelOneScene.uiHeadCount, levelOneScene.uiRowSpace, 0);

    var column2 = new uiWidgets.Column(
      levelOneScene,
      1500,
      levelOneScene.uiMarginY
    );
    column2.addNode(row3, 0, levelOneScene.uiColSpace);
    column2.addNode(row4, 0, levelOneScene.uiColSpace);

    // Add pause btn
    levelOneScene.pauseBtn = levelOneScene.add.sprite(150, 950, "pause_btn");
    levelOneScene.pauseBtn.setInteractive();
    levelOneScene.pauseBtn.setDepth(100);
    levelOneScene.pauseBtn.on("pointerover", () => {
      levelOneScene.btnOver = true;
      levelOneScene.pauseBtn.setTint(0x999999);
    });
    levelOneScene.pauseBtn.on("pointerout", () => {
      levelOneScene.btnOver = false;
      levelOneScene.pauseBtn.setTint(0xffffff);
    });
    levelOneScene.pauseBtn.on("pointerdown", () => {
      levelOneScene.pauseBtn.setTint(0x999999);
    });
    levelOneScene.pauseBtn.on("pointerup", () => {
      if (levelOneScene.isShowingPopup) return;
      levelOneScene.pauseBtn.setTint(0xffffff);
      levelOneScene.pauseScene();
    });

    // Add replay btn
    levelOneScene.replayBtn = levelOneScene.add.sprite(350, 950, "replay_btn");
    levelOneScene.replayBtn.setInteractive();
    levelOneScene.replayBtn.setDepth(100);
    levelOneScene.replayBtn.on("pointerover", () => {
      levelOneScene.btnOver = true;
      levelOneScene.replayBtn.setTint(0x999999);
    });
    levelOneScene.replayBtn.on("pointerout", () => {
      levelOneScene.btnOver = false;
      levelOneScene.replayBtn.setTint(0xffffff);
    });
    levelOneScene.replayBtn.on("pointerdown", () => {
      levelOneScene.replayBtn.setTint(0x999999);
    });
    levelOneScene.replayBtn.on("pointerup", () => {
      if (levelOneScene.isShowingPopup) return;
      levelOneScene.replayBtn.setTint(0xffffff);
      levelOneScene.scene.restart();
      levelOneScene.game.sound.stopAll();
    });

    // Add sound btn
    levelOneScene.soundBtn = levelOneScene.add.sprite(
      550,
      950,
      levelOneScene.mute ? "sound_off_game" : "sound_on_game"
    );
    levelOneScene.soundBtn.setInteractive();
    levelOneScene.soundBtn.setDepth(100);
    levelOneScene.soundBtn.on("pointerover", () => {
      levelOneScene.btnOver = true;
      levelOneScene.soundBtn.setTint(0x999999);
    });
    levelOneScene.soundBtn.on("pointerout", () => {
      levelOneScene.btnOver = false;
      levelOneScene.soundBtn.setTint(0xffffff);
    });
    levelOneScene.soundBtn.on("pointerdown", () => {
      levelOneScene.soundBtn.setTint(0x999999);
    });
    levelOneScene.soundBtn.on("pointerup", () => {
      if (levelOneScene.isShowingPopup) return;
      levelOneScene.soundBtn.setTint(0xffffff);
      levelOneScene.muteScene();
    });

    levelOneScene.howtoButton = levelOneScene.add.sprite(0, 380, "question_btn");
    levelOneScene.howtoButton.setInteractive();
    levelOneScene.howtoButton.setOrigin(0, 0);
    levelOneScene.howtoButton.visible = true;

    levelOneScene.howtoButton.on("pointerover", () => {
      levelOneScene.btnOver = true;
      levelOneScene.howtoButton.setTint(0x999999);
    });
    levelOneScene.howtoButton.on("pointerout", () => {
      levelOneScene.btnOver = false;
      levelOneScene.howtoButton.setTint(0xffffff);
    });
    levelOneScene.howtoButton.on("pointerdown", () => {
      levelOneScene.howtoButton.setTint(0x999999);
    });
    levelOneScene.howtoButton.on("pointerup", () => {
      levelOneScene.howtoButton.setTint(0xffffff);
      levelOneScene.showHowTo();
    });

    levelOneScene.howtoPopup = levelOneScene.add.sprite(960, 500, "popup1");
    levelOneScene.howtoPopup.setOrigin(0.5, 0.5);
    levelOneScene.howtoPopup.setDepth(5000);
    levelOneScene.howtoPopup.visible = false;


    // levelOneScene.howtoButtonClose = levelOneScene.add.sprite(50, 580, "question_btn");
    levelOneScene.howtoPopup.setInteractive();
    // levelOneScene.howtoButtonClose.setOrigin(0, 0);
    // levelOneScene.howtoButtonClose.visible = false;

    levelOneScene.howtoPopup.on("pointerover", () => {
      levelOneScene.btnOver = true;
      levelOneScene.howtoPopup.setTint(0x999999);
    });
    levelOneScene.howtoPopup.on("pointerout", () => {
      levelOneScene.btnOver = false;
      levelOneScene.howtoPopup.setTint(0xffffff);
    });
    levelOneScene.howtoPopup.on("pointerdown", () => {
      levelOneScene.howtoPopup.setTint(0x999999);
    });
    levelOneScene.howtoPopup.on("pointerup", () => {
      levelOneScene.howtoPopup.setTint(0xffffff);
      levelOneScene.closeHowTo();
    });

  }

  addSanta() {
    levelOneScene.santa = new Santa1(levelOneScene, 400, 300, "santa");
  }

  addChimney(deltaDistance, availableRoofWidth) {
    let chimneyCount = Math.floor(Math.random() * 2 + 1);
    let availableSpacePerChimney =
      (availableRoofWidth - levelOneScene.neededSpace * (chimneyCount + 1)) /
      chimneyCount;
    for (var i = 0; i < chimneyCount; i++) {
      let min =
        (Number((availableSpacePerChimney + levelOneScene.neededSpace) * i) +
          Number(levelOneScene.neededSpace)) /
        1;
      let max =
        availableSpacePerChimney * (i + 1) + levelOneScene.neededSpace * i;
      let chimneyPos = Math.floor(Math.random() * (max - min) + min);

      new Chimney(
        levelOneScene,
        deltaDistance + chimneyPos,
        400,
        levelOneScene.chimneyNameArr[i],
        levelOneScene.chimneyId++
      );
    }
  }

  addHead(remainedHeadCount) {
    remainedHeadCount--;
    levelOneScene.headCount = remainedHeadCount;
    new Sackhead(
      levelOneScene,
      levelOneScene.santa.x + 200,
      levelOneScene.santa.y,
      "head",
      levelOneScene.headId++
    );
    levelOneScene.updateHeadCount(remainedHeadCount);
    setTimeout(function () {
      if (remainedHeadCount == 0) {
        
        if (levelOneScene.hitHeadCount >= levelOneScene.startHeadCount) {
          levelOneScene.santa.levelCompleted();
        }
        else {
          levelOneScene.gameOver("You ran out of skulls!");
        }
      }
    }, 700);

    

  }

  addUILabel(text) {
    return levelOneScene.add.text(0, 0, text, {
      font: "30px UI-Font",
      fill: "white"
    });
  }

  addUIChangeableLabel(text) {
    var textObj = levelOneScene.add.text(0, 0, text, {
      fontFamily: "UI-Font",
      fontSize: "35px",
      color: "yellow",
      fontStyle: "bold"
    });

    return textObj;
  }

  addComboLabel(comboCount) {
    var textObj = levelOneScene.add.text(
      1200,
      450,
      "X" + comboCount + " COMBO!",
      {
        fontFamily: "Arial",
        fontSize: "35px",
        color: "yellow",
        fontStyle: "bold"
      }
    );

    var tween = levelOneScene.tweens.add({
      targets: textObj,
      y: {
        from: textObj.y,
        to: textObj.y - 200
      },
      ease: "Quart.easeOut", // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 2500,
      repeat: 0, // -1: infinity
      yoyo: false,
      onComplete: function () {
        textObj.destroy();
      }
    });
  }

  addUIHealthBar() {
    levelOneScene.uiHealthBarGroup = levelOneScene.add.group();

    levelOneScene.uiHealthBarMask = levelOneScene.add.sprite(
      levelOneScene.uiMarginX +
      levelOneScene.text2.width +
      levelOneScene.uiRowSpace +
      levelOneScene.uiHealthBarWidth,
      levelOneScene.uiMarginY +
      levelOneScene.text1.height +
      levelOneScene.uiColSpace -
      levelOneScene.uiHealthBarHeight,
      "health_mask"
    );
    levelOneScene.uiHealthBarMask.setOrigin(1, -0.2);
    levelOneScene.uiHealthBarMask.displayHeight =
      levelOneScene.uiHealthBarHeight;
    levelOneScene.uiHealthBarMask.displayWidth = levelOneScene.uiHealthBarWidth;
    levelOneScene.uiHealthBarMask.height =
      levelOneScene.uiHealthBarMask.displayHeight;
    levelOneScene.uiHealthBarMask.width =
      levelOneScene.uiHealthBarMask.displayWidth;
    levelOneScene.uiHealthBarMask.visible = false;

    levelOneScene.uiHealthBar = levelOneScene.add.sprite(
      levelOneScene.uiMarginX +
      levelOneScene.text2.width +
      levelOneScene.uiRowSpace +
      levelOneScene.uiHealthBarWidth,
      levelOneScene.uiMarginY +
      levelOneScene.text1.height +
      levelOneScene.uiColSpace -
      levelOneScene.uiHealthBarHeight,
      "health"
    );
    levelOneScene.uiHealthBar.setOrigin(1, -0.2);
    levelOneScene.uiHealthBar.displayHeight = levelOneScene.uiHealthBarHeight;
    levelOneScene.uiHealthBar.displayWidth = levelOneScene.uiHealthBarWidth;
    levelOneScene.uiHealthBar.height = levelOneScene.uiHealthBar.displayHeight;
    levelOneScene.uiHealthBar.width = levelOneScene.uiHealthBar.displayWidth;
    levelOneScene.uiHealthBar.setDepth(1);
    levelOneScene.uiHealthBarGroup.add(levelOneScene.uiHealthBar);

    levelOneScene.uiHealthBar.mask = new Phaser.Display.Masks.BitmapMask(
      levelOneScene,
      levelOneScene.uiHealthBarMask
    );

    levelOneScene.uiHealthBarBlank = levelOneScene.add.sprite(
      levelOneScene.uiMarginX +
      levelOneScene.text2.width +
      levelOneScene.uiRowSpace +
      levelOneScene.uiHealthBarWidth,
      levelOneScene.uiMarginY +
      levelOneScene.text1.height +
      levelOneScene.uiColSpace -
      levelOneScene.uiHealthBarHeight,
      "health_blank"
    );
    levelOneScene.uiHealthBarBlank.setOrigin(1, -0.2);
    levelOneScene.uiHealthBarBlank.displayHeight =
      levelOneScene.uiHealthBarHeight;
    levelOneScene.uiHealthBarBlank.displayWidth =
      levelOneScene.uiHealthBarWidth;
    levelOneScene.uiHealthBarBlank.height =
      levelOneScene.uiHealthBarBlank.displayHeight;
    levelOneScene.uiHealthBarBlank.width =
      levelOneScene.uiHealthBarBlank.displayWidth;
    levelOneScene.uiHealthBarGroup.add(levelOneScene.uiHealthBar);
  }

  addUISkull() {
    // Add skulls
    var uiSkull = levelOneScene.add.sprite(0, 0, "skull");
    uiSkull.displayHeight =
      uiSkull.displayHeight *
      (levelOneScene.uiHeadWidth / uiSkull.displayWidth);
    uiSkull.displayWidth = levelOneScene.uiHeadWidth;
    uiSkull.height = uiSkull.displayHeight;
    uiSkull.width = uiSkull.displayWidth;

    return uiSkull;
  }

  updateHealth(health) {
    levelOneScene.health = health;
    var tween = levelOneScene.tweens.add({
      targets: levelOneScene.uiHealthBarMask,
      displayWidth: {
        from: levelOneScene.uiHealthBarMask.displayWidth,
        to: levelOneScene.uiHealthBarWidth * (health / levelOneScene.maxHealth)
      },
      width: {
        from: levelOneScene.uiHealthBarMask.displayWidth,
        to: levelOneScene.uiHealthBarWidth * (health / levelOneScene.maxHealth)
      },
      ease: "Quart.easeOut", // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 500,
      repeat: 0, // -1: infinity
      yoyo: false,
      onComplete: function () {
        if (health <= 0) levelOneScene.gameOver("You've run out of Xmas spirit!");
      }
    });
  }

  updateHeadCount(remainedHeadCount) {
    levelOneScene.uiHeadCount.text = remainedHeadCount;
  }

  updateScore(score, prevHitHeadId, headId) {
    levelOneScene.hitHeadCount++;
    if (headId - 1 == prevHitHeadId) {
      levelOneScene.comboCount++;
      levelOneScene.addComboLabel(levelOneScene.comboCount);
      levelOneScene.score += levelOneScene.comboScore;
    } else {
      levelOneScene.comboCount = 0;
    }
    levelOneScene.score += score;
    var tween = levelOneScene.tweens.add({
      targets: levelOneScene.uiScore,
      text: {
        from: Number(levelOneScene.uiScore.text),
        to: levelOneScene.score
      },
      ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 500,
      repeat: 0, // -1: infinity
      yoyo: false,
      onUpdate: function () {
        levelOneScene.uiScore.text = Math.ceil(levelOneScene.uiScore.text);
      }
    });
    levelOneScene.prevHitHeadId = headId;
  }

  pauseScene() {
    if (levelOneScene.pauseTrigger) {
      levelOneScene.physics.resume();
      levelOneScene.pauseTrigger = false;
      levelOneScene.santa.animationResume();
      levelOneScene.pauseBtn.setTexture("pause_btn");
      levelOneScene.game.sound.resumeAll();
    } else {
      levelOneScene.physics.pause();
      levelOneScene.pauseTrigger = true;
      levelOneScene.santa.animationPause();
      levelOneScene.pauseBtn.setTexture("play_btn");
      levelOneScene.game.sound.pauseAll();
    }
  }

  muteScene() {
    if (levelOneScene.mute) {
      levelOneScene.mute = false;
      levelOneScene.soundBtn.setTexture("sound_on_game");
      localStorage.setItem("mute", false);
      levelOneScene.game.sound.mute = false;
    } else {
      levelOneScene.mute = true;
      levelOneScene.soundBtn.setTexture("sound_off_game");
      localStorage.setItem("mute", true);
      levelOneScene.game.sound.mute = true;
    }
  }

  gameOver(failReason) {
    levelOneScene.gameOverTrigger = true;
    levelOneScene.mainCamera.fadeOut(2000);
    levelOneScene.time.delayedCall(2000, function () {
      levelOneScene.levelBgSFX.stop();
      levelOneScene.scene.stop();
      levelOneScene.scene.start("fail", {
        originScene: levelOneScene,
        reason: failReason
      });

    });
  }

  levelCompleted() {
    levelOneScene.levelCompletedTrigger = true;

    levelOneScene.time.delayedCall(2000, function () {
      levelOneScene.scene.stop();
      levelOneScene.levelBgSFX.stop();
      levelOneScene.scene.start("complete", levelOneScene);
    });


  }

  showHowTo() {
    levelOneScene.pauseTrigger = false;
    levelOneScene.howtoPopup.visible = true;
    levelOneScene.isShowingPopup = true;
    this.pauseScene();
  }

  closeHowTo() {
    levelOneScene.pauseTrigger = true;
    levelOneScene.howtoPopup.visible = false;
    levelOneScene.isShowingPopup = false;
    this.pauseScene();
  }


}

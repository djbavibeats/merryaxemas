var completeScene;
class Complete extends Phaser.Scene {
  constructor() {
    super("complete");
    completeScene = this;
    completeScene.background = null;
    completeScene.replayBtn = null;
    completeScene.promotetext = null;
    completeScene.promotetext2 = null;
    completeScene.nextBtn = null;
    completeScene.levelCompletedSFX = null;
    completeScene.playBtnClickSFX = null;
    completeScene.mute = false;
    completeScene.level = 1;
    completeScene.email = null;
    completeScene.bonusLevel = false;
  }

  create(originScene) {
    console.log("create Complete")
    completeScene.originScene = originScene;
    completeScene.mute = localStorage.getItem("mute");
    // Add SFX
    completeScene.addSFX();
    if (completeScene.mute != "true") {
      completeScene.levelCompletedSFX.play();
      completeScene.levelCompletedSFX.setLoop(true);
    }

    // completeScene.submitScore(1, 100);
    // Add replay button
    completeScene.replayBtn = completeScene.add.sprite(800, 900, "replay_btn");
    completeScene.replayBtnLavel = this.addUILabel("REPLAY", 800, 1000, "yellow");
    completeScene.replayBtnLavel.visible = false;
    completeScene.replayBtn.setInteractive();
    completeScene.replayBtn.on("pointerover", () => {
      completeScene.replayBtn.setTint(0x999999);
    });
    completeScene.replayBtn.on("pointerout", () => {
      completeScene.replayBtn.setTint(0xffffff);
    });
    completeScene.replayBtn.on("pointerdown", () => {
      completeScene.levelCompletedSFX.stop();
      completeScene.playBtnClickSFX.play();
      setTimeout(function () {
        originScene.scene.restart();
        completeScene.scene.stop();
      }, 1000);
      completeScene.replayBtn.disableInteractive();
    });
    completeScene.replayBtn.visible = false;
    // Add next button
    completeScene.nextBtn = completeScene.add.sprite(1120, 900, "next_btn");
    completeScene.nextBtnLabel = this.addUILabel("CONTINUE", 1120, 1000, "#00f900");
    completeScene.nextBtnLabel.visible = false;

    completeScene.nextBtn.setInteractive();
    completeScene.nextBtn.on("pointerover", () => {
      completeScene.nextBtn.setTint(0x999999);
    });
    completeScene.nextBtn.on("pointerout", () => {
      completeScene.nextBtn.setTint(0xffffff);
    });
    completeScene.nextBtn.on("pointerdown", () => {
      completeScene.nextBtn.setTint(0x999999);
      completeScene.levelCompletedSFX.stop();
      if (!completeScene.mute) completeScene.playBtnClickSFX.play();

      if (!completeScene.bonusLevel) {
        setTimeout(function () {
          var sn = originScene.nextLevel;
          completeScene.scene.stop();
          completeScene.scene.start(sn);

        }, 1000);
        completeScene.nextBtn.disableInteractive();
      }
      else {
        //BONUS LEVEL!
        let newURL = window.location.href.replace(/\/$/, "").replace("/index.html", "").replace("/levels", "") + "/bonusLevel/";
        window.location.href = newURL;
      }
    });
    completeScene.nextBtn.visible = false;
    console.log(document.querySelector("canvas").style.width.split("px"), " WIDTH::::::::::::")

    completeScene.urllink = "";

    completeScene.promotetext = completeScene.add.text(950, 200, "", {
      font: "30px UI-Font",
      fill: "#0000ff", align: 'center'
    }).setOrigin(0.5, 0.5).setInteractive({ cursor: "pointer" })
      .on("pointerdown", function (pointer) {
        window.open(completeScene.urllink);/* "https://found.ee/ink_completecollection-1" */;
      });

    completeScene.promotetext.depth = 100001;

    console.log(document.querySelector("canvas").style.height, 200)
    
    document.getElementById('clicker').style.width = "100%";
    document.getElementById('clicker').style.top = "120px";

    completeScene.promotetext2 = completeScene.add.text(950, 200, "", {
      font: "30px UI-Font",
      fill: "#ffff00", align: 'center'
    }).setOrigin(0.5, 0.5).setInteractive({ cursor: "pointer" })
      .on("pointerdown", function (pointer) {
        window.open(completeScene.urllink);/* "https://found.ee/ink_completecollection-1" */;
      });

    completeScene.promotetext2.depth = 100001;

    completeScene.promotetext.visible = false;
    completeScene.promotetext2.visible = false;



    new OrientationChecker(completeScene);

    // Add environment
    completeScene.addEnv();

    /* console.log(completeScene.promotetext.width, document.querySelector("canvas").style.width.split("px")[0])
    console.log(completeScene.promotetext2.width, document.querySelector("canvas").style.width.split("px")[0]) */

    /* completeScene.promotetext = completeScene.add.text(0, completeScene.height * 0.15, 'Save our new album Welcome To Horrorwood! Click HERE!!', { fontFamily: "kong", fontSize: 20, color: "#0000ff" }).setInteractive({ cursor: "pointer" })
      .on("pointerdown", function (pointer) {
        window.location.href = "https://link.iceninekills.com/WTHSave";
      });
    var textWidth = completeScene.promotetext.width;
    completeScene.promotetext.x = (completeScene.width / 2) - (textWidth / 2);
    completeScene.promotetext.depth = 100001;

    completeScene.promotetext2 = completeScene.add.text(0, completeScene.height * 0.15, 'Save our new album Welcome To Horrorwood! Click HERE!!', { fontFamily: "kong", fontSize: 20, color: "#ffff00" }).setInteractive({ cursor: "pointer" })
      .on("pointerdown", function (pointer) {
        window.location.href = "https://link.iceninekills.com/WTHSave";
      });
    var textWidth2 = completeScene.promotetext2.width;
    completeScene.promotetext2.x = (completeScene.width / 2) - (textWidth2 / 2);
    completeScene.promotetext2.depth = 100001; */

    /* var ct = 0;
    levelOneScene.d = setInterval(() => {
      if ((ct % 2) === 0) {
        completeScene.promotetext.x = (this.scene.width / 2) - (promotetext.width / 2)
        completeScene.promotetext2.x = this.scene.width * 2;
      } else {
        completeScene.promotetext2.x = (this.scene.width / 2) - (promotetext2.width / 2)
        completeScene.promotetext.x = this.scene.width * 2;
      }
      ct++;
    }, 400); */

  }

  update() { }

  addEnv() {
    completeScene.background = completeScene.add.image(0, 0, "level_completed");
    completeScene.background.setOrigin(0, 0);
    console.log(completeScene)
    this.createInput(this.cameras.main.width / 2, this.cameras.main.height / 2);
  }

  addSFX() {
    console.log("addSFX");
    completeScene.levelCompletedSFX = completeScene.sound.add(
      "level_completed_sfx"
    );
    completeScene.playBtnClickSFX = this.sound.add("play_btn_click_sfx");
  }
  addUILabel(text, x, y, color) {
    console.log("addUILabel");
    return completeScene.add.text(x, y, text, {
      font: "30px UI-Font",
      fill: color
    }).setOrigin(0.5, 0.5);
  }

  addUILabel2(text, x, y, color) {
    console.log("addUILabel");
    return completeScene.add.text(x, y, text, {
      font: "20px UI-Font",
      fill: color
    })/* .setOrigin(0.5, 0.5) */;
  }

  submitScore(level, score, email) {
    console.log("submitScore");
    $.ajax({
      url: "/backend/admin/player/store_merry",
      type: "POST",
      data: {
        level: level,
        score: score,
        email: email
      },
      success: function () {
        console.log("done");

        if (level === 3) {
          location.href = "https://vimeo.com/380073509/584dfc59ad";
        }
      },
      error: function (error) {
        console.log("error");
      }
    })
  }




  createInput(x, y) {
    var emoji = "💀💀💀"
    console.log("createInput", completeScene.originScene.name);
    completeScene.replayBtn.visible = true;
    completeScene.nextBtn.visible = true;
    completeScene.replayBtnLavel.visible = true;
    completeScene.nextBtnLabel.visible = true;
    completeScene.nextBtn.depth = 100001;
    completeScene.replayBtn.depth = 100001;
    completeScene.replayBtnLavel.depth = 100001;
    completeScene.nextBtnLabel.depth = 100001;
    if (completeScene.originScene.name == "level1") {
      /* var element = completeScene.add.dom(x, y).createFromCache('nameform');
      element.addListener('click');

      element.on('click', function (event) {

        if (event.target.name === 'playButton') { */
      /* var inputText = this.getChildByName('nameField');
      if (inputText.value !== '') { */
      /* completeScene.email = inputText.value;
      element.removeListener('click'); */
      /* element.setVisible(false); */

      completeScene.promotetext.text = emoji + " Listen to the complete INK collection now! " + emoji + "\n\n Click HERE!!";
      completeScene.promotetext2.text = emoji + " Listen to the complete INK collection now! " + emoji + "\n\n Click HERE!!";
      completeScene.urllink = "https://found.ee/ink_completecollection-1";
      document.getElementById('clicker').href = completeScene.urllink;
      completeScene.promotetext.visible = true;
      completeScene.promotetext2.visible = true;
      var ct = 0;
      completeScene.d = setInterval(() => {
        if ((ct % 2) === 0) {
          completeScene.promotetext.visible = true;
          completeScene.promotetext2.visible = false;
        } else {
          completeScene.promotetext.visible = false;
          completeScene.promotetext2.visible = true;
        }
        ct++;
      }, 400);
      completeScene.bonusLevel = false;
      completeScene.submitScore(1, completeScene.originScene.score, completeScene.email);
      /* }
      else {
        completeScene.scene.tweens.add({
          targets: text,
          alpha: 0.2,
          duration: 250,
          ease: 'Power3',
          yoyo: true
        });
      } */
      /* } */
      /* }); */
    } else if (completeScene.originScene.name == "level2") {
      /* var element = completeScene.add.dom(x, y).createFromCache('nameform2');
      element.addListener('click');
      element.on('click', function (event) {
        if (event.target.name === 'playButton') {
          element.removeListener('click');
          element.setVisible(false); */
      /* completeScene.replayBtn.visible = true;
      completeScene.nextBtn.visible = true;
      completeScene.replayBtnLavel.visible = true;
      completeScene.nextBtnLabel.visible = true; */
      completeScene.promotetext.text = emoji + " Watch more INK music videos! " + emoji + "\n\n Click HERE!!";
      completeScene.promotetext2.text = emoji + " Watch more INK music videos! " + emoji + "\n\n Click HERE!!";
      completeScene.urllink = "https://link.iceninekills.com/YTMusicVideoPlaylist";
      document.getElementById('clicker').href = completeScene.urllink;
      completeScene.promotetext.visible = true;
      completeScene.promotetext2.visible = true;
      var ct = 0;
      completeScene.d = setInterval(() => {
        if ((ct % 2) === 0) {
          completeScene.promotetext.visible = true;
          completeScene.promotetext2.visible = false;
        } else {
          completeScene.promotetext.visible = false;
          completeScene.promotetext2.visible = true;
        }
        ct++;
      }, 400);
      completeScene.bonusLevel = false;
      completeScene.submitScore(2, completeScene.originScene.score, completeScene.email);
      /* }
    }); */

    } else if (completeScene.originScene.name == "level3") {
      /* var element = completeScene.add.dom(x, y).createFromCache('nameform3');
      element.addListener('click');
      element.on('click', function (event) {
        if (event.target.classList.contains('playButton')) {
          event.preventDefault();
          element.removeListener('click');
          element.setVisible(false); */
      /* completeScene.replayBtn.visible = true;
      completeScene.nextBtn.visible = true;
      completeScene.replayBtnLavel.visible = true;
      completeScene.nextBtnLabel.visible = true; */
      completeScene.promotetext.text = emoji + " Text us to stay up to date! " + emoji + "\n\n Click HERE!!";
      completeScene.promotetext2.text = emoji + " Text us to stay up to date! " + emoji + "\n\n Click HERE!!";
      completeScene.urllink = "https://link.iceninekills.com/INKTextUs";
      document.getElementById('clicker').href = completeScene.urllink;
      completeScene.promotetext.visible = true;
      completeScene.promotetext2.visible = true;
      var ct = 0;
      completeScene.d = setInterval(() => {
        if ((ct % 2) === 0) {
          completeScene.promotetext.visible = true;
          completeScene.promotetext2.visible = false;
        } else {
          completeScene.promotetext.visible = false;
          completeScene.promotetext2.visible = true;
        }
        ct++;
      }, 400);
      completeScene.bonusLevel = true;

      /* let newURL = "https://found.ee/inkpubg_unlock";
      window.open(newURL); */
      //window.location.href = newURL;

      //completeScene.submitScore(3, completeScene.originScene.score, completeScene.email);
      /* }
    }); */

    }

  }
}

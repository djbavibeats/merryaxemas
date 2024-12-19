class LevelOneLoading extends Phaser.Scene {
  constructor() {
    super("levelOneLoading");
  }

  preload() {
    new OrientationChecker(this);
    document.getElementById('clicker').style.width = "0%";
    document.getElementById('clicker').style.top = "-1020px";

    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(660, 515, 600, 50);
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff"
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff"
      }
    });
    percentText.setOrigin(0.5, 0.5);
    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff"
      }
    });
    assetText.setOrigin(0.5, 0.5);

    // Common assets
    this.load.image("replay_btn", "../src/img/replay_btn.png");
    this.load.image("next_btn", "../src/img/next_btn.png");
    this.load.audio("play_btn_click_sfx", "../src/sounds/play_btn_click.mp3");

    // Fail assets
    this.load.audio("game_over_sfx", "../src/sounds/game_over.mp3");

    // Complete assets
    this.load.audio("level_completed_sfx", "../src/sounds/level_completed.mp3");

    // Level1 assets
    this.load.image("background", "../src/img/background.png");
    this.load.image("cloud1", "../src/img/cloud1.png");
    this.load.image("cloud2", "../src/img/cloud2.png");
    this.load.image("apartment1", "../src/img/apartment1.png");
    this.load.image("apartment2_1", "../src/img/apartment2_1.png");
    this.load.image("apartment2_2", "../src/img/apartment2_2.png");
    this.load.image("house", "../src/img/house.png");
    this.load.image("house1", "../src/img/house1.png");
    this.load.image("house2", "../src/img/house2.png");
    this.load.image("house3", "../src/img/house3.png");
    this.load.image("chimney1", "../src/img/chimney1.png");
    this.load.image("chimney2", "../src/img/chimney2.png");
    this.load.image("head", "../src/img/head.png");
    this.load.image("skull", "../src/img/skull.png");
    this.load.image("health", "../src/img/health.png");
    this.load.image("health_mask", "../src/img/health_mask.png");
    this.load.image("health_blank", "../src/img/health_blank.png");
    this.load.image("level_completed", "../src/img/level_completed.png");
    this.load.image("level_failed", "../src/img/level_failed.png");
    this.load.image("pause_btn", "../src/img/pause_btn.png");
    this.load.image("play_btn", "../src/img/play_btn.png");
    this.load.image("replay_btn", "../src/img/replay_btn.png");
    this.load.image("sound_on_game", "../src/img/sound_on_game.png");
    this.load.image("sound_off_game", "../src/img/sound_off_game.png");
    this.load.image("question_btn", "../src/img/question_btn.png");
    this.load.image("popup1", "../src/img/popup1.png");

    this.load.html('nameform', '../src/html/textBox.html');

    this.load.image(
      "gameover_background",
      "../src/img/gameover_background.png"
    );
    this.load.spritesheet("hahaha", "../src/img/hahaha.png", {
      frameWidth: 1000,
      frameHeight: 150
    });
    this.load.spritesheet("santa", "../src/img/santa.png", {
      frameWidth: 450,
      frameHeight: 450
    });
    this.load.audio("level1_bg_sfx", "../src/sounds/level1_bg.mp3");
    this.load.audio(
      "head_chimney_collide_sfx",
      "../src/sounds/head_chimney_collide.mp3"
    );
    this.load.audio(
      "santa_chimney_collide_sfx",
      "../src/sounds/santa_chimney_collide.mp3"
    );

    this.load.on("progress", function (value) {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(670, 525, 580 * value, 30);
    });

    this.load.on("fileprogress", function (file) {
      assetText.setText("Loading asset: " + file.src);
    });

    this.load.on("complete", function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

  }

  create() {
    console.log("loading-create");

    // Create animations
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("santa", { start: 0, end: 6 }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("santa", { start: 8, end: 8 }),
      frameRate: 20
    });
    this.anims.create({
      key: "hahaha_anim",
      frames: this.anims.generateFrameNumbers("hahaha", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    let txt = " Spacebar or click to jump over chimneys. \n Heads will drop at random! 7 heads = SUCCESS \n \n For mobile: Tap to jump over chimneys. \n Heads will drop at random! 7 heads = SUCCESS"
    this.ins_lavel = this.addUILabel(txt, 960, 500, "yellow");
    this.ins_lavel.setOrigin(0.5, 0.5);
    this.ins_lavel.alpha = 0;
    let _this = this;

    var tween = this.tweens.add({
      targets: this.ins_lavel,
      alpha: {
        from: 0,
        to: 1
      },
      ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 4000,
      repeat: 0, // -1: infinity
      yoyo: true,
      onComplete: function () {
        _this.scene.start("level1");
      }
    });

    // this.add.tweens(this.ins_lavel).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    // this.scene.start("level1");
  }
  addUILabel(text, x, y, color) {
    return this.add.text(x, y, text, {
      font: "30px UI-Font",
      fill: color,
      align: "left"
    });
  }

}

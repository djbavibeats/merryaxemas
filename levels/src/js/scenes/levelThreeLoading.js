var assetImgUrl = "../src/img/l3/";
class LevelThreeLoading extends Phaser.Scene {
  constructor() {
    super("levelThreeLoading");
    console.log("levelthreeloading");
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
    console.log("asset asset", assetImgUrl);
    // level3 assets
    this.load.image("backsky", assetImgUrl + "Effect BG.png");
    this.load.image("background3", assetImgUrl + "back.png");
    this.load.image("Mouth", assetImgUrl + "Mouth 01.png");
    this.load.image("Open", assetImgUrl + "Open.png");
    this.load.image("Close", assetImgUrl + "Close.png");
    this.load.image("Bottom_temp", assetImgUrl + "bottom_temp.png");
    this.load.image("death", assetImgUrl + "death.png");
    this.load.image("sound_on_game", "../src/img/sound_on_game.png");
    this.load.image("sound_off_game", "../src/img/sound_off_game.png");
    this.load.image("pause_btn", "../src/img/pause_btn.png");
    this.load.image("popup3", "../src/img/popup3.png");

    this.load.html('nameform3', '../src/html/textBox3.html');

    this.load.spritesheet("large_skull", "../src/img/large_skull.png", {
      frameWidth: 257,
      frameHeight: 540
    });
    this.load.spritesheet("child1_die_body", "../src/img/child1_die_body.png", {
      frameWidth: 300,
      frameHeight: 260
    });
    this.load.spritesheet("child2_die_body", "../src/img/child2_die_body.png", {
      frameWidth: 300,
      frameHeight: 260
    });
    this.load.spritesheet("child3_die_body", "../src/img/child3_die_body.png", {
      frameWidth: 300,
      frameHeight: 260
    });
    this.load.spritesheet("child1_die_head", "../src/img/child1_die_head.png", {
      frameWidth: 300,
      frameHeight: 260
    });
    this.load.spritesheet("child2_die_head", "../src/img/child2_die_head.png", {
      frameWidth: 300,
      frameHeight: 260
    });
    this.load.spritesheet("child3_die_head", "../src/img/child3_die_head.png", {
      frameWidth: 300,
      frameHeight: 260
    });
    this.load.spritesheet("loop", assetImgUrl + "loop.png", {
      frameWidth: 189,
      frameHeight: 780
    });

    this.load.spritesheet("caroler1", assetImgUrl + "01.png", {
      frameWidth: 200,
      frameHeight: 425
    });
    this.load.spritesheet("caroler2", assetImgUrl + "02.png", {
      frameWidth: 200,
      frameHeight: 425
    });
    this.load.spritesheet("caroler3", assetImgUrl + "03.png", {
      frameWidth: 200,
      frameHeight: 425
    });

    this.load.audio("level3_bg_sfx", "../src/sounds/level3_bg.mp3");
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

    // this.scene.start("level3");
    let txt = " Silence all the sinners within 60 seconds! \n \n On Desktop, click your mouse or trackpad \n to hang the sinners. \n \n On Mobile, tap and drag your finger across \n the screen to hang the sinners."
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
        _this.scene.start("level3");
      }
    });
  }
  addUILabel(text, x, y, color) {
    return this.add.text(x, y, text, {
      font: "30px UI-Font",
      fill: color,
      align: "left"
    });
  }

}

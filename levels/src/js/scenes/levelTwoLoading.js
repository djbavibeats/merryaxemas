class LevelTwoLoading extends Phaser.Scene {
  constructor() {
    super("levelTwoLoading");
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
    // Level2 assets
    this.load.image("background2", "../src/img/background2.png");
    this.load.image("status_bar", "../src/img/status_bar.png");
    this.load.image("road", "../src/img/road.png");
    this.load.image("field", "../src/img/field.png");
    this.load.image("black_tree1", "../src/img/black_tree1.png");
    this.load.image("black_tree2", "../src/img/black_tree2.png");
    this.load.image("black_shadow", "../src/img/black_shadow.png");
    this.load.image("black_candy", "../src/img/black_candy.png");
    this.load.image("child1", "../src/img/child1.png");
    this.load.image("child2", "../src/img/child2.png");
    this.load.image("child3", "../src/img/child3.png");
    this.load.image("popup2", "../src/img/popup2.png");

    this.load.html('nameform2', '../src/html/textBox2.html');


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
    this.load.spritesheet("santa2", "../src/img/santa2.png", {
      frameWidth: 750,
      frameHeight: 500
    });
    this.load.audio("level2_bg_sfx", "../src/sounds/level2_bg.mp3");
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
    this.anims.create({
      key: "ready_axe",
      frames: this.anims.generateFrameNumbers("santa2", { start: 0, end: 0 }),
      frameRate: 20
    });
    this.anims.create({
      key: "hit_axe",
      frames: this.anims.generateFrameNumbers("santa2", { start: 1, end: 1 }),
      frameRate: 20
    });
    this.anims.create({
      key: "child1_die_body_anim",
      frames: this.anims.generateFrameNumbers("child1_die_body", {
        start: 0,
        end: 4
      }),
      frameRate: 20
    });
    this.anims.create({
      key: "child2_die_body_anim",
      frames: this.anims.generateFrameNumbers("child2_die_body", {
        start: 0,
        end: 4
      }),
      frameRate: 20
    });
    this.anims.create({
      key: "child3_die_body_anim",
      frames: this.anims.generateFrameNumbers("child3_die_body", {
        start: 0,
        end: 4
      }),
      frameRate: 20
    });
    this.anims.create({
      key: "child1_die_head_anim",
      frames: this.anims.generateFrameNumbers("child1_die_head", {
        start: 0,
        end: 5
      }),
      frameRate: 20
    });
    this.anims.create({
      key: "child2_die_head_anim",
      frames: this.anims.generateFrameNumbers("child2_die_head", {
        start: 0,
        end: 5
      }),
      frameRate: 20
    });
    this.anims.create({
      key: "child3_die_head_anim",
      frames: this.anims.generateFrameNumbers("child3_die_head", {
        start: 0,
        end: 5
      }),
      frameRate: 20
    });
    this.anims.create({
      key: "large_skull_anim",
      frames: this.anims.generateFrameNumbers("large_skull", {
        start: 0,
        end: 8
      }),
      frameRate: 12,
      repeat: -1
    });
    // this.scene.start("level2");
    let txt = " Score 20,000 in 30 seconds! \n \n On Desktop, click your mouse or trackpad \n to slice heads. \n \n On Mobile, tap and drag your finger \n across the screen to slice heads."
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
        _this.scene.start("level2");
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

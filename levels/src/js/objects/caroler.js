class Caroler extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, spriteName, randomTime, zorder) {
    super(scene, x, y, spriteName);
    this.scene = scene;
    this.status = "idle";
    this.randomTime = randomTime;
    this.currentTime = 0;
    this.randomArray = [8, 8.5, 8.25, 9, 7.7, 9.25, 9.5];
    this.initPos = new Phaser.Math.Vector2(x, y);
    this.direction = new Phaser.Math.Vector2(0, 1);
    this.velocity = 0.5;
    this.deep = 230;
    this.currentH = 0;
    this.pointerPosX = 0;
    this.distPointObj = 100;
    this.z_order = zorder;
    this.distFromLoop = zorder - 550
    this.init();


    this.mouth = new Phaser.GameObjects.Sprite(scene, x, y - 170, "Mouth");
    this.scene.add.existing(this.mouth);
    this.scene.santaGroup.add(this.mouth);
    this.mouth.setDepth(1500);
    this.mouth.body.setSize(100, 100);
    this.mouth.body.setOffset(this.width, this.height - 20);
    this.mouth.body.allowGravity = false;

    var _this = this;
    setInterval(function () {
      _this.mouth.visible ^= 0x01;
    }, (this.randomArray[Math.floor(Math.random() * 10) % 7] - 5) * 1000)

    this.open = new Phaser.GameObjects.Sprite(scene, x, y + 210, "Open");
    this.scene.add.existing(this.open);
    this.scene.santaGroup.add(this.open);
    this.open.setDepth(this.z_order - 2);
    this.open.body.setSize(100, 100);
    this.open.body.setOffset(this.width, this.height - 20);
    this.open.body.allowGravity = false;


    this.close = new Phaser.GameObjects.Sprite(scene, x, y + 210, "Close");
    this.scene.add.existing(this.close);
    this.scene.santaGroup.add(this.close);
    this.close.setDepth(this.z_order - 1);
    this.close.body.setSize(100, 100);
    this.close.body.setOffset(this.width, this.height - 20);
    this.close.body.allowGravity = false;

  }

  init() {
    this.scene.add.existing(this);
    this.scene.santaGroup.add(this);
    this.setDepth(this.z_order);
    this.body.setSize(50, 50);
    this.body.setOffset(this.width - 110, this.height / 2);
    this.body.allowGravity = false;
  }

  update(deltaTime, speedCoff = false) {
    if (this.status == "dead") return;
    this.currentTime += deltaTime;

    if (this.currentTime > this.randomTime * 1000) {
      this.status = "pingpong";
      this.currentTime = 0;
      this.close.visible = false;
    }
    if (this.status == "idle") {
      this.x = this.initPos.x;
      this.y = this.initPos.y;
      this.mouth.y = this.y - 170;
      return;
    }
    this.pingpong(deltaTime, speedCoff);
  }

  pingpong(deltaTime, speedCoff = false) {
    if (this.status != "pingpong") return;
    let timestemp = (speedCoff) ? 7.5 : 7.3;
    if (this.currentH < 0 && this.status == "pingpong") {
      this.status = "idle";
      this.currentTime = 0;
      this.direction = new Phaser.Math.Vector2(0, 1);
      this.randomTime = this.randomArray[Math.floor(Math.random() * 10) % 7] - timestemp;
      this.currentH = 0;
      this.close.visible = true;
    }
    if (this.currentH > this.deep && this.status == "pingpong") {
      this.direction = new Phaser.Math.Vector2(0, -1);
    }
    let speedV = (speedCoff) ? 1.3 : 1;
    let newY = this.direction.y * this.velocity * deltaTime * speedV;
    this.y += newY;
    this.mouth.y += newY;
    this.currentH += newY;
  }
  Death() {
    this.status = "dead";
    this.mouth.destroy();
    this.destroy();
  }
}

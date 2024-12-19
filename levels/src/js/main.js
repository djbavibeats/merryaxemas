// import TextTypingPlugin from "./plugins/texttyping-plugin.js";

window.onload = function () {
  var config = {
    type: Phaser.WEBGL,
    width: 1920,
    height: 1080,
    backgroundColor: 0x000000,
    scene: [],
    pixelArt: true,
    scale: {
      mode: Phaser.Scale.AUTO,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    dom: {
      createContainer: true
    },
    parent: 'phaser-example',
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 3000 },
        debug: false
      }
    }
  };

  var game = new Phaser.Game(config);
  game.scene.add("boot", Boot);
  game.scene.add("levelOneLoading", LevelOneLoading);
  game.scene.add("level1", Level1);
  game.scene.add("levelTwoLoading", LevelTwoLoading);
  game.scene.add("level2", Level2);
  game.scene.add("levelThreeLoading", LevelThreeLoading);
  game.scene.add("level3", Level3);
  game.scene.add("fail", Fail);
  game.scene.add("complete", Complete);
  game.scene.add("congratuation", Congratuation);
  game.scene.start("boot");

};

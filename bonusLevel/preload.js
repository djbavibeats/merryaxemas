
function preload()
{

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
    
    this.load.image('Portrait', 'images/portrait_to_landscape2.png');
    this.load.image('Santa 1', 'images/Santa 1.png');
    this.load.image('Santa 2', 'images/Santa 2.png');
    this.load.image('Building Background', 'images/Building Background.png');
    this.load.image('Truck', 'images/Garbage Truck Full.png');
    this.load.image('Bag 1', 'images/Bag 1.png');
    this.load.image('Bag 2', 'images/Bag 2.png');
    this.load.image('Bag 3', 'images/Bag 3.png');
    this.load.image('Police', 'images/Police Car 1.png');
    this.load.image('PoliceWrecked', 'images/Police Car 2.png');
    this.load.image('PoliceFlash', 'images/Police Car 3.png');
    this.load.image('PauseBtn', 'images/pause_btn.png');
    this.load.image('ReplayBtn', 'images/replay_btn.png');
    this.load.image('NextBtn', 'images/next_btn.png');
    this.load.image('PlayBtn', 'images/play_btn.png');
    this.load.image('SoundOff', 'images/sound_off_game.png');
    this.load.image('SoundOn', 'images/sound_on_game.png');
    this.load.image('SantaHealth', 'images/santa_health.png');
    this.load.image('Skull', 'images/skull.png');
    this.load.image('Head', 'images/head.png');
    this.load.image('HealthBlank', 'images/health_blank.png');
    this.load.image('LvlComplete', 'images/level_completed.png');
    this.load.image('LvlFail', 'images/level_failed.png');
    this.load.image('QuestionBtn', 'images/question_btn.png');
    this.load.image('RedLight', 'images/redGrad.png');
    this.load.image('BlueLight', 'images/blueGrad.png');
    this.load.audio('BGM', 'Merry Axe-Mas.wav');
    this.load.audio('Gameover', 'game_over.mp3');
    this.load.audio('level_completed', 'level_completed.mp3');
    this.load.image('Popup', 'images/popup4.png');
    /* this.load.image('CompletePopup', 'images/completepopup.png'); */

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
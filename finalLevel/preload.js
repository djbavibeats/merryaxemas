
function preload() {
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

    /* ============================================================================================= */
    this.load.image('NextBtn', 'assets/next_btn.png');
    this.load.image('Portrait', 'assets/portrait_to_landscape2.png');
    this.load.image('LvlComplete', 'assets/level_completed.png');
    this.load.image('LvlFail', 'assets/level_failed.png');
    this.load.image('Popup', 'assets/popup5.png')
    this.load.image('ReplayBtn', 'assets/replay_btn.png');
    this.load.image('QuestionBtn', 'assets/question_btn.png');
    this.load.image('background2', 'assets/background2.png');
    this.load.image('background', 'assets/background.png');
    this.load.image('ui', 'assets/UI.png');
    this.load.image('couch', 'assets/Couch.png');
    this.load.image('sprite', 'assets/Spirit.png');

    this.load.image('batrang', 'assets/Batarang.png');
    this.load.image('axe', 'assets/Axe.png');
    this.load.image('axe2', 'assets/Axe2.png');
    this.load.image('martini', 'assets/Martini.png');
    this.load.image('knife', 'assets/Knife.png');
    this.load.image('knife2', 'assets/Knife2.png');
    this.load.image('present1', 'assets/Present1.png');
    this.load.image('present2', 'assets/Present2.png');

    this.load.image('Santa000', 'assets/Santa000.png');
    this.load.image('Santa001', 'assets/Santa001.png');
    this.load.image('Santa002', 'assets/Santa002.png');
    this.load.image('blocked', 'assets/blocked.png');

    /* this.load.image('Girl000', 'assets/Girl0000.png'); */
    this.load.image('Girl001', 'assets/Girl0001.png');
    this.load.image('Girl002', 'assets/Girl0002.png');
    this.load.image('Girl003', 'assets/Girl0003.png');
    this.load.image('Girl004', 'assets/Girl0004.png');
    this.load.image('Girl005', 'assets/Girl0005.png');
    this.load.image('Girl006', 'assets/Girl0006.png');
    this.load.image('Girl007', 'assets/Girl0007.png');
    this.load.image('Girl008', 'assets/Girl0008.png');
    this.load.image('Girl009', 'assets/Girl0009.png');
    this.load.image('CompletePopup', 'assets/completepopup.png');
    this.load.image('head', 'assets/head.png');
    this.load.audio('BGM', 'Merry Axe-Mas.mp3');
    this.load.audio('Gameover', 'game_over.mp3');
    this.load.audio('level_completed', 'level_completed.mp3');
    /* this.load.audio('finishher', 'finishher.mp3'); */
    for (var o = 0; o <= 64; o++) {
        if (o < 10) {
            this.load.image('kill0' + o, 'assets/killsequence/kill0' + o + '.png');
        } else {
            this.load.image('kill' + o, 'assets/killsequence/kill' + o + '.png');
        }
    }

    for (var oe = 0; oe <= 59; oe++) {
        if (oe < 10) {
            this.load.image('haha0' + oe, 'assets/hahasequence/HAHAHA_0000' + oe + '.png');
        } else {
            this.load.image('haha' + oe, 'assets/hahasequence/HAHAHA_000' + oe + '.png');
        }
    }

    for (var to = 221; to <= 299; to++) {
        /* if (to < 10) {
            this.load.image('finish' + to, 'assets/finishher/18A FINISH HER_00' + to + '.png');
        } else { */
        this.load.image('finish' + to, 'assets/finishher/18A FINISH HER_00' + to + '.png');
        /* } */
    }

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
    /* ============================================================================================= */
}
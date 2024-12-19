
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


  this.load.image('2', 'assets2/images/Next_Foot.png');
  this.load.image('0', 'assets2/images/Next_Hand.png');
  this.load.image('1', 'assets2/images/Next_Head-Boy.png');
  this.load.image('4', 'assets2/images/Next_Head-Girl.png');
  this.load.image('3', 'assets2/images/Next_Leg.png');

  this.load.image('Portrait', 'assets2/portrait_to_landscape2.png');
  this.load.image('LvlComplete', 'assets2/level_completed.png');
  this.load.image('LvlFail', 'assets2/level_failed.png');
  this.load.image('Popup', 'assets2/popup6.png')
  this.load.image('ReplayBtn', 'assets2/replay_btn.png');
  this.load.image('QuestionBtn', 'assets2/question_btn.png');
  this.load.image('background2', 'assets2/images/Fireplace.png');
  this.load.image('background', 'assets2/images/BG.png');
  /* this.load.image('ui', 'assets2/UI.png'); */
  /* this.load.image('couch', 'assets2/Couch.png'); */
  this.load.image('sprite', 'assets2/images/Life.png');

  /* this.load.image('batrang', 'assets2/Batarang.png'); */
  /* this.load.image('axe', 'assets2/Axe.png');
  this.load.image('axe2', 'assets2/Axe2.png');
  this.load.image('martini', 'assets2/Martini.png');
  this.load.image('knife', 'assets2/Knife.png');
  this.load.image('knife2', 'assets2/Knife2.png');
  this.load.image('present1', 'assets2/Present1.png');
  this.load.image('present2', 'assets2/Present2.png'); */

  /* this.load.image('Santa000', 'assets2/Santa000.png');
  this.load.image('Santa001', 'assets2/Santa001.png');
  this.load.image('Santa002', 'assets2/Santa002.png');
  this.load.image('blocked', 'assets2/blocked.png');
 */
  /* this.load.image('Girl001', 'assets2/Girl0001.png');
  this.load.image('Girl002', 'assets2/Girl0002.png');
  this.load.image('Girl003', 'assets2/Girl0003.png');
  this.load.image('Girl004', 'assets2/Girl0004.png');
  this.load.image('Girl005', 'assets2/Girl0005.png');
  this.load.image('Girl006', 'assets2/Girl0006.png');
  this.load.image('Girl007', 'assets2/Girl0007.png');
  this.load.image('Girl008', 'assets2/Girl0008.png');
  this.load.image('Girl009', 'assets2/Girl0009.png'); */
  /* this.load.image('CompletePopup', 'assets2/completepopup.png'); */
  /* this.load.image('head', 'assets2/head.png'); */

  for (var o = 0; o <= 46; o++) {
    if (o < 10) {
      this.load.image('blood0' + o, 'assets2/blood/Blood00' + o + '.png');
    } else {
      this.load.image('blood' + o, 'assets2/blood/Blood0' + o + '.png');
    }
  }

  for (var o = 0; o <= 89; o++) {
    if (o < 10) {
      this.load.image('stack0' + o, 'assets2/stacksequence/stack0' + o + '.png');
    } else {
      this.load.image('stack' + o, 'assets2/stacksequence/stack' + o + '.png');
    }
  }

  for (var oe = 0; oe <= 59; oe++) {
    if (oe < 10) {
      this.load.image('haha0' + oe, 'assets2/hahasequence/HAHAHA_0000' + oe + '.png');
    } else {
      this.load.image('haha' + oe, 'assets2/hahasequence/HAHAHA_000' + oe + '.png');
    }
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
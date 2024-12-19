var width = 1920;
var height = 1080;
var config = {
    type:Phaser.CANVAS,
    parent: 'gameCanvas',
    pixelArt: true,
    scale: {
      mode: Phaser.Scale.AUTO,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    dom: {
      createContainer: true
    },
    width: width,
    height: height,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            debugShowBody: true,
            debugShowStaticBody: true,
            debugShowVelocity: true,
            debugVelocityColor: 0xffff00,
            debugBodyColor: 0x00ff00,
            debugStaticBodyColor: 0xffffff
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(config);
var scaleFactor = (height / width) * height;
var gameStartTimer = 0;
var gameTime = 0;
var maxStuff = 24;
var stuff = maxStuff;
var score = 0;
var truckOffset = new Phaser.Math.Vector2(0, 0);
var truckStartOffsetX = -width / 2;
var spirit = 3;
var surviveSecondsForReal = 61;
var surviveSeconds = surviveSecondsForReal;

function create()
{


    gameStartTimer = time();
    bg = new Background(this, 1);
    santa = new Santa(this);
    policeGroup = new PoliceGroup(this);
    truck = new Truck(this);
    this.cameras.main.fadeIn(2000, 0, 0, 0);
    
    isPaused = false;
    var pauseToggle = this.add.sprite(0.06 * width, 0.9 * height, 'PauseBtn').setInteractive();
    var restartBtn = this.add.sprite(0.16 * width, 0.9 * height, 'ReplayBtn').setInteractive();
    isSound = true;
    var soundToggle = this.add.sprite(0.26 * width, 0.9 * height, 'SoundOn').setInteractive();
    var questionToggle = this.add.sprite(0.02 * width, 0.5 * height, 'QuestionBtn').setInteractive();
    questionPopup = false;
    restartBtn.depth = soundToggle.depth = pauseToggle.depth = questionToggle.depth = 10000;

    pauseToggle.on('pointerdown', function (pointer) {
        if(!isPaused)
        {
            pauseToggle.setTexture('PlayBtn');
            BGM.mute = true;
            isPaused = true;
        }
        else
        {
            pauseToggle.setTexture('PauseBtn');
            if(isSound) BGM.mute = false;
            isPaused = false;
        }
    });
    
    restartBtn.on('pointerdown', function (pointer) {
        let newURL = window.location.href.replace(/\/$/, "");
        window.location.href = newURL;
    });

    questionToggle.on('pointerdown', function (pointer) {
        questionPopup = !questionPopup;
    })

    BGM = this.sound.add('BGM');
    BGM.play({ loop:true });
    soundToggle.on('pointerdown', function (pointer) {
        if(isSound)
        {
            soundToggle.setTexture('SoundOff');
            BGM.mute = true;
            isSound = false;
        }
        else
        {
            soundToggle.setTexture('SoundOn');
            BGM.mute = false;
            isSound = true;
        }
    });

    var rect = this.add.rectangle(width / 2, (0.06 * scaleFactor * 2.5), width, (0.075 * scaleFactor * 5), 0x000000);
    rect.alpha = 0.4;

    instructionRect = this.add.rectangle(width/2,height/2,width,height,0x000000);
    instructionRect.depth = 99999;
    instructionRectDelay = 4000;

    bonusLevelInstruction = this.add.text(100, (height/2) - 150, 'Survive from Police for 60 seconds!\n\nOn Desktop, click and drag the mouse or touch pad to\nthrow stuff.\n\nOn Mobile, touch and drag the finger to throw stuff.', { fontFamily: "kong", fontSize: 0.054 * scaleFactor, color: "yellow" });
    bonusLevelInstruction.depth = 100000;
    instructionPopup = this.add.sprite(width/2, height/2, 'Popup').setInteractive();
    instructionPopup.depth = 10000;
    instructionPopup.setActive(false).setVisible(false);

    instructionPopup.on('pointerdown', function (pointer) {
        questionPopup = !questionPopup;
    })

    spiritText = this.add.text(20, 20, 'X-MAS SPIRIT: █ █ █', { fontFamily: "kong", fontSize: 0.054 * scaleFactor });
    stuffText = this.add.text(20, 60, 'STUFF: ▌▌▌▌▌▌▌▌', { fontFamily: "kong", fontSize: 0.054 * scaleFactor });
    scoreText = this.add.text(20, 100, 'SCORE: 0', { fontFamily: "kong", fontSize: 0.054 * scaleFactor });
    surviveText = this.add.text(20, 140, ('SURVIVE FOR ' + surviveSeconds.toString() + ' SECONDS!'), { fontFamily: "kong", fontSize: 0.054 * scaleFactor });

    gameover = new Gameover(this);
    complete = new Complete(this);

    portraitToLandscape = this.add.sprite(width/2,height/2,'Portrait');
    portraitToLandscape.depth = 10000000;
    portraitToLandscape.alpha = 0;
}

function instructionUpdate(deltaTime)
{
    bonusLevelInstruction.updateText();
    if(instructionRectDelay <= 0.0)
    {
        instructionRect.alpha -= deltaTime / 1000.0;
        bonusLevelInstruction.alpha -= deltaTime / 500.0;
    }
    else
    {
        instructionRectDelay -= deltaTime;
    }

    instructionPopup.setActive(questionPopup).setVisible(questionPopup);
}

function updateUI()
{
    spiritText.text = 'X-MAS SPIRIT: ' + numChar(spirit, "█ ");
    spiritText.updateText();
    stuffText.text = "STUFF: " + numChar(stuff, "▌");
    stuffText.updateText();
    scoreText.text = "SCORE: " + score.toString();
    scoreText.updateText();
    surviveText.text = "SURVIVE FOR " + surviveSeconds.toString() + " SECONDS!";
    surviveText.updateText();
}

function update()
{
    var deltaTime = getDelta();

    if(window.innerHeight > window.innerWidth)
    {
        portraitToLandscape.alpha = 1;
        return;
    }
    else
        portraitToLandscape.alpha = 0;

    gameover.update(deltaTime);
    complete.update(deltaTime, surviveSeconds);
    instructionUpdate(deltaTime);

    if(isPaused || instructionRectDelay > 0.0 || questionPopup)
        return;

    truckStartOffsetX = lerp(truckStartOffsetX, 0, 0.0015 * deltaTime);
    truckOffset.x = (Math.sin(gameTime/2000) * 150) + truckStartOffsetX;
    truckOffset.y = Math.sin(gameTime/100) * 4;
    
    santa.event(truckOffset);

    if(bg.update(deltaTime))
    {
        stuff += Phaser.Math.RND.between(4, 8);
        if(stuff > maxStuff) stuff = maxStuff;
    }
    
    truck.update(deltaTime, truckOffset);
    santa.update(deltaTime, truckOffset);

    policeGroup.update(deltaTime);
    policeGroup.collide(santa.throwObjects);

    gameTime += deltaTime;
    surviveSeconds = Math.floor(surviveSecondsForReal - (gameTime / 1000.0));

    updateUI();
}

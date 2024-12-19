var width = 1920;
var height = 1080;

var config = {
    type: Phaser.WEBGL,
    parent: 'game1',
    pixelArt: true,
    transparent: true,
    scale: {
        mode: Phaser.Scale.AUTO,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    dom: {
        createContainer: true
    },
    input: {
        activePointers: 3,
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
/* var fd = setInterval(() => {
    if (window.boolstartgame) {
        clearInterval(fd)
        window.boolstartgame = false;
        
    }
}, 500); */

/*  */
var game = null;

game = new Phaser.Game(config);

/* var game = new Phaser.Game(config); */
var scaleFactor = (height / width) * height;
var gameStartTimer = 0;
var gameTime = 0;
var maxStuff = 24;
var stuff = maxStuff;
var score = 0;
var truckOffset = new Phaser.Math.Vector2(0, 0);
var truckStartOffsetX = -width / 2;
var spirit = 3;
var surviveSecondsForReal = 63;
var surviveSeconds = surviveSecondsForReal;

var scoreTotal = 0;
/* surviveSeconds = timeVal; */
var blockinghimbool = false;
function create() {
    /* console.log("width, height000000000000") */

    gameStartTimer = time();
    boolgamestarted = false;
    boolgameOver = false;
    boolgameended = false;
    questionToggle = null;
    bgkill = null;
    knifecount = 0;
    noclam = null

    this.cameras.main.fadeIn(2000, 0, 0, 0);


    isPaused = false;





    this.anims.create({
        key: 'stacksequence',
        frames: [
            { key: 'stack00' },
            { key: 'stack01' },
            { key: 'stack02' },
            { key: 'stack03' },
            { key: 'stack04' },
            { key: 'stack05' },
            { key: 'stack06' },
            { key: 'stack07' },
            { key: 'stack08' },
            { key: 'stack09' },
            { key: 'stack10' },
            { key: 'stack11' },
            { key: 'stack12' },
            { key: 'stack13' },
            { key: 'stack14' },
            { key: 'stack15' },
            { key: 'stack16' },
            { key: 'stack17' },
            { key: 'stack18' },
            { key: 'stack19' },
            { key: 'stack20' },
            { key: 'stack21' },
            { key: 'stack22' },
            { key: 'stack23' },
            { key: 'stack24' },
            { key: 'stack25' },
            { key: 'stack26' },
            { key: 'stack27' },
            { key: 'stack28' },
            { key: 'stack29' },
            { key: 'stack30' },
            { key: 'stack31' },
            { key: 'stack32' },
            { key: 'stack33' },
            { key: 'stack34' },
            { key: 'stack35' },
            { key: 'stack36' },
            { key: 'stack37' },
            { key: 'stack38' },
            { key: 'stack39' },
            { key: 'stack40' },
            { key: 'stack41' },
            { key: 'stack42' },
            { key: 'stack43' },
            { key: 'stack44' },
            { key: 'stack45' },
            { key: 'stack46' },
            { key: 'stack47' },
            { key: 'stack48' },
            { key: 'stack49' },
            { key: 'stack50' },
            { key: 'stack51' },
            { key: 'stack52' },
            { key: 'stack53' },
            { key: 'stack54' },
            { key: 'stack55' },
            { key: 'stack56' },
            { key: 'stack57' },
            { key: 'stack58' },
            { key: 'stack59' },
            { key: 'stack60' },
            { key: 'stack61' },
            { key: 'stack62' },
            { key: 'stack63' },
            { key: 'stack64' },
            { key: 'stack65' },
            { key: 'stack66' },
            { key: 'stack67' },
            { key: 'stack68' },
            { key: 'stack69' },
            { key: 'stack70' },
            { key: 'stack71' },
            { key: 'stack72' },
            { key: 'stack73' },
            { key: 'stack74' },
            { key: 'stack75' },
            { key: 'stack76' },
            { key: 'stack77' },
            { key: 'stack78' },
            { key: 'stack79' },
            { key: 'stack80', duration: 50 },

        ],
        frameRate: 18,
        repeat: 0
    });

    this.anims.create({
        key: 'hahasequence',
        frames: [
            { key: 'haha00' },
            { key: 'haha01' },
            { key: 'haha02' },
            { key: 'haha03' },
            { key: 'haha04' },
            { key: 'haha05' },
            { key: 'haha06' },
            { key: 'haha07' },
            { key: 'haha08' },
            { key: 'haha09' },
            { key: 'haha10' },
            { key: 'haha11' },
            { key: 'haha12' },
            { key: 'haha13' },
            { key: 'haha14' },
            { key: 'haha15' },
            { key: 'haha16' },
            { key: 'haha17' },
            { key: 'haha18' },
            { key: 'haha19' },
            { key: 'haha20' },
            { key: 'haha21' },
            { key: 'haha22' },
            { key: 'haha23' },
            { key: 'haha24' },
            { key: 'haha25' },
            { key: 'haha26' },
            { key: 'haha27' },
            { key: 'haha28' },
            { key: 'haha29' },
            { key: 'haha30' },
            { key: 'haha41' },
            { key: 'haha42' },
            { key: 'haha43' },
            { key: 'haha44' },
            { key: 'haha45' },
            { key: 'haha46' },
            { key: 'haha47' },
            { key: 'haha48' },
            { key: 'haha49' },
            { key: 'haha50' },
            { key: 'haha51' },
            { key: 'haha52' },
            { key: 'haha53' },
            { key: 'haha54' },
            { key: 'haha55' },
            { key: 'haha56' },
            { key: 'haha57' },
            { key: 'haha58' },
            { key: 'haha59', duration: 50 },
        ],
        frameRate: 18,
        repeat: 0
    });

    this.anims.create({
        key: 'bloodsequence',
        frames: [

            { key: 'blood00' },
            { key: 'blood01' },
            { key: 'blood02' },
            { key: 'blood03' },
            { key: 'blood04' },
            { key: 'blood05' },
            { key: 'blood06' },
            { key: 'blood07' },
            { key: 'blood08' },
            { key: 'blood09' },
            { key: 'blood10' },
            { key: 'blood11' },
            { key: 'blood12' },
            { key: 'blood13' },
            { key: 'blood14' },
            { key: 'blood15' },
            { key: 'blood16' },
            { key: 'blood17' },
            { key: 'blood18' },
            { key: 'blood19' },
            { key: 'blood20' },
            { key: 'blood21' },
            { key: 'blood22' },
            { key: 'blood23' },
            { key: 'blood24' },
            { key: 'blood25' },
            { key: 'blood26' },
            { key: 'blood27' },
            { key: 'blood28' },
            { key: 'blood29' },
            { key: 'blood30' },
            { key: 'blood41' },
            { key: 'blood42' },
            { key: 'blood43' },
            { key: 'blood44' },
            { key: 'blood45' },
            { key: 'blood46', duration: 50 },
        ],
        frameRate: 18,
        repeat: 0
    });

    var rect = this.add.rectangle(width / 2, (0.06 * scaleFactor * 2.5), width, (0.075 * scaleFactor * 5), 0x000000);
    rect.alpha = 0.4;

    instructionRect = this.add.rectangle(width / 2, height / 2, width, height, 0x000000);
    instructionRect.depth = 99999;
    instructionRectDelay = 4000;

    bonusLevelInstruction = this.add.text(100, (height / 2) - 150, 'Survive for 60 seconds! \n \n On Desktop, rotate pieces using up arrow key, left right arrow keys to move pieces. \n \n On Mobile, drag your finger \n \n across the left and right side of screen and \n\n tap to rotate the piece.', { fontFamily: "brokenConsoleBold", fontSize: 0.054 * scaleFactor, color: "yellow" });
    bonusLevelInstruction.depth = 100000;






    portraitToLandscape = this.add.sprite(width / 2, height / 2, 'Portrait');
    portraitToLandscape.depth = 10000000;
    portraitToLandscape.alpha = 0;

    this.scale = 0.007 * scaleFactor;
    bgkill = this.add.sprite(width / 2, height / 2, 'kill00');
    bgkill.depth = -1;
    bgkill.alpha = 0;
    bgkill.scaleX = bgkill.scaleY = this.scale;
    bgkill.bool = false;

    questionToggle = this.add.sprite(0.02 * width, 0.5 * height, 'QuestionBtn').setInteractive();
    questionPopup = false;
    questionToggle.visible = false;
    questionToggle.on('pointerdown', function (pointer) {
        if (isPaused) return;
        questionPopup = !questionPopup;
        if (questionPopup) {
            document.getElementById("bgMusic").pause();

            isPaused = true;
            iframeDocument.getElementById("pauseGame").innerHTML = isPaused;
            document.getElementById("game2").style.touchAction = "none";
            document.getElementById("game2").style.pointerEvents = "none";
        }
    })

    var de2 = setTimeout(() => {
        clearTimeout(de2);
        questionToggle.depth = 99990;

    }, instructionRectDelay * 2);


    surviveText = this.add.text(1725, 50, ('30'), { fontFamily: "brokenConsoleBold", fontSize: 0.105 * scaleFactor }).setDepth(1000);
    scoreText = this.add.text(215, 540, ('2500'), { fontFamily: "brokenConsoleBold", fontSize: 0.105 * scaleFactor }).setDepth(1000).setOrigin(.5);

    fnsetGradientText(scoreText, '#4941A9', '#ffffff', '#4941A9', 0.2);
    fnsetGradientText(surviveText, '#FFE374', '#ffffff', '#FFE374', 0.2);
    gameover = new Gameover(this);
    complete = new Complete(this);
    var de = setTimeout(() => {
        clearTimeout(de);
        startGame.call(this)
    }, instructionRectDelay*1.25);
    document.getElementById("game2").style.opacity = 1;

    instructionPopup = this.add.sprite(width / 2, height / 2, 'Popup').setInteractive();
    instructionPopup.depth = 10000000000000000000;
    instructionPopup.setActive(false).setVisible(false);
    document.getElementById("bgMusic").play();
    instructionPopup.on('pointerdown', function (pointer) {
        console.log("instructionPopup chck")
        questionPopup = !questionPopup;
        if (!questionPopup) {
            document.getElementById("bgMusic").play();
            isPaused = false;
            iframeDocument.getElementById("pauseGame").innerHTML = isPaused;
            document.getElementById("game2").style.touchAction = "auto";
            document.getElementById("game2").style.pointerEvents = "all";
        }
    })
    /* var arrr = [0];
    console.log(sumArray(arrr), " SV ::") */
}

function fnsetGradientText(text, color1, color2, color3, num) {
    // Create a gradient (parameters are the color stops)
    var gradient = text.context.createLinearGradient(0, 0, 0, text.height);

    // Add color stops to the gradient
    gradient.addColorStop(0, color1); // Dark blue
    gradient.addColorStop(num, color2); // White
    gradient.addColorStop(1, color3); // Dark blue

    // Set the fill style of the text to our gradient
    text.setFill(gradient);

}

function instructionUpdate(deltaTime) {
    bonusLevelInstruction.updateText();
    if (instructionRectDelay <= 0.0) {
        instructionRect.alpha -= (deltaTime / 1000.0);
        bonusLevelInstruction.alpha -= (deltaTime / 500.0);
    }
    else {
        instructionRectDelay -= deltaTime*.75;
    }
    instructionPopup.setActive(questionPopup).setVisible(questionPopup);

}
var updateLifebool = false;
var lifenum = 3;
var prevlife = 3;
function startGame() {

    /* BGM = this.sound.add('BGM'); */
    document.body.style.backgroundImage = "url('./assets2/images/BG.png')";
    document.querySelector("#game2").src = "./Tetris/index.html";
    var that = this;
    this.stack0 = this.add.sprite(width / 2, height / 2, 'stack00').setAlpha(1).setScale(4).setDepth(1001);
    this.stack0.play('stacksequence').on('animationcomplete', function () {
        /* 
                BGM.play({ loop: true }); */

        that.tweens.add({
            targets: that.stack0,
            alpha: 0,
            ease: 'Power1',
            duration: 1000,
            yoyo: false,
            repeat: 0
        });
        boolInterval = null;
        moveSpeed = 15;

        that.cursor = that.input.keyboard.createCursorKeys();

        that.bg2 = that.add.sprite(width / 2, -height / 2, 'background2').setAlpha(1).setDepth(100);

        that.nextsymbol = that.add.sprite(width * .877, height * .46, '0').setAlpha(1).setScale(.75).setDepth(101);

        that.tweens.add({
            targets: that.bg2,
            y: height / 2,
            ease: 'Bounce.out',
            duration: 1000,
            yoyo: false,
            repeat: 0
        });

        that.life1 = that.add.sprite(width * .02, height * .17, 'sprite')
        that.life1.depth = 100;
        that.life2 = that.add.sprite(that.life1.x + that.life1.displayWidth * 1.2, height * .17, 'sprite')
        that.life2.depth = 100;
        that.life3 = that.add.sprite(that.life2.x + that.life2.displayWidth * 1.2, height * .17, 'sprite')
        that.life3.depth = 100;

        getDivContent()
    });
}

function fetchAttackRangle() {
    return 7000;
}

function normalize(val, max, min) { return (val - min) / (max - min); }

function updateUI() {
    surviveText.text = surviveSeconds <= 60 ? surviveSeconds : 60;
    surviveText.updateText();

    if (scoreVal != undefined) {

        var str = scoreVal + "";
        /* console.log(scoreVal, " scoreValscoreValscoreVal",); */
        var arrr = str.split(",");
        scoreText.text = sumArray(arrr);
        scoreText.updateText();
    }

}

function sumArray(arr) {
    if (!Array.isArray(arr)) {
        return 0;
    }

    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += parseInt(arr[i]);
    }
    return sum;
}

function update() {
    var deltaTime = getDelta();
    /* console.log(boolgamestarted, " boolgamestarted") */

    if (iframereadybool) {
        document.querySelector("iframe").focus();
        if (!boolgamestarted) {
            setTimeout(() => {
                questionToggle.visible = true;
            }, 1000);
            
        }

        setValues();
        boolgamestarted = true;
    }

    if (window.innerHeight > window.innerWidth) {
        portraitToLandscape.alpha = 1;
        return;
    }
    else
        portraitToLandscape.alpha = 0;

    gameover.update(deltaTime);
    
    complete.update(deltaTime, surviveSeconds, boolgameended);

    instructionUpdate.call(this, deltaTime);

    if (isPaused || instructionRectDelay > 0.0 || questionPopup)
        return;

    truckStartOffsetX = lerp(truckStartOffsetX, 0, 0.0015 * deltaTime);
    truckOffset.x = (Math.sin(gameTime / 2000) * 150) + truckStartOffsetX;
    truckOffset.y = Math.sin(gameTime / 100) * 4;

    stuff += Phaser.Math.RND.between(4, 8);
    if (stuff > maxStuff) stuff = maxStuff;

    if (boolgamestarted) {



        this.nextsymbol.setTexture(nextblockVal);
        var that = this;
        if (lifenum != prevlife && lifenum != 3) {
            prevlife = lifenum;
            /* if (lifenum === 2) { */
            /* console.log(lifenum, lifenum == 2, ";lifenum"); */
            if (lifenum == 1) {
                this.life3.setTintFill(0xffffff);
                this.life3.setAlpha(.5)
                this.life2.setTintFill(0xffffff);
                this.life2.setAlpha(.5)
            } else if (lifenum == 2) {
                this.life3.setTintFill(0xffffff);
                this.life3.setAlpha(.5)
            } else if (lifenum == 0) {
                this.life1.setTintFill(0xffffff); this.life1.setAlpha(.5);
                this.life2.setTintFill(0xffffff); this.life2.setAlpha(.5);
                this.life3.setTintFill(0xffffff); this.life3.setAlpha(.5);
                var that = this;
                this.blood0 = this.add.sprite(width / 2, height / 2, 'blood0').setAlpha(1).setScale(3.6).setDepth(99);
                this.blood0.play('bloodsequence').on('animationcomplete', function () {
                    bgkill.depth = 100000;
                    that.tweens.add({
                        targets: that.blood0,
                        alpha: 0,
                        ease: 'Power1',
                        duration: 1000,
                        yoyo: false,
                        repeat: 0
                    });
                    that.tweens.add({
                        targets: bgkill,
                        alpha: 1,
                        ease: 'Power1',
                        duration: 1000,
                        yoyo: false,
                        repeat: 0
                    });

                    if (!bgkill.bool) {
                        clearInterval(boolInterval);
                        bgkill.bool = true;
                        document.getElementById("bgMusic").pause();
                        document.getElementById("Gameovermusic").play();
                        bgkill.play('hahasequence').on('animationcomplete', function () {
                            lifenum = 0;
                            gameover.boolgameOver = true;
                        });
                    }
                });

            }

            updateLifebool = true;
        }

        if (gameover.boolgameOver) {
            bgkill.depth = 100000;
            bgkill.alpha += deltaTime / 1000.0;
        }
        if (updateLifebool) {
            updateLifebool = false;

            /* console.log("SHAKE CAMERA", "LIFE00") */
            this.cameras.main.shake(500, 0.01)
            var graphics = this.add.graphics();
            graphics.fillStyle(0xff0000, 0.3).setDepth(1000);
            graphics.fillRect(0, 0, game.canvas.width, game.canvas.width);
            var df = setTimeout(() => {
                graphics.destroy()
            }, 250);
        }
        /* console.log(gameStateOver, timeVal, " gameStateOvergameStateOver"); */
        gameTime += deltaTime;
        surviveSeconds = Math.floor(surviveSecondsForReal - (gameTime / 1000.0));

        if (surviveSeconds <= 0) {
            surviveSeconds = 0;
            var that = this;
            if (!this.blood0) {
                this.blood0 = this.add.sprite(width / 2, height / 2, 'blood0').setAlpha(1).setScale(3.6).setDepth(99);
                this.blood0.play('bloodsequence').on('animationcomplete', function () {
                    that.tweens.add({
                        targets: that.blood0,
                        alpha: 0,
                        ease: 'Power1',
                        duration: 1000,
                        yoyo: false,
                        repeat: 0
                    });

                    bgkill.depth = 100000;
                    bgkill.alpha += deltaTime / 1000.0;
                    if (!bgkill.bool) {
                        clearInterval(boolInterval);
                        /* BGM.stop(); */
                        setTimeout(() => {
                            bgkill.bool = true;document.getElementById("bgMusic").pause();
                            boolgameended = true;
                        }, 350);
                    }
                });
            }
        }

    }

    updateUI();


}

function fnDragSanta(x, _santa) {
    if (_santa.x > game.canvas.width * .25 && _santa.x < game.canvas.width * .55) {
        _santa = x;
    }
}

function onCollision1() {
    /* console.log("onCollision1") */
}

function onCollision2() {
    /* console.log("onCollision2") */
}

function fngameOver1() {


}


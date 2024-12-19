var width = 1920;
var height = 1080;
var config = {
    type: Phaser.WEBGL,
    parent: 'gameCanvas',
    pixelArt: true,
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
var surviveSecondsForReal = 31;
var surviveSeconds = surviveSecondsForReal;
var blockinghimbool = false;
function create() {
    /* console.log(width, height) */
    gameStartTimer = time();
    boolgamestarted = false;
    boolgameOver = false;
    boolgameended = false;
    bgkill = null;
    knifecount = 0;
    noclam = null

    this.cameras.main.fadeIn(2000, 0, 0, 0);


    isPaused = false;
    var questionToggle = this.add.sprite(0.02 * width, 0.5 * height, 'QuestionBtn').setInteractive();
    questionPopup = false;

    questionToggle.on('pointerdown', function (pointer) {
        if (isPaused) return;
        questionPopup = !questionPopup;
        if (questionPopup) {
            isPaused = true;
        }
    })


    this.anims.create({
        key: 'santaattack',
        frames: [
            { key: 'Santa000' },
            { key: 'Santa001' },
            { key: 'Santa002', duration: 50 }
        ],
        frameRate: 16,
        repeat: 0
    });

    this.anims.create({
        key: 'girlentrance',
        frames: [
            { key: 'Girl001' },
            { key: 'Girl002' },
            { key: 'Girl003' },
            { key: 'Girl004' },
            { key: 'Girl005' },
            { key: 'Girl006' },
            { key: 'Girl007' },
            { key: 'Girl008' },
            { key: 'Girl009' },
            { key: 'Girl001', duration: 50 }
        ],
        frameRate: 8,
        repeat: 0
    });

    this.anims.create({
        key: 'girlattack',
        frames: [
            { key: 'Girl008' },
            { key: 'Girl009', duration: 50 }
        ],
        frameRate: 4,
        repeat: 2
    });

    this.anims.create({
        key: 'killsequence',
        frames: [
            { key: 'kill00' },
            { key: 'kill01' },
            { key: 'kill02' },
            { key: 'kill03' },
            { key: 'kill04' },
            { key: 'kill05' },
            { key: 'kill06' },
            { key: 'kill07' },
            { key: 'kill08' },
            { key: 'kill09' },
            { key: 'kill10' },
            { key: 'kill11' },
            { key: 'kill12' },
            { key: 'kill13' },
            { key: 'kill14' },
            { key: 'kill15' },
            { key: 'kill16' },
            { key: 'kill17' },
            { key: 'kill18' },
            { key: 'kill19' },
            { key: 'kill20' },
            { key: 'kill21' },
            { key: 'kill22' },
            { key: 'kill23' },
            { key: 'kill24' },
            { key: 'kill25' },
            { key: 'kill26' },
            { key: 'kill27' },
            { key: 'kill28' },
            { key: 'kill29' },
            { key: 'kill30' },
            { key: 'kill41' },
            { key: 'kill42' },
            { key: 'kill43' },
            { key: 'kill44' },
            { key: 'kill45' },
            { key: 'kill46' },
            { key: 'kill47' },
            { key: 'kill48' },
            { key: 'kill49' },
            { key: 'kill50' },
            { key: 'kill51' },
            { key: 'kill52' },
            { key: 'kill53' },
            { key: 'kill54' },
            { key: 'kill55' },
            { key: 'kill56' },
            { key: 'kill57' },
            { key: 'kill58' },
            { key: 'kill59' },
            { key: 'kill60' },
            { key: 'kill61' },
            { key: 'kill62' },
            { key: 'kill63' },
            { key: 'kill64', duration: 50 },
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
        key: 'finishsequence',
        frames: [

            { key: 'finish221' },
            { key: 'finish222' },
            { key: 'finish223' },
            { key: 'finish224' },
            { key: 'finish225' },
            { key: 'finish226' },
            { key: 'finish227' },
            { key: 'finish228' },
            { key: 'finish229' },
            { key: 'finish230' },
            { key: 'finish241' },
            { key: 'finish242' },
            { key: 'finish243' },
            { key: 'finish244' },
            { key: 'finish245' },
            { key: 'finish246' },
            { key: 'finish247' },
            { key: 'finish248' },
            { key: 'finish249' },
            { key: 'finish250' },
            { key: 'finish251' },
            { key: 'finish252' },
            { key: 'finish253' },
            { key: 'finish254' },
            { key: 'finish255' },
            { key: 'finish256' },
            { key: 'finish257' },
            { key: 'finish258' },
            { key: 'finish259' },
            { key: 'finish260' },
            { key: 'finish261' },
            { key: 'finish262' },
            { key: 'finish263' },
            { key: 'finish264' },
            { key: 'finish265' },
            { key: 'finish266' },
            { key: 'finish267' },
            { key: 'finish268' },
            { key: 'finish269' },
            { key: 'finish270' },
            { key: 'finish271' },
            { key: 'finish272' },
            { key: 'finish273' },
            { key: 'finish274' },
            { key: 'finish275' },
            { key: 'finish276' },
            { key: 'finish277' },
            { key: 'finish278' },
            { key: 'finish279' },
            { key: 'finish280' },
            { key: 'finish281' },
            { key: 'finish282' },
            { key: 'finish283' },
            { key: 'finish284' },
            { key: 'finish285' },
            { key: 'finish286' },
            { key: 'finish287' },
            { key: 'finish288' },
            { key: 'finish289' },
            { key: 'finish290' },
            { key: 'finish291' },
            { key: 'finish292' },
            { key: 'finish293' },
            { key: 'finish294' },
            { key: 'finish295' },
            { key: 'finish296' },
            { key: 'finish297' },
            { key: 'finish298' },
            { key: 'finish299' },
        ],
        frameRate: 18,
        repeat: 0
    });

    var rect = this.add.rectangle(width / 2, (0.06 * scaleFactor * 2.5), width, (0.075 * scaleFactor * 5), 0x000000);
    rect.alpha = 0.4;

    instructionRect = this.add.rectangle(width / 2, height / 2, width, height, 0x000000);
    instructionRect.depth = 99999;
    instructionRectDelay = 4000;

    bonusLevelInstruction = this.add.text(100, (height / 2) - 150, 'Survive for 30 seconds! \n \n On Desktop, arrow keys and space bar to attack. \n \n On Mobile, drag your finger \n \n across the left side of screen to move santa and \n\n tap on right side of the screen to attack.', { fontFamily: "kong", fontSize: 0.054 * scaleFactor, color: "yellow" });
    bonusLevelInstruction.depth = 100000;
    instructionPopup = this.add.sprite(width / 2, height / 2, 'Popup').setInteractive();
    instructionPopup.depth = 10000;
    instructionPopup.setActive(false).setVisible(false);

    instructionPopup.on('pointerdown', function (pointer) {
        questionPopup = !questionPopup;
        if (!questionPopup) {
            isPaused = false;
        }
    })
    surviveText = this.add.text(20, 140, ('30'), { fontFamily: "kong", fontSize: 0.06 * scaleFactor }).setDepth(1000);
    gameover = new Gameover(this);
    complete = new Complete(this);

    portraitToLandscape = this.add.sprite(width / 2, height / 2, 'Portrait');
    portraitToLandscape.depth = 10000000;
    portraitToLandscape.alpha = 0;

    this.scale = 0.007 * scaleFactor;
    bgkill = this.add.sprite(width / 2, height / 2, 'kill00');
    bgkill.depth = -1;
    bgkill.alpha = 0;
    bgkill.scaleX = bgkill.scaleY = this.scale;
    bgkill.bool = false;
    lady = new Lady(this);
    santa1 = new Santa(this);

    BGM = this.sound.add('BGM');
    
    BGM.play({ loop: true });

    var de = setTimeout(() => {
        clearTimeout(de);
        startGame.call(this)
    }, instructionRectDelay);

    var de2 = setTimeout(() => {
        clearTimeout(de2);
        questionToggle.depth = 99990;
    }, instructionRectDelay * 2);
}


function instructionUpdate(deltaTime) {
    bonusLevelInstruction.updateText();
    if (instructionRectDelay <= 0.0) {
        instructionRect.alpha -= deltaTime / 1000.0;
        bonusLevelInstruction.alpha -= deltaTime / 500.0;
        /* console.log(instructionRectDelay) */

    }
    else {
        instructionRectDelay -= deltaTime;
    }

    instructionPopup.setActive(questionPopup).setVisible(questionPopup);
}

function startGame() {

    var that = this;
    var tyan = null;
    boolInterval = null;
    moveSpeed = 15;

    this.cursor = this.input.keyboard.createCursorKeys();

    this.bg = this.add.sprite(width / 2, height / 2, 'background').setAlpha(1);

    this.couch = this.add.sprite(0, height * .51, 'couch').setOrigin(0, .48);

    this.santa = this.add.sprite(-width * .26, height * 1.1, 'Santa000').setOrigin(.5, 1.2);
    this.santa.depth = 95;

    this.ui = this.add.sprite(width / 2, height, 'ui').setOrigin(.5, 1);
    this.ui.depth = 100;
    surviveText.x = width * .77
    surviveText.y = this.ui.y - this.ui.displayHeight * .6

    this.life1 = this.add.sprite(width * .43, height * .9, 'sprite')
    this.life1.depth = 100;
    this.life2 = this.add.sprite(this.life1.x + this.life1.displayWidth * 1.2, height * .9, 'sprite')
    this.life2.depth = 100;
    this.life3 = this.add.sprite(this.life2.x + this.life2.displayWidth * 1.2, height * .9, 'sprite')
    this.life3.depth = 100;
    this.present1 = this.add.sprite(width * .89, height * .38, 'present1')

    this.present2 = this.add.sprite(width * .94, height * .36, 'present2')

    this.knife = this.add.sprite(width * .95, height * .43, 'knife')

    this.batrang = this.add.sprite(width * .89, height * .46, 'batrang')

    this.girl = this.add.sprite(width * 1.765, height * .07, 'Girl001').setOrigin(.5, 0)

    this.axe = this.add.sprite(width * .85, height * .47, 'axe')

    this.isaudioplayed = false;


    this.tweens.add({
        targets: this.santa,
        x: width * .26,
        ease: 'Power1',
        duration: 500,
        yoyo: false,
        repeat: 0
    });

    this.tweens.add({
        targets: this.girl,
        x: width * .765,
        ease: 'Power1',
        duration: 1000,
        yoyo: false,
        repeat: 0,
        onComplete: function () {
            this.girl.play('girlentrance').on('animationcomplete', function () {
                lady.setBody(this.girl.x, this.girl.y + this.girl.displayHeight * .5, this.girl.displayWidth * .05, this.girl.displayHeight * .25, this.girl);
                santa1.setBody(this.santa.x, this.santa.y - this.santa.displayHeight * .5, this.santa.displayWidth * .05, this.santa.displayHeight * .25, this.santa, this.cameras);
            }.bind(this));

        }.bind(this)
    });

    this.tweens.add({
        targets: this.bg,
        alpha: .5,
        ease: 'Power1',
        duration: 100,
        yoyo: true,
        repeat: 10,
        onComplete: function () {
            var dw = setTimeout(() => {
                clearTimeout(dw);
                boolgamestarted = true;
                /* questionToggle.depth = 100000; */
                if (!isPaused) {
                    this.girl.play('girlattack').on('animationcomplete', function () {
                        this.girl.setTexture('Girl001')
                    }.bind(this));
                    lady.throwAll(this.santa.x);
                }

                boolInterval = setInterval(function () {
                    /* if (blockinghimbool) { } else
                        if (isPaused) { } */
                    if (!boolgameended && !blockinghimbool && !isPaused) {
                        this.girl.play('girlattack').on('animationcomplete', function () {
                            this.girl.setTexture('Girl001')
                        }.bind(this));
                        lady.throwAll(this.santa.x);
                    }
                    /* console.log(((surviveSeconds >= 20) ? 5000 : ((surviveSeconds >= 10) ? 3000 : ((surviveSeconds >= 0) ? 1500 : 0))), " fetchAttackRangle()"); */
                }.bind(this), ((surviveSeconds >= 20) ? 5000 : ((surviveSeconds >= 10) ? 3000 : ((surviveSeconds >= 0) ? 1500 : 0))));
            }, 500);
        }.bind(this)
    });

    this.leftpress = false
    this.rightpress = false

    this.input.on('pointerdown', function (pointer) {
        if (!this.isaudioplayed && !boolgameended) {
            document.getElementById("finishher").muted = true;
            document.getElementById("finishher").play();
            /* document.getElementById("level_completed").volume = 0.0;
            document.getElementById("level_completed").play(); */
        }
        if (pointer.x < game.canvas.width * .55) {
            this.leftpress = true
            this.rightpress = false

        } else {
            this.rightpress = true
            this.leftpress = false

            if (noclam === null) {
                noclam = setTimeout(() => {
                    clearTimeout(noclam);
                    noclam = null
                    if (!isPaused) {
                        this.santa.play('santaattack').on('animationcomplete', function () {
                            this.santa.setTexture('Santa000')
                        }.bind(this));
                        clearTimeout(tyan)
                        tyan = null
                        santa1.isThrowing = true;
                        santa1.throw(this.santa.x + this.santa.displayWidth * .2, this.santa.y - (this.santa.displayHeight));
                        if (!lady.isBlocking) {
                            lady.isBlocking = true;
                            if (Math.random() < 0.5) {
                                lady.blockhim();
                                that.girl.setTexture('Girl006')
                            }
                        }
                        tyan = setTimeout(() => {
                            clearTimeout(tyan)
                            lady.isBlocking = false;
                            blockinghimbool = false;
                            /* console.log("STOP BLOACKING") */
                            that.girl.setTexture('Girl001')
                        }, 1000);
                    }
                }, 100);
            }

        }

    }, this);

    var that = this;

    document.body.onkeyup = function (e) {
        if (e.keyCode == 32) {
            /* console.log("SPACE") */
            if (noclam === null) {
                noclam = setTimeout(() => {
                    noclam = null
                    if (!isPaused) {
                        that.santa.play('santaattack').on('animationcomplete', function () {
                            that.santa.setTexture('Santa000')
                        }.bind(that));
                        /* santa1.throw(that.santa.x + that.santa.displayWidth * .2, that.santa.y - (that.santa.displayHeight)); */
                        clearTimeout(tyan)
                        tyan = null
                        santa1.isThrowing = true;
                        santa1.throw(that.santa.x + that.santa.displayWidth * .2, that.santa.y - (that.santa.displayHeight));
                        if (!lady.isBlocking) {
                            lady.isBlocking = true;
                            if (Math.random() < 0.5) {
                                lady.blockhim();
                                that.girl.setTexture('Girl006')
                            }
                        }
                        tyan = setTimeout(() => {
                            clearTimeout(tyan)
                            lady.isBlocking = false;
                            blockinghimbool = false;
                            /* console.log("STOP BLOACKING") */
                            that.girl.setTexture('Girl001')
                        }, 1000);
                    }
                }, 100);
            }
        }
        if (e.keyCode == 39) {
            that.santa.x -= 1;
        }

        if (e.keyCode == 40) {
            that.santa.x += 1;
        }
    }

    this.santa
        .setInteractive({ draggable: true, cursor: 'pointer' })
        .on('dragstart', function (pointer, dragX, dragY) {

        }, this)
        .on('drag', function (pointer, dragX, dragY) {
            /* console.log("DRAGGGGGGGGGGGGG", dragX, isPaused) */
            if ((dragX < game.canvas.width * .55) && (dragX > game.canvas.width * .25) && !isPaused)//(this.front.x > this.front.displayWidth * .8) (this.front.x < (this._canvaswidth - this.front.displayWidth * .8)))
            {
                this.santa.setPosition(dragX, this.santa.y);
            }/* this.santa.setPosition(dragX, this.santa.y); */
        }, this)
        .on('dragend', function (pointer, dragX, dragY, dropped) {

        }, this);


}

function fetchAttackRangle() {
    /* console.log(surviveSeconds, "surviveSeconds") */
    return 7000;
    /* if
    return */
}

function normalize(val, max, min) { return (val - min) / (max - min); }

function updateUI() {
    surviveText.text = ((surviveSeconds === 31) ? 30 : surviveSeconds.toString());
    surviveText.updateText();
}

function update() {
    var deltaTime = getDelta();
    /* if (this.leftpress) {
        if (this.input.activePointer.x < game.canvas.width / 2) { */
    /* this.santa.x =  *//* fnDragSanta(this.input.activePointer.x,this.santa) */
    /* }
} */
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

    if (lady && santa1) {
        lady.update(deltaTime, truckOffset);

        lady.collide(santa1.throwObjects);

        /* game.physics.add.collider(this.body, santa1.throwObjects, this.onCollision1, null, this); */

        santa1.update(deltaTime, truckOffset);
        if (this.santa) {
            santa1.setPos(this.santa.x, this.santa.y - this.santa.displayHeight * .35);
        }
        santa1.collide(lady.throwObjects);

        /* if (this.girl) { lady.setPos(this.girl.x, this.girl.y + this.girl.displayHeight *.7) }
        if (this.santa) { santa1.setPos(this.santa.x, this.santa.y - this.santa.displayHeight *.35) } */
        //game.physics.add.collider(this.santa, lady.throwObjects, this.onCollision2, null, this);
        /* this.physics.add.collider(this.santa.body, lady.throwObjects, this.onCollision2, null, this); */
    }

    if (spirit === 1) {
        this["life1"].setTintFill(0xffffff);
        this["life2"].setTintFill(0xffffff);
    }
    else if (spirit === 2) {
        this["life1"].setTintFill(0xffffff);
    }
    else if (spirit === 0) {

        this["life1"].setTintFill(0xffffff);
        this["life2"].setTintFill(0xffffff);
        this["life3"].setTintFill(0xffffff);
        clearInterval(boolInterval);

        bgkill.depth = 100000;
        /* bgkill.alpha += deltaTime / 1000.0; */

        this.tweens.add({
            targets: bgkill,
            alpha: 1,
            ease: 'Power1',
            duration: 1000,
            yoyo: false,
            repeat: 0
        });

        if (!bgkill.bool) {
            clearInterval(boolInterval);
            BGM.stop();
            bgkill.bool = true;
            var scream = this.sound.add('Gameover');
            scream.play();
            bgkill.play('hahasequence').on('animationcomplete', function () {
                boolgameended = true;
                gameover.boolgameOver = true;
            });
        }
    }

    if (boolgamestarted) {


        if (this.cursor) {
            if (this.cursor.left.isDown && (this.santa.x > game.canvas.width * .25)) {
                this.santa.x -= moveSpeed;
            } else if (this.cursor.right.isDown && (this.santa.x < game.canvas.width * .55)) {
                this.santa.x += moveSpeed;
            }
        }


        gameTime += deltaTime;
        surviveSeconds = Math.floor(surviveSecondsForReal - (gameTime / 1000.0));
        if (surviveSeconds <= 0) {
            surviveSeconds = 0;
            bgkill.depth = 100000;
            bgkill.alpha += deltaTime / 1000.0;
            if (!bgkill.bool) {
                clearInterval(boolInterval);
                BGM.stop();
                document.getElementById("finishher").muted = false;
                document.getElementById("finishher").currentTime = 0;
                document.getElementById("finishher").play();
                /* var finishher = this.sound.add('finishher');
                finishher.play(); */
                setTimeout(() => {
                    bgkill.bool = true;
                    bgkill.play('finishsequence').on('animationcomplete', function () {
                        bgkill.play('killsequence').on('animationcomplete', function () {
                            /* console.log("COMPLETE") */
                            boolgameended = true;
                        });
                    });
                }, 350);


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

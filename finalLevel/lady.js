class Lady {
    constructor(scene) {
        this.scene = scene;
        this.scale = 0.002 * scaleFactor;

        this.scale2 = 0.0005 * scaleFactor;
        this.basePosition = new Phaser.Math.Vector2(0.72 * width, 0.2 * height);

        this.body = scene.physics.add.sprite(-500, -500, 'QuestionBtn').setOrigin(.5, 1).setImmovable(true).setVisible(false);

        this.throwObjects = scene.physics.add.group({
            key: ['knife2', 'axe'],
            frameQuantity: 20,
            randomKey: true,
            active: false,
            visible: false,
            enable: false,
            scaleX: this.scale,
            scaleY: this.scale,
            allowGravity: false
        });
        this.blocked = scene.add.sprite(width / 2 + 600, 250, 'blocked');
        this.blocked.depth = 100001;
        this.blocked.alpha = 0;
        this.blocked.scaleX = this.blocked.scaleY = this.scale2;
        /* this.blockObjects = scene.physics.add.group({
            key: ['blocked', 'blocked', 'blocked'],
            frameQuantity: 200,
            randomKey: true,
            active: false,
            visible: false,
            enable: false,
            scaleX: this.scale2,
            scaleY: this.scale2,
            allowGravity: false
        }); */

        this.isBlocking = false;
        this.startDownX = -1;
        this.startDownY = -1;
        this.endDownX = -1;
        this.endDownY = -1;

        this.throwTime = -1;
        this.throwDelay = 400;

        this.player2 = null;

    }

    setBody(x, y, width, height, spr) {
        this.player2 = spr;
        this.body.x = x;
        this.body.y = y;
        this.body.displayWidth = width;
        this.body.displayHeight = height;
        this.body.alpha = 1;
        this.body.depth = 1000000000000000;

    }


    throwAll(sprX) {
        if (!isPaused)
            this.throw(100, 100, sprX);
        var tr1 = setTimeout(() => {
            clearTimeout(tr1);
            if (!isPaused) this.throw(100, 100, sprX);
            var tr2 = setTimeout(() => {
                clearTimeout(tr2);
                if (!isPaused) this.throw(100, 100, sprX);
                var tr3 = setTimeout(() => {
                    clearTimeout(tr3);
                    if (!isPaused) this.throw(100, 100, sprX);

                }, 500);
            }, 500);
        }, 500);

    }

    throw(vx, vy, sprX) {
        /* console.log(sprX, " sprXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX") */
        var throwObject = this.throwObjects.get();

        if (!throwObject) return;

        if (blockinghimbool) return;

        throwObject.scaleX = throwObject.scaleY = this.scale;
        throwObject.depth = 99;
        throwObject.angle = -35;
        throwObject.iscollide = false;
        throwObject.enableBody(true, this.basePosition.x, this.basePosition.y /* + Phaser.Math.RND.between(-100, 200) */, true, true);

        throwObject.setAccelerationX((-1 * (2000 - sprX)) * 1.5);
        throwObject.setAccelerationY(1000 * 1.5);
        throwObject.setAngularVelocity(Phaser.Math.RND.between(-90, 90));

        stuff--;
    }

    blockhim() {
        blockinghimbool = true;
    }

    setPos(x, y) {
        this.body.x = x;
        this.body.y = y;
    }

    collide(object) {
        this.scene.physics.add.collider(this.body, object, this.onCollision2, null, this);
    }

    onCollision2(obj1, obj2) {
        if (!isPaused) {
            if (!obj2.iscollide) {
                obj2.iscollide = true;
                /* console.log("COLLISION LADY"); */
                if (!blockinghimbool) {
                    this.player2.setTintFill(0xffffff);
                    var tr = setTimeout(() => {
                        clearTimeout(tr);
                        this.player2.clearTint();
                    }, 100);
                } else {
                    if (!isPaused)
                        this.blockk(100, 100);
                }
            }
        }
        /* this.collisionEffect(0.04, 0.015); */
    }


    blockk(vx, vy) {
        this.blocked.alpha = 1
        this.blocked.x = this.getRandomInt(1300,1650)
        this.blocked.y = this.getRandomInt(200,400)

    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    block2k(vx, vy) {
        console.log("block")
        var blockObject = this.blockObjects.get();

        if (!blockObject) return;
        console.log("blockavailable")
        /*  if (blockinghimbool) return; */
        blockObject.alpha = 1;
        blockObject.x = 1500/* (Math.random()<.5)?1300:1700; */
        blockObject.y = 300/* (Math.random()<.5)?200:400; */
        blockObject.scaleX = blockObject.scaleY = this.scale2;
        blockObject.depth = 99;
        blockObject.visible = true;
        /* setTimeout(() => {
            blockObject.visible = false;
        }, 300); */
        /* this.scene.tweens.add({
            targets: blockObject,
            alpha: 0,
            y: blockObject.y - 100,
            ease: 'Power1',
            duration: 250,
            yoyo: false,
            repeat: 0
        }); */
    }

    collisionEffect(shakeIntensity, scaleIntensity) {

        score += 10;
    }



    update(deltaTime, offset) {
        if (this.blocked.alpha === 1 && !blockinghimbool) {
            this.blocked.alpha = 0
        } else {
            if (blockinghimbool) {  } else { this.blocked.alpha = 0 }
        }

        if (!blockinghimbool) {
            for (let i = 0; i < this.throwObjects.getLength(); i++) {
                if (this.throwObjects.getChildren()[i].active) {
                    if (this.throwObjects.getChildren()[i].x < -500 || this.throwObjects.getChildren()[i].y < -500) {
                        this.throwObjects.killAndHide(this.throwObjects.getChildren()[i]);
                    } this.throwObjects.getChildren()[i].scaleX = this.throwObjects.getChildren()[i].scaleY = lerp2(this.throwObjects.getChildren()[i].scaleX, this.scale, 0.0005 * deltaTime);
                } else {

                }

            }
        }
    }
}
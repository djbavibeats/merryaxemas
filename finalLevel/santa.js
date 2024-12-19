class Santa {
    constructor(scene) {
        this.scene = scene;
        this.scale = 0.0025 * scaleFactor;
        this.basePosition = new Phaser.Math.Vector2(0.72 * width, 0.2 * height);

        this.body2 = scene.physics.add.sprite(-500, -500, 'QuestionBtn').setOrigin(.5, 1).setImmovable(true).setVisible(false);
        /* this.body.scaleX = this.body.scaleY = (this.scale*3);
        this.body.alpha = 1;
        this.body.depth = 1000000000000000; */
        this.isThrowing = false;
        this.throwObjects = scene.physics.add.group({
            key: 'axe2',
            frameQuantity: 20,
            randomKey: true,
            active: false,
            visible: false,
            enable: false,
            scaleX: this.scale,
            scaleY: this.scale,
            allowGravity: false,
            bounceX: 1,
            bounceY: 1,
        });

        this.startDownX = -1;
        this.startDownY = -1;
        this.endDownX = -1;
        this.endDownY = -1;

        this.throwTime = -1;
        this.throwDelay = 400;

        this.shakeOffset = new Phaser.Math.Vector2(0, 0);
        this.effectLerpBack = 0.01;
        this.damageScale = 0.0;

        this.player = null;
        this.cam = null;
    }

    setPos(x, y) {
        this.body2.body.x = x;
        /* this.body2.body.y = y; */
    }



    setBody(x, y, width, height, spr, cam) {
        this.player = spr;
        this.body2.x = x;
        this.body2.y = y;
        this.body2.displayWidth = width;
        this.body2.displayHeight = height;
        this.body2.alpha = 1;
        this.body2.depth = 1000000000000000;
        this.cam = cam;
    }

    throw(vx, vy) {
        /* console.log("throw") */
        var throwObject = this.throwObjects.get();

        if (!throwObject) return;

        throwObject.scaleX = throwObject.scaleY = this.scale;
        throwObject.depth = 100;
        throwObject.angle = -35;
        throwObject.iscollide = false;
        throwObject.enableBody(true, vx, vy, true, true);
        throwObject.setSize(throwObject.width * .25, throwObject.width * .25, true);
        throwObject.setAccelerationX(1000 * 2.6);
        throwObject.setAccelerationY(-1000 * 1);
        throwObject.setAngularVelocity(Phaser.Math.RND.between(0, 180));
        throwObject.depth = 99;
        stuff--;
    }

    collide(object, spr) {
        this.scene.physics.add.collider(this.body2, object, this.onCollision, null, this);
    }

    onCollision(obj1, obj2) {
        if (!obj2.iscollide) {
            obj2.iscollide = true;
            if (!blockinghimbool) {
                this.player.setTintFill(0xffffff);

                spirit -= .5;
                /* console.log(spirit, " >>> spirit"); */
                if (spirit > -1) { this.scene.cameras.main.shake(60); }
                var d = setTimeout(() => {
                    clearTimeout(d);
                    this.player.clearTint();
                }, 100);
            }
            /* console.log("COLLISION SANTA"); */
        }

        /* this.body2.x = x;
        this.body2.y = y; */
        /* if (this.wrecked.alpha == 0) {
            this.hp--;
            if (this.hp <= 0) {
                this.body.alpha = 0;
                this.wrecked.alpha = 1;
                score += 100;
            }
            this.collisionEffect(0.04, 0.015);
            obj2.setVelocity(-800, -800);
            obj2.setAngularVelocity(Phaser.Math.RND.between(-360, 360));
            obj2.scaleX = obj2.scaleY = 0.00075 * scaleFactor;
            this.attackReset();
        } */
        this.collisionEffect(0.04, 0.015);
    }

    collisionEffect(shakeIntensity, scaleIntensity) {
       
        score += 10;
    }

    update(deltaTime, offset) {

        for (let i = 0; i < this.throwObjects.getLength(); i++) {
            if (this.throwObjects.getChildren()[i].active) {

                if (this.throwObjects.getChildren()[i].x < -500 || this.throwObjects.getChildren()[i].y < -500) {
                    if (!blockinghimbool) this.throwObjects.getChildren()[i].setVisible(false);
                    setTimeout(() => {
                        this.throwObjects.killAndHide(this.throwObjects.getChildren()[i]);
                    }, 400);
                }

                this.throwObjects.getChildren()[i].scaleX = this.throwObjects.getChildren()[i].scaleY = lerp3(this.throwObjects.getChildren()[i].scaleX, this.scale, 0.0007 * deltaTime);
            }
        }
    }
}
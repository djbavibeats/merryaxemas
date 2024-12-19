
class PoliceGroup
{
    constructor(scene)
    {
        this.scene = scene;
        this.array = [];
        this.spawnLimit = 4;
        this.ySpot = [0.6 * height, 0.7 * height, 0.8 * height, 0.9 * height];
        this.ySpotOccupied = [false, false, false, false];
        this.minSpawnDelay = 3000;
        this.maxSpawnDelay = 12000;
        this.spawnDelay = 0;
        this.policeTextGroup = [
            this.scene.add.text(width/2, 20, 'POLICE 1: ▌▌▌▌▌', { fontFamily: "kong", fontSize: 0.054 * scaleFactor }),
            this.scene.add.text(width/2, 60, 'POLICE 2: ▌▌▌▌▌', { fontFamily: "kong", fontSize: 0.054 * scaleFactor }),
            this.scene.add.text(width/2, 100, 'POLICE 3: ▌▌▌▌▌', { fontFamily: "kong", fontSize: 0.054 * scaleFactor }),
            this.scene.add.text(width/2, 140, 'POLICE 4: ▌▌▌▌▌', { fontFamily: "kong", fontSize: 0.054 * scaleFactor })
        ];
        for(let i = 0; i < this.policeTextGroup.length; i++)
            this.policeTextGroup[i].depth = 1;
    }

    getUnoccupiedY()
    {
        for(let i = 0; i < this.ySpotOccupied.length; i++)
        {
            if(!this.ySpotOccupied[i])
            {
                this.ySpotOccupied[i] = true;
                return this.ySpot[i];
            }
        }
        return -9999;
    }

    removeYSpot(y)
    {
        for(let i = 0; i < this.ySpot.length; i++)
        {
            if(this.ySpot[i] - 0.01 < y && this.ySpot[i] + 0.01 > y)
                this.ySpotOccupied[i] = false;
        }
    }

    update(deltaTime)
    {
        if(this.spawnDelay <= 0)
        {
            if(this.array.length < this.spawnLimit)
            {
                this.array.push(
                    new Police(
                        this.scene,
                        Phaser.Math.RND.between(1, 3) * (width / 10),
                        this.getUnoccupiedY()
                    )
                );
                this.spawnDelay = Phaser.Math.RND.between(this.minSpawnDelay, this.maxSpawnDelay);
            }
            else
            {
                this.spawnDelay = 1;
            }
        }
        else
        {
            this.spawnDelay -= deltaTime;
        }

        for(let i = 0; i < this.array.length; i++)
        {
            if(this.array[i].update(deltaTime))
            {
                this.removeYSpot(this.array[i].basePosition.y);
                this.array.splice(i, 1);
                break;
            }
        }

        for(let i = 0; i < this.policeTextGroup.length; i++)
        {
            if(this.ySpotOccupied[i] && typeof this.array[i] != "undefined") this.policeTextGroup[i].text = "POLICE " + (i + 1).toString() + ": " + numChar(this.array[i].hp, "▌");
            else this.policeTextGroup[i].text = "";
            this.policeTextGroup[i].updateText();
        }
    }

    collide(object)
    {
        for(let i = 0; i < this.array.length; i++)
            this.array[i].collide(object);
    }
}

class Police
{
    constructor(scene, x, y)
    {
        this.scene = scene;
        this.baseScale = 0.0005 * scaleFactor;
        this.basePosition = new Phaser.Math.Vector2(x, y);

        this.body = scene.physics.add.sprite(this.basePosition.x, this.basePosition.y, 'Police');
        this.body.depth = this.basePosition.y;
        this.redLight = scene.add.sprite(this.basePosition.x, this.basePosition.y, 'RedLight');
        this.redLight.depth = this.basePosition.y * 2;
        this.blueLight = scene.add.sprite(this.basePosition.x, this.basePosition.y, 'BlueLight');
        this.blueLight.depth = this.basePosition.y * 2;
        this.flash = scene.physics.add.sprite(this.basePosition.x, this.basePosition.y, 'PoliceFlash');
        this.flash.alpha = 0;
        this.flash.depth = this.basePosition.y;
        this.wrecked = scene.add.sprite(this.basePosition.x, this.basePosition.y, 'PoliceWrecked');
        this.wrecked.alpha = 0;
        this.wrecked.depth = this.basePosition.y;

        this.body.scaleX = this.body.scaleY =
            this.redLight.scaleX = this.redLight.scaleY =
            this.blueLight.scaleX = this.blueLight.scaleY =
            this.wrecked.scaleX = this.wrecked.scaleY =
            this.flash.scaleX = this.flash.scaleY = this.baseScale;

        this.lightTimeOffset = Phaser.Math.RND.between(-250, 250);

        this.baseOffset = new Phaser.Math.Vector2(0, 0);
        this.baseOffsetXTime = Phaser.Math.RND.between(2000, 5000);
        this.baseOffsetMaxX = Phaser.Math.RND.between(50, 400);
        this.baseOffsetYTime = Phaser.Math.RND.between(15, 30);

        this.wreckedOffset = 0;
        this.wreckedVelocity = 0;
        this.wreckedAcceleration = -0.0005;

        this.spawnOffset = -this.body.width;
        this.spawnLerp = 0.0005;

        this.hp = 6;

        this.shakeOffset = new Phaser.Math.Vector2(0, 0);
        this.effectLerpBack = 0.01;
        this.damageScale = 0.0;

        this.attackOffset = 0;
        this.attackIndicatorDelay = 2500;
        this.attackIndicatorTimer = this.attackIndicatorDelay;
        this.attackLerp = 0.004;
        this.attackDelay = Phaser.Math.RND.between(8000, 16000);
    }

    update(deltaTime)
    {
        this.baseOffset.x = Math.sin(gameTime/this.baseOffsetXTime) * this.baseOffsetMaxX;
        this.baseOffset.y = Math.sin(gameTime/this.baseOffsetYTime) * 2;

        this.body.x = this.wrecked.x = this.flash.x = this.redLight.x = this.blueLight.x = this.spawnOffset + this.basePosition.x + this.baseOffset.x + this.wreckedOffset + this.shakeOffset.x + this.attackOffset;
        this.body.y = this.wrecked.y = this.flash.y = this.redLight.y = this.blueLight.y = this.basePosition.y + this.baseOffset.y + this.shakeOffset.y;
        this.redLight.y -= 0.085 * height;
        this.blueLight.y -= 0.085 * height;

        var lightSwitcheroo = (gameTime + this.lightTimeOffset) % 200 < 100;
        this.redLight.alpha = lightSwitcheroo ? 1 : 0;
        this.blueLight.alpha = lightSwitcheroo ? 0 : 1;

        this.body.scaleX = this.body.scaleY =
            this.redLight.scaleX = this.redLight.scaleY =
            this.blueLight.scaleX = this.blueLight.scaleY =
            this.wrecked.scaleX = this.wrecked.scaleY =
            this.baseScale + this.damageScale;

        this.shakeOffset.x = lerp(this.shakeOffset.x, 0, this.effectLerpBack * deltaTime);
        this.shakeOffset.y = lerp(this.shakeOffset.y, 0, this.effectLerpBack * deltaTime);
        this.damageScale = lerp(this.damageScale, 0, this.effectLerpBack * deltaTime);

        if(this.wrecked.alpha >= 1)
        {
            this.wreckedVelocity += this.wreckedAcceleration * deltaTime;
            this.wreckedOffset += this.wreckedVelocity * deltaTime;

            return this.body.x < -this.body.width;
        }
        else if(this.spawnOffset < 0)
        {
            this.spawnOffset = lerp(this.spawnOffset, -10, this.spawnLerp * deltaTime);
        }

        this.attackUpdate(deltaTime);

        return false;
    }

    attackReset()
    {
        if(this.attackDelay <= 0)
        {
            this.attackIndicatorTimer = this.attackIndicatorDelay;
            this.attackDelay = Phaser.Math.RND.between(8000, 16000);
            this.body.alpha = 1;
            this.flash.alpha = 0;
        }
    }

    attackUpdate(deltaTime)
    {
        if(this.attackDelay <= 0 && this.wrecked.alpha == 0)
        {
            if(this.attackIndicatorTimer <= 0)
            {
                if(this.body.x < 0.7 * width)
                {
                    this.attackOffset = lerp(this.attackOffset, width, this.attackLerp * deltaTime);
                    this.body.alpha = 0;
                    this.flash.alpha = 1;
                }
                else
                {
                    this.attackReset();
                    spirit--;
                    this.scene.cameras.main.shake(60);
                }
            }
            else
            {
                if(gameTime % 250 <= 125)
                {
                    this.body.alpha = 0;
                    this.flash.alpha = 1;
                }
                else
                {
                    this.body.alpha = 1;
                    this.flash.alpha = 0;
                }
                this.attackIndicatorTimer -= deltaTime;
            }
        }
        else
        {
            this.attackDelay -= deltaTime;
            this.attackOffset = lerp(this.attackOffset, 0, this.effectLerpBack);
        }
    }

    collide(object)
    {
        this.scene.physics.add.collider(this.body, object, this.onCollision, null, this);
    }

    onCollision(obj1, obj2)
    {
        if(this.wrecked.alpha == 0)
        {
            this.hp--;
            if(this.hp <= 0)
            {
                this.body.alpha = 0;
                this.wrecked.alpha = 1;
                score += 100;
            }
            this.collisionEffect(0.04, 0.015);
            obj2.setVelocity(-800, -800);
            obj2.setAngularVelocity(Phaser.Math.RND.between(-360, 360));
            obj2.scaleX = obj2.scaleY = 0.00075 * scaleFactor;
            this.attackReset();
        }
    }

    collisionEffect(shakeIntensity, scaleIntensity)
    {
        this.shakeOffset.x = Phaser.Math.RND.between(-shakeIntensity * scaleFactor, shakeIntensity * scaleFactor);
        this.shakeOffset.y = Phaser.Math.RND.between(-shakeIntensity * scaleFactor, shakeIntensity * scaleFactor);
        this.damageScale = scaleIntensity;
        score += 10;
    }
};
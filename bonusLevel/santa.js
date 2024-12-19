class Santa
{
    constructor(scene)
    {
        this.scene = scene;
        this.scale = 0.0005 * scaleFactor;
        this.basePosition = new Phaser.Math.Vector2(0.825 * width, 0.55 * height);
        this.body = scene.add.sprite(this.basePosition.x, this.basePosition.y, 'Santa 1');
        this.body.scaleX = this.body.scaleY = this.scale;
        this.body.alpha = 1;
        this.body2 = scene.add.sprite(this.basePosition.x, this.basePosition.y, 'Santa 2');
        this.body2.scaleX = this.body2.scaleY = this.scale
        this.body2.alpha = 0;

        this.throwObjects = scene.physics.add.group({
            key: ['Bag 1', 'Bag 2', 'Bag 3'],
            frameQuantity : 20,
            randomKey: true,
            active: false,
            visible: false,
            enable: false,
            scaleX: this.scale,
            scaleY: this.scale,
            angularDrag: 5,
            angularVelocity: 60,
            bounceX: 1,
            bounceY: 1,
        });

        this.startDownX = -1;
        this.startDownY = -1;
        this.endDownX = -1;
        this.endDownY = -1;

        this.throwTime = -1;
        this.throwDelay = 400;
    }

    throw(offset, vx, vy)
    {
        var throwObject = this.throwObjects.get();

        if (!throwObject) return;

        throwObject.scaleX = throwObject.scaleY = this.scale;
        throwObject.enableBody(true, this.basePosition.x + offset.x, this.basePosition.y + offset.y, true, true);
        throwObject.setVelocity(vx + Phaser.Math.RND.between(-200, 200), vy + Phaser.Math.RND.between(-200, 200));
        throwObject.setAccelerationY(1500);
        throwObject.setAngularVelocity(Phaser.Math.RND.between(-90, 90));
        throwObject.setAngularDrag(45);

        stuff--;
    }

    event(offset)
    {
        if(this.scene.input.activePointer.isDown)
        {
            this.endDownX = this.startDownX;
            this.endDownY = this.startDownY;
            this.startDownX = this.scene.input.activePointer.x;
            this.startDownY = this.scene.input.activePointer.y;
            this.throwTime = gameTime;

            //fullscreen when pointer is down
            if(this.scene.scale.isFullscreen) this.scene.scale.startFullscreen();
        }
        else if(this.startDownX != -1 && this.startDownY != -1 && this.endDownX != -1 && this.endDownY != -1)
        {
            var force = new Phaser.Math.Vector2(this.startDownX - this.endDownX, this.startDownY - this.endDownY);
            force.normalize();
            if(Math.abs(force.x) + Math.abs(force.y) > 0.01)
            {
                if(stuff > 0)
                {
                    this.throw(offset, force.x * 1200, force.y * 1200);
                }
                this.startDownX = this.startDownY = this.endDownX = this.endDownY = -1;
                this.throwTime = gameTime + this.throwDelay;
            }
        }
    }

    update(deltaTime, offset)
    {
        if(gameTime < this.throwTime)
        {
            this.body2.alpha = 1;
            this.body.alpha = 0;
        }
        else 
        {
            this.body2.alpha = 0;
            this.body.alpha = 1;
        }
        this.body.x = this.body2.x = this.basePosition.x + offset.x;
        this.body.y = this.body2.y = this.basePosition.y + offset.y;

        for(let i = 0; i < this.throwObjects.getLength(); i++)
        {
            if(this.throwObjects.getChildren()[i].active)
            {
                if(this.throwObjects.getChildren()[i].x < -500 || this.throwObjects.getChildren()[i].y < -500)
                {
                    this.throwObjects.killAndHide(this.throwObjects.getChildren()[i]);
                }
                this.throwObjects.getChildren()[i].scaleX = this.throwObjects.getChildren()[i].scaleY = lerp(this.throwObjects.getChildren()[i].scaleX, this.scale, 0.005 * deltaTime);
            }
        }
    }
}
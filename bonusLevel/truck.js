
class Truck
{
    constructor(scene)
    {
        this.scale = 0.00075 * scaleFactor;
        this.basePosition = new Phaser.Math.Vector2(1.1 * width, 0.6 * height);
        this.body = scene.physics.add.sprite(this.basePosition.x, this.basePosition.y, 'Truck');
        this.body.scaleX = this.body.scaleY = this.scale;
        this.body.depth = this.basePosition.y;

        this.shakeOffset = new Phaser.Math.Vector2(0, 0);
        this.effectLerpBack = 0.01;
        this.damageScale = 0.0;

        this.prevSpirit = spirit;
    }

    update(deltaTime, offset)
    {
        this.body.x = this.basePosition.x + offset.x + this.shakeOffset.x;
        this.body.y = this.basePosition.y + offset.y + this.shakeOffset.y;
        this.body.scaleX = this.body.scaleY = this.scale + this.damageScale;

        this.shakeOffset.x = lerp(this.shakeOffset.x, 0, this.effectLerpBack * deltaTime);
        this.shakeOffset.y = lerp(this.shakeOffset.y, 0, this.effectLerpBack * deltaTime);
        this.damageScale = lerp(this.damageScale, 0, this.effectLerpBack * deltaTime);

        if(spirit < this.prevSpirit)
        {
            this.damageEffect(0.1, 0.1);
            this.prevSpirit = spirit;
        }
    }

    damageEffect(shakeIntensity, scaleIntensity)
    {
        this.shakeOffset.x = Phaser.Math.RND.between(-shakeIntensity * scaleFactor, shakeIntensity * scaleFactor);
        this.shakeOffset.y = Phaser.Math.RND.between(-shakeIntensity * scaleFactor, shakeIntensity * scaleFactor);
        this.damageScale = scaleIntensity;
    }
};
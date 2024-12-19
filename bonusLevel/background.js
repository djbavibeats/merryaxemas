
class Background
{
    constructor(scene, speed)
    {
        this.scale = 0.0015 * scaleFactor;
        this.obj = scene.add.sprite(0, height / 3.0, 'Building Background');
        this.obj.scaleX = this.obj.scaleY = this.scale;
        this.obj2 = scene.add.sprite(7418 * this.scale, height / 3.0, 'Building Background');
        this.obj2.scaleX = this.obj2.scaleY = this.scale;
        this.speed = speed;
    }

    update(deltaTime)
    {
        this.obj.x -= this.speed * deltaTime;
        this.obj2.x -= this.speed * deltaTime;
        if(this.obj.x < -7418 * this.scale)
        {
            this.obj.x = 0;
            this.obj2.x = 7418 * this.scale;
            return true;
        }
        return false;
    }
};

class Gameover {
    constructor(scene) {

        /* console.log("Gameover"); */
        this.scene = scene;
        this.bg = scene.add.sprite(width / 2, height / 2, 'LvlFail');
        this.bg.depth = 100000;
        this.bg.alpha = 0;

        this.UIAdded = false;
        this.boolgameOver = false;
    }

    update(deltaTime) {
        /* console.log("deltaTime : ", deltaTime) */
        /* console.log("GAME OVRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR1",deltaTime) */
        if (lifenum <= 0 && this.boolgameOver) {
            /* console.log("GAME OVRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR",deltaTime) */
            isPaused = true;
            
            this.bg.alpha += deltaTime / 1000.0;
        }
        /* console.log(this.boolgameOver , " GAMEOVR") */
        /* console.log(this.bg.alpha <= 0 && !this.UIAdded) */
        if (this.bg.alpha >= .95 && !this.UIAdded) {
            /* console.log("UPDATE OVER") */
            
            var gameoverReason = this.scene.add.text(0, height * 0.8, 'You ran out of X-Mas Spirit!', { fontFamily: "kong", fontSize: 0.054 * scaleFactor, color: "#ffff00" });
            var textWidth = gameoverReason.width;
            gameoverReason.x = (width / 2) - (textWidth / 2);
            gameoverReason.depth = 100001;
            gameoverReason.updateText();
            document.querySelector("#game2").style.touchAction = "none";
            document.querySelector("#game2").style.pointerEvents = "none";
            
            var restartBtn = this.scene.add.sprite(0.5 * width, 0.9 * height, 'ReplayBtn').setInteractive();
            restartBtn.depth = 100001;
            restartBtn.on('pointerdown', function (pointer) {
                /* let newURL = window.location.href.replace(/\/$/, "");
                window.location.href = newURL; */
                document.querySelector("#game2").style.touchAction = "auto";
                document.querySelector("#game2").style.pointerEvents = "all";
                window.location.reload();
            });

            this.UIAdded = true;
        }
    }
};
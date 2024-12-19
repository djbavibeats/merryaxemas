
class Gameover {
    constructor(scene) {


        this.scene = scene;
        this.bg = scene.add.sprite(width / 2, height / 2, 'LvlFail');
        this.bg.depth = 100000;
        this.bg.alpha = 0;



        this.UIAdded = false;
        this.boolgameOver = false;
    }

    update(deltaTime) {
        if (spirit <= 0 && this.boolgameOver) {
            isPaused = true;
            this.bg.alpha += deltaTime / 1000.0;
        }

        if (this.bg.alpha >= 0.95 && !this.UIAdded) {
            

            var gameoverReason = this.scene.add.text(0, height * 0.8, 'You ran out of X-Mas Spirit!', { fontFamily: "kong", fontSize: 0.054 * scaleFactor, color: "#ffff00" });
            var textWidth = gameoverReason.width;
            gameoverReason.x = (width / 2) - (textWidth / 2);
            gameoverReason.depth = 100001;
            gameoverReason.updateText();

            /* var promotetext = this.scene.add.text(0, height * 0.15, 'Follow us on Tik Tok! Click HERE!!', { fontFamily: "kong", fontSize: 0.054 * scaleFactor, color: "#0000ff" }).setInteractive({ cursor: "pointer" })
            .on("pointerdown", function (pointer) {
                window.location.href = "https://link.iceninekills.com/INKTikTok";
            });
            var textWidth = promotetext.width;
            promotetext.x = (width / 2) - (textWidth / 2);
            promotetext.depth = 100001;

            var promotetext2 = this.scene.add.text(0, height * 0.15, 'Follow us on Tik Tok! Click HERE!!', { fontFamily: "kong", fontSize: 0.054 * scaleFactor, color: "#ffff00" }).setInteractive({ cursor: "pointer" })
            .on("pointerdown", function (pointer) {
                window.location.href = "https://link.iceninekills.com/INKTikTok";
            });
            var textWidth2 = promotetext2.width;
            promotetext2.x = (width / 2) - (textWidth2 / 2);
            promotetext2.depth = 100001;

            var ct = 0;
            setInterval(() => {
                if ((ct % 2) === 0) {
                    promotetext.x = (width / 2) - (promotetext.width / 2)
                    promotetext2.x = width * 2;
                } else {
                    promotetext2.x = (width / 2) - (promotetext2.width / 2)
                    promotetext.x = width * 2;
                }
                ct++;
            }, 400); */

            var restartBtn = this.scene.add.sprite(0.5 * width, 0.9 * height, 'ReplayBtn').setInteractive();
            restartBtn.depth = 100001;
            restartBtn.on('pointerdown', function (pointer) {
                let newURL = window.location.href.replace(/\/$/, "");
                window.location.href = newURL;
            });

            this.UIAdded = true;
        }
    }
};
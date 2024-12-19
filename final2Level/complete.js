
class Complete {
    constructor(scene) {
        this.scene = scene;

        this.scale = 0.007 * scaleFactor;

        this.bg = scene.add.sprite(width / 2, height / 2, 'LvlComplete');
        this.bg.depth = 100000;
        this.bg.alpha = 0;
        /* this.popup = scene.add.sprite(width / 2 + 600, 250, 'CompletePopup').setInteractive();
        this.popup.depth = 100001;
        this.popup.alpha = 0; */
        this.UIAdded = false;

        /*  this.popup.on('pointerdown', function () {
             let newURL = "https://found.ee/merryaxemas";
             window.location.href = newURL;
         }); */
    }

    update(deltaTime, winTime, bool) {
        /* console.log(winTime, bool, "::::::::::::::::::::::::::::::::::::::::::::::::::") */
        if (winTime <= 0 && bool) {
            isPaused = true;
            this.bg.alpha += deltaTime / 1000.0;
            /* this.tweens.add({
                targets: this.bg,
                alpha: 1,
                ease: 'Power1',
                duration: 500,
                yoyo: false,
                repeat: 0
            }); */
        }

        if (this.bg.alpha >= 0.95 && !this.UIAdded) {
            /* console.log("UIADDED") */
            var winText = this.scene.add.text(0, height * 0.2, 'Congratulations, you Psycho…\n\n You barely survived Axe-Mas!', { align: "center", fontFamily: "kong", fontSize: 0.045 * scaleFactor, color: "#ffff00" });
            var textWidth = winText.width;
            winText.x = (width / 2) - (textWidth / 2);
            winText.depth = 100001;
            winText.updateText();

            document.querySelector("#game2").style.touchAction = "none";
            document.querySelector("#game2").style.pointerEvents = "none";

            var emoji = "🎅🪓";
            var emoji2 = "🪓🎅";
            /*  */

            var promotetextff = this.scene.add.text(0, height * 0.69, emoji + ' You’ve unlocked an unreleased 8-bit version\n\n of Merry Axe-Mas, use the password👉 NAVIDEAD\n\n in the link below to listen now. ' + emoji2, { align: "center", fontFamily: "kong", fontSize: 0.04 * scaleFactor, color: "#ffff00" }).setInteractive({ cursor: "pointer" })
            
            var textWidth = promotetextff.width;
            promotetextff.x = (width / 2) - (textWidth / 2);
            promotetextff.depth = 100001;


            var promotetext = this.scene.add.text(0, height * 0.768, '\n\n https://www.ink-merch.com/pages/axemas', { align: "center", fontFamily: "kong", fontSize: 0.04 * scaleFactor, color: "#0000ff" }).setInteractive({ cursor: "pointer" })
            
            var textWidth = promotetext.width;
            promotetext.x = (width / 2) - (textWidth / 2);
            promotetext.depth = 100001;

            document.getElementById('clicker').style.width = "100%";
            document.getElementById('clicker').style.top = (parseInt(document.querySelector("canvas").style.height.split("px")[0]) * .76) + "px";


            var promotetext2 = this.scene.add.text(0, height * 0.768, '\n\n https://www.ink-merch.com/pages/axemas', { align: "center", fontFamily: "kong", fontSize: 0.04 * scaleFactor, color: "#ffff00" }).setInteractive({ cursor: "pointer" })
            
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
            }, 400);

            var restartBtn = this.scene.add.sprite(0.5 * width, 0.9 * height, 'ReplayBtn').setInteractive();
            restartBtn.depth = 100001;
            restartBtn.on('pointerdown', function (pointer) {
                /* let newURL = window.location.href.replace(/\/$/, "");
                window.location.href = newURL; */
                document.querySelector("#game2").style.touchAction = "auto";
                document.querySelector("#game2").style.pointerEvents = "all";
                window.location.reload();
            });

            /* var level_completed = this.scene.sound.add('level_completed');
            level_completed.play(); */

            document.getElementById("level_completedmp3").play();
            this.UIAdded = true;
        }
    }
};
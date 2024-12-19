
class Complete {
    constructor(scene) {
        this.scene = scene;

        this.scale = 0.007 * scaleFactor;


        this.bg = scene.add.sprite(width / 2, height / 2, 'LvlComplete');
        this.bg.depth = 100000;
        this.bg.alpha = 0;
        
        this.UIAdded = false;

    }

    update(deltaTime, winTime, bool) {
        
        if (winTime <= 0 && bool) {
            isPaused = true;
            this.bg.alpha += deltaTime / 1000.0;
            
        }

        if (this.bg.alpha >= 0.95 && !this.UIAdded) {
            var winText = this.scene.add.text(0, height * 0.75, 'YOU DID IT!', { fontFamily: "kong", fontSize: 0.054 * scaleFactor, color: "#ffff00" });
            var textWidth = winText.width;
            winText.x = (width / 2) - (textWidth / 2);
            winText.depth = 100001;
            winText.updateText();
            var emoji = "💀💀💀";
            var promotetext = this.scene.add.text(0, height * 0.15, emoji + ' Save our new album Welcome To Horrorwood!' + emoji + '\n\n Click HERE!!', { align: "center", fontFamily: "kong", fontSize: 0.054 * scaleFactor, color: "#0000ff", align: "center" }).setInteractive({ cursor: "pointer" })
            
            var textWidth = promotetext.width;
            promotetext.x = (width / 2) - (textWidth / 2);
            promotetext.depth = 100001;

            console.log(document.querySelector("canvas").style.height, parseInt(document.querySelector("canvas").style.height.split("px")[0]) * .15)
            document.getElementById('clicker').style.width = "100%";
            document.getElementById('clicker').style.top = (parseInt(document.querySelector("canvas").style.height.split("px")[0]) * .15) + "px";

            var promotetext2 = this.scene.add.text(0, height * 0.15, emoji + ' Save our new album Welcome To Horrorwood!' + emoji + '\n\n Click HERE!!', { align: "center", fontFamily: "kong", fontSize: 0.054 * scaleFactor, color: "#ffff00", align: "center" }).setInteractive({ cursor: "pointer" })
           
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

            var restartBtn = this.scene.add.sprite(0.42 * width, 0.9 * height, 'ReplayBtn').setInteractive();
            restartBtn.depth = 100001;
            restartBtn.on('pointerdown', function (pointer) {
                let newURL = window.location.href.replace(/\/$/, "");
                window.location.href = newURL;
            });

            var nextBtn = this.scene.add.sprite(0.58 * width, 0.9 * height, 'NextBtn').setInteractive();
            nextBtn.depth = 100001;
            nextBtn.on('pointerdown', function (pointer) {
                
                let newURL = window.location.href.replace(/\/$/, "").replace("/index.html", "").replace("/finalLevel", "/final2Level") /* + "/finalLevel/" */;
                /* console.log(newURL , " NEWYR") */
                window.location.href = newURL + "/index.html";
            });
            BGM.stop();
            var level_completed = this.scene.sound.add('level_completed');
            level_completed.play();

            this.UIAdded = true;
            /* var winText = this.scene.add.text(0, height * 0.2, 'Congrats you barely survived Christmas.\n\n Cheers and Merry Axe-Mas!', { align: "center", fontFamily: "kong", fontSize: 0.054 * scaleFactor, color: "#ffff00" });
            var textWidth = winText.width;
            winText.x = (width / 2) - (textWidth / 2);
            winText.depth = 100001;
            winText.updateText();


            var emoji = "💀💀💀"
            var promotetext = this.scene.add.text(0, height * 0.76, emoji + ' Follow us on Tik Tok!' + emoji + '\n\n Click HERE!!', { align: "center", fontFamily: "kong", fontSize: 0.054 * scaleFactor, color: "#0000ff" }).setInteractive({ cursor: "pointer" })
               
            var textWidth = promotetext.width;
            promotetext.x = (width / 2) - (textWidth / 2);
            promotetext.depth = 100001;

            document.getElementById('clicker').style.width = "100%";
            document.getElementById('clicker').style.top = (parseInt(document.querySelector("canvas").style.height.split("px")[0]) * .76) + "px";


            var promotetext2 = this.scene.add.text(0, height * 0.76, emoji + ' Follow us on Tik Tok!' + emoji + '\n\n Click HERE!!', { align: "center", fontFamily: "kong", fontSize: 0.054 * scaleFactor, color: "#ffff00" }).setInteractive({ cursor: "pointer" })
               
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
                let newURL = window.location.href.replace(/\/$/, "");
                window.location.href = newURL;
            });

            
            var level_completed = this.scene.sound.add('level_completed');
            level_completed.play();

            document.getElementById("finishher").muted = true;
            this.UIAdded = true; */
        }
    }
};
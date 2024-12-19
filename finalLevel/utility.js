
function time() {
    return (new Date()).getTime();
}

function getDelta() {
    let timeNow = time();
    let elapsed = timeNow - gameStartTimer;
    gameStartTimer = timeNow;
    return elapsed;
}

function lerp(v0, v1, t) {
    return v0 + t * (v1 - v0);
}

function lerp2(v0, v1, t) {
    return v0 + t * (v1 + v0);
}

function lerp3(v0, v1, t) {
    var t = v0 - t * (v1 + v0)
    return (t > .4) ? t : 0;
}

function numChar(num, ch) {
    var string = "";
    for (let i = 0; i < num; i++) {
        string += ch;
    }
    return string;
}
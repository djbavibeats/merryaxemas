
function time()
{
    return (new Date()).getTime();
}

function getDelta()
{
    let timeNow = time();
    let elapsed = timeNow - gameStartTimer;
    gameStartTimer = timeNow;
    return elapsed;
}

function lerp(v0, v1, t)
{
    return v0 + t * (v1 - v0);
}

function numChar(num, ch)
{
    var string = "";
    for(let i = 0; i < num; i++)
    {
        string += ch;
    }
    return string;
}
//ATTRIBUTION: https://fingerprint.com/blog/canvas-fingerprinting/
let canvas = document.getElementById("myCanvas"); //TODO: Create actual canvas element
let ctx = canvas.getContext("2d");

//Src canvas
ctx.fillStyle = "rgb(255,0,255)";
ctx.beginPath();
ctx.rect(20, 20, 150, 100);
ctx.fill();
ctx.stroke();
ctx.closePath();
ctx.beginPath();
ctx.fillStyle = "rgb(0,255,255)";
ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
ctx.fill();
ctx.stroke();   
ctx.closePath();

let txt = 'abz190#$%^@£éú';
ctx.textBaseline = "top";
ctx.font = '17px "Arial 17"';
ctx.textBaseline = "alphabetic";
ctx.fillStyle = "rgb(255,5,5)";
ctx.rotate(.03);
ctx.fillText(txt, 4, 17);
ctx.fillStyle = "rgb(155,255,5)";
ctx.shadowBlur=8;
ctx.shadowColor="red";
ctx.fillRect(20,12,100,5);

// hashing function
let mySrc = canvas.toDataURL();

function compute_hash(src) {
    let hash = 0;

    for (i = 0; i < src.length; i++) {
        char = src.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash;
    }
    return hash
}


document.getElementById("canvas_hash").innerHTML = compute_hash(mySrc);

//Display ref canvas #TODO: Fix bug
let c = document.getElementById("refCanvas");
let refctx = c.getContext("2d");
img = new Image();
img.src = 'canvas.png';
img.onload = function (e)
{
    refctx.drawImage(img, 0, 0);
}
// console.log(compute_hash((c.toDataURL())))
//TODO: Show ref canvas hash

let width = 200
let height = 40

canvasDiff = document.getElementById("difCanvas");
const diffCtx = canvasDiff.getContext("2d");
const img1 = ctx.getImageData(0, 0, width, height);
const img2 = refctx.getImageData(0, 0, width, height);
const diff = diffCtx.createImageData(width, height);

pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1}); //TODO: Understand threshold better

diffCtx.putImageData(diff, 0, 0);
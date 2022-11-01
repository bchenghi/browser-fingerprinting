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

// TODO: Add ref canvas, and show dif regions (binary black/white to make it obvious)
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

}

// TODO: Show dif regions (binary black/white to make it obvious)
let canvasHash;
let webglVendor;
let webglRenderer;

function getCanvasFingerprint() {
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

  let txt = "abz190#$%^@£éú";
  ctx.textBaseline = "top";
  ctx.font = '17px "Arial 17"';
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "rgb(255,5,5)";
  ctx.rotate(0.03);
  ctx.fillText(txt, 4, 17);
  ctx.fillStyle = "rgb(155,255,5)";
  ctx.shadowBlur = 8;
  ctx.shadowColor = "red";
  ctx.fillRect(20, 12, 100, 5);

  // hashing function
  let mySrc = canvas.toDataURL();

  function compute_hash(src) {
    let hash = 0;

    for (i = 0; i < src.length; i++) {
      char = src.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  }

  canvasHash = compute_hash(mySrc);
  document.getElementById("canvas_hash").innerHTML = canvasHash;

  //Display ref canvas #TODO: Fix bug
  let c = document.getElementById("refCanvas");
  let refctx = c.getContext("2d");
  img = new Image();
  img.src = refImgSrc;
  img.onload = function (e) {
    refctx.drawImage(img, 0, 0);
  };

  document.getElementById("ref_hash").innerHTML = compute_hash(refImgSrc);
}

function getWebGLInfo() {
	// ATTRIBUTION: https://stackoverflow.com/questions/23769780/how-to-get-opengl-version-using-javascript
  const gl = document.createElement("canvas").getContext("webgl");
  // try to get the extensions
  const ext = gl.getExtension("WEBGL_debug_renderer_info");

  // if the extension exists, find out the info.
  if (ext) {
   	webglVendor = gl.getParameter(ext.UNMASKED_VENDOR_WEBGL);
		webglRenderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
  }

	document.getElementById("webglVendor").innerHTML = webglVendor || "NIL";
	document.getElementById("webglRenderer").innerHTML = webglRenderer || "NIL";
}

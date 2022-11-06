// ATTRIBUTION: https://privacycheck.sec.lrz.de/active/fp_cf/fp_canvas_font.html

let baselineTextWidth = "";

function detect(font) {
  var asciiString =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ !\"#$%&'()*+,-./0123456789:;<=>?@[\\]^_`{|}~";
  var canvas = "";
  var ctx = "";
  var fontSize = "80px ";

  try {
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    ctx.font = fontSize + font;
    var textWidth = ctx.measureText(asciiString).width;
    if (font === "fakefont") {
      // fallback to default
      baselineTextWidth = textWidth;
    }

    return textWidth !== baselineTextWidth;
  } catch (e) {
    console.error("canvas not supported");
  }
}

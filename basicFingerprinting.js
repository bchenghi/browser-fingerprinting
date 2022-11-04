let userAgent;
let availableFontsString;
let timeZone;

function getUserAgent() {
  userAgent = navigator.userAgent;
  document.getElementById("userAgent").innerHTML = userAgent;
}

async function getAvailableFonts() {
  await document.fonts.ready;

  const availableFonts = new Set();

  // fontsList variable is obtained from the file fonts.js
  for (const font of fontsList.values()) {
    if (document.fonts.check(`12px "${font}"`)) {
      availableFonts.add(font);
    }
  }

  availableFontsString = [...availableFonts.values()].join(",");

  document.getElementById("availableFonts").innerHTML = availableFontsString;
}

function getTimeZone() {
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  document.getElementById("timezone").innerHTML = timeZone;
}

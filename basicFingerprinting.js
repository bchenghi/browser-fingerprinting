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

  if (userAgent.indexOf("Firefox") >= 0) {
    // If Firefox browser is used, will need to use an alternate
    // method to check for fonts (see alternateFontDetector.js)

    // reload the page to refresh the fonts (workaround to detect consistent fonts in firefox)
    if (window.localStorage) {
      if (!localStorage.getItem("reload")) {
        localStorage["reload"] = true;
        window.location.reload();
      } else {
        localStorage.removeItem("reload");
      }
    }

    // fontsList variable is obtained from the file fonts.js
    for (const font of fontsList.values()) {
      if (detect(font)) {
        availableFonts.add(font);
      }
    }
  } else {
    // fontsList variable is obtained from the file fonts.js
    for (const font of fontsList.values()) {
      if (document.fonts.check(`12px "${font}"`)) {
        availableFonts.add(font);
      }
    }
  }

  availableFontsString = [...availableFonts.values()].join(",");

  document.getElementById("availableFonts").innerHTML = availableFontsString;
}

function getTimeZone() {
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  document.getElementById("timezone").innerHTML = timeZone;
}

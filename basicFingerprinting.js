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

async function getFingerprintHash() {
  const txtEncoder = new TextEncoder("utf-8");
  const txtToEncode = userAgent + ";" + availableFontsString + ";" + timeZone;
  const buf = await crypto.subtle.digest(
    "SHA-256",
    txtEncoder.encode(txtToEncode)
  );
  const fingerprint = Array.prototype.map
    .call(new Uint8Array(buf), (x) => ("00" + x.toString(16)).slice(-2))
    .join("");

  document.getElementById("fingerprint").innerHTML = fingerprint;
}

getUserAgent();
getAvailableFonts();
getTimeZone();
getFingerprintHash();

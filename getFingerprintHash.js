async function getFingerprintHash() {
  const txtEncoder = new TextEncoder("utf-8");
  const txtToEncode =
    userAgent + ";" + availableFontsString + ";" + timeZone + ";" + canvasHash;
  const buf = await crypto.subtle.digest(
    "SHA-256",
    txtEncoder.encode(txtToEncode)
  );
  const fingerprint = Array.prototype.map
    .call(new Uint8Array(buf), (x) => ("00" + x.toString(16)).slice(-2))
    .join("");

  document.getElementById("fingerprint").innerHTML = fingerprint;
}

async function fingerprintBrowser() {
  getUserAgent();
  await getAvailableFonts();
  getTimeZone();
  getCanvasFingerprint();
  await getFingerprintHash();
}

fingerprintBrowser();

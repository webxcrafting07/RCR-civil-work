const https = require('https');

https.get('https://maps.app.goo.gl/qFVpxJ2gH3gi583q7', (res) => {
  if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
    console.log("Redirects to:", res.headers.location);
  } else {
    console.log("Status:", res.statusCode);
  }
}).on('error', (e) => {
  console.error(e);
});

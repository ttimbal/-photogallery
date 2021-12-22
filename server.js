//Install express server
const express = require('express');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/photo-gallery'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/photo-gallery/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

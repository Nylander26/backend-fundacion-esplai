//Running server and requiring dotenv
require('dotenv').config()
const app = require('./server');
const port = app.get('port');

app.listen(port, () => console.log(`Listening on PORT: ${port}`))

//Running server and requiring dotenv
require('dotenv').config()
const app = require('./server');
const port = app.get('port');

//Method that turn the server ON
app.listen(port, () => console.log(`Listening on PORT: ${port}`))

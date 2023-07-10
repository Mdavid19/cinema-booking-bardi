const express = require('express');
const app = express();
const port = 8080;

app.set('view engine', 'ejs');

app.use(require('./routes/login'));
app.use(require('./routes/main'));
app.use(require('./routes/email'));

app.use(express.static('public'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
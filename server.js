const express = require('express');
const app = express();

app.use(express.static('public'))

let port = process.env.PORT || 3333
app.listen(port, function () {
  console.log( "Data-Browser running on " + server_ip_address + ":" + port )
});
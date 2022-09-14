const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mainpage.html'))
});

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));

app.use(express.static(path.join(__dirname, 'public', 'static')));
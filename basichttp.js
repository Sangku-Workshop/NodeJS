//inisiasi modul-modul yang dipakai
var http = require('http');
var url = require('url');

//inisiasi variabel
var cf = 0.5 ; //carbon factor

//memulai membuat server http dan mengambil data dari url
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var que = url.parse(req.url, true).query; //parse data dari url
  var isi = "Total Daya: " + que.daya + "kWh, Carbon Emission: " + que.daya * cf + "kgCO2";
  var txt = que.tahun + ": {" + isi + "}";
  res.end(txt); //menampilkan data di html page
}).listen(8080); //inisiasi port yang digunakan
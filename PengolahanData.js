const { Client } = require('pg');

const client = new Client(
    user: "postgres",
    password: "postgres",
    host: 'localhost',
    port: 5432,
    database: "dataems",
);

function ambilData(permintaan) {//fungsi untuk mengmbil data ke database
    client.connect();
    var qambil = 'SELECT LAST('+ permintaan +') from data';
    client.query(qambil, (err, result) =>{
    if (err){
        console.error('query error',err);
    }else{
        console.log('query:', result.value);
    }
});
client.end();
return result.value;
}

function kirimData(label , isi) {//fungsi untuk mengirim data ke database
    client.connect();
    var qkirim = 'INSERT INTO hasil ('+ label + ') VALUE(' + isi+')';
    client.query(qkirim, function (err, result) {
    if (err) throw err;
    console.log("terkirim");
    client.end();
}

setInterval({
    var data = ambilData('daya');//ambil data daya
    var hasil = data; //pengolahan data
    kirimData('daya', hasil);//menyimpan hasil ke database
}, 60000);


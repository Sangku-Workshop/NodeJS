const { Client } = require('pg');

const client = new Client(
    user: "postgres",
    password: "postgres",
    host: 'localhost',
    port: 5432,
    database: "dataems",
);

function ambilData(label, tabel) {//fungsi untuk mengmbil data ke database
    client.connect();
    var qambil = 'SELECT LAST('+ label +') from '+ tabel;
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

function kirimData(tabel ,label , isi) {//fungsi untuk mengirim data ke database
    client.connect();
    var qkirim = 'INSERT INTO '+ tabel +' ('+ label + ') VALUE(' + isi+')';
    client.query(qkirim, function (err, result) {
    if (err) throw err;
    console.log("terkirim");
    client.end();
}

function ubahData(tabel ,label , isi, cond) {//fungsi untuk mengubah data di database
    client.connect();
    var qkirim = 'UPDATE '+ tabel +' SET '+ label + ' = ' + isi+' WHERE '+cond;
    client.query(qkirim, function (err, result) {
    if (err) throw err;
    console.log("terkirim");
    client.end();
}

//program utama
var lastdate = ambilData('tanggal', 'temp'); //ambil data terakhir di database temporary
var newdate = ambilData('tanggal', 'data');
var dayaharian;
if (lastdate == newdate){
    dayaharian = ambilData('dayaharian', 'temp');
}else{
    dayaharian = 0;
    lastdate = newdate;
}
var kirim = "";


//loop
setInterval({
    var daya = ambilData('daya', 'data');//ambil data daya
    newdate = ambilData('tanggal', 'data');
    dayaharian += daya
    
    if (lastdate == newdate){
        dayaharian += daya;
        var condwhere = 'tanggal = '+ lastdate;
        ubahData('temp' ,'dayaharian', dayaharian, condwhere);//mengubah data di temp agar hemat memory
    }else{
        kirim = dayaharian + ',' + lastdate;
        kirimData('hasil' ,'dayaharian, tanggal', kirim);//menyimpan hasil ke database
        lastdate = newdate;
        dayaharian = daya;
        kirim = dayaharian + ',' + lastdate;
        kirimData('temp' ,'dayaharian, tanggal', kirim);//menyimpan hasil ke temp
    }
    
}, 60000);


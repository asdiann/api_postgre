const express = require('express');
const bodyParser = require('body-parser');
const app= express();
const {Client} = require('pg');

app.use(bodyParser.json());

const client = new Client({
	user: "postgres",
	password: 1234,
	host: "localhost",
	port: 5432,
	database: "nodejs_postgre"
});

client.connect((err) =>{
	if(err) throw err;
	console.log('Postgre connected...');
});

app.get('/api/siswa',(req, res)=>{
	let sql ="SELECT * FROM siswa"
	let query = client.query(sql, (err, results)=>{
		if (err) throw err;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results.rows}));
	});
});


app.post('/api/siswa',(req, res)=>{
	let sql = "INSERT INTO siswa (nama_lengkap, tanggal_lahir, alamat) VALUES('"+req.body.nama_lengkap+"','"+req.body.tanggal_lahir+"','"+req.body.alamat+"');";
	let query = client.query(sql, (err, results)=>{
		if (err) throw err;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results.rows}));
	});
});

app.delete('/api/siswa/:id',(req, res)=>{
	let sql = "DELETE FROM siswa WHERE id="+req.params.id;
	let query = client.query(sql,(err, results)=>{
		if (err) throw err;
		res.send(JSON.stringify({"response": "DELETE BERHASIL"}));
	});
});



app.listen(8000,()=>{
	console.log('Server is running at port 8000');
});

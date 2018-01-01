
// 采集数据
var http = require('http');

var url = 'http://hybrid.ximalaya.com/anchor-vote/category_vote_anchor?categoryId=0&pageSize=15&pageNo=1';


// 提供显示服务
var express = require('express');
var app = express();

app.set( 'view engine', 'jade' );
app.set( 'views', './src/views' );

// 静态资源
app.use('/assets', express.static('assets'));

app.get('/', function (req, res) {

	res.render('index', {
		title: 'Monitor'
	});
});

// 定时任务
// 时间间隔3s
// 每3秒读取数据保存到数据库中
// userid username
// createtime votenumber
// 
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'monitor'
});

connection.connect();

/*
setInterval(function(){
	http.get( url, function(res) {
		var _html = '';

		res.on( 'data', function(data) {
			_html += data;
		} );
		
		res.on('end', function() {
			// 转换成JSON对象
			// 数据格式
			// voteNumber
			// rank
			// nickName
			var createtime = Date.now();
			var users = JSON.parse(_html).anchorVoteModels;
			var len = users.length;
			var sql = '';

			console.log(createtime+'\r\n');
			
			
			for (var i=0; i<len; i++) {
				sql = 'INSERT INTO votenumber ( userid,votenumber,createtime ) VALUES ( '+ users[i].anchorId +', '+ users[i].voteNumber +','+ createtime +');';
				connection.query(sql, function(err, rows, fields) {
				    if (err) throw err;
				    //console.log('The solution is: ', rows[0].solution);
				});
			}


			//console.log(sql+'\r\n');

			//connection.end();

			// 保存到数据库中
			// connection.connect();

			// connection.query('INSER', function(err, rows, fields) {
			//     if (err) throw err;
			//     console.log('The solution is: ', rows[0].solution);
			// });

			// connection.end();

		} );

	}).on( 'error', function(){

		console.log('Get html failure\r\n');
	} );

}, 180000);
*/

// var schedule = require('node-schedule');
// var rule = new schedule.RecurrenceRule();
// rule.second = 3;
// var j = schedule.scheduleJob(rule, function(){
// 	http.get( url, function(res) {
// 		var _html = '';

// 		res.on( 'data', function(data) {
// 			_html += data;
// 		} );
		
// 		res.on('end', function() {
// 			// 转换成JSON对象
// 			// 数据格式
// 			// voteNumber
// 			// rank
// 			// nickName
// 			//var users = JSON.parse(_html).anchorVoteModels;

// 			console.log(users);

// 			// 返回数据
// 			//console.log('读取完毕\r\n');

// 		} );

// 	}).on( 'error', function(){

// 		console.log('Get html failure\r\n');
// 	} );
// });


app.get('/user-data', function (req, res) {

	http.get( url, function(res1) {
		var _html = '';

		res1.on( 'data', function(data) {
			_html += data;
		} );
		
		res1.on('end', function() {
			// 转换成JSON对象
			// 数据格式
			// voteNumber
			// rank
			// nickName
			var users = JSON.parse(_html);

			// 返回数据
			res.json(users); 
			//console.log('读取完毕\r\n');

		} );

	}).on( 'error', function(){

		console.log('Get html failure\r\n');
	} );

} );

// user?userid=1
// userlist 采采：2629294

app.get('/user', function (req, res){
	var userid = req.query.userid;
	//var userid = 2629294;
	// 查询数据库
	var sql = 'SELECT * from votenumber WHERE userid=' + userid + ' order by createtime desc limit 20;';
	console.log(sql);
	connection.query(sql, function(err, rows, fields) {
	    if (err) throw err;
	    res.json(rows); 
	});

});

var server = app.listen(8008, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('app listening at http://%s:s%', host, port);
});
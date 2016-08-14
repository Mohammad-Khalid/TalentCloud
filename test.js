var parser = require('csv-parse/lib/sync');

console.log(parser);
var fs = require('fs');
/*console.log("************");
var stream = fs.createReadStream('test.csv', 'UTF-8');
var data = '';
stream.once('data', function () {
    console.log("\n\n\n");
    console.log("Started Reading File........");
    console.log("\n\n\n");
});
stream.on('data', function (chunk) {
    data += chunk;
    console.log(chunk.length);
    console.log(parser(chunk.toString()).asRows());
});
stream.on('end', function () {
    console.log("\n\n\n");
    console.log("Finished Reading File : " + data.length);
    console.log("\n\n\n");
}); 
// fs.readFileSync('test.csv','utf8',function(err,data){
// 	if (err) {
//         throw err;
//     }
//     console.log(parser(data).asObjects());
// });*/
fs.readFile('user.csv', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }
    console.log(parser(data, {
        columns: true
    }));
});
/*var myarr=[1,2,3,4,5];
console.log(((myarr.indexOf(2)>-1))===true && (myarr.indexOf(6)>-1)===true);*/
/*var v8 = require('v8');
console.log(v8.getHeapStatictics());*/
/*var connection = function(){
	this.myname=function(){
		return "khalid";
	}
}
module.exports=connection;*/
/*var fs = require('fs');
var path = require('path');
fs.readdir('./routes',function(err,files){
	if(err) throw err;
	files.forEach(function(filename){
		var file = path.join(__dirname,'routes',filename);
		var stats = fs.statSync(file);
		if(stats.isFile()){
			fs.readFile(file,'UTF-8',function(err,contents){
				if(err) console.log(err);
				console.log(contents);
			});
		}
	})
});
console.log("Reading Files .......");*/
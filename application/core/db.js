exports.init=function(){
	Module.mongoose.connect("mongodb://"+ SET.dbConfig.host +"/"+SET.dbConfig.name);
	console.log("数据库已连接");
}
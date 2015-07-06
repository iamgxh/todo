var favicon = require('serve-favicon');

module.exports=function(app){
	app.set("views",VIEW);
	app.set("view engine","ejs");
	//设置静态资源文件路径
	app.use(Module.express.static(PUBLIC));
	//网站ico
	app.use(favicon(PUBLIC+'/images/favicon.ico'));
	//body序列化
	app.use(Module.bodyParser());
}
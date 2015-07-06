/* 配置文件夹路径 */
//========================全局变量定义===============================
global.BASE_DIR=__dirname;
global.APP=global.BASE_DIR+"/application";
global.CON=global.APP+"/controllers";
global.CORE=global.APP+"/core";
global.MODEL=global.APP + "/model/";
global.BLL=global.APP+"/bll";
global.CONF=global.BASE_DIR + "/conf/";
global.LOG=global.BASE_DIR + "/log/";
global.PUBLIC=global.BASE_DIR + "/public/";
global.VIEW=global.BASE_DIR + "/views/";
global.SET=require(global.CONF+"/default");

/* node 模块引入 */
global.Module={
	express:require("express"),
	fs:require("fs"),
	path:require("path"),
	mongoose:require("mongoose"),
	bodyParser:require("body-parser")
};

/* 初始化变量 */
global.initVar={
	routesConfig:"" //路由表
};
var app=Module.express();

/* 连接数据库 */
require(CORE+"/db").init();

/* 服务配置 */
require(CONF+"/appConf")(app);

/* 监听请求，路由系统 */
reqListener=require(CORE+"/requestListener");
reqListener.listen(app);

/* 启动服务 */
app.listen(SET.appPort,function(){
	console.log("服务已经启动,监听端口:"+SET.appPort);
});
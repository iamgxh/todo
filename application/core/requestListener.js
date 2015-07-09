exports.listen=function(app){
	app.get("/",function(req,res){
		callUrlRequest(req,res);
	})
	app.get("/:key",function(req,res){
		callUrlRequest(req,res);
	})
	app.post("/:key",function(req,res){
		callUrlRequest(req,res,"post");
	})
	app.get("/:controller/:action",function(req,res){
		callUrlRequest(req,res);
	})
	app.post("/:controller/:action",function(req,res){
		callUrlRequest(req,res,"post");
	})
	app.use(function(req,res){
		notFound(req,res);		
	})
}

function callUrlRequest(req,res,type){
	var con,action;
	var actFix=type=="post"?"":"Action";

	if(req.path=="/")
	{
		req.params.key="/";
	}

	if(req.params.key)
	{
		//网站ico请求拦截，不进入controller
		if(req.params.key == "favicon.ico"){return;};
		//获取自定义路由
		var routesMsg=initVar.routesConfig?initVar.routesConfig:getRoutesConf();
		//路由存在
		if(routesMsg[req.params.key])
		{
			con=routesMsg[req.params.key]["con"]+"Controller";
			if(!routesMsg[req.params.key]["act"])
			{
				action="index"+actFix;
			}
			else
			{
				action=routesMsg[req.params.key]["act"]+actFix;
			}
		}
		//不存在该路由
		else
		{
			if(req.params.key=="/")
			{
				con="indexController";
			}
			else
			{
				con=req.params.key+"Controller";
			}
			action="index"+actFix;
		}
	}
	else
	{
		con=req.params.controller+"Controller",
		action=req.params.action+actFix;
	}

	//实例化控制器，调用action方法
	Module.fs.exists(CON+"/"+con+".js",function(exists){
		if(!exists)
		{
			notFound(req,res);
			return;
		}
		var controller=require(CON+"/"+con);
		if(controller)
		{
			var conObj=new controller();
			conObj.init(req,res);
			if(conObj[action])
			{
				conObj[action].call();
			}
			else
			{
				notFound(req,res);
			}
		}
		else
		{
			notFound(req,res);
		}
	})	
}

//获取自定义路由表
function getRoutesConf(){
	var routesMsg = {};
    try{
        var str = Module.fs.readFileSync(CONF + 'routes.json','utf8');
        routesMsg = JSON.parse(str);
    }
    catch(e){
        Module.sys.debug("JSON parse configs/hot_deployer.json fails")
    }
    initVar.routesConfig = routesMsg;
    return routesMsg;
}

//404页面
function notFound(req,res){
	res.status(404).send("404");
}
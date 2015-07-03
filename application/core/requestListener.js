exports.listen=function(app){
	app.get("/",function(req,res){
		callUrlRequest(req,res);
	})
	app.get("/:key",function(req,res){
		callUrlRequest(req,res);
	})
	app.get("/:controller/:action",function(req,res){
		callUrlRequest(req,res);
	})
	app.use(function(req,res){
		notFound(req,res);		
	})
}

function callUrlRequest(req,res){
	var con,action;
	if(req.path=="/")
	{
		req.params.key="/";
	}

	if(req.params.key)
	{
		var routesMsg=initVar.routesConfig?initVar.routesConfig:getRoutesConf();
		if(routesMsg[req.params.key])
		{
			con=routesMsg[req.params.key]["con"]+"Controller";
			if(!routesMsg[req.params.key]["act"])
			{
				action="indexAction";
			}
			else
			{
				action=routesMsg[req.params.key]["act"]+"Action";
			}
		}
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
			action="indexAction";
		}
	}
	else
	{
		con=req.params.controller+"Controller",
		action=req.params.action+"Action";
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
}

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

function notFound(req,res){
	res.status(404).send("404");
}
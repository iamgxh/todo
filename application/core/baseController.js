function BaseController(){
	var _self=this;
	_self.req;
	_self.res;
	this.init=function(req,res)
	{
		_self.req=req;
		_self.res=res;
	}

	this.view=function(path){
		_self.res.sendfile(VIEW+"/"+path);
	}

	this.render=function(view,obj){
		_self.res.render(view,obj);
	}

	this.send=function(str)
	{
		_self.res.send(str);
	}
	
	this.json=function(obj){
		_self.res.json(obj);
	}
	
	this.redirect=function(path){
		_self.res.redirect(path);
	}
}
global.BaseController = BaseController;
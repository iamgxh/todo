function BaseController(){
	var _self=this;
	_self._req;
	_self._res;
	this.init=function(req,res)
	{
		_self._req=req;
		_self._res=res;
	}

	this.html=function(path){
		_self._res.sendfile(VIEW+"/"+path);
	}

	this.render=function(view,obj){
		_self._res.render(view,obj);
	}

	this.send=function(str)
	{
		_self._res.send(str);
	}
	
	this.json=function(obj){
		_self._res.json(obj);
	}
}
global.BaseController = BaseController;
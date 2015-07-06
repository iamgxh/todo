require(CORE+"/baseController");

function indexController(){
	var parent=Object.getPrototypeOf(this);

	this.indexAction=function(){
		var vm={title:"主页"};
		parent.render("index",vm);
	}
}

indexController.prototype=new BaseController();
module.exports=indexController;
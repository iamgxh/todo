require(CORE+"/baseController");
var model=require(MODEL+"/testModel");

function testController(){
	var parent=Object.getPrototypeOf(this);

	this.indexAction=function(){
		parent.render("index",{title:"主页"});
	}
	this.addAction=function(){
		var test=new model();
		
		test.name="thomas";
		test.age=22;
		test.save(function(err){
			if(err)
			{
				parent.send(err);
			}
			parent.send({code:200,success:true});
		})
	}

	this.findAllAction=function(){
		model.find({},function(err,obj){
			if(err)
			{
				parent.send(err);
			}
			else
			{
				parent.json(obj);
			}
		})
	}
}


testController.prototype=new BaseController();
module.exports=testController;
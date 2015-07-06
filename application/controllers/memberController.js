require(CORE+"/baseController");
var model=require(MODEL+"/memberModel");
var bll=require(BLL+"/member");

function memberController(){
	var parent=Object.getPrototypeOf(this);

	this.registerAction=function(){
		parent.render("register");
	};

	this.register=function(){
		var m=new model();
		var result=bll.register(m);
		parent.json(result);
	};

	this.loginAction=function(){
		parent.render("member/login",{
			status:null
		});
	};
	this.login=function(){
		var email=parent.req.body.email;
		var pwd=parent.req.body.password;

		var result=bll.login(email,pwd,function(result){
			if(result==1)
			{
				alert("登陆成功!");
				parent.redirect("/");
			}
			else
			{
				parent.render("member/login",{
					status:result
				});
			}
		});
	}
}


memberController.prototype=new BaseController();
module.exports=memberController;
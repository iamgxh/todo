require(CORE+"/baseController");
var model=require(MODEL+"/memberModel");
var bll=require(BLL+"/member");

function memberController(){
	var parent=Object.getPrototypeOf(this);

	this.registerAction=function(){
		parent.render("member/register");
	};

	this.register=function(){
		var body=parent.req.body;
		//将参数赋值到model
		var m=parent.params2model(parent.req.body,new model());
		//默认model参数
		m.registerTime=Date.parse(new Date());
		m.status=1;
		m.errorTimes=0;

		bll.register(m,function(result){
			if(result==1)
			{
				parent.redirect("/member/login");
			}
			else
			{
				parent.send("result:"+result);
			}
		});
		
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
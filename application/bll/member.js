var model=require(MODEL+"/memberModel");

module.exports={
	register:function(member,cb){
		//var result=0;
		//if(!this.isExistEmail(member.email))
		//{
			member.save(function(err){
				if(err)
				{
					result=-2;
				}
				result=1;
				if(cb)
				{
					cb(result);
				}
			})
		//}
		
	},
	login:function(email,password,cb){
		model.findOne({email:email},function(err,member){
			var result;
			if(err)
			{
				result=-2;
			}
			if(member)
			{
				if(member.password==password)
				{
					result=1;
				}
				else
				{
					result=0;
				}
			}
			else
			{
				result=-1;
			}
			if(cb)
			{
				cb(result);
			}
		});
	},
	logout:function(){},
	isExistEmail:function(email){
		model.findOne({email:email},function(err,result){
			if(err)
			{
				return -2;
			}
			return result?true:false;
		})
	}
};
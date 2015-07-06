var model=require(MODEL+"/memberModel");

module.exports={
	register:function(member){
		if(!this.isExistEmail)
		{
			model.save(member,function(err){
				if(err)
				{
					return -2;
				}
				return 1;
			})
		}
		return 0;
	},
	login:function(email,password,cb){
		model.findOne({email:email},function(err,member){
			var result;
			if(err)
			{
				result=-2;
			}
			if(result)
			{
				if(result.password==password)
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
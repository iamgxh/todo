var Schema=Module.mongoose.Schema;

var memberSchema=new Schema({
	email:String,
	password:String,
	nickName:String,
	registerTime:Date,
	lastLoginTime:Date,
	errorTimes:Number,
	status:Number
});

module.exports=Module.mongoose.model("member",memberSchema,"member");

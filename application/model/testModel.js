var Schema=Module.mongoose.Schema;

var testSchema=new Schema({
	name:String,
	age:Number
});

module.exports=Module.mongoose.model("test",testSchema);

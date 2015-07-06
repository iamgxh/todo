exports=function(data,code,ex){
	this.code=code || 200; // success, 500 error
	this.data=data;
	this.exception=ex;
}
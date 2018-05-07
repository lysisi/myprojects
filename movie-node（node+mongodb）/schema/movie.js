var mongoose= require('mongoose');
//模式
var MovieSchema= new mongoose.Schema({
	doctor:String,
	title:String,
	language:String,
	country:String,
	summary:String,
	flash:String,
	poster:String,
	year:Number,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})
//save之前走下边的这个方法，去判断（）
MovieSchema.pre('save',function(next) {
	if(this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now();
	}else{
		this.meta.updateAt=date.now();
	}
	next();
})

MovieSchema.statics={
	fetch:function(cb){
		return this
		.find({})
		.sort('meta.updateAt')
		.exec(cb)
	},
	findById:function(id,cb){
		return this
		.findOne({_id:id})
		.exec(cb)
	}
}

module.exports=MovieSchema
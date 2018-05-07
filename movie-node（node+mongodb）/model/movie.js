//根据模式建模型；
var mongoose= require('mongoose');
var MovieSchema=require("../schema/movie");
var Movie=mongoose.model("Movie",MovieSchema);

module.exports=Movie
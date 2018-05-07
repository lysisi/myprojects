var express=require('express');
var path=require("path");
var mongoose=require("mongoose");
var _=require("underscore");//javascript的函数式编程库
var Movie=require('./model/movie');
var bodyParser=require("body-parser");
var port=process.env.PORT||8080;
var app=express();
mongoose.connect("mongodb://localhost/mongo");//传入本地的数据库



app.set('view engine','jade');//设置模板引擎
app.set('views','./views/pages');//设置模板的相对路径

app.use(express.static(path.join(__dirname,'bower_components')))
// app.use(express.bodyParser())//将表单数据格式化
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.listen(port);

console.log('app started on'+port);

//index 首页
app.get('/',function(req,res) {
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('index',{
			title:'重度科幻迷',
			movies:movies
		})
	})
	
})
//detail 详情页
app.get('/movie/:id',function(req,res) {
	var id= req.params.id;
	Movie.findById(id,function(err,movie){
		res.render('detail',{
			title:movie.title,
			movies:movie
		})
	})

	
})

//后台
app.get('/admin/admin',function(req,res) {
	res.render('admin',{
		title:'后台录入页',
		movies:{
			title:'',
			doctor:"",
			country:"",
			year:"",
			poster:'',
			language:'',
			flash:'',
			summary:''

		}
	})
})

//admin update movie
app.get("./admin/update/:id",function(req,res){
	var id = req.params.id;
	if(id){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err)
			}
			res.render("admin",{
				title:'后台录入页',
				movies:movie
			})
		})
	}
})





//admin post movie

app.post("./admin/movie/new",function(req,res){
	var id=req.body.movie._id;
	var movieObj=req.body.move;
	var _movie;

	if(id!=='undefined'){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err);
			}
			_movie=_.extend(movie,movieObj);
			_movie.save(function(err,movie){
				if(err){
					console.log(err)
				}
				res.redirect("/movie"+movie._id)
			})
		})
	}
	else{
		_movie=new Movie({
			doctor:movieObj.doctor,
			title:movieObj.title,
			country:movieObj.country,
			language:movieObj.language,
			year:movieObj.year,
			poster:movieObj.poster,
			summary:movieObj.summary,
			flash:movieObj.flash
		});
		_movie.save(function(err,movie){
			if(err){
				console.log(err)
			}
			res.redirect("/movie"+movie._id)
		})
	}
})



//后台列表页
app.get('/admin/list',function(req,res) {
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('list',{
				title:'后台列表页',
				movies:movies
			})
	})
	
})
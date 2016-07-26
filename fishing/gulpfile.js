//版权 北京智能社©, 保留所有权利
//1 加载模块
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat"); 

//2 配置任务
var arr = [
	"js/utils.js",
	"js/sprite.js",
	"js/fish.js",
	"js/cannon.js",
	"js/bullet.js",
	"js/coin.js",
	"js/DieFish.js",
	"js/web.js"
];

gulp.task("game",function(){
	return gulp.src(arr)
	           .pipe(concat("index.min.js"))
	           .pipe(uglify())
			   .pipe(gulp.dest("bulid"));	
});

//3 注册任务
gulp.task("default",["game"]);



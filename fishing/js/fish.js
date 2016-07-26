//版权 北京智能社©, 保留所有权利
function Fish(imgs,type){
	Sprite.call(this,imgs["fish"+type]);	
	this.count = 0;
	this.type = type;
	
	var size = [
		null,
		{h: 55, w: 37},
		{h: 78, w: 64},
		{h: 72, w: 56},
		{h: 77, w: 59},
		{h: 107, w: 122}
	];
	this.rotate = 90;
	this.w = size[type].w;
	this.h = size[type].h;
	
	
}
Fish.prototype = new Sprite();
Fish.prototype.constructor = Fish;

var oldMove = Sprite.prototype.move;
Fish.prototype.move = function(){
	//游 30ms
	oldMove.call(this);
	//摆尾巴

	//120ms
	if(this.count%4 == 0){
		this.sx += this.w;
		if(this.sx >= this.w*4){
			this.sx = 0;
		}
	}	
	this.count++;
};
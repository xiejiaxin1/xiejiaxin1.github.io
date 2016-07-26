var bgCanvas;
$(function(){
    var bgCanvas = new bgC();
    bgCanvas.init(function(){
        bgCanvas.doAnimate(bgCanvas);
    });
});
function bgC(){
    this.textArr = ["对象","Java","C#","ASP.NET","PHP","NODEJS","C","Python","Socket","RESTful","VBA","JavaScript","JQuery","GSAP","ExtJs","WebApp","Android","HTML5","CSS2","CSS3","SqlServer","Oracle","MySQL","SQLite","MongoDB","Struts","Spring","SSH","Seasar2","AOP","IoC","闭包","反射","代理"],
        this.colorArr = [
            {"fill":"rgba(255,0,0,0.1)","stroke":"rgba(0,0,255,0.3)"},
            {"fill":"rgba(255,0,0,0.1)","stroke":"rgba(0,0,255,0.3)"},
            {"fill":"rgba(0,0,255,0.1)","stroke":"rgba(255,0,0,0.3)"},
            {"fill":"rgba(232,193,254,0.1)","stroke":"rgba(162,0,255,0.3)"},
            {"fill":"rgba(254,199,121,0.1)","stroke":"rgba(255,150,0,0.3)"},
            {"fill":"rgba(0,156,143,0.1)","stroke":"rgba(0,255,243,0.3)"},
            {"fill":"rgba(216,136,108,0.1)","stroke":"rgba(255,66,0,0.3)"},
            {"fill":"rgba(0,255,0,0.2)","stroke":"rgba(255,0,0,0.3)"}
        ],
        this.parent = "body"//"#outDiv",
    this.me;
    this.docH = 0,
        this.docW = 0,
        this.drawTop = -20,
        this.drawLeft = -100,
        this.maxLines=3,
        this.lineH=0,
        this.showLines=5,
        this.cObj, //screen canvas
        this.cC, //screen Context
        this.cbObj, //back canvas
        this.cbC, //back Context
        this.circles = new Array(),
        this.bigger = 1,
        this.outter = 0.008,
        this.lastFpsUpdateTime=new Date,
        this.init = function(doAnimate){
            this.me = this;
            // single line height
            this.docW = $(document).width();
            this.docH = $(document).height();
            // patten 1
            //this.lineH = this.docH/this.showLines;
            // patten 2
            this.lineH = 150;
            this.showLines = Math.ceil(this.docH/this.lineH);

            //append mouse DOM canvas
            $(this.parent).prepend($("<canvas id='cbObj' width="+this.docW+" height="+this.docH+"></canvas>").css({"display":"block","left":"0px","top":"0px"}));
            // append screen DOM canvas
            $(this.parent).prepend($("<canvas id='cObj' width="+this.docW+" height="+this.docH+"></canvas>").css({"position":"absolute","left":"0px","top":"0px"}));
            // get canvas and context
            this.cObj = document.getElementById('cObj');
            this.cC = cObj.getContext('2d');
            this.cbObj = document.getElementById('cbObj');
            this.cbC = cbObj.getContext('2d');

            //draw texts
            this.drawTexts();

            /*// save to back canvas
             var image = new Image();
             image.src = this.cObj.toDataURL("image/png");
             this.cbC.drawImage(image,0,0);
             */

            // onmousemove bound
            this.Bind($(document), "mousemove", this.doMM, this);

            // simple animation
            //setInterval(this.doAnimate,500);
            setInterval(doAnimate,10);
        },
        this.drawTexts = function(){
            var maxLinesH = 0;
            var maxLinesW = 0;
            while(this.drawTop<this.docH){
                maxLinesH = this.lineH;
                while(this.drawLeft < this.docW){
                    // random lines
                    linesAll =  Math.round(Math.random()*(this.maxLines-1)+1);
                    // calc lines
                    var lines = new Array();
                    var oneLineH = this.lineH / linesAll;
                    for(i=0;i<linesAll;i++){
                        // random text
                        textI = Math.round(Math.random()*(this.textArr.length-1));
                        colorI = Math.round(Math.random()*(this.colorArr.length-1));

                        // calc max line width
                        textMetrics = this.cC.measureText(this.textArr[textI]);
                        maxLinesW = textMetrics.width>maxLinesW?textMetrics.width:maxLinesW;
                        //console.log(textMetrics);

                        // calc top and left
                        lineTop = this.drawTop + (i+0.5) * oneLineH;

                        // store information
                        lines.push({"text":this.textArr[textI],"color":this.colorArr[colorI],"top":lineTop,"font":Math.floor(oneLineH/(Math.random()*1.5+1))});
                    }
                    left = this.drawLeft + maxLinesW * 0.5;
                    this.drawText(lines,left);
                    this.drawLeft += maxLinesW;
                }
                this.drawLeft = 0;
                this.drawTop += maxLinesH;
                //console.log(this.drawTop);
            }
        },
        this.drawText = function(lines,left){
            //console.log(lines,left);
            for(i=0;i<lines.length;i++){
                /*textI = Math.round(Math.random()*(this.textArr.length-1));
                 colorI = Math.round(Math.random()*(this.colorArr.length-1));*/
                this.cC.save();
                //console.log(textI);

                //var textMetrics = this.cC.measureText(this.textArr[textI]);
                //console.log(textMetrics);

                this.cC.font=lines[i].font+"px Georgia";
                this.cC.textBaseline = 'middle';//设置文本的垂直对齐方式
                this.cC.textAlign = 'center'; //设置文本的水平对对齐方式
                this.cC.fillStyle = lines[i].color.fill;
                this.cC.strokeStyle = lines[i].color.stroke;
                this.cC.fillText(lines[i].text, left,lines[i].top);
                this.cC.strokeText(lines[i].text, left,lines[i].top);

                /*this.cC.fillText(this.textArr[textI], this.cObj.width/2,this.cObj.height/2+20);
                 this.cC.strokeText(this.textArr[textI], this.cObj.width/2,this.cObj.height/2+20);*/

                this.cC.restore();
            }
        },
        this.doMM = function(e){
            this.circles.push(
                {
                    'x':e.pageX,
                    'y':e.pageY,
                    'colorR':Math.floor(Math.random()*255),
                    'colorG':Math.floor(Math.random()*255),
                    'colorB':Math.floor(Math.random()*255),
                    'a':0.5,
                    'r':1
                });
            this.doAnimate(this);
            //console.log(this.circles);
        },
        this.doAnimate = function(thisObj){
            /*
             // save to back canvas
             var image = new Image();
             image.src = thisObj.cbObj.toDataURL("image/png");
             thisObj.cC.clearRect(0,0,thisObj.docW,thisObj.docH);
             thisObj.cC.drawImage(image,0,0);
             */
            thisObj.cbC.clearRect(0,0,thisObj.docW,thisObj.docH);
            thisObj.cbC.save();
            var delArr = new Array();
            for(i=0;i<thisObj.circles.length;i++){
                thisObj.circles[i].a -= thisObj.outter;
                thisObj.circles[i].r += thisObj.bigger;
                thisObj.cbC.fillStyle = "rgba("+thisObj.circles[i].colorR+","+thisObj.circles[i].colorG+","+thisObj.circles[i].colorB+","+thisObj.circles[i].a+")";
                //console.log("rgba("+thisObj.circles[i].colorR+","+thisObj.circles[i].colorG+","+thisObj.circles[i].colorB+","+thisObj.circles[i].a+")");
                thisObj.cbC.beginPath();
                thisObj.cbC.arc(thisObj.circles[i].x,thisObj.circles[i].y,thisObj.circles[i].r,0,Math.PI*2,true);
                thisObj.cbC.closePath();
                thisObj.cbC.fill();
                if(thisObj.circles[i].a<0.05){
                    delArr.push(i);
                }
            }
            thisObj.cbC.restore();
            //console.log(thisObj.circles.length);
            for(j=delArr.length-1;j>=0;j--){
                thisObj.circles.splice(j,1);
            }

            //console.log('a');
        },
        this.Bind = function (control, eventName, callBack, scope) {
            if (!scope) { scope = window; }
            $(control).bind(eventName, function () {
                callBack.apply(scope, arguments);
            });
        }
}
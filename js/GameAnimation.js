class GameAnimation{

	constructor(continuummodel,onFinishEvent,context,stepX,stepY,W,H){
		this.model=continuummodel;
		this.discretemodel=continuummodel.getDiscreteModel();
		this.W=W;
		this.H=H;
		this.m=discretemodel.getM();
		this.n=discretemodel.getN();
		this.stepX=stepX;
		this.stepY=stepY;
		this.context=context;
		this.FRAMES_PER_SECOND=25;
		this.onFinishEvent=onFinishEvent;
		this.setDuration();
	}

	setDuration(){
		var duration=document.getElementById(this.inputName()).value*1;
		this.countOfMechanicalFrames=Math.floor(duration*this.FRAMES_PER_SECOND/1000+1);
		document.getElementById(this.countName()).innerHTML=this.countOfMechanicalFrames;
		document.getElementById(this.durationName()).innerHTML=this.countOfMechanicalFrames/this.FRAMES_PER_SECOND+" sec.";
		this.model.setCountOfFrames(this.countOfMechanicalFrames);
	}

	paintField(){
		var BRICKS=10;
		this.context.clearRect(0,0,this.W,this.H);
		this.context.beginPath();
		var x
		for(var j=0;j<=this.n*BRICKS;j++){
			x=j*this.stepX/BRICKS;
			this.context.moveTo(x,0);
			this.context.lineTo(x,this.H);
		}
		var y
		for(var i=0;i<=this.m*BRICKS;i++){
			y=i*this.stepY/BRICKS;
			this.context.moveTo(0,y);
			this.context.lineTo(this.W,y);
		}
		this.context.stroke();
	}

	paintTile(i,j,size,color){	
		this.context.fillStyle=COLORS[color];
		var x0=j*this.stepX+(this.stepX-2)/2;
		var y0=i*this.stepY+(this.stepY-2)/2;
		var rX=(this.stepX-2)*size/2;
		var rY=(this.stepY-2)*size/2;
		
		function strokeStar(cont){
			var POLYGON=5;
			function getX(alpha){
				return x0+Math.cos(alpha)*rX;
			}
			function getY(alpha){
				return y0+Math.sin(alpha)*rY;
			}
			cont.beginPath();
			var x,y,alpha
			var pos=0;
			for(var k=0;k<POLYGON;k++){
				alpha=(pos*2-1/2)*Math.PI/POLYGON;
				x=getX(alpha);
				y=getY(alpha);
				pos=(pos+2)%POLYGON;
				if(k==0){
					cont.moveTo(x,y);
				}else{
					cont.lineTo(x,y);
				}
			}
			cont.closePath();
			cont.stroke();	
		}
		this.context.fillRect(x0-rX,y0-rY,2*rX,2*rY);
		strokeStar(this.context);
	}

	setCountOfFrames(countOfFrames){ // set from web-page
		model.setCountOfFrames(countOfFrames);
	}

	launchEngine(){
		this.frame=0;
		var self=this;
		var func=function(){
			self.switchOneFrame();
		}
		this.engine=setInterval(func,1000/this.FRAMES_PER_SECOND);
	}

	getContinuumModel(){
		return this.model;
	}

	show(){
		this.paintField();
		this.paintContent();
	}

	paintContent(){
	}

	switchOneFrame(){
		this.frame++;
		this.show();
		var stop=this.model.doOneLittleMotion(this.frame);
		if(stop){
			clearInterval(this.engine);
			this.show(); // repaint
			this.onFinishEvent();
		}
	}



}
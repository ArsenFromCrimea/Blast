class MechanicalAnimation extends GameAnimation{
	constructor(model,onFinishEvent,context,stepX,stepY,W,H){
		super(model,onFinishEvent,context,stepX,stepY,W,H);
	}

	inputName(){
		return "motion-duration";
	}
	countName(){
		return "count-of-mechanical-frames";
	}
	durationName(){
		return "setted-mechanical-duration";
	}


	launch(){
		this.model.loadFromDiscreteModel();
		this.launchEngine();
	}

	

	paintContent(){
		for(var i=0;i<this.m;i++){
			for(var j=0;j<this.n;j++){
				var sit=this.model.getSituation(i,j);
				this.paintTile(sit.i,j,1,sit.color);
			}
		}
	}

	getCountOfMechanicalFrames(){ 
		return this.countOfMechanicalFrames;
	}

}
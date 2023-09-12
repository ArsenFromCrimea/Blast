class InfectionAnimation extends GameAnimation{

	constructor(model,onFinishEvent,context,stepX,stepY,W,H){
		super(new InfectionModel(discretemodel),onFinishEvent,context,stepX,stepY,W,H);
	}	

	inputName(){
		return "infection-duration";
	}

	countName(){
		return "count-of-infection-frames";
	}

	durationName(){
		return "setted-infection-duration";
	}

	paintContent(){
		var color,size
		for(var i=0;i<this.m;i++){
			for(var j=0;j<this.n;j++){
				if(i==this.discretemodel.getLastI()&&j==this.discretemodel.getLastJ()){
					color=this.discretemodel.getInfectionColor();
					size=this.model.getSize();
				}else{
					if(this.discretemodel.getSituation(i,j)==null){
						continue;
					}
					size=1;
					color=this.discretemodel.getSituation(i,j);
				}
				this.paintTile(i,j,size,color);
			}
		}
	}

	
	


	launch(i,j){
		this.discretemodel.startInfection(i,j);
		this.launchEngine();
	}
	
}
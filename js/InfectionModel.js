class InfectionModel{
	constructor(discretemodel){
		this.discretemodel=discretemodel;
		this.decrease=true;
	}

	setDuration(infectionDuration){
		this.infectionDuration=infectionDuration;
	}

	getDiscreteModel(){
		return this.discretemodel;
	}

	setCountOfFrames(countOfFrames){
		this.countOfFrames=countOfFrames;
	}

	doOneLittleMotion(frame){
		var rest=frame%this.countOfFrames;
		if(rest==0){
			if(this.discretemodel.getLastI()==-1||this.discretemodel.getLastJ()==-1){
				if(this.discretemodel.getResult()==1){
					this.discretemodel.cancelInfection();
					this.decrease=false;		
				}else{
					return true;
				}
			}else{
				if(this.discretemodel.getResult()==0){
					this.decrease=true;
					return true;
				}
				this.discretemodel.tryToSpreadInfection();
				this.decrease=true;
			}
			
		}
		this.size=(this.decrease?this.countOfFrames-1-rest:rest)/(this.countOfFrames-1);
		return false;
	}

	getSize(){
		return this.size;
	}

}
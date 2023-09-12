class MechanicalModel{

	constructor(mm){
		this.mm=mm;
		this.m=this.mm.getM();
		this.n=this.mm.getN();

		this.columns=[];
		for(var j=0;j<this.n;j++){
			this.columns[j]=[];
		}

		this.loadFromDiscreteModel();
	}

	getDiscreteModel(){
		return this.mm;
	}

	getM(){
		return this.m;
	}
	
	getN(){
		return this.n;
	}


	loadOneColumn(j){ 
		var res=[];
		var i
		for(i=this.m-1;i>=0;i--){
			if(this.mm.getSituation(i,j)==null){
				continue;
			}
			var ob={i:i,color:this.mm.getSituation(i,j)};
			res.push(ob); 
		}
		return res;
	}


	loadFromDiscreteModel(){
		function getRandomInt(max){
			return Math.floor(Math.random()*max);
		}
		
		for(var j=0;j<this.n;j++){
			this.columns[j]=this.loadOneColumn(j);
			var i=-1;
			while(this.columns[j].length<this.m){
				this.columns[j].push({i:i,color:getRandomInt(this.mm.getCountOfColors())});
				i--;
			}
		}	
	}

	updateDiscreteModel(mm){
		for(var i=0;i<this.m;i++){
			for(var j=0;j<this.n;j++){
				this.mm.setSituation(i,j,this.getSituation(i,j).color);
			}
		}	
	}

	getSituation(i,j){
		return this.columns[j][this.m-1-i];
	}

	setCountOfFrames(countOfFrames){
		this.countOfFrames=countOfFrames;
	}
	
	doOneLittleMotion(frame){
		var remainedSteps=this.countOfFrames-frame;
		for(var i=0;i<this.m;i++){
			for(var j=0;j<this.n;j++){
				var delta=i-this.getSituation(i,j).i;
				this.columns[j][this.m-1-i].i+=delta/remainedSteps;
			}
		}
		return remainedSteps==1;	
	}
}
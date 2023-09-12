class DiscreteModel{
	
	constructor(m,n,c){
		this.n=n;
		this.m=m;
		this.c=c;
		this.rows=new Array(m);
		for(var i=0;i<m;i++){
			this.rows[i]=new Array(n);
		}
		this.reset();
		this.infectionColor=null;
	}


	getM(){
		return this.m;
	}
	
	getN(){
		return this.n;
	}

	getCountOfColors(){
		return this.c;
	}

	getInfectionColor(){
		return this.infectionColor;
	}

	teleport(firstI,firstJ,secondI,secondJ){
		var tmp=this.rows[firstI][firstJ];
		this.rows[firstI][firstJ]=this.rows[secondI][secondJ];
		this.rows[secondI][secondJ]=tmp;
	}


	
	reset(){
		for(var i=0;i<this.m;i++){
			for(var j=0;j<this.n;j++){
				this.rows[i][j]=null;			
			}
		}
	}

	getResult(){
		var countOfEmptyTiles=0;
		for(var i=0;i<this.m;i++){
			for(var j=0;j<this.n;j++){
				if(this.rows[i][j]==null){
					countOfEmptyTiles++;		
				}			
			}
		}
		return countOfEmptyTiles;
	}

	setSituation(i,j,color){
		this.rows[i][j]=color;
	}
	getSituation(i,j){
		return this.rows[i][j];
	}	
	

	isBroken(){
		for(var i=0;i<this.m;i++){
			for(var j=0;j<this.n;j++){
				if(i<this.m-1&&this.rows[i][j]==this.rows[i+1][j]||j<this.n-1&&this.rows[i][j]==this.rows[i][j+1]){
					return false;
				}
			}
		}
		return true;
	}

	spread(i,j){
		this.rows[i][j]=null;
		this.lastI=i;
		this.lastJ=j;
	}

	getLastI(){
		return this.lastI;
	}

	getLastJ(){
		return this.lastJ;
	}



	spreadInfection(i,j){
		if(i>0&&this.rows[i-1][j]==this.infectionColor){
			this.spread(i-1,j);
			return true;
		}
		if(i<this.m-1&&this.rows[i+1][j]==this.infectionColor){
			this.spread(i+1,j);
			return true;
		}
		if(j>0&&this.rows[i][j-1]==this.infectionColor){
			this.spread(i,j-1);
			return true;
		}
		if(j<this.n-1&&this.rows[i][j+1]==this.infectionColor){
			this.spread(i,j+1);
			return true;
		}
		this.lastI=-1;
		this.lastJ=-1;
		return false;
	}	


	tryToSpreadInfection(){
			for(var i=0;i<this.m;i++){
				for(var j=0;j<this.n;j++){
					if(this.rows[i][j]!=null){
						continue;
					}
					if(this.spreadInfection(i,j)){
						return true;
					}				
				}
			}
			return false;
	}


	cancelInfection(){
		this.countOfEmptyTiles=0;
		this.rows[this.firstI][this.firstJ]=this.infectionColor;
		this.lastI=this.firstI;
		this.lastJ=this.firstJ;
		this.firstI=-1;
		this.firstJ=-1;
	}

	startInfection(i,j){		
		this.countOfEmptyTiles=1;
		this.infectionColor=this.rows[i][j];
		this.firstI=i;
		this.firstJ=j;
		this.lastI=i;
		this.lastJ=j;
		this.rows[i][j]=null;
	}
	
}
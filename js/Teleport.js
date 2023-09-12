class Teleport{

	constructor(discretemodel,mechanicalAnimation){
		this.discretemodel=discretemodel;
		this.mechanicalAnimation=mechanicalAnimation;
		var booster="<h2>Teleport (U can switch two tiles):</h2><table border='1'>";
		for(var i=0;i<discretemodel.getM();i++){
			booster+="<tr>";
			for(var j=0;j<discretemodel.getN();j++){
				booster+="<td>";
				booster+="<input id='"+this.idForBoosterButton(i,j)+"' type='button' onclick='teleport.press("+i+","+j+")'></input>";
				booster+="</td>";
			}
			booster+="</tr>";
		}
		document.getElementById("teleport").innerHTML=booster+"</table>";
		this.refresh();
	}

	style(color){
		return "background-color:"+COLORS[color];
	}

	disable(){
		for(var i=0;i<discretemodel.getM();i++){
			for(var j=0;j<discretemodel.getN();j++){
				var button=document.getElementById(this.idForBoosterButton(i,j));
				button.disabled=true;	
			}
		}
	}

	refresh(){
		this.firstI=-1;
		this.firstJ=-1;
		for(var i=0;i<discretemodel.getM();i++){
			for(var j=0;j<discretemodel.getN();j++){
				var button=document.getElementById(this.idForBoosterButton(i,j));
				button.value="*";
				button.style=this.style(discretemodel.getSituation(i,j));
				button.disabled=false;	
			}
		}
	}

	idForBoosterButton(i,j){
		return "button_"+i+"_"+j;
	}

	boost(secondI,secondJ){
		this.discretemodel.teleport(this.firstI,this.firstJ,secondI,secondJ);
		this.mechanicalAnimation.launch();
	}

	press(i,j){
		var button=document.getElementById(this.idForBoosterButton(i,j));
		if(this.firstI==-1||this.firstJ==-1){
			this.firstI=i;
			this.firstJ=j;
			button.value="0";
		}else{
			if(this.firstI==i&&this.firstJ==j){
				button.value="*";
			}else{
				button.value="0";
				this.boost(i,j);
			}
		}
	
	}
}
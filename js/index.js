const COLORS=["white","red","green","yellow","brown","blue","pink"];
const MAX_SCORE=25;

var scr,context

var discretemodel,resetButton,infectionAnimation,mechanicalAnimation

function idForBoosterButton(i,j){
		return "button_"+i+"_"+j;
}

var firstI,firstJ

function boost(secondI,secondJ){
	changeDisplay("scores",-2);
	discretemodel.boost(firstI,firstJ,secondI,secondJ);
	mechanicalAnimation.launch();
	refreshBooster(discretemodel.getM(),discretemodel.getN());
}

function pressBooster(i,j){
	var button=document.getElementById(idForBoosterButton(i,j));
	if(firstI==-1||firstJ==-1){
		firstI=i;
		firstJ=j;
		button.innerHTML="0";
	}else{
		if(firstI==i&&firstJ==j){
			button.innerHTML="*";
		}else{
			var secondI=i;
			var secondJ=j;
			button.innerHTML="0";
			boost(secondI,secondJ);
		}
	}
	
}

function style(color){
	return "style='background-color:"+COLORS[color]+"'";
}

function refreshBooster(height,width){
	firstI=-1;
	firstJ=-1;
	var booster="";
	for(var i=0;i<height;i++){
		booster+="<tr>";
		for(var j=0;j<width;j++){
			booster+="<td>";
			booster+="<button "+style(discretemodel.getSituation(i,j))+ " id='"+idForBoosterButton(i,j)+"' onclick='pressBooster("+i+","+j+")'>*</button>";
			booster+="</td>";
		}
		booster+="</tr>";
	}
	document.getElementById("booster").innerHTML=booster;
}


function loadParametersAndLaunchGame(){
	function setProgress(){
		document.getElementById("progress").value=readDisplay("scores");
	}
	var W=scr.width;
	var H=scr.height;
	
	var width=document.getElementById("width").value;
	var height=document.getElementById("height").value;

	var countofcolors=document.getElementById("colors").value;
	discretemodel=new DiscreteModel(height,width,countofcolors);
	document.getElementById("scores").value=0;
	setProgress();
	var stepX=W/width;
	var stepY=H/height;
	
	var onInfectionFinishEvent=function(){
		var result=discretemodel.getResult();
		if(result>1){
			changeDisplay("scores",result);
		}else{
			if(!discretemodel.isBroken()){
				changeDisplay("scores",-1);
			}
		}
		setProgress();
		if(readDisplay("scores")>=MAX_SCORE){
			alert("U win :-)");
			return;
		}
		if(readDisplay("scores")<0||readDisplay("remain")==0){
			alert("The Game is over :-(");
			return;
		}
		resetButton.disabled=true;
		mechanicalAnimation.launch();
	}

	var onClick=function(event){
			infectionAnimation.launch(Math.floor(event.clientY/stepY),Math.floor(event.clientX/stepX));
			changeDisplay("remain",-1);
			scr.onclick=function(event){};
	}

	infectionAnimation=new InfectionAnimation(new InfectionModel(discretemodel),onInfectionFinishEvent,context,stepX,stepY,W,H);
	var onMechanicalFinishEvent=function(){
		mechanicalAnimation.getContinuumModel().updateDiscreteModel();
		scr.onclick=onClick;
		refreshBooster(height,width);
		if(discretemodel.isBroken()){
			resetButton.disabled=false;
			//alert("The game is broken. But it is my guilty... Press Reset!");
		}
	}
	mechanicalAnimation=new MechanicalAnimation(new MechanicalModel(discretemodel),onMechanicalFinishEvent,context,stepX,stepY,W,H);
	mechanicalAnimation.launch();
}

function reset(){
	changeDisplay("scores",+1);
	discretemodel.reset();
	mechanicalAnimation.launch();
}

function readDisplay(id){
	var field=document.getElementById(id);
	return field.value*1;
}

function changeDisplay(id,dif){
	var field=document.getElementById(id);
	var currentValue=readDisplay(id);
	currentValue+=dif;
	field.value=currentValue;
}




function initialization(){
	function createSelector(id,min,max,value){
		var el=document.getElementById(id);
		el.innerHTML="";
		for(var val=min;val<=max;val++){
			el.innerHTML+="<option value='"+val+"'"+(value==val?" selected":"")+">"+val+"</option>"
		}
	}
	createSelector("width",2,10,4);
	createSelector("height",2,10,4);
	createSelector("colors",2,COLORS.length,COLORS.length);
	document.getElementById("progress").max=MAX_SCORE;
	document.getElementById("remain").value=50;
	resetButton=document.getElementById("reset");
	scr=document.getElementById("my-screen");
	context=scr.getContext("2d");
	loadParametersAndLaunchGame();
}

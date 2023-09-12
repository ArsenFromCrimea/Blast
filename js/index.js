const COLORS=["white","red","green","yellow","brown","blue","pink"];
const MAX_SCORE=25;

var scr,context

var discretemodel,resetButton,infectionAnimation,mechanicalAnimation,teleport

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
		var disable=(discretemodel.getResult()==0);
		mechanicalAnimation.getContinuumModel().updateDiscreteModel();
		teleport.refresh();
		if(disable){
			teleport.disable();
			changeDisplay("scores",-2);
		}
		scr.onclick=onClick;
		if(discretemodel.isBroken()){
			resetButton.disabled=false;
			//alert("The game is broken. But it is my guilty... Press Reset!");
		}
	}
	var mechanicalModel=new MechanicalModel(discretemodel);
	mechanicalAnimation=new MechanicalAnimation(mechanicalModel,onMechanicalFinishEvent,context,stepX,stepY,W,H);
	teleport=new Teleport(discretemodel,mechanicalAnimation);
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

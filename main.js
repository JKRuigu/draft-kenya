var player1 = [1,2,3];
var player2 = [7,8,9];
var win1 = [1,5,9];
var win2 = [3,5,7];
var current = true; //TRUE FOR PLAYER ONE;
var currentId = 0;
var isSelected = false;

function intialize(player,data) {
	data.forEach(x=>{
		if (player) {
			format("player1",x);
		}else{
			format("player2",x);			
		}
	});
}

intialize(true,player1);
intialize(false,player2);

function format(player,id) {
	document.getElementById(id).classList.remove("default");
	document.getElementById(id).classList.add(player);
}

function formatRemove(id) {
	document.getElementById(id).classList.remove("player1");
	document.getElementById(id).classList.remove("player2");
	document.getElementById(id).classList.remove("current");
	document.getElementById(id).classList.remove("current2");
	document.getElementById(id).classList.add("default");
}


function isMove(data) {
	
}

function isvalid(player1,player2,current,id) {
	var isvalid = false;
	if (current) {
		player1.forEach(x=>{
			if (x == id) {
				isvalid = true;
			}
		});
	}else{
		player2.forEach(x=>{
			if (x == id) {
				isvalid = true;
			}
		});
	}
	return isvalid;
}
function move(current,previous,bool) {
	if (bool) {
		move2(player1);
	}else{
		move2(player2);		
	}
	function move2(data) {
		for (var i = 0; i < player1.length; i++) {
			if (player1[i] == previous) {
				player1[i] = Number(current);
			}
		}
	}
}

//GET BUTTON NUMBER AND ADJUST SCORE; 
setKey = (e)=>{
	var check = false;
	var userData = current?player1:player2;
	var isValid = true;
	for (var i = 0; i < userData.length; i++) {
		if (userData[i] == e.target.id) {
			isValid = false;
		}
	}
	if (currentId != 0 && isSelected && isValid) {

		console.log("SELECTED!!!")
		// format("current2",e.target.id);
		format("current2",currentId);
		formatRemove(currentId);
		format(current?"player1":"player2",e.target.id);
		move(e.target.id,currentId,current);

		currentId = 0;
		isSelected = false;
		check = true;
	}

	if (isvalid(player1,player2,current,Number(e.target.id)) && currentId == 0 && !check) {
		currentId = Number(e.target.id);
		isSelected = true;
		console.log("SELECTING...")
		format("current",e.target.id)
	}
	
	
}

// CAPTURE CLICK;
document.addEventListener('click', function(e) {
	// CHECKS IF BUTTON IS CLICKED;
	if (e.target.id >=1 && e.target.id <=9) {
   	 setKey(e);
	}
});
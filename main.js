var player1 = [1,2,3];
var player2 = [7,8,9];
var win1 = [1,5,9];
var win2 = [3,5,7];
var current = true; //TRUE FOR PLAYER ONE;
var currentId = 0;
var isSelected = false;
var movesTable =[];
var timer =500000;

function timerFunc() {
	var myT = setInterval(()=>{
		timer -=1000;
		if ((timer/1000) <= 0) {
			clearInterval(myT)
			document.getElementById("timer").innerHTML = 0;
			alert("GAME ENDED AS DRAW");
		}
		document.getElementById("timer").innerHTML = (timer/1000) <= 0?0:timer/1000;
	},1000);
}

for (var i = 0; i < 9; i++) {
	movesTable.push(true);
}
var moves = [[2,4,5],[1,3,5],[2,5,6],[1,5,7],[1,2,3,4,6,7,8,9],[3,5,9],[4,5,8],[7,5,9],[5,6,8]]

// console.log(moves[4]);

function intialize(player,data) {
	document.getElementById("current").innerHTML = (current?"PLAYER 1":"PLAYER 2");
	data.forEach(x=>{
		// console.log(x)
		movesTable[x-1] = false;
		if (player) {
			format("player1",x);
		}else{
			format("player2",x);			
		}
	});
	timerFunc();
}

intialize(true,player1);
intialize(false,player2);

function format(player,id) {
	document.getElementById(id).classList.remove("default");
	document.getElementById(id).innerHTML = (player =="player1"?"P1":"P2");
	document.getElementById(id).classList.add(player);
}

function formatRemove(id) {
	document.getElementById(id).classList.remove("player1");
	document.getElementById(id).classList.remove("player2");

	document.getElementById(id).innerHTML = "";
	document.getElementById(id).classList.remove("current");
	document.getElementById(id).classList.remove("current2");
	document.getElementById(id).classList.add("default");
}

function formatRemoveSelect(id) {
	document.getElementById(id).classList.remove("current");
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
		for (var i = 0; i < data.length; i++) {
			if (data[i] == previous) {
				data[i] = Number(current);
			}
		}
	}
}

function isAvaibleMove(prevId,currentId) {
	var data = moves[prevId-1];
	var isAvaible = false;
	for (var i = 0; i < data.length; i++) {
		if (data[i] == currentId) {
			isAvaible = true;
		}
	}
	return (isAvaible);
}

function checkWin(bool) {
	let data;
	let isWin = false;
	let points = 0;
	if (bool) {
		data = player2;
	}else{
		data = player1;
	}

	for (var i = 0; i < data.length; i++) {
		if (data[i] == win1[0] || data[i] == win1[1] || data[i] == win1[2]) {
				points++;			
		}
	}
	return points==3?true:false;	
}
function validateMove(id) {
	let data = moves[id-1];
	let isAvaible = false;
	for (var i = 0; i < data.length; i++) {
		let x = data[i];
		if (movesTable[x-1]) {
			isAvaible = true;
		}
	}
	return isAvaible;
}

//GET BUTTON NUMBER AND ADJUST SCORE; 
setKey = (e)=>{
	var check = false;
	var userData = current?player1:player2;
	var isValid = true;
	var id = Number(e.target.id);
	for (var i = 0; i < userData.length; i++) {
		if (userData[i] == id) {
			isValid = false;
		}
	}
	if (currentId != 0 && isSelected && isValid && isAvaibleMove(currentId,id)) {
		format("current2",currentId);
		formatRemove(currentId);
		movesTable[Number(currentId)-1] = true;
		movesTable[id-1] = false;		
		format(current?"player1":"player2",id);
		move(id,currentId,current);

		currentId = 0;
		isSelected = false;
		check = true;
		current = !current;
		document.getElementById("current").innerHTML = (current?"PLAYER 1":"PLAYER 2");
		if (checkWin(current)) {
			let msg = `PLAYER ${current?2:1} WON`;
			alert(msg);
		}
	}
	validateMove(id);
	if (isSelected && isvalid(player1,player2,current,id)) {
		formatRemoveSelect(currentId);
		currentId = id;
		isSelected = true;
		format("current",id);
	}

	if (isvalid(player1,player2,current,id) && currentId == 0 && !check && validateMove(id)) {
		currentId = id;
		isSelected = true;
		format("current",id)
	}

	
}

// CAPTURE CLICK;
document.addEventListener('click', function(e) {
	// CHECKS IF BUTTON IS CLICKED;
	let id = Number(e.target.id)
	if (id >=1 && id <=9) {
   	 setKey(e);
	}
});
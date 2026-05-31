// ==========================
// JowiAlchemyShield
// FULL SCRIPT
// ==========================


let priceHistory = [];


// ==========================
// EMOTION CHECK
// ==========================

const mood =
document.getElementById(
"mood"
);

const moodResult =
document.getElementById(
"moodResult"
);


mood.addEventListener(
"input",
()=>{

const value =
Number(
mood.value
);

if(value<40){

moodResult.className=
"result-box green show";

moodResult.innerText=
"Calm";

}

else if(value<70){

moodResult.className=
"result-box orange show";

moodResult.innerText=
"Neutral";

}

else{

moodResult.className=
"result-box red show";

moodResult.innerText=
"High Risk Emotion";

}

}

);




// ==========================
// LIVE BTC PRICE
// ==========================

async function loadBTC(){

try{

const response =
await fetch(

"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"

);

const data =
await response.json();


const price =
data.bitcoin.usd;


document.getElementById(
"btcPrice"
).innerText=

"$"+
price.toLocaleString();



priceHistory.push(
price
);


if(
priceHistory.length>10
){

priceHistory.shift();

}


generateSignal();


}

catch(err){

console.log(err);

}

}




// ==========================
// SIGNAL ENGINE
// ==========================

function generateSignal(){


if(
priceHistory.length<2
){

return;

}


const current =
priceHistory[
priceHistory.length-1
];


const previous =
priceHistory[
0
];



let signal =
"WAIT 🟠";

let entry="-";

let stop="-";

let tp="-";


const change =
(
(current-previous)
/
previous
)*100;



if(change>.15){

signal=
"BUY 🟢";

entry=current;

stop=
Math.round(
current*.99
);

tp=
Math.round(
current*1.02
);

}


else if(change<-.15){

signal=
"SELL 🔴";

entry=current;

stop=
Math.round(
current*1.01
);

tp=
Math.round(
current*.98
);

}



document.getElementById(
"btcSignal"
).innerText=
signal;


document.getElementById(
"btcEntry"
).innerText=
entry;


document.getElementById(
"btcSL"
).innerText=
stop;


document.getElementById(
"btcTP"
).innerText=
tp;


}



// start prices

loadBTC();

setInterval(
loadBTC,
10000
);




// ==========================
// RISK CALCULATOR
// ==========================

function calculateTrade(){


const balance =
parseFloat(
document.getElementById(
"balance"
).value
)||0;


const risk =
parseFloat(
document.getElementById(
"risk"
).value
)||0;


const entry =
parseFloat(
document.getElementById(
"entry"
).value
)||0;


const stop =
parseFloat(
document.getElementById(
"stop"
).value
)||0;



const riskAmount =
balance*
(risk/100);


const stopDistance =
Math.abs(
entry-stop
);



const position =
stopDistance
?
riskAmount/
stopDistance
:
0;



document.getElementById(
"riskAmount"
).innerText=

"$"+
riskAmount.toFixed(
2
);



document.getElementById(
"position"
).innerText=

position.toFixed(
4
);



document.getElementById(
"tp"
).innerText=

(
entry+
(entry-stop)*2
).toFixed(
0
);


}



[
"balance",
"risk",
"entry",
"stop"

].forEach(id=>{

document.getElementById(
id
).addEventListener(
"input",
calculateTrade
);

});


calculateTrade();




// ==========================
// TRADING CONTEXT
// ==========================


let tradesToday=0;

let consecutiveLosses=0;

let dailyPNL=0;

let weeklyPNL=0;


function updateTradingContext(){


document.getElementById(
"tradeCount"
).innerText=
tradesToday;



document.getElementById(
"losses"
).innerText=

consecutiveLosses+
" / 3";



document.getElementById(
"dailyPNL"
).innerText=

"$"+
dailyPNL.toFixed(
2
);



document.getElementById(
"weeklyPNL"
).innerText=

"$"+
weeklyPNL.toFixed(
2
);


}


updateTradingContext();




// ==========================
// UNLOCK TERMINAL
// ==========================

function unlockTrade(){


const checks =
document.querySelectorAll(
".tradeCheck"
);


let ready=true;


checks.forEach(box=>{

if(
!box.checked
){

ready=false;

}

});



if(!ready){

alert(
"Complete checklist first ❌"
);

return;

}



const button =
document.getElementById(
"unlockBtn"
);


button.innerText=

"Terminal Active ✅";


button.style.background=

"#059669";



alert(
"Trading Terminal Unlocked 🔓"
);


}

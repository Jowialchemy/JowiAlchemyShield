let priceHistory=[];


/* EMOTION */

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

const v=
Number(
mood.value
);

if(v<40){

moodResult.innerText=
"Calm";

}

else if(v<70){

moodResult.innerText=
"Neutral";

}

else{

moodResult.innerText=
"High Risk Emotion";

}

}

);




/* LIVE PRICE + SIGNALS */

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
catch(e){

console.log(e);

}

}



function generateSignal(){

if(
priceHistory.length<5
){

return;

}


const current =
priceHistory[
priceHistory.length-1
];

const old =
priceHistory[
0
];


let signal=
"WAIT 🟠";

let entry="-";

let stop="-";

let tp="-";


const change=
(
(current-old)
/old
)*100;


if(change>.20){

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

else if(change<-.20){

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



loadBTC();

setInterval(
loadBTC,
30000
);




/* CALCULATOR */

function calculateTrade(){

const balance=
parseFloat(
document.getElementById(
"balance"
).value
)||0;


const risk=
parseFloat(
document.getElementById(
"risk"
).value
)||0;


const entry=
parseFloat(
document.getElementById(
"entry"
).value
)||0;


const stop=
parseFloat(
document.getElementById(
"stop"
).value
)||0;


const riskAmount=
balance*
(risk/100);


const distance=
Math.abs(
entry-stop
);


const position=
distance
?
riskAmount/distance
:
0;


document.getElementById(
"riskAmount"
).innerText=

"$"+
riskAmount.toFixed(2);


document.getElementById(
"position"
).innerText=

position.toFixed(4);


document.getElementById(
"tp"
).innerText=

(
entry+
(entry-stop)*2
).toFixed(0);


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




function unlockTrade(){

alert(
"Trading Terminal Unlocked 🔓"
);

}

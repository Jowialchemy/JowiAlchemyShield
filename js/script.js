// ======================================
// JowiAlchemyShield - FULL SCRIPT
// ======================================


// ------------------------------
// MOOD SYSTEM
// ------------------------------

const mood =
document.getElementById(
"mood"
);

const moodResult =
document.getElementById(
"moodResult"
);

if(mood){

mood.addEventListener(
"input",
()=>{

let value =
parseInt(
mood.value
);

if(value < 40){

moodResult.className =
"result-box green show";

moodResult.innerHTML =
"Calm";

}

else if(value < 70){

moodResult.className =
"result-box orange show";

moodResult.innerHTML =
"Neutral";

}

else{

moodResult.className =
"result-box red show";

moodResult.innerHTML =
"Desperate / Do NOT Trade";

}

}

);

}



// ------------------------------
// RISK CALCULATOR
// ------------------------------

const balance =
document.getElementById(
"balance"
);

const risk =
document.getElementById(
"risk"
);

const entry =
document.getElementById(
"entry"
);

const stop =
document.getElementById(
"stop"
);

const riskAmountEl =
document.getElementById(
"riskAmount"
);

const positionEl =
document.getElementById(
"position"
);

const tpEl =
document.getElementById(
"tp"
);


function calculateTrade(){

if(
!balance ||
!risk ||
!entry ||
!stop
){

return;

}

let bal =
parseFloat(
balance.value
) || 0;

let riskPct =
parseFloat(
risk.value
) || 1;

let ent =
parseFloat(
entry.value
) || 0;

let stp =
parseFloat(
stop.value
) || 0;


let riskAmount =
(
riskPct / 100
)
*
bal;


let distance =
Math.abs(
ent - stp
);


let position =
distance > 0
?
riskAmount /
distance
:
0;


let takeProfit =
ent +
(
(ent - stp)
*
2
);


riskAmountEl.innerText =
"$" +
riskAmount.toFixed(2);

positionEl.innerText =
position.toFixed(6);

tpEl.innerText =
takeProfit.toFixed(2);

}


if(balance){

[
balance,
risk,
entry,
stop

].forEach(
el=>{

el.addEventListener(
"input",
calculateTrade
);

}
);

calculateTrade();

}



// ------------------------------
// CHECKLIST SYSTEM
// ------------------------------

const checkboxes =
document.querySelectorAll(
"input[type='checkbox']"
);


function allChecklistChecked(){

let ready = true;

checkboxes.forEach(
box=>{

if(
!box.checked
){

ready = false;

}

}
);

return ready;

}



// ------------------------------
// UNLOCK TERMINAL BUTTON
// ------------------------------

function unlockTrade(){

const button =
document.querySelector(
"button"
);

if(
!allChecklistChecked()
){

alert(
"Complete all checklist items first ❌"
);

return;

}


alert(
"Trading Terminal Unlocked 🔓"
);


// Button becomes active state

button.innerText =
"Terminal Active ✅";

button.disabled =
true;

button.style.cursor =
"not-allowed";

button.style.background =
"#10b981";


// visual success effect

document.body.style.boxShadow =
"inset 0 0 50px rgba(16,185,129,.20)";

}



// ------------------------------
// TRADING CONTEXT DEFAULTS
// ------------------------------

const tradesToday =
document.getElementById(
"tradesToday"
);

const losses =
document.getElementById(
"losses"
);

const dailyPnL =
document.getElementById(
"dailyPnL"
);

const weeklyPnL =
document.getElementById(
"weeklyPnL"
);


if(tradesToday){

tradesToday.innerText =
"0";

}

if(losses){

losses.innerText =
"0 / 3";

}

if(dailyPnL){

dailyPnL.innerText =
"$0.00 (0.0%)";

}

if(weeklyPnL){

weeklyPnL.innerText =
"$0.00 (0.0%)";

}

console.log(
"JowiAlchemyShield Loaded ✅"
);

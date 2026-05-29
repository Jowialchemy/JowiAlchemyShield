// ===============================
// JowiAlchemyShield - UPGRADED JS
// ===============================


// ---------- MOOD SYSTEM ----------
const mood = document.getElementById("mood");
const moodResult = document.getElementById("moodResult");

mood.addEventListener("input", () => {
    let value = parseInt(mood.value);

    if (value < 40) {
        moodResult.className = "result-box green show";
        moodResult.innerHTML = "Calm";
    } 
    else if (value < 70) {
        moodResult.className = "result-box orange show";
        moodResult.innerHTML = "Neutral";
    } 
    else {
        moodResult.className = "result-box red show";
        moodResult.innerHTML = "Desperate / Do NOT Trade";
    }
});


// ---------- CALCULATOR ----------
const balance = document.getElementById("balance");
const risk = document.getElementById("risk");
const entry = document.getElementById("entry");
const stop = document.getElementById("stop");

const riskAmountEl = document.getElementById("riskAmount");
const positionEl = document.getElementById("position");
const tpEl = document.getElementById("tp");

function calculate() {

    let bal = parseFloat(balance.value) || 0;
    let riskPct = parseFloat(risk.value) || 1;
    let ent = parseFloat(entry.value) || 0;
    let stp = parseFloat(stop.value) || 0;

    let riskAmount = (riskPct / 100) * bal;
    let distance = Math.abs(ent - stp);
    let position = distance > 0 ? riskAmount / distance : 0;
    let tp = ent + (ent - stp) * 2;

    riskAmountEl.innerText = "$" + riskAmount.toFixed(2);
    positionEl.innerText = position.toFixed(6);
    tpEl.innerText = tp.toFixed(2);
}

[balance, risk, entry, stop].forEach(el => {
    el.addEventListener("input", calculate);
});

calculate();


// ---------- TRADING CONTEXT (STATIC NOW) ----------
document.getElementById("tradesToday").innerText = "0";
document.getElementById("losses").innerText = "0 / 3";
document.getElementById("dailyPnL").innerText = "$0.00 (0.0%)";
document.getElementById("weeklyPnL").innerText = "$0.00 (0.0%)";


// ---------- CHECKLIST ----------
const checkboxes = document.querySelectorAll("input[type='checkbox']");

checkboxes.forEach(cb => {
    cb.addEventListener("change", () => {
        let all = true;

        checkboxes.forEach(c => {
            if (!c.checked) all = false;
        });

        if (all) {
            console.log("✔ Ready to trade");
        } else {
            console.log("⛔ Not ready");
        }
    });
});


// ---------- BUTTON ----------
function unlockTrade() {
    alert("Trading Terminal Unlocked 🔓");
}

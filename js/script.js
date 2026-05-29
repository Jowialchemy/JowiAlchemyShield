// ===============================
// JowiAlchemyShield - FULL JS
// ===============================


// ===============================
// MOOD SLIDER LOGIC
// ===============================

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
        moodResult.innerHTML = "Caution";
    } 
    else {
        moodResult.className = "result-box red show";
        moodResult.innerHTML = "Do NOT Trade";
    }
});


// ===============================
// POSITION SIZE CALCULATOR
// ===============================

const balanceInput = document.getElementById("balance");
const riskSelect = document.getElementById("risk");
const entryInput = document.getElementById("entry");
const stopInput = document.getElementById("stop");

const riskAmountEl = document.getElementById("riskAmount");
const positionEl = document.getElementById("position");
const tpEl = document.getElementById("tp");

function calculateTrade() {

    let balance = parseFloat(balanceInput.value) || 0;
    let riskPercent = parseFloat(riskSelect.value) || 1;
    let entry = parseFloat(entryInput.value) || 0;
    let stop = parseFloat(stopInput.value) || 0;

    // Risk amount
    let riskAmount = (riskPercent / 100) * balance;

    // Stop distance
    let stopDistance = Math.abs(entry - stop);

    // Position size
    let positionSize = stopDistance > 0 ? riskAmount / stopDistance : 0;

    // Take Profit (2R reward)
    let takeProfit = entry + (entry - stop) * 2;

    // Update UI
    riskAmountEl.innerText = "$" + riskAmount.toFixed(2);

    positionEl.innerText = positionSize.toFixed(6);

    tpEl.innerText = takeProfit.toFixed(2);
}


// Auto update calculator
[balanceInput, riskSelect, entryInput, stopInput].forEach(el => {
    el.addEventListener("input", calculateTrade);
});

// run once on load
calculateTrade();


// ===============================
// CHECKLIST LOGIC (optional upgrade)
// ===============================

const checkboxes = document.querySelectorAll("input[type='checkbox']");

function checkTradeReadiness() {
    let allChecked = true;

    checkboxes.forEach(cb => {
        if (!cb.checked) allChecked = false;
    });

    if (allChecked) {
        console.log("✔ Ready to trade");
    } else {
        console.log("⛔ Not ready yet");
    }
}

checkboxes.forEach(cb => {
    cb.addEventListener("change", checkTradeReadiness);
});


// ===============================
// UNLOCK BUTTON
// ===============================

function unlockTrade() {
    alert("Trading Terminal Unlocked 🔓");
}

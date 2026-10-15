window.addEventListener("load", function() {

    const clicker = document.getElementById("coinimage");
    const doubleclicker = document.getElementById("double");
    const multipleclicker = document.getElementById("multiple");
    const autoclicker = document.getElementById("auto");
    const speedclicker = document.getElementById("speed");
    const amount = document.getElementById("amount");
    const upgrades = document.getElementById("upgradecounter");
    const clickCountDisplay = document.getElementById("clickcount");
    const helpButton = document.getElementById("help");
    const doubleNumber = document.getElementById("doublenumber")
    const multipleNumber = document.getElementById("multiplenumber")
    const autoNumber = document.getElementById("autonumber")
    const speedNumber = document.getElementById("speednumber")


    /* ===== REWARDS DOM ===== */
    const rewardsArea = document.getElementById("rewards");
    const messageBox = document.getElementById("message");

    let money = 0;
    let clickValue = 1;  
    let totalClicks = 0;
    

    clicker.addEventListener("click", function click() {
        totalClicks += 1;
        money += clickValue;
        amount.innerHTML = money;
        clickCountDisplay.innerHTML = totalClicks;
        checkRewards();
    });

    // Every Upgrade 
    let doubleClickerCount = 0;
    let multipleClickerCount = 0;
    let autoClickerCount = 0;
    let speedClickerCount = 0;

    // REWARD TRACKING 
    let rewardsEarned = {
        firstCoin: false,
        fiftyCoins: false,
        rich: false,
        upgrades: false,
        auto: false
    };

    // Upgrade 1
    let doublecost = 5;
    doubleclicker.addEventListener("click", function click() {
        if (money >= doublecost){
            money -= doublecost;      
            clickValue += 1;  
            amount.innerHTML = money;
            doubleClickerCount += 1;
            UpgradeTotal();
            doublecost = Math.floor(doublecost * 2);
            checkRewards();
            doubleNumber.innerHTML = "- " + doublecost;

        }
    });

    // Upgrade 2
    let multiplecost = 25;
    multipleclicker.addEventListener("click", function click() {
        if (money >= multiplecost){
            money -= multiplecost;      
            clickValue += 8;
            amount.innerHTML = money;
            multipleClickerCount += 1;
            UpgradeTotal();
            multiplecost = Math.floor(multiplecost * 2);
            checkRewards();
            multipleNumber.innerHTML = "- " + multiplecost;

        }
    });

    // Upgrade 3 
    let autocost = 100;
    autoclicker.addEventListener("click", function click() {
        if (money >= autocost){
            money -= autocost;      
            amount.innerHTML = money;
            autoClickerCount += 1;
            UpgradeTotal();

            setInterval(function click() {
                money += clickValue;
                amount.innerHTML = money;
                checkRewards();
            }, 1000);

            autocost = Math.floor(autocost * 2);
            checkRewards();
            autoNumber.innerHTML = "- " + autocost;

        }
    });

    // Upgrade 4 
    let speedcost = 500;
    speedclicker.addEventListener("click", function click(){
        if (money >= speedcost){
            money -= speedcost;      
            amount.innerHTML = money;
            speedClickerCount += 1;
            UpgradeTotal();

            setInterval(function click() {
                money += clickValue;
                amount.innerHTML = money;
                checkRewards();
            }, 500);

            speedcost = Math.floor(speedcost * 2);
            checkRewards();
            speedNumber.innerHTML = "- " + speedcost;

        }
    });

    // Upgrades Total 
    function UpgradeTotal() {
        let total = doubleClickerCount + multipleClickerCount + autoClickerCount + speedClickerCount;
        upgrades.innerHTML = total;
    }

    /*REWARD FUNCTIONS (updated) */

    function earnReward(text, icon) {
        const reward = document.createElement("div");
        reward.classList.add("reward");
        reward.textContent = icon;
        rewardsArea.appendChild(reward);

        messageBox.textContent = "🎉 Congratulations! You earned: " + text;
        messageBox.style.display = "block";

        setTimeout(function () {
            messageBox.style.display = "none";
        }, 3000);
    }

    function checkRewards() {

        let totalUpgrades = doubleClickerCount + multipleClickerCount + autoClickerCount + speedClickerCount;

        if (money >= 1 && !rewardsEarned.firstCoin) {
            earnReward("First Coin", "🪙");
            rewardsEarned.firstCoin = true;
        }

        if (money >= 50 && !rewardsEarned.fiftyCoins) {
            earnReward("50 Coins Collected", "💰");
            rewardsEarned.fiftyCoins = true;
        }

        if (money >= 200 && !rewardsEarned.rich) {
            earnReward("Rich Player", "👑");
            rewardsEarned.rich = true;
        }

        if (totalUpgrades >= 3 && !rewardsEarned.upgrades) {
            earnReward("Upgrade Master", "⚙️");
            rewardsEarned.upgrades = true;
        }

        if (autoClickerCount >= 1 && !rewardsEarned.auto) {
            earnReward("Automation Unlocked", "🤖");
            rewardsEarned.auto = true;
        }
    }

    //Help Button
    let showHelp = false;

    helpButton.addEventListener("click", function(){
        if (!showHelp) {
            helpButton.innerHTML = `
                <h3> Coin Game Instructions </h3>
                <p><strong>Goal:</strong> Earn as many coins as you can!</p>
                <p>1. Start by Clicking the coin</p>
                <p>2. Use your coins to purchase upgrades</p>
                <h4><strong>Upgrades:</strong></h4>
                <p><strong>Double Click:</strong> Doubles the amount of coins earned per click</p>
                <p><strong>Multiple Boost:</strong> Multiplies the amount coins per click</p>
                <p><strong>Auto Clicker:</strong> Automatically earns coins every 5 seconds</p>
                <p><strong>Speed Boost:</strong> Earn coins automatically at a faster rate each upgrade</p>
                <p><strong>Unlock Rewards & Have Fun! </strong></p>

            `;
        showHelp = true;

    } else {
        helpButton.innerHTML = "Help";
        showHelp = false;
    }
    
    });
});

//add upgrade
// upgrade costs
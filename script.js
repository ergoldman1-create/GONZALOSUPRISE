// =====================================================
// OPERATION: HEARTBREAKER
// Core Engine
// =====================================================

const game = document.getElementById("game");

// -----------------------------
// Scene Manager
// -----------------------------

function changeScene(html) {
    game.innerHTML = html;
}

// -----------------------------
// Boot Text
// -----------------------------

const bootLines = [
    "TACTICAL COMMAND SYSTEM v4.1",
    "",
    "Initializing systems...",
    "Loading encrypted database...",
    "Connecting to satellite uplink...",
    "Loading tactical HUD...",
    "Authenticating operator...",
    "",
    "STATUS: ONLINE",
    "",
];

// -----------------------------
// Typing Effect
// -----------------------------

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

async function typeLine(element,text){

    const cursor=document.createElement("span");
    cursor.className="cursor";

    element.appendChild(cursor);

    for(let i=0;i<text.length;i++){

        cursor.insertAdjacentText("beforebegin",text[i]);

        await sleep(20);

    }

    cursor.remove();

}

// -----------------------------
// Boot Scene
// -----------------------------

// -----------------------------
// Boot Scene
// -----------------------------

async function bootScene() {

    changeScene(`
        <div class="terminal" id="terminal"></div>

        <div style="text-align:center; margin-top:40px;">
            <button class="menuButton" onclick="startMission()">
                ▶ START MISSION
            </button>
        </div>
    `);

    const terminal = document.getElementById("terminal");

    for (const line of bootLines) {

        const p = document.createElement("p");

        terminal.appendChild(p);

        await typeLine(p, line);

        await sleep(250);

    }

}

// -----------------------------
// Start Mission
// -----------------------------

function startMission() {
    missionScene();
}


// -----------------------------
// Mission Briefing
// -----------------------------

function missionScene(){

    changeScene(`

    <div class="screen">

        <div class="title">
            MISSION BRIEFING
        </div>

        <div class="subtitle">
            Operation ROMANCE
        </div>

        <p><strong>Operator:</strong> Gonzalo</p>

        <p><strong>Mission:</strong> Achieve Romance</p>

        <p><strong>Difficulty:</strong> Veteran</p>

        <br>

        <button id="startMission">
            ▶ BEGIN MISSION
        </button>

    </div>

    `);

    document.getElementById("startMission").addEventListener("click", objectivesScene);

}

function missionKey(e){

    if(e.code!=="Enter") return;

    document.removeEventListener("keydown",missionKey);

    objectivesScene();

}

// =====================================================
// Live Clock
// =====================================================

function updateClock(){

    const now=new Date();

    const time=now.toLocaleTimeString();

    const clock=document.getElementById("clock");

    if(clock){

        clock.textContent=time;

    }

}

setInterval(updateClock,1000);

updateClock();

// =====================================================
// Mouse Parallax
// =====================================================

document.addEventListener("mousemove",e=>{

    const grid=document.getElementById("grid");

    if(!grid) return;

    const x=(e.clientX/window.innerWidth-.5)*20;

    const y=(e.clientY/window.innerHeight-.5)*20;

    grid.style.transform=`translate(${x}px,${y}px)`;

});

// =====================================================
// START GAME
// =====================================================

bootScene();
// =====================================================
// OBJECTIVES
// =====================================================

function objectivesScene(){

    changeScene(`

    <div class="screen">

        <div class="title">
            PRIMARY OBJECTIVES
        </div>

        <div id="objectives">

            <p id="o1">⬜ KEEP CALM</p>
            <p id="o2">⬜ DETERMINE RIGHT FROM WRONG</p>
            <p id="o3">⬜ DRIVE TO HER HOUSE</p>
            <p id="o4">⬜ ROMANCE CONFIRMED</p>

        </div>

    </div>

    `);

    const tasks=[
        "✅ KEEP CALM",
        "✅ DETERMINE RIGHT FROM WRONG",
        "✅ DRIVE TO HER HOUSE",
        "✅ ROMANCE CONFIRMED"
    ];

    tasks.forEach((task,index)=>{

        setTimeout(()=>{

            document.getElementById("o"+(index+1)).textContent=task;

        },(index+1)*1200);

    });

    setTimeout(missionCompleteScene,6500);

}

// =====================================================
// MISSION COMPLETE
// =====================================================

function missionCompleteScene(){

    changeScene(`

    <div class="screen">

        <div class="title">
            ★ MISSION COMPLETE ★
        </div>

        <div class="subtitle">
            OPERATION ROMANCE
        </div>

        <h2 style="font-size:70px;text-align:center;margin-top:40px;">
            SUCCESS
        </h2>

    </div>

    `);

    setTimeout(xpScene,2500);

}

// =====================================================
// XP SCREEN
// =====================================================

function xpScene(){

    changeScene(`

    <div class="screen">

        <div class="title">
            EXPERIENCE GAINED
        </div>

        <h1 id="xpNumber">0 XP</h1>

        <br>

        <div class="xpBar">

            <div id="xpFill"></div>

        </div>

    </div>

    `);

    let xp=0;

    const timer=setInterval(()=>{

        xp+=25;

        document.getElementById("xpNumber").textContent=xp+" XP";

        document.getElementById("xpFill").style.width=(xp/10)+"%";

        if(xp>=1000){

            clearInterval(timer);

            setTimeout(levelUpScene,1200);

        }

    },25);

}

// =====================================================
// LEVEL UP
// =====================================================

function levelUpScene(){

    changeScene(`

    <div class="screen">

        <div class="title">
            LEVEL UP
        </div>

        <div style="text-align:center;margin-top:50px;">

            <div style="font-size:50px;">
                LEVEL
            </div>

            <div id="levelNumber"
                 style="font-size:120px;font-weight:bold;">
                 24
            </div>

        </div>

    </div>

    `);

    let level=24;

    const timer=setInterval(()=>{

        level++;

        document.getElementById("levelNumber").textContent=level;

        clearInterval(timer);

        setTimeout(achievementScene,1800);

    },900);

}

// =====================================================
// ACHIEVEMENTS
// =====================================================

function achievementScene(){

    changeScene(`

    <div class="screen">

        <div class="title">
            ACHIEVEMENTS UNLOCKED
        </div>

        <div id="achievementList"></div>

    </div>

    `);

    const achievements=[

        "Operation ROMANCE",

        "ROMANCE Confirmed",

        "Good guy persona achieved",

        "Player Two Unlocked",

        "Mission Accomplished"

    ];

    achievements.forEach((achievement,index)=>{

        setTimeout(()=>{

            const card=document.createElement("div");

card.className="achievement hidden";

            card.innerHTML=`
                <h2>${achievement}</h2>
                <p>UNLOCKED</p>
            `;

            document
                .getElementById("achievementList")
                .appendChild(card);
                setTimeout(()=>{

    card.classList.remove("hidden");

},50);

        },index*1000);

    });

    setTimeout(afterActionScene,7000);

}

// =====================================================
// AFTER ACTION REPORT
// =====================================================

function afterActionScene(){

   changeScene(`

<div class="screen">

    <div class="title">
        AFTER ACTION REPORT
    </div>

    <p><strong>MISSION:</strong> Operation ROMANCE</p>

    <p><strong>STATUS:</strong> SUCCESS</p>

    <p><strong>OPERATOR:</strong> Gonzalo</p>

    <p><strong>OBJECTIVE:</strong> Relationship Confirmed</p>

    <p><strong>RATING:</strong> ★★★★★</p>

    <p><strong>NEXT OBJECTIVE:</strong> Keep her happy.</p>

    <br><br>

    <div style="text-align:center;">

        <button class="menuButton" onclick="endingScene()">
            ▶ FINAL CEREMONY
        </button>

    </div>

</div>

`);

}

function endingScene(){

    changeScene(`

    <div class="screen">

        <div class="title">

            🎉 MISSION COMPLETE 🎉

        </div>

        <div style="text-align:center;">

        <h1 style="font-size:80px;">
        ❤️
        </h1>

        <br>

        <h1>

        Congratulations Gonzalo!

        </h1>

        <br>

        <h2>

        You officially completed

        <br>

        <span style="color:#8effa5;">

        OPERATION HEARTBREAKER

        </span>

        </h2>

        <br>

        <p>

        Wishing you both the best ❤️

        </p>

        <br>

        <button class="menuButton"

        onclick="location.reload()">

        ▶ PLAY AGAIN

        </button>

        </div>

    </div>

    `);

}

// =====================================================
// FINAL SCENE
// =====================================================

function endingScene(){

    changeScene(`

    <div class="screen">

        <div class="title">
            CONGRATULATIONS
        </div>

        <div style="text-align:center;">

        <h2 style="font-size:60px;">
        ❤️❤️❤️
        </h2>

        <br>

        <h1>
        GONZALO
        </h1>

        <br>

        <h2>

        Relationship Status:

        CONFIRMED

        </h2>

        <br>

        <h3>

        Mission Completed Successfully.

        </h3>

        <br>

        <p>

        Good luck on your next mission, soldier.

        </p>

        <br>

        <small>

        Press ↑ ↑ ↓ ↓ ← → ← → B A...

        </small>

        </div>

    </div>

    `);

}

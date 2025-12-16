
let overlay= create("div");
overlay.dataset.nosnippet= true;
overlay.id= "overlay"; overlay.className= "hidden";
document.body.append(overlay);
overlay.innerHTML=`
<div class="normalflex modal">

	
<div class="centerflex" data-nosnippet>
  <b>select stations to hide</b>
</div>
<div class="normalflex" data-nosnippet>
  <select class="select" multiple></select>
  <button class="save">SAVE</button>
</div>
<div class="centerflex msg" data-nosnippet>
  <span class="nr" data-nosnippet>0</span>&nbsp; stations hidden!
</div>
	

<div class="centerflex" data-nosnippet>
  <b>Close tab after ?? minutes</b>
</div>
<div class="normalflex" data-nosnippet>
  <input class="input" type="number">
  <button class="sleep">SLEEP</button>
</div>



<div class="lastmod" data-nosnippet></div>
<div class="centerflex close" data-nosnippet>&times;</div>
	
</div>`;


let stationList= select(".modal .select");
let save= select(".modal .save");
let msg= select(".modal .nr");

let lsblock=()=> genre.innerHTML + "block";
let selectedStations=()=> [...stationList.selectedOptions].map(i=> i.index);



function manageHidden(){
stationList.value= stationList.innerHTML= "";
let optgroup= create("optgroup");
optgroup.label= "Select stations to hide:";
stationList.append(optgroup);
spans.forEach(i=>{
let option= create("option");
option.innerHTML= i.textContent;
stationList.append(option);
});

let blocklist= localStorage[lsblock()];
blocklist= blocklist ? JSON.parse(blocklist) : ibl[liststring[lang]];

let options= selectAll(".modal option");
blocklist.forEach(i=>{
options[i].selected= true;
spans[i].classList.add("hidden");
});

hide.innerHTML= "ALL";
}







hide.onclick=()=>{
let hidden= select(".span.hidden");
if(hidden){
hide.innerHTML= "FEW";
spans.forEach(i=>i.classList.remove("hidden"));
}
else{
hide.innerHTML= "ALL"
selectedStations().forEach(i=> spans[i].classList.add("hidden"));
}
};



	
//hide.onclick=()=> manageHidden(false);
select(".about").onclick=()=> window.open("about");
stationList.oninput=()=> save.innerHTML= "SAVE";

select(".settings").onclick=()=>{
overlay.className= "unhidden";
save.innerHTML= "SAVE";
msg.innerHTML= selectedStations().length;
setTimeout(()=>{
select(".modal").classList.remove("popout");
select(".modal").classList.add("popin");
},500);
};

select(".modal .close").onclick=()=>{
select(".modal").classList.remove("popin");
select(".modal").classList.add("popout");
setTimeout(()=>{
overlay.className= "hidden";
},500);
};


save.onclick=()=>{
save.innerHTML= "SAVED";
hide.innerHTML= "ALL";
msg.innerHTML= selectedStations().length;
spans.forEach(i=> i.classList.remove("hidden")); 
selectedStations().forEach(i=> spans[i].classList.add("hidden"));
localStorage[lsblock()]= JSON.stringify(selectedStations());
};

manageHidden(true);

//Sleeptimer-------------------------------------------
select(".sleep").onclick=()=>{
let mins= select(".input").value;
let html= select("html");
if(mins){
let tab= window.open(location.href);
let time= mins*60*1000;
let left= time;
writeIt(time,html,left);

setTimeout(()=>{
tab.close();
},time);
}
else alert("INVALID TIME");
};



function writeIt(x,y,z){
if(x>1000){
y.innerHTML= `>>Tab opened in a new tab!<br>
>>It will close in ${formatTime(x)}`;
x= x-1000;
setTimeout(()=>{
writeIt(x,y,z);
document.title= "Sleep Timer - KD Radio";
},1000);
}
else{
y.innerHTML= `>>Tab opened in a new tab!<br>
>>Closed after ${formatTime(z)}`;
document.title= "Sleep Timer - KD Radio";
}
}


//Last updated-----------------------

let _file= location.href.includes("bollywood") ? "bollywood.js" : "suriname.js";
let _api= "https://api.github.com/repos/nostalgickd/nostalgickd.github.io/commits?path=";

fetch(_api + _file) 
.then(r=> r.json())
.then(d=> {
let lastmod= new Date(d[0].commit.author.date);

let _date= lastmod.toLocaleDateString("en-US",{
//weekday: 'long',
year: 'numeric',
month: 'short',
day: 'numeric'
});

let _time= lastmod.toLocaleTimeString("en-US",{
hour: '2-digit',
minute: '2-digit'
});

select(".lastmod").innerHTML= `Stations updated on ${_date} @ ${_time}`;
});


// Lightweight GPU-accelerated snow function based on the js-snow-bookmarklet from wonderful72pike
function startSnow(letter, color) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.overflow = 'hidden';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';

    // Inject CSS animation
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fall {
        0% { transform: translateY(-10px); opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0.8; }
      }
    `;
    document.head.appendChild(style);

    const particles = [];
    const maxParticles = 50; // max snowflakes at a time

    function createParticle() {
        if (particles.length >= maxParticles) return; // limit snowflakes

        const particle = document.createElement('span');
        const size = 12 + Math.random() * 12; // 12px to 24px
        const duration = 5 + Math.random() * 5; // 5s to 10s
        const xPos = Math.random() * 100; // horizontal %

        particle.textContent = letter;
        particle.style.position = 'absolute';
        particle.style.left = xPos + 'vw';
        particle.style.fontSize = size + 'px';
        particle.style.color = color;
        particle.style.pointerEvents = 'none';
        particle.style.whiteSpace = 'nowrap';
        particle.style.transform = 'translateY(-10px)';
        particle.style.animation = `fall ${duration}s linear forwards`;

        container.appendChild(particle);
        particles.push(particle);

        // Remove particle after animation
        particle.addEventListener('animationend', () => {
            container.removeChild(particle);
            const index = particles.indexOf(particle);
            if (index > -1) particles.splice(index, 1);
        });
    }

    const interval = setInterval(createParticle, 150);

    return {
        stop: () => clearInterval(interval) // allow stopping the snow
    };
}

/* Usage */
const snow = startSnow('❄️', 'white');

// Stop snow after 10 seconds
// setTimeout(() => snow.stop(), 10000);



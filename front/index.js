let canvas , ctx;
let reload=false;

const l = 300;
const blockUnit = 15;
const blockNum = l/15;//20
// let snakePosX=0,snakePosY=0;
let snakBody =[{snakePosX:0,snakePosY:0}];
let foodPosX,foodPosY;
let speadX=blockUnit,speadY=0;

function foodLocation(){
    foodPosX = Math.floor(Math.random()*blockNum)*15;
    foodPosY = Math.floor(Math.random()*blockNum)*15;
}

// function screenKeyControll(e){
    // console.log("event:",e.path[1].id)
//         switch(e.path[0].id || e.path[1].id) {
//             case "Top":
//                 if(speadY==-blockUnit || speadY==blockUnit) return;
//                 speadX=0
//                 speadY=-blockUnit;
//                 break;
//             case "Down":
//                 if(speadY==-blockUnit || speadY==blockUnit) return;
//                 speadX=0
//                 speadY=blockUnit;
//                 break;
//             case "Right":
//                 if(speadX==-blockUnit || speadX==blockUnit) return;
//                 speadX=blockUnit;
//                 speadY=0;
//                 break;
//             case "Left":
//                 if(speadX==-blockUnit || speadX==blockUnit) return;
//                 speadX=-blockUnit;
//                 speadY=0;
//                 break;
//         };
// }

window.onload = () => {
    //Screen Arrow-keys Controll for Mobile:
    document.getElementById("Top").addEventListener("click", (e)=>{
        if(speadY==-blockUnit || speadY==blockUnit) return;
        speadX=0
        speadY=-blockUnit;
    });
    document.getElementById("Right").addEventListener("click", (e)=>{
        if(speadX==-blockUnit || speadX==blockUnit) return;
            speadX=blockUnit;
            speadY=0;
    });
    document.getElementById("Down").addEventListener("click", (e)=>{
        if(speadY==-blockUnit || speadY==blockUnit) return;
            speadX=0
            speadY=blockUnit;
    });
    document.getElementById("Left").addEventListener("click", (e)=>{
        if(speadX==-blockUnit || speadX==blockUnit) return;
            speadX=-blockUnit;
            speadY=0;
    });


     //socket.io:
const socket = io("http://localhost:5000", { //wss://react-admin.iran.liara.run ******   http://localhost:5000
    withCredentials: true,
    forceNew: true,
    reconnectionAttempts: "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
    timeout: 10000, //before connect_error and connect_timeout are emitted.
    transports: ['websocket']
  });// ok!
socket.on("init", (msg)=> console.log(msg) );
socket.on("palse", update);

//DOM:
    canvas = document.getElementById("canvas");
    canvas.width = canvas.height = l
    ctx = canvas.getContext("2d");

    foodLocation();

   function update(){
            for(let i = 0;i<(snakBody.length-1); i++){
                snakBody[i].snakePosX = snakBody[i+1].snakePosX;
                snakBody[i].snakePosY = snakBody[i+1].snakePosY;
            }
            snakBody[snakBody.length-1].snakePosX += speadX;
            snakBody[snakBody.length-1].snakePosY += speadY;
            grow();
    }
}

function grow(){
//resume Game:    
    if(reload) return  location.reload();

//Game plate:
    ctx.fillStyle = "#16242d";
    ctx.fillRect(0, 0,l,l);
    
//food:
    ctx.fillStyle = "orange";
    ctx.fillRect(foodPosX,foodPosY,blockUnit,blockUnit);
    
//snake:
    if( snakBody[snakBody.length-1].snakePosX <0 || snakBody[snakBody.length-1].snakePosX == l  || snakBody[snakBody.length-1].snakePosY <0  || 
        snakBody[snakBody.length-1].snakePosY == l || intersecting(snakBody[snakBody.length-1])  ) {
        // return;
            alert("gameOver!");
        reload=true;
    }
    if(snakBody[snakBody.length-1].snakePosX == foodPosX && snakBody[snakBody.length-1].snakePosY == foodPosY) {
        foodLocation();
        snakBody.unshift({snakePosX:snakBody[0].snakePosX-speadX,snakePosY:snakBody[0].snakePosY-speadY})
    }

    //process of game:
    ctx.fillStyle = "green";
    snakBody.map(item => {
         ctx.fillRect(item.snakePosX,item.snakePosY,blockUnit,blockUnit);
    })

//Controll-Snake:
window.addEventListener("keydown", (e)=>{
        switch(e.key) {
        case "ArrowUp":
            if(speadY==-blockUnit || speadY==blockUnit) return;
            speadX=0
            speadY=-blockUnit;
            break;
        case "ArrowDown":
            if(speadY==-blockUnit || speadY==blockUnit) return;
            speadX=0
            speadY=blockUnit;
            break;
        case "ArrowRight":
            if(speadX==-blockUnit || speadX==blockUnit) return;
            speadX=blockUnit;
            speadY=0;
            break;
        case "ArrowLeft":
            if(speadX==-blockUnit || speadX==blockUnit) return;
            speadX=-blockUnit;
            speadY=0;
            break;
    }
});

function intersecting(headOfSnak){
    for(i=0;i<snakBody.length-2;i++){
        if(snakBody[i].snakePosX == snakBody[snakBody.length-1].snakePosX && snakBody[i].snakePosY == snakBody[snakBody.length-1].snakePosY) return true
    }
    return false
}
}


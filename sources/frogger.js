document.addEventListener("click",startGame);



let imageSpr = new Image(399,467);
imageSpr.src = "../assets/sprites.png";



let imageDead = new Image(30,30);
imageDead.src = "../assets/dead.png";


const interfaceCtx= document.getElementById("interfaceCanvas").getContext("2d");

const spriteCtx = document.getElementById("spriteCanvas").getContext("2d");

const backgroundCtx = document.getElementById("backgroundCanvas").getContext("2d"); 



function isPointCollision(px, py, bx, by, bw, bh){

    

    

    if(((bx + bw)>= px && bx <= px) && ((by + bh)>= py && by <= py)){
        
        return true
        
    }else{
        return false
    }


}



function isBoxCollision(b1x, b1y, b1w, b1h, b2x, b2y, b2w, b2h){

    let midpoint1x = (b1x + b1w/2);
    let midpoint1y = (b1y + b1h/2);
    
    let midpoint2x = (b2x + b2w/2);
    let midpoint2y = (b2y + b2h/2);

    if(Math.abs(b1w/2 + b2w/2) >= Math.abs(midpoint1x - midpoint2x) && Math.abs(b1h/2) + Math.abs(b2h/2) >= Math.abs(midpoint1y - midpoint2y)){
       
        return true
        
    }else{
        
        return false;
        
    }



}
function showStartScreen(){

   
    
    interfaceCtx.fillRect(0,0,400,565);

    interfaceCtx.fillStyle = "black";

    interfaceCtx.drawImage(imageSpr,8,8,340,33,35,150,340,41);

    interfaceCtx.fillStyle = "green";
    
    interfaceCtx.fillRect(155,250,80,40);

    interfaceCtx.fillStyle = "black";
    interfaceCtx.font = "20px Georgia"
    interfaceCtx.fillText("Start",175,275);
    
   
    

    



}






let clock;
let Spritesmove;




function startGame(event){

    
    if(isPointCollision(event.offsetX,event.offsetY,155,250,80,40) && player.state === "start"){
        
        
        
        interfaceCtx.clearRect(0,0,400,565);
        
        
    


        player.state = "playing"
    
  
    
        renderBackground();
        renderScore();
    
        renderLives();
        renderFrog();
        
    
        clock = setInterval(renderTime,1000);
        document.addEventListener("keydown", moveFrog);
        Spritesmove = setInterval(renderSprites,60);
        
        
        
    

    
    
    
            
    }else if(isPointCollision(event.offsetX,event.offsetY,125,250,80,40) && player.state === "end"){

        interfaceCtx.clearRect(0,0,400,565);
        
        
    


        player.state = "playing"
    
        renderBackground();
        renderScore();
    
        renderLives();
        
        imgX = 10;
        imgY = 367;
        frog.x = 182;
        frog.y = 520;
        renderFrog();
        
       
        clock = setInterval(renderTime,1000);
        document.addEventListener("keydown", moveFrog);
        Spritesmove = setInterval(renderSprites,60);
        

    };



}


let frog ={

    x:182,
    y:520,
    direction:"up",
    speed:30,
    width:30,
    height:20,

}

let player = {

    time:61,
    lives:5,
    state:"start",
    score:0,
    safeHomes:new Array(4),





}


function renderBackground(){
    
    backgroundCtx.fillStyle = "black";
    backgroundCtx.fillRect(0,0,400,565);
    

    backgroundCtx.drawImage(imageSpr,0,120,399,35,0,510,400,35);
    
    
    
    
    backgroundCtx.fillStyle ="blue";
    backgroundCtx.fillRect(0,50,400,230);

    backgroundCtx.drawImage(imageSpr,8,8,340,33,35,0,340,41);
    backgroundCtx.drawImage(imageSpr,0,120,399,35,0,270,400,35);
    backgroundCtx.drawImage(imageSpr,0,53,399,60,0,41,399,60);

}

let imgX = 10;
let imgY = 367;

function renderFrog(){


    interfaceCtx.drawImage(imageSpr,imgX,imgY,frog.width,frog.height,frog.x,frog.y,frog.width,frog.height);


}


let livesDistance =0;

function renderLives(){


    
    backgroundCtx.clearRect(0,542,75,10);
    
    backgroundCtx.fillStyle = "black";
    backgroundCtx.fillRect(0,542,75,10);



    for(let i = 0; i < player.lives; i++){

        backgroundCtx.drawImage(imageSpr,6,330,30,28,livesDistance,542,10,10);

        livesDistance+=10;
    } 

    livesDistance =0;
    
    
    





}

function renderScore(){

    
    backgroundCtx.clearRect(0,550,50,15);
    backgroundCtx.fillStyle = "black";
    backgroundCtx.fillRect(0,550,50,15);
    

    backgroundCtx.fillStyle = "#FFFF00";
    backgroundCtx.font ="10px Georgia"
    backgroundCtx.fillText(("Score: "+ player.score),0,560);
    
    
   

    


}
function renderTime(){
    
    
    gameEnd()
    
    backgroundCtx.clearRect(310,540,90,40);
    backgroundCtx.fillStyle = "black";
    backgroundCtx.fillRect(310,540,90,40);  
    backgroundCtx.fillStyle = "#FFFF00";
    backgroundCtx.font ="20px Georgia"
    player.time = player.time -1;
    backgroundCtx.fillText(("Time: "+ player.time),310,560,100);
    
    
    
    
   
   


}


//Part 2 Starts










let maintain;

function moveFrog(event){
    
   

    if(event.code == "ArrowRight"){
        
        interfaceCtx.clearRect(frog.x,frog.y,frog.width,frog.height);
        interfaceCtx.save();
        frog.x += frog.speed;

        frog.direction = "Right";
        imgX = 10;
        imgY = 333;
        
        renderFrog();
        

    } else  if(event.code == "ArrowUp"){
        
       
        interfaceCtx.clearRect(frog.x,frog.y,frog.width,frog.height);
        interfaceCtx.save();
        frog.y = frog.y - frog.speed;
        
        frog.direction = "Up";
        imgX = 10;
        imgY = 367;
        renderFrog();
        
        
        

    }else  if(event.code == "ArrowLeft"){
        
        interfaceCtx.clearRect(frog.x,frog.y,frog.width,frog.height);
        interfaceCtx.save();
        frog.x = frog.x - frog.speed;

        frog.direction = "Left";
        imgX = 78;
        imgY = 335;
        renderFrog();
        
      
        

    }else if(event.code == "ArrowDown"){
        
        interfaceCtx.clearRect(frog.x,frog.y,frog.width,frog.height);
        interfaceCtx.save();
        
        frog.y += frog.speed

        frog.direction = "Down";
        imgX = 78;
        imgY = 366;

        renderFrog();
    
        
       
        

    }
    
    
   
        
        
        
    if(frog.x <= 0){
            
        interfaceCtx.clearRect(frog.x,frog.y,frog.width,frog.height);
            
        frog.x = frog.x + frog.speed;
            
        renderFrog();
    }
        
    
    if(frog.x >= 400){
            
            
        interfaceCtx.clearRect(frog.x,frog.y,frog.width,frog.height);
            
        frog.x = frog.x - frog.speed;
            
        renderFrog();

    }

    if(frog.y >= 540){
            
            
        interfaceCtx.clearRect(frog.x,frog.y,frog.width,frog.height);
            
        frog.y = frog.y -frog.speed;
            
        renderFrog();
        
    }
    
    if(frog.y <= 0){
            
        interfaceCtx.clearRect(frog.x,frog.y,frog.width,frog.height);
            
        frog.y = frog.y + frog.speed;
            
        renderFrog();
        
    }


    
    if(isBoxCollision(frog.x,frog.y,frog.width,frog.height,0,60,400,30)){
            
        if(isBoxCollision(frog.x,frog.y,frog.width,frog.height,45,60,45,30)){
                
                
            interfaceCtx.clearRect(frog.x,frog.y,frog.width,frog.height);


                
                
            if(player.safeHomes[0] == 1){
                    
                    
                frog.y = 110 
                drawAnderaseSkull()
                    
                
                player.lives = player.lives -1;
                    
                renderLives();
                
                    
                   

                
            }else{
                    
                player.score += 100;
                    
                player.safeHomes[0] = 1;
                    
                interfaceCtx.drawImage(imageSpr,10,367,frog.width,frog.height,50,60,frog.width,frog.height);
                    
                renderScore();
                   


                    
                
            }
                
            frog.x = 182;
                
            frog.y = 520;
                
            renderFrog();
                

            


            
            
        }else if(isBoxCollision(frog.x,frog.y,frog.width,frog.height,130,60,50,30)){
                
                
            interfaceCtx.clearRect(frog.x,frog.y,frog.width,frog.height);


                
            if(player.safeHomes[1] == 1){
                    
                frog.y = 110  
                drawAnderaseSkull()
                    
                player.lives = player.lives -1;
                    
                renderLives();
                   
                
                   

                
            }else{
                    
                player.score += 100;
                    
                player.safeHomes[1] = 1;
                    
                interfaceCtx.drawImage(imageSpr,10,367,frog.width,frog.height,140,60,frog.width,frog.height);
                    
                renderScore();
                  


                    
                
            }
                
            frog.x = 182;
                
            frog.y = 520;
                
            renderFrog();

              

                

               
            
        }else if(isBoxCollision(frog.x,frog.y,frog.width,frog.height,220,60,40,30)){
                
            
            interfaceCtx.clearRect(frog.x,frog.y,frog.width,frog.height);

                
            if(player.safeHomes[2] == 1){
                    
                frog.y = 110 
                drawAnderaseSkull()
                    
                player.lives = player.lives -1;
                    
                renderLives();
                
                    
                   

                
            }else{
                    
                player.score += 100;
                    
                player.safeHomes[2] = 1;
                    
                interfaceCtx.drawImage(imageSpr,10,367,frog.width,frog.height,220,60,frog.width,frog.height);
                    
                renderScore();
                    


                    
                
            }
                
            
            frog.x = 182;
                
            frog.y = 520;
                
            renderFrog();


                


        }else if(isBoxCollision(frog.x,frog.y,frog.width,frog.height,320,60,30,30)){
                
                
            interfaceCtx.clearRect(frog.x,frog.y,frog.width,frog.height);

                
            if(player.safeHomes[3] == 1){
                    
                frog.y = 110  
                drawAnderaseSkull()
                    
                player.lives = player.lives -1;
                    
                renderLives();

                
                    
                   

                
            }else{
                    
                player.score += 100;
                    
                player.safeHomes[3] = 1;
                    
                interfaceCtx.drawImage(imageSpr,10,367,frog.width,frog.height,325,60,frog.width,frog.height);
                    
                renderScore();
                  


                    
            }
                
            frog.x = 182;
                
            frog.y = 520;
                
            renderFrog();
               

            
                
            
        }else{
                
            interfaceCtx.clearRect(frog.x,frog.y,frog.width,frog.height);
                
            drawAnderaseSkull()
                
            player.lives = player.lives -1;
               
            
            renderLives();
                
            frog.x = 182;
                
            frog.y = 520;            
                
            renderFrog();
            
        }

        
    }
    
    
        
    if(frog.y < 270){

        clearInterval(maintain);
        
        maintain = setInterval(onLog,60);

    }
}

class Sprite{
    constructor(width,height,ix,iy,x,){
        this.width = width;
        this.height = height;
        this.ix = ix;
        this.iy = iy;
        this.x = x;
      


    }

    



}

function Lane(direction,speed,sprites,y,isInriver){

    this.direction = direction;
    this.speed = speed;
    this.sprites = sprites;
    this.y = y;
    this.isInriver = isInriver;

   



}

let lanes = [
    new Lane(-1,2,[new Sprite(34,26,8,261,350),new Sprite(34,26,8,261,250),new Sprite(34,26,8,261,150)],480,false),
    new Lane(1,3,[new Sprite(33,30,42,258,200)],450,false),
    new Lane(-1,8,[new Sprite(31,30,77,260,150),new Sprite(31,30,77,260,250)],415,false),
    new Lane(-1,4,[new Sprite(32,25,5,300,200)],380,false),
    new Lane(-1,3,[new Sprite(53,26,104,300,25),new Sprite(53,26,104,300,100), new Sprite(53,26,104,300,175),new Sprite(53,26,104,300,250)],350,false),
    new Lane(-1,4,[new Sprite(34,25,8,263,350)],320,false),
    new Lane(-1,3,[new Sprite(120,30,10,190,50), new Sprite(120,30,10,190,250)],245,true),
    new Lane(-1,6,[new Sprite(120,30,5,190,50), new Sprite(120,30,5,190,250)],210,true),
    new Lane(1,4,[new Sprite(90,30,5,222,50),new Sprite(90,30,5,222,200),new Sprite(90,30,5,222,340)],185,true),
    new Lane(-1,5,[new Sprite(180,30,5,160,20),new Sprite(180,30,5,160,220)],150,true),
    new Lane(1,3,[new Sprite(120,30,5,190,50), new Sprite(120,30,5,190,250)],120,true),
    new Lane(1,7,[new Sprite(120,30,5,190,10), new Sprite(120,30,5,190,280)],90,true)
];




function renderSprites(){
    
    
    
    for(let index =0; index < lanes.length ; index++){

        if((lanes[index].direction) === 1){

            if(lanes[index].isInriver == true){

                
                for(let indexIn = 0; indexIn <= lanes[index].sprites.length -1; indexIn++){

                    
                    spriteCtx.clearRect(lanes[index].sprites[indexIn].x,lanes[index].y,lanes[index].sprites[indexIn].width,lanes[index].sprites[indexIn].height)
                    spriteCtx.save();
                    
                    if((lanes[index].sprites[indexIn].x) >= 400 ){
                        
                        lanes[index].sprites[indexIn].x = -(lanes[index].sprites[indexIn].width)
                        
                    
                    }
                    
                    lanes[index].sprites[indexIn].x += lanes[index].speed;
                   
                    
                    
                    spriteCtx.drawImage(imageSpr,lanes[index].sprites[indexIn].ix,lanes[index].sprites[indexIn].iy,lanes[index].sprites[indexIn].width,lanes[index].sprites[indexIn].height,lanes[index].sprites[indexIn].x ,lanes[index].y,lanes[index].sprites[indexIn].width,lanes[index].sprites[indexIn].height)
                    
                
                }

            }else if(lanes[index].isInriver == false){

                for(let indexIn = 0; indexIn <= lanes[index].sprites.length-1; indexIn++){

                    spriteCtx.clearRect(lanes[index].sprites[indexIn].x,lanes[index].y,lanes[index].sprites[indexIn].width,lanes[index].sprites[indexIn].height)
                    spriteCtx.save();

                    if((lanes[index].sprites[indexIn].x) >= 400 ){
                        
                        lanes[index].sprites[indexIn].x = -(lanes[index].sprites[indexIn].width)
                        
                    
                    }
                    
                    if(isBoxCollision(frog.x,frog.y,frog.width,frog.height,lanes[index].sprites[indexIn].x,lanes[index].y,lanes[index].sprites[indexIn].width,lanes[index].sprites[indexIn].height)){
                        
                        interfaceCtx.clearRect(frog.x,frog.y,frog.width,frog.height)
                        
                        drawAnderaseSkull()
                        
                        
                        
                        frog.x = 185;
                        frog.y = 516;
                        player.lives = player.lives -1;
                        renderLives();
                        renderFrog();
                        

                    }
                    
                    
                        
                        
                    lanes[index].sprites[indexIn].x += lanes[index].speed;
                    
                  

                    spriteCtx.drawImage(imageSpr,lanes[index].sprites[indexIn].ix,lanes[index].sprites[indexIn].iy,lanes[index].sprites[indexIn].width,lanes[index].sprites[indexIn].height,lanes[index].sprites[indexIn].x,lanes[index].y,lanes[index].sprites[indexIn].width,lanes[index].sprites[indexIn].height)


                }

            }



        } else if(lanes[index].direction === -1){

            if(lanes[index].isInriver == true){

                for(let indexIn = 0; indexIn <= lanes[index].sprites.length-1; indexIn++){

                    spriteCtx.clearRect(lanes[index].sprites[indexIn].x,lanes[index].y,lanes[index].sprites[indexIn].width,lanes[index].sprites[indexIn].height)
                    spriteCtx.save();

                    if((lanes[index].sprites[indexIn].x) <= -(lanes[index].sprites[indexIn].width) ){
                        
                        lanes[index].sprites[indexIn].x = 400 + (lanes[index].sprites[indexIn].width)
                        
                    
                    }
                    
                   

                    lanes[index].sprites[indexIn].x =  lanes[index].sprites[indexIn].x  - lanes[index].speed;
                    
                    
        
                    spriteCtx.drawImage(imageSpr,lanes[index].sprites[indexIn].ix,lanes[index].sprites[indexIn].iy,lanes[index].sprites[indexIn].width,lanes[index].sprites[indexIn].height,lanes[index].sprites[indexIn].x,lanes[index].y,lanes[index].sprites[indexIn].width,lanes[index].sprites[indexIn].height);
                }


            } else if(lanes[index].isInriver == false){

                for(let indexIn = 0; indexIn <= lanes[index].sprites.length-1; indexIn++){

                    spriteCtx.clearRect(lanes[index].sprites[indexIn].x,lanes[index].y,lanes[index].sprites[indexIn].width,lanes[index].sprites[indexIn].height)
                    spriteCtx.save();           
                    
                    if((lanes[index].sprites[indexIn].x) <= -(lanes[index].sprites[indexIn].width) ){
                        
                        lanes[index].sprites[indexIn].x = 400 + (lanes[index].sprites[indexIn].width)
                        
                    
                    }
                
                    
                    if(isBoxCollision(frog.x,frog.y,frog.width,frog.height,lanes[index].sprites[indexIn].x,lanes[index].y,lanes[index].sprites[indexIn].width,lanes[index].sprites[indexIn].height)){
                        
                        interfaceCtx.clearRect(frog.x,frog.y,frog.width,frog.height)
                        
                        drawAnderaseSkull()
                        
                        
                        
                        frog.x = 185;
                        frog.y = 516;
                        player.lives = player.lives -1;
                        renderLives();
                        renderFrog();
                       
                    }
                    
                    
                    


                    
                    
                    lanes[index].sprites[indexIn].x =  lanes[index].sprites[indexIn].x  - lanes[index].speed;
                   


                    spriteCtx.drawImage(imageSpr,lanes[index].sprites[indexIn].ix,lanes[index].sprites[indexIn].iy,lanes[index].sprites[indexIn].width,lanes[index].sprites[indexIn].height,lanes[index].sprites[indexIn].x,lanes[index].y,lanes[index].sprites[indexIn].width,lanes[index].sprites[indexIn].height)


                }

            }



            
        }



    }



}






//BONUS



function onLog(){
    
    let keeper = true;
 
    for(let index = 6; index <= lanes.length - 1; index++){

       
        if(frog.y > (lanes[index].y-20) && frog.y < (lanes[index].y+20)){

            for(let indexWood = 0; indexWood <= lanes[index].sprites.length - 1; indexWood++ ){
                
             
                if(!isBoxCollision(frog.x,frog.y,frog.width,frog.height,lanes[index].sprites[0].x,lanes[index].y,lanes[index].sprites[0].width,lanes[index].sprites[0].height) && indexWood==0 && (lanes[index].sprites.length == 3 || lanes[index].sprites.length == 2)){
                    continue;
                }
                if(!isBoxCollision(frog.x,frog.y,frog.width,frog.height,lanes[index].sprites[1].x,lanes[index].y,lanes[index].sprites[1].width,lanes[index].sprites[1].height) && indexWood==1 &&  lanes[index].sprites.length == 3){
                    continue;
                }
               
                
                if(isBoxCollision(frog.x,frog.y,frog.width,frog.height,lanes[index].sprites[indexWood].x,lanes[index].y,lanes[index].sprites[indexWood].width,lanes[index].sprites[indexWood].height)){

                    interfaceCtx.clearRect(frog.x,frog.y,frog.width,frog.height);

                    keep = indexWood;
                    keeper = false;
                    if(lanes[index].direction == -1){
                        frog.x = frog.x - lanes[index].speed;
                        
                        if(lanes[index].sprites[indexWood].x + lanes[index].sprites[indexWood].width == lanes[index].sprites[indexWood].width ){
                            interfaceCtx.clearRect(frog.x,frog.y,frog.width,frog.height)
                        
                            drawAnderaseSkull()
                            
                            
                            
                            frog.x = 185;
                            frog.y = 516;
                            player.lives = player.lives -1;
                            renderLives();
                            renderFrog();
                            clearInterval(maintain);

                        }
                        if(frog.x <= 0){
                            frog.x = frog.x + lanes[index].speed;
                        }
                    }else{
                        frog.x = frog.x + lanes[index].speed;
                        
                        if(lanes[index].sprites[indexWood].x ==0 ){
                            interfaceCtx.clearRect(frog.x,frog.y,frog.width,frog.height)
                        
                            
                            drawAnderaseSkull()
                            
                            
                            
                            
                            frog.x = 185;
                            frog.y = 516;
                            player.lives = player.lives -1;
                            renderLives();
                            renderFrog();
                            clearInterval(maintain);

                        }
                        if(frog.x + frog.width >= 400){
                            frog.x = frog.x - lanes[index].speed;
                        }
                    
                    
                    
                    }
                    
                    
                    
                    renderFrog();
                    console.log("on log")
                    
                
                    
                    

                }else if(!isBoxCollision(frog.x,frog.y,frog.width,frog.height,lanes[index].sprites[indexWood].x,lanes[index].y,lanes[index].sprites[indexWood].width,lanes[index].sprites[indexWood].height) ){
                    
                    if(keeper == false ){
                        break
                    }
                  
                    interfaceCtx.clearRect(frog.x,frog.y,frog.width,frog.height)
                        
                    drawAnderaseSkull()
                    
                    
                    
                    
                    frog.x = 185;
                    frog.y = 516;
                    player.lives = player.lives -1;
                    renderLives();
                    renderFrog();
                    clearInterval(maintain);
                        
                    
                    
                    
                    
                }
               
               
        
                
                
                

            }
          
            break;
            
            
        
        
        }


    }
    



}











function gameEnd(){

    if(player.lives <= 0){

        Stoper()
        
    }


    if(player.time == 0){

        Stoper()
    }
    
    let counter = 0;
    
    for(let i = 0; i < player.safeHomes.length; i++){

        if(player.safeHomes[i] == 1){
            ++counter
        }
        if(counter == 4){
            Stoper()
        }
        

    }



}




function Stoper(){
    
    clearInterval(Spritesmove);
    clearTimeout(special);
    clearInterval(clock);
    document.removeEventListener("keydown",moveFrog);
    


    player.state = "end";

    
    interfaceCtx.fillStyle = "black";
    interfaceCtx.fillRect(0,0,400,565);
    
    interfaceCtx.fillStyle = "yellow";
    interfaceCtx.font = "40px Georgia"
    interfaceCtx.fillText(("Score: " + player.score),130,175);
    
    
    interfaceCtx.fillText("Game Over",110,105);
    
    
    interfaceCtx.fillStyle = "green";
    
    interfaceCtx.fillRect(125,250,140,40);

    interfaceCtx.fillStyle = "black";
    interfaceCtx.font = "20px Georgia"
    interfaceCtx.fillText("Play Again",145,275);

    

    player.score = 0;
    player.lives = 5;
    player.time  = 60;
    
    
    for(let i = 0; i < player.safeHomes.length; i++){

       player.safeHomes[i] = 0;
        

    }
    


    




}



let special;

function drawAnderaseSkull(){

 
    interfaceCtx.drawImage(imageDead,0,0,30,30,frog.x,frog.y,frog.width,frog.height);
  
    
    special = setTimeout(interval,1000,frog.x,frog.y)

    


}

function interval(param1,param2){

    
    interfaceCtx.clearRect(param1,param2,frog.width,frog.height)
    

}











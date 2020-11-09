let canvas=document.getElementById('canvas')
let scoreVal=document.getElementById("scoreVal")
var body=document.getElementsByTagName('body')[0]
let finalScore=document.getElementById("finalScore")


// setting up width and height
canvas.width=innerWidth;
canvas.height=innerHeight;

 score=0;

//  assigning 2d system
ctx=canvas.getContext('2d');

 projectileArray=[]
 enemiesArray=[];
randomColorArray=[]
friction=0.6;





let player1=new player(canvas.width/2,canvas.height/2,10,'white');

spawnEnemies();
// animate
let animationId;
function animate(){
    animationId=requestAnimationFrame(animate);
    // ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='rgba(0,0,0,0.1)';
    ctx.fillRect(0,0,canvas.width,canvas.height)
    player1.draw();
    projectileArray.forEach((project,ind)=>
    {
        project.update();
        if((project.x-project.radius<=0)||(project.x+project.radius>=canvas.width)||(project.y-project.radius<=0)||(project.y+project.radius>=canvas.height))
        {
            setTimeout(() => {
        
            projectileArray.splice(ind,1);
        
            },0 );
        }


    })
    enemiesArray.forEach((enemy,index)=>
    {
        enemy.update();
        let dist=Math.hypot(player1.x-enemy.x,player1.y-enemy.y);
        if(dist-player1.radius-enemy.radius<=1)
        {
            cancelAnimationFrame(animationId)
            body.innerHTML=  ` <div class="add" >
            <div class="inCentre">Game finished.
               <br>  Score
            <br><span id="finalScore">0</span><br>
            <button id="reStart" onclick="reStart()">Restart</button>
        </div>
        </div>`
        let finalScore=document.getElementById("finalScore")

            finalScore.innerHTML=score;
            btn=document.getElementById("reStart")
            
        }

       projectileArray.forEach((pro,proind)=>
        {
            let dist=Math.hypot(pro.x-enemy.x,pro.y-enemy.y);

            if(dist-pro.radius-enemy.radius<=1)
            {
                if (enemy.radius-10>5)
                {
                    enemy.radius-=10;
                    enemy.velocity.x*=friction;
                    enemy.velocity.y*=friction;

                
                setTimeout(() => {
                    
                projectileArray.splice(proind,1);
            
                },0 );
                score+=5;
                scoreVal.innerHTML=score;
                }
                else{
                    setTimeout(() => {
                        enemiesArray.splice(index,1);
                    projectileArray.splice(proind,1);
                
                    },0 );
                    score+=20;
                    scoreVal.innerHTML=score;
                }
            }
                

        })
    })


}
animate();

addEventListener('resize',()=>{
    canvas.width=innerWidth;
    canvas.height=innerHeight;
    player1=new player(canvas.width/2,canvas.height/2,40,'red');

})


addEventListener('click',(event)=>{
    console.log(projectileArray.length)
    let angle =Math.atan2(event.clientY-(canvas.height/2),event.clientX-(canvas.width/2));
    let velocity={
        x:Math.cos(angle)*3,
        y:Math.sin(angle)*3
    }
    projectileArray.push(new projectile(canvas.width/2,canvas.height/2,5,'white',velocity))
   
})

let btn=document.getElementById("reStart")


btn.addEventListener('click',()=>{
    animate();
    spawnEnemies();
})



















//  making a player and giving it property
function player(x,y,radius,color)
{
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.color=color;

    this.draw=function()
    {
        ctx.beginPath();
       
        ctx.arc(this.x,this.y,this.radius, 0,Math.PI*2,false);
        ctx.fillStyle=this.color;
        ctx.fill();
    }
}


// making a projectile
function projectile(x,y,radius,color,velocity)
{
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.color=color;
    this.velocity=velocity;

    this.draw=function()
    {
        ctx.beginPath();
       
        ctx.arc(this.x,this.y,this.radius, 0,Math.PI*2,false);
        ctx.fillStyle=this.color;
        ctx.fill();
    };

    this.update=function(){
        this.draw();
        this.x+=this.velocity.x;
        this.y+=this.velocity.y;
    }
    
}



function Enemy(x,y,radius,color,velocity)
{
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.color=color;
    this.velocity=velocity;

    this.draw=function()
    {
        ctx.beginPath();
       
        ctx.arc(this.x,this.y,this.radius, 0,Math.PI*2,false);
        ctx.fillStyle=this.color;
        ctx.fill();
    };

    this.update=function(){
        this.draw();
        this.x+=this.velocity.x;
        this.y+=this.velocity.y;
    }
    
}


function spawnEnemies(){
    setInterval(()=>{
        let radius=Math.random()*26+4;
        let x=(Math.random()*(canvas.width-2*radius))+radius;
        let y;
        if (x==0 ||x==canvas.width)
        {
            y=Math.random()*(canvas.height-2*radius)+radius;
        }
        else{
            y=Math.random()>0.5?0:canvas.width;
        }
        
       
        let color=`hsl(${Math.random()*360},50%,50%)`
        let angle=Math.atan2(canvas.height/2-y,canvas.width/2-x);
        let velocity={
            x:Math.cos(angle),
            y:Math.sin(angle)
        }
        enemiesArray.push(new Enemy(x,y,radius,color,velocity))
    },1000)
}

function reStart()
{
    body.innerHTML=`<div id="score">Score <span id="scoreVal">0</span></div>
    <canvas id="canvas"></canvas>
   
    
    <script src="script.js"></script>`
}

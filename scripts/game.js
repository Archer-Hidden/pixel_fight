var canvas;
var context;
var timer;
var back_ground;
var center = Object();
var bullet_1;
var bullet_2;
var bullet_1_left;
var bullet_2_left;
var Bullets=[];
var Bullets2=[];

var player = Object();
player.x = 0;
player.y = 0;
player.r = 48;
player.image = null;
player.left=true;
player.moving=false;
player.speed=0;
player.y_speed=0;
player.jump_bound=0;
player.clip=5;
player.shield_show=false;
player.shield_energy=3;
player.shield_dead=false;
player.health=100;
player.sword_w=10;
player.sword_h=5;
player.sword_x=null;
player.sword_y=null;
player.sword_px=null;
player.sword_py=null;
player.sword_r=20;
player.sword_image=null;
player.sword_audio=null;
player.sword_bool_=false;
/****************************
 *  shield w=5 h=10;
 *
 ****************************/



var player2 = Object();
player2.x = 0;
player2.y = 0;
player2.r = 48;
player2.image = null;
player2.left=true;
player2.speed=0;
player2.y_speed=0;
player2.jump_bound=0;
player2.clip=5;
player2.shield_show=false;
player2.shield_energy=3;
player2.shield_dead=false;
player2.health=100;
player2.sword_w=10;
player2.sword_h=5;
player2.sword_x=null;
player2.sword_y=null;
player2.sword_px=null;
player2.sword_py=null;
player2.sword_r=20;
player2.sword_image=null;
player2.sword_audio=null;
player2.sword_bool_=false;




var KEY_SPACE = 32;
var KEY_W=87;
var KEY_A=65;
var KEY_D=68;
var KEY_P=80;
var KEY_Q=81;
var KEY_E=69;
var KEY_J=74;
var KEY_K=75;
var KEY_L=76;
var KEY_I=73;
var KEY_U=85;
var KEY_O=79;
var slash_b=false;
var counter=0;

var pause=true;
var start=true;
var last_round="NONE";
var test=Object();
test.x=100;
test.y=410;



function fillCircle( x, y, radius ) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, true);
    context.fill();
}
function fillRect( x, y, width, height,color ) {
    context.fillStyle=color;
    context.fillRect( x, y, width, height );
}






/************************Player control**********************/
function handleKeyDown(event) {
    switch(event.keyCode) {
        case KEY_SPACE:
        {
            pause=!pause;
            start=false;
            break;
        }
        case KEY_E:
        {
            player.sword_audio.play();
            player.sword_bool_=true;
            
            break;
        }
        case KEY_A:
        {
            player.moving=true;
            player.left=true;
            break;
        }
        case KEY_D:
        {
            player.moving=true;
            player.left=false;
            break;
        }
        case KEY_W:
        {
            if(player.jump_bound<2){
                player.y_speed=-15;
                player.jump_bound+=1;
            }
            break;
        }
        case KEY_Q:
        {
            
            break;
        }
        case KEY_O:
        {
            player2.sword_audio.play();
            player2.sword_bool_=true;
            
            break;
        }
        case KEY_J:
        {
            player2.moving=true;
            player2.left=true;
            break;
        }
        case KEY_L:
        {
            player2.moving=true;
            player2.left=false;
            break;
        }
        case KEY_I:
        {
            if(player2.jump_bound<2){
                player2.y_speed=-15;
                player2.jump_bound+=1;
            }
            break;
        }
        case KEY_U:
        {
            
            break;
        }
    
        default:
    }
}
function handleKeyUp(event) {
	switch(event.keyCode) {
		case KEY_E:
        {
            //shoot(player);
            for (var i = 0; i < Bullets2.length; i++) {
                if(!Bullets2[i].dead){
                    if(b_s_coll(player,Bullets2[i])){
                        Bullets2[i].dead=true;
                        Bullets.push(new bullet(Bullets2[i].x,Bullets2[i].y,!Bullets2[i].is_left));
                    }
                }
            }
            if(p_s_coll(player,player2)){
                player2.health-=5;
            }
            player.sword_bool_=false;
			break;
        }
        case KEY_A:
        {
            player.moving=false;
            break;
        }
        case KEY_D:
        {
            player.moving=false;
            break;
        }
        case KEY_Q:
        {
            shoot(player);
            break;
        }
        case KEY_O:
        {
            //shoot(player);
            for (var i = 0; i < Bullets.length; i++) {
                if(!Bullets[i].dead){
                    if(b_s_coll(player,Bullets[i])){
                        Bullets[i].dead=true;
                        Bullets2.push(new bullet(Bullets[i].x,Bullets[i].y,!Bullets[i].is_left));
                    }
                }
            }
            if(p_s_coll(player2,player)){
                player.health-=5;
            }
            player2.sword_bool_=false;
            break;
        }
        case KEY_J:
        {
            player2.moving=false;
            break;
        }
        case KEY_L:
        {
            player2.moving=false;
            break;
        }
        case KEY_U:
        {
            shoot2(player2);
            break;
        }
		default:
	}
}
function movement(obj){
    
    if(obj.clip<5)
        obj.clip+=0.01;
    obj.sword_py=obj.y+60;
    if((obj.x)<10){
        obj.speed=0-obj.speed;
        obj.x=11;
    }
    if((obj.x)>(canvas.width-100) || (obj.x)==(canvas.width-100)){
        obj.speed=0-obj.speed;
        obj.x=canvas.width-101;
    }
    if(obj.left){
        if((obj.x)>10)
            obj.x=obj.x+obj.speed;
//        else{
//            obj.speed= 0 - obj.speed;
//            obj.x=11;
//        }
        obj.sword_px=obj.x-40;
        obj.sword_x=obj.sword_px;
        obj.sword_y=obj.sword_py+20;
        if(obj.moving){
            obj.speed-=1;
        }
        else{
            if(obj.speed<0)
                obj.speed+=0.7;
            else if(obj.speed>0)
                obj.speed-=0.7;
            if((obj.speed<0.7 && obj.speed>0)||(obj.speed<0 && obj.speed>-0.7))
                obj.speed=0;
        }
        
    }
    else{
        if((obj.x)<(canvas.width-100))
            obj.x=obj.x+obj.speed;
//        else{
//            obj.speed=0-obj.speed;
//            obj.x=canvas.width-100;
//            console.log("here",obj.speed,obj.x,canvas.width-100);
//        }
        obj.sword_px=obj.x+56;
        obj.sword_x=obj.sword_px+90;
        obj.sword_y=obj.sword_py+20;
        if(obj.moving){
            obj.speed+=1;
        }
        else{
            if(obj.speed<0)
                obj.speed+=0.7;
            else if(obj.speed>0)
                obj.speed-=0.7;
            if((obj.speed<0.7 && obj.speed>0)||(obj.speed<0 && obj.speed>-0.7))
                obj.speed=0;
        }
    }

    obj.y+=obj.y_speed;
    if(obj.y<380){
        obj.y_speed +=1;
    }
    else if(obj.y>380){
        obj.y=380;
        obj.y_speed=6-obj.y_speed;
        obj.jump_bound=0;
    }
    
}

function player_coll(a,b){
    var distance;
    var flag=false;
    var speed_sum;
    var speed_y_sum;
    distance=(a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y);
    distance = Math.sqrt(distance);
    if(distance<70)
        flag=true;
    if(flag){
        a.speed=0-a.speed;
        b.speed=0-b.speed;
        if(a.x>b.x){
            a.x+=20;
            b.x-=20;
        }
        else{
            a.x-=20;
            b.x+=20;
        }
    }
}

/*******************Triger********************/

function coll_det(ob_a,ob_b){
    var distance;
    var tempx=ob_b.x+48;
    var tempy=ob_b.y+48;
    distance = (ob_a.x-tempx)*(ob_a.x-tempx)+(ob_a.y-tempy)*(ob_a.y-tempy);
    distance = Math.sqrt(distance);
    if(distance<(ob_a.r+ob_b.r))
        return true;
    else
        return false;
}

function b_s_coll(obj_p,bu){
    if(bu.x<(obj_p.sword_px+40+40) && bu.x>(obj_p.sword_px-40) && bu.y<(obj_p.sword_py+40+30) && bu.y>(obj_p.sword_py-40))
        return true;
    else
        return false;
}
function p_s_coll(obj_p,obj_p2){
    if(Math.abs(obj_p.sword_px+50-obj_p2.x-48)<68 && Math.abs(obj_p.sword_py+15-obj_p2.y-48)<63)
        return true;
    else
        return false;
}

function coll_shield_det(ob_a,player){
//    var distance;
//    var tempx=ob_b.x+30;
//    var tempy=ob_b.y+60;
//    distance = (ob_a.x-tempx)*(ob_a.x-tempx)+(ob_a.y-tempy)*(ob_a.y-tempy);
//    distance = Math.sqrt(distance);
    
    if(player.shield_show){
        if(!player.shiled_dead){
            if(player.left){
                
                //fillRect( player.x-50, player.y, 25, 100,"yellow" );
                if(ob_a.y>=player.y && ob_a.y<=(player.y+100))
                    if(ob_a.x>(player.x-25) && ob_a.x<(player.x))
                        return true;
                
            }
            else{
                if(ob_a.y>=player.y && ob_a.y<=(player.y+100))
                    if(ob_a.x>(player.x+120) && ob_a.x<(player.x+125))
                        return true;
            }
                
                //fillRect( player.x+120, player.y, 25, 100,"yellow" );
            
        }
        
    }
    return false;
}

function shoot(obj){
    if(obj.clip>=1){
        Bullets.push(new bullet(obj.x+20,obj.y+30,obj.left));
        obj.clip-=1;
    }
}
function shoot2(obj){
    if(obj.clip>=1){
        Bullets2.push(new bullet(obj.x+20,obj.y+30,obj.left));
        obj.clip-=1;
    }
}
function slash(obj){
    if(!obj.left){
        if(obj.sword_bool_) {obj.sword_image.src="images/sword_up.png";}
        else obj.sword_image.src="images/sword.png";
    }
    else{
        if(obj.sword_bool_) {obj.sword_image.src="images/sword_up_left.png";}
        else obj.sword_image.src="images/sword_left.png";
    }
    context.drawImage(obj.sword_image,obj.sword_px,obj.sword_py,100,30);
}



/********************Game loop control**************/

function clearCanvas() {
    // Store the current transformation matrix
    context.save();
    
    // Use the identity matrix while clearing the canvas
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Restore the transform
    context.restore();
}


function update() {
    if(!pause && !start){
        if(player.health==0)
        {
            last_round="PLAYER2";
            reload();
            start=true;
            pause=true;
            
        }
        else if(player2.health==0)
        {
            last_round="PLAYER1";
            reload();
            start=true;
            pause=true;
            
        }
        movement(player);
        movement(player2);
        player_coll(player,player2);
        Bullets.every(bullet.prototype.updatee);
        for (var i = 0; i < Bullets.length; i++) {
            if(!Bullets[i].dead){
                if(coll_shield_det(Bullets[i],player2)){
                    Bullets[i].dead=true;
                    player2.shield_energy-=1;
                    if(player2.shield_energy=0)
                        player2.shield_dead=true;
                }
                else
                    if(coll_det(Bullets[i],player2)){
                        Bullets[i].dead=true;
                        player2.health-=10;
                    }
            }
        }
        for (var i = 0; i < Bullets2.length; i++) {
            if(!Bullets2[i].dead){
                if(coll_shield_det(Bullets2[i],player)){
                    Bullets2[i].dead=true;
                    player.shield_energy-=1;
                    if(player.shield_energy=0)
                        player.shield_dead=true;
                }
                else
                    if(coll_det(Bullets2[i],player)){
                        Bullets2[i].dead=true;
                        player.health-=10;
                    }
            }
        }
        
    }
}




function draw() {
	// Clear the screen.
	clearCanvas();
    context.drawImage(back_ground,0,0,1000,500);
    if(start){
        context.font="75px Georgia";
        context.fillStyle="magenta";
        context.fillText("PIXEL FIGHT",center.x,center.y-100);
        context.font="30px Georgia";
        context.fillStyle="white";
        context.fillText("PRESS SPACE TO START",center.x-120,center.y+200);
        context.font="30px Georgia";
        context.fillStyle="white";
        context.fillText("LAST ROUND WINNER:",center.x-470,center.y-200);
        context.font="30px Georgia";
        context.fillStyle="black";
        context.fillText(last_round,center.x-450,center.y-150);
    }
    else if(!pause){
        
        // Draw my player
        context.fillStyle="red";
        context.drawImage( player.image, player.x, player.y ,96,96);
        context.drawImage( player2.image, player2.x, player2.y ,96,96);
        slash(player);
        slash(player2);
        

        /****************bullet control****/
        for (var i = 0; i < Bullets.length; i++) {
            Bullets[i].updatee();
            Bullets[i].b_draw(1);
        }
        for (var i = 0; i < Bullets2.length; i++) {
            Bullets2[i].updatee();
            Bullets2[i].b_draw(2);
        }


        context.font="10px Arial";
        
        context.fillText("magic power:",10,50);
        fillRect(10,60,player.clip*20,10,"red");
        context.fillText("Health:",10,80);
        fillRect(10,90,player.health*2.5,10,"red");
        context.fillText("Health:",920,80);
        fillRect(720,90,player2.health*2.5,10,"red");
        context.fillText("magic power:",900,50);
        fillRect(870,60,player2.clip*20,10,"red");
        invoke_shield(player);
    }
    else{
        context.font="30px Arial";
        context.fillStyle="black";
        context.fillText("PAUSE",center.x,center.y);
    }
}

function gameLoop() {
	update();
	draw();
    
}

/*********************bullets stuff****************************/



function bullet(x,y,is_left){
    this.px=x;
    this.py=y;
    this.x=this.px;
    this.y=this.py;
    this.is_left=is_left;
    this.r=10;
    this.speed=0;
    this.dead=false;
}
bullet.prototype.updatee= function() {
    if(!this.dead){
        if(this.is_left){
            this.speed-=1;
            this.px=this.px+this.speed;
        }
        else
        {
            this.speed+=1;
            this.px=this.px+this.speed;
        }
    }
    this.x=this.px;
    this.y=this.py;
    if(this.px>canvas.width || this.px<0){
        this.dead=true;
    }

    
}
bullet.prototype.b_draw=function (i) {
    if(!this.dead)
    {
        if(i==1){
            if(this.is_left)
                context.drawImage(bullet_1_left,this.px,this.py,30,30);
            else
                context.drawImage(bullet_1,this.px,this.py,30,30);
        }
        else if(i==2){
            if(this.is_left)
                context.drawImage(bullet_2_left,this.px,this.py,70,70);
            else
                context.drawImage(bullet_2,this.px,this.py,70,70);
        }
    }
}


/***********************SHIELD*************************************

 */

function invoke_shield(player){
    if(player.shield_show){
        if(!player.shiled_dead){
            if(player.left){
                fillRect( player.x-50, player.y, 25, 100,"yellow" );
            }
            else
                fillRect( player.x+120, player.y, 25, 100,"yellow" );

        }
        
    }
}

/***************************************************************/
function onLoad() {
	canvas = document.getElementById("theCanvas");
	context = canvas.getContext("2d");
    
    

    
    back_ground= new Image();
    back_ground.src="images/background.gif";
	//canvas.addEventListener("mousemove", handleMouseMove, false);
    window.addEventListener("keydown",handleKeyDown,false);
	window.addEventListener("keyup",handleKeyUp,false);
	center.x = canvas.width / 2;
	center.y = canvas.height / 2;

	player.x = 100;
	player.y = 320;
    player2.x=center.x+600;
    player2.y=320;
	
    bullet_1=new Image();
    bullet_1.src="images/bullet_1.png";
    bullet_2=new Image();
    bullet_2.src="images/bullet_2.png";
    bullet_1_left=new Image();
    bullet_1_left.src="images/bullet_1_left.png";
    bullet_2_left=new Image();
    bullet_2_left.src="images/bullet_2_left.png";
    
    
	player.image = new Image();
	player.image.src = "images/c.png";
    player2.image = new Image();
    player2.image.src = "images/c2.png";
    player.sword_image= new Image();
    player.sword_image.src="images/sword.png";
    player2.sword_image= new Image();
    player2.sword_image.src="images/sword.png";
    player.sword_audio = new Audio();
    player.sword_audio.src = "audio/slash.wav";
    player2.sword_audio = new Audio();
    player2.sword_audio.src = "audio/slash.wav";
    player.sword_audio.load();
    player2.sword_audio.load();
    
    
	timer = setInterval(gameLoop, 30);
	return timer;
}
function reload(){
    player.left=true;
    player.moving=false;
    player.speed=0;
    player.y_speed=0;
    player.jump_bound=0;
    player.clip=5;
    player.health=100;
    
    player2.left=true;
    player2.speed=0;
    player2.y_speed=0;
    player2.jump_bound=0;
    player2.clip=5;
    player2.health=100;
    
    player.x = 100;
    player.y = 320;
    player2.x=center.x+600;
    player2.y=320;
    Bullets=[];
    Bullets2=[];
}

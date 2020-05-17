
// first animation
  window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
})();



var canvas = document.getElementById("canvas1"),
    ctx1 = canvas.getContext("2d"),
    keyword1 = "HAPPY BIRTHDAY",
    keyword2 = "APARNA",
    imageData,
    density =1,
    mouse = {},
    hovered = false,
    colors = ["236, 252, 17", "15, 245, 46", "15, 237,  245", "245, 15, 15", "245, 15, 214"],
    minDist = 30,
    bounceFactor = 5,
    count123=0;

var W = window.innerWidth,
    H = window.innerHeight;

canvas.width = W;
canvas.height = H;

document.addEventListener("mousemove", function(e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
}, false);


document.addEventListener("touchmove", function(e) {
 if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
        //var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    }
}, false);

document.addEventListener("touchstart", function(e) {
 if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
        //var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    }
}, false);


// Particle Object
var Particle = function() {
  this.w = Math.random() * 10.5;
  this.h = Math.random() * 10.5;
  this.x = -W;
  this.y = -H;
  this.free = false;
  
  this.vy = (-5 + parseInt(Math.random() * 10) / 2)/1.2;
  this.vx = (-4 + parseInt(Math.random() * 8))/1.5;
  
  // Color
  this.a = Math.random();
  this.color = colors[parseInt(Math.random()*colors.length)];
  
  this.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
  };
  
  this.draw = function() {
    ctx1.fillStyle = "rgba("+this.color+","+this.a+")";
    ctx1.fillRect(this.x, this.y,  this.w,  this.h);
  }
};

var particles = [];

// Draw the text
function drawText() {
  ctx1.clearRect(0, 0, W, H);
  ctx1.fillStyle = "#8800ff";
  ctx1.font = "30px 'Arial', sans-serif";
  ctx1.textAlign = "center";
  ctx1.fillText(keyword1, W/2, H/2 - 20);
  ctx1.fillText(keyword2, W/2, H/2 + 25);
}

// Clear the canvas
function clear() {
  ctx1.clearRect(0, 0, W, H);
}

// Get pixel positions
function positionParticles() {
  // Get the data
  imageData = ctx1.getImageData(0, 0, W, W);
  data = imageData.data;
  
  // Iterate each row and column
  for (var i = 0; i < imageData.height; i += density) {
    for (var j = 0; j < imageData.width; j += density) {
      
      // Get the color of the pixel
      var color = data[((j * ( imageData.width * 4)) + (i * 4)) - 1];
      
      // If the color is black, draw pixels
      if (color == 255) {
        particles.push(new Particle());
        particles[particles.length - 1].setPosition(i, j);
      }
    }
  }
}

drawText();
positionParticles();


// Update
function update() {
  clear();
  
  for(i = 0; i < particles.length; i++) {
    var p = particles[i];
    
    if(mouse.x > p.x && mouse.x < p.x + p.w && mouse.y > p.y && mouse.y < p.y + p.h) 
      hovered = true;
    
    if(hovered == true) {
      
      var dist = Math.sqrt((p.x - mouse.x)*(p.x - mouse.x) + (p.y - mouse.y)*(p.y - mouse.y));
      
      if(dist <= minDist)
        p.free = true;
      
      if(p.free == true) {
        ++count123;
        p.y += p.vy;
        p.vy += 0.08;
        p.x += p.vx;
        
        // Collision Detection
        if(p.y + p.h > H) {
          p.y = H - p.h;
          p.vy *= -bounceFactor;
          
          // Friction applied when on the floor
          if(p.vx > 0)
            p.vx -= 0.1;
          else 
            p.vx += 0.1;
        }
        
        if(p.x + p.w > W) {
          p.x = W - p.w;
          p.vx *= -bounceFactor;
        }
        
        if(p.x < 0) {
          p.x = 0;
          p.vx *= -0.5;
        }
      }
    }
    
    ctx1.globalCompositeOperation = "lighter";
    p.draw();
  }
}

//update1
function update1() {
  clear();
  
  for(i = 0; i < particles.length; i++) {
    var p = particles[i];
      
        ++count123;
        p.vy = 30;
        p.y += p.vy;
        p.vy += 0.05;
        p.x += p.vx;
        
        
        if(p.x + p.w > W) {
          p.x = W - p.w;
          p.vx *= -bounceFactor;
        }
        
        if(p.x < 0) {
          p.x = 0;
          p.vx *= -0.5;
        }
      
    
    
    ctx1.globalCompositeOperation = "lighter";
    p.draw();
  }
}

function update2() {
  clear();
  
  for(i = 0; i < particles.length; i++) {
    var p = particles[i];
        

        ++count123;
        if(p.y + p.h > 2000) {
          p.y += 10;
        }else if(p.y < 0){
          p.y -= 10;
        }else{
          p.y += 30;
        }
        
        if(p.x + p.w > 2000) {
          p.x += 10;
        }else if(p.x < 0){
          p.x -= 10;
        }else{
          p.x += p.vx;
        }  
    
    
    ctx1.globalCompositeOperation = "lighter";
    p.draw();
  }
}

function checkParticle(){
  let done = true;
  for(i = 0; i < particles.length; i++){
    var p = particles[i];
    // if(p.x + p.w > 0 && p.x - p.w < 500 && p.y + p.h > 0 && p.y - p.h < 1000){
    //   done = false;
    // }
    if(p.x> 0 && p.x< 2000 && p.y> 0 && p.y< 2000){
      done = false;
    }

    

  }
  return done;

}

//var count123 = 0

//var count123 = 0

(function animloop(){
	requestAnimFrame(animloop);
	if (count123 > 100000) {
		return 0;
	}
	update();
	
	
})();
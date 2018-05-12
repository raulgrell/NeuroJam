
var scrollSpeed = 5;
var maxParralax = 4;
var minParralax = 0;
var maxStarSize = 5;
var minStarSize = 2;
var maxNumberofStars = 500;


var sketch = function(p) {    
    var starField = [];
    
    var Star = function(){
      this.vector = p.createVector(p.random(0,p.width), p.random(0,p.height));
      this.size = p.random(minStarSize,maxStarSize);
      this.opacity = p.ceil(p.random(15,160));
      this.parallaxDistance = p.ceil(p.random(minParralax,maxParralax));
      
      this.setVector = function(v)
      {
          this.vector = v;
          this.x = this.vector.x;
          this.y = this.vector.y;
      };
  
      this.display = function()
      {
          p.noStroke();
          p.fill(255, 255, 255, this.opacity );
          p.ellipse( this.vector.x, this.vector.y, this.size, this.size);
          return this;
      };

      this.repeat = function(){
          var v = this.vector;
          var max = 100;

          if(v.x < -max){
              v.x = p.width + max + v.x;
          }
          else if(v.x > p.width + max){
              v.x = -max -v.x;
          }

          if(v.y < -max){
              v.y = p.height + max + v.y;
          }
          else if(v.y > max + p.height){
              v.y = -max - v.y;
          }
      }

      this.update = function()
      {
        this.vector.x -= this.parallaxDistance * scrollSpeed;
        return this;
      }; 
    };
    
    var makeStarField = function(starcount){
      var out = [];
      for(var i=0; i< starcount; i++)
      {
          out.push(new Star());
      }
      return out;
    };
    
    p.setup = function() {
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.frameRate(50);
      starField = makeStarField(maxNumberofStars);
      
    };
    
    p.draw = function() {
      p.background(0);
      starField.forEach( function(x,i){ 
        x.display()
         .update()
         .repeat();
      } );
    };
  };

  
  
new p5(sketch);


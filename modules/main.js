/* Initialisation du Moteur de jeu */

var cv = document.getElementById('world');  // Element canvas

// Renommage des objet de Matter-js
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
    Body = Matter.Body;

// Creation du monde + engine
var engine = Engine.create();
var world = engine.world;

// Hauteur et Largeur de la fenetre
var w = window.innerWidth ;
var h = window.innerHeight ;


var render = Render.create({  // Configuration du rendu ecran
  canvas: cv,
  engine: engine,
  options: {
    width: w,
    height: h,
    background: 'transparent',
    wireframes: false,
    showAngleIndicator: false
  }
});




var ball = Bodies.circle(50, 50, 50, {
  density: 0.04,
  friction: 0.01,
  frictionAir: 0.001,
  restitution: 0.8,
  render: {
    fillStyle: '#F35e66',
    strokeStyle: '#F35e66',
    lineWidth: 1
  }
});

var ground = Bodies.rectangle(w / 2, h*11/12, 2000, 100, {
  isStatic: true
});
/*
var mouse = Matter.MouseConstraint.create(engine, { //Create Constraint
  element: cv,
  constraint: { // Parametre de force de contrainte
    render: {
      visible: true // Visibilité du point d'accroche
    },
    stiffness:0.1 // Suivie de l'objet au curseur
  }
});
Matter.World.add(world, mouse);
*/


/* Execution du moteur */
World.add(world, [ball, ground]);
Engine.run(engine);
Render.run(render);






var key = new Controller(90, 83, 81, 68) ;

function move( direction, obj) {
  maxSpeed = 20 ;
  var x = 0 ;
  var y = 0 ;

  if ( direction.right && obj.velocity.x < maxSpeed ) {
    x += 1 ;
  }
  if ( direction.left && obj.velocity.x > -maxSpeed ) {
    x -= 1 ;
  }
  if ( direction.up && obj.velocity.y > -maxSpeed) {
    y -= 1 ;
  }
  if ( direction.down && obj.velocity.y < maxSpeed ) {
    y += 1 ;
  }
  Body.applyForce( obj, {x: obj.position.x, y: obj.position.y}, {x: x, y: y} ) ;
}


function mainLoop() {
  move( key.state.move, ball) ;
  window.requestAnimationFrame(mainLoop) ;
}

window.addEventListener("keydown", key.down, false);
window.addEventListener("keyup", key.up, false);
mainLoop()

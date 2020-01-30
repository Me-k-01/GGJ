/* Initialisation du Moteur de jeu */

var cv = document.getElementById('world');  // Element canvas

// Renommage des objet de Matter-js
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

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
  frictionAir: 0.00001,
  restitution: 0.8,
  render: {
    fillStyle: '#F35e66',
    strokeStyle: '#F35e66',
    lineWidth: 1
  }
});

var ground = Bodies.rectangle(0, h-100, 2000, 50, { isStatic: true });

var mouseConstraint = Matter.MouseConstraint.create(engine, { //Create Constraint
  element: cv,
  constraint: {
    render: {
      visible: false
    },
    stiffness:0.8
  }
});
Matter.World.add(world, mouseConstraint);

/* Execution du moteur */
World.add(world, [ball, ground]);
Engine.run(engine);
Render.run(render);

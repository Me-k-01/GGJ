/* Initialisation du Moteur de jeu */
 // Element canvas
var cv = document.getElementById('world');

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
 // Configuration du rendu ecran
var render = Render.create({
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



 // Creations des differents ellement body present dans le jeu
var player = Bodies.circle(50, 50, 50, {
  density: 0.04,
  friction: 0.01,
  frictionAir: 0.001,
  restitution: 0.8,
  render: {
    fillStyle: '#F35e66',
    strokeStyle: '#F35e66',
    lineWidth: 1 }
} );
var ground = Bodies.rectangle(w / 2, h*11/12, 2000, 100, {
  isStatic: true
} );

/*
// Force de pousse exercable par le curseur.
var mouse = Matter.MouseConstraint.create(engine, { //Create Constraint
  element: cv,
  constraint: { // Parametre de force de contrainte
    render: {
      visible: false // Visibilité du point d'accroche
    },
    stiffness:0.1 // Suivie de l'objet au curseur
  }
});
Matter.World.add(world, mouse);
*/



var key = new Controller(90, 83, 81, 68) ;


function move( direction, obj) {
  /* Fonction permettant de bouger un body a partir d*/
  maxSpeed = 20 ;
  var x = 0 ;
  var y = 0 ;

  if ( direction.right && obj.velocity.x < maxSpeed ) {
    x += 1 ;
    // TODO: Animation: En fonction des directions et de la vitesse du joueur voir meme des objets
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

// Boucle d'update du jeu
function mainLoop() {
  move( key.state.move, player ) ;
  window.requestAnimationFrame(mainLoop) ;
}


function createBody(x, y) {
  var box = Bodies.rectangle(x, y, 50, 50) ;
  World.add(world, box) ;
  entities.push(box) ;
}

/* Execution du moteur */
var entities = [player, ground] ;
World.add(world, entities);
Engine.run(engine);
Render.run(render);

// Les event listenneur du clavier
window.addEventListener("keydown", key.down, false);
window.addEventListener("keyup", key.up, false);
window.addEventListener('contextmenu', function(event) {
    event.preventDefault(); // On empeche l'affichage fenetre des options
    createBody(event.clientX, event.clientY) ;
    return false;
}, false);

mainLoop()

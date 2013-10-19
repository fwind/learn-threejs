function Cube(x,y,z){ 
  this.cube = new THREE.Mesh(
       new THREE.CubeGeometry(50,50,50),                //形状の設定
       new THREE.MeshLambertMaterial({color: 0xff0000,ambient:0xFF0000}) //材質の設定
       );
  this.cube.castShadow = true;//影をつける（3） 
  this.cube.position.set(x,y,z);
  return this.cube;
}

function Sphere(){
  var texture1  = new THREE.ImageUtils.loadTexture('./img/a.jpg');
  this.sphere = new THREE.Mesh(
    new THREE.SphereGeometry(20,20,20),             
    new THREE.MeshLambertMaterial({map: texture1})
    // new THREE.MeshLambertMaterial({color: 0x99FFFF})
    );
  this.sphere.castShadow = true;//影をつける（3） 
  this.sphere.position.set(200,80,50);
  return this.sphere;
}
function Plane(){

  this.plane = new THREE.Mesh(
    new THREE.PlaneGeometry(500, 500),                
    new THREE.MeshLambertMaterial({color: 0x33CCCC})
    );
  this.plane.position.set(0,0,0);
  this.plane.receiveShadow = true; //影をつける（4）
  return this.plane;
}


function Person(){
  // model
  var loader = new THREE.OBJMTLLoader();
  loader.load( './obj/male02.obj', './obj/male02_dds.mtl', function ( object ) {
    object.position.y = - 80;
    scene.add( object );
    object.position.set(130,-30,7);
    object.rotation.set(1,2,0.3);
    object.castShadow = true;//影をつける（3）
    scene.add( object );
    window.person = object;

  });
}
//start---------------------------------------------

$(document).ready(function(){
  var canvas  = $('#canvas-frame');
  var width = canvas.width();
  var height = canvas.height();

  var renderer = new Renderer(canvas,width,height);
  var camera = new Camera(width,height);
  scene = new THREE.Scene();

  scene.add(Light.directional());
  scene.add(Light.ambient());
  scene.add(cube1 = new Cube(100,-100,100));
  scene.add(cube2 = new Cube(100,120,100));
  scene.add(sphere = new Sphere);
  scene.add(new Plane);
  new Person();
  renderer.clear();
  renderer.render(scene, camera);
  loop();

});


// animation---------------------
var t=0;
function loop() {
  t++;
  // console.log(t);
  // camera.position.set( 500*Math.cos(t/100), 500*Math.sin(t/200), 50*Math.cos(t/50));
  // camera.lookAt( {x:0, y:0, z:0 } ); 
  cube1.rotation.set( t/10, t/50,t/50 );
  cube2.rotation.set( t/-5, t/-20,t/-50 );
  sphere.rotation.set( t/100,t/50,t/20 );
  renderer.clear();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
} 

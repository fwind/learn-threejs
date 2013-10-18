(function() {
  var camera, cube, height, initCamera, initLight, initObject, initScene, initThree, light, renderer, scene, threeStart, width;

  width = void 0;

  height = void 0;

  renderer = void 0;

  camera = void 0;

  scene = void 0;

  light = void 0;

  cube = void 0;

  initThree = function() {
    width = document.getElementById("canvas-frame").clientWidth;
    height = document.getElementById("canvas-frame").clientHeight;
    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setSize(width, height);
    document.getElementById("canvas-frame").appendChild(renderer.domElement);
    return renderer.setClearColor(0xFFFFFF, 1.0);
  };

  initCamera = function() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.x = 100;
    camera.position.y = 200;
    camera.position.z = 100;
    camera.up.x = 0;
    camera.up.y = 0;
    camera.up.z = 1;
    return camera.lookAt({
      x: 0,
      y: 0,
      z: 0
    });
  };

  initScene = function() {
    return scene = new THREE.Scene();
  };

  initLight = function() {
    light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
    light.position.set(30, 90, 90);
    return scene.add(light);
  };

  initObject = function() {
    cube = new THREE.Mesh(new THREE.CubeGeometry(30, 60, 80), new THREE.MeshLambertMaterial({
      color: 0xff0000
    }));
    scene.add(cube);
    return cube.position.set(40, 0, 0);
  };

  threeStart = function() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    renderer.clear();
    return renderer.render(scene, camera);
  };

  $(document).ready(function() {
    return threeStart();
  });

}).call(this);

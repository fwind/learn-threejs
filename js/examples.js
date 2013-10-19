(function() {
  $(document).ready(function() {
    var animate, camera, geometry, init, material, mesh, renderer, scene;
    camera = void 0;
    scene = void 0;
    renderer = void 0;
    geometry = void 0;
    material = void 0;
    mesh = void 0;
    init = function() {
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.z = 1000;
      scene = new THREE.Scene();
      geometry = new THREE.CubeGeometry(200, 200, 200);
      material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
      });
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      renderer = new THREE.CanvasRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      return document.body.appendChild(renderer.domElement);
    };
    animate = function() {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.02;
      return renderer.render(scene, camera);
    };
    init();
    return animate();
  });

}).call(this);

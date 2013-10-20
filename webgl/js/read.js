// １．设置渲染器
var width,height;
var renderer;
function initThree() {
  width = document.getElementById('canvas-frame').clientWidth;
  height = document.getElementById('canvas-frame').clientHeight;
  //生成渲染器对象（属性：抗锯齿效果为设置有效）
  renderer = new THREE.WebGLRenderer({antialias: true});
  // 指定渲染器的高宽（和画布框大小一致）
  renderer.setSize(width, height );
  // 追加 【canvas】 元素到 【canvas-frame】 元素中。
  document.getElementById('canvas-frame').appendChild(renderer.domElement);
  // 设置渲染器的清除色(clearColor)
  renderer.setClearColor(0xFFFFFF, 1.0);
}

// --------------------------------------
// ２．设置相机
var camera;
function initCamera() { 
  // 设置透视投影的相机
  // var camera = new THREE.PerspectiveCamera( fov , aspect , near , far );
  // 透视投影中，会把称为视体积领域中的物体作成投影图。 视体积是通过以下4个参数来指定。
  // 视野角：fov
  // 纵横比：aspect
  // 相机离视体积最近的距离：near
  // 相机离视体积最远的距离：far
  camera = new THREE.PerspectiveCamera( 45 , width / height , 1 , 10000 );
  // 设置相机的位置坐标
  // 另一种方法camera.position.set(50,50,100);
  camera.position.x = 100;
  camera.position.y = 200;
  camera.position.z = 100;
  //设置相机的上为「z」轴方向
  camera.up.x = 0;
  camera.up.y = 0;
  camera.up.z = 1;
  // 设置视野的中心坐标
  camera.lookAt( {x:0, y:0, z:0 } );
}

// --------------------------------------
// ３．声明场景
var scene;
function initScene() {   
  scene = new THREE.Scene();
}

// ４．设置光源并追加到场景
var light;
function initLight() { 
  // 设置平行光源
  // var light = new THREE.DirectionalLight( hex, intensity)
  // 「hex」是用来以16进制指定光源的颜色。默认是白色「0xFFFFFF」。 
  // 「intensity」是光源的强度。默认为1。 另外，还需要通过对象的属性来设置平行光源的方向。
  light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
  // 设置光源向量
  light.position.set(30, 90, 90 );
  // 追加光源到场景
  scene.add(light);
}

// ５．声明立方体并追加到场景
var cube;
function initObject(){ 
  // 声明 [Mesh] 类的对象 [cube]。 设置构造函数的第一个参数「形状对象（geometory）」、
  // 第二个参数[材质对象（material）]。 第一参数中设置的代表立方体的形状对象，
  // 通过「CubeGeometry」类可以创建。
  // 第二个参数中代入的材质对象， 本文中使用的是反射来自光源的光线的材质 
  // 「MeshLambertMaterial」类创建的对象。
  cube = new THREE.Mesh(
       new THREE.CubeGeometry(30,60,80),                //形状の設定
       new THREE.MeshLambertMaterial({color: 0xff0000}) //材質の設定
  );
  // 追加立方体到场景，并指定位置坐标。
  scene.add(cube);
  cube.position.set(40,0,0);
}
// ６．执行渲染（threeStart() ）
function threeStart() {
  initThree();
  initCamera();
  initScene();   
  initLight();
  initObject();
  renderer.clear(); 
  renderer.render(scene, camera);
}
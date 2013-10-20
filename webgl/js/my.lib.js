function Renderer(canvas,width,height){
  self = this;
  this.canvas = canvas;
  this.width = width;
  this.height = height;
  console.log('width:'+width+' height:'+height);
  // 生成渲染器对象（属性：抗锯齿效果为设置有效）
  renderer = new THREE.WebGLRenderer({antialias: true});
  // renderer = new THREE.CanvasRenderer({antialias: true});
  renderer.shadowMapEnabled = true;//影をつける(1)
  this.setting();
  return renderer;
}

Renderer.prototype.setting = function(){
  // # 指定渲染器的高宽（和画布框大小一致）
  renderer.setSize(this.width, this.height)
    // # 追加 【canvas】 元素到 【canvas-frame】 元素中。
  this.canvas.append(renderer.domElement)
   // # 设置渲染器的清除色(clearColor)
  renderer.setClearColor (0xFFFFFF, 1.0)
}

// --------------------------------------------
function Camera(width,height){
  self = this;
  this.width = width;
  this.height = height;
  camera = new THREE.PerspectiveCamera( 60 , this.width / this.height , 1 , 10000 );
  this.setting();
  return camera;
}

Camera.prototype.setting = function(){
 // 设置相机的位置坐标
  // 另一种方法camera.position.set(50,50,100);
  camera.position.x = 390;
  camera.position.y = 0;
  camera.position.z= 150;
  //设置相机的上为「z」轴方向
  camera.up.x = 0;
  camera.up.y = 0;
  camera.up.z = 1;
  // 设置视野的中心坐标
  camera.lookAt( {x:0, y:0, z:0 } );
}


// --------------------------------------------

Light = {
  // 设置平行光源
  // var light = new THREE.DirectionalLight( hex, intensity)
  // 「hex」是用来以16进制指定光源的颜色。默认是白色「0xFFFFFF」。 
  // 「intensity」是光源的强度。默认为1。 另外，还需要通过对象的属性来设置平行光源的方向。
  // 直接光
  directional:function(){
    light = new THREE.DirectionalLight(0xFFFFFF, 1.0, 0);
    // 设置光源向量
    light.position.set( 400, 0, 150 );
    light.castShadow = true;//影をつける（2）
    // 追加光源到场景
    return light;
  },
  // 环境光
  ambient:function(){
    light = new THREE.AmbientLight(0x555555);
    return light;
  }
}

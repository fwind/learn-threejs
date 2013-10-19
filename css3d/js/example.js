

var Element = function ( num ) {

	var dom = document.createElement( 'div' );
	dom.style.width = '480px';
	dom.style.height = '360px';

	var image = document.createElement( 'img' );
	image.style.position = 'absolute';
	// image.style.width = '480px';
	image.style.height = '480px';
	image.src = 'img/'+num+'.png';
	image.id = num;
	dom.appendChild( image );

	var blocker = document.createElement( 'div' );
	blocker.style.position = 'absolute';
	blocker.style.width = '310px';
	blocker.style.height = '480px';
	blocker.style.background = 'rgba(0,0,0,0.5)';
	blocker.style.cursor = 'pointer';
	dom.appendChild( blocker );
	//imgage load event
	image.addEventListener( 'load', function ( event ) {
		console.log('image load');

		new TWEEN.Tween( object.position )
		.to( { y: Math.random() * 2000 - 1000 }, 2000 )
		.easing( TWEEN.Easing.Exponential.Out )
		.start();

	}, false );

	dom.addEventListener( 'mouseover', function () {

		blocker.style.background = 'rgba(0,0,0,0)';

	}, false );

	dom.addEventListener( 'mouseout', function () {

		blocker.style.background = 'rgba(0,0,0,0.75)';

	}, false );


	dom.addEventListener( 'click', function ( event ) {
		event.stopPropagation();
		auto = false;
		var prev = object.position.z + 400;
		new TWEEN.Tween( camera.position )
		.to( { x: object.position.x, y: object.position.y - 25 }, 1500 )
		.easing( TWEEN.Easing.Exponential.Out )
		.start();
		new TWEEN.Tween( { value: prev } )
		.to( { value: 0  }, 2000 )
		.onUpdate( function () {

			move( this.value - prev );
			prev = this.value;

		} )
		.easing( TWEEN.Easing.Exponential.Out )
		.start();

	},false)

	var object = new THREE.CSS3DObject( dom );
	object.position.x = Math.random() * 4000 - 2000;
	// object.position.y = Math.random() * 2000 - 1000;
	object.position.y = 3000;
	object.position.z = Math.random() * - 5000;
	return object;

};




function move( delta ) {

	for ( var i = 0; i < scene.children.length; i ++ ) {

		var object = scene.children[ i ];

		object.position.z += delta;
		// console.log(object.position.z);

		if ( object.position.z > 0 ) {

			object.position.z -= 5000;

		} else if ( object.position.z < - 5000 ) {

			object.position.z += 5000;

		}

	}

}

function animate() {

	requestAnimationFrame( animate );

	TWEEN.update();

	if ( auto === true ) {

		move(3);

	}

	renderer.render( scene, camera );

}


function onMouseWheel( event ) {

	move( event.wheelDelta );

}
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function init(){
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.y = - 25;


	scene = new THREE.Scene();

	renderer = new THREE.CSS3DRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.domElement.style.position = 'absolute';
	renderer.domElement.style.top = 0;
	document.getElementById( 'container' ).appendChild( renderer.domElement );


	document.body.addEventListener( 'mousewheel', onMouseWheel, false );
	window.addEventListener( 'resize', onWindowResize, false );
	document.body.addEventListener( 'click', function ( event ) {

		auto = true;

		if ( player !== undefined ) {

			player.parentNode.removeChild( player );
			player = undefined;

		}

		new TWEEN.Tween( camera.position )
		.to( { x: 0, y: - 25 }, 1500 )
		.easing( TWEEN.Easing.Exponential.Out )
		.start();

	}, false );
}



var auto = true;

$(document).ready(function(){
	console.log('Example start!');
	init();



	for ( var i = 0; i < 18; i ++ ) {

		var object = new Element(i);
		scene.add( object );
		console.log('div'+i);

	}



	animate();
});
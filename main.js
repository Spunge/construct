var Main = function(canvas_id) {
	return this.init(canvas_id);
};

Main.prototype.init = function(canvas_id) {
	this.paused = false;

	this.camera = new Camera(canvas_id);
	this.world = new World(800, 600);
	
	this.camera.observe(this.world);

	//for(var i = 0; i < 10; i++) {
		//this.world.add_entity(new Animal(this.world));
	//}

	for(var i = 0; i < 10; i++) {
		var position = {
			x: this.world.width * Math.random(),
			y: this.world.height * Math.random(),
		};

		this.world.add_entity(new Plant(this.world, position, 10));
	}

	return this;
};

Main.prototype.cycle = function() {
	if( ! this.paused) {
		this.camera.render();
		this.world.update();

		window.requestAnimationFrame(this.cycle.bind(this));
	}
};

var main;
document.addEventListener("DOMContentLoaded", function(event) { 
	main = new Main('canvas');

	window.requestAnimationFrame(main.cycle.bind(main));

	document.addEventListener('click', function() {
		main.paused = ! main.paused;

		if( ! main.paused) {
			main.cycle();
		}
	});

	document.addEventListener('mousewheel', function(e) {
		if(e.deltaY > 0) {
			main.camera.zoom_out();
		} else {
			main.camera.zoom_in();
		}
	});
});

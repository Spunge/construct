var Main = function(canvas_id) {
	return this.init(canvas_id);
};

Main.prototype.init = function(canvas_id) {
	this.paused = false;

	this.renderer = new Renderer(canvas_id)
		.init();

	this.world = new World()
		.set_renderer(this.renderer)
		.set_size(400, 300)
		.init();
	
	this.camera = new Camera()
		.set_renderer(this.renderer)
		.observe(this.world)
		.init();

	//for(var i = 0; i < 10; i++) {
		//this.world.add_entity(new Animal(this.world));
	//}

	for(var i = 0; i < 1; i++) {
		var position = {
			x: this.world.width * Math.random(),
			y: this.world.height * Math.random(),
		};

		var plant = new Plant()
			.set_renderer(this.renderer)
			.set_world(this.world)
			.set_position(position)
			.set_size(10)
			.init();

		this.world.add_entity(plant);
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

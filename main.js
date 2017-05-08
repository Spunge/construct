var Main = function(canvas_id) {
	return this.init(canvas_id);
};

Main.prototype.init = function(canvas_id) {
	this.paused = false;

	var surface = new Surface()
		.set_point_size(10);

	var tilemap = new Tilemap()
		.set_tile_size(10);

	this.world = new World()
		.set_speed(1)
		.set_size(800, 600)
		.add_tilemap(tilemap)
		.set_surface(surface);
	
	this.renderer = new Renderer(canvas_id);
	this.camera = new Camera()
		.set_renderer(this.renderer)
		.observe(this.world);

	/*
	for(var i = 0; i < 1; i++) {
		var animal = new Animal()
			.set_size(Util.random(1, 20))
			.set_position({
				x: Util.random(0, this.world.width),
				y: Util.random(0, this.world.height),
			})
			.set_velocity({
				x: Util.random(-2, 2),
				y: Util.random(-2, 2),
			})
			.set_color('#ff0000');

		this.world.add_entity(animal);
	}
	*/

	/*
	for(var i = 0; i < 1; i++) {
		var position = {
			x: this.world.width * Math.random(),
			y: this.world.height * Math.random(),
		};

		var plant = new Plant()
			.set_position(position)
			.set_size(10);

		this.world.add_entity(plant);
	}
	*/

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

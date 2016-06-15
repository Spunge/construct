var Main = function(canvas_id) {
	return this.init(canvas_id);
};

Main.prototype.init = function(canvas_id) {
	this.renderer = new Renderer(canvas_id);
	this.world = new World(this.renderer.canvas.width, this.renderer.canvas.height);
	
	this.entities = [];
	
	//for(var i = 0; i < 100; i++) {
		//this.world.add_entity(new Animal(this.world));
	//}

	var tile = this.world.tilemap.tiles[Math.floor(Math.random() * this.world.tilemap.tiles.length)];

	this.world.add_entity(new Plant(this.world, tile.position, 10));

	return this;
};

Main.prototype.cycle = function() {
	this.world.render(this.renderer);
	this.world.update();

	//setTimeout(this.cycle.bind(this), 1000);
	window.requestAnimationFrame(this.cycle.bind(this));
};

var main;
document.addEventListener("DOMContentLoaded", function(event) { 
	main = new Main('canvas');

	window.requestAnimationFrame(main.cycle.bind(main));
});

document.addEventListener('click', function() {
	main.cycle();
});

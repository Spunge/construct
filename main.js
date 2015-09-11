var Main = function(canvas_id) {
	return this.init(canvas_id);
};

Main.prototype.init = function(canvas_id) {
	this.renderer = new Renderer(canvas_id);
	this.world = new World(this.renderer);
	
	this.entities = [];
	
	for(var i = 0; i < 800; i++) {
		this.entities.push(new Point(this.world));
	}

	return this;
};

Main.prototype.update = function() {
	this.entities.forEach(function(entity) {
		entity.update();
	});
};

Main.prototype.render = function() {
	this.world.render();

	this.entities.forEach(function(entity) {
		entity.render();
	});
};

Main.prototype.cycle = function() {
	this.update();
	this.render();

	window.requestAnimationFrame(this.cycle.bind(this));
};

document.addEventListener("DOMContentLoaded", function(event) { 
	var main = new Main('canvas');

	window.requestAnimationFrame(main.cycle.bind(main));
});

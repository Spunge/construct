var Main = function(canvas_id) {
	return this.init(canvas_id);
};

Main.prototype.init = function(canvas_id) {
	this.renderer = new Renderer(canvas_id);
	this.world = new World(this.renderer);
	
	this.entities = [];
	
	for(var i = 0; i < 100; i++) {
		this.entities.push(new Animal(this.world));
	}

	//this.entities.push(new Plant(this.world));
	
	return this;
};

Main.prototype.update = function() {
	for(var i = 0; i < this.entities.length; i++) {
		this.entities[i].update();
	}
};

Main.prototype.render = function() {
	this.world.render();

	for(var i = 0; i < this.entities.length; i++) {
		this.entities[i].render();
	}
};

Main.prototype.cycle = function() {
	this.render();
	this.update();

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

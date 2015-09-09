var Point = function(world) {
	return this.init(world);
};

Point.prototype.init = function(world) {
	this.world = world;
	this.renderer = world.renderer;
	
	this.x = 0;
	this.y = 0;

	this.width = 100;
	this.height = 100;

	this.color = '#ff0000';

	return this;
};

Point.prototype.update = function() {
	this.x += 1;
};

Point.prototype.render = function() {
	this.renderer.fill_circ(this.x, this.y, this.width, this.height, this.color);
};

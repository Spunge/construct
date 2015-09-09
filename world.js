var World = function(renderer) {
	return this.init(renderer);
};

World.prototype.init = function(renderer) {
	this.renderer = renderer;
	this.width = renderer.canvas.width;
	this.height = renderer.canvas.height;

	this.entities = [];

	return this;
};

World.prototype.render = function() {
	this.renderer.fill_rect(0, 0, this.width, this.height);
};

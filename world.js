var World = function(renderer) {
	return this.init(renderer);
};

World.prototype.init = function(renderer) {
	this.renderer = renderer;
	this.speed = 1;
	this.width = renderer.canvas.width;
	this.height = renderer.canvas.height;

	this.tilemap = new Tilemap(this);

	this.entities = [];

	return this;
};

World.prototype.render = function() {
	this.renderer.fill_rect(this.width / 2, this.height / 2, this.width, this.height);

	this.tilemap.render();
};

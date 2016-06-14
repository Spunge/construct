var World = function(renderer) {
	return this.init(renderer);
};

World.prototype.init = function(renderer) {
	this.renderer = renderer;
	this.speed = 10;
	this.width = renderer.canvas.width;
	this.height = renderer.canvas.height;

	this.tilemap = new Tilemap(this);

	this.entities = [];

	return this;
};

World.prototype.add_entity = function(entity) {
	this.entities.push(entity);
};

World.prototype.remove_entity = function(entity) {
	this.entities.splice(this.entities.indexOf(entity), 1);
};

World.prototype.update = function() {
	for(var i = 0; i < this.entities.length; i++) {
		this.entities[i].update();
	}
};

World.prototype.render = function() {
	this.renderer.fill_rect(this.width / 2, this.height / 2, this.width, this.height);

	this.tilemap.render();

	for(var i = 0; i < this.entities.length; i++) {
		this.entities[i].render();
	}
};

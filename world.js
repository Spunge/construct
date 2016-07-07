var World = function() {
	this.speed = 10;
	this.tile_size = 10;
};

World.prototype.set_renderer = function(renderer) {
	this.renderer = renderer;
	return this;
};

World.prototype.set_size = function(width, height) {
	this.width = Math.ceil(width / this.tile_size) * this.tile_size;
	this.height = Math.ceil(height / this.tile_size) * this.tile_size;
	return this;
};

World.prototype.init = function() {
	this.tilemap = new Tilemap()
		.set_renderer(this.renderer)
		.set_world(this)
		.set_tile_size(this.tile_size)
		.init();

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
	this.tilemap.render();

	for(var i = 0; i < this.entities.length; i++) {
		this.entities[i].render();
	}
};

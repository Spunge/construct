var World = function(width, height) {

	var tile_size = 10;


	this.speed = 1;
	this.width = Math.ceil(width / tile_size) * tile_size;
	this.height = Math.ceil(height / tile_size) * tile_size;

	this.tilemap = new Tilemap(this, tile_size);

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

World.prototype.render = function(renderer) {
	renderer.fill_rect(this.width / 2, this.height / 2, this.width, this.height);

	this.tilemap.render(renderer);

	for(var i = 0; i < this.entities.length; i++) {
		this.entities[i].render(renderer);
	}
};

var Entity = function() {};

Entity.prototype.set_world = function(world) {
	this.world = world;
	this.tilemap = world.tilemap;
	this.occupied_tiles = [];

	return this;
};

Entity.prototype.set_renderer = function(renderer) {
	this.renderer = renderer;
	return this;
};

Entity.prototype.update = function() {
};

Entity.prototype.render = function() {
};

Entity.prototype.init = function() {
	return this;
};

Entity.prototype.remove_from_occupied_tiles = function() {
	for(var i = 0; i < this.occupied_tiles.length; i++) {
		this.occupied_tiles[i].remove_entity(this);
	}

	return this;
};

Entity.prototype.update_tilemap = function() {
	// Remove this entity from all tiles it occupies
	this.remove_from_occupied_tiles();

	this.occupied_tiles = this.tilemap.get_tiles_in_radius_of_position(this.position, this.tile_range);

	for(i = 0; i < this.occupied_tiles.length; i++) {
		this.occupied_tiles[i].add_entity(this);
	}

	return this;
};

Entity.prototype.set_position = function(position) {
	this.position = position;

	return this;
};

Entity.prototype.set_size = function(size) {
	this.size = size;
	this.half_size = this.size / 2;

	return this
		.set_tile_range()
		.update_tilemap();
};

Entity.prototype.set_tile_range = function() {
	this.tile_range = this.half_size;

	return this;
};

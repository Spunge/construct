/**
 * This is a tile
 */
var Tile = function() {};

Tile.prototype.set_renderer = function(renderer) {
	this.renderer = renderer;
	return this;
};

Tile.prototype.set_tilemap = function(tilemap) {
	this.tilemap = tilemap;
	return this;
};

Tile.prototype.set_position = function(position) {
	this.position = position;
	return this;
};

Tile.prototype.init = function() {
	this.entities = [];
	this.luminescence = 64;

	return this;
};

Tile.prototype.add_entity = function(entity) {
	this.entities.push(entity);

	return this;
};

Tile.prototype.remove_entity = function(entity) {
	this.entities.splice(this.entities.indexOf(entity), 1);

	return this;
};

Tile.prototype.render = function() {
	var color = '#440000';

	// Only paint when entities on tile
	if(this.entities.length) {
		var color_int = this.entities.length * this.luminescence;

		color = '#00'+color_int.toString(16)+'00';
	}

	// Only paint when we need to
	this.renderer.rectangle(this.position.x, this.position.y, this.tilemap.tile_size, this.tilemap.tile_size, color);
	this.renderer.rectangle(this.position.x, this.position.y, this.tilemap.tile_size - 2, this.tilemap.tile_size - 2);
};
 

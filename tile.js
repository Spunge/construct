/**
 * This is a tile
 */
var Tile = function(tilemap, position) {
	return this.init(tilemap, position);
};

Tile.prototype.init = function(tilemap, position) {
	this.tilemap = tilemap;
	this.position = position;
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

Tile.prototype.render = function(renderer) {
	var color = '#440000';

	// Only paint when entities on tile
	if(this.entities.length) {
		var color_int = this.entities.length * this.luminescence;

		color = '#00'+color_int.toString(16)+'00';
	}

	// Only paint when we need to
	renderer.rectangle(this.position.x, this.position.y, this.tilemap.tile_size, this.tilemap.tile_size, color);
	renderer.rectangle(this.position.x, this.position.y, this.tilemap.tile_size - 2, this.tilemap.tile_size - 2);
};
 

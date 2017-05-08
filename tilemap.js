/**
 * This is map of tiles
 */
var Tilemap = function() {};

Tilemap.prototype.set_world = function(world) {
	this.world = world;
	return this;
};

Tilemap.prototype.init = function() {
	if(this.world.width % this.tile_size != 0 || this.world.height % this.tile_size != 0) {
		throw new Error('World with and height should be a integer multiple of tile size');
	}

	// Amount of tiles we need for horizontal / vertical
	this.amounts = {
		horizontal: this.world.width / this.tile_size,
		vertical: this.world.height / this.tile_size,
	};
};

Tilemap.prototype.set_tile_size = function(tile_size) {
	this.tile_size = tile_size;
	return this;
};

Tilemap.prototype.get_tile_position_by_index = function(index) {
	return {
		x: (index % this.amounts.horizontal) * this.tile_size + this.tile_size / 2,
		y: Math.floor(index / this.amounts.horizontal) * this.tile_size + this.tile_size / 2,
	};
};

Tilemap.prototype.render = function() {
	// Get tile coords from position in tiles array

	return this;
};

Tilemap.prototype.get_tile_index_at_position = function(position) {
	var index =  Math.floor((position.y) / this.tile_size) * this.amounts.horizontal;
	index += Math.floor((position.x) / this.tile_size);

	return index;
};

Tilemap.prototype.get_correct_index = function(index, amount) {
	if(index < 0) {
		return amount + index % amount;
	}

	if(index >= amount) {
		return index % amount;
	}

	return index;
};

Tilemap.prototype.get_tile_at_position = function(position) {
};

Tilemap.prototype.get_tiles_in_radius_of_position = function(position, radius) {
	return [];
};

/**
 * This is map of tiles
 */
var Tilemap = function(world) {
	return this.init(world);
};

Tilemap.prototype.init = function(world) {
	this.world = world;
	this.renderer = world.renderer;

	this.tile_size = 10;

	// Amount of tiles we need for horizontal / vertical
	this.amounts = {
		horizontal: Math.ceil(this.world.width / this.tile_size),
		vertical: Math.ceil(this.world.height / this.tile_size),
	};

	// Width & Height of total tilemap
	this.width = this.amounts.horizontal * this.tile_size;
	this.height = this.amounts.vertical * this.tile_size;

	// Position (altered to center tilemap);
	this.offset = {
		x: (this.world.width - this.width) / 2,
		y: (this.world.height - this.height) / 2,
	};

	return this.create_tiles(this.amounts.horizontal * this.amounts.vertical);
};

Tilemap.prototype.get_tile_position_by_index = function(index) {
	return {
		x: (index % this.amounts.horizontal) * this.tile_size + this.tile_size / 2 + this.offset.x,
		y: Math.floor(index / this.amounts.horizontal) * this.tile_size + this.tile_size / 2 + this.offset.y,
	};
};

Tilemap.prototype.create_tiles = function(amount) {
	this.tiles = [];
	
	for(var i = 0; i < amount; i++) {
		this.tiles.push(new Tile(this, this.get_tile_position_by_index(i)));
	}

	return this;
};

Tilemap.prototype.render = function() {
	// Get tile coords from position in tiles array
	for(var i = 0; i < this.tiles.length; i++) {
		this.tiles[i].render();
	}

	return this;
};

Tilemap.prototype.get_tile_index_at_position = function(position) {
	var index =  Math.floor((position.y - this.offset.y) / this.tile_size) * this.amounts.horizontal;
	index += Math.floor((position.x - this.offset.x) / this.tile_size);

	return index;
};

Tilemap.prototype.get_tiles_in_radius_of_position = function(position, radius) {
	// Get tile indexes
	var top_left = this.get_tile_index_at_position({ x: position.x - radius, y: position.y - radius });
	var bottom_right = this.get_tile_index_at_position({ x: position.x + radius, y: position.y + radius });

	// Array of indexes tile occupies
	var tiles = [];

	// Loop each y axis and x axis starting at top_left moving to bottom_right
	for(var y = Math.floor(top_left / this.amounts.horizontal); y <= Math.floor(bottom_right / this.amounts.horizontal); y++) {
		for(var x = top_left % this.amounts.horizontal; x <= bottom_right % this.amounts.horizontal; x++) {
			// Calculate index of possible occupied tile
			var index = (y * this.amounts.horizontal) + x;
			// Check if this index is a valid tile
			if(index >= 0 && index < this.tiles.length) {
				tiles.push(this.tiles[index]);
			}
		}
	}

	return tiles;
};

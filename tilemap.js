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
	this.tile_radius = Math.sqrt(Math.pow(this.tile_size / 2, 2) * 2);

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

Tilemap.prototype.correct_position = function(position) {
	if(position.x < 0) {
		position.x = this.width + position.x;
	}
	if(position.x > this.width) {
		position.x = position.x - this.width;
	}
	if(position.y < 0) {
		position.y = this.height + position.y;
	}
	if(position.y > this.height) {
		position.y = position.y - this.height;
	}

	return position;
};

Tilemap.prototype.get_tile_at_position = function(position) {
	// Make sure where not out of bounds
	var correct_position = this.correct_position(position);

	var index =  Math.floor((position.y) / this.tile_size) * this.amounts.horizontal;
	index += Math.floor((position.x) / this.tile_size);

	return this.tiles[index];
};

/*
Tilemap.prototype.is_tile_in_radius_of_position = function(tile, position, radius) {
	var delta_x = position.x - tile.position.x;
	var delta_y = position.y - tile.position.y;

	var delta = Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_y, 2));

	return (delta < radius + this.tile_radius);
};
*/

Tilemap.prototype.get_tiles_in_radius_of_position = function(position, radius) {
	var tiles = [];

	var corrected_position = {
		x: position.x - this.offset.x,
		y: position.y - this.offset.y,
	};

	var top_left = this.get_tile_at_position({
		x: corrected_position.x - radius,
		y: corrected_position.y - radius,
	});
	
	var bottom_right = this.get_tile_at_position({
		x: corrected_position.x + radius,
		y: corrected_position.y + radius,
	});

	var pointer = {
		x: top_left.position.x,
		y: top_left.position.y,
	};

	while(true) {
		pointer.x = top_left.position.x;

		while(true) {
			//var tile = this.get_tile_at_position(pointer);

			//if(this.is_tile_in_radius_of_position(tile, corrected_position, radius)) {
				//tiles.push(tile);
			//}

			tiles.push(this.get_tile_at_position(pointer));

			if(pointer.x == bottom_right.position.x) {
				break;
			}

			pointer.x += this.tile_size;
		}

		if(pointer.y == bottom_right.position.y) {
			break;
		}

		pointer.y += this.tile_size;
	}

	return tiles;
};

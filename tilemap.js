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

Tilemap.prototype.get_correct_index = function(index, amount) {
	if(index < 0) {
		return amount + index % amount;
	}

	if(index >= amount) {
		return index % amount;
	}

	return index;
};

Tilemap.prototype.get_tiles_in_radius_of_position = function(position, radius) {

	/*

	// Get tile indexes
	var top_left = this.get_tile_index_at_position({ x: position.x - radius, y: position.y - radius });
	var bottom_right = this.get_tile_index_at_position({ x: position.x + radius, y: position.y + radius });

	// Array of indexes tile occupies
	var tiles = [];
	//console.log('loop');

	//console.log(this.amounts.horizontal, this.amounts.vertical);
	//console.log(top_left, bottom_right);

	var start_x = top_left % this.amounts.horizontal;
	var end_x = bottom_right % this.amounts.horizontal;

	console.log(top_left, bottom_right);

	var width = (bottom_right - top_left) % this.amounts.horizontal;

	for(var i = 0; i <= width; i++) {
		tiles.push(this.tiles[this.get_correct_index(top_left + i, this.tiles.length)]);
	}
	*/

	/*
	var start_x = top_left % this.amounts.horizontal;
	var end_x = bottom_right % this.amounts.horizontal;

	var start_y = Math.floor((top_left + start_x) / this.amounts.horizontal) % this.amounts.vertical;
	var end_y = Math.floor((bottom_right - end_x) / this.amounts.horizontal) % this.amounts.vertical;

	console.log(start_y, end_y, start_x, end_x);

	for(var y = start_y; y % this.amounts.vertical != end_y; y++) {
		//var start = this.get_correct_index(top_left % this.amounts.horizontal, this.amounts.horizontal);
		//var end = this.get_correct_index(bottom_right % this.amounts.horizontal, this.amounts.horizontal);

		for(var x = start_x; x % this.amounts.horizontal != end_x; x++) {
			//var index = (y + 1) * this.amounts.horizontal + (x + 1);
			var index = y * this.amounts.horizontal + x;
			//console.log(index);
			//console.log(index, delta);
			tiles.push(this.tiles[this.get_correct_index(index, this.tiles.length)]);
		}
	}
	*/

	/*
	for(var index = top_left; index <= bottom_right; index++) {
		var x_min = top_left % this.amounts.horizontal;
		var x_max = bottom_right % this.amounts.horizontal;
		console.log(x_min, x_max, index);

		tiles.push(this.tiles[get_correct_index(index, this.tiles.length)]);

		if(index % this.amounts.horizontal >= x_max) {
			index += this.amounts.horizontal - (x_max - x_min) - 1;
			continue;
		}
	}
	*/

	/*
	// Loop each y axis and x axis starting at top_left moving to bottom_right
	for(var y = Math.floor(top_left / this.amounts.horizontal); y <= Math.floor(bottom_right / this.amounts.horizontal); y++) {
		var y_index = get_correct_index(y, this.amounts.vertical);

		for(var x = get_correct_index(top_left % this.amounts.horizontal, this.amounts.horizontal); x <= bottom_right % this.amounts.horizontal; x++) {
			var x_index = get_correct_index(x, this.amounts.horizontal);

			//var index = (y_index * this.amounts.horizontal) + x_index;

			var index = get_correct_index(y * this.amounts.horizontal + x, this.tiles.length);
			console.log(index);

			//if(index < 0) {
				//index = this.tiles.length + index;
			//}
			//if(index >= this.tiles.length) {
				//index = index - this.tiles.length;
			//}

			// Add tile when we should
			tiles.push(this.tiles[index]);
		}
	}
	*/

	return tiles;
};

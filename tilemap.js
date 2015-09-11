/**
 * This is a tile
 */
var Tile = function() {
	return this.init();
};

Tile.prototype.init = function() {
	this.entities = [];
	return this;
};

Tile.prototype.add_entity = function(entity) {
	this.entities.push(entity);
	return this;
};

Tile.prototype.remove_entity = function(entity) {
	this.entities.remvoe(entity);
	return this;
};
 
/**
 * This is map of tiles
 */
var Tilemap = function(world) {
	return this.init(world);
};

Tilemap.prototype.init = function(world) {
	this.world = world;
	this.renderer = world.renderer;

	this.tile_size = 50;

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

Tilemap.prototype.create_tiles = function(amount) {
	this.tiles = [];
	
	for(var i = 0; i < amount; i++) {
		this.tiles.push(new Tile());
	}

	return this;
};

Tilemap.prototype.render = function() {
	// Get tile coords from position in tiles array
	var get_tile_position = function(i) {
		return {
			x: (i % this.amounts.horizontal) * this.tile_size,
			y: Math.floor(i / this.amounts.horizontal) * this.tile_size,
		};
	}.bind(this);

	var paint_tile = function(position) {
		this.renderer.fill_rect(this.offset.x + position.x, this.offset.y + position.y, this.tile_size, this.tile_size, '#ffffff');
		this.renderer.fill_rect(this.offset.x + position.x + 1, this.offset.y + position.y + 1, this.tile_size - 2, this.tile_size - 2, '#000000');
	}.bind(this);

	var position;

	for(var i = 0; i < this.tiles.length; i++) {
		paint_tile(get_tile_position(i));
	}

	return this;
};

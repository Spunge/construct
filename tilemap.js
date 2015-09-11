var Tile = function() {};

var Tilemap = function(world) {
	return this.init(world);
};

Tilemap.prototype.init = function(world) {
	this.world = world;

	this.tile_size = 100;

	// Amount of tiles we need for horizontal / vertical
	var amount = {
		horizontal: Math.ceil(this.world.width / this.tile_size),
		vertical: Math.ceil(this.world.height / this.tile_size),
	};

	// Width & Height of total tilemap
	this.width = amount.horizontal * this.tile_size;
	this.height = amount.vertical * this.tile_size;

	// Position (altered to center tilemap);
	this.position = {
		x: (this.width - this.world.width) / 2,
		y: (this.height - this.world.height) / 2,
	};

	return this.create_tiles(amount.horizontal * amount.vertical);
};

Tilemap.prototype.create_tiles = function(amount) {
	this.tiles = [];
	
	for(var i = 0; i < amount; i++) {
		this.tiles.push(new Tile());
	}

	return this;
};

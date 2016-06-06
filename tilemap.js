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
	this.entities.splice(this.entities.indexOf(entity), 1);

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
			x: (i % this.amounts.horizontal) * this.tile_size + this.tile_size / 2,
			y: Math.floor(i / this.amounts.horizontal) * this.tile_size + this.tile_size / 2,
		};
	}.bind(this);

	var paint_tile = function(tile, position) {
		var color_int = tile.entities.length * 64 - 1;
		var color = 'rgb('+color_int+', '+color_int+', '+color_int+')';

		this.renderer.fill_rect(this.offset.x + position.x, this.offset.y + position.y, this.tile_size, this.tile_size, color);
		this.renderer.fill_rect(this.offset.x + position.x, this.offset.y + position.y, this.tile_size - 4, this.tile_size - 4, '#000000');
	}.bind(this);

	var position;

	for(var i = 0; i < this.tiles.length; i++) {
		paint_tile(this.tiles[i], get_tile_position(i));
	}

	return this;
};

Tilemap.prototype.get_tile_at_position = function(position) {
	var index =  Math.floor((position.y - this.offset.y) / this.tile_size) * this.amounts.horizontal;
	index += Math.floor((position.x - this.offset.x) / this.tile_size);

	return index;
};

Tilemap.prototype.get_occupied_tiles = function(entity) {
	return [
		this.get_tile_at_position({ x: entity.position.x + entity.radius, y: entity.position.y + entity.radius }),
		this.get_tile_at_position({ x: entity.position.x + entity.radius, y: entity.position.y - entity.radius }),
		this.get_tile_at_position({ x: entity.position.x - entity.radius, y: entity.position.y - entity.radius }),
		this.get_tile_at_position({ x: entity.position.x - entity.radius, y: entity.position.y + entity.radius }),
	]

	.map(function(index) {
		return index;
	})

	.reduce(function(aggregate, index) {
		if(aggregate.indexOf(index) === -1) {
			aggregate.push(index);
		}

		return aggregate;
	}, [])

	.map(function(index) {
		return this.tiles[index];
	}.bind(this));
};

Tilemap.prototype.remove_entity = function(entity) {
	entity.occupied_tiles.forEach(function(tile) {
		tile.remove_entity(entity);
	});

	entity.occupied_tiles = [];
};

Tilemap.prototype.add_entity = function(entity) {
	this.get_occupied_tiles(entity).map(function(tile) {
		tile.add_entity(entity);
		entity.occupied_tiles.push(tile);
	});
};

Tilemap.prototype.update_entity = function(entity) {
	this.remove_entity(entity);
	this.add_entity(entity);
};

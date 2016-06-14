
var Plant = function(world, tile, size) {
	Entity.call(this, world);

	this.set_size(size);
	this.max_size = 20;
	this.offspring = 2;

	// Get a random tile
	// Bottom left
	//var index = Math.floor((this.tilemap.amounts.vertical - 2) * this.tilemap.amounts.horizontal);
	// Top left
	//var index = Math.floor(1 + this.tilemap.amounts.horizontal);
	// Bottom right
	//var index = Math.floor(this.tilemap.tiles.length - this.tilemap.amounts.horizontal - 2);
	// Center top
	//var index = Math.floor(Math.round(this.tilemap.amounts.horizontal / 2) + this.tilemap.amounts.horizontal);
	var position = tile.position;

	// Plant plant there
	this.set_position({
		x: position.x,
		y: position.y,
	});

	this.set_tile_range();

	this.update_tilemap();
};

Plant.prototype = Object.create(Entity.prototype);
Plant.prototype.constructor = Plant;

Plant.prototype.update = function() {
	this.set_size(this.size * (1 + 0.0001 * this.world.speed));
	this.set_tile_range();

	this.update_tilemap();

	if(this.size > this.max_size) {
		this.die();
	}
};

Plant.prototype.create_offspring = function() {
	for(var i = 0; i < this.offspring; i++) {
		var tile = this.occupied_tiles[Math.floor(Math.random() * this.occupied_tiles.length)];
		this.world.add_entity(new Plant(this.world, tile, this.size / this.offspring));
	}
};

Plant.prototype.die = function() {
	this.create_offspring();
	this.remove_from_occupied_tiles();
	this.world.remove_entity(this);
};

Plant.prototype.render = function() {
	this.renderer.fill_rect(this.position.x, this.position.y, this.size, this.size, '#00ff00');
};

Plant.prototype.set_tile_range = function() {
	this.tile_range = this.size * 2;
};

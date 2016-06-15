
var Plant = function(world, position, size) {
	Entity.call(this, world);

	this.set_size(size);
	this.max_size = 20;
	this.offspring = 2;

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

Plant.prototype.render = function(renderer) {
	renderer.fill_rect(this.position.x, this.position.y, this.size, this.size, '#00ff00');
};

Plant.prototype.set_tile_range = function() {
	this.tile_range = this.size * 2;
};

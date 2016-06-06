
var Plant = function(world) {
	Entity.call(this, world);

	this.set_size(4);

	// Get a random tile
	var index = Math.floor(Math.random() * this.tilemap.tiles.length);
	var position = this.tilemap.tiles[index].position;

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
};

Plant.prototype.render = function() {
	this.renderer.fill_rect(this.position.x, this.position.y, this.size, this.size, '#00ff00');
};

Plant.prototype.set_tile_range = function() {
	this.tile_range = this.size * 2;
};


var Plant = function(world) {
	Entity.call(this, world);

	this.set_size(7.48);

	// Get a random tile
	//var index = Math.floor(Math.random() * this.tilemap.tiles.length);
	// Bottom left
	//var index = Math.floor(1 + (this.tilemap.amounts.vertical - 2) * this.tilemap.amounts.horizontal);
	// Top left
	var index = Math.floor(1 + this.tilemap.amounts.horizontal);
	// Bottom right
	//var index = Math.floor(this.tilemap.tiles.length - this.tilemap.amounts.horizontal - 2);
	// Center top
	//var index = Math.floor(Math.round(this.tilemap.amounts.horizontal / 2) + this.tilemap.amounts.horizontal);
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

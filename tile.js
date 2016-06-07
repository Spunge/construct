/**
 * This is a tile
 */
var Tile = function(tilemap, position) {
	return this.init(tilemap, position);
};

Tile.prototype.init = function(tilemap, position) {
	this.tilemap = tilemap;
	this.renderer = tilemap.renderer;
	this.position = position;
	this.entities = [];
	this.luminescence = 100;

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

Tile.prototype.render = function() {
	// Only paint when entities on tile
	if(this.entities.length) {
		var color_int = this.entities.length * this.luminescence;

		var color = 'rgb('+color_int+', '+color_int+', '+color_int+')';

		// Only paint when we need to
		this.renderer.fill_rect(this.position.x, this.position.y, this.tilemap.tile_size, this.tilemap.tile_size, color);
		this.renderer.fill_rect(this.position.x, this.position.y, this.tilemap.tile_size - 4, this.tilemap.tile_size - 4);
	}
};
 

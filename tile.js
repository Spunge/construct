/**
 * This is a tile
 */
var Tile = function() {};

Tile.prototype.set_renderer = function(renderer) {
	this.renderer = renderer;
	return this;
};

Tile.prototype.set_tilemap = function(tilemap) {
	this.tilemap = tilemap;
	return this;
};

Tile.prototype.set_position = function(position) {
	this.position = position;

	this.translation = this.create_translation(this.tilemap.tile_size);

	return this;
};

Tile.prototype.create_translation = function(size) {
	return this.renderer.multiply_matrices(
		this.renderer.identity_matrix(),
		this.renderer.scale_matrix(size, size),
		this.renderer.translate_matrix(this.position.x - size / 2, this.position.y - size / 2)
	);
};

Tile.prototype.init = function() {
	this.entities = [];
	this.luminescence = 64;

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
	if(this.entities.length) {
		var color_int = this.entities.length * this.luminescence;
		var hex = color_int.toString(16);

		color = '#' + hex + hex + hex;

		// Draw outer box
		this.renderer
			.set_color(color)
			.set_translation(this.translation)
			.draw();
	}
};
 

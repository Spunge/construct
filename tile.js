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

	this.outer_translation = this.create_translation(this.tilemap.tile_size);
	this.inner_translation = this.create_translation(this.tilemap.tile_size * 0.9);

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

	this.init_buffer();

	return this;
};

Tile.prototype.init_buffer = function() {
	this.buffer = this.renderer.gl.createBuffer();

	this.renderer.gl.bindBuffer(this.renderer.gl.ARRAY_BUFFER, this.buffer);
	this.renderer.gl.bufferData(
		this.renderer.gl.ARRAY_BUFFER,
		new Float32Array([
			0, 0,
			1, 0,
			0, 1,
			0, 1,
			1, 0,
			1, 1
		]),
		this.renderer.gl.STATIC_DRAW
	);

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
	var color = '#440000';

	// Only paint when entities on tile
	if(this.entities.length) {
		var color_int = this.entities.length * this.luminescence;

		color = '#00'+color_int.toString(16)+'00';
	}

	// Draw outer box
	this.renderer
		.set_color(color)
		.set_buffer(this.buffer)
		.set_translation(this.outer_translation)
		.draw()
		.set_color('#000000')
		.set_translation(this.inner_translation)
		.draw();
};
 


var Plant = function() {
	this.max_size = 20;
	this.offspring = 2;
};

Plant.prototype = Object.create(Entity.prototype);
Plant.prototype.constructor = Plant;

Plant.prototype.update = function() {
	// Update size
	//this.set_size(this.size * (1 + 0.0001 * this.world.speed));
	this.update_translation();

	// Die when we grow to big
	//if(this.size > this.max_size) {
		//this.die();
	//}
};

Plant.prototype.init = function() {
	return this
		.update_translation()
		.init_buffer();
};

Plant.prototype.update_translation = function() {
	this.translation = this.renderer.multiply_matrices(
		this.renderer.identity_matrix(),
		this.renderer.translate_matrix(this.position.x, this.position.y)
	);

	return this;
};

Plant.prototype.init_buffer = function() {
	this.buffer = this.renderer.gl.createBuffer();

	this.renderer.gl.bindBuffer(this.renderer.gl.ARRAY_BUFFER, this.buffer);
	this.renderer.gl.bufferData(
		this.renderer.gl.ARRAY_BUFFER,
		new Float32Array([
			0, 0,
			this.size, 0,
			0, this.size,
			0, this.size,
			this.size, 0,
			this.size, this.size 
		]),
		this.renderer.gl.STATIC_DRAW
	);

	return this;
};

Plant.prototype.create_offspring = function() {
	for(var i = 0; i < this.offspring; i++) {
		// Get random position to put offspring
		var random_angle = Math.random() * 2 * Math.PI;
		var random_radius = Math.random() * this.tile_range * 2;
		var position = {
			x: random_radius * Math.cos(random_angle) + this.position.x,
			y: random_radius * Math.sin(random_angle) + this.position.y,
		};

		// Create offspring
		var plant = new Plant()
			.set_renderer(this.renderer)
			.set_world(this.world)
			.set_position(position)
			.set_size(this.size / this.offspring)
			.init();

		// Add it to world
		this.world.add_entity(plant);
	}

	return this;
};

Plant.prototype.die = function() {
	// Remove from world
	this.world.remove_entity(this);

	// Remove from tiles && create offspring
	return this
		.remove_from_occupied_tiles()
		.create_offspring();
};

Plant.prototype.render = function() {
	this.renderer
		.set_color('#00ff00')
		.set_buffer(this.buffer)
		.set_translation(this.translation)
		.draw();
};

Plant.prototype.set_tile_range = function() {
	this.tile_range = this.size * 3;

	return this;
};

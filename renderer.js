var Renderer = function(canvas_id) {
	this.background = [0, 0, 0];

	this.canvas = document.getElementById(canvas_id);
	this.resize();

	window.addEventListener('resize', function() {
		this.resize();
		this.calculate_offset();
	}.bind(this));
};

Renderer.prototype.init = function() {
	// Get context
	this.gl = this.canvas.getContext("webgl");

	// Create program
	var program = createProgramFromScripts(this.gl, ["2d-vertex-shader", "2d-fragment-shader"]);
	this.gl.useProgram(program);

	this.gl.clearColor(0, 0, 0, 1);

	// Where the data goes
	this.position_location = this.gl.getAttribLocation(program, "a_position");
	this.color_location = this.gl.getUniformLocation(program, "u_color");
	this.matrix_location = this.gl.getUniformLocation(program, "u_matrix");

	// set the resolution
	var resolutionLocation = this.gl.getUniformLocation(program, "u_resolution");
	this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);

	return this;
};

Renderer.prototype.multiply_matrices = function() {
	// Put first matrix in cache
	var cache = arguments[0];

	// Multiply cache with second matrix
	for(var i = 1; i < arguments.length; i++) {
		var a00 = cache[0 * 3 + 0];
		var a01 = cache[0 * 3 + 1];
		var a02 = cache[0 * 3 + 2];
		var a10 = cache[1 * 3 + 0];
		var a11 = cache[1 * 3 + 1];
		var a12 = cache[1 * 3 + 2];
		var a20 = cache[2 * 3 + 0];
		var a21 = cache[2 * 3 + 1];
		var a22 = cache[2 * 3 + 2];
		var b00 = arguments[i][0 * 3 + 0];
		var b01 = arguments[i][0 * 3 + 1];
		var b02 = arguments[i][0 * 3 + 2];
		var b10 = arguments[i][1 * 3 + 0];
		var b11 = arguments[i][1 * 3 + 1];
		var b12 = arguments[i][1 * 3 + 2];
		var b20 = arguments[i][2 * 3 + 0];
		var b21 = arguments[i][2 * 3 + 1];
		var b22 = arguments[i][2 * 3 + 2];

		cache = [
			a00 * b00 + a01 * b10 + a02 * b20,
			a00 * b01 + a01 * b11 + a02 * b21,
			a00 * b02 + a01 * b12 + a02 * b22,
			a10 * b00 + a11 * b10 + a12 * b20,
			a10 * b01 + a11 * b11 + a12 * b21,
			a10 * b02 + a11 * b12 + a12 * b22,
			a20 * b00 + a21 * b10 + a22 * b20,
			a20 * b01 + a21 * b11 + a22 * b21,
			a20 * b02 + a21 * b12 + a22 * b22,
		];
	}
	
	return cache;
};

Renderer.prototype.identity_matrix = function() {
	return [
		1, 0, 0,
		0, 1, 0,
		0, 0, 1,
	];
};

Renderer.prototype.translate_matrix = function(x, y) {
	return [
		1, 0, 0,
		0, 1, 0,
		x, y, 1,
	];
};

Renderer.prototype.rotate_matrix = function(angle) {
	var c = Math.cos(angle);
	var s = Math.sin(angle);

	return [
		c, -s, 0,
		s, c, 0,
		0, 0, 1,
	];
};

Renderer.prototype.scale_matrix = function(x, y) {
	return [
		x, 0, 0,
		0, y, 0,
		0, 0, 1,
	];
};

Renderer.prototype.resize = function() {
	this.canvas.height = window.innerHeight;
	this.canvas.width = window.innerWidth;
};

Renderer.prototype.set_scale = function(scale) {
	this.scale = scale;
};

Renderer.prototype.set_viewport = function(width, height) {
	this.viewport = {
		width: width,
		height: height,
	};

	this.calculate_offset();
};

Renderer.prototype.calculate_offset = function() {
	this.offset = {
		x: (this.canvas.width - this.viewport.width * this.scale) / 2,
		y: (this.canvas.height - this.viewport.height * this.scale) / 2,
	};
};

Renderer.prototype.clear = function() {
	this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	return this;
};

Renderer.prototype.hex_to_rgb = function(string) {
	var hex = parseInt(string.substring(1), 16);
	var r = hex >> 16;
	var g = hex >> 8 & 0xFF;
	var b = hex & 0xFF;

	return [r / 255, g / 255, b / 255];
};

Renderer.prototype.set_color = function(color) {
	// Get color in RGB
	color = this.hex_to_rgb(color || '#000000');

	// Set color uniform
	this.gl.uniform4f(this.color_location, color[0], color[1], color[2], 1);

	return this;
};

Renderer.prototype.set_translation = function(matrix) {
	matrix = this.multiply_matrices(
		matrix,
		this.scale_matrix(this.scale, this.scale),
		this.translate_matrix(this.offset.x, this.offset.y)
	);

	this.gl.uniformMatrix3fv(this.matrix_location, false, matrix);
	return this;
};

Renderer.prototype.set_buffer = function(buffer) {
	// Bind to buffer
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);

	// Set up <x> so we can draw
	this.gl.enableVertexAttribArray(this.position_location);
	this.gl.vertexAttribPointer(this.position_location, 2, this.gl.FLOAT, false, 0, 0);

	return this;
};

Renderer.prototype.draw = function() {
	this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
	return this;
};


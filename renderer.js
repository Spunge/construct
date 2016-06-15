var Renderer = function(canvas_id) {
	this.background = [0, 0, 0];

	this.canvas = document.getElementById(canvas_id);
	this.resize();

	this.init_gl();

	window.addEventListener('resize', function() {
		this.resize();
		this.calculate_offset();
	}.bind(this));

	return this;
};

Renderer.prototype.init_gl = function() {
	// Get context
	this.gl = this.canvas.getContext("webgl");

	// Create program
	var program = createProgramFromScripts(this.gl, ["2d-vertex-shader", "2d-fragment-shader"]);
	this.gl.useProgram(program);

	// Where the data goes
	this.position_location = this.gl.getAttribLocation(program, "a_position");
	this.color_location = this.gl.getUniformLocation(program, "u_color");

	// set the resolution
	var resolutionLocation = this.gl.getUniformLocation(program, "u_resolution");
	this.gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

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
	this.fill_rect(0, 0, this.canvas.width, this.canvas.height, this.background);
};

Renderer.prototype.box = function() {
	if(this.offset.x > 0) {
		this.fill_rect(0, 0, this.offset.x, this.canvas.height, this.background);
		this.fill_rect(this.offset.x + this.viewport.width * this.scale, 0, this.offset.x, this.canvas.height, this.background);
	}
	if(this.offset.y > 0) {
		this.fill_rect(0, 0, this.canvas.width, this.offset.y, this.background);
		this.fill_rect(0, this.offset.y + this.viewport.height * this.scale, this.canvas.width, this.offset.y, this.background);
	}
};

Renderer.prototype.hex_to_rgb = function(string) {
	var hex = parseInt(string.substring(1), 16);
	var r = hex >> 16;
	var g = hex >> 8 & 0xFF;
	var b = hex & 0xFF;

	return [r / 255, g / 255, b / 255];
};

Renderer.prototype.fill_rect = function(x, y, width, height, color) {
	var buffer = this.gl.createBuffer();
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
	this.gl.bufferData(
		this.gl.ARRAY_BUFFER,
		new Float32Array([
			x, y,
			x + width, y,
			x, y + height,
			x, y + height,
			x + width, y,
			x + width, y + height 
		]),
		this.gl.STATIC_DRAW
	);

	this.gl.uniform4f(this.color_location, color[0], color[1], color[2], 1);

	this.gl.enableVertexAttribArray(this.position_location);
	this.gl.vertexAttribPointer(this.position_location, 2, this.gl.FLOAT, false, 0, 0);

	// draw
	this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

	//this.context.fillStyle = color || '#000000';
	//this.context.fillRect(x, y, width, height);
};

Renderer.prototype.rectangle = function(x, y, width, height, color) {
	this.fill_rect(
		this.offset.x + (x * this.scale) - (width * this.scale) / 2, 
		this.offset.y + (y * this.scale) - (height * this.scale) / 2, 
		width * this.scale, 
		height * this.scale,
		this.hex_to_rgb(color || '#000000')
	);
};

Renderer.prototype.fill_circ = function(x, y, radius, color) {
	// Make renderer render another circle at the other side of the screen when necessary
	// TODO should be done elsewhere. Keep renderer as stupid as it can be
	/*
	if(x + radius > this.canvas.width) {
		this.circle(x - this.canvas.width, y, radius, color);
	}
	if(x - radius < 0) {
		this.circle(this.canvas.width + x, y, radius, color);
	}
	if(y + radius > this.canvas.height) {
		this.circle(x, y - this.canvas.height, radius, color);
	}
	if(y - radius < 0) {
		this.circle(x, this.canvas.height + y, radius, color);
	}
	*/
	this.context.beginPath();
	this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
	this.context.fillStyle = color;
	this.context.fill();
};

Renderer.prototype.circle = function(x, y, radius, color) {
	this.fill_circ(
		this.offset.x + (x * this.scale), 
		this.offset.y + (y * this.scale), 
		radius * this.scale,
		color
	);
};

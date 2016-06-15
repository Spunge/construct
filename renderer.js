var Renderer = function(canvas_id) {
	this.canvas = document.getElementById(canvas_id);
	this.context = this.canvas.getContext('2d');

	this.resize();
	//this.set_viewport(0, 0);

	window.addEventListener('resize', function() {
		console.log('test');
		this.resize();
		this.calculate_offset();
	}.bind(this));

	return this;
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
	this.fill_rect(0, 0, this.canvas.width, this.canvas.height);
};

Renderer.prototype.box = function() {
	if(this.offset.x > 0) {
		this.fill_rect(0, 0, this.offset.x, this.canvas.height);
		this.fill_rect(this.offset.x + this.viewport.width * this.scale, 0, this.offset.x, this.canvas.height);
	}
	if(this.offset.y > 0) {
		this.fill_rect(0, 0, this.canvas.width, this.offset.y);
		this.fill_rect(0, this.offset.y + this.viewport.height * this.scale, this.canvas.width, this.offset.y);
	}
};

Renderer.prototype.fill_rect = function(x, y, width, height, color) {
	this.context.fillStyle = color || '#000000';
	this.context.fillRect(x, y, width, height);
};

Renderer.prototype.rectangle = function(x, y, width, height, color) {
	this.fill_rect(
		this.offset.x + (x * this.scale) - (width * this.scale) / 2, 
		this.offset.y + (y * this.scale) - (height * this.scale) / 2, 
		width * this.scale, 
		height * this.scale,
		color
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

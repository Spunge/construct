var Renderer = function(canvas_id) {
	return this.init(canvas_id);
};

Renderer.prototype.init = function(canvas_id) {
	this.canvas = document.getElementById(canvas_id);
	this.canvas.height = window.innerHeight;
	 
	this.canvas.width = window.innerWidth;

	this.context = this.canvas.getContext('2d');

	return this;
};

Renderer.prototype.fill_rect = function(x, y, width, height, color) {
	this.context.fillStyle = color || '#000000';
	this.context.fillRect(x - width / 2, y - height / 2, width, height);
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

	this.circle(x, y, radius, color);
};

Renderer.prototype.circle = function(x, y, radius, color) {
	this.context.beginPath();
	this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
	this.context.fillStyle = color;
	this.context.fill();
};

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
	this.context.fillRect(x, y, width, height);
};

Renderer.prototype.fill_circ = function(x, y, size, color) {
	// TODO - this is broken
	this.context.beginPath();
	this.context.arc(x, y, size / 2, 0, 2 * Math.PI, false);
	this.context.fillStyle = color;
	this.context.fill();
};

var Camera = function() {};

Camera.prototype.set_renderer = function(renderer) {
	this.renderer = renderer;
	return this;
};

Camera.prototype.init = function() {
	return this;
};

Camera.prototype.observe = function(world) {
	this.world = world;
	this.zoom(0.8);

	return this;
}; 

Camera.prototype.zoom = function(zoom) {
	this.scale = zoom;

	this.renderer.set_scale(zoom);
	this.renderer.set_viewport(this.world.width, this.world.height);
};

Camera.prototype.zoom_in = function() {
	this.zoom(this.scale * 1.1);
};

Camera.prototype.zoom_out = function() {
	this.zoom(this.scale / 1.1);
};

Camera.prototype.render = function() {
	this.renderer.clear();

	this.world.render();

	//this.renderer.box();
};

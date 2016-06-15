var Camera = function(canvas_id) {
	this.renderer = new Renderer(canvas_id);
};

Camera.prototype.observe = function(world) {
	this.world = world;

	this.zoom(0.8);
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

	this.world.render(this.renderer);

	this.renderer.box();
};

var Entity = function(world) {
	this.world = world;
	this.renderer = world.renderer;

	this.tilemap = world.tilemap;
	this.occupied_tiles = [];

	return this;
};


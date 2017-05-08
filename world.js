var World = function() {
	this.tilemaps = [];
	this.entities = [];
};

World.prototype.set_speed = function(speed) {
	this.speed = speed;
	return this;
};

World.prototype.set_size = function(width, height) {
	this.width = width;
	this.height = height;
	return this;
};

World.prototype.get_position_in_world = function(position) {
	return {
		x: ((position.x % this.width) + this.width) % this.width,
		y: ((position.y % this.height) + this.height) % this.height,
	}
};

World.prototype.set_camera = function(camera) {
	this.camera = camera;
	return this;
};

World.prototype.set_surface = function(surface) {
	this.surface = surface;
	surface
		.set_world(this)
		.init();
	return this;
};

World.prototype.add_tilemap = function(tilemap) {
	this.tilemaps.push(tilemap);
	tilemap
		.set_world(this)
		.init();
	return this;
}

World.prototype.add_entity = function(entity) {
	this.entities.push(entity);
	entity.set_world(this);
	return this;
};

World.prototype.remove_entity = function(entity) {
	this.entities.splice(this.entities.indexOf(entity), 1);
};

World.prototype.update = function() {
	for(var i = 0; i < this.entities.length; i++) {
		this.entities[i].update();
	}
};

World.prototype.render = function() {
	if(this.surface) {
		this.surface.render();
	}

	for(var i = 0; i < this.tilemaps.length; i++) {
		this.tilemaps[i].render();
	}

	for(var i = 0; i < this.entities.length; i++) {
		this.entities[i].render();
	}
};

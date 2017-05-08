
var Surface = function() {
	this.points = [];
};

Surface.prototype.set_point_size = function(point_size) {
	this.point_size = point_size;
	return this;
};

Surface.prototype.set_world = function(world) {
	this.world = world;
	return this;
};

Surface.prototype.init = function() {
	if(this.world.width % this.point_size != 0 || this.world.height % this.point_size != 0) {
		throw new Error('World with and height should be a integer multiple of point size');
	}

	// Amount of points we need for horizontal / vertical
	this.amounts = {
		horizontal: this.world.width / this.point_size,
		vertical: this.world.height / this.point_size,
	};

	for(var x = 0; x < this.amounts.horizontal; x++) {
		for(var y = 0; y < this.amounts.vertical; y++) {
			this.points.push(Util.random(0, 1));
		}
	}

	console.log(this.points);
}

Surface.prototype.render = function() {
	
}

function random(min, max) {
	return Math.random() * (max - min) + min;
}

var Point = function(world) {
	Entity.call(this, world);

	//this.diameter = random(10, 100);
	this.diameter = 30;
	this.radius = this.diameter / 2;
	
	this.position = {
		x: random(this.radius, this.world.width - this.radius),
		y: random(this.radius, this.world.height - this.radius),
	};

	var speed = random(0.5, 1.5) * world.speed;
	this.velocity = {
		x: random(speed * -1, speed),
		y: random(speed * -1, speed),
	};

	this.update_tilemap();

	this.color = '#ff0000';

	return this;
};

Point.prototype = Object.create(Entity.prototype);
Point.prototype.constructor = Point;

Point.prototype.update = function() {
	this.check_collisions_with_wall();

	this.position.x += this.velocity.x;
	this.position.y += this.velocity.y;

	this.update_tilemap();
};

function remove_entity_from_tile(tile, entity) {
	tile.remove_entity(entity);
}

Point.prototype.update_tilemap = function() {
	// Remove this entity from all tiles it occupies
	for(var i = 0; i < this.occupied_tiles.length; i++) {
		this.occupied_tiles[i].remove_entity(this);
	}

	this.occupied_tiles = this.tilemap.get_tiles_in_radius_of_position(this.position, this.radius);

	for(i = 0; i < this.occupied_tiles.length; i++) {
		this.occupied_tiles[i].add_entity(this);
	}

	return this;
};

Point.prototype.check_collisions_with_wall = function() {
	// Where we'd be if everything goes swifty
	var new_position = {
		x: this.position.x + this.velocity.x,
		y: this.position.y + this.velocity.y,
	};

	// Where to collide
	var boundaries = {
		top: this.radius,
		right: this.world.width - this.radius,
		bottom: this.world.height - this.radius,
		left: this.radius,
	};

	// Actual collision calculation that checks if we moved to far 
	var collide = function(axis, side) {
		this.position[axis] += (this.velocity[axis] - (new_position[axis] - boundaries[side]));
		this.velocity[axis] *= -1;
	}.bind(this);

	if(new_position.x > boundaries.right) {
		collide('x', 'right');
	}
	if(new_position.x < boundaries.left) {
		collide('x', 'left');
	}
	if(new_position.y < boundaries.top) {
		collide('y', 'top');
	}
	if(new_position.y > boundaries.bottom) {
		collide('y', 'bottom');
	}
};

Point.prototype.render = function() {
	this.renderer.fill_circ(this.position.x, this.position.y, this.radius, this.color);
};

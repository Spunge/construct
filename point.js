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

	// Where to collide
	this.boundaries = {
		top: this.radius,
		right: this.world.width - this.radius,
		bottom: this.world.height - this.radius,
		left: this.radius,
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

Point.prototype.collide_horizontal = function(new_position, boundary) {
	this.position.y += (this.velocity.y - (new_position.y - boundary));
	this.velocity.y *= -1;
};

Point.prototype.collide_vertical = function(new_position, boundary) {
	this.position.x += (this.velocity.x - (new_position.x - boundary));
	this.velocity.x *= -1;
};

Point.prototype.check_collisions_with_wall = function() {
	// Where we'd be if everything goes swifty
	var new_position = {
		x: this.position.x + this.velocity.x,
		y: this.position.y + this.velocity.y,
	};

	if(new_position.x > this.boundaries.right) {
		this.collide_vertical(new_position, this.boundaries.right);
	}
	if(new_position.x < this.boundaries.left) {
		this.collide_vertical(new_position, this.boundaries.left);
	}
	if(new_position.y < this.boundaries.top) {
		this.collide_horizontal(new_position, this.boundaries.top);
	}
	if(new_position.y > this.boundaries.bottom) {
		this.collide_horizontal(new_position, this.boundaries.bottom);
	}
};

Point.prototype.render = function() {
	this.renderer.fill_circ(this.position.x, this.position.y, this.radius, this.color);
};

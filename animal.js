var Animal = function() {
};

Animal.prototype = Object.create(Entity.prototype);
Animal.prototype.constructor = Animal;

Animal.prototype.init = function() {
	this.set_size(Util.random(1, 20));

	this.set_position({
		x: Util.random(this.half_size, this.world.width - this.half_size),
		y: Util.random(this.half_size, this.world.height - this.half_size),
	});

	this.update_tilemap();

	// Where to collide
	this.boundaries = {
		top: this.half_size,
		right: this.world.width - this.half_size,
		bottom: this.world.height - this.half_size,
		left: this.half_size,
	};

	var speed = Util.random(0.5, 1.5) * this.world.speed;
	this.velocity = {
		x: Util.random(speed * -1, speed),
		y: Util.random(speed * -1, speed),
	};

	this.color = '#ff0000';

	this.update_translation();

	return this;
};

Animal.prototype.update = function() {
	//this.collide_with_wall();

	this.position.x += this.velocity.x;
	this.position.y += this.velocity.y;

	this.pass_through_wall();

	this.update_tilemap();

	this.update_translation();
};

Animal.prototype.collide_horizontal = function(new_position, boundary) {
	this.position.y += (this.velocity.y - (new_position.y - boundary));
	this.velocity.y *= -1;
};

Animal.prototype.collide_vertical = function(new_position, boundary) {
	this.position.x += (this.velocity.x - (new_position.x - boundary));
	this.velocity.x *= -1;
};

Animal.prototype.pass_through_wall = function() {
	if(this.position.x < 0) {
		this.position.x = this.world.width + this.position.x;
	}
	if(this.position.x > this.world.width) {
		this.position.x -= this.world.width;
	}
	if(this.position.y < 0) {
		this.position.y = this.world.height + this.position.y;
	}
	if(this.position.y > this.world.height) {
		this.position.y -= this.world.height;
	}
};

Animal.prototype.collide_with_wall = function() {
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

Animal.prototype.render = function() {
	this.renderer
		.set_color('#ff0000')
		.set_translation(this.translation)
		.draw();
};

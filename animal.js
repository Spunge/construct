var Animal = function() {
};

Animal.prototype = Object.create(Entity.prototype);
Animal.prototype.constructor = Animal;

Animal.prototype.set_velocity = function(velocity) {
	this.velocity = velocity;
	return this;
};

Animal.prototype.set_color = function(color) {
	this.color = color;
	return this;
}

Animal.prototype.update = function() {
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

Animal.prototype.render = function() {
	this.world.camera.renderer
		.set_color(this.color)
		.set_translation(this.translation)
		.draw();
};

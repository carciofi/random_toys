var n = NPos3d,
	scene = new n.Scene(),
	globalSlideContentOffScreenFactor = 0;

var BlackHoleParticle = function(args) {
	var t = this, type = 'BlackHoleParticle', n = NPos3d, m = n.Maths;
	if(t.type !== type){throw type + ' must be invoked using the `new` keyword.';}
	args = args || {};
	n.blessWith3DBase(t, args);
	t.angle = Math.random() * tau;
	t.speed = (Math.random() * 2) + 2;
	t.vel = [0, 0, 0];
	t.curl = Math.random() * deg;
	t.curlVelocity();
	scene.add(t);
};

BlackHoleParticle.prototype = {
	type: 'BlackHoleParticle',
	shape: {
		points: [
			[0, 0, 0, '#f00'], //red, tip
			[-10, 0, 0, '#fff'] //white, tail
		],
		lines: [
			[0, 1]
		]
	},
	renderStyle: 'both',
	curlVelocity: function() {
		var t = this;
		t.angle += t.curl;
		t.vel[0] = cos(t.angle) * t.speed;
		t.vel[1] = sin(t.angle) * t.speed;
		t.vel[2] = 0;
		t.rot[2] = t.angle;
	},
	update: function() {
		var t = this;
		t.curlVelocity();
		t.pos[0] += t.vel[0];
		t.pos[1] += t.vel[1];
		t.pos[2] += t.vel[2];
		t.render();
	}
};


var spawnBlackHoleParticles = function(num) {
	var i, item;
	for(i = 0; i < num; i += 1){
		item = new BlackHoleParticle({
			// pos: [
			// 	((Math.random() * 2) - 1) * 500,
			// 	((Math.random() * 2) - 1) * 500,
			// 	((Math.random() * 2) - 1) * 500
			// ]
		});
	}
};

spawnBlackHoleParticles(100);



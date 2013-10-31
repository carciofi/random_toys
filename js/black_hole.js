var BlackHoleRing = function(args){
	var t = this, type = 'BlackHoleRing', n = NPos3d, m = n.Maths, scale;
	if(t.type !== type){throw type + ' must be invoked using the `new` keyword.';}
	args = args || {};
	n.blessWith3DBase(t, args);
	t.offset = args.offset || 0;
	t.numRings = args.numRings || 1;
	t.frac = t.offset / (t.numRings - 1);
	t.color = 'hsla('+ (240 + (60 * t.frac)) +', 100%, 40%, '+ (t.frac) +')';
	scale = (t.frac * 300) + 1;
	t.scale = [scale,scale,scale];
	t.angle = m.deg * (((1 - t.frac) * -45) + 65);
	t.rot = [0, t.angle, 0.6 * t.angle];
	t.pos = m.p3Rotate([-250 + ((1 - t.frac) * 700), 0, 0],t.rot, t.rotOrder);
	return t;
};
BlackHoleRing.prototype = {
	type: 'BlackHoleRing',
	shape: new n.Geom.Circle({
		radius: 1,
		segments: 24,
		axies: [2,1,0]
	}),
	renderStyle: 'both',
	renderAlways: true,
	pointStyle: 'stroke',
	pointScale: 4,
	rotOrder: [2,1,0],
	update: function () {
		var t = this;
		t.rot[0] += deg * (t.numRings - t.offset) * 0.1;
		//t.pos[0] += cos(t.rot[2] / 10);
		//t.pos[1] += sin(t.rot[2] / 10);
		t.render();
	}
};

var BlackHole = function(args){
	var t = this, type = 'BlackHole', i;
	if(t.type !== type){throw type + ' must be invoked using the `new` keyword.';}
	args = args || {};
	NPos3d.blessWith3DBase(t, args);
	t.rings = args.rings || 20;
	for(i = 0; i < t.rings; i += 1){
		t.add(new BlackHoleRing({offset: i, numRings:t.rings}));
	}
	return t;
};
BlackHole.prototype = {
	type: 'BlackHole',
	update: function() {
		var t = this;
		t.rot[1] = (deg * -45 * globalSlideContentOffScreenFactor);
		t.pos[0] = (scene.cx * 0.5 * globalSlideContentOffScreenFactor);
		t.render();
	}
};

var myBlackHole = new BlackHole();
scene.add(myBlackHole);

QUnit.config.reorder = false;


QUnit.module('Lerppu initialization tests', 
{
    setup: function() 
    {
        this.lerppuinstance = Lerppu;
    }
});

QUnit.test('Lerppu instance', function(assert) 
{
    assert.equal(typeof this.lerppuinstance, 'object', 'is typeof object');

    assert.equal(this.lerppuinstance.interpolations.length, 0, 'initial interpolation count');

    assert.equal(typeof this.lerppuinstance.interpolate, 'function', 'interpolate defined');
    assert.equal(typeof this.lerppuinstance.update, 'function', 'update defined');
    assert.equal(typeof this.lerppuinstance.interrupt, 'function', 'interrupt defined');
    assert.equal(typeof this.lerppuinstance.find, 'function', 'find defined');
    assert.equal(typeof this.lerppuinstance.helpers.intersection, 'function', 'helpers intersection defined');

    assert.equal(typeof this.lerppuinstance.easings.lerp, 'function', 'easings lerp defined');
	assert.equal(typeof this.lerppuinstance.easings.lerp2, 'function', 'easings lerp2 defined');
	assert.equal(typeof this.lerppuinstance.easings.easeInQuad, 'function', 'easings easeInQuad defined');
	assert.equal(typeof this.lerppuinstance.easings.easeOutQuad, 'function', 'easings easeOutQuad defined');
	assert.equal(typeof this.lerppuinstance.easings.easeInOutQuad, 'function', 'easings easeInOutQuad defined');
	assert.equal(typeof this.lerppuinstance.easings.easeInCubic, 'function', 'easings easeInCubic defined');
	assert.equal(typeof this.lerppuinstance.easings.easeOutCubic, 'function', 'easings easeOutCubic defined');
	assert.equal(typeof this.lerppuinstance.easings.easeInOutCubic, 'function', 'easings easeInOutCubic defined');
	assert.equal(typeof this.lerppuinstance.easings.easeInQuart, 'function', 'easings easeInQuart defined');
	assert.equal(typeof this.lerppuinstance.easings.easeOutQuart, 'function', 'easings easeOutQuart defined');
	assert.equal(typeof this.lerppuinstance.easings.easeInOutQuart, 'function', 'easings easeInOutQuart defined');
	assert.equal(typeof this.lerppuinstance.easings.easeInQuint, 'function', 'easings easeInQuint defined');
	assert.equal(typeof this.lerppuinstance.easings.easeOutQuint, 'function', 'easings easeOutQuint defined');
	assert.equal(typeof this.lerppuinstance.easings.easeInOutQuint, 'function', 'easings easeInOutQuint defined');
});



QUnit.module('Lerppu helper tests', 
{
    setup: function() 
    {
        this.lerppuinstance = Lerppu;
    }
});

QUnit.test('Helpers', function(assert) 
{
	var a = 
	{
		a: 0,
		b: 1,
		c: 2,

		e: 3,
		f: 4
	}

	var b = 
	{
		a: 0,
		b: 1,
		c: 2,

		d: 3,
		g: 4
	}

	var isec = this.lerppuinstance.helpers.intersection(a, b);

	assert.deepEqual(isec, ['a', 'b', 'c'], 'Object key intersection');

});



QUnit.module('Lerppu interpolation', 
{
    setup: function() 
    {
        this.lerppuinstance = Lerppu;
    }
});

QUnit.test('Interpolation creation - normal', function(assert) 
{
	var l1 = this.lerppuinstance.interpolate(0, 100, 1, function(l)
	{

	}, this.lerppuinstance.easings.lerp, 'lerp1');

	console.log(l1);

	assert.equal(typeof l1, 'object', 'Returned interpolation object type check');

	assert.equal(l1.v0, 0, 'Returned interpolation object v0');
	assert.equal(l1.v1, 100, 'Returned interpolation object v1');
	assert.equal(l1.complete, false, 'Returned interpolation object complete');
	assert.equal(l1.easing, this.lerppuinstance.easings.lerp, 'Returned interpolation object  easing');
	assert.equal(l1.t, 1, 'Returned interpolation object t');
	assert.equal(l1.multiple, null, 'Returned interpolation object multiple');
	assert.equal(l1.nto1, null, 'Returned interpolation object nto1');
	assert.equal(l1.objinterpolation, null, 'Returned interpolation object objinterpolation');
	assert.equal(l1.paramintersection, null, 'Returned interpolation object paramintersection');

	assert.equal(this.lerppuinstance.interpolations.length, 1, 'Interpolation count now 1');

});

QUnit.test('Interpolation creation - normal2', function(assert) 
{
	var l1 = this.lerppuinstance.interpolate(0, 100, 1, function(l)
	{

	}, this.lerppuinstance.easings.lerp, 'lerp1');

	console.log(l1);

	assert.equal(typeof l1, 'object', 'Returned interpolation object type check');

	assert.equal(l1.v0, 0, 'Returned interpolation object v0');
	assert.equal(l1.v1, 100, 'Returned interpolation object v1');
	assert.equal(l1.complete, false, 'Returned interpolation object complete');
	assert.equal(l1.easing, this.lerppuinstance.easings.lerp, 'Returned interpolation object  easing');
	assert.equal(l1.t, 1, 'Returned interpolation object t');
	assert.equal(l1.multiple, null, 'Returned interpolation object multiple');
	assert.equal(l1.nto1, null, 'Returned interpolation object nto1');
	assert.equal(l1.objinterpolation, null, 'Returned interpolation object objinterpolation');
	assert.equal(l1.paramintersection, null, 'Returned interpolation object paramintersection');

	assert.equal(this.lerppuinstance.interpolations.length, 2, 'Interpolation count now 1');

});

/*

	lerp
	lerp2
	easeInQuad
	easeOutQuad
	easeInOutQuad
	easeInCubic
	easeOutCubic
	easeInOutCubic
	easeInQuart
	easeOutQuart
	easeInOutQuart
	easeInQuint
	easeOutQuint
	easeInOutQuint

*/
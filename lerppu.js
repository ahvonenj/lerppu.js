var Lerppu = 
{
	time: 0, // Program / game elapsed time
	interpolations: [],

	interpolate: function(v0, v1, t, f, easing, id, callback)
	{
		var self = this;

		var multiple = null; // Does v0 have multiple values to interpolate
		var nto1 = null; // Do v0 values have corresponding v1 or is there only one v1

		var objinterpolation = null; // Are v0 and v1 objects
		var paramintersection = null; // Intersection of v0 and v1 keys

		if(Object.prototype.toString.call(v0) === '[object Array]') // Array interpolation
		{
			multiple = true;

			// Do we have Array => Array relation or Array => Value relation
			if(Object.prototype.toString.call(v1) === '[object Array]' && v0.length === v1.length)
			{
				nto1 = false;
			}
			else
			{
				nto1 = true;
			}
		}
		else if(Object.prototype.toString.call(v0) === '[object Object]') // Object interpolation
		{
			objinterpolation = true;

			// Do we have Object => Object relation or Object => Value relation
			if(Object.prototype.toString.call(v1) === '[object Object]')
			{
				nto1 = false;

				paramintersection = this.helpers.intersection(v0, v1);

				if(paramintersection.length === 0)
				{
					return;
				}
			}
			else
			{
				nto1 = true;
				paramintersection = Object.keys(v0);
			}

			// Since f parameter is not specified, we need to "shift" parameters after f
			callback = id;
			id = easing;
			easing = f;
			
			// Specify a custom interpolation function for object interpolation
			f = function(l, paramintersection, o)
			{
				for(var i = 0; i < paramintersection.length; i++)
				{
					o[paramintersection[i]] = l[i];
				}
			}
		}

		var id = id || null;
		var callback = callback || function() {};


		var lerppu = 
		{
			v0: v0, // Start value of some kind
			v1: v1, // End value of some kind
			t: t, // Timespan
			st: self.time, // Start time
			f: f, // Interpolation function
			easing: easing, // Easing function
			id: id, // Custom id / name
			callback: callback, // Complete callback
			complete: false, // Complete bool
			multiple: multiple, // Multiple bool
			nto1: nto1, // nto1 bool
			objinterpolation: objinterpolation, // Object interpolation bool
			paramintersection: paramintersection, // Object => Object key intersection
			paused: false // Is the interpolation paused
		}

		this.interpolations.push(lerppu);

		return lerppu;
	},

	update: function(time)
	{
		var self = this;

		self.time = time;

		// Go through each ongoing interpolation
		for(var i = 0; i < this.interpolations.length; i++)
		{
			var lerp = this.interpolations[i];
			var ct = Math.min((self.time - lerp.st) / lerp.t, 1);

			if(lerp.multiple)
			{
				var lr = [];

				if(lerp.nto1)
				{
					lerp.v0.forEach(function(v, i)
					{
						lr.push(lerp.easing(v, lerp.v1, ct));
					});
				}
				else
				{
					for(var j = 0; j < lerp.v0.length; j++)
					{
						lr.push(lerp.easing(lerp.v0[j], lerp.v1[j], ct));
					}
				}
			}
			else if(lerp.objinterpolation)
			{
				var lr = [];

				if(lerp.nto1)
				{
					for(var k = 0; k < lerp.paramintersection.length; k++)
					{
						lr.push(lerp.easing(lerp.v0[lerp.paramintersection[k]], lerp.v1, ct));
					}
				}
				else
				{
					for(var k = 0; k < lerp.paramintersection.length; k++)
					{
						lr.push(lerp.easing(lerp.v0[lerp.paramintersection[k]], lerp.v1[lerp.paramintersection[k]], ct));
					}
				}
			}
			else
			{
				var lr = lerp.easing(lerp.v0, lerp.v1, ct);
			}

			lerp.f(lr, lerp.paramintersection, lerp.v0);

			if(ct >= 1)
			{
				lerp.callback();
				lerp.complete = true;
				self.interpolations.splice(i, 1);
				continue;
			}
		}
	},

	interrupt: function(lerptointerrupt)
	{
		for(var i = 0; i < this.interpolations.length; i++)
		{
			var lerp = this.interpolations[i];

			if(lerp.id !== null && lerp.id === lerptointerrupt)
			{
				this.interpolations.splice(i, 1);
				break;
			}
			else
			{
				continue;
			}
		}
	},

	find: function(id)
	{
		if(this.interpolations.length === 0 || 
		this.interpolations.indexOf(id) === -1 || 
		typeof this.interpolations[id] === 'undefined')
		{
			return null;
		}
		else
		{
			return this.interpolations[id];
		}
	},

	easings:
	{

		lerp: function(v0, v1, t) 
		{
			return v0 + t * (v1 - v0);
		},

		// Accurate
		lerp2: function(v0, v1, t) 
		{
	  		return (1 - t) * v0 + t * v1;
		},

		easeInQuad: function (v0, v1, t) 
		{ 
			return (v1 - v0) * (t*t) + v0; 
		},

		// decelerating to zero velocity
		easeOutQuad: function (v0, v1, t) 
		{ 
			return (v1 - v0) * (t*(2-t)) + v0; 
		},

		// acceleration until halfway, then deceleration
		easeInOutQuad: function (v0, v1, t) 
		{ 
			return t<.5 ? (v1 - v0) * (2*t*t) + v0 : (v1 - v0) * (-1+(4-2*t)*t) + v0; 
		},

		// accelerating from zero velocity 
		easeInCubic: function (v0, v1, t) 
		{ 
			return (v1 - v0) * (t*t*t) + v0; 
		},

		// decelerating to zero velocity 
		easeOutCubic: function (v0, v1, t) 
		{ 
			return (v1 - v0) * ((--t)*t*t+1) + v0;
		},

		// acceleration until halfway, then deceleration 
		easeInOutCubic: function (v0, v1, t) 
		{ 
			return t<.5 ? (v1 - v0) * (4*t*t*t) + v0 : (v1 - v0) * ((t-1)*(2*t-2)*(2*t-2)+1) + v0; 
		},

		// accelerating from zero velocity 
		easeInQuart: function (v0, v1, t) 
		{ 
			return (v1 - v0) * (t*t*t*t) + v0; 
		},

		// decelerating to zero velocity 
		easeOutQuart: function (v0, v1, t) 
		{
	    	return (v1 - v0) * (1-(--t)*t*t*t) + v0;
		},

		// acceleration until halfway, then deceleration
		easeInOutQuart: function (v0, v1, t) 
		{ 
			return t<.5 ? (v1 - v0) * (8*t*t*t*t) + v0 : (v1 - v0) * (1-8*(--t)*t*t*t) + v0; 
		},

		// accelerating from zero velocity
		easeInQuint: function (v0, v1, t) 
		{ 
			return (v1 - v0) * (t*t*t*t*t) + v0; 
		},

		// decelerating to zero velocity
		easeOutQuint: function (v0, v1, t) 
		{ 
			return (v1 - v0) * (1+(--t)*t*t*t*t) + v0;
		},

		// acceleration until halfway, then deceleration 
		easeInOutQuint: function (v0, v1, t) 
		{ 
			return t<.5 ? (v1 - v0) * (16*t*t*t*t*t) + v0 : (v1 - v0) * (1+16*(--t)*t*t*t*t) + v0;
		}
	},

	helpers:
	{
		intersection: function(o1, o2) 
		{
			return Object.keys(o1).concat(Object.keys(o2)).sort().reduce(function (r, a, i, aa) 
			{
				if (i && aa[i - 1] === a) 
				{
					r.push(a);
				}

				return r;
			}, []);
		}
	}
}


// Aliases
Lerppu.lerp = Lerppu.interpolate;
Lerppu.ip = Lerppu.interpolate;
Lerppu.stop = Lerppu.interrupt;
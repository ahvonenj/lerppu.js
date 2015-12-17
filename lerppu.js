var Lerppu = 
{
	time: 0, // Program / game elapsed time
	lerps: [],

	interpolate: function(v0, v1, t, f, easing, id)
	{
		var self = this;

		var id = id || null;

		this.lerps.push(
		{
			v0: v0,
			v1: v1,
			t: t,
			st: self.time,
			f: f,
			easing: easing,
			id: id
		});
	},

	update: function(time)
	{
		var self = this;

		self.time = time;

		for(var i = 0; i < this.lerps.length; i++)
		{
			var lerp = this.lerps[i];
			var ct = Math.min((self.time - lerp.st) / lerp.t, 1);
			var lr = lerp.easing(lerp.v0, lerp.v1, ct);

			lerp.f(lr);

			if(ct >= 1)
			{
				self.lerps.splice(i, 1);
				continue;
			}
		}
	},

	interrupt: function(lerptointerrupt)
	{
		for(var i = 0; i < this.lerps.length; i++)
		{
			var lerp = this.lerps[i];

			if(lerp.id !== null && lerp.id === lerptointerrupt)
			{
				this.lerps.splice(i, 1);
				break;
			}
			else
			{
				continue;
			}
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
	}
}


// Aliases
Lerppu.lerp = Lerppu.interpolate;
Lerppu.ip = Lerppu.interpolate;
Lerppu.stop = Lerppu.interrupt;
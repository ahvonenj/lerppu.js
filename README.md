# lerppu.js

JavaScript function interpolation micro-library. Allows for interpolation of any function that handles numeric values(*), with different easing functions to choose from.

* color, time, opacity, distance, rotation, speed, velocity, mass, ...

**NOTE:** lerppu.js is basically $.animate or CSS3 animation / transition equivalent for canvas.

## Usage

**Updating interpolations**

In update loop / function, call:

```
Lerppu.update(t.time);
```

Where t.time is the accurate elapsed time since your application started. This makes Lerppu update all interpolations you have defined. If `Lerppu.update()` is not called, then Lerppu will not do anything, even if you specify an interpolation.

**Creating interpolations**

```
Lerppu.interpolate(v0, v1, t, function(l)
{
  // Here l will be the "correct" value you would except from a linear interpolation,
  // so for example you could just write player.x = l;
}, easing, lerp_id);
```

Say you wanted to interpolate the x-position of a "player", you would put the parameters like so:

v0 = `player.x` (current x)

v1 = where would you like the `player.x` to be after `t` has elapsed

t = how long do you want the transition to take

func = `function(l) { player.x = l; }` (l is calculated by Lerppu; it is a value going from `v0` to `v1` in `t` amount of time)

easing = Lerppu has these covered, for example `Lerppu.easings.lerp2` is valid here

lerp_id = Optional id for the interpolation, in case you would like to cancel it

**Multivariable interpolation (as of 20.12.2015)**

```
Lerppu.interpolate([v0a, v0b, v0c, ...], [v1a, v1b, v1c, ...], t, function(l)
{
    player.x = l[0];
    player.y = l[1];
    player.z = l[2];
}, easing, lerp_id);
```

**Stopping / interrupting interpolations**

Just call

```
Lerppu.stop(lerp_id);
```

**Supported easings**

```
Lerppu.easings.lerp / Lerppu.easings.linear
Lerppu.easings.lerp2 / Lerppu.easings.accurateLinear
Lerppu.easings.easeInQuad
Lerppu.easings.easeOutQuad
Lerppu.easings.easeInOutQuad
Lerppu.easings.easeInCubic
Lerppu.easings.easeOutCubic
Lerppu.easings.easeInOutCubic
Lerppu.easings.easeInQuart
Lerppu.easings.easeOutQuart
Lerppu.easings.easeInOutQuart
Lerppu.easings.easeInQuint
Lerppu.easings.easeOutQuint

```
Lerppu.easings.easeInOutQuint

## Demo

Demo code (`.ip()` is an alias for `.interpolate()`):

```

var ball =
{
	x: 100,
	y: 100,
	r: 15,
	c: 'red',
	l: 3
}

function lerpEaseInOut()
{
	var ivl = setInterval(function()
	{
		Lerppu.stop('testlerpx');
		Lerppu.stop('testlerpy');

		Lerppu.ip(ball.x, Math.floor(Math.random() * (800 - ball.r)), 0.5, function(l)
		{
			ball.x = l;
		}, Lerppu.easings.easeInOutCubic, 'testlerpx');

		Lerppu.ip(ball.y, Math.floor(Math.random() * (800 - ball.r)), 0.5, function(l)
		{
			ball.y = l;
		}, Lerppu.easings.easeInOutCubic, 'testlerpy');
	}, 900);
}
			
```

So in the demo we just move the ball from the current ball position to a random one, in 0.5 seconds. This goes on and on every 900 milliseconds.

http://ahvonenj.github.io/lerppu.js

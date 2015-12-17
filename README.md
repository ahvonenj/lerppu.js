# lerppu.js

JavaScript function interpolation micro-library.

## Usage

**Updating interpolations**

In update loop / function, call:

```
Lerppu.update(t.time);
```

Where t.time is the accurate elapsed time since your application started.

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

**Supported easings**

```
Lerppu.easings.lerp
Lerppu.easings.lerp2
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


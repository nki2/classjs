/**
 * @author nki2 / http://nki2.jp/
 * @author okb
 * @see https://github.com/nki2/classjs
 * @revision 4
 */


function newClass(classObj, superClass) {
	if(!classObj) classObj = {};
	if(typeof classObj.__construct !== "function") classObj.__construct = function() {};
	var f = classObj.__construct;
	f.extend = function(classObj) { return newClass(classObj, this); }
	
	if(superClass) {
		for(var i in superClass.prototype) f.prototype[i] = superClass.prototype[i];
		classObj.__super = superClass.prototype;
	}
	
	for(var j in classObj) {
		if(superClass && typeof classObj[j] == "function") {
			f.prototype[j] = (function(func, superClass) {
				return function() {
					var tmpSuper = this.__super;
					this.__super = superClass.prototype;
					var result = func.apply(this, arguments);
					this.__super = tmpSuper;
					return result;
				};
			})(classObj[j], superClass);
		} else {
			f.prototype[j] = classObj[j];
		}
	}
	return f;
}

var Class = newClass({});

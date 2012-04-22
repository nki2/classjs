/**
 * @author nki2 / http://nki2.jp/
 */


// define classes
var Sample1 = Sample1 || {};


// new class Sample1.ClassA
Sample1.ClassA = Class.extend({
	// variables
	$output: null,
	var0: "default0",
	var1: "default1",

	// contructor
	__construct: function($output, arg1) {
		this.$output = $output;
		this.var1 = arg1;
	},

	// class methods
	output: function(str) {
		if(this.$output) this.$output.text(this.$output.text() + str + "\n");
	},
	method1: function() {
		this.output("method1");
		this.output("var0: " + this.var0);
		this.output("var1: " + this.var1);
		this.output("\n");
	},
	setVar1: function(arg1) {
		this.var1 = arg1;
	}
});


// new class Sample1.ClassB extended from Sample1.ClassA
Sample1.ClassB = Sample1.ClassA.extend({
	// variables
	var0: "default0 overridden by ClassB",
	var2: "default2",

	// contructor
	__construct: function($output, arg1, arg2) {
		// call super class constructor
		this.__super.__construct.call(this, $output, arg1);
		this.var2 = arg2;
	},

	// class methods
	method2: function() {
		this.output("method2");
		this.output("var2: " + this.var2);
		this.output("\n");
	}
});


// new class Sample1.ClassC extended from Sample1.ClassB
Sample1.ClassC = Sample1.ClassB.extend({
	// variables
	var3: "default3",

	// contructor
	__construct: function($output, arg1, arg2, arg3) {
		// call super class constructor
		this.__super.__construct.call(this, $output, arg1, arg2);
//			this.__super.__construct.apply(this, arguments);

		this.var3 = arg3;
	},

	// class methods
	method3a: function() {
		this.output("method3a");
		this.output("var3: " + this.var3);
		this.output("\n");
	},
	method3b: function() {
		this.output("method3b");
		// call super class method
		this.__super.method1.call(this);

		// set and call const
		this.var0 = "default0 overridden by ClassC";
		this.output("var0: " + this.var0);
		this.output("\n");

		// call super class ClassB const
		this.output("super: ");
		this.output("var0: " + this.__super.var0);
		this.output("\n");

		// call super super class ClassA const
		this.output("super.super: ");
		this.output("var0: " + this.__super.__super.var0);
		this.output("\n");
	}
});

// new class Sample1.ClassD extended from Sample1.ClassA
Sample1.ClassD = Sample1.ClassA.extend({
	// override variables
	var0: "default0 overridden by ClassD",
	var1: "default1 overridden by ClassD",

	// contructor
	__construct: function($output, arg1) {
		// call super class constructor
		this.__super.__construct.call(this, $output, arg1);
	},

	// override class methods
	method2: function() {
		this.output("method2 overridden by ClassD");
	}
});



// run sample1
(function($) {
	$(function() {
		var instanceA = new Sample1.ClassA($("#areaA"), "instanceA1");
		instanceA.method1();

		var instanceB = new Sample1.ClassB($("#areaB"), "instanceB1", "instanceB2");
		instanceB.method1();
		instanceB.method2();

		var instanceC = new Sample1.ClassC($("#areaC"), "instanceC1", "instanceC2", "instanceC3");
		instanceC.method1();
		instanceC.method2();
		instanceC.method3a();
		instanceC.method3b();

		var instanceD = new Sample1.ClassD($("#areaD"), "instanceD1");
		instanceD.method1();
		instanceD.method2();
	});
})(jQuery);

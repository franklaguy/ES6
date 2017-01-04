/* ES6: notes, useful information, functions and methods */
/* Created by: R. Lewis, Date: 12/21/16 **************** */
/* Derived from Kyle Simpson - ES6 & Beyond ************ */

// begin with Namespacing (so as to avoid any js conflicts), let declaration, IIFE
let ES6 = {
	init() { // begin Block-Scope functions using consise method function variable

		ES6.greeting();

		// Call the function we would like to test
		// ES6.lexicalScope();
		// ES6.letDeclarations();
		// ES6.arrayMethods.gatherArrayObjects(0,1,2,3,4,5);
		// ES6.arrayMethods.arrayOf();
		// ES6.arrayMethods.extendArray();
		// ES6.arrayMethods.mutatorMethod();
		// ES6.destructuring();
		// ES6.getSet();
		// ES6.forOfLoops();
		// ES6.errorHandling();
		// ES6.generatorYield();
		// ES6.classes();
		ES6.promises.ajaxExample.runAjax();
	},
	closure: 2,
	lexicalScope() {

		console.log(this.closure, ', closure: an inner function that has access to the outer functions variables - scope chain');

		{
			this.closure = 3;  // access closure
			console.log(this.closure, ', scope chain: self, outer functions variables, global vars');
		}

		console.log(this.closure, ', lexical scope: new scope created when a new function is created');
	},
	letDeclarations() {
		let a = 2, // let statment, should happen asap in a function
			b = a * 3,
			c = a + b,
			array = [];

		console.log(b, ', in ES6 "let" replaces "var"');

		if (a > 1) {
			for (let i=a; i<=b; i++){ // for loop example using "let"
				array.push(function(){ // push grabs 1st item in the array
					console.log(i, ', unlike "var", "let" needs to be implicitly initialized in a statement before it is accessed, except in a "for loop"');
				});
			}

			array[0](); // access array items in order to find i
		}

		console.log(c, ', if "let" is not initialized it will throw a ReferenceError!');
	},
	arrayMethods: {
		gatherArrayObjects (x = 0, y = 1, z = this.closure, ...args) {
			args.shift();
			console.log(x,y,z, ', by defining default parameter values ES6 does away with falsey or undefined return values');
			console.log(x,y,z,...args, ', "..." creates the array, similar to "apply" or "call" or "[]"');
			console.log(z, ', yes, in ES6 you can even call a function as a parameter as long as it was properly initialized');
		},
		arrayOf() {
			let a = Array( 3 ); 
			console.log( a.length, a[0], ', old way - bad' );

			let b = Array.of( 3 ); 
			console.log( b.length, b[0], ', notice the different output - good' );

			let c = Array.of( 1,2,3 ); 
			console.log( c.length, c, ', es6 fixed array outputs with Array.of' ); // 
		},
		extendArray() {
			class MyCoolArray extends Array {
				sum() {
					return this.reduce( function reducer(acc, curr) {
						return acc + curr;
					}, 0 );
				}
			}

			let a = MyCoolArray.of( 3 );
			console.log(a.length, a.sum(), ', to use in the event you want to extend an array and get proper outputs');
		
			let b = MyCoolArray.from( [1,2] ) instanceof MyCoolArray;
			console.log(b, ', creating an instance of an array');
		},
		mutatorMethod() {
			let a = [1,2,3,4,5];

			console.log( a.copyWithin( 3,0 ), ', copyWithin method copies a part of the array and moves it elsewhere in the array' );
			// console.log( a.copyWithin( 3,0,1 ) );
			// console.log( a.copyWithin( 0,-2 ) );
			// console.log( a.copyWithin( 0,-2,-1 ) );

			console.log( (a.indexOf( 3 ) === 2), ', indexOf' );

			let b = a.find( function match(i) { return i == 2; } );
			console.log(b, ', "find" item inside of array');

			let c = a.some( function match(i) { return i == 2; } );
			console.log(c, ', discover if item is inside of array with "some"');

			console.log( [...a.keys()], ', keys in the array' );
			console.log( [...a.values()], ', values in the array' );

			// other methods to look for:
			// repeat, startsWith, endsWith, includes, isNaN, assign, 
			// normalize, fromCodePoint, codePointAt, isInteger, isFinite
		}
	},
	dClosure1 () { return [ 1,2,3 ]; },
	dClosure2 () { return { x:4, y:5, z:6 } },
	destructuring () {
		let a,b,c,x,y,z, config = {}, defaults = {}; // declare variables

		[a,b,c] = this.dClosure1();
		console.log(a,b,c, ', notice the left hand of the = assignment contains an array');

		( {x,y,z} = this.dClosure2() ); // enclose assignment in braces so the curley brackets don't get confused as a block statement
		console.log(x,y,z, ', Destructuring: the lefthand of the assignment is a kind of pattern to decompose the objects into variables');
	
		let e = [a,b,c,x,y,z], 
			[f, h, ...g] = e;

		console.log(f,h,g, ', lets spread out the array objects and return their values');

		// What if we want to trigger options, logs or error handling?
		// We have 'default' js functions as well as 'config' overrides,
		// let's combine them, in theory of course.
		// Merge 'Defaults' into 'Configs'

		// In theory a set of defaults objects would exist like the below examples:
			// defaults.options.remove;
			// defaults.log.error;

		// Destructure (with default value assignments)
		let {
			options: {
				remove: remove, 
				enable: enable,
				// instance = defaults.options.instance
			} = {},
			log: {
				warn, // es6 object literal
				error: error  // older version object literal
			} = {}
		} = config;

		// Restructure
		return config = {
			options: {remove, enable},
			log: {warn,error}
		}

	}, 
	getSet() {
		let a = {
			__id: 10,
			get id() { return this.__id++; }, // es5 getter
			set id(v) { this.__id = v; } 	  // es5 setter
		}
		// __id is set based on the last get call 
		console.log(a.id, a.id, a.__id, a.__id);
	},
	upperCase(str) {

		return str.toUpperCase();
	},
	greeting() {
		let name = 'es6',
			msg = `notes, useful information, functions and methods`,
			 // backticks interpolates the name, msg vars thus replacing concatination
			greeting = `<h1>${this.upperCase( name )}: ${ msg }</h1>`;

		document.write( greeting );
		console.log(typeof greeting, '- type of var written to page');
	},
	forOfLoops() {
		// notice the dofference of a "for in" loop and a "for of" loop
		// for of loops only work for arrays and strings, not objects
		for (let idx in ['a','b','c']) { console.log(idx); }
		for (let val of ['a','b','c']) { console.log(val); }

		let o = {};
		for (o.x of 'hello') { console.log(o.x); }
	},
	errorHandling() {
		// using "*" to create a generator function
		function *foo() {
			try {
				yield 1; // generator functions make use of "yield"
			} catch (err) {
				console.log (err);
			}
			
			yield 2; // "yield" is like a pause in the function to see if it is safe to continue

			throw "use '*' to create a generator function, generator functions make use of 'yield'";
		}

		function *bar() {
			try {
				yield *foo();

				console.log("never gets to here");
			} catch (err) {
				console.log(err);
			}
		}

		let it = bar();

		try {
			it.next();
			it.throw("NEXT: if yield values are not undefined and done does not equal true continue iterating");
			it.next();
		} catch (err) {
			console.log("never gets to here");
		}
		// NEXT: if yield values are undefined and done equals true, stop the iteration
		it.next();


		// error handling using classes - see classes object literal below for definitions
		class Error {
			constructor(msg){
				msg = 'error msg';
			}
		}

		class Oops extends Error {
			constructor(msg){
				super (msg);
				this.oops = msg;
			}
		}

		let ouch = new Oops('error message');
		throw ouch;
	},
	generatorYield() {
		// function *foo() {
		// 	let x = yield 42;
		// 	console.log(x, ', Generator function that uses yield');
		// }
		
		function foo(){

			function nextState(v){
				switch (state) {
					case 0: 
						state++;

						return 42; // the yield expression
					case 1: 
						state++;

						x = v; // the yield expression fulfilled
						console.log(x, ', a deeper look into yield states');

						return undefined;
						// no need to handle state 2
				}
			}

			let state = 0, x;

			return {
				next: function(v) {
					let ret = nextState(v);

					return {value:ret, done: (state == 2)}
				}
			};
		}

		// foo can be the 1st or 2nd foo function and still produce the exact same results
		let it = foo();

		// generator / yeild functions are based on iterators
		console.log( it.next() );
		console.log( it.next(10) );
	},
	classes() {
		// example of Parent Class
		class ParentA {
			constructor(a,b) { // Parent constructor
				this.x = a;
				this.y = b;

				// discover who has extended this class
				console.log(new.target.name, ' has extended ParentA class');
			}

			gimmeXY() {
				return this.x * this.y;
			}
		}

		class ChildA extends ParentA {
			constructor(a,b,c) {
				super ( a,b ); // super automatically refers to the Parent constructor
				this.z = c; // for the child, "this" does not exist until super is called
			}

			gimmeXYZ() {
				// access parent class return function and extend it
				return super.gimmeXY() * this.z;
			}
		}
		// give [a,b,c] values using the child class
		let b = new ChildA( 5, 15, 25 );

		console.log(b.x, ', x:a comes from the parent class');
		console.log(b.y, ', y:b comes from the parent class');
		console.log(b.z, ', z:c comes from the child class');
		console.log(b.gimmeXYZ(), ', "super" automatically refers to the Parent constructor');
	},
	promises: { 													// object literal - var
		ajaxExample: { 												// object literal - var
			ajax(url) { 											// object literal - function var
				return new Promise ( function pr (resolve, reject){
					// make ajax request - (this is just an example)
					let xhr = new XMLHttpRequest();
					xhr.open("GET", url, ES6.promises.ajaxExample.runAjax);

					// call either resolve() or reject()  - (this is just an example)
					if(xhr.status === 200){
						resolve( url );
					} else {
						reject( url );
					}
				});
			},
			runAjax(){ 												// object literal - function var
				this.ajax ("http://some.url.1")
					.then( function fulfilled(contents) {
						console.log(contents, 'was fulfilled inside the "Promise"');

						return ES6.promises.ajaxExample.ajax( "http://some.url.2?v=" + contents );
					},
					function rejected(reason) {
						console.log(reason, 'was rejected from inside the "Promise"');

						return ES6.promises.ajaxExample.ajax( "http://localhost/~nSb/es6?err=" + reason );
					})
					.then ( function fulfilled (contents) {
						// handle data from original promises handler
						// contents come from the subsequent ajax call, whichever it was
					});
			}
		}
	}
}

ES6.init();
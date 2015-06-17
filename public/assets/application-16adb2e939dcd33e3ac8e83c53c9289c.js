/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
/*
 AngularJS v1.3.15
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/

(function(Q,W,t){'use strict';function R(b){return function(){var a=arguments[0],c;c="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.3.15/"+(b?b+"/":"")+a;for(a=1;a<arguments.length;a++){c=c+(1==a?"?":"&")+"p"+(a-1)+"=";var d=encodeURIComponent,e;e=arguments[a];e="function"==typeof e?e.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof e?"undefined":"string"!=typeof e?JSON.stringify(e):e;c+=d(e)}return Error(c)}}function Sa(b){if(null==b||Ta(b))return!1;var a=b.length;return b.nodeType===
qa&&a?!0:C(b)||H(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function r(b,a,c){var d,e;if(b)if(G(b))for(d in b)"prototype"==d||"length"==d||"name"==d||b.hasOwnProperty&&!b.hasOwnProperty(d)||a.call(c,b[d],d,b);else if(H(b)||Sa(b)){var f="object"!==typeof b;d=0;for(e=b.length;d<e;d++)(f||d in b)&&a.call(c,b[d],d,b)}else if(b.forEach&&b.forEach!==r)b.forEach(a,c,b);else for(d in b)b.hasOwnProperty(d)&&a.call(c,b[d],d,b);return b}function Ed(b,a,c){for(var d=Object.keys(b).sort(),e=0;e<d.length;e++)a.call(c,
b[d[e]],d[e]);return d}function mc(b){return function(a,c){b(c,a)}}function Fd(){return++ob}function nc(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function w(b){for(var a=b.$$hashKey,c=1,d=arguments.length;c<d;c++){var e=arguments[c];if(e)for(var f=Object.keys(e),g=0,h=f.length;g<h;g++){var l=f[g];b[l]=e[l]}}nc(b,a);return b}function aa(b){return parseInt(b,10)}function Ob(b,a){return w(Object.create(b),a)}function E(){}function ra(b){return b}function ea(b){return function(){return b}}function x(b){return"undefined"===
typeof b}function y(b){return"undefined"!==typeof b}function J(b){return null!==b&&"object"===typeof b}function C(b){return"string"===typeof b}function Y(b){return"number"===typeof b}function ga(b){return"[object Date]"===Ca.call(b)}function G(b){return"function"===typeof b}function Ua(b){return"[object RegExp]"===Ca.call(b)}function Ta(b){return b&&b.window===b}function Va(b){return b&&b.$evalAsync&&b.$watch}function Wa(b){return"boolean"===typeof b}function oc(b){return!(!b||!(b.nodeName||b.prop&&
b.attr&&b.find))}function Gd(b){var a={};b=b.split(",");var c;for(c=0;c<b.length;c++)a[b[c]]=!0;return a}function va(b){return z(b.nodeName||b[0]&&b[0].nodeName)}function Xa(b,a){var c=b.indexOf(a);0<=c&&b.splice(c,1);return a}function Da(b,a,c,d){if(Ta(b)||Va(b))throw Ja("cpws");if(a){if(b===a)throw Ja("cpi");c=c||[];d=d||[];if(J(b)){var e=c.indexOf(b);if(-1!==e)return d[e];c.push(b);d.push(a)}if(H(b))for(var f=a.length=0;f<b.length;f++)e=Da(b[f],null,c,d),J(b[f])&&(c.push(b[f]),d.push(e)),a.push(e);
else{var g=a.$$hashKey;H(a)?a.length=0:r(a,function(b,c){delete a[c]});for(f in b)b.hasOwnProperty(f)&&(e=Da(b[f],null,c,d),J(b[f])&&(c.push(b[f]),d.push(e)),a[f]=e);nc(a,g)}}else if(a=b)H(b)?a=Da(b,[],c,d):ga(b)?a=new Date(b.getTime()):Ua(b)?(a=new RegExp(b.source,b.toString().match(/[^\/]*$/)[0]),a.lastIndex=b.lastIndex):J(b)&&(e=Object.create(Object.getPrototypeOf(b)),a=Da(b,e,c,d));return a}function sa(b,a){if(H(b)){a=a||[];for(var c=0,d=b.length;c<d;c++)a[c]=b[c]}else if(J(b))for(c in a=a||{},
b)if("$"!==c.charAt(0)||"$"!==c.charAt(1))a[c]=b[c];return a||b}function ha(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;var c=typeof b,d;if(c==typeof a&&"object"==c)if(H(b)){if(!H(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!ha(b[d],a[d]))return!1;return!0}}else{if(ga(b))return ga(a)?ha(b.getTime(),a.getTime()):!1;if(Ua(b))return Ua(a)?b.toString()==a.toString():!1;if(Va(b)||Va(a)||Ta(b)||Ta(a)||H(a)||ga(a)||Ua(a))return!1;c={};for(d in b)if("$"!==
d.charAt(0)&&!G(b[d])){if(!ha(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!c.hasOwnProperty(d)&&"$"!==d.charAt(0)&&a[d]!==t&&!G(a[d]))return!1;return!0}return!1}function Ya(b,a,c){return b.concat(Za.call(a,c))}function pc(b,a){var c=2<arguments.length?Za.call(arguments,2):[];return!G(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?a.apply(b,Ya(c,arguments,0)):a.apply(b,c)}:function(){return arguments.length?a.apply(b,arguments):a.call(b)}}function Hd(b,a){var c=a;"string"===typeof b&&
"$"===b.charAt(0)&&"$"===b.charAt(1)?c=t:Ta(a)?c="$WINDOW":a&&W===a?c="$DOCUMENT":Va(a)&&(c="$SCOPE");return c}function $a(b,a){if("undefined"===typeof b)return t;Y(a)||(a=a?2:null);return JSON.stringify(b,Hd,a)}function qc(b){return C(b)?JSON.parse(b):b}function wa(b){b=A(b).clone();try{b.empty()}catch(a){}var c=A("<div>").append(b).html();try{return b[0].nodeType===pb?z(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+z(b)})}catch(d){return z(c)}}function rc(b){try{return decodeURIComponent(b)}catch(a){}}
function sc(b){var a={},c,d;r((b||"").split("&"),function(b){b&&(c=b.replace(/\+/g,"%20").split("="),d=rc(c[0]),y(d)&&(b=y(c[1])?rc(c[1]):!0,tc.call(a,d)?H(a[d])?a[d].push(b):a[d]=[a[d],b]:a[d]=b))});return a}function Pb(b){var a=[];r(b,function(b,d){H(b)?r(b,function(b){a.push(Ea(d,!0)+(!0===b?"":"="+Ea(b,!0)))}):a.push(Ea(d,!0)+(!0===b?"":"="+Ea(b,!0)))});return a.length?a.join("&"):""}function qb(b){return Ea(b,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function Ea(b,a){return encodeURIComponent(b).replace(/%40/gi,
"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,a?"%20":"+")}function Id(b,a){var c,d,e=rb.length;b=A(b);for(d=0;d<e;++d)if(c=rb[d]+a,C(c=b.attr(c)))return c;return null}function Jd(b,a){var c,d,e={};r(rb,function(a){a+="app";!c&&b.hasAttribute&&b.hasAttribute(a)&&(c=b,d=b.getAttribute(a))});r(rb,function(a){a+="app";var e;!c&&(e=b.querySelector("["+a.replace(":","\\:")+"]"))&&(c=e,d=e.getAttribute(a))});c&&(e.strictDi=null!==Id(c,"strict-di"),
a(c,d?[d]:[],e))}function uc(b,a,c){J(c)||(c={});c=w({strictDi:!1},c);var d=function(){b=A(b);if(b.injector()){var d=b[0]===W?"document":wa(b);throw Ja("btstrpd",d.replace(/</,"&lt;").replace(/>/,"&gt;"));}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);c.debugInfoEnabled&&a.push(["$compileProvider",function(a){a.debugInfoEnabled(!0)}]);a.unshift("ng");d=ab(a,c.strictDi);d.invoke(["$rootScope","$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",
d);c(b)(a)})}]);return d},e=/^NG_ENABLE_DEBUG_INFO!/,f=/^NG_DEFER_BOOTSTRAP!/;Q&&e.test(Q.name)&&(c.debugInfoEnabled=!0,Q.name=Q.name.replace(e,""));if(Q&&!f.test(Q.name))return d();Q.name=Q.name.replace(f,"");ca.resumeBootstrap=function(b){r(b,function(b){a.push(b)});return d()};G(ca.resumeDeferredBootstrap)&&ca.resumeDeferredBootstrap()}function Kd(){Q.name="NG_ENABLE_DEBUG_INFO!"+Q.name;Q.location.reload()}function Ld(b){b=ca.element(b).injector();if(!b)throw Ja("test");return b.get("$$testability")}
function vc(b,a){a=a||"_";return b.replace(Md,function(b,d){return(d?a:"")+b.toLowerCase()})}function Nd(){var b;wc||((ta=Q.jQuery)&&ta.fn.on?(A=ta,w(ta.fn,{scope:Ka.scope,isolateScope:Ka.isolateScope,controller:Ka.controller,injector:Ka.injector,inheritedData:Ka.inheritedData}),b=ta.cleanData,ta.cleanData=function(a){var c;if(Qb)Qb=!1;else for(var d=0,e;null!=(e=a[d]);d++)(c=ta._data(e,"events"))&&c.$destroy&&ta(e).triggerHandler("$destroy");b(a)}):A=T,ca.element=A,wc=!0)}function Rb(b,a,c){if(!b)throw Ja("areq",
a||"?",c||"required");return b}function sb(b,a,c){c&&H(b)&&(b=b[b.length-1]);Rb(G(b),a,"not a function, got "+(b&&"object"===typeof b?b.constructor.name||"Object":typeof b));return b}function La(b,a){if("hasOwnProperty"===b)throw Ja("badname",a);}function xc(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,f=a.length,g=0;g<f;g++)d=a[g],b&&(b=(e=b)[d]);return!c&&G(b)?pc(e,b):b}function tb(b){var a=b[0];b=b[b.length-1];var c=[a];do{a=a.nextSibling;if(!a)break;c.push(a)}while(a!==b);return A(c)}function ia(){return Object.create(null)}
function Od(b){function a(a,b,c){return a[b]||(a[b]=c())}var c=R("$injector"),d=R("ng");b=a(b,"angular",Object);b.$$minErr=b.$$minErr||R;return a(b,"module",function(){var b={};return function(f,g,h){if("hasOwnProperty"===f)throw d("badname","module");g&&b.hasOwnProperty(f)&&(b[f]=null);return a(b,f,function(){function a(c,d,e,f){f||(f=b);return function(){f[e||"push"]([c,d,arguments]);return u}}if(!g)throw c("nomod",f);var b=[],d=[],e=[],q=a("$injector","invoke","push",d),u={_invokeQueue:b,_configBlocks:d,
_runBlocks:e,requires:g,name:f,provider:a("$provide","provider"),factory:a("$provide","factory"),service:a("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),animation:a("$animateProvider","register"),filter:a("$filterProvider","register"),controller:a("$controllerProvider","register"),directive:a("$compileProvider","directive"),config:q,run:function(a){e.push(a);return this}};h&&q(h);return u})}})}function Pd(b){w(b,{bootstrap:uc,copy:Da,extend:w,equals:ha,
element:A,forEach:r,injector:ab,noop:E,bind:pc,toJson:$a,fromJson:qc,identity:ra,isUndefined:x,isDefined:y,isString:C,isFunction:G,isObject:J,isNumber:Y,isElement:oc,isArray:H,version:Qd,isDate:ga,lowercase:z,uppercase:ub,callbacks:{counter:0},getTestability:Ld,$$minErr:R,$$csp:bb,reloadWithDebugInfo:Kd});cb=Od(Q);try{cb("ngLocale")}catch(a){cb("ngLocale",[]).provider("$locale",Rd)}cb("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:Sd});a.provider("$compile",yc).directive({a:Td,
input:zc,textarea:zc,form:Ud,script:Vd,select:Wd,style:Xd,option:Yd,ngBind:Zd,ngBindHtml:$d,ngBindTemplate:ae,ngClass:be,ngClassEven:ce,ngClassOdd:de,ngCloak:ee,ngController:fe,ngForm:ge,ngHide:he,ngIf:ie,ngInclude:je,ngInit:ke,ngNonBindable:le,ngPluralize:me,ngRepeat:ne,ngShow:oe,ngStyle:pe,ngSwitch:qe,ngSwitchWhen:re,ngSwitchDefault:se,ngOptions:te,ngTransclude:ue,ngModel:ve,ngList:we,ngChange:xe,pattern:Ac,ngPattern:Ac,required:Bc,ngRequired:Bc,minlength:Cc,ngMinlength:Cc,maxlength:Dc,ngMaxlength:Dc,
ngValue:ye,ngModelOptions:ze}).directive({ngInclude:Ae}).directive(vb).directive(Ec);a.provider({$anchorScroll:Be,$animate:Ce,$browser:De,$cacheFactory:Ee,$controller:Fe,$document:Ge,$exceptionHandler:He,$filter:Fc,$interpolate:Ie,$interval:Je,$http:Ke,$httpBackend:Le,$location:Me,$log:Ne,$parse:Oe,$rootScope:Pe,$q:Qe,$$q:Re,$sce:Se,$sceDelegate:Te,$sniffer:Ue,$templateCache:Ve,$templateRequest:We,$$testability:Xe,$timeout:Ye,$window:Ze,$$rAF:$e,$$asyncCallback:af,$$jqLite:bf})}])}function db(b){return b.replace(cf,
function(a,b,d,e){return e?d.toUpperCase():d}).replace(df,"Moz$1")}function Gc(b){b=b.nodeType;return b===qa||!b||9===b}function Hc(b,a){var c,d,e=a.createDocumentFragment(),f=[];if(Sb.test(b)){c=c||e.appendChild(a.createElement("div"));d=(ef.exec(b)||["",""])[1].toLowerCase();d=ja[d]||ja._default;c.innerHTML=d[1]+b.replace(ff,"<$1></$2>")+d[2];for(d=d[0];d--;)c=c.lastChild;f=Ya(f,c.childNodes);c=e.firstChild;c.textContent=""}else f.push(a.createTextNode(b));e.textContent="";e.innerHTML="";r(f,function(a){e.appendChild(a)});
return e}function T(b){if(b instanceof T)return b;var a;C(b)&&(b=N(b),a=!0);if(!(this instanceof T)){if(a&&"<"!=b.charAt(0))throw Tb("nosel");return new T(b)}if(a){a=W;var c;b=(c=gf.exec(b))?[a.createElement(c[1])]:(c=Hc(b,a))?c.childNodes:[]}Ic(this,b)}function Ub(b){return b.cloneNode(!0)}function wb(b,a){a||xb(b);if(b.querySelectorAll)for(var c=b.querySelectorAll("*"),d=0,e=c.length;d<e;d++)xb(c[d])}function Jc(b,a,c,d){if(y(d))throw Tb("offargs");var e=(d=yb(b))&&d.events,f=d&&d.handle;if(f)if(a)r(a.split(" "),
function(a){if(y(c)){var d=e[a];Xa(d||[],c);if(d&&0<d.length)return}b.removeEventListener(a,f,!1);delete e[a]});else for(a in e)"$destroy"!==a&&b.removeEventListener(a,f,!1),delete e[a]}function xb(b,a){var c=b.ng339,d=c&&zb[c];d&&(a?delete d.data[a]:(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),Jc(b)),delete zb[c],b.ng339=t))}function yb(b,a){var c=b.ng339,c=c&&zb[c];a&&!c&&(b.ng339=c=++hf,c=zb[c]={events:{},data:{},handle:t});return c}function Vb(b,a,c){if(Gc(b)){var d=y(c),e=!d&&a&&!J(a),
f=!a;b=(b=yb(b,!e))&&b.data;if(d)b[a]=c;else{if(f)return b;if(e)return b&&b[a];w(b,a)}}}function Ab(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+a+" "):!1}function Bb(b,a){a&&b.setAttribute&&r(a.split(" "),function(a){b.setAttribute("class",N((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+N(a)+" "," ")))})}function Cb(b,a){if(a&&b.setAttribute){var c=(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");
r(a.split(" "),function(a){a=N(a);-1===c.indexOf(" "+a+" ")&&(c+=a+" ")});b.setAttribute("class",N(c))}}function Ic(b,a){if(a)if(a.nodeType)b[b.length++]=a;else{var c=a.length;if("number"===typeof c&&a.window!==a){if(c)for(var d=0;d<c;d++)b[b.length++]=a[d]}else b[b.length++]=a}}function Kc(b,a){return Db(b,"$"+(a||"ngController")+"Controller")}function Db(b,a,c){9==b.nodeType&&(b=b.documentElement);for(a=H(a)?a:[a];b;){for(var d=0,e=a.length;d<e;d++)if((c=A.data(b,a[d]))!==t)return c;b=b.parentNode||
11===b.nodeType&&b.host}}function Lc(b){for(wb(b,!0);b.firstChild;)b.removeChild(b.firstChild)}function Mc(b,a){a||wb(b);var c=b.parentNode;c&&c.removeChild(b)}function jf(b,a){a=a||Q;if("complete"===a.document.readyState)a.setTimeout(b);else A(a).on("load",b)}function Nc(b,a){var c=Eb[a.toLowerCase()];return c&&Oc[va(b)]&&c}function kf(b,a){var c=b.nodeName;return("INPUT"===c||"TEXTAREA"===c)&&Pc[a]}function lf(b,a){var c=function(c,e){c.isDefaultPrevented=function(){return c.defaultPrevented};var f=
a[e||c.type],g=f?f.length:0;if(g){if(x(c.immediatePropagationStopped)){var h=c.stopImmediatePropagation;c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0;c.stopPropagation&&c.stopPropagation();h&&h.call(c)}}c.isImmediatePropagationStopped=function(){return!0===c.immediatePropagationStopped};1<g&&(f=sa(f));for(var l=0;l<g;l++)c.isImmediatePropagationStopped()||f[l].call(b,c)}};c.elem=b;return c}function bf(){this.$get=function(){return w(T,{hasClass:function(b,a){b.attr&&(b=b[0]);
return Ab(b,a)},addClass:function(b,a){b.attr&&(b=b[0]);return Cb(b,a)},removeClass:function(b,a){b.attr&&(b=b[0]);return Bb(b,a)}})}}function Ma(b,a){var c=b&&b.$$hashKey;if(c)return"function"===typeof c&&(c=b.$$hashKey()),c;c=typeof b;return c="function"==c||"object"==c&&null!==b?b.$$hashKey=c+":"+(a||Fd)():c+":"+b}function eb(b,a){if(a){var c=0;this.nextUid=function(){return++c}}r(b,this.put,this)}function mf(b){return(b=b.toString().replace(Qc,"").match(Rc))?"function("+(b[1]||"").replace(/[\s\r\n]+/,
" ")+")":"fn"}function ab(b,a){function c(a){return function(b,c){if(J(b))r(b,mc(a));else return a(b,c)}}function d(a,b){La(a,"service");if(G(b)||H(b))b=q.instantiate(b);if(!b.$get)throw Fa("pget",a);return p[a+"Provider"]=b}function e(a,b){return function(){var c=s.invoke(b,this);if(x(c))throw Fa("undef",a);return c}}function f(a,b,c){return d(a,{$get:!1!==c?e(a,b):b})}function g(a){var b=[],c;r(a,function(a){function d(a){var b,c;b=0;for(c=a.length;b<c;b++){var e=a[b],f=q.get(e[0]);f[e[1]].apply(f,
e[2])}}if(!n.get(a)){n.put(a,!0);try{C(a)?(c=cb(a),b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):G(a)?b.push(q.invoke(a)):H(a)?b.push(q.invoke(a)):sb(a,"module")}catch(e){throw H(a)&&(a=a[a.length-1]),e.message&&e.stack&&-1==e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Fa("modulerr",a,e.stack||e.message||e);}}});return b}function h(b,c){function d(a,e){if(b.hasOwnProperty(a)){if(b[a]===l)throw Fa("cdep",a+" <- "+k.join(" <- "));return b[a]}try{return k.unshift(a),
b[a]=l,b[a]=c(a,e)}catch(f){throw b[a]===l&&delete b[a],f;}finally{k.shift()}}function e(b,c,f,g){"string"===typeof f&&(g=f,f=null);var k=[],h=ab.$$annotate(b,a,g),l,q,p;q=0;for(l=h.length;q<l;q++){p=h[q];if("string"!==typeof p)throw Fa("itkn",p);k.push(f&&f.hasOwnProperty(p)?f[p]:d(p,g))}H(b)&&(b=b[l]);return b.apply(c,k)}return{invoke:e,instantiate:function(a,b,c){var d=Object.create((H(a)?a[a.length-1]:a).prototype||null);a=e(a,d,b,c);return J(a)||G(a)?a:d},get:d,annotate:ab.$$annotate,has:function(a){return p.hasOwnProperty(a+
"Provider")||b.hasOwnProperty(a)}}}a=!0===a;var l={},k=[],n=new eb([],!0),p={$provide:{provider:c(d),factory:c(f),service:c(function(a,b){return f(a,["$injector",function(a){return a.instantiate(b)}])}),value:c(function(a,b){return f(a,ea(b),!1)}),constant:c(function(a,b){La(a,"constant");p[a]=b;u[a]=b}),decorator:function(a,b){var c=q.get(a+"Provider"),d=c.$get;c.$get=function(){var a=s.invoke(d,c);return s.invoke(b,null,{$delegate:a})}}}},q=p.$injector=h(p,function(a,b){ca.isString(b)&&k.push(b);
throw Fa("unpr",k.join(" <- "));}),u={},s=u.$injector=h(u,function(a,b){var c=q.get(a+"Provider",b);return s.invoke(c.$get,c,t,a)});r(g(b),function(a){s.invoke(a||E)});return s}function Be(){var b=!0;this.disableAutoScrolling=function(){b=!1};this.$get=["$window","$location","$rootScope",function(a,c,d){function e(a){var b=null;Array.prototype.some.call(a,function(a){if("a"===va(a))return b=a,!0});return b}function f(b){if(b){b.scrollIntoView();var c;c=g.yOffset;G(c)?c=c():oc(c)?(c=c[0],c="fixed"!==
a.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):Y(c)||(c=0);c&&(b=b.getBoundingClientRect().top,a.scrollBy(0,b-c))}else a.scrollTo(0,0)}function g(){var a=c.hash(),b;a?(b=h.getElementById(a))?f(b):(b=e(h.getElementsByName(a)))?f(b):"top"===a&&f(null):f(null)}var h=a.document;b&&d.$watch(function(){return c.hash()},function(a,b){a===b&&""===a||jf(function(){d.$evalAsync(g)})});return g}]}function af(){this.$get=["$$rAF","$timeout",function(b,a){return b.supported?function(a){return b(a)}:
function(b){return a(b,0,!1)}}]}function nf(b,a,c,d){function e(a){try{a.apply(null,Za.call(arguments,1))}finally{if(m--,0===m)for(;F.length;)try{F.pop()()}catch(b){c.error(b)}}}function f(a,b){(function da(){r(Z,function(a){a()});L=b(da,a)})()}function g(){h();l()}function h(){a:{try{B=u.state;break a}catch(a){}B=void 0}B=x(B)?null:B;ha(B,O)&&(B=O);O=B}function l(){if(D!==n.url()||I!==B)D=n.url(),I=B,r(X,function(a){a(n.url(),B)})}function k(a){try{return decodeURIComponent(a)}catch(b){return a}}
var n=this,p=a[0],q=b.location,u=b.history,s=b.setTimeout,M=b.clearTimeout,v={};n.isMock=!1;var m=0,F=[];n.$$completeOutstandingRequest=e;n.$$incOutstandingRequestCount=function(){m++};n.notifyWhenNoOutstandingRequests=function(a){r(Z,function(a){a()});0===m?a():F.push(a)};var Z=[],L;n.addPollFn=function(a){x(L)&&f(100,s);Z.push(a);return a};var B,I,D=q.href,S=a.find("base"),P=null;h();I=B;n.url=function(a,c,e){x(e)&&(e=null);q!==b.location&&(q=b.location);u!==b.history&&(u=b.history);if(a){var f=
I===e;if(D===a&&(!d.history||f))return n;var g=D&&Ga(D)===Ga(a);D=a;I=e;!d.history||g&&f?(g||(P=a),c?q.replace(a):g?(c=q,e=a.indexOf("#"),a=-1===e?"":a.substr(e+1),c.hash=a):q.href=a):(u[c?"replaceState":"pushState"](e,"",a),h(),I=B);return n}return P||q.href.replace(/%27/g,"'")};n.state=function(){return B};var X=[],ba=!1,O=null;n.onUrlChange=function(a){if(!ba){if(d.history)A(b).on("popstate",g);A(b).on("hashchange",g);ba=!0}X.push(a);return a};n.$$checkUrlChange=l;n.baseHref=function(){var a=S.attr("href");
return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};var fa={},y="",ka=n.baseHref();n.cookies=function(a,b){var d,e,f,g;if(a)b===t?p.cookie=encodeURIComponent(a)+"=;path="+ka+";expires=Thu, 01 Jan 1970 00:00:00 GMT":C(b)&&(d=(p.cookie=encodeURIComponent(a)+"="+encodeURIComponent(b)+";path="+ka).length+1,4096<d&&c.warn("Cookie '"+a+"' possibly not set or overflowed because it was too large ("+d+" > 4096 bytes)!"));else{if(p.cookie!==y)for(y=p.cookie,d=y.split("; "),fa={},f=0;f<d.length;f++)e=d[f],g=
e.indexOf("="),0<g&&(a=k(e.substring(0,g)),fa[a]===t&&(fa[a]=k(e.substring(g+1))));return fa}};n.defer=function(a,b){var c;m++;c=s(function(){delete v[c];e(a)},b||0);v[c]=!0;return c};n.defer.cancel=function(a){return v[a]?(delete v[a],M(a),e(E),!0):!1}}function De(){this.$get=["$window","$log","$sniffer","$document",function(b,a,c,d){return new nf(b,d,a,c)}]}function Ee(){this.$get=function(){function b(b,d){function e(a){a!=p&&(q?q==a&&(q=a.n):q=a,f(a.n,a.p),f(a,p),p=a,p.n=null)}function f(a,b){a!=
b&&(a&&(a.p=b),b&&(b.n=a))}if(b in a)throw R("$cacheFactory")("iid",b);var g=0,h=w({},d,{id:b}),l={},k=d&&d.capacity||Number.MAX_VALUE,n={},p=null,q=null;return a[b]={put:function(a,b){if(k<Number.MAX_VALUE){var c=n[a]||(n[a]={key:a});e(c)}if(!x(b))return a in l||g++,l[a]=b,g>k&&this.remove(q.key),b},get:function(a){if(k<Number.MAX_VALUE){var b=n[a];if(!b)return;e(b)}return l[a]},remove:function(a){if(k<Number.MAX_VALUE){var b=n[a];if(!b)return;b==p&&(p=b.p);b==q&&(q=b.n);f(b.n,b.p);delete n[a]}delete l[a];
g--},removeAll:function(){l={};g=0;n={};p=q=null},destroy:function(){n=h=l=null;delete a[b]},info:function(){return w({},h,{size:g})}}}var a={};b.info=function(){var b={};r(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};return b}}function Ve(){this.$get=["$cacheFactory",function(b){return b("templates")}]}function yc(b,a){function c(a,b){var c=/^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,d={};r(a,function(a,e){var f=a.match(c);if(!f)throw la("iscp",b,e,a);d[e]={mode:f[1][0],collection:"*"===
f[2],optional:"?"===f[3],attrName:f[4]||e}});return d}var d={},e=/^\s*directive\:\s*([\w\-]+)\s+(.*)$/,f=/(([\w\-]+)(?:\:([^;]+))?;?)/,g=Gd("ngSrc,ngSrcset,src,srcset"),h=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,l=/^(on[a-z]+|formaction)$/;this.directive=function p(a,e){La(a,"directive");C(a)?(Rb(e,"directiveFactory"),d.hasOwnProperty(a)||(d[a]=[],b.factory(a+"Directive",["$injector","$exceptionHandler",function(b,e){var f=[];r(d[a],function(d,g){try{var h=b.invoke(d);G(h)?h={compile:ea(h)}:!h.compile&&h.link&&
(h.compile=ea(h.link));h.priority=h.priority||0;h.index=g;h.name=h.name||a;h.require=h.require||h.controller&&h.name;h.restrict=h.restrict||"EA";J(h.scope)&&(h.$$isolateBindings=c(h.scope,h.name));f.push(h)}catch(k){e(k)}});return f}])),d[a].push(e)):r(a,mc(p));return this};this.aHrefSanitizationWhitelist=function(b){return y(b)?(a.aHrefSanitizationWhitelist(b),this):a.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(b){return y(b)?(a.imgSrcSanitizationWhitelist(b),this):a.imgSrcSanitizationWhitelist()};
var k=!0;this.debugInfoEnabled=function(a){return y(a)?(k=a,this):k};this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(a,b,c,s,M,v,m,F,Z,L,B){function I(a,b){try{a.addClass(b)}catch(c){}}function D(a,b,c,d,e){a instanceof A||(a=A(a));r(a,function(b,c){b.nodeType==pb&&b.nodeValue.match(/\S+/)&&(a[c]=A(b).wrap("<span></span>").parent()[0])});var f=S(a,b,a,c,d,e);D.$$addScopeClass(a);
var g=null;return function(b,c,d){Rb(b,"scope");d=d||{};var e=d.parentBoundTranscludeFn,h=d.transcludeControllers;d=d.futureParentElement;e&&e.$$boundTransclude&&(e=e.$$boundTransclude);g||(g=(d=d&&d[0])?"foreignobject"!==va(d)&&d.toString().match(/SVG/)?"svg":"html":"html");d="html"!==g?A(Xb(g,A("<div>").append(a).html())):c?Ka.clone.call(a):a;if(h)for(var k in h)d.data("$"+k+"Controller",h[k].instance);D.$$addScopeInfo(d,b);c&&c(d,b);f&&f(b,d,d,e);return d}}function S(a,b,c,d,e,f){function g(a,
c,d,e){var f,k,l,q,p,s,M;if(m)for(M=Array(c.length),q=0;q<h.length;q+=3)f=h[q],M[f]=c[f];else M=c;q=0;for(p=h.length;q<p;)k=M[h[q++]],c=h[q++],f=h[q++],c?(c.scope?(l=a.$new(),D.$$addScopeInfo(A(k),l)):l=a,s=c.transcludeOnThisElement?P(a,c.transclude,e,c.elementTranscludeOnThisElement):!c.templateOnThisElement&&e?e:!e&&b?P(a,b):null,c(f,l,k,d,s)):f&&f(a,k.childNodes,t,e)}for(var h=[],k,l,q,p,m,s=0;s<a.length;s++){k=new Yb;l=X(a[s],[],k,0===s?d:t,e);(f=l.length?fa(l,a[s],k,b,c,null,[],[],f):null)&&
f.scope&&D.$$addScopeClass(k.$$element);k=f&&f.terminal||!(q=a[s].childNodes)||!q.length?null:S(q,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b);if(f||k)h.push(s,f,k),p=!0,m=m||f;f=null}return p?g:null}function P(a,b,c,d){return function(d,e,f,g,h){d||(d=a.$new(!1,h),d.$$transcluded=!0);return b(d,e,{parentBoundTranscludeFn:c,transcludeControllers:f,futureParentElement:g})}}function X(a,b,c,d,g){var h=c.$attr,k;switch(a.nodeType){case qa:ka(b,xa(va(a)),"E",d,g);for(var l,
q,p,m=a.attributes,s=0,M=m&&m.length;s<M;s++){var u=!1,L=!1;l=m[s];k=l.name;q=N(l.value);l=xa(k);if(p=U.test(l))k=k.replace(Sc,"").substr(8).replace(/_(.)/g,function(a,b){return b.toUpperCase()});var B=l.replace(/(Start|End)$/,"");x(B)&&l===B+"Start"&&(u=k,L=k.substr(0,k.length-5)+"end",k=k.substr(0,k.length-6));l=xa(k.toLowerCase());h[l]=k;if(p||!c.hasOwnProperty(l))c[l]=q,Nc(a,l)&&(c[l]=!0);Oa(a,b,q,l,p);ka(b,l,"A",d,g,u,L)}a=a.className;J(a)&&(a=a.animVal);if(C(a)&&""!==a)for(;k=f.exec(a);)l=xa(k[2]),
ka(b,l,"C",d,g)&&(c[l]=N(k[3])),a=a.substr(k.index+k[0].length);break;case pb:za(b,a.nodeValue);break;case 8:try{if(k=e.exec(a.nodeValue))l=xa(k[1]),ka(b,l,"M",d,g)&&(c[l]=N(k[2]))}catch(v){}}b.sort(da);return b}function ba(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw la("uterdir",b,c);a.nodeType==qa&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return A(d)}function O(a,b,c){return function(d,e,f,g,h){e=ba(e[0],
b,c);return a(d,e,f,g,h)}}function fa(a,d,e,f,g,k,l,p,m){function s(a,b,c,d){if(a){c&&(a=O(a,c,d));a.require=K.require;a.directiveName=da;if(P===K||K.$$isolateScope)a=Y(a,{isolateScope:!0});l.push(a)}if(b){c&&(b=O(b,c,d));b.require=K.require;b.directiveName=da;if(P===K||K.$$isolateScope)b=Y(b,{isolateScope:!0});p.push(b)}}function L(a,b,c,d){var e,f="data",g=!1,k=c,l;if(C(b)){l=b.match(h);b=b.substring(l[0].length);l[3]&&(l[1]?l[3]=null:l[1]=l[3]);"^"===l[1]?f="inheritedData":"^^"===l[1]&&(f="inheritedData",
k=c.parent());"?"===l[2]&&(g=!0);e=null;d&&"data"===f&&(e=d[b])&&(e=e.instance);e=e||k[f]("$"+b+"Controller");if(!e&&!g)throw la("ctreq",b,a);return e||null}H(b)&&(e=[],r(b,function(b){e.push(L(a,b,c,d))}));return e}function B(a,c,f,g,h){function k(a,b,c){var d;Va(a)||(c=b,b=a,a=t);E&&(d=F);c||(c=E?X.parent():X);return h(a,b,d,c,Wb)}var m,s,u,I,F,gb,X,O;d===f?(O=e,X=e.$$element):(X=A(f),O=new Yb(X,e));P&&(I=c.$new(!0));h&&(gb=k,gb.$$boundTransclude=h);S&&(Z={},F={},r(S,function(a){var b={$scope:a===
P||a.$$isolateScope?I:c,$element:X,$attrs:O,$transclude:gb};u=a.controller;"@"==u&&(u=O[a.name]);b=v(u,b,!0,a.controllerAs);F[a.name]=b;E||X.data("$"+a.name+"Controller",b.instance);Z[a.name]=b}));if(P){D.$$addScopeInfo(X,I,!0,!(ma&&(ma===P||ma===P.$$originalDirective)));D.$$addScopeClass(X,!0);g=Z&&Z[P.name];var ba=I;g&&g.identifier&&!0===P.bindToController&&(ba=g.instance);r(I.$$isolateBindings=P.$$isolateBindings,function(a,d){var e=a.attrName,f=a.optional,g,h,k,l;switch(a.mode){case "@":O.$observe(e,
function(a){ba[d]=a});O.$$observers[e].$$scope=c;O[e]&&(ba[d]=b(O[e])(c));break;case "=":if(f&&!O[e])break;h=M(O[e]);l=h.literal?ha:function(a,b){return a===b||a!==a&&b!==b};k=h.assign||function(){g=ba[d]=h(c);throw la("nonassign",O[e],P.name);};g=ba[d]=h(c);f=function(a){l(a,ba[d])||(l(a,g)?k(c,a=ba[d]):ba[d]=a);return g=a};f.$stateful=!0;f=a.collection?c.$watchCollection(O[e],f):c.$watch(M(O[e],f),null,h.literal);I.$on("$destroy",f);break;case "&":h=M(O[e]),ba[d]=function(a){return h(c,a)}}})}Z&&
(r(Z,function(a){a()}),Z=null);g=0;for(m=l.length;g<m;g++)s=l[g],$(s,s.isolateScope?I:c,X,O,s.require&&L(s.directiveName,s.require,X,F),gb);var Wb=c;P&&(P.template||null===P.templateUrl)&&(Wb=I);a&&a(Wb,f.childNodes,t,h);for(g=p.length-1;0<=g;g--)s=p[g],$(s,s.isolateScope?I:c,X,O,s.require&&L(s.directiveName,s.require,X,F),gb)}m=m||{};for(var I=-Number.MAX_VALUE,F,S=m.controllerDirectives,Z,P=m.newIsolateScopeDirective,ma=m.templateDirective,fa=m.nonTlbTranscludeDirective,ka=!1,x=!1,E=m.hasElementTranscludeDirective,
w=e.$$element=A(d),K,da,V,fb=f,za,z=0,Q=a.length;z<Q;z++){K=a[z];var Oa=K.$$start,U=K.$$end;Oa&&(w=ba(d,Oa,U));V=t;if(I>K.priority)break;if(V=K.scope)K.templateUrl||(J(V)?(Na("new/isolated scope",P||F,K,w),P=K):Na("new/isolated scope",P,K,w)),F=F||K;da=K.name;!K.templateUrl&&K.controller&&(V=K.controller,S=S||{},Na("'"+da+"' controller",S[da],K,w),S[da]=K);if(V=K.transclude)ka=!0,K.$$tlb||(Na("transclusion",fa,K,w),fa=K),"element"==V?(E=!0,I=K.priority,V=w,w=e.$$element=A(W.createComment(" "+da+": "+
e[da]+" ")),d=w[0],T(g,Za.call(V,0),d),fb=D(V,f,I,k&&k.name,{nonTlbTranscludeDirective:fa})):(V=A(Ub(d)).contents(),w.empty(),fb=D(V,f));if(K.template)if(x=!0,Na("template",ma,K,w),ma=K,V=G(K.template)?K.template(w,e):K.template,V=Tc(V),K.replace){k=K;V=Sb.test(V)?Uc(Xb(K.templateNamespace,N(V))):[];d=V[0];if(1!=V.length||d.nodeType!==qa)throw la("tplrt",da,"");T(g,w,d);Q={$attr:{}};V=X(d,[],Q);var aa=a.splice(z+1,a.length-(z+1));P&&y(V);a=a.concat(V).concat(aa);R(e,Q);Q=a.length}else w.html(V);if(K.templateUrl)x=
!0,Na("template",ma,K,w),ma=K,K.replace&&(k=K),B=of(a.splice(z,a.length-z),w,e,g,ka&&fb,l,p,{controllerDirectives:S,newIsolateScopeDirective:P,templateDirective:ma,nonTlbTranscludeDirective:fa}),Q=a.length;else if(K.compile)try{za=K.compile(w,e,fb),G(za)?s(null,za,Oa,U):za&&s(za.pre,za.post,Oa,U)}catch(pf){c(pf,wa(w))}K.terminal&&(B.terminal=!0,I=Math.max(I,K.priority))}B.scope=F&&!0===F.scope;B.transcludeOnThisElement=ka;B.elementTranscludeOnThisElement=E;B.templateOnThisElement=x;B.transclude=fb;
m.hasElementTranscludeDirective=E;return B}function y(a){for(var b=0,c=a.length;b<c;b++)a[b]=Ob(a[b],{$$isolateScope:!0})}function ka(b,e,f,g,h,k,l){if(e===h)return null;h=null;if(d.hasOwnProperty(e)){var q;e=a.get(e+"Directive");for(var m=0,s=e.length;m<s;m++)try{q=e[m],(g===t||g>q.priority)&&-1!=q.restrict.indexOf(f)&&(k&&(q=Ob(q,{$$start:k,$$end:l})),b.push(q),h=q)}catch(M){c(M)}}return h}function x(b){if(d.hasOwnProperty(b))for(var c=a.get(b+"Directive"),e=0,f=c.length;e<f;e++)if(b=c[e],b.multiElement)return!0;
return!1}function R(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;r(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&b[e]!==d&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});r(b,function(b,f){"class"==f?(I(e,b),a["class"]=(a["class"]?a["class"]+" ":"")+b):"style"==f?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function of(a,b,c,d,e,f,g,h){var k=[],l,q,p=b[0],m=a.shift(),M=Ob(m,{templateUrl:null,transclude:null,
replace:null,$$originalDirective:m}),u=G(m.templateUrl)?m.templateUrl(b,c):m.templateUrl,L=m.templateNamespace;b.empty();s(Z.getTrustedResourceUrl(u)).then(function(s){var B,v;s=Tc(s);if(m.replace){s=Sb.test(s)?Uc(Xb(L,N(s))):[];B=s[0];if(1!=s.length||B.nodeType!==qa)throw la("tplrt",m.name,u);s={$attr:{}};T(d,b,B);var D=X(B,[],s);J(m.scope)&&y(D);a=D.concat(a);R(c,s)}else B=p,b.html(s);a.unshift(M);l=fa(a,B,c,e,b,m,f,g,h);r(d,function(a,c){a==B&&(d[c]=b[0])});for(q=S(b[0].childNodes,e);k.length;){s=
k.shift();v=k.shift();var F=k.shift(),O=k.shift(),D=b[0];if(!s.$$destroyed){if(v!==p){var Z=v.className;h.hasElementTranscludeDirective&&m.replace||(D=Ub(B));T(F,A(v),D);I(A(D),Z)}v=l.transcludeOnThisElement?P(s,l.transclude,O):O;l(q,s,D,d,v)}}k=null});return function(a,b,c,d,e){a=e;b.$$destroyed||(k?k.push(b,c,d,a):(l.transcludeOnThisElement&&(a=P(b,l.transclude,e)),l(q,b,c,d,a)))}}function da(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function Na(a,
b,c,d){if(b)throw la("multidir",b.name,c.name,a,wa(d));}function za(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){a=a.parent();var b=!!a.length;b&&D.$$addBindingClass(a);return function(a,c){var e=c.parent();b||D.$$addBindingClass(e);D.$$addBindingInfo(e,d.expressions);a.$watch(d,function(a){c[0].nodeValue=a})}}})}function Xb(a,b){a=z(a||"html");switch(a){case "svg":case "math":var c=W.createElement("div");c.innerHTML="<"+a+">"+b+"</"+a+">";return c.childNodes[0].childNodes;default:return b}}
function Q(a,b){if("srcdoc"==b)return Z.HTML;var c=va(a);if("xlinkHref"==b||"form"==c&&"action"==b||"img"!=c&&("src"==b||"ngSrc"==b))return Z.RESOURCE_URL}function Oa(a,c,d,e,f){var h=Q(a,e);f=g[e]||f;var k=b(d,!0,h,f);if(k){if("multiple"===e&&"select"===va(a))throw la("selmulti",wa(a));c.push({priority:100,compile:function(){return{pre:function(a,c,g){c=g.$$observers||(g.$$observers={});if(l.test(e))throw la("nodomevents");var m=g[e];m!==d&&(k=m&&b(m,!0,h,f),d=m);k&&(g[e]=k(a),(c[e]||(c[e]=[])).$$inter=
!0,(g.$$observers&&g.$$observers[e].$$scope||a).$watch(k,function(a,b){"class"===e&&a!=b?g.$updateClass(a,b):g.$set(e,a)}))}}}})}}function T(a,b,c){var d=b[0],e=b.length,f=d.parentNode,g,h;if(a)for(g=0,h=a.length;g<h;g++)if(a[g]==d){a[g++]=c;h=g+e-1;for(var k=a.length;g<k;g++,h++)h<k?a[g]=a[h]:delete a[g];a.length-=e-1;a.context===d&&(a.context=c);break}f&&f.replaceChild(c,d);a=W.createDocumentFragment();a.appendChild(d);A(c).data(A(d).data());ta?(Qb=!0,ta.cleanData([d])):delete A.cache[d[A.expando]];
d=1;for(e=b.length;d<e;d++)f=b[d],A(f).remove(),a.appendChild(f),delete b[d];b[0]=c;b.length=1}function Y(a,b){return w(function(){return a.apply(null,arguments)},a,b)}function $(a,b,d,e,f,g){try{a(b,d,e,f,g)}catch(h){c(h,wa(d))}}var Yb=function(a,b){if(b){var c=Object.keys(b),d,e,f;d=0;for(e=c.length;d<e;d++)f=c[d],this[f]=b[f]}else this.$attr={};this.$$element=a};Yb.prototype={$normalize:xa,$addClass:function(a){a&&0<a.length&&L.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&
L.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=Vc(a,b);c&&c.length&&L.addClass(this.$$element,c);(c=Vc(b,a))&&c.length&&L.removeClass(this.$$element,c)},$set:function(a,b,d,e){var f=this.$$element[0],g=Nc(f,a),h=kf(f,a),f=a;g?(this.$$element.prop(a,b),e=g):h&&(this[h]=b,f=h);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=e=vc(a,"-"));g=va(this.$$element);if("a"===g&&"href"===a||"img"===g&&"src"===a)this[a]=b=B(b,"src"===a);else if("img"===g&&"srcset"===a){for(var g=
"",h=N(b),k=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,k=/\s/.test(h)?k:/(,)/,h=h.split(k),k=Math.floor(h.length/2),l=0;l<k;l++)var q=2*l,g=g+B(N(h[q]),!0),g=g+(" "+N(h[q+1]));h=N(h[2*l]).split(/\s/);g+=B(N(h[0]),!0);2===h.length&&(g+=" "+N(h[1]));this[a]=b=g}!1!==d&&(null===b||b===t?this.$$element.removeAttr(e):this.$$element.attr(e,b));(a=this.$$observers)&&r(a[f],function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers=ia()),e=d[a]||(d[a]=[]);e.push(b);
m.$evalAsync(function(){!e.$$inter&&c.hasOwnProperty(a)&&b(c[a])});return function(){Xa(e,b)}}};var V=b.startSymbol(),ma=b.endSymbol(),Tc="{{"==V||"}}"==ma?ra:function(a){return a.replace(/\{\{/g,V).replace(/}}/g,ma)},U=/^ngAttr[A-Z]/;D.$$addBindingInfo=k?function(a,b){var c=a.data("$binding")||[];H(b)?c=c.concat(b):c.push(b);a.data("$binding",c)}:E;D.$$addBindingClass=k?function(a){I(a,"ng-binding")}:E;D.$$addScopeInfo=k?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",
b)}:E;D.$$addScopeClass=k?function(a,b){I(a,b?"ng-isolate-scope":"ng-scope")}:E;return D}]}function xa(b){return db(b.replace(Sc,""))}function Vc(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),f=0;a:for(;f<d.length;f++){for(var g=d[f],h=0;h<e.length;h++)if(g==e[h])continue a;c+=(0<c.length?" ":"")+g}return c}function Uc(b){b=A(b);var a=b.length;if(1>=a)return b;for(;a--;)8===b[a].nodeType&&qf.call(b,a,1);return b}function Fe(){var b={},a=!1,c=/^(\S+)(\s+as\s+(\w+))?$/;this.register=function(a,c){La(a,
"controller");J(a)?w(b,a):b[a]=c};this.allowGlobals=function(){a=!0};this.$get=["$injector","$window",function(d,e){function f(a,b,c,d){if(!a||!J(a.$scope))throw R("$controller")("noscp",d,b);a.$scope[b]=c}return function(g,h,l,k){var n,p,q;l=!0===l;k&&C(k)&&(q=k);if(C(g)){k=g.match(c);if(!k)throw rf("ctrlfmt",g);p=k[1];q=q||k[3];g=b.hasOwnProperty(p)?b[p]:xc(h.$scope,p,!0)||(a?xc(e,p,!0):t);sb(g,p,!0)}if(l)return l=(H(g)?g[g.length-1]:g).prototype,n=Object.create(l||null),q&&f(h,q,n,p||g.name),w(function(){d.invoke(g,
n,h,p);return n},{instance:n,identifier:q});n=d.instantiate(g,h,p);q&&f(h,q,n,p||g.name);return n}}]}function Ge(){this.$get=["$window",function(b){return A(b.document)}]}function He(){this.$get=["$log",function(b){return function(a,c){b.error.apply(b,arguments)}}]}function Zb(b,a){if(C(b)){var c=b.replace(sf,"").trim();if(c){var d=a("Content-Type");(d=d&&0===d.indexOf(Wc))||(d=(d=c.match(tf))&&uf[d[0]].test(c));d&&(b=qc(c))}}return b}function Xc(b){var a=ia(),c,d,e;if(!b)return a;r(b.split("\n"),
function(b){e=b.indexOf(":");c=z(N(b.substr(0,e)));d=N(b.substr(e+1));c&&(a[c]=a[c]?a[c]+", "+d:d)});return a}function Yc(b){var a=J(b)?b:t;return function(c){a||(a=Xc(b));return c?(c=a[z(c)],void 0===c&&(c=null),c):a}}function Zc(b,a,c,d){if(G(d))return d(b,a,c);r(d,function(d){b=d(b,a,c)});return b}function Ke(){var b=this.defaults={transformResponse:[Zb],transformRequest:[function(a){return J(a)&&"[object File]"!==Ca.call(a)&&"[object Blob]"!==Ca.call(a)&&"[object FormData]"!==Ca.call(a)?$a(a):
a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:sa($b),put:sa($b),patch:sa($b)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"},a=!1;this.useApplyAsync=function(b){return y(b)?(a=!!b,this):a};var c=this.interceptors=[];this.$get=["$httpBackend","$browser","$cacheFactory","$rootScope","$q","$injector",function(d,e,f,g,h,l){function k(a){function c(a){var b=w({},a);b.data=a.data?Zc(a.data,a.headers,a.status,e.transformResponse):a.data;a=a.status;return 200<=a&&300>a?
b:h.reject(b)}function d(a){var b,c={};r(a,function(a,d){G(a)?(b=a(),null!=b&&(c[d]=b)):c[d]=a});return c}if(!ca.isObject(a))throw R("$http")("badreq",a);var e=w({method:"get",transformRequest:b.transformRequest,transformResponse:b.transformResponse},a);e.headers=function(a){var c=b.headers,e=w({},a.headers),f,g,c=w({},c.common,c[z(a.method)]);a:for(f in c){a=z(f);for(g in e)if(z(g)===a)continue a;e[f]=c[f]}return d(e)}(a);e.method=ub(e.method);var f=[function(a){var d=a.headers,e=Zc(a.data,Yc(d),
t,a.transformRequest);x(e)&&r(d,function(a,b){"content-type"===z(b)&&delete d[b]});x(a.withCredentials)&&!x(b.withCredentials)&&(a.withCredentials=b.withCredentials);return n(a,e).then(c,c)},t],g=h.when(e);for(r(u,function(a){(a.request||a.requestError)&&f.unshift(a.request,a.requestError);(a.response||a.responseError)&&f.push(a.response,a.responseError)});f.length;){a=f.shift();var k=f.shift(),g=g.then(a,k)}g.success=function(a){g.then(function(b){a(b.data,b.status,b.headers,e)});return g};g.error=
function(a){g.then(null,function(b){a(b.data,b.status,b.headers,e)});return g};return g}function n(c,f){function l(b,c,d,e){function f(){m(c,b,d,e)}I&&(200<=b&&300>b?I.put(P,[b,c,Xc(d),e]):I.remove(P));a?g.$applyAsync(f):(f(),g.$$phase||g.$apply())}function m(a,b,d,e){b=Math.max(b,0);(200<=b&&300>b?L.resolve:L.reject)({data:a,status:b,headers:Yc(d),config:c,statusText:e})}function n(a){m(a.data,a.status,sa(a.headers()),a.statusText)}function u(){var a=k.pendingRequests.indexOf(c);-1!==a&&k.pendingRequests.splice(a,
1)}var L=h.defer(),B=L.promise,I,D,S=c.headers,P=p(c.url,c.params);k.pendingRequests.push(c);B.then(u,u);!c.cache&&!b.cache||!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(I=J(c.cache)?c.cache:J(b.cache)?b.cache:q);I&&(D=I.get(P),y(D)?D&&G(D.then)?D.then(n,n):H(D)?m(D[1],D[0],sa(D[2]),D[3]):m(D,200,{},"OK"):I.put(P,B));x(D)&&((D=$c(c.url)?e.cookies()[c.xsrfCookieName||b.xsrfCookieName]:t)&&(S[c.xsrfHeaderName||b.xsrfHeaderName]=D),d(c.method,P,f,l,S,c.timeout,c.withCredentials,c.responseType));
return B}function p(a,b){if(!b)return a;var c=[];Ed(b,function(a,b){null===a||x(a)||(H(a)||(a=[a]),r(a,function(a){J(a)&&(a=ga(a)?a.toISOString():$a(a));c.push(Ea(b)+"="+Ea(a))}))});0<c.length&&(a+=(-1==a.indexOf("?")?"?":"&")+c.join("&"));return a}var q=f("$http"),u=[];r(c,function(a){u.unshift(C(a)?l.get(a):l.invoke(a))});k.pendingRequests=[];(function(a){r(arguments,function(a){k[a]=function(b,c){return k(w(c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){r(arguments,function(a){k[a]=
function(b,c,d){return k(w(d||{},{method:a,url:b,data:c}))}})})("post","put","patch");k.defaults=b;return k}]}function vf(){return new Q.XMLHttpRequest}function Le(){this.$get=["$browser","$window","$document",function(b,a,c){return wf(b,vf,b.defer,a.angular.callbacks,c[0])}]}function wf(b,a,c,d,e){function f(a,b,c){var f=e.createElement("script"),n=null;f.type="text/javascript";f.src=a;f.async=!0;n=function(a){f.removeEventListener("load",n,!1);f.removeEventListener("error",n,!1);e.body.removeChild(f);
f=null;var g=-1,u="unknown";a&&("load"!==a.type||d[b].called||(a={type:"error"}),u=a.type,g="error"===a.type?404:200);c&&c(g,u)};f.addEventListener("load",n,!1);f.addEventListener("error",n,!1);e.body.appendChild(f);return n}return function(e,h,l,k,n,p,q,u){function s(){m&&m();F&&F.abort()}function M(a,d,e,f,g){L!==t&&c.cancel(L);m=F=null;a(d,e,f,g);b.$$completeOutstandingRequest(E)}b.$$incOutstandingRequestCount();h=h||b.url();if("jsonp"==z(e)){var v="_"+(d.counter++).toString(36);d[v]=function(a){d[v].data=
a;d[v].called=!0};var m=f(h.replace("JSON_CALLBACK","angular.callbacks."+v),v,function(a,b){M(k,a,d[v].data,"",b);d[v]=E})}else{var F=a();F.open(e,h,!0);r(n,function(a,b){y(a)&&F.setRequestHeader(b,a)});F.onload=function(){var a=F.statusText||"",b="response"in F?F.response:F.responseText,c=1223===F.status?204:F.status;0===c&&(c=b?200:"file"==Aa(h).protocol?404:0);M(k,c,b,F.getAllResponseHeaders(),a)};e=function(){M(k,-1,null,null,"")};F.onerror=e;F.onabort=e;q&&(F.withCredentials=!0);if(u)try{F.responseType=
u}catch(Z){if("json"!==u)throw Z;}F.send(l||null)}if(0<p)var L=c(s,p);else p&&G(p.then)&&p.then(s)}}function Ie(){var b="{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse","$exceptionHandler","$sce",function(c,d,e){function f(a){return"\\\\\\"+a}function g(f,g,u,s){function M(c){return c.replace(k,b).replace(n,a)}function v(a){try{var b=a;a=u?e.getTrusted(u,b):e.valueOf(b);var c;if(s&&!y(a))c=a;else if(null==a)c="";
else{switch(typeof a){case "string":break;case "number":a=""+a;break;default:a=$a(a)}c=a}return c}catch(g){c=ac("interr",f,g.toString()),d(c)}}s=!!s;for(var m,F,r=0,L=[],B=[],I=f.length,D=[],S=[];r<I;)if(-1!=(m=f.indexOf(b,r))&&-1!=(F=f.indexOf(a,m+h)))r!==m&&D.push(M(f.substring(r,m))),r=f.substring(m+h,F),L.push(r),B.push(c(r,v)),r=F+l,S.push(D.length),D.push("");else{r!==I&&D.push(M(f.substring(r)));break}if(u&&1<D.length)throw ac("noconcat",f);if(!g||L.length){var P=function(a){for(var b=0,c=
L.length;b<c;b++){if(s&&x(a[b]))return;D[S[b]]=a[b]}return D.join("")};return w(function(a){var b=0,c=L.length,e=Array(c);try{for(;b<c;b++)e[b]=B[b](a);return P(e)}catch(g){a=ac("interr",f,g.toString()),d(a)}},{exp:f,expressions:L,$$watchDelegate:function(a,b,c){var d;return a.$watchGroup(B,function(c,e){var f=P(c);G(b)&&b.call(this,f,c!==e?d:f,a);d=f},c)}})}}var h=b.length,l=a.length,k=new RegExp(b.replace(/./g,f),"g"),n=new RegExp(a.replace(/./g,f),"g");g.startSymbol=function(){return b};g.endSymbol=
function(){return a};return g}]}function Je(){this.$get=["$rootScope","$window","$q","$$q",function(b,a,c,d){function e(e,h,l,k){var n=a.setInterval,p=a.clearInterval,q=0,u=y(k)&&!k,s=(u?d:c).defer(),M=s.promise;l=y(l)?l:0;M.then(null,null,e);M.$$intervalId=n(function(){s.notify(q++);0<l&&q>=l&&(s.resolve(q),p(M.$$intervalId),delete f[M.$$intervalId]);u||b.$apply()},h);f[M.$$intervalId]=s;return M}var f={};e.cancel=function(b){return b&&b.$$intervalId in f?(f[b.$$intervalId].reject("canceled"),a.clearInterval(b.$$intervalId),
delete f[b.$$intervalId],!0):!1};return e}]}function Rd(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"\u00a4",posSuf:"",negPre:"(\u00a4",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January February March April May June July August September October November December".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a",ERANAMES:["Before Christ","Anno Domini"],ERAS:["BC","AD"]},pluralCat:function(b){return 1===b?"one":"other"}}}}function bc(b){b=b.split("/");for(var a=b.length;a--;)b[a]=qb(b[a]);
return b.join("/")}function ad(b,a){var c=Aa(b);a.$$protocol=c.protocol;a.$$host=c.hostname;a.$$port=aa(c.port)||xf[c.protocol]||null}function bd(b,a){var c="/"!==b.charAt(0);c&&(b="/"+b);var d=Aa(b);a.$$path=decodeURIComponent(c&&"/"===d.pathname.charAt(0)?d.pathname.substring(1):d.pathname);a.$$search=sc(d.search);a.$$hash=decodeURIComponent(d.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function ya(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function Ga(b){var a=b.indexOf("#");
return-1==a?b:b.substr(0,a)}function Fb(b){return b.replace(/(#.+)|#$/,"$1")}function cc(b){return b.substr(0,Ga(b).lastIndexOf("/")+1)}function dc(b,a){this.$$html5=!0;a=a||"";var c=cc(b);ad(b,this);this.$$parse=function(a){var b=ya(c,a);if(!C(b))throw Gb("ipthprfx",a,c);bd(b,this);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=Pb(this.$$search),b=this.$$hash?"#"+qb(this.$$hash):"";this.$$url=bc(this.$$path)+(a?"?"+a:"")+b;this.$$absUrl=c+this.$$url.substr(1)};this.$$parseLinkUrl=
function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;(f=ya(b,d))!==t?(g=f,g=(f=ya(a,f))!==t?c+(ya("/",f)||f):b+g):(f=ya(c,d))!==t?g=c+f:c==d+"/"&&(g=c);g&&this.$$parse(g);return!!g}}function ec(b,a){var c=cc(b);ad(b,this);this.$$parse=function(d){d=ya(b,d)||ya(c,d);var e;"#"===d.charAt(0)?(e=ya(a,d),x(e)&&(e=d)):e=this.$$html5?d:"";bd(e,this);d=this.$$path;var f=/^\/[A-Z]:(\/.*)/;0===e.indexOf(b)&&(e=e.replace(b,""));f.exec(e)||(d=(e=f.exec(d))?e[1]:d);this.$$path=d;this.$$compose()};
this.$$compose=function(){var c=Pb(this.$$search),e=this.$$hash?"#"+qb(this.$$hash):"";this.$$url=bc(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+(this.$$url?a+this.$$url:"")};this.$$parseLinkUrl=function(a,c){return Ga(b)==Ga(a)?(this.$$parse(a),!0):!1}}function cd(b,a){this.$$html5=!0;ec.apply(this,arguments);var c=cc(b);this.$$parseLinkUrl=function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;b==Ga(d)?f=d:(g=ya(c,d))?f=b+a+g:c===d+"/"&&(f=c);f&&this.$$parse(f);return!!f};this.$$compose=
function(){var c=Pb(this.$$search),e=this.$$hash?"#"+qb(this.$$hash):"";this.$$url=bc(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+a+this.$$url}}function Hb(b){return function(){return this[b]}}function dd(b,a){return function(c){if(x(c))return this[b];this[b]=a(c);this.$$compose();return this}}function Me(){var b="",a={enabled:!1,requireBase:!0,rewriteLinks:!0};this.hashPrefix=function(a){return y(a)?(b=a,this):b};this.html5Mode=function(b){return Wa(b)?(a.enabled=b,this):J(b)?(Wa(b.enabled)&&(a.enabled=
b.enabled),Wa(b.requireBase)&&(a.requireBase=b.requireBase),Wa(b.rewriteLinks)&&(a.rewriteLinks=b.rewriteLinks),this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement","$window",function(c,d,e,f,g){function h(a,b,c){var e=k.url(),f=k.$$state;try{d.url(a,b,c),k.$$state=d.state()}catch(g){throw k.url(e),k.$$state=f,g;}}function l(a,b){c.$broadcast("$locationChangeSuccess",k.absUrl(),a,k.$$state,b)}var k,n;n=d.baseHref();var p=d.url(),q;if(a.enabled){if(!n&&a.requireBase)throw Gb("nobase");
q=p.substring(0,p.indexOf("/",p.indexOf("//")+2))+(n||"/");n=e.history?dc:cd}else q=Ga(p),n=ec;k=new n(q,"#"+b);k.$$parseLinkUrl(p,p);k.$$state=d.state();var u=/^\s*(javascript|mailto):/i;f.on("click",function(b){if(a.rewriteLinks&&!b.ctrlKey&&!b.metaKey&&!b.shiftKey&&2!=b.which&&2!=b.button){for(var e=A(b.target);"a"!==va(e[0]);)if(e[0]===f[0]||!(e=e.parent())[0])return;var h=e.prop("href"),l=e.attr("href")||e.attr("xlink:href");J(h)&&"[object SVGAnimatedString]"===h.toString()&&(h=Aa(h.animVal).href);
u.test(h)||!h||e.attr("target")||b.isDefaultPrevented()||!k.$$parseLinkUrl(h,l)||(b.preventDefault(),k.absUrl()!=d.url()&&(c.$apply(),g.angular["ff-684208-preventDefault"]=!0))}});Fb(k.absUrl())!=Fb(p)&&d.url(k.absUrl(),!0);var s=!0;d.onUrlChange(function(a,b){c.$evalAsync(function(){var d=k.absUrl(),e=k.$$state,f;k.$$parse(a);k.$$state=b;f=c.$broadcast("$locationChangeStart",a,d,b,e).defaultPrevented;k.absUrl()===a&&(f?(k.$$parse(d),k.$$state=e,h(d,!1,e)):(s=!1,l(d,e)))});c.$$phase||c.$digest()});
c.$watch(function(){var a=Fb(d.url()),b=Fb(k.absUrl()),f=d.state(),g=k.$$replace,q=a!==b||k.$$html5&&e.history&&f!==k.$$state;if(s||q)s=!1,c.$evalAsync(function(){var b=k.absUrl(),d=c.$broadcast("$locationChangeStart",b,a,k.$$state,f).defaultPrevented;k.absUrl()===b&&(d?(k.$$parse(a),k.$$state=f):(q&&h(b,g,f===k.$$state?null:k.$$state),l(a,f)))});k.$$replace=!1});return k}]}function Ne(){var b=!0,a=this;this.debugEnabled=function(a){return y(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof
Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||{},e=b[a]||b.log||E;a=!1;try{a=!!e.apply}catch(l){}return a?function(){var a=[];r(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,
arguments)}}()}}]}function ua(b,a){if("__defineGetter__"===b||"__defineSetter__"===b||"__lookupGetter__"===b||"__lookupSetter__"===b||"__proto__"===b)throw na("isecfld",a);return b}function oa(b,a){if(b){if(b.constructor===b)throw na("isecfn",a);if(b.window===b)throw na("isecwindow",a);if(b.children&&(b.nodeName||b.prop&&b.attr&&b.find))throw na("isecdom",a);if(b===Object)throw na("isecobj",a);}return b}function fc(b){return b.constant}function hb(b,a,c,d,e){oa(b,e);oa(a,e);c=c.split(".");for(var f,
g=0;1<c.length;g++){f=ua(c.shift(),e);var h=0===g&&a&&a[f]||b[f];h||(h={},b[f]=h);b=oa(h,e)}f=ua(c.shift(),e);oa(b[f],e);return b[f]=d}function Pa(b){return"constructor"==b}function ed(b,a,c,d,e,f,g){ua(b,f);ua(a,f);ua(c,f);ua(d,f);ua(e,f);var h=function(a){return oa(a,f)},l=g||Pa(b)?h:ra,k=g||Pa(a)?h:ra,n=g||Pa(c)?h:ra,p=g||Pa(d)?h:ra,q=g||Pa(e)?h:ra;return function(f,g){var h=g&&g.hasOwnProperty(b)?g:f;if(null==h)return h;h=l(h[b]);if(!a)return h;if(null==h)return t;h=k(h[a]);if(!c)return h;if(null==
h)return t;h=n(h[c]);if(!d)return h;if(null==h)return t;h=p(h[d]);return e?null==h?t:h=q(h[e]):h}}function yf(b,a){return function(c,d){return b(c,d,oa,a)}}function zf(b,a,c){var d=a.expensiveChecks,e=d?Af:Bf,f=e[b];if(f)return f;var g=b.split("."),h=g.length;if(a.csp)f=6>h?ed(g[0],g[1],g[2],g[3],g[4],c,d):function(a,b){var e=0,f;do f=ed(g[e++],g[e++],g[e++],g[e++],g[e++],c,d)(a,b),b=t,a=f;while(e<h);return f};else{var l="";d&&(l+="s = eso(s, fe);\nl = eso(l, fe);\n");var k=d;r(g,function(a,b){ua(a,
c);var e=(b?"s":'((l&&l.hasOwnProperty("'+a+'"))?l:s)')+"."+a;if(d||Pa(a))e="eso("+e+", fe)",k=!0;l+="if(s == null) return undefined;\ns="+e+";\n"});l+="return s;";a=new Function("s","l","eso","fe",l);a.toString=ea(l);k&&(a=yf(a,c));f=a}f.sharedGetter=!0;f.assign=function(a,c,d){return hb(a,d,b,c,b)};return e[b]=f}function gc(b){return G(b.valueOf)?b.valueOf():Cf.call(b)}function Oe(){var b=ia(),a=ia();this.$get=["$filter","$sniffer",function(c,d){function e(a){var b=a;a.sharedGetter&&(b=function(b,
c){return a(b,c)},b.literal=a.literal,b.constant=a.constant,b.assign=a.assign);return b}function f(a,b){for(var c=0,d=a.length;c<d;c++){var e=a[c];e.constant||(e.inputs?f(e.inputs,b):-1===b.indexOf(e)&&b.push(e))}return b}function g(a,b){return null==a||null==b?a===b:"object"===typeof a&&(a=gc(a),"object"===typeof a)?!1:a===b||a!==a&&b!==b}function h(a,b,c,d){var e=d.$$inputs||(d.$$inputs=f(d.inputs,[])),h;if(1===e.length){var k=g,e=e[0];return a.$watch(function(a){var b=e(a);g(b,k)||(h=d(a),k=b&&
gc(b));return h},b,c)}for(var l=[],q=0,p=e.length;q<p;q++)l[q]=g;return a.$watch(function(a){for(var b=!1,c=0,f=e.length;c<f;c++){var k=e[c](a);if(b||(b=!g(k,l[c])))l[c]=k&&gc(k)}b&&(h=d(a));return h},b,c)}function l(a,b,c,d){var e,f;return e=a.$watch(function(a){return d(a)},function(a,c,d){f=a;G(b)&&b.apply(this,arguments);y(a)&&d.$$postDigest(function(){y(f)&&e()})},c)}function k(a,b,c,d){function e(a){var b=!0;r(a,function(a){y(a)||(b=!1)});return b}var f,g;return f=a.$watch(function(a){return d(a)},
function(a,c,d){g=a;G(b)&&b.call(this,a,c,d);e(a)&&d.$$postDigest(function(){e(g)&&f()})},c)}function n(a,b,c,d){var e;return e=a.$watch(function(a){return d(a)},function(a,c,d){G(b)&&b.apply(this,arguments);e()},c)}function p(a,b){if(!b)return a;var c=a.$$watchDelegate,c=c!==k&&c!==l?function(c,d){var e=a(c,d);return b(e,c,d)}:function(c,d){var e=a(c,d),f=b(e,c,d);return y(e)?f:e};a.$$watchDelegate&&a.$$watchDelegate!==h?c.$$watchDelegate=a.$$watchDelegate:b.$stateful||(c.$$watchDelegate=h,c.inputs=
[a]);return c}var q={csp:d.csp,expensiveChecks:!1},u={csp:d.csp,expensiveChecks:!0};return function(d,f,g){var m,r,t;switch(typeof d){case "string":t=d=d.trim();var L=g?a:b;m=L[t];m||(":"===d.charAt(0)&&":"===d.charAt(1)&&(r=!0,d=d.substring(2)),g=g?u:q,m=new hc(g),m=(new ib(m,c,g)).parse(d),m.constant?m.$$watchDelegate=n:r?(m=e(m),m.$$watchDelegate=m.literal?k:l):m.inputs&&(m.$$watchDelegate=h),L[t]=m);return p(m,f);case "function":return p(d,f);default:return p(E,f)}}}]}function Qe(){this.$get=
["$rootScope","$exceptionHandler",function(b,a){return fd(function(a){b.$evalAsync(a)},a)}]}function Re(){this.$get=["$browser","$exceptionHandler",function(b,a){return fd(function(a){b.defer(a)},a)}]}function fd(b,a){function c(a,b,c){function d(b){return function(c){e||(e=!0,b.call(a,c))}}var e=!1;return[d(b),d(c)]}function d(){this.$$state={status:0}}function e(a,b){return function(c){b.call(a,c)}}function f(c){!c.processScheduled&&c.pending&&(c.processScheduled=!0,b(function(){var b,d,e;e=c.pending;
c.processScheduled=!1;c.pending=t;for(var f=0,g=e.length;f<g;++f){d=e[f][0];b=e[f][c.status];try{G(b)?d.resolve(b(c.value)):1===c.status?d.resolve(c.value):d.reject(c.value)}catch(h){d.reject(h),a(h)}}}))}function g(){this.promise=new d;this.resolve=e(this,this.resolve);this.reject=e(this,this.reject);this.notify=e(this,this.notify)}var h=R("$q",TypeError);d.prototype={then:function(a,b,c){var d=new g;this.$$state.pending=this.$$state.pending||[];this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&
f(this.$$state);return d.promise},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return k(b,!0,a)},function(b){return k(b,!1,a)},b)}};g.prototype={resolve:function(a){this.promise.$$state.status||(a===this.promise?this.$$reject(h("qcycle",a)):this.$$resolve(a))},$$resolve:function(b){var d,e;e=c(this,this.$$resolve,this.$$reject);try{if(J(b)||G(b))d=b&&b.then;G(d)?(this.promise.$$state.status=-1,d.call(b,e[0],e[1],this.notify)):(this.promise.$$state.value=
b,this.promise.$$state.status=1,f(this.promise.$$state))}catch(g){e[1](g),a(g)}},reject:function(a){this.promise.$$state.status||this.$$reject(a)},$$reject:function(a){this.promise.$$state.value=a;this.promise.$$state.status=2;f(this.promise.$$state)},notify:function(c){var d=this.promise.$$state.pending;0>=this.promise.$$state.status&&d&&d.length&&b(function(){for(var b,e,f=0,g=d.length;f<g;f++){e=d[f][0];b=d[f][3];try{e.notify(G(b)?b(c):c)}catch(h){a(h)}}})}};var l=function(a,b){var c=new g;b?c.resolve(a):
c.reject(a);return c.promise},k=function(a,b,c){var d=null;try{G(c)&&(d=c())}catch(e){return l(e,!1)}return d&&G(d.then)?d.then(function(){return l(a,b)},function(a){return l(a,!1)}):l(a,b)},n=function(a,b,c,d){var e=new g;e.resolve(a);return e.promise.then(b,c,d)},p=function u(a){if(!G(a))throw h("norslvr",a);if(!(this instanceof u))return new u(a);var b=new g;a(function(a){b.resolve(a)},function(a){b.reject(a)});return b.promise};p.defer=function(){return new g};p.reject=function(a){var b=new g;
b.reject(a);return b.promise};p.when=n;p.all=function(a){var b=new g,c=0,d=H(a)?[]:{};r(a,function(a,e){c++;n(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise};return p}function $e(){this.$get=["$window","$timeout",function(b,a){var c=b.requestAnimationFrame||b.webkitRequestAnimationFrame,d=b.cancelAnimationFrame||b.webkitCancelAnimationFrame||b.webkitCancelRequestAnimationFrame,e=!!c,f=e?function(a){var b=
c(a);return function(){d(b)}}:function(b){var c=a(b,16.66,!1);return function(){a.cancel(c)}};f.supported=e;return f}]}function Pe(){function b(a){function b(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$id=++ob;this.$$ChildScope=null}b.prototype=a;return b}var a=10,c=R("$rootScope"),d=null,e=null;this.digestTtl=function(b){arguments.length&&(a=b);return a};this.$get=["$injector","$exceptionHandler",
"$parse","$browser",function(f,g,h,l){function k(a){a.currentScope.$$destroyed=!0}function n(){this.$id=++ob;this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this.$root=this;this.$$destroyed=!1;this.$$listeners={};this.$$listenerCount={};this.$$isolateBindings=null}function p(a){if(v.$$phase)throw c("inprog",v.$$phase);v.$$phase=a}function q(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];
while(a=a.$parent)}function u(){}function s(){for(;t.length;)try{t.shift()()}catch(a){g(a)}e=null}function M(){null===e&&(e=l.defer(function(){v.$apply(s)}))}n.prototype={constructor:n,$new:function(a,c){var d;c=c||this;a?(d=new n,d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=b(this)),d=new this.$$ChildScope);d.$parent=c;d.$$prevSibling=c.$$childTail;c.$$childHead?(c.$$childTail.$$nextSibling=d,c.$$childTail=d):c.$$childHead=c.$$childTail=d;(a||c!=this)&&d.$on("$destroy",k);return d},
$watch:function(a,b,c){var e=h(a);if(e.$$watchDelegate)return e.$$watchDelegate(this,b,c,e);var f=this.$$watchers,g={fn:b,last:u,get:e,exp:a,eq:!!c};d=null;G(b)||(g.fn=E);f||(f=this.$$watchers=[]);f.unshift(g);return function(){Xa(f,g);d=null}},$watchGroup:function(a,b){function c(){h=!1;k?(k=!1,b(e,e,g)):b(e,d,g)}var d=Array(a.length),e=Array(a.length),f=[],g=this,h=!1,k=!0;if(!a.length){var l=!0;g.$evalAsync(function(){l&&b(e,e,g)});return function(){l=!1}}if(1===a.length)return this.$watch(a[0],
function(a,c,f){e[0]=a;d[0]=c;b(e,a===c?e:d,f)});r(a,function(a,b){var k=g.$watch(a,function(a,f){e[b]=a;d[b]=f;h||(h=!0,g.$evalAsync(c))});f.push(k)});return function(){for(;f.length;)f.shift()()}},$watchCollection:function(a,b){function c(a){e=a;var b,d,g,h;if(!x(e)){if(J(e))if(Sa(e))for(f!==p&&(f=p,u=f.length=0,l++),a=e.length,u!==a&&(l++,f.length=u=a),b=0;b<a;b++)h=f[b],g=e[b],d=h!==h&&g!==g,d||h===g||(l++,f[b]=g);else{f!==n&&(f=n={},u=0,l++);a=0;for(b in e)e.hasOwnProperty(b)&&(a++,g=e[b],h=
f[b],b in f?(d=h!==h&&g!==g,d||h===g||(l++,f[b]=g)):(u++,f[b]=g,l++));if(u>a)for(b in l++,f)e.hasOwnProperty(b)||(u--,delete f[b])}else f!==e&&(f=e,l++);return l}}c.$stateful=!0;var d=this,e,f,g,k=1<b.length,l=0,q=h(a,c),p=[],n={},m=!0,u=0;return this.$watch(q,function(){m?(m=!1,b(e,e,d)):b(e,g,d);if(k)if(J(e))if(Sa(e)){g=Array(e.length);for(var a=0;a<e.length;a++)g[a]=e[a]}else for(a in g={},e)tc.call(e,a)&&(g[a]=e[a]);else g=e})},$digest:function(){var b,f,h,k,q,n,r=a,t,O=[],M,y;p("$digest");l.$$checkUrlChange();
this===v&&null!==e&&(l.defer.cancel(e),s());d=null;do{n=!1;for(t=this;m.length;){try{y=m.shift(),y.scope.$eval(y.expression,y.locals)}catch(w){g(w)}d=null}a:do{if(k=t.$$watchers)for(q=k.length;q--;)try{if(b=k[q])if((f=b.get(t))!==(h=b.last)&&!(b.eq?ha(f,h):"number"===typeof f&&"number"===typeof h&&isNaN(f)&&isNaN(h)))n=!0,d=b,b.last=b.eq?Da(f,null):f,b.fn(f,h===u?f:h,t),5>r&&(M=4-r,O[M]||(O[M]=[]),O[M].push({msg:G(b.exp)?"fn: "+(b.exp.name||b.exp.toString()):b.exp,newVal:f,oldVal:h}));else if(b===
d){n=!1;break a}}catch(A){g(A)}if(!(k=t.$$childHead||t!==this&&t.$$nextSibling))for(;t!==this&&!(k=t.$$nextSibling);)t=t.$parent}while(t=k);if((n||m.length)&&!r--)throw v.$$phase=null,c("infdig",a,O);}while(n||m.length);for(v.$$phase=null;F.length;)try{F.shift()()}catch(x){g(x)}},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;if(this!==v){for(var b in this.$$listenerCount)q(this,this.$$listenerCount[b],b);a.$$childHead==this&&(a.$$childHead=
this.$$nextSibling);a.$$childTail==this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=E;this.$on=this.$watch=this.$watchGroup=function(){return E};this.$$listeners={};this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=this.$$watchers=null}}},$eval:function(a,
b){return h(a)(this,b)},$evalAsync:function(a,b){v.$$phase||m.length||l.defer(function(){m.length&&v.$digest()});m.push({scope:this,expression:a,locals:b})},$$postDigest:function(a){F.push(a)},$apply:function(a){try{return p("$apply"),this.$eval(a)}catch(b){g(b)}finally{v.$$phase=null;try{v.$digest()}catch(c){throw g(c),c;}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&t.push(b);M()},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||
(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);-1!==d&&(c[d]=null,q(e,1,a))}},$emit:function(a,b){var c=[],d,e=this,f=!1,h={name:a,targetScope:e,stopPropagation:function(){f=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=Ya([h],arguments,1),l,q;do{d=e.$$listeners[a]||c;h.currentScope=e;l=0;for(q=d.length;l<q;l++)if(d[l])try{d[l].apply(null,k)}catch(p){g(p)}else d.splice(l,1),l--,q--;if(f)return h.currentScope=
null,h;e=e.$parent}while(e);h.currentScope=null;return h},$broadcast:function(a,b){var c=this,d=this,e={name:a,targetScope:this,preventDefault:function(){e.defaultPrevented=!0},defaultPrevented:!1};if(!this.$$listenerCount[a])return e;for(var f=Ya([e],arguments,1),h,l;c=d;){e.currentScope=c;d=c.$$listeners[a]||[];h=0;for(l=d.length;h<l;h++)if(d[h])try{d[h].apply(null,f)}catch(k){g(k)}else d.splice(h,1),h--,l--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=
c.$$nextSibling);)c=c.$parent}e.currentScope=null;return e}};var v=new n,m=v.$$asyncQueue=[],F=v.$$postDigestQueue=[],t=v.$$applyAsyncQueue=[];return v}]}function Sd(){var b=/^\s*(https?|ftp|mailto|tel|file):/,a=/^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationWhitelist=function(a){return y(a)?(b=a,this):b};this.imgSrcSanitizationWhitelist=function(b){return y(b)?(a=b,this):a};this.$get=function(){return function(c,d){var e=d?a:b,f;f=Aa(c).href;return""===f||f.match(e)?c:"unsafe:"+
f}}}function Df(b){if("self"===b)return b;if(C(b)){if(-1<b.indexOf("***"))throw Ba("iwcard",b);b=gd(b).replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return new RegExp("^"+b+"$")}if(Ua(b))return new RegExp("^"+b.source+"$");throw Ba("imatcher");}function hd(b){var a=[];y(b)&&r(b,function(b){a.push(Df(b))});return a}function Te(){this.SCE_CONTEXTS=pa;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=hd(a));return b};this.resourceUrlBlacklist=function(b){arguments.length&&
(a=hd(b));return a};this.$get=["$injector",function(c){function d(a,b){return"self"===a?$c(b):!!a.exec(b.href)}function e(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var f=function(a){throw Ba("unsafe");};c.has("$sanitize")&&(f=c.get("$sanitize"));var g=e(),h={};h[pa.HTML]=e(g);h[pa.CSS]=e(g);h[pa.URL]=
e(g);h[pa.JS]=e(g);h[pa.RESOURCE_URL]=e(h[pa.URL]);return{trustAs:function(a,b){var c=h.hasOwnProperty(a)?h[a]:null;if(!c)throw Ba("icontext",a,b);if(null===b||b===t||""===b)return b;if("string"!==typeof b)throw Ba("itype",a);return new c(b)},getTrusted:function(c,e){if(null===e||e===t||""===e)return e;var g=h.hasOwnProperty(c)?h[c]:null;if(g&&e instanceof g)return e.$$unwrapTrustedValue();if(c===pa.RESOURCE_URL){var g=Aa(e.toString()),p,q,u=!1;p=0;for(q=b.length;p<q;p++)if(d(b[p],g)){u=!0;break}if(u)for(p=
0,q=a.length;p<q;p++)if(d(a[p],g)){u=!1;break}if(u)return e;throw Ba("insecurl",e.toString());}if(c===pa.HTML)return f(e);throw Ba("unsafe");},valueOf:function(a){return a instanceof g?a.$$unwrapTrustedValue():a}}}]}function Se(){var b=!0;this.enabled=function(a){arguments.length&&(b=!!a);return b};this.$get=["$parse","$sceDelegate",function(a,c){if(b&&8>Qa)throw Ba("iequirks");var d=sa(pa);d.isEnabled=function(){return b};d.trustAs=c.trustAs;d.getTrusted=c.getTrusted;d.valueOf=c.valueOf;b||(d.trustAs=
d.getTrusted=function(a,b){return b},d.valueOf=ra);d.parseAs=function(b,c){var e=a(c);return e.literal&&e.constant?e:a(c,function(a){return d.getTrusted(b,a)})};var e=d.parseAs,f=d.getTrusted,g=d.trustAs;r(pa,function(a,b){var c=z(b);d[db("parse_as_"+c)]=function(b){return e(a,b)};d[db("get_trusted_"+c)]=function(b){return f(a,b)};d[db("trust_as_"+c)]=function(b){return g(a,b)}});return d}]}function Ue(){this.$get=["$window","$document",function(b,a){var c={},d=aa((/android (\d+)/.exec(z((b.navigator||
{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||{}).userAgent),f=a[0]||{},g,h=/^(Moz|webkit|ms)(?=[A-Z])/,l=f.body&&f.body.style,k=!1,n=!1;if(l){for(var p in l)if(k=h.exec(p)){g=k[0];g=g.substr(0,1).toUpperCase()+g.substr(1);break}g||(g="WebkitOpacity"in l&&"webkit");k=!!("transition"in l||g+"Transition"in l);n=!!("animation"in l||g+"Animation"in l);!d||k&&n||(k=C(f.body.style.webkitTransition),n=C(f.body.style.webkitAnimation))}return{history:!(!b.history||!b.history.pushState||4>d||e),hasEvent:function(a){if("input"===
a&&11>=Qa)return!1;if(x(c[a])){var b=f.createElement("div");c[a]="on"+a in b}return c[a]},csp:bb(),vendorPrefix:g,transitions:k,animations:n,android:d}}]}function We(){this.$get=["$templateCache","$http","$q",function(b,a,c){function d(e,f){d.totalPendingRequests++;var g=a.defaults&&a.defaults.transformResponse;H(g)?g=g.filter(function(a){return a!==Zb}):g===Zb&&(g=null);return a.get(e,{cache:b,transformResponse:g})["finally"](function(){d.totalPendingRequests--}).then(function(a){return a.data},
function(a){if(!f)throw la("tpload",e);return c.reject(a)})}d.totalPendingRequests=0;return d}]}function Xe(){this.$get=["$rootScope","$browser","$location",function(b,a,c){return{findBindings:function(a,b,c){a=a.getElementsByClassName("ng-binding");var g=[];r(a,function(a){var d=ca.element(a).data("$binding");d&&r(d,function(d){c?(new RegExp("(^|\\s)"+gd(b)+"(\\s|\\||$)")).test(d)&&g.push(a):-1!=d.indexOf(b)&&g.push(a)})});return g},findModels:function(a,b,c){for(var g=["ng-","data-ng-","ng\\:"],
h=0;h<g.length;++h){var l=a.querySelectorAll("["+g[h]+"model"+(c?"=":"*=")+'"'+b+'"]');if(l.length)return l}},getLocation:function(){return c.url()},setLocation:function(a){a!==c.url()&&(c.url(a),b.$digest())},whenStable:function(b){a.notifyWhenNoOutstandingRequests(b)}}}]}function Ye(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",function(b,a,c,d,e){function f(f,l,k){var n=y(k)&&!k,p=(n?d:c).defer(),q=p.promise;l=a.defer(function(){try{p.resolve(f())}catch(a){p.reject(a),e(a)}finally{delete g[q.$$timeoutId]}n||
b.$apply()},l);q.$$timeoutId=l;g[l]=p;return q}var g={};f.cancel=function(b){return b&&b.$$timeoutId in g?(g[b.$$timeoutId].reject("canceled"),delete g[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):!1};return f}]}function Aa(b){Qa&&($.setAttribute("href",b),b=$.href);$.setAttribute("href",b);return{href:$.href,protocol:$.protocol?$.protocol.replace(/:$/,""):"",host:$.host,search:$.search?$.search.replace(/^\?/,""):"",hash:$.hash?$.hash.replace(/^#/,""):"",hostname:$.hostname,port:$.port,pathname:"/"===
$.pathname.charAt(0)?$.pathname:"/"+$.pathname}}function $c(b){b=C(b)?Aa(b):b;return b.protocol===id.protocol&&b.host===id.host}function Ze(){this.$get=ea(Q)}function Fc(b){function a(c,d){if(J(c)){var e={};r(c,function(b,c){e[c]=a(c,b)});return e}return b.factory(c+"Filter",d)}this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+"Filter")}}];a("currency",jd);a("date",kd);a("filter",Ef);a("json",Ff);a("limitTo",Gf);a("lowercase",Hf);a("number",ld);a("orderBy",md);a("uppercase",
If)}function Ef(){return function(b,a,c){if(!H(b))return b;var d;switch(typeof a){case "function":break;case "boolean":case "number":case "string":d=!0;case "object":a=Jf(a,c,d);break;default:return b}return b.filter(a)}}function Jf(b,a,c){var d=J(b)&&"$"in b;!0===a?a=ha:G(a)||(a=function(a,b){if(J(a)||J(b))return!1;a=z(""+a);b=z(""+b);return-1!==a.indexOf(b)});return function(e){return d&&!J(e)?Ha(e,b.$,a,!1):Ha(e,b,a,c)}}function Ha(b,a,c,d,e){var f=null!==b?typeof b:"null",g=null!==a?typeof a:
"null";if("string"===g&&"!"===a.charAt(0))return!Ha(b,a.substring(1),c,d);if(H(b))return b.some(function(b){return Ha(b,a,c,d)});switch(f){case "object":var h;if(d){for(h in b)if("$"!==h.charAt(0)&&Ha(b[h],a,c,!0))return!0;return e?!1:Ha(b,a,c,!1)}if("object"===g){for(h in a)if(e=a[h],!G(e)&&!x(e)&&(f="$"===h,!Ha(f?b:b[h],e,c,f,f)))return!1;return!0}return c(b,a);case "function":return!1;default:return c(b,a)}}function jd(b){var a=b.NUMBER_FORMATS;return function(b,d,e){x(d)&&(d=a.CURRENCY_SYM);x(e)&&
(e=a.PATTERNS[1].maxFrac);return null==b?b:nd(b,a.PATTERNS[1],a.GROUP_SEP,a.DECIMAL_SEP,e).replace(/\u00A4/g,d)}}function ld(b){var a=b.NUMBER_FORMATS;return function(b,d){return null==b?b:nd(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function nd(b,a,c,d,e){if(!isFinite(b)||J(b))return"";var f=0>b;b=Math.abs(b);var g=b+"",h="",l=[],k=!1;if(-1!==g.indexOf("e")){var n=g.match(/([\d\.]+)e(-?)(\d+)/);n&&"-"==n[2]&&n[3]>e+1?b=0:(h=g,k=!0)}if(k)0<e&&1>b&&(h=b.toFixed(e),b=parseFloat(h));else{g=(g.split(od)[1]||
"").length;x(e)&&(e=Math.min(Math.max(a.minFrac,g),a.maxFrac));b=+(Math.round(+(b.toString()+"e"+e)).toString()+"e"+-e);var g=(""+b).split(od),k=g[0],g=g[1]||"",p=0,q=a.lgSize,u=a.gSize;if(k.length>=q+u)for(p=k.length-q,n=0;n<p;n++)0===(p-n)%u&&0!==n&&(h+=c),h+=k.charAt(n);for(n=p;n<k.length;n++)0===(k.length-n)%q&&0!==n&&(h+=c),h+=k.charAt(n);for(;g.length<e;)g+="0";e&&"0"!==e&&(h+=d+g.substr(0,e))}0===b&&(f=!1);l.push(f?a.negPre:a.posPre,h,f?a.negSuf:a.posSuf);return l.join("")}function Ib(b,a,
c){var d="";0>b&&(d="-",b=-b);for(b=""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-a));return d+b}function U(b,a,c,d){c=c||0;return function(e){e=e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return Ib(e,a,d)}}function Jb(b,a){return function(c,d){var e=c["get"+b](),f=ub(a?"SHORT"+b:b);return d[f][e]}}function pd(b){var a=(new Date(b,0,1)).getDay();return new Date(b,0,(4>=a?5:12)-a)}function qd(b){return function(a){var c=pd(a.getFullYear());a=+new Date(a.getFullYear(),a.getMonth(),a.getDate()+
(4-a.getDay()))-+c;a=1+Math.round(a/6048E5);return Ib(a,b)}}function ic(b,a){return 0>=b.getFullYear()?a.ERAS[0]:a.ERAS[1]}function kd(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var f=0,g=0,h=b[8]?a.setUTCFullYear:a.setFullYear,l=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=aa(b[9]+b[10]),g=aa(b[9]+b[11]));h.call(a,aa(b[1]),aa(b[2])-1,aa(b[3]));f=aa(b[4]||0)-f;g=aa(b[5]||0)-g;h=aa(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));l.call(a,f,g,h,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
return function(c,e,f){var g="",h=[],l,k;e=e||"mediumDate";e=b.DATETIME_FORMATS[e]||e;C(c)&&(c=Kf.test(c)?aa(c):a(c));Y(c)&&(c=new Date(c));if(!ga(c))return c;for(;e;)(k=Lf.exec(e))?(h=Ya(h,k,1),e=h.pop()):(h.push(e),e=null);f&&"UTC"===f&&(c=new Date(c.getTime()),c.setMinutes(c.getMinutes()+c.getTimezoneOffset()));r(h,function(a){l=Mf[a];g+=l?l(c,b.DATETIME_FORMATS):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function Ff(){return function(b,a){x(a)&&(a=2);return $a(b,a)}}function Gf(){return function(b,
a){Y(b)&&(b=b.toString());return H(b)||C(b)?(a=Infinity===Math.abs(Number(a))?Number(a):aa(a))?0<a?b.slice(0,a):b.slice(a):C(b)?"":[]:b}}function md(b){return function(a,c,d){function e(a,b){return b?function(b,c){return a(c,b)}:a}function f(a){switch(typeof a){case "number":case "boolean":case "string":return!0;default:return!1}}function g(a){return null===a?"null":"function"===typeof a.valueOf&&(a=a.valueOf(),f(a))||"function"===typeof a.toString&&(a=a.toString(),f(a))?a:""}function h(a,b){var c=
typeof a,d=typeof b;c===d&&"object"===c&&(a=g(a),b=g(b));return c===d?("string"===c&&(a=a.toLowerCase(),b=b.toLowerCase()),a===b?0:a<b?-1:1):c<d?-1:1}if(!Sa(a))return a;c=H(c)?c:[c];0===c.length&&(c=["+"]);c=c.map(function(a){var c=!1,d=a||ra;if(C(a)){if("+"==a.charAt(0)||"-"==a.charAt(0))c="-"==a.charAt(0),a=a.substring(1);if(""===a)return e(h,c);d=b(a);if(d.constant){var f=d();return e(function(a,b){return h(a[f],b[f])},c)}}return e(function(a,b){return h(d(a),d(b))},c)});return Za.call(a).sort(e(function(a,
b){for(var d=0;d<c.length;d++){var e=c[d](a,b);if(0!==e)return e}return 0},d))}}function Ia(b){G(b)&&(b={link:b});b.restrict=b.restrict||"AC";return ea(b)}function rd(b,a,c,d,e){var f=this,g=[],h=f.$$parentForm=b.parent().controller("form")||Kb;f.$error={};f.$$success={};f.$pending=t;f.$name=e(a.name||a.ngForm||"")(c);f.$dirty=!1;f.$pristine=!0;f.$valid=!0;f.$invalid=!1;f.$submitted=!1;h.$addControl(f);f.$rollbackViewValue=function(){r(g,function(a){a.$rollbackViewValue()})};f.$commitViewValue=function(){r(g,
function(a){a.$commitViewValue()})};f.$addControl=function(a){La(a.$name,"input");g.push(a);a.$name&&(f[a.$name]=a)};f.$$renameControl=function(a,b){var c=a.$name;f[c]===a&&delete f[c];f[b]=a;a.$name=b};f.$removeControl=function(a){a.$name&&f[a.$name]===a&&delete f[a.$name];r(f.$pending,function(b,c){f.$setValidity(c,null,a)});r(f.$error,function(b,c){f.$setValidity(c,null,a)});r(f.$$success,function(b,c){f.$setValidity(c,null,a)});Xa(g,a)};sd({ctrl:this,$element:b,set:function(a,b,c){var d=a[b];
d?-1===d.indexOf(c)&&d.push(c):a[b]=[c]},unset:function(a,b,c){var d=a[b];d&&(Xa(d,c),0===d.length&&delete a[b])},parentForm:h,$animate:d});f.$setDirty=function(){d.removeClass(b,Ra);d.addClass(b,Lb);f.$dirty=!0;f.$pristine=!1;h.$setDirty()};f.$setPristine=function(){d.setClass(b,Ra,Lb+" ng-submitted");f.$dirty=!1;f.$pristine=!0;f.$submitted=!1;r(g,function(a){a.$setPristine()})};f.$setUntouched=function(){r(g,function(a){a.$setUntouched()})};f.$setSubmitted=function(){d.addClass(b,"ng-submitted");
f.$submitted=!0;h.$setSubmitted()}}function jc(b){b.$formatters.push(function(a){return b.$isEmpty(a)?a:a.toString()})}function jb(b,a,c,d,e,f){var g=z(a[0].type);if(!e.android){var h=!1;a.on("compositionstart",function(a){h=!0});a.on("compositionend",function(){h=!1;l()})}var l=function(b){k&&(f.defer.cancel(k),k=null);if(!h){var e=a.val();b=b&&b.type;"password"===g||c.ngTrim&&"false"===c.ngTrim||(e=N(e));(d.$viewValue!==e||""===e&&d.$$hasNativeValidators)&&d.$setViewValue(e,b)}};if(e.hasEvent("input"))a.on("input",
l);else{var k,n=function(a,b,c){k||(k=f.defer(function(){k=null;b&&b.value===c||l(a)}))};a.on("keydown",function(a){var b=a.keyCode;91===b||15<b&&19>b||37<=b&&40>=b||n(a,this,this.value)});if(e.hasEvent("paste"))a.on("paste cut",n)}a.on("change",l);d.$render=function(){a.val(d.$isEmpty(d.$viewValue)?"":d.$viewValue)}}function Mb(b,a){return function(c,d){var e,f;if(ga(c))return c;if(C(c)){'"'==c.charAt(0)&&'"'==c.charAt(c.length-1)&&(c=c.substring(1,c.length-1));if(Nf.test(c))return new Date(c);b.lastIndex=
0;if(e=b.exec(c))return e.shift(),f=d?{yyyy:d.getFullYear(),MM:d.getMonth()+1,dd:d.getDate(),HH:d.getHours(),mm:d.getMinutes(),ss:d.getSeconds(),sss:d.getMilliseconds()/1E3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,ss:0,sss:0},r(e,function(b,c){c<a.length&&(f[a[c]]=+b)}),new Date(f.yyyy,f.MM-1,f.dd,f.HH,f.mm,f.ss||0,1E3*f.sss||0)}return NaN}}function kb(b,a,c,d){return function(e,f,g,h,l,k,n){function p(a){return a&&!(a.getTime&&a.getTime()!==a.getTime())}function q(a){return y(a)?ga(a)?a:c(a):t}td(e,f,g,h);
jb(e,f,g,h,l,k);var u=h&&h.$options&&h.$options.timezone,s;h.$$parserName=b;h.$parsers.push(function(b){return h.$isEmpty(b)?null:a.test(b)?(b=c(b,s),"UTC"===u&&b.setMinutes(b.getMinutes()-b.getTimezoneOffset()),b):t});h.$formatters.push(function(a){if(a&&!ga(a))throw Nb("datefmt",a);if(p(a)){if((s=a)&&"UTC"===u){var b=6E4*s.getTimezoneOffset();s=new Date(s.getTime()+b)}return n("date")(a,d,u)}s=null;return""});if(y(g.min)||g.ngMin){var r;h.$validators.min=function(a){return!p(a)||x(r)||c(a)>=r};
g.$observe("min",function(a){r=q(a);h.$validate()})}if(y(g.max)||g.ngMax){var v;h.$validators.max=function(a){return!p(a)||x(v)||c(a)<=v};g.$observe("max",function(a){v=q(a);h.$validate()})}}}function td(b,a,c,d){(d.$$hasNativeValidators=J(a[0].validity))&&d.$parsers.push(function(b){var c=a.prop("validity")||{};return c.badInput&&!c.typeMismatch?t:b})}function ud(b,a,c,d,e){if(y(d)){b=b(d);if(!b.constant)throw R("ngModel")("constexpr",c,d);return b(a)}return e}function kc(b,a){b="ngClass"+b;return["$animate",
function(c){function d(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],n=0;n<b.length;n++)if(e==b[n])continue a;c.push(e)}return c}function e(a){if(!H(a)){if(C(a))return a.split(" ");if(J(a)){var b=[];r(a,function(a,c){a&&(b=b.concat(c.split(" ")))});return b}}return a}return{restrict:"AC",link:function(f,g,h){function l(a,b){var c=g.data("$classCounts")||{},d=[];r(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});g.data("$classCounts",c);return d.join(" ")}function k(b){if(!0===
a||f.$index%2===a){var k=e(b||[]);if(!n){var u=l(k,1);h.$addClass(u)}else if(!ha(b,n)){var s=e(n),u=d(k,s),k=d(s,k),u=l(u,1),k=l(k,-1);u&&u.length&&c.addClass(g,u);k&&k.length&&c.removeClass(g,k)}}n=sa(b)}var n;f.$watch(h[b],k,!0);h.$observe("class",function(a){k(f.$eval(h[b]))});"ngClass"!==b&&f.$watch("$index",function(c,d){var g=c&1;if(g!==(d&1)){var k=e(f.$eval(h[b]));g===a?(g=l(k,1),h.$addClass(g)):(g=l(k,-1),h.$removeClass(g))}})}}}]}function sd(b){function a(a,b){b&&!f[a]?(k.addClass(e,a),
f[a]=!0):!b&&f[a]&&(k.removeClass(e,a),f[a]=!1)}function c(b,c){b=b?"-"+vc(b,"-"):"";a(lb+b,!0===c);a(vd+b,!1===c)}var d=b.ctrl,e=b.$element,f={},g=b.set,h=b.unset,l=b.parentForm,k=b.$animate;f[vd]=!(f[lb]=e.hasClass(lb));d.$setValidity=function(b,e,f){e===t?(d.$pending||(d.$pending={}),g(d.$pending,b,f)):(d.$pending&&h(d.$pending,b,f),wd(d.$pending)&&(d.$pending=t));Wa(e)?e?(h(d.$error,b,f),g(d.$$success,b,f)):(g(d.$error,b,f),h(d.$$success,b,f)):(h(d.$error,b,f),h(d.$$success,b,f));d.$pending?(a(xd,
!0),d.$valid=d.$invalid=t,c("",null)):(a(xd,!1),d.$valid=wd(d.$error),d.$invalid=!d.$valid,c("",d.$valid));e=d.$pending&&d.$pending[b]?t:d.$error[b]?!1:d.$$success[b]?!0:null;c(b,e);l.$setValidity(b,e,d)}}function wd(b){if(b)for(var a in b)return!1;return!0}var Of=/^\/(.+)\/([a-z]*)$/,z=function(b){return C(b)?b.toLowerCase():b},tc=Object.prototype.hasOwnProperty,ub=function(b){return C(b)?b.toUpperCase():b},Qa,A,ta,Za=[].slice,qf=[].splice,Pf=[].push,Ca=Object.prototype.toString,Ja=R("ng"),ca=Q.angular||
(Q.angular={}),cb,ob=0;Qa=W.documentMode;E.$inject=[];ra.$inject=[];var H=Array.isArray,N=function(b){return C(b)?b.trim():b},gd=function(b){return b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")},bb=function(){if(y(bb.isActive_))return bb.isActive_;var b=!(!W.querySelector("[ng-csp]")&&!W.querySelector("[data-ng-csp]"));if(!b)try{new Function("")}catch(a){b=!0}return bb.isActive_=b},rb=["ng-","data-ng-","ng:","x-ng-"],Md=/[A-Z]/g,wc=!1,Qb,qa=1,pb=3,Qd={full:"1.3.15",major:1,
minor:3,dot:15,codeName:"locality-filtration"};T.expando="ng339";var zb=T.cache={},hf=1;T._data=function(b){return this.cache[b[this.expando]]||{}};var cf=/([\:\-\_]+(.))/g,df=/^moz([A-Z])/,Qf={mouseleave:"mouseout",mouseenter:"mouseover"},Tb=R("jqLite"),gf=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Sb=/<|&#?\w+;/,ef=/<([\w:]+)/,ff=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ja={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>",
"</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ja.optgroup=ja.option;ja.tbody=ja.tfoot=ja.colgroup=ja.caption=ja.thead;ja.th=ja.td;var Ka=T.prototype={ready:function(b){function a(){c||(c=!0,b())}var c=!1;"complete"===W.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),T(Q).on("load",a))},toString:function(){var b=[];r(this,function(a){b.push(""+a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=
b?A(this[b]):A(this[this.length+b])},length:0,push:Pf,sort:[].sort,splice:[].splice},Eb={};r("multiple selected checked disabled readOnly required open".split(" "),function(b){Eb[z(b)]=b});var Oc={};r("input select option textarea button form details".split(" "),function(b){Oc[b]=!0});var Pc={ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern"};r({data:Vb,removeData:xb},function(b,a){T[a]=b});r({data:Vb,inheritedData:Db,scope:function(b){return A.data(b,"$scope")||
Db(b.parentNode||b,["$isolateScope","$scope"])},isolateScope:function(b){return A.data(b,"$isolateScope")||A.data(b,"$isolateScopeNoTemplate")},controller:Kc,injector:function(b){return Db(b,"$injector")},removeAttr:function(b,a){b.removeAttribute(a)},hasClass:Ab,css:function(b,a,c){a=db(a);if(y(c))b.style[a]=c;else return b.style[a]},attr:function(b,a,c){var d=z(a);if(Eb[d])if(y(c))c?(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));else return b[a]||(b.attributes.getNamedItem(a)||E).specified?
d:t;else if(y(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,2),null===b?t:b},prop:function(b,a,c){if(y(c))b[a]=c;else return b[a]},text:function(){function b(a,b){if(x(b)){var d=a.nodeType;return d===qa||d===pb?a.textContent:""}a.textContent=b}b.$dv="";return b}(),val:function(b,a){if(x(a)){if(b.multiple&&"select"===va(b)){var c=[];r(b.options,function(a){a.selected&&c.push(a.value||a.text)});return 0===c.length?null:c}return b.value}b.value=a},html:function(b,a){if(x(a))return b.innerHTML;
wb(b,!0);b.innerHTML=a},empty:Lc},function(b,a){T.prototype[a]=function(a,d){var e,f,g=this.length;if(b!==Lc&&(2==b.length&&b!==Ab&&b!==Kc?a:d)===t){if(J(a)){for(e=0;e<g;e++)if(b===Vb)b(this[e],a);else for(f in a)b(this[e],f,a[f]);return this}e=b.$dv;g=e===t?Math.min(g,1):g;for(f=0;f<g;f++){var h=b(this[f],a,d);e=e?e+h:h}return e}for(e=0;e<g;e++)b(this[e],a,d);return this}});r({removeData:xb,on:function a(c,d,e,f){if(y(f))throw Tb("onargs");if(Gc(c)){var g=yb(c,!0);f=g.events;var h=g.handle;h||(h=
g.handle=lf(c,f));for(var g=0<=d.indexOf(" ")?d.split(" "):[d],l=g.length;l--;){d=g[l];var k=f[d];k||(f[d]=[],"mouseenter"===d||"mouseleave"===d?a(c,Qf[d],function(a){var c=a.relatedTarget;c&&(c===this||this.contains(c))||h(a,d)}):"$destroy"!==d&&c.addEventListener(d,h,!1),k=f[d]);k.push(e)}}},off:Jc,one:function(a,c,d){a=A(a);a.on(c,function f(){a.off(c,d);a.off(c,f)});a.on(c,d)},replaceWith:function(a,c){var d,e=a.parentNode;wb(a);r(new T(c),function(c){d?e.insertBefore(c,d.nextSibling):e.replaceChild(c,
a);d=c})},children:function(a){var c=[];r(a.childNodes,function(a){a.nodeType===qa&&c.push(a)});return c},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,c){var d=a.nodeType;if(d===qa||11===d){c=new T(c);for(var d=0,e=c.length;d<e;d++)a.appendChild(c[d])}},prepend:function(a,c){if(a.nodeType===qa){var d=a.firstChild;r(new T(c),function(c){a.insertBefore(c,d)})}},wrap:function(a,c){c=A(c).eq(0).clone()[0];var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},
remove:Mc,detach:function(a){Mc(a,!0)},after:function(a,c){var d=a,e=a.parentNode;c=new T(c);for(var f=0,g=c.length;f<g;f++){var h=c[f];e.insertBefore(h,d.nextSibling);d=h}},addClass:Cb,removeClass:Bb,toggleClass:function(a,c,d){c&&r(c.split(" "),function(c){var f=d;x(f)&&(f=!Ab(a,c));(f?Cb:Bb)(a,c)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},find:function(a,c){return a.getElementsByTagName?a.getElementsByTagName(c):[]},clone:Ub,
triggerHandler:function(a,c,d){var e,f,g=c.type||c,h=yb(a);if(h=(h=h&&h.events)&&h[g])e={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},stopPropagation:E,type:g,target:a},c.type&&(e=w(e,c)),c=sa(h),f=d?[e].concat(d):[e],r(c,function(c){e.isImmediatePropagationStopped()||c.apply(a,
f)})}},function(a,c){T.prototype[c]=function(c,e,f){for(var g,h=0,l=this.length;h<l;h++)x(g)?(g=a(this[h],c,e,f),y(g)&&(g=A(g))):Ic(g,a(this[h],c,e,f));return y(g)?g:this};T.prototype.bind=T.prototype.on;T.prototype.unbind=T.prototype.off});eb.prototype={put:function(a,c){this[Ma(a,this.nextUid)]=c},get:function(a){return this[Ma(a,this.nextUid)]},remove:function(a){var c=this[a=Ma(a,this.nextUid)];delete this[a];return c}};var Rc=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,Rf=/,/,Sf=/^\s*(_?)(\S+?)\1\s*$/,
Qc=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Fa=R("$injector");ab.$$annotate=function(a,c,d){var e;if("function"===typeof a){if(!(e=a.$inject)){e=[];if(a.length){if(c)throw C(d)&&d||(d=a.name||mf(a)),Fa("strictdi",d);c=a.toString().replace(Qc,"");c=c.match(Rc);r(c[1].split(Rf),function(a){a.replace(Sf,function(a,c,d){e.push(d)})})}a.$inject=e}}else H(a)?(c=a.length-1,sb(a[c],"fn"),e=a.slice(0,c)):sb(a,"fn",!0);return e};var Tf=R("$animate"),Ce=["$provide",function(a){this.$$selectors={};this.register=function(c,
d){var e=c+"-animation";if(c&&"."!=c.charAt(0))throw Tf("notcsel",c);this.$$selectors[c.substr(1)]=e;a.factory(e,d)};this.classNameFilter=function(a){1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?a:null);return this.$$classNameFilter};this.$get=["$$q","$$asyncCallback","$rootScope",function(a,d,e){function f(d){var f,g=a.defer();g.promise.$$cancelFn=function(){f&&f()};e.$$postDigest(function(){f=d(function(){g.resolve()})});return g.promise}function g(a,c){var d=[],e=[],f=ia();
r((a.attr("class")||"").split(/\s+/),function(a){f[a]=!0});r(c,function(a,c){var g=f[c];!1===a&&g?e.push(c):!0!==a||g||d.push(c)});return 0<d.length+e.length&&[d.length?d:null,e.length?e:null]}function h(a,c,d){for(var e=0,f=c.length;e<f;++e)a[c[e]]=d}function l(){n||(n=a.defer(),d(function(){n.resolve();n=null}));return n.promise}function k(a,c){if(ca.isObject(c)){var d=w(c.from||{},c.to||{});a.css(d)}}var n;return{animate:function(a,c,d){k(a,{from:c,to:d});return l()},enter:function(a,c,d,e){k(a,
e);d?d.after(a):c.prepend(a);return l()},leave:function(a,c){k(a,c);a.remove();return l()},move:function(a,c,d,e){return this.enter(a,c,d,e)},addClass:function(a,c,d){return this.setClass(a,c,[],d)},$$addClassImmediately:function(a,c,d){a=A(a);c=C(c)?c:H(c)?c.join(" "):"";r(a,function(a){Cb(a,c)});k(a,d);return l()},removeClass:function(a,c,d){return this.setClass(a,[],c,d)},$$removeClassImmediately:function(a,c,d){a=A(a);c=C(c)?c:H(c)?c.join(" "):"";r(a,function(a){Bb(a,c)});k(a,d);return l()},setClass:function(a,
c,d,e){var k=this,l=!1;a=A(a);var m=a.data("$$animateClasses");m?e&&m.options&&(m.options=ca.extend(m.options||{},e)):(m={classes:{},options:e},l=!0);e=m.classes;c=H(c)?c:c.split(" ");d=H(d)?d:d.split(" ");h(e,c,!0);h(e,d,!1);l&&(m.promise=f(function(c){var d=a.data("$$animateClasses");a.removeData("$$animateClasses");if(d){var e=g(a,d.classes);e&&k.$$setClassImmediately(a,e[0],e[1],d.options)}c()}),a.data("$$animateClasses",m));return m.promise},$$setClassImmediately:function(a,c,d,e){c&&this.$$addClassImmediately(a,
c);d&&this.$$removeClassImmediately(a,d);k(a,e);return l()},enabled:E,cancel:E}}]}],la=R("$compile");yc.$inject=["$provide","$$sanitizeUriProvider"];var Sc=/^((?:x|data)[\:\-_])/i,rf=R("$controller"),Wc="application/json",$b={"Content-Type":Wc+";charset=utf-8"},tf=/^\[|^\{(?!\{)/,uf={"[":/]$/,"{":/}$/},sf=/^\)\]\}',?\n/,ac=R("$interpolate"),Uf=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,xf={http:80,https:443,ftp:21},Gb=R("$location"),Vf={$$html5:!1,$$replace:!1,absUrl:Hb("$$absUrl"),url:function(a){if(x(a))return this.$$url;
var c=Uf.exec(a);(c[1]||""===a)&&this.path(decodeURIComponent(c[1]));(c[2]||c[1]||""===a)&&this.search(c[3]||"");this.hash(c[5]||"");return this},protocol:Hb("$$protocol"),host:Hb("$$host"),port:Hb("$$port"),path:dd("$$path",function(a){a=null!==a?a.toString():"";return"/"==a.charAt(0)?a:"/"+a}),search:function(a,c){switch(arguments.length){case 0:return this.$$search;case 1:if(C(a)||Y(a))a=a.toString(),this.$$search=sc(a);else if(J(a))a=Da(a,{}),r(a,function(c,e){null==c&&delete a[e]}),this.$$search=
a;else throw Gb("isrcharg");break;default:x(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:dd("$$hash",function(a){return null!==a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};r([cd,ec,dc],function(a){a.prototype=Object.create(Vf);a.prototype.state=function(c){if(!arguments.length)return this.$$state;if(a!==dc||!this.$$html5)throw Gb("nostate");this.$$state=x(c)?null:c;return this}});var na=R("$parse"),Wf=Function.prototype.call,
Xf=Function.prototype.apply,Yf=Function.prototype.bind,mb=ia();r({"null":function(){return null},"true":function(){return!0},"false":function(){return!1},undefined:function(){}},function(a,c){a.constant=a.literal=a.sharedGetter=!0;mb[c]=a});mb["this"]=function(a){return a};mb["this"].sharedGetter=!0;var nb=w(ia(),{"+":function(a,c,d,e){d=d(a,c);e=e(a,c);return y(d)?y(e)?d+e:d:y(e)?e:t},"-":function(a,c,d,e){d=d(a,c);e=e(a,c);return(y(d)?d:0)-(y(e)?e:0)},"*":function(a,c,d,e){return d(a,c)*e(a,c)},
"/":function(a,c,d,e){return d(a,c)/e(a,c)},"%":function(a,c,d,e){return d(a,c)%e(a,c)},"===":function(a,c,d,e){return d(a,c)===e(a,c)},"!==":function(a,c,d,e){return d(a,c)!==e(a,c)},"==":function(a,c,d,e){return d(a,c)==e(a,c)},"!=":function(a,c,d,e){return d(a,c)!=e(a,c)},"<":function(a,c,d,e){return d(a,c)<e(a,c)},">":function(a,c,d,e){return d(a,c)>e(a,c)},"<=":function(a,c,d,e){return d(a,c)<=e(a,c)},">=":function(a,c,d,e){return d(a,c)>=e(a,c)},"&&":function(a,c,d,e){return d(a,c)&&e(a,c)},
"||":function(a,c,d,e){return d(a,c)||e(a,c)},"!":function(a,c,d){return!d(a,c)},"=":!0,"|":!0}),Zf={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},hc=function(a){this.options=a};hc.prototype={constructor:hc,lex:function(a){this.text=a;this.index=0;for(this.tokens=[];this.index<this.text.length;)if(a=this.text.charAt(this.index),'"'===a||"'"===a)this.readString(a);else if(this.isNumber(a)||"."===a&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(a))this.readIdent();else if(this.is(a,
"(){}[].,;:?"))this.tokens.push({index:this.index,text:a}),this.index++;else if(this.isWhitespace(a))this.index++;else{var c=a+this.peek(),d=c+this.peek(2),e=nb[c],f=nb[d];nb[a]||e||f?(a=f?d:e?c:a,this.tokens.push({index:this.index,text:a,operator:!0}),this.index+=a.length):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},is:function(a,c){return-1!==c.indexOf(a)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},
isNumber:function(a){return"0"<=a&&"9">=a&&"string"===typeof a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,c,d){d=d||this.index;c=y(c)?"s "+c+"-"+this.index+" ["+this.text.substring(c,d)+"]":" "+d;throw na("lexerr",a,c,this.text);},readNumber:function(){for(var a="",c=this.index;this.index<
this.text.length;){var d=z(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();if("e"==d&&this.isExpOperator(e))a+=d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||e&&this.isNumber(e)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}this.tokens.push({index:c,text:a,constant:!0,value:Number(a)})},readIdent:function(){for(var a=this.index;this.index<this.text.length;){var c=
this.text.charAt(this.index);if(!this.isIdent(c)&&!this.isNumber(c))break;this.index++}this.tokens.push({index:a,text:this.text.slice(a,this.index),identifier:!0})},readString:function(a){var c=this.index;this.index++;for(var d="",e=a,f=!1;this.index<this.text.length;){var g=this.text.charAt(this.index),e=e+g;if(f)"u"===g?(f=this.text.substring(this.index+1,this.index+5),f.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+f+"]"),this.index+=4,d+=String.fromCharCode(parseInt(f,16))):
d+=Zf[g]||g,f=!1;else if("\\"===g)f=!0;else{if(g===a){this.index++;this.tokens.push({index:c,text:e,constant:!0,value:d});return}d+=g}this.index++}this.throwError("Unterminated quote",c)}};var ib=function(a,c,d){this.lexer=a;this.$filter=c;this.options=d};ib.ZERO=w(function(){return 0},{sharedGetter:!0,constant:!0});ib.prototype={constructor:ib,parse:function(a){this.text=a;this.tokens=this.lexer.lex(a);a=this.statements();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);
a.literal=!!a.literal;a.constant=!!a.constant;return a},primary:function(){var a;this.expect("(")?(a=this.filterChain(),this.consume(")")):this.expect("[")?a=this.arrayDeclaration():this.expect("{")?a=this.object():this.peek().identifier&&this.peek().text in mb?a=mb[this.consume().text]:this.peek().identifier?a=this.identifier():this.peek().constant?a=this.constant():this.throwError("not a primary expression",this.peek());for(var c,d;c=this.expect("(","[",".");)"("===c.text?(a=this.functionCall(a,
d),d=null):"["===c.text?(d=a,a=this.objectIndex(a)):"."===c.text?(d=a,a=this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},throwError:function(a,c){throw na("syntax",c.text,a,c.index+1,this.text,this.text.substring(c.index));},peekToken:function(){if(0===this.tokens.length)throw na("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,e){return this.peekAhead(0,a,c,d,e)},peekAhead:function(a,c,d,e,f){if(this.tokens.length>a){a=this.tokens[a];var g=a.text;if(g===c||g===d||g===e||g===
f||!(c||d||e||f))return a}return!1},expect:function(a,c,d,e){return(a=this.peek(a,c,d,e))?(this.tokens.shift(),a):!1},consume:function(a){if(0===this.tokens.length)throw na("ueoe",this.text);var c=this.expect(a);c||this.throwError("is unexpected, expecting ["+a+"]",this.peek());return c},unaryFn:function(a,c){var d=nb[a];return w(function(a,f){return d(a,f,c)},{constant:c.constant,inputs:[c]})},binaryFn:function(a,c,d,e){var f=nb[c];return w(function(c,e){return f(c,e,a,d)},{constant:a.constant&&
d.constant,inputs:!e&&[a,d]})},identifier:function(){for(var a=this.consume().text;this.peek(".")&&this.peekAhead(1).identifier&&!this.peekAhead(2,"(");)a+=this.consume().text+this.consume().text;return zf(a,this.options,this.text)},constant:function(){var a=this.consume().value;return w(function(){return a},{constant:!0,literal:!0})},statements:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.filterChain()),!this.expect(";"))return 1===a.length?a[0]:function(c,
d){for(var e,f=0,g=a.length;f<g;f++)e=a[f](c,d);return e}},filterChain:function(){for(var a=this.expression();this.expect("|");)a=this.filter(a);return a},filter:function(a){var c=this.$filter(this.consume().text),d,e;if(this.peek(":"))for(d=[],e=[];this.expect(":");)d.push(this.expression());var f=[a].concat(d||[]);return w(function(f,h){var l=a(f,h);if(e){e[0]=l;for(l=d.length;l--;)e[l+1]=d[l](f,h);return c.apply(t,e)}return c(l)},{constant:!c.$stateful&&f.every(fc),inputs:!c.$stateful&&f})},expression:function(){return this.assignment()},
assignment:function(){var a=this.ternary(),c,d;return(d=this.expect("="))?(a.assign||this.throwError("implies assignment but ["+this.text.substring(0,d.index)+"] can not be assigned to",d),c=this.ternary(),w(function(d,f){return a.assign(d,c(d,f),f)},{inputs:[a,c]})):a},ternary:function(){var a=this.logicalOR(),c;if(this.expect("?")&&(c=this.assignment(),this.consume(":"))){var d=this.assignment();return w(function(e,f){return a(e,f)?c(e,f):d(e,f)},{constant:a.constant&&c.constant&&d.constant})}return a},
logicalOR:function(){for(var a=this.logicalAND(),c;c=this.expect("||");)a=this.binaryFn(a,c.text,this.logicalAND(),!0);return a},logicalAND:function(){for(var a=this.equality(),c;c=this.expect("&&");)a=this.binaryFn(a,c.text,this.equality(),!0);return a},equality:function(){for(var a=this.relational(),c;c=this.expect("==","!=","===","!==");)a=this.binaryFn(a,c.text,this.relational());return a},relational:function(){for(var a=this.additive(),c;c=this.expect("<",">","<=",">=");)a=this.binaryFn(a,c.text,
this.additive());return a},additive:function(){for(var a=this.multiplicative(),c;c=this.expect("+","-");)a=this.binaryFn(a,c.text,this.multiplicative());return a},multiplicative:function(){for(var a=this.unary(),c;c=this.expect("*","/","%");)a=this.binaryFn(a,c.text,this.unary());return a},unary:function(){var a;return this.expect("+")?this.primary():(a=this.expect("-"))?this.binaryFn(ib.ZERO,a.text,this.unary()):(a=this.expect("!"))?this.unaryFn(a.text,this.unary()):this.primary()},fieldAccess:function(a){var c=
this.identifier();return w(function(d,e,f){d=f||a(d,e);return null==d?t:c(d)},{assign:function(d,e,f){var g=a(d,f);g||a.assign(d,g={},f);return c.assign(g,e)}})},objectIndex:function(a){var c=this.text,d=this.expression();this.consume("]");return w(function(e,f){var g=a(e,f),h=d(e,f);ua(h,c);return g?oa(g[h],c):t},{assign:function(e,f,g){var h=ua(d(e,g),c),l=oa(a(e,g),c);l||a.assign(e,l={},g);return l[h]=f}})},functionCall:function(a,c){var d=[];if(")"!==this.peekToken().text){do d.push(this.expression());
while(this.expect(","))}this.consume(")");var e=this.text,f=d.length?[]:null;return function(g,h){var l=c?c(g,h):y(c)?t:g,k=a(g,h,l)||E;if(f)for(var n=d.length;n--;)f[n]=oa(d[n](g,h),e);oa(l,e);if(k){if(k.constructor===k)throw na("isecfn",e);if(k===Wf||k===Xf||k===Yf)throw na("isecff",e);}l=k.apply?k.apply(l,f):k(f[0],f[1],f[2],f[3],f[4]);f&&(f.length=0);return oa(l,e)}},arrayDeclaration:function(){var a=[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;a.push(this.expression())}while(this.expect(","))
}this.consume("]");return w(function(c,d){for(var e=[],f=0,g=a.length;f<g;f++)e.push(a[f](c,d));return e},{literal:!0,constant:a.every(fc),inputs:a})},object:function(){var a=[],c=[];if("}"!==this.peekToken().text){do{if(this.peek("}"))break;var d=this.consume();d.constant?a.push(d.value):d.identifier?a.push(d.text):this.throwError("invalid key",d);this.consume(":");c.push(this.expression())}while(this.expect(","))}this.consume("}");return w(function(d,f){for(var g={},h=0,l=c.length;h<l;h++)g[a[h]]=
c[h](d,f);return g},{literal:!0,constant:c.every(fc),inputs:c})}};var Bf=ia(),Af=ia(),Cf=Object.prototype.valueOf,Ba=R("$sce"),pa={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},la=R("$compile"),$=W.createElement("a"),id=Aa(Q.location.href);Fc.$inject=["$provide"];jd.$inject=["$locale"];ld.$inject=["$locale"];var od=".",Mf={yyyy:U("FullYear",4),yy:U("FullYear",2,0,!0),y:U("FullYear",1),MMMM:Jb("Month"),MMM:Jb("Month",!0),MM:U("Month",2,1),M:U("Month",1,1),dd:U("Date",2),d:U("Date",
1),HH:U("Hours",2),H:U("Hours",1),hh:U("Hours",2,-12),h:U("Hours",1,-12),mm:U("Minutes",2),m:U("Minutes",1),ss:U("Seconds",2),s:U("Seconds",1),sss:U("Milliseconds",3),EEEE:Jb("Day"),EEE:Jb("Day",!0),a:function(a,c){return 12>a.getHours()?c.AMPMS[0]:c.AMPMS[1]},Z:function(a){a=-1*a.getTimezoneOffset();return a=(0<=a?"+":"")+(Ib(Math[0<a?"floor":"ceil"](a/60),2)+Ib(Math.abs(a%60),2))},ww:qd(2),w:qd(1),G:ic,GG:ic,GGG:ic,GGGG:function(a,c){return 0>=a.getFullYear()?c.ERANAMES[0]:c.ERANAMES[1]}},Lf=/((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,
Kf=/^\-?\d+$/;kd.$inject=["$locale"];var Hf=ea(z),If=ea(ub);md.$inject=["$parse"];var Td=ea({restrict:"E",compile:function(a,c){if(!c.href&&!c.xlinkHref&&!c.name)return function(a,c){if("a"===c[0].nodeName.toLowerCase()){var f="[object SVGAnimatedString]"===Ca.call(c.prop("href"))?"xlink:href":"href";c.on("click",function(a){c.attr(f)||a.preventDefault()})}}}}),vb={};r(Eb,function(a,c){if("multiple"!=a){var d=xa("ng-"+c);vb[d]=function(){return{restrict:"A",priority:100,link:function(a,f,g){a.$watch(g[d],
function(a){g.$set(c,!!a)})}}}}});r(Pc,function(a,c){vb[c]=function(){return{priority:100,link:function(a,e,f){if("ngPattern"===c&&"/"==f.ngPattern.charAt(0)&&(e=f.ngPattern.match(Of))){f.$set("ngPattern",new RegExp(e[1],e[2]));return}a.$watch(f[c],function(a){f.$set(c,a)})}}}});r(["src","srcset","href"],function(a){var c=xa("ng-"+a);vb[c]=function(){return{priority:99,link:function(d,e,f){var g=a,h=a;"href"===a&&"[object SVGAnimatedString]"===Ca.call(e.prop("href"))&&(h="xlinkHref",f.$attr[h]="xlink:href",
g=null);f.$observe(c,function(c){c?(f.$set(h,c),Qa&&g&&e.prop(g,f[h])):"href"===a&&f.$set(h,null)})}}}});var Kb={$addControl:E,$$renameControl:function(a,c){a.$name=c},$removeControl:E,$setValidity:E,$setDirty:E,$setPristine:E,$setSubmitted:E};rd.$inject=["$element","$attrs","$scope","$animate","$interpolate"];var yd=function(a){return["$timeout",function(c){return{name:"form",restrict:a?"EAC":"E",controller:rd,compile:function(d,e){d.addClass(Ra).addClass(lb);var f=e.name?"name":a&&e.ngForm?"ngForm":
!1;return{pre:function(a,d,e,k){if(!("action"in e)){var n=function(c){a.$apply(function(){k.$commitViewValue();k.$setSubmitted()});c.preventDefault()};d[0].addEventListener("submit",n,!1);d.on("$destroy",function(){c(function(){d[0].removeEventListener("submit",n,!1)},0,!1)})}var p=k.$$parentForm;f&&(hb(a,null,k.$name,k,k.$name),e.$observe(f,function(c){k.$name!==c&&(hb(a,null,k.$name,t,k.$name),p.$$renameControl(k,c),hb(a,null,k.$name,k,k.$name))}));d.on("$destroy",function(){p.$removeControl(k);
f&&hb(a,null,e[f],t,k.$name);w(k,Kb)})}}}}}]},Ud=yd(),ge=yd(!0),Nf=/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,$f=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,ag=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,bg=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,zd=/^(\d{4})-(\d{2})-(\d{2})$/,Ad=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,lc=/^(\d{4})-W(\d\d)$/,Bd=/^(\d{4})-(\d\d)$/,
Cd=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Dd={text:function(a,c,d,e,f,g){jb(a,c,d,e,f,g);jc(e)},date:kb("date",zd,Mb(zd,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":kb("datetimelocal",Ad,Mb(Ad,"yyyy MM dd HH mm ss sss".split(" ")),"yyyy-MM-ddTHH:mm:ss.sss"),time:kb("time",Cd,Mb(Cd,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:kb("week",lc,function(a,c){if(ga(a))return a;if(C(a)){lc.lastIndex=0;var d=lc.exec(a);if(d){var e=+d[1],f=+d[2],g=d=0,h=0,l=0,k=pd(e),f=7*(f-1);c&&(d=c.getHours(),g=
c.getMinutes(),h=c.getSeconds(),l=c.getMilliseconds());return new Date(e,0,k.getDate()+f,d,g,h,l)}}return NaN},"yyyy-Www"),month:kb("month",Bd,Mb(Bd,["yyyy","MM"]),"yyyy-MM"),number:function(a,c,d,e,f,g){td(a,c,d,e);jb(a,c,d,e,f,g);e.$$parserName="number";e.$parsers.push(function(a){return e.$isEmpty(a)?null:bg.test(a)?parseFloat(a):t});e.$formatters.push(function(a){if(!e.$isEmpty(a)){if(!Y(a))throw Nb("numfmt",a);a=a.toString()}return a});if(y(d.min)||d.ngMin){var h;e.$validators.min=function(a){return e.$isEmpty(a)||
x(h)||a>=h};d.$observe("min",function(a){y(a)&&!Y(a)&&(a=parseFloat(a,10));h=Y(a)&&!isNaN(a)?a:t;e.$validate()})}if(y(d.max)||d.ngMax){var l;e.$validators.max=function(a){return e.$isEmpty(a)||x(l)||a<=l};d.$observe("max",function(a){y(a)&&!Y(a)&&(a=parseFloat(a,10));l=Y(a)&&!isNaN(a)?a:t;e.$validate()})}},url:function(a,c,d,e,f,g){jb(a,c,d,e,f,g);jc(e);e.$$parserName="url";e.$validators.url=function(a,c){var d=a||c;return e.$isEmpty(d)||$f.test(d)}},email:function(a,c,d,e,f,g){jb(a,c,d,e,f,g);jc(e);
e.$$parserName="email";e.$validators.email=function(a,c){var d=a||c;return e.$isEmpty(d)||ag.test(d)}},radio:function(a,c,d,e){x(d.name)&&c.attr("name",++ob);c.on("click",function(a){c[0].checked&&e.$setViewValue(d.value,a&&a.type)});e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",e.$render)},checkbox:function(a,c,d,e,f,g,h,l){var k=ud(l,a,"ngTrueValue",d.ngTrueValue,!0),n=ud(l,a,"ngFalseValue",d.ngFalseValue,!1);c.on("click",function(a){e.$setViewValue(c[0].checked,a&&
a.type)});e.$render=function(){c[0].checked=e.$viewValue};e.$isEmpty=function(a){return!1===a};e.$formatters.push(function(a){return ha(a,k)});e.$parsers.push(function(a){return a?k:n})},hidden:E,button:E,submit:E,reset:E,file:E},zc=["$browser","$sniffer","$filter","$parse",function(a,c,d,e){return{restrict:"E",require:["?ngModel"],link:{pre:function(f,g,h,l){l[0]&&(Dd[z(h.type)]||Dd.text)(f,g,h,l[0],c,a,d,e)}}}}],cg=/^(true|false|\d+)$/,ye=function(){return{restrict:"A",priority:100,compile:function(a,
c){return cg.test(c.ngValue)?function(a,c,f){f.$set("value",a.$eval(f.ngValue))}:function(a,c,f){a.$watch(f.ngValue,function(a){f.$set("value",a)})}}}},Zd=["$compile",function(a){return{restrict:"AC",compile:function(c){a.$$addBindingClass(c);return function(c,e,f){a.$$addBindingInfo(e,f.ngBind);e=e[0];c.$watch(f.ngBind,function(a){e.textContent=a===t?"":a})}}}}],ae=["$interpolate","$compile",function(a,c){return{compile:function(d){c.$$addBindingClass(d);return function(d,f,g){d=a(f.attr(g.$attr.ngBindTemplate));
c.$$addBindingInfo(f,d.expressions);f=f[0];g.$observe("ngBindTemplate",function(a){f.textContent=a===t?"":a})}}}}],$d=["$sce","$parse","$compile",function(a,c,d){return{restrict:"A",compile:function(e,f){var g=c(f.ngBindHtml),h=c(f.ngBindHtml,function(a){return(a||"").toString()});d.$$addBindingClass(e);return function(c,e,f){d.$$addBindingInfo(e,f.ngBindHtml);c.$watch(h,function(){e.html(a.getTrustedHtml(g(c))||"")})}}}}],xe=ea({restrict:"A",require:"ngModel",link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),
be=kc("",!0),de=kc("Odd",0),ce=kc("Even",1),ee=Ia({compile:function(a,c){c.$set("ngCloak",t);a.removeClass("ng-cloak")}}),fe=[function(){return{restrict:"A",scope:!0,controller:"@",priority:500}}],Ec={},dg={blur:!0,focus:!0};r("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var c=xa("ng-"+a);Ec[c]=["$parse","$rootScope",function(d,e){return{restrict:"A",compile:function(f,g){var h=
d(g[c],null,!0);return function(c,d){d.on(a,function(d){var f=function(){h(c,{$event:d})};dg[a]&&e.$$phase?c.$evalAsync(f):c.$apply(f)})}}}}]});var ie=["$animate",function(a){return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(c,d,e,f,g){var h,l,k;c.$watch(e.ngIf,function(c){c?l||g(function(c,f){l=f;c[c.length++]=W.createComment(" end ngIf: "+e.ngIf+" ");h={clone:c};a.enter(c,d.parent(),d)}):(k&&(k.remove(),k=null),l&&(l.$destroy(),l=null),h&&(k=
tb(h.clone),a.leave(k).then(function(){k=null}),h=null))})}}}],je=["$templateRequest","$anchorScroll","$animate","$sce",function(a,c,d,e){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:ca.noop,compile:function(f,g){var h=g.ngInclude||g.src,l=g.onload||"",k=g.autoscroll;return function(f,g,q,r,s){var t=0,v,m,F,w=function(){m&&(m.remove(),m=null);v&&(v.$destroy(),v=null);F&&(d.leave(F).then(function(){m=null}),m=F,F=null)};f.$watch(e.parseAsResourceUrl(h),function(e){var h=
function(){!y(k)||k&&!f.$eval(k)||c()},m=++t;e?(a(e,!0).then(function(a){if(m===t){var c=f.$new();r.template=a;a=s(c,function(a){w();d.enter(a,null,g).then(h)});v=c;F=a;v.$emit("$includeContentLoaded",e);f.$eval(l)}},function(){m===t&&(w(),f.$emit("$includeContentError",e))}),f.$emit("$includeContentRequested",e)):(w(),r.template=null)})}}}}],Ae=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(c,d,e,f){/SVG/.test(d[0].toString())?(d.empty(),a(Hc(f.template,
W).childNodes)(c,function(a){d.append(a)},{futureParentElement:d})):(d.html(f.template),a(d.contents())(c))}}}],ke=Ia({priority:450,compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),we=function(){return{restrict:"A",priority:100,require:"ngModel",link:function(a,c,d,e){var f=c.attr(d.$attr.ngList)||", ",g="false"!==d.ngTrim,h=g?N(f):f;e.$parsers.push(function(a){if(!x(a)){var c=[];a&&r(a.split(h),function(a){a&&c.push(g?N(a):a)});return c}});e.$formatters.push(function(a){return H(a)?
a.join(f):t});e.$isEmpty=function(a){return!a||!a.length}}}},lb="ng-valid",vd="ng-invalid",Ra="ng-pristine",Lb="ng-dirty",xd="ng-pending",Nb=new R("ngModel"),eg=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate","$timeout","$rootScope","$q","$interpolate",function(a,c,d,e,f,g,h,l,k,n){this.$modelValue=this.$viewValue=Number.NaN;this.$$rawModelValue=t;this.$validators={};this.$asyncValidators={};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;
this.$touched=!1;this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$error={};this.$$success={};this.$pending=t;this.$name=n(d.name||"",!1)(a);var p=f(d.ngModel),q=p.assign,u=p,s=q,M=null,v,m=this;this.$$setOptions=function(a){if((m.$options=a)&&a.getterSetter){var c=f(d.ngModel+"()"),g=f(d.ngModel+"($$$p)");u=function(a){var d=p(a);G(d)&&(d=c(a));return d};s=function(a,c){G(p(a))?g(a,{$$$p:m.$modelValue}):q(a,m.$modelValue)}}else if(!p.assign)throw Nb("nonassign",d.ngModel,wa(e));
};this.$render=E;this.$isEmpty=function(a){return x(a)||""===a||null===a||a!==a};var F=e.inheritedData("$formController")||Kb,w=0;sd({ctrl:this,$element:e,set:function(a,c){a[c]=!0},unset:function(a,c){delete a[c]},parentForm:F,$animate:g});this.$setPristine=function(){m.$dirty=!1;m.$pristine=!0;g.removeClass(e,Lb);g.addClass(e,Ra)};this.$setDirty=function(){m.$dirty=!0;m.$pristine=!1;g.removeClass(e,Ra);g.addClass(e,Lb);F.$setDirty()};this.$setUntouched=function(){m.$touched=!1;m.$untouched=!0;g.setClass(e,
"ng-untouched","ng-touched")};this.$setTouched=function(){m.$touched=!0;m.$untouched=!1;g.setClass(e,"ng-touched","ng-untouched")};this.$rollbackViewValue=function(){h.cancel(M);m.$viewValue=m.$$lastCommittedViewValue;m.$render()};this.$validate=function(){if(!Y(m.$modelValue)||!isNaN(m.$modelValue)){var a=m.$$rawModelValue,c=m.$valid,d=m.$modelValue,e=m.$options&&m.$options.allowInvalid;m.$$runValidators(a,m.$$lastCommittedViewValue,function(f){e||c===f||(m.$modelValue=f?a:t,m.$modelValue!==d&&m.$$writeModelToScope())})}};
this.$$runValidators=function(a,c,d){function e(){var d=!0;r(m.$validators,function(e,f){var h=e(a,c);d=d&&h;g(f,h)});return d?!0:(r(m.$asyncValidators,function(a,c){g(c,null)}),!1)}function f(){var d=[],e=!0;r(m.$asyncValidators,function(f,h){var k=f(a,c);if(!k||!G(k.then))throw Nb("$asyncValidators",k);g(h,t);d.push(k.then(function(){g(h,!0)},function(a){e=!1;g(h,!1)}))});d.length?k.all(d).then(function(){h(e)},E):h(!0)}function g(a,c){l===w&&m.$setValidity(a,c)}function h(a){l===w&&d(a)}w++;var l=
w;(function(){var a=m.$$parserName||"parse";if(v===t)g(a,null);else return v||(r(m.$validators,function(a,c){g(c,null)}),r(m.$asyncValidators,function(a,c){g(c,null)})),g(a,v),v;return!0})()?e()?f():h(!1):h(!1)};this.$commitViewValue=function(){var a=m.$viewValue;h.cancel(M);if(m.$$lastCommittedViewValue!==a||""===a&&m.$$hasNativeValidators)m.$$lastCommittedViewValue=a,m.$pristine&&this.$setDirty(),this.$$parseAndValidate()};this.$$parseAndValidate=function(){var c=m.$$lastCommittedViewValue;if(v=
x(c)?t:!0)for(var d=0;d<m.$parsers.length;d++)if(c=m.$parsers[d](c),x(c)){v=!1;break}Y(m.$modelValue)&&isNaN(m.$modelValue)&&(m.$modelValue=u(a));var e=m.$modelValue,f=m.$options&&m.$options.allowInvalid;m.$$rawModelValue=c;f&&(m.$modelValue=c,m.$modelValue!==e&&m.$$writeModelToScope());m.$$runValidators(c,m.$$lastCommittedViewValue,function(a){f||(m.$modelValue=a?c:t,m.$modelValue!==e&&m.$$writeModelToScope())})};this.$$writeModelToScope=function(){s(a,m.$modelValue);r(m.$viewChangeListeners,function(a){try{a()}catch(d){c(d)}})};
this.$setViewValue=function(a,c){m.$viewValue=a;m.$options&&!m.$options.updateOnDefault||m.$$debounceViewValueCommit(c)};this.$$debounceViewValueCommit=function(c){var d=0,e=m.$options;e&&y(e.debounce)&&(e=e.debounce,Y(e)?d=e:Y(e[c])?d=e[c]:Y(e["default"])&&(d=e["default"]));h.cancel(M);d?M=h(function(){m.$commitViewValue()},d):l.$$phase?m.$commitViewValue():a.$apply(function(){m.$commitViewValue()})};a.$watch(function(){var c=u(a);if(c!==m.$modelValue){m.$modelValue=m.$$rawModelValue=c;v=t;for(var d=
m.$formatters,e=d.length,f=c;e--;)f=d[e](f);m.$viewValue!==f&&(m.$viewValue=m.$$lastCommittedViewValue=f,m.$render(),m.$$runValidators(c,f,E))}return c})}],ve=["$rootScope",function(a){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:eg,priority:1,compile:function(c){c.addClass(Ra).addClass("ng-untouched").addClass(lb);return{pre:function(a,c,f,g){var h=g[0],l=g[1]||Kb;h.$$setOptions(g[2]&&g[2].$options);l.$addControl(h);f.$observe("name",function(a){h.$name!==a&&l.$$renameControl(h,
a)});a.$on("$destroy",function(){l.$removeControl(h)})},post:function(c,e,f,g){var h=g[0];if(h.$options&&h.$options.updateOn)e.on(h.$options.updateOn,function(a){h.$$debounceViewValueCommit(a&&a.type)});e.on("blur",function(e){h.$touched||(a.$$phase?c.$evalAsync(h.$setTouched):c.$apply(h.$setTouched))})}}}}}],fg=/(\s+|^)default(\s+|$)/,ze=function(){return{restrict:"A",controller:["$scope","$attrs",function(a,c){var d=this;this.$options=a.$eval(c.ngModelOptions);this.$options.updateOn!==t?(this.$options.updateOnDefault=
!1,this.$options.updateOn=N(this.$options.updateOn.replace(fg,function(){d.$options.updateOnDefault=!0;return" "}))):this.$options.updateOnDefault=!0}]}},le=Ia({terminal:!0,priority:1E3}),me=["$locale","$interpolate",function(a,c){var d=/{}/g,e=/^when(Minus)?(.+)$/;return{restrict:"EA",link:function(f,g,h){function l(a){g.text(a||"")}var k=h.count,n=h.$attr.when&&g.attr(h.$attr.when),p=h.offset||0,q=f.$eval(n)||{},u={},n=c.startSymbol(),s=c.endSymbol(),t=n+k+"-"+p+s,v=ca.noop,m;r(h,function(a,c){var d=
e.exec(c);d&&(d=(d[1]?"-":"")+z(d[2]),q[d]=g.attr(h.$attr[c]))});r(q,function(a,e){u[e]=c(a.replace(d,t))});f.$watch(k,function(c){c=parseFloat(c);var d=isNaN(c);d||c in q||(c=a.pluralCat(c-p));c===m||d&&isNaN(m)||(v(),v=f.$watch(u[c],l),m=c)})}}}],ne=["$parse","$animate",function(a,c){var d=R("ngRepeat"),e=function(a,c,d,e,k,n,p){a[d]=e;k&&(a[k]=n);a.$index=c;a.$first=0===c;a.$last=c===p-1;a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(c&1))};return{restrict:"A",multiElement:!0,transclude:"element",
priority:1E3,terminal:!0,$$tlb:!0,compile:function(f,g){var h=g.ngRepeat,l=W.createComment(" end ngRepeat: "+h+" "),k=h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!k)throw d("iexp",h);var n=k[1],p=k[2],q=k[3],u=k[4],k=n.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);if(!k)throw d("iidexp",n);var s=k[3]||k[1],y=k[2];if(q&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(q)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(q)))throw d("badident",
q);var v,m,w,x,E={$id:Ma};u?v=a(u):(w=function(a,c){return Ma(c)},x=function(a){return a});return function(a,f,g,k,n){v&&(m=function(c,d,e){y&&(E[y]=c);E[s]=d;E.$index=e;return v(a,E)});var u=ia();a.$watchCollection(p,function(g){var k,p,v=f[0],D,E=ia(),G,H,L,S,J,C,z;q&&(a[q]=g);if(Sa(g))J=g,p=m||w;else{p=m||x;J=[];for(z in g)g.hasOwnProperty(z)&&"$"!=z.charAt(0)&&J.push(z);J.sort()}G=J.length;z=Array(G);for(k=0;k<G;k++)if(H=g===J?k:J[k],L=g[H],S=p(H,L,k),u[S])C=u[S],delete u[S],E[S]=C,z[k]=C;else{if(E[S])throw r(z,
function(a){a&&a.scope&&(u[a.id]=a)}),d("dupes",h,S,L);z[k]={id:S,scope:t,clone:t};E[S]=!0}for(D in u){C=u[D];S=tb(C.clone);c.leave(S);if(S[0].parentNode)for(k=0,p=S.length;k<p;k++)S[k].$$NG_REMOVED=!0;C.scope.$destroy()}for(k=0;k<G;k++)if(H=g===J?k:J[k],L=g[H],C=z[k],C.scope){D=v;do D=D.nextSibling;while(D&&D.$$NG_REMOVED);C.clone[0]!=D&&c.move(tb(C.clone),null,A(v));v=C.clone[C.clone.length-1];e(C.scope,k,s,L,y,H,G)}else n(function(a,d){C.scope=d;var f=l.cloneNode(!1);a[a.length++]=f;c.enter(a,
null,A(v));v=f;C.clone=a;E[C.id]=C;e(C.scope,k,s,L,y,H,G)});u=E})}}}}],oe=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngShow,function(c){a[c?"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],he=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngHide,function(c){a[c?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],pe=Ia(function(a,c,d){a.$watchCollection(d.ngStyle,
function(a,d){d&&a!==d&&r(d,function(a,d){c.css(d,"")});a&&c.css(a)})}),qe=["$animate",function(a){return{restrict:"EA",require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(c,d,e,f){var g=[],h=[],l=[],k=[],n=function(a,c){return function(){a.splice(c,1)}};c.$watch(e.ngSwitch||e.on,function(c){var d,e;d=0;for(e=l.length;d<e;++d)a.cancel(l[d]);d=l.length=0;for(e=k.length;d<e;++d){var s=tb(h[d].clone);k[d].$destroy();(l[d]=a.leave(s)).then(n(l,d))}h.length=0;k.length=0;(g=
f.cases["!"+c]||f.cases["?"])&&r(g,function(c){c.transclude(function(d,e){k.push(e);var f=c.element;d[d.length++]=W.createComment(" end ngSwitchWhen: ");h.push({clone:d});a.enter(d,f.parent(),f)})})})}}}],re=Ia({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,c,d,e,f){e.cases["!"+d.ngSwitchWhen]=e.cases["!"+d.ngSwitchWhen]||[];e.cases["!"+d.ngSwitchWhen].push({transclude:f,element:c})}}),se=Ia({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,
link:function(a,c,d,e,f){e.cases["?"]=e.cases["?"]||[];e.cases["?"].push({transclude:f,element:c})}}),ue=Ia({restrict:"EAC",link:function(a,c,d,e,f){if(!f)throw R("ngTransclude")("orphan",wa(c));f(function(a){c.empty();c.append(a)})}}),Vd=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(c,d){"text/ng-template"==d.type&&a.put(d.id,c[0].text)}}}],gg=R("ngOptions"),te=ea({restrict:"A",terminal:!0}),Wd=["$compile","$parse",function(a,c){var d=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
e={$setViewValue:E};return{restrict:"E",require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(a,c,d){var l=this,k={},n=e,p;l.databound=d.ngModel;l.init=function(a,c,d){n=a;p=d};l.addOption=function(c,d){La(c,'"option value"');k[c]=!0;n.$viewValue==c&&(a.val(c),p.parent()&&p.remove());d&&d[0].hasAttribute("selected")&&(d[0].selected=!0)};l.removeOption=function(a){this.hasOption(a)&&(delete k[a],n.$viewValue===a&&this.renderUnknownOption(a))};l.renderUnknownOption=function(c){c=
"? "+Ma(c)+" ?";p.val(c);a.prepend(p);a.val(c);p.prop("selected",!0)};l.hasOption=function(a){return k.hasOwnProperty(a)};c.$on("$destroy",function(){l.renderUnknownOption=E})}],link:function(e,g,h,l){function k(a,c,d,e){d.$render=function(){var a=d.$viewValue;e.hasOption(a)?(C.parent()&&C.remove(),c.val(a),""===a&&v.prop("selected",!0)):x(a)&&v?c.val(""):e.renderUnknownOption(a)};c.on("change",function(){a.$apply(function(){C.parent()&&C.remove();d.$setViewValue(c.val())})})}function n(a,c,d){var e;
d.$render=function(){var a=new eb(d.$viewValue);r(c.find("option"),function(c){c.selected=y(a.get(c.value))})};a.$watch(function(){ha(e,d.$viewValue)||(e=sa(d.$viewValue),d.$render())});c.on("change",function(){a.$apply(function(){var a=[];r(c.find("option"),function(c){c.selected&&a.push(c.value)});d.$setViewValue(a)})})}function p(e,f,g){function h(a,c,d){T[x]=d;G&&(T[G]=c);return a(e,T)}function k(a){var c;if(u)if(I&&H(a)){c=new eb([]);for(var d=0;d<a.length;d++)c.put(h(I,null,a[d]),!0)}else c=
new eb(a);else I&&(a=h(I,null,a));return function(d,e){var f;f=I?I:B?B:z;return u?y(c.remove(h(f,d,e))):a===h(f,d,e)}}function l(){m||(e.$$postDigest(p),m=!0)}function n(a,c,d){a[c]=a[c]||0;a[c]+=d?1:-1}function p(){m=!1;var a={"":[]},c=[""],d,l,s,t,v;s=g.$viewValue;t=L(e)||[];var B=G?Object.keys(t).sort():t,x,A,H,z,O={};v=k(s);var N=!1,U,W;Q={};for(z=0;H=B.length,z<H;z++){x=z;if(G&&(x=B[z],"$"===x.charAt(0)))continue;A=t[x];d=h(J,x,A)||"";(l=a[d])||(l=a[d]=[],c.push(d));d=v(x,A);N=N||d;A=h(C,x,A);
A=y(A)?A:"";W=I?I(e,T):G?B[z]:z;I&&(Q[W]=x);l.push({id:W,label:A,selected:d})}u||(w||null===s?a[""].unshift({id:"",label:"",selected:!N}):N||a[""].unshift({id:"?",label:"",selected:!0}));x=0;for(B=c.length;x<B;x++){d=c[x];l=a[d];R.length<=x?(s={element:E.clone().attr("label",d),label:l.label},t=[s],R.push(t),f.append(s.element)):(t=R[x],s=t[0],s.label!=d&&s.element.attr("label",s.label=d));N=null;z=0;for(H=l.length;z<H;z++)d=l[z],(v=t[z+1])?(N=v.element,v.label!==d.label&&(n(O,v.label,!1),n(O,d.label,
!0),N.text(v.label=d.label),N.prop("label",v.label)),v.id!==d.id&&N.val(v.id=d.id),N[0].selected!==d.selected&&(N.prop("selected",v.selected=d.selected),Qa&&N.prop("selected",v.selected))):(""===d.id&&w?U=w:(U=F.clone()).val(d.id).prop("selected",d.selected).attr("selected",d.selected).prop("label",d.label).text(d.label),t.push(v={element:U,label:d.label,id:d.id,selected:d.selected}),n(O,d.label,!0),N?N.after(U):s.element.append(U),N=U);for(z++;t.length>z;)d=t.pop(),n(O,d.label,!1),d.element.remove()}for(;R.length>
x;){l=R.pop();for(z=1;z<l.length;++z)n(O,l[z].label,!1);l[0].element.remove()}r(O,function(a,c){0<a?q.addOption(c):0>a&&q.removeOption(c)})}var v;if(!(v=s.match(d)))throw gg("iexp",s,wa(f));var C=c(v[2]||v[1]),x=v[4]||v[6],A=/ as /.test(v[0])&&v[1],B=A?c(A):null,G=v[5],J=c(v[3]||""),z=c(v[2]?v[1]:x),L=c(v[7]),I=v[8]?c(v[8]):null,Q={},R=[[{element:f,label:""}]],T={};w&&(a(w)(e),w.removeClass("ng-scope"),w.remove());f.empty();f.on("change",function(){e.$apply(function(){var a=L(e)||[],c;if(u)c=[],r(f.val(),
function(d){d=I?Q[d]:d;c.push("?"===d?t:""===d?null:h(B?B:z,d,a[d]))});else{var d=I?Q[f.val()]:f.val();c="?"===d?t:""===d?null:h(B?B:z,d,a[d])}g.$setViewValue(c);p()})});g.$render=p;e.$watchCollection(L,l);e.$watchCollection(function(){var a=L(e),c;if(a&&H(a)){c=Array(a.length);for(var d=0,f=a.length;d<f;d++)c[d]=h(C,d,a[d])}else if(a)for(d in c={},a)a.hasOwnProperty(d)&&(c[d]=h(C,d,a[d]));return c},l);u&&e.$watchCollection(function(){return g.$modelValue},l)}if(l[1]){var q=l[0];l=l[1];var u=h.multiple,
s=h.ngOptions,w=!1,v,m=!1,F=A(W.createElement("option")),E=A(W.createElement("optgroup")),C=F.clone();h=0;for(var B=g.children(),G=B.length;h<G;h++)if(""===B[h].value){v=w=B.eq(h);break}q.init(l,w,C);u&&(l.$isEmpty=function(a){return!a||0===a.length});s?p(e,g,l):u?n(e,g,l):k(e,g,l,q)}}}}],Yd=["$interpolate",function(a){var c={addOption:E,removeOption:E};return{restrict:"E",priority:100,compile:function(d,e){if(x(e.value)){var f=a(d.text(),!0);f||e.$set("value",d.text())}return function(a,d,e){var k=
d.parent(),n=k.data("$selectController")||k.parent().data("$selectController");n&&n.databound||(n=c);f?a.$watch(f,function(a,c){e.$set("value",a);c!==a&&n.removeOption(c);n.addOption(a,d)}):n.addOption(e.value,d);d.on("$destroy",function(){n.removeOption(e.value)})}}}}],Xd=ea({restrict:"E",terminal:!1}),Bc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){e&&(d.required=!0,e.$validators.required=function(a,c){return!d.required||!e.$isEmpty(c)},d.$observe("required",function(){e.$validate()}))}}},
Ac=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f,g=d.ngPattern||d.pattern;d.$observe("pattern",function(a){C(a)&&0<a.length&&(a=new RegExp("^"+a+"$"));if(a&&!a.test)throw R("ngPattern")("noregexp",g,a,wa(c));f=a||t;e.$validate()});e.$validators.pattern=function(a){return e.$isEmpty(a)||x(f)||f.test(a)}}}}},Dc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=-1;d.$observe("maxlength",function(a){a=aa(a);f=isNaN(a)?-1:a;e.$validate()});
e.$validators.maxlength=function(a,c){return 0>f||e.$isEmpty(c)||c.length<=f}}}}},Cc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=0;d.$observe("minlength",function(a){f=aa(a)||0;e.$validate()});e.$validators.minlength=function(a,c){return e.$isEmpty(c)||c.length>=f}}}}};Q.angular.bootstrap?console.log("WARNING: Tried to load angular more than once."):(Nd(),Pd(ca),A(W).ready(function(){Jd(W,uc)}))})(window,document);!window.angular.$$csp()&&window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}</style>');
//# sourceMappingURL=angular.min.js.map
;
/*
 AngularJS v1.3.15
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/

(function(N,f,W){'use strict';f.module("ngAnimate",["ng"]).directive("ngAnimateChildren",function(){return function(X,C,g){g=g.ngAnimateChildren;f.isString(g)&&0===g.length?C.data("$$ngAnimateChildren",!0):X.$watch(g,function(f){C.data("$$ngAnimateChildren",!!f)})}}).factory("$$animateReflow",["$$rAF","$document",function(f,C){return function(g){return f(function(){g()})}}]).config(["$provide","$animateProvider",function(X,C){function g(f){for(var n=0;n<f.length;n++){var g=f[n];if(1==g.nodeType)return g}}
function ba(f,n){return g(f)==g(n)}var t=f.noop,n=f.forEach,da=C.$$selectors,aa=f.isArray,ea=f.isString,ga=f.isObject,r={running:!0},u;X.decorator("$animate",["$delegate","$$q","$injector","$sniffer","$rootElement","$$asyncCallback","$rootScope","$document","$templateRequest","$$jqLite",function(O,N,M,Y,y,H,P,W,Z,Q){function R(a,c){var b=a.data("$$ngAnimateState")||{};c&&(b.running=!0,b.structural=!0,a.data("$$ngAnimateState",b));return b.disabled||b.running&&b.structural}function D(a){var c,b=N.defer();
b.promise.$$cancelFn=function(){c&&c()};P.$$postDigest(function(){c=a(function(){b.resolve()})});return b.promise}function I(a){if(ga(a))return a.tempClasses&&ea(a.tempClasses)&&(a.tempClasses=a.tempClasses.split(/\s+/)),a}function S(a,c,b){b=b||{};var d={};n(b,function(e,a){n(a.split(" "),function(a){d[a]=e})});var h=Object.create(null);n((a.attr("class")||"").split(/\s+/),function(e){h[e]=!0});var f=[],l=[];n(c&&c.classes||[],function(e,a){var b=h[a],c=d[a]||{};!1===e?(b||"addClass"==c.event)&&
l.push(a):!0===e&&(b&&"removeClass"!=c.event||f.push(a))});return 0<f.length+l.length&&[f.join(" "),l.join(" ")]}function T(a){if(a){var c=[],b={};a=a.substr(1).split(".");(Y.transitions||Y.animations)&&c.push(M.get(da[""]));for(var d=0;d<a.length;d++){var f=a[d],k=da[f];k&&!b[f]&&(c.push(M.get(k)),b[f]=!0)}return c}}function U(a,c,b,d){function h(e,a){var b=e[a],c=e["before"+a.charAt(0).toUpperCase()+a.substr(1)];if(b||c)return"leave"==a&&(c=b,b=null),u.push({event:a,fn:b}),J.push({event:a,fn:c}),
!0}function k(c,l,w){var E=[];n(c,function(a){a.fn&&E.push(a)});var m=0;n(E,function(c,f){var p=function(){a:{if(l){(l[f]||t)();if(++m<E.length)break a;l=null}w()}};switch(c.event){case "setClass":l.push(c.fn(a,e,A,p,d));break;case "animate":l.push(c.fn(a,b,d.from,d.to,p));break;case "addClass":l.push(c.fn(a,e||b,p,d));break;case "removeClass":l.push(c.fn(a,A||b,p,d));break;default:l.push(c.fn(a,p,d))}});l&&0===l.length&&w()}var l=a[0];if(l){d&&(d.to=d.to||{},d.from=d.from||{});var e,A;aa(b)&&(e=
b[0],A=b[1],e?A?b=e+" "+A:(b=e,c="addClass"):(b=A,c="removeClass"));var w="setClass"==c,E=w||"addClass"==c||"removeClass"==c||"animate"==c,p=a.attr("class")+" "+b;if(x(p)){var ca=t,m=[],J=[],g=t,s=[],u=[],p=(" "+p).replace(/\s+/g,".");n(T(p),function(a){!h(a,c)&&w&&(h(a,"addClass"),h(a,"removeClass"))});return{node:l,event:c,className:b,isClassBased:E,isSetClassOperation:w,applyStyles:function(){d&&a.css(f.extend(d.from||{},d.to||{}))},before:function(a){ca=a;k(J,m,function(){ca=t;a()})},after:function(a){g=
a;k(u,s,function(){g=t;a()})},cancel:function(){m&&(n(m,function(a){(a||t)(!0)}),ca(!0));s&&(n(s,function(a){(a||t)(!0)}),g(!0))}}}}}function G(a,c,b,d,h,k,l,e){function A(e){var l="$animate:"+e;J&&J[l]&&0<J[l].length&&H(function(){b.triggerHandler(l,{event:a,className:c})})}function w(){A("before")}function E(){A("after")}function p(){p.hasBeenRun||(p.hasBeenRun=!0,k())}function g(){if(!g.hasBeenRun){m&&m.applyStyles();g.hasBeenRun=!0;l&&l.tempClasses&&n(l.tempClasses,function(a){u.removeClass(b,
a)});var w=b.data("$$ngAnimateState");w&&(m&&m.isClassBased?B(b,c):(H(function(){var e=b.data("$$ngAnimateState")||{};fa==e.index&&B(b,c,a)}),b.data("$$ngAnimateState",w)));A("close");e()}}var m=U(b,a,c,l);if(!m)return p(),w(),E(),g(),t;a=m.event;c=m.className;var J=f.element._data(m.node),J=J&&J.events;d||(d=h?h.parent():b.parent());if(z(b,d))return p(),w(),E(),g(),t;d=b.data("$$ngAnimateState")||{};var L=d.active||{},s=d.totalActive||0,q=d.last;h=!1;if(0<s){s=[];if(m.isClassBased)"setClass"==q.event?
(s.push(q),B(b,c)):L[c]&&(v=L[c],v.event==a?h=!0:(s.push(v),B(b,c)));else if("leave"==a&&L["ng-leave"])h=!0;else{for(var v in L)s.push(L[v]);d={};B(b,!0)}0<s.length&&n(s,function(a){a.cancel()})}!m.isClassBased||m.isSetClassOperation||"animate"==a||h||(h="addClass"==a==b.hasClass(c));if(h)return p(),w(),E(),A("close"),e(),t;L=d.active||{};s=d.totalActive||0;if("leave"==a)b.one("$destroy",function(a){a=f.element(this);var e=a.data("$$ngAnimateState");e&&(e=e.active["ng-leave"])&&(e.cancel(),B(a,"ng-leave"))});
u.addClass(b,"ng-animate");l&&l.tempClasses&&n(l.tempClasses,function(a){u.addClass(b,a)});var fa=K++;s++;L[c]=m;b.data("$$ngAnimateState",{last:m,active:L,index:fa,totalActive:s});w();m.before(function(e){var l=b.data("$$ngAnimateState");e=e||!l||!l.active[c]||m.isClassBased&&l.active[c].event!=a;p();!0===e?g():(E(),m.after(g))});return m.cancel}function q(a){if(a=g(a))a=f.isFunction(a.getElementsByClassName)?a.getElementsByClassName("ng-animate"):a.querySelectorAll(".ng-animate"),n(a,function(a){a=
f.element(a);(a=a.data("$$ngAnimateState"))&&a.active&&n(a.active,function(a){a.cancel()})})}function B(a,c){if(ba(a,y))r.disabled||(r.running=!1,r.structural=!1);else if(c){var b=a.data("$$ngAnimateState")||{},d=!0===c;!d&&b.active&&b.active[c]&&(b.totalActive--,delete b.active[c]);if(d||!b.totalActive)u.removeClass(a,"ng-animate"),a.removeData("$$ngAnimateState")}}function z(a,c){if(r.disabled)return!0;if(ba(a,y))return r.running;var b,d,g;do{if(0===c.length)break;var k=ba(c,y),l=k?r:c.data("$$ngAnimateState")||
{};if(l.disabled)return!0;k&&(g=!0);!1!==b&&(k=c.data("$$ngAnimateChildren"),f.isDefined(k)&&(b=k));d=d||l.running||l.last&&!l.last.isClassBased}while(c=c.parent());return!g||!b&&d}u=Q;y.data("$$ngAnimateState",r);var $=P.$watch(function(){return Z.totalPendingRequests},function(a,c){0===a&&($(),P.$$postDigest(function(){P.$$postDigest(function(){r.running=!1})}))}),K=0,V=C.classNameFilter(),x=V?function(a){return V.test(a)}:function(){return!0};return{animate:function(a,c,b,d,h){d=d||"ng-inline-animate";
h=I(h)||{};h.from=b?c:null;h.to=b?b:c;return D(function(b){return G("animate",d,f.element(g(a)),null,null,t,h,b)})},enter:function(a,c,b,d){d=I(d);a=f.element(a);c=c&&f.element(c);b=b&&f.element(b);R(a,!0);O.enter(a,c,b);return D(function(h){return G("enter","ng-enter",f.element(g(a)),c,b,t,d,h)})},leave:function(a,c){c=I(c);a=f.element(a);q(a);R(a,!0);return D(function(b){return G("leave","ng-leave",f.element(g(a)),null,null,function(){O.leave(a)},c,b)})},move:function(a,c,b,d){d=I(d);a=f.element(a);
c=c&&f.element(c);b=b&&f.element(b);q(a);R(a,!0);O.move(a,c,b);return D(function(h){return G("move","ng-move",f.element(g(a)),c,b,t,d,h)})},addClass:function(a,c,b){return this.setClass(a,c,[],b)},removeClass:function(a,c,b){return this.setClass(a,[],c,b)},setClass:function(a,c,b,d){d=I(d);a=f.element(a);a=f.element(g(a));if(R(a))return O.$$setClassImmediately(a,c,b,d);var h,k=a.data("$$animateClasses"),l=!!k;k||(k={classes:{}});h=k.classes;c=aa(c)?c:c.split(" ");n(c,function(a){a&&a.length&&(h[a]=
!0)});b=aa(b)?b:b.split(" ");n(b,function(a){a&&a.length&&(h[a]=!1)});if(l)return d&&k.options&&(k.options=f.extend(k.options||{},d)),k.promise;a.data("$$animateClasses",k={classes:h,options:d});return k.promise=D(function(e){var l=a.parent(),b=g(a),c=b.parentNode;if(!c||c.$$NG_REMOVED||b.$$NG_REMOVED)e();else{b=a.data("$$animateClasses");a.removeData("$$animateClasses");var c=a.data("$$ngAnimateState")||{},d=S(a,b,c.active);return d?G("setClass",d,a,l,null,function(){d[0]&&O.$$addClassImmediately(a,
d[0]);d[1]&&O.$$removeClassImmediately(a,d[1])},b.options,e):e()}})},cancel:function(a){a.$$cancelFn()},enabled:function(a,c){switch(arguments.length){case 2:if(a)B(c);else{var b=c.data("$$ngAnimateState")||{};b.disabled=!0;c.data("$$ngAnimateState",b)}break;case 1:r.disabled=!a;break;default:a=!r.disabled}return!!a}}}]);C.register("",["$window","$sniffer","$timeout","$$animateReflow",function(r,C,M,Y){function y(){b||(b=Y(function(){c=[];b=null;x={}}))}function H(a,e){b&&b();c.push(e);b=Y(function(){n(c,
function(a){a()});c=[];b=null;x={}})}function P(a,e){var b=g(a);a=f.element(b);k.push(a);b=Date.now()+e;b<=h||(M.cancel(d),h=b,d=M(function(){X(k);k=[]},e,!1))}function X(a){n(a,function(a){(a=a.data("$$ngAnimateCSS3Data"))&&n(a.closeAnimationFns,function(a){a()})})}function Z(a,e){var b=e?x[e]:null;if(!b){var c=0,d=0,f=0,g=0;n(a,function(a){if(1==a.nodeType){a=r.getComputedStyle(a)||{};c=Math.max(Q(a[z+"Duration"]),c);d=Math.max(Q(a[z+"Delay"]),d);g=Math.max(Q(a[K+"Delay"]),g);var e=Q(a[K+"Duration"]);
0<e&&(e*=parseInt(a[K+"IterationCount"],10)||1);f=Math.max(e,f)}});b={total:0,transitionDelay:d,transitionDuration:c,animationDelay:g,animationDuration:f};e&&(x[e]=b)}return b}function Q(a){var e=0;a=ea(a)?a.split(/\s*,\s*/):[];n(a,function(a){e=Math.max(parseFloat(a)||0,e)});return e}function R(b,e,c,d){b=0<=["ng-enter","ng-leave","ng-move"].indexOf(c);var f,p=e.parent(),h=p.data("$$ngAnimateKey");h||(p.data("$$ngAnimateKey",++a),h=a);f=h+"-"+g(e).getAttribute("class");var p=f+" "+c,h=x[p]?++x[p].total:
0,m={};if(0<h){var n=c+"-stagger",m=f+" "+n;(f=!x[m])&&u.addClass(e,n);m=Z(e,m);f&&u.removeClass(e,n)}u.addClass(e,c);var n=e.data("$$ngAnimateCSS3Data")||{},k=Z(e,p);f=k.transitionDuration;k=k.animationDuration;if(b&&0===f&&0===k)return u.removeClass(e,c),!1;c=d||b&&0<f;b=0<k&&0<m.animationDelay&&0===m.animationDuration;e.data("$$ngAnimateCSS3Data",{stagger:m,cacheKey:p,running:n.running||0,itemIndex:h,blockTransition:c,closeAnimationFns:n.closeAnimationFns||[]});p=g(e);c&&(I(p,!0),d&&e.css(d));
b&&(p.style[K+"PlayState"]="paused");return!0}function D(a,e,b,c,d){function f(){e.off(D,h);u.removeClass(e,k);u.removeClass(e,t);z&&M.cancel(z);G(e,b);var a=g(e),c;for(c in s)a.style.removeProperty(s[c])}function h(a){a.stopPropagation();var b=a.originalEvent||a;a=b.$manualTimeStamp||b.timeStamp||Date.now();b=parseFloat(b.elapsedTime.toFixed(3));Math.max(a-H,0)>=C&&b>=x&&c()}var m=g(e);a=e.data("$$ngAnimateCSS3Data");if(-1!=m.getAttribute("class").indexOf(b)&&a){var k="",t="";n(b.split(" "),function(a,
b){var e=(0<b?" ":"")+a;k+=e+"-active";t+=e+"-pending"});var s=[],q=a.itemIndex,v=a.stagger,r=0;if(0<q){r=0;0<v.transitionDelay&&0===v.transitionDuration&&(r=v.transitionDelay*q);var y=0;0<v.animationDelay&&0===v.animationDuration&&(y=v.animationDelay*q,s.push(B+"animation-play-state"));r=Math.round(100*Math.max(r,y))/100}r||(u.addClass(e,k),a.blockTransition&&I(m,!1));var F=Z(e,a.cacheKey+" "+k),x=Math.max(F.transitionDuration,F.animationDuration);if(0===x)u.removeClass(e,k),G(e,b),c();else{!r&&
d&&0<Object.keys(d).length&&(F.transitionDuration||(e.css("transition",F.animationDuration+"s linear all"),s.push("transition")),e.css(d));var q=Math.max(F.transitionDelay,F.animationDelay),C=1E3*q;0<s.length&&(v=m.getAttribute("style")||"",";"!==v.charAt(v.length-1)&&(v+=";"),m.setAttribute("style",v+" "));var H=Date.now(),D=V+" "+$,q=1E3*(r+1.5*(q+x)),z;0<r&&(u.addClass(e,t),z=M(function(){z=null;0<F.transitionDuration&&I(m,!1);0<F.animationDuration&&(m.style[K+"PlayState"]="");u.addClass(e,k);
u.removeClass(e,t);d&&(0===F.transitionDuration&&e.css("transition",F.animationDuration+"s linear all"),e.css(d),s.push("transition"))},1E3*r,!1));e.on(D,h);a.closeAnimationFns.push(function(){f();c()});a.running++;P(e,q);return f}}else c()}function I(a,b){a.style[z+"Property"]=b?"none":""}function S(a,b,c,d){if(R(a,b,c,d))return function(a){a&&G(b,c)}}function T(a,b,c,d,f){if(b.data("$$ngAnimateCSS3Data"))return D(a,b,c,d,f);G(b,c);d()}function U(a,b,c,d,f){var g=S(a,b,c,f.from);if(g){var h=g;H(b,
function(){h=T(a,b,c,d,f.to)});return function(a){(h||t)(a)}}y();d()}function G(a,b){u.removeClass(a,b);var c=a.data("$$ngAnimateCSS3Data");c&&(c.running&&c.running--,c.running&&0!==c.running||a.removeData("$$ngAnimateCSS3Data"))}function q(a,b){var c="";a=aa(a)?a:a.split(/\s+/);n(a,function(a,d){a&&0<a.length&&(c+=(0<d?" ":"")+a+b)});return c}var B="",z,$,K,V;N.ontransitionend===W&&N.onwebkittransitionend!==W?(B="-webkit-",z="WebkitTransition",$="webkitTransitionEnd transitionend"):(z="transition",
$="transitionend");N.onanimationend===W&&N.onwebkitanimationend!==W?(B="-webkit-",K="WebkitAnimation",V="webkitAnimationEnd animationend"):(K="animation",V="animationend");var x={},a=0,c=[],b,d=null,h=0,k=[];return{animate:function(a,b,c,d,f,g){g=g||{};g.from=c;g.to=d;return U("animate",a,b,f,g)},enter:function(a,b,c){c=c||{};return U("enter",a,"ng-enter",b,c)},leave:function(a,b,c){c=c||{};return U("leave",a,"ng-leave",b,c)},move:function(a,b,c){c=c||{};return U("move",a,"ng-move",b,c)},beforeSetClass:function(a,
b,c,d,f){f=f||{};b=q(c,"-remove")+" "+q(b,"-add");if(f=S("setClass",a,b,f.from))return H(a,d),f;y();d()},beforeAddClass:function(a,b,c,d){d=d||{};if(b=S("addClass",a,q(b,"-add"),d.from))return H(a,c),b;y();c()},beforeRemoveClass:function(a,b,c,d){d=d||{};if(b=S("removeClass",a,q(b,"-remove"),d.from))return H(a,c),b;y();c()},setClass:function(a,b,c,d,f){f=f||{};c=q(c,"-remove");b=q(b,"-add");return T("setClass",a,c+" "+b,d,f.to)},addClass:function(a,b,c,d){d=d||{};return T("addClass",a,q(b,"-add"),
c,d.to)},removeClass:function(a,b,c,d){d=d||{};return T("removeClass",a,q(b,"-remove"),c,d.to)}}}])}])})(window,window.angular);
//# sourceMappingURL=angular-animate.min.js.map
;
/*
 AngularJS v1.3.15
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/

(function(q,d,C){'use strict';function v(r,k,h){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(a,f,b,c,y){function z(){l&&(h.cancel(l),l=null);m&&(m.$destroy(),m=null);n&&(l=h.leave(n),l.then(function(){l=null}),n=null)}function x(){var b=r.current&&r.current.locals;if(d.isDefined(b&&b.$template)){var b=a.$new(),c=r.current;n=y(b,function(b){h.enter(b,null,n||f).then(function(){!d.isDefined(t)||t&&!a.$eval(t)||k()});z()});m=c.scope=b;m.$emit("$viewContentLoaded");
m.$eval(w)}else z()}var m,n,l,t=b.autoscroll,w=b.onload||"";a.$on("$routeChangeSuccess",x);x()}}}function A(d,k,h){return{restrict:"ECA",priority:-400,link:function(a,f){var b=h.current,c=b.locals;f.html(c.$template);var y=d(f.contents());b.controller&&(c.$scope=a,c=k(b.controller,c),b.controllerAs&&(a[b.controllerAs]=c),f.data("$ngControllerController",c),f.children().data("$ngControllerController",c));y(a)}}}q=d.module("ngRoute",["ng"]).provider("$route",function(){function r(a,f){return d.extend(Object.create(a),
f)}function k(a,d){var b=d.caseInsensitiveMatch,c={originalPath:a,regexp:a},h=c.keys=[];a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(a,d,b,c){a="?"===c?c:null;c="*"===c?c:null;h.push({name:b,optional:!!a});d=d||"";return""+(a?"":d)+"(?:"+(a?d:"")+(c&&"(.+?)"||"([^/]+)")+(a||"")+")"+(a||"")}).replace(/([\/$\*])/g,"\\$1");c.regexp=new RegExp("^"+a+"$",b?"i":"");return c}var h={};this.when=function(a,f){var b=d.copy(f);d.isUndefined(b.reloadOnSearch)&&(b.reloadOnSearch=!0);
d.isUndefined(b.caseInsensitiveMatch)&&(b.caseInsensitiveMatch=this.caseInsensitiveMatch);h[a]=d.extend(b,a&&k(a,b));if(a){var c="/"==a[a.length-1]?a.substr(0,a.length-1):a+"/";h[c]=d.extend({redirectTo:a},k(c,b))}return this};this.caseInsensitiveMatch=!1;this.otherwise=function(a){"string"===typeof a&&(a={redirectTo:a});this.when(null,a);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce",function(a,f,b,c,k,q,x){function m(b){var e=s.current;
(v=(p=l())&&e&&p.$$route===e.$$route&&d.equals(p.pathParams,e.pathParams)&&!p.reloadOnSearch&&!w)||!e&&!p||a.$broadcast("$routeChangeStart",p,e).defaultPrevented&&b&&b.preventDefault()}function n(){var u=s.current,e=p;if(v)u.params=e.params,d.copy(u.params,b),a.$broadcast("$routeUpdate",u);else if(e||u)w=!1,(s.current=e)&&e.redirectTo&&(d.isString(e.redirectTo)?f.path(t(e.redirectTo,e.params)).search(e.params).replace():f.url(e.redirectTo(e.pathParams,f.path(),f.search())).replace()),c.when(e).then(function(){if(e){var a=
d.extend({},e.resolve),b,g;d.forEach(a,function(b,e){a[e]=d.isString(b)?k.get(b):k.invoke(b,null,null,e)});d.isDefined(b=e.template)?d.isFunction(b)&&(b=b(e.params)):d.isDefined(g=e.templateUrl)&&(d.isFunction(g)&&(g=g(e.params)),g=x.getTrustedResourceUrl(g),d.isDefined(g)&&(e.loadedTemplateUrl=g,b=q(g)));d.isDefined(b)&&(a.$template=b);return c.all(a)}}).then(function(c){e==s.current&&(e&&(e.locals=c,d.copy(e.params,b)),a.$broadcast("$routeChangeSuccess",e,u))},function(b){e==s.current&&a.$broadcast("$routeChangeError",
e,u,b)})}function l(){var a,b;d.forEach(h,function(c,h){var g;if(g=!b){var k=f.path();g=c.keys;var m={};if(c.regexp)if(k=c.regexp.exec(k)){for(var l=1,n=k.length;l<n;++l){var p=g[l-1],q=k[l];p&&q&&(m[p.name]=q)}g=m}else g=null;else g=null;g=a=g}g&&(b=r(c,{params:d.extend({},f.search(),a),pathParams:a}),b.$$route=c)});return b||h[null]&&r(h[null],{params:{},pathParams:{}})}function t(a,b){var c=[];d.forEach((a||"").split(":"),function(a,d){if(0===d)c.push(a);else{var f=a.match(/(\w+)(?:[?*])?(.*)/),
h=f[1];c.push(b[h]);c.push(f[2]||"");delete b[h]}});return c.join("")}var w=!1,p,v,s={routes:h,reload:function(){w=!0;a.$evalAsync(function(){m();n()})},updateParams:function(a){if(this.current&&this.current.$$route)a=d.extend({},this.current.params,a),f.path(t(this.current.$$route.originalPath,a)),f.search(a);else throw B("norout");}};a.$on("$locationChangeStart",m);a.$on("$locationChangeSuccess",n);return s}]});var B=d.$$minErr("ngRoute");q.provider("$routeParams",function(){this.$get=function(){return{}}});
q.directive("ngView",v);q.directive("ngView",A);v.$inject=["$route","$anchorScroll","$animate"];A.$inject=["$compile","$controller","$route"]})(window,window.angular);
//# sourceMappingURL=angular-route.min.js.map
;
/**
 * State-based routing for AngularJS
 * @version v0.2.13
 * @link http://angular-ui.github.com/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="ui.router"),function(a,b,c){"use strict";function d(a,b){return M(new(M(function(){},{prototype:a})),b)}function e(a){return L(arguments,function(b){b!==a&&L(b,function(b,c){a.hasOwnProperty(c)||(a[c]=b)})}),a}function f(a,b){var c=[];for(var d in a.path){if(a.path[d]!==b.path[d])break;c.push(a.path[d])}return c}function g(a){if(Object.keys)return Object.keys(a);var c=[];return b.forEach(a,function(a,b){c.push(b)}),c}function h(a,b){if(Array.prototype.indexOf)return a.indexOf(b,Number(arguments[2])||0);var c=a.length>>>0,d=Number(arguments[2])||0;for(d=0>d?Math.ceil(d):Math.floor(d),0>d&&(d+=c);c>d;d++)if(d in a&&a[d]===b)return d;return-1}function i(a,b,c,d){var e,i=f(c,d),j={},k=[];for(var l in i)if(i[l].params&&(e=g(i[l].params),e.length))for(var m in e)h(k,e[m])>=0||(k.push(e[m]),j[e[m]]=a[e[m]]);return M({},j,b)}function j(a,b,c){if(!c){c=[];for(var d in a)c.push(d)}for(var e=0;e<c.length;e++){var f=c[e];if(a[f]!=b[f])return!1}return!0}function k(a,b){var c={};return L(a,function(a){c[a]=b[a]}),c}function l(a){var b={},c=Array.prototype.concat.apply(Array.prototype,Array.prototype.slice.call(arguments,1));for(var d in a)-1==h(c,d)&&(b[d]=a[d]);return b}function m(a,b){var c=K(a),d=c?[]:{};return L(a,function(a,e){b(a,e)&&(d[c?d.length:e]=a)}),d}function n(a,b){var c=K(a)?[]:{};return L(a,function(a,d){c[d]=b(a,d)}),c}function o(a,b){var d=1,f=2,i={},j=[],k=i,m=M(a.when(i),{$$promises:i,$$values:i});this.study=function(i){function n(a,c){if(s[c]!==f){if(r.push(c),s[c]===d)throw r.splice(0,h(r,c)),new Error("Cyclic dependency: "+r.join(" -> "));if(s[c]=d,I(a))q.push(c,[function(){return b.get(a)}],j);else{var e=b.annotate(a);L(e,function(a){a!==c&&i.hasOwnProperty(a)&&n(i[a],a)}),q.push(c,a,e)}r.pop(),s[c]=f}}function o(a){return J(a)&&a.then&&a.$$promises}if(!J(i))throw new Error("'invocables' must be an object");var p=g(i||{}),q=[],r=[],s={};return L(i,n),i=r=s=null,function(d,f,g){function h(){--u||(v||e(t,f.$$values),r.$$values=t,r.$$promises=r.$$promises||!0,delete r.$$inheritedValues,n.resolve(t))}function i(a){r.$$failure=a,n.reject(a)}function j(c,e,f){function j(a){l.reject(a),i(a)}function k(){if(!G(r.$$failure))try{l.resolve(b.invoke(e,g,t)),l.promise.then(function(a){t[c]=a,h()},j)}catch(a){j(a)}}var l=a.defer(),m=0;L(f,function(a){s.hasOwnProperty(a)&&!d.hasOwnProperty(a)&&(m++,s[a].then(function(b){t[a]=b,--m||k()},j))}),m||k(),s[c]=l.promise}if(o(d)&&g===c&&(g=f,f=d,d=null),d){if(!J(d))throw new Error("'locals' must be an object")}else d=k;if(f){if(!o(f))throw new Error("'parent' must be a promise returned by $resolve.resolve()")}else f=m;var n=a.defer(),r=n.promise,s=r.$$promises={},t=M({},d),u=1+q.length/3,v=!1;if(G(f.$$failure))return i(f.$$failure),r;f.$$inheritedValues&&e(t,l(f.$$inheritedValues,p)),M(s,f.$$promises),f.$$values?(v=e(t,l(f.$$values,p)),r.$$inheritedValues=l(f.$$values,p),h()):(f.$$inheritedValues&&(r.$$inheritedValues=l(f.$$inheritedValues,p)),f.then(h,i));for(var w=0,x=q.length;x>w;w+=3)d.hasOwnProperty(q[w])?h():j(q[w],q[w+1],q[w+2]);return r}},this.resolve=function(a,b,c,d){return this.study(a)(b,c,d)}}function p(a,b,c){this.fromConfig=function(a,b,c){return G(a.template)?this.fromString(a.template,b):G(a.templateUrl)?this.fromUrl(a.templateUrl,b):G(a.templateProvider)?this.fromProvider(a.templateProvider,b,c):null},this.fromString=function(a,b){return H(a)?a(b):a},this.fromUrl=function(c,d){return H(c)&&(c=c(d)),null==c?null:a.get(c,{cache:b,headers:{Accept:"text/html"}}).then(function(a){return a.data})},this.fromProvider=function(a,b,d){return c.invoke(a,null,d||{params:b})}}function q(a,b,e){function f(b,c,d,e){if(q.push(b),o[b])return o[b];if(!/^\w+(-+\w+)*(?:\[\])?$/.test(b))throw new Error("Invalid parameter name '"+b+"' in pattern '"+a+"'");if(p[b])throw new Error("Duplicate parameter name '"+b+"' in pattern '"+a+"'");return p[b]=new O.Param(b,c,d,e),p[b]}function g(a,b,c){var d=["",""],e=a.replace(/[\\\[\]\^$*+?.()|{}]/g,"\\$&");if(!b)return e;switch(c){case!1:d=["(",")"];break;case!0:d=["?(",")?"];break;default:d=["("+c+"|",")?"]}return e+d[0]+b+d[1]}function h(c,e){var f,g,h,i,j;return f=c[2]||c[3],j=b.params[f],h=a.substring(m,c.index),g=e?c[4]:c[4]||("*"==c[1]?".*":null),i=O.type(g||"string")||d(O.type("string"),{pattern:new RegExp(g)}),{id:f,regexp:g,segment:h,type:i,cfg:j}}b=M({params:{}},J(b)?b:{});var i,j=/([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,k=/([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,l="^",m=0,n=this.segments=[],o=e?e.params:{},p=this.params=e?e.params.$$new():new O.ParamSet,q=[];this.source=a;for(var r,s,t;(i=j.exec(a))&&(r=h(i,!1),!(r.segment.indexOf("?")>=0));)s=f(r.id,r.type,r.cfg,"path"),l+=g(r.segment,s.type.pattern.source,s.squash),n.push(r.segment),m=j.lastIndex;t=a.substring(m);var u=t.indexOf("?");if(u>=0){var v=this.sourceSearch=t.substring(u);if(t=t.substring(0,u),this.sourcePath=a.substring(0,m+u),v.length>0)for(m=0;i=k.exec(v);)r=h(i,!0),s=f(r.id,r.type,r.cfg,"search"),m=j.lastIndex}else this.sourcePath=a,this.sourceSearch="";l+=g(t)+(b.strict===!1?"/?":"")+"$",n.push(t),this.regexp=new RegExp(l,b.caseInsensitive?"i":c),this.prefix=n[0],this.$$paramNames=q}function r(a){M(this,a)}function s(){function a(a){return null!=a?a.toString().replace(/\//g,"%2F"):a}function e(a){return null!=a?a.toString().replace(/%2F/g,"/"):a}function f(a){return this.pattern.test(a)}function i(){return{strict:t,caseInsensitive:p}}function j(a){return H(a)||K(a)&&H(a[a.length-1])}function k(){for(;x.length;){var a=x.shift();if(a.pattern)throw new Error("You cannot override a type's .pattern at runtime.");b.extend(v[a.name],o.invoke(a.def))}}function l(a){M(this,a||{})}O=this;var o,p=!1,t=!0,u=!1,v={},w=!0,x=[],y={string:{encode:a,decode:e,is:f,pattern:/[^/]*/},"int":{encode:a,decode:function(a){return parseInt(a,10)},is:function(a){return G(a)&&this.decode(a.toString())===a},pattern:/\d+/},bool:{encode:function(a){return a?1:0},decode:function(a){return 0!==parseInt(a,10)},is:function(a){return a===!0||a===!1},pattern:/0|1/},date:{encode:function(a){return this.is(a)?[a.getFullYear(),("0"+(a.getMonth()+1)).slice(-2),("0"+a.getDate()).slice(-2)].join("-"):c},decode:function(a){if(this.is(a))return a;var b=this.capture.exec(a);return b?new Date(b[1],b[2]-1,b[3]):c},is:function(a){return a instanceof Date&&!isNaN(a.valueOf())},equals:function(a,b){return this.is(a)&&this.is(b)&&a.toISOString()===b.toISOString()},pattern:/[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,capture:/([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/},json:{encode:b.toJson,decode:b.fromJson,is:b.isObject,equals:b.equals,pattern:/[^/]*/},any:{encode:b.identity,decode:b.identity,is:b.identity,equals:b.equals,pattern:/.*/}};s.$$getDefaultValue=function(a){if(!j(a.value))return a.value;if(!o)throw new Error("Injectable functions cannot be called at configuration time");return o.invoke(a.value)},this.caseInsensitive=function(a){return G(a)&&(p=a),p},this.strictMode=function(a){return G(a)&&(t=a),t},this.defaultSquashPolicy=function(a){if(!G(a))return u;if(a!==!0&&a!==!1&&!I(a))throw new Error("Invalid squash policy: "+a+". Valid policies: false, true, arbitrary-string");return u=a,a},this.compile=function(a,b){return new q(a,M(i(),b))},this.isMatcher=function(a){if(!J(a))return!1;var b=!0;return L(q.prototype,function(c,d){H(c)&&(b=b&&G(a[d])&&H(a[d]))}),b},this.type=function(a,b,c){if(!G(b))return v[a];if(v.hasOwnProperty(a))throw new Error("A type named '"+a+"' has already been defined.");return v[a]=new r(M({name:a},b)),c&&(x.push({name:a,def:c}),w||k()),this},L(y,function(a,b){v[b]=new r(M({name:b},a))}),v=d(v,{}),this.$get=["$injector",function(a){return o=a,w=!1,k(),L(y,function(a,b){v[b]||(v[b]=new r(a))}),this}],this.Param=function(a,b,d,e){function f(a){var b=J(a)?g(a):[],c=-1===h(b,"value")&&-1===h(b,"type")&&-1===h(b,"squash")&&-1===h(b,"array");return c&&(a={value:a}),a.$$fn=j(a.value)?a.value:function(){return a.value},a}function i(b,c,d){if(b.type&&c)throw new Error("Param '"+a+"' has two type configurations.");return c?c:b.type?b.type instanceof r?b.type:new r(b.type):"config"===d?v.any:v.string}function k(){var b={array:"search"===e?"auto":!1},c=a.match(/\[\]$/)?{array:!0}:{};return M(b,c,d).array}function l(a,b){var c=a.squash;if(!b||c===!1)return!1;if(!G(c)||null==c)return u;if(c===!0||I(c))return c;throw new Error("Invalid squash policy: '"+c+"'. Valid policies: false, true, or arbitrary string")}function p(a,b,d,e){var f,g,i=[{from:"",to:d||b?c:""},{from:null,to:d||b?c:""}];return f=K(a.replace)?a.replace:[],I(e)&&f.push({from:e,to:c}),g=n(f,function(a){return a.from}),m(i,function(a){return-1===h(g,a.from)}).concat(f)}function q(){if(!o)throw new Error("Injectable functions cannot be called at configuration time");return o.invoke(d.$$fn)}function s(a){function b(a){return function(b){return b.from===a}}function c(a){var c=n(m(w.replace,b(a)),function(a){return a.to});return c.length?c[0]:a}return a=c(a),G(a)?w.type.decode(a):q()}function t(){return"{Param:"+a+" "+b+" squash: '"+z+"' optional: "+y+"}"}var w=this;d=f(d),b=i(d,b,e);var x=k();b=x?b.$asArray(x,"search"===e):b,"string"!==b.name||x||"path"!==e||d.value!==c||(d.value="");var y=d.value!==c,z=l(d,y),A=p(d,x,y,z);M(this,{id:a,type:b,location:e,array:x,squash:z,replace:A,isOptional:y,value:s,dynamic:c,config:d,toString:t})},l.prototype={$$new:function(){return d(this,M(new l,{$$parent:this}))},$$keys:function(){for(var a=[],b=[],c=this,d=g(l.prototype);c;)b.push(c),c=c.$$parent;return b.reverse(),L(b,function(b){L(g(b),function(b){-1===h(a,b)&&-1===h(d,b)&&a.push(b)})}),a},$$values:function(a){var b={},c=this;return L(c.$$keys(),function(d){b[d]=c[d].value(a&&a[d])}),b},$$equals:function(a,b){var c=!0,d=this;return L(d.$$keys(),function(e){var f=a&&a[e],g=b&&b[e];d[e].type.equals(f,g)||(c=!1)}),c},$$validates:function(a){var b,c,d,e=!0,f=this;return L(this.$$keys(),function(g){d=f[g],c=a[g],b=!c&&d.isOptional,e=e&&(b||!!d.type.is(c))}),e},$$parent:c},this.ParamSet=l}function t(a,d){function e(a){var b=/^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);return null!=b?b[1].replace(/\\(.)/g,"$1"):""}function f(a,b){return a.replace(/\$(\$|\d{1,2})/,function(a,c){return b["$"===c?0:Number(c)]})}function g(a,b,c){if(!c)return!1;var d=a.invoke(b,b,{$match:c});return G(d)?d:!0}function h(d,e,f,g){function h(a,b,c){return"/"===p?a:b?p.slice(0,-1)+a:c?p.slice(1)+a:a}function m(a){function b(a){var b=a(f,d);return b?(I(b)&&d.replace().url(b),!0):!1}if(!a||!a.defaultPrevented){var e=o&&d.url()===o;if(o=c,e)return!0;var g,h=j.length;for(g=0;h>g;g++)if(b(j[g]))return;k&&b(k)}}function n(){return i=i||e.$on("$locationChangeSuccess",m)}var o,p=g.baseHref(),q=d.url();return l||n(),{sync:function(){m()},listen:function(){return n()},update:function(a){return a?void(q=d.url()):void(d.url()!==q&&(d.url(q),d.replace()))},push:function(a,b,e){d.url(a.format(b||{})),o=e&&e.$$avoidResync?d.url():c,e&&e.replace&&d.replace()},href:function(c,e,f){if(!c.validates(e))return null;var g=a.html5Mode();b.isObject(g)&&(g=g.enabled);var i=c.format(e);if(f=f||{},g||null===i||(i="#"+a.hashPrefix()+i),i=h(i,g,f.absolute),!f.absolute||!i)return i;var j=!g&&i?"/":"",k=d.port();return k=80===k||443===k?"":":"+k,[d.protocol(),"://",d.host(),k,j,i].join("")}}}var i,j=[],k=null,l=!1;this.rule=function(a){if(!H(a))throw new Error("'rule' must be a function");return j.push(a),this},this.otherwise=function(a){if(I(a)){var b=a;a=function(){return b}}else if(!H(a))throw new Error("'rule' must be a function");return k=a,this},this.when=function(a,b){var c,h=I(b);if(I(a)&&(a=d.compile(a)),!h&&!H(b)&&!K(b))throw new Error("invalid 'handler' in when()");var i={matcher:function(a,b){return h&&(c=d.compile(b),b=["$match",function(a){return c.format(a)}]),M(function(c,d){return g(c,b,a.exec(d.path(),d.search()))},{prefix:I(a.prefix)?a.prefix:""})},regex:function(a,b){if(a.global||a.sticky)throw new Error("when() RegExp must not be global or sticky");return h&&(c=b,b=["$match",function(a){return f(c,a)}]),M(function(c,d){return g(c,b,a.exec(d.path()))},{prefix:e(a)})}},j={matcher:d.isMatcher(a),regex:a instanceof RegExp};for(var k in j)if(j[k])return this.rule(i[k](a,b));throw new Error("invalid 'what' in when()")},this.deferIntercept=function(a){a===c&&(a=!0),l=a},this.$get=h,h.$inject=["$location","$rootScope","$injector","$browser"]}function u(a,e){function f(a){return 0===a.indexOf(".")||0===a.indexOf("^")}function l(a,b){if(!a)return c;var d=I(a),e=d?a:a.name,g=f(e);if(g){if(!b)throw new Error("No reference point given for path '"+e+"'");b=l(b);for(var h=e.split("."),i=0,j=h.length,k=b;j>i;i++)if(""!==h[i]||0!==i){if("^"!==h[i])break;if(!k.parent)throw new Error("Path '"+e+"' not valid for state '"+b.name+"'");k=k.parent}else k=b;h=h.slice(i).join("."),e=k.name+(k.name&&h?".":"")+h}var m=y[e];return!m||!d&&(d||m!==a&&m.self!==a)?c:m}function m(a,b){z[a]||(z[a]=[]),z[a].push(b)}function o(a){for(var b=z[a]||[];b.length;)p(b.shift())}function p(b){b=d(b,{self:b,resolve:b.resolve||{},toString:function(){return this.name}});var c=b.name;if(!I(c)||c.indexOf("@")>=0)throw new Error("State must have a valid name");if(y.hasOwnProperty(c))throw new Error("State '"+c+"'' is already defined");var e=-1!==c.indexOf(".")?c.substring(0,c.lastIndexOf(".")):I(b.parent)?b.parent:J(b.parent)&&I(b.parent.name)?b.parent.name:"";if(e&&!y[e])return m(e,b.self);for(var f in B)H(B[f])&&(b[f]=B[f](b,B.$delegates[f]));return y[c]=b,!b[A]&&b.url&&a.when(b.url,["$match","$stateParams",function(a,c){x.$current.navigable==b&&j(a,c)||x.transitionTo(b,a,{inherit:!0,location:!1})}]),o(c),b}function q(a){return a.indexOf("*")>-1}function r(a){var b=a.split("."),c=x.$current.name.split(".");if("**"===b[0]&&(c=c.slice(h(c,b[1])),c.unshift("**")),"**"===b[b.length-1]&&(c.splice(h(c,b[b.length-2])+1,Number.MAX_VALUE),c.push("**")),b.length!=c.length)return!1;for(var d=0,e=b.length;e>d;d++)"*"===b[d]&&(c[d]="*");return c.join("")===b.join("")}function s(a,b){return I(a)&&!G(b)?B[a]:H(b)&&I(a)?(B[a]&&!B.$delegates[a]&&(B.$delegates[a]=B[a]),B[a]=b,this):this}function t(a,b){return J(a)?b=a:b.name=a,p(b),this}function u(a,e,f,h,m,o,p){function s(b,c,d,f){var g=a.$broadcast("$stateNotFound",b,c,d);if(g.defaultPrevented)return p.update(),B;if(!g.retry)return null;if(f.$retry)return p.update(),C;var h=x.transition=e.when(g.retry);return h.then(function(){return h!==x.transition?u:(b.options.$retry=!0,x.transitionTo(b.to,b.toParams,b.options))},function(){return B}),p.update(),h}function t(a,c,d,g,i,j){var l=d?c:k(a.params.$$keys(),c),n={$stateParams:l};i.resolve=m.resolve(a.resolve,n,i.resolve,a);var o=[i.resolve.then(function(a){i.globals=a})];return g&&o.push(g),L(a.views,function(c,d){var e=c.resolve&&c.resolve!==a.resolve?c.resolve:{};e.$template=[function(){return f.load(d,{view:c,locals:n,params:l,notify:j.notify})||""}],o.push(m.resolve(e,n,i.resolve,a).then(function(f){if(H(c.controllerProvider)||K(c.controllerProvider)){var g=b.extend({},e,n);f.$$controller=h.invoke(c.controllerProvider,null,g)}else f.$$controller=c.controller;f.$$state=a,f.$$controllerAs=c.controllerAs,i[d]=f}))}),e.all(o).then(function(){return i})}var u=e.reject(new Error("transition superseded")),z=e.reject(new Error("transition prevented")),B=e.reject(new Error("transition aborted")),C=e.reject(new Error("transition failed"));return w.locals={resolve:null,globals:{$stateParams:{}}},x={params:{},current:w.self,$current:w,transition:null},x.reload=function(){return x.transitionTo(x.current,o,{reload:!0,inherit:!1,notify:!0})},x.go=function(a,b,c){return x.transitionTo(a,b,M({inherit:!0,relative:x.$current},c))},x.transitionTo=function(b,c,f){c=c||{},f=M({location:!0,inherit:!1,relative:null,notify:!0,reload:!1,$retry:!1},f||{});var g,j=x.$current,m=x.params,n=j.path,q=l(b,f.relative);if(!G(q)){var r={to:b,toParams:c,options:f},y=s(r,j.self,m,f);if(y)return y;if(b=r.to,c=r.toParams,f=r.options,q=l(b,f.relative),!G(q)){if(!f.relative)throw new Error("No such state '"+b+"'");throw new Error("Could not resolve '"+b+"' from state '"+f.relative+"'")}}if(q[A])throw new Error("Cannot transition to abstract state '"+b+"'");if(f.inherit&&(c=i(o,c||{},x.$current,q)),!q.params.$$validates(c))return C;c=q.params.$$values(c),b=q;var B=b.path,D=0,E=B[D],F=w.locals,H=[];if(!f.reload)for(;E&&E===n[D]&&E.ownParams.$$equals(c,m);)F=H[D]=E.locals,D++,E=B[D];if(v(b,j,F,f))return b.self.reloadOnSearch!==!1&&p.update(),x.transition=null,e.when(x.current);if(c=k(b.params.$$keys(),c||{}),f.notify&&a.$broadcast("$stateChangeStart",b.self,c,j.self,m).defaultPrevented)return p.update(),z;for(var I=e.when(F),J=D;J<B.length;J++,E=B[J])F=H[J]=d(F),I=t(E,c,E===b,I,F,f);var K=x.transition=I.then(function(){var d,e,g;if(x.transition!==K)return u;for(d=n.length-1;d>=D;d--)g=n[d],g.self.onExit&&h.invoke(g.self.onExit,g.self,g.locals.globals),g.locals=null;for(d=D;d<B.length;d++)e=B[d],e.locals=H[d],e.self.onEnter&&h.invoke(e.self.onEnter,e.self,e.locals.globals);return x.transition!==K?u:(x.$current=b,x.current=b.self,x.params=c,N(x.params,o),x.transition=null,f.location&&b.navigable&&p.push(b.navigable.url,b.navigable.locals.globals.$stateParams,{$$avoidResync:!0,replace:"replace"===f.location}),f.notify&&a.$broadcast("$stateChangeSuccess",b.self,c,j.self,m),p.update(!0),x.current)},function(d){return x.transition!==K?u:(x.transition=null,g=a.$broadcast("$stateChangeError",b.self,c,j.self,m,d),g.defaultPrevented||p.update(),e.reject(d))});return K},x.is=function(a,b,d){d=M({relative:x.$current},d||{});var e=l(a,d.relative);return G(e)?x.$current!==e?!1:b?j(e.params.$$values(b),o):!0:c},x.includes=function(a,b,d){if(d=M({relative:x.$current},d||{}),I(a)&&q(a)){if(!r(a))return!1;a=x.$current.name}var e=l(a,d.relative);return G(e)?G(x.$current.includes[e.name])?b?j(e.params.$$values(b),o,g(b)):!0:!1:c},x.href=function(a,b,d){d=M({lossy:!0,inherit:!0,absolute:!1,relative:x.$current},d||{});var e=l(a,d.relative);if(!G(e))return null;d.inherit&&(b=i(o,b||{},x.$current,e));var f=e&&d.lossy?e.navigable:e;return f&&f.url!==c&&null!==f.url?p.href(f.url,k(e.params.$$keys(),b||{}),{absolute:d.absolute}):null},x.get=function(a,b){if(0===arguments.length)return n(g(y),function(a){return y[a].self});var c=l(a,b||x.$current);return c&&c.self?c.self:null},x}function v(a,b,c,d){return a!==b||(c!==b.locals||d.reload)&&a.self.reloadOnSearch!==!1?void 0:!0}var w,x,y={},z={},A="abstract",B={parent:function(a){if(G(a.parent)&&a.parent)return l(a.parent);var b=/^(.+)\.[^.]+$/.exec(a.name);return b?l(b[1]):w},data:function(a){return a.parent&&a.parent.data&&(a.data=a.self.data=M({},a.parent.data,a.data)),a.data},url:function(a){var b=a.url,c={params:a.params||{}};if(I(b))return"^"==b.charAt(0)?e.compile(b.substring(1),c):(a.parent.navigable||w).url.concat(b,c);if(!b||e.isMatcher(b))return b;throw new Error("Invalid url '"+b+"' in state '"+a+"'")},navigable:function(a){return a.url?a:a.parent?a.parent.navigable:null},ownParams:function(a){var b=a.url&&a.url.params||new O.ParamSet;return L(a.params||{},function(a,c){b[c]||(b[c]=new O.Param(c,null,a,"config"))}),b},params:function(a){return a.parent&&a.parent.params?M(a.parent.params.$$new(),a.ownParams):new O.ParamSet},views:function(a){var b={};return L(G(a.views)?a.views:{"":a},function(c,d){d.indexOf("@")<0&&(d+="@"+a.parent.name),b[d]=c}),b},path:function(a){return a.parent?a.parent.path.concat(a):[]},includes:function(a){var b=a.parent?M({},a.parent.includes):{};return b[a.name]=!0,b},$delegates:{}};w=p({name:"",url:"^",views:null,"abstract":!0}),w.navigable=null,this.decorator=s,this.state=t,this.$get=u,u.$inject=["$rootScope","$q","$view","$injector","$resolve","$stateParams","$urlRouter","$location","$urlMatcherFactory"]}function v(){function a(a,b){return{load:function(c,d){var e,f={template:null,controller:null,view:null,locals:null,notify:!0,async:!0,params:{}};return d=M(f,d),d.view&&(e=b.fromConfig(d.view,d.params,d.locals)),e&&d.notify&&a.$broadcast("$viewContentLoading",d),e}}}this.$get=a,a.$inject=["$rootScope","$templateFactory"]}function w(){var a=!1;this.useAnchorScroll=function(){a=!0},this.$get=["$anchorScroll","$timeout",function(b,c){return a?b:function(a){c(function(){a[0].scrollIntoView()},0,!1)}}]}function x(a,c,d,e){function f(){return c.has?function(a){return c.has(a)?c.get(a):null}:function(a){try{return c.get(a)}catch(b){return null}}}function g(a,b){var c=function(){return{enter:function(a,b,c){b.after(a),c()},leave:function(a,b){a.remove(),b()}}};if(j)return{enter:function(a,b,c){var d=j.enter(a,null,b,c);d&&d.then&&d.then(c)},leave:function(a,b){var c=j.leave(a,b);c&&c.then&&c.then(b)}};if(i){var d=i&&i(b,a);return{enter:function(a,b,c){d.enter(a,null,b),c()},leave:function(a,b){d.leave(a),b()}}}return c()}var h=f(),i=h("$animator"),j=h("$animate"),k={restrict:"ECA",terminal:!0,priority:400,transclude:"element",compile:function(c,f,h){return function(c,f,i){function j(){l&&(l.remove(),l=null),n&&(n.$destroy(),n=null),m&&(r.leave(m,function(){l=null}),l=m,m=null)}function k(g){var k,l=z(c,i,f,e),s=l&&a.$current&&a.$current.locals[l];if(g||s!==o){k=c.$new(),o=a.$current.locals[l];var t=h(k,function(a){r.enter(a,f,function(){n&&n.$emit("$viewContentAnimationEnded"),(b.isDefined(q)&&!q||c.$eval(q))&&d(a)}),j()});m=t,n=k,n.$emit("$viewContentLoaded"),n.$eval(p)}}var l,m,n,o,p=i.onload||"",q=i.autoscroll,r=g(i,c);c.$on("$stateChangeSuccess",function(){k(!1)}),c.$on("$viewContentLoading",function(){k(!1)}),k(!0)}}};return k}function y(a,b,c,d){return{restrict:"ECA",priority:-400,compile:function(e){var f=e.html();return function(e,g,h){var i=c.$current,j=z(e,h,g,d),k=i&&i.locals[j];if(k){g.data("$uiView",{name:j,state:k.$$state}),g.html(k.$template?k.$template:f);var l=a(g.contents());if(k.$$controller){k.$scope=e;var m=b(k.$$controller,k);k.$$controllerAs&&(e[k.$$controllerAs]=m),g.data("$ngControllerController",m),g.children().data("$ngControllerController",m)}l(e)}}}}}function z(a,b,c,d){var e=d(b.uiView||b.name||"")(a),f=c.inheritedData("$uiView");return e.indexOf("@")>=0?e:e+"@"+(f?f.state.name:"")}function A(a,b){var c,d=a.match(/^\s*({[^}]*})\s*$/);if(d&&(a=b+"("+d[1]+")"),c=a.replace(/\n/g," ").match(/^([^(]+?)\s*(\((.*)\))?$/),!c||4!==c.length)throw new Error("Invalid state ref '"+a+"'");return{state:c[1],paramExpr:c[3]||null}}function B(a){var b=a.parent().inheritedData("$uiView");return b&&b.state&&b.state.name?b.state:void 0}function C(a,c){var d=["location","inherit","reload"];return{restrict:"A",require:["?^uiSrefActive","?^uiSrefActiveEq"],link:function(e,f,g,h){var i=A(g.uiSref,a.current.name),j=null,k=B(f)||a.$current,l=null,m="A"===f.prop("tagName"),n="FORM"===f[0].nodeName,o=n?"action":"href",p=!0,q={relative:k,inherit:!0},r=e.$eval(g.uiSrefOpts)||{};b.forEach(d,function(a){a in r&&(q[a]=r[a])});var s=function(c){if(c&&(j=b.copy(c)),p){l=a.href(i.state,j,q);var d=h[1]||h[0];return d&&d.$$setStateInfo(i.state,j),null===l?(p=!1,!1):void g.$set(o,l)}};i.paramExpr&&(e.$watch(i.paramExpr,function(a){a!==j&&s(a)},!0),j=b.copy(e.$eval(i.paramExpr))),s(),n||f.bind("click",function(b){var d=b.which||b.button;if(!(d>1||b.ctrlKey||b.metaKey||b.shiftKey||f.attr("target"))){var e=c(function(){a.go(i.state,j,q)});b.preventDefault();var g=m&&!l?1:0;b.preventDefault=function(){g--<=0&&c.cancel(e)}}})}}}function D(a,b,c){return{restrict:"A",controller:["$scope","$element","$attrs",function(b,d,e){function f(){g()?d.addClass(j):d.removeClass(j)}function g(){return"undefined"!=typeof e.uiSrefActiveEq?h&&a.is(h.name,i):h&&a.includes(h.name,i)}var h,i,j;j=c(e.uiSrefActiveEq||e.uiSrefActive||"",!1)(b),this.$$setStateInfo=function(b,c){h=a.get(b,B(d)),i=c,f()},b.$on("$stateChangeSuccess",f)}]}}function E(a){var b=function(b){return a.is(b)};return b.$stateful=!0,b}function F(a){var b=function(b){return a.includes(b)};return b.$stateful=!0,b}var G=b.isDefined,H=b.isFunction,I=b.isString,J=b.isObject,K=b.isArray,L=b.forEach,M=b.extend,N=b.copy;b.module("ui.router.util",["ng"]),b.module("ui.router.router",["ui.router.util"]),b.module("ui.router.state",["ui.router.router","ui.router.util"]),b.module("ui.router",["ui.router.state"]),b.module("ui.router.compat",["ui.router"]),o.$inject=["$q","$injector"],b.module("ui.router.util").service("$resolve",o),p.$inject=["$http","$templateCache","$injector"],b.module("ui.router.util").service("$templateFactory",p);var O;q.prototype.concat=function(a,b){var c={caseInsensitive:O.caseInsensitive(),strict:O.strictMode(),squash:O.defaultSquashPolicy()};return new q(this.sourcePath+a+this.sourceSearch,M(c,b),this)},q.prototype.toString=function(){return this.source},q.prototype.exec=function(a,b){function c(a){function b(a){return a.split("").reverse().join("")}function c(a){return a.replace(/\\-/,"-")}var d=b(a).split(/-(?!\\)/),e=n(d,b);return n(e,c).reverse()}var d=this.regexp.exec(a);if(!d)return null;b=b||{};var e,f,g,h=this.parameters(),i=h.length,j=this.segments.length-1,k={};if(j!==d.length-1)throw new Error("Unbalanced capture group in route '"+this.source+"'");for(e=0;j>e;e++){g=h[e];var l=this.params[g],m=d[e+1];for(f=0;f<l.replace;f++)l.replace[f].from===m&&(m=l.replace[f].to);m&&l.array===!0&&(m=c(m)),k[g]=l.value(m)}for(;i>e;e++)g=h[e],k[g]=this.params[g].value(b[g]);return k},q.prototype.parameters=function(a){return G(a)?this.params[a]||null:this.$$paramNames},q.prototype.validates=function(a){return this.params.$$validates(a)},q.prototype.format=function(a){function b(a){return encodeURIComponent(a).replace(/-/g,function(a){return"%5C%"+a.charCodeAt(0).toString(16).toUpperCase()})}a=a||{};var c=this.segments,d=this.parameters(),e=this.params;if(!this.validates(a))return null;var f,g=!1,h=c.length-1,i=d.length,j=c[0];for(f=0;i>f;f++){var k=h>f,l=d[f],m=e[l],o=m.value(a[l]),p=m.isOptional&&m.type.equals(m.value(),o),q=p?m.squash:!1,r=m.type.encode(o);if(k){var s=c[f+1];if(q===!1)null!=r&&(j+=K(r)?n(r,b).join("-"):encodeURIComponent(r)),j+=s;else if(q===!0){var t=j.match(/\/$/)?/\/?(.*)/:/(.*)/;j+=s.match(t)[1]}else I(q)&&(j+=q+s)}else{if(null==r||p&&q!==!1)continue;K(r)||(r=[r]),r=n(r,encodeURIComponent).join("&"+l+"="),j+=(g?"&":"?")+(l+"="+r),g=!0}}return j},r.prototype.is=function(){return!0},r.prototype.encode=function(a){return a},r.prototype.decode=function(a){return a},r.prototype.equals=function(a,b){return a==b},r.prototype.$subPattern=function(){var a=this.pattern.toString();return a.substr(1,a.length-2)},r.prototype.pattern=/.*/,r.prototype.toString=function(){return"{Type:"+this.name+"}"},r.prototype.$asArray=function(a,b){function d(a,b){function d(a,b){return function(){return a[b].apply(a,arguments)}}function e(a){return K(a)?a:G(a)?[a]:[]}function f(a){switch(a.length){case 0:return c;case 1:return"auto"===b?a[0]:a;default:return a}}function g(a){return!a}function h(a,b){return function(c){c=e(c);var d=n(c,a);return b===!0?0===m(d,g).length:f(d)}}function i(a){return function(b,c){var d=e(b),f=e(c);if(d.length!==f.length)return!1;for(var g=0;g<d.length;g++)if(!a(d[g],f[g]))return!1;return!0}}this.encode=h(d(a,"encode")),this.decode=h(d(a,"decode")),this.is=h(d(a,"is"),!0),this.equals=i(d(a,"equals")),this.pattern=a.pattern,this.$arrayMode=b}if(!a)return this;if("auto"===a&&!b)throw new Error("'auto' array mode is for query parameters only");return new d(this,a)},b.module("ui.router.util").provider("$urlMatcherFactory",s),b.module("ui.router.util").run(["$urlMatcherFactory",function(){}]),t.$inject=["$locationProvider","$urlMatcherFactoryProvider"],b.module("ui.router.router").provider("$urlRouter",t),u.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider"],b.module("ui.router.state").value("$stateParams",{}).provider("$state",u),v.$inject=[],b.module("ui.router.state").provider("$view",v),b.module("ui.router.state").provider("$uiViewScroll",w),x.$inject=["$state","$injector","$uiViewScroll","$interpolate"],y.$inject=["$compile","$controller","$state","$interpolate"],b.module("ui.router.state").directive("uiView",x),b.module("ui.router.state").directive("uiView",y),C.$inject=["$state","$timeout"],D.$inject=["$state","$stateParams","$interpolate"],b.module("ui.router.state").directive("uiSref",C).directive("uiSrefActive",D).directive("uiSrefActiveEq",D),E.$inject=["$state"],F.$inject=["$state"],b.module("ui.router.state").filter("isState",E).filter("includedByState",F)}(window,window.angular);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//















;
(function() {
    var tracking = angular.module('tracking', ['ui.router', 'ngAnimate', 'templates', 'duScroll', 'ui.bootstrap']);

tracking.config(['$httpProvider', function ($httpProvider) {
  //Reset headers to avoid OPTIONS request (aka preflight)
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
}]);

    tracking.service('isInvited', [

        //to track invited freelancers

        function() {
            var invitedFreelancers = [];

            return {
                //Add freelancer to the list
                messageUser: function() {
                    return;
                },
                addFreelancers: function(key, user) {
                    user.invited = true;
                    invitedFreelancers.push({
                        key: key,
                        user: user
                    });
                    return invitedFreelancers;
                },
                getInvited: function() {
                    return invitedFreelancers;
                },
            };
        }
    ]);
    tracking.service('searchQuery', ['$http', 
                 function($http) {
                return {
                    //Add freelancer to the list
                    getResults: function(searchString) {

                        var page = 0;
                        var freelancerCount = 10;

                        $http({
                            method: 'GET',
                            url: 'http://match.dev.svc.odesk.com/search/b/v1/profiles?q='+ searchString,
                            params: {
                                dynamic_facets:1, 
                                paging: page+';'+freelancerCount
                            }
                        }).success(function(data){
                            // With the data succesfully returned, call our callback
                            return data;
                        }).error(function(){
                            console.log("Request Failed");
                        });
                }
            };
        }
    ]);


    //Routes
    tracking.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/search');

            $stateProvider

            // HOME STATES ========================================
            .state('atsHome', {
                url: '/',
                templateUrl: 'ats-header.html'
            })

            // NESTED VIEWS =================================
            .state('atsHome.search', {
                url: 'search?q&page',
                resolve: {
                    getSuggestions: ["$http",
                        function($http) {
                            return $http.get('assets/freelancers.json')
                                .success(function(data) {
                                    return data;
                                });

                        }
                    ]
                },
                controller: ['$scope', 'getSuggestions', '$stateParams',
                    function($scope, getSuggestions, $stateParams) {                    

                        $scope.searchResults = getSuggestions.data.data;
                        angular.forEach(getSuggestions.data.data, function(value, key) {

                        });
                    }
                ],
                templateUrl: 'suggestions.html'

            })
                .state('atsHome.search.profile', {
                    url: '/profile/:userId',
                    resolve: {
                        getSuggestions: ["$http",
                            function($http) {
                                return $http.get('assets/freelancers.json')
                                    .success(function(data) {
                                        return data;
                                    });
                            }
                        ]
                    },
                    views: {
                        'profile': {
                            templateUrl: 'profile.html',
                            controller: ['$scope', 'getSuggestions', '$stateParams',
                                function($scope, getSuggestions, $stateParams) {

                                    $scope.user = getSuggestions.data['' + $stateParams.userId];
                                    $scope.invitedFreelancers = isInvited.getInvited();

                                    $scope.key = $stateParams.userId.toString();



                                    for (var i in $scope.invitedFreelancers) {

                                        if ($scope.key === $scope.invitedFreelancers[i].key) {
                                            $scope.invited[$scope.key] = $scope.key;
                                        }

                                    }
                                }
                            ]
                        }
                    }
                });
        }
    ]);



    tracking.controller('MainApp', ['$rootScope', '$state', '$stateParams',
        function($rootScope, $state) {
            $rootScope.$state = $state;
            $rootScope.applicantCount = 0;
            $rootScope.messagedCount = 0;
            $rootScope.pageTitle = 'Your applicant list is empty.';
            $rootScope.pageSubtitle = 'Empty lists are no fun, get the hiring ball rolling by inviting <a>suggested freelancers</a>';
            $rootScope.iconType = 'oIconUser';
            $rootScope.invited = [];

            for (var i in $rootScope.invitedFreelancers) {
                var key = $rootScope.invitedFreelancers[i].key;
                $rootScope.invited[key] = key;
            }

        }
    ]);
tracking.controller('searchController', ['$scope', 'searchQuery', '$state', '$stateParams', 
    function($scope, searchQuery, $state, $stateParams) {

/* FINSIHED HERE  - NEED TO FIGURE OUT HOW TO GET Q TO SET FROM STATEPARAM*/
        console.log($stateParams.q);

        if ($stateParams.q) {
           $scope.query = $stateParams.q;  
        } else {
            $scope.query = '';
        }

        $scope.search = function() { 

            $scope.searchResults = searchQuery.getResults($scope.query);
            $state.go("atsHome.search", {q: $scope.query});
            $scope.query = $stateParams.q;
        };
}]);
    tracking.controller('TagController', ['$scope', '$http', '$filter',
        function($scope, $http, $filter) {
            $http.get('assets/tags.json')
                .success(function(data) {
                    $scope.searchTags = data;

                });
            $scope.notSorted = function(obj) {
                if (!obj) {
                    return [];
                }
                return Object.keys(obj);
            };
            $scope.objLength = function(items) {
                var result = {};
                angular.forEach(items, function(value, key) {
                    if (value === true) {
                        result[key] = value;
                    }
                });
                return Object.keys(result);
            };
            $scope.nestedObjLength = function(items) {
                var result = {};
                angular.forEach(items, function(value, key) {
                    angular.forEach(value, function(value, key) {
                        if (value === true) {
                            result[key] = value;
                        }
                     });
                });
                return Object.keys(result);
            };
            $scope.filterSelected = function(items) {
                var result = {};
                angular.forEach(items, function(value, key) {
                    if (value === true) {
                        result[key] = value;
                    }
                });
                return result;
            };

        }
    ]);


    tracking.controller('ProfileController', ['$scope', 'applicatioFactory',
        function($scope) {

        }
    ]);

    //Controllers


    tracking.controller('resultsController', ['$scope', '$location', '$state', '$stateParams', '$rootScope', '$timeout', '$document',
        function($scope, $location, $state, $stateParams, $rootScope, $timeout, $document) {

            $scope.app = 0;

            $scope.currentPage = $stateParams.page || 1;
            $scope.itemsPerPage = 10;
            $scope.maxSize = 5;

            $scope.pageChanged = function(currentPage) {
                $document.scrollTopAnimated(200, 800);
                $rootScope.loading = true;

                $timeout(function() {
                    $rootScope.loading = false;
                }, 800);

                $scope.currentPage = $stateParams.page;
                $state.go("atsHome.search", {page: currentPage});
            }; 

            $scope.$watch('currentPage + itemsPerPage', function() {
               var begin = (($scope.currentPage - 1) * $scope.itemsPerPage), end = begin + $scope.itemsPerPage;
               $scope.searchResultsFiltered = $scope.searchResults.slice(begin, end);
            });
        }
    ]);
    tracking.directive('tagSelected', ['$document', '$rootScope', '$parse',
        function($document, $rootScope, $parse) {
            return {
                // Restrict it to be an attribute in this case
                restrict: 'A',
                scope: true,

                // responsible for registering DOM listeners as well as updating the DOM
                link: function(scope, element, attr, ctrl) {
                    /*
                    scope.allQuestionsAnswered = function() {
                        for(var i = 0 ; i < $scope.categories.length ; i++) {
                            if(! $scope.categories[i].category) {
                                return false;
                            }
                        }
                        return true;
                    };*/
                    $rootScope.dropdownShow = false;
                    $rootScope.environmentShow = false;
                    $rootScope.deviceSelected = false;

                    scope.environmentSelect = function(val) {
                         $rootScope.dropdownShow = true;
                    };
                    scope.deviceSelect = function(val) {
                        if (val === true) {
                            $rootScope.environmentShow = true;
                        }
                    };

                    scope.platformSelect = function(val, name) {

                        if (val === true) {
                            $rootScope.deviceSelected = true;
                        }
                        scope.selectedPlatforms = name;

                    };
                }
            };
        }
    ]);
    /*
tracking.directive('buttonCheck', function($parse) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, element, attr, ctrl, ngModel) {
            
            element.bind('click', function() {
                var checked = ctrl.$viewValue;
                $scope.$apply(function(scope) {
                    ctrl.$setViewValue(!checked);
                });
            });

            $scope.$watch(attr.ngModel, function(newValue, oldValue) {
                newValue ? element.addClass('isActive') : element.removeClass('isActive');
            });
        }
    };
});*/

    tracking.directive('dropdownMenu', ['$document',
        function($document) {
            return {
                // Restrict it to be an attribute in this case
                restrict: 'A',
                scope: true,

                // responsible for registering DOM listeners as well as updating the DOM
                link: function(scope, element, e) {



                    scope.isOpen = false;

                    scope.toggleSelect = function() {

                        scope.isOpen = !scope.isOpen;
                    };
                    element.find('.oDropdownIcon').bind('click', function() {
                        $(this).toggleClass('active');
                    });

                    $document.bind('click', function(e) {
                        event.stopPropagation();
                        var isClickedElementChildOfPopup = element
                            .find(e.target)
                            .length > 0;
                        if (isClickedElementChildOfPopup)
                            return;
                        scope.isOpen = false;
                        scope.$apply();
                        element.find('.oDropdownIcon').removeClass('active');
                    });



                }
            };
        }
    ]);
    tracking.directive('stopEvent', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                element.bind(attr.stopEvent, function(e) {
                    e.stopPropagation();
                });
            }
        };
    });
    tracking.directive('multiselect',['$document', function($document){
            return {
              restrict: 'A',
              require: '?ngModel',
              scope: true,
              link: function(scope, element, attr){
                
                  scope.isPopupVisible = false;
            
                  scope.toggleSelect = function(){
                    scope.isPopupVisible = !scope.isPopupVisible;
                    console.log(scope.isPopupVisible);
                  };
            
                  $document.bind('click', function(event){
                    var isClickedElementChildOfPopup = element
                      .find(event.target)
                      .length > 0;
                      
                    if (isClickedElementChildOfPopup)
                      return;
                      
                    scope.isPopupVisible = false;
                    scope.$apply();
                  });
              }
            };
        }]);
    tracking.directive('helpTip', ["$document",
        function($document) {
            return {
                // Restrict it to be an attribute in this case
                restrict: 'E',
                templateUrl: 'PulseToolTip.html',
                // responsible for registering DOM listeners as well as updating the DOM
                link: function(scope, element) {
                    scope.tipOpen = false;

                    var topOffset = element.find('.oFlyout').outerHeight();

                    element.find('.oFlyout').css({
                        "top": "-" + topOffset + "px",
                        "left": "-191px"
                    });

                    element.find('.pulse').click(function() {
                        scope.tipOpen = !scope.tipOpen;
                        element.find('.oFlyout').removeClass('fadeOutDown').addClass('fadeInUp');
                    });

                    $document.bind('click', function(event) {
                        var isChild = element
                            .find(event.target)
                            .length > 0;

                        if (isChild) return;

                        scope.tipOpen = false;
                    });
                    element.find('.oBtnPrimary').click(function() {
                        scope.tipOpen = false;
                        element.find('.pulse').addClass('hide');

                    });

                }
            };
        }
    ]);
    tracking.directive('standardTile', [ function() {
            return {
                // Restrict it to be an attribute in this case
                restrict: 'E',
                templateUrl: 'standard-tile.html',
                // responsible for registering DOM listeners as well as updating the DOM
                link: function(scope, element) {}
            };
        }
    ]);
    tracking.directive('platdevSet', [ function() {
            return {
                // Restrict it to be an attribute in this case
                restrict: 'E',
                templateUrl: 'platdev-section.html',
                // responsible for registering DOM listeners as well as updating the DOM
                link: function(scope, element) {}
            };
        }
    ]);
    tracking.directive('taskroleSet', [ function() {
            return {
                // Restrict it to be an attribute in this case
                restrict: 'E',
                templateUrl: 'taskrole-section.html',
                // responsible for registering DOM listeners as well as updating the DOM
                link: function(scope, element) {}
            };
        }
    ]);
    tracking.directive('jobpostSet', [ function() {
            return {
                // Restrict it to be an attribute in this case
                restrict: 'E',
                templateUrl: 'jobpost-section.html',
                // responsible for registering DOM listeners as well as updating the DOM
                link: function(scope, element) {}
            };
        }
    ]);


        tracking.directive('xpdetailsSet', [ function() {
            return {
                // Restrict it to be an attribute in this case
                restrict: 'E',
                templateUrl: 'xpDetails-section.html',
                // responsible for registering DOM listeners as well as updating the DOM
                link: function(scope, element) {}
            };
        }
    ]);
    tracking.filter('words', [
        function() {
            return function(input, words) {
                if (isNaN(words)) return input;
                if (words <= 0) return '';
                if (input) {
                    var inputWords = input.split(/\s+/);
                    if (inputWords.length > words) {
                        input = inputWords.slice(0, words).join(' ') + '...';
                    }
                }
                return input;
            };
        }
    ]);

    tracking.filter('unsafe', ['$sce',
        function($sce) {
            return function(val) {
                return $sce.trustAsHtml(val);
            };
        }
    ]);


    tracking.run(['$rootScope', '$state', '$stateParams',
        function($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
                // to be used for back button //won't work when page is reloaded.
                $rootScope.previousState_name = fromState.name;
                $rootScope.previousState_params = fromParams;
            });
            //back button function called from back button's ng-click="back()"
            $rootScope.back = function() {
                $state.go($rootScope.previousState_name, $rootScope.previousState_params);
            };
        }
    ]);

    tracking.filter('startFrom', [function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
        };
    }]);

})();
!function(e,n){"function"==typeof define&&define.amd?define(n):"object"==typeof exports?module.exports=n(require,exports,module):e.ouibounce=n()}(this,function(){return function(e,n){function o(e,n){return"undefined"==typeof e?n:e}function t(e){var n=24*e*60*60*1e3,o=new Date;return o.setTime(o.getTime()+n),"; expires="+o.toUTCString()}function i(){T.addEventListener("mouseleave",u),T.addEventListener("mouseenter",r),T.addEventListener("keydown",c)}function u(e){e.clientY>v||d("viewedOuibounceModal","true")&&!l||(x=setTimeout(s,k))}function r(){x&&(clearTimeout(x),x=null)}function c(e){L||d("viewedOuibounceModal","true")&&!l||e.metaKey&&76===e.keyCode&&(L=!0,x=setTimeout(s,k))}function d(e,n){return a()[e]===n}function a(){for(var e=document.cookie.split("; "),n={},o=e.length-1;o>=0;o--){var t=e[o].split("=");n[t[0]]=t[1]}return n}function s(){f(),y()}function f(){e&&(e.style.display="block"),m()}function m(e){var e=e||{};"undefined"!=typeof e.cookieExpire&&(E=t(e.cookieExpire)),e.sitewide===!0&&(w=";path=/"),"undefined"!=typeof e.cookieDomain&&(b=";domain="+e.cookieDomain),document.cookie="viewedOuibounceModal=true"+E+b+w,T.removeEventListener("mouseleave",u),T.removeEventListener("mouseenter",r),T.removeEventListener("keydown",c)}var n=n||{},l=n.aggressive||!1,v=o(n.sensitivity,20),p=o(n.timer,1e3),k=o(n.delay,0),y=n.callback||function(){},E=t(n.cookieExpire)||"",b=n.cookieDomain?";domain="+n.cookieDomain:"",w=n.sitewide===!0?";path=/":"",x=null,T=document.documentElement;setTimeout(i,p);var L=!1;return{fire:f,disable:m}}});
var duScrollDefaultEasing=function(e){"use strict";return.5>e?Math.pow(2*e,2)/2:1-Math.pow(2*(1-e),2)/2};angular.module("duScroll",["duScroll.scrollspy","duScroll.smoothScroll","duScroll.scrollContainer","duScroll.spyContext","duScroll.scrollHelpers"]).value("duScrollDuration",350).value("duScrollSpyWait",100).value("duScrollGreedy",!1).value("duScrollOffset",0).value("duScrollEasing",duScrollDefaultEasing),angular.module("duScroll.scrollHelpers",["duScroll.requestAnimation"]).run(["$window","$q","cancelAnimation","requestAnimation","duScrollEasing","duScrollDuration","duScrollOffset",function(e,t,n,r,o,l,u){"use strict";var i={},c=function(e){return"undefined"!=typeof HTMLDocument&&e instanceof HTMLDocument||e.nodeType&&e.nodeType===e.DOCUMENT_NODE},a=function(e){return"undefined"!=typeof HTMLElement&&e instanceof HTMLElement||e.nodeType&&e.nodeType===e.ELEMENT_NODE},s=function(e){return a(e)||c(e)?e:e[0]};i.duScrollTo=function(t,n,r){var o;if(angular.isElement(t)?o=this.duScrollToElement:angular.isDefined(r)&&(o=this.duScrollToAnimated),o)return o.apply(this,arguments);var l=s(this);return c(l)?e.scrollTo(t,n):(l.scrollLeft=t,void(l.scrollTop=n))};var d,f;i.duScrollToAnimated=function(e,l,u,i){u&&!i&&(i=o);var c=this.duScrollLeft(),a=this.duScrollTop(),s=Math.round(e-c),p=Math.round(l-a),m=null,g=0,S=this,h="scroll mousedown mousewheel touchmove keydown",v=function(e){(!e||g&&e.which>0)&&(S.unbind(h,v),n(d),f.reject(),d=null)};if(d&&v(),f=t.defer(),0===u||!s&&!p)return 0===u&&S.duScrollTo(e,l),f.resolve(),f.promise;var y=function(e){null===m&&(m=e),g=e-m;var t=g>=u?1:i(g/u);S.scrollTo(c+Math.ceil(s*t),a+Math.ceil(p*t)),1>t?d=r(y):(S.unbind(h,v),d=null,f.resolve())};return S.duScrollTo(c,a),S.bind(h,v),d=r(y),f.promise},i.duScrollToElement=function(e,t,n,r){var o=s(this);(!angular.isNumber(t)||isNaN(t))&&(t=u);var l=this.duScrollTop()+s(e).getBoundingClientRect().top-t;return a(o)&&(l-=o.getBoundingClientRect().top),this.duScrollTo(0,l,n,r)},i.duScrollLeft=function(t,n,r){if(angular.isNumber(t))return this.duScrollTo(t,this.duScrollTop(),n,r);var o=s(this);return c(o)?e.scrollX||document.documentElement.scrollLeft||document.body.scrollLeft:o.scrollLeft},i.duScrollTop=function(t,n,r){if(angular.isNumber(t))return this.duScrollTo(this.duScrollLeft(),t,n,r);var o=s(this);return c(o)?e.scrollY||document.documentElement.scrollTop||document.body.scrollTop:o.scrollTop},i.duScrollToElementAnimated=function(e,t,n,r){return this.duScrollToElement(e,t,n||l,r)},i.duScrollTopAnimated=function(e,t,n){return this.duScrollTop(e,t||l,n)},i.duScrollLeftAnimated=function(e,t,n){return this.duScrollLeft(e,t||l,n)},angular.forEach(i,function(e,t){angular.element.prototype[t]=e;var n=t.replace(/^duScroll/,"scroll");angular.isUndefined(angular.element.prototype[n])&&(angular.element.prototype[n]=e)})}]),angular.module("duScroll.polyfill",[]).factory("polyfill",["$window",function(e){"use strict";var t=["webkit","moz","o","ms"];return function(n,r){if(e[n])return e[n];for(var o,l=n.substr(0,1).toUpperCase()+n.substr(1),u=0;u<t.length;u++)if(o=t[u]+l,e[o])return e[o];return r}}]),angular.module("duScroll.requestAnimation",["duScroll.polyfill"]).factory("requestAnimation",["polyfill","$timeout",function(e,t){"use strict";var n=0,r=function(e){var r=(new Date).getTime(),o=Math.max(0,16-(r-n)),l=t(function(){e(r+o)},o);return n=r+o,l};return e("requestAnimationFrame",r)}]).factory("cancelAnimation",["polyfill","$timeout",function(e,t){"use strict";var n=function(e){t.cancel(e)};return e("cancelAnimationFrame",n)}]),angular.module("duScroll.spyAPI",["duScroll.scrollContainerAPI"]).factory("spyAPI",["$rootScope","$timeout","$window","$document","scrollContainerAPI","duScrollGreedy","duScrollSpyWait",function(e,t,n,r,o,l,u){"use strict";var i=function(o){var i=!1,c=!1,a=function(){c=!1;var t,u=o.container,i=u[0],a=0;"undefined"!=typeof HTMLElement&&i instanceof HTMLElement||i.nodeType&&i.nodeType===i.ELEMENT_NODE?(a=i.getBoundingClientRect().top,t=Math.round(i.scrollTop+i.clientHeight)>=i.scrollHeight):t=Math.round(n.pageYOffset+n.innerHeight)>=r[0].body.scrollHeight;var s,d,f,p,m,g,S=t?"bottom":"top";for(p=o.spies,d=o.currentlyActive,f=void 0,s=0;s<p.length;s++)m=p[s],g=m.getTargetPosition(),g&&(t||g.top+m.offset-a<20&&(l||-1*g.top+a)<g.height)&&(!f||f[S]<g[S])&&(f={spy:m},f[S]=g[S]);f&&(f=f.spy),d===f||l&&!f||(d&&(d.$element.removeClass("active"),e.$broadcast("duScrollspy:becameInactive",d.$element)),f&&(f.$element.addClass("active"),e.$broadcast("duScrollspy:becameActive",f.$element)),o.currentlyActive=f)};return u?function(){i?c=!0:(a(),i=t(function(){i=!1,c&&a()},u,!1))}:a},c={},a=function(e){var t=e.$id,n={spies:[]};return n.handler=i(n),c[t]=n,e.$on("$destroy",function(){s(e)}),t},s=function(e){var t=e.$id,n=c[t],r=n.container;r&&r.off("scroll",n.handler),delete c[t]},d=a(e),f=function(e){return c[e.$id]?c[e.$id]:e.$parent?f(e.$parent):c[d]},p=function(e){var t,n,r=e.$scope;if(r)return f(r);for(n in c)if(t=c[n],-1!==t.spies.indexOf(e))return t},m=function(e){for(;e.parentNode;)if(e=e.parentNode,e===document)return!0;return!1},g=function(e){var t=p(e);t&&(t.spies.push(e),t.container&&m(t.container)||(t.container&&t.container.off("scroll",t.handler),t.container=o.getContainer(e.$scope),t.container.on("scroll",t.handler).triggerHandler("scroll")))},S=function(e){var t=p(e);e===t.currentlyActive&&(t.currentlyActive=null);var n=t.spies.indexOf(e);-1!==n&&t.spies.splice(n,1),e.$element=null};return{addSpy:g,removeSpy:S,createContext:a,destroyContext:s,getContextForScope:f}}]),angular.module("duScroll.scrollContainerAPI",[]).factory("scrollContainerAPI",["$document",function(e){"use strict";var t={},n=function(e,n){var r=e.$id;return t[r]=n,r},r=function(e){return t[e.$id]?e.$id:e.$parent?r(e.$parent):void 0},o=function(n){var o=r(n);return o?t[o]:e},l=function(e){var n=r(e);n&&delete t[n]};return{getContainerId:r,getContainer:o,setContainer:n,removeContainer:l}}]),angular.module("duScroll.smoothScroll",["duScroll.scrollHelpers","duScroll.scrollContainerAPI"]).directive("duSmoothScroll",["duScrollDuration","duScrollOffset","scrollContainerAPI",function(e,t,n){"use strict";return{link:function(r,o,l){o.on("click",function(o){if(l.href&&-1!==l.href.indexOf("#")){var u=document.getElementById(l.href.replace(/.*(?=#[^\s]+$)/,"").substring(1));if(u&&u.getBoundingClientRect){o.stopPropagation&&o.stopPropagation(),o.preventDefault&&o.preventDefault();var i=l.offset?parseInt(l.offset,10):t,c=l.duration?parseInt(l.duration,10):e,a=n.getContainer(r);a.duScrollToElement(angular.element(u),isNaN(i)?0:i,isNaN(c)?0:c)}}})}}}]),angular.module("duScroll.spyContext",["duScroll.spyAPI"]).directive("duSpyContext",["spyAPI",function(e){"use strict";return{restrict:"A",scope:!0,compile:function(){return{pre:function(t){e.createContext(t)}}}}}]),angular.module("duScroll.scrollContainer",["duScroll.scrollContainerAPI"]).directive("duScrollContainer",["scrollContainerAPI",function(e){"use strict";return{restrict:"A",scope:!0,compile:function(){return{pre:function(t,n,r){r.$observe("duScrollContainer",function(r){angular.isString(r)&&(r=document.getElementById(r)),r=angular.isElement(r)?angular.element(r):n,e.setContainer(t,r),t.$on("$destroy",function(){e.removeContainer(t)})})}}}}}]),angular.module("duScroll.scrollspy",["duScroll.spyAPI"]).directive("duScrollspy",["spyAPI","duScrollOffset","$timeout","$rootScope",function(e,t,n,r){"use strict";var o=function(e,t,n,r){angular.isElement(e)?this.target=e:angular.isString(e)&&(this.targetId=e),this.$scope=t,this.$element=n,this.offset=r};return o.prototype.getTargetElement=function(){return!this.target&&this.targetId&&(this.target=document.getElementById(this.targetId)),this.target},o.prototype.getTargetPosition=function(){var e=this.getTargetElement();return e?e.getBoundingClientRect():void 0},o.prototype.flushTargetCache=function(){this.targetId&&(this.target=void 0)},{link:function(l,u,i){var c,a=i.ngHref||i.href;a&&-1!==a.indexOf("#")?c=a.replace(/.*(?=#[^\s]+$)/,"").substring(1):i.duScrollspy&&(c=i.duScrollspy),c&&n(function(){var n=new o(c,l,u,-(i.offset?parseInt(i.offset,10):t));e.addSpy(n),l.$on("$destroy",function(){e.removeSpy(n)}),l.$on("$locationChangeSuccess",n.flushTargetCache.bind(n)),r.$on("$stateChangeSuccess",n.flushTargetCache.bind(n))},0,!1)}}}]);
//# sourceMappingURL=angular-scroll.min.js.map
;
/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.12.1 - 2015-02-20
 * License: MIT
 */

angular.module("ui.bootstrap",["ui.bootstrap.tpls","ui.bootstrap.pagination"]),angular.module("ui.bootstrap.tpls",["template/pagination/pager.html","template/pagination/pagination.html"]),angular.module("ui.bootstrap.pagination",[]).controller("PaginationController",["$scope","$attrs","$parse",function(e,t,a){var n=this,i={$setViewValue:angular.noop},r=t.numPages?a(t.numPages).assign:angular.noop;this.init=function(r,o){i=r,this.config=o,i.$render=function(){n.render()},t.itemsPerPage?e.$parent.$watch(a(t.itemsPerPage),function(t){n.itemsPerPage=parseInt(t,10),e.totalPages=n.calculateTotalPages()}):this.itemsPerPage=o.itemsPerPage},this.calculateTotalPages=function(){var t=this.itemsPerPage<1?1:Math.ceil(e.totalItems/this.itemsPerPage);return Math.max(t||0,1)},this.render=function(){e.page=parseInt(i.$viewValue,10)||1},e.selectPage=function(t){e.page!==t&&t>0&&t<=e.totalPages&&(i.$setViewValue(t),i.$render())},e.getText=function(t){return e[t+"Text"]||n.config[t+"Text"]},e.noPrevious=function(){return 1===e.page},e.noNext=function(){return e.page===e.totalPages},e.$watch("totalItems",function(){e.totalPages=n.calculateTotalPages()}),e.$watch("totalPages",function(t){r(e.$parent,t),e.page>t?e.selectPage(t):i.$render()})}]).constant("paginationConfig",{itemsPerPage:10,boundaryLinks:!1,directionLinks:!0,firstText:"First",previousText:"Previous",nextText:"Next",lastText:"Last",rotate:!0}).directive("pagination",["$parse","paginationConfig",function(e,t){return{restrict:"EA",scope:{totalItems:"=",firstText:"@",previousText:"@",nextText:"@",lastText:"@"},require:["pagination","?ngModel"],controller:"PaginationController",templateUrl:"template/pagination/pagination.html",replace:!0,link:function(a,n,i,r){function o(e,t,a){return{number:e,text:t,active:a}}function l(e,t){var a=[],n=1,i=t,r=angular.isDefined(u)&&t>u;r&&(p?(n=Math.max(e-Math.floor(u/2),1),i=n+u-1,i>t&&(i=t,n=i-u+1)):(n=(Math.ceil(e/u)-1)*u+1,i=Math.min(n+u-1,t)));for(var l=n;i>=l;l++){var s=o(l,l,l===e);a.push(s)}if(r&&!p){if(n>1){var g=o(n-1,"...",!1);a.unshift(g)}if(t>i){var c=o(i+1,"...",!1);a.push(c)}}return a}var s=r[0],g=r[1];if(g){var u=angular.isDefined(i.maxSize)?a.$parent.$eval(i.maxSize):t.maxSize,p=angular.isDefined(i.rotate)?a.$parent.$eval(i.rotate):t.rotate;a.boundaryLinks=angular.isDefined(i.boundaryLinks)?a.$parent.$eval(i.boundaryLinks):t.boundaryLinks,a.directionLinks=angular.isDefined(i.directionLinks)?a.$parent.$eval(i.directionLinks):t.directionLinks,s.init(g,t),i.maxSize&&a.$parent.$watch(e(i.maxSize),function(e){u=parseInt(e,10),s.render()});var c=s.render;s.render=function(){c(),a.page>0&&a.page<=a.totalPages&&(a.pages=l(a.page,a.totalPages))}}}}}]).constant("pagerConfig",{itemsPerPage:10,previousText:"« Previous",nextText:"Next »",align:!0}).directive("pager",["pagerConfig",function(e){return{restrict:"EA",scope:{totalItems:"=",previousText:"@",nextText:"@"},require:["pager","?ngModel"],controller:"PaginationController",templateUrl:"template/pagination/pager.html",replace:!0,link:function(t,a,n,i){var r=i[0],o=i[1];o&&(t.align=angular.isDefined(n.align)?t.$parent.$eval(n.align):e.align,r.init(o,e))}}}]),angular.module("template/pagination/pager.html",[]).run(["$templateCache",function(e){e.put("template/pagination/pager.html",'<ul class="pager">\n  <li ng-class="{disabled: noPrevious(), previous: align}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-class="{disabled: noNext(), next: align}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n</ul>')}]),angular.module("template/pagination/pagination.html",[]).run(["$templateCache",function(e){e.put("template/pagination/pagination.html",'<ul class="pagination">\n  <li ng-if="boundaryLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(1)">{{getText(\'first\')}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-repeat="page in pages track by $index" ng-class="{active: page.active}"><a href ng-click="selectPage(page.number)">{{page.text}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n  <li ng-if="boundaryLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(totalPages)">{{getText(\'last\')}}</a></li>\n</ul>')}]);
// Angular Rails Templates 0.1.3
//
// angular_templates.ignore_prefix: ["templates/"]
// angular_templates.markups: ["erb", "str"]
// angular_templates.htmlcompressor: false

angular.module("templates", []);

// Angular Rails Template
// source: app/assets/templates/PulseToolTip.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("PulseToolTip.html", '<span class="pulse" ng-click="toolTip()"></span>\n\n<div class="oFlyout isTop oFlyoutGuide" ng-show="tipOpen">\n<div class="oFlyoutArrow" style="bottom: -8px;"></div>\n<div class="oBd">\n    <h1 class="oH1 oTxtMega p">How fast did they work?</h1>\n        <div class="oTxtMed oMute">\n            When messaging the freelancer try to figure out how long this took them. \n            <br>\n            <br>\n            Lower cost freelancers can end up costing more then expensive freelancers when you take into account speed.\n            <!--A $15/hr might not be the best choice if they take twice as long as a $30/hr freelancer.-->\n        </div>\n        <footer class="oRight">\n            <button class="oBtn oBtnPrimary">Got it</button>\n        </footer>\n    </aside>\n</div>\n</div>')
}]);

// Angular Rails Template
// source: app/assets/templates/TagSection.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("TagSection.html", '<div class="tagGroup">\n    <div class="oTagSet">\n    <!-- Platform -->\n        <label class="oBtnBox oBtnBoxSocial jsFancyCheckboxItem oPointer" ng-repeat="(platform, key) in searchTags.Tags.platforms" ng-class="{isActive: key}" >\n            <input type="checkbox" ng-model="searchTags.Tags.platforms[platform]" ng-change="platformSelect(searchTags.Tags.platforms[platform], platform); " tag-selected>\n            <i class="oImg oSocialImg oIconWindows"></i>\n            <span ng-bind="platform"></span>\n        </label>\n    </div>\n    <!-- Devices -->\n    <div class="oTagSet" ng-show="deviceSelected">\n        <label class="oBtnBox oBtnBoxSocial jsFancyCheckboxItem oPointer" ng-repeat="(device, key) in searchTags.Tags.devices" ng-class="{isActive: searchTags.Tags.devices[device]}">\n            <input type="checkbox" ng-model="searchTags.Tags.devices[device]" ng-change="deviceSelect(searchTags.Tags.devices[device])" tag-selected>\n            <i class="oImg oSocialImg oIconWindows"></i>\n            <span ng-bind="device"></span>\n        </label>\n    </div>\n    <!-- Environment -->\n    <div class="oTagSet" ng-show="environmentShow">\n        <label class="oBtnBox oBtnBoxSocial jsFancyCheckboxItem oPointer" ng-repeat="(environment, key) in searchTags.Tags.environments" ng-class="{isActive: searchTags.Tags.environments[environment]}">\n            <input type="checkbox" ng-model="searchTags.Tags.environments[environment]" ng-change="environmentSelect(searchTags.Tags.environments[environment])" tag-selected>\n            <i class="oImg oSocialImg oIconWindows"></i>\n            <span ng-bind="environment"></span>\n        </label>\n    </div>\n    <div class="p-med">\n        <button class="btn btn-primary" ng-disabled="validateCheck(searchTags.Tags)">UPDATE RESULTS &amp; CONTINUE</button>\n    </div>\n</div>')
}]);

// Angular Rails Template
// source: app/assets/templates/applicants.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("applicants.html", '<article class="oGuidance oMed">\n    <i class="oImg oATSIconBig" ng-class="iconType"></i>\n    <div class="oBd">\n        <h1 class="oH1Huge" ng-bind="pageTitle"></h1>\n        <p class="oMute oTxtLarge" ng-bind-html="pageSubtitle | unsafe">\n        </p>\n    </div>\n</article>\n\n<section class="oListLite jsSearchResults oATS" ng-controller="ApplicantsController as applications">\n    <div class="articleHeader" ng-controller="MessagesController">\n        <standard-tile ng-if="activeDay === 3"></standard-tile>\n    </div>\n    <!--<div class="articleHeader" ng-controller="RecommendedController">\n        <recommended-tile ng-if="activeDay >= 2"></recommended-tile>\n    </div>-->\n    <div class="articleHeader" ng-controller="otherController">\n        <standard-tile ng-if="activeDay >= 2"></standard-tile>\n    </div>\n    <div class="articleHeader" ng-controller="hiddenController">\n        <standard-tile ng-if="hasHidden === true"></standard-tile>\n    </div>\n    <div class="articleHeader" ng-controller="pendingController">\n        <standard-tile ng-if="invitedFreelancers.length >= 1"></standard-tile>\n    </div>\n    <div class="articleHeader" ng-controller="withdrawnController" scroll-bookmark="withdrawn">\n        <standard-tile ng-if="activeDay === 3"></standard-tile>\n    </div>\n    <div class="profile-overlay animated" ui-view="application" ng-show="$state.includes(\'atsHome.applicants.application\')" ui-sref="atsHome.applicants"></div>\n</section>\n\n<section class="oMessageContainer" ng-controller="messageController" data-user-id="{{key}}">\n    <section style="display:none;">\n        <div class="oMessageModule ng-hide-remove" ng-show="showMessage" ng-class="{minimize: min === true, sent: sent === true, hidden: hidden === true}" message-module>\n        </div>\n    </section>\n</section>')
}]);

// Angular Rails Template
// source: app/assets/templates/ats-header.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("ats-header.html", '<div class="page-header">\n    <h1 class="oH1Huge">Mobile Developers</h1>\n    <div ng-controller="searchController">\n    <form class="inline main-search" ng-submit="search(query)">\n        <input type="text" name="q" ng-model="query" placeholder="Search freelancers" class="search-input" />\n        <button class="btn btn-default inline" type="submit">Search Freelancers </button>\n    </form>\n    </div>\n</div>\n<div id="main" ng-controller="MainApp" role="main" ng-class="{active: $state.includes(\'atsHome.suggestions.profile\') || $state.includes(\'atsHome.applicants.application\')}" class="oPageCentered ats-container animated" current-path>\n    <div class="oLayout oLayoutSearch txtMiddle">\n        <div class="job-container">\n            <div class="oTagContainer" ng-controller="TagController as tag">\n                <div class="dropdown">\n                    <div class="filter">\n                        <a>\n                            <span>Development - Mobile development</span>\n                        </a>\n                        <div class="arrow"></div>\n                        <div class="drop-down" ng-show="open7">\n                        </div>\n                    </div>\n                </div>\n                <div class="dropdown" ng-show="dropdownOne" choices="options" selected="selectedOptions" multiselect>\n                    <div class="filter" ng-click="toggleSelect()" ng-class="{active: isPopupVisible}">\n                        <a>\n                            <span ng-show="!objLength(searchTags.Tags.platforms).length && !objLength(searchTags.Tags.environments).length">Choose a platform</span>\n                            <span ng-repeat="(platform, key) in filterSelected(searchTags.Tags.platforms)" ng-bind="platform + (($last && !objLength(searchTags.Tags.environments).length) ? \'\' :  \', \')"></span>\n                            <span ng-repeat="(environment, key) in filterSelected(searchTags.Tags.environments)" ng-bind="environment + ($last ? \'\' : \', \')"></span>\n                        </a>\n                        <div class="arrow"></div>\n                        <div class="drop-down" ng-show="isPopupVisible">\n                            <platdev-set></platdev-set>\n                        </div>\n                    </div>\n                </div>\n                <div class="dropdown" ng-show="dropdownTwo" choices="options" selected="selectedOptions" multiselect>\n                    <div class="filter" ng-click="toggleSelect()" ng-class="{active: isPopupVisible}">\n                        <a>\n                            <span ng-show="!objLength(searchTags.Tags.roles).length">Choose a role or task</span>\n                            <span ng-repeat="(role, key) in filterSelected(searchTags.Tags.roles)" ng-bind="role + ($last ? \'\' : \',&nbsp;\' )"></span>\n                        </a>\n                        <div class="arrow"></div>\n                        <div class="drop-down" ng-show="isPopupVisible">\n                            <taskrole-set></taskrole-set>\n                        </div>\n                    </div>\n                </div>\n                <div class="dropdown" ng-show="dropdownThree === true">\n                    <div class="filter" ng-click="open3 = !open3" ng-init="open3 = false" ng-class="{active: open3}">\n                        <a>\n                            <span ng-show="!objLength(searchTags.Tags.experiences).length && !objLength(searchTags.Tags.types).length">Choose a role or task</span>\n                            <span ng-repeat="(experience, key) in filterSelected(searchTags.Tags.experiences)" ng-bind="experience + (($last && !objLength(searchTags.Tags.types).length) ? \'\' : \',&nbsp;\' )"></span>\n                            <span ng-repeat="(type, key) in filterSelected(searchTags.Tags.types)" ng-bind="type + ($last ? \'\' : \',&nbsp;\' )"></span>\n                        </a>\n                        <div class="arrow"></div>\n                        <div class="drop-down" ng-show="open3 === true">\n                            <xpdetails-set></xpdetails-set>\n                        </div>\n                    </div>\n                </div>\n                <hr>\n                <div class="search-panel ani-transition" ng-class="{condensed: tab === 4}">\n                    <div class="ani-transition" ng-class="{invisible: tab === 4}">\n                        <span class="dot" ng-class="{active : tab === 1}" ng-click="tab = 1"></span>\n                        <span class="dot" ng-class="{active : tab === 2}" ng-click="tab = 2"></span>\n                        <span class="dot" ng-class="{active : tab === 3}" ng-click="tab = 3"></span>\n                    </div>\n                    <platdev-set class="animated" ng-init="tab = 1" ng-show="tab === 1"></platdev-set>\n                    <taskrole-set class="animated" ng-show="tab === 2"></taskrole-set>\n                    <xpdetails-set class="animated" ng-show="tab === 3"></xpdetails-set>\n                    <jobpost-set class="animated" ng-show="tab === 4"></jobpost-set>\n                </div>\n                <div class="content" ui-view></div>\n            </div>\n        </div>')
}]);

// Angular Rails Template
// source: app/assets/templates/ats.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("ats.html", "<h1>Tried</h1>")
}]);

// Angular Rails Template
// source: app/assets/templates/header.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("header.html", '<header class="oTransitionalHeader">\n    <div class="cols oPageCentered">\n        <div class="col col1of2 txtLeft">\n            <a class="oTransitionalPageLogo" href="/">oDesk</a>\n        </div>\n        <div class="col col1of2 txtRight">\n            <nav class="linksContainer">\n                <a  id="login">Account Name </a>\n            </nav>\n        </div>\n    </div>\n</header>')
}]);

// Angular Rails Template
// source: app/assets/templates/helpOverlay.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("helpOverlay.html", '<i class="oHelpIcon txtMiddle"></i>\n<strong class="oSubtleLink">Common questions &amp; tips</strong>\n<div id="help-modal" style="display: none;">\n    <div class="underlay"></div>\n    <div class="modal">\n        <button class="oPreviewDialogCloseBtn oRight jsDialogClose"></button>\n        <header>\n            <h1 class="oH1 oHInline oTxtLarge"><a>Help &amp; Tips</a> > Messaging</h3>\n                <div class="oRight">\n                    <i class="oHelpIcon txtMiddle"></i>\n                    <a>Contact Support</a>\n                </div>\n        </header>\n        <div class="oTabLite">\n            <ul>\n                <li class="active">Common questions</li>\n                <li class="oMute">Tips &amp; Videos</li>\n            </ul>\n        </div>\n        <ul class="oListLite">\n            <li class="oTxtEnlarged">\n                <h3 class="p">How quickly do freelancers respond to messages? How long should I wait?</h3>\n                <div class="oMute oTxtMed p LHLarge">\n                    It can take up to a day for a freelancer to respond, don’t wait! Not all freelancers will respond right away, its a good idea to message multiple freelancers\n                </div>\n            </li>\n            <li class="oTxtEnlarged">\n                <h3 class="p">What kinds of questions should I be asking my freelancers?\n                </h3>\n                <div class="oMute oTxtMed p LHLarge">\n                    It can depend on the category as well as the length of the job. The first thing to do is figure out if they read the description and fully understand what the job entails. It doesn’t matter if your description was detailed or not, If they ask more questions about your job that is a great sign. This will also help you guage a few things this freelancer. How are their communication skills? How is their ability to comprehend what you want done?\n                </div>\n            </li>\n            <li class="oTxtEnlarged">\n                <h3 class="p">Can I use chat or email outside of oDesk to talk with my freelancers?</h3>\n                <div class="oMute oTxtMed p LHLarge">\n                    <p class="p">Yes its a great idea to talk or chat with a potential hire using 3rd party applications like skype or google hangouts. A great way to talk about your project is on a chat app like skype, or google chat.\n                    </p>\n                    <p>Pro tip — If your worried sharing your account, create a new skype or google account for oDesk. Its a great way to keep your oDesk contacts organised as well!</p>\n                </div>\n            </li>\n        </ul>\n\n    </div>')
}]);

// Angular Rails Template
// source: app/assets/templates/hired.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("hired.html", '                <article class="oGuidance oMed">\n        <i class="oImg oATSIconBig oHiredIcon"></i>\n        <div class="oBd">\n            <h1 class="oH1Huge">No hires so far.. </h1>\n            <p class="oMute oTxtLarge">Eager to learn more about what happens after you hire? You\'ll find lots of usful info in the <a>how managing works guide</a></p>\n        </div>\n    </article>\n')
}]);

// Angular Rails Template
// source: app/assets/templates/interview.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("interview.html", '            <div class="panel animated">\n<section class="oListLite jsSearchResults">\n\n    <article class="oContractorTile jsSimilarTile oProfileTileLead searchResultHover" id="profile_5341051" data-position="11" data-id="5341051" data-qm="~01c95771650053def3">\n\n        <div class="cols">\n            <div class="col col1of8 oImg">\n                <img id="portrait_1" class="oPortraitLarge" alt="Lee C." src="https://odesk-prod-portraits.s3.amazonaws.com/Users:leechen07:PortraitUrl_100?AWSAccessKeyId=1XVAX3FNQZAFC9GJCFR2&amp;Expires=2147483647&amp;Signature=MCWJvMNBODWvDmSMgSd5nImzdj0%3D">\n            </div>\n\n            <div class="cols col col7of8">\n                <div class="cols p">\n                    <div class="col col6of8">\n                        <hgroup class="oProfileTileTitle">\n                            <h1 class="oRowTitle">\n\n\n                                <a title="Lee C." class="jsContractorProfileLink oHInline" data-user-id="5341051" href="#">Lee C.</a>\n                            </h1>\n\n                            <h3>\n                                Super Talented Unity3D, Corona, Xamarin Developer</h3>\n                        </hgroup>\n                    </div>\n\n                    <div class="col col2of8 oRight txtRight">\n\n                        <a title="Contact" class="oBtn oBtnSecondary jsContactContractor" data-user-id="5341051" href="#">Contact</a> \n                    </div>\n                </div>\n\n                <div class="cols">\n                    <div class="col col4of8">\n\n                        <div class="oDescription">\n                            <div class="jsTruncated">\n                                To build a Top 1 app, this is my rule. ✪✪✪✪✪ I LOVE Mobiles. Mobiles Will Change The World With Creative Ideas and Endless Efforts. ✪✪✪✪✪ I am a programer with experience in Unity3D, Corona SDK, Xamarin.&nbsp;…\n                                <span class="oMore oMoreSmall">more</span>\n                            </div>\n                            <div class="jsFull isHidden">\n                                <div>To build a Top 1 app, this is my rule. ✪✪✪✪✪ I LOVE Mobiles. Mobiles Will Change The World With Creative Ideas and Endless Efforts. ✪✪✪✪✪ I am a programer with experience in Unity3D, Corona SDK, Xamarin. Self-directed and motivated Mobile Developer with 7+ years\' experience in Objective C/XCode, Java/J2EE, C/C++ and PHP technologies. Excellent at developing and maintaining client/server applications. I am hardworking and a fast learner with good communication skills and a strong design background. Client satisfaction and quality work are my TOP PRIORITIES. I have strong experience in the iPhone(iOS6 + iPhone5)/iPad(iPad mini) and Android development as well as backend web service. I also have some experience in the following areas: SQLite database, Restful JSON based Web Service, Social Network - Facebook, Twitter, Google API, Audio Streaming, Video Streaming. Development Area: 1) Applications ✔ iPhone, iPod, iPad, Android, Titanium, PhoneGap ✔ design, cocoa, cocoa-touch, obje&nbsp;…&nbsp;</div>\n                                <div>\n                                    <span class="oMore oMoreSmall">less</span>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="oSupportInfo">\n\n\n\n                            <strong class="jsCountry">\n                                China</strong>\n                            &nbsp;-&nbsp; Last active:&nbsp;\n                            <span class="jsActivity">\n                                8 days ago</span>\n\n                            &nbsp;-&nbsp; Tests:\n                            <a class="jsTests" href="#">4</a>\n                            &nbsp;-&nbsp; Portfolio:\n                            <a class="jsPortfolio" href="#">31</a>\n                        </div>\n                    </div>\n\n                    <div class="col oSkills">\n                        <strong>Skills</strong>\n                        <div class="jsSkills oSkills">\n                            <a data-skill="objective-c" class="oSkill isVerified oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=objective-c">objective-c</a>  <a data-skill="iphone-app-development" class="oSkill oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=iphone-app-development">iphone-app-development</a>  <a data-skill="android-app-development" class="oSkill oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=android-app-development">android-app-development</a>  <a data-skill="corona-sdk" class="oSkill oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=corona-sdk">corona-sdk</a>\n                            <a title="View all skills" href="/users/Super-Talented-Unity3D-Corona-Xamarin-Developer_%7E01c95771650053def3?tot=30&amp;pos=10">…</a> \n                        </div>\n                    </div>\n\n                    <div class="col txtRight oRateFeedbackHours">\n                        <div class="oTxtLarge jsRate">\n                            $55.56\n                            <span class="oRateTime">/hr</span>\n                        </div>\n\n                        <div class="oTxtLarge jsHours">\n                            22\n                            <span class="oRateTime">hours</span>\n                        </div>\n\n                        <div class="nowrap">\n\n\n                            <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 5 reviews" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                <div class="oStarsValue" style="width:100%"></div>\n                            </div>\n\n                            <span class="oStarsTotal oStarsMedium">(5.00)</span>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </article>\n\n\n\n\n    <article class="oContractorTile jsSimilarTile oProfileTileLead" id="profile_4963394" data-position="12" data-id="4963394" data-qm="~01a484073dbdb80861">\n\n        <div class="cols">\n            <div class="col col1of8 oImg">\n                <img id="portrait_2" class="oPortraitLarge" alt="Woo PhunMin" src="https://odesk-prod-portraits.s3.amazonaws.com/Users:woopmin:PortraitUrl_100?AWSAccessKeyId=1XVAX3FNQZAFC9GJCFR2&amp;Expires=2147483647&amp;Signature=qJNXDwstNpHYWrAurqnKviSAMO0%3D">\n            </div>\n\n            <div class="cols col col7of8">\n                <div class="cols p">\n                    <div class="col col6of8">\n                        <hgroup class="oProfileTileTitle">\n                            <h1 class="oRowTitle">\n\n\n                                <a title="Woo PhunMin" class="jsContractorProfileLink oHInline" data-user-id="4963394" href="#">Woo PhunMin</a>\n                            </h1>\n\n                            <h3>\n                                Expert iOS/Android/Web Developer</h3>\n                        </hgroup>\n                    </div>\n\n                    <div class="col col2of8 oRight txtRight">\n\n                        <a title="Contact" class="oBtn oBtnSecondary jsContactContractor" data-user-id="4963394" href="#">Contact</a> \n                    </div>\n                </div>\n\n                <div class="cols">\n                    <div class="col col4of8">\n\n                        <div class="oDescription">\n                            <div class="jsTruncated">\n                                *** Certified iOS/Android Mobile app developer*** Over the last 5 years, I have developed a wide range of Mobile app using iOS(iPhone, iPad), Android(Phone, Tablet) including web site for mobile.&nbsp;…\n                                <span class="oMore oMoreSmall">more</span>\n                            </div>\n                            <div class="jsFull isHidden">\n                                <div>*** Certified iOS/Android Mobile app developer*** Over the last 5 years, I have developed a wide range of Mobile app using iOS(iPhone, iPad), Android(Phone, Tablet) including web site for mobile. I have created many iPhone/iPad(iOS) and Android apps using Web services such as PHP, MySQL, HTML5, CSS, etc at different scales for mobile app. I am always open to exploring and creating new mobile app and awesome stuff. ✮✮✮✮ I believe in "QUALITY" not "QUANTITY" ✮✮✮✮ Services that I provide : - OS X, iOS(iPhone, iPad), Android, Windows, Linux - iPhone, iPad, iPod Application Development, iPhone Support, iPad UI Android Development, Android SDK, iOS, iOS development, Mobile Applications. - GPS(iPhone/Android), Google Map, MapKit, GeoLocation, CoreLocation, CoreDate, CoreLocation on mobile SDK - Object C, C++, Java, Java Script - In-App Purchase(iPhone/Android), iAd, AdMob(iPhone/Android), AdWhirl, TapJoy, RevMob(iPhone/Android), Flurry(iPhone/Android), ChartBoost : iOS(iPhone/iPad) and A&nbsp;…&nbsp;</div>\n                                <div>\n                                    <span class="oMore oMoreSmall">less</span>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="oSupportInfo">\n\n\n\n                            <strong class="jsCountry">\n                                Malaysia</strong>\n                            &nbsp;-&nbsp; Last active:&nbsp;\n                            <span class="jsActivity">\n                                13 days ago</span>\n\n                            &nbsp;-&nbsp; Tests:\n                            <a class="jsTests" href="#">6</a>\n                            &nbsp;-&nbsp; Portfolio:\n                            <a class="jsPortfolio" href="#">9</a>\n                        </div>\n                    </div>\n\n                    <div class="col oSkills">\n                        <strong>Skills</strong>\n                        <div class="jsSkills oSkills">\n                            <a data-skill="c++" class="oSkill isVerified oTagSmall oTag" data-contractor="~01a484073dbdb80861" href="/contractors/?qs=c%2B%2B">c++</a>  <a data-skill="objective-c" class="oSkill isVerified oTagSmall oTag" data-contractor="~01a484073dbdb80861" href="/contractors/?qs=objective-c">objective-c</a>  <a data-skill="ios-development" class="oSkill oTagSmall oTag" data-contractor="~01a484073dbdb80861" href="/contractors/?qs=ios-development">ios-development</a>  <a data-skill="mobile-app-development" class="oSkill oTagSmall oTag" data-contractor="~01a484073dbdb80861" href="/contractors/?qs=mobile-app-development">mobile-app-development</a>\n                            <a title="View all skills" href="/users/Expert-iOS-Android-Web-Developer_%7E01a484073dbdb80861?tot=30&amp;pos=11">…</a> \n                        </div>\n                    </div>\n\n                    <div class="col txtRight oRateFeedbackHours">\n                        <div class="oTxtLarge jsRate">\n                            $45.00\n                            <span class="oRateTime">/hr</span>\n                        </div>\n\n                        <div class="oTxtLarge jsHours">\n                            221\n                            <span class="oRateTime">hours</span>\n                        </div>\n\n                        <div class="nowrap">\n\n\n                            <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 5 reviews" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                <div class="oStarsValue" style="width:100%"></div>\n                            </div>\n\n                            <span class="oStarsTotal oStarsMedium">(5.00)</span>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </article>\n\n\n\n\n    <article class="oContractorTile jsSimilarTile oProfileTileLead" id="profile_4733042" data-position="13" data-id="4733042" data-qm="~017035455ff4767be8">\n\n        <div class="cols">\n            <div class="col col1of8 oImg">\n                <img id="portrait_3" class="oPortraitLarge" alt="Li Wen" src="https://odesk-prod-portraits.s3.amazonaws.com/Users:liwen0923:PortraitUrl_100?AWSAccessKeyId=1XVAX3FNQZAFC9GJCFR2&amp;Expires=2147483647&amp;Signature=QjRXB%2BrRHdwQM1ig37HoKwGje%2Fg%3D">\n            </div>\n\n            <div class="cols col col7of8">\n                <div class="cols p">\n                    <div class="col col6of8">\n                        <hgroup class="oProfileTileTitle">\n                            <h1 class="oRowTitle">\n\n\n                                <a title="Li Wen" class="jsContractorProfileLink oHInline" data-user-id="4733042" href="#">Li Wen</a>\n                            </h1>\n\n                            <h3>\n                                Creative Mobile Developer (Photo/Video/Social/GPS/Web)</h3>\n                        </hgroup>\n                    </div>\n\n                    <div class="col col2of8 oRight txtRight">\n\n                        <a title="Contact" class="oBtn oBtnSecondary jsContactContractor" data-user-id="4733042" href="#">Contact</a> \n                    </div>\n                </div>\n\n                <div class="cols">\n                    <div class="col col4of8">\n\n                        <div class="oDescription">\n                            <div class="jsTruncated">\n                                I am a developer who has rich experience for 7 years and almost published 50 pluse applications for my clients. I focus hight quality, fast speed, daily communication and do my best to keep good relationship.&nbsp;…\n                                <span class="oMore oMoreSmall">more</span>\n                            </div>\n                            <div class="jsFull isHidden">\n                                <div>I am a developer who has rich experience for 7 years and almost published 50 pluse applications for my clients. I focus hight quality, fast speed, daily communication and do my best to keep good relationship. I am available to chat by Skype or eMail, IM and would be happy to set up a convenient time to discuss the project you`re moving and some ideas. - Key Skill * Photo , Video , Audio Manipulation * Web Service Integration &amp; Web Server Building * Google Map Service, Foursquare * Web Service, Ajax, XML, JSON, RSS, SOAP, WSDL * MySQL, SQLite, HTML5, PHP, JSP * Video/Audio Streaming * Social Media Applications like Facebook, Twitter * Integrating with iAd, Adwirl, Admob, Chartboost, TapJoy, Cerebro * Business analysis system like Flurry * ePayment ability using like Apple\'s in app purchase, Paypal, Braintreepayment * Push Notification by using APNS * CoreData, CoreGraphics, Animation - Key Experience * Simple and graceful User interface sense * Co-operation experience with team memb&nbsp;…&nbsp;</div>\n                                <div>\n                                    <span class="oMore oMoreSmall">less</span>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="oSupportInfo">\n\n\n\n                            <strong class="jsCountry">\n                                China</strong>\n                            &nbsp;-&nbsp; Last active:&nbsp;\n                            <span class="jsActivity">\n                                7 days ago</span>\n\n                            &nbsp;-&nbsp; Tests:\n                            <a class="jsTests" href="#">4</a>\n                            &nbsp;-&nbsp; Portfolio:\n                            <a class="jsPortfolio" href="#">6</a>\n                        </div>\n                    </div>\n\n                    <div class="col oSkills">\n                        <strong>Skills</strong>\n                        <div class="jsSkills oSkills">\n                            <a data-skill="objective-c" class="oSkill isVerified oTagSmall oTag" data-contractor="~017035455ff4767be8" href="/contractors/?qs=objective-c">objective-c</a>  <a data-skill="ios-development" class="oSkill oTagSmall oTag" data-contractor="~017035455ff4767be8" href="/contractors/?qs=ios-development">ios-development</a>  <a data-skill="apple-xcode" class="oSkill oTagSmall oTag" data-contractor="~017035455ff4767be8" href="/contractors/?qs=apple-xcode">apple-xcode</a>  <a data-skill="ipad-app-development" class="oSkill oTagSmall oTag" data-contractor="~017035455ff4767be8" href="/contractors/?qs=ipad-app-development">ipad-app-development</a>\n                            <a title="View all skills" href="/users/Creative-Mobile-Developer-Photo-Video-Social-GPS-Web_%7E017035455ff4767be8?tot=30&amp;pos=12">…</a> \n                        </div>\n                    </div>\n\n                    <div class="col txtRight oRateFeedbackHours">\n                        <div class="oTxtLarge jsRate">\n                            $35.56\n                            <span class="oRateTime">/hr</span>\n                        </div>\n\n                        <div class="oTxtLarge jsHours">\n                            424\n                            <span class="oRateTime">hours</span>\n                        </div>\n\n                        <div class="nowrap">\n\n\n                            <div class="oStarsContainer oStarsMedium" data-content="4.97 stars, based on 5 reviews" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                <div class="oStarsValue" style="width:99.334895538736%"></div>\n                            </div>\n\n                            <span class="oStarsTotal oStarsMedium">(4.97)</span>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </article>\n\n\n\n\n    <article class="oContractorTile jsSimilarTile oProfileTileLead" id="profile_5002566" data-position="14" data-id="5002566" data-qm="~016efabbe63ca03456">\n\n        <div class="cols">\n            <div class="col col1of8 oImg">\n                <img id="portrait_4" class="oPortraitLarge" alt="Zhou Chen" src="https://odesk-prod-portraits.s3.amazonaws.com/Users:brmind824:PortraitUrl_100?AWSAccessKeyId=1XVAX3FNQZAFC9GJCFR2&amp;Expires=2147483647&amp;Signature=Ikxb%2Bbf4V6BTXZTnwOtqgbUSDrU%3D">\n            </div>\n\n            <div class="cols col col7of8">\n                <div class="cols p">\n                    <div class="col col6of8">\n                        <hgroup class="oProfileTileTitle">\n                            <h1 class="oRowTitle">\n\n\n                                <a title="Zhou Chen" class="jsContractorProfileLink oHInline" data-user-id="5002566" href="#">Zhou Chen</a>\n                            </h1>\n\n                            <h3>\n                                Authenticated Mobile and Web developer</h3>\n                        </hgroup>\n                    </div>\n\n                    <div class="col col2of8 oRight txtRight">\n\n                        <a title="Contact" class="oBtn oBtnSecondary jsContactContractor" data-user-id="5002566" href="#">Contact</a> \n                    </div>\n                </div>\n\n                <div class="cols">\n                    <div class="col col4of8">\n\n                        <div class="oDescription">\n                            <div class="jsTruncated">\n                                Welcome to Zhou&amp;#039;s I&amp;#039;m professional mobile and web application developer. I started application development when I was junior at university. I became web expert around the time I graduate the school.&nbsp;…\n                                <span class="oMore oMoreSmall">more</span>\n                            </div>\n                            <div class="jsFull isHidden">\n                                <div>Welcome to Zhou&amp;#039;s I&amp;#039;m professional mobile and web application developer. I started application development when I was junior at university. I became web expert around the time I graduate the school. I started mobile app development from 2 years ago and submitted several apps on google play and app store. I came to oDesk with great expectation, and with my brilliant skills and rich practical experience, I will achieve the great success with you. - Competencies in Mobile App Development Social media integration, photo &amp; video editing, GPU processing, Cocos2d game development, Geo location based app - Capabilities iPhone/iPad/iPod, Xcode5, iOS 7, Android, Facebook, Twitter, Instagram, GoogleMap API, REST Api, Phonegap/Cordova, jQuery Mobile, Appcelerator, Titanium - Competencies in Web Development &nbsp;&nbsp;Social Media integration, Payment gateway integration, several CMS framework development and customization, Responsive web site development, Web Service development for mobile a&nbsp;…&nbsp;</div>\n                                <div>\n                                    <span class="oMore oMoreSmall">less</span>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="oSupportInfo">\n\n\n\n                            <strong class="jsCountry">\n                                China</strong>\n                            &nbsp;-&nbsp; Last active:&nbsp;\n                            <span class="jsActivity">\n                                7 days ago</span>\n\n                            &nbsp;-&nbsp; Tests:\n                            <a class="jsTests" href="#">5</a>\n                            &nbsp;-&nbsp; Portfolio:\n                            <a class="jsPortfolio" href="#">4</a>\n                        </div>\n                    </div>\n\n                    <div class="col oSkills">\n                        <strong>Skills</strong>\n                        <div class="jsSkills oSkills">\n                            <a data-skill="iphone-app-development" class="oSkill oTagSmall oTag" data-contractor="~016efabbe63ca03456" href="/contractors/?qs=iphone-app-development">iphone-app-development</a>  <a data-skill="android-app-development" class="oSkill oTagSmall oTag" data-contractor="~016efabbe63ca03456" href="/contractors/?qs=android-app-development">android-app-development</a>  <a data-skill="html" class="oSkill isVerified oTagSmall oTag" data-contractor="~016efabbe63ca03456" href="/contractors/?qs=html">html</a>  <a data-skill="css3" class="oSkill isVerified oTagSmall oTag" data-contractor="~016efabbe63ca03456" href="/contractors/?qs=css3">css3</a>\n                            <a title="View all skills" href="/users/Authenticated-Mobile-and-Web-developer_%7E016efabbe63ca03456?tot=30&amp;pos=13">…</a> \n                        </div>\n                    </div>\n\n                    <div class="col txtRight oRateFeedbackHours">\n                        <div class="oTxtLarge jsRate">\n                            $35.00\n                            <span class="oRateTime">/hr</span>\n                        </div>\n\n                        <div class="oTxtLarge jsHours">\n                            64\n                            <span class="oRateTime">hours</span>\n                        </div>\n\n                        <div class="nowrap">\n\n\n                            <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 9 reviews" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                <div class="oStarsValue" style="width:100%"></div>\n                            </div>\n\n                            <span class="oStarsTotal oStarsMedium">(5.00)</span>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </article>\n\n\n\n\n    <article class="oContractorTile jsSimilarTile oProfileTileLead" id="profile_5361749" data-position="15" data-id="5361749" data-qm="~01fbbf22b7fd9c21fe">\n\n        <div class="cols">\n            <div class="col col1of8 oImg">\n                <img id="portrait_5" class="oPortraitLarge" alt="Huang Q." src="https://odesk-prod-portraits.s3.amazonaws.com/Users:huangqiang0402:PortraitUrl_100?AWSAccessKeyId=1XVAX3FNQZAFC9GJCFR2&amp;Expires=2147483647&amp;Signature=ye1GXdO6uCYGxPryFL74kjPeKik%3D">\n            </div>\n\n            <div class="cols col col7of8">\n                <div class="cols p">\n                    <div class="col col6of8">\n                        <hgroup class="oProfileTileTitle">\n                            <h1 class="oRowTitle">\n\n\n                                <a title="Huang Q." class="jsContractorProfileLink oHInline" data-user-id="5361749" href="#">Huang Q.</a>\n                            </h1>\n\n                            <h3>\n                                Top Mobile(iOS, Android) Developer</h3>\n                        </hgroup>\n                    </div>\n\n                    <div class="col col2of8 oRight txtRight">\n\n                        <a title="Contact" class="oBtn oBtnSecondary jsContactContractor" data-user-id="5361749" href="#">Contact</a> \n                    </div>\n                </div>\n\n                <div class="cols">\n                    <div class="col col4of8">\n\n                        <div class="oDescription">\n                            <div class="jsTruncated">\n                                CERTIFICATED ODESK MOBILE DEVELOPER!!! Thanks for visiting my profile. I aim to form a long term working relationship. You can save your time and money. If you are looking for a veteran mobile application developer who:&nbsp;…\n                                <span class="oMore oMoreSmall">more</span>\n                            </div>\n                            <div class="jsFull isHidden">\n                                <div>CERTIFICATED ODESK MOBILE DEVELOPER!!! Thanks for visiting my profile. I aim to form a long term working relationship. You can save your time and money. If you are looking for a veteran mobile application developer who: - has proven experience of writing lots of mobile(iOS, Android) apps/games - has professional attitude - does very clear communication - gives great attention to detail - provide high graphic design(2D &amp; 3D) - support sound file - has fast speed and high quality - make clean coding and testing - submit your (iOS, Android) app/game in Appstore | GooglePlay After complete project, I can - support fixing bugs with free. ( Collateral term : 2 months ) - support update features with low price. 100% fluent English communication skill 100% client ongoing satisfaction with perfect quality of product 100% money back guarantee if not satisfied for any reason then you have arrived at the the right person! Followings are some areas I have experienced. 1) iOS and Android &nbsp;…&nbsp;</div>\n                                <div>\n                                    <span class="oMore oMoreSmall">less</span>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="oSupportInfo">\n\n\n\n                            <strong class="jsCountry">\n                                China</strong>\n                            &nbsp;-&nbsp; Last active:&nbsp;\n                            <span class="jsActivity">\n                                7 days ago</span>\n\n                            &nbsp;-&nbsp; Tests:\n                            <a class="jsTests" href="/users/Top-Mobile-iOS-Android-Developer_%7E01fbbf22b7fd9c21fe?tab=tests&amp;class=jsTests#tests">5</a>\n                            &nbsp;-&nbsp; Portfolio:\n                            <a class="jsPortfolio" href="/users/Top-Mobile-iOS-Android-Developer_%7E01fbbf22b7fd9c21fe?tab=portfolio#portfolio">7</a>\n                        </div>\n                    </div>\n\n                    <div class="col oSkills">\n                        <strong>Skills</strong>\n                        <div class="jsSkills oSkills">\n                            <a data-skill="objective-c" class="oSkill isVerified oTagSmall oTag" data-contractor="~01fbbf22b7fd9c21fe" href="/contractors/?qs=objective-c">objective-c</a>  <a data-skill="iphone-app-development" class="oSkill oTagSmall oTag" data-contractor="~01fbbf22b7fd9c21fe" href="/contractors/?qs=iphone-app-development">iphone-app-development</a>  <a data-skill="game-development" class="oSkill oTagSmall oTag" data-contractor="~01fbbf22b7fd9c21fe" href="/contractors/?qs=game-development">game-development</a>  <a data-skill="android-app-development" class="oSkill oTagSmall oTag" data-contractor="~01fbbf22b7fd9c21fe" href="/contractors/?qs=android-app-development">android-app-development</a>\n                            <a title="View all skills" href="/users/Top-Mobile-iOS-Android-Developer_%7E01fbbf22b7fd9c21fe?tot=30&amp;pos=14">…</a> \n                        </div>\n                    </div>\n\n                    <div class="col txtRight oRateFeedbackHours">\n                        <div class="oTxtLarge jsRate">\n                            $35.00\n                            <span class="oRateTime">/hr</span>\n                        </div>\n\n                        <div class="oTxtLarge jsHours">\n                            20\n                            <span class="oRateTime">hours</span>\n                        </div>\n\n                        <div class="nowrap">\n\n\n                            <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 3 reviews" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                <div class="oStarsValue" style="width:100%"></div>\n                            </div>\n\n                            <span class="oStarsTotal oStarsMedium">(5.00)</span>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </article>\n\n\n\n\n    <article class="oContractorTile jsSimilarTile oProfileTileLead" id="profile_3033429" data-position="16" data-id="3033429" data-qm="~015c297c3a90421af8">\n\n        <div class="cols">\n            <div class="col col1of8 oImg">\n                <img id="portrait_6" class="oPortraitLarge" alt="Anton V." src="https://odesk-prod-portraits.s3.amazonaws.com/Users:anton-vilimets:PortraitUrl_100?AWSAccessKeyId=1XVAX3FNQZAFC9GJCFR2&amp;Expires=2147483647&amp;Signature=l2P3ALIn0Vt0Us9wRaMu7ScdFms%3D">\n            </div>\n\n            <div class="cols col col7of8">\n                <div class="cols p">\n                    <div class="col col6of8">\n                        <hgroup class="oProfileTileTitle">\n                            <h1 class="oRowTitle">\n\n\n                                <a title="Anton V." class="jsContractorProfileLink oHInline" data-user-id="3033429" href="#">Anton V.</a>\n                            </h1>\n\n                            <h3>\n                                iPhone/iPad developer</h3>\n                        </hgroup>\n                    </div>\n\n                    <div class="col col2of8 oRight txtRight">\n\n                        <a title="Contact" class="oBtn oBtnSecondary jsContactContractor" data-user-id="3033429" href="#">Contact</a> \n                    </div>\n                </div>\n\n                <div class="cols">\n                    <div class="col col4of8">\n\n                        <div class="oDescription">\n                            <div class="jsTruncated">\n                                I have been developing mobile apps for the last 2 years including social networking, games, business, lifestyle, entertainment and other various kinds of apps for iOS. I have created up to 20 applications for iPhone/iPad.&nbsp;…\n                                <span class="oMore oMoreSmall">more</span>\n                            </div>\n                            <div class="jsFull isHidden">\n                                <div>I have been developing mobile apps for the last 2 years including social networking, games, business, lifestyle, entertainment and other various kinds of apps for iOS. I have created up to 20 applications for iPhone/iPad. - Web Integration(XML, JSON), Social(Facebook, Twitter, Instagram, Flicker, Dropbox, TestFlight, Flurry, Admob) - UIKit, Cocoa, In-App purchases</div>\n                                <div>\n                                    <span class="oMore oMoreSmall">less</span>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="oSupportInfo">\n\n\n\n                            <strong class="jsCountry">\n                                Ukraine</strong>\n                            &nbsp;-&nbsp; Last active:&nbsp;\n                            <span class="jsActivity">\n                                9 days ago</span>\n\n                            &nbsp;-&nbsp; Tests:\n                            <a class="jsTests" href="/users/iPhone-iPad-developer_%7E015c297c3a90421af8?tab=tests&amp;class=jsTests#tests">5</a>\n                            &nbsp;-&nbsp; Portfolio:\n                            <a class="jsPortfolio" href="/users/iPhone-iPad-developer_%7E015c297c3a90421af8?tab=portfolio#portfolio">1</a>\n                        </div>\n                    </div>\n\n                    <div class="col oSkills">\n                        <strong>Skills</strong>\n                        <div class="jsSkills oSkills">\n                            <a data-skill="iphone-app-development" class="oSkill isVerified oTagSmall oTag" data-contractor="~015c297c3a90421af8" href="/contractors/?qs=iphone-app-development">iphone-app-development</a>  <a data-skill="ios-development" class="oSkill isVerified oTagSmall oTag" data-contractor="~015c297c3a90421af8" href="/contractors/?qs=ios-development">ios-development</a>  <a data-skill="objective-c" class="oSkill isVerified oTagSmall oTag" data-contractor="~015c297c3a90421af8" href="/contractors/?qs=objective-c">objective-c</a>  <a data-skill="cocoa" class="oSkill oTagSmall oTag" data-contractor="~015c297c3a90421af8" href="/contractors/?qs=cocoa">cocoa</a>\n                            <a title="View all skills" href="/users/iPhone-iPad-developer_%7E015c297c3a90421af8?tot=30&amp;pos=15">…</a> \n                        </div>\n                    </div>\n\n                    <div class="col txtRight oRateFeedbackHours">\n                        <div class="oTxtLarge jsRate">\n                            $22.22\n                            <span class="oRateTime">/hr</span>\n                        </div>\n\n                        <div class="oTxtLarge jsHours">\n                            48\n                            <span class="oRateTime">hours</span>\n                        </div>\n\n                        <div class="nowrap">\n\n\n                            <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 2 reviews" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                <div class="oStarsValue" style="width:100%"></div>\n                            </div>\n\n                            <span class="oStarsTotal oStarsMedium">(5.00)</span>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </article>\n\n\n\n\n    <article class="oContractorTile jsSimilarTile oProfileTileLead" id="profile_5040105" data-position="17" data-id="5040105" data-qm="~01526d99db42aadb52">\n\n        <div class="cols">\n            <div class="col col1of8 oImg">\n                <img id="portrait_7" class="oPortraitLarge" alt="Luca C." src="https://odesk-prod-portraits.s3.amazonaws.com/Users:lucachrist:PortraitUrl_100?AWSAccessKeyId=1XVAX3FNQZAFC9GJCFR2&amp;Expires=2147483647&amp;Signature=%2FOsW9zxYOPsrCvOx%2Ffr1RyeFYcQ%3D">\n            </div>\n\n            <div class="cols col col7of8">\n                <div class="cols p">\n                    <div class="col col6of8">\n                        <hgroup class="oProfileTileTitle">\n                            <h1 class="oRowTitle">\n\n\n                                <a title="Luca C." class="jsContractorProfileLink oHInline" data-user-id="5040105" href="#">Luca C.</a>\n                            </h1>\n\n                            <h3>\n                                Excellent Mobile Developer</h3>\n                        </hgroup>\n                    </div>\n\n                    <div class="col col2of8 oRight txtRight">\n\n                        <a title="Contact" class="oBtn oBtnSecondary jsContactContractor" data-user-id="5040105" href="#">Contact</a> \n                    </div>\n                </div>\n\n                <div class="cols">\n                    <div class="col col4of8">\n\n                        <div class="oDescription">\n                            <div class="jsTruncated">\n                                *** Certified Mobile(iPhone/Android) app developer*** Over the last 3 years, I have developed a wide range of Mobile app using iOS(iPhone, iPad), Android(Phone, Tablet) including web site for mobile.&nbsp;…\n                                <span class="oMore oMoreSmall">more</span>\n                            </div>\n                            <div class="jsFull isHidden">\n                                <div>*** Certified Mobile(iPhone/Android) app developer*** Over the last 3 years, I have developed a wide range of Mobile app using iOS(iPhone, iPad), Android(Phone, Tablet) including web site for mobile. I have created many iPhone/iPad(iOS) and Android apps using Web services such as PHP, MySQL, HTML5, CSS, etc at different scales for mobile app. I believe my skills would be ideal for your project. I have extensive experience with all phases of application development, from requirements gathering to application architecture, from the app store submission process to maintenance and upgrades. I have brought many projects to successful completion, and hope to help you complete yours. Looking for challenging projects to apply my skills to. If I work on a project, it means that I take responsibility to make it successful Thanks! Luca\n                                </div>\n                                <div>\n                                    <span class="oMore oMoreSmall">less</span>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="oSupportInfo">\n\n\n\n                            <strong class="jsCountry">\n                                Switzerland</strong>\n                            &nbsp;-&nbsp; Last active:&nbsp;\n                            <span class="jsActivity">\n                                7 days ago</span>\n\n                            &nbsp;-&nbsp; Tests:\n                            <a class="jsTests" href="/users/Excellent-Mobile-Developer_%7E01526d99db42aadb52?tab=tests&amp;class=jsTests#tests">4</a>\n                            &nbsp;-&nbsp; Portfolio:\n                            <a class="jsPortfolio" href="/users/Excellent-Mobile-Developer_%7E01526d99db42aadb52?tab=portfolio#portfolio">3</a>\n                        </div>\n                    </div>\n\n                    <div class="col oSkills">\n                        <strong>Skills</strong>\n                        <div class="jsSkills oSkills">\n                            <a data-skill="iphone-app-development" class="oSkill oTagSmall oTag" data-contractor="~01526d99db42aadb52" href="/contractors/?qs=iphone-app-development">iphone-app-development</a>  <a data-skill="android-app-development" class="oSkill oTagSmall oTag" data-contractor="~01526d99db42aadb52" href="/contractors/?qs=android-app-development">android-app-development</a>  <a data-skill="objective-c" class="oSkill isVerified oTagSmall oTag" data-contractor="~01526d99db42aadb52" href="/contractors/?qs=objective-c">objective-c</a>  <a data-skill="php" class="oSkill oTagSmall oTag" data-contractor="~01526d99db42aadb52" href="/contractors/?qs=php">php</a>\n                            <a title="View all skills" href="/users/Excellent-Mobile-Developer_%7E01526d99db42aadb52?tot=30&amp;pos=16">…</a> \n                        </div>\n                    </div>\n\n                    <div class="col txtRight oRateFeedbackHours">\n                        <div class="oTxtLarge jsRate">\n                            $36.67\n                            <span class="oRateTime">/hr</span>\n                        </div>\n\n                        <div class="oTxtLarge jsHours">\n                            0\n                            <span class="oRateTime">hours</span>\n                        </div>\n\n                        <div class="nowrap">\n\n\n                            <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 1 review" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                <div class="oStarsValue" style="width:100%"></div>\n                            </div>\n\n                            <span class="oStarsTotal oStarsMedium">(5.00)</span>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </article>\n\n\n\n\n    <article class="oContractorTile jsSimilarTile oProfileTileLead" id="profile_5087411" data-position="18" data-id="5087411" data-qm="~01757b9258c5246dfd">\n\n        <div class="cols">\n            <div class="col col1of8 oImg">\n                <img id="portrait_8" class="oPortraitLarge" alt="Dimitar P." src="https://odesk-prod-portraits.s3.amazonaws.com/Users:dimitar-plamenov:PortraitUrl_100?AWSAccessKeyId=1XVAX3FNQZAFC9GJCFR2&amp;Expires=2147483647&amp;Signature=mU%2Bz4F4XDyDZCChh%2BqCGrh1tPXs%3D">\n            </div>\n\n            <div class="cols col col7of8">\n                <div class="cols p">\n                    <div class="col col6of8">\n                        <hgroup class="oProfileTileTitle">\n                            <h1 class="oRowTitle">\n\n\n                                <a title="Dimitar P." class="jsContractorProfileLink oHInline" data-user-id="5087411" href="#">Dimitar P.</a>\n                            </h1>\n\n                            <h3>\n                                Rockstar iOS7 Developer - Text/Voice/Video Message App Exper...</h3>\n                        </hgroup>\n                    </div>\n\n                    <div class="col col2of8 oRight txtRight">\n\n                        <a title="Contact" class="oBtn oBtnSecondary jsContactContractor" data-user-id="5087411" href="#">Contact</a> \n                    </div>\n                </div>\n\n                <div class="cols">\n                    <div class="col col4of8">\n\n                        <div class="oDescription">\n                            <div class="jsTruncated">\n                                I am an iOS developer working with Xcode, Objective-C, UIKit, iBeacon and Core Data on a daily basis.&nbsp;&nbsp;I am interested in best practices that are being adopted by the iOS community and implementing them into my work.&nbsp;…\n                                <span class="oMore oMoreSmall">more</span>\n                            </div>\n                            <div class="jsFull isHidden">\n                                <div>I am an iOS developer working with Xcode, Objective-C, UIKit, iBeacon and Core Data on a daily basis.&nbsp;&nbsp;I am interested in best practices that are being adopted by the iOS community and implementing them into my work.&nbsp;&nbsp;I am excited about the iOS platform and I enjoy staying up-to-date on where Apple is taking the technology.&nbsp;&nbsp;I love iOS 7 on iPhone 5 and I like an Apple. I have been working with native iOS development since 2010.&nbsp;&nbsp;Additionally, I have 3 years of carryover experience for web programming with Ruby on Rails and Node.js.&nbsp;&nbsp;More importantly, I am determined to be an expert in my area of practice – which, for the foreseeable future, is native iOS development. I am very familiar with using several mobile SDKs. - Facebook : Login with Facebook and get personal information, invite friends - Twitter : Login with Twitter and get their twitters - Parse : Build the web service using Parse.com - Paypal, Authorize.net, Stripe, Saleforce, card.io : Make the payment system in the mobi&nbsp;…&nbsp;</div>\n                                <div>\n                                    <span class="oMore oMoreSmall">less</span>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="oSupportInfo">\n\n\n\n                            <strong class="jsCountry">\n                                Bulgaria</strong>\n                            &nbsp;-&nbsp; Last active:&nbsp;\n                            <span class="jsActivity">\n                                7 days ago</span>\n\n                            &nbsp;-&nbsp; Tests:\n                            <a class="jsTests" href="/users/Rockstar-iOS7-Developer-Text-Voice-Video-Message-App-Expert_%7E01757b9258c5246dfd?tab=tests&amp;class=jsTests#tests">5</a>\n                            &nbsp;-&nbsp; Portfolio:\n                            <a class="jsPortfolio" href="/users/Rockstar-iOS7-Developer-Text-Voice-Video-Message-App-Expert_%7E01757b9258c5246dfd?tab=portfolio#portfolio">7</a>\n                        </div>\n                    </div>\n\n                    <div class="col oSkills">\n                        <strong>Skills</strong>\n                        <div class="jsSkills oSkills">\n                            <a data-skill="objective-c" class="oSkill isVerified oTagSmall oTag" data-contractor="~01757b9258c5246dfd" href="/contractors/?qs=objective-c">objective-c</a>  <a data-skill="ipad-app-development" class="oSkill oTagSmall oTag" data-contractor="~01757b9258c5246dfd" href="/contractors/?qs=ipad-app-development">ipad-app-development</a>  <a data-skill="iphone-app-development" class="oSkill oTagSmall oTag" data-contractor="~01757b9258c5246dfd" href="/contractors/?qs=iphone-app-development">iphone-app-development</a>  <a data-skill="ios-development" class="oSkill oTagSmall oTag" data-contractor="~01757b9258c5246dfd" href="/contractors/?qs=ios-development">ios-development</a>\n                            <a title="View all skills" href="/users/Rockstar-iOS7-Developer-Text-Voice-Video-Message-App-Expert_%7E01757b9258c5246dfd?tot=30&amp;pos=17">…</a> \n                        </div>\n                    </div>\n\n                    <div class="col txtRight oRateFeedbackHours">\n                        <div class="oTxtLarge jsRate">\n                            $38.89\n                            <span class="oRateTime">/hr</span>\n                        </div>\n\n                        <div class="oTxtLarge jsHours">\n                            322\n                            <span class="oRateTime">hours</span>\n                        </div>\n\n                        <div class="nowrap">\n\n\n                            <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 4 reviews" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                <div class="oStarsValue" style="width:100%"></div>\n                            </div>\n\n                            <span class="oStarsTotal oStarsMedium">(5.00)</span>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </article>\n\n\n\n\n    <article class="oContractorTile jsSimilarTile oProfileTileLead" id="profile_5418663" data-position="19" data-id="5418663" data-qm="~01659c2f9ba808b1f5">\n\n        <div class="cols">\n            <div class="col col1of8 oImg">\n                <img id="portrait_9" class="oPortraitLarge" alt="Huang Z." src="https://odesk-prod-portraits.s3.amazonaws.com/Users:huangzheng:PortraitUrl_100?AWSAccessKeyId=1XVAX3FNQZAFC9GJCFR2&amp;Expires=2147483647&amp;Signature=09y5DSJLU0GX4CbVU9mLizY7o5E%3D">\n            </div>\n\n            <div class="cols col col7of8">\n                <div class="cols p">\n                    <div class="col col6of8">\n                        <hgroup class="oProfileTileTitle">\n                            <h1 class="oRowTitle">\n\n\n                                <a title="Huang Z." class="jsContractorProfileLink oHInline" data-user-id="5418663" href="#">Huang Z.</a>\n                            </h1>\n\n                            <h3>\n                                iPhone/iPad/Android App Expert with Native English</h3>\n                        </hgroup>\n                    </div>\n\n                    <div class="col col2of8 oRight txtRight">\n\n                        <a title="Contact" class="oBtn oBtnSecondary jsContactContractor" data-user-id="5418663" href="#">Contact</a> \n                    </div>\n                </div>\n\n                <div class="cols">\n                    <div class="col col4of8">\n\n                        <div class="oDescription">\n                            <div class="jsTruncated">\n                                Over the last 6 years, I have developed many iPhone/iPad/Android Photo, Video, Music Processing App, Location based business App and Social Apps.&nbsp;…\n                                <span class="oMore oMoreSmall">more</span>\n                            </div>\n                            <div class="jsFull isHidden">\n                                <div>Over the last 6 years, I have developed many iPhone/iPad/Android Photo, Video, Music Processing App, Location based business App and Social Apps. For all clients, I am providing an innovative and great products using a latest mobile application technical resources. My core special range is - Photo Processing(Filter, Crop, Resize, Rendering, Drawing, OpenGL ES), - Video Processing (Filter, Crop, Composition, Compressing, Clip, Streaming, Live Streaming), - Music/Audio Processing(Steaming, Voice changing and TTS), - Weather app, - Travel app, - Sports app, - Social Networking / Social Integration, - News, RSS Feed app, - Medical knowledge app, - Health&amp;Fitness app, - Education apps. Also I have an experiences in Backend Service API, MySQL, OpenGL ES, QR/Barcode code scanning, UI/UX Graphics Design and Game. If you have a good idea, you can success from my hard working on that idea. Sincerely. Huang Zheng.</div>\n                                <div>\n                                    <span class="oMore oMoreSmall">less</span>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="oSupportInfo">\n\n\n\n                            <strong class="jsCountry">\n                                China</strong>\n                            &nbsp;-&nbsp; Last active:&nbsp;\n                            <span class="jsActivity">\n                                7 days ago</span>\n\n                            &nbsp;-&nbsp; Tests:\n                            <a class="jsTests" href="/users/iPhone-iPad-Android-App-Expert-with-Native-English_%7E01659c2f9ba808b1f5?tab=tests&amp;class=jsTests#tests">5</a>\n                            &nbsp;-&nbsp; Portfolio:\n                            <a class="jsPortfolio" href="/users/iPhone-iPad-Android-App-Expert-with-Native-English_%7E01659c2f9ba808b1f5?tab=portfolio#portfolio">8</a>\n                        </div>\n                    </div>\n\n                    <div class="col oSkills">\n                        <strong>Skills</strong>\n                        <div class="jsSkills oSkills">\n                            <a data-skill="iphone-app-development" class="oSkill oTagSmall oTag" data-contractor="~01659c2f9ba808b1f5" href="/contractors/?qs=iphone-app-development">iphone-app-development</a>  <a data-skill="ipad-app-development" class="oSkill oTagSmall oTag" data-contractor="~01659c2f9ba808b1f5" href="/contractors/?qs=ipad-app-development">ipad-app-development</a>  <a data-skill="mobile-app-development" class="oSkill oTagSmall oTag" data-contractor="~01659c2f9ba808b1f5" href="/contractors/?qs=mobile-app-development">mobile-app-development</a>  <a data-skill="ios-development" class="oSkill oTagSmall oTag" data-contractor="~01659c2f9ba808b1f5" href="/contractors/?qs=ios-development">ios-development</a>\n                            <a title="View all skills" href="/users/iPhone-iPad-Android-App-Expert-with-Native-English_%7E01659c2f9ba808b1f5?tot=30&amp;pos=18">…</a> \n                        </div>\n                    </div>\n\n                    <div class="col txtRight oRateFeedbackHours">\n                        <div class="oTxtLarge jsRate">\n                            $33.33\n                            <span class="oRateTime">/hr</span>\n                        </div>\n\n                        <div class="oTxtLarge jsHours">\n                            4\n                            <span class="oRateTime">hours</span>\n                        </div>\n\n                        <div class="nowrap">\n\n\n                            <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 1 review" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                <div class="oStarsValue" style="width:100%"></div>\n                            </div>\n\n                            <span class="oStarsTotal oStarsMedium">(5.00)</span>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </article>\n\n\n\n\n    <article class="oContractorTile jsSimilarTile oProfileTileLead" id="profile_4950529" data-position="20" data-id="4950529" data-qm="~01fb54032de8c6707d">\n\n        <div class="cols">\n            <div class="col col1of8 oImg">\n                <img id="portrait_10" class="oPortraitLarge" alt="Zhang Sheng" src="https://odesk-prod-portraits.s3.amazonaws.com/Users:zhangsheng88:PortraitUrl_100?AWSAccessKeyId=1XVAX3FNQZAFC9GJCFR2&amp;Expires=2147483647&amp;Signature=NNYH0pk5yLyFcYzGywZye%2BuV7GU%3D">\n            </div>\n\n            <div class="cols col col7of8">\n                <div class="cols p">\n                    <div class="col col6of8">\n                        <hgroup class="oProfileTileTitle">\n                            <h1 class="oRowTitle">\n\n\n                                <a title="Zhang Sheng" class="jsContractorProfileLink oHInline" data-user-id="4950529" href="#">Zhang Sheng</a>\n                            </h1>\n\n                            <h3>\n                                iOS7/iPhone/iPad/Apple/Android Expert</h3>\n                        </hgroup>\n                    </div>\n\n                    <div class="col col2of8 oRight txtRight">\n\n                        <a title="Contact" class="oBtn oBtnSecondary jsContactContractor" data-user-id="4950529" href="#">Contact</a> \n                    </div>\n                </div>\n\n                <div class="cols">\n                    <div class="col col4of8">\n\n                        <div class="oDescription">\n                            <div class="jsTruncated">\n                                Hi Clients. I think that I have received the great education and have earned the rich experience in mobile development while working in the great company. I have developed tens of apps on iOS/Android for 6 years,&nbsp;…\n                                <span class="oMore oMoreSmall">more</span>\n                            </div>\n                            <div class="jsFull isHidden">\n                                <div>Hi Clients. I think that I have received the great education and have earned the rich experience in mobile development while working in the great company. I have developed tens of apps on iOS/Android for 6 years, Through the great education and long development, I mastered the all branches of mobile techniques. To satisfy the clients\' requirements are my creed. Especially, when you have the difficult project with the tight timeline, please contact me You\'ll get the result what you want on time, if you hire me. Best Regards, Zhang Here are my Tech &amp; Skills - iOS6/iOS7/iPhone/iPad/android/Symbian/BlackBerry/Windows Mobile - iOS/iPhone/iPad/android Social Networking App, Social Media Sharing App, Social Dating App, Social Chat App - iOS/iPhone/iPad/Apple/Android Camera/Photo/Video app, Photo/Video Edition App, Photo/Video Effect App, Photo/Video Stitch App - iOS/iPhone/iPad/Apple/Android Fitness/Health App, Date Reminder App, Location Based App, Music App, Emoji App, Alarm App -&nbsp;…&nbsp;\n\n                                </div>\n                                <div>\n                                    <span class="oMore oMoreSmall">less</span>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="oSupportInfo">\n\n\n\n                            <strong class="jsCountry">\n                                Hong Kong</strong>\n                            &nbsp;-&nbsp; Last active:&nbsp;\n                            <span class="jsActivity">\n                                7 days ago</span>\n\n                            &nbsp;-&nbsp; Tests:\n                            <a class="jsTests" href="/users/iOS7-iPhone-iPad-Apple-Android-Expert_%7E01fb54032de8c6707d?tab=tests&amp;class=jsTests#tests">6</a>\n                            &nbsp;-&nbsp; Portfolio:\n                            <a class="jsPortfolio" href="/users/iOS7-iPhone-iPad-Apple-Android-Expert_%7E01fb54032de8c6707d?tab=portfolio#portfolio">10</a>\n                        </div>\n                    </div>\n\n                    <div class="col oSkills">\n                        <strong>Skills</strong>\n                        <div class="jsSkills oSkills">\n                            <a data-skill="ios-development" class="oSkill oTagSmall oTag" data-contractor="~01fb54032de8c6707d" href="/contractors/?qs=ios-development">ios-development</a>  <a data-skill="objective-c" class="oSkill isVerified oTagSmall oTag" data-contractor="~01fb54032de8c6707d" href="/contractors/?qs=objective-c">objective-c</a>  <a data-skill="android-app-development" class="oSkill isVerified oTagSmall oTag" data-contractor="~01fb54032de8c6707d" href="/contractors/?qs=android-app-development">android-app-development</a>  <a data-skill="cocoa" class="oSkill oTagSmall oTag" data-contractor="~01fb54032de8c6707d" href="/contractors/?qs=cocoa">cocoa</a>\n                            <a title="View all skills" href="/users/iOS7-iPhone-iPad-Apple-Android-Expert_%7E01fb54032de8c6707d?tot=30&amp;pos=19">…</a> \n                        </div>\n                    </div>\n\n                    <div class="col txtRight oRateFeedbackHours">\n                        <div class="oTxtLarge jsRate">\n                            $35.00\n                            <span class="oRateTime">/hr</span>\n                        </div>\n\n                        <div class="oTxtLarge jsHours">\n                            148\n                            <span class="oRateTime">hours</span>\n                        </div>\n\n                        <div class="nowrap">\n\n\n                            <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 3 reviews" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                <div class="oStarsValue" style="width:100%"></div>\n                            </div>\n\n                            <span class="oStarsTotal oStarsMedium">(5.00)</span>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </article>\n\n\n    <footer>\n        <nav class="oPagination txtRight">\n\n            <a class="oPager isCurrent">1</a>\n            <a class="oPager" href="#">2</a>  <a class="oPager" href="#">3</a> \n            <a class="oPager Prev isDisabled">Previous</a>\n\n            <a class="oPager Next" href="#">Next</a> \n        </nav>\n    </footer>\n</section>\n             </div>')
}]);

// Angular Rails Template
// source: app/assets/templates/invite-bar.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("invite-bar.html", '                <div class="invitedProfile np added">\n\n                    <img ng-src="{{invitedFreelancers[0].user.image}}"></img>\n                    <span class="oApplicantsIcon"></span>\n                </div>\n                <div class="invitedProfile np added">\n                    <img ng-src="{{invitedFreelancers[1].user.image}}"></img>\n                    <span class="oApplicantsIcon"></span>\n                </div>\n                <div class="invitedProfile np added">\n                    <img ng-src="{{invitedFreelancers[2].user.image}}"></img>\n                    <span class="oApplicantsIcon"></span>\n                </div>\n                <div class="invitedProfile np added">\n                    <img ng-src="{{invitedFreelancers[3].user.image}}"></img>\n                    <span class="oApplicantsIcon"></span>\n                </div>\n                <div class="invitedProfile np added">\n                    <img ng-src="{{invitedFreelancers[4].user.image}}"></img>\n                    <span class="oApplicantsIcon"></span>\n                </div>')
}]);

// Angular Rails Template
// source: app/assets/templates/jobpost-section.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("jobpost-section.html", '                    <h3 class="p-x-sml">Great! Review freelancers, then message or save the best ones.</h3>\n                        <h5 class="text-muted p-lrg">Or if your ready <a>post a job</a> your half way to completing it</h5>\n                    \n                    <!--<button class="btn btn-primary pull-right" ng-disabled="!nestedObjLength(searchTags.Tags).length" ng-click="tab = 4; dropdownThree = true">Post your job \n<br><span class="o-support-info">3-5 mins avg.</span></button>-->')
}]);

// Angular Rails Template
// source: app/assets/templates/message-window.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("message-window.html", '    \n                <header>\n                        <img class="oPortraitSmall oImg" ng-src="{{user.image}}"></img>\n                    <div class="ib">\n                        <h3 class="oTxtEnlarged">\n                            <a ng-bind="user.name"></a>\n                            </h1>\n                            <div class="oLocation">\n                                <strong ng-bind="user.location">London</strong>\n                                <span class="oMute">2:30am local time (8 hrs ahead)</span>\n                            </div>\n                    </div>\n                    <div class="oRight">\n                        <i class="oXIcon" ng-click="removeWindow(key, user);"></i>\n                        <i class="oMinimizeIcon" ng-click="min = !min"></i>\n                    </div>\n                </header>\n                <textarea ng-model="$parent.noticeText" placeholder="Hello!I\'d like to invite you to apply to my job. Please review the job post and\napply if you\'re available."></textarea>\n                <div class="oForm">\n                    <div class="oFormField">\n                        <label class="oLabel">Inviting to job</label>\n                        <select>\n                            <option>Ruby on rails</option>\n                            <option>Another Thing</option>\n                        </select>\n                    </div>\n                    <div ng-show="$state.includes(\'atsHome.suggestions\')" class="oBtn oBtnPrimary oRight" ng-click="userInvited(key, user); updateMessage()" send-invite>Send Invitation</div>\n                    <div ng-show="$state.includes(\'atsHome.applicants\')" class="oBtn oBtnPrimary oRight" ng-click="userMessaged(key, user); user.sent = true;" send-message>Send Message</div>\n                </div>\n')
}]);

// Angular Rails Template
// source: app/assets/templates/messaged.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("messaged.html", '                <article class="oGuidance oMed">\n        <i class="oImg oATSIconBig oHiredIcon"></i>\n        <div class="oBd">\n            <h1 class="oH1Huge">Your message box is quiet.</h1>\n            <p class="oMute oTxtLarge">Get the conversation started by asking your favorite applicants a question or two.</a></p>\n        </div>\n            <div class="articleHeader" ng-controller="MessagesController">\n       		 <standard-tile></standard-tile>\n          </div>\n    </article>\n')
}]);

// Angular Rails Template
// source: app/assets/templates/messaged_applicants.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("messaged_applicants.html", '        <h2 class="oH2Low oH2Border" ng-init="open = true" ng-click="open = !open; wayRefresh()" ng-class="{active:open === true}" sticky-bar>\n            <div class="innerWrap">\n                <i class="oHToggle animated" ng-class="{isCollapsed:open === false}"></i>\n                <span class="ib oTxtLarge txtMiddle">Messaged</span>\n            </div>\n        </h2>\n\n        <section ng-init="open = true" ng-show="open" class="applicantContent">\n            <article ng-repeat="(key, user) in messagedApplicants" class="oContractorTile jsSimilarTile oProfileTileLead searchResultHover animated" id="profile_5341051">\n\n                <div class="cols">\n                    <div class="col col1of8 oImg">\n                        <img id="portrait_1" class="oPortraitLarge" alt="user.name" ng-src="{{user.image}}">\n\n                    </div>\n\n                    <div class="cols col col7of8">\n                        <div class="cols p">\n                            <div class="col col6of8">\n                                <hgroup class="oProfileTileTitle">\n                                    <h1 class="oRowTitle">\n                                        <a title="Lee C." class="jsContractorProfileLink oHInline" data-user-id="{{key}}" ui-sref=".application({userId : {{key}} })" ng-bind="user.name"></a>\n                                    </h1>\n                                    <h3 ng-bind="user.title"></h3>\n                                </hgroup>\n                            </div>\n\n                            <div class="col col2of8 oRight txtRight npad">\n\n                                <div class="oDropdown" dropdown-menu>\n                                    <a title="Contact" class="oBtn oBtnSecondary jsContactContractor oDropdownBtn" ng-init="showMessage=false">Send Message</a>\n\n                                    <i class="oBtn oBtnSecondary oDropdownIcon" ng-click="toggleSelect()"></i>\n                                    <ul class=\'oDropdownMenu\' ng-show="isOpen">\n                                        <li>Save Freelancer</li>\n                                        <li>Start trial project</li>\n                                        <li>Hire (send offer)</li>\n                                    </ul>\n                                </div>\n                                <span class="oBtn oBtnSecondary oHideButton jsHide jsLogClickEvent" data-event-type="hide" data-id="277524504" ng-click="moveUser(key, messagedApplicants, hiddenApplicants)"><i class="oATSIconSmall oHiddenIcon jsNoToggle"></i>\n                                </span>\n                            </div>\n                        </div>\n\n                        <div class="cols">\n                            <div class="col col4of8">\n\n                                <div class="oDescription">\n                                    <div class="jsTruncated">\n                                        <span class="oTxtEnlarged" ng-bind="user.description | words:30"></span>\n                                        <span class="oMore oMoreSmall">more</span>\n                                    </div>\n                                    <div class="jsFull isHidden">\n                                        <div>To build a Top 1 app, this is my rule. ✪✪✪✪✪ I LOVE Mobiles. Mobiles Will Change The World With Creative Ideas and Endless Efforts. ✪✪✪✪✪ I am a programer with experience in Unity3D, Corona SDK, Xamarin. Self-directed and motivated Mobile Developer with 7+ years\' experience in Objective C/XCode, Java/J2EE, C/C++ and PHP technologies. Excellent at developing and maintaining client/server applications. I am hardworking and a fast learner with good communication skills and a strong design background. Client satisfaction and quality work are my TOP PRIORITIES. I have strong experience in the iPhone(iOS6 + iPhone5)/iPad(iPad mini) and Android development as well as backend web service. I also have some experience in the following areas: SQLite database, Restful JSON based Web Service, Social Network - Facebook, Twitter, Google API, Audio Streaming, Video Streaming. Development Area: 1) Applications ✔ iPhone, iPod, iPad, Android, Titanium, PhoneGap ✔ design, cocoa, cocoa-touch, obje&nbsp;…&nbsp;</div>\n                                        <div>\n                                            <span class="oMore oMoreSmall">less</span>\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <div class="oSupportInfo">\n\n                                    <strong class="jsCountry" ng-bind="user.location">\n                                    </strong>\n                                    &nbsp;-&nbsp; Last active:&nbsp;\n                                    <span class="jsActivity" ng-bind="user.lastActive"></span>\n                                    &nbsp;-&nbsp; Tests:\n                                    <a class="jsTests" href="#" ng-bind="user.test"></a>\n                                    &nbsp;-&nbsp; Portfolio:\n                                    <a class="jsPortfolio" href="#" ng-bind="user.portfolio">31</a>\n                                </div>\n                            </div>\n\n                            <div class="col oSkills">\n                                <strong>Skills</strong>\n                                <div class="jsSkills oSkills">\n                                    <a data-skill="objective-c" class="oSkill isVerified oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=objective-c">objective-c</a>  <a data-skill="iphone-app-development" class="oSkill oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=iphone-app-development">iphone-app-development</a>  <a data-skill="android-app-development" class="oSkill oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=android-app-development">android-app-development</a>  <a data-skill="corona-sdk" class="oSkill oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=corona-sdk">corona-sdk</a>\n                                    <a title="View all skills" href="/users/Super-Talented-Unity3D-Corona-Xamarin-Developer_%7E01c95771650053def3?tot=30&amp;pos=10">…</a> \n                                </div>\n                            </div>\n\n                            <div class="col txtRight oRateFeedbackHours">\n                                <div class="oTxtLarge jsRate">\n                                    $\n                                    <span ng-bind="user.price | number:2"></span>\n                                    <span class="oRateTime">/hr</span>\n                                </div>\n\n                                <div class="oTxtLarge jsHours">\n                                    <span ng-bind="user.hours"></span>\n                                    <span class="oRateTime">hours</span>\n                                </div>\n\n                                <div class="nowrap">\n\n\n                                    <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 5 reviews" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                        <div class="oStarsValue" style="width:100%"></div>\n                                    </div>\n\n                                    <span class="oStarsTotal oStarsMedium" ng-bind="user.feedback | number:2"></span>\n\n                                </div>\n                            </div>\n                            <div class="oMoreLess"><a href="#" class="jsMore jsLogClickEvent oRight" data-event-type="expand_tile" data-id="280487190">More</a><a href="#" class="jsLess isHidden">Less</a>\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n\n            </article>\n        </section>')
}]);

// Angular Rails Template
// source: app/assets/templates/otherApplicants-template.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("otherApplicants-template.html", '\n        <h2 class="oH2Low oH2Border" ng-click="open = !open; wayRefresh()" ng-class="{active:open === true}" ng-click="isOpen()" sticky-bar>\n            <div class="innerWrap">\n                <i class="oHToggle animated" ng-class="{isCollapsed:open === false}"></i>\n                <span class="ib oTxtLarge txtMiddle" ng-bind="sectionTitle"></span>\n            </div>\n        </h2>\n\n        <section ng-init="showContainer(activeDay)" ng-show="open" class="applicantContent">\n            <article ng-repeat="(key, user) in pendingApplicants" class="oContractorTile jsSimilarTile oProfileTileLead searchResultHover animated" id="profile_5341051">\n\n                <div class="cols">\n                    <div class="col col1of8 oImg">\n                        <img id="portrait_1" class="oPortraitLarge" alt="user.name" ng-src="{{user.image}}">\n\n                    </div>\n\n                    <div class="cols col col7of8">\n                        <div class="cols p">\n                            <div class="col col6of8">\n                                <hgroup class="oProfileTileTitle">\n                                    <h1 class="oRowTitle">\n                                        <a title="Lee C." class="jsContractorProfileLink oHInline" data-user-id="{{key}}" ui-sref=".application({userId : {{key}} })" ng-bind="user.name"></a>\n                                    </h1>\n                                    <h3 ng-bind="user.title"></h3>\n                                </hgroup>\n                            </div>\n\n                            <div class="col col2of8 oRight txtRight npad">\n\n                                <div class="oDropdown" dropdown-menu>\n                                    <a title="Contact" class="oBtn oBtnSecondary jsContactContractor oDropdownBtn" ng-init="showMessage=false">Send Message</a>\n\n                                    <i class="oBtn oBtnSecondary oDropdownIcon" ng-click="toggleSelect()"></i>\n                                    <ul class=\'oDropdownMenu\' ng-show="isOpen">\n                                        <li>Save Freelancer</li>\n                                        <li>Start trial project</li>\n                                        <li>Hire (send offer)</li>\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="cols">\n                            <div class="col col4of8">\n\n                                <div class="oDescription">\n                                    <div class="jsTruncated">\n                                        <span class="oTxtEnlarged" ng-bind="user.description | words:30"></span>\n                                        <span class="oMore oMoreSmall">more</span>\n                                    </div>\n                                    <div class="jsFull isHidden">\n                                        <div>To build a Top 1 app, this is my rule. ✪✪✪✪✪ I LOVE Mobiles. Mobiles Will Change The World With Creative Ideas and Endless Efforts. ✪✪✪✪✪ I am a programer with experience in Unity3D, Corona SDK, Xamarin. Self-directed and motivated Mobile Developer with 7+ years\' experience in Objective C/XCode, Java/J2EE, C/C++ and PHP technologies. Excellent at developing and maintaining client/server applications. I am hardworking and a fast learner with good communication skills and a strong design background. Client satisfaction and quality work are my TOP PRIORITIES. I have strong experience in the iPhone(iOS6 + iPhone5)/iPad(iPad mini) and Android development as well as backend web service. I also have some experience in the following areas: SQLite database, Restful JSON based Web Service, Social Network - Facebook, Twitter, Google API, Audio Streaming, Video Streaming. Development Area: 1) Applications ✔ iPhone, iPod, iPad, Android, Titanium, PhoneGap ✔ design, cocoa, cocoa-touch, obje&nbsp;…&nbsp;</div>\n                                        <div>\n                                            <span class="oMore oMoreSmall">less</span>\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <div class="oSupportInfo">\n\n\n\n                                    <strong class="jsCountry" ng-bind="user.location">\n                                    </strong>\n                                    &nbsp;-&nbsp; Last active:&nbsp;\n                                    <span class="jsActivity" ng-bind="user.lastActive"></span>\n                                    &nbsp;-&nbsp; Tests:\n                                    <a class="jsTests" href="#" ng-bind="user.test"></a>\n                                    &nbsp;-&nbsp; Portfolio:\n                                    <a class="jsPortfolio" href="#" ng-bind="user.portfolio">31</a>\n                                </div>\n                            </div>\n\n                            <div class="col oSkills">\n                                <strong>Skills</strong>\n                                <div class="jsSkills oSkills">\n                                    <a data-skill="objective-c" class="oSkill isVerified oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=objective-c">objective-c</a>  <a data-skill="iphone-app-development" class="oSkill oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=iphone-app-development">iphone-app-development</a>  <a data-skill="android-app-development" class="oSkill oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=android-app-development">android-app-development</a>  <a data-skill="corona-sdk" class="oSkill oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=corona-sdk">corona-sdk</a>\n                                    <a title="View all skills" href="/users/Super-Talented-Unity3D-Corona-Xamarin-Developer_%7E01c95771650053def3?tot=30&amp;pos=10">…</a> \n                                </div>\n                            </div>\n\n                            <div class="col txtRight oRateFeedbackHours">\n                                <div class="oTxtLarge jsRate">\n                                    $\n                                    <span ng-bind="user.price | number:2"></span>\n                                    <span class="oRateTime">/hr</span>\n                                </div>\n\n                                <div class="oTxtLarge jsHours">\n                                    <span ng-bind="user.hours"></span>\n                                    <span class="oRateTime">hours</span>\n                                </div>\n\n                                <div class="nowrap">\n\n\n                                    <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 5 reviews" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                        <div class="oStarsValue" style="width:100%"></div>\n                                    </div>\n\n                                    <span class="oStarsTotal oStarsMedium" ng-bind="user.feedback | number:2"></span>\n\n                                </div>\n                            </div>\n                            <div class="oMoreLess"><a href="#" class="jsMore jsLogClickEvent oRight" data-event-type="expand_tile" data-id="280487190">More</a><a href="#" class="jsLess isHidden">Less</a>\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n\n            </article>\n        </section>')
}]);

// Angular Rails Template
// source: app/assets/templates/parseinfo.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("parseinfo.html", '<div class="panel animated">\n<section class="oListLite jsSearchResults">\n    <article class="oContractorTile jsSimilarTile oProfileTileLead searchResultHover" id="profile_5341051" data-position="11" data-id="5341051" data-qm="~01c95771650053def3">\n\n        <div class="cols">\n            <div class="col col1of8 oImg">\n                <img id="portrait_1" class="oPortraitLarge" alt="Lee C." src="https://odesk-prod-portraits.s3.amazonaws.com/Users:leechen07:PortraitUrl_100?AWSAccessKeyId=1XVAX3FNQZAFC9GJCFR2&amp;Expires=2147483647&amp;Signature=MCWJvMNBODWvDmSMgSd5nImzdj0%3D">\n            </div>\n\n            <div class="cols col col7of8">\n                <div class="cols p">\n                    <div class="col col6of8">\n                        <hgroup class="oProfileTileTitle">\n                            <h1 class="oRowTitle">\n\n\n                                <a title="Lee C." class="jsContractorProfileLink oHInline" data-user-id="5341051" href="#">Lee C.</a>\n                            </h1>\n\n                            <h3>\n                                Super Talented Unity3D, Corona, Xamarin Developer</h3>\n                        </hgroup>\n                    </div>\n\n                    <div class="col col2of8 oRight txtRight">\n\n                        <a title="Contact" class="oBtn oBtnSecondary jsContactContractor" data-user-id="5341051" href="#">Contact</a> \n                    </div>\n                </div>\n\n                <div class="cols">\n                    <div class="col col4of8">\n\n                        <div class="oDescription">\n                            <div class="jsTruncated">\n                                To build a Top 1 app, this is my rule. ✪✪✪✪✪ I LOVE Mobiles. Mobiles Will Change The World With Creative Ideas and Endless Efforts. ✪✪✪✪✪ I am a programer with experience in Unity3D, Corona SDK, Xamarin.&nbsp;…\n                                <span class="oMore oMoreSmall">more</span>\n                            </div>\n                            <div class="jsFull isHidden">\n                                <div>To build a Top 1 app, this is my rule. ✪✪✪✪✪ I LOVE Mobiles. Mobiles Will Change The World With Creative Ideas and Endless Efforts. ✪✪✪✪✪ I am a programer with experience in Unity3D, Corona SDK, Xamarin. Self-directed and motivated Mobile Developer with 7+ years\' experience in Objective C/XCode, Java/J2EE, C/C++ and PHP technologies. Excellent at developing and maintaining client/server applications. I am hardworking and a fast learner with good communication skills and a strong design background. Client satisfaction and quality work are my TOP PRIORITIES. I have strong experience in the iPhone(iOS6 + iPhone5)/iPad(iPad mini) and Android development as well as backend web service. I also have some experience in the following areas: SQLite database, Restful JSON based Web Service, Social Network - Facebook, Twitter, Google API, Audio Streaming, Video Streaming. Development Area: 1) Applications ✔ iPhone, iPod, iPad, Android, Titanium, PhoneGap ✔ design, cocoa, cocoa-touch, obje&nbsp;…&nbsp;</div>\n                                <div>\n                                    <span class="oMore oMoreSmall">less</span>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="oSupportInfo">\n\n\n\n                            <strong class="jsCountry">\n                                China</strong>\n                            &nbsp;-&nbsp; Last active:&nbsp;\n                            <span class="jsActivity">\n                                8 days ago</span>\n\n                            &nbsp;-&nbsp; Tests:\n                            <a class="jsTests" href="#">4</a>\n                            &nbsp;-&nbsp; Portfolio:\n                            <a class="jsPortfolio" href="#">31</a>\n                        </div>\n                    </div>\n\n                    <div class="col oSkills">\n                        <strong>Skills</strong>\n                        <div class="jsSkills oSkills">\n                            <a data-skill="objective-c" class="oSkill isVerified oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=objective-c">objective-c</a>  <a data-skill="iphone-app-development" class="oSkill oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=iphone-app-development">iphone-app-development</a>  <a data-skill="android-app-development" class="oSkill oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=android-app-development">android-app-development</a>  <a data-skill="corona-sdk" class="oSkill oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=corona-sdk">corona-sdk</a>\n                            <a title="View all skills" href="/users/Super-Talented-Unity3D-Corona-Xamarin-Developer_%7E01c95771650053def3?tot=30&amp;pos=10">…</a> \n                        </div>\n                    </div>\n\n                    <div class="col txtRight oRateFeedbackHours">\n                        <div class="oTxtLarge jsRate">\n                            $55.56\n                            <span class="oRateTime">/hr</span>\n                        </div>\n\n                        <div class="oTxtLarge jsHours">\n                            22\n                            <span class="oRateTime">hours</span>\n                        </div>\n\n                        <div class="nowrap">\n\n\n                            <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 5 reviews" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                <div class="oStarsValue" style="width:100%"></div>\n                            </div>\n\n                            <span class="oStarsTotal oStarsMedium">(5.00)</span>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </article>\n\n\n\n\n    <article class="oContractorTile jsSimilarTile oProfileTileLead" id="profile_4963394" data-position="12" data-id="4963394" data-qm="~01a484073dbdb80861">\n\n        <div class="cols">\n            <div class="col col1of8 oImg">\n                <img id="portrait_2" class="oPortraitLarge" alt="Woo PhunMin" src="https://odesk-prod-portraits.s3.amazonaws.com/Users:woopmin:PortraitUrl_100?AWSAccessKeyId=1XVAX3FNQZAFC9GJCFR2&amp;Expires=2147483647&amp;Signature=qJNXDwstNpHYWrAurqnKviSAMO0%3D">\n            </div>\n\n            <div class="cols col col7of8">\n                <div class="cols p">\n                    <div class="col col6of8">\n                        <hgroup class="oProfileTileTitle">\n                            <h1 class="oRowTitle">\n\n\n                                <a title="Woo PhunMin" class="jsContractorProfileLink oHInline" data-user-id="4963394" href="#">Woo PhunMin</a>\n                            </h1>\n\n                            <h3>\n                                Expert iOS/Android/Web Developer</h3>\n                        </hgroup>\n                    </div>\n\n                    <div class="col col2of8 oRight txtRight">\n\n                        <a title="Contact" class="oBtn oBtnSecondary jsContactContractor" data-user-id="4963394" href="#">Contact</a> \n                    </div>\n                </div>\n\n                <div class="cols">\n                    <div class="col col4of8">\n\n                        <div class="oDescription">\n                            <div class="jsTruncated">\n                                *** Certified iOS/Android Mobile app developer*** Over the last 5 years, I have developed a wide range of Mobile app using iOS(iPhone, iPad), Android(Phone, Tablet) including web site for mobile.&nbsp;…\n                                <span class="oMore oMoreSmall">more</span>\n                            </div>\n                            <div class="jsFull isHidden">\n                                <div>*** Certified iOS/Android Mobile app developer*** Over the last 5 years, I have developed a wide range of Mobile app using iOS(iPhone, iPad), Android(Phone, Tablet) including web site for mobile. I have created many iPhone/iPad(iOS) and Android apps using Web services such as PHP, MySQL, HTML5, CSS, etc at different scales for mobile app. I am always open to exploring and creating new mobile app and awesome stuff. ✮✮✮✮ I believe in "QUALITY" not "QUANTITY" ✮✮✮✮ Services that I provide : - OS X, iOS(iPhone, iPad), Android, Windows, Linux - iPhone, iPad, iPod Application Development, iPhone Support, iPad UI Android Development, Android SDK, iOS, iOS development, Mobile Applications. - GPS(iPhone/Android), Google Map, MapKit, GeoLocation, CoreLocation, CoreDate, CoreLocation on mobile SDK - Object C, C++, Java, Java Script - In-App Purchase(iPhone/Android), iAd, AdMob(iPhone/Android), AdWhirl, TapJoy, RevMob(iPhone/Android), Flurry(iPhone/Android), ChartBoost : iOS(iPhone/iPad) and A&nbsp;…&nbsp;</div>\n                                <div>\n                                    <span class="oMore oMoreSmall">less</span>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="oSupportInfo">\n\n\n\n                            <strong class="jsCountry">\n                                Malaysia</strong>\n                            &nbsp;-&nbsp; Last active:&nbsp;\n                            <span class="jsActivity">\n                                13 days ago</span>\n\n                            &nbsp;-&nbsp; Tests:\n                            <a class="jsTests" href="#">6</a>\n                            &nbsp;-&nbsp; Portfolio:\n                            <a class="jsPortfolio" href="#">9</a>\n                        </div>\n                    </div>\n\n                    <div class="col oSkills">\n                        <strong>Skills</strong>\n                        <div class="jsSkills oSkills">\n                            <a data-skill="c++" class="oSkill isVerified oTagSmall oTag" data-contractor="~01a484073dbdb80861" href="/contractors/?qs=c%2B%2B">c++</a>  <a data-skill="objective-c" class="oSkill isVerified oTagSmall oTag" data-contractor="~01a484073dbdb80861" href="/contractors/?qs=objective-c">objective-c</a>  <a data-skill="ios-development" class="oSkill oTagSmall oTag" data-contractor="~01a484073dbdb80861" href="/contractors/?qs=ios-development">ios-development</a>  <a data-skill="mobile-app-development" class="oSkill oTagSmall oTag" data-contractor="~01a484073dbdb80861" href="/contractors/?qs=mobile-app-development">mobile-app-development</a>\n                            <a title="View all skills" href="/users/Expert-iOS-Android-Web-Developer_%7E01a484073dbdb80861?tot=30&amp;pos=11">…</a> \n                        </div>\n                    </div>\n\n                    <div class="col txtRight oRateFeedbackHours">\n                        <div class="oTxtLarge jsRate">\n                            $45.00\n                            <span class="oRateTime">/hr</span>\n                        </div>\n\n                        <div class="oTxtLarge jsHours">\n                            221\n                            <span class="oRateTime">hours</span>\n                        </div>\n\n                        <div class="nowrap">\n\n\n                            <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 5 reviews" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                <div class="oStarsValue" style="width:100%"></div>\n                            </div>\n\n                            <span class="oStarsTotal oStarsMedium">(5.00)</span>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </article>\n\n\n\n\n    <article class="oContractorTile jsSimilarTile oProfileTileLead" id="profile_4733042" data-position="13" data-id="4733042" data-qm="~017035455ff4767be8">\n\n        <div class="cols">\n            <div class="col col1of8 oImg">\n                <img id="portrait_3" class="oPortraitLarge" alt="Li Wen" src="https://odesk-prod-portraits.s3.amazonaws.com/Users:liwen0923:PortraitUrl_100?AWSAccessKeyId=1XVAX3FNQZAFC9GJCFR2&amp;Expires=2147483647&amp;Signature=QjRXB%2BrRHdwQM1ig37HoKwGje%2Fg%3D">\n            </div>\n\n            <div class="cols col col7of8">\n                <div class="cols p">\n                    <div class="col col6of8">\n                        <hgroup class="oProfileTileTitle">\n                            <h1 class="oRowTitle">\n\n\n                                <a title="Li Wen" class="jsContractorProfileLink oHInline" data-user-id="4733042" href="#">Li Wen</a>\n                            </h1>\n\n                            <h3>\n                                Creative Mobile Developer (Photo/Video/Social/GPS/Web)</h3>\n                        </hgroup>\n                    </div>\n\n                    <div class="col col2of8 oRight txtRight">\n\n                        <a title="Contact" class="oBtn oBtnSecondary jsContactContractor" data-user-id="4733042" href="#">Contact</a> \n                    </div>\n                </div>\n\n                <div class="cols">\n                    <div class="col col4of8">\n\n                        <div class="oDescription">\n                            <div class="jsTruncated">\n                                I am a developer who has rich experience for 7 years and almost published 50 pluse applications for my clients. I focus hight quality, fast speed, daily communication and do my best to keep good relationship.&nbsp;…\n                                <span class="oMore oMoreSmall">more</span>\n                            </div>\n                            <div class="jsFull isHidden">\n                                <div>I am a developer who has rich experience for 7 years and almost published 50 pluse applications for my clients. I focus hight quality, fast speed, daily communication and do my best to keep good relationship. I am available to chat by Skype or eMail, IM and would be happy to set up a convenient time to discuss the project you`re moving and some ideas. - Key Skill * Photo , Video , Audio Manipulation * Web Service Integration &amp; Web Server Building * Google Map Service, Foursquare * Web Service, Ajax, XML, JSON, RSS, SOAP, WSDL * MySQL, SQLite, HTML5, PHP, JSP * Video/Audio Streaming * Social Media Applications like Facebook, Twitter * Integrating with iAd, Adwirl, Admob, Chartboost, TapJoy, Cerebro * Business analysis system like Flurry * ePayment ability using like Apple\'s in app purchase, Paypal, Braintreepayment * Push Notification by using APNS * CoreData, CoreGraphics, Animation - Key Experience * Simple and graceful User interface sense * Co-operation experience with team memb&nbsp;…&nbsp;</div>\n                                <div>\n                                    <span class="oMore oMoreSmall">less</span>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="oSupportInfo">\n\n\n\n                            <strong class="jsCountry">\n                                China</strong>\n                            &nbsp;-&nbsp; Last active:&nbsp;\n                            <span class="jsActivity">\n                                7 days ago</span>\n\n                            &nbsp;-&nbsp; Tests:\n                            <a class="jsTests" href="#">4</a>\n                            &nbsp;-&nbsp; Portfolio:\n                            <a class="jsPortfolio" href="#">6</a>\n                        </div>\n                    </div>\n\n                    <div class="col oSkills">\n                        <strong>Skills</strong>\n                        <div class="jsSkills oSkills">\n                            <a data-skill="objective-c" class="oSkill isVerified oTagSmall oTag" data-contractor="~017035455ff4767be8" href="/contractors/?qs=objective-c">objective-c</a>  <a data-skill="ios-development" class="oSkill oTagSmall oTag" data-contractor="~017035455ff4767be8" href="/contractors/?qs=ios-development">ios-development</a>  <a data-skill="apple-xcode" class="oSkill oTagSmall oTag" data-contractor="~017035455ff4767be8" href="/contractors/?qs=apple-xcode">apple-xcode</a>  <a data-skill="ipad-app-development" class="oSkill oTagSmall oTag" data-contractor="~017035455ff4767be8" href="/contractors/?qs=ipad-app-development">ipad-app-development</a>\n                            <a title="View all skills" href="/users/Creative-Mobile-Developer-Photo-Video-Social-GPS-Web_%7E017035455ff4767be8?tot=30&amp;pos=12">…</a> \n                        </div>\n                    </div>\n\n                    <div class="col txtRight oRateFeedbackHours">\n                        <div class="oTxtLarge jsRate">\n                            $35.56\n                            <span class="oRateTime">/hr</span>\n                        </div>\n\n                        <div class="oTxtLarge jsHours">\n                            424\n                            <span class="oRateTime">hours</span>\n                        </div>\n\n                        <div class="nowrap">\n\n\n                            <div class="oStarsContainer oStarsMedium" data-content="4.97 stars, based on 5 reviews" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                <div class="oStarsValue" style="width:99.334895538736%"></div>\n                            </div>\n\n                            <span class="oStarsTotal oStarsMedium">(4.97)</span>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </article>\n\n\n\n\n    <article class="oContractorTile jsSimilarTile oProfileTileLead" id="profile_5002566" data-position="14" data-id="5002566" data-qm="~016efabbe63ca03456">\n\n        <div class="cols">\n            <div class="col col1of8 oImg">\n                <img id="portrait_4" class="oPortraitLarge" alt="Zhou Chen" src="https://odesk-prod-portraits.s3.amazonaws.com/Users:brmind824:PortraitUrl_100?AWSAccessKeyId=1XVAX3FNQZAFC9GJCFR2&amp;Expires=2147483647&amp;Signature=Ikxb%2Bbf4V6BTXZTnwOtqgbUSDrU%3D">\n            </div>\n\n            <div class="cols col col7of8">\n                <div class="cols p">\n                    <div class="col col6of8">\n                        <hgroup class="oProfileTileTitle">\n                            <h1 class="oRowTitle">\n\n\n                                <a title="Zhou Chen" class="jsContractorProfileLink oHInline" data-user-id="5002566" href="#">Zhou Chen</a>\n                            </h1>\n\n                            <h3>\n                                Authenticated Mobile and Web developer</h3>\n                        </hgroup>\n                    </div>\n\n                    <div class="col col2of8 oRight txtRight">\n\n                        <a title="Contact" class="oBtn oBtnSecondary jsContactContractor" data-user-id="5002566" href="#">Contact</a> \n                    </div>\n                </div>\n\n                <div class="cols">\n                    <div class="col col4of8">\n\n                        <div class="oDescription">\n                            <div class="jsTruncated">\n                                Welcome to Zhou&amp;#039;s I&amp;#039;m professional mobile and web application developer. I started application development when I was junior at university. I became web expert around the time I graduate the school.&nbsp;…\n                                <span class="oMore oMoreSmall">more</span>\n                            </div>\n                            <div class="jsFull isHidden">\n                                <div>Welcome to Zhou&amp;#039;s I&amp;#039;m professional mobile and web application developer. I started application development when I was junior at university. I became web expert around the time I graduate the school. I started mobile app development from 2 years ago and submitted several apps on google play and app store. I came to oDesk with great expectation, and with my brilliant skills and rich practical experience, I will achieve the great success with you. - Competencies in Mobile App Development Social media integration, photo &amp; video editing, GPU processing, Cocos2d game development, Geo location based app - Capabilities iPhone/iPad/iPod, Xcode5, iOS 7, Android, Facebook, Twitter, Instagram, GoogleMap API, REST Api, Phonegap/Cordova, jQuery Mobile, Appcelerator, Titanium - Competencies in Web Development &nbsp;&nbsp;Social Media integration, Payment gateway integration, several CMS framework development and customization, Responsive web site development, Web Service development for mobile a&nbsp;…&nbsp;</div>\n                                <div>\n                                    <span class="oMore oMoreSmall">less</span>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="oSupportInfo">\n\n\n\n                            <strong class="jsCountry">\n                                China</strong>\n                            &nbsp;-&nbsp; Last active:&nbsp;\n                            <span class="jsActivity">\n                                7 days ago</span>\n\n                            &nbsp;-&nbsp; Tests:\n                            <a class="jsTests" href="#">5</a>\n                            &nbsp;-&nbsp; Portfolio:\n                            <a class="jsPortfolio" href="#">4</a>\n                        </div>\n                    </div>\n\n                    <div class="col oSkills">\n                        <strong>Skills</strong>\n                        <div class="jsSkills oSkills">\n                            <a data-skill="iphone-app-development" class="oSkill oTagSmall oTag" data-contractor="~016efabbe63ca03456" href="/contractors/?qs=iphone-app-development">iphone-app-development</a>  <a data-skill="android-app-development" class="oSkill oTagSmall oTag" data-contractor="~016efabbe63ca03456" href="/contractors/?qs=android-app-development">android-app-development</a>  <a data-skill="html" class="oSkill isVerified oTagSmall oTag" data-contractor="~016efabbe63ca03456" href="/contractors/?qs=html">html</a>  <a data-skill="css3" class="oSkill isVerified oTagSmall oTag" data-contractor="~016efabbe63ca03456" href="/contractors/?qs=css3">css3</a>\n                            <a title="View all skills" href="/users/Authenticated-Mobile-and-Web-developer_%7E016efabbe63ca03456?tot=30&amp;pos=13">…</a> \n                        </div>\n                    </div>\n\n                    <div class="col txtRight oRateFeedbackHours">\n                        <div class="oTxtLarge jsRate">\n                            $35.00\n                            <span class="oRateTime">/hr</span>\n                        </div>\n\n                        <div class="oTxtLarge jsHours">\n                            64\n                            <span class="oRateTime">hours</span>\n                        </div>\n\n                        <div class="nowrap">\n\n\n                            <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 9 reviews" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                <div class="oStarsValue" style="width:100%"></div>\n                            </div>\n\n                            <span class="oStarsTotal oStarsMedium">(5.00)</span>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </article>\n\n\n\n\n    <article class="oContractorTile jsSimilarTile oProfileTileLead" id="profile_5361749" data-position="15" data-id="5361749" data-qm="~01fbbf22b7fd9c21fe">\n\n        <div class="cols">\n            <div class="col col1of8 oImg">\n                <img id="portrait_5" class="oPortraitLarge" alt="Huang Q." src="https://odesk-prod-portraits.s3.amazonaws.com/Users:huangqiang0402:PortraitUrl_100?AWSAccessKeyId=1XVAX3FNQZAFC9GJCFR2&amp;Expires=2147483647&amp;Signature=ye1GXdO6uCYGxPryFL74kjPeKik%3D">\n            </div>\n\n            <div class="cols col col7of8">\n                <div class="cols p">\n                    <div class="col col6of8">\n                        <hgroup class="oProfileTileTitle">\n                            <h1 class="oRowTitle">\n\n\n                                <a title="Huang Q." class="jsContractorProfileLink oHInline" data-user-id="5361749" href="#">Huang Q.</a>\n                            </h1>\n\n                            <h3>\n                                Top Mobile(iOS, Android) Developer</h3>\n                        </hgroup>\n                    </div>\n\n                    <div class="col col2of8 oRight txtRight">\n\n                        <a title="Contact" class="oBtn oBtnSecondary jsContactContractor" data-user-id="5361749" href="#">Contact</a> \n                    </div>\n                </div>\n\n                <div class="cols">\n                    <div class="col col4of8">\n\n                        <div class="oDescription">\n                            <div class="jsTruncated">\n                                CERTIFICATED ODESK MOBILE DEVELOPER!!! Thanks for visiting my profile. I aim to form a long term working relationship. You can save your time and money. If you are looking for a veteran mobile application developer who:&nbsp;…\n                                <span class="oMore oMoreSmall">more</span>\n                            </div>\n                            <div class="jsFull isHidden">\n                                <div>CERTIFICATED ODESK MOBILE DEVELOPER!!! Thanks for visiting my profile. I aim to form a long term working relationship. You can save your time and money. If you are looking for a veteran mobile application developer who: - has proven experience of writing lots of mobile(iOS, Android) apps/games - has professional attitude - does very clear communication - gives great attention to detail - provide high graphic design(2D &amp; 3D) - support sound file - has fast speed and high quality - make clean coding and testing - submit your (iOS, Android) app/game in Appstore | GooglePlay After complete project, I can - support fixing bugs with free. ( Collateral term : 2 months ) - support update features with low price. 100% fluent English communication skill 100% client ongoing satisfaction with perfect quality of product 100% money back guarantee if not satisfied for any reason then you have arrived at the the right person! Followings are some areas I have experienced. 1) iOS and Android &nbsp;…&nbsp;</div>\n                                <div>\n                                    <span class="oMore oMoreSmall">less</span>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="oSupportInfo">\n\n\n\n                            <strong class="jsCountry">\n                                China</strong>\n                            &nbsp;-&nbsp; Last active:&nbsp;\n                            <span class="jsActivity">\n                                7 days ago</span>\n\n                            &nbsp;-&nbsp; Tests:\n                            <a class="jsTests" href="/users/Top-Mobile-iOS-Android-Developer_%7E01fbbf22b7fd9c21fe?tab=tests&amp;class=jsTests#tests">5</a>\n                            &nbsp;-&nbsp; Portfolio:\n                            <a class="jsPortfolio" href="/users/Top-Mobile-iOS-Android-Developer_%7E01fbbf22b7fd9c21fe?tab=portfolio#portfolio">7</a>\n                        </div>\n                    </div>\n\n                    <div class="col oSkills">\n                        <strong>Skills</strong>\n                        <div class="jsSkills oSkills">\n                            <a data-skill="objective-c" class="oSkill isVerified oTagSmall oTag" data-contractor="~01fbbf22b7fd9c21fe" href="/contractors/?qs=objective-c">objective-c</a>  <a data-skill="iphone-app-development" class="oSkill oTagSmall oTag" data-contractor="~01fbbf22b7fd9c21fe" href="/contractors/?qs=iphone-app-development">iphone-app-development</a>  <a data-skill="game-development" class="oSkill oTagSmall oTag" data-contractor="~01fbbf22b7fd9c21fe" href="/contractors/?qs=game-development">game-development</a>  <a data-skill="android-app-development" class="oSkill oTagSmall oTag" data-contractor="~01fbbf22b7fd9c21fe" href="/contractors/?qs=android-app-development">android-app-development</a>\n                            <a title="View all skills" href="/users/Top-Mobile-iOS-Android-Developer_%7E01fbbf22b7fd9c21fe?tot=30&amp;pos=14">…</a> \n                        </div>\n                    </div>\n\n                    <div class="col txtRight oRateFeedbackHours">\n                        <div class="oTxtLarge jsRate">\n                            $35.00\n                            <span class="oRateTime">/hr</span>\n                        </div>\n\n                        <div class="oTxtLarge jsHours">\n                            20\n                            <span class="oRateTime">hours</span>\n                        </div>\n\n                        <div class="nowrap">\n\n\n                            <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 3 reviews" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                <div class="oStarsValue" style="width:100%"></div>\n                            </div>\n\n                            <span class="oStarsTotal oStarsMedium">(5.00)</span>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </article>\n\n\n\n\n    <article class="oContractorTile jsSimilarTile oProfileTileLead" id="profile_3033429" data-position="16" data-id="3033429" data-qm="~015c297c3a90421af8">\n\n        <div class="cols">\n            <div class="col col1of8 oImg">\n                <img id="portrait_6" class="oPortraitLarge" alt="Anton V." src="https://odesk-prod-portraits.s3.amazonaws.com/Users:anton-vilimets:PortraitUrl_100?AWSAccessKeyId=1XVAX3FNQZAFC9GJCFR2&amp;Expires=2147483647&amp;Signature=l2P3ALIn0Vt0Us9wRaMu7ScdFms%3D">\n            </div>\n\n            <div class="cols col col7of8">\n                <div class="cols p">\n                    <div class="col col6of8">\n                        <hgroup class="oProfileTileTitle">\n                            <h1 class="oRowTitle">\n\n\n                                <a title="Anton V." class="jsContractorProfileLink oHInline" data-user-id="3033429" href="#">Anton V.</a>\n                            </h1>\n\n                            <h3>\n                                iPhone/iPad developer</h3>\n                        </hgroup>\n                    </div>\n\n                    <div class="col col2of8 oRight txtRight">\n\n                        <a title="Contact" class="oBtn oBtnSecondary jsContactContractor" data-user-id="3033429" href="#">Contact</a> \n                    </div>\n                </div>\n\n                <div class="cols">\n                    <div class="col col4of8">\n\n                        <div class="oDescription">\n                            <div class="jsTruncated">\n                                I have been developing mobile apps for the last 2 years including social networking, games, business, lifestyle, entertainment and other various kinds of apps for iOS. I have created up to 20 applications for iPhone/iPad.&nbsp;…\n                                <span class="oMore oMoreSmall">more</span>\n                            </div>\n                            <div class="jsFull isHidden">\n                                <div>I have been developing mobile apps for the last 2 years including social networking, games, business, lifestyle, entertainment and other various kinds of apps for iOS. I have created up to 20 applications for iPhone/iPad. - Web Integration(XML, JSON), Social(Facebook, Twitter, Instagram, Flicker, Dropbox, TestFlight, Flurry, Admob) - UIKit, Cocoa, In-App purchases</div>\n                                <div>\n                                    <span class="oMore oMoreSmall">less</span>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="oSupportInfo">\n\n\n\n                            <strong class="jsCountry">\n                                Ukraine</strong>\n                            &nbsp;-&nbsp; Last active:&nbsp;\n                            <span class="jsActivity">\n                                9 days ago</span>\n\n                            &nbsp;-&nbsp; Tests:\n                            <a class="jsTests" href="/users/iPhone-iPad-developer_%7E015c297c3a90421af8?tab=tests&amp;class=jsTests#tests">5</a>\n                            &nbsp;-&nbsp; Portfolio:\n                            <a class="jsPortfolio" href="/users/iPhone-iPad-developer_%7E015c297c3a90421af8?tab=portfolio#portfolio">1</a>\n                        </div>\n                    </div>\n\n                    <div class="col oSkills">\n                        <strong>Skills</strong>\n                        <div class="jsSkills oSkills">\n                            <a data-skill="iphone-app-development" class="oSkill isVerified oTagSmall oTag" data-contractor="~015c297c3a90421af8" href="/contractors/?qs=iphone-app-development">iphone-app-development</a>  <a data-skill="ios-development" class="oSkill isVerified oTagSmall oTag" data-contractor="~015c297c3a90421af8" href="/contractors/?qs=ios-development">ios-development</a>  <a data-skill="objective-c" class="oSkill isVerified oTagSmall oTag" data-contractor="~015c297c3a90421af8" href="/contractors/?qs=objective-c">objective-c</a>  <a data-skill="cocoa" class="oSkill oTagSmall oTag" data-contractor="~015c297c3a90421af8" href="/contractors/?qs=cocoa">cocoa</a>\n                            <a title="View all skills" href="/users/iPhone-iPad-developer_%7E015c297c3a90421af8?tot=30&amp;pos=15">…</a> \n                        </div>\n                    </div>\n\n                    <div class="col txtRight oRateFeedbackHours">\n                        <div class="oTxtLarge jsRate">\n                            $22.22\n                            <span class="oRateTime">/hr</span>\n                        </div>\n\n                        <div class="oTxtLarge jsHours">\n                            48\n                            <span class="oRateTime">hours</span>\n                        </div>\n\n                        <div class="nowrap">\n\n\n                            <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 2 reviews" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                <div class="oStarsValue" style="width:100%"></div>\n                            </div>\n\n                            <span class="oStarsTotal oStarsMedium">(5.00)</span>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </article>\n\n\n\n\n    <article class="oContractorTile jsSimilarTile oProfileTileLead" id="profile_5040105" data-position="17" data-id="5040105" data-qm="~01526d99db42aadb52">\n\n        <div class="cols">\n            <div class="col col1of8 oImg">\n                <img id="portrait_7" class="oPortraitLarge" alt="Luca C." src="https://odesk-prod-portraits.s3.amazonaws.com/Users:lucachrist:PortraitUrl_100?AWSAccessKeyId=1XVAX3FNQZAFC9GJCFR2&amp;Expires=2147483647&amp;Signature=%2FOsW9zxYOPsrCvOx%2Ffr1RyeFYcQ%3D">\n            </div>\n\n            <div class="cols col col7of8">\n                <div class="cols p">\n                    <div class="col col6of8">\n                        <hgroup class="oProfileTileTitle">\n                            <h1 class="oRowTitle">\n\n\n                                <a title="Luca C." class="jsContractorProfileLink oHInline" data-user-id="5040105" href="#">Luca C.</a>\n                            </h1>\n\n                            <h3>\n                                Excellent Mobile Developer</h3>\n                        </hgroup>\n                    </div>\n\n                    <div class="col col2of8 oRight txtRight">\n\n                        <a title="Contact" class="oBtn oBtnSecondary jsContactContractor" data-user-id="5040105" href="#">Contact</a> \n                    </div>\n                </div>\n\n                <div class="cols">\n                    <div class="col col4of8">\n\n                        <div class="oDescription">\n                            <div class="jsTruncated">\n                                *** Certified Mobile(iPhone/Android) app developer*** Over the last 3 years, I have developed a wide range of Mobile app using iOS(iPhone, iPad), Android(Phone, Tablet) including web site for mobile.&nbsp;…\n                                <span class="oMore oMoreSmall">more</span>\n                            </div>\n                            <div class="jsFull isHidden">\n                                <div>*** Certified Mobile(iPhone/Android) app developer*** Over the last 3 years, I have developed a wide range of Mobile app using iOS(iPhone, iPad), Android(Phone, Tablet) including web site for mobile. I have created many iPhone/iPad(iOS) and Android apps using Web services such as PHP, MySQL, HTML5, CSS, etc at different scales for mobile app. I believe my skills would be ideal for your project. I have extensive experience with all phases of application development, from requirements gathering to application architecture, from the app store submission process to maintenance and upgrades. I have brought many projects to successful completion, and hope to help you complete yours. Looking for challenging projects to apply my skills to. If I work on a project, it means that I take responsibility to make it successful Thanks! Luca\n                                </div>\n                                <div>\n                                    <span class="oMore oMoreSmall">less</span>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="oSupportInfo">\n\n\n\n                            <strong class="jsCountry">\n                                Switzerland</strong>\n                            &nbsp;-&nbsp; Last active:&nbsp;\n                            <span class="jsActivity">\n                                7 days ago</span>\n\n                            &nbsp;-&nbsp; Tests:\n                            <a class="jsTests" href="/users/Excellent-Mobile-Developer_%7E01526d99db42aadb52?tab=tests&amp;class=jsTests#tests">4</a>\n                            &nbsp;-&nbsp; Portfolio:\n                            <a class="jsPortfolio" href="/users/Excellent-Mobile-Developer_%7E01526d99db42aadb52?tab=portfolio#portfolio">3</a>\n                        </div>\n                    </div>\n\n                    <div class="col oSkills">\n                        <strong>Skills</strong>\n                        <div class="jsSkills oSkills">\n                            <a data-skill="iphone-app-development" class="oSkill oTagSmall oTag" data-contractor="~01526d99db42aadb52" href="/contractors/?qs=iphone-app-development">iphone-app-development</a>  <a data-skill="android-app-development" class="oSkill oTagSmall oTag" data-contractor="~01526d99db42aadb52" href="/contractors/?qs=android-app-development">android-app-development</a>  <a data-skill="objective-c" class="oSkill isVerified oTagSmall oTag" data-contractor="~01526d99db42aadb52" href="/contractors/?qs=objective-c">objective-c</a>  <a data-skill="php" class="oSkill oTagSmall oTag" data-contractor="~01526d99db42aadb52" href="/contractors/?qs=php">php</a>\n                            <a title="View all skills" href="/users/Excellent-Mobile-Developer_%7E01526d99db42aadb52?tot=30&amp;pos=16">…</a> \n                        </div>\n                    </div>\n\n                    <div class="col txtRight oRateFeedbackHours">\n                        <div class="oTxtLarge jsRate">\n                            $36.67\n                            <span class="oRateTime">/hr</span>\n                        </div>\n\n                        <div class="oTxtLarge jsHours">\n                            0\n                            <span class="oRateTime">hours</span>\n                        </div>\n\n                        <div class="nowrap">\n\n\n                            <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 1 review" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                <div class="oStarsValue" style="width:100%"></div>\n                            </div>\n\n                            <span class="oStarsTotal oStarsMedium">(5.00)</span>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </article>\n\n\n\n\n    <article class="oContractorTile jsSimilarTile oProfileTileLead" id="profile_5087411" data-position="18" data-id="5087411" data-qm="~01757b9258c5246dfd">\n\n        <div class="cols">\n            <div class="col col1of8 oImg">\n                <img id="portrait_8" class="oPortraitLarge" alt="Dimitar P." src="https://odesk-prod-portraits.s3.amazonaws.com/Users:dimitar-plamenov:PortraitUrl_100?AWSAccessKeyId=1XVAX3FNQZAFC9GJCFR2&amp;Expires=2147483647&amp;Signature=mU%2Bz4F4XDyDZCChh%2BqCGrh1tPXs%3D">\n            </div>\n\n            <div class="cols col col7of8">\n                <div class="cols p">\n                    <div class="col col6of8">\n                        <hgroup class="oProfileTileTitle">\n                            <h1 class="oRowTitle">\n\n\n                                <a title="Dimitar P." class="jsContractorProfileLink oHInline" data-user-id="5087411" href="#">Dimitar P.</a>\n                            </h1>\n\n                            <h3>\n                                Rockstar iOS7 Developer - Text/Voice/Video Message App Exper...</h3>\n                        </hgroup>\n                    </div>\n\n                    <div class="col col2of8 oRight txtRight">\n\n                        <a title="Contact" class="oBtn oBtnSecondary jsContactContractor" data-user-id="5087411" href="#">Contact</a> \n                    </div>\n                </div>\n\n                <div class="cols">\n                    <div class="col col4of8">\n\n                        <div class="oDescription">\n                            <div class="jsTruncated">\n                                I am an iOS developer working with Xcode, Objective-C, UIKit, iBeacon and Core Data on a daily basis.&nbsp;&nbsp;I am interested in best practices that are being adopted by the iOS community and implementing them into my work.&nbsp;…\n                                <span class="oMore oMoreSmall">more</span>\n                            </div>\n                            <div class="jsFull isHidden">\n                                <div>I am an iOS developer working with Xcode, Objective-C, UIKit, iBeacon and Core Data on a daily basis.&nbsp;&nbsp;I am interested in best practices that are being adopted by the iOS community and implementing them into my work.&nbsp;&nbsp;I am excited about the iOS platform and I enjoy staying up-to-date on where Apple is taking the technology.&nbsp;&nbsp;I love iOS 7 on iPhone 5 and I like an Apple. I have been working with native iOS development since 2010.&nbsp;&nbsp;Additionally, I have 3 years of carryover experience for web programming with Ruby on Rails and Node.js.&nbsp;&nbsp;More importantly, I am determined to be an expert in my area of practice – which, for the foreseeable future, is native iOS development. I am very familiar with using several mobile SDKs. - Facebook : Login with Facebook and get personal information, invite friends - Twitter : Login with Twitter and get their twitters - Parse : Build the web service using Parse.com - Paypal, Authorize.net, Stripe, Saleforce, card.io : Make the payment system in the mobi&nbsp;…&nbsp;</div>\n                                <div>\n                                    <span class="oMore oMoreSmall">less</span>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="oSupportInfo">\n\n\n\n                            <strong class="jsCountry">\n                                Bulgaria</strong>\n                            &nbsp;-&nbsp; Last active:&nbsp;\n                            <span class="jsActivity">\n                                7 days ago</span>\n\n                            &nbsp;-&nbsp; Tests:\n                            <a class="jsTests" href="/users/Rockstar-iOS7-Developer-Text-Voice-Video-Message-App-Expert_%7E01757b9258c5246dfd?tab=tests&amp;class=jsTests#tests">5</a>\n                            &nbsp;-&nbsp; Portfolio:\n                            <a class="jsPortfolio" href="/users/Rockstar-iOS7-Developer-Text-Voice-Video-Message-App-Expert_%7E01757b9258c5246dfd?tab=portfolio#portfolio">7</a>\n                        </div>\n                    </div>\n\n                    <div class="col oSkills">\n                        <strong>Skills</strong>\n                        <div class="jsSkills oSkills">\n                            <a data-skill="objective-c" class="oSkill isVerified oTagSmall oTag" data-contractor="~01757b9258c5246dfd" href="/contractors/?qs=objective-c">objective-c</a>  <a data-skill="ipad-app-development" class="oSkill oTagSmall oTag" data-contractor="~01757b9258c5246dfd" href="/contractors/?qs=ipad-app-development">ipad-app-development</a>  <a data-skill="iphone-app-development" class="oSkill oTagSmall oTag" data-contractor="~01757b9258c5246dfd" href="/contractors/?qs=iphone-app-development">iphone-app-development</a>  <a data-skill="ios-development" class="oSkill oTagSmall oTag" data-contractor="~01757b9258c5246dfd" href="/contractors/?qs=ios-development">ios-development</a>\n                            <a title="View all skills" href="/users/Rockstar-iOS7-Developer-Text-Voice-Video-Message-App-Expert_%7E01757b9258c5246dfd?tot=30&amp;pos=17">…</a> \n                        </div>\n                    </div>\n\n                    <div class="col txtRight oRateFeedbackHours">\n                        <div class="oTxtLarge jsRate">\n                            $38.89\n                            <span class="oRateTime">/hr</span>\n                        </div>\n\n                        <div class="oTxtLarge jsHours">\n                            322\n                            <span class="oRateTime">hours</span>\n                        </div>\n\n                        <div class="nowrap">\n\n\n                            <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 4 reviews" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                <div class="oStarsValue" style="width:100%"></div>\n                            </div>\n\n                            <span class="oStarsTotal oStarsMedium">(5.00)</span>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </article>\n\n\n\n\n    <article class="oContractorTile jsSimilarTile oProfileTileLead" id="profile_5418663" data-position="19" data-id="5418663" data-qm="~01659c2f9ba808b1f5">\n\n        <div class="cols">\n            <div class="col col1of8 oImg">\n                <img id="portrait_9" class="oPortraitLarge" alt="Huang Z." src="https://odesk-prod-portraits.s3.amazonaws.com/Users:huangzheng:PortraitUrl_100?AWSAccessKeyId=1XVAX3FNQZAFC9GJCFR2&amp;Expires=2147483647&amp;Signature=09y5DSJLU0GX4CbVU9mLizY7o5E%3D">\n            </div>\n\n            <div class="cols col col7of8">\n                <div class="cols p">\n                    <div class="col col6of8">\n                        <hgroup class="oProfileTileTitle">\n                            <h1 class="oRowTitle">\n\n\n                                <a title="Huang Z." class="jsContractorProfileLink oHInline" data-user-id="5418663" href="#">Huang Z.</a>\n                            </h1>\n\n                            <h3>\n                                iPhone/iPad/Android App Expert with Native English</h3>\n                        </hgroup>\n                    </div>\n\n                    <div class="col col2of8 oRight txtRight">\n\n                        <a title="Contact" class="oBtn oBtnSecondary jsContactContractor" data-user-id="5418663" href="#">Contact</a> \n                    </div>\n                </div>\n\n                <div class="cols">\n                    <div class="col col4of8">\n\n                        <div class="oDescription">\n                            <div class="jsTruncated">\n                                Over the last 6 years, I have developed many iPhone/iPad/Android Photo, Video, Music Processing App, Location based business App and Social Apps.&nbsp;…\n                                <span class="oMore oMoreSmall">more</span>\n                            </div>\n                            <div class="jsFull isHidden">\n                                <div>Over the last 6 years, I have developed many iPhone/iPad/Android Photo, Video, Music Processing App, Location based business App and Social Apps. For all clients, I am providing an innovative and great products using a latest mobile application technical resources. My core special range is - Photo Processing(Filter, Crop, Resize, Rendering, Drawing, OpenGL ES), - Video Processing (Filter, Crop, Composition, Compressing, Clip, Streaming, Live Streaming), - Music/Audio Processing(Steaming, Voice changing and TTS), - Weather app, - Travel app, - Sports app, - Social Networking / Social Integration, - News, RSS Feed app, - Medical knowledge app, - Health&amp;Fitness app, - Education apps. Also I have an experiences in Backend Service API, MySQL, OpenGL ES, QR/Barcode code scanning, UI/UX Graphics Design and Game. If you have a good idea, you can success from my hard working on that idea. Sincerely. Huang Zheng.</div>\n                                <div>\n                                    <span class="oMore oMoreSmall">less</span>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="oSupportInfo">\n\n\n\n                            <strong class="jsCountry">\n                                China</strong>\n                            &nbsp;-&nbsp; Last active:&nbsp;\n                            <span class="jsActivity">\n                                7 days ago</span>\n\n                            &nbsp;-&nbsp; Tests:\n                            <a class="jsTests" href="/users/iPhone-iPad-Android-App-Expert-with-Native-English_%7E01659c2f9ba808b1f5?tab=tests&amp;class=jsTests#tests">5</a>\n                            &nbsp;-&nbsp; Portfolio:\n                            <a class="jsPortfolio" href="/users/iPhone-iPad-Android-App-Expert-with-Native-English_%7E01659c2f9ba808b1f5?tab=portfolio#portfolio">8</a>\n                        </div>\n                    </div>\n\n                    <div class="col oSkills">\n                        <strong>Skills</strong>\n                        <div class="jsSkills oSkills">\n                            <a data-skill="iphone-app-development" class="oSkill oTagSmall oTag" data-contractor="~01659c2f9ba808b1f5" href="/contractors/?qs=iphone-app-development">iphone-app-development</a>  <a data-skill="ipad-app-development" class="oSkill oTagSmall oTag" data-contractor="~01659c2f9ba808b1f5" href="/contractors/?qs=ipad-app-development">ipad-app-development</a>  <a data-skill="mobile-app-development" class="oSkill oTagSmall oTag" data-contractor="~01659c2f9ba808b1f5" href="/contractors/?qs=mobile-app-development">mobile-app-development</a>  <a data-skill="ios-development" class="oSkill oTagSmall oTag" data-contractor="~01659c2f9ba808b1f5" href="/contractors/?qs=ios-development">ios-development</a>\n                            <a title="View all skills" href="/users/iPhone-iPad-Android-App-Expert-with-Native-English_%7E01659c2f9ba808b1f5?tot=30&amp;pos=18">…</a> \n                        </div>\n                    </div>\n\n                    <div class="col txtRight oRateFeedbackHours">\n                        <div class="oTxtLarge jsRate">\n                            $33.33\n                            <span class="oRateTime">/hr</span>\n                        </div>\n\n                        <div class="oTxtLarge jsHours">\n                            4\n                            <span class="oRateTime">hours</span>\n                        </div>\n\n                        <div class="nowrap">\n\n\n                            <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 1 review" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                <div class="oStarsValue" style="width:100%"></div>\n                            </div>\n\n                            <span class="oStarsTotal oStarsMedium">(5.00)</span>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </article>\n\n\n\n\n    <article class="oContractorTile jsSimilarTile oProfileTileLead" id="profile_4950529" data-position="20" data-id="4950529" data-qm="~01fb54032de8c6707d">\n\n        <div class="cols">\n            <div class="col col1of8 oImg">\n                <img id="portrait_10" class="oPortraitLarge" alt="Zhang Sheng" src="https://odesk-prod-portraits.s3.amazonaws.com/Users:zhangsheng88:PortraitUrl_100?AWSAccessKeyId=1XVAX3FNQZAFC9GJCFR2&amp;Expires=2147483647&amp;Signature=NNYH0pk5yLyFcYzGywZye%2BuV7GU%3D">\n            </div>\n\n            <div class="cols col col7of8">\n                <div class="cols p">\n                    <div class="col col6of8">\n                        <hgroup class="oProfileTileTitle">\n                            <h1 class="oRowTitle">\n\n\n                                <a title="Zhang Sheng" class="jsContractorProfileLink oHInline" data-user-id="4950529" href="#">Zhang Sheng</a>\n                            </h1>\n\n                            <h3>\n                                iOS7/iPhone/iPad/Apple/Android Expert</h3>\n                        </hgroup>\n                    </div>\n\n                    <div class="col col2of8 oRight txtRight">\n\n                        <a title="Contact" class="oBtn oBtnSecondary jsContactContractor" data-user-id="4950529" href="#">Contact</a> \n                    </div>\n                </div>\n\n                <div class="cols">\n                    <div class="col col4of8">\n\n                        <div class="oDescription">\n                            <div class="jsTruncated">\n                                Hi Clients. I think that I have received the great education and have earned the rich experience in mobile development while working in the great company. I have developed tens of apps on iOS/Android for 6 years,&nbsp;…\n                                <span class="oMore oMoreSmall">more</span>\n                            </div>\n                            <div class="jsFull isHidden">\n                                <div>Hi Clients. I think that I have received the great education and have earned the rich experience in mobile development while working in the great company. I have developed tens of apps on iOS/Android for 6 years, Through the great education and long development, I mastered the all branches of mobile techniques. To satisfy the clients\' requirements are my creed. Especially, when you have the difficult project with the tight timeline, please contact me You\'ll get the result what you want on time, if you hire me. Best Regards, Zhang Here are my Tech &amp; Skills - iOS6/iOS7/iPhone/iPad/android/Symbian/BlackBerry/Windows Mobile - iOS/iPhone/iPad/android Social Networking App, Social Media Sharing App, Social Dating App, Social Chat App - iOS/iPhone/iPad/Apple/Android Camera/Photo/Video app, Photo/Video Edition App, Photo/Video Effect App, Photo/Video Stitch App - iOS/iPhone/iPad/Apple/Android Fitness/Health App, Date Reminder App, Location Based App, Music App, Emoji App, Alarm App -&nbsp;…&nbsp;\n\n                                </div>\n                                <div>\n                                    <span class="oMore oMoreSmall">less</span>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="oSupportInfo">\n\n\n\n                            <strong class="jsCountry">\n                                Hong Kong</strong>\n                            &nbsp;-&nbsp; Last active:&nbsp;\n                            <span class="jsActivity">\n                                7 days ago</span>\n\n                            &nbsp;-&nbsp; Tests:\n                            <a class="jsTests" href="/users/iOS7-iPhone-iPad-Apple-Android-Expert_%7E01fb54032de8c6707d?tab=tests&amp;class=jsTests#tests">6</a>\n                            &nbsp;-&nbsp; Portfolio:\n                            <a class="jsPortfolio" href="/users/iOS7-iPhone-iPad-Apple-Android-Expert_%7E01fb54032de8c6707d?tab=portfolio#portfolio">10</a>\n                        </div>\n                    </div>\n\n                    <div class="col oSkills">\n                        <strong>Skills</strong>\n                        <div class="jsSkills oSkills">\n                            <a data-skill="ios-development" class="oSkill oTagSmall oTag" data-contractor="~01fb54032de8c6707d" href="/contractors/?qs=ios-development">ios-development</a>  <a data-skill="objective-c" class="oSkill isVerified oTagSmall oTag" data-contractor="~01fb54032de8c6707d" href="/contractors/?qs=objective-c">objective-c</a>  <a data-skill="android-app-development" class="oSkill isVerified oTagSmall oTag" data-contractor="~01fb54032de8c6707d" href="/contractors/?qs=android-app-development">android-app-development</a>  <a data-skill="cocoa" class="oSkill oTagSmall oTag" data-contractor="~01fb54032de8c6707d" href="/contractors/?qs=cocoa">cocoa</a>\n                            <a title="View all skills" href="/users/iOS7-iPhone-iPad-Apple-Android-Expert_%7E01fb54032de8c6707d?tot=30&amp;pos=19">…</a> \n                        </div>\n                    </div>\n\n                    <div class="col txtRight oRateFeedbackHours">\n                        <div class="oTxtLarge jsRate">\n                            $35.00\n                            <span class="oRateTime">/hr</span>\n                        </div>\n\n                        <div class="oTxtLarge jsHours">\n                            148\n                            <span class="oRateTime">hours</span>\n                        </div>\n\n                        <div class="nowrap">\n\n\n                            <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 3 reviews" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                <div class="oStarsValue" style="width:100%"></div>\n                            </div>\n\n                            <span class="oStarsTotal oStarsMedium">(5.00)</span>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </article>\n\n</section>\n             </div>')
}]);

// Angular Rails Template
// source: app/assets/templates/pending_applicants.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("pending_applicants.html", '\n        <h2 class="oH2Low oH2Border" ng-click="open = !open; wayRefresh()" ng-class="{active:open === true}" ng-click="isOpen()" sticky-bar>\n            <div class="innerWrap">\n                <i class="oHToggle animated" ng-class="{isCollapsed:open === false}"></i>\n                <span class="ib oTxtLarge txtMiddle">Pending invitations</span>\n            </div>\n        </h2>\n\n        <section ng-init="showContainer(activeDay)" ng-show="open" class="applicantContent">\n            <article ng-repeat="(key, user) in pendingApplicants" class="oContractorTile jsSimilarTile oProfileTileLead searchResultHover animated" id="profile_5341051">\n\n                <div class="cols">\n                    <div class="col col1of8 oImg">\n                        <img id="portrait_1" class="oPortraitLarge" alt="user.name" ng-src="{{user.image}}">\n\n                    </div>\n\n                    <div class="cols col col7of8">\n                        <div class="cols p">\n                            <div class="col col6of8">\n                                <hgroup class="oProfileTileTitle">\n                                    <h1 class="oRowTitle">\n                                        <a title="Lee C." class="jsContractorProfileLink oHInline" data-user-id="{{key}}" ui-sref=".application({userId : {{key}} })" ng-bind="user.name"></a>\n                                    </h1>\n                                    <h3 ng-bind="user.title"></h3>\n                                </hgroup>\n                            </div>\n\n                            <div class="col col2of8 oRight txtRight npad">\n\n                                <div class="oDropdown" dropdown-menu>\n                                    <a title="Contact" class="oBtn oBtnSecondary jsContactContractor oDropdownBtn" ng-init="showMessage=false">Send Message</a>\n\n                                    <i class="oBtn oBtnSecondary oDropdownIcon" ng-click="toggleSelect()"></i>\n                                    <ul class=\'oDropdownMenu\' ng-show="isOpen">\n                                        <li>Save Freelancer</li>\n                                        <li>Start trial project</li>\n                                        <li>Hire (send offer)</li>\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="cols">\n                            <div class="col col4of8">\n\n                                <div class="oDescription">\n                                    <div class="jsTruncated">\n                                        <span class="oTxtEnlarged" ng-bind="user.description | words:30"></span>\n                                        <span class="oMore oMoreSmall">more</span>\n                                    </div>\n                                    <div class="jsFull isHidden">\n                                        <div>To build a Top 1 app, this is my rule. ✪✪✪✪✪ I LOVE Mobiles. Mobiles Will Change The World With Creative Ideas and Endless Efforts. ✪✪✪✪✪ I am a programer with experience in Unity3D, Corona SDK, Xamarin. Self-directed and motivated Mobile Developer with 7+ years\' experience in Objective C/XCode, Java/J2EE, C/C++ and PHP technologies. Excellent at developing and maintaining client/server applications. I am hardworking and a fast learner with good communication skills and a strong design background. Client satisfaction and quality work are my TOP PRIORITIES. I have strong experience in the iPhone(iOS6 + iPhone5)/iPad(iPad mini) and Android development as well as backend web service. I also have some experience in the following areas: SQLite database, Restful JSON based Web Service, Social Network - Facebook, Twitter, Google API, Audio Streaming, Video Streaming. Development Area: 1) Applications ✔ iPhone, iPod, iPad, Android, Titanium, PhoneGap ✔ design, cocoa, cocoa-touch, obje&nbsp;…&nbsp;</div>\n                                        <div>\n                                            <span class="oMore oMoreSmall">less</span>\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <div class="oSupportInfo">\n\n\n\n                                    <strong class="jsCountry" ng-bind="user.location">\n                                    </strong>\n                                    &nbsp;-&nbsp; Last active:&nbsp;\n                                    <span class="jsActivity" ng-bind="user.lastActive"></span>\n                                    &nbsp;-&nbsp; Tests:\n                                    <a class="jsTests" href="#" ng-bind="user.test"></a>\n                                    &nbsp;-&nbsp; Portfolio:\n                                    <a class="jsPortfolio" href="#" ng-bind="user.portfolio">31</a>\n                                </div>\n                            </div>\n\n                            <div class="col oSkills">\n                                <strong>Skills</strong>\n                                <div class="jsSkills oSkills">\n                                    <a data-skill="objective-c" class="oSkill isVerified oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=objective-c">objective-c</a>  <a data-skill="iphone-app-development" class="oSkill oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=iphone-app-development">iphone-app-development</a>  <a data-skill="android-app-development" class="oSkill oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=android-app-development">android-app-development</a>  <a data-skill="corona-sdk" class="oSkill oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=corona-sdk">corona-sdk</a>\n                                    <a title="View all skills" href="/users/Super-Talented-Unity3D-Corona-Xamarin-Developer_%7E01c95771650053def3?tot=30&amp;pos=10">…</a> \n                                </div>\n                            </div>\n\n                            <div class="col txtRight oRateFeedbackHours">\n                                <div class="oTxtLarge jsRate">\n                                    $\n                                    <span ng-bind="user.price | number:2"></span>\n                                    <span class="oRateTime">/hr</span>\n                                </div>\n\n                                <div class="oTxtLarge jsHours">\n                                    <span ng-bind="user.hours"></span>\n                                    <span class="oRateTime">hours</span>\n                                </div>\n\n                                <div class="nowrap">\n\n\n                                    <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 5 reviews" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                        <div class="oStarsValue" style="width:100%"></div>\n                                    </div>\n\n                                    <span class="oStarsTotal oStarsMedium" ng-bind="user.feedback | number:2"></span>\n\n                                </div>\n                            </div>\n                            <div class="oMoreLess"><a href="#" class="jsMore jsLogClickEvent oRight" data-event-type="expand_tile" data-id="280487190">More</a><a href="#" class="jsLess isHidden">Less</a>\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n\n            </article>\n        </section>')
}]);

// Angular Rails Template
// source: app/assets/templates/platdev-section.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("platdev-section.html", '    <h3 class="p-x-sml">What Platform’s &amp; device’s is this for?</h3>\n    <h5 class="text-muted p-lrg">Select relevant tags to improve your results</h5>\n\n    <div class="oTagSet">\n    <!-- Platform -->\n        <label class="oBtnBox oBtnBoxSocial jsFancyCheckboxItem oPointer" ng-repeat="(platform, key) in searchTags.Tags.platforms" ng-class="{isActive: key}" >\n            <input type="checkbox" ng-model="searchTags.Tags.platforms[platform]" ng-change="platformSelect(searchTags.Tags.platforms[platform], platform); " tag-selected>\n            <i class="oImg oSocialImg oIconWindows"></i>\n            <span ng-bind="platform"></span>\n        </label>\n    </div>\n    <!-- Devices \n    <div class="oTagSet" ng-show="deviceSelected">\n        <label class="oBtnBox oBtnBoxSocial jsFancyCheckboxItem oPointer" ng-repeat="(device, key) in searchTags.Tags.devices" ng-class="{isActive: searchTags.Tags.devices[device]}">\n            <input type="checkbox" ng-model="searchTags.Tags.devices[device]" ng-change="deviceSelect(searchTags.Tags.devices[device])" tag-selected>\n            <i class="oImg oSocialImg oIconWindows"></i>\n            <span ng-bind="device"></span>\n        </label>\n    </div>-->\n    <!-- Environment -->\n    <div class="oTagSet">\n        <label class="oBtnBox oBtnBoxSocial jsFancyCheckboxItem oPointer" ng-repeat="(environment, key) in searchTags.Tags.environments" ng-class="{isActive: searchTags.Tags.environments[environment]}">\n            <input type="checkbox" ng-model="searchTags.Tags.environments[environment]" ng-change="environmentSelect(searchTags.Tags.environments[environment])" tag-selected>\n            <i class="oImg oSocialImg oIconWindows"></i>\n            <span ng-bind="environment"></span>\n        </label>\n    </div>\n    <div class="p-med">\n        <button class="btn btn-primary" ng-disabled="!nestedObjLength(searchTags.Tags).length" ng-click="tab = 2; dropdownOne = true">Update results</button>\n    </div>')
}]);

// Angular Rails Template
// source: app/assets/templates/profile.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("profile.html", '<div class="overlay-container" ng-click="$event.stopPropagation()">\n    <div class="overlay-module">\n        <div id="main" role="main" class="oPageCentered" id="profile">\n             <!--<article class="isNotification profile" ng-show="$state.includes(\'atsHome.suggestions.profile\')">\n                <div class="flex justify-flex align-flex-center">\n                    <div>\n                        <h2 class="oH1 oTxtMega ib txtMiddle np" ng-bind="invitedText || \'Start by inviting 5 freelancers\'"></h2>\n                    </div>\n                   <aside class="invited">\n                        <div class="invitedProfile np added">\n                            <img ng-src="{{invitedFreelancers[0].user.image}}"></img>\n                            <span class="oApplicantsIcon"></span>\n                        </div>\n                        <div class="invitedProfile np added">\n                            <img ng-src="{{invitedFreelancers[1].user.image}}"></img>\n                            <span class="oApplicantsIcon"></span>\n                        </div>\n                        <div class="invitedProfile np added">\n                            <img ng-src="{{invitedFreelancers[2].user.image}}"></img>\n                            <span class="oApplicantsIcon"></span>\n                        </div>\n                        <div class="invitedProfile np added">\n                            <img ng-src="{{invitedFreelancers[3].user.image}}"></img>\n                            <span class="oApplicantsIcon"></span>\n                        </div>\n                        <div class="invitedProfile np added">\n                            <img ng-src="{{invitedFreelancers[4].user.image}}"></img>\n                            <span class="oApplicantsIcon"></span>\n                        </div>\n                    </aside>\n                </div>\n            </article>-->\n            <div class="cols oBreadcrumbBar jsBreadcrumbBar oH2Border">\n                <div class="col col2of3">\n                    <a class="oBreadcrumbText oBreadcrumbBack jsLogClickEvent oTxtMed" ng-click="back()">Back to applicants</a> \n\n                </div>\n                <div class="col col1of3 txtCenter nowrap">\n                    <div id="applicationPaging">\n                        <div class="oBreadcrumbText">\n                            <strong>1</strong>of 11 Applicants <a href="#" class="oBreadcrumbNext jsLogClickEvent" data-event-type="next_applicant" data-sync="true " ng-click="logThis()">Next</a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <div class="oLayout oLayoutInfo">\n                <div class="oMain">\n                    <header>\n                        <article class="oContractorInfo oContractorInfoLarge">\n                            <div class="oMed">\n                                <div class="oLeft oPortraitLarge">\n                                    <img alt="Fran H." ng-src="{{user.image}}">\n                                </div>\n                                <div class="oBd">\n                                    <div class="oRight">\n                                        <article id="ApplicationsTerms">\n                                            <strong class="oRateLarge" data-width="240px" data-rel="flyout" data-placement="top bottom" data-content="Freelancer Receives $38.00/hr">\n                                                $<span ng-bind="user.price | number:2"></span>\n                                                <span class="oRateTime">\n                                                    / hr</span>\n                                            </strong>\n                                        </article>\n                                    </div>\n\n\n                                    <hgroup>\n\n                                        <div class="jsContractorTitle" data-user-id="5341051">\n                                            <h1 class="oH1Huge oTightText p" ng-bind="user.name">\n                                            </h1>\n                                            <h2 class="oH2High oContractorInfoTitle p" ng-bind="user.title"></h2>\n\n                                        </div>\n                                        <div class="oMed">\n                                            <i class="oIconLocation oIcon oIconSmall oIconLeft oIconLight"></i>\n                                            <div class="oBd">\n                                                <div class="oRowTitle oTextBoxLiner oTxtMed">\n                                                    <span class="nowrap" ng-bind="user.location"></span>\n                                                </div>\n                                                <div class="oMute">\n                                                    9:20pm local time - 9 hrs ahead</div>\n                                            </div>\n                                        </div>\n                                    </hgroup>\n\n                                    <ul class="oInlineList jsHideWhenEditing">\n                                        <li ng-repeat="skill in user.skills" class="oTag oSkill" ng-bind="skill"></li>\n                                        <li class="oTagMore oMoreRow">\n                                            <strong data-count="15" class="oMore">more...</strong>\n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                        </article>\n\n                    </header>\n                    <section id="applicationsDetailsCoverLetter" ng-show="$state.includes(\'atsHome.applicants.application\')">\n                        <h2 class="oH2Lite oHToggle" id="applicationsDetailsCoverLetterToggle">\n                            Cover Letter</h2>\n                        <div class="" id="applicationsDetailsCoverLetterCollapsible">\n\n\n                            <p id="applicationsDetailsCoverLetterText">\n                                <div ng-bind-html="user.description | unsafe"></div>\n                            </p>\n\n                        </div>\n                    </section>\n                    <section id="messageSection" ng-show="user.messaged && activeDay === 3">\n                        <h2 class="oH2Lite">Message</h2>\n\n                        <div id="messageThread" class="">\n                            <div class="cols oMessageThread" data-thread-id="345807034">\n                                <div>\n                                    <section id="threadPosts" class="oList">\n                                        <div class="oBd">\n                                            <article class="cols jsPost oMCMessage" data-id="432497265">\n                                                <div class="col col1of4">\n                                                    <div class="isOther1">Ashu Nagar</div>\n                                                    <div class="oSupportInfo" title="Sun, Oct 12, 2014 at 12:35pm">Oct 12</div>\n                                                </div>\n                                                <div class="col col3of4">\n                                                    <div class="oMCMessagePreview" data-markdown="">Hi Nico Lance Medina, I have read the requirements for this project. I am well skilled in all of the</div>\n                                                    <div class="oMCMessageContent" data-markdown="">Hi Nico Lance Medina,\n                                                        <br>\n                                                        <br>I have read the requirements for this project.\n                                                        <br>\n                                                        <br>I am well skilled in all of these. Please let me know when we can discuss for the project.\n                                                        <br>\n                                                        <br>My skype ID is ashu_nagar\n                                                        <br>\n                                                        <br>\n                                                        <br>\n                                                        <br>\n                                                    </div>\n                                                    <div class="oMCMessageAttachments"></div>\n                                                </div>\n                                            </article>\n                                            <div class="oMCCollapseGroup" style="display:none;">\n                                                <span class="oMCCount"></span>\n                                            </div>\n                                            <article class="jsPost" id="mcInboxReplyPane">\n                                                <form id="inbox_reply_form" class="oFormTop" novalidate="novalidate">\n                                                    <div class="oFormField">\n                                                        <label class="oLabel">Reply to all</label>\n                                                        <textarea name="body" class="oForm"></textarea>\n                                                        <div class="oCountdown oHidden" style="width: 499px;">\n                                                            <span>50000</span>characters left</div>\n                                                    </div>\n                                                    <ul class="oFieldValue oFormLrg oPlainList jsFormAttachments">\n                                                        <li class="oAttachmentAddBlock">\n                                                            <span tabindex="0" class="oLink jsUploadOptions" data-rel="flyout" data-class-name="oModal" data-reveal="#uploadOptionsContainer" data-trigger="click">\n                                                                <strong>+ Attach a file</strong>\n                                                            </span>\n                                                            <aside class="oHidden" id="uploadOptionsContainer">\n                                                                <ul>\n                                                                    <li tabindex="1"></li>\n                                                                    <li tabindex="2">\n                                                                        <div class="oInputFileContainer">\n                                                                            <div class="oInputFileWrapper">\n                                                                                <input class="ignored" type="file" name="attachment" data-target="image_uploader_1">\n                                                                            </div>\n                                                                            <div class="jsAttachmentAddItem">Upload a file</div>\n                                                                        </div>\n                                                                    </li>\n                                                                    <li tabindex="3" class="jsDropbox">\n                                                                        <div>Share via dropbox</div>\n                                                                    </li>\n                                                                </ul>\n                                                            </aside>\n                                                            <div class="oDropHere isHidden">\n                                                                <div>\n                                                                    <span class="oTxtMega">Drop File Here</span>\n                                                                </div>\n                                                            </div>\n                                                        </li>\n                                                        <li class="oAttachmentUploading isHidden">\n                                                            <div class="oLoadingSmallInline"></div>\n                                                            <a class="oBtnCloseAttachment txtMiddle jsAttachmentCancel" href="#" title="Cancel"></a>\n                                                        </li>\n                                                    </ul>\n                                                    <button type="submit" class="oBtn oBtnSecondary">Send</button>\n                                                </form>\n                                            </article>\n                                        </div>\n                                    </section>\n                                </div>\n                            </div>\n                        </div>\n\n                    </section>\n\n                    <div id="profilePresentation">\n                        <section id="profileOverviewSection">\n                            <h2 class="oH2Lite">Profile Overview</h2>\n\n\n                            <p ng-bind-html="user.description | unsafe"></p>\n\n                        </section>\n\n                        <section class="oListLite" id="profileRecentWorkAndFeedbackSection">\n\n                            <h2 class="oH2Lite">Recent Work History &amp; Feedback\n                            </h2>\n\n                            <section class="oListLite" id="workHistoryList">\n                                <div class="jsSkillTab" data-id="allAssignments">\n\n                                    <section class="oListLite np" id="jsAssignmentsActive">\n                                        <button class="oBtn oBtnToggle isCollapsed jsJobsInProgress">\n                                            5 jobs in progress</button>\n                                        <article class="cols jsAssignment  jsInProgress isHidden" data-rel="9BsNwy6UeontsFPamVNzlsy7E7RtS5MoYTHqpRV2ifo%3D" data-order="0">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>assist principal programmer in various front-end and back-end activities at mathisasport</strong>\n                                                        </a>\n                                                    </div>\n                                                    <span class="oMute">Job in progress</span>\n                                                </div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li class="oTxtMed">\n                                                            <strong>45</strong>\n                                                            <span class="oMute">hours</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$27.78</strong>\n                                                            <span class="oMute">/hr</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$1,195</strong>\n                                                            <span class="oMute">earned</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">August 2013 - Present</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-order="0"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  jsInProgress isHidden" data-rel="VD6B6KTsX9NnO30hsXOyitpm5tcpxSEIfN4%2BmnYGOVQ%3D" data-order="1">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Wordpress Small Tasks</strong>\n                                                        </a>\n                                                    </div>\n                                                    <span class="oMute">Job in progress</span>\n                                                </div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li class="oTxtMed">\n                                                            <strong>6</strong>\n                                                            <span class="oMute">hours</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$35.00</strong>\n                                                            <span class="oMute">/hr</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$698</strong>\n                                                            <span class="oMute">earned</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">April 2014 - Present</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-order="1"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  jsInProgress isHidden" data-rel="%2BDgVUWugEGq5uFy%2FseYJzPeqM8EH034OQv5vSG6mnhk%3D" data-order="2">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Wordpress Developer</strong>\n                                                        </a>\n                                                    </div>\n                                                    <span class="oMute">Job in progress</span>\n                                                </div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li class="oTxtMed">\n                                                            <strong>542</strong>\n                                                            <span class="oMute">hours</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">November 2012 - Present</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-order="2"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  jsInProgress isHidden" data-rel="MDikSdXuzFGWMyJ%2BRTJImVkIfi3mEjKeaUV7R%2BYn7rI%3D" data-order="7">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Developer Wanted for eCommerce WordPress Project</strong>\n                                                        </a>\n                                                    </div>\n                                                    <span class="oMute">Job in progress</span>\n                                                </div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li class="oTxtMed">\n                                                            <strong>116</strong>\n                                                            <span class="oMute">hours</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$22.50</strong>\n                                                            <span class="oMute">/hr</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$2,804</strong>\n                                                            <span class="oMute">earned</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">November 2013 - Present</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-rel="MDikSdXuzFGWMyJ%2BRTJImVkIfi3mEjKeaUV7R%2BYn7rI%3D" data-order="7"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  jsInProgress isHidden" data-rel="irUzoaa7c9OyHFYfyf73cFNnyoRREtLgAUWebjwOdoo%3D" data-order="8">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Core: Fixing WordPress kalender and footer</strong>\n                                                        </a>\n                                                    </div>\n                                                    <span class="oMute">Job in progress</span>\n                                                </div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li class="oTxtMed">\n                                                            <strong>16</strong>\n                                                            <span class="oMute">hours</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$22.22</strong>\n                                                            <span class="oMute">/hr</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$348</strong>\n                                                            <span class="oMute">earned</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">November 2013 - Present</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-order="8"></div>\n                                            </div>\n                                        </article>\n                                        <span></span>\n                                    </section>\n                                    <section class="oListLite" id="jsAssignmentsClosed">\n                                        <article class="cols jsAssignment " data-rel="%2BVwl1ywbLnjXtGSsF5Ke0Cr1KbRquE80cpORCgzq4%2F8%3D" data-order="3" style="position:relative">\n                                            <help-tip style="position: absolute; top: 56px; right: 8px;" ng-show="$state.includes(\'atsHome.suggestions.profile\')"></help-tip>\n\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Milestone 2 for the website development</strong>\n                                                        </a>\n                                                    </div>"Great Freelancer, will hire again!"</div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li>\n                                                            <div class="oStarsContainer">\n                                                                <div class="oStarsValue" style="width:100%"></div>\n                                                            </div>\n                                                            <strong class="oTxtMed">5.00</strong>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$500</strong>\n                                                            <span class="oMute">Fixed Price</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">March 2014 - April 2014</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-order="3"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment " data-rel="Iq%2FoD8U4UICV3DzdAuc8OzRggxg7HdiIGfW3b1sPcfg%3D" data-order="4">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Website Development</strong>\n                                                        </a>\n                                                    </div>"Absolutely amazing freelancer, Fran knows what he is doing, very good and fast coder, and a great communicator. will defiantly hire Fran again!!!"</div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li>\n                                                            <div class="oStarsContainer">\n                                                                <div class="oStarsValue" style="width:100%"></div>\n                                                            </div>\n                                                            <strong class="oTxtMed">5.00</strong>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>15</strong>\n                                                            <span class="oMute">hours</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$35.00</strong>\n                                                            <span class="oMute">/hr</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$537</strong>\n                                                            <span class="oMute">earned</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">February 2014 - March 2014</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-order="4"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment " data-rel="AnQx0pJ%2BlygS7Vs0M8ygH5ugXQV5RQ%2BpMhcj3QEa6Hc%3D" data-order="5">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Development tasks</strong>\n                                                        </a>\n                                                    </div>"Fran is a pleasure to work with. He is an excellent communicator, with a great technical skills, We will definitely hire him again"</div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li>\n                                                            <div class="oStarsContainer">\n                                                                <div class="oStarsValue" style="width:100%"></div>\n                                                            </div>\n                                                            <strong class="oTxtMed">5.00</strong>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>33</strong>\n                                                            <span class="oMute">hours</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$35.00</strong>\n                                                            <span class="oMute">/hr</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$1,161</strong>\n                                                            <span class="oMute">earned</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">January 2014 - February 2014</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-order="5"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment " data-rel="hdJXP05CG64CjLy%2B7ZidsEQ4p4n3YGY%2FM08B2MKFFII%3D" data-order="6">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Build custom WordPress site based on Canvas</strong>\n                                                        </a>\n                                                    </div>"Fran did a great job on this project. His WordPress knowledge is great and his PHP skills are also superb, all problems we\'re easily solved."</div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li>\n                                                            <div class="oStarsContainer">\n                                                                <div class="oStarsValue" style="width:81.99999999999999%"></div>\n                                                            </div>\n                                                            <strong class="oTxtMed">4.10</strong>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$1,645</strong>\n                                                            <span class="oMute">Fixed Price</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">July 2013 - February 2014</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-order="6"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment " data-rel="gtNi6PQRcMKTW5Gfx%2Fny6NbiE2p%2BvSFQYy%2F4fCb8G6c%3D" data-order="9">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Payment Gateway integration</strong>\n                                                        </a>\n                                                    </div>"Fran made great job with full cooperation, we will definitely hire him again.\n                                                    <br>Thank You Fran"</div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li>\n                                                            <div class="oStarsContainer">\n                                                                <div class="oStarsValue" style="width:100%"></div>\n                                                            </div>\n                                                            <strong class="oTxtMed">5.00</strong>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$123</strong>\n                                                            <span class="oMute">Fixed Price</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">December 2013</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-order="9"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  isHidden" data-rel="Pn27HLprkpqAdv8IxmbX%2BTmmu38QnWDCVGGYGykbh%2FY%3D" data-order="10">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Custom Woocommerce development and modifications</strong>\n                                                        </a>\n                                                    </div>"Great freelancer,&nbsp;&nbsp;absolutely will hire again!"</div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li>\n                                                            <div class="oStarsContainer">\n                                                                <div class="oStarsValue" style="width:100%"></div>\n                                                            </div>\n                                                            <strong class="oTxtMed">5.00</strong>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>17</strong>\n                                                            <span class="oMute">hours</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$35.00</strong>\n                                                            <span class="oMute">/hr</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$525</strong>\n                                                            <span class="oMute">earned</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">November 2013 - December 2013</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-order="10"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  isHidden" data-rel="o0NLkcGIlTJ1cfz0egYpwrReCrTtO3ZJZy628Lrh7Qo%3D" data-order="11">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Securing My Web Page - gourmetglass.com.au</strong>\n                                                        </a>\n                                                    </div>"Fran did what I asked in less than an hour. He dealt patiently with me who was so computer illiterate I couldn\'t even send him the password without a major hassle. I would recommend him highly to anyone, anywhere."</div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li>\n                                                            <div class="oStarsContainer">\n                                                                <div class="oStarsValue" style="width:100%"></div>\n                                                            </div>\n                                                            <strong class="oTxtMed">5.00</strong>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>1</strong>\n                                                            <span class="oMute">hours</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$33.33</strong>\n                                                            <span class="oMute">/hr</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$48</strong>\n                                                            <span class="oMute">earned</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">November 2013</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-order="11"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  isHidden" data-rel="4o8FRi00oB3l%2FgwPCo0JnwQRVcIzLsG2GIHQys7Ntfk%3D" data-order="12">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Personal Consulting Business Website</strong>\n                                                        </a>\n                                                    </div>"Fran helped me out at the last minute to get a website up.&nbsp;&nbsp;Was very communicative and delivered what I needed quickly and to a very good standard.&nbsp;&nbsp;Will definitely use again."</div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li>\n                                                            <div class="oStarsContainer">\n                                                                <div class="oStarsValue" style="width:96%"></div>\n                                                            </div>\n                                                            <strong class="oTxtMed">4.80</strong>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$100</strong>\n                                                            <span class="oMute">Fixed Price</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">November 2013</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-order="12"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  isHidden" data-rel="bf3WCMshvFJFLhSNodl12gyaLfEgJy5FC9WaBLl23hQ%3D" data-order="13">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Turn a list of links into thumbnail galleries</strong>\n                                                        </a>\n                                                    </div>"Job well done :-)"</div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li>\n                                                            <div class="oStarsContainer">\n                                                                <div class="oStarsValue" style="width:100%"></div>\n                                                            </div>\n                                                            <strong class="oTxtMed">5.00</strong>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$133</strong>\n                                                            <span class="oMute">Fixed Price</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">October 2013 - November 2013</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-rel="bf3WCMshvFJFLhSNodl12gyaLfEgJy5FC9WaBLl23hQ%3D" data-order="13"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  isHidden" data-rel="eFSNwvLE6hB2yqDJ43YKFjeuXN6vgoqU8nacn%2BRqph0%3D" data-order="14">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Develop desktop website based on PSD with "Swiss design"</strong>\n                                                        </a>\n                                                    </div>"Good developer that asks relevant questions and made a great backend, but unfortunately didnt manage to meet the deadlines."</div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li>\n                                                            <div class="oStarsContainer">\n                                                                <div class="oStarsValue" style="width:91%"></div>\n                                                            </div>\n                                                            <strong class="oTxtMed">4.55</strong>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$1,266</strong>\n                                                            <span class="oMute">Fixed Price</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">September 2013 - October 2013</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-order="14"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  isHidden" data-rel="f3Tyf7OOccY%2Fskqd%2BIm069%2Fg4n%2Fr12O3SHaZWm5rsoU%3D" data-order="15">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>WORDPRESS ACCORDION PLUGIN</strong>\n                                                        </a>\n                                                    </div>"PERFECT! I have no problem to say: He\'s the best contractor i\'ve ever worked with, both online and offline."</div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li>\n                                                            <div class="oStarsContainer">\n                                                                <div class="oStarsValue" style="width:100%"></div>\n                                                            </div>\n                                                            <strong class="oTxtMed">5.00</strong>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$251</strong>\n                                                            <span class="oMute">Fixed Price</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">July 2013 - October 2013</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-rel="f3Tyf7OOccY%2Fskqd%2BIm069%2Fg4n%2Fr12O3SHaZWm5rsoU%3D" data-order="15"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  isHidden" data-rel="8nfIHgP9Bmto9UqxeoXagkxkMaEhEe2AOKnz1jeJjwg%3D" data-order="16">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Senior PHP developer. Long Term Contract. Only the best will be considered</strong>\n                                                        </a>\n                                                    </div>"Fran is a very experienced Wordpress developer who was able to bring his impressive skills to this project and improve the overall outcome. We had a small false start which caused some timing issues - but overall I would recommend his work highly and would definitely hire again."</div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li>\n                                                            <div class="oStarsContainer">\n                                                                <div class="oStarsValue" style="width:96.99999999999999%"></div>\n                                                            </div>\n                                                            <strong class="oTxtMed">4.85</strong>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>135</strong>\n                                                            <span class="oMute">hours</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$27.78</strong>\n                                                            <span class="oMute">/hr</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$3,755</strong>\n                                                            <span class="oMute">earned</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">July 2013 - November 2013</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-rel="8nfIHgP9Bmto9UqxeoXagkxkMaEhEe2AOKnz1jeJjwg%3D" data-order="16"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  isHidden" data-rel="FQ3aGG6Vh2yat3aWXL3nWyvFb2QMAiXSGL0idb6Mjhw%3D" data-order="17">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Python script to parse XML files generated by ArCGIS</strong>\n                                                        </a>\n                                                    </div>\n                                                </div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li>\n                                                            <div class="oStarsContainer">\n                                                                <div class="oStarsValue" style="width:96.99999999999999%"></div>\n                                                            </div>\n                                                            <strong class="oTxtMed">4.85</strong>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>18</strong>\n                                                            <span class="oMute">hours</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$30.00</strong>\n                                                            <span class="oMute">/hr</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$545</strong>\n                                                            <span class="oMute">earned</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">August 2013 - January 2014</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-order="17"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  isHidden" data-rel="BBiug85I0q%2F72i2CkgFPhdJqNFgCuAVo05k86dx6OcQ%3D" data-order="18">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>mathematics phonegap app</strong>\n                                                        </a>\n                                                    </div>"Fran communicates very well, with superior English reading and writing skills. He was willing to learn a new javascript framework just to handle this job. He jumped right and communicated well, not just with me, but with other members of our team."</div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li>\n                                                            <div class="oStarsContainer">\n                                                                <div class="oStarsValue" style="width:100%"></div>\n                                                            </div>\n                                                            <strong class="oTxtMed">5.00</strong>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>4</strong>\n                                                            <span class="oMute">hours</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$27.78</strong>\n                                                            <span class="oMute">/hr</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$111</strong>\n                                                            <span class="oMute">earned</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">August 2013</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-order="18"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  isHidden" data-rel="68y1m6MhRiULkTg00%2B13toOnhRWutWVajUh8GkVeYNA%3D" data-order="19">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Wordpress Expert - Plugin</strong>\n                                                        </a>\n                                                    </div>\n                                                    <span class="oNull">No feedback given</span>\n                                                </div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li class="oTxtMed">\n                                                            <strong>$55</strong>\n                                                            <span class="oMute">Fixed Price</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">May 2013 - July 2013</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-rel="68y1m6MhRiULkTg00%2B13toOnhRWutWVajUh8GkVeYNA%3D" data-order="19"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  isHidden" data-rel="%2B3FFmdeK6IIa1%2F5cvmAuD5cOnX3%2BAJfbURlxIU7SPq0%3D" data-order="20">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Wordpress Proff. Developer</strong>\n                                                        </a>\n                                                    </div>\n                                                    <span class="oNull">No feedback given</span>\n                                                </div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li class="oTxtMed">\n                                                            <strong>10</strong>\n                                                            <span class="oMute">hours</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$27.78</strong>\n                                                            <span class="oMute">/hr</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$264</strong>\n                                                            <span class="oMute">earned</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">May 2013 - October 2013</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-order="20"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  isHidden" data-rel="mcJDFbOYh5Gb%2Bg9HPruJ5FlihHoGgpKLOK%2BQH1aom1g%3D" data-order="21">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Software Engineer</strong>\n                                                        </a>\n                                                    </div>\n                                                    <span class="oNull">No feedback given</span>\n                                                </div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li class="oTxtMed">\n                                                            <strong>2</strong>\n                                                            <span class="oMute">hours</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">July 2013</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-rel="mcJDFbOYh5Gb%2Bg9HPruJ5FlihHoGgpKLOK%2BQH1aom1g%3D" data-order="21"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  isHidden" data-rel="3zteMM7DgBfBZ1GMhFu1wsWNsT2qyBdrHf%2FavUkbOU0%3D" data-order="22">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Build custom WordPress site based on Canvas</strong>\n                                                        </a>\n                                                    </div>"A job well done. Fran knows his way around WordPress very well. Excellent communication and attention to detail."</div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li>\n                                                            <div class="oStarsContainer">\n                                                                <div class="oStarsValue" style="width:100%"></div>\n                                                            </div>\n                                                            <strong class="oTxtMed">5.00</strong>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$440</strong>\n                                                            <span class="oMute">Fixed Price</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">June 2013</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-order="22"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  isHidden" data-rel="bGeb1eLd9uSd%2BQA%2BXXq3GuO9%2FhsvSCoulLAOEEk%2BoxQ%3D" data-order="23">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>WordPress Developer</strong>\n                                                        </a>\n                                                    </div>"Fran has excellent skills in programming and he is very accommodating and willing to help. A great person to work with certainly!"</div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li>\n                                                            <div class="oStarsContainer">\n                                                                <div class="oStarsValue" style="width:100%"></div>\n                                                            </div>\n                                                            <strong class="oTxtMed">5.00</strong>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$624</strong>\n                                                            <span class="oMute">Fixed Price</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">May 2013 - June 2013</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-rel="bGeb1eLd9uSd%2BQA%2BXXq3GuO9%2FhsvSCoulLAOEEk%2BoxQ%3D" data-order="23"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  isHidden" data-rel="TXyaZqAMDxrTmW8f9gT1teIVjAHZ6S8vQDoqEwXsPZY%3D" data-order="24">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>need to email text and attachment via wordpress</strong>\n                                                        </a>\n                                                    </div>"No comment."</div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li>\n                                                            <div class="oStarsContainer">\n                                                                <div class="oStarsValue" style="width:65%"></div>\n                                                            </div>\n                                                            <strong class="oTxtMed">3.25</strong>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>2</strong>\n                                                            <span class="oMute">hours</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$27.78</strong>\n                                                            <span class="oMute">/hr</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$56</strong>\n                                                            <span class="oMute">earned</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">June 2013</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-rel="TXyaZqAMDxrTmW8f9gT1teIVjAHZ6S8vQDoqEwXsPZY%3D" data-order="24"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  isHidden" data-rel="ry3yr0f%2FOPBOUv0Kvo8FCU%2Bh8TSAEqs8qEu9mU7rOmg%3D" data-order="25">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Advanced Wordpress</strong>\n                                                        </a>\n                                                    </div>\n                                                    <span class="oNull">No feedback given</span>\n                                                </div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li class="oTxtMed">\n                                                            <strong>$40</strong>\n                                                            <span class="oMute">Fixed Price</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">April 2013 - May 2013</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-order="25"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  isHidden" data-rel="21tL95GklHB7xwATJGWb6jdDFa97uaLTG3BZ0iTuAxk%3D" data-order="26">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Wordpress Developer Theme needed FAST</strong>\n                                                        </a>\n                                                    </div>"Fran is by far the best of the contractors my team has worked with. Wordpress Theme and Plugin work done for me absolutely flawlessly, he is incredibly skilled, willing to work with you and flexible. He respects your tight deadlines and your budget. He suggests improvements and exceeds expectations on the job delivered. No brainer to hire for anybody with Wordpress related work here.\n                                                    <br>I am always honest with my feedback here and this time I only wish I could give him more stars in all categories.\n                                                    <br>I offered him another contract straight away, I hope he continues working with us. Thanks Fran!"</div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li>\n                                                            <div class="oStarsContainer">\n                                                                <div class="oStarsValue" style="width:100%"></div>\n                                                            </div>\n                                                            <strong class="oTxtMed">5.00</strong>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>59</strong>\n                                                            <span class="oMute">hours</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$27.78</strong>\n                                                            <span class="oMute">/hr</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$1,495</strong>\n                                                            <span class="oMute">earned</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">April 2013 - May 2013</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-rel="21tL95GklHB7xwATJGWb6jdDFa97uaLTG3BZ0iTuAxk%3D" data-order="26"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  isHidden" data-rel="6M4ekSqzaFvl0ZtL1lVg%2FUDMcucACMKIIcUV%2F3wp1IM%3D" data-order="27">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Wordpress Plugin development completion</strong>\n                                                        </a>\n                                                    </div>"Job completed unsuccessfully, was very argumentative and uncooperative."</div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li>\n                                                            <div class="oStarsContainer">\n                                                                <div class="oStarsValue" style="width:27%"></div>\n                                                            </div>\n                                                            <strong class="oTxtMed">1.35</strong>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>12</strong>\n                                                            <span class="oMute">hours</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$22.00</strong>\n                                                            <span class="oMute">/hr</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$257</strong>\n                                                            <span class="oMute">earned</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">April 2013 - May 2013</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-rel="6M4ekSqzaFvl0ZtL1lVg%2FUDMcucACMKIIcUV%2F3wp1IM%3D" data-order="27"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  isHidden" data-rel="p4674nFLtzE1U4rwSF%2FIHDNl0TxvN7oekxolpnMGb04%3D" data-order="28">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Need wordpress plugin modification</strong>\n                                                        </a>\n                                                    </div>"Excellent work done by Fran. Raj"</div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li>\n                                                            <div class="oStarsContainer">\n                                                                <div class="oStarsValue" style="width:100%"></div>\n                                                            </div>\n                                                            <strong class="oTxtMed">5.00</strong>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$28</strong>\n                                                            <span class="oMute">Fixed Price</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">April 2013</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-rel="p4674nFLtzE1U4rwSF%2FIHDNl0TxvN7oekxolpnMGb04%3D" data-order="28"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  isHidden" data-rel="Lsfa1QSnYopX%2F6WL217WVEnlScUXarRiruWKkNpMihc%3D" data-order="29">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Advanced Wordpress</strong>\n                                                        </a>\n                                                    </div>"Fran was excellent.&nbsp;&nbsp;Fixed up issues on the site that many other coders said they could but failed.&nbsp;&nbsp;He is the real deal and will be working with him again.&nbsp;&nbsp;Thanks Fran!"</div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li>\n                                                            <div class="oStarsContainer">\n                                                                <div class="oStarsValue" style="width:100%"></div>\n                                                            </div>\n                                                            <strong class="oTxtMed">5.00</strong>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$111</strong>\n                                                            <span class="oMute">Fixed Price</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">April 2013</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-rel="Lsfa1QSnYopX%2F6WL217WVEnlScUXarRiruWKkNpMihc%3D" data-order="29"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  isHidden" data-rel="I0OIJzz73T9tc6fkb5xHirE9KOeBC4veOdLrAyb3s68%3D" data-order="30">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Django Mentor &amp; Programmer</strong>\n                                                        </a>\n                                                    </div>\n                                                    <span class="oNull">No feedback given</span>\n                                                </div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li class="oTxtMed">\n                                                            <strong>6</strong>\n                                                            <span class="oMute">hours</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$22.22</strong>\n                                                            <span class="oMute">/hr</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$137</strong>\n                                                            <span class="oMute">earned</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">August 2012 - November 2012</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-rel="I0OIJzz73T9tc6fkb5xHirE9KOeBC4veOdLrAyb3s68%3D" data-order="30"></div>\n                                            </div>\n                                        </article>\n                                        <article class="cols jsAssignment  isHidden" data-rel="siP%2BydAVHturuisLsTInIpiP26xObONh6WeaBU9H3BA%3D" data-order="31">\n                                            <div class="cols p">\n                                                <div class="col col3of5 oTxtEnlarged">\n                                                    <div class="p">\n                                                        <a class="jsWorkHistoryJobTitle oTxtMed oBtnPopup" href="#">\n                                                            <strong>Online Business App in Django</strong>\n                                                        </a>\n                                                    </div>\n                                                </div>\n                                                <div class="col col2of5 txtRight">\n                                                    <ul class="oTightList p">\n                                                        <li>\n                                                            <div class="oStarsContainer">\n                                                                <div class="oStarsValue" style="width:96.99999999999999%"></div>\n                                                            </div>\n                                                            <strong class="oTxtMed">4.85</strong>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>70</strong>\n                                                            <span class="oMute">hours</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$13.00</strong>\n                                                            <span class="oMute">/hr</span>\n                                                        </li>\n                                                        <li class="oTxtMed">\n                                                            <strong>$1,077</strong>\n                                                            <span class="oMute">earned</span>\n                                                        </li>\n                                                        <li>\n                                                            <div class="oMute">March 2012 - May 2012</div>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                                <div class="jsDetails isHidden" data-order="31"></div>\n                                            </div>\n                                        </article>\n                                        <footer class="oMoreRow">\n                                            <button class="oMore oMoreLarge" data-job-history="true" data-scroll="10">View More\n                                                <span class="jsCount oMoreCount">22</span>\n                                            </button>\n                                        </footer>\n                                    </section>\n                                </div>\n                            </section>\n\n                        </section>\n\n\n\n                        <section id="profilePortfolioSection">\n\n                            <div>\n                                <h2 class="oH2Lite" id="portfolioJump">\n                                    Portfolio (6)\n                                    <select name="projectCategories" id="projectCategories" class="oFormLrgHlf oRight jsProjectCategories">\n                                        <option value="" label="Filter by category" selected="selected">Filter by category</option>\n                                        <option value="13" label="UI Design">UI Design</option>\n                                        <option value="9" label="Web Programming">Web Programming</option>\n                                    </select>\n                                </h2>\n                            </div>\n                            <ul class="jsProfileProjectList" data-count="4" style="min-height: 508px;">\n                                <li class="oProjectTile isActive animated none" data-category="9" data-project-id="443592458910289920" data-contract="">\n                                    <div class="oProjectThumbnail">\n                                        <img src="https://www.odesk.com/att/~~8Cen7zpTWXydf3Q6RU*s4gR7cceI9Z*lmbqY9pLa2BwZqkslP4TDv991UuytmfuE">\n                                    </div>\n                                    <div class="oProjectTileInfo oTxtEnlarged oImageOver">\n                                        <a class="oRowTitle oProjectTitle oEllipsis">Clean Corporate Site</a>\n                                    </div>\n                                </li>\n                                <li class="oProjectTile isActive isLast animated none" data-category="9" data-project-id="443592458813820928" data-contract="">\n                                    <div class="oProjectThumbnail">\n                                        <img src="https://www.odesk.com/att/~~8Cen7zpTWXydf3Q6RU*s4pHHPDfVSv2OmbqY9pLa2BwZqkslP4TDv991UuytmfuE">\n                                    </div>\n                                    <div class="oProjectTileInfo oTxtEnlarged oImageOver">\n                                        <a class="oRowTitle oProjectTitle oEllipsis">Fashion Shopping Magazine</a>\n                                    </div>\n                                </li>\n                                <li class="oProjectTile isActive animated none" data-category="9" data-project-id="443592458721546240" data-contract="">\n                                    <div class="oProjectThumbnail">\n                                        <img src="https://www.odesk.com/att/~~8Cen7zpTWXydf3Q6RU*s4gwXc4lNNfUwrI9-Q9metWi5HDU*5JVCJA==">\n                                    </div>\n                                    <div class="oProjectTileInfo oTxtEnlarged oImageOver">\n                                        <a class="oRowTitle oProjectTitle oEllipsis">My Portfolio &amp; Blog</a>\n                                    </div>\n                                </li>\n                                <li class="oProjectTile isActive isLast animated none" data-category="9" data-project-id="443592458629271552" data-contract="">\n                                    <div class="oProjectThumbnail">\n                                        <img src="https://www.odesk.com/att/~~8Cen7zpTWXydf3Q6RU*s4oKNmOMYD0h6rI9-Q9metWi5HDU*5JVCJA==">\n                                    </div>\n                                    <div class="oProjectTileInfo oTxtEnlarged oImageOver">\n                                        <a class="oRowTitle oProjectTitle oEllipsis">A Music School</a>\n                                    </div>\n                                </li>\n                                <li class="oProjectTile isActive animated jp-hidden" data-category="9" data-project-id="443592458541191168" data-contract="">\n                                    <div class="oProjectThumbnail">\n                                        <img src="https://www.odesk.com/att/~~8Cen7zpTWXydf3Q6RU*s4uyI2tER4JN7rI9-Q9metWi5HDU*5JVCJA==">\n                                    </div>\n                                    <div class="oProjectTileInfo oTxtEnlarged oImageOver">\n                                        <a class="oRowTitle oProjectTitle oEllipsis">InCider Memory Facebook game</a>\n                                    </div>\n                                </li>\n                                <li class="oProjectTile isActive isLast animated jp-hidden" data-category="13" data-project-id="443592458440527872" data-contract="">\n                                    <div class="oProjectThumbnail">\n                                        <img src="https://www.odesk.com/att/~~8Cen7zpTWXydf3Q6RU*s4i4id2-BtBn8rI9-Q9metWi5HDU*5JVCJA==">\n                                    </div>\n                                    <div class="oProjectTileInfo oTxtEnlarged oImageOver">\n                                        <a class="oRowTitle oProjectTitle oEllipsis">McDonalds.hr Homepage Slider</a>\n                                    </div>\n                                </li>\n                            </ul>\n                            <div class="oJpPagination"><a class="jp-current">1</a>\n                                <span class="jp-hidden">...</span><a>2</a><a class="jp-previous jp-disabled">«</a><a class="jp-next">»</a>\n                            </div>\n                        </section>\n\n\n\n                        <section class="oListLite" id="profileEmploymentHistorySection">\n                            <h2 class="oH2Lite">Recent Employment History</h2>\n                            <article class="">\n                                <h1 class="oRowTitle">\n                                    web developer\n                                    <span class="oHMin">freelancing</span>\n                                </h1>\n                                <div class="oSupportInfo">\n                                    July 2012 - Present</div>\n                                <div data-id="1901632">\n                                    Freelancing, mostly in Django, WordPress and PhoneGap.</div>\n                            </article>\n                            <article class="">\n                                <h1 class="oRowTitle">\n                                    developer\n                                    <span class="oHMin">Kolektiva</span>\n                                </h1>\n                                <div class="oSupportInfo">\n                                    December 2011 - June 2012</div>\n                                <div data-id="1262864">\n                                    <span class="jsTruncated">Front and back-end and developer in a 5-member team that supports daily deal sites in eight different countries. All eight websites are members of Kolektiva group witch is in tern owned by Rebate networks, a major player in daily deal sites in Europe, Ame&nbsp;…&nbsp;\n                                        <span class="oMore oMoreSmall">more</span>\n                                    </span>\n                                    <span class="jsFull isHidden">Front and back-end and developer in a 5-member team that supports daily deal sites in eight different countries. All eight websites are members of Kolektiva group witch is in tern owned by Rebate networks, a major player in daily deal sites in Europe, America and Asia.&nbsp;&nbsp;\n                                        <span class="oMore oMoreSmall">less</span>\n                                    </span>\n                                </div>\n                            </article>\n                            <article class="">\n                                <h1 class="oRowTitle">\n                                    CTO\n                                    <span class="oHMin">Hi-tech</span>\n                                </h1>\n                                <div class="oSupportInfo">\n                                    September 2010 - November 2011</div>\n                                <div data-id="1262857">\n                                    PHP developer, later CTO in Hi-tech, <a href="https://www.odesk.com/leaving-odesk?ref=http%3A%2F%2Fwww.hi-tech.hr" title="You are about to go to a URL outside odesk.com" target="_blank">www.hi-tech.hr</a>, a small business in Croatia (10 people), doing various web projects. Mostly web sites based on WordPress, also some Facebook apps and games.</div>\n                            </article>\n                        </section>\n\n                        <section class="oListLite" id="profileEducationSection">\n                            <h2 class="oH2Lite">Education</h2>\n\n                            <article class="">\n                                <h1 class="oRowTitle">\n                                    Masters, Physics\n                                    <span class="oHMin">\n                                        Univercity of Zagreb, physics department</span>\n                                </h1>\n                                <div class="oSupportInfo">\n                                    2005 - Present</div>\n                                <p data-id="924044">\n                                    Studying physics, 5-year integrated masters program, currently at 4th year, taking it slow because of web development work.</p>\n                            </article>\n                            <article class="">\n                                <h1 class="oRowTitle">\n                                    Diploma, Chemistry, Ecology, Physics\n                                    <span class="oHMin">\n                                        Chemistry School</span>\n                                </h1>\n                                <div class="oSupportInfo">\n                                    2000 - 2004</div>\n                                <p data-id="924042">\n                                    <span class="jsTruncated">Graduated from Chemistry School, class Ecology technician, with highest grades. Taken interest in physics, astronomy, chemistry and computer sciences during school. Attended number of regional competitions as well as two international competitions - Scien&nbsp;…&nbsp;\n                                        <span class="oMore oMoreSmall">more</span>\n                                    </span>\n                                    <span class="jsFull isHidden">Graduated from Chemistry School, class Ecology technician, with highest grades. Taken interest in physics, astronomy, chemistry and computer sciences during school. Attended number of regional competitions as well as two international competitions - Science Expo (Moscow 2003) and European Laboratory competition 2002 in Ljubljana.&nbsp;&nbsp;\n                                        <span class="oMore oMoreSmall">less</span>\n                                    </span>\n                                </p>\n                            </article>\n                        </section>\n\n                        <section class="oListLite" id="profileOtherExperiencesSection">\n                            <h2 class="oH2Lite">Other Experience</h2>\n\n\n                            <article class="">\n                                <h1 class="oH4">VSA 2008 - 2011</h1>\n                                <p>Assistant and team-leader of Visnjan School of Astronomy, a summer school for gifted children centered around astronomy, but entering various fields of science and technology.\n                                    <br>\n                                    <br>Projects:\n                                    <br>\n                                    <br>Cosmic ray detector (assistant to prof. Galovic)\n                                    <br>\n                                    <a href="https://www.odesk.com/leaving-odesk?ref=http%3A%2F%2Fwww.astro.hr%2Fvsa2008%2Fcosmic.htm" title="You are about to go to a URL outside odesk.com" target="_blank">http://www.astro.hr/vsa2008/cosmic.htm</a>\n                                    <br>\n                                    <br>Astronomy Dome automation (project leader)\n                                    <br>\n                                    <a href="https://www.odesk.com/leaving-odesk?ref=http%3A%2F%2Fwww.astro.hr%2Fvsa2009%2Fprojects.htm%23dome" title="You are about to go to a URL outside odesk.com" target="_blank">http://www.astro.hr/vsa2009/projects.htm#dome</a>\n                                    <br>\n                                    <br>Telescope automation (team leader, work in progress)\n                                    <br>\n                                    <a href="https://www.odesk.com/leaving-odesk?ref=http%3A%2F%2Fwww.astro.hr%2Fvsa2010%2Fprojects.htm" title="You are about to go to a URL outside odesk.com" target="_blank">http://www.astro.hr/vsa2010/projects.htm</a>\n                                    <br>\n                                    <a href="https://www.odesk.com/leaving-odesk?ref=http%3A%2F%2Fwww.astro.hr%2Fvsa2011%2Fprojects.htm" title="You are about to go to a URL outside odesk.com" target="_blank">http://www.astro.hr/vsa2011/projects.htm</a>\n                                </p>\n                            </article>\n                        </section>\n\n                    </div>\n                </div>\n                <aside class="oSide">\n                    <section class="oSideSection" id="applicationDetailsClientActions">\n                        <h1 class="oHidden">Application actions</h1>\n\n\n\n                        <section id="applicantsActions" class="txtCenter jsApplicantActions">\n\n                            \n                            <div class="oDropdown" dropdown-menu>\n                                \n                                <button title="Contact"  ng-disabled="invited[key] === key" class="oBtn oBtnSecondary oBtnJumbo jsContactContractor oDropdownBtn" ng-click="inviteUser(user); messaging = true;" ng-class="{messaging: messaging === true}" invite><i class="oCheckmarkIcon" ng-show="invited[key] === key"></i><span ng-bind="invited[key] === key && \'Invitation sent\' || user.messaged === true && \'Hire (send offer)\' || \'Send Message\'"></span></button>\n\n                                <i class="oBtn oBtnSecondary oBtnJumbo oDropdownIcon" ng-click="toggleSelect()"></i>\n                                <ul class=\'oDropdownMenu oDropdownLrg oTxtMed txtLeft\' ng-show="isOpen">\n                                    <li>Save Freelancer</li>\n                                    <li>Start trial project</li>\n                                    <li>Decline applicant</li>\n                                </ul>\n                            </div>\n                            \n\n                            <div class="oSendMessage jsSendMessage"></div>\n                            <div class="oAtsSubActions">\n                                <div class="jsReportToOdesk277313306"></div>\n                                <div class="txtLeft">\n                                     <!--<ul>\n                                        <li class="oTxtMed">\n                                           <a ng-hide="user.messaged && activeDay === 3" id="applicationDetailsClientActionHireNowF2687" class="db">Hire Now</a>\n                                        </li>\n                                        <li class="oTxtMed">\n                                            <a id="applicationDetailsClientActionHireNowF2687" class="db">Hide</a>\n                                        </li>\n                                    </ul>-->\n                                </div>\n                            </div>\n                            <input type="hidden" id="applicantId" value="277313306">\n                        </section>\n                        <section id="tempApplicantsActionsUnhide" class="txtCenter jsApplicantHidden isHidden">\n                            <h1 class="isHidden">Hidden</h1>\n                            <p>You have chosen to hide this application from your list. Please unhide before taking any other action.</p>\n                            <p><a class="oBtn oBtnPrimary jsLogClickEvent" id="jsDoUnhideAtsShortlistingExperiment" href="/applications/277313306/unarchive/" title="" data-reference="277313306" data-jobreference="~016a138f4adc868c7e" data-event-type="unhide">Unhide</a>\n                            </p>\n                            <input type="hidden" id="applicantId" value="277313306">\n                        </section>\n\n                    </section>\n\n                    <section class="oSideSection">\n                        <h3 class="oH3 oMute oH3Lite">Work history</h3>\n                        <ul class="oPlainList">\n                            <li>\n                                <strong class="oTxtMed" ng-bind="user.feedback | number:2"></strong>\n                                <div class="oStarsContainer" data-content="4.74 stars" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                    <div class="oStarsValue" style="width:94.710366024785%"></div>\n                                </div>\n                            </li>\n\n                            <li class="oTxtMed">\n                                <strong class="oTxtMed">1,109</strong>\n                                <span class="oMute">hours worked</span>\n                            </li>\n                            <li class="oTxtMed">\n                                <strong class="oTxtMed">19</strong>\n                                <span class="oMute">jobs</span>\n                            </li>\n                            <li class="oTxtMed" data-content="100% of past clients would rehire or recommend this freelancer" data-width="230px" data-class-name="oFlyoutMed" data-rel="flyout">\n                                <strong class="oTxtMed" id="jsHireAgainValue">100%</strong>\n                                <span class="oMute">Recommended</span>\n                            </li>\n                        </ul>\n                    </section>\n\n\n\n                    <section>\n                        <h3 class="oH3 oMute oH3Lite">Availability</h3>\n                        <ul class="oPlainList">\n                            <li class="oTxtMed">\n                                <strong>\n                                    Available</strong>\n                            </li>\n                            <li class="oTxtMed">\n                                <strong>\n                                    Full time</strong>\n                                <span class="oMute">\n                                    30+ hrs / week</span>\n                            </li>\n                        </ul>\n                    </section>\n\n                    <section>\n                        <h3 class="oH3 oMute oH3Lite">Languages</h3>\n                        <ul class="oPlainList">\n                            <li>\n                                <strong>English</strong>\n                                <span class="oMute">- Fluent</span>\n                                <div class="oMute oTxtSmall">\n                                    <strong>Self-Assessed</strong>\n                                </div>\n                            </li>\n                            <li>\n                                <strong>Croatian</strong>\n                                <span class="oMute">- Native</span>\n                                <div class="oMute oTxtSmall">\n                                    <strong>Self-Assessed</strong>\n                                </div>\n                            </li>\n                        </ul>\n                    </section>\n\n                </aside>\n                <span class="oRight oMute isHidden" id="successfulFlaggingMessage" style="height: 31px;">Thanks for flagging!</span><a data-userid="fhrzenjak" data-flaggedsubitem="jobapplication" data-flaggedsubitemid="277313306" id="flaggingWidget" class="oMutedLink" data-rel="flyout" data-reveal="#flaggingContainer" data-placement="bottom" data-trigger="click">\n        Flag as inappropriate</a>\n                <aside class="oHidden" id="flaggingContainer">\n                    <h1 class="oH3">Flag as inappropriate</h1>\n                    <p class="oFormWarning isHidden">Sorry, Flagging is temporarily unavailable</p>\n                    <form class="jsFlagsList">\n                        <label class="oOpt oOptLbl">\n                            <input type="checkbox" value="5" id="flagId5">SPAM</label>\n                        <label class="oOpt oOptLbl">\n                            <input type="checkbox" value="6" id="flagId6">Contractor requesting to work outside oDesk</label>\n                    </form>\n                    <footer>\n                        <button class="oBtn oBtnPrimary">Submit</button>\n                        <button class="oBtn oBtnCancel jsFlyoutHide">Cancel</button>\n                    </footer>\n                </aside>\n            </div>\n        </div>\n    </div>\n</div>')
}]);

// Angular Rails Template
// source: app/assets/templates/recommended_applicants.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("recommended_applicants.html", '        <h2 class="oH2Low oH2Border" ng-click="open = !open; wayRefresh()" ng-class="{active:open === true}" sticky-bar>\n            <div class="innerWrap">\n                <i class="oHToggle animated" ng-class="{isCollapsed:open === false}"></i>\n                <strong class="ib oTxtMega txtMiddle" ng-bind="sectionCount"></strong>\n                <span class="ib oTxtMega txtMiddle" ng-bind="sectionTitle"></span>\n                <select ng-click="$event.stopPropagation();" ng-show="tileSort === true" class="oInputInline jsLogChangeEvent oSortInput oRight">\n                    <option value="s_bestmatch_score;desc" selected="">Best Match</option>\n                    <option value="s_ctime;desc">Newest Applicants</option>\n                    <option value="s_ctime;asc">Oldest Applicants</option>\n                    <option value="s_feedback_score;desc">Feedback</option>\n                    <option value="s_total_hours;desc">oDesk Hours</option>\n                    <option value="s_pay_rate;asc">Rate (low to high)</option>\n                    <option value="s_pay_rate;desc">Rate (high to low)</option>\n                </select>\n            </div>\n        </h2>\n        <section ng-init="open = true" ng-show="open" class="applicantContent">\n            <article class="oContractorTile jsSimilarTile oProfileTileLead animated" id="profile_4733042" data-position="13" ng-repeat="(key, user) in recommendedApplicants" ng-animate="\'user\'">\n                <div class="cols">\n                    <div class="col col1of8 oImg">\n                        <img id="portrait_3" class="oPortraitLarge" alt="Li Wen" ng-src="{{user.image}}">\n                    </div>\n                    <div class="cols col col7of8">\n                        <div class="cols p">\n                            <div class="col col6of8">\n                                <hgroup class="oProfileTileTitle">\n                                    <h1 class="oRowTitle">\n                                        <a title="Li Wen" class="jsContractorProfileLink oHInline" data-user-id="{{key}}" ng-bind="user.name" ui-sref=".application({userId : {{key}} })"></a>\n                                    </h1>\n\n                                    <h3 ng-bind="user.title"></h3>\n                                </hgroup>\n                            </div>\n                            <div class="col col2of8 oRight txtRight npad">\n\n                                <div class="oDropdown" dropdown-menu>\n                                    <button title="Contact"  class="oBtn oBtnSecondary jsContactContractor oDropdownBtn" ng-click="inviteUser(user); messaging = true; user.messaged = true;" ng-class="{messaging: messaging === true}" invite>Send message</button>\n\n                                    <i class="oBtn oBtnSecondary oDropdownIcon" ng-click="toggleSelect()"></i>\n                                    <ul class=\'oDropdownMenu\' ng-show="isOpen">\n                                        <li>Save Freelancer</li>\n                                        <li>Start trial project</li>\n                                        <li>Decline applicant</li>\n                                        <li>Hire (send offer)</li>\n                                    </ul>\n                                </div>\n                                <span class="oBtn oBtnSecondary oHideButton jsHide jsLogClickEvent" data-event-type="hide" data-id="277524504" ng-click="moveUser(key, recommendedApplicants, hiddenApplicants); updateCount(); hiddenChange()"><i class="oXIcon jsNoToggle"></i>\n                                </span>\n                            </div>\n                        </div>\n                        <div class="cols txtRight oFeedbackRow">\n                            <div class="col oTxtMed jsRate">\n                                <span ng-bind="user.price | number:2"></span>\n                                <span class="oRateTime">/hr</span>\n                            </div>\n\n                            <div class="col oTxtMed jsHours">\n                                <span ng-bind="user.hours"></span>\n                                <span class="oRateTime">hours</span>\n                            </div>\n\n                            <div class="col">\n                                <div class="oStarsContainer oStarsMedium txtMiddle">\n                                    <div class="oStarsValue" style="width:99.334895538736%"></div>\n                                </div>\n                                <span class="oStarsTotal oStarsMedium txtMiddle" ng-bind="user.feedback | number:2"></span>\n\n                            </div>\n                            <div class="col oTxtMed">\n                                <span ng-bind="user.clientSatisfaction"></span>%\n                                <span class="oRateTime">Client satisfaction</span>\n                            </div>\n                        </div>\n                        <div class="cols p">\n                            <div class="col col4of8">\n\n                                <div class="oDescription lhBig">\n                                    <h3 class="p" ng-bind="user.screeningQuesitons[0]"></h3>\n                                    <div class="p oTxtEnlarged" ng-bind="user.screeningQuesitons[1]">\n\n                                    </div>\n                                </div>\n                            </div>\n                            <div class="col col4of8">\n                                <div class="oDescription lhBig">\n                                    <h3 class="p" ng-bind="user.screeningQuesitons[2]"></h3>\n                                    <div class="p oTxtEnlarged" ng-bind="user.screeningQuesitons[3]">\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="cols">\n                            <div class="col col4of8">\n\n                                <div class="oAggregation">\n                                    <i class="oIcon oIconLogo"></i>\n\n                                    <div class="oTxtMed ib lhBig">\n                                        <strong ng-bind="user.profileAgg[0]"></strong>\n                                        <span class="oMute">-\n                                            <span ng-bind="user.profileAgg[1]"></span>\n                                        </span>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class="col col4of8">\n\n                                <div class="oMute">\n                                    <strong class="jsCountry">\n                                        <i class="oIconLocation oIcon"></i>\n                                        <span ng-bind="user.location"></span>\n                                    </strong>\n                                    &nbsp;-&nbsp; Tests:\n                                    <a class="jsTests" href="#" ng-bind="user.test"></a>\n                                    &nbsp;-&nbsp; Portfolio:\n                                    <a class="jsPortfolio" href="#" ng-bind="user.portfolio">6</a>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </article>\n        </section>')
}]);

// Angular Rails Template
// source: app/assets/templates/standard-tile.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("standard-tile.html", '\n        <h2 class="oH2Low oH2Border" ng-class="{active:openSection === true}" scroll-if="userWithdrew === true" >\n            <div class="innerWrap">\n                <!--<i class="oHToggle animated" ng-class="{isCollapsed:openSection === false}"></i>\n                <strong class="ib oTxtMega txtMiddle" ng-bind="sectionCount"></strong>\n                <span class="ib oTxtMega txtMiddle" ng-bind="sectionTitle"></span>-->\n\n                <select ng-click="$event.stopPropagation();" ng-show="tileSort === true" class="oInputInline jsLogChangeEvent oSortInput">\n                    <option value="s_bestmatch_score;desc" selected="">Best Match</option>\n                    <option value="s_ctime;desc">Newest Applicants</option>\n                    <option value="s_ctime;asc">Oldest Applicants</option>\n                    <option value="s_feedback_score;desc">Feedback</option>\n                    <option value="s_total_hours;desc">oDesk Hours</option>\n                    <option value="s_pay_rate;asc">Rate (low to high)</option>\n                    <option value="s_pay_rate;desc">Rate (high to low)</option>\n                </select>\n            </div>\n        </h2>\n\n        <section ng-show="openSection" class="applicantContent">\n            <article ng-repeat="(key, user) in applicantSection" class="oContractorTile jsSimilarTile oProfileTileLead searchResultHover animated" id="profile_5341051" ui-sref=".application({userId : {{key}} })">\n\n                <div class="cols tile-inner">\n                    <div class="col col1of8 oImg">\n                        <img id="portrait_1" class="oPortraitLarge" alt="user.name" ng-src="{{user.image}}">\n                    </div>\n\n                    <div class="cols col col7of8">\n                        <div class="cols p">\n                            <div class="col col5of8">\n                                <hgroup class="oProfileTileTitle">\n                                    <h1 class="oRowTitle">\n                                        <a title="Lee C." class="jsContractorProfileLink oHInline" data-user-id="{{key}}" ui-sref=".application({userId : {{key}} })" ng-bind="user.name"></a>\n                                    </h1>\n                                    <h3 ng-bind="user.title"></h3>\n                                </hgroup>\n                            </div>\n\n                            <div class="col col3of8 oRight txtRight npad">\n\n                                <div class="oDropdown" ng-hide="isHidden" dropdown-menu>\n                                     <button title="Contact"  ng-disabled="invited[key] === key" class="oBtn oBtnSecondary jsContactContractor oDropdownBtn" ng-click="inviteUser(user); messaging = true; user.messaged = true; $event.stopPropagation();" ng-class="{messaging: messaging === true}" invite><i class="oCheckmarkIcon" ng-show="invited[key] === key"></i><span ng-bind="invited[key] === key ? \'Invitation sent\' : \'Send message\'"></span></button>\n\n                                    <i class="oBtn oBtnSecondary oDropdownIcon" ng-click="toggleSelect(); $event.stopPropagation();"></i>\n                                    <ul class=\'oDropdownMenu\' ng-show="isOpen">\n                                        <li>Save Freelancer</li>\n                                        <li>Start trial project</li>\n                                        <li>Hire (send offer)</li>\n                                        <li>Decline applicant</li>\n                                    </ul>\n                                </div>\n                                    <span ng-show="canHide" class="oBtn oBtnSecondary oHideButton jsHide jsLogClickEvent" data-event-type="hide" data-id="277524504" ng-click="moveUser(key, applicantSection, hiddenApplicants); updateCount()"><i class="oXIcon jsNoToggle"></i>\n                                </span>\n                                <button title="Contact" ng-show="isHidden" class="oBtn oBtnSecondary jsContactContractor oDropdownBtn" ng-click="moveUser(key, hiddenApplicants, recommendedApplicants); updateCount(); hiddenChange(); $event.stopPropagation();">Unhide</button>\n                            </div>\n                        </div>\n\n                        <div class="cols">\n                            <div class="col col5of8">\n\n                                <div class="p oTxtEnlarged">\n                                    <i class="oIcon oLocationIcon">$</i><strong class="jsCountry" ng-bind="user.location">\n                                    </strong>\n                                    <span class="oNull">\n                                    &nbsp;-&nbsp; Last active:&nbsp;\n                                    <span class="jsActivity" ng-bind="user.lastActive"></span>\n                                    &nbsp;-&nbsp; Tests:\n                                    <a class="jsTests" href="#" ng-bind="user.test"></a>\n                                    &nbsp;-&nbsp; Portfolio:\n                                    <a class="jsPortfolio" href="#" ng-bind="user.portfolio">31</a>\n                                    </span>\n                                </div>\n\n                                <div class="oDescription">\n                                    <div class="jsTruncated">\n                                        <span class="oTxtEnlarged" ng-hide="user.sent === true;" ><span ng-bind="user.description | words:27"></span><span class="oMore oMoreSmall">more</span></span>\n                                        <span class="oTxtEnlarged" ng-show="user.sent === true;"><i class="oIcon oMessagingIcon txtMiddle">à</i>&nbsp;<span ng-bind="noticeText"></span><span class="oMore oMoreSmall"> view messages</span></span>\n                                        \n                                    </div>\n                                    <div class="jsFull isHidden">\n                                        <div>To build a Top 1 app, this is my rule. ✪✪✪✪✪ I LOVE Mobiles. Mobiles Will Change The World With Creative Ideas and Endless Efforts. ✪✪✪✪✪ I am a programer with experience in Unity3D, Corona SDK, Xamarin. Self-directed and motivated Mobile Developer with 7+ years\' experience in Objective C/XCode, Java/J2EE, C/C++ and PHP technologies. Excellent at developing and maintaining client/server applications. I am hardworking and a fast learner with good communication skills and a strong design background. Client satisfaction and quality work are my TOP PRIORITIES. I have strong experience in the iPhone(iOS6 + iPhone5)/iPad(iPad mini) and Android development as well as backend web service. I also have some experience in the following areas: SQLite database, Restful JSON based Web Service, Social Network - Facebook, Twitter, Google API, Audio Streaming, Video Streaming. Development Area: 1) Applications ✔ iPhone, iPod, iPad, Android, Titanium, PhoneGap ✔ design, cocoa, cocoa-touch, obje&nbsp;…&nbsp;</div>\n                                        <div>\n                                            <span class="oMore oMoreSmall">less</span>\n                                        </div>\n                                    </div>\n                                </div>\n\n                            <div class="oSkills">\n                                <div class="jsSkills oSkills">\n                                    <a data-skill="objective-c" class="oSkill isVerified oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=objective-c">objective-c</a>  <a data-skill="iphone-app-development" class="oSkill oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=iphone-app-development">iphone-app-development</a>  <a data-skill="android-app-development" class="oSkill oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=android-app-development">android-app-development</a>  <a data-skill="corona-sdk" class="oSkill oTagSmall oTag" data-contractor="~01c95771650053def3" href="/contractors/?qs=corona-sdk">corona-sdk</a>\n                                    <a title="View all skills" href="/users/Super-Talented-Unity3D-Corona-Xamarin-Developer_%7E01c95771650053def3?tot=30&amp;pos=10">…</a> \n                                </div>\n                            </div>\n                            </div>\n\n\n                            <div class="col txtRight col3of8 oRateFeedbackHours">\n                                <div class="oTxtLarge jsRate">\n                                    $\n                                    <span ng-bind="user.price | number:2"></span>\n                                    <span class="oRateTime">/hr</span>\n                                </div>\n\n                                <div class="oTxtLarge jsHours">\n                                    <span ng-bind="user.hours"></span>\n                                    <span class="oRateTime">hours</span>\n                                </div>\n\n                                <div class="nowrap">\n\n\n                                    <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 5 reviews" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                        <div class="oStarsValue" style="width:100%"></div>\n                                    </div>\n\n                                    <span class="oStarsTotal oStarsMedium" ng-bind="user.feedback | number:2"></span>\n\n                                </div>\n                            </div>\n\n                        </div>\n\n                    </div>\n                </div>\n\n            </article>\n        </section>')
}]);

// Angular Rails Template
// source: app/assets/templates/suggestions.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("suggestions.html", '<div ng-controller="resultsController as results">\n    <section class="oListLite jsSearchResults oATS eo-block-wrapper">\n    <div class="eo-blocker eo-block-default" ng-show="loading">\n        <div class="eo-block-message">Loading</div>\n    </div>\n            <article ng-repeat="(key, result) in searchResultsFiltered" class="oContractorTile oProfileTileLead searchResultHover" id="profile_5341051">\n\n                <div class="cols tile-inner">\n                    <div class="col col1of8 oImg">\n                        <img id="portrait_1" class="oPortraitLarge" alt="result.data.dev_short_name" ng-src="{{result.data.dev_portrait_100}}">\n                    </div>\n\n                    <div class="cols col col7of8">\n                        <div class="cols p">\n                            <div class="col col5of8">\n                                <hgroup class="oProfileTileTitle">\n                                    <h1 class="oRowTitle">\n                                        <a title="{{result.data.dev_short_name}}" class="jsContractorProfileLink oHInline" data-result-id="{{result.data.dev_recno_ciphertext}}" ng-href="https://www.odesk.com/users/_{{result.data.dev_recno_ciphertext}}" ng-bind="result.data.dev_short_name"></a>\n                                    </h1>\n                                    <h3 ng-bind="result.data.dev_profile_title"></h3>\n                                </hgroup>\n                            </div>\n\n                            <div class="col col3of8 oRight txtRight npad">\n\n                                     <button title="Contact"  ng-disabled="invited[key] === key" class="oBtn oBtnSecondary" ng-click="inviteresult(result); $event.stopPropagation();" invite><span ng-bind="\'Save\'"></span></button>\n                                    <span ng-show="canHide" class="oBtn oBtnSecondary oHideButton jsHide jsLogClickEvent" data-event-type="hide" data-id="277524504"><i class="oXIcon jsNoToggle"></i>\n                                </span>\n                                <button title="Contact" ng-show="isHidden" class="oBtn oBtnSecondary jsContactContractor oDropdownBtn" ng-click="moveresult(key, hiddenApplicants, recommendedApplicants); updateCount(); hiddenChange(); $event.stopPropagation();">Unhide</button>\n                            </div>\n                        </div>\n\n                        <div class="cols">\n                            <div class="col col5of8">\n\n                                <div class="p ">\n                                    <i class="oIcon oLocationIcon">$</i><strong class="jsCountry" ng-bind="result.data.dev_country">\n                                    </strong>\n                                    <span class="oNull">\n                                    &nbsp;-&nbsp; Last active:&nbsp;\n                                    <span class="jsActivity" ng-bind="result.data.dev_last_activity"></span>\n                                    &nbsp;-&nbsp; Tests:\n                                    <a class="jsTests" href="#" ng-bind="result.data.dev_test_passed_count"></a>\n                                    &nbsp;-&nbsp; Portfolio:\n                                    <a class="jsPortfolio" href="#" ng-bind="result.data.dev_portfolio_items_count"></a>\n                                    </span>\n                                </div>\n\n                                <div class="oDescription">\n                                    <div class="jsTruncated">\n                                        <span class="oTxtEnlarged" ng-hide="result.sent === true;" ><span ng-bind="result.data.dev_blurb | words:27"></span><span class="oMore oMoreSmall">more</span></span>\n                                        <span class="oTxtEnlarged" ng-show="result.sent === true;"><i class="oIcon oMessagingIcon txtMiddle">à</i>&nbsp;<span ng-bind="noticeText"></span><span class="oMore oMoreSmall"> view messages</span></span>\n                                        \n                                    </div>\n                                    <div class="jsFull isHidden">\n                                        <div>To build a Top 1 app, this is my rule. ✪✪✪✪✪ I LOVE Mobiles. Mobiles Will Change The World With Creative Ideas and Endless Efforts. ✪✪✪✪✪ I am a programer with experience in Unity3D, Corona SDK, Xamarin. Self-directed and motivated Mobile Developer with 7+ years\' experience in Objective C/XCode, Java/J2EE, C/C++ and PHP technologies. Excellent at developing and maintaining client/server applications. I am hardworking and a fast learner with good communication skills and a strong design background. Client satisfaction and quality work are my TOP PRIORITIES. I have strong experience in the iPhone(iOS6 + iPhone5)/iPad(iPad mini) and Android development as well as backend web service. I also have some experience in the following areas: SQLite database, Restful JSON based Web Service, Social Network - Facebook, Twitter, Google API, Audio Streaming, Video Streaming. Development Area: 1) Applications ✔ iPhone, iPod, iPad, Android, Titanium, PhoneGap ✔ design, cocoa, cocoa-touch, obje&nbsp;…&nbsp;</div>\n                                        <div>\n                                            <span class="oMore oMoreSmall">less</span>\n                                        </div>\n                                    </div>\n                                </div>\n\n                            <div class="oSkills">\n                                <div class="jsSkills oSkills">\n                                    <a ng-repeat="skill in result.data.skills | limitTo:4" class="oTag oSkill">\n                                        <span ng-bind="skill.skl_pretty_name"></span>\n                                    </a>        \n                                </div>\n                            </div>\n                            </div>\n\n\n                            <div class="col txtRight col3of8 oRateFeedbackHours">\n                                <div class="oTxtLarge jsRate">\n                                    $\n                                    <span ng-bind="result.data.dev_pay_rate | number:2"></span>\n                                    <span class="oRateTime">/hr</span>\n                                </div>\n\n                                <div class="oTxtLarge jsHours">\n                                    <span ng-bind="result.data.dev_total_hours_actual | number:0"></span>\n                                    <span class="oRateTime">hours</span>\n                                </div>\n\n                                <div class="nowrap">\n\n\n                                    <div class="oStarsContainer oStarsMedium" data-content="5.00 stars, based on 5 reviews" data-class-name="oHelpTip" data-delay="{show: 300, hide: 400}" data-rel="flyout">\n                                        <div class="oStarsValue" style="width:100%"></div>\n                                    </div>\n\n                                    <span class="oStarsTotal oStarsMedium" ng-bind="result.data.dev_adj_score | number:2"></span>\n\n                                </div>\n                            </div>\n\n                        </div>\n\n                    </div>\n                </div>\n\n            </article>\n\n            <pagination total-items="searchResults.length" max-size="maxSize" ng-model="currentPage" ng-change="pageChanged(currentPage)"></pagination>\n        </footer>\n    </section>\n    <div id="ouibounce-modal" style="display: none;" oui-bounce>\n        <div class="underlay"></div>\n        <div class="modal">\n            <button class="oPreviewDialogCloseBtn oRight jsDialogClose"></button>\n            <h1 class="oH1 txtCenter">Low on time? We get it. Why not let us invite some freelancers for you?</h3>\n                <div class="oAttentionIcon">\n                    <i class="oIconEnvelope oIcon"></i>\n                    <i class="oIconVerified oIcon"></i>\n                </div>\n                <div class="oTxtMed txtCenter">\n\n                    <form>\n\n                        <div class="oFieldValue">\n                            <input type="button" class="oBtn oBtnPrimary oBtnLarge oTxtMed" value="Yes! Invite the best freelancers for me">\n                            <a href="" class="oBtn oBtnCancel">No thanks</a>\n                        </div>\n\n                    </form>\n                </div>\n\n\n        </div>\n    </div>\n    <div class="profile-overlay animated" ui-view="profile" ng-show="$state.includes(\'atsHome.search.profile\')" ui-sref="atsHome.search"></div>\n\n\n</div>')
}]);

// Angular Rails Template
// source: app/assets/templates/tag-section.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("tag-section.html", '<div class="tagGroup">\n    <div class="oTagSet">\n    <!-- Platform -->\n        <label class="oBtnBox oBtnBoxSocial jsFancyCheckboxItem oPointer" ng-repeat="(platform, key) in searchTags.Tags.platforms" ng-class="{isActive: key}" >\n            <input type="checkbox" ng-model="searchTags.Tags.platforms[platform]" ng-change="platformSelect(searchTags.Tags.platforms[platform], platform); " tag-selected>\n            <i class="oImg oSocialImg oIconWindows"></i>\n            <span ng-bind="platform"></span>\n        </label>\n    </div>\n    <!-- Devices -->\n    <div class="oTagSet" ng-show="deviceSelected">\n        <label class="oBtnBox oBtnBoxSocial jsFancyCheckboxItem oPointer" ng-repeat="(device, key) in searchTags.Tags.devices" ng-class="{isActive: searchTags.Tags.devices[device]}">\n            <input type="checkbox" ng-model="searchTags.Tags.devices[device]" ng-change="deviceSelect(searchTags.Tags.devices[device])" tag-selected>\n            <i class="oImg oSocialImg oIconWindows"></i>\n            <span ng-bind="device"></span>\n        </label>\n    </div>\n    <!-- Environment -->\n    <div class="oTagSet" ng-show="environmentShow">\n        <label class="oBtnBox oBtnBoxSocial jsFancyCheckboxItem oPointer" ng-repeat="(environment, key) in searchTags.Tags.environments" ng-class="{isActive: searchTags.Tags.environments[environment]}">\n            <input type="checkbox" ng-model="searchTags.Tags.environments[environment]" ng-change="environmentSelect(searchTags.Tags.environments[environment])" tag-selected>\n            <i class="oImg oSocialImg oIconWindows"></i>\n            <span ng-bind="environment"></span>\n        </label>\n    </div>\n    <div class="p-med">\n        <button class="btn btn-primary" ng-disabled="validateCheck(searchTags.Tags)">UPDATE RESULTS</button>\n    </div>\n</div>')
}]);

// Angular Rails Template
// source: app/assets/templates/taskrole-section.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("taskrole-section.html", '    <h3 class="p-x-sml">Which tasks best fit your job?</h3>\n    <h5 class="text-muted p-med">Select relevant tags to improve your results</h5>\n\n    <div class="oTagSet">\n    <!-- Roles -->\n        <label class="oBtnBox oBtnBoxSocial jsFancyCheckboxItem oPointer" ng-repeat="(role, key) in searchTags.Tags.roles" ng-class="{isActive: key}" >\n            <input type="checkbox" ng-model="searchTags.Tags.roles[role]" tag-selected>\n            <i class="oImg oSocialImg oIconWindows"></i>\n            <span ng-bind="role"></span>\n        </label>\n    </div>\n    <div class="p-med">\n        <button class="btn btn-primary" ng-disabled="!objLength(searchTags.Tags.roles).length" ng-click="tab = 3; dropdownTwo = true">Update results</button>\n    </div>')
}]);

// Angular Rails Template
// source: app/assets/templates/xpDetails-section.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("xpDetails-section.html", '    <h3 class="p-x-sml">Experience &amp; Job Length?</h3>\n    <h5 class="text-muted p-lrg">Select relevant tags to improve your results</h5>\n\n    <div class="oTagSet">\n    <!-- Platform -->\n        <label class="oBtnBox oBtnBoxSocial jsFancyCheckboxItem oPointer" ng-repeat="(experience, key) in searchTags.Tags.experiences" ng-class="{isActive: key}" >\n            <input type="checkbox" ng-model="searchTags.Tags.experiences[experience]" tag-selected>\n            <i class="oImg oSocialImg oIconWindows"></i>\n            <span ng-bind="experience"></span>\n        </label>\n    </div>\n    <!-- Devices \n    <div class="oTagSet" ng-show="deviceSelected">\n        <label class="oBtnBox oBtnBoxSocial jsFancyCheckboxItem oPointer" ng-repeat="(device, key) in searchTags.Tags.devices" ng-class="{isActive: searchTags.Tags.devices[device]}">\n            <input type="checkbox" ng-model="searchTags.Tags.devices[device]" ng-change="deviceSelect(searchTags.Tags.devices[device])" tag-selected>\n            <i class="oImg oSocialImg oIconWindows"></i>\n            <span ng-bind="device"></span>\n        </label>\n    </div>-->\n    <!-- Environment -->\n    <div class="oTagSet">\n        <label class="oBtnBox oBtnBoxSocial jsFancyCheckboxItem oPointer" ng-repeat="(type, key) in searchTags.Tags.types" ng-class="{isActive: searchTags.Tags.types[type]}">\n            <input type="checkbox" ng-model="searchTags.Tags.types[type]" tag-selected>\n            <i class="oImg oSocialImg oIconWindows"></i>\n            <span ng-bind="type"></span>\n        </label>\n    </div>\n    <div class="p-med">\n        <button class="btn btn-primary" ng-disabled="!nestedObjLength(searchTags.Tags).length" ng-click="tab = 4; dropdownThree = true">Update results</button>\n    </div>')
}]);


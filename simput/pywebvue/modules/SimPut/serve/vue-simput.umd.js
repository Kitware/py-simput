(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueSimput"] = factory();
	else
		root["VueSimput"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "00ee":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "0366":
/***/ (function(module, exports, __webpack_require__) {

var aCallable = __webpack_require__("59ed");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aCallable(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "057f":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-object-getownpropertynames -- safe */
var toIndexedObject = __webpack_require__("fc6a");
var $getOwnPropertyNames = __webpack_require__("241c").f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ "06cf":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createPropertyDescriptor = __webpack_require__("5c6c");
var toIndexedObject = __webpack_require__("fc6a");
var toPropertyKey = __webpack_require__("a04b");
var has = __webpack_require__("5135");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "0b42":
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__("e8b5");
var isConstructor = __webpack_require__("68ee");
var isObject = __webpack_require__("861d");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "0cfb":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var createElement = __webpack_require__("cc12");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "0d51":
/***/ (function(module, exports) {

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ "1148":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__("a691");
var toString = __webpack_require__("577e");
var requireObjectCoercible = __webpack_require__("1d80");

// `String.prototype.repeat` method implementation
// https://tc39.es/ecma262/#sec-string.prototype.repeat
module.exports = function repeat(count) {
  var str = toString(requireObjectCoercible(this));
  var result = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};


/***/ }),

/***/ "159b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var DOMTokenListPrototype = __webpack_require__("785a");
var forEach = __webpack_require__("17c2");
var createNonEnumerableProperty = __webpack_require__("9112");

var handlePrototype = function (CollectionPrototype) {
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  if (DOMIterables[COLLECTION_NAME]) {
    handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype);
  }
}

handlePrototype(DOMTokenListPrototype);


/***/ }),

/***/ "1626":
/***/ (function(module, exports) {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument === 'function';
};


/***/ }),

/***/ "17c2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__("b727").forEach;
var arrayMethodIsStrict = __webpack_require__("a640");

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),

/***/ "1be4":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "1c7e":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ "1d80":
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "1dde":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "23cb":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "23e7":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var setGlobal = __webpack_require__("ce4e");
var copyConstructorProperties = __webpack_require__("e893");
var isForced = __webpack_require__("94ca");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "241c":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "2a62":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var getMethod = __webpack_require__("dc4a");

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = innerResult.call(iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),

/***/ "2d00":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var userAgent = __webpack_require__("342f");

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ "342f":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "35a1":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("f5df");
var getMethod = __webpack_require__("dc4a");
var Iterators = __webpack_require__("3f8c");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};


/***/ }),

/***/ "37e8":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var anObject = __webpack_require__("825a");
var objectKeys = __webpack_require__("df75");

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "3bbe":
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__("1626");

module.exports = function (argument) {
  if (typeof argument === 'object' || isCallable(argument)) return argument;
  throw TypeError("Can't set " + String(argument) + ' as a prototype');
};


/***/ }),

/***/ "3ca3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;
var toString = __webpack_require__("577e");
var InternalStateModule = __webpack_require__("69f3");
var defineIterator = __webpack_require__("7dd0");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "3f8c":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "408a":
/***/ (function(module, exports) {

var valueOf = 1.0.valueOf;

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
module.exports = function (value) {
  return valueOf.call(value);
};


/***/ }),

/***/ "428f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = global;


/***/ }),

/***/ "44ad":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var classof = __webpack_require__("c6b6");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "44d2":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var create = __webpack_require__("7c73");
var definePropertyModule = __webpack_require__("9bf2");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "485a":
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = fn.call(input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = fn.call(input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "4930":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__("2d00");
var fails = __webpack_require__("d039");

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "4d64":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var toLength = __webpack_require__("50c4");
var toAbsoluteIndex = __webpack_require__("23cb");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "4df4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__("0366");
var toObject = __webpack_require__("7b0b");
var callWithSafeIterationClosing = __webpack_require__("9bdd");
var isArrayIteratorMethod = __webpack_require__("e95a");
var isConstructor = __webpack_require__("68ee");
var toLength = __webpack_require__("50c4");
var createProperty = __webpack_require__("8418");
var getIterator = __webpack_require__("9a1f");
var getIteratorMethod = __webpack_require__("35a1");

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = IS_CONSTRUCTOR ? new this(length) : Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ "50c4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "5135":
/***/ (function(module, exports, __webpack_require__) {

var toObject = __webpack_require__("7b0b");

var hasOwnProperty = {}.hasOwnProperty;

module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};


/***/ }),

/***/ "5692":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("c430");
var store = __webpack_require__("c6cd");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.18.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "56ef":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var anObject = __webpack_require__("825a");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "577e":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("f5df");

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};


/***/ }),

/***/ "5899":
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "58a8":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");
var toString = __webpack_require__("577e");
var whitespaces = __webpack_require__("5899");

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = toString(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "59ed":
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__("1626");
var tryToString = __webpack_require__("0d51");

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ "5c6c":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "5e77":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var has = __webpack_require__("5135");

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = has(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ "5e89":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

var floor = Math.floor;

// `Number.isInteger` method implementation
// https://tc39.es/ecma262/#sec-number.isinteger
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),

/***/ "6547":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");
var toString = __webpack_require__("577e");
var requireObjectCoercible = __webpack_require__("1d80");

// `String.prototype.codePointAt` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "65f0":
/***/ (function(module, exports, __webpack_require__) {

var arraySpeciesConstructor = __webpack_require__("0b42");

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),

/***/ "68ee":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var isCallable = __webpack_require__("1626");
var classof = __webpack_require__("f5df");
var getBuiltIn = __webpack_require__("d066");
var inspectSource = __webpack_require__("8925");

var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = constructorRegExp.exec;
var INCORRECT_TO_STRING = !constructorRegExp.exec(function () { /* empty */ });

var isConstructorModern = function (argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(Object, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function (argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
    // we can't check .prototype since constructors produced by .bind haven't it
  } return INCORRECT_TO_STRING || !!exec.call(constructorRegExp, inspectSource(argument));
};

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),

/***/ "69f3":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");
var createNonEnumerableProperty = __webpack_require__("9112");
var objectHas = __webpack_require__("5135");
var shared = __webpack_require__("c6cd");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "6eeb":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");
var has = __webpack_require__("5135");
var createNonEnumerableProperty = __webpack_require__("9112");
var setGlobal = __webpack_require__("ce4e");
var inspectSource = __webpack_require__("8925");
var InternalStateModule = __webpack_require__("69f3");
var CONFIGURABLE_FUNCTION_NAME = __webpack_require__("5e77").CONFIGURABLE;

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;
  if (isCallable(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (!has(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
      createNonEnumerableProperty(value, 'name', name);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "7156":
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");
var setPrototypeOf = __webpack_require__("d2bb");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "7418":
/***/ (function(module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "746f":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var has = __webpack_require__("5135");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineProperty = __webpack_require__("9bf2").f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ "7839":
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "785a":
/***/ (function(module, exports, __webpack_require__) {

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = __webpack_require__("cc12");

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;


/***/ }),

/***/ "7b0b":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "7c73":
/***/ (function(module, exports, __webpack_require__) {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__("825a");
var defineProperties = __webpack_require__("37e8");
var enumBugKeys = __webpack_require__("7839");
var hiddenKeys = __webpack_require__("d012");
var html = __webpack_require__("1be4");
var documentCreateElement = __webpack_require__("cc12");
var sharedKey = __webpack_require__("f772");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "7db0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $find = __webpack_require__("b727").find;
var addToUnscopables = __webpack_require__("44d2");

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.es/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ }),

/***/ "7dd0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var IS_PURE = __webpack_require__("c430");
var FunctionName = __webpack_require__("5e77");
var isCallable = __webpack_require__("1626");
var createIteratorConstructor = __webpack_require__("9ed3");
var getPrototypeOf = __webpack_require__("e163");
var setPrototypeOf = __webpack_require__("d2bb");
var setToStringTag = __webpack_require__("d44e");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var wellKnownSymbol = __webpack_require__("b622");
var Iterators = __webpack_require__("3f8c");
var IteratorsCore = __webpack_require__("ae93");

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          redefine(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return nativeIterator.call(this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    redefine(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};


/***/ }),

/***/ "7f9a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");
var inspectSource = __webpack_require__("8925");

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "825a":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};


/***/ }),

/***/ "83ab":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "8418":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPropertyKey = __webpack_require__("a04b");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "861d":
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__("1626");

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8925":
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__("1626");
var store = __webpack_require__("c6cd");

var functionToString = Function.toString;

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "8ba4":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var isInteger = __webpack_require__("5e89");

// `Number.isInteger` method
// https://tc39.es/ecma262/#sec-number.isinteger
$({ target: 'Number', stat: true }, {
  isInteger: isInteger
});


/***/ }),

/***/ "90e3":
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "9112":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "9129":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");

// `Number.isNaN` method
// https://tc39.es/ecma262/#sec-number.isnan
$({ target: 'Number', stat: true }, {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare -- NaN check
    return number != number;
  }
});


/***/ }),

/***/ "94ca":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var isCallable = __webpack_require__("1626");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "99af":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var isArray = __webpack_require__("e8b5");
var isObject = __webpack_require__("861d");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var createProperty = __webpack_require__("8418");
var arraySpeciesCreate = __webpack_require__("65f0");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ "9a1f":
/***/ (function(module, exports, __webpack_require__) {

var aCallable = __webpack_require__("59ed");
var anObject = __webpack_require__("825a");
var getIteratorMethod = __webpack_require__("35a1");

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(iteratorMethod.call(argument));
  throw TypeError(String(argument) + ' is not iterable');
};


/***/ }),

/***/ "9bdd":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var iteratorClose = __webpack_require__("2a62");

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};


/***/ }),

/***/ "9bf2":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");
var anObject = __webpack_require__("825a");
var toPropertyKey = __webpack_require__("a04b");

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "9ed3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__("ae93").IteratorPrototype;
var create = __webpack_require__("7c73");
var createPropertyDescriptor = __webpack_require__("5c6c");
var setToStringTag = __webpack_require__("d44e");
var Iterators = __webpack_require__("3f8c");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "a04b":
/***/ (function(module, exports, __webpack_require__) {

var toPrimitive = __webpack_require__("c04e");
var isSymbol = __webpack_require__("d9b5");

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : String(key);
};


/***/ }),

/***/ "a15b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var IndexedObject = __webpack_require__("44ad");
var toIndexedObject = __webpack_require__("fc6a");
var arrayMethodIsStrict = __webpack_require__("a640");

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ "a434":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var toAbsoluteIndex = __webpack_require__("23cb");
var toInteger = __webpack_require__("a691");
var toLength = __webpack_require__("50c4");
var toObject = __webpack_require__("7b0b");
var arraySpeciesCreate = __webpack_require__("65f0");
var createProperty = __webpack_require__("8418");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),

/***/ "a4d3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var getBuiltIn = __webpack_require__("d066");
var IS_PURE = __webpack_require__("c430");
var DESCRIPTORS = __webpack_require__("83ab");
var NATIVE_SYMBOL = __webpack_require__("4930");
var fails = __webpack_require__("d039");
var has = __webpack_require__("5135");
var isArray = __webpack_require__("e8b5");
var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");
var isSymbol = __webpack_require__("d9b5");
var anObject = __webpack_require__("825a");
var toObject = __webpack_require__("7b0b");
var toIndexedObject = __webpack_require__("fc6a");
var toPropertyKey = __webpack_require__("a04b");
var $toString = __webpack_require__("577e");
var createPropertyDescriptor = __webpack_require__("5c6c");
var nativeObjectCreate = __webpack_require__("7c73");
var objectKeys = __webpack_require__("df75");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertyNamesExternal = __webpack_require__("057f");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var redefine = __webpack_require__("6eeb");
var shared = __webpack_require__("5692");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");
var uid = __webpack_require__("90e3");
var wellKnownSymbol = __webpack_require__("b622");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineWellKnownSymbol = __webpack_require__("746f");
var setToStringTag = __webpack_require__("d44e");
var InternalStateModule = __webpack_require__("69f3");
var $forEach = __webpack_require__("b727").forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPropertyKey(P);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPropertyKey(V);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPropertyKey(P);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = $toString(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.es/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (isCallable($replacer)) value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  var valueOf = $Symbol[PROTOTYPE].valueOf;
  redefine($Symbol[PROTOTYPE], TO_PRIMITIVE, function () {
    return valueOf.apply(this, arguments);
  });
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ "a630":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var from = __webpack_require__("4df4");
var checkCorrectnessOfIteration = __webpack_require__("1c7e");

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),

/***/ "a640":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("d039");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "a691":
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "a9e3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var isForced = __webpack_require__("94ca");
var redefine = __webpack_require__("6eeb");
var has = __webpack_require__("5135");
var classof = __webpack_require__("c6b6");
var inheritIfRequired = __webpack_require__("7156");
var isSymbol = __webpack_require__("d9b5");
var toPrimitive = __webpack_require__("c04e");
var fails = __webpack_require__("d039");
var create = __webpack_require__("7c73");
var getOwnPropertyNames = __webpack_require__("241c").f;
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var defineProperty = __webpack_require__("9bf2").f;
var trim = __webpack_require__("58a8").trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber
var toNumber = function (argument) {
  if (isSymbol(argument)) throw TypeError('Cannot convert a Symbol value to a number');
  var it = toPrimitive(argument, 'number');
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,' +
    // ESNext
    'fromString,range'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),

/***/ "ae93":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("d039");
var isCallable = __webpack_require__("1626");
var create = __webpack_require__("7c73");
var getPrototypeOf = __webpack_require__("e163");
var redefine = __webpack_require__("6eeb");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  redefine(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "b041":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var classof = __webpack_require__("f5df");

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "b0c0":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var FUNCTION_NAME_EXISTS = __webpack_require__("5e77").EXISTS;
var defineProperty = __webpack_require__("9bf2").f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ "b622":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var shared = __webpack_require__("5692");
var has = __webpack_require__("5135");
var uid = __webpack_require__("90e3");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && has(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "b64b":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var toObject = __webpack_require__("7b0b");
var nativeKeys = __webpack_require__("df75");
var fails = __webpack_require__("d039");

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "b680":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var toInteger = __webpack_require__("a691");
var thisNumberValue = __webpack_require__("408a");
var repeat = __webpack_require__("1148");
var fails = __webpack_require__("d039");

var nativeToFixed = 1.0.toFixed;
var floor = Math.floor;

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

var multiply = function (data, n, c) {
  var index = -1;
  var c2 = c;
  while (++index < 6) {
    c2 += n * data[index];
    data[index] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};

var divide = function (data, n) {
  var index = 6;
  var c = 0;
  while (--index >= 0) {
    c += data[index];
    data[index] = floor(c / n);
    c = (c % n) * 1e7;
  }
};

var dataToString = function (data) {
  var index = 6;
  var s = '';
  while (--index >= 0) {
    if (s !== '' || index === 0 || data[index] !== 0) {
      var t = String(data[index]);
      s = s === '' ? t : s + repeat.call('0', 7 - t.length) + t;
    }
  } return s;
};

var FORCED = nativeToFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !fails(function () {
  // V8 ~ Android 4.3-
  nativeToFixed.call({});
});

// `Number.prototype.toFixed` method
// https://tc39.es/ecma262/#sec-number.prototype.tofixed
$({ target: 'Number', proto: true, forced: FORCED }, {
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toInteger(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare -- NaN check
    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String(number);
    if (number < 0) {
      sign = '-';
      number = -number;
    }
    if (number > 1e-21) {
      e = log(number * pow(2, 69, 1)) - 69;
      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(data, 0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(data, 1e7, 0);
          j -= 7;
        }
        multiply(data, pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(data, 1 << 23);
          j -= 23;
        }
        divide(data, 1 << j);
        multiply(data, 1, 1);
        divide(data, 2);
        result = dataToString(data);
      } else {
        multiply(data, 0, z);
        multiply(data, 1 << -e, 0);
        result = dataToString(data) + repeat.call('0', fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits
        ? '0.' + repeat.call('0', fractDigits - k) + result
        : result.slice(0, k - fractDigits) + '.' + result.slice(k - fractDigits));
    } else {
      result = sign + result;
    } return result;
  }
});


/***/ }),

/***/ "b727":
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__("0366");
var IndexedObject = __webpack_require__("44ad");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var arraySpeciesCreate = __webpack_require__("65f0");

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push.call(target, value); // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};


/***/ }),

/***/ "c04e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var isSymbol = __webpack_require__("d9b5");
var getMethod = __webpack_require__("dc4a");
var ordinaryToPrimitive = __webpack_require__("485a");
var wellKnownSymbol = __webpack_require__("b622");

var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = exoticToPrim.call(input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ "c430":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "c6b6":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "c6cd":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var setGlobal = __webpack_require__("ce4e");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "ca84":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var toIndexedObject = __webpack_require__("fc6a");
var indexOf = __webpack_require__("4d64").indexOf;
var hiddenKeys = __webpack_require__("d012");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "cc12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "ce4e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = function (key, value) {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "d012":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "d039":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "d066":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "d1e7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "d28b":
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__("746f");

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),

/***/ "d2bb":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var anObject = __webpack_require__("825a");
var aPossiblePrototype = __webpack_require__("3bbe");

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "d3b7":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var redefine = __webpack_require__("6eeb");
var toString = __webpack_require__("b041");

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ "d44e":
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__("9bf2").f;
var has = __webpack_require__("5135");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "d81d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $map = __webpack_require__("b727").map;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "d9b5":
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__("1626");
var getBuiltIn = __webpack_require__("d066");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && Object(it) instanceof $Symbol;
};


/***/ }),

/***/ "da84":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "dc4a":
/***/ (function(module, exports, __webpack_require__) {

var aCallable = __webpack_require__("59ed");

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ "ddb0":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var DOMTokenListPrototype = __webpack_require__("785a");
var ArrayIteratorMethods = __webpack_require__("e260");
var createNonEnumerableProperty = __webpack_require__("9112");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');


/***/ }),

/***/ "df75":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "e01a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.es/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var has = __webpack_require__("5135");
var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");
var defineProperty = __webpack_require__("9bf2").f;
var copyConstructorProperties = __webpack_require__("e893");

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && isCallable(NativeSymbol) && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var nativeSymbol = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = nativeSymbol ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),

/***/ "e163":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var isCallable = __webpack_require__("1626");
var toObject = __webpack_require__("7b0b");
var sharedKey = __webpack_require__("f772");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (has(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "e177":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "e260":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__("fc6a");
var addToUnscopables = __webpack_require__("44d2");
var Iterators = __webpack_require__("3f8c");
var InternalStateModule = __webpack_require__("69f3");
var defineIterator = __webpack_require__("7dd0");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "e285":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

var globalIsFinite = global.isFinite;

// `Number.isFinite` method
// https://tc39.es/ecma262/#sec-number.isfinite
// eslint-disable-next-line es/no-number-isfinite -- safe
module.exports = Number.isFinite || function isFinite(it) {
  return typeof it == 'number' && globalIsFinite(it);
};


/***/ }),

/***/ "e538":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

exports.f = wellKnownSymbol;


/***/ }),

/***/ "e893":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var ownKeys = __webpack_require__("56ef");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "e8b5":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};


/***/ }),

/***/ "e95a":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var Iterators = __webpack_require__("3f8c");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "f00c":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var numberIsFinite = __webpack_require__("e285");

// `Number.isFinite` method
// https://tc39.es/ecma262/#sec-number.isfinite
$({ target: 'Number', stat: true }, { isFinite: numberIsFinite });


/***/ }),

/***/ "f5df":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var isCallable = __webpack_require__("1626");
var classofRaw = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ "f772":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5692");
var uid = __webpack_require__("90e3");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"286dc8bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./VueSimput/src/components/Simput/template.html?vue&type=template&id=0959d92c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._t("default")}
var staticRenderFns = []


// CONCATENATED MODULE: ./VueSimput/src/components/Simput/template.html?vue&type=template&id=0959d92c&

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("a4d3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__("e01a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__("d28b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js







function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__("a630");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js






function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// CONCATENATED MODULE: ./VueSimput/src/utils.js






var MANAGERS = {};
var utils_DataManager = /*#__PURE__*/function () {
  function DataManager(namespace, wsClient) {
    var _this = this;

    _classCallCheck(this, DataManager);

    this.namespace = namespace;
    this.cache = null;
    this.comm = [];
    this.pending = {};
    this.wsClient = wsClient;
    this.resetCache();
    this.nextTS = 1;
    this.subscription = this.wsClient.getConnection().getSession().subscribe('simput.push', function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          event = _ref2[0];

      var id = event.id,
          data = event.data,
          domains = event.domains,
          type = event.type,
          ui = event.ui;

      if (data) {
        var _this$cache$data$id;

        console.log("data(".concat(id, ")"));
        delete _this.pending[id];
        var before = JSON.stringify((_this$cache$data$id = _this.cache.data[id]) === null || _this$cache$data$id === void 0 ? void 0 : _this$cache$data$id.properties);
        var after = JSON.stringify(data.properties);

        if (before !== after) {
          _this.cache.data[id] = data;
        }

        _this.cache.data[id].mtime = data.mtime;
        _this.cache.data[id].original = JSON.parse(after);
      }

      if (domains) {
        console.log("domains(".concat(id, ")"));
        delete _this.pending["d-".concat(id)];

        var _before = JSON.stringify(_this.cache.domains[id]);

        var _after = JSON.stringify(domains); // console.log(JSON.stringify(domains, null, 2));


        if (_before !== _after) {
          _this.cache.domains[id] = domains;
        }
      }

      if (ui) {
        console.log("ui(".concat(type, ")"));
        delete _this.pending[type];
        _this.cache.ui[type] = ui;
      }

      _this.notify('change', {
        id: id,
        type: type
      });

      if (ui) {
        _this.nextTS += 1;

        _this.notify('templateTS');
      }
    });
    this.subscriptionUI = this.wsClient.getConnection().getSession().subscribe('simput.event', function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 1),
          event = _ref4[0];

      if (event.topic === 'ui-change') {
        var typesToFetch = Object.keys(_this.cache.ui);
        _this.cache.ui = {};

        for (var i = 0; i < typesToFetch.length; i++) {
          _this.getUI(typesToFetch[i]);
        }
      }

      if (event.topic === 'data-change') {
        var ids = event.ids,
            action = event.action;

        for (var _i = 0; _i < ids.length; _i++) {
          if (_this.cache.data[ids[_i]]) {
            if (action === 'changed') {
              console.log('getData from data-change', ids[_i]);

              _this.getData(ids[_i], true);
            }
          }
        }
      }
    });

    this.onDirty = function (_ref5) {
      var id = _ref5.id,
          name = _ref5.name;
      var value = _this.cache.data[id].properties[name];
      console.log(' > dirty', id, name);

      _this.wsClient.getRemote().PyWebVue.trigger("".concat(_this.namespace, "Update"), [[{
        id: id,
        name: name,
        value: value
      }]]);
    };
  }

  _createClass(DataManager, [{
    key: "resetCache",
    value: function resetCache() {
      this.cache = {
        data: {},
        ui: {},
        domains: {}
      };
      this.wsClient.getRemote().PyWebVue.trigger("".concat(this.namespace, "ResetCache"), []);
    }
  }, {
    key: "connectBus",
    value: function connectBus(bus) {
      if (this.comm.indexOf(bus) === -1) {
        this.comm.push(bus);
        bus.$emit('connect');
        bus.$on('dirty', this.onDirty);
      }
    }
  }, {
    key: "disconnectBus",
    value: function disconnectBus(bus) {
      var index = this.comm.indexOf(bus);

      if (index > -1) {
        bus.$emit('disconnect');
        bus.$off('dirty', this.onDirty);
        this.comm.splice(index, 1);
      }
    }
  }, {
    key: "notify",
    value: function notify(topic, event) {
      for (var i = 0; i < this.comm.length; i++) {
        this.comm[i].$emit(topic, event);
      }
    }
  }, {
    key: "getData",
    value: function getData(id) {
      var forceFetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var data = this.cache.data[id];

      if ((!data || forceFetch) && !this.pending[id]) {
        console.log(' > fetch data', id, forceFetch);
        this.pending[id] = true;
        this.wsClient.getRemote().PyWebVue.trigger("".concat(this.namespace, "Fetch"), [], {
          id: id
        });
      }

      return data;
    }
  }, {
    key: "getDomains",
    value: function getDomains(id) {
      var forceFetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var domains = this.cache.domains[id];

      if ((!domains || forceFetch) && !this.pending["d-".concat(id)]) {
        console.log(' > fetch domain', id, forceFetch);
        this.pending["d-".concat(id)] = true;
        this.wsClient.getRemote().PyWebVue.trigger("".concat(this.namespace, "Fetch"), [], {
          domains: id
        });
      }

      return domains;
    }
  }, {
    key: "getUI",
    value: function getUI(type) {
      var forceFetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var ui = this.cache.ui[type];

      if ((!ui || forceFetch) && !this.pending[type]) {
        console.log(' > fetch ui', type, forceFetch);
        this.pending[type] = true;
        this.wsClient.getRemote().PyWebVue.trigger("".concat(this.namespace, "Fetch"), [], {
          type: type
        });
      }

      return ui;
    }
  }, {
    key: "getUITimeStamp",
    value: function getUITimeStamp() {
      return this.nextTS;
    }
  }, {
    key: "refresh",
    value: function refresh(id, name) {
      console.log(' > refresh', id, name);
      this.wsClient.getRemote().PyWebVue.trigger("".concat(this.namespace, "Refresh"), [id, name]);
    }
  }]);

  return DataManager;
}();
function getSimputManager(id, namespace, client) {
  if (!client) {
    return null;
  }

  if (MANAGERS[id]) {
    return MANAGERS[id];
  }

  var manager = new utils_DataManager(namespace, client);
  MANAGERS[id] = manager;
  return manager;
}
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/eslint-loader??ref--13-0!./VueSimput/src/components/Simput/script.js?vue&type=script&lang=js&

/* harmony default export */ var scriptvue_type_script_lang_js_ = ({
  name: 'Simput',
  props: {
    wsClient: {
      type: Object
    },
    namespace: {
      type: String,
      default: 'simput'
    }
  },
  created: function created() {
    this.updateManager();
  },
  beforeUnmount: function beforeUnmount() {
    if (this.manager) {
      this.manager.disconnectBus(this);
    }

    this.manager = null;
  },
  watch: {
    namespace: function namespace() {
      this.updateManager();
    }
  },
  methods: {
    updateManager: function updateManager() {
      if (!this.wsClient) {
        return;
      }

      if (this.manager) {
        this.manager.disconnectBus(this);
      }

      this.managerId = this.get("".concat(this.namespace, "Id"));
      this.manager = getSimputManager(this.managerId, this.namespace, this.wsClient);
      this.manager.connectBus(this);
    }
  },
  provide: function provide() {
    var _this = this;

    return {
      simputChannel: this,
      getSimput: function getSimput() {
        return _this.manager;
      }
    };
  },
  inject: ['get']
});
// CONCATENATED MODULE: ./VueSimput/src/components/Simput/script.js?vue&type=script&lang=js&
 /* harmony default export */ var Simput_scriptvue_type_script_lang_js_ = (scriptvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./VueSimput/src/components/Simput/index.vue





/* normalize component */

var component = normalizeComponent(
  Simput_scriptvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Simput = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"286dc8bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./VueSimput/src/components/SimputItem/template.html?vue&type=template&id=3b0ac8ce&
var templatevue_type_template_id_3b0ac8ce_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.available)?_c('div',[(!_vm.noUi)?_c('v-runtime-template',{attrs:{"template":_vm.ui}}):_vm._e(),_vm._t("default",null,null,_vm.all),_vm._t("properties",null,null,_vm.properties)],2):_vm._e()}
var templatevue_type_template_id_3b0ac8ce_staticRenderFns = []


// CONCATENATED MODULE: ./VueSimput/src/components/SimputItem/template.html?vue&type=template&id=3b0ac8ce&

// CONCATENATED MODULE: ./node_modules/v-runtime-template/dist/v-runtime-template.es.js
var t=function(t,o,e){if(!o.hasOwnProperty(e)){var r=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(o,e,r)}};/* harmony default export */ var v_runtime_template_es = ({props:{template:String,parent:Object,templateProps:{type:Object,default:function(){return{}}}},render:function(o){if(this.template){var e=this.parent||this.$parent,r=e.$data;void 0===r&&(r={});var n=e.$props;void 0===n&&(n={});var a=e.$options;void 0===a&&(a={});var p=a.components;void 0===p&&(p={});var c=a.computed;void 0===c&&(c={});var i=a.methods;void 0===i&&(i={});var s=this.$data;void 0===s&&(s={});var d=this.$props;void 0===d&&(d={});var v=this.$options;void 0===v&&(v={});var f=v.methods;void 0===f&&(f={});var m=v.computed;void 0===m&&(m={});var u=v.components;void 0===u&&(u={});var h={$data:{},$props:{},$options:{},components:{},computed:{},methods:{}};Object.keys(r).forEach(function(t){void 0===s[t]&&(h.$data[t]=r[t])}),Object.keys(n).forEach(function(t){void 0===d[t]&&(h.$props[t]=n[t])}),Object.keys(i).forEach(function(t){void 0===f[t]&&(h.methods[t]=i[t])}),Object.keys(c).forEach(function(t){void 0===m[t]&&(h.computed[t]=c[t])}),Object.keys(p).forEach(function(t){void 0===u[t]&&(h.components[t]=p[t])});var O=Object.keys(h.methods||{}),$=Object.keys(h.$data||{}),b=Object.keys(h.$props||{}),j=Object.keys(this.templateProps),y=$.concat(b).concat(O).concat(j),k=(E=e,P={},O.forEach(function(o){return t(E,P,o)}),P),l=function(o){var e={};return o.forEach(function(o){o&&Object.getOwnPropertyNames(o).forEach(function(r){return t(o,e,r)})}),e}([h.$data,h.$props,k,this.templateProps]);return o({template:this.template||"<div></div>",props:y,computed:h.computed,components:h.components,provide:this.$parent._provided},{props:l})}var E,P}});
//# sourceMappingURL=v-runtime-template.es.js.map

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/eslint-loader??ref--13-0!./VueSimput/src/components/SimputItem/script.js?vue&type=script&lang=js&

/* harmony default export */ var SimputItem_scriptvue_type_script_lang_js_ = ({
  name: 'SimputItem',
  props: {
    itemId: {
      type: String
    },
    noUi: {
      type: Boolean,
      default: false
    }
  },
  components: {
    VRuntimeTemplate: v_runtime_template_es
  },
  data: function data() {
    return {
      data: null,
      ui: null,
      domains: null
    };
  },
  created: function created() {
    var _this = this;

    this.onConnect = function () {
      _this.update();
    };

    this.onChange = function (_ref) {
      var id = _ref.id,
          type = _ref.type;

      /* eslint-disable eqeqeq */
      if (id && _this.itemId == id) {
        _this.data = _this.getSimput().getData(id);
        _this.domains = _this.getSimput().getDomains(id);
      }

      if (type && _this.type === type) {
        _this.ui = _this.getSimput().getUI(_this.type);
      }

      if (!type && _this.type && !_this.ui) {
        _this.ui = _this.getSimput().getUI(_this.type);
      }
    };

    this.simputChannel.$on('connect', this.onConnect);
    this.simputChannel.$on('change', this.onChange);
    this.update();
  },
  beforeUnmount: function beforeUnmount() {
    this.simputChannel.$off('connect', this.onConnect);
    this.simputChannel.$off('change', this.onChange);
  },
  watch: {
    itemId: function itemId() {
      this.update();
    }
  },
  computed: {
    type: function type() {
      return this.data && this.data.type;
    },
    available: function available() {
      return !!(this.data && this.domains && this.ui);
    },
    properties: function properties() {
      var _this$data;

      return (_this$data = this.data) === null || _this$data === void 0 ? void 0 : _this$data.properties;
    },
    all: function all() {
      var data = this.data,
          domains = this.domains,
          properties = this.properties;
      return {
        id: this.itemId,
        data: data,
        domains: domains,
        properties: properties
      };
    }
  },
  methods: {
    update: function update() {
      this.data = null;
      this.ui = null;

      if (this.itemId) {
        this.data = this.getSimput().getData(this.itemId);
        this.domains = this.getSimput().getDomains(this.itemId);

        if (this.type) {
          this.ui = this.getSimput().getUI(this.type);
        }
      }
    },
    dirty: function dirty(name) {
      this.simputChannel.$emit('dirty', {
        id: this.data.id,
        name: name
      });
    }
  },
  inject: ['simputChannel', 'getSimput'],
  provide: function provide() {
    var _this2 = this;

    return {
      simputChannel: this.simputChannel,
      dirty: function dirty(name) {
        return _this2.dirty(name);
      },
      data: function data() {
        return _this2.data;
      },
      domains: function domains() {
        return _this2.domains;
      },
      properties: function properties() {
        return _this2.properties;
      },
      uiTS: function uiTS() {
        return _this2.getSimput().getUITimeStamp();
      }
    };
  }
});
// CONCATENATED MODULE: ./VueSimput/src/components/SimputItem/script.js?vue&type=script&lang=js&
 /* harmony default export */ var components_SimputItem_scriptvue_type_script_lang_js_ = (SimputItem_scriptvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./VueSimput/src/components/SimputItem/index.vue





/* normalize component */

var SimputItem_component = normalizeComponent(
  components_SimputItem_scriptvue_type_script_lang_js_,
  templatevue_type_template_id_3b0ac8ce_render,
  templatevue_type_template_id_3b0ac8ce_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SimputItem = (SimputItem_component.exports);
// CONCATENATED MODULE: ./VueSimput/src/components/index.js


/* harmony default export */ var components = ({
  Simput: Simput,
  SimputItem: SimputItem
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"286dc8bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./VueSimput/src/widgets/Select/template.html?vue&type=template&id=2c018106&
var templatevue_type_template_id_2c018106_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-col',{directives:[{name:"show",rawName:"v-show",value:(_vm.decorator.show),expression:"decorator.show"}],staticClass:"py-0"},[_c('v-select',{key:_vm.tsKey,attrs:{"label":_vm.label,"hint":_vm.computedHelp,"items":_vm.computedItems,"multiple":_vm.multiple,"persistent-hint":!!(_vm.useRangeHelp || _vm.help)},on:{"change":_vm.validate},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v},expression:"model"}})],1)}
var templatevue_type_template_id_2c018106_staticRenderFns = []


// CONCATENATED MODULE: ./VueSimput/src/widgets/Select/template.html?vue&type=template&id=2c018106&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__("7db0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__("a15b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.to-fixed.js
var es_number_to_fixed = __webpack_require__("b680");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.is-finite.js
var es_number_is_finite = __webpack_require__("f00c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.is-integer.js
var es_number_is_integer = __webpack_require__("8ba4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.is-nan.js
var es_number_is_nan = __webpack_require__("9129");

// CONCATENATED MODULE: ./VueSimput/src/types.js




var FALLBACK_CONVERT = function FALLBACK_CONVERT(v) {
  return v;
};
var TYPES = {
  uint8: {
    convert: function convert(value) {
      var n = Number(value);

      if (Number.isFinite(n)) {
        if (n < 0) {
          return 0;
        }

        if (n > 255) {
          return 255;
        }

        return Math.round(n);
      }

      return null;
    },
    rule: function rule(value) {
      var n = Number(value);

      if (!Number.isFinite(n)) {
        return 'Provided value is not a valid number';
      }

      if (!Number.isInteger(n)) {
        return 'Provided number is not an integer';
      }

      if (n < 0 || n > 255) {
        return 'Provided number is outside of the range [0, 255]';
      }

      return true;
    }
  },
  uint16: {
    convert: function convert(value) {
      var n = Number(value);

      if (Number.isFinite(n)) {
        if (n < 0) {
          return 0;
        }

        if (n > 65535) {
          return 65535;
        }

        return Math.round(n);
      }

      return null;
    },
    rule: function rule(value) {
      var n = Number(value);

      if (!Number.isFinite(n)) {
        return 'Provided value is not a valid number';
      }

      if (!Number.isInteger(n)) {
        return 'Provided number is not an integer';
      }

      if (n < 0 || n > 65535) {
        return 'Provided number is outside of the range [0, 65535]';
      }

      return true;
    }
  },
  uint32: {
    convert: function convert(value) {
      var n = Number(value);

      if (Number.isFinite(n)) {
        if (n < 0) {
          return 0;
        }

        if (n > 4294967295) {
          return 4294967295;
        }

        return Math.round(n);
      }

      return null;
    },
    rule: function rule(value) {
      var n = Number(value);

      if (!Number.isFinite(n)) {
        return 'Provided value is not a valid number';
      }

      if (!Number.isInteger(n)) {
        return 'Provided number is not an integer';
      }

      if (n < 0 || n > 4294967295) {
        return 'Provided number is outside of the range [0, 4294967295]';
      }

      return true;
    }
  },
  uint64: {
    convert: function convert(value) {
      var n = Number(value);

      if (Number.isFinite(n)) {
        if (n < 0) {
          return 0;
        }

        return Math.round(n);
      }

      return null;
    },
    rule: function rule(value) {
      var n = Number(value);

      if (!Number.isFinite(n)) {
        return 'Provided value is not a valid number';
      }

      if (!Number.isInteger(n)) {
        return 'Provided number is not an integer';
      }

      if (n < 0) {
        return 'Provided number is outside of the range [0, inf]';
      }

      return true;
    }
  },
  int8: {
    convert: function convert(value) {
      var n = Number(value);

      if (Number.isFinite(n)) {
        if (n < -128) {
          return -128;
        }

        if (n > 127) {
          return 127;
        }

        return Math.round(n);
      }

      return null;
    },
    rule: function rule(value) {
      var n = Number(value);

      if (!Number.isFinite(n)) {
        return 'Provided value is not a valid number';
      }

      if (!Number.isInteger(n)) {
        return 'Provided number is not an integer';
      }

      if (n < -128 || n > 127) {
        return 'Provided number is outside of the range [-128, 127]';
      }

      return true;
    }
  },
  int16: {
    convert: function convert(value) {
      var n = Number(value);

      if (Number.isFinite(n)) {
        if (n < -32768) {
          return -32768;
        }

        if (n > 32767) {
          return 32767;
        }

        return Math.round(n);
      }

      return null;
    },
    rule: function rule(value) {
      var n = Number(value);

      if (!Number.isFinite(n)) {
        return 'Provided value is not a valid number';
      }

      if (!Number.isInteger(n)) {
        return 'Provided number is not an integer';
      }

      if (n < -32768 || n > 32767) {
        return 'Provided number is outside of the range [-32768, 32767]';
      }

      return true;
    }
  },
  int32: {
    convert: function convert(value) {
      var n = Number(value);

      if (Number.isFinite(n)) {
        if (n < -2147483648) {
          return -2147483648;
        }

        if (n > 2147483647) {
          return 2147483647;
        }

        return Math.round(n);
      }

      return null;
    },
    rule: function rule(value) {
      var n = Number(value);

      if (!Number.isFinite(n)) {
        return 'Provided value is not a valid number';
      }

      if (!Number.isInteger(n)) {
        return 'Provided number is not an integer';
      }

      if (n < -2147483648 || n > 2147483647) {
        return 'Provided number is outside of the range [-2147483648, 2147483647]';
      }

      return true;
    }
  },
  int64: {
    convert: function convert(value) {
      var n = Number(value);

      if (Number.isFinite(n)) {
        return Math.round(n);
      }

      return null;
    },
    rule: function rule(value) {
      var n = Number(value);

      if (!Number.isFinite(n)) {
        return 'Provided value is not a valid number';
      }

      if (!Number.isInteger(n)) {
        return 'Provided number is not an integer';
      }

      return true;
    }
  },
  float32: {
    convert: function convert(value) {
      var n = Number(value);

      if (Number.isNaN(n)) {
        return null;
      }

      return n;
    },
    rule: function rule(value) {
      var n = Number(value);

      if (Number.isNaN(n)) {
        return 'Provided value is not a number';
      }

      return true;
    }
  },
  float64: {
    convert: function convert(value) {
      var n = Number(value);

      if (Number.isNaN(n)) {
        return null;
      }

      return n;
    },
    rule: function rule(value) {
      var n = Number(value);

      if (Number.isNaN(n)) {
        return 'Provided value is not a number';
      }

      return true;
    }
  },
  string: {
    convert: function convert(value) {
      return "".concat(value);
    },
    rule: function rule() {
      return true;
    }
  },
  bool: {
    convert: function convert(value) {
      return !!value;
    },
    rule: function rule() {
      return true;
    }
  }
};
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/eslint-loader??ref--13-0!./VueSimput/src/widgets/Select/script.js?vue&type=script&lang=js&









function addLabels(values, allTextValues) {
  var result = [];
  var labelMap = {};

  for (var i = 0; i < allTextValues.length; i++) {
    var _allTextValues$i = allTextValues[i],
        text = _allTextValues$i.text,
        value = _allTextValues$i.value;
    labelMap[value] = text;
  }

  for (var _i = 0; _i < values.length; _i++) {
    var _value = values[_i];

    var _text = labelMap[_value] || "".concat(_value);

    result.push({
      text: _text,
      value: _value
    });
  }

  return result;
}

/* harmony default export */ var Select_scriptvue_type_script_lang_js_ = ({
  name: 'swSelect',
  props: {
    name: {
      type: String
    },
    size: {
      type: Number,
      default: 1
    },
    label: {
      type: String
    },
    help: {
      type: String
    },
    mtime: {
      type: Number
    },
    type: {
      type: String
    },
    initial: {},
    // -- add-on --
    items: {
      type: Array
    },
    itemsProperty: {
      type: String
    },
    useRangeHelp: {
      type: Boolean,
      default: false
    },
    rangePrecision: {
      type: Number,
      default: 3
    }
  },
  created: function created() {
    var _this = this;

    this.onUpdateUI = function () {
      var newValue = "__".concat(_this.name, "__").concat(_this.uiTS());

      if (_this.tsKey !== newValue) {
        _this.$nextTick(function () {
          _this.tsKey = newValue;
        });
      }
    };

    this.simputChannel.$on('templateTS', this.onUpdateUI);
    this.onUpdateUI();
  },
  beforeUnmount: function beforeUnmount() {
    this.simputChannel.$off('templateTS', this.onUpdateUI);
  },
  data: function data() {
    return {
      showHelp: false,
      tsKey: '__default__'
    };
  },
  computed: {
    model: {
      get: function get() {
        /* eslint-disable no-unused-expressions */
        this.mtime; // force refresh

        return this.properties() && this.properties()[this.name];
      },
      set: function set(v) {
        this.properties()[this.name] = v;
      }
    },
    decorator: function decorator() {
      var _this$domains$this$na, _this$domains$this$na2;

      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh

      return ((_this$domains$this$na = this.domains()[this.name]) === null || _this$domains$this$na === void 0 ? void 0 : (_this$domains$this$na2 = _this$domains$this$na.decorator) === null || _this$domains$this$na2 === void 0 ? void 0 : _this$domains$this$na2.available) || {
        show: true,
        enable: true
      };
    },
    multiple: function multiple() {
      return Number(this.size) === -1;
    },
    convert: function convert() {
      var _TYPES$this$type;

      return ((_TYPES$this$type = TYPES[this.type]) === null || _TYPES$this$type === void 0 ? void 0 : _TYPES$this$type.convert) || FALLBACK_CONVERT;
    },
    computedItems: function computedItems() {
      var _availableOptions$Lis, _availableOptions$Has, _availableOptions$Pro, _availableOptions$Fie;

      if (this.items) {
        return this.items;
      } // Dynamic domain evaluation


      if (this.itemsProperty) {
        var _this$domains$this$it, _this$domains$this$it2;

        var available = ((_this$domains$this$it = this.domains()[this.itemsProperty]) === null || _this$domains$this$it === void 0 ? void 0 : (_this$domains$this$it2 = _this$domains$this$it.LabelList) === null || _this$domains$this$it2 === void 0 ? void 0 : _this$domains$this$it2.available) || [];
        var filteredValues = this.properties()[this.itemsProperty];
        return addLabels(filteredValues, available);
      }

      var availableOptions = this.domains()[this.name] || {};
      return (availableOptions === null || availableOptions === void 0 ? void 0 : (_availableOptions$Lis = availableOptions.List) === null || _availableOptions$Lis === void 0 ? void 0 : _availableOptions$Lis.available) || (availableOptions === null || availableOptions === void 0 ? void 0 : (_availableOptions$Has = availableOptions.HasTags) === null || _availableOptions$Has === void 0 ? void 0 : _availableOptions$Has.available) || (availableOptions === null || availableOptions === void 0 ? void 0 : (_availableOptions$Pro = availableOptions.ProxyBuilder) === null || _availableOptions$Pro === void 0 ? void 0 : _availableOptions$Pro.available) || (availableOptions === null || availableOptions === void 0 ? void 0 : (_availableOptions$Fie = availableOptions.FieldSelector) === null || _availableOptions$Fie === void 0 ? void 0 : _availableOptions$Fie.available);
    },
    selectedItem: function selectedItem() {
      var _this2 = this;

      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh

      return this.computedItems.find(function (_ref) {
        var value = _ref.value;
        return value === _this2.model;
      });
    },
    computedHelp: function computedHelp() {
      var _this$selectedItem,
          _this3 = this;

      if (!this.useRangeHelp) {
        return this.help;
      }

      if (this.selectedItem && (_this$selectedItem = this.selectedItem) !== null && _this$selectedItem !== void 0 && _this$selectedItem.range) {
        var rangeStr = this.selectedItem.range.map(function (v) {
          return v.toFixed(_this3.rangePrecision);
        }).join(', ');

        if (this.help) {
          return "".concat(this.help, " - [").concat(rangeStr, "]");
        }

        return "[".concat(rangeStr, "]");
      }

      return this.help;
    }
  },
  methods: {
    validate: function validate() {
      var _this4 = this;

      if (this.multiple || Array.isArray(this.model)) {
        this.model = this.model.map(function (v) {
          return _this4.convert(v);
        });
      } else {
        this.model = this.convert(this.model);
      }

      this.dirty(this.name);
    }
  },
  inject: ['data', 'properties', 'domains', 'dirty', 'uiTS', 'simputChannel']
});
// CONCATENATED MODULE: ./VueSimput/src/widgets/Select/script.js?vue&type=script&lang=js&
 /* harmony default export */ var widgets_Select_scriptvue_type_script_lang_js_ = (Select_scriptvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./VueSimput/src/widgets/Select/index.vue





/* normalize component */

var Select_component = normalizeComponent(
  widgets_Select_scriptvue_type_script_lang_js_,
  templatevue_type_template_id_2c018106_render,
  templatevue_type_template_id_2c018106_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Select = (Select_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"286dc8bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./VueSimput/src/widgets/Slider/template.html?vue&type=template&id=4a99b278&
var templatevue_type_template_id_4a99b278_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',{directives:[{name:"show",rawName:"v-show",value:(_vm.decorator.show),expression:"decorator.show"}],staticStyle:{"position":"relative"},attrs:{"fluid":""}},[_c('div',{staticStyle:{"position":"absolute","right":"10px","top":"-1px","z-index":"1"}},[(_vm.help)?_c('v-btn',{attrs:{"icon":"","x-small":""},on:{"click":function($event){_vm.showHelp = !_vm.showHelp}}},[_c('v-icon',{attrs:{"small":""}},[_vm._v("mdi-lifebuoy")])],1):_vm._e(),(_vm.computedSizeControl)?_c('v-btn',{attrs:{"icon":"","x-small":""},on:{"click":_vm.addEntry}},[_c('v-icon',{attrs:{"small":""}},[_vm._v("mdi-plus-circle-outline")])],1):_vm._e()],1),_c('v-row',[(_vm.label && _vm.size != 1)?_c('v-col',{staticClass:"py-0"},[_c('div',{staticClass:"text-caption text--secondary"},[_vm._v(_vm._s(_vm.label))]),_c('v-divider'),(_vm.help && _vm.showHelp)?_c('div',{staticClass:"text-caption text--secondary"},[_vm._v(" "+_vm._s(_vm.help)+" ")]):_vm._e()],1):_vm._e()],1),(_vm.model != null)?_c('v-row',[(_vm.size == 1)?_c('v-col',{staticClass:"pt-0 pb-1"},[_c('v-row',{staticClass:"align-center",attrs:{"no-gutters":""}},[_c('v-slider',{staticClass:"text-truncate",attrs:{"name":((_vm.data().type) + ":" + _vm.name + ":" + _vm.i),"label":_vm.label,"hide-details":"","dense":"","rules":[_vm.rule],"min":_vm.computedMin,"max":_vm.computedMax,"step":_vm.computedStep},on:{"change":function($event){return _vm.validate()}},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v},expression:"model"}}),_c('div',{staticClass:"text-truncate text-right text-caption text--secondary mr-4",staticStyle:{"max-width":"60px","min-width":"60px"}},[_vm._v(_vm._s(_vm.model))])],1),(_vm.help && _vm.showHelp)?_c('div',{staticClass:"mt-0 mb-2 text-caption text--secondary"},[_vm._v(" "+_vm._s(_vm.help)+" ")]):_vm._e(),_vm._l((_vm.hints),function(hint,idx){return _c('v-alert',{key:idx,staticClass:"mb-1",attrs:{"type":_vm.levelToType(hint.level),"border":"left","dense":"","icon":_vm.levelToIcon(hint.level)}},[_vm._v(" "+_vm._s(hint.message)+" ")])})],2):_vm._e(),_vm._l((_vm.computedSize),function(i){return (_vm.size != 1)?_c('v-col',_vm._b({key:i,staticClass:"py-1"},'v-col',_vm.getComponentProps(i-1),false),[_c('v-row',{staticClass:"align-center",attrs:{"no-gutters":""}},[_c('v-slider',{staticClass:"mt-0",attrs:{"name":((_vm.data().type) + ":" + _vm.name + ":" + i),"hide-details":"","dense":"","rules":[_vm.rule],"min":_vm.computedMin,"max":_vm.computedMax,"step":_vm.computedStep},on:{"change":function($event){return _vm.validate(i)}},model:{value:(_vm.model[i - 1]),callback:function ($$v) {_vm.$set(_vm.model, i - 1, $$v)},expression:"model[i - 1]"}}),_c('div',{staticClass:"text-truncate text-right text-caption text--secondary",staticStyle:{"max-width":"60px","min-width":"60px"}},[_vm._v(_vm._s(_vm.model[i - 1]))]),(_vm.computedSizeControl)?_c('v-btn',{staticClass:"ml-2",attrs:{"icon":"","x-small":""},on:{"click":function($event){return _vm.deleteEntry(i - 1)}}},[_c('v-icon',[_vm._v("mdi-minus-circle-outline")])],1):_vm._e()],1),_vm._l((_vm.hints),function(hint,idx){return _c('v-alert',{key:idx,staticClass:"mb-1",attrs:{"type":_vm.levelToType(hint.level),"border":"left","dense":"","icon":_vm.levelToIcon(hint.level)}},[_vm._v(" "+_vm._s(hint.message)+" ")])})],2):_vm._e()})],2):_vm._e()],1)}
var templatevue_type_template_id_4a99b278_staticRenderFns = []


// CONCATENATED MODULE: ./VueSimput/src/widgets/Slider/template.html?vue&type=template&id=4a99b278&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/eslint-loader??ref--13-0!./VueSimput/src/widgets/Slider/script.js?vue&type=script&lang=js&




 // Layouts: horizontal, vertical, l2, l3, l4

/* harmony default export */ var Slider_scriptvue_type_script_lang_js_ = ({
  name: 'swSlider',
  props: {
    name: {
      type: String
    },
    size: {
      type: Number,
      default: 1
    },
    label: {
      type: String
    },
    help: {
      type: String
    },
    mtime: {
      type: Number
    },
    type: {
      type: String
    },
    initial: {},
    // --- custom to current widget ---
    layout: {
      type: String
    },
    sizeControl: {
      type: Boolean,
      default: false
    },
    numberOfSteps: {
      type: Number,
      default: 255
    },
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    step: {
      type: Number
    }
  },
  data: function data() {
    return {
      showHelp: false,
      dynamicSize: this.size
    };
  },
  computed: {
    model: {
      get: function get() {
        /* eslint-disable no-unused-expressions */
        this.mtime; // force refresh

        this.dynamicSize;
        return this.properties() && this.properties()[this.name];
      },
      set: function set(v) {
        this.properties()[this.name] = v;
      }
    },
    decorator: function decorator() {
      var _this$domains$this$na, _this$domains$this$na2;

      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh

      return ((_this$domains$this$na = this.domains()[this.name]) === null || _this$domains$this$na === void 0 ? void 0 : (_this$domains$this$na2 = _this$domains$this$na.decorator) === null || _this$domains$this$na2 === void 0 ? void 0 : _this$domains$this$na2.available) || {
        show: true,
        enable: true
      };
    },
    computedLayout: function computedLayout() {
      var _this$domains$this$na3, _this$domains$this$na4;

      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh

      return this.layout || ((_this$domains$this$na3 = this.domains()[this.name]) === null || _this$domains$this$na3 === void 0 ? void 0 : (_this$domains$this$na4 = _this$domains$this$na3.UI) === null || _this$domains$this$na4 === void 0 ? void 0 : _this$domains$this$na4.layout) || 'vertical';
    },
    computedSize: function computedSize() {
      if (Number(this.size) !== 1) {
        return Math.max(this.size, this.model.length);
      }

      return Number(this.size);
    },
    computedSizeControl: function computedSizeControl() {
      var _this$domains$this$na5, _this$domains$this$na6;

      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh

      return this.sizeControl || ((_this$domains$this$na5 = this.domains()[this.name]) === null || _this$domains$this$na5 === void 0 ? void 0 : (_this$domains$this$na6 = _this$domains$this$na5.UI) === null || _this$domains$this$na6 === void 0 ? void 0 : _this$domains$this$na6.sizeControl);
    },
    rule: function rule() {
      var _TYPES$this$type;

      return ((_TYPES$this$type = TYPES[this.type]) === null || _TYPES$this$type === void 0 ? void 0 : _TYPES$this$type.rule) || true;
    },
    convert: function convert() {
      var _TYPES$this$type2;

      return ((_TYPES$this$type2 = TYPES[this.type]) === null || _TYPES$this$type2 === void 0 ? void 0 : _TYPES$this$type2.convert) || FALLBACK_CONVERT;
    },
    computedMin: function computedMin() {
      var _this$domains, _this$domains$this$na7, _this$domains$this$na8;

      if (this.min != null) {
        return this.min;
      }

      var dataRange = (_this$domains = this.domains()) === null || _this$domains === void 0 ? void 0 : (_this$domains$this$na7 = _this$domains[this.name]) === null || _this$domains$this$na7 === void 0 ? void 0 : (_this$domains$this$na8 = _this$domains$this$na7.Range) === null || _this$domains$this$na8 === void 0 ? void 0 : _this$domains$this$na8.available;

      if (dataRange) {
        return dataRange[0];
      }

      return 0;
    },
    computedMax: function computedMax() {
      var _this$domains2, _this$domains2$this$n, _this$domains2$this$n2;

      if (this.max != null) {
        return this.max;
      }

      var dataRange = (_this$domains2 = this.domains()) === null || _this$domains2 === void 0 ? void 0 : (_this$domains2$this$n = _this$domains2[this.name]) === null || _this$domains2$this$n === void 0 ? void 0 : (_this$domains2$this$n2 = _this$domains2$this$n.Range) === null || _this$domains2$this$n2 === void 0 ? void 0 : _this$domains2$this$n2.available;

      if (dataRange) {
        return dataRange[1];
      }

      return 100;
    },
    computedStep: function computedStep() {
      if (this.type.indexOf('int') !== -1) {
        return 1;
      }

      var range = this.computedMax - this.computedMin;
      return range / this.numberOfSteps;
    },
    hints: function hints() {
      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh

      return this.domains()[this.name].hints || [];
    }
  },
  methods: {
    levelToType: function levelToType(level) {
      switch (level) {
        case 0:
          return 'info';

        case 1:
          return 'warning';

        case 2:
          return 'error';

        default:
          return 'success';
      }
    },
    levelToIcon: function levelToIcon(level) {
      switch (level) {
        case 0:
          return 'mdi-information-outline';

        case 1:
          return 'mdi-alert-octagon-outline';

        case 2:
          return 'mdi-alert-outline';

        default:
          return 'mdi-brain';
      }
    },
    addEntry: function addEntry() {
      this.dynamicSize = this.model.length + 1;
      this.model.length = this.dynamicSize;
      this.validate(this.dynamicSize);
    },
    deleteEntry: function deleteEntry(index) {
      this.model.splice(index, 1);
      this.dirty(this.name);
    },
    getComponentProps: function getComponentProps(index) {
      if (this.computedLayout === 'vertical') {
        return {
          cols: 12
        };
      }

      if (this.computedLayout === 'l2') {
        return {
          cols: 6
        };
      }

      if (this.computedLayout === 'l3') {
        return {
          cols: 4
        };
      }

      if (this.computedLayout === 'l4') {
        return {
          cols: 3
        };
      }

      if (this.computedLayout === 'm3-half') {
        var props = {
          cols: 4
        };

        if (index === 3) {
          props.offset = 4;
        }

        if (index === 5) {
          props.offset = 8;
        }

        return props;
      }

      return {};
    },
    update: function update() {
      var component = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var value = component ? this.model[component - 1] : this.model; // must test against bool since it can be a string in case of error

      if (this.rule(value) === true) {
        if (Number(this.size) !== 1) {
          this.model[component - 1] = this.convert(value);
        } else {
          this.model = this.convert(value);
        }

        this.dirty(this.name);
      }
    },
    validate: function validate() {
      var component = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var value = component ? this.model[component - 1] : this.model;

      if (Number(this.size) !== 1) {
        this.model[component - 1] = this.convert(value);

        if (this.model[component - 1] === null) {
          this.model[component - 1] = this.initial[component - 1];
        }

        this.model = this.model.slice();
      } else {
        this.model !== this.convert(value);
        this.model = this.convert(value);

        if (this.model === null) {
          this.model = this.initial;
        }
      }

      this.dirty(this.name);
    }
  },
  inject: ['data', 'properties', 'domains', 'dirty']
});
// CONCATENATED MODULE: ./VueSimput/src/widgets/Slider/script.js?vue&type=script&lang=js&
 /* harmony default export */ var widgets_Slider_scriptvue_type_script_lang_js_ = (Slider_scriptvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./VueSimput/src/widgets/Slider/index.vue





/* normalize component */

var Slider_component = normalizeComponent(
  widgets_Slider_scriptvue_type_script_lang_js_,
  templatevue_type_template_id_4a99b278_render,
  templatevue_type_template_id_4a99b278_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Slider = (Slider_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"286dc8bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./VueSimput/src/widgets/Switch/template.html?vue&type=template&id=64c12b76&
var templatevue_type_template_id_64c12b76_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-col',{directives:[{name:"show",rawName:"v-show",value:(_vm.decorator.show),expression:"decorator.show"}]},[_c('v-row',{staticClass:"ma-0 align-center"},[_c('v-switch',{staticClass:"py-0 mt-0",attrs:{"label":_vm.label,"hint":_vm.help,"dense":"","hide-details":""},on:{"change":_vm.validate},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v},expression:"model"}}),_c('v-spacer'),(_vm.help)?_c('v-btn',{attrs:{"icon":"","x-small":""},on:{"click":function($event){_vm.showHelp = !_vm.showHelp}}},[_c('v-icon',{attrs:{"small":""}},[_vm._v("mdi-lifebuoy")])],1):_vm._e()],1),(_vm.help && _vm.showHelp)?_c('v-row',{staticClass:"ma-0 text-caption text--secondary"},[_vm._v(" "+_vm._s(_vm.help)+" ")]):_vm._e()],1)}
var templatevue_type_template_id_64c12b76_staticRenderFns = []


// CONCATENATED MODULE: ./VueSimput/src/widgets/Switch/template.html?vue&type=template&id=64c12b76&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/eslint-loader??ref--13-0!./VueSimput/src/widgets/Switch/script.js?vue&type=script&lang=js&



/* harmony default export */ var Switch_scriptvue_type_script_lang_js_ = ({
  name: 'swSwitch',
  props: {
    name: {
      type: String
    },
    size: {
      type: Number,
      default: 1
    },
    label: {
      type: String
    },
    help: {
      type: String
    },
    mtime: {
      type: Number
    },
    type: {
      type: String
    },
    initial: {}
  },
  data: function data() {
    return {
      showHelp: false
    };
  },
  computed: {
    model: {
      get: function get() {
        /* eslint-disable no-unused-expressions */
        this.mtime; // force refresh

        return this.properties() && this.properties()[this.name];
      },
      set: function set(v) {
        this.properties()[this.name] = v;
      }
    },
    decorator: function decorator() {
      var _this$domains$this$na, _this$domains$this$na2;

      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh

      return ((_this$domains$this$na = this.domains()[this.name]) === null || _this$domains$this$na === void 0 ? void 0 : (_this$domains$this$na2 = _this$domains$this$na.decorator) === null || _this$domains$this$na2 === void 0 ? void 0 : _this$domains$this$na2.available) || {
        show: true,
        enable: true
      };
    },
    convert: function convert() {
      var _TYPES$this$type;

      return ((_TYPES$this$type = TYPES[this.type]) === null || _TYPES$this$type === void 0 ? void 0 : _TYPES$this$type.convert) || FALLBACK_CONVERT;
    }
  },
  methods: {
    validate: function validate() {
      this.model = this.convert(this.model);
      this.dirty(this.name);
    }
  },
  inject: ['data', 'properties', 'domains', 'dirty']
});
// CONCATENATED MODULE: ./VueSimput/src/widgets/Switch/script.js?vue&type=script&lang=js&
 /* harmony default export */ var widgets_Switch_scriptvue_type_script_lang_js_ = (Switch_scriptvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./VueSimput/src/widgets/Switch/index.vue





/* normalize component */

var Switch_component = normalizeComponent(
  widgets_Switch_scriptvue_type_script_lang_js_,
  templatevue_type_template_id_64c12b76_render,
  templatevue_type_template_id_64c12b76_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Switch = (Switch_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"286dc8bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./VueSimput/src/widgets/TextArea/template.html?vue&type=template&id=2059aedf&
var templatevue_type_template_id_2059aedf_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-textarea',{directives:[{name:"show",rawName:"v-show",value:(_vm.decorator.show),expression:"decorator.show"}],attrs:{"label":_vm.label,"hint":_vm.help,"auto-grow":_vm.auto-_vm.grow,"autofocus":_vm.autofocus,"clearable":_vm.clearable,"disabled":_vm.disabled,"no-resize":_vm.no-_vm.resize,"row-height":_vm.row-_vm.height,"rows":_vm.rows},on:{"change":_vm.validate},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v},expression:"model"}})}
var templatevue_type_template_id_2059aedf_staticRenderFns = []


// CONCATENATED MODULE: ./VueSimput/src/widgets/TextArea/template.html?vue&type=template&id=2059aedf&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/eslint-loader??ref--13-0!./VueSimput/src/widgets/TextArea/script.js?vue&type=script&lang=js&


/* harmony default export */ var TextArea_scriptvue_type_script_lang_js_ = ({
  name: 'swTextArea',
  props: {
    name: {
      type: String
    },
    size: {
      type: Number,
      default: 1
    },
    label: {
      type: String
    },
    help: {
      type: String
    },
    mtime: {
      type: Number
    },
    // --- text-area-props ---
    'auto-grow': {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    'no-resize': {
      type: Boolean,
      default: false
    },
    'row-height': {
      type: Boolean,
      default: false
    },
    rows: {
      type: [String, Number],
      default: 5
    }
  },
  data: function data() {
    return {
      showHelp: false
    };
  },
  computed: {
    model: {
      get: function get() {
        /* eslint-disable no-unused-expressions */
        this.mtime; // force refresh

        return this.properties() && this.properties()[this.name] || '';
      },
      set: function set(v) {
        this.properties()[this.name] = v;
      }
    },
    decorator: function decorator() {
      var _this$domains$this$na, _this$domains$this$na2;

      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh

      return ((_this$domains$this$na = this.domains()[this.name]) === null || _this$domains$this$na === void 0 ? void 0 : (_this$domains$this$na2 = _this$domains$this$na.decorator) === null || _this$domains$this$na2 === void 0 ? void 0 : _this$domains$this$na2.available) || {
        show: true,
        enable: true
      };
    }
  },
  methods: {
    validate: function validate() {
      this.dirty(this.name);
    }
  },
  inject: ['data', 'properties', 'domains', 'dirty']
});
// CONCATENATED MODULE: ./VueSimput/src/widgets/TextArea/script.js?vue&type=script&lang=js&
 /* harmony default export */ var widgets_TextArea_scriptvue_type_script_lang_js_ = (TextArea_scriptvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./VueSimput/src/widgets/TextArea/index.vue





/* normalize component */

var TextArea_component = normalizeComponent(
  widgets_TextArea_scriptvue_type_script_lang_js_,
  templatevue_type_template_id_2059aedf_render,
  templatevue_type_template_id_2059aedf_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var TextArea = (TextArea_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"286dc8bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./VueSimput/src/widgets/TextField/template.html?vue&type=template&id=468c6120&
var templatevue_type_template_id_468c6120_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-col',{directives:[{name:"show",rawName:"v-show",value:(_vm.decorator.show),expression:"decorator.show"}],staticStyle:{"position":"relative"},attrs:{"fluid":""}},[_c('div',{staticStyle:{"position":"absolute","right":"10px","top":"-1px","z-index":"1"}},[(_vm.allowRefresh)?_c('v-btn',{attrs:{"icon":"","x-small":""},on:{"click":_vm.refresh}},[_c('v-icon',{attrs:{"small":""}},[_vm._v("mdi-sync")])],1):_vm._e(),(_vm.help)?_c('v-btn',{attrs:{"icon":"","x-small":""},on:{"click":function($event){_vm.showHelp = !_vm.showHelp}}},[_c('v-icon',{attrs:{"small":""}},[_vm._v("mdi-lifebuoy")])],1):_vm._e(),(_vm.computedSizeControl)?_c('v-btn',{attrs:{"icon":"","x-small":""},on:{"click":_vm.addEntry}},[_c('v-icon',{attrs:{"small":""}},[_vm._v("mdi-plus-circle-outline")])],1):_vm._e()],1),_c('v-row',[(_vm.label && _vm.size != 1)?_c('v-col',{staticClass:"py-0"},[_c('div',{staticClass:"text-caption text--secondary"},[_vm._v(_vm._s(_vm.label))]),_c('v-divider'),(_vm.help && _vm.showHelp)?_c('div',{staticClass:"text-caption text--secondary"},[_vm._v(" "+_vm._s(_vm.help)+" ")]):_vm._e()],1):_vm._e()],1),_c('v-row',[(_vm.size == 1)?_c('v-col',{staticClass:"pt-0 pb-1"},[_c('v-text-field',{attrs:{"name":((_vm.data().type) + ":" + _vm.name + ":" + _vm.i),"background-color":_vm.color(),"label":_vm.label,"hint":_vm.help,"dens":"","rules":[_vm.rule],"persistent-hint":_vm.showHelp,"hide-details":!_vm.showHelp || !_vm.help},on:{"input":function($event){return _vm.update()},"blur":function($event){return _vm.validate()},"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.validate()}},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v},expression:"model"}})],1):_vm._e(),_vm._l((_vm.computedSize),function(i){return (_vm.size != 1)?_c('v-col',_vm._b({key:i,staticClass:"py-1"},'v-col',_vm.getComponentProps(i-1),false),[_c('v-row',{staticClass:"align-center",attrs:{"no-gutters":""}},[_c('v-text-field',{staticClass:"mt-0",attrs:{"name":((_vm.data().type) + ":" + _vm.name + ":" + i),"background-color":_vm.color(i),"dense":"","rules":[_vm.rule],"hide-details":""},on:{"input":function($event){return _vm.update(i)},"blur":function($event){return _vm.validate(i)},"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.validate(i)}},model:{value:(_vm.model[i - 1]),callback:function ($$v) {_vm.$set(_vm.model, i - 1, $$v)},expression:"model[i - 1]"}}),(_vm.computedSizeControl)?_c('v-btn',{staticClass:"ml-2",attrs:{"icon":"","x-small":""},on:{"click":function($event){return _vm.deleteEntry(i - 1)}}},[_c('v-icon',[_vm._v("mdi-minus-circle-outline")])],1):_vm._e()],1)],1):_vm._e()})],2),(_vm.hints.length)?_c('v-col',{staticClass:"px-0 mt-1"},_vm._l((_vm.hints),function(hint,idx){return _c('v-alert',{key:idx,staticClass:"mb-1",attrs:{"type":_vm.levelToType(hint.level),"border":"left","dense":"","icon":_vm.levelToIcon(hint.level)}},[_vm._v(" "+_vm._s(hint.message)+" ")])}),1):_vm._e()],1)}
var templatevue_type_template_id_468c6120_staticRenderFns = []


// CONCATENATED MODULE: ./VueSimput/src/widgets/TextField/template.html?vue&type=template&id=468c6120&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/eslint-loader??ref--13-0!./VueSimput/src/widgets/TextField/script.js?vue&type=script&lang=js&




 // Layouts: horizontal, vertical, l2, l3, l4

/* harmony default export */ var TextField_scriptvue_type_script_lang_js_ = ({
  name: 'swTextField',
  props: {
    name: {
      type: String
    },
    size: {
      type: Number,
      default: 1
    },
    label: {
      type: String
    },
    help: {
      type: String
    },
    mtime: {
      type: Number
    },
    type: {
      type: String
    },
    initial: {},
    // --- custom to current widget ---
    editColor: {
      type: String,
      default: 'blue lighten-5'
    },
    layout: {
      type: String
    },
    sizeControl: {
      type: Boolean,
      default: false
    },
    allowRefresh: {
      type: Boolean,
      default: false
    },
    newValue: {
      type: String,
      default: 'same'
    }
  },
  data: function data() {
    return {
      showHelp: false,
      dynamicSize: this.size
    };
  },
  computed: {
    model: {
      get: function get() {
        /* eslint-disable no-unused-expressions */
        this.mtime; // force refresh

        this.dynamicSize;
        var value = this.properties() && this.properties()[this.name];

        if (!value && this.size > 1) {
          var emptyArray = [];
          emptyArray.length = this.size;
          return emptyArray;
        }

        return value;
      },
      set: function set(v) {
        this.properties()[this.name] = v;
      }
    },
    decorator: function decorator() {
      var _this$domains$this$na, _this$domains$this$na2;

      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh

      return ((_this$domains$this$na = this.domains()[this.name]) === null || _this$domains$this$na === void 0 ? void 0 : (_this$domains$this$na2 = _this$domains$this$na.decorator) === null || _this$domains$this$na2 === void 0 ? void 0 : _this$domains$this$na2.available) || {
        show: true,
        enable: true
      };
    },
    computedLayout: function computedLayout() {
      var _this$domains$this$na3, _this$domains$this$na4;

      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh

      return this.layout || ((_this$domains$this$na3 = this.domains()[this.name]) === null || _this$domains$this$na3 === void 0 ? void 0 : (_this$domains$this$na4 = _this$domains$this$na3.UI) === null || _this$domains$this$na4 === void 0 ? void 0 : _this$domains$this$na4.layout) || 'horizontal';
    },
    computedSize: function computedSize() {
      if (Number(this.size) !== 1) {
        var _this$model;

        return Math.max(this.size || 1, ((_this$model = this.model) === null || _this$model === void 0 ? void 0 : _this$model.length) || 0);
      }

      return Number(this.size);
    },
    computedSizeControl: function computedSizeControl() {
      var _this$domains$this$na5, _this$domains$this$na6;

      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh

      return this.sizeControl || ((_this$domains$this$na5 = this.domains()[this.name]) === null || _this$domains$this$na5 === void 0 ? void 0 : (_this$domains$this$na6 = _this$domains$this$na5.UI) === null || _this$domains$this$na6 === void 0 ? void 0 : _this$domains$this$na6.sizeControl);
    },
    rule: function rule() {
      var _TYPES$this$type;

      return ((_TYPES$this$type = TYPES[this.type]) === null || _TYPES$this$type === void 0 ? void 0 : _TYPES$this$type.rule) || function () {
        return true;
      };
    },
    convert: function convert() {
      var _TYPES$this$type2;

      return ((_TYPES$this$type2 = TYPES[this.type]) === null || _TYPES$this$type2 === void 0 ? void 0 : _TYPES$this$type2.convert) || FALLBACK_CONVERT;
    },
    hints: function hints() {
      var _this$domains, _this$domains$this$na7;

      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh

      return ((_this$domains = this.domains()) === null || _this$domains === void 0 ? void 0 : (_this$domains$this$na7 = _this$domains[this.name]) === null || _this$domains$this$na7 === void 0 ? void 0 : _this$domains$this$na7.hints) || [];
    }
  },
  methods: {
    levelToType: function levelToType(level) {
      switch (level) {
        case 0:
          return 'info';

        case 1:
          return 'warning';

        case 2:
          return 'error';

        default:
          return 'success';
      }
    },
    levelToIcon: function levelToIcon(level) {
      switch (level) {
        case 0:
          return 'mdi-information-outline';

        case 1:
          return 'mdi-alert-octagon-outline';

        case 2:
          return 'mdi-alert-outline';

        default:
          return 'mdi-brain';
      }
    },
    refresh: function refresh() {
      this.getSimput().refresh(this.data().id, this.name);
    },
    addEntry: function addEntry() {
      if (!this.model) {
        this.model = [];
      }

      this.dynamicSize = this.model.length + 1;
      this.model.length = this.dynamicSize;

      if (this.newValue === 'null') {
        this.model[this.model.length - 1] = null;
      } else if (this.newValue === 'same') {
        this.model[this.model.length - 1] = this.model[this.model.length - 2];
      }

      this.validate(this.dynamicSize);
    },
    deleteEntry: function deleteEntry(index) {
      this.model.splice(index, 1);
      this.dirty(this.name);
    },
    getComponentProps: function getComponentProps(index) {
      if (this.computedLayout === 'vertical') {
        return {
          cols: 12
        };
      }

      if (this.computedLayout === 'l2') {
        return {
          cols: 6
        };
      }

      if (this.computedLayout === 'l3') {
        return {
          cols: 4
        };
      }

      if (this.computedLayout === 'l4') {
        return {
          cols: 3
        };
      }

      if (this.computedLayout === 'm3-half') {
        var props = {
          cols: 4
        };

        if (index === 3) {
          props.offset = 4;
        }

        if (index === 5) {
          props.offset = 8;
        }

        return props;
      }

      return {};
    },
    color: function color() {
      var _this$model2, _this$initial;

      var component = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (component && ((_this$model2 = this.model) === null || _this$model2 === void 0 ? void 0 : _this$model2[component - 1]) !== ((_this$initial = this.initial) === null || _this$initial === void 0 ? void 0 : _this$initial[component - 1])) {
        return this.editColor;
      }

      if (!component && this.model !== this.initial) {
        return this.editColor;
      }

      return undefined;
    },
    update: function update() {
      var component = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      // console.log('update', component, this.size);
      var value = component ? this.model[component - 1] : this.model; // must test against bool since it can be a string in case of error

      if (this.rule(value) === true) {
        if (Number(this.size) !== 1) {
          this.model[component - 1] = this.convert(value);
        } else {
          this.model = this.convert(value);
        }

        this.dirty(this.name);
      }
    },
    validate: function validate() {
      var component = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      // console.log('validate', component, this.size);
      var isDirty = false; // let useInitial = false;

      var value = component ? this.model[component - 1] : this.model;

      if (Number(this.size) !== 1) {
        isDirty = this.model[component - 1] !== this.convert(value);
        this.model[component - 1] = this.convert(value);

        if (this.model[component - 1] === null) {
          var _this$initial2;

          this.model[component - 1] = (_this$initial2 = this.initial) === null || _this$initial2 === void 0 ? void 0 : _this$initial2[component - 1]; // useInitial = true;
        }

        this.model = this.model.slice();
      } else {
        isDirty = this.model !== this.convert(value);
        this.model = this.convert(value);

        if (this.model === null) {
          this.model = this.initial; // useInitial = true;
        }
      } // console.log('validate', component, isDirty, useInitial);


      if (isDirty) {
        this.dirty(this.name);
      }
    }
  },
  inject: ['data', 'properties', 'domains', 'dirty', 'getSimput']
});
// CONCATENATED MODULE: ./VueSimput/src/widgets/TextField/script.js?vue&type=script&lang=js&
 /* harmony default export */ var widgets_TextField_scriptvue_type_script_lang_js_ = (TextField_scriptvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./VueSimput/src/widgets/TextField/index.vue





/* normalize component */

var TextField_component = normalizeComponent(
  widgets_TextField_scriptvue_type_script_lang_js_,
  templatevue_type_template_id_468c6120_render,
  templatevue_type_template_id_468c6120_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var TextField = (TextField_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"286dc8bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./VueSimput/src/widgets/Proxy/template.html?vue&type=template&id=278a31a2&
var templatevue_type_template_id_278a31a2_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('SimputInput',{directives:[{name:"show",rawName:"v-show",value:(_vm.decorator.show),expression:"decorator.show"}],attrs:{"itemId":_vm.itemId}})}
var templatevue_type_template_id_278a31a2_staticRenderFns = []


// CONCATENATED MODULE: ./VueSimput/src/widgets/Proxy/template.html?vue&type=template&id=278a31a2&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/eslint-loader??ref--13-0!./VueSimput/src/widgets/Proxy/script.js?vue&type=script&lang=js&


/* harmony default export */ var Proxy_scriptvue_type_script_lang_js_ = ({
  name: 'swProxy',
  props: {
    name: {
      type: String
    }
  },
  components: {
    SimputInput: SimputItem
  },
  computed: {
    decorator: function decorator() {
      var _this$domains$this$na, _this$domains$this$na2;

      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh

      return ((_this$domains$this$na = this.domains()[this.name]) === null || _this$domains$this$na === void 0 ? void 0 : (_this$domains$this$na2 = _this$domains$this$na.decorator) === null || _this$domains$this$na2 === void 0 ? void 0 : _this$domains$this$na2.available) || {
        show: true,
        enable: true
      };
    },
    itemId: function itemId() {
      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh

      return this.properties()[this.name];
    }
  },
  inject: ['data', 'properties', 'domains', 'dirty']
});
// CONCATENATED MODULE: ./VueSimput/src/widgets/Proxy/script.js?vue&type=script&lang=js&
 /* harmony default export */ var widgets_Proxy_scriptvue_type_script_lang_js_ = (Proxy_scriptvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./VueSimput/src/widgets/Proxy/index.vue





/* normalize component */

var Proxy_component = normalizeComponent(
  widgets_Proxy_scriptvue_type_script_lang_js_,
  templatevue_type_template_id_278a31a2_render,
  templatevue_type_template_id_278a31a2_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Proxy = (Proxy_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"286dc8bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./VueSimput/src/widgets/Show/template.html?vue&type=template&id=e7592b48&
var templatevue_type_template_id_e7592b48_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}]},[_vm._t("default")],2)}
var templatevue_type_template_id_e7592b48_staticRenderFns = []


// CONCATENATED MODULE: ./VueSimput/src/widgets/Show/template.html?vue&type=template&id=e7592b48&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/eslint-loader??ref--13-0!./VueSimput/src/widgets/Show/script.js?vue&type=script&lang=js&

/* harmony default export */ var Show_scriptvue_type_script_lang_js_ = ({
  name: 'swShow',
  props: {
    property: {
      type: String
    },
    domain: {
      type: String
    },
    mtime: {
      type: Number
    }
  },
  computed: {
    visible: function visible() {
      var _this$domains, _this$domains$this$pr;

      this.mtime; // eslint-disable-line

      var domain = (_this$domains = this.domains()) === null || _this$domains === void 0 ? void 0 : (_this$domains$this$pr = _this$domains[this.property]) === null || _this$domains$this$pr === void 0 ? void 0 : _this$domains$this$pr[this.domain];

      if (!domain) {
        // no domain == valid
        return true;
      }

      return domain.value;
    }
  },
  inject: ['properties', 'domains']
});
// CONCATENATED MODULE: ./VueSimput/src/widgets/Show/script.js?vue&type=script&lang=js&
 /* harmony default export */ var widgets_Show_scriptvue_type_script_lang_js_ = (Show_scriptvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./VueSimput/src/widgets/Show/index.vue





/* normalize component */

var Show_component = normalizeComponent(
  widgets_Show_scriptvue_type_script_lang_js_,
  templatevue_type_template_id_e7592b48_render,
  templatevue_type_template_id_e7592b48_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Show = (Show_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"286dc8bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./VueSimput/src/widgets/Hide/template.html?vue&type=template&id=afdb3a12&
var templatevue_type_template_id_afdb3a12_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}]},[_vm._t("default")],2)}
var templatevue_type_template_id_afdb3a12_staticRenderFns = []


// CONCATENATED MODULE: ./VueSimput/src/widgets/Hide/template.html?vue&type=template&id=afdb3a12&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/eslint-loader??ref--13-0!./VueSimput/src/widgets/Hide/script.js?vue&type=script&lang=js&

/* harmony default export */ var Hide_scriptvue_type_script_lang_js_ = ({
  name: 'swHide',
  props: {
    property: {
      type: String
    },
    domain: {
      type: String
    },
    mtime: {
      type: Number
    }
  },
  computed: {
    visible: function visible() {
      var _this$domains, _this$domains$this$pr;

      this.mtime; // eslint-disable-line

      var domain = (_this$domains = this.domains()) === null || _this$domains === void 0 ? void 0 : (_this$domains$this$pr = _this$domains[this.property]) === null || _this$domains$this$pr === void 0 ? void 0 : _this$domains$this$pr[this.domain];

      if (!domain) {
        // no domain == valid
        return false;
      }

      return !domain.value;
    }
  },
  inject: ['properties', 'domains']
});
// CONCATENATED MODULE: ./VueSimput/src/widgets/Hide/script.js?vue&type=script&lang=js&
 /* harmony default export */ var widgets_Hide_scriptvue_type_script_lang_js_ = (Hide_scriptvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./VueSimput/src/widgets/Hide/index.vue





/* normalize component */

var Hide_component = normalizeComponent(
  widgets_Hide_scriptvue_type_script_lang_js_,
  templatevue_type_template_id_afdb3a12_render,
  templatevue_type_template_id_afdb3a12_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Hide = (Hide_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"286dc8bc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./VueSimput/src/widgets/Text/template.html?vue&type=template&id=ed157ba8&
var templatevue_type_template_id_ed157ba8_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._v(" "+_vm._s(_vm.content)+" ")])}
var templatevue_type_template_id_ed157ba8_staticRenderFns = []


// CONCATENATED MODULE: ./VueSimput/src/widgets/Text/template.html?vue&type=template&id=ed157ba8&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/eslint-loader??ref--13-0!./VueSimput/src/widgets/Text/script.js?vue&type=script&lang=js&
/* harmony default export */ var Text_scriptvue_type_script_lang_js_ = ({
  name: 'swText',
  props: {
    content: {
      type: String
    }
  }
});
// CONCATENATED MODULE: ./VueSimput/src/widgets/Text/script.js?vue&type=script&lang=js&
 /* harmony default export */ var widgets_Text_scriptvue_type_script_lang_js_ = (Text_scriptvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./VueSimput/src/widgets/Text/index.vue





/* normalize component */

var Text_component = normalizeComponent(
  widgets_Text_scriptvue_type_script_lang_js_,
  templatevue_type_template_id_ed157ba8_render,
  templatevue_type_template_id_ed157ba8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Text = (Text_component.exports);
// CONCATENATED MODULE: ./VueSimput/src/widgets/index.js









/* harmony default export */ var widgets = ({
  SwSelect: Select,
  SwSlider: Slider,
  SwSwitch: Switch,
  SwTextArea: TextArea,
  SwTextField: TextField,
  SwProxy: Proxy,
  SwShow: Show,
  SwHide: Hide,
  SwText: Text
});
// CONCATENATED MODULE: ./VueSimput/src/main.js




/* harmony default export */ var main = ({
  install: function install(Vue) {
    Object.keys(components).forEach(function (name) {
      Vue.component(name, components[name]);
    });
    Object.keys(widgets).forEach(function (name) {
      Vue.component(name, widgets[name]);
    });
  }
});
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (main);



/***/ }),

/***/ "fb6a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var isArray = __webpack_require__("e8b5");
var isConstructor = __webpack_require__("68ee");
var isObject = __webpack_require__("861d");
var toAbsoluteIndex = __webpack_require__("23cb");
var toLength = __webpack_require__("50c4");
var toIndexedObject = __webpack_require__("fc6a");
var createProperty = __webpack_require__("8418");
var wellKnownSymbol = __webpack_require__("b622");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (isConstructor(Constructor) && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ "fc6a":
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__("44ad");
var requireObjectCoercible = __webpack_require__("1d80");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "fdbc":
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "fdbf":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__("4930");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=vue-simput.umd.js.map
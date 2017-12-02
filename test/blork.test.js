const { BlorkError } = require('../lib/errors');
const { checkers } = require('../lib/checkers');
const { check, args, add, throws } = require('../lib/blork');

// Tests.
describe('check()', () => {
	test('Return correctly when checks pass (string format)', () => {
		expect.assertions(Object.keys(checkers).length);
		// Checkers.
		expect(check(null, 'null')).toBe(1);
		expect(check(undefined, 'undefined')).toBe(1);
		expect(check(true, 'defined')).toBe(1);
		expect(check(true, 'boolean')).toBe(1);
		expect(check(true, 'true')).toBe(1);
		expect(check(false, 'false')).toBe(1);
		expect(check(true, 'truthy')).toBe(1);
		expect(check(false, 'falsy')).toBe(1);
		expect(check(1, 'number')).toBe(1);
		expect(check(1, 'integer')).toBe(1);
		expect(check(1, 'natural')).toBe(1);
		expect(check(1, 'whole')).toBe(1);
		expect(check(1, 'finite')).toBe(1);
		expect(check('a', 'string')).toBe(1);
		expect(check('a', 'string+')).toBe(1);
		expect(check('a', 'lowercase')).toBe(1);
		expect(check('a', 'lowercase+')).toBe(1);
		expect(check('A', 'uppercase')).toBe(1);
		expect(check('A', 'uppercase+')).toBe(1);
		expect(check(function() {}, 'function')).toBe(1);
		expect(check({ a: 1 }, 'object')).toBe(1);
		expect(check({ a: 1 }, 'object+')).toBe(1);
		expect(check({ [Symbol.iterator]: () => {} }, 'iterable')).toBe(1);
		expect(check([], 'array')).toBe(1);
		expect(check([1], 'array+')).toBe(1);
		expect(check(new Map(), 'map')).toBe(1);
		expect(check(new Map([[1, 1]]), 'map+')).toBe(1);
		expect(check(new WeakMap(), 'weakmap')).toBe(1);
		expect(check(new Set(), 'set')).toBe(1);
		expect(check(new Set([1]), 'set+')).toBe(1);
		expect(check(new WeakSet(), 'weakset')).toBe(1);
		expect(check(arguments, 'arguments')).toBe(1);
		expect(check(Promise.resolve(), 'promise')).toBe(1);
		expect(check(new Date(), 'date')).toBe(1);
		expect(check(new Date(2080, 0, 1), 'future')).toBe(1);
		expect(check(new Date(1980, 0, 1), 'past')).toBe(1);
		// Checker alternates.
		expect(check(undefined, 'void')).toBe(1);
		expect(check(undefined, 'undef')).toBe(1);
		expect(check(true, 'def')).toBe(1);
		expect(check(true, 'bool')).toBe(1);
		expect(check(1, 'num')).toBe(1);
		expect(check(1, 'int')).toBe(1);
		expect(check('a', 'str')).toBe(1);
		expect(check('a', 'str+')).toBe(1);
		expect(check(function() {}, 'func')).toBe(1);
		expect(check('a', 'lower')).toBe(1);
		expect(check('a', 'lower+')).toBe(1);
		expect(check('A', 'upper')).toBe(1);
		expect(check('A', 'upper+')).toBe(1);
		expect(check({ a: 1 }, 'obj')).toBe(1);
		expect(check({ a: 1 }, 'obj+')).toBe(1);
		expect(check([], 'arr')).toBe(1);
		expect(check([1], 'arr+')).toBe(1);
		expect(check(arguments, 'args')).toBe(1);
	});
	test('Throw TypeError when checks fail (string format)', () => {
		expect.assertions(Object.keys(checkers).length);
		// Checkers.
		expect(() => check(null, 'undefined')).toThrow(TypeError);
		expect(() => check(undefined, 'defined')).toThrow(TypeError);
		expect(() => check(0, 'null')).toThrow(TypeError);
		expect(() => check(9, 'boolean')).toThrow(TypeError);
		expect(() => check(1, 'true')).toThrow(TypeError);
		expect(() => check(9, 'false')).toThrow(TypeError);
		expect(() => check(0, 'truthy')).toThrow(TypeError);
		expect(() => check(1, 'falsy')).toThrow(TypeError);
		expect(() => check('1', 'number')).toThrow(TypeError);
		expect(() => check(1.5, 'integer')).toThrow(TypeError);
		expect(() => check(0, 'natural')).toThrow(TypeError);
		expect(() => check(-1, 'whole')).toThrow(TypeError);
		expect(() => check(NaN, 'finite')).toThrow(TypeError);
		expect(() => check(1, 'string')).toThrow(TypeError);
		expect(() => check('', 'string+')).toThrow(TypeError);
		expect(() => check('A', 'lowercase')).toThrow(TypeError);
		expect(() => check('A', 'lowercase+')).toThrow(TypeError);
		expect(() => check('a', 'uppercase')).toThrow(TypeError);
		expect(() => check('a', 'uppercase+')).toThrow(TypeError);
		expect(() => check({}, 'function')).toThrow(TypeError);
		expect(() => check(1, 'object')).toThrow(TypeError);
		expect(() => check({}, 'object+')).toThrow(TypeError);
		expect(() => check({}, 'iterable')).toThrow(TypeError);
		expect(() => check({}, 'array')).toThrow(TypeError);
		expect(() => check({}, 'array+')).toThrow(TypeError);
		expect(() => check([], 'map')).toThrow(TypeError);
		expect(() => check(new Map(), 'map+')).toThrow(TypeError);
		expect(() => check([], 'weakmap')).toThrow(TypeError);
		expect(() => check([], 'set')).toThrow(TypeError);
		expect(() => check(new Set(), 'set+')).toThrow(TypeError);
		expect(() => check([], 'weakset')).toThrow(TypeError);
		expect(() => check({}, 'arguments')).toThrow(TypeError);
		expect(() => check(true, 'promise')).toThrow(TypeError);
		expect(() => check('2016', 'date')).toThrow(TypeError);
		expect(() => check(new Date(1080, 0, 1), 'future')).toThrow(TypeError);
		expect(() => check(new Date(2980, 0, 1), 'past')).toThrow(TypeError);
		// Checker alternates.
		expect(() => check(null, 'void')).toThrow(TypeError);
		expect(() => check(null, 'undef')).toThrow(TypeError);
		expect(() => check(undefined, 'def')).toThrow(TypeError);
		expect(() => check(9, 'bool')).toThrow(TypeError);
		expect(() => check('1', 'num')).toThrow(TypeError);
		expect(() => check(1.5, 'int')).toThrow(TypeError);
		expect(() => check(1, 'str')).toThrow(TypeError);
		expect(() => check('', 'str+')).toThrow(TypeError);
		expect(() => check('A', 'lower')).toThrow(TypeError);
		expect(() => check('A', 'lower+')).toThrow(TypeError);
		expect(() => check('a', 'upper')).toThrow(TypeError);
		expect(() => check('a', 'upper+')).toThrow(TypeError);
		expect(() => check({}, 'func')).toThrow(TypeError);
		expect(() => check(1, 'obj')).toThrow(TypeError);
		expect(() => check({}, 'obj+')).toThrow(TypeError);
		expect(() => check({}, 'arr')).toThrow(TypeError);
		expect(() => check({}, 'arr+')).toThrow(TypeError);
		expect(() => check({}, 'args')).toThrow(TypeError);
	});
	test('Return correctly when checks pass (optional string format)', () => {
		expect(check(1, 'number?')).toBe(1);
		expect(check('a', 'string?')).toBe(1);
		expect(check({}, 'object?')).toBe(1);
		expect(check(undefined, 'number?')).toBe(0);
		expect(check(undefined, 'string?')).toBe(0);
		expect(check(undefined, 'object?')).toBe(0);
	});
	test('Throw TypeError when checks fail (optional string format)', () => {
		expect(() => check('a', 'number?')).toThrow(TypeError);
		expect(() => check(1, 'string?')).toThrow(TypeError);
		expect(() => check(1, 'object?')).toThrow(TypeError);
	});
	test('Return correctly when checks pass (constructor format)', () => {
		expect(check(true, Boolean)).toBe(1);
		expect(check(1, Number)).toBe(1);
		expect(check('a', String)).toBe(1);
		expect(check({}, Object)).toBe(1);
		expect(check([], Array)).toBe(1);
		expect(check(Promise.resolve(true), Promise)).toBe(1);
	});
	test('Throw TypeError when checks fail (constructor format)', () => {
		expect(() => check(1, Boolean)).toThrow(TypeError);
		expect(() => check('a', Number)).toThrow(TypeError);
		expect(() => check(null, String)).toThrow(TypeError);
		expect(() => check('a', Object)).toThrow(TypeError);
		expect(() => check({}, Array)).toThrow(TypeError);
		expect(() => check({}, Promise)).toThrow(TypeError);
		expect(() => check(1, Boolean)).toThrow(/Must be true or false/);
		expect(() => check('a', Number)).toThrow(/Must be a number/);
		expect(() => check(null, String)).toThrow(/Must be a string/);
		expect(() => check('a', Object)).toThrow(/Must be an instance of Object/);
		expect(() => check({}, Array)).toThrow(/Must be an instance of Array/);
		expect(() => check({}, Promise)).toThrow(/Must be an instance of Promise/);
	});
	test('Return correctly when checks pass (custom constructor format)', () => {
		class MyClass {}
		const myClass = new MyClass();
		expect(check(myClass, MyClass)).toBe(1);
		class MySubClass extends MyClass {}
		const mySubClass = new MySubClass();
		expect(check(mySubClass, MyClass)).toBe(1);
	});
	test('Throw TypeError when checks fail (custom constructor format)', () => {
		class MyClass {}
		class MyOtherClass {}
		const myClass = new MyClass();
		expect(() => check(myClass, MyOtherClass)).toThrow(TypeError);
		expect(() => check(myClass, MyOtherClass)).toThrow(/Must be an instance of MyOtherClass/);
		expect(() => check(myClass, class {})).toThrow(TypeError);
		expect(() => check(myClass, class {})).toThrow(/Must be an instance of anonymous class/);
		expect(() => check(myClass, function () {})).toThrow(TypeError);
		expect(() => check(myClass, function () {})).toThrow(/Must be an instance of anonymous class/);
	});
	test('Return correctly when checks pass (object literal format)', () => {
		expect(check({ a: 'a', b: 1 }, { a: 'str', b: Number })).toBe(2);
		expect(check({ a: 'a', z: 'extraparam' }, { a: String })).toBe(1); // Objects ignore extra params.
		expect(check({ a: 'a', b: undefined }, { a: 'str', b: 'num?' })).toBe(1);  // Objects don't count undefined optional values.
	});
	test('Throw TypeError when checks fail (object literal format)', () => {
		expect(() => check({ a: 'notnumberparam' }, { a: Number })).toThrow(TypeError);
	});
	test('Throw TypeError if value is not object (object literal format)', () => {
		expect(() => check(123, { '1': Number })).toThrow(TypeError);
	});
	test('Return correctly when checks pass (array literal format)', () => {
		expect(check([1, 2, 3], [Number])).toBe(3);
		expect(check([1, 2, 3], ['num'])).toBe(3);
		expect(check([1, undefined, 3], ['num?'])).toBe(2); // Arrays don't count undefined optional values.
	});
	test('Throw TypeError when checks fail (array literal format)', () => {
		expect(() => check([1, 2, 'surprisestring'], [Number])).toThrow(TypeError);
	});
	test('Throw TypeError if value is not array (array literal format)', () => {
		expect(() => check({ a: 123 }, [String])).toThrow(TypeError);
	});
	test('Return correctly when checks pass (array tuple format)', () => {
		expect(check([1, 2, 3], [Number, Number, Number])).toBe(3);
		expect(check([1, 2, 3], ['num', 'num', 'num'])).toBe(3);
		expect(check([1, undefined, 3], ['num?', 'num?', 'num?'])).toBe(2); // Arrays don't count undefined optional values.
	});
	test('Throw TypeError when checks fail (array tuple format)', () => {
		expect(() => check([1, 1], [Number, String])).toThrow(TypeError);
		expect(() => check([1, 'b', 'excessitem'], [Number, String])).toThrow(TypeError);
	});
	test('Throw TypeError if value is not array (array tuple format)', () => {
		expect(() => check({ a: 123 }, [String])).toThrow(TypeError);
	});
	test('Throw BlorkError if type is not object, function, or string', () => {
		expect(() => check(1, 123)).toThrow(BlorkError);
		expect(() => check(1, true)).toThrow(BlorkError);
		expect(() => check(1, null)).toThrow(BlorkError);
		expect(() => check(1, undefined)).toThrow(BlorkError);
	});
	test('Do not throw error if passing string name', () => {
		expect(check(true, 'bool', 'myValue')).toBe(1);
		expect(check(true, Boolean, 'myValue')).toBe(1);
		expect(check([true], ['bool'], 'myValue')).toBe(1);
		expect(check({ bool: true }, { bool: 'bool' }, 'myValue')).toBe(1);
	});
	test('Throw BlorkError if passing non-string name', () => {
		expect(() => check(1, 'bool', 123)).toThrow(BlorkError);
	});
	test('Throw BlorkError if checker does not exist', () => {
		expect(() => check(1, 'checkerthatdoesnotexist')).toThrow(BlorkError);
	});
});
describe('args()', () => {
	test('Return correctly when argument checks pass', () => {
		const argsObj = { '0': 'a', '1': 123, '2': true, length: 3 };
		expect(args(argsObj, [String, Number, Boolean])).toBe(3);
		const argsArr = ['a', 123, true];
		expect(args(argsArr, [String, Number, Boolean])).toBe(3);
	});
	test('Return correct number when arguments are optional', () => {
		const argsObj = { '0': 'a', '1': 123, length: 2 };
		expect(args(argsObj, ['str', 'num', 'bool?'])).toBe(2);
		const argsArr = ['a', 123];
		expect(args(argsArr, ['str', 'num', 'bool?'])).toBe(2);
	});
	test('Throw TypeError when argument checks fail', () => {
		const argsObj = { '0': 'a', length: 3 };
		expect(() => args(argsObj, [Number])).toThrow(TypeError);
	});
	test('Throw TypeError when too many arguments', () => {
		const argsObj = { '0': true, '1': true, '2': true, length: 3 };
		expect(() => args(argsObj, [Boolean, Boolean])).toThrow(TypeError);
	});
	test('Throw BlorkError if passing non-arguments-like object', () => {
		expect(() => args({}, [Number])).toThrow(BlorkError);
	});
});
describe('add()', () => {
	test('Add and run a custom checker', () => {
		// Define a checker called 'isstring'.
		expect(add('test.checker', v => typeof v === 'string' || 'must be string')).toBeUndefined();

		// Check a passing value.
		expect(check('abc', 'test.checker')).toBe(1);

		// Check a failing value.
		expect(() => check(123, 'test.checker')).toThrow(TypeError);
	});
	test('Throw BlorkError if not non-empty lowercase string', () => {
		const func = () => {};
		expect(() => add(123, func)).toThrow(BlorkError);
		expect(() => add('', func)).toThrow(BlorkError);
		expect(() => add('UPPER', func)).toThrow(BlorkError);
	});
	test('Throw BlorkError if passing a non-function', () => {
		expect(() => add('test.checker.nonfunction', true)).toThrow(BlorkError);
	});
	test('Throw BlorkError if same name as existing', () => {
		const func = () => {};
		add('test.checker.samename', func);
		expect(() => add('test.checker.samename', func)).toThrow(BlorkError);
	});
});
describe('throws()', () => {
	test('Set a custom error object and check it throws', () => {
		// Define a custom error.
		class MyError extends Error {}

		// Set it as the custom error.
		expect(throws(MyError)).toBeUndefined();

		// Fail a check and make sure it throws the custom error (not TypeError).
		expect(() => check(false, 'true')).toThrow(MyError);
	});
	test('Throw BlorkError if passing a non-function', () => {
		expect(() => throws(false)).toThrow(BlorkError);
		expect(() => throws(123)).toThrow(BlorkError);
		expect(() => throws({})).toThrow(BlorkError);
	});
});

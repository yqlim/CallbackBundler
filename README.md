## JavaScript - CallbackBundler
A tool to bundle callbacks and attach to any object that supports event listener.

## Install

### npm

It's recommended to install it as dependency.

```console
npm install --save callbackbundler
```

### browser

Download the `callbackbundler.min.js` file and include it in your HTML.

```html
<script src="path/to/src/callbackbundler.min.js"></script>
```

## Usage

### CommonJS

```javascript
var CallbackBundler = require('callbackbundler');
var bundle = new CallbackBundler();
```

### Browser

```html
<!--<script src="path/to/src/callbackbundler.min.js"></script>-->
<script>
var bundle = new CallbackBundler();
</script>
```

## API

`CallbackBundler` is extended from `Array.prototype`. Therefore, apart from the methods listed below, it can use every Array instance's methods that environment supports.

The examples below will use the functions and variables defined below:

```javascript
var bundle = new CallbackBundler();

function callback1(){
    console.log(1);
}
function callback2(){
    console.log(this);
}
function callback(e, v){
    console.log(e, v);
}
```

### .add

```javascript
bundle.add(callback1);
bundle.add(callback2);
bundle.add(callback3);

/* OR */

bundle.add(callback1, callback2, callback3);
```

### .remove

```javascript
bundle.remove(callback1);
bundle.remove(callback2);
bundle.remove(callback3);

/* OR */

bundle.remove(callback1, callback2, callback3);
```

### .attach

```javascript
var elem = document.body,       // or any object with event listener API
    api = 'addEventListener',   // or other equivalent methods, i.e., "on"
    type = 'click';             // or other event types, i.e., "keypress"

bundle.attach(elem, api, type);

/**
 * When document.body is clicked, console will print:
 * (Using the functions declared above)
 * => 1
 * => <body>...</body>
 * => MouseEvent {...}, undefined
 */
```

### .run

```javascript
bundle.run('thisVal', [  // Pass arguments to each callback by array
    undefined,           // These arguments must be wrapped in another array
    undefined,           // If not an array, item will be auto-wrapped in a new array
    ['argument 0', true] // Using an array, you can pass as many arguments as you want
]);

/**
 * Console will print:
 * => 1
 * => 'thisVal'
 * => 'argument 0', true
 */
```

### .size

```javascript
console.log(bundle.size);
// => 3
```

## Actual use case?

It will be useful if:

1. You are not using any JavaScript libraries (i.e., jQuery, etc).
2. You are building a web app that involves a lot of dynamically created while reactive elements.
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

`CallbackBundler` is extended from `Array.prototype`. Therefore, apart from the methods listed below, it can use every Array instance's methods that environment supports. Although, it is **not** recommended as it might generate unexpected result if handled carelessly.

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

### .attach

```javascript
var elem = document.body,       // or any object with event listener API
    api = 'addEventListener',   // or other equivalent methods, i.e., "on"
    type = 'click',             // or other event types, i.e., "keypress"
    otherArgs = { once: true }  // any number of additional arguments can be passed

bundle.attach(elem, api, type, /* optional */otherArgs);

/**
 * When document.body is clicked, console will print:
 * (Using the functions declared above)
 * => 1
 * => <body>...</body>
 * => MouseEvent {...}, undefined
 */
```

### .detach

```javascript
var elem = document.body,        // or any object with event listener API
    api = 'removeEventListener', // or other equivalent methods, i.e., "on"
    type = 'click';              // or other event types, i.e., "keypress"

bundle.detach(elem, api, type);

// Now when document.body is clicked, nothing will print in console.
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

**Caveat:** You need to keep track on the indexes of each callback that you bundled to accurately pass arguments.

### .size

```javascript
console.log(bundle.size);
// => 3
```

**Note:** You can also use `bundle.length`.

### .remove

```javascript
bundle.remove(callback1);
bundle.remove(callback2);
bundle.remove(callback3);

/* OR */

bundle.remove(callback1, callback2, callback3);
```

**Note:** Removing callback(s) will not remove it from previously attached event listener. Use with care.

## Actual use case?

It will be useful if:

1. You are building a web app that involves a lot of dynamically created while reactive elements.
2. You are not using any JavaScript libraries (i.e., jQuery, etc).
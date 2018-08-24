(function(global, factory){

    if (typeof exports === 'object' && typeof module !== 'undefined')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define(factory);
    else
        global.CallbackBundler = factory();

})(this, function(){

    'use strict';

    // Scoped polyfill for Object.defineProperties
    function defineProperties(proto, desc){
        var key, val;
        for (key in desc){
            val = desc[key];
            Object.defineProperty(proto, key, (val && typeof val === 'object' && ('get' in val || 'set' in val)) ? val : {
                value: val,
                writable: false,
                enumerable: false,
                configurable: false
            });
        }
    }

    function CallbackBundler(){
        // Class call check
        (function(inst, constr){
            if (!(inst instanceof constr))
                throw new TypeError('CallbackBundler constructor must be called with the keyword "new".');
        })(this, CallbackBundler);
    }

    // CallbackBundler instance can use all methods of an Array instance
    CallbackBundler.prototype = Object.create(Array.prototype);

    defineProperties(CallbackBundler.prototype, {

        size: {
            get: function(){
                return this.length;
            }
        },

        add: function(callback){
            if (typeof callback !== 'function')
                throw new TypeError('CallbackBundler.add: Argument type of function is expected.');

            this.push(callback);

            return true;
        },

        remove: function(callback){
            var i;

            if (typeof callback === 'function')
                i = this.indexOf(callback);
            else if (typeof callback === 'number')
                i = callback;
            else
                throw new TypeError('CallbackBundler.remove: Only argument type of function and number is accepted.');

            if (i < 0 || i >= this.length)
                return false;

            this.splice(i, 1);

            return true;
        },

        // Attach bundled callbacks to an object with its own API
        attach: function(obj, api, type){
            var i, len, args;

            api = obj[api];

            if (typeof api !== 'function')
                throw new TypeError('CallbackBundler.attach: "' + arguments[1] + '" is not a valid event listener attachment method of object provided as arguments[0].');

            if (typeof type !== 'string')
                throw new TypeError('CallbackBundler.attach: Event type is not specified.');

            api = api.bind(obj, type);
            args = [];

            // Getting additional arguments to be passed to api
            for (i = 3, len = arguments.length; i < len; i++)
                args.push(arguments[i]);

            for (i = 0, len = this.length; i < len; i++)
                api.apply(api, [this[i]].concat(args));
        },

        // Run the bundled callbacks independently in sequence
        run: function(ctx){
            var i, len,
                args = [];

            for (i = 1, len = arguments.length; i < len; i++)
                args.push(arguments[i]);

            for (i = 0, len = this.length; i < len; i++)
                this[i].apply(ctx, args);
        }

    });

    return CallbackBundler;

});
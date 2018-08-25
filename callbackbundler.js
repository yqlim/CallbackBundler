/**
 * CallbackBundler
 * Copyright (c) by Yong Quan Lim
 * Distributed under MIT license: https://github.com/yqlim/CallbackBundler
 */
(function(global, factory){

    if (typeof exports === 'object' && typeof module !== 'undefined')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define(factory);
    else
        global.CallbackBundler = factory();

})(this, function(){

    'use strict';
    
    function createDescriptor(desc){
        var key;

        for (key in desc)
            if (!isDescriptor(desc[key]))
                desc[key] = { value: desc[key] }

        return desc;

        function isDescriptor(obj){
            if (!obj || typeof obj !== 'object')
                return false;

            return ('get' in obj || 'set' in obj)
                || ('value' in obj && ('writable' in obj || 'enumerable' in obj || 'configurable' in obj))
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
    CallbackBundler.prototype = Object.create(Array.prototype, createDescriptor({

        constructor: CallbackBundler,

        size: {
            get: function(){
                return this.length;
            }
        },

        add: function(){
            var i, len, callback;

            for (i = 0, len = arguments.length; i < len; i++){
                callback = arguments[i];

                if (typeof callback !== 'function')
                    throw new TypeError('Argument[' + i + '] is not type of function.');

                this.push(arguments[i]);
            }
        },

        remove: function(){
            var i, len, callback;

            for (i = 0, len = arguments.length; i < len; i++){
                callback = arguments[i];

                if (typeof callback !== 'function')
                    throw new TypeError('Argument[' + i + '] is not type of function.');

                this.splice(i, 1);
            }
        },

        // Attach bundled callbacks to an object with its own API
        attach: function(obj, api, type){
            var i, len, args;

            api = obj[api];

            if (typeof api !== 'function')
                throw new TypeError('"' + arguments[1] + '" is not a valid event listener attachment method of the object provided as arguments[0].');

            if (typeof type !== 'string')
                throw new TypeError('Event type expects a string value.');

            api = api.bind(obj, type);
            args = [];

            // Getting additional arguments to be passed to api
            for (i = 3, len = arguments.length; i < len; i++)
                args.push(arguments[i]);

            for (i = 0, len = this.length; i < len; i++)
                // This ensures the pattern: obj.api(type, callback, ...args)
                api.apply(api, [this[i]].concat(args));
        },

        detach: function(obj, api, type){
            var i, len, args;

            api = obj[api];

            if (typeof api !== 'function')
                throw new TypeError('"' + arguments[1] + '" is not a valid event listener attachment method of the object provided as arguments[0].');

            if (typeof type !== 'string')
                throw new TypeError('Event type expects a string value.');

            for (i = 0, len = this.length; i < len; i++)
                // This ensures the pattern: obj.api(type, callback)
                api.call(obj, type, this[i]);
        },

        // Run the bundled callbacks independently in sequence
        run: function(ctx, args){
            var i, len, arg;

            args = args || [];

            if (args && args.constructor !== Array)
                throw new TypeError('Argument[1] must be an array.');

            for (i = 0, len = this.length; i < len; i++){
                arg = args[i] || [];

                if (arg && arg.constructor !== Array)
                    arg = [arg];

                this[i].apply(ctx, arg);
            }
        }

    }));

    return CallbackBundler;

});
(function(global, factory){

    if (typeof exports === 'object' && typeof module !== 'undefined')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define(factory);
    else
        global.InternalPointer = factory();

})(function(){

    'use strict';

    function define(proto, desc){
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

    CallbackBundler.prototype = Object.create(Array.prototype);

    define(CallbackBundler.prototype, {

        size: {
            get: function(){
                return this.length;
            }
        },

        add: function(callback){
            this.push(callback);
        },

        remove: function(callback){
            var i = this.indexOf(callback);

            if (i < 0)
                return false;

            this.splice(i, 1);

            return true;
        }

    });

    return CallbackBundler;

});
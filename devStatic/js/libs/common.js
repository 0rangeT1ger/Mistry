/**
 * Created by wujianbo on 15/9/21.
 */
//实际上，这个是常用的jQuery一个方法的实现。
//我需要这个方法，但是为了这个方法引入jQuery好像不太实际，所以拿了进来
void function(global){
    var extend,
        _extend,
        _isObject;

    _isObject = function(o){
        return Object.prototype.toString.call(o) === '[object Object]';
    };

    _extend = function self(destination, source) {
        var property;
        for (property in destination) {
            if (destination.hasOwnProperty(property)) {

                if (_isObject(destination[property]) && _isObject(source[property])) {
                    self(destination[property], source[property]);
                }

                if (source.hasOwnProperty(property)) {
                    continue;
                } else {
                    source[property] = destination[property];
                }
            }
        }
    };

    extend = function(){
        var arr = arguments,
            result = {},
            i;

        if (!arr.length) return {};

        for (i = arr.length - 1; i >= 0; i--) {
            if (_isObject(arr[i])) {
                _extend(arr[i], result);
            }
        }

        arr[0] = result;
        return result;
    };

    global.extend = extend;
}(module.exports);
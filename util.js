function Util() {
  var self = this;

  // addMethod - By John Resig (MIT Licensed)
  self.addMethod = function(object, name, fn){
    var old = object[ name ];
    object[ name ] = function(){
      if ( fn.length == arguments.length )
        return fn.apply( this, arguments );
      else if ( typeof old == 'function' )
        return old.apply( this, arguments );
    };
  }
}

module.exports = new Util();

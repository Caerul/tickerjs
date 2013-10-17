;(function($){

	var options	= {
			speedup:	1000,		// Speed (in ms) of ascension
			speeddown:	1000,		// Speed (in ms) of descension
			stepup:		1,		// Amount to step each tick (up)
			stepdown:	1,		// Amount to step each tick (down)
			starting:	0,

			// Settings used during execution
			isRunning:	false,
			speed:		1000,			// Current execution speed
			step:		-1,
			currentMode:"up",
			state:		"stopped",
			ticker:		"",
			count:		0,
			value:		0,

			tick:		function(args){},
			pause:		function(args){},
			start:		function(args){},
			reset:		function(args){},
			set:		function(args){}
	}


	$.fn.ticker = function(methodOrOptions){
		console.log("Executing core of tickerjs");

		if( methods[methodOrOptions] ) {
			return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call(arguments,1) );
		}
		else if( typeof methodOrOptions === 'object' || !methodOrOptions ) {
			options.self	= this;
			return methods.init.apply( this, arguments );
		}
		else {
			$.error( 'Method ' + method + ' does not exist on jQuery.ticker' );
		}

		return this;
	}

	var funcs	= {
		start:	function() {
			options.state		= "running";
			options.isRunning	= true;
			options.ticker		= setInterval( funcs.tick, options.speed );
			
			return options.ticker;
		},
		stop:	function() {
			options.state		= "stopped";
			options.isRunning	= false;
			clearInterval(options.ticker);
		},
		tick:	function() {
			options.count++;
			options.value += options.step;

			options.tick({
				counter:	options.count,
				value:		options.value,
				step:		options.step,
				elapsed:	options.count*options.speed
			});
		}
	}

	var methods = {
		init:	function(args){
			$.extend( options, args );
		},
		up:		function(args){
			
		},
		down:	function(args){
			
		},
		start:	function(args){
			funcs.start();
		},
		stop:	function(args){
			funcs.stop();			
		},
		reset:	function(args){
			funcs.stop();
			options.count		= 0;
			options.value		= 0;
			options.reset({
				counter:	options.count,
				value:		options.value,
				step:		options.step,
				elapsed:	options.count*options.speed
			});
		},
		set:	function(val){
			options.value	= val;
			options.set({
				counter:	options.count,
				value:		options.value,
				step:		options.step,
				elapsed:	options.count*options.speed
			});
		}
	}

	
})(jQuery);
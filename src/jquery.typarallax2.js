/*!
 * Responsive jQuery Parallax plugin
 * Original author: @tomsarduy
 * Licensed under the MIT license
 */

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global
		// variable in ECMAScript 3 and is mutable (i.e. it can
		// be changed by someone else). undefined isn't really
		// being passed in so we can ensure that its value is
		// truly undefined. In ES5, undefined can no longer be
		// modified.

		// window and document are passed through as local
		// variables rather than as globals, because this (slightly)
		// quickens the resolution process and can be more
		// efficiently minified (especially when both are
		// regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "tyParallax", 
		$window = $(window),
		scrolling = false,
		defaults   = {
			fullHeight: true,
			speed: 1.5,
			backgrounds:true,
			parallaxHeight: '100%'
		};

		// The actual plugin constructor
		function Plugin( element, options ) {
			this.element = element;

			// jQuery has an extend method that merges the
			// contents of two or more objects, storing the
			// result in the first object. The first object
			// is generally empty because we don't want to alter
			// the default options for future instances of the plugin
			this.options = $.extend( {}, defaults, options) ;

			this._defaults = defaults;
			this._name = pluginName;

			this.init();
		}

		Plugin.prototype = {

			init: function() {
				console.log(this.element);
				// Initialization logic here
				this.updateHeight();

				//Polyfill for RequestAnimationFrame
				this.animationFramePolyfill();

				//Onload image event
				$(this.element).find("img.cover").one("load", function() {
					//Simulating background size cover in <img>
					var $winH = $window.height();
					var $winW = $window.width();
	          		var $img = $(this);

					$img.css({
						'width': 'auto',
						'height': '100%',
					});

					if($img.width()<$winW){
						$img.css({
							'width': '100%',
							'max-height': 'initial',
							'height': 'auto'
						});
					}

					$img.css({
						'width': '100%',
						'height': 'auto',
					});

					if($img.height()<$winH){
						$img.css({
							'height': $winH+'px',
							'max-width': 'initial',
							'width': 'auto'
						});
					}

					var diffX = -($img.width()- $winW)/2;
					var diffY = -($img.height()- $winH)/2;

					$img.css('transform', 'translate('+diffX+'px,'+diffY+'px)');

					//FadeIn image on load
          			$(this).fadeIn('slow');

		        }).each(function() {
		        	//If the image is already in cache
		            if(this.complete){ 
			        	$(this).load(); 
			        }
		        });

		        //Updating `this` context so we use it with jQuery
		        var self = this;

		        $window.bind('orientationchange, resize', function() {
					self.simulateCover();
				  	self.updateHeight();
				  	self.render.bind(self);
				});

		        //The parallax container method using requestAnimationFrame
		        $window.scroll(function() {
		        	//The performance trick ;)
					window.requestAnimationFrame(self.render.bind(self));
		        }).trigger('scroll');
			},


			//Check for translate3d support 
			support3d: function() {
				//If modernizr is initialized, we don't need to use our test

				if (typeof Modernizr == 'object' && Modernizr.csstransforms3d) { 
					return true;
				}

				if (!window.getComputedStyle) {
						return false;
				}

				var el = document.createElement('p'), 
						has3d,
						transforms = {
								'webkitTransform':'-webkit-transform',
								'OTransform':'-o-transform',
								'msTransform':'-ms-transform',
								'MozTransform':'-moz-transform',
								'transform':'transform'
						};

				// Add it to the body to get the computed style.
				document.body.insertBefore(el, null);

				for (var t in transforms) {
						if (el.style[t] !== undefined) {
								el.style[t] = "translate3d(1px,1px,1px)";
								has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
						}
				}

				document.body.removeChild(el);

				return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
			},

			//Since we are using <img> tags, we may want to simulate background-size: cover
			simulateCover: function (){
				var $winH = $window.height();
				var $winW = $window.width();

				$('img.cover').each(function() {
					var $img = $(this);
					$img.css({
						'width': 'auto',
						'height': '100%',
					});

					if($img.width()<$winW){
						$img.css({
							'width': '100%',
							'max-height': 'initial',
							'height': 'auto'
						});
					}

					$img.css({
						'width': '100%',
						'height': 'auto',
					});

					if($img.height()<$winH){
						$img.css({
							'height': $winH+'px',
							'max-width': 'initial',
							'width': 'auto'
						});
					}

					var diffX = -($img.width()- $winW)/2;
					var diffY = -($img.height()- $winH)/2;
					$img.css('transform', 'translate('+diffX+'px,'+diffY+'px)');

				});
			},

			//window.requestAnimationFrame Polyfill for Old Browsers
			animationFramePolyfill: function () {
				var lastTime = 0;
				var vendors = ['ms', 'moz', 'webkit', 'o'];
				for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
						window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
						window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
				}
		 
				if (!window.requestAnimationFrame){
					window.requestAnimationFrame = function(callback) {
						var currTime = new Date().getTime();
						var timeToCall = Math.max(0, 16 - (currTime - lastTime));
						var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
							timeToCall);
						lastTime = currTime + timeToCall;
						return id;
					};
				}

				if (!window.cancelAnimationFrame){
					window.cancelAnimationFrame = function(id) {
							clearTimeout(id);
					};
				}
			},

			//Update height of parallax sections
			updateHeight: function () {
				var $el = $(this.element);
				$el.height($window.height());
				$el.find('.ty-background').height($window.height());
				$inner = $el.find('.ty-inner');
				$rand = 1+ Math.floor(Math.random() * 3);
				$inner.hasClass('dark')?
					$inner.addClass('dark-'+$rand):
					$inner.addClass('light-'+$rand);
			},

			//The Parallax rendering, magic happens here
			render: function() {

				// assigning the object front and back
				var $front = $(this.element);
				var $back  = $front.find('.ty-background');
				var $backinner = $back.find('.ty-inner');

				//offset top of the front layer
				var $offsetTop = $front.offset().top;
				var $scrollY = window.scrollY || window.pageYOffset || 0;
				var $winST = $window.scrollTop();


				/* 
					If user is scrolling and the windows is between one of the front parallax layers,
					then we bring the corresponding background layer to that position and parallax is applied
				*/

				if(($winST+$window.height() >= $offsetTop) && $winST <= $offsetTop + $front.height()){
					
					//Calculating the speed of the parallax
					var $diffElem = (($scrollY-$offsetTop)/1.3).toFixed(0)+ 'px';

					/*
						This is where the magic happens, applying transform3d to the background layer
						and the container, to simulate the parallax effect
					*/

					$back.css('transform','translate3d(0,'+($offsetTop-$scrollY)+'px,0)');
					$backinner.css('transform', 'translate3d(0,'+($diffElem)+',0)');

				}
				else{

					/*
						If the layer is not inside the windows, we set the background 
						layer outside the viewport to get a better performance, so we 
						only do parallax in one or two layers at the same time.
					*/

					$back.css('transform', 'translate3d(0,-9000px,0)');
				}
			}
		};

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[pluginName] = function ( options ) {
			return this.each(function () {
				if (!$.data(this, "plugin_" + pluginName)) {
					$.data(this, "plugin_" + pluginName,
					new Plugin( this, options ));
				}
			});
		};

})( jQuery, window, document );
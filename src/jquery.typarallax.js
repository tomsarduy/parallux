/*
 *  jquery.typarallax.js - v0.0.1
 *  Another jQuery Plugin for Parallax Animation
 *  http://tomsarduy.github.io/typarallax
 *
 *  Made by Tomás J. Ramírez, Yoan Ribbot
 *  Under MIT License
 */


//Polyfill for requestAnimationFrame
(function() {
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

}());


(function($){

    $.fn.tyParallax = function(){
    	var $elems = $(this);
    	var $window = $(window);

			//Better than calling render in the $scroll jquery function
      function animloop(){
			  window.requestAnimationFrame(animloop);
			  render();
			}

			/* 
				We call this function using the requestAnimationFrame() function instead
				of a setInterval or inside the scroll event in windows
			*/

			function render() {
			  $elems.each(function(){

			  	// assigning the object front and back
					var $front = $(this);
					var $back  = $(this).find('.ty-background');
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
						$back.css(
						{
							'-ms-transform':     'translate3d(0,'+($offsetTop-$scrollY)+'px,0)',
							'-webkit-transform': 'translate3d(0,'+($offsetTop-$scrollY)+'px,0)',
							'-moz-transform':    'translate3d(0,'+($offsetTop-$scrollY)+'px,0)',
							'-o-transform':    'translate3d(0,'+($offsetTop-$scrollY)+'px,0)',
							'transform':         'translate3d(0,'+($offsetTop-$scrollY)+'px,0)'
						});

						$backinner.css(
						{
							'-ms-transform':     'translate3d(0,'+($diffElem)+',0)',
							'-webkit-transform': 'translate3d(0,'+($diffElem)+',0)',
							'-moz-transform':    'translate3d(0,'+($diffElem)+',0)',
							'-o-transform':    'translate3d(0,'+($diffElem)+',0)',
							'transform':         'translate3d(0,'+($diffElem)+',0)'
						});

			    }
			    else{

			    	/*
							If the layer is not inside the windows, we set the background 
							layer outside the viewport to get a better performance, so we 
							only do parallax in one or two layers at the same time.
			    	*/

			      $back.css({
			        '-ms-transform': 'translate3d(0,-9000px,0)',
			        '-webkit-transform': 'translate3d(0,-9000px,0)',
			        '-moz-transform': 'translate3d(0,-9000px,0)',
			        '-o-transform': 'translate3d(0,-9000px,0)',
			        'transform': 'translate3d(0,-9000px,0)'
			      });
			    }
			  });
			}

			function updateHeight(){
				/*
					The front layer and back layer should have the same 
					height to work properly
				*/
				$elems.height($window.height());
				var $backLayer = $elems.find('.ty-background');
				$($backLayer).height($elems.height());
			}

			function simulateCover() {
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
					$img.css({
						'-ms-transform':     'translate('+diffX+'px,'+diffY+'px)',
						'-webkit-transform': 'translate('+diffX+'px,'+diffY+'px)',
						'-moz-transform':    'translate('+diffX+'px,'+diffY+'px)',
						'-o-transform':      'translate('+diffX+'px,'+diffY+'px)',
						'transform':         'translate('+diffX+'px,'+diffY+'px)'
					});

				});
			}

			$(window).bind('orientationchange, resize', function() {
				updateHeight();
			  simulateCover();
			});
			/* 
				If the browser support CSS transforms 3D and is not a tablet or mobile
				then let's do it!
			*/


			if(Modernizr.csstransforms3d && Modernizr.mq('only all and (min-width: 1025px)')){
				
				//Find the background layer
				var $backLayer = $elems.find('.ty-background');
				//Set position to fixed so we can do the animation full size
				$($backLayer).addClass('fixed');
				//Function that iterates trough the parallax items
				animloop();
			}

			updateHeight();
			simulateCover();

    };

})(jQuery);

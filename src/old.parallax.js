var $j = jQuery.noConflict(true);


function updateCentered(){
    $('.centered').each(function() {
      var $el = $(this);
      var w = $el.outerWidth();
      var h = $el.outerHeight();
      $el.css({
        'margin-top': - (h/2)+'px',
        'margin-left': - (w/2)+'px'
      });
    });
}

function verticalCentered(){
    $('.vertical-centered').each(function() {
      var $el = $(this);
      var h = $el.outerHeight();
      $el.css({
        'top': '50%',
        'margin-top': - (h/2)+'px',
      });
    });
}


function init(){
  if(Modernizr.csstransforms3d){
    $('.parallax').not(':first').css({
      'transform': 'translate3d(0, -9000px,0)'
    });
  }

  if(!small){
    $('.parallax').not('.first').height($(window).height());
    $('.hidden-image').not('.first').height($(window).height());
    verticalCentered();
  }
  updateCentered();
}

function render() {
  var $window = $(window);
  $('.parallax-item').each(function(){
    var $elem = $(this); // assigning the object
    var $offsetTop = $elem.offset().top;
    //taking the asigned background image
    var $elem2 = $($elem.data('parallax'));
    var $scrollY = window.scrollY;
    if(($window.scrollTop()+$window.height() >= $offsetTop) && $window.scrollTop() <= $offsetTop + $elem.height()){
      var $diffElem = (($scrollY-$offsetTop)/1.3).toFixed(0)+ 'px';

      if($elem2.hasClass('first')){
        $elem2.css({
          '-ms-transform': 'translate3d(0,'+(-$scrollY)+'px,0)',
          '-webkit-transform': 'translate3d(0,'+(-$scrollY)+'px,0)',
          '-moz-transform': 'translate3d(0,'+(-$scrollY)+'px,0)',
          'transform': 'translate3d(0,'+(-$scrollY)+'px,0)'
        });
      }
      else{
        $elem2.css({
          '-ms-transform': 'translate3d(0,'+($offsetTop-$scrollY)+'px,0)',
          '-webkit-transform': 'translate3d(0,'+($offsetTop-$scrollY)+'px,0)',
          '-moz-transform': 'translate3d(0,'+($offsetTop-$scrollY)+'px,0)',
          'transform': 'translate3d(0,'+($offsetTop-$scrollY)+'px,0)'
        });
      }

      if(!Modernizr.safari){
        $elem.find('.centered').css({
          '-ms-transform': 'translate3d(0,'+($scrollY-$offsetTop)+'px,0)',
          '-webkit-transform': 'translate3d(0,'+($scrollY-$offsetTop)+'px,0)',
          '-moz-transform': 'translate3d(0,'+($scrollY-$offsetTop)+'px,0)',
          'transform': 'translate3d(0,'+($scrollY-$offsetTop)+'px,0)'
        });
      }
      $elem2.find('.parallax-inner').css({
        '-ms-transform': 'translate3d(0,'+($diffElem)+',0)',
        '-webkit-transform': 'translate3d(0,'+($diffElem)+',0)',
        '-moz-transform': 'translate3d(0,'+($diffElem)+',0)',
        'transform': 'translate3d(0,'+($diffElem)+',0)'
      });

    }
    else{
      $elem2.css({
        '-ms-transform': 'translate3d(0,-9000px,0)',
        '-webkit-transform': 'translate3d(0,-9000px,0)',
        '-moz-transform': 'translate3d(0,-9000px,0)',
        'transform': 'translate3d(0,-9000px,0)'
      });
    }
  }); 
} 


function animloop(){
  window.requestAnimationFrame(animloop);
  render();
}

function updateBackgrounds(){
  $('.hidden-image').css('position','relative');

  $('.parallax-inner').each(function() {
    var $clone = $(this).clone(true,true).addClass('bg');
    var $id = $(this).parent().attr('id');
    $clone.appendTo('[data-parallax=#'+$id+'] .hidden-image');
  });
  $('.centered').css('position', 'absolute');
  $('.parallax').remove();
}


$(document).ready(function() {
  //Variable for small devices
  Modernizr.addTest('safari', function () {
    return /^((?!chrome).)*safari/i.test(navigator.userAgent);
  });

  if(Modernizr.ipad){

  }
  small = Modernizr.mq('only all and (max-width: 1200px)');

  if(Modernizr.csstransforms3d && !small){
    animloop();
  }
  else{
    updateBackgrounds();
    updateCentered();
  }
  

  // PopOver
  $('#popover').click(function(e) {
      $('.popover').toggle();
      return false;
  });

  if(Modernizr.csstransforms3d && !small){
    animloop();
  }
  else{
    updateBackgrounds();
    updateCentered();
  }

 // Getting Tracking info from Markitude
  var ASFTracker = ASF_SG.getTracker('http://content.nylstar.com/External/Tracker','432e7ab3-ed96-4a13-83ef-a59a1fabf10b');
      ASFTracker.enableLinkTracking();
      ASFTracker.setSiteId('432e7ab3-ed96-4a13-83ef-a59a1fabf10b'); 
      ASFTracker.setDomains('*.nylstar.com');
      ASFTracker.setCookieDomain('*.nylstar.com');                               
    $('#home-page-tabs li:first, #index .tab-content ul:first').addClass('active');

    // Setting URL and ID visitor
    var IDVisitor=ASFTracker.getVisitorId();  
    var Url ='http://content.nylstar.com/External/LeadsCreateFromHtmlForm/?ID=ee87c529-e280-4155-a479-8b4d9d69fddd' + encodeURI("\u0026") + 'IdVisitor='+IDVisitor+ encodeURI("\u0026") + 'Subscription=432e7ab3-ed96-4a13-83ef-a59a1fabf10b';

    // Sending Markitude Subscribe via Ajax
    $('#mktd-form-submit-button').click(function(e){         
      e.preventDefault();
      
      //Disable button
      $('#mktd-form-submit-button').attr('disabled', 'disabled');                                        
      var datos = $('#mktd-id-form-automatic').serialize(); 
      $.ajax({ 
        async: false, 
        url: Url, 
        type: 'POST', 
        dataType: 'jsonp', 
        data: datos, 
        success: function(data){
          $('#mktd-form-submit-button').removeAttr('disabled');
          $('#mktd-form-container').html(data.Html);               
        }, 
        error: function(data){                                
          $('#mktd-form-submit-button').removeAttr('disabled'); 
        }
      });                         
  });

  // Sending Markitude Subscribe via Ajax in Mobil view
    $('#mktd-form-submit-button2').click(function(e){         
      e.preventDefault();
      
      //Disable button
      $('#mktd-form-submit-button2').attr('disabled', 'disabled');                                        
      var datos = $('#mktd-id-form-automatic2').serialize(); 
      $.ajax({ 
        async: false, 
        url: Url, 
        type: 'POST', 
        dataType: 'jsonp', 
        data: datos, 
        success: function(data){
          $('#mktd-form-submit-button2').removeAttr('disabled');
          $('#meryl-subscribe2').html('<p class="result">'+ data.Html + '</p>');               
        }, 
        error: function(data){                                
          $('#mktd-form-submit-button2').removeAttr('disabled'); 
        }
      });                         
  }); 
  
  
  $('#scroll-down').click(function(e) {
    e.preventDefault();
    $('html,body').animate({ 
      scrollTop: $('#linked').offset().top
    }, 700);
  });

  $('#scroll-up').click(function(e) {
    e.preventDefault();
    $('html,body').animate({ 
      scrollTop: $('#page').offset().top
    }, 700);
  });

  function refreshMenu () {
    if (document.getElementById('main-text')) {
      if($(window).scrollTop()>= ($('#main-text').position().top)){
        $('#floated-menu2').css({
          'position':'fixed',
          'top':'120px'
        });
      }
      else{
        $('#floated-menu2').css({
          'position':'absolute',
          'top':($('#main-text').position().top + 40)+'px'
        });
      }
    }
  }

  setInterval(refreshMenu,10);

  //Setting heigh of parallaxs
  var $wheight = $(window).height();
  var $wwidth = $(window).width();

  if(!small){
    $('.bg').each(function(index, el) {
      $el = $(this);
      $el.height($wheight);
      if(($el).outerWidth()>$wwidth){
        var $half = $(el).outerWidth() - $wwidth;
        $el.css('left', -($half/2)+'px');
      }
    });
  }

  //Setting the automaticsslider
  
  $('.automatic-carousel').each(function(){

    var $elem = $(this); // assigning the object 
    var $id = $elem.data('carousel');
    $($id +' .slideshow > div:gt(0)').hide();

    setInterval(function() { 
    $($id + ' .slideshow > div:first')
      .fadeOut(1000)
      .next()
      .fadeIn(1000)
      .end()
      .appendTo($id + ' .slideshow');
      },  3000);

  });

  $('.category-carousel').each(function(){

    var $elem = $($(this).parent()[0]); // assigning the object 
    var $id = $elem.data('category');

    if(!small){
      $($id +' .owl-item').height($(window).height());
    }

    $j($id +' .category-carousel').owlCarousel({
      items:1,
      loop:true,
      margin:0,
      nav:true
    });

  });

  setInterval(updateCentered,1000);

  init();
  updateCentered();

  $('.first-first, .hidden-image.first').height($(window).height()-80);

});

$(window).load(function() {
  var $wheight = $(window).height();
  var $wwidth = $(window).width();

  if(!small){
    $('.bg').each(function(index, el) {
      $el = $(this);
      $el.height($wheight);
      if(($el).outerWidth()>$wwidth){
        var $half = $(el).outerWidth() - $wwidth;
        $el.css('left', -($half/2)+'px');
      }
    });
  }

});

window.addEventListener("orientationchange", function() {
  // Announce the new orientation number
  var $wheight = $(window).height();
  var $wwidth = $(window).width();

  if(!small){
    $('.bg').each(function(index, el) {
      $el = $(this);
      $el.height($wheight);
      if(($el).outerWidth()>$wwidth){
        var $half = $(el).outerWidth() - $wwidth;
        $el.css('left', -($half/2)+'px');
      }
    });
  }
}, false);

$(window).resize(function() {
  $('.first-first, .hidden-image.first').height($(window).height()-80);
  //Setting heigh of parallaxs
  var $wheight = $(window).height();
  var $wwidth = $(window).width();

  if(!small){
    $('.bg').each(function(index, el) {
      $el = $(this);
      $el.height($wheight);
      if(($el).outerWidth()>$wwidth){
        var $half = $(el).outerWidth() - $wwidth;
        $el.css('left', -($half/2)+'px');
      }
    });
  }
  init();
});
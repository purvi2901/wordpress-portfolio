jQuery(document).ready(function() {
  jQuery(document).on("click", ".accordion-item .title-tab.faq-question", function() {
    if (jQuery(this).hasClass("active")) {
      jQuery(this).removeClass("active");
      jQuery(this)
        .siblings(".accordion-item .inner-content")
        .slideUp(200);
      jQuery(".accordion-item .title-tab.faq-question .icon")
        .removeClass("minus")
        .addClass("plus");
    } else {
      jQuery(".accordion-item .title-tab.faq-question .icon")
        .removeClass("minus")
        .addClass("plus");
      jQuery(this)
        .find(".icon")
        .removeClass("plus")
        .addClass("minus");
      jQuery(".accordion-item .title-tab.faq-question").removeClass("active");
      jQuery(this).addClass("active");
      jQuery(".accordion-item .inner-content").slideUp(200);
      jQuery(this)
        .siblings(".accordion-item .inner-content")
        .slideDown(200);
    }
  });

   setTimeout(function () {
    jQuery('.all-spare-parts-slideshow').each(function() {
      var slideshow = jQuery(this);
      var sliderEnabled = slideshow.attr('data-showslider') === 'true';
      var slideDuration = parseInt(slideshow.attr('data-sliderduration'), 10) || 3000;

      slideshow.toggleClass('is-slider-disabled', !sliderEnabled);
      slideshow.toggleClass('is-slider-enabled', sliderEnabled);

      if (!sliderEnabled || slideshow.hasClass('slick-initialized')) {
        return;
      }

      slideshow.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: slideDuration,
        prevArrow: '<button type="button" class="slick-prev"> &lt; </button>',
        nextArrow: '<button type="button" class="slick-next"> &gt; </button>',
        responsive: [{
           breakpoint: 600,
           settings: {
              slidesToShow: 1,
              slidesToScroll: 1
           }
        }, {
           breakpoint: 480,
           settings: {
              slidesToShow: 1,
              slidesToScroll: 1
           }
        }]
      });
    });

   }, 750);

  setTimeout(function () {
    jQuery('.qhb-slideshow .product_slider-main').slick({
         slidesToShow: 1,
         slidesToScroll: 1,
         arrows: true,
         dots: true,
         asNavFor: '.qhb-slideshow .product-slider-sub'
    });
    jQuery('.qhb-slideshow .product-slider-sub').slick({
       slidesToShow: 6,
       slidesToScroll: 1,
       asNavFor: '.qhb-slideshow .product_slider-main',
       dots: false,
       infinite: false,
       arrows: false,
       focusOnSelect: true,
       responsive: [{
             breakpoint: 1024,
             settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true
             }
          }, {
             breakpoint: 600,
             settings: {
                slidesToShow: 2,
                slidesToScroll: 1
             }
          }, {
             breakpoint: 480,
             settings: {
                slidesToShow: 3,
                slidesToScroll: 1
             }
          }

          ]
    });
  }, 2500);  

  jQuery(document).on('mousedown','.slider-settings .toggleIcon', function() {
    // Your event handler logic here
    jQuery('.slider-settings').each( function(){
      jQuery(this).parent().parent().removeClass('activeslide');
    });
    jQuery(this).parent().parent().toggleClass('activeslide');
});

});

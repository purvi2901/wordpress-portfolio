jQuery(document).ready(function() {
  // jQuery(".accordion-item .title-tab.faq-question").on("click", function() {
  //   if (jQuery(this).hasClass("active")) {
  //     jQuery(this).removeClass("active");
  //     jQuery(this)
  //       .siblings(".accordion-item .inner-content")
  //       .slideUp(200);
  //     jQuery(".accordion-item .title-tab.faq-question .icon")
  //       .removeClass("minus")
  //       .addClass("plus");
  //   } else {
  //     jQuery(".accordion-item .title-tab.faq-question .icon")
  //       .removeClass("minus")
  //       .addClass("plus");
  //     jQuery(this)
  //       .find(".icon")
  //       .removeClass("plus")
  //       .addClass("minus");
  //     jQuery(".accordion-item .title-tab.faq-question").removeClass("active");
  //     jQuery(this).addClass("active");
  //     jQuery(".accordion-item .inner-content").slideUp(200);
  //     jQuery(this)
  //       .siblings(".accordion-item .inner-content")
  //       .slideDown(200);
  //   }
  // });

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
        dots: true,
        autoplay: true,
        autoplaySpeed: slideDuration,
        prevArrow: '<button type="button" class="slick-prev"> &lt; </button>',
        nextArrow: '<button type="button" class="slick-next"> &gt; </button>',
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              dots: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true
            }
          }
        ]
      });
    });

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
  jQuery('.product_slider-for').slick({
     slidesToShow: 1,
     slidesToScroll: 1,
     arrows: true,
     dots: true,
     asNavFor: '.product-slider-nav'
  });
  jQuery('.product-slider-nav').slick({
     slidesToShow: 6,
     slidesToScroll: 1,
     asNavFor: '.product_slider-for',
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

   // var len = jQuery('.product-card-slider').length;
   // alert(len);
   // if( 3 <= len ){
   //    var slidesToShow = 3;   
   // }else{
   //    var slidesToShow = len;
   // }
 
// Iterate over each .product-card-slider
jQuery('.product-card-slider').each(function() {
    // Count the number of .product_slider_main-wrap sections inside the current .product-card-slider
    var productSliderMainWrapCount = jQuery(this).find('.product_slider_main-wrap').length;

    // Determine slidesToShow based on the number of product_slider_main-wrap sections
    var slidesToShow;
    if (productSliderMainWrapCount >= 3) {
        slidesToShow = 3; // Show a minimum of 3 slides if there are 3 or more sections
    } else if (productSliderMainWrapCount == 1) {
        slidesToShow = 1; // Show 1 slide if there is only 1 section
    } else {
        slidesToShow = productSliderMainWrapCount; // Show as many slides as there are product_slider_main-wrap sections
    }
    jQuery(this).slick({
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: false,
        infinite:false,
        autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev"> &lt; </button>',
        nextArrow: '<button type="button" class="slick-next"> &gt; </button>',
        responsive: [
        {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2, // Show 2 slides at screen widths above 1199px
                    slidesToScroll: 1,
                    dots: false 
                }
        },
        {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1, // Show 1 slide at screen widths between 767px and 1199px
                    slidesToScroll: 1,
                    dots: true 
                }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true
          }
        }, {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true
          }
        }

        ]
    });
});  
  
  jQuery('.popup-trigger').click(function(){
      jQuery(this).closest('.popup-shortcode').find('#rb-pop-up-btn').trigger('click');
   });
});

/*
 * Function: setEqualHeightColumns
 * lab-equipment page ‘Waterbath’  auto height setup
 */

function setEqualHeight() {
    var maxHeight = 0;
    var elements = jQuery('.product_slider_main-wrap');

    elements.css('height', 'auto'); // Reset height before calculating
    elements.each(function () {
        var thisHeight = jQuery(this).outerHeight();
        if (thisHeight > maxHeight) {
            maxHeight = thisHeight; // Find the max height
        }
    });
    elements.css('height', maxHeight + 'px'); // Set all elements to max height
}

// Ensure the function runs when document is ready
jQuery(document).ready(function () {
    setEqualHeight();

    // Re-run setEqualHeight when the slider is initialized
    jQuery('.product-card-slider').on('init', function () {
        setEqualHeight();
    });

    // Re-run setEqualHeight when the slider has changed (afterChange event)
    jQuery('.product-card-slider').on('afterChange', function () {
        setEqualHeight();
    });

    // Re-run setEqualHeight when the window is resized
    jQuery(window).on('resize', function () {
        setEqualHeight();
    });
});


// function setEqualHeightColumns() {
//     var maxHeight = 0;
//     var elements = jQuery('.wp-block-craft-blocks-product-card.qhb-product-card');
//     elements.height('auto');
//     elements.each(function () {
//         var thisHeight = jQuery(this).outerHeight();
//         if (thisHeight > maxHeight) {
//             maxHeight = thisHeight;
//         }
//     });
//     elements.height(maxHeight);
// }
// jQuery(document).ready(function () {
//     setEqualHeightColumns();
//     jQuery(window).on('resize', function () {
//         setEqualHeightColumns();
//     });
// });

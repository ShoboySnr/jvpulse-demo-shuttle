
//  Preloader
jQuery(window).on("load", function () {
    $('#preloader').fadeOut(500);
    $('#main-wrapper').addClass('show');
});


(function ($) {
	
	var headerHeight =   parseInt($('.onepage').css('height'), 10);
	$(".scroll").unbind().on('click',function(event) 
	{
		event.preventDefault();
		
		if (this.hash !== "") {
			var hash = this.hash;	
			var seactionPosition = $(hash).offset().top;
			var headerHeight =   parseInt($('.onepage').css('height'), 10);
			
			
			$('body').scrollspy({target: ".scroll-nav", offset: headerHeight+2}); 
			
			var scrollTopPosition = seactionPosition - (headerHeight);
			
			$('html, body').animate({
				scrollTop: scrollTopPosition
			}, 800, function(){
				
			});
		}   
	});
	$('body').scrollspy({target: ".scroll-nav", offset: headerHeight + 2});  

	$('.header').css('height','');
	var headerHeight = $('.header').height();
	$('.header').css('height', headerHeight);


    //  Header fixed
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.header').addClass("animated slideInDown fixed"), 3000;
        } else {
            $('.header').removeClass("animated slideInDown fixed"), 3000;
        }
    });

    $('select').niceSelect();

    $(function () {
        for (var nk = window.location,
            o = $(".menu a, .sub-menu a").filter(function () {
                return this.href == nk;
            })
                .addClass("active")
                .parent()
                .addClass("active"); ;) {
            // console.log(o)
            if (!o.is("li")) break;
            o = o.parent()
                .addClass("show")
                .parent()
                .addClass("active");
        }

    });

    // $(function () {
    //     // var win_w = window.outerWidth;
    //     var win_h = window.outerHeight;
    //     var win_h = window.outerHeight;
    //     if (win_h > 0 ? win_h : screen.height) {
    //         $(".content-body").css("min-height", (win_h + 60) + "px");
    //     };
    // });

    $('.sidebar-right-trigger').on('click', function () {
        $('.sidebar-right').toggleClass('show');
    });

    $('[data-toggle="tooltip"]').tooltip();

    $('.data-close').on('click', function () {
        e.preventDefault();
        $(this).parent().parent().remove();
    });

    $("#tbUser").on('click', '.btnDelete', function () {
        $(this).closest('tr').remove();
    });


    $(function () {
		if(jQuery('#slider').length > 0)
		{
			var slider = document.getElementById("slider");
			slider.oninput = function () {
				$('.count').text(this.value).css({
					'left': this.value + '%',
					'transform': 'translateX(-' + this.value + '%)'
				});
				$('.fill').css('width', this.value + '%');
			}
		}
    });

	/* Magnific Popup ============ */
		/* magnificPopup function */
		if(jQuery('.mfp-gallery').length)
		{
			jQuery('.mfp-gallery').magnificPopup({
				delegate: '.mfp-link',
				type: 'image',
				tLoading: 'Loading image #%curr%...',
				mainClass: 'mfp-img-mobile',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
					titleSrc: function(item) {
						return item.el.attr('title') + '<small></small>';
					}
				}
			});	
		}	
		/* magnificPopup function end */
		
		/* magnificPopup for paly video function */		
		if(jQuery('.mfp-video').length)
		{
			jQuery('.mfp-video').magnificPopup({
				type: 'iframe',
				iframe: {
					markup: '<div class="mfp-iframe-scaler">'+
							 '<div class="mfp-close"></div>'+
							 '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
							 '<div class="mfp-title">Some caption</div>'+
							 '</div>'
				},
				callbacks: {
					markupParse: function(template, values, item) {
						values.title = item.el.attr('title');
					}
				}
			});	
		}
		
		/* magnificPopup for paly video function end*/
		if($('.popup-youtube, .popup-vimeo, .popup-gmaps').length)
		{
			$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
				disableOn: 700,
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,

				fixedContentPos: false
			});	
		}
	
	jQuery(document).ready(function(){
		jQuery('.covid-countries-info').owlCarousel({
			loop:true,
			center:false,
			margin:30,
			nav:true,
			autoplaySpeed: 3000,
			navSpeed: 3000,
			paginationSpeed: 3000,
			slideSpeed: 3000,
			smartSpeed: 3000,
			autoplay: 3000,
			dots: true,
			navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
			responsive:{
				0:{
					items:1
				},
				480:{
					items:2
				},			
				1024:{
					items:3
				},
				1200:{
					items:4
				},
				1400:{
					items:4
				}
			}
		});
	});

	jQuery(window).on('load',function(){
		if(jQuery('#US_Positive').length > 0){ getUSWholeData(); }
		if(jQuery('#CountryDataOwl').length > 0){ getCountryData(); }
	});
	
	function getUSWholeData()
	{
		var action_url = 'script/covid.php'; 
		jQuery.ajax({
            method: 'POST',
            url: action_url,
            dataType: 'json',
            data: {data:'US_Complete'},
			beforeSend : function ( xhr ) {
			},
            success:function(response){
				if(response.status = 1)
				{
					jQuery('#US_Positive').text(response.positive);
					jQuery('#US_Death').text(response.death);
					jQuery('#US_Recovered').text(response.recovered);
				}else{
					alert(response.msg);
				}
				
            },
			error : function(response){
				alert('Something is wrong, Please wait.');
			},
			fail : function(response){				
				alert('Something is wrong, Please wait.');
			},
		});
	}
	
	

	function getCountryData()
	{
		var action_url = 'script/covid.php'; 
		jQuery.ajax({
            method: 'POST',
            url: action_url,
            dataType: 'json',
            data: {data:'Countries_Data'},
			beforeSend : function ( xhr ) {
			},
            success:function(response){
				if(response.status = 1)
				{
				jQuery.each(response.data, function(country_code, country_data) {
					if(jQuery("#CountryDataOwl [data-country-code='"+country_code+"']").length > 0)
					{
					jQuery("#CountryDataOwl [data-country-code='"+country_code+"'] .dz-confirmed").text(country_data.confirmed);
					jQuery("#CountryDataOwl [data-country-code='"+country_code+"'] .dz-death").text(country_data.death);
					jQuery("#CountryDataOwl [data-country-code='"+country_code+"'] .dz-recovered").text(country_data.recovered);
					}
				});
				}else{
					alert(response.msg);
				}
					
            },
			error : function(response){
				alert('Something is wrong, Please wait.');
			},
			fail : function(response){				
				alert('Something is wrong, Please wait.');
			},
		});
	}	

})(jQuery);;







const ml = new PerfectScrollbar('.market-limit');
const mn = new PerfectScrollbar('.market-nested');
const ln = new PerfectScrollbar('.limit-nested');
const sln = new PerfectScrollbar('.stop-limit-nested');
const pp = new PerfectScrollbar('.price-pair');
const ts = new PerfectScrollbar('.trade-history');
const ob = new PerfectScrollbar('.order-book');
const yp = new PerfectScrollbar('.your-position');
const bw = new PerfectScrollbar('.balance-widget');
const mkn = new PerfectScrollbar('.market-news');
const opt = new PerfectScrollbar('.open-position-table');

//ripple effect on button
Waves.init();
Waves.attach('.wave-effect');
Waves.attach('.btn');
Waves.attach('button');
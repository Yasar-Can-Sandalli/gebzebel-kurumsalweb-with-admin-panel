

jQuery(document).ready(function($){
	var $lateral_menu_trigger = $('.nav-trigger'),
		$content_wrapper = $('.main');

	//open-close lateral menu clicking on the menu icon
	$lateral_menu_trigger.on('click', function(event){
		event.preventDefault();

		$lateral_menu_trigger.toggleClass('is-active');
		$content_wrapper.toggleClass('is-active').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
			$('body').toggleClass('overflow-hidden');
		});
		$('#nav-menu').toggleClass('is-active');

		//check if transitions are not supported - i.e. in IE9
		if($('html').hasClass('no-csstransitions')) {
			$('body').toggleClass('overflow-hidden');
		}
	});
	document.getElementById("vergiIslemleri").addEventListener("mouseover", function() {
		document.getElementById("vergiAltMenu").style.display = "block";
	});
	
	document.getElementById("vergiIslemleri").addEventListener("mouseout", function() {
		document.getElementById("vergiAltMenu").style.display = "none";
	});
document.addEventListener("DOMContentLoaded", function () {
    let vergiIslemleri = document.getElementById("vergiIslemleri");
    let vergiAltMenu = document.getElementById("vergiAltMenu");

    vergiIslemleri.addEventListener("mouseenter", function () {
        vergiAltMenu.style.display = "block";
    });

    vergiAltMenu.addEventListener("mouseleave", function () {
        vergiAltMenu.style.display = "none";
    });
});

	//close lateral menu clicking outside the menu itself
	$content_wrapper.on('mouseover', function(event){
		if( !$(event.target).is('.nav-trigger, .nav-trigger span') ) {
			$lateral_menu_trigger.removeClass('is-active');
			$content_wrapper.removeClass('is-active').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
			$('#nav-menu').removeClass('is-active');
			//check if transitions are not supported
			if($('html').hasClass('no-csstransitions')) {
				$('body').removeClass('overflow-hidden');
			}

		}
	});
});

// console.log("v 1.0.");

// // ---------Responsive-navbar-active-animation-----------
// function test(){
// 	var tabsNewAnim = $('#navbarSupportedContent');
// 	var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
// 	var activeItemNewAnim = tabsNewAnim.find('.active');
// 	var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
// 	var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
// 	var itemPosNewAnimTop = activeItemNewAnim.position();
// 	var itemPosNewAnimLeft = activeItemNewAnim.position();
// 	$(".hori-selector").css({
// 		"top":itemPosNewAnimTop.top + "px", 
// 		"left":itemPosNewAnimLeft.left + "px",
// 		"height": activeWidthNewAnimHeight + "px",
// 		"width": activeWidthNewAnimWidth + "px"
// 	});
// 	$("#navbarSupportedContent").on("click","li",function(e){
// 		$('#navbarSupportedContent ul li').removeClass("active");
// 		$(this).addClass('active');
// 		var activeWidthNewAnimHeight = $(this).innerHeight();
// 		var activeWidthNewAnimWidth = $(this).innerWidth();
// 		var itemPosNewAnimTop = $(this).position();
// 		var itemPosNewAnimLeft = $(this).position();
// 		$(".hori-selector").css({
// 			"top":itemPosNewAnimTop.top + "px", 
// 			"left":itemPosNewAnimLeft.left + "px",
// 			"height": activeWidthNewAnimHeight + "px",
// 			"width": activeWidthNewAnimWidth + "px"
// 		});
// 	});
// }

// $(document).ready(function(){
// 	setTimeout(function(){ test(); });
// });

// $(window).on('resize', function(){
// 	setTimeout(function(){ test(); }, 500);
// });

// $(".navbar-toggler").click(function(){
// 	$(".navbar-collapse").slideToggle(300);
// 	setTimeout(function(){ test(); });
// });



// // --------------add active class-on another-page move----------

// jQuery(document).ready(function($){
// 	// Get current path and find target link
// 	var path = window.location.pathname.split("/").pop();

// 	// Account for home page with empty path
// 	if ( path == '' ) {
// 		path = 'index.html';
// 	}

// 	var target = $('#navbarSupportedContent ul li a[href="'+path+'"]');
// 	// Add active class to target link
// 	target.parent().addClass('active');
// });


class StickyNavigation {
	
	constructor() {
		this.currentId = null;
		this.currentTab = null;
		this.tabContainerHeight = 70;
		let self = this;
		$('.et-hero-tab').click(function() { 
			self.onTabClick(event, $(this)); 
		});
		$(window).scroll(() => { this.onScroll(); });
		$(window).resize(() => { this.onResize(); });
	}
	
	onTabClick(event, element) {
		event.preventDefault();
		let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
		$('html, body').animate({ scrollTop: scrollTop }, 600);
	}
	
	onScroll() {
		this.checkTabContainerPosition();
    this.findCurrentTabSelector();
	}
	
	onResize() {
		if(this.currentId) {
			this.setSliderCss();
		}
	}
	
	checkTabContainerPosition() {
		let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
		if($(window).scrollTop() > offset) {
			$('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
		} 
		else {
			$('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
		}
	}
	
	findCurrentTabSelector(element) {
		let newCurrentId;
		let newCurrentTab;
		let self = this;
		$('.et-hero-tab').each(function() {
			let id = $(this).attr('href');
			let offsetTop = $(id).offset().top - self.tabContainerHeight;
			let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
			if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
				newCurrentId = id;
				newCurrentTab = $(this);
			}
		});
		if(this.currentId != newCurrentId || this.currentId === null) {
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.setSliderCss();
		}
	}
	
	setSliderCss() {
		let width = 0;
		let left = 0;
		if(this.currentTab) {
			width = this.currentTab.css('width');
			left = this.currentTab.offset().left;
		}
		$('.et-hero-tab-slider').css('width', width);
		$('.et-hero-tab-slider').css('left', left);
	}
	
}

new StickyNavigation();
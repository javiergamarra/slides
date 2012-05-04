var slideshow;

var SlideShow = function(slides) {
	this.slides = slides;

	this.loadCurrentSlide();
	this.colorHeaderWithComments();

	var t = this;
	$(document).keydown(function(event) {
		t.handleKeys(event);
	});

	$('.slide').each(function(i, div) {
		$(div).click(function(event) {
			if (event.target.className != 'link') {
				t.index = i;
				t.update();
			}
		});
	});
};

SlideShow.prototype = {
	slides : [],
	update : function() {
		this.index = Math.max(Math.min(this.index, this.slides.length - 1), 0);
		window.location.hash = "slide" + this.index;
		this.slides.slice(0, this.index - 1).map(function(element) {
			addClass(element, 'veryleft-slide');
		});
		this.slides.slice(this.index + 2).map(function(element) {
			addClass(element, 'veryright-slide');
		});
		addClass(this.slides[this.index - 1], 'left-slide');
		addClass(this.slides[this.index + 1], 'right-slide');
		addClass(this.slides[this.index], 'current');

	},
	next : function() {
		this.index++;
		this.update();
	},
	prev : function() {
		this.index--;
		this.update();
	},
	loadCurrentSlide : function() {
		if (window.location.hash != "") {
			this.index = Number(window.location.hash.replace('#slide', ''));
		} else {
			this.index = 0;
		}
		this.update();
	},
	colorHeaderWithComments : function() {
		$('.slide').each(
				function(i) {
					if ($(this).find(".comments").length) {
						$(this).find("header").append(
								' <span style="color: red">*</span>');
					}
				});
	},
	showComments : function() {
		$('.current .comments').each(function(i) {
			$(this).toggle();
		});
	},
	handleKeys : function(e) {
		switch (e.keyCode) {
		case 37: // left arrow
			this.prev();
			break;
		case 39: // right arrow
			this.next();
			break;
		case 67: // c key
			this.showComments();
			break;
		}
	}
};

$(document).ready(function() {
	slideshow = new SlideShow($('.slide').toArray());
});

var addClass = function(node, style) {
	$(node).removeClass();
	$(node).addClass('slide');
	$(node).addClass(style);
};

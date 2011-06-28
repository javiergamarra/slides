var doc = document;
var slideshow;

var SlideShow = function(slides) {
	this.slides = slides;
	if (window.location.hash != "") {
		this.index = Number(window.location.hash.replace('#slide', ''));
	} else {
		this.index = 0;
	}
	this.update();

	var t = this;
	$(document).keydown(function(event) {
		t.handleKeys(event);
	});

	$(".slide").click(function(event) {
		t.index = Number(event.target.id.replace('slide_', ''));
		t.update();
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
	handleKeys : function(e) {
		switch (e.keyCode) {
		case 37: // left arrow
			this.prev();
			break;
		case 39: // right arrow
			this.next();
			break;
		}
	}
};

$(document).ready(function() {
	slideshow = new SlideShow(queryAll('.slide'));
});

var toArray = function(list) {
	var results = [];
	for ( var i = 0; i < list.length; i++) {
		results.push(list[i]);
	}
	return results;
};

var queryAll = function(query) {
	return toArray($(query));
};

var addClass = function(node, style) {
	$(node).removeClass();
	$(node).addClass('slide');
	$(node).addClass(style);
};

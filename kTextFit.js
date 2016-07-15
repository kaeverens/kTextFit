/*global jQuery */
/*!
* kTextFit
*
* Copyright 2016, Kae Verens, http://verens.com/
*
* Public Domain
*
*/

(function( $ ){
	$.fn.kTextFit = function() {
		return this.each(function(){
			var $this = $(this).addClass('k-text-fit'), retries=0;
			function resize() {
				var w=$this.width();
				if (!w) {
					retries++;
					if (retries>100) {
						return;
					}
					return setTimeout(resize, 100);
				}
				var $shadow=$('<div style="position:absolute;visibility:hidden;font-size:10"/>').text($this.text()).appendTo($this);
				var w2=$shadow.width();
				$shadow.remove();
				$this.css('font-size', 10/(w2/w));
			}
			resize();
		});
	};
})( jQuery );

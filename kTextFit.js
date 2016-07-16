/*global jQuery */
/*
* kTextFit
*
* Copyright 2016, Kae Verens, http://verens.com/
*
* Public Domain
*
*/

(($)=>{
	var elements=[];
	window.timerKTextFitCleanup=false;
	var resize=function(el, retries) {
		var $this=$(el);
		if (!retries) {
			retries=0;
		}
		var w=$this.width();
		if (!w) {
			retries++;
			if (retries>100) {
				return;
			}
			return setTimeout(()=>{
				resize(el, retries);
			}, 100);
		}
		var $shadow=$('<div style="position:absolute;visibility:hidden;font-size:10"/>').text($this.text()).appendTo($this);
		var w2=$shadow.width();
		$shadow.remove();
		$this
			.css({
				'font-size': 10/(w2/w),
				'overflow':'hidden',
				'text-overflow': 'ellipsis',
				'white-space':'nowrap'
			});
		clearTimeout(window.timerKTextFitCleanup);
		window.timerKTextFitCleanup=setTimeout(()=>{ // in 15 seconds, garbage collect elements that are no longer in the DOM
			cleanupDisconnectedElements();
			delete window.timerKTextFitCleanup;
		}, 15000);
	}
	$.fn.kTextFit=function() {
		return this.each(function() {
			elements.push(this);
			resize(this, 0);
		});
	};
	function cleanupDisconnectedElements() { // garbage collection for disconnected elements
		for (var i=elements.length-1;i>-1;--i) {
			if (!elements[i].isConnected) { // element not connected to DOM. remove it
				elements[i]=elements[elements.length-1];
				elements.pop();
			}
		}
	}
	$(window).on('resize', function() {
		for (var i=elements.length-1;i>-1;--i) {
			if (elements[i].isConnected) { // element is in DOM. reize it
				resize(elements[i]);
			}
		}
	});
})( jQuery );

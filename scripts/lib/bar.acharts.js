;if (typeof Object.create !== 'function') {
	Object.create = function ( obj ) {
		function F() {};
		F.prototype = obj;
		return new F();
	};
};
(function( $, window, document, undefined ){
	"use strict";
	
	var Bar = {
		init : function ( options, elem ) {
			var self = this;

			self.elem = elem;
			self.$elem = $( elem );

			self.options = $.extend( {}, $.fn.aChartBar.options, options );

			if (options.length > 0) {
				self.options.data = options;
			}

			self.create( self.options.data );
		}, 

		create : function ( dataBar ) {
			var self = this;

			var chartHTML = '';

			( self.options.showTitle ) ? chartHTML = '<h1 class="chart-heading">' + self.options.title + ' <b>[ ' + self.options.subTitle + ' ]</b></h1>' : chartHTML = '';
			( self.options.darkTheme ) ? chartHTML += '<div class="ibarchart theme-dark">' : chartHTML += '<div class="ibarchart">';

			if ( dataBar ) {
				var barGrandTotal = 0;
				var barGrandTotalArray = [];

				Array.prototype.max = function() {
					return Math.max.apply(null, this);
				};
				/*function getMaxOfArray(numArray) {
					return Math.max.apply(null, numArray);
				}*/

				for (var i = 0; i < self.options.data.length; i++) {
					if (self.options.percent) {
						barGrandTotal += parseInt(self.options.data[i].value);
					} else { 
						barGrandTotalArray.push(self.options.data[i].value);
						barGrandTotal = barGrandTotalArray.max();
						// OR barGrandTotal = Math.max.apply(Math, barGrandTotalArray);
					}
				};

				chartHTML += '<ul class="lst-ibarchart">';
				$.each(dataBar, function(index, dataObject) {
					var barCount = parseInt(dataObject.value);
					//var barRoundOff = Math.round10(55.549, -1);
					//console.log('barCount each = ' + barCount);

					var barPercentage = ( ( 100 * barCount ) / barGrandTotal );

					//console.log('barPercentage = ' + barPercentage);

					//var barPercentageRound = Math.round(barPercentage * 100) / 100;
					var barPercentageRound = self.round( barPercentage, 2 );
					//console.log('barPercentageRound = ' + barPercentageRound);

					chartHTML += '<li>';
					(self.options.slimBar) ? chartHTML += '<div class="bar-item slim-bar">' : chartHTML += '<div class="bar-item">';
					chartHTML += '<div class="bar-value no-value" style="height:' + barPercentageRound + '%;background:' + dataObject.barcolor + '">';
					if ( self.options.barValueTop ) chartHTML += ' <i>' + dataObject.value + '</i>';
					//if ( self.options.tooltip ) chartHTML += ' <h6>'+ dataObject.label + ' : ' + dataObject.value + '</h6>';
					chartHTML += '</div><!--.bar-value--></div><!--.bar-item-->';
					if ( self.options.barValueBottom ) chartHTML += '<h2>' + dataObject.value + '<b>'+ self.options.unit +'</b></h2>';
					chartHTML += '<p>' + dataObject.label + '</p>';
					chartHTML += '</li>';
				});
				chartHTML += '</ul><!--.lst-ibarchart-->';
			} else {
				chartHTML += '<h4 class="no-data-found">No Data Found</h4>';
			};
			chartHTML += '</div><!--.ibarchart-->';
			self.$elem.html( chartHTML );

			self.bells();
		}, 

		bells : function () {
			var self = this;

			setTimeout(function() {
				self.$elem.find( 'ul.lst-ibarchart' ).addClass( 'bar-animating' ).find( 'div.bar-value' ).removeClass( 'no-value' );
				self.static();

				if ( typeof self.options.onComplete === 'function' ) {
					self.options.onComplete.apply( self.elem, arguments );
				}

			}, 1000);

			/*self.$elem.find('li div.bar-value').on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
				if ( typeof self.options.onComplete === 'function' ) {
					self.options.onComplete.apply( self.elem, arguments );
					//alert('all set...');
				}
			});*/

			if (self.options.tooltip) {
				self.tooltip();
			}
		}, 

		round : function ( value, decimals ) {
			return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
		}, 

		static : function () {
			var self = this;
			self.$elem.find( 'ul.lst-ibarchart' ).removeClass( 'bar-animating' ).addClass( 'bar-chart' );
		}, 

		tooltip : function () {
			var self = this;
			self.$elem.find( 'ul.lst-ibarchart' ).find('li div.bar-value').on('mouseenter', function (e) {
				var tooltopValue = $(this).closest('div.bar-value').children('i').html();
				//console.log($(this).html());

				var tooltopLabel = $(this).closest('li').children('p').html();

				//console.log('bar-value = ' + tooltipWidth/2);
				//$(this).closest( 'ul.lst-ibarchart' ).find( 'h6' ).hide();

				$(this).append('<h6>'+ tooltopLabel +' : '+ tooltopValue +'</h6>');

				var tooltipWidth = parseInt($(this).find('h6').width());
				var tooltipPadding = parseInt($(this).find('h6').css('padding-left'));

				$(this).find('h6').css({
					'margin-left' : '-' + (tooltipPadding) - (tooltipWidth/2) + 'px'
				});

				/*$(this).find('h6').css({
					'margin-left' : '-' + (tooltipPadding) - (tooltipWidth/2) + 'px'
				}).fadeIn();*/
			});
			self.$elem.find( 'ul.lst-ibarchart' ).find('li div.bar-value').on('mouseleave', function (e) {
				$(this).find('h6').fadeOut().remove();
			});
		}
	};

	$.fn.aChartBar = function ( options ) {
		return this.each(function(){
			var bar = Object.create( Bar );
			bar.init( options, this );
			//$.data( this, 'aChartBar', bar );
		});
	};

	$.fn.aChartBar.options = {
		title : 'Title', 
		showTitle : false, 
		subTitle : 'by year',
		barValueBottom : false,
		barValueTop : true,
		data : null,
		slimBar : false, 
		darkTheme : false, 
		unit : '',
		tooltip : false,
		percent : false,
		onComplete : null
		// transition : 'ease-in'
	};

})( jQuery, window, document );
/*

.ibarchart.theme-dark {background: #333;}
.ibarchart.theme-dark .lst-ibarchart li .bar-item .bar-value i {color: rgba(255, 255, 255, 0.8);}
.ibarchart.theme-dark .lst-ibarchart li h2 {color: rgba(255, 255, 255, 0.8);}
.ibarchart.theme-dark .lst-ibarchart li p {color: rgba(255, 255, 255, 1);}

 
.ibarchart .lst-ibarchart li .bar-item .bar-value h6 {position: absolute;top: -70px;left: 50%;background: #333;color: white;display:none;white-space: nowrap;margin-left: -100%;padding:5px 10px;border-radius:4px;}
.ibarchart .lst-ibarchart li .bar-item .bar-value h6:before {content:'';position: absolute;border: 10px solid transparent;border-top-color:#333;left:50%;margin-left:-10px;top:22px;}
*/
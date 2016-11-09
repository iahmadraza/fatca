(function ($) {
	//Starting...

	//$('[data-toggle="popover"]').popover();

	$('body').on('click', function() {
		/* ====- REMOVE - DOWN ARROW and SUB-MENU 
		hideUserQuickMenu();*/
		hideAllGlobalNav();
		hideNotificationMenu();
		hideHelpMenu();
		hideAllSmallPopovers();
	});

	//Global menu reduce font if Menu-Items overflow
	function smallerGlobalMenu () {
		/*alert($('ul.lst-global-menu').innerHeight());
		alert($('ul.lst-global-menu').scrollHeight);*/
		if ($('ul.lst-global-menu').innerHeight() > 52) {
			$('ul.lst-global-menu').addClass('smaller-size-menu');
		} else {
			$('ul.lst-global-menu').removeClass('smaller-size-menu');
		};
	};

	//call for smaller menu
	smallerGlobalMenu();

	//FI upload options
	$('body').on('change', 'select#fiupload-options' ,function(e){
		var optionSelected = parseInt($(this).find(':selected').val());
		if (optionSelected == 1) {
			$('div#fiupload-subtab1').show();
			$('div#fiupload-subtab2').hide();	
		} else if (optionSelected == 2) {
			$('div#fiupload-subtab1').hide();
			$('div#fiupload-subtab2').show();
		};
	});

	//On window resize 
	$(window).resize(function() {
		if ($(window).width() >= 992) {
			$('div.global-menu').removeAttr('style');
		};
		if ($(window).width() >= 650) {
			$('div.report-filter').removeAttr('style');
		};
	});

	//show go to top icon button 
	function showGoToTop () {
		if ($(window).scrollTop() >= 200) {
			$('div.goto-pagetop').fadeIn();
		} else {
			$('div.goto-pagetop').fadeOut();
		};
	};
	//go to top of page button
	$('div.goto-pagetop>a').on('click', function() {
		$('html, body').animate({ scrollTop: 0 }, 'slow');
		return false;
	});

	//show reports button - FOR DEMO PURPOSE
	$('#btn-show-reports').on('click', function(){
		var reportPosition = $('div.report-content').offset().top - 52;
		$('html, body').animate({ scrollTop: reportPosition }, 'slow');
		return false;
	});

	function hideAllSmallPopovers() {
		$('.show-tooltip').removeClass('imagelink-selected');
		$('.popover-box').fadeOut();
	};

	//show tooltip 
	$('body').on('click', '.show-tooltip' ,function(e){
		e.stopPropagation();
		$('.show-tooltip').removeClass('imagelink-selected');
		$('.popover-box').fadeOut();
		$(this).addClass('imagelink-selected');
		$(this).siblings('.popover-box').fadeIn();
	});

	//Luxemborug modal tabs 
	$('body').on('click', 'div.uxd-tabswitch ul.lst-uxd-tabswitch>li>a#tabbtn-lux-tab1' ,function(e){
		//e.stopPropagation();
		$('div.uxd-tabswitch ul.lst-uxd-tabswitch>li>a#tabbtn-lux-tab2').removeClass('tab-selected');
		$(this).addClass('tab-selected');
		$('div#tabcontent-lux1').show();
		$('div#tabcontent-lux2').hide();
	});
	$('body').on('click', 'div.uxd-tabswitch ul.lst-uxd-tabswitch>li>a#tabbtn-lux-tab2' ,function(e){
		//e.stopPropagation();
		$('div.uxd-tabswitch ul.lst-uxd-tabswitch>li>a#tabbtn-lux-tab1').removeClass('tab-selected');
		$(this).addClass('tab-selected');
		$('div#tabcontent-lux1').hide();
		$('div#tabcontent-lux2').show();
	});

	//customize checkbox 
	$('div#modal-custom-individual-table div.multiselections-box ul.lst-multiselections-box li input').change(function(){
		//var isChecked = this.checked ? true : false;
		//$('p').css('color', c);
		var updateElem = $(this).closest('div#modal-custom-individual-table').find('em.footer-info b');
		//var currentCount = parseInt(updateElem.html());
		var getAllCheckedCount = $('div#modal-custom-individual-table div.multiselections-box ul.lst-multiselections-box li input:checked').size();
		//alert('getAllCheckedCount='+ getAllCheckedCount);
		updateElem.html(getAllCheckedCount);
	});

	//stick header on top of page while scroll
	function stickHeaderOnTop () {
		if ($(window).scrollTop() >= 64) { /*//header width=64, global nav=52*/
			$('div.global-nav').addClass('sticky-header');
			$('div.global-nav-spacer').show();
		} else {
			$('div.global-nav').removeClass('sticky-header');
			$('div.global-nav-spacer').hide();
		};
	};
	stickHeaderOnTop();
	$(window).scroll(function() {
		stickHeaderOnTop();
		showGoToTop();
	});

	/* ====- REMOVE - DOWN ARROW and SUB-MENU 
	function hideUserQuickMenu () {
		//hide quick menu
		$('div.user-quickmenu').slideUp();
		$('a.user-quickinfo').removeClass('quickmenu-showing');
	};
	*/

	function hideAllGlobalNav () {
		//hide global sub menu
		$('ul.lst-global-submenu').slideUp();
		$('ul.lst-global-menu>li>a').removeClass('menuitem-active');
		
		//hide global sub menu level 2
		$('ul.lst-global-submenu-l2').slideUp();
		$('ul.lst-global-submenu>li>a').removeClass('submenuitem-active');
	};

	function hideNotificationMenu () {
		//hide notifications menu
		$('div.notification-items').slideUp();
		$('a.notification-bell').removeClass('notificationmenu-showing');
	};

	function hideHelpMenu () {
		//hide notifications menu
		$('div.helplinks').slideUp();
		$('a.btn-helplinks').removeClass('helplinks-showing');
	};

	//User info - quick menu - global header of page 
	/* ====- REMOVE - DOWN ARROW and SUB-MENU 
	$('a.user-quickinfo').on('click', function(e) {
		e.stopPropagation();
		if (!$(this).hasClass('quickmenu-showing')) {
			$(this).addClass('quickmenu-showing');
			$(this).siblings('div.user-quickmenu').slideDown();
		} else {
			$(this).removeClass('quickmenu-showing');
			$(this).siblings('div.user-quickmenu').slideUp();
		};
		hideAllGlobalNav();
		hideHelpMenu();
		hideNotificationMenu();
	});*/

	//global menu 
	$('ul.lst-global-menu>li>a').on('click', function(e) {
		e.stopPropagation();
		if (!$(this).hasClass('menuitem-active')) {
			$('ul.lst-global-menu>li>a').removeClass('menuitem-active');
			$('ul.lst-global-submenu').slideUp();
			$(this).addClass('menuitem-active');
			$(this).siblings('ul.lst-global-submenu').slideDown();
		} else {
			$(this).removeClass('menuitem-active');
			$(this).siblings('ul.lst-global-submenu').slideUp();
		};
	});

	//global sub menu 
	$('ul.lst-global-submenu>li>a').on('click', function(e) {
		e.stopPropagation();
		if (!$(this).hasClass('submenuitem-active')) {
			$('ul.lst-global-submenu>li>a').removeClass('submenuitem-active');
			$('ul.lst-global-submenu-l2').slideUp();
			$(this).addClass('submenuitem-active');
			$(this).siblings('ul.lst-global-submenu-l2').slideDown();
		} else {
			$(this).removeClass('submenuitem-active');
			$(this).siblings('ul.lst-global-submenu-l2').slideUp();
		};
	});

	//show global nav on medium devices 
	$('div.global-nav a.btn-showglobalnav').on('click', function(e) {
		if (!$(this).hasClass('showing-on-mediumdevices')) {
			$('div.global-nav div.global-menu').slideDown();
			$(this).addClass('showing-on-mediumdevices');
			$('div.global-nav.sticky-header').css('bottom', 0);
		} else {
			$('div.global-nav div.global-menu').slideUp();
			$(this).removeClass('showing-on-mediumdevices');
			$('div.global-nav.sticky-header').css('bottom', 'auto');
		};
	});

	//show global nav and animate a bit ;P 
	$('div.global-nav a.btn-toggleglobalnav').on('click', function() {
		if (!$(this).hasClass('showing-smallmenu')) {
			$('div.global-nav div.global-menu').slideDown();
			$(this).addClass('showing-smallmenu');
			$('div.global-nav.sticky-header').css('bottom', 0);
		} else {
			$('div.global-nav div.global-menu').slideUp();
			$(this).removeClass('showing-smallmenu');
			$('div.global-nav.sticky-header').css('bottom', 'auto');
		};
	});

	//
	$('a.btn-filter-report').on('click', function() {
		$(this).siblings('div.report-filter').slideToggle();
	});

	//notifications - show quick notifications 
	$('a.notification-bell').on('click', function(e) {
		e.stopPropagation();
		if (!$(this).hasClass('notificationmenu-showing')) {
			$(this).addClass('notificationmenu-showing');
			$(this).siblings('div.notification-items').slideDown();
		} else {
			$(this).removeClass('notificationmenu-showing');
			$(this).siblings('div.notification-items').slideUp();
		};
		hideAllGlobalNav();
		hideHelpMenu();
		/* ====- REMOVE - DOWN ARROW and SUB-MENU 
		hideUserQuickMenu();*/
	});

	//notifications - show quick notifications 
	$('a.btn-helplinks').on('click', function(e) {
		e.stopPropagation();
		if (!$(this).hasClass('helplinks-showing')) {
			$(this).addClass('helplinks-showing');
			$(this).siblings('div.helplinks').slideDown();
		} else {
			$(this).removeClass('helplinks-showing');
			$(this).siblings('div.helplinks').slideUp();
		};
		hideAllGlobalNav();
		/* ====- REMOVE - DOWN ARROW and SUB-MENU 
		hideUserQuickMenu();*/
		hideNotificationMenu();
	});

	/* ============ PAGE :: Data Review - START */
	$('ul.lst-uxd-tabswitch>li>a#tabbtn-individuals').on('click', function() {
		$(this).addClass('tab-selected');
		$('ul.lst-uxd-tabswitch>li>a#tabbtn-entities').removeClass('tab-selected');
		$('div#tabcontent-individuals').show();
		$('div#tabcontent-entities').hide();
	});
	$('ul.lst-uxd-tabswitch>li>a#tabbtn-entities').on('click', function() {
		$(this).addClass('tab-selected');
		$('ul.lst-uxd-tabswitch>li>a#tabbtn-individuals').removeClass('tab-selected');
		$('div#tabcontent-entities').show();
		$('div#tabcontent-individuals').hide();
	});

	//select complete row - checkbox in table 
	$('table.checkbox-row-selection tr th input').change(function() {
		//var isCheckedSelectRow = this.checked ? true : false;
		if ($(this).is(':checked')) {
			$(this).closest('table.checkbox-row-selection').find('td input').prop('checked', true);
			$(this).closest('table.checkbox-row-selection tr').addClass('selected-row');
		} else {
			$(this).closest('table.checkbox-row-selection').find('td input').prop('checked', false);
			$(this).closest('table.checkbox-row-selection tr').addClass('selected-row');
		};
	});
	/*$("table.checkbox-row-selection tr td input").change(function() {
		$(this).closest('tr').toggleClass('selected-row', this.checked);
	});*/
	/* ============ PAGE :: Data Review - END */

	/* ============ PAGE :: Upload - START */
	$('ul.lst-uxd-tabswitch>li>a#tabbtn-upload-fi').on('click', function() {
		$(this).closest('ul.lst-uxd-tabswitch').find('a').removeClass('tab-selected');
		$(this).addClass('tab-selected');
		$('div.tabcontent-upload').hide();
		$('div#tabcontent-upload-fi').show();
	});
	$('ul.lst-uxd-tabswitch>li>a#tabbtn-upload-client').on('click', function() {
		$(this).closest('ul.lst-uxd-tabswitch').find('a').removeClass('tab-selected');
		$(this).addClass('tab-selected');
		$('div.tabcontent-upload').hide();
		$('div#tabcontent-upload-client').show();
	});
	$('ul.lst-uxd-tabswitch>li>a#tabbtn-upload-account').on('click', function() {
		$(this).closest('ul.lst-uxd-tabswitch').find('a').removeClass('tab-selected');
		$(this).addClass('tab-selected');
		$('div.tabcontent-upload').hide();
		$('div#tabcontent-upload-account').show();
	});
	$('ul.lst-uxd-tabswitch>li>a#tabbtn-upload-payment').on('click', function() {
		$(this).closest('ul.lst-uxd-tabswitch').find('a').removeClass('tab-selected');
		$(this).addClass('tab-selected');
		$('div.tabcontent-upload').hide();
		$('div#tabcontent-upload-payment').show();
	});
	/* ============ PAGE :: Upload - END */

	//select source type
	$('select#select-source-type').on('change', function() {
		if ($(this).children(':selected').val() == 3) {
			$('div#fileupload-csvexcel').hide();
			$('div#modal-upload-sql').modal('show');
			$('div#fileupload-sql').show();
		} else {
			$('div#fileupload-csvexcel').show();
			$('div#fileupload-sql').hide();
		};
	});
	

	//Tab show/hide encryption and decryption
	$('ul.lst-uxd-tabswitch>li>a#tabbtn-encryption').on('click', function() {
		$(this).addClass('tab-selected');
		$('ul.lst-uxd-tabswitch>li>a#tabbtn-decryption').removeClass('tab-selected');
		$('div#tabcontent-encryption').show();
		$('div#tabcontent-decryption').hide();
	});
	$('ul.lst-uxd-tabswitch>li>a#tabbtn-decryption').on('click', function() {
		$(this).addClass('tab-selected');
		$('ul.lst-uxd-tabswitch>li>a#tabbtn-encryption').removeClass('tab-selected');
		$('div#tabcontent-decryption').show();
		$('div#tabcontent-encryption').hide();
	});

	/* ============ NOTIFICATION ERROR MESSAGES :: START ============== */
	/*  
		Reference(s) : 
		http://bootstrap-notify.remabledesigns.com/
		https://github.com/mouse0270/bootstrap-notify
	*/
	$('a#btn-show-messages').on('click', function(){
		$.notify({
			// options
			message: 'Ypiiii you got FANCY messages on page !!'
		},{
			// settings
			type: 'success' /* success=green, danger=red, info=blue, warning=yellow */
		});
	});
	/* ============ NOTIFICATION ERROR MESSAGES :: END   ============== */

	//enable popovers of bootstrap
	$("[data-toggle=popover]").popover({
		html: true, 
		content: function() {
			return $('#popover-content').html();
		}
	});


	//REMOVE FOR DEMO PURPOSE - INITIALISE PAGE TEMPLATE 
	function initPageTemplate () {
		//$('body').load('../header.html');
	};
	//initPageTemplate();

	/* =============== HARDCODED DATA ============== */
	/* ============ PAGE :: Dashboard Script - START */
	//MOVED TO PAGE - dashboard-2.html
	/* ============ PAGE :: Dashboard Script - END */

	/* ============ New Dashboard Script - START */
	//MOVED TO PAGE - dashboard.html
	/* ============ New Dashboard Script - END   */

	/* //fix IE drop down issue */
	function fixIESelectBug() {
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");
		if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
			$('div.login-container div.login-box div.login-content div.login-form-row select.form-control').css('background-image', 'none');
		};
		return false;
	};
	fixIESelectBug();

	//Calendar Picker 
	//ON PAGE - Audit Reports
	//$('div#datetimepicker4').datetimepicker();

	// .login-container .login-box .login-content .login-form-row
})(jQuery);
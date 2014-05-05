$("section:not('.page')").hide();
var previousScroll = 0;
$('#overlay').overlay({
	fixed: false,
	top: 0,
	left: 0,
	onClose: function(){
		var o = this.getOverlay();
		o.find('.inner').remove();
		if(history && history.replaceState)
			history.replaceState('', '', location.pathname);
		else
			location.hash = ' ';
		$('body').scrollTo(previousScroll, {duration: 200});
	}
});

$(".standpunt a, .wepromise a, .eindoordeel td:not(':first-child') a").click(function(e){
	
	var d = $( '<div class="inner">' );
	var t = $(e.target).attr('href');
	
	$(t).closest('section').find('h1').clone().appendTo(d);
	$(t).closest('section').find('aside').clone().appendTo(d);
	$(t).clone().appendTo(d);
	$(t).next().clone().appendTo(d);
	$(t).closest('section').find('a.terug').clone().appendTo(d).click(function(e) {
		$('#overlay').overlay().close();
	});
	
	$('#overlay').append(d);	
	$('#overlay').overlay().load();
	previousScroll = $('html')[0].scrollTop;
	$('body').scrollTo($('#overlay'), {duration: 200});
});

$("nav.sub a:not(':last-child')").click(function(e){
	
	var d = $( '<div class="inner">' );
	var t = $(e.target).attr('href');
	
	$(t).clone().contents().appendTo(d);	
	$('#overlay').append(d);
	$('#overlay').find('a.terug').click(function() {
		$('#overlay').overlay().close();
	});	
	$('#overlay').overlay().load();
	previousScroll = $('html')[0].scrollTop;
	$('body').scrollTo($('#overlay'), {duration: 200});
});

//table cell behaviors	
$('#overzicht td[class!=onderwerp]').bind("mouseenter",function() {
	
	// highlight headers on cell over
	$('#overzicht th').removeClass('highlight'); 
		
	var index = $(this).parent().children().index(this);	
	 $('#overzicht').each(function() {
	  $(':nth-child(' + (index + 1) + ')' ,this).addClass('highlight');
	});
	
	//remove highlights when not needed
	}).bind("mouseleave",function(){
		  var index = $(this).parent().children().index(this);	
			$('#overzicht').each(function() {
				  $(':nth-child(' + (index + 1) + ')' ,this).removeClass('highlight');
			})
});
	
//fake click to load page with relevant section open if hash in URL	
if (document.location.hash != '' && document.location.hash != '# ') {
	var targ = 'a[href*='+document.location.hash+']';
	if($(targ).length>0) {
		$(targ).click();				
	}
}

$('body').bind('click', function(e) {
 if(e.target.tagName.toLowerCase() == 'a' && e.target.getAttribute('href') == '#')
  e.preventDefault();
});
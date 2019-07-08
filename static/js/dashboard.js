function View(headline, blurb) {
	this.headline = headline;
	this.blurb = blurb;
}

reHeight = function (){
	var window_height = Math.floor($(window).height());
	var header_height = Math.ceil($(".header").height()) + parseInt($(".header").css("padding-top")) + parseInt($(".header").css("padding-bottom"));
	var tab_height = $("#tabs").height();
	tab_height = 0;
	
	var content_height = window_height - (header_height + tab_height);
	console.log(window_height, header_height, content_height);
	$("#content").height(Math.floor(content_height));
}

$(document).ready(function(){
	var views = [];
	
	views['map'] = new View("Mapping 50 years of mass shootings","An overview of all shootings in the U.S., with a subset of points where the shooter had a history of mental illness. A subset of school-related shootings is included for reference.");
	views['pie'] = new View("Did the Shooter have a History of Mental Health?","An interactive pie chart displaying if the shooter had any history of mental illness and all general possible motives reported");
	views['wordcloud'] = new View("Shooter's General Motives","A wordcloud displaying all the general motives reported for the shooter while omitting “unknown” due to the excessive number of times it appears, drawing your attention away from the other motives.");
	
	
	$(".tab").click(function(){
		display_tab = $(this).attr("id").split("_")[0];
		myView = views[display_tab];
		$(`#${display_tab}`)
			.addClass("active")
			.css("height","100%")
			.siblings()
			.removeClass("active");
			
		$(this)
			.addClass("active")			
			.siblings()
			.removeClass("active");
			
		$("#headline").text(myView.headline);
		$("#blurb").text(myView.blurb);
		
	});
	
	$("#tabs .tab:first-child").click();
	
	reHeight();
	$(window).resize(reHeight);
});


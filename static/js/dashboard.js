function View(headline, blurb) {
	this.headline = headline;
	this.blurb = blurb;
}

$(document).ready(function(){
	var views = [];
	
	views['map'] = new View("Mapping 50 years of mass shootings","An overview of all shootings in the U.S., with a subset of points where the shooter had a history of mental illness. A subset of school-related shootings is included for reference.");
	views['pie'] = new View("Look at this pie chart.","");
	views['wordcloud'] = new View("Some words","");
	
	
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
});


$(document).ready(function(){
	
	$(".tab").click(function(){
		display_tab = $(this).attr("id").split("_")[0];
		$(`#${display_tab}`)
			.show()
			.css("height","100%")
			.siblings()
			.hide();
			
		$(this)
			.addClass("active")
			
			.siblings()
			.removeClass("active");
		
	});
	
});
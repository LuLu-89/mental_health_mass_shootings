$(document).ready(function(){
	
	$(".tab").click(function(){
		display_tab = $(this).attr("id").split("_")[0];
		$(`#${display_tab}`)
			.show()
			.siblings()
			.hide();
			
		$(this)
			.addClass("active")
			.siblings()
			.removeClass("active");
		
	});
	
});
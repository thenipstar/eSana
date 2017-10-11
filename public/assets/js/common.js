(function( $ ) {
	$(document).ready(function()
	{
		var resizeTimer;
		
		// Home Page Hero Panel
		if($('#home_hero_container').length)
			$('#home_hero_container').customPanel();
			
		// Mobile Navigation :: Setup
		$('#main_navigation').after($('<div id="navbar-height-col"></div>'));
	
	    // Enter your ids or classes
	    var toggler = '.navbar-toggle';
	    var navigationwrapper = '.navbar-header';
	
		$("#main_navigation").on("click load", toggler, function (e)
		{
	        var selected = $(this).hasClass('slide-active');
	
	    	$(this).toggleClass('slide-active', !selected);
	    	$('#navbar-height-col, .utility_nav').toggleClass('slide-active');
	
	    	$(navigationwrapper+', .navbar, body').toggleClass('slide-active');
		});
		
		if($('.saving_calculator_container').length)
		{
			savingsCalculatorChange(0);
			
			// Savings Calculator Knob
			$('.saving_calulator_knob').knob(
			{
				'dynamicDraw': true,
				'draw': function()
				{
					this.i.val( this.cv + '%');
				}
			});
			
			$('.savings_calculator_question_container').fadeIn();
		}
		
		$('.savings_calculator_field_selector_trigger').on('click', function()
		{
			var currentIndex = $('.savings_calculator_field_selector_item').index($(this).parent());
			clearSavingsCalculator();
			savingsCalculatorChange(currentIndex);
		});
		
		$('.saving_calculator_cost_form_submit').on('click', function(e)
		{
			e.preventDefault();
			
			var yourCost = $('.saving_calculator_cost_form_input').val();
			
			if(yourCost.charAt(0) != '$')
				yourCost = '$'+yourCost;
			
			$('.saving_calculator_your_cost').text(yourCost);
			
			var totalSavingsPercentage = (((yourCost.replace('$', '') - $('.savings_calculator_question_container .saving_calculator_esana_cost').text().replace('$', '')) / yourCost.replace('$', '')) * 100);
			
			$('.saving_calulator_knob').val(totalSavingsPercentage).trigger('change');
		});
		
		$('.tool_tip').on('mouseenter', function(e)
		{
			$('.tool_top_container').text($(this).data('tool-tip'));
			
			var x = e.pageX + 20;
			var y = e.pageY - 40 - $('.tool_top_container').height();
			
			$('.tool_top_container').css(
			{
				top: y + 'px',
				left: x + 'px'
			}).fadeIn();
			
		}).on('mouseleave', function()
		{
			$('.tool_top_container').fadeOut(function()
			{
				$(this).text('');
			});
		});
		
		// Contact Us Form Submit
		$('#contact_us_form').on('submit', function(e)
		{
			e.preventDefault();
			
			var request = $.ajax({
				type:'POST',
				url:'/contact-submit',
				data:$(this).serialize(),
				dataType:'text'
			});
			
			request.done(function(msg)
			{
				$('.contact_us_form_message p').addClass('success').text('Thank you. Your message has been sent.').parent().fadeIn().delay(5000).fadeOut();
			});
			
			request.fail(function(jqXHR, textStatus)
			{
				$('.contact_us_form_message p').addClass('fail').text('There seems to have been an error. Please try sending your message again at a later time.').parent().fadeIn().delay(5000).fadeOut();
			});
		});
		
		$(window).on('resize', function(e)
	   	{
		  	clearTimeout(resizeTimer);
		  	
		  	resizeTimer = setTimeout(function()
		  	{
	        	windowResize();
		  	}, 250);
		});
	
		var windowResize = function()
		{
			if(window.innerWidth <= 769)
			{
			}
		}
	});
	
	var savingsCalculatorChange = function(index)
	{
		$('.savings_calculator_field_selector_item .savings_calculator_field_selector_trigger').removeClass('active');
		$('.savings_calculator_field_selector_item:eq('+index+') .savings_calculator_field_selector_trigger').addClass('active');
		
		var question = $('.savings_calculator_field_selector_item').eq(index).data('question');
		var averageCost = $('.savings_calculator_field_selector_item').eq(index).data('average-cost');
		var esanaCost = $('.savings_calculator_field_selector_item').eq(index).data('esana-cost');
		
		$('.savings_calculator_question_container .savings_calculator_question').text(question);
		$('.savings_calculator_question_container .saving_calculator_average_cost').text('$'+averageCost);
		$('.savings_calculator_question_container .saving_calculator_esana_cost').text('$'+esanaCost);
	}
	
	var clearSavingsCalculator = function()
	{
		$('.saving_calculator_cost_form_input').val('');
		$('.saving_calculator_your_cost').text('');
		$('.saving_calulator_knob').val(0).trigger('change');
	}
})( jQuery );
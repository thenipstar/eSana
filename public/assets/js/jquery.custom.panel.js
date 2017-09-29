(function($)
{
	var currentPanelIndex = 0;
	var panelItemCount = 0;
	var resizeTimer;

	$.customPanel = function(element, options)
	{
		var defaults = {
			slideItemSelector: '.hero_panel_item',
			panelControlsSelector: '.hero_panel_controls',
			panelControlItemSelector: '.home_hero_panel_control_item',
			slideDelay: '3000ms',
			slideSpeed: '500ms'
		};
		
		var panel = this;
		
		panel.settings = {};
		
		var $element = jQuery(element), element = element;
		
		panel.init = function()
		{
			panel.settings = jQuery.extend({}, defaults, options);
			panelItemCount = $element.find('.hero_left_content_container '+panel.settings.slideItemSelector).length;
			panel.buildControls();
			currentPanelIndex = 0;
			panel.changePanel();
		}
		
		panel.buildControls = function()
		{
			for(var i = 0; i < panelItemCount; i++)
			{
				$('<div/>', {
					class: 'home_hero_panel_control_item'
				}).appendTo($(panel.settings.panelControlsSelector));
			}
		}
		
		panel.changePanel = function()
		{
			$('.hero_left_content_container '+panel.settings.slideItemSelector).removeClass('active').eq(currentPanelIndex).addClass('active');
			$('.hero_right_content_container '+panel.settings.slideItemSelector).removeClass('active').eq(currentPanelIndex).addClass('active');
			
			panel.updatePanelControlItem();
		}
		
		panel.updatePanelControlItem = function()
		{
			$('.hero_left_content_container '+panel.settings.panelControlItemSelector).removeClass('active').eq(currentPanelIndex).addClass('active');
		}
		
		panel.init();
		
		$(panel.settings.panelControlItemSelector).on('click', function()
		{
			currentPanelIndex = $(panel.settings.panelControlItemSelector).index($(this));
			
			panel.changePanel();
		});
	}
	
	$.fn.customPanel = function(options)
	{
		return this.each(function() {
			if(undefined == $(this).data('customPanel')) {
				var customPanel = new $.customPanel(this, options);
				
				$(this).data('customPanel', customPanel);
			}
		});
	};
})(jQuery);
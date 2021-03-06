var TMM_ADVANCED_WP_POPUP2 = function() {
	var self = {
		zindex: 1011,
		popup_li: null,
		params: null,
		init: function() {
			jQuery('body').prepend('<div id="tmm_advanced_wp_popup2"></div>');
			jQuery('body').prepend('<div id="alert_advanced_wp_popup"></div>');
			jQuery('body').prepend('<div id="advanced_wp_popup_overlay" class="advanced_wp_popup_overlay_shortcode"></div>');
			//***
			jQuery('.advanced_wp_popup_close2').live('click', function() {
				self.close(jQuery(this));
			});
			jQuery('.advanced_wp_popup_close2').live('click', function() {
				self.close(jQuery(this));
			});
		},		
		popup: function(params) {
			params = self.validate_params(params);
			jQuery('#tmm_advanced_wp_popup2').append('<div class="tmm_advanced_wp_popup_li" style="width:' + params.width + 'px;margin-left:-' + params.width / 2 + 'px;">');
			this.popup_li = jQuery('#tmm_advanced_wp_popup2 div:last-child');
			jQuery(this.popup_li).css('z-index', self.zindex++);
			jQuery(this.popup_li).append('<div class="advanced_wp_popup_container" style="width:' + params.width + ';">');
			jQuery(this.popup_li).append('<div class="advanced_wp_popup_buttons">');
			var popup = jQuery(this.popup_li).find('.advanced_wp_popup_container');
			/***/
			if (params.title.length > 0) {
				popup.append('<div class="tmm_titlebar" />');
				popup.children('.tmm_titlebar').append('<h6>').children('h6').html(params.title);
				popup.children('.tmm_titlebar').append('<a href="javascript:void(0);" class="advanced_wp_popup_close2"></a>');
			}
			/***/
			jQuery(popup).append('<div class="advanced_wp_popup_content">');
			jQuery(popup).find('.advanced_wp_popup_content').html(params.content);
			jQuery(this.popup_li).draggable({
				handle: '.tmm_titlebar'
			});
			jQuery(this.popup_li).fadeTo(200, 1);
			self.overlay(params.overlay, self.zindex - 1);
			//***
			self.open(params, this.popup_li);
		},
		overlay: function(mode, zindex) {
			jQuery('#advanced_wp_popup_overlay').css('z-index', zindex);
			if (mode) {
				jQuery('#advanced_wp_popup_overlay.advanced_wp_popup_overlay_shortcode').show();
			} else {
				jQuery('#advanced_wp_popup_overlay.advanced_wp_popup_overlay_shortcode').hide();
			}
		},
		open: function(params, popup_li) {
			self.params = params;
			jQuery.each(params.buttons, function(index, button) {
				if (button.action == 'close') {
					jQuery(popup_li).find('.advanced_wp_popup_buttons').append('<a href="javascript:void(0);" class="tmm_button advanced_wp_popup_close2">' + button.name + '</a>');
					return;
				}

				//*****
				if (button.display == 'undefined') {
					button.display = 'inline-block';
				}

				if (button.close) {
					jQuery(popup_li).find('.advanced_wp_popup_buttons').append('<a href="javascript:tmm_advanced_wp_popup2.do_action(' + index + ');void(0);" data-name="' + button.name + '" class="tmm_button advanced_wp_popup_close2" style="display:' + button.display + ';">' + button.name + '</a>');
				} else {
					jQuery(popup_li).find('.advanced_wp_popup_buttons').append('<a href="javascript:tmm_advanced_wp_popup2.do_action(' + index + ');void(0);" data-name="' + button.name + '" class="button" style="display:' + button.display + ';">' + button.name + '</a>');
				}

			});
			//***
			if (params.open !== undefined) {
				params.open();
			}
		},
		set_title: function(title) {
			jQuery(this.popup_li).find('.advanced_wp_popup_container .tmm_titlebar h6').html(title);
		},
		show_button: function(name) {
			jQuery('#tmm_advanced_wp_popup2').find('.advanced_wp_popup_buttons').find("a[data-name*='" + name + "']").css('display', 'inline-block');
		},
		get_content: function() {
			return jQuery(this.popup_li).find('.advanced_wp_popup_content').html();
		},
		set_content: function(html) {
			return jQuery(this.popup_li).find('.advanced_wp_popup_content').html(html);
		},
		set_height: function(height, animate, animation_time, opacity) {
			if (animate) {
				jQuery(this.popup_li).find('.advanced_wp_popup_content').animate({
					opacity: opacity,
					height: "toggle"
				}, animation_time);
			} else {
				jQuery(this.popup_li).find('.advanced_wp_popup_content').css('height', height);
			}
		},
		close: function(_this) {
			var popup = jQuery(_this).parents('div.tmm_advanced_wp_popup_li');
			window.setTimeout(function() {
				jQuery(popup).fadeOut(0, function() {
					jQuery(this).remove();
					self.overlay(0);
				});
			}, 100);
		},
		do_action: function(index) {
			jQuery.each(this.params.buttons, function(i, button) {
				if (i == index) {
					button.action(self);
					if (button.close !== undefined) {
						if (button.close == 1) {
							//TODO
						}
					}
					return false;
				}
			});
		},
		validate_params: function(params) {
			if (params.title === undefined) {
				params.title = "";
			}

			if (params.overlay === undefined) {
				params.overlay = 0;
			}

			if (params.width === undefined || params.width === null) {
				params.width = 800;
			}

			if (params.buttons === undefined) {
				params.buttons = {
					0: {
						name: 'Cancel',
						action: 'close'
					}
				};
			}

			return params;
		}
	};
	return self;
};
//*****

var tmm_advanced_wp_popup2 = null;
jQuery(document).ready(function() {
	tmm_advanced_wp_popup2 = new TMM_ADVANCED_WP_POPUP2();
	tmm_advanced_wp_popup2.init();
});


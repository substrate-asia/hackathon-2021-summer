//[Preview Menu Javascript]

//Project:	DashboardX Admin - Responsive Admin Template
//Primary use:   This file is for demo purposes only.

$(function () {
  'use strict'


  /**
   * Get access to plugins
   */

  $('[data-toggle="control-sidebar"]').controlSidebar()
  $('[data-toggle="push-menu"]').pushMenu()

  var $pushMenu       = $('[data-toggle="push-menu"]').data('lte.pushmenu')
  var $controlSidebar = $('[data-toggle="control-sidebar"]').data('lte.controlsidebar')
  var $layout         = $('body').data('lte.layout')

  /**
   * List of all the available themes
   *
   * @type Array
   */
  var mySkins = [
    'theme-amber',
    'theme-bluecyan',
    'theme-blueindigo',
    'theme-brown',
    'theme-cyangreen',
    'theme-deeporange',
    'theme-deeppurple',
    'theme-deeppurpleblue',
    'theme-greenteal',
    'theme-greyblue',
    'theme-indigolightblue',
    'theme-indigopurple',
    'theme-purpleamber',
    'theme-purpleorange',
    'theme-redpink',
  ]

  /**
   * Get a prestored setting
   *
   * @param String name Name of of the setting
   * @returns String The value of the setting | null
   */
  function get(name) {
    if (typeof (Storage) !== 'undefined') {
      return localStorage.getItem(name)
    } else {
      window.alert('Please use a modern browser to properly view this template!')
    }
  }

  /**
   * Store a new settings in the browser
   *
   * @param String name Name of the setting
   * @param String val Value of the setting
   * @returns void
   */
  function store(name, val) {
    if (typeof (Storage) !== 'undefined') {
      localStorage.setItem(name, val)
    } else {
      window.alert('Please use a modern browser to properly view this template!')
    }
  }

  /**
   * Toggles layout classes
   *
   * @param String cls the layout class to toggle
   * @returns void
   */
  function changeLayout(cls) {
    $('body').toggleClass(cls)
    if ($('body').hasClass('fixed') && cls == 'fixed') {
      $pushMenu.expandOnHover()
      $layout.activate()
    }
    $controlSidebar.fix()
  }

  /**
   * Replaces the old skin with the new skin
   * @param String cls the new skin class
   * @returns Boolean false to prevent link's default action
   */
  function changeSkin(cls) {
    $.each(mySkins, function (i) {
      $('body').removeClass(mySkins[i])
    })

    $('body').addClass(cls)
    store('theme', cls)
    return false
  }

  /**
   * Retrieve default settings and apply them to the template
   *
   * @returns void
   */
  function setup() {
    var tmp = get('theme')
    if (tmp && $.inArray(tmp, mySkins))
      changeSkin(tmp)

    // Add the change skin listener
    $('[data-theme]').on('click', function (e) {
      if ($(this).hasClass('knob'))
        return
      e.preventDefault()
      changeSkin($(this).data('theme'))
    })

    // Add the layout manager
    $('[data-layout]').on('click', function () {
      changeLayout($(this).data('layout'))
    })

    $('[data-controlsidebar]').on('click', function () {
      changeLayout($(this).data('controlsidebar'))
      var slide = !$controlSidebar.options.slide

      $controlSidebar.options.slide = slide
      if (!slide)
        $('.control-sidebar').removeClass('control-sidebar-open')
    })


    $('[data-enable="expandOnHover"]').on('click', function () {
      $(this).attr('disabled', true)
      $pushMenu.expandOnHover()
      if (!$('body').hasClass('sidebar-collapse'))
        $('[data-layout="sidebar-collapse"]').click()
    })

    $('[data-enable="rtl"]').on('click', function () {
      $(this).attr('disabled', true)
      $pushMenu.expandOnHover()
      if (!$('body').hasClass('rtl'))
        $('[data-layout="rtl"]').click()
    })

	  	

    $('[data-mainsidebarskin="toggle"]').on('click', function () {
      var $sidebar = $('body')
      if ($sidebar.hasClass('dark-skin')) {
        $sidebar.removeClass('dark-skin')
        $sidebar.addClass('light-skin')
      } else {
        $sidebar.removeClass('light-skin')
        $sidebar.addClass('dark-skin')
      }
    })

    //  Reset options
    if ($('body').hasClass('fixed')) {
      $('[data-layout="fixed"]').attr('checked', 'checked')
    }
    if ($('body').hasClass('layout-boxed')) {
      $('[data-layout="layout-boxed"]').attr('checked', 'checked')
    }
    if ($('body').hasClass('sidebar-collapse')) {
      $('[data-layout="sidebar-collapse"]').attr('checked', 'checked')
    }
    if ($('body').hasClass('rtl')) {
      $('[data-layout="rtl"]').attr('checked', 'checked')
    }
   // if ($('body').hasClass('dark')) {
//      $('[data-layout="dark"]').attr('checked', 'checked')
//    }

  }

  // Create the new tab
  var $tabPane = $('<div />', {
    'id'   : 'control-sidebar-theme-demo-options-tab',
    'class': 'tab-pane active'
  })

  // Create the tab button
  var $tabButton = $('<li />', { 'class': 'nav-item' })
    .html('<a href=\'#control-sidebar-theme-demo-options-tab\' class=\'active\' data-toggle=\'tab\'  title=\'Setting\'>'
      + '<i class="ti-settings"></i>'
      + '</a>')

  // Add the tab button to the right sidebar tabs
  $('[href="#control-sidebar-home-tab"]')
    .parent()
    .before($tabButton)

  // Create the menu
  var $demoSettings = $('<div />')
  
  var $skinsList = $('<ul />', { 'class': 'list-inline clearfix theme-switch' })

  // Dark sidebar skins
  var $themeAmber =
        $('<li />', { style: 'padding: 5px;line-height: 25px;' })
          .append('<a href="javascript:void(0)" data-theme="theme-amber" style="display: inline-block;vertical-align: middle;" class="clearfix active bg-gradient-amber rounded-circle w-20 h-20" title="Theme Amber">'
            + '</a>')
  $skinsList.append($themeAmber)
	
  var $themeBlueCyan =
        $('<li />', { style: 'padding: 5px;line-height: 25px;' })
          .append('<a href="javascript:void(0)" data-theme="theme-bluecyan" style="display: inline-block;vertical-align: middle;" class="clearfix bg-gradient-bluecyan rounded-circle w-20 h-20" title="Theme BlueCyan">'
            + '</a>')
  $skinsList.append($themeBlueCyan)
	
  var $themeBlueIndigo =
        $('<li />', { style: 'padding: 5px;line-height: 25px;' })
          .append('<a href="javascript:void(0)" data-theme="theme-blueindigo" style="display: inline-block;vertical-align: middle;" class="clearfix bg-gradient-blueindigo rounded-circle w-20 h-20" title="Theme BlueIndigo">'
            + '</a>')
  $skinsList.append($themeBlueIndigo)
	
  var $themeBrown =
        $('<li />', { style: 'padding: 5px;line-height: 25px;' })
          .append('<a href="javascript:void(0)" data-theme="theme-brown" style="display: inline-block;vertical-align: middle;" class="clearfix bg-gradient-brown rounded-circle w-20 h-20" title="Theme Brown">'
            + '</a>')
  $skinsList.append($themeBrown)
	
  var $themeCyanGreen =
        $('<li />', { style: 'padding: 5px;line-height: 25px;' })
          .append('<a href="javascript:void(0)" data-theme="theme-cyangreen" style="display: inline-block;vertical-align: middle;" class="clearfix bg-gradient-cyangreen rounded-circle w-20 h-20" title="Theme CyanGreen">'
            + '</a>')
  $skinsList.append($themeCyanGreen)
	
  var $themeDeepOrange =
        $('<li />', { style: 'padding: 5px;line-height: 25px;' })
          .append('<a href="javascript:void(0)" data-theme="theme-deeporange" style="display: inline-block;vertical-align: middle;" class="clearfix bg-gradient-deeporange rounded-circle w-20 h-20" title="Theme DeepOrange">'
            + '</a>')
  $skinsList.append($themeDeepOrange)
	
  var $themeDeepPurple =
        $('<li />', { style: 'padding: 5px;line-height: 25px;' })
          .append('<a href="javascript:void(0)" data-theme="theme-deeppurple" style="display: inline-block;vertical-align: middle;" class="clearfix bg-gradient-deeppurple rounded-circle w-20 h-20" title="Theme DeepPurple">'
            + '</a>')
  $skinsList.append($themeDeepPurple)
	
  var $themeDeepPurpleBlue =
        $('<li />', { style: 'padding: 5px;line-height: 25px;' })
          .append('<a href="javascript:void(0)" data-theme="theme-deeppurpleblue" style="display: inline-block;vertical-align: middle;" class="clearfix bg-gradient-deeppurpleblue rounded-circle w-20 h-20" title="Theme DeepPurpleBlue">'
            + '</a>')
  $skinsList.append($themeDeepPurpleBlue)
	
  var $themeGreenTeal =
        $('<li />', { style: 'padding: 5px;line-height: 25px;' })
          .append('<a href="javascript:void(0)" data-theme="theme-greenteal" style="display: inline-block;vertical-align: middle;" class="clearfix bg-gradient-greenteal rounded-circle w-20 h-20" title="Theme GreenTeal">'
            + '</a>')
  $skinsList.append($themeGreenTeal)
	
  var $themeGreyBlue =
        $('<li />', { style: 'padding: 5px;line-height: 25px;' })
          .append('<a href="javascript:void(0)" data-theme="theme-greyblue" style="display: inline-block;vertical-align: middle;" class="clearfix bg-gradient-greyblue rounded-circle w-20 h-20" title="Theme GreyBlue">'
            + '</a>')
  $skinsList.append($themeGreyBlue)
	
  var $themeIndigoLightBlue =
        $('<li />', { style: 'padding: 5px;line-height: 25px;' })
          .append('<a href="javascript:void(0)" data-theme="theme-indigolightblue" style="display: inline-block;vertical-align: middle;" class="clearfix bg-gradient-indigolightblue rounded-circle w-20 h-20" title="Theme IndigoLightBlue">'
            + '</a>')
  $skinsList.append($themeIndigoLightBlue)
	
  var $themeIndigoPurple =
        $('<li />', { style: 'padding: 5px;line-height: 25px;' })
          .append('<a href="javascript:void(0)" data-theme="theme-indigopurple" style="display: inline-block;vertical-align: middle;" class="clearfix bg-gradient-indigopurple rounded-circle w-20 h-20" title="Theme IndigoPurple">'
            + '</a>')
  $skinsList.append($themeIndigoPurple)
	
  var $themePurpleAmber =
        $('<li />', { style: 'padding: 5px;line-height: 25px;' })
          .append('<a href="javascript:void(0)" data-theme="theme-purpleamber" style="display: inline-block;vertical-align: middle;" class="clearfix bg-gradient-purpleamber rounded-circle w-20 h-20" title="Theme PurpleAmber">'
            + '</a>')
  $skinsList.append($themePurpleAmber)
	
  var $themePurpleOrange =
        $('<li />', { style: 'padding: 5px;line-height: 25px;' })
          .append('<a href="javascript:void(0)" data-theme="theme-purpleorange" style="display: inline-block;vertical-align: middle;" class="clearfix bg-gradient-purpleorange rounded-circle w-20 h-20" title="Theme PurpleOrange">'
            + '</a>')
  $skinsList.append($themePurpleOrange)
	
  var $themeRedPink =
        $('<li />', { style: 'padding: 5px;line-height: 25px;' })
          .append('<a href="javascript:void(0)" data-theme="theme-redpink" style="display: inline-block;vertical-align: middle;" class="clearfix bg-gradient-redpink rounded-circle w-20 h-20" title="Theme RedPink">'
            + '</a>')
  $skinsList.append($themeRedPink)
	

  

  $demoSettings.append('<h4 class="control-sidebar-heading">Theme Colors</h4>')
  $demoSettings.append($skinsList)
  
    // Layout options
  $demoSettings.append(
    '<h4 class="control-sidebar-heading">'
    + 'Background Size'
    + '</h4>'
	  
    // Theme Skin Toggle	  
	+ '<div class="flexbox mb-10 pb-10 bb-1">'
	+ '<label class="control-sidebar-subheading w-p100 mt-5">'
    + 'Choose Size'
    + '</label>'
	+ '<select id="bg-size" class="bg-size custom-select">'
	//+ '<option value="full">Full</option>'
	+ '<option value="wave">Wave</option>'
    + '<option value="half">Half</option>'
    + '<option value="header" selected="">Header</option>'
    + '</select>'
	+ '</div>'
	  
	
  )
	
  
  // Layout options
  $demoSettings.append(
    '<h4 class="control-sidebar-heading">'
    + '</h4>'
	  
    // Theme Skin Toggle	  
	+ '<div class="flexbox mb-10 pb-10 bb-1">'
	+ '<label for="toggle_left_sidebar_skin" class="control-sidebar-subheading">'
    + 'Turn Dark/Light'
    + '</label>'
	+ '<label class="switch switch-border switch-danger">'
	+ '<input type="checkbox" data-mainsidebarskin="toggle" id="toggle_left_sidebar_skin">'
	+ '<span class="switch-indicator"></span>'
	+ '<span class="switch-description"></span>'
	+ '</label>'
	+ '</div>'
	  
	
  )
	
  // Layout options
  $demoSettings.append(
    '<h4 class="control-sidebar-heading">'
    + '</h4>'
	  
    // rtl layout
	+ '<div class="flexbox mb-10 pb-10 bb-1">'
	+ '<label for="rtl" class="control-sidebar-subheading">'
    + 'Turn RTL/LTR'
    + '</label>'
	+ '<label class="switch switch-border switch-danger">'
	+ '<input type="checkbox" data-layout="rtl" id="rtl">'
	+ '<span class="switch-indicator"></span>'
	+ '<span class="switch-description"></span>'
	+ '</label>'
	+ '</div>'
  )


  // Layout options
  $demoSettings.append(
    '<h4 class="control-sidebar-heading">'
    + '</h4>'
	  
	  
    // Fixed layout
	+ '<div class="flexbox mb-10">'
	+ '<label for="layout_fixed" class="control-sidebar-subheading">'
    + 'Fixed layout'
    + '</label>'
	+ '<label class="switch switch-border switch-danger">'
	+ '<input type="checkbox" data-layout="fixed" id="layout_fixed">'
	+ '<span class="switch-indicator"></span>'
	+ '<span class="switch-description"></span>'
	+ '</label>'
	+ '</div>'	
	  
    // Boxed layout
	+ '<div class="flexbox mb-10">'
	+ '<label for="layout_boxed" class="control-sidebar-subheading">'
    + 'Boxed Layout'
    + '</label>'
	+ '<label class="switch switch-border switch-danger">'
	+ '<input type="checkbox" data-layout="layout-boxed" id="layout_boxed">'
	+ '<span class="switch-indicator"></span>'
	+ '<span class="switch-description"></span>'
	+ '</label>'
	+ '</div>'
	  
    // Sidebar Toggle
	+ '<div class="flexbox mb-10">'
	+ '<label for="toggle_sidebar" class="control-sidebar-subheading">'
    + 'Toggle Sidebar'
    + '</label>'
	+ '<label class="switch switch-border switch-danger">'
	+ '<input type="checkbox" data-layout="sidebar-collapse" id="toggle_sidebar">'
	+ '<span class="switch-indicator"></span>'
	+ '<span class="switch-description"></span>'
	+ '</label>'
	+ '</div>'	  
    
    // Control Sidebar Toggle
	+ '<div class="flexbox mb-10">'
	+ '<label for="toggle_right_sidebar" class="control-sidebar-subheading">'
    + 'Toggle Right Sidebar Slide'
    + '</label>'
	+ '<label class="switch switch-border switch-danger">'
	+ '<input type="checkbox" data-controlsidebar="control-sidebar-open" id="toggle_right_sidebar">'
	+ '<span class="switch-indicator"></span>'
	+ '<span class="switch-description"></span>'
	+ '</label>'
	+ '</div>'	  
	
  )
  
  

  $tabPane.append($demoSettings)
  $('#control-sidebar-home-tab').after($tabPane)

  setup()

  $('[data-toggle="tooltip"]').tooltip()
});// End of use strict

$(function () {
  'use strict'
	
	$('.theme-switch li a').click(function () {
		$('.theme-switch li a').removeClass('active').addClass('inactive');
		$(this).toggleClass('active inactive');
	});
	
});// End of use strict


$(function () {
  'use strict'	
 	$('.bg-size').on('change',function(){
		var $this = $(this),
		width_val = this.value,
		wrapper = $('body');

		if(width_val === 'wave'){
			$(wrapper).removeClass('onlyheader').addClass('onlywave');
		}
		else if(width_val === 'header'){
			$(wrapper).removeClass('onlywave').addClass('onlyheader');
		}
		else{
			$(wrapper).removeClass('onlywave onlyheader');
		}
	});
});// End of use strict
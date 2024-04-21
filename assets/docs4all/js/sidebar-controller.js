/*------------------------------------------------------------------
* Bootstrap Simple Admin Template
* Version: 3.0
* Author: Alexis Luna
* Website: https://github.com/alexis-luna/bootstrap-simple-admin-template
-------------------------------------------------------------------*/
// (function() {
//   'use strict';
//
//
// })();

function SidebarController() {

  this.init = () => {
    // Toggle sidebar on Menu button click
    $('#sidebarCollapse').on('click', function() {
      $('#sidebar').toggleClass('active');
      $('#body').toggleClass('active');
    });

    // Auto-hide sidebar on window resize if window size is small
    // $(window).on('resize', function () {
    //     if ($(window).width() <= 768) {
    //         $('#sidebar, #body').addClass('active');
    //     }
    // });
  }

  this.openSidebar = () => {
    $('#sidebar').toggleClass('active');
  }
}

if (typeof window._context === 'undefined') {
  window._context = {};
}
window._context["SidebarController"] = new SidebarController();

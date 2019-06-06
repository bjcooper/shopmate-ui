// Include styles.
import "./scss/style.scss";

// Include scripts and libraries.
import popper from "popper.js";
import "../node_modules/bootstrap/js/dist/collapse.js";
import "../node_modules/bootstrap/js/dist/tooltip.js";
import "ion-rangeslider";
import "simplebar";


$(function () {
  // Enable range sliders.
  $('.range-slider').ionRangeSlider();

  // Add some standard click behaviors.
  $('.selected-onclick').click(function () {
    $(this).toggleClass('selected');
  });

  $('.hide-onclick').click(function () {
    $(this).hide();
  });

  // Disable fake links.
  $('a[href="#"]').click(function (event) {
    event.preventDefault();
  });
});
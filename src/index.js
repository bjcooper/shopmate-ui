// Include styles.
import "./scss/style.scss";

// Include scripts and libraries.
import popper from "popper.js";
import "../node_modules/bootstrap/js/dist/collapse.js";
import "../node_modules/bootstrap/js/dist/modal.js";
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

  // Power up quantity selectors.
  $('.quantity-selector .btn').click(function (event) {
    event.preventDefault();
    var valWrapper = $(this).siblings('.quantity-value');
    var val = parseInt(valWrapper.html());
    if ($(this).hasClass('increment')) {
      val++;
    }
    else if (val > 1) {
      val--;
    }
    valWrapper.html(val);
  });

  // Power up rating selectors.
  $('.star-rating-selector li').click(function () {
    var rating = $(this).index() + 1;
    $(this).closest('.star-rating-selector').find('li').each(function () {
      if ($(this).index() < rating) {
        $(this).addClass('star');
      }
      else {
        $(this).removeClass('star');
      }
    });
  });

  // Power up modal swapping.
  $('a[data-modalswap]').click(function () {
    let currentModalId = '#' + $(this).closest('.modal').attr('id');
    let newModalId = $(this).data('modalswap');

    // Prepare to show the new modal once the current one is hidden.
    $(currentModalId).on('hidden.bs.modal', function () {
      $(this).off('hidden.bs.modal');
      $(newModalId).modal('show');
    })

    // Hide the current modal.
    $(currentModalId).modal('hide');
  })
});

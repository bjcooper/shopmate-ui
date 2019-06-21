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

  // Select items on-click.
  $('.selected-onclick').click(function () {
    // If this is a single-select group, unselect others.
    let group = $(this).closest('.single-selection-group');
    if (group.length) {
      $(group).find('.selected-onclick').removeClass('selected');
      $(this).addClass('selected');
    }
    else {
      $(this).toggleClass('selected');
    }
  });

  // Hide items on-click.
  $('.hide-onclick').click(function () {
    $(this).hide();
  });

  // Disable demo links and forms.
  $('a[href="#"]').click(function (event) {
    event.preventDefault();
    // Don't navigate for toggles and such.
    if (!$(this).data('toggle') && !$(this).hasClass('no-nav') && !$(this).hasClass('selected-onclick') && !$(this).hasClass('hide-onclick')) {
      simulateNavigation();
    }
  });
  $('form').on('submit', function (event) {
    event.preventDefault();
    simulateNavigation();
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

  // Power up remove from cart links.
  $('a.remove-from-cart').click(function () {
    // Create a placeholder row.
    const placeholder = $('<tr class="row-out-transition"><td></td></tr>');

    // Give it the same height as the row to remove and insert it.
    const row = $(this).closest('tr');
    $('td', placeholder).css('height', $(row).height());

    // Insert the placeholder row and detach the row to remove.
    $(row).after(placeholder);
    $(row).addClass('remove');
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

  // Power up special add to cart animations.
  $('.add-to-cart').click(function () {
    // Add the "clicked class" to trigger the animation.
    const link = $(this);
    link.addClass('clicked');

    // When the animation finishes, hide the modal.
    setTimeout(function () {
      $(link.data('target')).modal('hide');
    }, 1500);
  });

  // Respond to Product Quickview modal events.
  $('#product-quickview-modal').on('hidden.bs.modal', function () {
    // Reset add to cart clicked states.
    $(this).find('.add-to-cart').removeClass('clicked');
  });

  // Respond to Shopping Cart modal events.
  $('#shopping-cart-modal').on('hidden.bs.modal', function () {
    // Reset cart items.
    $(this).find('tr.row-out-transition').remove();
    $(this).find('tr.remove').removeClass('remove');
  });

});

/**
 * Provide a visual simulation for navigation so demo links make more sense.
 */
function simulateNavigation() {
  $('.page-wrapper').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
    $(this).attr('style', null);
  })

  $('.page-wrapper')
    .css('transition', 'none')
    .css('animation', 'page-leave 1s ease');
}
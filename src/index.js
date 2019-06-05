// Include styles.
import "./scss/style.scss";

// Include scripts and libraries.
import popper from "popper.js";
import "../node_modules/bootstrap/js/dist/collapse.js";
import "../node_modules/bootstrap/js/dist/tooltip.js";
import "ion-rangeslider";


$(function () {
  $('.range-slider').ionRangeSlider();
});
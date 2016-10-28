// JavaScript
window.sr = ScrollReveal();
sr.reveal('img:not(.no-reveal), .panel-heading', { distance: '30px', duration: 600, scale: 0.95 });
//
$(function() {
  $('a[href*="#about"]:not([href="#"]), a[href*="#how-it-works"]:not([href="#"]), a[href*="#why-use-explaain"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 600);
        return false;
      }
    }
  });
});

// Semantic UI popups
var popupVars;
if ($( window ).width() > 750) {
  popupVars = {
    on    : 'click',
    position: 'top center',
    lastResort: 'top center',
    boundary: $('body')
  };
} else {
  popupVars = {
    on    : 'click',
    position: 'top center',
    lastResort: 'top center',
    boundary: $('body'),
    target: $('.landing-bot-2'),
    distanceAway: -70
  }
}
$('a.brexit').popup( popupVars );

function jiggleButton() {
  $('.main-button')
    .transition('jiggle')
  ;
  myTimeout = myTimeout + 10000;
  window.setTimeout(jiggleButton, myTimeout);
}
var myTimeout = 15000;
window.setTimeout(jiggleButton, myTimeout);

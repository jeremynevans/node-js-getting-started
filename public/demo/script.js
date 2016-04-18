var cards;
// cards = [
//   {
//     title: '',
//     body: '<a href="#6">The FBI</a> <a href="#7">announced on 22 March</a> it had partnered with an <a href="#8">unnamed third party</a> to gain access to the <a href="#9">iPhone</a> without <a href="#10">Apple\'s</a> help.',
//     image: '',
//     topic: ''
//   },
//   {
//     title: '',
//     body: 'The FBI has managed to hack into the iPhone of one of the San Bernadino gunmen without the help of Apple, who were refusing despite a court order.',
//     image: 'sample1.png',
//     topic: 'Apple vs FBI'
//   }
// ];
var cardDOM;



$.doctop({
  url: 'https://docs.google.com/document/d/1BgNrI3z6tnDtayH0L4mEJqu1C9PjJ8sscVw6vr41s_0/pub',
  archieml: true,
  callback: function(d){
    console.dir(d);
    cards = d.copy.archie.cards;
    createAndOpen(0, null, true);
  }
});

var cardTemplate = function (title, body, image, topic, showHeaderImage) {
  if (!image) {
    image = 'https://pixabay.com/static/uploads/photo/2015/12/29/13/13/drone-1112752_960_720.jpg';
  }
  var template = '<div class="card closed">' // style="margin-top: -130px;">'
  +                '<div class="card-visible">';
  if (showHeaderImage) {
    template +=  '<div class="header-image">'
            +      '<img src="' + image + '">'
            +      '<h3>'
            +        topic
            +      '</h3>'
            +    '</div>';
  };
  template +=  '<h2>'
          +       title
          +       '</h2>'
          +       '<div class="body-content">'
          +         '<p>'
          +           body.replace(/\s/g,' ')
          +         '</p>'
          +       '</div>'
          +     '</div>'
          +     '<div class="card-spacer"></div>'
          +   '</div>';
    return template;
};

var open = function(cardDOM) {
  $('.card').addClass('faded');
  cardDOM.removeClass('faded closed');
    $('.card .card-visible').each(function() {
      var newZIndex = parseInt($(this).css('z-index')) - 1;
      $(this).css('z-index',newZIndex);
    });
    cardDOM.find('.card-visible').css('z-index',10);
    $('html,body').animate({scrollTop: cardDOM.offset().top - 50},'slow');
}

var createAndOpen = function(cardKey, openerCard, showHeaderImage) {
  var card = cards[cardKey];
  var template = cardTemplate('', card.body, card.image, card.topic, showHeaderImage);
  var cardDom;
  if (openerCard) {
    cardDOM = $(template).insertAfter(openerCard);
  } else {
    cardDOM = $(template).appendTo('.cards');
  }
  window.setTimeout(function() {
    cardDOM.find('.card-spacer').css('height', cardDOM.find('.card-visible').height()/2);
    open(cardDOM);
    $('html,body').animate({scrollTop: cardDOM.offset().top - 150},'slow');
  }, 100);
}

$(".cards").on("click", "a", function(e){
  var cardToOpen = $(this).attr('href').substring(1);
  createAndOpen(cardToOpen, $(this).parents('.card')[0]);
  e.stopPropagation();
});

$(".cards").on("click", ".card", function(){
  open($(this));
});

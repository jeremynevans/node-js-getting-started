var cards = {}; // object with key ids
var cardLists = []; cardLists[0] = [];
var focusPosition = [];

$.doctop({
  url: 'https://docs.google.com/document/d/1BgNrI3z6tnDtayH0L4mEJqu1C9PjJ8sscVw6vr41s_0/pub',
  archieml: true,
  callback: function(d){
    console.dir(d);
    tempCards = d.copy.archie.cards;
    openCard(0, null);
    for (i=0; i<tempCards.length; i++) {
      if (tempCards[i].id != "") {
        cards[tempCards[i].id] = tempCards[i];
      }
    }
  }
});

var cardTemplate = function (title, body, image, topic, showHeaderImage) {
  if (!image) {
    image = 'http://placekitten.com/300/200';
  }
  var template =  '<div class="card closed">'
  +                 '<div class="card-visible">'
  +                   '<div class="card-grey"></div>';
  if (showHeaderImage) {
    template +=       '<div class="header-image">'
              +         '<img src="' + image + '">'
              +         '<h3>'
              +           topic
              +         '</h3>'
              +       '</div>';
  };
  template +=         '<h2>'
              +         title
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

var focusOnCardDOM = function(cardDOM) {
  $('.card').addClass('faded');
  cardDOM.removeClass('faded closed');
    $('.card .card-visible').each(function() {
      var newZIndex = parseInt($(this).css('z-index')) - 1;
      $(this).css('z-index',newZIndex);
    });
    cardDOM.find('.card-visible').css({ 'z-index': 10, 'width': cardDOM.find('.card-spacer').css('width') });
    $('html,body').animate({scrollTop: cardDOM.offset().top - 80},'slow');
}

var openCardDOM = function(cardKey, openerCard) {
  var card = cards[cardKey];
  var template = cardTemplate(card.title, card.body, card.coverImage, card.topic, card.headline);
  var cardDOM;
  if (openerCard) {
    cardDOM = $(template).insertAfter(openerCard);
  } else {
    cardDOM = $(template).appendTo('.cards');
  }
  window.setTimeout(function() {
    cardDOM.find('.card-spacer').css('height', cardDOM.find('.card-visible').height()/2);
    focusOnCard(cardDOM);
  }, 100);
}

var getPosition = function(cardDOM) {
  return cardDOM.index();
}

var focusOnCard = function(cardDOM) {
  focusPosition = [0, cardDOM.index()];
  focusOnCardDOM(cardDOM);
}

var openCard = function(cardKey, openerCard) {
  if (openerCard) {
    var openPosition = getPosition(openerCard);
    cardLists[0].splice(openPosition, 0, cards[cardKey]);
  } else {
    cardLists[0].push(cards[cardKey]);
  }
  openCardDOM(cardKey, openerCard);
}

var closeCard = function(cardToClose) {
  var closePosition = getPosition(cardToClose);
  cardLists[0].splice(closePosition, 1);
}

/* Watch Functions for cardLists */
var onAdd = function(cardKey, insertPosition) {

}
var onRemove = function(cardKey) {

}


$(".cards").on("click", "a", function(){
  var cardToOpen = $(this).attr('href').substring(1);
  openCard(cardToOpen, $(this).parents('.card')[0]);
});

$(".cards").on("click", ".card", function(){
  var $target = $(event.target);
  if(!$target.is("a") ) {
    focusOnCard($(this));
  }
});

$( window ).resize(function() {
  $('.card').each(function() {
    $(this).find('.card-visible').css({ 'width': $(this).find('.card-spacer').css('width') });
  })
});

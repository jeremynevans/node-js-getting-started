var cards = {}; // object with key ids
var cardLists = []; cardLists[0] = [];
var focusPosition = [];
var tempCards;

$.doctop({
  url: 'https://docs.google.com/document/d/1BgNrI3z6tnDtayH0L4mEJqu1C9PjJ8sscVw6vr41s_0/pub',
  archieml: true,
  callback: function(d){
    console.dir(d);
    tempCards = d.copy.archie.cards;
    for (i=0; i<tempCards.length; i++) {
      if (tempCards[i].id != "") {
        cards[tempCards[i].id] = tempCards[i];
      }
    }
    openCard(0, null);
  }
});

var cardTemplate = function (id, title, body, image, topic, showHeaderImage) {
  if (!image) {
    image = 'http://placekitten.com/300/200';
  }
  var template =  '<div class="card closed" id="card-' + id + '">'
  +                 '<div class="card-visible">'
  +                   '<div class="card-grey"></div>'
  +                   '<i class="fa fa-times close" aria-hidden="true"></i>';
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


// These two functions not currently in use
var getCardDataFromDOM = function() { //Doesn't yet support multiple lists
  var existingCardList = [];
  $('.card').each(function(i, card) {
    existingCardList.push($(card).attr('id').split('-')[1]);
  });
  return existingCardList;
}
var updateCardDOM = function() { //Doesn't yet support multiple lists
  var currentCardLists = [getCardDataFromDOM()]; // Should be called oldCardList?
  cardLists[0].each(function(i, newCard) {
    if (newCard != currentCardLists[i]) {

    }
  });
}



var focusOnCardDOM = function(position) {
  var cardDOM = $('.cards .card:eq(' + position + ')');
  $('.card').addClass('faded');
  cardDOM.removeClass('faded closed');
    $('.card .card-visible').each(function() {
      var newZIndex = parseInt($(this).css('z-index')) - 1;
      $(this).css('z-index',newZIndex);
    });
    cardDOM.find('.card-visible').css({ 'z-index': 10, 'width': cardDOM.find('.card-spacer').css('width') });
    $('html,body').animate({scrollTop: cardDOM.offset().top - 80},'slow');
}

var openCardDOM = function(cardKey, list, positionFrom) {
  var card = cards[cardKey];
  var template = cardTemplate(card.id, card.title, card.body, card.coverImage, card.topic, card.headline);
  var cardDOM;
  if (positionFrom != -1) {
    var openerCard = $('.cards .card:eq(' + positionFrom + ')');
    cardDOM = $(template).insertAfter(openerCard);
  } else {
    cardDOM = $(template).appendTo('.cards');
  }
  window.setTimeout(function() {
    cardDOM.find('.card-spacer').css('height', cardDOM.find('.card-visible').height()/2);
    focusOnCard(0, positionFrom + 1);
  }, 100);
}

var closeCardDOM = function(list, position) {
  $('.cards .card:eq(' + (position) + ')').fadeOut();
}

var getPosition = function(cardDOM) {
  console.log(cardDOM);
  return $('.card').index(cardDOM);
}

// The following functions maniupalate data, then the DOM in subsequent functions
var changeCardData = function(type, list, position1, position2) {
  switch (type) {
    case 'focus':
      focusOnCard(list, position1);
      break;
    case 'open':
      openCard(position1, position2);
      break;
    case 'close':
      closeCard(position1);
      break;
  }
  updateCardDOM();
}
var focusOnCard = function(list, position) {
  focusPosition[list] = position;
  focusOnCardDOM(position);
}
var openCard = function(cardToOpen, positionFrom) {
  if (positionFrom == null || positionFrom < 0) {
    positionFrom = cardLists[0].length - 1;
  }
  var existingCard = cardLists[0].indexOf(cardToOpen);
  if (existingCard == -1) {
    cardInsert(cardToOpen, positionFrom + 1);
    // cardInsertDOM();
  } else {
    cardMove(0, existingCard, positionFrom + 1);
    // cardMoveDOM();
  }
  
  cardInsert(cardToOpen, positionFrom);
  openCardDOM(cardToOpen, 0, positionFrom);
}
var closeCard = function(cardToClose) {
  var closePosition = getPosition(cardToClose);
  cardSplice(0, closePosition, 1);
  //DOM function here?
}


var cardInsert = function(cardToOpen, positionFrom) { // Doesn't handle closing the card at the old position - this should already be handled
  cardLists[list].splice(pos, remove, key);
}


/* Explaain Card Array Functions */

var cardMove = function(list, moveFrom, moveTo) {
  var key = cardLists[list][moveFrom];
  cardSplice(list, moveFrom, 1);
  if (moveTo > moveFrom) { moveTo--; } //Adjust moveTo to reflect the fact that moveFrom has been remove and the array is now shorter
  cardSplice(list, moveTo, 0, key);
}
var cardPush = function(list, key) { // Not currently in use
  cardLists[list].push(key);

}
var cardSplice = function(list, pos, remove, key) { /* Only works for splicing one item into array */
  if (key == undefined) {
    cardLists[list].splice(pos, remove);
    for (var i = 0; i < remove; i++) {
      if (focusPosition[list] == pos+i) {
        focusOnCard(list, pos-1);
      }
      closeCardDOM(list, pos+i);
    }
  } else {
    cardLists[list].splice(pos, remove, key);
  }
}

//UI Interaction
$(".cards").on("click", "a", function(){
  var cardToOpen = $(this).attr('href').substring(1); //Key of card to open
  var position = getPosition($(this).parents('.card')[0]);
  openCard(cardToOpen, position);
});
$(".cards").on("click", "i.close", function(){
  var card = $(this).closest('.card');
  closeCard($('.card').index(card));
});
$(".cards").on("click", ".card", function(){
  if(!$(event.target).is("a") ) {
    focusOnCard(0, $('.card').index(this));
  }
});


$( window ).resize(function() {
  $('.card').each(function() {
    $(this).find('.card-visible').css({ 'width': $(this).find('.card-spacer').css('width') });
  })
});

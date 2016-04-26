var cards = {}; // object with key ids
var cardLists = []; cardLists[0] = [];
var focusPosition = [];
var tempCards;

$.doctop({
  url: 'http://docs.google.com/document/d/1BgNrI3z6tnDtayH0L4mEJqu1C9PjJ8sscVw6vr41s_0/pub',
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
  +                   '<div class="card-grey"><div></div></div>'
  +                   '<i class="fa fa-times close" aria-hidden="true"></i>';
  if (showHeaderImage) {
    template +=       '<div class="header-image">'
              +         '<img src="' + image + '">'
              +         '<h3>'
              +           topic
              +         '</h3>'
              +       '</div>';
  } else {
    template +=       '<h2>'
              +         title
              +       '</h2>'
  };
  template +=         '<div class="body-content">'
              +         '<p>'
              +           body.replace(/\s/g,' ')
              +         '</p>'
              +       '</div>'
              +     '</div>'
              +     '<div class="card-spacer"></div>'
              +   '</div>';
  return template;
};

// DOM Requests
var getKeyFromCardDOM = function(list, pos) { // Doesn't select list yet
  return $('.cards .card:not(.removed):eq(' + pos + ')').attr('id').split('-')[1];
}
var getPosition = function(cardDOM) {
  return $('.card:not(.removed)').index(cardDOM);
}



// Manipulate Card DOM
var focusCardDOM = function(position) {
  var cardDOM = $('.cards .card:not(.removed):eq(' + position + ')');
  $('.card').addClass('faded');
  cardDOM.removeClass('faded closed');
  $('.card .card-visible').each(function() {
    var newZIndex = parseInt($(this).css('z-index')) - 1;
    $(this).css('z-index',newZIndex);
  });
  console.log(cardDOM.find('.card-spacer').css('width'));
  // cardDOM.find('.card-visible').css({ 'width': cardDOM.find('.card-spacer').css('width') }); // Not sure if still necessary?
  $('html,body').stop().animate({scrollTop: cardDOM.offset().top - 80},'slow');
  setZValues();
}
var addCardDOM = function(list, cardKey, position) {
  console.log(list, cardKey, position);
  var card = cards[cardKey];
  var template = cardTemplate(card.id, card.title, card.body, card.coverImage, card.topic, card.headline);
  var cardDOM;
  if (position != -1 && $('.card:not(.removed)').length) { //Doesn't yet handle multiple lists
    var openerCard = $('.cards .card:not(.removed):eq(' + (position-1) + ')');
    cardDOM = $(template).insertAfter(openerCard);
  } else {
    cardDOM = $(template).appendTo('.cards');
  }
  window.setTimeout(function() {
    cardDOM.find('.card-spacer').css('height', cardDOM.find('.card-visible').height()/2);
    // focusCard(0, position);
  }, 100);
}
var removeCardDOM = function(list, position) {
  $('.cards .card:not(.removed):eq(' + (position) + ')').addClass('removed').fadeOut(300, function() { $(this).remove(); }); // Needs to change height gradually
}
var moveCardDOM = function(list, moveFrom, moveTo) { // This should soon have a move animation instead of just removing then adding
  var key = getKeyFromCardDOM(list, moveFrom);
  console.log(key, moveFrom, moveTo);
  addCardDOM(0, key, moveTo);
  removeCardDOM(0, moveFrom); // moveFrom has already been adjusted and passed here from moveCard function
}
var setZValues = function() { // Doesn't yet handle multiple lists
  $('.card:not(.removed)').each(function(i, card) {
    var zValue = 1000 - Math.abs(i - focusPosition[0]);
    var zScale = 1 - Math.pow(0.6, Math.abs(i - focusPosition[0]));
    console.log(zScale);
    $(card).find('.card-visible').css({'z-index': zValue, 'transform': 'scale(' + (1 - zScale/4) + ',' + (1 - zScale/4) + ')'});
    $(card).find('.card-grey').css('background', 'rgba(221,221,221,' + zScale + ')');
  });
}

// Top-level commands (data manipulation which relies on Specific Card Functions)
var openCard = function(cardToOpen, positionFrom) {
  if (positionFrom == null || positionFrom < 0) {
    positionFrom = cardLists[0].length - 1;
  }
  var existingCardPos = cardLists[0].indexOf(cardToOpen);
  if (existingCardPos == -1) {
    addCard(0, cardToOpen, positionFrom + 1);
  } else {
    moveCard(0, existingCardPos, positionFrom + 1);
  }
    focusCard(0, positionFrom + 1);
}
var closeCard = function(list, cardPos) {
  removeCard(list, cardPos);
  if (focusPosition[list] == cardPos) {
    focusCard(list, cardPos-1);
  }
}

// Specific Card Functions that trigger, and correspond to, DOM Functions
var focusCard = function(list, position) {
  if (position >= 0 && position < cardLists[list].length) {
    focusPosition[list] = position;
    window.setTimeout(function() {
      focusCardDOM(position);
    }, 10);
  }
}
var addCard = function(list, cardKeyToOpen, position) {
  insertCard(list, cardKeyToOpen, position);
  addCardDOM(0, cardKeyToOpen, position);
}
var removeCard = function(list, pos) {
  deleteCard(list, pos);
  removeCardDOM(list, pos);
}
var moveCard = function(list, moveFrom, moveTo) {
  var key = cardLists[list][moveFrom];
  insertCard(list, key, moveTo);
  if (moveTo < moveFrom) { moveFrom++; } //Adjusts moveFrom to reflect the fact that moveTo has been inserted and pushed subsquent elements forward
  deleteCard(list, moveFrom);
  moveCardDOM(0, moveFrom, moveTo);
}

// General Card Functions (used by Specific Card Functions)
var insertCard = function(list, cardKeyToOpen, position) {
  cardLists[list].splice(position, 0, cardKeyToOpen);
}
var deleteCard = function(list, pos) {
  cardLists[list].splice(pos, 1);
}



//UI Interaction
$(".cards").on("click", "a", function(){
  var cardToOpen = $(this).attr('href').substring(1); //Key of card to open
  var position = getPosition($(this).parents('.card')[0]);
  openCard(cardToOpen, position);
});
$(".cards").on("click", "i.close", function(){
  var card = $(this).closest('.card');
  closeCard(0, getPosition(card));
});
$(".cards").on("click", ".card", function(){
  if(!$(event.target).is("a") && !$(event.target).is("i.close") ) {
    focusCard(0, getPosition(this));
  }
});


$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        break;

        case 38: // up
        focusCard(0, focusPosition[0]-1);
        break;

        case 39: // right
        break;

        case 40: // down
        focusCard(0, focusPosition[0]+1);
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});


$('.cards').on("click", function() {
  printCards();
});



var printCards = function() {
  window.setTimeout(function() {
    $.each(cardLists[0], function(i, card) {
      var selected = i == focusPosition[0] ? '*' : '';
      console.log(selected + i + ' - ' + card + ': ' + cards[card].title);
    });
  }, 100);
}

$( window ).resize(function() {
  $('.card').each(function() {
    $(this).find('.card-visible').css({ 'width': $(this).find('.card-spacer').css('width') });
  });
});

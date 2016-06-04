var cards = {}; // object with key ids
var cardLists = []; cardLists[0] = [];
var focusPosition = [];
var tempCards;
var waitingForDoctop = true;

$.doctop({
  url: '//docs.google.com/document/d/1AkZzRKeVMWA2LDv3pCk4KCR6ztKtdCMjrxvYycYABr0/pub',
  archieml: true,
  callback: function(d){
    if (waitingForDoctop) {
      waitingForDoctop = false;
      console.dir(d);
      tempCards = d.copy.archie.cards;
      for (i=0; i<tempCards.length; i++) {
        if (tempCards[i].id != "") {
          cards[tempCards[i].id] = tempCards[i];
        }
      }
      openCard(0, null);
    }
  }
});

window.setTimeout(function() {
  if (waitingForDoctop) {
    waitingForDoctop = false;
    console.log('Doctop not loaded - using backup data...');
    cards = $.parseJSON('{"0":{"id":"0","topic":"Trump Backs Brexit","title":"","body":"<a href=\'#1\'>Donald Trump</a> has <a href=\'#2\'>backed Brexit</a> ahead of <a href=\'#3\'>next month’s referendum</a>, <a href=\'#4\'>blaming the migration crisis on the EU</a>.","headline":"true","coverImage":"https://assets.donaldjtrump.com/site/hero_image_main_2.jpg","draftOrAuthor":""},"1":{"id":"1","topic":"","title":"Donald Trump","body":"A <a href=\'#5\'>controversial</a> <a href=\'#6\'>businessman and celebrity</a>, now <a href=\'#7\'>the Republican presumptive nominee</a> for <a href=\'#8\'>the US presidential elections</a>.","draftOrAuthor":"draft"},"2":{"id":"2","topic":"","title":"","body":"<a href=\'#1\'>Trump</a> said <a href=\'#11\'>the UK is \'better off\' without the EU</a>, though <a href=\'#10\'>stating it wasn’t a recommendation</a>, and <a href=\'#12\'>criticised Obama for backing the Remain Campaign</a>.","draftOrAuthor":"draft"},"3":{"id":"3","topic":"","title":"EU Referendum","body":"<a href=\'#18\'>Britain will hold a referendum in June</a> on <a href=\'#19\'>whether to leave</a> the <a href=\'#21\'>European Union</a>, a debate that <a href=\'#20\'>is increasingly dividing national opinion</a>.","draftOrAuthor":"draft"},"4":{"id":"4","topic":"","title":"","body":"<a href=\'#1\'>Trump</a> said <a href=\'#17\'>the migration crisis was \'a horrible thing for Europe\' and \'pushed by the EU\'</a>, following <a href=\'#14\'>previous controversial comments on immigration</a>.","draftOrAuthor":"draft"},"5":{"id":"5","topic":"","title":"","body":"<a href=\'#1\'>Trump</a>’s many controversies include...","draftOrAuthor":"draft"},"6":{"id":"6","topic":"","title":"","body":"<a href=\'#1\'>Trump</a> is known for several businesses including casinos, golf courses, hotels and real estate, along with TV appearances like The Apprentice and WWE.","draftOrAuthor":"draft"},"7":{"id":"7","topic":"","title":"","body":"<a href=\'#1\'>Trump</a> became the presumptive nominee for the Republican party after Ted Cruz announced he was dropping out of the presidential race.","draftOrAuthor":"draft"},"8":{"id":"8","topic":"","title":"2016 US Presidential Elections","body":"Donald Trump and Hillary Clinton are set to be the candidates in an unconventional Presidential race.","draftOrAuthor":"draft"},"9":{"id":"9","topic":"","title":"","body":"","draftOrAuthor":"draft"},"10":{"id":"10","topic":"","title":"","body":"<a href=\'#1\'>Trump</a> said his opinion over Brexit was just \'his feeling\' and he wouldn\'t make any formal recommendations.","draftOrAuthor":"draft"},"11":{"id":"11","topic":"","title":"UK “better off” without the EU","body":"Text","draftOrAuthor":"draft"},"12":{"id":"12","topic":"","title":"","body":"Barack Obama officially supported David Cameron’s campaign to remain in the EU, saying leaving it would affect trade between UK and the US.","draftOrAuthor":"draft"},"13":{"id":"13","topic":"","title":"Migration crisis","body":"Text","draftOrAuthor":"draft"},"14":{"id":"14","topic":"","title":"","body":"<a href=\'#1\'>Trump</a> called <a href=\'#15\'>for a temporary ban on Muslims entering the US</a>, prompting <a href=\'#16\'>a debate over his access to the UK</a>.","draftOrAuthor":"draft"},"15":{"id":"15","topic":"","title":"","body":"<a href=\'#1\'>Trump</a>’s proposal was announced last December after the attack in San Bernardino, California, which was inspired by terrorist group Isis.","draftOrAuthor":"draft"},"16":{"id":"16","topic":"","title":"","body":"Half a million people signed a petition asking for Trump to be barred from entering the UK because of his remarks over Muslims.","draftOrAuthor":"draft"},"17":{"id":"17","topic":"","title":"","body":"<a href=\'#1\'>Donald Trump</a>","draftOrAuthor":"draft"},"18":{"id":"18","topic":"","title":"","body":"The EU Referendum will be held on 23 June, with the question: ‘Should the UK remain a member of the EU or leave the EU?’. It will be Britain’s second EU referendum.","draftOrAuthor":"draft"},"19":{"id":"19","topic":"","title":"The Brexit debate","body":"The main issues relate to economics, borders, sovereignty and how Britain’s relationship with Europe would change.","draftOrAuthor":"draft"},"20":{"id":"20","topic":"","title":"","body":"The ‘Brexit’ debate has divided the country into Eurosceptics who wish to leave, and Pro-EU backers who wish to remain. The debate also splits citizens based on region and across political parities, age, and educational backgrounds. The main campaigns are Remain to stay in, and Vote Leave and Leave.EU to exit.","draftOrAuthor":"draft"},"21":{"id":"21","topic":"","title":"European Union","body":"The EU is the politico-economic union of 28 member states that are located primarily in Europe. Originally created after WWII to encourage trade in the hopes that it would prevent future conflict, over the years, the duties have evolved and in 1993 the EU in its single-market capacity was created.","draftOrAuthor":"draft"}}');
    openCard(0, null);
  }
}, 3000);

var cardTemplate = function (id, title, body, image, topic, showHeaderImage) {
  console.log(id, title, body, image, topic, showHeaderImage);
  if (!image) {
    image = '//placekitten.com/300/200';
  }
  var template =  '<div class="card opening" id="card-' + id + '">'
  +                 '<div class="card-visible">'
  +                   '<div class="card-grey"><div></div></div>';
  if (showHeaderImage) {
    template +=       '<div class="header-image">'
              +         '<img src="' + image + '">'
              +         '<h3>'
              +           topic
              +         '</h3>'
              +       '</div>';
  } else {
    template +=       '<i class="fa fa-times close" aria-hidden="true"></i>'
              // +       '<h2>'
              // +         title
              // +       '</h2>'
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
  // console.log('focusCardDOM', position);
  var cardDOM = $('.cards .card:not(.removed):eq(' + position + ')');
  $('.card').addClass('faded').removeClass('opening');
  cardDOM.removeClass('faded');
  $('.card .card-visible').each(function() {
    var newZIndex = parseInt($(this).css('z-index')) - 1;
    $(this).css('z-index',newZIndex);
  });
  cardDOM.find('.card-visible').css({ 'width': cardDOM.find('.card-spacer').css('width') }); // Not sure why but this is still necessary! For when cards first load.
  $('html,body').stop().animate({scrollTop: cardDOM.offset().top - 80},'slow');
  setZValues();
  reDrawIfOutOfSync();
}
var addCardDOM = function(list, cardKey, position) {
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
    cardDOM.find('.card-spacer').css('height', cardDOM.find('.card-visible').height()/1.5);
    focusCard(0, position);
  }, 100);
  reDrawIfOutOfSync();
}
var removeCardDOM = function(list, position) {
  $('.cards .card:not(.removed):eq(' + (position) + ')').addClass('removed').fadeOut(500, function() { $(this).remove(); }); // Needs to change height gradually
  reDrawIfOutOfSync();
}
var moveCardDOM = function(list, moveFrom, moveTo) { // This should soon have a move animation instead of just removing then adding
  var key = getKeyFromCardDOM(list, moveFrom);
  addCardDOM(0, key, moveTo);
  var newMoveFrom = moveTo < moveFrom ? moveFrom+1 : moveFrom; //Reflects the fact that moveTo has been inserted and pushed subsquent elements forward
  removeCardDOM(0, newMoveFrom); // moveFrom has already been adjusted and passed here from moveCard function
  reDrawIfOutOfSync();
}
var setZValues = function() { // Doesn't yet handle multiple lists
  $('.card:not(.removed)').each(function(i, card) {
    var zValue = 1000 - Math.abs(i - focusPosition[0]);
    var zScale = 1 - Math.pow(0.6, Math.abs(i - focusPosition[0]));
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
    if (cardPos == cardLists[list].length) {
      focusCard(list, cardPos-1);
    } else {
      focusCard(list, cardPos);
    }
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
  var newMoveFrom = moveTo < moveFrom ? moveFrom+1 : moveFrom; //Reflects the fact that moveTo has been inserted and pushed subsquent elements forward
  deleteCard(list, newMoveFrom);
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

var reDrawIfOutOfSync = function() {
  window.setTimeout(function() {
    if (!checkSync()) {
      reDrawCards();
    }
  }, 500);
}
var checkSync = function() {
  var inSync = true;
  $('.card:not(.removed)').each(function(i, card) {
    var focusedDOM = !$(card).hasClass('faded');
    var focusedData = i == focusPosition[0];
    var keyDOM = getKeyFromCardDOM(0,i);
    var keyData = cardLists[0][i];
    if (focusedDOM != focusedData || keyDOM != keyData) {
      inSync = false;
    }
  });
  return inSync;
}
var reDrawCards = function() { // If DOM cards don't match card data then run this to sort everything out (currently just refocuses correctly)
  console.log('Something got out of sync so we\'re redrawing the cards in the DOM');
  focusCard(0,focusPosition[0]);
}


$('.cards').on("click", function() {
  // printCards();
});



var printCards = function() {
  window.setTimeout(function() {
    $.each(cardLists[0], function(i, key) {
      var focused = i == focusPosition[0] ? '*' : '';
      console.log(focused + i + ' - ' + key + ': ' + cards[key].title);
    });
    console.log('---------------');
    $('.card:not(.removed)').each(function(i, card) {
      var focused = !$(card).hasClass('faded') ? '*' : '';
      var key = getKeyFromCardDOM(0,i);
      console.log(focused + i + ' - ' + key + ': ' + cards[key].title);
    });
    console.log('===============');
  }, 100);
}

$( window ).resize(function() {
  $('.card').each(function() {
    $(this).find('.card-visible').css({ 'width': $(this).find('.card-spacer').css('width') });
  });
});

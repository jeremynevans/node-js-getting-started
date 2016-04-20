var cardDOM;

var cards = [
    {
      "id":"0",
      "topic":"Heathrow Drone",
      "title":"",
      "body":"<a href=\"#1\">A British Airways flight from Geneva</a> is <a href=\"#2\">believed to have hit a drone</a> before <a href=\"#8\">landing safely at Heathrow</a> airport, raising <a href=\"#3\">concerns over aviation safety</a>.",
      "headline": true,
      "draftOrAuthor":"yukiko"
    },
    {
      "id":"1",
      "topic":"Heathrow Drone",
      "title":"A British Airways flight",
      "body":"The flight BA727 from Geneva to Heathrow was carrying 132 passengers and 5 crew. <a href=\"#5\">The Airbus A320</a> plane <a href=\"#7\">was cleared to take off the next flight after being examined</a>.",
      "draftOrAuthor":"yukiko"
    },
    {
      "id":"2",
      "topic":"Heathrow Drone",
      "title":"Believed to have hit a drone",
      "body":"The pilot reported an object that is believed to be a drone struck the front of <a href=\"#1\">the flight</a>, and it would be the first incident of its kind in the UK if confirmed. \n        <a href=\"#6\">The investigation is underway</a>.",
      "draftOrAuthor":"yukiko"
    },
    {
      "id":"3",
      "topic":"Drone and aviation safety",
      "title":"Concerns over aviation safety and drone",
      "body":"<a href=\"#10\">Pilots have called for an investigation</a> into the likely effects of <a href=\"#9\">a drone strike on an aircraft</a> last month, following <a href=\"#4\">a report on their near-misses</a>.",
      "draftOrAuthor":"yukiko"
    },
    {
      "id":"4",
      "topic":"Drone and aviation safety",
      "title":"Report by the UK Airpox Board",
      "body":"There were 23 near-misses between drones and aircraft in the 6 months between April and October last year.",
      "draftOrAuthor":"yukiko"
    },
    {
      "id":"5",
      "topic":"Heathrow Drone",
      "title":"Airbus A320 family",
      "body":"The A320 manufactured by Airbus typically seats 150 passengers in a two-class cabin, and is commonly used by commercial flights.",
      "draftOrAuthor":"yukiko"
    },
    {
      "id":"6",
      "topic":"Heathrow Drone",
      "title":"Investigation on ‘drone’ claim",
      "body":"Police says no arrests have been made. \n        The British Airline will give the police “every assistance with their investigation”.",
      "draftOrAuthor":"yukiko"
    },
    {
      "id":"7",
      "topic":"Heathrow Drone",
      "title":"Quote",
      "body":"A British Airways spokesperson said: \n “Our aircraft landed safely, was fully examined by our engineers and it was cleared to operate its next flight”.",
      "draftOrAuthor":"yukiko"
    },
    {
      "id":"8",
      "topic":"Heathrow Drone",
      "title":"Landing safely at Heathrow airport",
      "body":"Despite a hit by an object, believed to be a drone, the flight with 132 passengers and 5 crew <a href=\"#7\">landed safely without damage to the aircraft</a>.",
      "draftOrAuthor":"yukiko"
    },
    {
      "id":"9",
      "topic":"Drone and aviation safety",
      "title":"Drone strike on aircraft",
      "body":"<a href=\"#11\">People who fly drones</a> close to planes could be convicted of endangering aviation safety, which has a maximum prison sentence of five years, according to the Civil Aviation Authority.",
      "draftOrAuthor":"yukiko"
    },
    {
      "id":"10",
      "topic":"Drone and aviation safety",
      "title":"Pilots have called for an investigation",
      "body":"The British Airline Pilots Association wants the Department for Transport and the Civil Aviation Authority to investigate into the effects of <a href=\"#9\">a drone strike on an aircraft</a>.",
      "draftOrAuthor":"yukiko"
    },
    {
      "id":"11",
      "topic":"Drone and aviation safety",
      "title":"People flying drones",
      "body":"<a href=\"#12\">The Civil Aviation Authority is focusing on educating people</a> who use dronse, fearing that many of them are not familiar with the legal issues.",
      "draftOrAuthor":"yukiko"
    },
    {
      "id":"12",
      "topic":"Drone and aviation safety",
      "title":"CAA and “dronecode”",
      "body":"The Civil Aviation Authority launched Dronecode to simplify the rules over drones.",
      "draftOrAuthor":"yukiko"
    }
];


// $.doctop({
//   url: 'https://docs.google.com/document/d/1BgNrI3z6tnDtayH0L4mEJqu1C9PjJ8sscVw6vr41s_0/pub',
//   archieml: true,
//   callback: function(d){
//     console.dir(d);
//     cards = d.copy.archie.cards;
//     createAndOpen(0, null, true);
//   }
// });

var cardTemplate = function (title, body, image, topic, showHeaderImage) {
  if (!image) {
    image = 'https://pixabay.com/static/uploads/photo/2015/12/29/13/13/drone-1112752_960_720.jpg';
  }
  var template =  '<div class="card">' // style="margin-top: -130px;">'
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
              +           body//.replace(/\s/g,' ')
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
    cardDOM.find('.card-visible').css({ 'z-index': 10, 'width': cardDOM.find('.card-spacer').css('width') });
    $('html,body').animate({scrollTop: cardDOM.offset().top - 80},'slow');
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
  }, 100);
}

$(".cards").on("click", "a", function(){
  var cardToOpen = $(this).attr('href').substring(1);
  openCard(cardToOpen, $(this).parents('.card')[0]);
});

$(".cards").on("click", ".card", function(){
  var $target = $(event.target);
  if(!$target.is("a") ) {
    open($(this));
  }
});

$( window ).resize(function() {
  $('.card').each(function() {
    $(this).find('.card-visible').css({ 'width': $(this).find('.card-spacer').css('width') });
  })
});



var data = Bind({
  cardList: []
} , {
  cardList: {
    dom: '#main-cards',
    transform: function (card, i) {
      console.log(i);
      var template = cardTemplate('', card.body, card.image, card.topic, card.headline);
      return template;
	  },
  }
});

var openCard = function(cardKey, openPosition) {
  if (openPosition) {
    data.cardList.splice(openPosition, 0, cards[cardKey]);
  } else {
    data.cardList.push(cards[cardKey]);
  }
}

openCard(0, null);

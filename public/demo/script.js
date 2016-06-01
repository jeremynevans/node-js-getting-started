var cards = {}; // object with key ids
var cardLists = []; cardLists[0] = [];
var focusPosition = [];
var tempCards;
var waitingForDoctop = true;
var ongoingKeyCounter = 0;
var layers = 1;

$.doctop({
  url: '//docs.google.com/document/d/1BgNrI3z6tnDtayH0L4mEJqu1C9PjJ8sscVw6vr41s_0/pub',
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
      // openCard(0, null);
    }
  }
});

window.setTimeout(function() {
  // if (waitingForDoctop) {
    waitingForDoctop = false;
    console.log('Doctop not loaded - using backup data...');
    cards = {"0":{"id":"0","topic":"Heathrow Drone","title":"Drone hits Heathrow plane","body":"<a href=\"#1\">A British Airways flight from Geneva</a> is <a href=\"#2\">believed to have hit a drone</a> before <a href=\"#8\">landing safely at Heathrow</a> airport, raising <a href=\"#3\">concerns over aviation safety</a>.","headline":"true","coverImage":"https://pixabay.com/static/uploads/photo/2015/12/29/13/13/drone-1112752_960_720.jpg","draftOrAuthor":"yukiko"},"1":{"id":"1","topic":"Heathrow Drone","title":"A British Airways flight","body":"The flight BA727 from Geneva to Heathrow was carrying 132 passengers and 5 crew. <a href=\"#5\">The Airbus A320</a> plane <a href=\"#7\">was cleared to take off the next flight after being examined</a>.","draftOrAuthor":"yukiko"},"2":{"id":"2","topic":"Heathrow Drone","title":"Believed to have hit a drone","body":"The pilot reported an object that is believed to be a drone struck the front of <a href=\"#1\">the flight</a>, and it would be the first incident of its kind in the UK if confirmed. \n        <a href=\"#6\">The investigation is underway</a>.","draftOrAuthor":"yukiko"},"3":{"id":"3","topic":"Drone and aviation safety","title":"Concerns over aviation safety and drone","body":"<a href=\"#10\">Pilots have called for an investigation</a> into the likely effects of <a href=\"#9\">a drone strike on an aircraft</a> last month, following <a href=\"#4\">a report on their near-misses</a>.","draftOrAuthor":"yukiko"},"4":{"id":"4","topic":"Drone and aviation safety","title":"Report by the UK Airpox Board","body":"There were 23 near-misses between drones and aircraft in the 6 months between April and October last year.","draftOrAuthor":"yukiko"},"5":{"id":"5","topic":"Heathrow Drone","title":"Airbus A320 family","body":"The A320 manufactured by Airbus typically seats 150 passengers in a two-class cabin, and is commonly used by commercial flights.","draftOrAuthor":"yukiko"},"6":{"id":"6","topic":"Heathrow Drone","title":"Investigation on ‘drone’ claim","body":"Police says no arrests have been made. \n        The British Airline will give the police “every assistance with their investigation”.","draftOrAuthor":"yukiko"},"7":{"id":"7","topic":"Heathrow Drone","title":"Quote","body":"A British Airways spokesperson said: \n        “Our aircraft landed safely, was fully examined by our engineers and it was cleared to operate its next flight”.","draftOrAuthor":"yukiko"},"8":{"id":"8","topic":"Heathrow Drone","title":"Landing safely at Heathrow airport","body":"Despite a hit by an object, believed to be a drone, the flight with 132 passengers and 5 crew <a href=\"#7\">landed safely without damage to the aircraft</a>.","draftOrAuthor":"yukiko"},"9":{"id":"9","topic":"Drone and aviation safety","title":"Drone strike on aircraft","body":"<a href=\"#11\">People who fly drones</a> close to planes could be convicted of endangering aviation safety, which has a maximum prison sentence of five years, according to the Civil Aviation Authority.","draftOrAuthor":"yukiko"},"10":{"id":"10","topic":"Drone and aviation safety","title":"Pilots have called for an investigation","body":"The British Airline Pilots Association wants the Department for Transport and the Civil Aviation Authority to investigate into the effects of <a href=\"#9\">a drone strike on an aircraft</a>.","draftOrAuthor":"yukiko"},"11":{"id":"11","topic":"Drone and aviation safety","title":"People flying drones","body":"<a href=\"#12\">The Civil Aviation Authority is focusing on educating people</a> who use drones, fearing that many of them are not familiar with the legal issues.","draftOrAuthor":"yukiko"},"12":{"id":"12","topic":"Drone and aviation safety","title":"CAA and “dronecode”","body":"The Civil Aviation Authority launched Dronecode to simplify the rules over drones.","draftOrAuthor":"yukiko"}};

    var card = cards[0];
    var tempTemplate = cardTemplate(card.id, card.title, card.body, card.coverImage, card.topic, card.headline, true);
    tempTemplate = '<div class="layer" id="layer-0">' + tempTemplate + '</div>';
    cardDOM = $(tempTemplate).appendTo('.cards');
    console.log(cardDOM);
    window.setTimeout(function() {
      $('.card').removeClass('opening');
    }, 300);
    // openLayer([1,2,3],0);
  // }
}, 300);


var cardTemplate = function (id, title, body, image, topic, showHeaderImage, standalone) {
  if (!image) {
    image = '//placekitten.com/300/200';
  }
  var standaloneClass = standalone ? ' standalone' : '';
  var template =  '<div class="card opening' + standaloneClass + '" id="card-' + id + '" style="height: auto;">'
  +                 '<div class="card-visible">';
    // +                   '<div class="card-grey"><div></div></div>';
  if (showHeaderImage) {
    template +=         '<div class="header-image">'
                +         '<img src="' + image + '">'
                +         '<h3>'
                +           topic
                +         '</h3>'
                +       '</div>';
  } else {
    template +=         '<i class="fa fa-times close" aria-hidden="true"></i>'
                +       '<h2>'
                +         title
                +       '</h2>'
  };
  template +=           '<div class="body-content">'
                +         '<p>'
                +           body.replace(/\s/g,' ')
                +         '</p>'
                +       '</div>'
                +     '</div>'
                // +     '<div class="card-spacer"></div>'
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


var openLayer = function(layer, keys, slide) {
  var template = '';
  $.each(keys, function(i, key) {
    var card = cards[key];
    template = template + cardTemplate(card.id, card.title, card.body, card.coverImage, card.topic, card.headline);
  });
  template = '<div class="card-carousel layer layer-id-' + ongoingKeyCounter + '" id="layer-' + layer + '">' + template + '</div>';

  // template = '<div class="card-carousel">'
  //     + '<div style="background:blue; height: auto; width: 300px;">Hello</div>'
  //     + '<div style="background:blue; height: auto; width: 300px;">Hello<br>Hello</div>'
  //     + '<div style="background:blue; height: auto; width: 300px;">Hello</div>'
  //     + '</div>';

  cardDOM = $(template).appendTo('.cards');

  console.log(ongoingKeyCounter);

  // $('#' + (ongoingKeyCounter-1)).slick('unslick');
  $('.layer-id-' + ongoingKeyCounter).slick({
    dots: false,
    infinite: false,
    adaptiveHeight: true,
    centerMode: true,
    centerPadding: '15px',
    slidesToShow: 1,
    arrows: false,
    initialSlide: slide
  });

  layers++;
  ongoingKeyCounter++;

  $('.card').removeClass('opening');
  highlightLink(layer, slide);

  var scrollPos = cardDOM.offset().top;// + cardDOM.find('.card-visible').height() - document.body.clientHeight + 20;
  $('html,body').stop().animate({scrollTop: scrollPos},'slow');
}

var openCard = function(keys) {
  console.log(keys);
}


var getLayerNumber = function(layerDOM) {
  console.log($(layerDOM));
  var layer = layerDOM.closest('.layer').attr('id').split('-')[1];
  return layer;
}





//UI Interaction
$(".cards").on("click", "a", function(){
  var slide = $(this).index();
  console.log(slide);
  temp = $(this);
  var layer = getLayerNumber($(this));
  var allKeys = [];
  $.each($(this).closest('.body-content').find('a'), function(i, link) {
    console.log(link);
    allKeys.push($(link).attr('href').substring(1));
  });
  layer++;
  console.log(layer);
  console.log(layers);
  if (layer == layers) {
    openLayer(layer, allKeys, slide);
  } else {
    $('#layer-' + layer).slick('slickGoTo', slide);
  }
});
$(".cards").on("click", "i.close", function(){
  var card = $(this).closest('.card');
  closeCard(0, getPosition(card));
});
// $(".cards").on("click", ".card", function(){
//   if(!$(event.target).is("a") && !$(event.target).is("i.close") ) {
//     focusCard(0, getPosition(this));
//   }
// });


// On before slide change
$('.cards').on('beforeChange', '.card-carousel', function(event, slick, currentSlide, nextSlide){
  var layer = getLayerNumber($(this));
  highlightLink(layer, nextSlide);
});

var highlightLink = function(layer, slide) {
  layer--; slide++;
  $('#layer-' + layer).find('.body-content a').removeClass('active');
  $('#layer-' + layer).find('.body-content a:nth-child(' + slide + ')').addClass('active');
}


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

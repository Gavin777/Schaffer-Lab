var sliders = new Array();
var sliderConfig = {
  minSlides: 3,
  maxSlides: 3,
  auto: true,
  speed: 1000,
  slideMargin: 10,
  autoControls: true,
  slideWidth: 500,
  autoControlsCombine: true
};

// Takes in a list of people and returns a HTML table
var makeHTMLTable = function(listOfPeople) {
  var result = "<table class=\"table\">";
  for (var i = 0; i < listOfPeople.length; i++) {
    if (i % 3 == 0) { // 3 is the number of rows
      // close and start a new row
      result += "</tr><tr>";
    }
    result += makeHTMLCell(listOfPeople[i]);
  }
  result+= "</tr></table>";

  return result;
};

// Takes in a person and returns a HTML cell
var makeHTMLCell = function (person) {
  var result = "<td>";
  if (person.htmlDescription) {
    result += "<a class=\"personLink\" href=\"#" + person.lastName + "_" + person.firstName + "\">" + person.name + "</a>";
  } else {
    result += person.name;
  }
  result += "</td>";
  return result;
}

// Takes in a name and returns a HTML cell in the Alumni section
// makeHTMLAlumniCell (write later)

// Takes in a person and returns a HTML snippet
var makeHTMLPage = function(person) {
  var result = '<div class="container webpage" id="' + person.lastName + "_" + person.firstName + '">';
  result += '<div class="page-header">';
  result += "<h1>" + person.firstName + " " + person.lastName + "</h1>";
  result += "</div>";
  result += person.htmlDescription;
  result += "</div>";
  return result;
}

var processPeoplePage = function() {
  htmlToAdd = makeHTMLTable(listOfGradStudents);
  $("#ourgroup").append(htmlToAdd);
};

var loadHTMLPage = function(hashtext) {
  var person = dictionaryOfPeople[hashtext];
  $(".navbar-default").after(makeHTMLPage(person));
  var imageNameToFetch = person.imgType ? hashtext + "." + person.imgType : "placeholder.png";
  var img = $('<img class="regular" alt="" width="20%">').attr('src', 'img/People/' + imageNameToFetch)
    .load(function() {
      if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
        alert("Bad image!!");
      }
      $("#" + hashtext).find(".page-header").after(img);
    });
};

var processActivePage = function(hashtext) {
  $(".webpage").hide();
  $(".nav.navbar-nav li").removeClass('active');

  hashtext = hashtext || window.location.hash.substring(1) || "home";

  if (hashtext.indexOf("_") > -1) {
    if ($("#" + hashtext).length != 0) {
      $("#" + hashtext).fadeIn();
    } else { // need to generate HTML page plus fetch image
      loadHTMLPage(hashtext);
    };
    return;
  }

  $("#" + hashtext).fadeIn();
  $("#nav" + hashtext).addClass('active');


  if (hashtext == "home" || hashtext == "interests") {
    $.each(sliders, function(i, slider) { 
        slider.reloadSlider(sliderConfig);
    });
  }
}

var allSlidersClosure = function(dfd) {
  var count = 0;
  var numOfSliders = $('.bxslider').length;
  return function() {
    count++;
    console.log(count);
    if (count == numOfSliders) {
      setTimeout(processActivePage, 0);
    }
  };
};

$(document).ready(function(){

  processPeoplePage();

  $(".personLink").on('click', function(event) {
    event.stopPropagation();
    var hashtext = $(this).attr('href').substring(1);
    processActivePage(hashtext);
  });  

  var conditionalProcessActivePage = allSlidersClosure();

  // Assume that there is at least one slideshow in the entire website
  $('.bxslider').each(function(i, slider) {
    sliders[i] = $(slider).bxSlider({ onSliderLoad: conditionalProcessActivePage });
  });

  $(".nav.navbar-nav li").click(function() {
    var hashtext = $(this).attr('id').substring(3);
    processActivePage(hashtext);
  });

  $(".navbar-brand").click(function() {
    processActivePage("home");
  });

  $("#readmore").click(function() {
    processActivePage("interests");
  });

});

// listOfGradStudents = ['Bremer, Andrew', 'Bugaj, Lukasz', 'Chen, John', 'Day, Tim', 'Ekerdt, Barbara', 'Epstein, Benjamin', 'Kang, Mike', 'Kang, Philip', 'Limsirichai, Prajit', 'McFarland, Sean', 'Muckom, Riya', 'Ojala, David', 'Perea, Brian', 'Ramasubramanian, Anusuya', 'Repina, Nicole', 'Santiago-Ortiz, Jorge', 'Scheideler, Olivia', 'Spelke, Dawn', 'Sun, Sabrina']

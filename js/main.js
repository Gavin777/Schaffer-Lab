var sliders = new Array();
var dictionaryOfPeople = {};
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

var picasaConfig = {

  // General Settings
  username: 'schafferlabweb',
  mode: 'albums',
  popupPlugin: "colorbox",
  colorbox_config: {
    scalePhotos: false
  },

  // Settings for Album overview
  albumThumbSize: 160,
  showAlbumdate: false,
  sortAlbums: "ASC_DATE",

  // Setting for Photo overview
  maxResults: 999,
  thumbSize: 144,
  thumbCrop: true,

  removeAlbums: ["Schaffer"]
};

// Takes in a list of objects and returns a HTML table
var makeHTMLTable = function(listOfObjects, isAlumni) {
  var cellCreator = isAlumni ? makeHTMLAlumCell : makeHTMLCell;
  var result = "<table class=\"table\">";
  for (var i = 0; i < listOfObjects.length; i++) {
    if (i % 3 == 0) { // 3 is the number of rows
      // close and start a new row
      result += "</tr><tr>";
    }
    result += cellCreator(listOfObjects[i]);
  }
  if (listOfObjects.length % 3 == 1) {
    result += "<td></td><td></td>";
  } else if (listOfObjects.length % 3 == 2) {
    result += "<td></td>";
  }
  result+= "</tr></table>";

  return result;
};

var applyColorBox = function(className) {
  $('.' + className).colorbox( {
    rel: className,
    maxWidth: "900px",
    preloading: false,
    closeButton: false,    
    current: ""
  });
};

// Takes in a person and returns a HTML cell
var makeHTMLCell = function (person) {
  var result = "<td width=\"33%\">";
  result += "<p class=\"center\">";
  result += "<a href=\"#" + person.firstName + "_" + person.lastName + "\">" + person.lastName + ", " + person.firstName +
             ((person.Nickname) ? (" (" + person.Nickname + ")") : "") +
             "</a>";
  result += "</p></td>";
  return result;
}

// Takes in a name and returns a HTML cell in the Alumni section
var makeHTMLAlumCell = function(alumnus) {
  var result = "<td width=\"33%\">";
  result += "<p class=\"center\">";
  if (alumnus.Link) {
    result += "<a href=\"" + alumnus.Link + "\">" + "<strong><u>" + alumnus.Name + "</u></strong>" + "</a>"
  } else {
    result += "<strong><u>" + alumnus.Name + "</u></strong>";
  }
  if (alumnus["Former Education"]) {
    result += "<br />" + alumnus["Former Education"];
  }
  if (alumnus["Current Location"]) {
    result += "<br />" + alumnus["Current Location"];
  }
  result += "</p></td>";
  return result;
}

// Takes in a person and returns a HTML snippet
var makeHTMLPage = function(person) {
  var result = '<div class="container webpage" id="' + person.firstName + "_" + person.lastName + '">';
  result += '<div class="page-header">';
  result += "<h1>" + person.firstName +
    ((person.Nickname) ? (" (" + person.Nickname + ")") : "") +
    " " + person.lastName + "</h1>";
  result += "</div>";
  result += "<p>";
  result += "<strong>" + person.Occupation + "</strong>";
  result += (person.Department)
            ? "<br /><strong>Department: </strong>" + person.Department
            : "";
  result += (person["Former Education"])
            ? "<br /><strong>Former Education: </strong>" + person["Former Education"]
            : "";
  result += (person["Project group"])
            ? "<br /><strong>Project Group: </strong>" + person["Project group"]
            : "";                
  result += (person["Project title"])
            ? "<br /><strong>Project Title: </strong>" + person["Project title"]
            : "";
  result += (person["Project description"])
            ? "<br /><br /><strong>Project Description: </strong><br />" + person["Project description"]
            : "";                    
  result += "</div>";
  return result;
}

var processPeoplePage = function() {
  var listOfGradStudents = [],
      listOfScientists = [],
      listOfPostdocs = [],
      listOfScholars = [],
      listOfUndergraduates = [];

  for (var i = 0, len = listOfPeople.length, personOfInterest; i < len; i++) {   
    personOfInterest = listOfPeople[i];
    dictionaryOfPeople[personOfInterest.firstName + "_" + personOfInterest.lastName] = personOfInterest;
    if (personOfInterest.Occupation == "Graduate Student") {
      listOfGradStudents.push(personOfInterest);
    } else if (personOfInterest.Occupation == "Research Scientist") {
      listOfScientists.push(personOfInterest);
    } else if (personOfInterest.Occupation == "Postdoc") {
      listOfPostdocs.push(personOfInterest);
    } else if (personOfInterest.Occupation == "Visiting Scholar") {
      listOfScholars.push(personOfInterest);
    } else if (personOfInterest.Occupation == "Undergraduate") {
      listOfUndergraduates.push(personOfInterest);
    }
  };

  var htmlToAdd;
  htmlToAdd = makeHTMLTable(listOfGradStudents);
  $("#gradstudents").append(htmlToAdd);

  htmlToAdd = makeHTMLTable(listOfScientists);
  $("#scientists").append(htmlToAdd);

  htmlToAdd = makeHTMLTable(listOfPostdocs);
  $("#postdocs").append(htmlToAdd);

  htmlToAdd = makeHTMLTable(listOfScholars);
  $("#scholars").append(htmlToAdd);

  htmlToAdd = makeHTMLTable(listOfUndergraduates);
  $("#undergrads").append(htmlToAdd);          

  htmlToAdd = makeHTMLTable(listOfAlumni, true);
  $("#alumni").append(htmlToAdd);


};

var loadHTMLPage = function(hashtext) {
  var person = dictionaryOfPeople[hashtext];
  $(".navbar-default").after(makeHTMLPage(person));
  var imageNameToFetch = person["Img Type"] ? hashtext + "." + person["Img Type"] : "placeholder.png";
  var img = $('<img class="regular" alt="" width="20%">').attr('src', 'img/People/' + imageNameToFetch)
    .load(function() {
      if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
        console.log("Uh oh!");
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

// var processActivePage = function(hashtext) {
//   $("#home, #bio, #interests, #ourgroup, #publications, #meetings").hide();
// };

var mainClosure = function() {
  var count = 0;
  var numOfSliders = $('.bxslider').length;
  return function() {
    count++;
    if (count == numOfSliders + 1) {
      setTimeout(processActivePage, 0);
    }
  };
};

$(document).ready(function(){

  $( "#accordion" ).accordion({ heightStyle: "content", collapsible: true });

  processPeoplePage();

  $(window).hashchange( function() {
    processActivePage();
  } );

  var conditionalProcessActivePage = mainClosure();

  picasaConfig["onAlbumsEnd"] = conditionalProcessActivePage;
  $("#albums").pwi(picasaConfig);

  // Assume that there is at least one slideshow in the entire website
  $('.bxslider').each(function(i, slider) {
    sliders[i] = $(slider).bxSlider({ onSliderLoad: conditionalProcessActivePage });
  });

  $('.group1').colorbox( {
    rel: 'group1',
    maxWidth: "900px",
    preloading: false,
    closeButton: false,    
    current: ""
  });

  applyColorBox('group1');
  applyColorBox('group2');

});

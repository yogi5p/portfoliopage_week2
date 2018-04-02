// Leverage your knowledge of jQuery to create a web page that has at least six different elements
// that are changed with jQuery when you either click, hover, keyup, or dblclick. You should change the following:

// Font Color
// Font Size
// Background Color
// Font Type
// You will need to hide at least three elements as well.

$(document).ready(function() {
  $(".name").hover(
    function() {
      $(this).css("color", "Green");
    },
    function() {
      $(this).css("color", "Blue");
    }
  );

  $(".github").text("https://github.com/yogi5p");
  $(".yogi-linkedin").text("Yogita Patil on LinkedIn");
  $(".yogi-twitter").text("Yogita Patil on Twitter");

  $(".summary").click(function() {
    $(".summarydetails").hide();
  });
  $(".summary").dblclick(function() {
    $(".summarydetails").show();
  });
  $(".email").click(function() {
    $(this)
      .css("color", "magenta")
      .css("font-size", "20px");
  });
  $("#note").keyup(function() {
    $(this)
      .css("background-color", "orange")
      .css("font-family", "Georgia");
  });
});

var changeStyle = document.getElementById("originalstyle");

$(".togglebuttonnew").click(function(event) {
  event.preventDefault();
  myFunctionToChangeStyle();
});

function myFunctionToChangeStyle() {
  $(changeStyle).each(function() {
    //$(this).attr("href"); // this is the href for the link tag in the loop
    if ($(this).attr("href") === "./style.css") {
      $(this).attr("href", "./anotherstyle.css");
    } else {
      $(this).attr("href", "./style.css");
    }
  });
}

function loadDoc(url, callback) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callback(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function myFunctionToGetRepos(xhttp) {
  //create the containers to hold the git name and url
  let containerDiv = document.getElementById("yogi_gitrepos"); //$("<div>").attr("class", "container");
  let rowDiv = $("<div>").attr("class", "row");

  var data = xhttp.responseText;
  var jsonResponse = JSON.parse(data);

  let gitRepoName = $("<div>")
    .attr("class", "card media-col col-md-6")
    .append($("<h5>").html("Git Repository Name"));
  let gitRepoUrl = $("<div>")
    .attr("class", "card media-col col-md-6")
    .append($("<h5>").html("Git Repository Link"));

  rowDiv.append(gitRepoName).append(gitRepoUrl);

  rowDiv.appendTo(containerDiv);

  jsonResponse.forEach(function(repodetail) {
    //let gitRepoColDiv = $("<div>").attr("class", "card col-sm-6 m-2");
    let gitRepoName = $("<div>")
      .attr("class", "card media-col col-md-6")
      .append($("<h5>").html(repodetail.name));
    let gitRepoUrl = $("<div>")
      .attr("class", "card media-col col-md-6")
      .append(
        $("<a>")
          .attr("href", repodetail.html_url)
          .attr("target", "_blank")
          .html(repodetail.html_url)
      );

    let eachrowDiv = $("<div>").attr("class", "row");
    eachrowDiv.append(gitRepoName).append(gitRepoUrl);

    eachrowDiv.appendTo(containerDiv);

    //document.getElementById("yogi_gitrepos").innerHTML = xhttp.responseText;
  });
}

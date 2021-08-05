var nameArray = [];

var names;
var winner;

//add default options
$(document).ready(function () {
  fillDefaults();
});

function fillDefaults() {
  var defaultGamesArray = ["Overwatch", "Valorant", "Apex"];
  $.each(defaultGamesArray, function (index, value) {
    $(".preset-options").append(
      '<div class="preset-option" id="option-' +
        defaultGamesArray[index] +
        '"><span class="name">' +
        defaultGamesArray[index] +
        '</span><span class="remove"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 349.03 349.031" style="enable-background: new 0 0 349.03 349.031" xml:space="preserve"><path d="M349.03,141.226v66.579c0,5.012-4.061,9.079-9.079,9.079H216.884v123.067c0,5.019-4.067,9.079-9.079,9.079h-66.579   c-5.009,0-9.079-4.061-9.079-9.079V216.884H9.079c-5.016,0-9.079-4.067-9.079-9.079v-66.579c0-5.013,4.063-9.079,9.079-9.079   h123.068V9.079c0-5.018,4.069-9.079,9.079-9.079h66.579c5.012,0,9.079,4.061,9.079,9.079v123.068h123.067   C344.97,132.147,349.03,136.213,349.03,141.226z"/></svg></span></div>'
    );
  });
}

$("#pick").click(function () {
  $(".preset-option .name").map(function () {
    // return [$(this).data("value").split(",")];
    nameArray.push($(this).text());
  });

  // Get a random name, the winner
  winner = nameArray[Math.floor(Math.random() * nameArray.length)];

  var time = new Date().toString().split(" ");
  var timeZoneFormatted =
    time[0] +
    "-" +
    time[1] +
    "-" +
    time[2] +
    "-" +
    time[3] +
    "|" +
    time[4] +
    "-" +
    time[5];

  db.collection("rolls").doc(timeZoneFormatted).set({
    options: nameArray,
    selected: winner,
  });

  winner = "🎉" + " " + winner + " " + "🎉";

  // Display winner
  $("#world").addClass("open");
  $("#winner").addClass("open");
  $("#close").addClass("open");
  $("#winner").text(winner);
});

$("#close").click(function () {
  $("#world").removeClass("open");
  $("#winner").removeClass("open");
  $("#close").removeClass("open");

  $("header .preset-options").empty();
  fillDefaults();
});

$("#addToList").click(function () {
  // Get the input value
  addToList();
});

//enter functionality
$("#names").keypress(function (e) {
  if (e.which == 13) {
    addToList();
    return false; //<---- Add this line
  }
});

//add to list function
function addToList() {
  var newName = document.getElementById("names").value;

  if (newName != "") {
    //add to html
    var newOption = $(
      '<div class="preset-option" id="option-' +
        newName +
        '"><span class="name">' +
        newName +
        '</span><span class="remove"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 349.03 349.031" style="enable-background: new 0 0 349.03 349.031" xml:space="preserve"><path d="M349.03,141.226v66.579c0,5.012-4.061,9.079-9.079,9.079H216.884v123.067c0,5.019-4.067,9.079-9.079,9.079h-66.579   c-5.009,0-9.079-4.061-9.079-9.079V216.884H9.079c-5.016,0-9.079-4.067-9.079-9.079v-66.579c0-5.013,4.063-9.079,9.079-9.079   h123.068V9.079c0-5.018,4.069-9.079,9.079-9.079h66.579c5.012,0,9.079,4.061,9.079,9.079v123.068h123.067   C344.97,132.147,349.03,136.213,349.03,141.226z"/></svg></span></div>'
    );
    $(".preset-options").append(newOption);
    //empty input
    $("#names").val("");
  }
}

//remove option
$(".preset-options").on("click", "span.remove", function (events) {
  $(this).parents(".preset-option").remove();
});

// Confetti
(function () {
  var COLORS,
    Confetti,
    NUM_CONFETTI,
    PI_2,
    canvas,
    confetti,
    context,
    drawCircle,
    i,
    range,
    resizeWindow,
    xpos;

  NUM_CONFETTI = 350;

  COLORS = [
    [85, 71, 106],
    [174, 61, 99],
    [219, 56, 83],
    [244, 92, 68],
    [248, 182, 70],
  ];

  PI_2 = 2 * Math.PI;

  canvas = document.getElementById("world");

  context = canvas.getContext("2d");

  window.w = 0;

  window.h = 0;

  resizeWindow = function () {
    window.w = canvas.width = window.innerWidth;
    return (window.h = canvas.height = window.innerHeight);
  };

  window.addEventListener("resize", resizeWindow, false);

  window.onload = function () {
    return setTimeout(resizeWindow, 0);
  };

  range = function (a, b) {
    return (b - a) * Math.random() + a;
  };

  drawCircle = function (x, y, r, style) {
    context.beginPath();
    context.arc(x, y, r, 0, PI_2, false);
    context.fillStyle = style;
    return context.fill();
  };

  xpos = 0.5;

  //   document.onmousemove = function (e) {
  //     return (xpos = e.pageX / w);
  //   };

  window.requestAnimationFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  Confetti = class Confetti {
    constructor() {
      this.style = COLORS[~~range(0, 5)];
      this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
      this.r = ~~range(2, 6);
      this.r2 = 2 * this.r;
      this.replace();
    }

    replace() {
      this.opacity = 0;
      this.dop = 0.03 * range(1, 4);
      this.x = range(-this.r2, w - this.r2);
      this.y = range(-20, h - this.r2);
      this.xmax = w - this.r;
      this.ymax = h - this.r;
      this.vx = range(0, 2) + 8 * xpos - 5;
      return (this.vy = 0.7 * this.r + range(-1, 1));
    }

    draw() {
      var ref;
      this.x += this.vx;
      this.y += this.vy;
      this.opacity += this.dop;
      if (this.opacity > 1) {
        this.opacity = 1;
        this.dop *= -1;
      }
      if (this.opacity < 0 || this.y > this.ymax) {
        this.replace();
      }
      if (!(0 < (ref = this.x) && ref < this.xmax)) {
        this.x = (this.x + this.xmax) % this.xmax;
      }
      return drawCircle(
        ~~this.x,
        ~~this.y,
        this.r,
        `${this.rgb},${this.opacity})`
      );
    }
  };

  confetti = (function () {
    var j, ref, results;
    results = [];
    for (
      i = j = 1, ref = NUM_CONFETTI;
      1 <= ref ? j <= ref : j >= ref;
      i = 1 <= ref ? ++j : --j
    ) {
      results.push(new Confetti());
    }
    return results;
  })();

  window.step = function () {
    var c, j, len, results;
    requestAnimationFrame(step);
    context.clearRect(0, 0, w, h);
    results = [];
    for (j = 0, len = confetti.length; j < len; j++) {
      c = confetti[j];
      results.push(c.draw());
    }
    return results;
  };

  step();
}.call(this));

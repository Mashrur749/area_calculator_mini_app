var shapeTxt = document.querySelector(".shape");
var circle = document.querySelector(".circle");
var triangle = document.querySelector(".triangle");
var square = document.querySelector(".square");
var calculator = document.forms["calculator"];
var result = document.getElementById("area");
var theoryTable = document.getElementById("theoryTable");
var logos = document.getElementsByClassName("logo");
var logoSection = document.getElementsByClassName("logos");
var remove = document.getElementsByClassName(".remove")[0];
var inputs = document.getElementsByTagName("input");
init();

alert("Remember to open in server");

function init() {

  //calling functions depending on the shape
  calculator.addEventListener("submit", function (e) {
    e.preventDefault();
    switch (shapeTxt.textContent.toLowerCase()) {
      case "circle":
        calcCircle();
        break;
      case "triangle":
        calcTriangle();
        break;
      case "square":
        calcSquare();
        break;
    }
  });



  function td() {
    return document.createElement("td");
  }

  function tr() {
    return document.createElement("tr");
  }

  function div() {
    return document.createElement("div");
  }


  //filling up the theory table with AJAX
  Array.from(theoryTable.getElementsByTagName("tr")).forEach(function (tr) {
    tr.parentNode.removeChild(tr)
  });



  var myRequest = new XMLHttpRequest();
  myRequest.open("GET", "theory.json");
  myRequest.onload = function () {
  const data = JSON.parse(myRequest.responseText);



    function makeLogos(shape1, shape2, shape3) {

      //removing all the logos
      logoSection[1].parentNode.removeChild(logoSection[1]);
      outerDiv = div();
      outerDiv.className += "logos";
      logoSection[0].appendChild(outerDiv);
      div1 = div();
      div2 = div();
      div3 = div();
      var divs = [div1, div2, div3];
      div1.className += shape1 + " logo";
      div2.className += shape2 + " logo";
      div3.className += shape3 + " logo";
      outerDiv.appendChild(div1)
      outerDiv.appendChild(div2);
      outerDiv.appendChild(div3);

      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] == "circle") {
          circle = divs[i];
        }
        if (arguments[i] == "triangle") {
          triangle = divs[i];
        }
        if (arguments[i] == "square") {
          square = divs[i];
        }
      }
      //click events for the shapes
      circle.addEventListener("click", function (e) {
        emptyIn();
        shapeTxt.textContent = "CIRCLE";
        var radius = document.getElementById("height");
        radius.placeholder = "radius...";
        var width = document.getElementById("width");
        width.style.display = "none";
        var theta = document.getElementById("theta");
        theta.parentElement.style.display = "none";
        init();
      });

      triangle.addEventListener("click", function (e) {
        emptyIn();
        shapeTxt.textContent = "TRIANGLE";
        var height = document.getElementById("height");
        height.placeholder = "length of one side(a) / Height...";
        var width = document.getElementById("width");
        width.style.display = "inline-block";
        var theta = document.getElementById("theta");
        theta.parentElement.style.display = "block";
        init();
      });

      square.addEventListener("click", function (e) {
        emptyIn();
        shapeTxt.textContent = "SQUARE";
        var height = document.getElementById("height");
        height.placeholder = "length of one side(a) / Height...";
        var width = document.getElementById("width");
        width.style.display = "inline-block";
        var theta = document.getElementById("theta");
        theta.parentElement.style.display = "none";
        init();
      })


      var shape = [shape1, shape2, shape3]


      if (theoryTable.childElementCount <= 0) {
        shape2 = document.querySelector("." + shape2);
        shape2.classList.add("selected");
        var tdForLogo = td();
        var td1 = td();
        var td2 = td();
        var tr1 = tr();
        var divLogo = document.createElement("div");
        divLogo.classList.add(shape[1]);
        tdForLogo.appendChild(divLogo);
        tdForLogo.rowSpan = 50;


        var shapeData = {
          circle: {
            area: data.circle.area,
            notation: data.circle.notation
          },
          triangle: {
            area: data.triangle.area,
            notation: data.triangle.notation
          },
          square: {
            area: data.square.area,
            notation: data.square.notation
          }
        };

        if (shapeTxt.textContent.toLowerCase() == "circle") {
          td1.textContent = shapeData.circle.area;
          td2.textContent = shapeData.circle.notation;
          var removeBtn = document.createElement("span");
          removeBtn.className = "remove";
          removeBtn.textContent = "Remove";
          td2.appendChild(removeBtn);
          removeBtn.addEventListener("click", function (e) {
            e.target.parentNode.previousSibling.remove()
            e.target.parentNode.remove();
            e.target.remove();
          })
        }
        if (shapeTxt.textContent.toLowerCase() == "triangle") {
          td1.textContent = shapeData.triangle.area;
          td2.textContent = shapeData.triangle.notation;
          var removeBtn = document.createElement("span");
          removeBtn.className = "remove";
          removeBtn.textContent = "Remove";
          td2.appendChild(removeBtn);
          removeBtn.addEventListener("click", function (e) {
            e.target.parentNode.previousSibling.remove()
            e.target.parentNode.remove();
            e.target.remove();
          })
        }
        if (shapeTxt.textContent.toLowerCase() == "square") {
          td1.textContent = shapeData.square.area;
          td2.textContent = shapeData.square.notation;
          var removeBtn = document.createElement("span");
          removeBtn.className = "remove";
          removeBtn.textContent = "Remove";
          td2.appendChild(removeBtn);
          removeBtn.addEventListener("click", function (e) {
            e.target.parentNode.previousSibling.remove()
            e.target.parentNode.remove();
            e.target.remove();
          })
        }
        tr1.appendChild(tdForLogo);
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        theoryTable.appendChild(tr1);

      }
    }



    if (shapeTxt.textContent.toLowerCase() == "circle") {
      let counter = 0;
      if (counter <= 0) {
        makeLogos("square", "circle", "triangle");
        counter++;
      }
    }
    if (shapeTxt.textContent.toLowerCase() == "triangle") {

      let counter = 0;
      if (counter <= 0) {
        makeLogos("circle", "triangle", "square");
        counter++;
      }
    }
    if (shapeTxt.textContent.toLowerCase() == "square") {
      let counter = 0;
      if (counter <= 0) {
        makeLogos("circle", "square", "triangle");
        counter++;
      }
    }
  }
  myRequest.send();

  shapeTxt = document.querySelector(".shape");
  circle = document.querySelector(".circle");
  triangle = document.querySelector(".triangle");
  square = document.querySelector(".square");
  logos = document.getElementsByClassName("logo");
  logoSection = document.getElementsByClassName("logos");

}

var theoryForm = document.forms["addTheory"];

theoryForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var addTheoryBtn = this.firstElementChild;
  var theoryName = this.children[1].value;
  var theoryNotation = this.children[2].value;
  var theoryNameTd = document.createElement("td");
  var theoryNotationTd = document.createElement("td");
  var theoryTr = document.createElement("tr");
  var removeBtn = document.createElement("span");
  if (theoryName == "") {
    alert("You haven't wrote the theory name.");
  }

  if (theoryNotation == "") {
    alert("You haven't wrote the theory notation.");
  }
  if (theoryNotation != "" && theoryName != "") {
    removeBtn.className = "remove";
    removeBtn.textContent = "Remove";
    theoryNameTd.textContent = theoryName;
    theoryNotationTd.textContent = theoryNotation;
    theoryTr.appendChild(theoryNameTd);
    theoryTr.appendChild(theoryNotationTd);
    theoryTable.appendChild(theoryTr);
    theoryNotationTd.appendChild(removeBtn);
    // console.log(theoryName, theoryNotation);
    // theoryName = "";
    // theoryNotation = "";
    removeBtn.addEventListener("click", function (e) {
      e.target.parentNode.previousSibling.remove()
      e.target.parentNode.remove();
      e.target.remove();
    })
  }

})




function emptyIn() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
}


//calculation funtions
function calcCircle() {
  var radius = document.getElementById("height").value;
  var area = Math.PI * (radius * radius);

  result.value = area.toFixed(2);
}

function calcTriangle() {
  var height_val = document.getElementById("height").value;
  var width_val = document.getElementById("width").value;
  var theta_val = document.getElementById("theta").value;
  var area;
  if (theta_val != 0 || theta_val != "") {
    theta_val = theta_val * (Math.PI / 180);
    area = (height_val * width_val * (Math.sin(theta_val))) / 2;
    result.value = area.toFixed(2);
  } else {
    area = (height_val * width_val) / 2;
    result.value = area.toFixed(2);
  }
}

function calcSquare() {
  var height_val = document.getElementById("height").value;
  var width_val = document.getElementById("width").value;
  var area;
  area = (height_val * width_val);
  result.value = area.toFixed(2);
}
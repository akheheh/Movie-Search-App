//Using an IIFE, we can use this code without worrying about polluting the namespace
(function() {
  var request = new XMLHttpRequest();
  var container = document.querySelector(".container");
  var myTitle = "district 9";
  var input = document.querySelector(".inp");
  var btn = document.querySelector(".btn");
  var movies = document.getElementsByClassName("el");

  //function which will get the movie we want and display the poster on the screen
  function getMovie(inp) {
    var url = "http://www.omdbapi.com/?i=tt3896198&apikey=b497d9c1&t=" + input.value + "&plot=full";
    if(movies.length < 20) {
      request.open('GET', url , true);

      request.onload = function() {
        var film = JSON.parse(this.response);
        var el = document.createElement("div");
        var title = document.createElement("h2");
        var poster = document.createElement("img");
        poster.src = film.Poster;
        poster.height = "500";
        poster.width = "300";

        if(JSON.parse(request.response).Response !== "False") {
          title.textContent = film.Title.replace("-", " ");
          el.appendChild(poster);
          el.appendChild(title);
          el.classList.add("el");
          el.style.opacity = 0;
          container.appendChild(el);
          movies.length;
          var keyframeBG = [
            {
              'opacity': "0"
            },

            {
                'opacity': "1.0"
            }
          ];

          el.animate(keyframeBG, {
            duration: 1000,
            delay: 150,
            fill: 'forwards'
          });
        }

         else {
          alert("Movie not found");
        }
      };
    } else {
      alert("Bro you watch too many movies.  Go take a break.");
    }

    request.send();
    input.value = "";
  }

  btn.addEventListener("click", function() {
    getMovie(input.value);
  });

  //Do the same but with hitting the enter key
  document.addEventListener("keydown", function(e) {
      if(e.keyCode === 13) {
        getMovie(input.value);
      }
  });
})();

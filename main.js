// function([string1, string2],target id,[color1,color2])    
consoleText(['Oi', 'Amigo', 'Tenha um ', 'Bom dia'], 'text',['tomato','rebeccapurple']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}

$(document).ready(function(){
  var API_KEY = "AIzaSyBtOLPhtuK7TqzPQJiNppiSCcye1SP7Vow"
  
  var video = ""


  $("form").submit(function(event){
    event.preventDefault()
    var search = $("#search").val()
    videosSearch(API_KEY,search,8)
  })
  function videosSearch(key, search, maxResults ){
    $.get("https://www.googleapis.com/youtube/v3/search?key="+ key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search, function(data){
      console.log(data)

      data.items.forEach(item => {
        video = `
        <iframe width="420" height="315"
        src="http://www.youtube.com/embed/${item.id.videoId}"
        frameborder="0" allowfullscreen />
        `
        $("#videos").append(video)
      });
    })
  }
})
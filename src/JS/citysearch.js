// Search by city, pull metadata from local storage, use that to call the metadata API, return the MP3 file extensions, build a play list and play the audio.

$("#citySearchBtn").click(function() {
  var citySearch = $('#citySearchText').val()
  var allConcerts = JSON.parse(localStorage.getItem('data'));
  var allConcertsByCity = []
  for (var concert in allConcerts) {
    if (allConcerts[concert].coverage == citySearch) {
      allConcertsByCity.push(allConcerts[concert])
    }
  }
  if (allConcertsByCity.length==0){
    alert("No shows for this city in the Archive");
  }
  else {
    for (var i = 0; i < allConcertsByCity.length; i++) {
      var foundConcert = allConcertsByCity[i]
      var $searchResults = $('#searchResults')
      var $citySearchResult = $('<h5 data-date = "'+ foundConcert.date+'" style="color: white">' + foundConcert.title +'</h5>')
      $citySearchResult.on ('click', function(){
        var concerts = allConcerts[this.dataset.date]
      })
      $searchResults.append ($citySearchResult)

      $citySearchResult.click(function(){
      var concert = allConcerts[this.dataset.date]
      var urlMetadata = ("https://archive.org/metadata/" + concert.identifier)
      $.ajax({
      url: urlMetadata, dataType: 'jsonp', success: function (data) {
          var thisSetListIndex = [];
          for (var i = 0; i < data.files.length; i++) {
            var thisShowNames = data.files[i].name;
            var track = data.files[i].track;
            if (thisShowNames.substr(thisShowNames.length - 3) === 'mp3') {
              thisSetListIndex.push({ name: thisShowNames, track: track});
            }
          }
          thisSetListIndex.sort(function(obj1, obj2) {
            return parseInt(obj1.track) - parseInt(obj2.track);
          });
          var playList = []
          for (var i = 0; i < thisSetListIndex.length; i++) {
            var mp3Link = 'https://archive.org/download/' + concert.identifier + '/' + thisSetListIndex[i].name
            playList.push(mp3Link)
         }
           var $a= $("#audio")
            $a.append("<source type="+'"audio/mp3"'+"src="+playList[0]+">")
           var $l= $("#playlist")
            $l.append("<li class="+'"active"'+"><a href="+ playList[0]+"></a></li>")
           for (var i = 1; i < playList.length; i++) {
             $l.append("li class="+"><a href="+ playList[i]+"></a></li>")
           }
        }
      })
    })
    }
    }
  });

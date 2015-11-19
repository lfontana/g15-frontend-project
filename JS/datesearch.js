// Search by date, pull metadata from local storage, use that to call the metadata API, return the MP3 file extensions, build a play list and play the audio.
$("#dateSearchBtn").click(function() {
  // alert( "Handler for .click() called." );
  var dateSearch = $('#dateSearchText').val()
  var allConcerts = JSON.parse(localStorage.getItem('data'));
    if (allConcerts.hasOwnProperty(dateSearch)){
      var foundConcert = allConcerts[dateSearch]
      var $searchResults = $('#searchResults')
      var $searchResult = $('<h3 data-date = "'+foundConcert.date+'" style="color: white">' + foundConcert.title + '</h3>')
        $searchResults.append ($searchResult)
        $searchResult.click(function(){
          var concert = allConcerts[this.dataset.date]
          // console.log(concert.identifier);
          var urlMetadata = ("https://archive.org/metadata/" + concert.identifier)
          $.ajax({
            url: urlMetadata, dataType: 'jsonp', success: function (data) {
              // console.log(data)
              // console.log(data.files.length)
              var thisSetListIndex = [];
              for (var i = 0; i < data.files.length; i++) {
                var thisShowNames = data.files[i].name;
                var track = data.files[i].track;
                // console.log(thisShowNames.substr(thisShowNames.length - 3))
                if (thisShowNames.substr(thisShowNames.length - 3) === 'mp3') {
                  thisSetListIndex.push({ name: thisShowNames, track: track});
                }
              }
              thisSetListIndex.sort(function(obj1, obj2) {
                return parseInt(obj1.track) - parseInt(obj2.track);
              });
              // console.log(thisSetListIndex)
              // console.log(thisSetListIndex.length)
              var playList = []
              for (var i = 0; i < thisSetListIndex.length; i++) {
                 var mp3Link = 'https://archive.org/download/' + concert.identifier + '/' + thisSetListIndex[i].name
                 playList.push(mp3Link)
               }
               // console.log(playList)
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
        else {
          console.log ("No shows on this date in the Archive");
        }
 });

// Search by date, pull metadata from local storage, use that to call the metadata API, return the MP3 file extensions, build a play list and play the audio.
$("#dateSearchBtn").click(function() {
  var dateSearch = $('#dateSearchText').val()
  var allConcerts = JSON.parse(localStorage.getItem('data'));
    if (allConcerts.hasOwnProperty(dateSearch)){
      var foundConcert = allConcerts[dateSearch]
      var $searchResults = $('#searchResults')
      var $searchResult = $('<h5 data-date = "'+foundConcert.date+'" style="color: white">' + foundConcert.title + '</h5>')
        $searchResults.append ($searchResult)
        $searchResult.click(function(){
          var concert = allConcerts[this.dataset.date]
          var urlMetadata = ("https://archive.org/metadata/" + concert.identifier)
          $.ajax({
            url: urlMetadata, dataType: 'jsonp', success: function (data) {
              var thisSetListIndex = [];
              for (var i = 0; i < data.files.length; i++) {
                var thisShowNames = data.files[i].name;
                var track = data.files[i].track;
                var title = data.files[i].title;
                if (thisShowNames.substr(thisShowNames.length - 7) === 'vbr.mp3') {
                } else if (thisShowNames.substr(thisShowNames.length - 3) === 'mp3') {
                  thisSetListIndex.push({ name: thisShowNames, track: track, title: title});
                }
              }
              thisSetListIndex.sort(function(obj1, obj2) {
                return parseInt(obj1.track) - parseInt(obj2.track);
              });
              //console.log(thisSetListIndex)
              var playList = []
              for (var i = 0; i < thisSetListIndex.length; i++) {
                 var mp3Link = 'https://archive.org/download/' + concert.identifier + '/' + thisSetListIndex[i].name
                 playList.push(mp3Link)
               }
               var $a= $("#audio")
               $a.append("<source type="+'"audio/mp3"'+"src="+playList[0]+">")
               var $l= $("#playlist")
               $l.append("<li class="+'"active"'+"><a href="+ playList[0]+">"+thisSetListIndex[0].title+"</a></li>")
               for (var j = 1; j < playList.length; j++) {
                 $l.append("<li class="+"><a href="+ playList[j]+">"+thisSetListIndex[j].title+"</a></li>")
               }
            }
          })
        })
      }
        else {
          alert("No shows on this date in the Archive");
        }
 });

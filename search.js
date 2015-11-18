// Search by date
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
          console.log(concert.identifier);
          var urlMetadata = ("https://archive.org/metadata/" + concert.identifier)
          $.ajax({
            url: urlMetadata, dataType: 'jsonp', success: function (data) {
              console.log(data)
              console.log(data.files.length)
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
              console.log(thisSetListIndex)
            }
          })
        })
      }
        else {
          console.log ("No shows on this date in the Archive");
        }
 });






// Search by City

// $("#citySearchBtn").click(function() {
//   var citySearch = $('#citySearchText').val()
//   //console.log(citySearch)
//   var allConcerts = JSON.parse(localStorage.getItem('data'));
//   // console.log(allConcerts)
//   var allConcertsByCity = []
//   for (var concert in allConcerts) {
//     if (allConcerts[concert].coverage == citySearch) {
//       allConcertsByCity.push(allConcerts[concert])
//     }
//   }
//   if (allConcertsByCity.length==0){
//     console.log ("No shows for this city in the Archive")
//   }
//   else {
//     for (var i = 0; i < allConcertsByCity.length; i++) {
//       var foundConcert = allConcertsByCity[i]
//       var $searchResults = $('#searchResults')
//       var $citySearchResult = $('<h3 data-date = "'+ foundConcert.date+'" style="color: white">' + foundConcert.title +'</h3>')
//       $citySearchResult.on ('click', function(){
//         var concerts = allConcerts[this.dataset.date]
//         console.log(concerts.identifier);
//       })
//       $searchResults.append ($citySearchResult)
//     }
//   }
//   console.log(allConcertsByCity)
// });

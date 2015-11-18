// Search by date
$("#dateSearchBtn").click(function() {
  // alert( "Handler for .click() called." );
  var dateSearch = $('#dateSearchText').val()
  // console.log(dateSearch)
  var allConcerts = JSON.parse(localStorage.getItem('data'));
  // console.log(allConcerts)

  if (allConcerts.hasOwnProperty(dateSearch)){
    var foundConcert = allConcerts[dateSearch]
    var $searchResults = $('#searchResults')
    var $searchResult = $('<h3 data-date = "'+foundConcert.date+'" style="color: white">' + foundConcert.title + '</h3>')

    $searchResult.click(function(){
      var concert = allConcerts[this.dataset.date]
      console.log(concert.identifier);
    })

    $searchResults.append ($searchResult)
  }
  else {
    console.log ("No shows on this date in the Archive");
  }
});

$.ajax({
  url: url, dataType: 'jsonp', success: function (data) {
  var concertsByDate = _.groupBy(data.response.docs, function(c){
    if (c.date){
      return c.date.substring(0,10)
    }
    else return "unknown"
  })
    var dates = Object.keys(concertsByDate)
    var bestConcerts = []
// Nested for loops to fill the empty bestConcerts array with the show that has the highest number of downloads
    for (var i = 0; i < dates.length; i++) {
      var concertsOnDate = concertsByDate[dates[i]]
      var bestConcertOnDateIndex = 0
      for (var n = 0; n < concertsOnDate.length; n++) {
// Use parseInt to turn downloads strings into integers
        if (parseInt(concertsOnDate[n].downloads) > parseInt(concertsOnDate[bestConcertOnDateIndex].downloads)) {
          bestConcertOnDateIndex = n
        }
      }
// Iterate over the date field and remove the extraneous characters
    if (concertsOnDate[bestConcertOnDateIndex].date) {
      concertsOnDate[bestConcertOnDateIndex].date = concertsOnDate[bestConcertOnDateIndex].date.substring(0, 10)
      bestConcerts.push(concertsOnDate[bestConcertOnDateIndex])
      concertsByDate[dates[i]] = concertsOnDate[bestConcertOnDateIndex]
      }
    }
    console.log(concertsByDate)
// Push the data into localStorage
    localStorage.setItem('data', JSON.stringify(concertsByDate))
// Verification that the data is actually there
    console.log(JSON.parse(localStorage.getItem('data')));
  }
})



// Search by City

$("#citySearchBtn").click(function() {
  var citySearch = $('#citySearchText').val()
  //console.log(citySearch)
  var allConcerts = JSON.parse(localStorage.getItem('data'));
  // console.log(allConcerts)
  var allConcertsByCity = []
  for (var concert in allConcerts) {
    if (allConcerts[concert].coverage == citySearch) {
      allConcertsByCity.push(allConcerts[concert])
    }
  }
  if (allConcertsByCity.length==0){
    console.log ("No shows for this city in the Archive")
  }
  else {
    for (var i = 0; i < allConcertsByCity.length; i++) {
      var foundConcert = allConcertsByCity[i]
      var $searchResults = $('#searchResults')
      var $citySearchResult = $('<h3 data-date = "'+ foundConcert.date+'" style="color: white">' + foundConcert.title +'</h3>')
      $citySearchResult.on ('click', function(){
        var concerts = allConcerts[this.dataset.date]
        console.log(concerts.identifier);
      })
      $searchResults.append ($citySearchResult)
    }
  }
  console.log(allConcertsByCity)
});

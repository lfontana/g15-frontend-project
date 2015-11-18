// script.js pulls the metadata from Archive.org API, curates the data so that there is only one concert per date and stores that curated data in local storage.

// url comes from the http://archive.org/advancedsearch.php search. Pulls the following fields from the Grateful Dead collection: coverage, date, description, downloads, title, year & identifier.
var url = 'http://archive.org/advancedsearch.php?q=collection%3AGratefulDead&fl%5B%5D=coverage&fl%5B%5D=date&fl%5B%5D=description&fl%5B%5D=downloads&fl%5B%5D=identifier&fl%5B%5D=title&fl%5B%5D=year&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=20000&page=1&output=json&callback=callback&save=yes'

// uses lodash _.groupBy function to group the results by date.
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
    // console.log(concertsByDate)
// Push the data into localStorage
    localStorage.setItem('data', JSON.stringify(concertsByDate))
// Verification that the data is actually there
    console.log(JSON.parse(localStorage.getItem('data')));
  }
})

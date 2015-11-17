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

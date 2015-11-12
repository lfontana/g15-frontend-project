
// url comes from the http://archive.org/advancedsearch.php search

var url = 'http://archive.org/advancedsearch.php?q=collection%3AGratefulDead&fl%5B%5D=coverage&fl%5B%5D=date&fl%5B%5D=description&fl%5B%5D=downloads&fl%5B%5D=title&fl%5B%5D=year&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=50000&page=1&output=json&callback=callback&save=yes';
// uses lodash _.groupBy function to group the results by date.
$.ajax({
  url: url, dataType: 'jsonp', success: function (data) {
    console.log(data)
    console.log(_.groupBy(data.response.docs, 'date'))
  }
})

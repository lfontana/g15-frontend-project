
var url = 'http://archive.org/advancedsearch.php?q=collection%3AGratefulDead+AND+year%3A1989+AND+%28title%3A*%29&fl%5B%5D=avg_rating&fl%5B%5D=call_number&fl%5B%5D=collection&fl%5B%5D=contributor&fl%5B%5D=coverage&fl%5B%5D=creator&fl%5B%5D=date&fl%5B%5D=description&fl%5B%5D=downloads&fl%5B%5D=foldoutcount&fl%5B%5D=format&fl%5B%5D=headerImage&fl%5B%5D=identifier&fl%5B%5D=imagecount&fl%5B%5D=language&fl%5B%5D=licenseurl&fl%5B%5D=mediatype&fl%5B%5D=members&fl%5B%5D=month&fl%5B%5D=num_reviews&fl%5B%5D=oai_updatedate&fl%5B%5D=publicdate&fl%5B%5D=publisher&fl%5B%5D=reviewdate&fl%5B%5D=rights&fl%5B%5D=scanningcentre&fl%5B%5D=source&fl%5B%5D=subject&fl%5B%5D=title&fl%5B%5D=type&fl%5B%5D=volume&fl%5B%5D=week&fl%5B%5D=year&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=1000&page=1&output=json&callback=callback&save=yes'
$.ajax({
  url: url, dataType: "jsonp", success: function(data){
    console.log(data)
  }
})

// var requestData = new XMLHttpRequest();
//
// requestData.onreadystatechange = function() {
// 	if (this.readyState == 4 && this.status == 200) {
// 		var rawconcertData = JSON.parse(this.responseText);
// 		//console.log(concertData);
// 	for (i=0; i<rawconcertData.data.children.length; i++){
// 		var subsetconcertData = rawconcertData.data.children[i];
// 		console.log(subsetconcertData.data.date, subsetconcertData.data.description, subsetconcertData.data.title, subsetconcertData.data.year, subsetconcertData.data.coverage);
// 		}
// 	}
// };
//
// requestData.open('getJSON', 'https://cors-anywhere.herokuapp.com/http://archive.org/advancedsearch.php?q=collection%3AGratefulDead+AND+year%3A1989+AND+%28title%3A*%29&fl%5B%5D=avg_rating&fl%5B%5D=call_number&fl%5B%5D=collection&fl%5B%5D=contributor&fl%5B%5D=coverage&fl%5B%5D=creator&fl%5B%5D=date&fl%5B%5D=description&fl%5B%5D=downloads&fl%5B%5D=foldoutcount&fl%5B%5D=format&fl%5B%5D=headerImage&fl%5B%5D=identifier&fl%5B%5D=imagecount&fl%5B%5D=language&fl%5B%5D=licenseurl&fl%5B%5D=mediatype&fl%5B%5D=members&fl%5B%5D=month&fl%5B%5D=num_reviews&fl%5B%5D=oai_updatedate&fl%5B%5D=publicdate&fl%5B%5D=publisher&fl%5B%5D=reviewdate&fl%5B%5D=rights&fl%5B%5D=scanningcentre&fl%5B%5D=source&fl%5B%5D=subject&fl%5B%5D=title&fl%5B%5D=type&fl%5B%5D=volume&fl%5B%5D=week&fl%5B%5D=year&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=1000&page=1&output=json&callback=callback&save=yes');
// requestData.send();

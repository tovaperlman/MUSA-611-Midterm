/* ================================
Week 6 Assignment: Midterm Functions + Signatures
================================ */
//click event with next slide function
//previous slide function
//show slide function
//just creating button and loads in right info
//user clicks on icon
//or have a legend that show the race
/* =====================
  Global Variables
===================== */
var data;  // for holding data
var stringFilter = "";
var selectValue = 'All';


/* =====================
  Map Setup
===================== */
/* =====================

  Map Setup

===================== */

// Notice that we've been using an options object since week 1 without realizing it
//Mess with this

var mapOpts = {
  center: [44.980075368951304, -93.26169357402021],
  zoom: 11
};

var map = L.map('map', mapOpts);




// Another options object

var tileOpts = {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
};

var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', tileOpts).addTo(map);




var data;
var markers;
var page1 = {

  title: "Suspicious Person", 
  content: "Here we see the spatial pattern for Suspicious Person among the police",
  filter: function(datum){
    return datum.problem === 'Suspicious Person (P)'}

}


var page2 = {

  title: "Traffic Law Enforcement", 
  content: "here's some random content",
  filter: function(datum){
    return datum.problem === 'Traffic Law Enforcement (P)'}
  }

var page3 = {
  title: "Suspicious Vehicle", 
  content: "here's some random content",
  filter: function(datum){
    return datum.problem === 'Suspicious Vehicle (P)'}
  }

var page4 = {
  title: "Persons identified as Black", 
  content: "here's some random content",
  filter: function(datum){
  return datum.race=== 'Black'}
}

var page5 = {
  title: "Persons identified as White", 
  content: "here's some random content",
  filter: function(datum){
  return datum.race === 'White'}
    }

var page6 = {
  title: "Persons identified as East African", 
  content: "here's some random content",
  filter: function(datum){
  return datum.race === 'East African'}
    }

var slides = [page1, page2, page3, page4, page5, page6]

var currentPage = 0

var nextPage = function() {

  // event handling for proceeding forward in slideshow
  tearDown()
  var nextPage = currentPage + 1
  currentPage = nextPage
  buildPage(slides[nextPage])
}

var prevPage = function() {
  // event handling for going backward in slideshow
  tearDown()
  var prevPage = currentPage - 1
  currentPage = prevPage
  buildPage(slides[prevPage]) //not prevpagebuildPage
}




var buildPage = function(pageDefinition) {

  // build up a 'slide' given a page definition
  console.log(pageDefinition, data)

  var filtered = data.filter(pageDefinition.filter)

  markers = filtered.map(function(police) {

    return L.marker([police.lat, police.long])

  })


  markers.forEach(function(marker) { marker.addTo(map) })

// var prevPagebuildPage = function(pageDefinition) {

//     // build up a 'slide' given a page definition
//     markers = data.map(function(police) {
//       return L.marker([police.lat, police.long])
//     })

    // markers.forEach(function(marker) { marker.addTo(map) })



  //set the title
  $('#title').text(pageDefinition.title)
  //set the content
  $('#content').text(pageDefinition.content)
  //move to the bounnding box
  // map.flyToBounds(pageDefinition.bbox)




  if (currentPage === 0) {
    $('#prev').prop("disabled", true)
  } else {
    $('#prev').prop("disabled", false)
  }




console.log(currentPage, slides.length -1)
if (currentPage === slides.length - 1) {
  $('#next').prop("disabled", true)
} else {
  $('#next').prop("disabled", false)
}
}




 var tearDown = function() {

  // // remove all plotted data in prep for building the page with new filters etc
  markers.forEach(function(marker) { map.removeLayer(marker)
  })
//  map.removeLayer(marker)

  // tearDown()
  // // var nextPage = currentPage() + 1
  // // currentPage = nextPage
  // // buildPage(slides[nextPage])
  // if (currentPage == slides.length - 1) {
  //   $('#next').prop

  //  }

}




// Ajax to grab json

$.ajax('https://gist.githubusercontent.com/tovaperlman/6757cf96a5d0cbaba46ae97710a4dbe8/raw/efd9dcabf9b84a48d0c342a1c08be4afaa0ac694/mplspolicev3.json').done(function(json){
  console.log(json)
  var parsed = JSON.parse(json)
  console.log(parsed)
  data = parsed.features.map(function(feature){
      return feature.attributes
  })
  


// $.ajax('https://gist.githubusercontent.com/tovaperlman/6757cf96a5d0cbaba46ae97710a4dbe8/raw/efd9dcabf9b84a48d0c342a1c08be4afaa0ac694/mplspolicev3.json').done(function(json){
//   console.log(json)
//   var parsed = JSON.parse(json)
//   data = parsed.map(function(datum){
//     datum.lat = Number(datum.lat)
//     datum.long = Number(datum.long)
//     return datum
  // })
  buildPage(slides[currentPage])
    // prevPagebuildPage(slides[currentPage])
    
    // })
    
  $('#next').click(nextPage)
  $('#prev').click(prevPage)
})


//https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/Police_Stop_Data/FeatureServer/0/query?where=1%3D1&outFields=problem,race,gender,lat,long&outSR=4326&f=json
// $.ajax('https://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/geojson/HousingCounselingAgencies.geojson
// ').done(function(json){
//   var parsed = JSON.parse(json)
//   data = parsed.map(function(datum){
//     datum.geometry= Number(datum.geometry)
//     return datum

// })


// buildPage(slides[currentPage])
// // prevPagebuildPage(slides[currentPage])

// // })

// $('#next').click(nextPage)
// $('#prev').click(prevPage)




//you can use jquery's "hide" function to hide a div, so that when you click 



// // Notice that we've been using an options object since week 1 without realizing it
// var mapOpts = {
//     center: [0, 0],
//     zoom: 2
//   };
//   var map = L.map('map', mapOpts);
  
//   // Another options object
//   var tileOpts = {
//     attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//     subdomains: 'abcd',
//     minZoom: 0,
//     maxZoom: 20,
//     ext: 'png'
//   };
//   var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', tileOpts).addTo(map);

// //some other stuff 
// // var data
// // var slides{
// //     title:'slide1',
// //     title:'slide2',
// // }
// // clickevent.button(Next)
// // clickevent.button(Previous)

// // var arrayofobjects = objectarray //this is the slide to show

// //Show legend of coloring by problem, race, gender

// var nextPage = function() {
//     // event handling for proceeding forward in slideshow
//   tearDown()
//   var nextPage=currentPage+1
//   buildPage(slides[nextPage])
//   currentPage=nextPage
// }
//   var prevPage = function() {
//     // event handling for going backward in slideshow
  
// }
  
//   var buildPage = function(pageDefinition) {
//     // build up a 'slide' given a page definition
//     markers=data.map(function(capital){
//         return ListeningStateChangedEvent.marker([capital.CapitalLatitide, capital.CaptialLongitude])
//     })
    
//     markers.forEach(function(marker){marker.addTo(map)})
//     $(#'title').text(pageDefinition.title)
//     $(#'content').text(pageDefinition.content)
//   }

//   if(currentPage===0{
//       $('#prev'), prop("disabled", true)
//       else ($'#prev').prop("disabled", false)}
//   })

//   if(pagedefinition.filter){
//       the filter
//   }
  
//   var tearDown = function() {
//     // remove all plotted data in prep for building the page with new filters etc

// //put my ajax call here

// var parsed=JSON.parse(json)
// data = parsed.map(function(datum){
//     datum.lat=Number(datum.lat)
//     datum.long=Number(datum.long)
// }
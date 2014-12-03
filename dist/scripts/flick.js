

var photoName = []; 
var ajaxIndex = 0;
var flickApp = {};
var user = [];
flickApp.letter = '';

flickApp.init = function(test){

	$("form").on('submit',function(e){
		e.preventDefault();
		var userName = $('#name').val().trim(); // trim removes whitespace from the textarea
		user = userName.split("");
		$('.details').fadeIn('slow');
		$('.container').empty();								
		photoName = [];	// resets photoName array when user gerneates new first name

		//if we don't pass i into the getARt function the images will be in a random order (when ajax finishes the requests)
		//i tells us what letter we're on to pass the correct image index
	
		for (var i=0; i< user.length; i++) {			
			flickApp.letter = user[i];										
			flickApp.getArt(flickApp.letter, i, user.length);				

			 	// example: the name "COLIN" 
			 	// 1st i=0, letter = C, user.length = 5
			 	// 2nd i=1, letter = O, user.length = 5
		}		
	});	
}

flickApp.getLetter = function(searchData, index){
	console.log("the search data is -> " + searchData);
	$.ajax({
		url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=13e9ee5684d5d93d25fc0e43d1514001&safe_search=1&content_type=4&format=json&nojsoncallback=1&text=oneletter ' +searchData,
		type: 'GET',
		dataType: 'json', //jsonp would always create an error whereas json seems to work....
		// will include "data" object in the near future. Was just happy that this worked.
		success: function(response){
			var selected = Math.floor(Math.random() * response.photos.photo.length-1) + 1; 
			// flickr returns random amount  of pictures so we ask for one random picture within that returned picture amount
			var farmId = response.photos.photo[selected].farm;
			var serverId = response.photos.photo[selected].server;
			var photoId =  response.photos.photo[selected].id;
			var secret = response.photos.photo[selected].secret;
			var img  = "https://farm" + farmId + ".staticflickr.com/" + serverId + "/" + photoId + "_" + secret + ".jpg";

			console.log("the image url is: " + img);

			photoName[parseInt(index)] = img;

			console.log("saved value is -> " + photoName[parseInt(index)]);

			// console.log("src for " + '#'+index+ "is:: " + $('#' + index).attr('src'));
			$('.new').eq(index).attr('src', photoName[parseInt(index)]);
		}
	});
}

flickApp.getArt = function(searchData, index, nameLength) {
	$.ajax({
		url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=13e9ee5684d5d93d25fc0e43d1514001&safe_search=1&content_type=4&format=json&nojsoncallback=1&text=oneletter ' +searchData,
		type: 'GET',
		dataType: 'json', //jsonp would always create an error whereas json seems to work....
		// will include "data" object in the near future. Was just happy that this worked.
		success: function(response){
			console.log(response);
			var selected = Math.floor(Math.random() * response.photos.photo.length-1) + 1; 
			// flickr returns random amount  of pictures so we ask for one random picture within that returned picture amount
			var farmId = response.photos.photo[selected].farm;
			var serverId = response.photos.photo[selected].server;
			var photoId =  response.photos.photo[selected].id;
			var secret = response.photos.photo[selected].secret;
			var img  = "https://farm" + farmId + ".staticflickr.com/" + serverId + "/" + photoId + "_" + secret + ".jpg";

			console.log(img);
			photoName[index] = img;		
			ajaxIndex++; //increment ajax index because we have data
			console.log(ajaxIndex);						
			

			if (ajaxIndex === nameLength )	{		
				ajaxIndex = 0;													
				for (var i = 0; i<photoName.length;i++) {							
					 $('.container').append('<img id="' + i + ' " class="new" style="width:150px" src="'+photoName[i]+'" />');

				} 

				$('.new').on('click', function(e){	
					e.preventDefault();
					var tempid = $(this).attr('id');
					$(".harris").fadeIn('slow').delay(10).fadeOut('slow');
					flickApp.getLetter( user[parseInt(tempid)] , tempid);
				});
				
			}

		},		
	});

}	

$(function(){
	flickApp.init();

	//MOBILE MENU DISPLAY
	$('.mobile-menu').click(function(e){
		e.preventDefault();
		$('.secondary').slideToggle('fast');
	});

});


$(document).ready(function() { 
  $("#newTweet").on('keyup', function(event) { 
    const tweetLength = this.value.length;
    const charsLeft = 140 - tweetLength;
    $(this).parent().find(".counter").html(charsLeft);
    if (charsLeft < 0) {
      // $(this).parent().find(".counter").css( "color", "red" );
      $(this).parent().find(".counter").removeClass("black").addClass("red");
    } else { 
      // $(this).parent().find(".counter").css( "color", "black" );
      $(this).parent().find(".counter").removeClass("red").addClass("black");
    }
    
    

  })
});
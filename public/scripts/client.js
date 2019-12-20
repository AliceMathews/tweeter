$(document).ready(function() { 
  
  loadTweets();

  /* Fetch tweets
  /*********************************************************************************************/
  $('.tweetButton').click(function() {
    $('.new-tweet').slideToggle('slow', function () {
      $('#tweetText').focus();
    });
  });

  /* POST tweets asynchronously
  /*********************************************************************************************/
  $('#postTweet').submit(function(event) { 
    event.preventDefault();

    $("#error-box").addClass("hidden");
    $("#emptyTweet").addClass("hidden");
    $("#LongTweet").addClass("hidden");

    const text = $('#tweetText').val();
    if (text === "") { 
      $("#error-box").removeClass("hidden");
      $("#emptyTweet").removeClass("hidden");
    } else if (text.length > 140) { 
      $("#error-box").removeClass("hidden");
      $("#longTweet").removeClass("hidden");
    } else { 
      $.ajax("/tweets/", {
        type: "POST",
        data: $(this).serialize()
      })
      .then((res) => {
        $('#tweetText').val('');
        $(".counter").html('140');
        loadTweets();
        $('.new-tweet').toggle('slow');
      })
    }
  });

});


/*********************************************************************************************/
/* Fetch tweets
/*********************************************************************************************/
const loadTweets = function() { 
  $.ajax("/tweets")
  .then((res) => {
    renderTweets(res);
  })
}
  
/*********************************************************************************************/
/* Create tweet DOM element
/*********************************************************************************************/
const createTweetElement = function (tweetObj) { 
  const date = new Date(tweetObj.created_at);
  const dateString = timeCalc(date);

  const html = `
    <article class="tweet">
      <header>
        <div class="userIcon">
          <img class="avatar" src=${tweetObj.user.avatars}>
          <span>${tweetObj.user.name}</span> 
        </div>
        <span class="handle">${tweetObj.user.handle}</span>
      </header>
      <p class="tweetContent">${escape(tweetObj.content.text)}</p>
      <footer>
        <span>${dateString}</span>
        <span class="icons">
          <img src="/images/flag.png">
          <img src="/images/reTweet.png">
          <img src="/images/thumbsUp.png">
        </span>
      </footer>
    </article>
  `
  return html;
}
  
/*********************************************************************************************/
/* Render tweets
/*********************************************************************************************/
const renderTweets = function(data) { 
  $('#tweets-container').empty();
  for (const tweet of data) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
};


//Helper functions----------------------------------------------------------------------------------------------
const timeCalc = function(date) { 
  let timeDiff = 0;
  let unit = '';

  const tweetDate = {};
  tweetDate.year = date.getFullYear();
  tweetDate.month = date.getMonth()+1;
  tweetDate.day = date.getDate();
  tweetDate.hour = date.getHours();
  tweetDate.minute = date.getMinutes();

  const todaysDate = new Date();
  const todayDate = {};
  todayDate.year = todaysDate.getFullYear();
  todayDate.month = todaysDate.getMonth()+1;
  todayDate.day = todaysDate.getDate();
  todayDate.hour = todaysDate.getHours();
  todayDate.minute = todaysDate.getMinutes();
  
  if (tweetDate.year !== todayDate.year) { 
    timeDiff = Math.abs(tweetDate.year - todayDate.year);
    unit = 'year';
  } else if (tweetDate.month !== todayDate.month) { 
    timeDiff = Math.abs(tweetDate.month - tweetDate.month)
    unit = 'month';
  } else if (tweetDate.day !== todayDate.day) { 
    timeDiff = Math.abs(tweetDate.day - todayDate.day)
    unit = 'day';
  } else if (tweetDate.hour !== todayDate.hour) { 
    timeDiff = Math.abs(tweetDate.hour - todayDate.hour)
    unit = 'hour';
  } else { 
    timeDiff = Math.abs(tweetDate.minute - todayDate.minute)
    unit = 'minute';
  }
  
  if (timeDiff > 1) {
    return `${timeDiff} ${unit}s ago`
  } else if (timeDiff === 1) { 
    return `${timeDiff} ${unit} ago`
  } else {
    return 'Just now'
  }
}

const escape = function(str) { 
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
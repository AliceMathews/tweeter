/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() { 

  //POST tweets asynchronously
  $('#postTweet').submit(function(event) { 
    event.preventDefault();

    const text = $('#newTweet').val();
    if (text === "") { 
      window.alert("Your tweet is empty!");
    } else if (text.length > 140) { 
      window.alert("Your tweet is too long!");
    } else { 
      $.ajax("/tweets/", {
        type: "POST",
        data: $(this).serialize()
      })
      .then((res) => {
        console.log('success: ', res)
        // const resArr = [];
        // resArr.push(res)
        // renderTweets(resArr);
        loadTweets();

      })
      // .catch((err) => { 
      //   console.log('error: ', err)
      // })

    }


  });

  //Fetch tweets
  const loadTweets = function() { 
    $.ajax("/tweets")
    .then((res) => {
      renderTweets(res);
    })
    // .catch((err) => { 
    //   console.log(err);
    // })
  }
  loadTweets();

  /********************************************************************************************
  */
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
          <span class="username">${tweetObj.user.handle}</span>
        </header>
        <p class="tweetContent">${tweetObj.content.text}</p>
        <footer>
          <span>${dateString}</span>
          <span>
            <i>i1</i>
            <i>i2</i>
            <i>i3</i>
          </span>
        </footer>
      </article>
    `
    return html;
  }
  
  const renderTweets = function(data) { 
    $('#tweets-container').empty();
    for (const tweet of data) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };

});

const timeCalc = function(date) { 
  let timeDiff = 0;
  let unit = '';

  const tweetDate = {};
  tweetDate.year = date.getFullYear();
  tweetDate.month = date.getMonth()+1;
  tweetDate.day = date.getDate();

  const todaysDate = new Date();
  const todayDate = {};
  todayDate.year = todaysDate.getFullYear();
  todayDate.month = todaysDate.getMonth()+1;
  todayDate.day = todaysDate.getDate();
  
  if (tweetDate.year !== todayDate.year) { 
    timeDiff = Math.abs(tweetDate.year - todayDate.year);
    unit = 'year';
  } else if (tweetDate.month !== todayDate.month) { 
    timeDiff = Math.abs(tweetDate.month - tweetDate.month)
    unit = 'month';
  } else { 
    timeDiff = Math.abs(tweetDate.day - todayDate.day)
    unit = 'day';
  }
  
  if (timeDiff > 1) {
    return `${timeDiff} ${unit}s ago`
  } else if (timeDiff === 1) { 
    return `${timeDiff} ${unit} ago`
  } else {
    return 'Today'
  }
}
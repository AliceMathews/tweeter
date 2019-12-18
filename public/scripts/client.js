/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() { 

  //POST tweets asynchronously
  $('#postTweet').submit(function(event) { 
    event.preventDefault();
    console.log($(this).serialize())
    $.ajax("/tweets/", {
      type: "POST",
      data: $(this).serialize()
    })
    .then((res) => {
      console.log('success: ', res)
    })
    // .catch((err) => { 
    //   console.log('error: ', err)
    // })
  });

  //Fetch tweets
  const loadTweets = function() { 
    $.ajax("/tweets")
    .then((res) => {
      console.log(res)
    })
  }
  loadTweets();

  /********************************************************************************************
  */
  const createTweetElement = function (tweetObj) { 
    let dateString = '';
    let timeDiff = 0;
    let unit = '';
    
    const date = new Date(tweetObj.created_at)
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
      dateString = `${timeDiff} ${unit}s ago`
    } else { 
      dateString = `${timeDiff} ${unit} ago`
    }


    const html = `
      <article class="tweet">
        <header>
          <div class="userIcon">
            <img class="avatar" src=${tweetObj.user.avatars}>
            <span>${tweetObj.user.name}</span> 
          </div>
          <span class="username">${tweetObj.user.handle}</span>
        </header>
        <section class="tweetContent">${tweetObj.content.text}</section>
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
    for (const tweet of data) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };


  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  renderTweets(data);

});
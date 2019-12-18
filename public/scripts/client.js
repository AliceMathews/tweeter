/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() { 

  const createTweetElement = function (tweetObj) { 
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
          <span>${tweetObj.created_at}</span>
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
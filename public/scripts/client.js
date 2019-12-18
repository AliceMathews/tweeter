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
            <span>   ${tweetObj.user.name}</span> 
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
  
  
  
  
  
  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }
  
  const $tweet = createTweetElement(tweetData);
  
  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
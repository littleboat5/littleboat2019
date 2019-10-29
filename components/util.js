const G_CAT_STORIES = 'stories';
const G_CAT_JOURNALS = 'journals';
const G_CAT_PICTURES = 'pictures';
const G_CAT_INDEX = 'littleboat5';

const G_TOPIC_STORY_NOODLE = 'story-noodle';
const G_TOPIC_STORY_ANNAPURNA = 'story-annapurna';
const G_TOPIC_STORY_TEAHORSE = 'story-teahorse';
const G_TOPIC_STORY_RINPOCHE = 'story-rinpoche';
const G_TOPIC_STORY_EASTTURKEY = 'story-eastturkey';

const G_TOPIC_JOURNAL_MOROCCO = 'journal-morocco';
const G_TOPIC_JOURNAL_ANNAPURNA = 'journal-annapurna';
const G_TOPIC_JOURNAL_TEAHORSE = 'journal-teahorse';
const G_TOPIC_JOURNAL_TIBET = 'journal-tibet';
const G_TOPIC_JOURNAL_NEPAL = 'journal-nepal';
const G_TOPIC_JOURNAL_SICHUAN = 'journal-sichuan';
const G_TOPIC_JOURNAL_CHINA1999 = 'journal-china1999';
const G_TOPIC_JOURNAL_CHINA2002 = 'journal-china2002';
const G_TOPIC_JOURNAL_SILKROAD = 'journal-silkroad';

const G_TOPIC_PICTURE_CHINA2002 = 'picture-china2002';
const G_TOPIC_PICTURE_EUROPE2003 = 'picture-europe2003';
const G_TOPIC_PICTURE_ANNAPURNA = 'picture-annapurna';
const G_TOPIC_PICTURE_TIBET = 'picture-tibet';
const G_TOPIC_PICTURE_SICHUAN = 'picture-sichuan';
const G_TOPIC_PICTURE_NEPAL = 'picture-nepal';
const G_TOPIC_PICTURE_SILKROAD = 'picture-silkroad';
const G_TOPIC_PICTURE_MOROCCO = 'picture-morocco';
const G_TOPIC_PICTURE_TURKEY = 'picture-turkey';

const G_HASH_TIMEOUT = 500;
const G_LARGER = "larger";
const G_SMALLER = "smaller";

//===========================================================
function getTopicFromQueryString(){
// the query string would look like this: ?topic=xxxx

  const dir = "./../../data/";
  let param = location.search;
  param = param.indexOf("topic=") > -1 ?
          param.substr(param.indexOf("topic=")+6, param.length) : "";


  switch (param) {
// stories
    case G_TOPIC_STORY_NOODLE:
      return `${dir}stories/noodles.json`;
    case G_TOPIC_STORY_ANNAPURNA:
      return `${dir}stories/annapurna.json`;
    case G_TOPIC_STORY_TEAHORSE:
      return `${dir}stories/teahorse.json`;
    case G_TOPIC_STORY_RINPOCHE:
      return `${dir}stories/rinpoche.json`;
    case G_TOPIC_STORY_EASTTURKEY:
      return `${dir}stories/eastturkey.json`;

// jorunals
    case G_TOPIC_JOURNAL_ANNAPURNA:
      return `${dir}journals/j-annapurna.json`;
    case G_TOPIC_JOURNAL_TEAHORSE:
      return `${dir}journals/j-teahorse.json`;
    case G_TOPIC_JOURNAL_TIBET:
      return `${dir}journals/j-tibet.json`;
    case G_TOPIC_JOURNAL_NEPAL:
      return `${dir}journals/j-nepal.json`;
    case G_TOPIC_JOURNAL_SICHUAN:
      return `${dir}journals/j-sichuan.json`;
    case G_TOPIC_JOURNAL_MOROCCO:
      return `${dir}journals/morocco.json`;
    case G_TOPIC_JOURNAL_CHINA1999:
      return `${dir}journals/china-central.json`;
    case G_TOPIC_JOURNAL_CHINA2002:
      return `${dir}journals/china-solo.json`;
    case G_TOPIC_JOURNAL_SILKROAD:
      return `${dir}journals/j-silkroad.json`;

// pictures
    case G_TOPIC_PICTURE_CHINA2002:
      return `${dir}pictures/gallery-china-solo.json`;
    case G_TOPIC_PICTURE_EUROPE2003:
      return `${dir}pictures/gallery-central-europe.json`;
    case G_TOPIC_PICTURE_ANNAPURNA:
      return `${dir}pictures/gallery-annapurna.json`;
    case G_TOPIC_PICTURE_TIBET:
        return `${dir}pictures/gallery-tibet.json`;
    case G_TOPIC_PICTURE_SICHUAN:
        return `${dir}pictures/gallery-sichuan.json`;
    case G_TOPIC_PICTURE_NEPAL:
        return `${dir}pictures/gallery-nepal.json`;
    case G_TOPIC_PICTURE_SILKROAD:
        return `${dir}pictures/gallery-silkroad.json`;
    case G_TOPIC_PICTURE_MOROCCO:
        return `${dir}pictures/gallery-morocco.json`;
    case G_TOPIC_PICTURE_TURKEY:
        return `${dir}pictures/gallery-turkey.json`;

    default:
      return "";
  }
}

//===========================================================
// function getAnchorFromHash(){
//   let hash = location.hash;
//
//   return hash !== '' ? hash.replace( '#', '') : '';
// }
function jump2Anchor(){
/* check the query string to see if a "#" is provided, which indicates the
  element ID to which to jump to in the current document.
*/
  let hash = location.hash;
  hash = (hash !== '') ? hash.replace( '#', '') : '';

  if(hash){
  /* Push onto callback queue so it runs after the DOM is updated,
   this is required when navigating from a different page so that
   the element is rendered on the page before trying to getElementById.
  */
    setTimeout( ()=>{
      const element = document.getElementById(hash);
      // console.log(hash, element)
      if (element)
        element.scrollIntoView();
      }, G_HASH_TIMEOUT );
  }
}

//===========================================================
function getCategory(){
  let str = location.search; // ?topic=xxxx

  if (str.indexOf("story") > -1)
    return G_CAT_STORIES;
  else if (str.indexOf("journal") > -1)
    return G_CAT_JOURNALS;
  else if (str.indexOf("picture") > -1)
    return G_CAT_PICTURES;
  else
    return "";
}

//===========================================================
// hide navbar when scroll down, show navbar when scroll up
function manipulateNavbar(){
  let lastScrollTop = 0;
  let $navbar = $('.navbar');

  $navbar.addClass("navbar-articles"); // add class 'navbar-articles' to the nav element

  $(window).scroll( (event)=>{
    let st = $(this).scrollTop();
    // console.log("scroll:", st);

    if (st > lastScrollTop) { // scroll down
      $navbar.fadeOut();
      $navbar.hide();
    } else { //scroll up
      $navbar.fadeIn();
      $navbar.show();
    }
    lastScrollTop = st;
   });
}

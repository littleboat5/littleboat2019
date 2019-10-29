'use strict';

class Articles extends React.Component{
  constructor(props) {
    super(props);

    this.renderLinks = this.renderLinks.bind(this);
    this.renderText = this.renderText.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.renderVideos = this.renderVideos.bind(this);
    this.renderArticle = this.renderArticle.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.adjustFontSize = this.adjustFontSize.bind(this);
  }

  /*=============================================*/
  componentDidMount(){
    fetch(g_json) //json is passed down from articles.html
    .then( (res)=>{
      return res.json();
    })
    .then( (data)=>{
      this.setState({ articles: data })
    })
    .catch( err=>{console.log(err)});
  }
//===========================================================
  adjustFontSize(size){
    $('.adj-size').each( (i, obj)=>{
      let fs = $(obj).css("font-size");
      fs = parseInt( fs.replace("px", "") );

      if (size === G_LARGER)
        fs += 2;
      else if (size === G_SMALLER)
        fs -= 2;

      fs = `${fs}px`;
      $(obj).css( {"font-size": fs});
    });
  }
/*=============================================*/
  renderText( paragraph, index ){
    let p_class = "";

    if (g_category === G_CAT_JOURNALS )
      p_class = "chinese-text";

    return(
      <p className={`adj-size ${p_class} card-text`}>{paragraph}<br/></p>
    );
  }
  /*=============================================*/
  renderLinks( link, index ){
      return(
        <span>
          {index>0 ? " | " : ""}
          <a href={link.href}>{link.text}</a>
        </span>
      );
  }
  /*=============================================*/
  renderVideos( imgsrc ){
    const ext = imgsrc.slice( imgsrc.lastIndexOf('.')+1 );

    return(
      <video className="article-video" controls playsinline >
        <source src={imgsrc} type={`video/${ext}`}/>
        Sorry, your browser doesn't support embedded videos.
      </video>

    );
  }
  /*=============================================*/
  renderImages( imgsrc ){
    let img_class = "";

    if (g_category === G_CAT_JOURNALS )
      img_class = "img-below-text";

    return(
      <img className={`${img_class} card-img`} src={imgsrc}/>
    );
  }
  /*=============================================*/
  renderHeader(post){
    return(
      <header>
        <div>
          <span className="float-right">
            <button type="button" class="fs-larger" onClick={()=>this.adjustFontSize('larger')}>A</button>
            <button type="button" class="fs-smaller" onClick={()=>this.adjustFontSize('smaller')}>A</button>
          </span>
          <h2>{post.title}</h2>
        </div>

        <h6>{post.subtitle}</h6>
        <p>{post.links.map( this.renderLinks )}</p>
      </header>
    )
  }
  /*=============================================*/
  renderArticle_journal( post, index ){
    return(
      <article id={post.id}>
        {this.renderHeader(post)}

        <div className="card mb-3" >
          <div className="card-body">
            {post.text.map( this.renderText )}
          </div>
          <div className="card-body">
            {post.images.map(this.renderImages)}
            {post.videos ? post.videos.map(this.renderVideos) : ""}
          </div>
        </div>
      </article>
    );
  }
  /*=============================================*/
  renderArticle_story( post, index ){
    return(
      <article id={post.id}>
        {this.renderHeader(post)}

        <div className="card mb-3" >
          <div className="row no-gutters">
            <div className="col-md-4">
              {post.images ? post.images.map(this.renderImages) : ""}
              {post.videos ? post.videos.map(this.renderVideos) : ""}
            </div>
            <div className="col-md-8">
              <div className="card-body">
                {post.text.map( this.renderText )}
              </div>
            </div>
          </div>
        </div>

      </article>
    );
  }
  /*=============================================*/
  renderArticle( post, index ){
    if (g_category === G_CAT_JOURNALS )
      return this.renderArticle_journal( post, index);

    if (g_category === G_CAT_STORIES )
      return this.renderArticle_story( post, index);
  }
  /*=============================================*/
  render(){
// console.log(window.innerWidth)

  if (!this.state )
    return( <div></div>);

    return(
      <section>
        {this.state.articles.posts.map( this.renderArticle )}
      </section>
    );
  }
}

ReactDOM.render(<Articles/>, document.querySelector('#main_articles'));

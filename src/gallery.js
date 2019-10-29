'use strict';

class Gallery extends React.Component{
  constructor(props) {
    super(props);

    this.renderLinks = this.renderLinks.bind(this);
    this.renderText = this.renderText.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.renderVideo = this.renderVideo.bind(this);
    this.renderAudio = this.renderAudio.bind(this);
    this.renderPicture = this.renderPicture.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  /*=============================================*/
  componentDidMount(){
    fetch(g_json) //json is passed down from gallery.html
    .then( (res)=>{
      return res.json();
    })
    .then( (data)=>{
      this.setState({ pictures: data })
    })
    .catch( err=>{console.log(err)});
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
  renderImage( image ){
    // console.log(image)
    return(
      <div className="col-md-6">
        <div className="card">
          <img className="card-img-top" src={image.link}/>
          <div class="card-body">
            <p class="card-text">{image.caption}</p>
            {image.audios ? image.audios.map(this.renderAudio) : ""}
          </div>
        </div>
      </div>
    );
  }
/*=============================================*/
  renderVideo( video ){
    const ext = video.link.slice( video.link.lastIndexOf('.')+1 );

    return(
      <div className="col-md-6">
        <div className="card">
          <video className="article-video" controls playsinline >
            <source src={video.link} type={`video/${ext}`}/>
            Sorry, your browser doesn't support embedded videos.
          </video>

          <div class="card-body">
            <p class="card-text">{video.caption}</p>
          </div>
        </div>
      </div>
    );
  }
/*=============================================*/
  renderAudio( audio ){
    return(
      <audio controls src={audio.link}>
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    );
  }
  /*=============================================*/
  renderHeader(post){
    return(
      <header>
        <h2>{post.title}</h2>
        <h6>{post.subtitle}</h6>
        <p>{post.links.map( this.renderLinks )}</p>
      </header>
    )
  }

  /*=============================================*/
  renderPicture( post, index ){
    return(
      <article id={post.id}>
        {this.renderHeader(post)}

        <div className="row">
          {post.images.map(this.renderImage)}
          {post.videos ? post.videos.map(this.renderVideo) : ""}
        </div>

      </article>
    );

  }
  /*=============================================*/
  render(){
// console.log(window.innerWidth)

  if (!this.state )
    return( <div></div>);

    return(
      <section>
        {this.state.pictures.posts.map( this.renderPicture )}
      </section>
    );
  }
}

ReactDOM.render(<Gallery/>, document.querySelector('#main_gallery'));

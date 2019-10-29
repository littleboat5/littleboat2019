'use strict';

class NavBar extends React.Component{
  constructor(props) {
    super(props);

    this.renderTopicTitle = this.renderTopicTitle.bind(this);

    this.state = {
      category:  g_category,
      header: {}
    };
  }
/*=============================================*/
  componentDidMount(){
    try {
      fetch(g_json) //json is passed down from articles.html
      .then( (res)=>{
        return res.json();
      })
      .then( (data)=>{
        this.setState({ header: data.header })
      })
      .catch( err=>{console.log(err)});
    } catch (e) {
    }

  }
/*=============================================*/
  renderTopicTitle(header){

    let title = header.title ? header.title : g_category;

    let p_class = "topic-title";
    if (title && title.length > 30)
      p_class = "topic-title-sm";

    return(
      <p className={p_class}>{title}
        <span className="topic-title-year">{header ? header.year : ""}</span>
      </p>
    );
  }
/*=============================================*/
  render(){
    const {header} = this.state;

    return(
      <nav id={`navbar-${this.state.category}`} className="navbar navbar-expand-lg navbar-dark" >

        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div id="navbar" className="collapse navbar-collapse">
          <a className="navbar-brand" href="./../index.html">
            <img src="./../assets/favicon.ico" alt="littleboat5"/>
          </a>

          <ul className="navbar-nav mr-auto">
    {/* STORIES */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarStoriesDrop" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Stories
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarStoriesDrop">
                <a className="dropdown-item" href="./stories.html">View All Stories</a>
                <div class="dropdown-divider"></div>
                <a className="dropdown-item" href={`./../articles.html?topic=${G_TOPIC_STORY_NOODLE}`}>Noodle Stories</a>
                <a className="dropdown-item" href={`./../articles.html?topic=${G_TOPIC_STORY_ANNAPURNA}`}>Trekking the Himalayas</a>
                <a className="dropdown-item" href={`./../articles.html?topic=${G_TOPIC_STORY_TEAHORSE}`}>Traversing the Tea & Horse Caravan Trail</a>
                <a className="dropdown-item" href={`./../articles.html?topic=${G_TOPIC_STORY_RINPOCHE}`}>Pilgrimage to Guru Rinpoche's cave</a>
                <a className="dropdown-item" href={`./../articles.html?topic=${G_TOPIC_STORY_EASTTURKEY}`}>Roadtrip to the Turkey-Armenia border</a>
              </div>
            </li>
    {/* PICTURES */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarPicturesDrop" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Pictures
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarPicturesDrop">
                <a className="dropdown-item" href="./pictures.html">View All Pictures</a>
                <div class="dropdown-divider"></div>
                <a className="dropdown-item" href={`./../gallery.html?topic=${G_TOPIC_PICTURE_TIBET}`}>Tibet</a>
                <a className="dropdown-item" href={`./../gallery.html?topic=${G_TOPIC_PICTURE_ANNAPURNA}`}>Himalayas</a>
                <a className="dropdown-item" href={`./../gallery.html?topic=${G_TOPIC_PICTURE_NEPAL}`}>Nepal</a>
                <a className="dropdown-item" href={`./../gallery.html?topic=${G_TOPIC_PICTURE_SICHUAN}`}>Sichuan 四川</a>
                <a className="dropdown-item" href={`./../gallery.html?topic=${G_TOPIC_PICTURE_SILKROAD}`}>Silkroad</a>
                <a className="dropdown-item" href={`./../gallery.html?topic=${G_TOPIC_PICTURE_MOROCCO}`}>Morocco</a>
                <a className="dropdown-item" href={`./../gallery.html?topic=${G_TOPIC_PICTURE_EUROPE2003}`}>Czech．Slovakia．Hungary</a>
                <a className="dropdown-item" href={`./../gallery.html?topic=${G_TOPIC_PICTURE_CHINA2002}`}>徽州．江南</a>
              </div>
            </li>
    {/* JOURNALS */}
            <li className="nav-item dropdown">
              <a className="nav-link  dropdown-toggle" href="#" d="navbarJournalsDrop" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Journals
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarJournalsDrop">
                <a className="dropdown-item" href="./journals.html">View All Journals</a>
                <div class="dropdown-divider"></div>
                <a className="dropdown-item" href={`./../articles.html?topic=${G_TOPIC_JOURNAL_TEAHORSE}`}>獨走橫斷山（西南行之一）</a>
                <a className="dropdown-item" href={`./../articles.html?topic=${G_TOPIC_JOURNAL_TIBET}`}>西藏．珠峰（西南行之二）</a>
                <a className="dropdown-item" href={`./../articles.html?topic=${G_TOPIC_JOURNAL_ANNAPURNA}`}>徒步喜瑪拉雅（西南行之三）</a>
                <a className="dropdown-item" href={`./../articles.html?topic=${G_TOPIC_JOURNAL_NEPAL}`}>加德滿都（西南行之四）</a>
                <a className="dropdown-item" href={`./../articles.html?topic=${G_TOPIC_JOURNAL_SICHUAN}`}>蜀地深秋（西南行之五）</a>
                <a className="dropdown-item" href={`./../articles.html?topic=${G_TOPIC_JOURNAL_SILKROAD}`}>縱橫西域</a>
                <a className="dropdown-item" href={`./../articles.html?topic=${G_TOPIC_JOURNAL_MOROCCO}`}>北非摩洛哥</a>
                <a className="dropdown-item" href={`./../articles.html?topic=${G_TOPIC_JOURNAL_CHINA1999}`}>風霜雪雨中原行</a>
                <a className="dropdown-item" href={`./../articles.html?topic=${G_TOPIC_JOURNAL_CHINA2002}`}>獨走江南</a>
              </div>
            </li>

          </ul>
        </div>

        {this.renderTopicTitle(header)}

      </nav>
    );
  }
}


ReactDOM.render(<NavBar/>, document.querySelector('#main_navbar'));

'use strict';

class Toc extends React.Component{
  constructor(props) {
    super(props);

    this.renderEntry = this.renderEntry.bind(this);
  }

  /*=============================================*/
  componentDidMount(){
    fetch(g_json) //json is passed down from stories.html
    .then( (res)=>{
      return res.json();
    })
    .then( (data)=>{
      this.setState({ articles: data })
    })
    .catch( err=>{console.log(err)});
  }
  /*=============================================*/
  renderEntry( post, index ){
    const {header} = this.state.articles;

    return(
      <tr>
        <td className="toc-td"><a href={`${header.link}#${post.id}`}>{post.title}</a></td>
        <td className="toc-td"><small>{header.showSubTitle == 'yes' ? post.subtitle : ''}</small></td>
      </tr>
    );
  }
  /*=============================================*/
  render(){

  if (!this.state )
    return( <div></div>);

    return(
      <section className="toc">
        <h2>Table of Contents</h2>
        <table>{this.state.articles.posts.map( this.renderEntry )}</table>
      </section>
    );
  }
}


ReactDOM.render(<Toc/>, document.querySelector('#table-of-content'));

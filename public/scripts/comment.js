/**
 * Created by Administrator on 2016/5/4.
 */

let url = '/api/comments';

let Comment = React.createClass({
	rawMarkup: function() {
		let rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return {__html: rawMarkup};
	},

	render: function() {
		return <div className="comment">
			<h2 className="commentAuthor">{this.props.author}</h2>
			<span dangerouslySetInnerHTML={this.rawMarkup()} />
		</div>
	}
});

let CommentList = React.createClass({
	render: function() {
		let commentNodes = this.props.data.map(comment => {
			return <Comment author={comment.author}>{comment.text}</Comment>;
		});
		return <div className="commentList">{commentNodes}</div>;
	}
});

let CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    let author = this.refs.author.value.trim();
    let text = this.refs.text.value.trim();
    if(text && author) {
      this.props.onCommentSubmit({author: author, text: text});
      this.refs.author.value = '';
      this.refs.text.value = '';
    }
    return;
  },
	render: function() {
		return <form className="commentForm" onSubmit={this.handleSubmit}>
      <input type="text" placeholder="Your name" ref="author" />
      <input type="text" placeholder="discribe yourself" ref="text" />
      <input type="submit" value="POST" />
    </form>
	}
});

let CommentBox = React.createClass({
  getInitialState: function() {
  	return {data: []};
  },

  loadCommentsFormServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: data => this.setState({data: data}),
      error: err => console.error(err.toString())
    });
  },

  handleCommentSubmit: function(comment) {
    let comments = this.state.data;
    let newComments = comments.concat([comment]);
    this.setState({data: newComments});
    comment.id = Date.now();

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: data => {
        console.log(data);
        this.setState({data: data});
      },
      error: err => {
        console.error(err.toString());
      }
    });
  },

  componentDidMount: function() {
    this.loadCommentsFormServer();
    //setInterval(this.loadCommentsFormServer, this.props.pollInterval);
  },

  render: function() {
    return <div className="commentBox">
    	<h1>Comments</h1>
    	<CommentList data={this.state.data} />
    	<CommentForm onCommentSubmit={this.handleCommentSubmit} />
    </div>;
  }
});

ReactDOM.render(<CommentBox url={url} pollInterval={2000}/>, document.getElementById('content'));

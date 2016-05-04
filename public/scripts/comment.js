/**
 * Created by Administrator on 2016/5/4.
 */

let url = 'https://api.douban.com/v2/music';
let data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Best Day", text: "This is the best day of my life"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];

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
})

let CommentList = React.createClass({
	render: function() {
		let commentNodes = this.props.data.map(comment => {
			return <Comment author={comment.author}>{comment.text}</Comment>;
		});
		return <div className="commentList">{commentNodes}</div>;
	}
})

let CommentForm = React.createClass({
	render: function() {
		return <div className="commentForm">Hello, React ! I am a CommentForm .</div>
	}
})

let CommentBox = React.createClass({
  gitInitialState: function() {
  	return {data: []};
  },
  render: function() {
    return <div className="commentBox">
    	<h1>Comments</h1>
    	<CommentList data={this.props.data} />
    	<CommentForm />
    </div>;
  }
});

ReactDOM.render(<CommentBox data={data} />, document.getElementById('content'));

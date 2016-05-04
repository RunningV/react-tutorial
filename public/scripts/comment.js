/**
 * Created by Administrator on 2016/5/4.
 */

var CommentBox = React.createClass({
  render: function() {
    return <div className="commentBox">Hello, React!</div>;
  }
});

ReactDOM.render(<CommentBox />, document.getElementById('content'));

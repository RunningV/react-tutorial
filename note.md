1. React.createClass();
  `render`方法： 返回React组件树，最终被渲染成DOM树
2. React.createElement()，参数为{key:value}对象
3. ReactDOM.render(`ReactComponent`,`DOMNode`);
  实例化根组件，第一个参数为定义的React组件，第二个参数为页面上的DOM节点
4. getInitialState() 在组件的生命周期中仅执行一次，用于设置组件的初始化 `state` 。
  `props`与`state`区别
5. componentDidMount() 是一个组件渲染的时候被 React 自动调用的方法
6. `驼峰命名`事件名， `ref`作为属性定义标签对象，用`this.refs`引用DOM节点
7. 组件之间数据传递
  -  父组件 > 子组件
  `<ParentNode  data={data}>`  然后在子组件中用`this.props.data`调用
  -  子组件 > 父组件
  在父组件标签中传递自定义属性事件
  `<ParentNode selfAttributeEvent={handleEvent} >`
  然后在子组件中调用`this.props.selfAttributeEvent`方法

import React from 'react';
import { sendXmlHttpRequest } from '../utils/requests.js';

const url = 'http://jsonplaceholder.typicode.com/posts?';  //_start=0&_limit=10
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleDataBinding = this.handleDataBinding.bind(this);
    this.state = { response: [] }
  }
  componentWillMount() {
    this.fetchInitialData(0);
  }

  fetchInitialData(start) {
    const extendUrl = url + '_start=' + start + '&_limit=10'
    this.getserverData(extendUrl);
  }

  handlePagination(e) {
    this.fetchInitialData(e.target.value);
  }
  handleDataBinding(e){
    const extendUrl = url + '_start=0&_limit='+e.target.value
    this.getserverData(extendUrl);
  }
  getserverData(extendUrl) {
    const _this = this;
    sendXmlHttpRequest(extendUrl, 'GET', null, function (response) {
      console.log('getting server data', response);
      _this.setState({ response })
    })
  }

  render() {
    const { response } = this.state;
    console.log(response);
    return (
      <div>
        <h3>simon, helloworld!!!</h3>
        <ul>
          {response.map(function (value, id) {
            return (<li key={id}>{value.title}</li>)
          })}
        </ul>
        <h2>pagination: </h2>
        <select onChange={this.handlePagination}>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='30'>30</option>
        </select>
        <h2>data binding </h2>
        <select onChange={this.handleDataBinding}>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='30'>30</option>
        </select>
      </div>
    );
  }
}

export default App;

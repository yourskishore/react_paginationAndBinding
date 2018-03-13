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
  handleDataBinding(e) {
    const extendUrl = url + '_start=0&_limit=' + e.target.value
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
        <h2>Records</h2>
        <table borderWidth="1" cellPadding="2" cellSpacing="1" width="80%">
          <tbody>
            <tr>
              <th style={{background:'#ccc'}}>Id</th>
              <th style={{background:'#ccc'}}>Title</th>
              <th style={{background:'#ccc'}}>Body</th>
              </tr>
            {response.map(function (value, id) {
              return (
                <tr key={id}>
                  <td style={{background:'#f5f5f5',border:'1px solid #ddd',textAlign:'center'}}>{value.id}</td>
                  <td style={{background:'#f5f5f5',border:'1px solid #ddd'}}>{value.title}</td>
                  <td style={{background:'#f5f5f5',border:'1px solid #ddd'}}>{value.body}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <h2>Pagination: </h2>
        <select onChange={this.handlePagination}>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='30'>30</option>
        </select>
        <h2>Data binding: </h2>
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

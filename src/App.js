import React from 'react';
import './App.css';
import './css/main.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Content from './components/Content.js';

document.body.style = 'background: #ffff90';

class App extends React.Component {
  componentDidMount() {
    document.title = "Spring Boot first app";
  }
  render () {
      return (
      <div className="app">
        <Header/><br/>
        <Content/><br/>
        <Footer/>
      </div>
      );
  }
}

export default App;

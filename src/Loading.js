import React, {Component} from 'react';
import './App.css';


function LoadingMessage() {
    return (
      <div className="splash-screen">
        Wait a moment while we load your app.
        <div className="loading-dot">.</div>
      </div>
    );
  }
  
  function withSplashScreen(WrappedComponent) {
    return class extends Component {
      constructor(props) {
        super(props);
        this.state = {
          loading: true,
        };
      }
  
      async componentDidMount() {
          setTimeout(() => {
            this.setState({
              loading: false,
            });
          }, 2000);
        
         
      }
  
      render() 
      {
        
        return( <>
          {this.state.loading === false ? (
        <WrappedComponent {...this.props} />
        ):(LoadingMessage())}
        </> )}
    };
  }
  
  export default withSplashScreen;
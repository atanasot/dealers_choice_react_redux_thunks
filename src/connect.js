import React, {Component} from 'react'
import store from './store'

const connect = (BaseComponent) => {
    return class Connected extends Component {
      constructor() {
        super();
        this.state = store.getState();
      }
      componentWillUnmount() {
        this.unsubscribe();
      }
      componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
          this.setState(store.getState());
        });
      }
      render() {
        //console.log(this.state);
        return <BaseComponent {...this.state} />;       //passing state as props to the component
      }
    };
};

export default connect
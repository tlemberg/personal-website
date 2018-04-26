import * as React from 'react';
import * as _ from 'lodash';
import './Winning.css';

const N_COLUMNS = 150;
const MAX_STORIES = 5;
const STORY_HEIGHT = 40;

class Dog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jumping: false,
      spinning: false,
    };
  }

  componentWillReceiveProps(props) {
    setTimeout(() => {
      setInterval(() => {
        this.setState({ jumping: true });
        setTimeout(() => {
          this.setState({ jumping: false });
        }, 200);
      }, 2000);
    }, Math.random() * 5000);
    setTimeout(() => {
      setInterval(() => {
        this.setState({ spinning: true });
        setTimeout(() => {
          this.setState({ spinning: false });
        }, 200);
      }, 2000);
    }, Math.random() * 5000);
  }

  render() {
    const spinType = Math.random() > .5 ? 'Dog-spin' : 'Dog-spin-reverse';
    return (
      <div style={{
        transform: `translateY(-${this.state.jumping ? 40 : 0}px)`,
        transition: 'transform 200ms',
        animation: this.state.spinning ? `${spinType} 10s linear` : undefined,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
      }}>
        <img
          src={require('./assets/images/dog.svg')}
          width={40}
          height={40}
        />
      </div>
    );
  }
}

class Winning extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }
  componentWillReceiveProps(props) {
    const nItems = props.reducedWidth ? 8 : 16;
    this.setState({
      items: _.range(nItems).map(() => ({
        type: Math.random() > .4 ? 'dog' : 'lamp',
        flex: 1 + Math.random() / 2 - .25,
      }))
    });
  }
  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: '100vw',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          width: '90%',
        }}>
          {this.state.items.map(item => {
            let content;
            if (item.type === 'dog') {
              content = <Dog />;
            } else {
              content = <img
                src={require('./assets/images/lamp.svg')}
                width={STORY_HEIGHT * 1.5}
                height={STORY_HEIGHT * 1.5}
              />;
            }
            return (
              <div style={{
                display: 'flex',
                flex: item.flex,
                flexShrink: 0,
                alignItems: 'flex-end',
              }}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Winning;
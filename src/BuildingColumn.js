import * as React from 'react';
import * as _ from 'lodash';

const STORY_HEIGHT = 40;
const MAX_STORIES = 5;
const WINDOW_HEIGHT = 16;

class AngleLeftRoof extends React.Component {
  render() {
    return (
      <div style={{
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: `${STORY_HEIGHT / 2}px 0 0 ${STORY_HEIGHT}px`,
        borderColor: 'transparent transparent transparent white',
      }} />
    );
  }
}

class AngleRightRoof extends React.Component {
  render() {
    return (
      <div style={{
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: `0 0 ${STORY_HEIGHT / 2}px ${STORY_HEIGHT}px`,
        borderColor: 'transparent transparent white transparent',
      }} />
    );
  }
}

class AngleMiddleRoof extends React.Component {
  render() {
    return (
      <div style={{
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: `0 ${STORY_HEIGHT / 2}px ${STORY_HEIGHT / 2}px ${STORY_HEIGHT / 2}px`,
        borderColor: 'transparent transparent white transparent',
      }} />
    );
  }
}

class StoryBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowOpacity: 0,
    };
  }

  componentDidUpdate() {
    if (this.props.isMagic) {
      setTimeout(() => {
        if (this.props.isMagic) {
          setTimeout(() => {
            if (this.props.isMagic) {
              this.setState({ windowOpacity: 1 });
            }
          }, 100);
          setTimeout(() => {
            this.setState({ windowOpacity: 0 });
          }, 2000);
          setTimeout(() => {
            if (this.props.isMagic) {
              this.props.onMagicWindowFadeOut();
            }
          }, 4000)
        }
      }, 1000);
    }
  }

  componentWillUnmount() {
    if (this.props.isMagic) {
      this.props.onMagicWindowFadeOut();
    }
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          backgroundColor: 'white',
          width: STORY_HEIGHT,
          height: (STORY_HEIGHT - WINDOW_HEIGHT) / 2,
        }} />
        <div style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <div style={{
            backgroundColor: 'white',
            width: (STORY_HEIGHT - WINDOW_HEIGHT) / 2,
            height: WINDOW_HEIGHT,
          }} />
          <div style={{
            width: WINDOW_HEIGHT,
            height: WINDOW_HEIGHT,
            opacity: this.state.windowOpacity,
            transition: 'opacity 2000ms',
            backgroundColor: '#fef67f',
            cursor: this.props.isMagic ? 'pointer' : undefined,
          }} onClick={this.props.isMagic ? () => {
            this.props.onMagicWindowClick();
          } : undefined} />
          <div style={{
            backgroundColor: 'white',
            width: (STORY_HEIGHT - WINDOW_HEIGHT) / 2,
            height: WINDOW_HEIGHT,
          }} />
        </div>
        <div style={{
          backgroundColor: 'white',
          width: STORY_HEIGHT,
          height: (STORY_HEIGHT - WINDOW_HEIGHT) / 2,
        }} />
      </div>
    );
  }
}

class BuildingColumn extends React.Component {
  render() {
    const { stories, roofType, showTrees, magicStory } = this.props;
    if (showTrees) {
      return (
        <div style={{
          marginLeft: STORY_HEIGHT,
          marginRight: STORY_HEIGHT,
          display: 'flex',
          alignItems: 'flex-end',
        }}>
          <div style={{
            width: STORY_HEIGHT,
            height: STORY_HEIGHT * (MAX_STORIES - 1.5) - 4,
          }} />
          <img
            src={require('./assets/images/tree.svg')}
            width={STORY_HEIGHT * 1.5}
            height={STORY_HEIGHT * 1.5}
          />
        </div>
      );
    } else {
      const storyBlocks = [];
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            width: STORY_HEIGHT,
            height: STORY_HEIGHT * (MAX_STORIES - stories) - STORY_HEIGHT / 2 * (roofType !== 'square' ? 1 : 0),
          }} />
          {roofType === 'angleLeft' && <AngleLeftRoof />}
          {roofType === 'angleMiddle' && <AngleMiddleRoof />}
          {roofType === 'angleRight' && <AngleRightRoof />}
          {_.range(stories).map(i => {
            return <StoryBlock
              key={i}
              isMagic={magicStory === i}
              onMagicWindowClick={this.props.onMagicWindowClick}
              onMagicWindowFadeOut={this.props.onMagicWindowFadeOut}
            />
          })}
        </div>
      );
    }
  }
}

export default BuildingColumn;
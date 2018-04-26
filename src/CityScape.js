import * as React from 'react';
import * as _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import BuildingColumn from './BuildingColumn';
import Winning from './Winning';
import styles from './index.css';

const N_COLUMNS = 150;
const MAX_STORIES = 5;
const STORY_HEIGHT = 40;

class CityScape extends React.Component {
  constructor(props) {
    super(props);
    let columnHeights = [];
    let trees = {};
    let totalWidth = 0;
    for (let i = 0; i < N_COLUMNS; i += 1) {
      const showTrees = Math.random() < .05;
      if (showTrees && i > 2 && i < N_COLUMNS - 3) {
        trees[i] = true;
        totalWidth += STORY_HEIGHT * 3.5;
      } else {
        const stories = Math.floor(Math.random() * (MAX_STORIES - 1)) + 1;
        columnHeights.push(stories);
        totalWidth += STORY_HEIGHT;
      }
    }
    let roofTypes = [];
    for (let i = 0; i < N_COLUMNS; i += 1) {
      const columnHeight = columnHeights[i];
      const prevColumnHeight = i === 0 ? columnHeights[N_COLUMNS - 1] : columnHeights[i - 1];
      const nextColumnHeight = i === N_COLUMNS - 1 ? columnHeights[0] : columnHeights[i + 1];
      const r = Math.random();
      if (r > .4 || columnHeight === 0) {
        roofTypes.push('square');
      } else {
        if (prevColumnHeight <= columnHeight && nextColumnHeight <= columnHeight) {
          roofTypes.push('angleMiddle');
        } else if (prevColumnHeight > columnHeight && nextColumnHeight > columnHeight) {
          roofTypes.push('square');
        } else if (prevColumnHeight > columnHeight && nextColumnHeight <= columnHeight) {
          roofTypes.push('angleLeft');
        }
        else if (nextColumnHeight > columnHeight && prevColumnHeight <= columnHeight) {
          roofTypes.push('angleRight');
        }
      }
    }
    let columnParams = _.range(N_COLUMNS).map(i => ({
      stories: columnHeights[i],
      roofType: roofTypes[i],
      showTrees: trees[i] ? true : false,
    }));
    this.state = {
      columnParams,
      baseTransform: 0,
      totalWidth,
      transitionLength: 0,
      width: 400,
      height: 0,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.renderCityScape = this.renderCityScape.bind(this);
    this.resetMagicStory = this.resetMagicStory.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.resetMagicStory();
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  resetMagicStory() {
    let newMagicColumn, newMagicStory;
    let safeGuard = 100;
    while (!newMagicColumn && safeGuard > 0) {
      safeGuard -= 1;
      const nVisibleStories = Math.floor(this.state.width / STORY_HEIGHT);
      let nUpcomingTrees = 0;
      for (let i = this.state.baseTransform; i < this.state.baseTransform + nVisibleStories; i += 1) {
        const params = this.state.columnParams[i];
        if (params && params.showTrees) {
          nUpcomingTrees += 1;
        }
      }
      console.log(nVisibleStories);
      if (nVisibleStories > 6) {
        const n = Math.floor(Math.random() * (nVisibleStories - nUpcomingTrees * 3)) + this.state.baseTransform;
        console.log(this.state.columnParams);
        if (n >= this.state.columnParams.length) {
          this.setState({ winningMode: true });
          return;
        } else {
          console.log(n);
          const stories = this.state.columnParams[n].stories;
          if (stories > 0) {
            newMagicColumn = n;
            newMagicStory = Math.floor(Math.random() * stories);
          }
        }
      }
    }
    this.setState({
      magicColumn: newMagicColumn,
      magicStory: newMagicStory,
    });
  }

  renderCityScape() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: this.state.totalWidth,
      }}>
        {this.state.columnParams.map((params, i) => {
          return <BuildingColumn
            stories={params.stories}
            roofType={params.roofType}
            showTrees={params.showTrees}
            key={i}
            magicStory={this.state.magicColumn === i ? this.state.magicStory : undefined}
            onMagicWindowClick={() => {
              const nVisibleStories = Math.floor(this.state.width / STORY_HEIGHT);
              this.setState({
                baseTransform: this.state.baseTransform + Math.max(Math.floor(nVisibleStories / 2), 10),
              }, () => {
                if (this.state.baseTransform > N_COLUMNS - 10) {
                  this.setState({ winningMode: true });
                } else {
                  this.resetMagicStory();
                }
              });
            }}
            onMagicWindowFadeOut={() => {
              if (!this.state.winningMode) {
                this.resetMagicStory();
              }
            }}
          />
        })}
      </div>
    );
  }

  render() {
    console.log(this.state);
    let treeCount = 0;
    for (let i = 0; i < this.state.baseTransform; i += 1) {
      if (this.state.columnParams[i].showTrees) {
        treeCount += 1;
      }
    }
    console.log(treeCount);
    const transform = this.state.winningMode ? this.state.totalWidth + STORY_HEIGHT * 10 : this.state.baseTransform * STORY_HEIGHT + treeCount * STORY_HEIGHT * 3;
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        transform: `translateX(-${transform}px)`,
        transition: 'transform 400ms ',
        alignItems: 'flex-end',
      }}>
        {this.renderCityScape()}
        <div style={{
          display: 'flex',
          width: STORY_HEIGHT * 10,
          height: 100,
          flexShrink: 0,
        }} />
        <div style={{
          justifyContent: 'flex-end',
        }}>
          <Winning reducedWidth={this.state.width < 600 ? true : false}/>
        </div>
      </div>
    );
  }
}

export default CityScape;
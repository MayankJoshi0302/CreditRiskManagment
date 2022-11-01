import React from "react";
import "./ProgressBar.css";

// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

// const percentage = 66;

// <CircularProgressbar
//     value={percentage}
//     text={`${percentage}%`}
//     styles={buildStyles({
//         // Rotation of path and trail, in number of turns (0-1)
//         rotation: 0.25,

//         // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
//         strokeLinecap: 'butt',

//         // Text size
//         textSize: '16px',

//         // How long animation takes to go from one percentage to another, in seconds
//         pathTransitionDuration: 0.5,

//         // Can specify path transition in more detail, or remove it entirely
//         // pathTransition: 'none',

//         // Colors
//         pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
//         textColor: '#f88',
//         trailColor: '#d6d6d6',
//         backgroundColor: '#3e98c7',
//     })}
// />;
// // buildStyles is a shorthand, but you can also build the styles object yourself. It's an object with root, path, trail, text, and background properties, which are each a set of inline styles to apply to the relevant SVG subcomponent. Here's the equivalent set of styles as above, without using buildStyles:

// <CircularProgressbar
//     value={percentage}
//     text={`${percentage}%`}
//     styles={{
//         // Customize the root svg element
//         root: {},
//         // Customize the path, i.e. the "completed progress"
//         path: {
//             // Path color
//             stroke: `rgba(62, 152, 199, ${percentage / 100})`,
//             // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
//             strokeLinecap: 'butt',
//             // Customize transition animation
//             transition: 'stroke-dashoffset 0.5s ease 0s',
//             // Rotate the path
//             transform: 'rotate(0.25turn)',
//             transformOrigin: 'center center',
//         },
//         // Customize the circle behind the path, i.e. the "total progress"
//         trail: {
//             // Trail color
//             stroke: '#d6d6d6',
//             // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
//             strokeLinecap: 'butt',
//             // Rotate the trail
//             transform: 'rotate(0.25turn)',
//             transformOrigin: 'center center',
//         },
//         // Customize the text
//         text: {
//             // Text color
//             fill: '#f88',
//             // Text size
//             fontSize: '16px',
//         },
//         // Customize background - only used when the `background` prop is true
//         background: {
//             fill: '#3e98c7',
//         },
//     }}
// />

//  export default CircularProgressbar;

class CircularProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // Size of the enclosing square
    const sqSize = this.props.sqSize;
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (this.props.sqSize - this.props.strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - (dashArray * this.props.percentage) / 100;

    return (
      <svg
        width={this.props.sqSize}
        height={this.props.sqSize}
        viewBox={viewBox}
      >
        <circle
          className="circle-background"
          cx={this.props.sqSize / 2}
          cy={this.props.sqSize / 2}
          r={radius}
          strokeWidth={`${this.props.strokeWidth}px`}
        />
        <circle
          className="circle-progress"
          cx={this.props.sqSize / 2}
          cy={this.props.sqSize / 2}
          r={radius}
          strokeWidth={`${this.props.strokeWidth}px`}
          // Start progress marker at 12 O'Clock
          transform={`rotate(-90 ${this.props.sqSize / 2} ${
            this.props.sqSize / 2
          })`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
        />
        <text
          className="circle-text"
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
        >
          {`${this.props.percentage}`}
        </text>
      </svg>
    );
  }
}

CircularProgressBar.defaultProps = {
  sqSize: 102,
  percentage: 100,
  strokeWidth: 10,
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      percentage: 100,
    };

    this.handleChangeEvent = this.handleChangeEvent.bind(this);
  }

  handleChangeEvent(event) {
    this.setState({
      percentage: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <CircularProgressBar
          strokeWidth="10"
          sqSize="200"
          percentage={this.state.percentage}
        />
        <div>
          <input
            id="progressInput"
            type="range"
            min="0"
            max="100"
            step="1"
            value={this.state.percentage}
            onChange={this.handleChangeEvent}
          />
        </div>
      </div>
    );
  }
}
export default CircularProgressBar;

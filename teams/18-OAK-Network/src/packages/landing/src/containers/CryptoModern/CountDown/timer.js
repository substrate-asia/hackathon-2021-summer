import React from 'react';

// function component
const StaticCard = ({ position, digit }) => {
  return (
    <div className={position}>
      <span>{digit}</span>
    </div>
  );
};

// function component
const NormalUnitContainer = ({ digit, unit = 'time', countdown }) => {
  // assign digit values
  let currentDigit = digit;
  let previousDigit;
  if (countdown) {
    previousDigit = digit + 1;

    // to prevent a negative value
    if (unit !== 'hours') {
      previousDigit = previousDigit === 60 ? 59 : previousDigit;
    } else {
      previousDigit = previousDigit === 24 ? 23 : previousDigit;
    }
  }
  // add zero
  if (currentDigit < 10) {
    currentDigit = `0${currentDigit}`;
  }
  if (previousDigit < 10) {
    previousDigit = `0${previousDigit}`;
  }

  return (
    <div className={'NormalUnitContainer'}>
      <StaticCard position={'NormalupperCard'} digit={currentDigit} />

      <div className="digitLabel">
        <label>{unit}</label>
      </div>
    </div>
  );
};

function getTimeRemaining(endtime) {
  let t = Date.parse(endtime) - Date.parse(new Date());
  let days = Math.floor(t / (1000 * 60 * 60 * 24));
  let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let seconds = Math.floor((t / 1000) % 60);
  return {
    time: t,
    days,
    hours,
    minutes,
    seconds,
  };
}

// class component
class NormalClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.updateTime(), 50);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  updateTime() {
    const { days, hours, minutes, seconds } = getTimeRemaining(
      this.props.countdown
    );

    if (days !== this.state.days) {
      this.setState({
        days,
      });
    }

    // on hour chanage, update hours and shuffle state
    if (hours !== this.state.hours) {
      this.setState({
        hours,
      });
    }
    // on minute chanage, update minutes and shuffle state
    if (minutes !== this.state.minutes) {
      this.setState({
        minutes,
      });
    }
    // on second chanage, update seconds and shuffle state
    if (seconds !== this.state.seconds) {
      this.setState({
        seconds,
      });
    }
  }

  render() {
    // state object destructuring
    const { days, hours, minutes, seconds } = this.state;
    const { countdown, divider } = this.props;
    return (
      <div className={'NormalClock'}>
        <NormalUnitContainer countdown={countdown} unit={'days'} digit={days} />
        {divider ? <span className="dividerColon">:</span> : ''}
        <NormalUnitContainer
          countdown={countdown}
          unit={'hours'}
          digit={hours}
        />
        {divider ? <span className="dividerColon">:</span> : ''}
        <NormalUnitContainer
          countdown={countdown}
          unit={'minutes'}
          digit={minutes}
        />
        {divider ? <span className="dividerColon">:</span> : ''}
        <NormalUnitContainer
          countdown={countdown}
          unit={'seconds'}
          digit={seconds}
        />
      </div>
    );
  }
}

export default NormalClock;

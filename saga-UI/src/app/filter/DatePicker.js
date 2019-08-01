import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment"; 
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
class DateRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment()
    };
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange(this);
  }    
  
 
  handleStartDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleEndDateChange(date) {
    this.setState({
      endDate: date
    });
  }
 
  render() {
    return (
      <div>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleStartDateChange}
        />
        <DatePicker
          selected={this.state.endDate}
          onChange={this.handleEndDateChange}
        />
      </div>
    );
  }
}


export default DateRange;
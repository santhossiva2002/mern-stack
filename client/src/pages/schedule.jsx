import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './sc.css';
import axios from 'axios';

class Schedule extends Component {
  constructor() {
    super();
    this.state = {
      filter: 'all',
      scheduleData: [],
      trainDetails: null,
      showLoader: true,
      userTrainNumber: '',
      fromStation: 'MAS',
      toStation: 'CBE',
    };
  }

  componentDidMount() {
    this.fetchTrainDetails('');
  }

  fetchTrainDetails = (trainNumber) => {
    let url;
  
    if (trainNumber.trim() !== '') {
      url = `http://localhost:4000/api/trains/getTrain/${trainNumber}`;
    } else {
      const { fromStation, toStation } = this.state;
      url = `http://localhost:4000/api/trains-between-stations/${fromStation}/${toStation}`;
    }
  
    axios.get(url)
      .then((response) => {
        const trainDetails = response.data.data.train_base || response.data.data; // Adjust this line
  
        if (trainDetails) {
          console.log(trainDetails);
          this.setState({ trainDetails, showLoader: false });
        } else {
          this.setState({ showLoader: false });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ showLoader: false });
      });
  };
  

  handleTrainNumberChange = (event) => {
    this.setState({ userTrainNumber: event.target.value });
  };

  handleTrainNumberSubmit = (event) => {
    event.preventDefault();
    const { userTrainNumber } = this.state;
    this.setState({ showLoader: true });
    this.fetchTrainDetails(userTrainNumber);
  };

  handleFromStationChange = (event) => {
    this.setState({ fromStation: event.target.value });
  };

  handleToStationChange = (event) => {
    this.setState({ toStation: event.target.value });
  };

  handleStationSubmit = (event) => {
    event.preventDefault();
    this.setState({ showLoader: true });
    this.fetchTrainDetails('');
  };

  filterSelection = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { trainDetails, showLoader, userTrainNumber, fromStation, toStation } = this.state;
    return (
      <div className="main">
       <div className="nav">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
            <Link to="/Weather">Weather</Link>

            </li>
            <li>
              <a href="/feedback">Feedback</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="/About">About</a>
            </li>
          </ul>
          <button className="buttons" >Logout
          </button>
        </div>
        <hr />
        <div className="search">
          
          <div className="formdiv">
            <form onSubmit={this.handleStationSubmit}>
              <div className="form">
              <label htmlFor="country1">FROM :</label>
              <select
                id="country1"
                name="country"
                value={fromStation}
                onChange={this.handleFromStationChange}
              >
                <option value="MAS">Chennai</option>
              </select>
              <label htmlFor="country2">TO :</label>
              <select
                id="country2"
                name="country1"
                value={toStation}
                onChange={this.handleToStationChange}
              >
                <option value="CBE">Coimbatore</option>
              </select>
              <input type="submit" id="submit" value="Submit" />
              </div>
              <div className="vi1"></div>
             
              <div className="trainno">
            <label htmlFor="trainNumber">Train No:</label>
            <input
              type="text"
              id="trainNumber"
              name="trainNumber"
              value={userTrainNumber}
              onChange={this.handleTrainNumberChange}
            />
            <button  className="trainbtn" onClick={this.handleTrainNumberSubmit}>Submit</button>
          </div>
          
            </form>

          </div>
          
        
        </div>
       
        <br /><br />
        <div className="formdiv">
          <form>
            {/* Additional form elements if needed */}
          </form>
        </div>
        <hr className="s2" />
        <div className="MAIN">
          <div className="container">
            <table className="my-table">
              <thead>
                <tr>
                  <th>Train Name</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Train Type</th>
                  <th>Travel Time</th>
                </tr>
              </thead>
              <tbody>
  {showLoader ? (
    <tr>
      <td colSpan="5">
        <div className="Rloader"></div>
        <div className="loader1"></div>
      </td>
    </tr>
  ) : (
    trainDetails ? (
      Array.isArray(trainDetails) ? (
        trainDetails.map((train, index) => (
          <tr key={index}>
            <td>{train.train_base?.train_name || train.train_name}</td>
            <td>{train.train_base?.from_stn_name || train.from_stn_name}</td>
            <td>{train.train_base?.to_stn_name || train.to_stn_name}</td>
            <td>{train.train_base?.type || train.type}</td>
            <td>{train.train_base?.travel_time || train.travel_time}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td>{trainDetails.train_base?.train_name || trainDetails.train_name}</td>
          <td>{trainDetails.train_base?.from_stn_name || trainDetails.from_stn_name}</td>
          <td>{trainDetails.train_base?.to_stn_name || trainDetails.to_stn_name}</td>
          <td>{trainDetails.train_base?.type || trainDetails.type}</td>
          <td>{trainDetails.train_base?.travel_time || trainDetails.travel_time}</td>
        </tr>
      )
    ) : (
      <tr>
        <td colSpan="5">No data found</td>
      </tr>
    )
  )}
</tbody>

            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Schedule;

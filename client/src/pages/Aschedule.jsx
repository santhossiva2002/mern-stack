import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import styles from './ac.module.css';

class Aschedule extends Component {
  constructor() {
    super();
    this.state = {
      filter: 'all',
      airwayData: [],
      showLoader: true,
      fromStation: 'MAS',
      toStation: 'CBE',
      userFlightNumber: '',
    };
  }

  componentDidMount() {
    this.fetchAirwayData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.filter !== prevState.filter ||
      this.state.fromStation !== prevState.fromStation ||
      this.state.toStation !== prevState.toStation ||
      this.state.userFlightNumber !== prevState.userFlightNumber
    ) {
      this.fetchAirwayData();
    }
  }

  fetchAirwayData() {
    const { filter, fromStation, toStation, userFlightNumber } = this.state;
    let apiUrl = '';

    if (filter === 'all') {
      apiUrl = 'http://localhost:4000/api/getAll';
    } else if (filter === 'station') {
      apiUrl = `http://localhost:4000/api/getByStation/${fromStation}/${toStation}`;
    } else if (filter === 'flightNumber') {
      apiUrl = `http://localhost:4000/api/airways/${userFlightNumber}`;
    }

    axios.get(apiUrl)
      .then((response) => {
        let airwayData = response.data;

        // Check if the data is an object and convert it to an array
        if (!Array.isArray(airwayData) && typeof airwayData === 'object') {
          airwayData = [airwayData];
        }

        this.setState({ airwayData });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ showLoader: false });
      });
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value });
  };

  handleFromStationChange = (event) => {
    this.setState({ fromStation: event.target.value });
  };

  handleToStationChange = (event) => {
    this.setState({ toStation: event.target.value });
  };

  handleUserFlightNumberChange = (event) => {
    this.setState({ userFlightNumber: event.target.value });
  };

  handleTrainNumberSubmit = (event) => {
    event.preventDefault();
    this.setState({ filter: 'flightNumber', showLoader: true });
  };

  render() {
    const { showLoader, airwayData, fromStation, toStation, userFlightNumber } = this.state;

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
        </div>
        <br /><br />
        <div className={styles.formdiv}>
          <form onSubmit={this.handleTrainNumberSubmit}>
            <div className={styles.form}>
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
            <div className={styles.vi1}></div>
            <div className={styles.trainno}>
              <label htmlFor="trainNumber">Air Plane No:</label>
              <input
                type="text"
                id="trainNumber"
                name="trainNumber"
                value={userFlightNumber}
                onChange={this.handleUserFlightNumberChange}
              />
              
            </div>
          </form>
        </div>
        <hr className={styles.s2} />
        <div className={styles.MAIN}>
          <div className="container">
            <table className="my-table">
              <thead>
                <tr>
                  <th>FLIGHT NAME</th>
                  <th>DEPARTURE</th>
                  <th>ARRIVAL</th>
                  <th>STOP</th>
                  <th>FLIGHT NUMBER</th>
                </tr>
              </thead>
              <tbody>
                {showLoader ? (
                  <tr>
                    <td colSpan="5">
                      <div className="Aloader"></div>
                      <div className="loader1"></div>
                    </td>
                  </tr>
                ) : Array.isArray(airwayData) && airwayData.length > 0 ? (
                  airwayData.map((airway, index) => (
                    <tr key={index}>
                      <td>{airway.FlightName}</td>
                      <td>{airway.Departure}</td>
                      <td>{airway.Arrival}</td>
                      <td>{airway.Stop}</td>
                      <td>{airway.FlightNumber}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No data found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Aschedule;

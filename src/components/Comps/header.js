import React, { useEffect } from "react";
import { connect } from "react-redux";
import goalss from "../../api/goals";
import axios from "axios";
import styled from "styled-components";
import moment from "moment";

import {
  addScheduledGoals,
  addMergedGoals,
  showResults,
  addKey,
  addUserData,
  addUser,
  addPirate,
  addServer,
} from "../../redux/actions";
import CARD from "../Comps/card";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const DIV = styled.div`
  background-color: #696969;
  font-color: white;
`;

const DIVROW = styled.div`
  display: flex;
  background-color: #a0a0a0;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: auto;
  width: auto;
  margin-bottom: 2px;
  text-align: center;
`;

const DIVGRID = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const options = [
  "TA Test RARE.50",
  "TA Prod RETAIL (Insider)",
  "GA Test RARE.50",
  "GA Prod RETAIL (Live)",
];

const defaultOption = "SERVER";

const HEADER = (props) => {
  //   useEffect(() => {
  //     dataGet();
  //   }, [props.visual]);

  const handleChange = (e) => {
    props.addKey(e.target.value);
  };

  const userChange = (e) => {
    props.addUser(e.target.value);
  };

  const pirateChange = (e) => {
    props.addPirate(e.target.value);
  };

  const serverChange = (e) => {
    props.addServer(e.target.value);
  };

  const mergedValues = () => {
    console.log("ITT VAGYOK");
    let element = {};
    for (let start = 0; start < props.scheduled.length; start++) {
      for (let start2 = 0; start2 < props.actualUser.length; start2++) {
        if (
          props.scheduled[start].Id === props.actualUser[start2].Id &&
          props.actualUser[start2].ProgressValue > 0
        ) {
          element[props.actualUser[start2].Id] =
            props.actualUser[start2].ProgressValue;
        }
      }
    }
    props.addMergedGoals(element);
    return true;
  };

  const dataGet = async () => {
    try {
      if (!props.server) {
        window.alert("Please select a server");
        throw "not valid server error";
      }
      const response = await axios.get(
        "https://cors-anywhere.herokuapp.com/" + props.server + "/campaigns",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: props.keys,
          },
        },
        props.showResults(true)
      );

      props.addScheduledGoals(response.data);
    } catch (e) {
      console.log("ERROR: " + e);
    }
  };

  const userGet = async () => {
    if (!props.user || !props.pirate) {
      window.alert("User or Pirate data is missing");
      throw "User or pirate data is missing";
    }
    try {
      const response = await axios.get(
        "https://cors-anywhere.herokuapp.com/" +
          props.server +
          "/user/" +
          props.user +
          "/pirate/" +
          props.pirate,

        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: props.keys,
          },
        }
      );
      const adding = await props.addUserData(response.data.ScavengerHunts);
      mergedValues();
    } catch (e) {
      console.log("ERROR: " + e);
    }
  };

  return (
    <DIV>
      <div>
        <DIVROW>
          <select
            options={options}
            onChange={serverChange}
            value={defaultOption}
          >
            <option value="">SERVER</option>
            <option value="https://athservices.test.msrareservices.com/campaign/app/api">
              TA Test RARE.50
            </option>
            <option value="https://athservices.prod.msrareservices.com/campaign/app/api">
              TA Prod RETAIL (Insider)
            </option>
            <option value="https://sf.prod.athena.msrareservices.com/campaign/app/api">
              GA Test RARE.50
            </option>
            <option value="https://sf.prod.athena.msrareservices.com/campaign/app/api">
              GA Prod RETAIL (Live)
            </option>
          </select>

          <div>
            <input
              key="token"
              placeholder="hidden TOKEN"
              type="text"
              value={props.keys}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              key="userdata"
              value={props.user}
              onChange={userChange}
              placeholder="USERID"
            />
          </div>
          <div>
            <input
              key="piratedata"
              onChange={pirateChange}
              value={props.pirate}
              placeholder="PIRATEID"
            />
          </div>
          <div>
            <button onClick={() => userGet()}>PROGRESS</button>
          </div>
          <div>
            <button onClick={() => dataGet(props.server)}>CAMPAIGNS</button>
          </div>
        </DIVROW>
      </div>
    </DIV>
  );
};

const mapStateToProps = (state) => {
  return {
    visual: state.visual,
    scheduled: state.scheduled,
    actualUser: state.actualUser,
    merged: state.merged,
    keys: state.keys,
    user: state.user,
    pirate: state.pirate,
    server: state.server,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addScheduledGoals: (payload) => dispatch(addScheduledGoals(payload)),
    addMergedGoals: (payload) => dispatch(addMergedGoals(payload)),
    showResults: (payload) => dispatch(showResults(payload)),
    addKey: (payload) => dispatch(addKey(payload)),
    addUserData: (payload) => dispatch(addUserData(payload)),
    addUser: (payload) => dispatch(addUser(payload)),
    addPirate: (payload) => dispatch(addPirate(payload)),
    addServer: (payload) => dispatch(addServer(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HEADER);

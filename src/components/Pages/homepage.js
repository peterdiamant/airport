import React, { useEffect } from "react";
import { connect } from "react-redux";
import goalss from "../../api/goals";
import styled from "styled-components";
import moment from "moment";
import HEADER from "../Comps/header";

import {
  addScheduledGoals,
  addMergedGoals,
  showResults,
  addKey,
  addUserData,
} from "../../redux/actions";
import CARD from "../Comps/card";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const HOMEPAGE = (props) => {
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

  const mergedValues = () => {
    let element = {};
    for (let start = 0; start < props.scheduled.length; start++) {
      for (let start2 = 0; start2 < props.actualUser.length; start2++) {
        if (props.scheduled[start].Id === props.actualUser[start2].Id) {
          element[props.actualUser[start2].Id] =
            props.actualUser[start2].Threshold;
        }
      }
    }
    props.addMergedGoals(element);
    return true;
  };

  const dataGet = async (text) => {
    try {
      const response = await goalss.get(
        "/campaigns",
        null,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
        props.showResults(true)
      );

      props.addScheduledGoals(response.data);
    } catch (e) {
      console.log("ERROR: " + e);
    }
  };

  const userGet = async (text) => {
    try {
      const response = await goalss.get("/user/1/pirate/1", null, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      props.addUserData(response.data.ScavengerHunts);
    } catch (e) {
      console.log("ERROR: " + e);
    }
  };

  const handleChange = (e) => {
    props.addKey(e.target.value);
  };

  const goals = props.scheduled.map((goals) => {
    let backgroundColor = "";
    const VisibleFrom = moment(goals.VisibleFrom).format("LLL");
    const VisibleUntil = moment(goals.VisibleUntil).format("LLL");
    const ActiveFrom = moment(goals.ActiveFrom).format("LLL");
    const ActiveUntil = moment(goals.ActiveUntil).format("LLL");
    const campaigns = goals.Stats.map((stats) => stats.StatName).join(", ");
    const rewards = goals.Rewards.map((rewards) => rewards.RewardId).join(", ");

    if (ActiveUntil > moment().format("LLL")) {
      console.log("ACTIVE: " + ActiveUntil);
      console.log("DAY: " + moment().format("LLL"));
      backgroundColor = "green";
    } else if (
      ActiveUntil < moment().format("LLL") &&
      VisibleUntil > moment().format("LLL")
    ) {
      backgroundColor = "blue";
    } else if (
      ActiveUntil < moment().format("LLL") &&
      VisibleUntil < moment().format("LLL")
    ) {
      backgroundColor = "grey";
    }

    return (
      <CARD
        title={goals.Meta.title}
        id={goals.Id}
        fullstat={campaigns}
        background={backgroundColor}
        stats={
          campaigns.length > 200
            ? campaigns.slice(0, 200) + "...(more)"
            : campaigns
        }
        rewardid={
          rewards.length > 200 ? rewards.slice(0, 200) + "...(more)" : rewards
        }
        // statname={goals.Stats[0].StatName}
        threshold={goals.Stats[0].Threshold}
        visiblefrom={VisibleFrom.toString()}
        visibleuntil={VisibleUntil.toString()}
        activefrom={ActiveFrom.toString()}
        activeuntil={ActiveUntil.toString()}
        threshold2={props.merged[goals.Id] ? props.merged[goals.Id] : null}
      />
    );
  });

  return (
    <DIV>
      <div>
        <HEADER />
        {props.visual && <DIVGRID> {goals} </DIVGRID>}{" "}
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
    key: state.key,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addScheduledGoals: (payload) => dispatch(addScheduledGoals(payload)),
    addMergedGoals: (payload) => dispatch(addMergedGoals(payload)),
    showResults: (payload) => dispatch(showResults(payload)),
    addKey: (payload) => dispatch(addKey(payload)),
    addUserData: (payload) => dispatch(addUserData(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HOMEPAGE);

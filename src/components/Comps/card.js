import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card, ListGroup, Dropdown } from "react-bootstrap";
import goals from "../../api/goals";
import Tooltip from "@material-ui/core/Tooltip";
import styled from "styled-components";
import { addScheduledGoals, addMergedGoals } from "../../redux/actions";

const CARD = (props) => {
  let StatName = [];
  const DIV = styled.div`
    display: flex;
    color: white;
    background-color: #a0a0a0;
    font-size: 8px;
    justify-content: left;
    align-items: left;
    flex-direction: column;
    height: auto;
    width: auto;
    border: 2px solid black;
    text-align: left;
    position: relative;
    font-color: white;
  `;
  const DIVNORMAL = styled.div`
    margin-bottom: 10px;
  `;

  const DIVTITLE = styled.div`
    font-size: 12px;
    font-style: bold;
    margin-bottom: 10px;
  `;

  const DIVLEFT = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
  `;

  const DIVRIGHT = styled.div`
    margin-top: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 12px;
    font-style: bold;
  `;

  const DIV3 = styled.div`
    margin-top: 2px;
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 16px;
  `;

  const DIV2 = styled.div`
    display: flex;
    font-size: 8px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    -ms-word-break: break-all;
    justify-content: center;
    align-items: center;
    background: #ffc;
    flex-direction: column;
    height: auto;
    width: auto;

    margin-bottom: 10px;
    margin-right: 2px;
    text-align: center;
    position: relative;
    padding-bottom: 10px;
  `;

  const H1 = styled.h1`
    text-align: center;
  `;
  const {
    title,
    id,
    stats,
    rewardid,
    statname,
    fullstat,
    threshold,
    visiblefrom,
    visibleuntil,
    activefrom,
    activeuntil,
    threshold2,
    background,
  } = props;

  return (
    <>
      {props.visual && (
        <DIV style={{ "background-color": background, "font-color": "white" }}>
          <DIVTITLE>{title}</DIVTITLE>
          <DIVNORMAL>
            <div>
              <span style={{ "background-color": "blue" }}>
                <b>VISIBLE: </b> {visiblefrom} - {visibleuntil}
              </span>
            </div>
          </DIVNORMAL>
          <DIVNORMAL>
            <div>
              <span style={{ "background-color": "green" }}>
                <b>ACTIVE: </b> {activefrom} - {activeuntil}
              </span>
            </div>
          </DIVNORMAL>
          <Tooltip title={fullstat} placement="top">
            <DIVNORMAL>
              <div>
                <b>CAMPAIGNS</b>
              </div>
              <div>{stats != null ? stats : null}</div>
            </DIVNORMAL>
          </Tooltip>
          <DIVNORMAL>
            <div>
              <b>REWARDS</b>
            </div>
            <div>{rewardid != null ? rewardid : null}</div>
          </DIVNORMAL>

          <DIVLEFT>{id}</DIVLEFT>
          {threshold2 != null ? (
            <DIVRIGHT>
              <b>
                {threshold2}/{threshold}
              </b>
            </DIVRIGHT>
          ) : null}
        </DIV>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    visual: state.visual,
    scheduled: state.scheduled,
    actualUser: state.actualUser,
    merged: state.merged,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addScheduledGoals: (payload) => dispatch(addScheduledGoals(payload)),
    addMergedGoals: (payload) => dispatch(addMergedGoals(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CARD);

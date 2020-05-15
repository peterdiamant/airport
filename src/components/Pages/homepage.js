import React, { useEffect } from "react";
import { connect } from "react-redux";
import flights from "../../api/flights";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import {
  addFlightsLuton,
  addFlightsHeathrow,
  setDataShowHeathrow,
  setDataShowLuton,
  addSearchTerm,
} from "../../redux/actions";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/BarLoader";
import styled from "styled-components";
import FLIGHTSECTION from "../Sections/flightsSection";

const DIV = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: auto;
  width: auto;
`;

const HOMEPAGE = (props) => {
  useEffect(() => {
    getAllData();
  }, []);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const getAllData = () => {
    props.setDataShowHeathrow(false);
    props.setDataShowLuton(false);
    lutonGet();
    trackPromise(heathrowGet());
  };

  const getAllSearchData = () => {
    props.setDataShowHeathrow(false);
    props.setDataShowLuton(false);
    lutonSearch(props.searchTerm);
    trackPromise(heathrowSearch(props.searchTerm));
  };

  const flightsGetLuton = async (text) => {
    const response = await flights.get("/flights/luton", null, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    props.addFlightsLuton(response.data);
    props.setDataShowLuton(true);
  };

  const flightsGetHeathrow = async (text) => {
    const response = await flights.get("/flights/heathrow", null, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    props.addFlightsHeathrow(response.data);
    props.setDataShowHeathrow(true);
  };

  const lutonGet = async (text) => {
    const response = await flights.get("/luton", null, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    flightsGetLuton();
  };

  const lutonSearch = async (flight) => {
    const response = await flights.get("flights/luton/" + flight, null, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    props.addFlightsLuton(response.data);
    props.setDataShowLuton(true);
  };

  const heathrowSearch = async (flight) => {
    const response = await flights.get("flights/heathrow/" + flight, null, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    props.addFlightsHeathrow(response.data);
    props.setDataShowHeathrow(true);
  };

  const heathrowGet = async (text) => {
    const response = await flights.get("/heathrow", null, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(JSON.stringify(response.data));
    flightsGetHeathrow();
  };

  const handleChange = (e) => {
    props.addSearchTerm(e.target.value);
  };

  const { promiseInProgress } = usePromiseTracker();

  return (
    <div>
      <DIV>
        <button
          onClick={() => {
            getAllData();
          }}
        >
          REFRESH
        </button>
        <div>
          <input name="search" onChange={handleChange} />
        </div>
        <button
          onClick={() => {
            getAllSearchData(props.searchTerm);
          }}
        >
          SEARCH FOR FLIGHT
        </button>
      </DIV>

      {props.showDataHeathrow && props.showDataLuton && <FLIGHTSECTION />}
      {promiseInProgress && (
        <>
          <div>
            <ClipLoader
              css={override}
              size={200}
              color={"green"}
              loading={!props.showDataHeathrow}
            />
          </div>
          <div>
            <ClipLoader
              css={override}
              size={200}
              color={"red"}
              loading={!props.showDataLuton}
            />
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    showDataLuton: state.showDataLuton,
    showDataHeathrow: state.showDataHeathrow,
    luton: state.luton,
    heathrow: state.heathrow,
    loading: state.loading,
    searchTerm: state.searchTerm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFlightsLuton: (payload) => dispatch(addFlightsLuton(payload)),
    addFlightsHeathrow: (payload) => dispatch(addFlightsHeathrow(payload)),
    setDataShowLuton: (payload) => dispatch(setDataShowLuton(payload)),
    setDataShowHeathrow: (payload) => dispatch(setDataShowHeathrow(payload)),
    addSearchTerm: (payload) => dispatch(addSearchTerm(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HOMEPAGE);

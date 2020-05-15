import React, { useEffect } from "react";
import { connect } from "react-redux";
import flights from "../../api/flights";
import {
  addFlightsLuton,
  addFlightsHeathrow,
  setDataShowHeathrow,
  setDataShowLuton,
} from "../../redux/actions";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/BarLoader";

import FLIGHTSECTION from "../Sections/flightsSection";

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
    heathrowGet();
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
    console.log(JSON.stringify(response.data));
    flightsGetLuton();
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

  return (
    <div>
      <button
        onClick={() => {
          getAllData();
        }}
      >
        REFRESH
      </button>

      {props.showDataHeathrow && props.showDataLuton && <FLIGHTSECTION />}
      {!props.showDataHeathrow && !props.showDataLuton && (
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFlightsLuton: (payload) => dispatch(addFlightsLuton(payload)),
    addFlightsHeathrow: (payload) => dispatch(addFlightsHeathrow(payload)),
    setDataShowLuton: (payload) => dispatch(setDataShowLuton(payload)),
    setDataShowHeathrow: (payload) => dispatch(setDataShowHeathrow(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HOMEPAGE);

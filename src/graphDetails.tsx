import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const GraphDetails = () => {
  const location = useLocation();
  const [optionsList, setOptionsList] = useState();

  useEffect(() => {
    const state = location.state.options;
    setOptionsList(state);
  }, [location]);
  return (
    <>
      {optionsList && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100vh"
          }}
        >
          High chart data Content
          <b>{optionsList?.id}</b>
          <b>{optionsList?.name}</b>
          <b>{optionsList?.value}</b>
        </div>
      )}
    </>
  );
};

export default GraphDetails;

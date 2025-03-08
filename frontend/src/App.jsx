import React, { use, useEffect } from "react";
import axios from "axios";

const App = () => {
  const fetchResponse = async () => {
    const response = await axios.get("http://localhost:5000");
    console.log(response.data);
  };

  useEffect(() => {
    fetchResponse();
  }, []);
  return (
    <>
      <div className="">This is pavan</div>
      <p>hello</p>
    </>
  );
};

export default App;

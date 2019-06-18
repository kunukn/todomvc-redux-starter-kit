import React from "react";
import Header from "../components/Header";
import MainSection from "../components/MainSection";

const App = () => {
  let [state, setState] = React.useState(0);

  React.useEffect(() => {
    let token = setInterval(() => {
      setState(Math.random().toFixed(5));
    }, 1000);

    return () => clearInterval(token);
  }, []);

  return (
    <>
      <Header debug={state} />
      <MainSection debug={state} />
    </>
  );
};

export default App;

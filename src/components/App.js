import React from "react";
import Header from "components/Header";
import MainSection from "components/MainSection";

const App = () => {
  let [state, setState] = React.useState(0);

  React.useEffect(() => {
    let token = setInterval(() => 0 && setState(Math.random().toFixed(5)), 2000);

    return () => clearInterval(token);
  }, []);

  return (
    <>
      <Header debug={state} />
      <MainSection />
    </>
  );
};

export default App;

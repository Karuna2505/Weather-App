import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ErrorScreen from "./ErrorScreen";

function App() {
  const [city, setCity] = useState();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 990);

  const [showErrorScreen, setShowErrorScreen] = useState(undefined);
  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth <= 990);
  };

  useEffect(() => {
    //check and handle if screen is in mobile mode
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const cityname = (e) => {
    setCity(e);
  };

  const setShowErrorScreenCallback = (value) => {
    setShowErrorScreen(value);
  };

  return showErrorScreen ? (
    <ErrorScreen />
  ) : (
    <>
      <Header cityname={cityname} />
      <Main
        cityName={city}
        isMobile={isMobile}
        showErrorScreen={setShowErrorScreenCallback}
      />
      <Footer />
    </>
  );
}

export default App;

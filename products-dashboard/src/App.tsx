import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { Routes } from "./routes";
import GlobalStyles from "./styles/global";

function App() {
  return (
    <>
      <SnackbarProvider
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <BrowserRouter>
          <Routes />
          <GlobalStyles />
        </BrowserRouter>
      </SnackbarProvider>
    </>
  );
}

export default App;

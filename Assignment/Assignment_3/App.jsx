import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfileProvider } from "../src/Storage";

import PageOne from "../src/PageOne";
import PageTwo from "../src/PageTwo";
import PageThree from "../src/PageThree";

function App() {
  return (
    <BrowserRouter>
      <ProfileProvider>
        <Routes>
          <Route path="/" element={<PageOne />} />
          <Route path="/list" element={<PageTwo />} />
          <Route path="/details/:id" element={<PageThree />} />
        </Routes>
      </ProfileProvider>
    </BrowserRouter>
  );
}

export default App;

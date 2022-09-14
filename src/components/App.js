import { Routes, Route } from "react-router-dom";

import { ContactInfo, Home } from "../pages";

const Page404 = () => {
  return <h1>404 : Page not found</h1>;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="contact-info/:contactId" element={<ContactInfo />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;

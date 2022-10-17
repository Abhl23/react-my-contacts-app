import { Routes, Route } from "react-router-dom";

import { ContactInfo, Home } from "../pages";

// component to display the 404 error
const Page404 = () => {
  return <h1>404 : Page not found</h1>;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="contact-info/:contactId" element={<ContactInfo />} />
      <Route path="*" element={<Page404 />} />     {/* display the Page404 component if no path matches */}
    </Routes>
  );
}

export default App;

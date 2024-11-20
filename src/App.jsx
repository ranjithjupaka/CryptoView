import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detailed from "./pages/Detailed.jsx";
import Trading from "./pages/Trading.jsx";
import Sidebar from "./components/Sidebar";
import { SidebarItem } from "./components/Sidebar";
import { UserCircle, LayoutDashboard,File } from "lucide-react";
import Ipfs from "./pages/Ipfs.jsx";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar>
          <SidebarItem
            to="/"
            icon={<LayoutDashboard size={20} />}
            text="Home"
          />
          <SidebarItem
            icon={<UserCircle size={20} />}
            text="Trading"
            to="/Trading"
          />
          <SidebarItem
            icon={<File size={20} />}
            text="IPFS"
            to="/ipfs"
          />
          <hr className="my-3" />
        </Sidebar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/page/:pageNumber" element={<Home />}></Route>
          <Route path="/categories" element={<Home />}></Route>
          <Route path="/Trading" element={<Trading />}></Route>
          <Route path="/:id" element={<Detailed />}></Route>
          <Route path="/ipfs" element={<Ipfs />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

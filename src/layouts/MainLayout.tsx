import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";

export default function MainLayout() {
  return (
    <div>
      <div className="p-4">
        <TopBar />

        <Outlet />
      </div>
    </div>
  );
}

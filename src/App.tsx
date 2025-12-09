import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import SwipeRestaurant from "./pages/SwipeRestaurant";

function App() {

	return (
		<>
			<div className="w-screen h-screen">
				<Routes>
					<Route element={<MainLayout />}>
						<Route path="/" element={<SwipeRestaurant />}/>
					</Route>

					{/* <Route path="/" element={<Login />} /> */}
				</Routes>
			</div>
		</>
	)
}

export default App

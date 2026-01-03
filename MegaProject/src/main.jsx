import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";
import "./index.css";
import App from "./App.jsx";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import {Login, Protected, Signup} from "./components/index.js";
import AllPost from "./pages/AllPost.jsx";
import AddPost from "./pages/AddPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<Home />}>
			<Route path='' element={<Home/>} />
			<Route path='login' element={<Protected authentication={false}><Login /></Protected>} />
			<Route path='signup' element={<Protected authentication={false}><Signup /></Protected>} />
			<Route path='all-posts' element={<Protected authentication>{" "}<AllPost /></Protected>} />
			<Route path='add-post' element={<Protected authentication>{" "}<AddPost /></Protected>} />
			<Route path='edit-post/:slug' element={<Protected authentication>{" "}<EditPost /></Protected>} />
			<Route path='post/:slug' element={<Post />} />
		</Route>
	)
);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
      <RouterProvider router={router}/>
		</Provider>
	</StrictMode>
);

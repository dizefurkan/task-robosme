import { lazy } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router";

const LazyLoginPage = lazy(() => import("./pages/login"));
const LazyListPage = lazy(() => import("./pages/post-list"));
const LazyPostPage = lazy(() => import("./pages/post"));
const LazyNotFoundPage = lazy(() => import("./pages/not-found"));

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/list" element={<LazyListPage />} />
        <Route path="/post/:postId" element={<LazyPostPage />} />
      </Route>
      <Route path="/login" element={<LazyLoginPage />} />
      <Route path="/" element={<LazyLoginPage />} />
      <Route path="*" element={<LazyNotFoundPage />} />
    </Routes>
  );
}

const PrivateRoute = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) return <Navigate to="/login" />;
  return <Outlet />;
};

export default App;

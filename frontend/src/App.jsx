import { Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import MainPage from "./pages/MainPage";
import ProfilePage from './pages/ProfilePage'
import HomePage from "./pages/HomePage";
import ExplorePage from './pages/ExplorePage'
import ReelsPage from './pages/ReelsPage'
import ChatPage from './pages/ChatPage'
import PostPage from "./pages/PostPage";
import TaggedPage from "./pages/TaggedPage";
import SavedPage from "./pages/SavedPage";

function App() {
  const { isCheckingAuth, authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (!authUser && isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

          <Route path="/" element={authUser?  <MainPage /> : <Navigate to={'/login'} replace/>}>
            <Route index element={<HomePage/>} />
            <Route path="explore" element={<ExplorePage/>} />
            <Route path="reels" element={<ReelsPage/>}/>
            <Route path="create" element={<div>create</div>} />
            <Route path="profile" element={<ProfilePage/>} >

              <Route index element={<PostPage/>}/>
              <Route path="saved" element={<SavedPage/>}/>
              <Route path="tagged" element={<TaggedPage/>}/>
            </Route>
            <Route path="messages" element={<ChatPage/>} />
          </Route>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;

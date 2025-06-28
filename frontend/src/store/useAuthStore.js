import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log(res.data);
      set({ authUser: res.data.user });
    } catch (error) {
      console.log(`Error in checkAuth store useAuthStore:`, error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      console.log(res.data);
      toast.success("Signup successfully");
    } catch (error) {
      console.log(`Error in signup store useAuthStore:`, error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      console.log(`Error in login store useAuthStore:`, error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success(res.data.message);
    } catch (error) {
      console.log(`Error in logout store useAuthStore: `, error);
    }
  },

  updateProfileInfo: async (data) => {
    set({ isUpdatingProfile: true });

    try {
      const res = await axiosInstance.put('auth/update-profile-info',data)

      set({authUser:res.data})
      console.log(res.data)
            
      toast.success("Profile updated successfully")
      
    } catch (error) {
      console.log(`Error in updateProfileInfo store useAuthStore: `, error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  updateProfilePic: async (data) => {
      set({ isUpdatingProfile: true });

    try {
      const res = await axiosInstance.put('auth/change-profile-pic',data)

      set({authUser:res.data})
      console.log(res.data)
            
      toast.success("Profile pic changed successfully")
      
    } catch (error) {
      console.log(`Error in updateProfilePic store useAuthStore: `, error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  }
  
}));

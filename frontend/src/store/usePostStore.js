import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const usePostStore = create((set, get) => ({
  posts: [],
  isCreatingPost: false,
  isFetchingPost:false,

  createPost: async (data) => {
    set({ isCreatingPost: true });
    try {

        const res = await axiosInstance.post('post/create-post',data)
        console.log(res.data)
        
    } catch (error) {
      console.log(`Error in createPost store usePostStore: `, error);
    } finally {
      set({ isCreatingPost: false });
    }
  },

  fetchPost: async ()=>{
    set({isFetchingPost:true})
    
    try {
      const res = await axiosInstance.get('/post/fetch-post')
      console.log(res.data.posts)
      set({posts:res.data.posts})
      
    } catch (error) {
      console.log(`Error in fetchPost store usePostStore: `, error);
      
    }finally{
      set({isFetchingPost:false})
    }
        
  }


  
}));

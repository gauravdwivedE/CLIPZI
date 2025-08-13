import { createSlice } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'

const initialState = {
  user: null
}

export const userSlice = createSlice({  
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    
    logout: (state, action) => {
      state.user = null 
      localStorage.removeItem("token")
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, logout } = userSlice.actions

export default userSlice.reducer
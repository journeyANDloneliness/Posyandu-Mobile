import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'appStatus',
  initialState: {
	login: false,
  userID: undefined,
  settings:{}

  },
  reducers: {
    setLogin:(s, val)=>{
      s.login = val.payload;

    },
  	setUserID:(s, val)=>{
  		s.userID = val.payload;

  	},
    setSettings:(s, val) =>{
      s.settings = val.payload
    }
  	
  },
})

// Action creators are generated for each case reducer function
export const { setLogin, setUserID, setSettings } = counterSlice.actions

export default counterSlice.reducer
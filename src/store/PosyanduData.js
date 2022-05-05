import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'posyanduData',
  initialState: {
	editedData: {},
  editedDataAnak:{},
  pengukuranDataID: undefined,
  pengukuranData:{},
  pengukuranDataAnak:{},
  dataAnakTemplate:undefined,
  },
  reducers: {
  	setEditedData:(s, val)=>{
  		s.editedData = val.payload;
  		console.log(s.editedData)
  	},
    setEditedDataAnak: (s, v)=>{
      s.editedDataAnak = v.payload
      console.log(s.editedDataAnak)
    },
    setPengukuranData: (s, v) =>{
      s.pengukuranData = v.payload
    } ,
    setPengukuranDataID: (s, v) =>{
      s.pengukuranDataID = v.payload
    } ,
    setPengukuranDataAnak: (s, v) =>{
      s.pengukuranDataAnak = v.payload
    },
    setDataAnakTemplate: (s, v) =>{
      s.dataAnakTemplate = v.payload
    } 
  	
  },
})

// Action creators are generated for each case reducer function
export const { setEditedData, setEditedDataAnak, 
  setPengukuranData, setPengukuranDataID, setPengukuranDataAnak, setDataAnakTemplate} = counterSlice.actions

export default counterSlice.reducer
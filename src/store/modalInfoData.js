import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'modalInfo',
  initialState: {
	modalVis: false,
	modalText:"",
	continu: false,
	
	showCancel:false,
	showOk:true
  },
  reducers: {
  	showModal:(s, t)=>{
  		s.modalVis = true;
  		s.modalText = t.payload.text
  		//s.callBack = t.payload.callBack
  		s.showCancel = t.payload.showCancel
  		s.showOk = t.payload.showOk
  		//return s.continu
 /* 		return new Promise((resolve, reject) => {
  			if(!s.modalVis)
  				resolve(s.continu)
		});
*/  	},
  	hideModal:(s, t)=>{
  		s.modalVis = false;
  		s.continu = t.payload
  		//s.callBack();
  		s.callBack = ()=>{}
  	}
  },
})

// Action creators are generated for each case reducer function
export const { hideModal, showModal } = counterSlice.actions
export const actions = counterSlice.actions
export default counterSlice.reducer
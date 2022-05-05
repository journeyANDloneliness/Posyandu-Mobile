import { configureStore } from '@reduxjs/toolkit'
import posyanduData from './store/PosyanduData'
import modalInfo from './store/modalInfoData'
import app from './store/AppData'
export default configureStore(
	{  reducer: {
		posyanduData: posyanduData,
		modal: modalInfo,
		appData: app,
	},
})
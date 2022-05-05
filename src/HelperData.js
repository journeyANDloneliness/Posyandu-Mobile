import AsyncStorage from '@react-native-async-storage/async-storage';


export const delByKey = (id)=>{
	const removeValue = async () => {
		try {
			await AsyncStorage.removeItem(id)
		} catch(e) {
		// remove error
		}
		console.log('Done.')
	}
	removeValue();
	
}
export const getByID = (id) =>{
	var res = async () => {
	    try {
	      const value = await AsyncStorage.getItem(id)
	      console.log(value)
	      return value != undefined ? JSON.parse(value) : {};
	    } catch(e) {
	        console.log(e);
	    }
	    return {};
	};
	return res();
}
export const getAllKeys = ()=>{
	let keys = []
	const fun = async () => {
	  	
		try {
			keys = await AsyncStorage.getAllKeys()
			console.log("retrieve keys");
			console.log(keys);
			return keys.filter((v)=> v.startsWith("@posyandu_data") );
		} catch(e) {
		// read key error
		}
		return keys;
	  	
	}

	return fun();
}

export const save = (bef) => {
	console.log("simpan..");
	//var res = getByID(bef.id) 
	//return res.then((result)=>{
		//Object.assign(result, bef);

		const store = async (value) => {
			try {
				const jsonValue = JSON.stringify(value)
				await AsyncStorage.setItem(bef.id, jsonValue)
				console.log("success save data");
				return bef

			} catch (e) {
				console.log(e);
			}
			return bef
		}
		return store(bef);
	//});
}

export const getDataPengukuran = (id, year) =>{
	return getByID(`#${id}_${year}`)
} 

export const saveDataPengukuran = (obj) =>{

}

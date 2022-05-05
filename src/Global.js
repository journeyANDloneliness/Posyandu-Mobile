import {showMsg2 } from './HelperUi'

export const SimpleGlobal = {
	MsgBoxEl: null,
	BackDropEl : null,
	MainAppEl: null,
	backFunc:null
}

window.SGlobal = SimpleGlobal
window.flattenObject = function(obj) {
	var toReturn ={}
	for (var i in obj){
		if(!obj.hasOwnProperty(i)) continue;

		if((typeof obj[i]) == 'object' && obj[i] !== null){
			var flatObj = flattenObject(obj[i])
			for(var x in flatObj){
				if(!flatObj.hasOwnProperty(x)) continue;
				//toReturn[i+'.'+x] = flatObj[x]
				toReturn[x] = flatObj[x]
			}
		}else{
			toReturn[i] = obj[i]
		}
	}
	return toReturn
}
window.changeDeepProperty= function(props,val, obj){
	for (var i in obj){
		if(obj.hasOwnProperty(props)) {
			obj[props] = val
			return
		}
		if((typeof obj[i]) == 'object' && obj[i] !== null){
			changeDeepProperty(props,val,obj[i])
		}
	}
}
window.toBeautyArray = function(v) {
	return Object.entries(v).objectArray()
};
window.tanggalSekarang = function(join) {
	let dt=[{day:'numeric'},{month:'long'},{year:'numeric'}], newd=new Date
	return dt.map(v=>{
		return new Intl.DateTimeFormat('id',v).format(newd)
	}).join(join)
}
Array.prototype.flattenObject = function() {
	return this.map((v)=>flattenObject(v))
}
Array.prototype.getOne = function(con) {
   let c
   for (var i = 0; i < this.length; i++) {
   		if(con(this[i],i))
   			c = this[i]
   }
   return c
};
Array.prototype.toggleItems = function(items) {
	items.forEach((v)=>{
		this.toggleItem(v)
	})
	return this
};
Array.prototype.toggleItem = function(item, index) {
	if(this.includes(item))
		this.remove(item)
	else{
		if(index !== undefined){
			this.splice(index,0,item)
		}
		else this.push(item)
	}
	return this
};

Array.prototype.remove = function() {
	var what, a = arguments, L = a.length, ax;
	while (L && this.length) {
		what = a[--L];
		while ((ax = this.indexOf(what)) !== -1) {
			this.splice(ax, 1);
		}
	}
	return this;
};
Array.prototype.replace = function(thi, tha) {
	let i = this.indexOf(thi)
	if(i>=0)
		this.splice(i,1,tha)
	return this
};
Array.prototype.distributeLength = function(i, v, length, apply) {
	let left = 0;
	this.forEach((vv,ii)=>{if(i !== ii) left+=vv})
	//left += (((v*100)/length)*lAll)/100
	console.log(left)
	
	let one=0
	this.forEach((vv, ii)=> {
			if(i !== ii){
				let x = (((vv * 100)/left)*(length-v))/100 
				if(x === 0){
					one++
					x = 1
				}
				if(apply)
					apply(x, ii)
				this[ii] = x
			}
		}
	 )
	this[i] = v - one

	return this
};
Array.prototype.objectArray = function() {
	return this.map(
			(v)=>Object.entries(v[1]).map((vv)=>{
					if(typeof vv[1] === 'object' ) 
						return Object.entries(vv[1]).map((vvv)=>vvv[1])
					else return vv[1]
			}).flat())
};
Array.prototype.check = function(init, con,to, apply) {
	let fn=init
	this.forEach((v)=>{
		if(con(fn,v))
			fn = to(v)
	})
	apply(fn)
	return this
};
Array.prototype.distributeEvenly = function(length, apply) {
	let all = length/ this.length
	this.forEach((vv, ii)=> apply(all, ii))

	return this
};
Array.prototype.order = function(i, up, step = 1) {
	
	let u=this.splice(i,1)[0]

	let v =up? -step:step
	this.splice(i+v ,0,u)
	return this
};
Array.prototype.orderMatch = function(i, up, other,con, con2, step = 1) {
	let v =up? -step:step
	let i2=other.findIndex(v=> con(v,i))
	if(i2>=0 && con2(i+v, i2+v)){
		let uu=other.splice(i2,1)[0]
		other.splice(i2+v ,0,uu)
	}
	let u=this.splice(i,1)[0]
	this.splice(i+v ,0,u)
	return this
};
Array.prototype.setFun = function(fun) {
	fun([...this])
	return this
};
Array.prototype.toObj = function(data) {
	let obj={}
	this.forEach(v=>obj[v] = data)
	return obj
};
String.prototype.truncate = function(n, trun = "..."){
	return this.length > n? this.substring(0,n-1)+trun : this
}
window.randomKey = ()=>(Math.random() + 1).toString(36).substring(7)
window.generatedRandowKeys = Array.from({length:50},(v,i)=>randomKey())
document.addEventListener('deviceready',()=>{
		document.addEventListener('backbutton',()=>{
			if(window.SGlobal.backFunc)window.SGlobal.backFunc()
			else {
				showMsg2({show:true, showCancel:true,text:"keluar?", callBack:(c)=>{
					if(c)
						navigator.app.exitApp()
				}})		
			}
		}, false)
	},false)
import chroma from "chroma-js"

export const colorListHex = ["#000", "#FFF", "#AAA", "#DDD", "#F00","#00F","#0F0", "#0FF", "#FF0", "#F0F" ]
export const colorListName = ["hitam", "putih", "abu abu", "abu abu terang", 
	"merah","biru","hijau", "kuning", "ungu","orange" ]

export const colorListRgb = colorListHex.map((v)=>chroma(v).rgb())

export const colorWithName = ()=> colorListHex.map((v, i)=>{return {nama: colorWithName[i], hex: v}})

class MyColor{

}
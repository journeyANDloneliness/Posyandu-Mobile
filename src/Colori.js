

export const harmonize = (color, start, end, interval){
	const colors = [color]
	const [h, s, l] = ...color
	for (var i = start; i <= end; i+= interval) {
		const h1 = (h+ i) % 360
		const c1 = [h1, s, l]
		colors.push(c1)
	}
	return colors
}

export const complement = (color)=> harmonize(color, 180, 180, 1)
export const split = (color)=> harmonize(color, 150, 210, 60)
export const triad = (color)=> harmonize(color, 120, 240, 120)
export const tetrad = (color)=> harmonize(color, 90, 270, 90)
export const analogous = (color)=> harmonize(color, 30, 90, 30)

export default {
	complement :complement
	split :split
	triad :triad
	tetrad :tetrad
	analogous :analogous
}
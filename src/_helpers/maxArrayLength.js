export default function maxArrayLength(array, maxLength) {
	while (array.length > maxLength) {
		array.pop()
	}
	return array
}

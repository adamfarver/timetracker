export default function objectCleaner(dirtyObject) {
	const emptyKeys = Object.keys(dirtyObject).filter(
		(key) => dirtyObject[key] === ''
	)

	emptyKeys.map((key) => delete dirtyObject[key])
	const cleanObject = dirtyObject
	return cleanObject
}

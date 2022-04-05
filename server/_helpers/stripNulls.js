const stripNulls = (obj) => {
	for (const key in obj) {
		if (obj[key] === null) {
			delete obj[key]
		}
	}
	return obj
}

module.exports = {
	stripNulls,
}

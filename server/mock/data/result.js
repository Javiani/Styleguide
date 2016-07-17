export default ( data )=>{

	return Object.assign({}, {
		message 	:'',
		exception 	:'',
		success 	:false,
		data		:{}
	}, data)
}

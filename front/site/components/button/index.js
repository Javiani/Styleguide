export default ( {init, on} ) =>{

	init(()=>{
		on('click', log)
	})

	const log = ()=>{
		alert('Button was clicked!')
	}

}

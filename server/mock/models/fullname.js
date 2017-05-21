export default class {

	constructor( name = 'DefaultName DefaultLastname' ){

		let fullname = name.split(/\s/)

		this.firstname = fullname[0]
		this.lastname = fullname[1]
	}
}

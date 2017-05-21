import Fullname from './fullname'

export default class {

	constructor( data = { name:'Default name' } ){
		this.fullname = new Fullname( data.name )
	}
}

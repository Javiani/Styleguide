import User from './../models/user'

export default class{

	constructor(){

		this.state = {
			users :[
				new User({ name:'Douglas Rocco' }),
				new User({ name:'Mario Land' }),
				new User({ name:'Rebecca Silverstone' })
			]
		}
	}

	//services/get-heroes
	index(){
		return this.state
	}

	//services/get-heroes?id=1 for removing Mario
	remove( {id} ){

		this.state.users = this.state.users
			.filter( (user, index) => index != id )

		return this.state
	}

}

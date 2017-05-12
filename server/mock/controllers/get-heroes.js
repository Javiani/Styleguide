import User from './../models/user'

export default class Controller{

	index( req, res ){

		return {
			users  :[ new User(), new User() ],
			params : req.params
		}
	}

}

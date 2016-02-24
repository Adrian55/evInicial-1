module.exports = function(req, res, next) {

	  Role.findOne({name: 'alumno'}).populate('users', {id: req.session.passport.user})
	  	.then(function(role){
			if (role) {
				return next();
			}
			else {
				return res.forbidden('No tienes permiso para realizar esta accion.');
			}
				
	  	})
	  	.catch(function(error) {
	  		return res.json(error);
	  	});
			
	}

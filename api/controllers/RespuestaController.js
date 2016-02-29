/**
 * RespuestaController
 *
 * @description :: Server-side logic for managing respuestas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	almacenaRespuesta: function(req, res, next) {
		var respuestaRecibida = req.body.answered;

		Alumno.findOne({
					where: {user: req.session.passport.user}
				}).then(function(alumno){
					if(alumno){

			Respuesta.create({valor: respuestaRecibida, cuestionario: req.cuestionario, pregunta: req.pregunta,
				 alumno: alumno.id }).exec(function createCB(err, created){
  				res.send('Valor: ' + created.valor + ' Cuestionario: ' + created.cuestionario + ' Pregunta: ' + created.pregunta + ' Alumno: ' + created.alumno);

				});
		}else{
			res.send("No estas auntenticado como alumno");
		}
		});
		
	}
};
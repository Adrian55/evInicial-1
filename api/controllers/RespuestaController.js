/**
 * RespuestaController
 *
 * @description :: Server-side logic for managing respuestas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	almacenaRespuesta: function(req, res, next) {
		var respuestaRecibida = req.body.answered;
		var valor1;

		Opcion.findOne({
			where: { id: Number(respuestaRecibida) }
		}).populate('subopciones').then(function(opcion){
				
			opcion.subopciones.forEach(function(subopcion){
			
				if(subopcion.nombre=='responsefieldlines'){
					valor1=subopcion.valor; 
					
				}
				});
				console.log(req.session.passport.user);

		Alumno.findOne({
					where: {user: req.session.passport.user}
				}).then(function(alumno){
					console.log(req.session.passport.user);
					if(alumno){

			Respuesta.create({valor: valor1, 
				cuestionario: req.params.cuestionarioId, pregunta: req.params.preguntaId,
				 alumno: alumno.id }).exec(function createCB(err, created){
  				res.send('Valor' + created.valor + ' Cuestionario' + created.cuestionario + ' pregunta' + created.pregunta + ' alumno' + created.alumno);

				});
		}else{
			res.send("No estas auntenticado como alumno");
		}
		});
		
	})
}

};
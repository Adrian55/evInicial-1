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
		var valor2;
		
			
		Opcion.findOne({
			where: { id: Number(respuestaRecibida) }
		}).populate('subopciones').then(function(opcion){
				

			opcion.subopciones.forEach(function(subopcion){
				
				if(subopcion.nombre=='responserequired'){
					valor1=subopcion.valor; 
					
				}
				if(subopcion.nombre=='responsefieldlines'){
					valor2=subopcion.valor; 
					
				}
				});
				console.log(req.session.passport.user);

				Alumno.findOne({
					where: {user: req.session.passport.user}
				}).then(function(alumno){
					console.log(req.session.passport.user);
					if(alumno){

			Respuesta.create({valor: valor2, puntuacion:valor1, 
				cuestionario: req.params.cuestionarioId, pregunta: req.params.preguntaId,
				 alumno: alumno.id }).exec(function createCB(err, created){
  				res.send('Valor' + created.valor + ' Puntuacion' + created.puntuacion + ' Cuestionario' + created.cuestionario + ' pregunta' + created.pregunta + ' alumno' + created.alumno);

				});
		}else{
			res.send("No estas auntenticado como alumno");
		}
		});
		
	})
}

};
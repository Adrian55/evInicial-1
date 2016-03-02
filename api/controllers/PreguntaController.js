/**
 * PreguntaController
 *
 * @description :: Server-side logic for managing preguntas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	load: function(req, res, next) {
		Pregunta.findOne({
			where: { id: Number(req.params.preguntaId)}
		}).then(function(pregunta){
			if(pregunta) {
				req.pregunta = pregunta;
				next();
			} else { next(new Error('No existe la pregunta con el id' + req.params.preguntaId));}
		}).catch(function(error){next(error);});
	},

	corregir: function(req, res, next) {
		var respuestaCompleta = {
									answered: req.body.answered, 
									cuestionario: req.cuestionario, 
									pregunta: req.pregunta,
									usuario: req.session.passport.user
								}
console.log(req.pregunta);
		req.pregunta.corregirRespuesta(res,respuestaCompleta, function(preguntaCorregida) {
				res.json(preguntaCorregida);
			});
	},

	findOne: function(req, res) {
		Pregunta.findOne({
			where: { id: Number(req.params.id)}
		}).then(function(pregunta){
			if(pregunta) {
				preguntaJSON = pregunta.toJSON();
				} else { next(new Error('No existe la pregunta con el id' + req.params.preguntaId));}
		}).catch(function(error){next(error);});
		Opcion.find({
			pregunta:req.params.id
		}).populate('subopciones').then(function(opcion){
			if(opcion) {
				preguntaJSON.opciones = opcion;
				res.json(preguntaJSON);
			} else { next(new Error('No existen las opciones con el id' + req.params.opcionId));}
		}).catch(function(error){next(error);});
	}
};
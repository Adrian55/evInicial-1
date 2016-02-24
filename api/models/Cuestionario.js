/**
* Cuestionario.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
   nombre : { 
      type: 'string',
      size:50 
    },

    observaciones : { 
      type: 'string',
      size:255 
    },

    fechaFin : { type: 'date' },

    preguntas : {
    	collection : 'pregunta',
    	via : 'cuestionarios'
    },

    alumnos : {
    	collection : 'alumno',
    	via : 'cuestionarios'
    },
   respuestas : {
      collection : 'respuesta',
      via : 'cuestionario'
    },

    duplicar: function (cb) {
	    cuestionarioJSON = this.toJSON();
	    delete cuestionarioJSON["id"];
	    Cuestionario.create(cuestionarioJSON)
	    	.exec(function createCB(err, created){
			      if (err) return cb(err);
			      /*
			      cuestionario.preguntas.forEach(function(pregunta){
			      	created.preguntas.add(pregunta.id)
			      });
				*/
			    cb(null, created);
	    })
    },

  asociarGrupo: function (grupo, cb) {

	    while (grupo.alumnos.length){
	    	var alumno = grupo.alumnos.pop();
		    this.alumnos.add(alumno.id);
		    this.save(console.log);
	    }
    }
  },

aJSON: function(cb) {

        //Recogemos los Ids de preguntas del cuestionario en un array
        var preguntasIds = [];
        this.preguntas.forEach(function(pregunta){
          preguntasIds.push(pregunta.id)
        });

        //Buscamos las opciones correspondientes a las preguntas anteriores
        Opcion.find().where({ pregunta: preguntasIds }) // WHERE pregunta IN (preguntasIds)
            .populate('subopciones')
            .then(function(opciones){

              var cuestionario = this.toJSON();
              for (var i = 0; i < cuestionario.preguntas.length; ++i) {
                cuestionario.preguntas[i].opciones = [];
                  for (var j = 0; j < opciones.length; ++j){
                    if(Number(opciones[j].pregunta) === Number(cuestionario.preguntas[i].id)) {
                      opcion = opciones[j].toJSON();
//                      delete opcion.pregunta;
                      cuestionario.preguntas[i].opciones.push(opcion);
                    }
                  }
                }
              cb(cuestionario);
            }.bind(this)) // Importante para poder utilizar this dentro de la promesa
            .catch(function(error){});
    },

  duplicar: function (cuestionario, cb) {

  // Before doing anything else, check if a primary key value
  // was passed in instead of a record, and if so, lookup which
  // person we're even talking about:
  (function _lookupCuestionarioIfNecessary(afterLookup){
    // (this self-calling function is just for concise-ness)
    if (typeof cuestionario === 'object')
  		return afterLookup(null, cuestionario);
    Cuestionario.findOne(cuestionario).populate('preguntas').exec(afterLookup);
  })(function (err, cuestionario){
    if (err) return cb(err);
    if (!cuestionario) {
      err = new Error();
      err.message = require('util').format('No existe ningun cuestionario con el id=%s .', cuestionario);
      err.status = 404;
      return cb(err);
    }

    cuestionarioJSON = cuestionario.toJSON();
    delete cuestionarioJSON["id"];
    Cuestionario.create(cuestionarioJSON)
    	.exec(function createCB(err, created){
		      if (err) return cb(err);
		      /*
		      cuestionario.preguntas.forEach(function(pregunta){
		      	created.preguntas.add(pregunta.id)
		      });
			*/
		      cb(null, created);
    })
  });

}
};


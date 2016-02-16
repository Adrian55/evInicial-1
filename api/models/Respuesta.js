/**
* Respuesta.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    valor : { 
    	type: 'string',
    	size:255
    },


    puntuacion : { 
    	type: 'integer' 
    },

	alumno:{
		model:'Alumno'
	},
	cuestionario:{
		model:'Cuestionario'
	},
	pregunta:{
		model:'Pregunta'
	}
  }
};


/**
* Pregunta.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    enunciado : {
        type: 'string',
        size: 45
    },
    tipo : {
         type: 'string',
        enum: ['essay', 'matching', 'multichoice','numerical','shortanswer','truefalse']
    },
    cuestionarios : {
        collection : 'cuestionario',
        via : 'preguntas'
    },
    respuestas: {
        collection:'respuesta',
        via:'pregunta'
    },
    opciones: {
        collection:'opcion',
        via:'pregunta'
    }
  },
  aJSON: function(cb) {
        switch(this.tipo) {
          case 'essay':
              return this.essayToJSON();
              break;
          case 'matching':
              this.matchingToJSON(function(PreguntaJSON){cb(PreguntaJSON)});
              break;
          case 'multichoice':
              this.multichoiceToJSON(function(PreguntaJSON){cb(PreguntaJSON)});
              break;
          case 'numerical':
              this.numericalToJSON(function(PreguntaJSON){cb(PreguntaJSON)});
              break;
          case 'shortanswer':
              this.shortanswerToJSON(function(PreguntaJSON){cb(PreguntaJSON)});
              break;
          case 'truefalse':
              this.truefalseToJSON(function(PreguntaJSON){cb(PreguntaJSON)});
              break;
          default:
              break;
        }      
    },
    
    essayToJSON: function(cb) {
        var PreguntaJSON = this.toJSON();
        return Opcion.find().where({ pregunta: this.id })
        .populate('subopciones');
    },

    matchingToJSON: function(cb) {
        
    },

    multichoiceToJSON: function(cb) {

    },

    numericalToJSON: function(cb) {

    },

    shortanswerToJSON: function(cb) {

    },

    truefalseToJSON: function(cb) {

    }

};


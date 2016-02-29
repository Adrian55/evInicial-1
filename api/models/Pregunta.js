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

 corregir: function(respuestaCompleta, cb) {
      var This = this;
      switch(This.tipo) {
        case 'essay':
          This.almacenaRespuesta(respuestaCompleta, null, function(Puntos) { cb(Puntos); });
          break;
        case 'matching':
          This.corregirMatching(respuestaCompleta, function(respuestaCompleta, Puntos){ This.almacenaRespuesta(respuestaCompleta, Puntos, function(Puntos) { cb(Puntos); }); });
          break;
        case 'multichoice':
          This.corregirMultichoice(respuestaCompleta, function(respuestaCompleta, Puntos){ This.almacenaRespuesta(respuestaCompleta, Puntos, function(Puntos) { cb(Puntos); }); });
          break;
        case 'numerical':
          This.corregirNumerical(respuestaCompleta, function(respuestaCompleta, Puntos){ This.almacenaRespuesta(respuestaCompleta, Puntos, function(Puntos) { cb(Puntos); }); });
          break;
        case 'truefalse':
          This.corregirTruefalse(respuestaCompleta, function(respuestaCompleta, Puntos){ This.almacenaRespuesta(respuestaCompleta, Puntos, function(Puntos) { cb(Puntos); }); });
          break;
        default:
          break;
       }
    },


    corregirMatching: function(respuestaCompleta, cb) {
      Answered = respuestaCompleta.answered.split("$$");
      Incremento = 0;
      Puntos = 0;

      Opcion.find().where({ pregunta: this.id, tipoOpcion: 'subquestion' }).populate('subopciones')
        .then(function(opciones){
            
          Puntos = 0;
          Incremento = Math.floor(100 / opciones.length);

          for ( i = 0 ; i < Answered.length ; i += 2 ) {
            for ( n = 0 ; n < opciones.length ; n++ ) {
              if ( Answered[i] == opciones[n].subopciones[0].valor && 
                Answered[i+1] == opciones[n].subopciones[1].valor ) {

                Puntos += Incremento;
              }
            }
          }

          cb(respuestaCompleta, Puntos);
            
        })
        .catch(function(error){
            console.log(error);
        });
    },


    corregirMultichoice: function(respuestaCompleta, cb) {
      Answered = respuestaCompleta.answered;

      Subopcion.findOne({
                where: {opcion: Number(Answered), nombre: "fraccion"}
            }).then(function(subopcion){
                var Puntos = subopcion.valor;
                Subopcion.findOne({
                    where: {opcion: Number(Answered), nombre: "text"}
                }).then(function(subopcion){
                    respuestaCompleta.answered = subopcion.valor;
          cb(respuestaCompleta, Puntos);
                })  
            })
    },


    corregirNumerical: function(respuestaCompleta, cb) { 
      Answered = respuestaCompleta.answered;
      Puntos = 0;

            Opcion.findOne({
                where: { id: Number(respuesta)}
                }).populate('subopciones').then(function(misOpciones){

                misOpciones.subopciones.forEach(function(subopcion){
                    
                    sails.log.verbose(subopcion);

                    if(subopcion.nombre === 'fraction'){
                        puntuacion = subopcion.valor;
                    }

                    if(subopcion.nombre === 'text'){
                        texto = subopcion.valor;
                    }
                
                });

                cb(puntuacion, texto);
            });
        },

    corregirTruefalse: function(respuestaCompleta, cb) { 
    Answered = respuestaCompleta.answered;
    Puntos = 0;

            Opcion.findOne({
                where: { id: Number(respuesta)}
                }).populate('subopciones').then(function(misOpciones){

                misOpciones.subopciones.forEach(function(subopcion){
                    
                    sails.log.verbose(subopcion);

                    if(subopcion.nombre === 'fraction'){
                        puntuacion = subopcion.valor;
                    }

                    if(subopcion.nombre === 'text'){
                        texto = subopcion.valor;
                    }
                
                });

                cb(puntuacion, texto);
            });
        }
};
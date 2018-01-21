'use strict'

var Favorito = require('../models/favorito');

function prueba(req, res){
	var nombre = '';
	if(req.params.nombre){
 		nombre = req.params.nombre;
	}else{
		nombre = 'Sin nombre';
	}
	res.status(200).send(

		{texto: 'Hola mundo con NodeJs y Express '+nombre,
		 data : [2,3,4]
		}
	);
	//console.log("Estas en la vista de prueba");
}

function getFavorito(req, res){
	var favoritoId = req.params.id;
	Favorito.findById(favoritoId, function(err, favorito){
		if(err){
			res.status(500).send({message: 'Error al devolver el marcador'});
		}else{
			if(!favorito){
				res.status(404).send({message : 'No hay marcadores'});
			}else{
				res.status(200).send({favorito});	
			}
		}
		
	});
}

function getFavoritos(req, res){
	//Sirve para poder ir ordenando por los parametros de la consulta de response.
	//Favorito.find({}).sort('-_id') sirce para ordenarlos de forma descendente
	Favorito.find({}).sort('-_id').exec((err, favoritos) => {
		if(err){
			res.status(500).send({message: 'Error al devolver los marcadores'});
		}else{
			if(!favoritos){
				res.status(404).send({message : 'No hay marcadores'});
			}else{
				res.status(200).send({favoritos});
			}
		}
	});
}

function saveFavorito(req, res){
	var favorito = new Favorito();
	var params = req.body; //Sirve para las peticiones de tipo post put
	favorito.title = params.title;
	favorito.description = params.description;
	favorito.url = params.url;
	favorito.save((err, favoritoStored) =>{
		if(err){
			res.status(500).send({
				message : 'Error al guardar el marcador'
			});
		}else{
			res.status(200).send({favorito : favoritoStored});
		}
	});
}

function updateFavorito(req, res){
	var favoritoId = req.params.id; //Sirve para las peticiones de tipo post put
	var update = req.body; //Sirve para las peticiones de tipo post put
	Favorito.findByIdAndUpdate(favoritoId, update, (err, favoritoUpdate) => {
		if(err){
			res.status(500).send({
				message : 'Error al actualiar el marcador'
			});
		}else{
			res.status(200).send({favorito : favoritoUpdate});
		}
	});
}

function deleteFavorito(req, res){
	var favoritoId = req.params.id; //Sirve para las peticiones de tipo post put

	Favorito.findById(favoritoId, function(err, favorito){
		if(err){
			res.status(500).send({message: 'Error al devolver el marcador'});
		}
		if(!favorito){
			res.status(404).send({message : 'No hay marcadores'});
		}else{
			favorito.remove(err => {
				if(err){
					res.status(500).send({message : 'Marcados no se ha eliminado'});
				}else{
					res.status(200).send({message : 'Marcados se ha eliminado'});
				}
			});
		}

		
	});
}

module.exports = {
	prueba,
	getFavorito,
	getFavoritos,
	saveFavorito,
	updateFavorito,
	deleteFavorito
}
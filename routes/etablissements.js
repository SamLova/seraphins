var express = require('express');
var router = express.Router();

var etablissements = [
	{
		id : '1',
		nom : 'L2',
		classes : [
			{
				id : 1,
				nom : '6ème I',
				etudiants : [
					{
						numero : 1,
						matricule: 14356,
						nom:'ANDRIAMANGA',
						prenoms : 'Mirana Ralamboson',
						sexe  :'F',
						ddn : 38193,
						lieuDeNaissance : 'Befelatanana',
						adresse : {
							code : 'ITE 30 Bis',
							lieu : 'Ambaniala'
						},
						contact : {
							emails : null,
							telephones :[
							]
						}
					},
					{
						numero : 2,
						matricule: 14356,
						nom:'ANDRIAMANGA',
						prenoms : 'Mirana Ralamboson',
						sexe  :'G',
						ddn : 38193,
						lieuDeNaissance : 'Befelatanana',
						adresse : {
							code : 'ITE 30 Bis',
							lieu : 'Ambaniala'
						},
						contact : {
							emails : null,
							telephones :[
							]
						}
					},
					{
						numero : 3,
						matricule: 08352,
						nom:'ANDRIAMANGA',
						prenoms : 'Mirana Ralamboson',
						sexe  :'F',
						ddn : 38662,
						lieuDeNaissance : 'Soavinandriana',
						adresse : {
							code : 'IPA 217 Bis',
							lieu : 'Anosimasina Itaosy'
						},
						contact : {
							emails : null,
							telephones :[
							]
						}
					},
				]
			}
		]
		
	},
	{
		id : '2',
		nom : 'LA',
		classes : [
			{
				id : 1,
				nom : '6ème I',
				etudiants : [
					{
						numero : 1,
						matricule: 14356,
						nom:'ANDRIAMANGA',
						prenoms : 'Mirana Ralamboson',
						sexe  :'F',
						ddn : 38193,
						lieuDeNaissance : 'Befelatanana',
						adresse : {
							code : 'ITE 30 Bis',
							lieu : 'Ambaniala'
						},
						contact : {
							emails : null,
							telephones :[
							]
						}
					},
					{
						numero : 2,
						matricule: 14356,
						nom:'ANDRIAMANGA',
						prenoms : 'Mirana Ralamboson',
						sexe  :'G',
						ddn : 38193,
						lieuDeNaissance : 'Befelatanana',
						adresse : {
							code : 'ITE 30 Bis',
							lieu : 'Ambaniala'
						},
						contact : {
							emails : null,
							telephones :[
							]
						}
					},
					{
						numero : 3,
						matricule: 08352,
						nom:'ANDRIAMANGA',
						prenoms : 'Mirana Ralamboson',
						sexe  :'F',
						ddn : 38662,
						lieuDeNaissance : 'Soavinandriana',
						adresse : {
							code : 'IPA 217 Bis',
							lieu : 'Anosimasina Itaosy'
						},
						contact : {
							emails : null,
							telephones :[
							]
						}
					},
				]
			}
		]
		
	},
	{
		id : '3',
		nom : 'L1',
		classes : [
			{
				id : 1,
				nom : '6ème I',
				etudiants : [
					{
						numero : 1,
						matricule: 14356,
						nom:'ANDRIAMANGA',
						prenoms : 'Mirana Ralamboson',
						sexe  :'F',
						ddn : 38193,
						lieuDeNaissance : 'Befelatanana',
						adresse : {
							code : 'ITE 30 Bis',
							lieu : 'Ambaniala'
						},
						contact : {
							emails : null,
							telephones :[
							]
						}
					},
					{
						numero : 2,
						matricule: 14356,
						nom:'ANDRIAMANGA',
						prenoms : 'Mirana Ralamboson',
						sexe  :'G',
						ddn : 38193,
						lieuDeNaissance : 'Befelatanana',
						adresse : {
							code : 'ITE 30 Bis',
							lieu : 'Ambaniala'
						},
						contact : {
							emails : null,
							telephones :[
							]
						}
					},
					{
						numero : 3,
						matricule: 08352,
						nom:'ANDRIAMANGA',
						prenoms : 'Mirana Ralamboson',
						sexe  :'F',
						ddn : 38662,
						lieuDeNaissance : 'Soavinandriana',
						adresse : {
							code : 'IPA 217 Bis',
							lieu : 'Anosimasina Itaosy'
						},
						contact : {
							emails : null,
							telephones :[
							]
						}
					},
				]
			}
		]
		
	}
];


/* GET users listing. */
router.get('/', function(req, res) {
  res.render('etablissements');
});
router.get('/test', function(req, res){
	res.send('test')
})
router.get('/:nom',function(req, res){
	var nom = req.params.nom;
	var result = {};
	etablissements.forEach(function(element, index){
		if (element.nom === nom) {
			console.log(element);
			result = element;			
		};
		//if (nom === ) {};
	});
	res.send(result);
});

module.exports = router;

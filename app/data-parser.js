/*
  Input Excel:
    application_folder/data/{language}/{.*}.xlsx

    Note: "A2" cell has pathology name, script transforms to common pathology name (config in data-parser-pathologies.json)

  Output JSON:
    application_folder/app/data/{language}/{common_pathology_name}.json

    result[state][emotional][intellectual][physical] = {
      description: String,
      personality: String,
      biorhythm: String,
      reflection: [String],
      technical: [String]
    }

    Example: result['ENTP']['N']['P']['P']
*/

var fs = require('fs'),
    xlsx = require('xlsx');

var toCellName = {
    'estado': 'state',
    'descripcion': 'description',
    'resumen personalidad': 'personality',
    'biorritmo': 'biorhythm',
    'reflexion\\d*': 'reflection',
    'tecnica\\d*': 'technical',
    'e': 'emotional',
    'i': 'intellectual',
    'f': 'physical'
  },
  pathologies = JSON.parse(fs.readFileSync('data-parser-pathologies.json', 'utf8')),
  languages = Object.keys(pathologies);

var convert = function(filename, language) {
  var file = xlsx.readFile(filename),
      cellNames = {},
      normalized = {},
      result = {},
      state,
      emotional,
      intellectual,
      physical;

  var saveCellName = function(cell, value) {
    var regex, name;

    value = value.replace(/á/gi, 'a');
    value = value.replace(/é/gi, 'e');
    value = value.replace(/í/gi, 'i');
    value = value.replace(/ó/gi, 'o');
    value = value.replace(/ú/gi, 'u');

    for(var cellName in toCellName) {
      regex = new RegExp('^' + cellName, 'i');
      
      if(regex.test(value)) {
        name = cellName;
        break;
      }
    }

    if(name) {
      cellNames[cell] = toCellName[name];
    }
  };

  Object.keys(file.Sheets).forEach(function(sheetName) {
    Object.keys(file.Sheets[sheetName]).forEach(function(cellName) {
      normalized[cellName] = file.Sheets[sheetName][cellName].v;
    });
  });

  Object.keys(normalized).forEach(function(cellName) {
    var index = cellName.search(/\d+/),
        cell = cellName.substring(0, index),
        row = parseInt(cellName.substring(index, cellName.length)),
        name = cellNames[cell],
        value;

    if(row === 1) {
      saveCellName(cell, normalized[cellName]);
    }
    else if(name && row > 1) {
      value = normalized[cellName];

      if(name === 'state') {
        state = value;
        
        result[state] = {
          'P': {
            'P': { 'P': {}, 'N': {} },
            'N': { 'P': {}, 'N': {} }
          },
          'N': {
            'P': { 'P': {}, 'N': {} },
            'N': { 'P': {}, 'N': {} }
          }
        };
      }
      else if(name === 'emotional') {
        emotional = value;
      }
      else if(name === 'intellectual') {
        intellectual = value;
      }
      else if(name === 'physical') {
        physical = value;

        result[state][emotional][intellectual][physical] = { reflection: [], technical: [] };
      }
      else if(name === 'personality') {
        result[state][emotional][intellectual][physical][name] = value.split('\r\n').slice(1); // First line === "Usuario ..."
      }
      else if(Array.isArray(result[state][emotional][intellectual][physical][name])) {
        result[state][emotional][intellectual][physical][name].push(value);
      }
      else {
        result[state][emotional][intellectual][physical][name] = value;
      }
    }
  });

  return { json: result, name: pathologies[language][normalized['A2'].toLowerCase()] };
};

var saveFile = function(name, json, language) {
  fs.writeFile('app/data/' + language + '/pathologies/' + name + '.json', JSON.stringify(json), function(err) {
    if(err) return console.log(err);

    console.log('File ' + name + '.json (' + language + ') saved');
  });
};

fs.exists('app/data', function(exists) {
  if(!exists) {
    fs.mkdirSync('app/data');
  }

  languages.forEach(function(language) {
    var path = 'data/' + language;

    fs.exists('app/' + path, function(exists) {
      if(!exists) {
        fs.mkdirSync('app/' + path);
      }

      fs.exists('app/' + path + '/pathologies', function(exists) {
        if(!exists) {
          fs.mkdirSync('app/' + path + '/pathologies');
        }
      
        fs.readdir(path, function(err, files) {
          if(err) return console.log(err);
          
          files.forEach(function(filename) {
            if(/^\w(.*)xlsx$/.test(filename)) {
              result = convert(path + '/' + filename, language);

              if(result.name) {
                saveFile(result.name, result.json, language);
              }
            }
          });
        });
      });
    });
  });
});
$(function(){

  var loaderPoke = $('.js-loader-pokeball').hide();

  var setBackgroundForType = function(type) {
    var color = null
    switch(type) {
    case 'water':
        color = 'lightblue'
        break;
    case 'fire':
        color = 'red'
        break;
    default:
        color = 'green'
    }

    $('.js-pokemon-photo').css({backgroundColor: color})
  }

  var resetDetail = function(){
    $('.js-pokemon-name')
      .empty()

    $('.js-pokemon-photo')
      .empty()

    $('.js-pokemon-type')
      .empty()
  }

  //J'ajoute un pokemon dans la liste
  var addPokemonToList = function(name, url){
    var li = $('<li>').text(name).addClass('pokemon-item js-pokemon-item').attr('data-url', url)
    $('.js-pokemon-list').append(li)
  }

  //J'ajoute un pokemon dans le detail
  var addPokemonToDetail = function(name, photo, types, weight, height){

    var typeFormated = '';
      for (var i = 0; i < types.length; i++) {
        typeFormated += types[i].type.name
        if (i < types.length-1){
          typeFormated+=' and '
        }
        else {
          typeFormated+='.'
        }
      }
    var pokeName = $('<h4>')
      .text('Name: '+name)
      .addClass('poke-name')

    var img = $('<img>').attr('src', photo)

    var type = $('<li>')
      .text('Type(s): '+typeFormated)
      .addClass('pokemon-attribute')

    var weight = $('<li>')
      .text('Weight: '+weight)
      .addClass('pokemon-attribute')

    var height = $('<li>')
      .text('Height: '+height)
      .addClass('pokemon-attribute')

    $('.js-pokemon-name')
      .append(pokeName)

    $('.js-pokemon-photo')
      .append(img)

    $('.js-pokemon-type')
      .append(type)
      .append(weight)
      .append(height)

  }



  //Je recupere la liste des pokemons
  $.ajax('https://pokeapi.co/api/v2/pokemon/?limit=20')
  .done(function(pokemons){
    for (var i = 0; i < pokemons.results.length; i++) {
      var pokemon = pokemons.results[i]
      addPokemonToList(pokemon.name, pokemon.url)
    }
  })

  $('.js-pokemon-list').on('click', '.js-pokemon-item', function(){
    var url = $(this).attr('data-url')
    loaderPoke.show();
    resetDetail();
    $.ajax(url)
    .done(function(pokemon){
      loaderPoke.hide();
      addPokemonToDetail(pokemon.name, pokemon.sprites.front_default, pokemon.types, pokemon.weight, pokemon.height)
      setBackgroundForType(pokemon.types[0].type.name)
      console.log(pokemon.types[0].type.name)
    })
  })
});

$(document).ready( () => {


  class Pokemon{
    constructor(text){
      this.type = [];
      this.name = text.name;
      this.number = text.id;
      for(let i = 0 ;i<text.types.length;i++){
        this.type.push(text.types[i].type.name);
      }
    }

    static responseToHTML(text){
    return (`
    <div>
      <p>name : ${text.id}.  </p>
      <p>number : ${text.name}. </p>
      <p>type : ${text.types[0].type.name}. </p>
    </div>
    `)
  }

    pokemonToHTML(){
      $statsDisplay.html(
      `<div>
        <p>name : ${this.name}.  </p>
        <p>number : ${this.number}. </p>
        <p>type : ${this.type}. </p>
      </div>
      `);
    }


  }


//variaveis GLobais
let cheat = axios.create({ //INSTANCIA DO AXIOS PARA POSSIBILITAR GET E REQUESTS
'baseURL':"https://pokeapi.co/api/v2/pokemon/"});
const $statsDisplay = $('.statsDisplay');
let count = '0'; // conta o numero de vezes que o teclado foi apertado
let str = '' ; //armazena os valores digitados e passa para a função busca;
const $blueButtonNumber = $("[id = 'blueButton']"); //botoes numericos azuis
const $audio = $('#pokemonCry');
let pokemonInDisplay = 0;
let alphaOrNumber = 1 ; // 1 pra numero e 2 pra alpha





// funcoes declaradas
const responseToHTML =(text) =>{ //Filtra e organiza os dados recebidos da API
return (`
<div>
  <p></br>name   : ${text.name}. </br>
     number : ${text.id}. </br>
     type   : ${text.types[0].type.name}. </p>
</div>
`)
};

const cry = number =>{  // Barulho dos pokemons. so funciona ate o 386
$audio.attr('src',`PokemonSounds/${number}.wav`)
$audio.trigger('play');
};


const format = number => {  //formata o numero do pokemon para possibilitar a retirada da foto (as da API estavam pessimas)
  if(number == 0){return alert("Numero invalido")}
  else if( number < 10) {return '00' + number}
  else if (number < 100 ) {return '0' + number}
  else {return number}
};

const buscaPokemon= st => { //busca, o pokemon;

    cheat.get(`${st}/`).then( response => {
      let pokemon = new Pokemon(response.data);
      pokemon.pokemonToHTML();
      let pokemonNumber = format(parseInt(st,10));
      cry(pokemonNumber);
      $('#fotoDePerfil').attr('src',`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonNumber}.png`);
      pokemonInDisplay = pokemonNumber;

    });
    str = ''; //reseta o processo de
    count = 0;

};

const input = ch => {
    str += ch;
    count++;
    $statsDisplay.html(`<br><br>${str}`);
    if(count == 3){
      buscaPokemon(str);
    }
};

const keyboardInput = ch => {
  if (true){//ch >= 'a' && ch <= 'z'){
    str+=ch;
    $statsDisplay.html(`<br><br>${str}`);
  }
};
//Mouse Triggers

  $blueButtonNumber.on('click',event =>{
    if(alphaOrNumber == 1)input(($(event.currentTarget).html()));

  });

  $('#twinsGrayButtons1').on('click',()=> {
    alphaOrNumber = 1;
    $statsDisplay.html(` `);
    str = '';
    count = 0;
  });

  $('#twinsGrayButtons2').on('click',()=> {
    alphaOrNumber = 2;
    $statsDisplay.html(` `);
    str = '';
    count = 0;
    });

  $('#enter').on('click' , () => {
    if(str){ buscaPokemon(str); }
  });

  $('#playCry').on('click',() =>{
    $audio.trigger('play');
  });

  $('#reset').on('click' , () =>{
    $statsDisplay.html(` `);
    str = '';
    count = 0;
    $('#fotoDePerfil').attr('src',`img/Pokebola.png`);
  });

  $('#up').on('click' , ()=>{
    buscaPokemon((pokemonInDisplay+1));
  });
  $('#down').on('click' , ()=>{
    buscaPokemon((pokemonInDisplay-1));
  });
  $(document).keydown( ink =>{
    if(alphaOrNumber == 2){  keyboardInput(String.fromCharCode(ink.keyCode).toLowerCase());}
  });
  $(document).keypress(ink=>{
    if(ink.keyCode==13){buscaPokemon(str);}
  });

});

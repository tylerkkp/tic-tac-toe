// Grid Buttons letter = rows numbers = columns
var a1 = '';
var a2 = '';
var a3 = '';
var b1 = '';
var b2 = '';
var b3 = '';
var c1 = '';
var c2 = '';
var c3 = '';
var boxlist = {'a1': a1, 'a2': a2, 'a3': a3, 'b1': b1, 'b2': b2, 'b3': b3, 'c1': c1, 'c2': c2, 'c3': c3};
var allboxes = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];

// Create array of possible win conditions
var wins = [['a1', 'a2', 'a3'], ['b1', 'b2', 'b3'], ['c1', 'c2', 'c3'], ['a1', 'b1', 'c1'], ['a2', 'b2', 'c2'], ['a3', 'b3', 'c3'], ['a1', 'b2', 'c3'], ['a3', 'b2', 'c1']];
var winner = false;
var player = '';

// Test to see if game ends in a tie
function tietest() {
  var tiecheck = [];
  for (var box = 0; box < allboxes.length; box++) {
    var testvar = (document.getElementById(allboxes[box]).innerText);
    if (testvar == 'x' || testvar == 'o') {
      tiecheck.push(testvar);
    }
  }
  if (tiecheck.length == 9 && winner == false) {
    swal({
  text: 'Tie Game!',
      //NOTE: change image to RPS tie (or similar)
  imageUrl: 'https://images.pexels.com/photos/275637/pexels-photo-275637.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=450',
  imageWidth: 450,
  imageHeight: 300,
  imageAlt: 'Custom image',
  showConfirmButton: false,
})
    setTimeout(reloadpage, 1500);
  }
}

function wintest() {
  tietest();
  for (var i = 0; i<wins.length; i++) {
    var testwin = [];
    for (var j = 0; j<wins[i].length; j++) {
      testwin.push(document.getElementById(wins[i][j]).innerText);
    }
    //test if there is a winner by making a set from each row/column containing (3) values. If they are the same, and not equal to '', the Set size will be 1, indicating a win condition
    if (testwin.length == 3 && new Set(testwin).size == 1 && testwin[0] !== '') {
      var winplayer = '';
      if (testwin[0] == player) {
        var winplayer = 'Player';
      }
      if (testwin[0] !== player) {
        var winplayer = 'Computer';
      }
      var msg = winplayer + ' wins!';
      swal({
  title: winplayer,
  text: 'Wins!!!',
  imageUrl: 'https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=450',
  imageWidth: 450,
  imageHeight: 300,
  imageAlt: 'Custom image',
  showConfirmButton: false,
})
      winner = true;
      setTimeout(reloadpage, 1500);
  }
  }
}

// List of possible moves for 'stupid' computer -- NEED TO ADD 'Difficulty' SELECTOR WITH MULTIPLE LEVELS OF SKILL
var poslist = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
var num = 0;

function compmove() {
  num = Math.floor(Math.random() * Math.floor(9));
  if (document.getElementById(poslist[num]).innerText == '') {
    if (toggle == 0) {
      document.getElementById(poslist[num]).innerText = 'x';
      toggle += 1;
    } else if (toggle == 1) {
      document.getElementById(poslist[num]).innerText = 'o';
      toggle -= 1;
    }
  } else {
    compmove(); // TRY AGAIN IF BOX IS ALREADY TAKEN
  }
  wintest();
};

function reloadpage() {
  for (var item = 0; item < allboxes.length; item++) {
    document.getElementById(item).innerHTML = '#';
}
}

var toggle = 0;
var show = 0;

function showplyr() {
  document.getElementById("select").style.display = "inline";
  document.getElementById("x").style.display = "inline";
  document.getElementById("o").style.display = "inline";
  show += 1;
}
function hideplyr() {
  document.getElementById("select").style.display = "none";
  document.getElementById("x").style.display = "none";
  document.getElementById("o").style.display = "none";
  show -= 1;
}

function newgame() {
  toggle = 0;
  winner = false;
  showplyr();
}

function reset() {
  Object.keys(boxlist).forEach(function(key) {  
      document.getElementById(key).innerHTML = '';
  });
  winner = false;
};                           

$('#x').click(function(){
  swal({
  title: 'Player is "X"',
  text: 'Player goes first',
  imageUrl: 'https://images.pexels.com/photos/981314/pexels-photo-981314.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=450',
  imageWidth: 450,
  imageHeight: 300,
  imageAlt: 'Custom image',
})
  
  player = 'x';
  hideplyr();
  reset();
});

$('#o').click(function(){
  swal({
  title: 'Player is "O"',
  text: 'Computer goes first',
  imageUrl: 'https://images.pexels.com/photos/351263/pexels-photo-351263.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=450',
  imageWidth: 450,
  imageHeight: 300,
  imageAlt: 'Custom image',
})
  player = 'o';
  hideplyr();
  reset();
  compmove();
});


$('#new').click(function(){
newgame();
});

$('#a1').click(function(){
  // Get value of id 'a1'
  var test = document.getElementById('a1').innerText;
  // If box a1 has a value, return false (break function)
  if (test) {
    return false;
  }
  // depending on whether 'toggle' is set to 0 or 1, will fill box with 'x' or 'o', and change toggle so next mark is the other
  if (toggle == 0) {
  document.getElementById('a1').innerHTML = 'x';
    toggle += 1;
  } else {
    document.getElementById('a1').innerHTML = 'o';
    toggle -= 1;
  }
  wintest();
    if (winner == true) {
    return false;
  }
  compmove();
});

$('#a2').click(function(){
  var test = document.getElementById('a2').innerText;
  if (test) {
    return false;
  }
  if (toggle == 0) {
  document.getElementById('a2').innerHTML = 'x';
    toggle += 1;
  } else {
    document.getElementById('a2').innerHTML = 'o';
    toggle -= 1;
  }
    wintest();
    if (winner == true) {
    return false;
  }
  compmove();
});

$('#a3').click(function(){
  var test = document.getElementById('a3').innerText;
  if (test) {
    return false;
  }
  if (toggle == 0) {
  document.getElementById('a3').innerHTML = 'x';
    toggle += 1;
  } else {
    document.getElementById('a3').innerHTML = 'o';
    toggle -= 1;
  }
    wintest();
    if (winner == true) {
    return false;
  }
  compmove();
});

$('#b1').click(function(){
  var test = document.getElementById('b1').innerText;
  if (test) {
    return false;
  }
  if (toggle == 0) {
  document.getElementById('b1').innerHTML = 'x';
    toggle += 1;
  } else {
    document.getElementById('b1').innerHTML = 'o';
    toggle -= 1;
  }
    wintest();
    if (winner == true) {
    return false;
  }
  compmove();
});

$('#b2').click(function(){
  var test = document.getElementById('b2').innerText;
  if (test) {
    return false;
  }
  if (toggle == 0) {
  document.getElementById('b2').innerHTML = 'x';
    toggle += 1;
  } else {
    document.getElementById('b2').innerHTML = 'o';
    toggle -= 1;
  }
    wintest();
    if (winner == true) {
    return false;
  }
  compmove();
});

$('#b3').click(function(){
  var test = document.getElementById('b3').innerText;
  if (test) {
    return false;
  }
  if (toggle == 0) {
  document.getElementById('b3').innerHTML = 'x';
    toggle += 1;
  } else {
    document.getElementById('b3').innerHTML = 'o';
    toggle -= 1;
  }
    wintest();
    if (winner == true) {
    return false;
  }
  compmove();
});

$('#c1').click(function(){
  var test = document.getElementById('c1').innerText;
  if (test) {
    return false;
  }
  if (toggle == 0) {
  document.getElementById('c1').innerHTML = 'x';
    toggle += 1;
  } else {
    document.getElementById('c1').innerHTML = 'o';
    toggle -= 1;
  }
    wintest();
    if (winner == true) {
    return false;
  }
  compmove();
});

$('#c2').click(function(){
  var test = document.getElementById('c2').innerText;
  if (test) {
    return false;
  }
  if (toggle == 0) {
  document.getElementById('c2').innerHTML = 'x';
    toggle += 1;
  } else {
    document.getElementById('c2').innerHTML = 'o';
    toggle -= 1;
  }
    wintest();
    if (winner == true) {
    return false;
  }
  compmove();
});

$('#c3').click(function(){
  var test = document.getElementById('c3').innerText;
  if (test) {
    return false;
  }
  if (toggle == 0) {
  document.getElementById('c3').innerHTML = 'x';
    toggle += 1;
  } else {
    document.getElementById('c3').innerHTML = 'o';
    toggle -= 1;
  }
    wintest();
    if (winner == true) {
    return false;
  }
  compmove();
});

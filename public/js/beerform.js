$(document).ready(function () {
  const beerForm = $('form#add-beer');
  const beerName = $('input#beerName');
  const valIBU = $('input#IBU');
  const valABV = $('input#ABV');
  const beerType = $('input#beerType');
  const beerDesc = $('input#beerDesc');

  $.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results === null) {
      return null;
    }
    return decodeURI(results[1]) || 0;
  };
  beerForm.on('submit', function (event) {
    event.preventDefault();
    const beerData = {
      name: beerName.val().trim(),
      IBU: valIBU.val().trim(), //can be left blank, will return a 'N/A' value if left blank
      ABV: valABV.val().trim(),
      beerType: beerType.val().trim(),
      description: beerDesc.val().trim()
    };
    if (!beerData.name || !beerData.ABV || !beerData.beerType || !beerData.description) {
      return;
    }
    createBeer(beerData.name, beerData.ABV, beerData.IBU, beerData.beerType, beerData.description);
    beerName.val('');
    valIBU.val('');
    valABV.val('');
    beerType.val('');
    beerDesc.val('');
  });

  function createBeer(name, abv, ibu, beerType, description) {
    $.post('/api/beers', {
      name: name,
      ABV: abv,
      IBU: ibu,
      beerType: beerType,
      description: description,
      BreweryId: $.urlParam('breweryid')
    })
      .then(function (data) {
        window.location.replace('/beers');
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  }

});

$(function () {
  $('#signUp').on('click', function (event) {
    event.preventDefault();
    var newUser = {
      email: $('#email').val().trim(),
      password: $('#password').val().trim()
    };

    $.ajax('/api/signup', {
      type: 'POST',
      data: newUser
    }).then(function () {
      window.location.replace('/');
    });
  });
});

$(function () {
  $('#log').click('submit', function (event) {
    event.preventDefault();
    var logIn = {
      email: $('#email').val().trim(),
      password: $('#password').val().trim()
    };

    $.ajax('/api/login', {
      type: 'POST',
      data: logIn
    }).then(function (User) {
      window.location.href = '/users/' + User.id;
    });
  });
});

$(function () {
  $('#brewery').click('submit', function (event) {
    event.preventDefault();
    $.get('/api/user_data').then(user => {

      var addBrewery = {
        name: $('#breweryName').val().trim(),
        address: $('#breweryAddress').val().trim(),
        phoneNumber: $('#breweryNumber').val().trim(),
        UserId: user.id
      };
      $.ajax('/api/brewery', {
        type: 'POST',
        data: addBrewery
      }).then(function ({ id }) {
        window.location.replace('/beers/add?breweryid=' + id);
      });
    });
  });
});

$(function () {
  $('.change-stock').on('click', function (event) {
    var id = $(this).data('id');
    var noStock = $(this).data('outOfStock');

    var stockState = {
      stockAvail: noStock
    };
    $.ajax('/api/beerform/' + id, {
      type: 'PUT',
      data: stockState
    }).then(
      function () {
        console.log('changed stock to', noStock);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
  $('.delete').on('click', function (event) {
    const id = $(this).attr('data-id');

    $.ajax(`/api/beerForm/${id}`, {
      type: 'DELETE'
    }).then(() => {
      console.log(`deleted beer with id ${id}`);
      location.reload();
    });
  });
});

$('.brewery').on('click', function () {
  console.log('hit');
  const id = $(this).data('id');
  console.log(id);
  location.href = '/brewery/' + id + '?breweryid=' + id;
});
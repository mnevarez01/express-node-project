$(document).ready(function () {
  const beerForm = $("form.beerForm");
  const beerName = $("input#beerName");
  const valIBU = $("input#IBU");
  const valABV = $("input#ABV");
  const beerType = $("input#beerType");
  const beerDesc = $("input#beerDesc");

  beerForm.on("submit", function (event) {
    event.preventDefault();
    const beerData = {
      name: beerName.val().trim(),
      IBU: valIBU.val().trim(), //can be left blank, will return a "N/A" value if left blank
      ABV: valABV.val().trim(),
      style: beerType.val().trim(),
      description: beerDesc.val().trim()
    };
    if (!beerData.name || !beerData.ABV || !beerData.style || !beerData.description) {
      return;
    }
    createBeer(beerData.name, beerData.ABV, beerData.IBU, beerData.style, beerData.description);
    beerName.val();
    valIBU.val();
    valABV.val();
    beerType.val();
    beerDesc.val();
  });

  function createBeer(name, ibu, abv, style, description) {
    $.post("/api/beerForm", {
      name: name,
      ibu: IBU,
      abv: ABV,
      style: style,
      description: description
    })
      .then(function (data) {
        window.location.replace("/beerForm");
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

});


$(function () {
  $(".change-stock").on("click", function (event) {
    var id = $(this).data("id");
    var noStock = $(this).data("outOfStock");

    var stockState = {
      stockAvail: noStock
    };
    $.ajax("/api/beerform/" + id, {
      type: "PUT",
      data: stockState
    }).then(
      function () {
        console.log("changed stock to", noStock);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
  $(".delete").on("click", function (event) {
    const id = $(this).attr("data-id");

    $.ajax(`/api/beerForm/${id}`, {
      type: "DELETE"
    }).then(() => {
      console.log(`deleted beer with id ${id}`);
      location.reload();
    })
  });
});
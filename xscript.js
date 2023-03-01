const link = "https://fakestoreapi.com/";
var path, successfn;

function getData(path, successfn) {
  $.ajax({
    type: "GET",
    url: path,
    success: successfn
  });
};
 
path = link + "products/categories";

successfn = function(data) {
  console.log(data);
}

getData(path, successfn);
//getData(link + "products/categories", successfn);








const link = "https://fakestoreapi.com/";
var getUrl, categoriesUrl, categoryUrl;
getUrl = link + 'products';
const usersUrl = link + "users";
var user = localStorage.getItem("username");
var userIdNum = localStorage.getItem("itemId");
var cartUrl = "https://fakestoreapi.com/carts/user/" + userIdNum;
$('#name').html(user);

$(".outer-wrapper").click(function () {
  $("#small-modal").show();
});

$("#close").click(function() {
  $("#small-modal").hide();
  $("#add-modal").hide();
});

$(".navbar-toggler").click(function() {
  $("#navbar-content").toggle();
});

$(".add-product").click(function() {
  $("#add-modal").show();
});

function getValue(getUrl, mainFn) {
  $.ajax({
    type: "GET",
    url: getUrl,
    success: mainFn,
  })
};

$(".submit-btn").click(function(event){
  event.preventDefault()
  var valid = $(".add-product-form").valid();
});

$(".add-product-form").validate({
  rules: {
    title: "required",
    price: "required",
    description: "required",
    image: "required",
    category: "required"
  },
  messages: {
    title: "Title is mandetory",
    price: "Price is mandetory",
    description: "Description is mandetory",
    image: "Image is mandetory",
    category: "Category is mandetory",
  }
});

/*
$('.login-btn').click(function() {
  if (!price) {
    $('.price-error').html(`<p class="error-message">Price is mandatory</p>`);
  }
  if (!description) {
    $('.description-error').html(`<p class="error-message">Description is mandatory</p>`);
  }
  if (!image) {
    $('.image-error').html(`<p class="error-message">Image url is mandatory</p>`);
  }
  if (!category) {
    $('.category-error').html(`<p class="error-message">Category is mandatory</p>`);
  }
  if (title, price, description, image, category) {
    $.ajax({
      type: 'POST',
      url: getUrl,
      data: newObj,
      success: function(message,status) {
        console.log("Success", message, status)
      },
      error: function(error) {
        console.log(error)
      }
    });
  };
});
*/

function htmlContent(pack, prepHtml) {
  prepHtml += `<div class="img-wrap"><img src="${pack.image}"></div>`;
  prepHtml += `<div class="details">`;
  prepHtml += `<p><b>Title: </b>${pack.title}</p>`;
  prepHtml += `<p><b>Price: </b>$${pack.price}`;
  prepHtml += `<span class="rating"><b> Rating: </b>${pack.rating.rate}</span></p>`;
  prepHtml += `<p><b>Available: </b>Only ${pack.rating.count} items are left</p>`;
  prepHtml += `<details><summary><b>Description: </b></summary>${pack.description}</details>`;
  prepHtml += `</div>`;
  prepHtml += `</div>`;
  return prepHtml;
};

function wrapperCall(products) {
  var max = products.length;
  for (let index = 0; index < max; index++) {
    let pack = products[index];
    var prepHtml = `<div class="main-content" data-id="${index}">`;
    prepHtml += htmlContent(pack, prepHtml);
    $(".outer-wrapper").append(prepHtml);
  };

  $('.main-content').click(function() {
    var type = $(this).attr("data-id");
    let pack = products[type];
    var prepHtml = `<div class="main-content">`;
    prepHtml += htmlContent(pack, prepHtml);
    $(".modal-body").html(prepHtml);
  });
};

const mainFn = function(products) {
  wrapperCall(products);
  /*
  $('.data-table').dataTable({
    data: products,
    columns: [
      { 'data': 'id' },
      { 'data': 'title' }
    ]
  });
  */
};

categoriesUrl = link + "products/categories";
const navFn = function (products) {
  var len = products.length;
  for (let i = 0; i < len; i++) {
    var categories = products[i];
    $('#nav-content').append(`<li class='nav-item'><a class='nav-link' href="#${categories}" data-id="${categories}">${categories}</a></li>`);
    $('#category').append(`<option class='category-opt'>${categories}</option>`);
  };
  $("#nav-content li a").click(function () {
    var navObj = $(this).attr("data-id");
    $(".outer-wrapper, center h3").empty();
    $.ajax({
      type: "GET",
      url: link + "products/category/" + navObj,
      success: function (products) {
        $("center h3").html(products[0].category);
        wrapperCall(products);
      }
    });
  });
};

const userFn = function(products) {
  var name = $("#username").val();
  pwrd = $("#password").val();
  var len = products.length;
  for (let i = 0; i < len; i++) {
    var username = products[i].username;
    var password = products[i].password;
    var usersId = products[i].id;
    if (name == username && pwrd == password) {
      localStorage.setItem("username", username);
      localStorage.setItem("itemId", usersId);
      window.location.href = "wishlist.html";
    }
    else if (name != username && pwrd == password) {
      $(".error-message").html("Please enter correct username");
    }
    else if (name == username && pwrd != password) {
      $(".error-message").html("Please enter correct password");
    }
  };
};

const cartFn = function(products) {
  console.log(products);
  let len = products.length;
  html = `<tr><th>UserID: ${products[0].userId}</th>`;
  html += `<th>Date: ${products[0].date}</th></tr>`;
  html += `<tr><th>ProductId</th>`;
  html += `<th>Quantity</th></tr>`;
  $(".cart-head").append(html);
  for (let i = 0; i < len; i++) {
    var cart = products[i].products;
    var max = cart.length;
    for (let j = 0; j <= max; j++) {
      var producthtml = `<tr><td>${cart[j].productId}</td>`;
      producthtml += `<td>${cart[j].quantity}</td><tr>`;
      $(".cart-body").append(producthtml);
    };
  };
};

$(".getin").click(function () {
  window.location.href = "login.html";
});

$(".wishlist").click(function () {
  if (!user) {
    window.open("login.html", "_self");
  }
  else {
    window.open("wishlist.html", "_self");
  }
});

$(".admin-page").click(function () {
  window.location.href = "admin.html";
});

if (!user) {
  $(".getin").html("LOGIN");
}
else {
  $(".getin").html("LOGOUT");
};

if (user) {
  $(".exit").click(function () {
    localStorage.removeItem('username');
    $(".getin").html("LOGIN");
  });
};

$(".submit-btn").click(function () {
  $(".error-message").empty();
  getValue(usersUrl, userFn);
});

//cart
if (user) {
  $("#cart").click(function () {
    window.location.href = "cart.html";
  });
};

//for all products
getValue(getUrl, mainFn);
//navbar calling
getValue(categoriesUrl, navFn);
//cart Calling
getValue(cartUrl, cartFn);

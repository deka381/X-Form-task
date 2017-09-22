$(function functionName() {

const apiUrl="http://localhost:3000/users";
const userList=document.querySelector(".user_list");
const addBtn=document.querySelector("#addUsr");

const positionInput=document.querySelector(".get_position");
const nameInput=document.querySelector(".get_name");
const surnameInput=document.querySelector(".get_surname");
const roleInput=document.querySelector(".get_role");
const shortDescInput=document.querySelector(".get_shortDesc");
const longDescInput=document.querySelector(".get_longDesc");
const expInput=document.querySelector(".get_exp");
const error=document.querySelector(".error");



//event on button -> add to database user-> star function
addBtn.addEventListener("click",function(event) {
  // event.preventDefault();

  //check all inputs, they can't by empty
  if (positionInput.value==="" || nameInput.value==="" || surnameInput.value===""
        || roleInput.value==="" || shortDescInput.value==="" || longDescInput.value==="") {
        error.innerText="Wypełnij wszystkie pola!";
  }
  else{
        error.innerText='';

// take value of inputs
  let positionFromInput = positionInput.value;
  let nameFromInput = nameInput.value;
  let surnameFromInput = surnameInput.value;
  let roleFromInput = roleInput.value;
  let shortDescFromInput = shortDescInput.value;
  let longDescFromInput = longDescInput.value;
  let expFromInput =expInput.value;
  //create new object
  var newUser = {
    position:positionFromInput,
    name:nameFromInput,
    surname:surnameFromInput,
    role:roleFromInput,
    exp:expFromInput,
    shortDesc:shortDescFromInput,
    longDesc:longDescFromInput,
  }
    $.ajax({
      type:"POST",
      url:apiUrl,
      data:newUser,
      dataType:"json"
    }).done(function (response) {
        renderUsers(response);
    }).fail(function (error) {
        console.log("error form POST");
  });
positionFromInput.value==="s"
}//end of else
});
//event on button -> add to database user-> end of function





//function renderUsers-> start function

function renderUsers(user) {
  let newTrElement= document.createElement("tr");
//create new li


//create 2 buttons
let removeBtn = document.createElement("button");
let editBtn = document.createElement("button");


removeBtn.classList.add("delete");//add "delete" class
removeBtn.innerText="Delete";
editBtn.classList.add("edit");//add "edit" class
editBtn.innerText="Edit";

let tdBtn1 =document.createElement("td");
let tdBtn2 =document.createElement("td");


let position =  document.createElement("td");
position.innerText=user.position;
position.classList.add("position");
position.classList.add("alwaysShow");
//create new span with position user
  let name =  document.createElement("td");
  name.innerText=user.name;
  name.classList.add("name");
  name.classList.add("alwaysShow");
//create new span with name user
  let surname =  document.createElement("td");
  surname.innerText=user.surname;
  surname.classList.add("surname");
  surname.classList.add("alwaysShow");
  //create new span with surname user
  let role =  document.createElement("td");
  role.innerText=user.role;
  role.classList.add("role");
  role.classList.add("hide");
  //create new span with role user
  let shortDesc =  document.createElement("td");
  shortDesc.innerText=user.shortDesc;
  shortDesc.classList.add("shortDesc");
  shortDesc.classList.add("hide");
  //create new span with shortDesc user
  let longDesc =  document.createElement("td");
  longDesc.innerText=user.longDesc;
  longDesc.classList.add("longDesc");
  longDesc.classList.add("hide");
  //create new span with longDesc user
  let exp =  document.createElement("td");
  exp.innerText=user.exp;
  exp.classList.add("exp");
  exp.classList.add("hide");
  //create new span with exp user



  newTrElement.dataset.id=user.id;
//add id to new tr
  position=newTrElement.appendChild(position);
  name=newTrElement.appendChild(name);
  surname=newTrElement.appendChild(surname);
  role=newTrElement.appendChild(role);
  exp=newTrElement.appendChild(exp);
  shortDesc=newTrElement.appendChild(shortDesc);
  longDesc=newTrElement.appendChild(longDesc);
//add 6xtd to tr

  editBtn=tdBtn1.appendChild(editBtn);
  removeBtn=tdBtn2.appendChild(removeBtn);
  tdBtn2=newTrElement.appendChild(tdBtn2);
  tdBtn1=newTrElement.appendChild(tdBtn1);
  tdBtn2.classList.add("hide");
  tdBtn1.classList.add("hide");

  newTrElement=userList.appendChild(newTrElement);
// add td to tr


/// event on removeBtn to delete clicked row.
removeBtn.addEventListener("click",function (event) {
  let trToDel = this.parentElement.parentElement;
  let clickedDelId= trToDel.getAttribute('data-id');
  $.ajax({
    type:"DELETE",
    url:apiUrl+'/'+clickedDelId,//go to clicked row
    dataType:"json"
  }).done (function (response) {
    // remove table row for table
    trToDel.parentNode.removeChild(trToDel);
  }).fail(function (error) {
    console.log("error from DELETE");
  });
});//end of event removeBtn to delete
}//end of renderUsers
$("body").on("click",".edit",function () {
  let $trToEdit = $(this).parent().parent();
  console.log($trToEdit);
  let clickedEditId = $trToEdit.data("id");
  console.log(clickedEditId);
  let $oldPosition = $trToEdit.find(".position").text();
  let $oldName = $trToEdit.find(".name").text();
  let $oldSurname = $trToEdit.find(".surname").text();
  let $oldRole = $trToEdit.find(".role").text();
  let $oldShortDesc = $trToEdit.find(".shortDesc").text();
  let $oldLongDesc = $trToEdit.find(".longDesc").text();
  let $oldExp = $trToEdit.find(".exp").text();

  $trToEdit.addClass("editable");
  $trToEdit.children().hide();

  $tdToIn1 = $("<td>");
  $tdToIn2 = $("<td>");
  $tdToIn3 = $("<td>");
  $tdToIn4 = $("<td>");
  $tdToIn5 = $("<td>");
  $tdToIn6 = $("<td>");
  $tdToIn7 = $("<td>");
  $tdToIn8 = $("<td>");
  $tdToIn9 = $("<td>");

  



  let $positionInput = $("<select>");
  let $positionInputsel1 = $('<option>').text("Admin");
  let $positionInputsel2 = $('<option>').text("Developer");
  let $positionInputsel3 = $('<option>').text("Manager");
  let $positionInputsel4 = $('<option>').text("Tester");
  let $positionInputsel5 = $('<option>').text("HR");

  $positionInput.append($positionInputsel1);
  $positionInput.append($positionInputsel2);
  $positionInput.append($positionInputsel3);
  $positionInput.append($positionInputsel4);
  $positionInput.append($positionInputsel5);
  $positionInput.val($oldPosition);

  let $nameInput = $("<input>");
  $nameInput.val($oldName);

  let $surnameInput = $("<input>");
  $surnameInput.val($oldSurname);

  let $roleInput = $("<select>");
  let $roleInputsel1 = $('<option>').text("User");
  let $roleInputsel2 = $('<option>').text("Admin");
  $roleInput.append($roleInputsel1);
  $roleInput.append($roleInputsel2);
  $roleInput.val($oldRole);
  

  let $shortDescInput = $("<input>");
  $shortDescInput.addClass("hideToClick");
  $shortDescInput.val($oldShortDesc);

  let $longDescInput = $("<input>");
  $longDescInput.val($oldLongDesc);

  let $expInput = $("<input>");
  $expInput.val($oldExp);

  let $submitButton = $("<button>");
  $submitButton.css("backgroundColor","green");
  $submitButton.text("Save");

  let $delButton = $("<button>");
  $delButton.attr("disabled", true);
  $delButton.text("Delete");

  //add inputs to new td
  $tdToIn1.append($positionInput);
  $tdToIn2.append($nameInput);
  $tdToIn3.append($surnameInput);
  $tdToIn4.append($roleInput);
  $tdToIn5.append($expInput);
  $tdToIn6.append($shortDescInput);
  $tdToIn7.append($longDescInput);
  $tdToIn8.append($delButton);
  $tdToIn9.append($submitButton);
  //add tds to tr.editable
  $trToEdit.append($tdToIn1);
  $trToEdit.append($tdToIn2);
  $trToEdit.append($tdToIn3);
  $trToEdit.append($tdToIn4);
  $trToEdit.append($tdToIn5);
  $trToEdit.append($tdToIn6);
  $trToEdit.append($tdToIn7);
  $trToEdit.append($tdToIn8);
  $trToEdit.append($tdToIn9);

  $submitButton.on("click", function() {
    let positionFromInputSave = $positionInput.val();
    let nameFromInputSave = $nameInput.val();
    let surnameFromInputSave = $surnameInput.val();
    let roleFromInputSave = $roleInput.val();
    let shortDescFromInputSave = $shortDescInput.val();
    let longDescFromInputSave = $longDescInput.val();
    let expFromInputSave = $expInput.val();
    console.log(positionFromInputSave);
    if (positionFromInputSave===null || nameFromInputSave===""
        || surnameFromInputSave==="" || roleFromInputSave===null
        || shortDescFromInputSave==="" || longDescFromInputSave==="") {
          $(".error").text("Wypełnij wszystkie pola!");
    }
    else{
        error.innerText='';
        let: editUser = {
          position:positionFromInputSave,
          name:nameFromInputSave,
          surname:surnameFromInputSave,
          role:roleFromInputSave,
          shortDesc:shortDescFromInputSave,
          longDesc:longDescFromInputSave,
          exp:expFromInputSave
      }

      $.ajax({
        type:"PUT",
        url: apiUrl +"/"+clickedEditId,
        data: editUser,
        dataType:'json'
      }).done(function (response) {
          //show TR and remove class edit
          $trToEdit.children().show();
          $trToEdit.removeClass("editable");

          //remove all what i create in click edit
          $tdToIn1.remove();
          $tdToIn2.remove();
          $tdToIn3.remove();
          $tdToIn4.remove();
          $tdToIn5.remove();
          $tdToIn6.remove();
          $tdToIn7.remove();
          $tdToIn8.remove();
          $tdToIn9.remove();

          $positionInput.remove();
          $nameInput.remove();
          $surnameInput.remove();
          $roleInput.remove();
          $shortDescInput.remove();
          $longDescInput.remove();
          $expInput.remove();
          $submitButton.remove();

          $trToEdit.find(".position").text(response.position);
          $trToEdit.find(".name").text(response.name);
          $trToEdit.find(".surname").text(response.surname);
          $trToEdit.find(".role").text(response.role);
          $trToEdit.find(".shortDesc").text(response.shortDesc);
          $trToEdit.find(".longDesc").text(response.longDesc);
          $trToEdit.find(".exp").text(response.exp);
      });


    }



  });

});//end of edit btn event click


function loadUser() {

  $.ajax({
    type:"GET",
    url:apiUrl,
    dataType:"json"
  }).done(function (response) {
    for (var i = 0; i < response.length; i++) {
      renderUsers(response[i]);
    }
  }).fail(function (error) {
    console.log("error from loadUser");
  })
}
loadUser();


let positionSort = document.querySelector(".first_position");
let nameSort = document.querySelector(".first_name");
let surnameSort = document.querySelector(".first_surname");
let roleSort = document.querySelector(".first_role");
let shortDescSort = document.querySelector(".first_shortDesc");
let longDescSort = document.querySelector(".first_longDesc");
let expSort = document.querySelector(".first_exp");

positionSort.addEventListener("click",function() {
  sortTable(0);
});
nameSort.addEventListener("click",function() {
  sortTable(1);
});
surnameSort.addEventListener("click",function() {
  sortTable(2);
});
roleSort.addEventListener("click",function() {
  sortTable(3);
});
shortDescSort.addEventListener("click",function() {
  sortTable(4);
});
longDescSort.addEventListener("click",function() {
  longTable(5);
});
expSort.addEventListener("click",function() {
  sortTable(6);
});



function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.querySelector(".user_list_table");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("tr");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

let showBtn = document.querySelector(".showAll");

showBtn.addEventListener("click",function(eve){
  let hideClass = document.querySelectorAll("td");
   //let ooo = hideClass.classList.contains("alwaysShow");
   // console.log(ooo);
  showBtn.classList.toggle("clickBtn");
    if (showBtn.classList.contains("clickBtn")) {
      showBtn.innerText="Hide all records";
    }else{
        showBtn.innerText="Show all records";
    }

  [...hideClass].forEach(function(hideElement){
    if (hideElement.classList.contains("alwaysShow")) {
      
    }else{
      if (hideElement.style.display=="table-cell") {
        console.log("okadokasdokasodaskodas");
        hideElement.style.display="none";
      }else{
        hideElement.style.display="table-cell";
      }

        hideElement.classList.toggle("hide");
      }
  });
});
    

});

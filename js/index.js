//**************************** START GLOBAL*/

var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteUrl");
var modalBox = document.getElementById("modalBox");
var siteList = [];

if (localStorage.getItem("sitesContainer") !== null) {
  siteList = JSON.parse(localStorage.getItem("sitesContainer"));
  displayData();
}

//**************************** END GLOBAL*/

//****************** */ START Function ADD ()
function addData() {
  if (validationName() && urlValidation() == true) {
    var site = {
      name: siteNameInput.value.trim(),
      url: siteURLInput.value,
    };

    siteList.push(site);
    console.log(siteList);
    localStorage.setItem("sitesContainer", JSON.stringify(siteList));
    displayData();
    clearData();
  } else {
    modalBox.classList.remove("d-none");
  }
}
//****************** */ END Function ADD ()

//******************* */ START CLEAR DATA ()
function clearData() {
  siteNameInput.value = null;
  siteURLInput.value = null;

  siteNameInput.classList.remove("is-valid");
  siteURLInput.classList.remove("is-valid");
}
//***************** */ END CLEAR DATA ()

//******************* */ START DISPLAY DATA ()
function displayData() {
  var content = "";
  for (var i = 0; i < siteList.length; i++) {
    content += htmlData(i);
  }
  document.getElementById("tableData").innerHTML = content;
}
//******************* */ END DISPLAY DATA ()

function htmlData(i) {
  return `

   <tr class="text-center">
                            <td> ${i + 1} </td>
                            <td> ${siteList[i].name} </td>
                            <td class="visit"> <a href="${
                              siteList[i].url
                            }" target="_blank" class="btn btn-sm btn-success p-2 rounded-3">
                                <i class="fa-solid fa-eye"></i> Visit 
                            </a> </td>
                            <td class="delete"> <button onclick="deleteData(${i})" class="btn btn-outline-danger"> <i class="fa-solid fa-trash"></i> Delete</button> </td>
                        </tr>
`;
}

//************** */ START DELETE DATA

function deleteData(index) {
  siteList.splice(index, 1);
  localStorage.setItem("sitesContainer", JSON.stringify(siteList));
  displayData();
}

//************** */ End DELETE DATA

// start validation name

function validationName() {
  var text = siteNameInput.value;
  var regex = /^[a-zA-Z]{5,}$/i;

  if (regex.test(text) == true) {
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");

   

    return true;
  } else {
    siteNameInput.classList.remove("is-valid");
    siteNameInput.classList.add("is-invalid");
    

    return false;
  }
}

// end validation name

// start validation of URL

function urlValidation() {
  var textinfo = siteURLInput.value;
  var regex =
    /\b((http|https):\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}(:[0-9]{1,5})?(\/\S*)?\b/;

  if (regex.test(textinfo) == true) {
    siteURLInput.classList.add("is-valid");
    siteURLInput.classList.remove("is-invalid");

    return true;
  } else {
    siteURLInput.classList.remove("is-valid");
    siteURLInput.classList.add("is-invalid");

    return false;
  }
}

// end validation url

//to close Modal

function closeModal() {
  modalBox.classList.add("d-none");
}

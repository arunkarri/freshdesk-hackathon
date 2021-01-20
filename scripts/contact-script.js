let domainUrl = 'https://newaccount1611042606132.freshdesk.com/';
let appKeyPass = 'OenXsS1NC350sQzIkJ3:X';

let type = 'Create';
let submitBtn = getEle('form-submit');
let modalTitle = getEle('modal-title');
let form = getEle('contact-form');
let formError = getEle('form-error');
let alert = getEle('success-alert');
let operation = getEle('operation');

// update all the dom elements in the reusable modal based on the operation
function updateType(operationType, id) {
  type = operationType;

  [submitBtn.innerText, modalTitle.innerText, operation.innerText] = [type, type, type];

  if (type === 'Create') {
    setAttribute(submitBtn, 'onclick', 'createContact()');
  } else {
    setAttribute(submitBtn, 'onclick', `createContact(${id})`);
  }
}

// get contacts api call
async function getContacts() {
  try {
    let contactReq = await fetch(`${domainUrl}/api/v2/contacts`, {
      headers: new Headers({
        Authorization: 'Basic ' + btoa(appKeyPass),
      }),
    });
    let contactRes = await contactReq.json();
    buildTableUI(contactRes);
  } catch (error) {
    console.log(error);
  }
}

getContacts();

//get contact details based on id
async function getContactDetail(id) {
  let contactReq = await fetch(`${domainUrl}/api/v2/contacts/${id}`, {
    headers: new Headers({
      Authorization: 'Basic ' + btoa(appKeyPass),
    }),
  });
  let contactRes = await contactReq.json();
  return contactRes.name;
}

//create and update contact reusable method
async function createContact(id) {
  try {
    if (validate()) {
      formError.innerText = '';
      let reqType = 'POST';
      let endpoint = `${domainUrl}api/v2/contacts`;
      if (type === 'Update') {
        endpoint = endpoint + '/' + id;
        reqType = 'PUT';
      }
      let contactInput = formFields();
      let contactReq = await fetch(endpoint, {
        method: reqType,
        body: JSON.stringify(contactInput),
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa(appKeyPass),
        }),
      });
      let contactRes = await contactReq.json();

      if (contactReq.status >= 200 && contactReq.status <= 299) {
        getContacts();
        $('#myModal').modal('hide');
        reset();
        alert.classList.remove('hide');
        alert.classList.add('show');
        setTimeout(() => {
          alert.classList.remove('show');
          alert.classList.add('hide');
        }, 2000);
      } else {
        //show all server errors in the bottom
        let serverError = contactRes.errors[0];
        formError.innerText = `Error Occured in field : ${serverError.field}. \n Description: ${serverError.message}`;
      }
    } else {
      formError.innerText = 'Please fill all the madatory fields !!';
    }
  } catch (error) {
    console.log(error);
  }
}

//Build Contact Table UI
function buildTableUI(data) {
  let tableBody = getEle('tbody');
  tableBody.innerHTML = '';
  data.forEach(async (element) => {
    let tr = createElement('tr');

    let th1 = createElement('td');
    setAttribute(th1, 'class', 'contact-display');

    let contactSpan = createElement('span');
    setAttribute(contactSpan, 'class', 'contact');
    contactSpan.innerText = element.name.slice(0, 1);
    appendChild(th1, contactSpan);

    let contactName = createElement('span');
    contactName.innerText = element.name;
    appendChild(th1, contactName);

    let th2 = createElement('td');
    setAttribute(th2, 'class', 'text-secondary');
    th2.innerText = element.job_title === null ? '- -' : element.job_title;

    let th3 = createElement('td');
    setAttribute(th3, 'class', 'text-secondary');
    th3.innerText = element.company_id === null ? '- -' : element.company_id;

    let th4 = createElement('td');
    th4.innerText = element.email;

    let th5 = createElement('td');
    setAttribute(th5, 'class', 'text-secondary');
    th5.innerText = element.phone === null ? '- -' : element.phone;

    let th6 = createElement('td');
    setAttribute(th6, 'class', 'text-secondary');
    th6.innerText = element.facebook_id === null ? '- -' : element.facebook_id;

    let th7 = createElement('td');
    setAttribute(th7, 'class', 'text-secondary');
    th7.innerText = element.twitter_id === null ? '- -' : element.twitter_id;

    let th8 = createElement('td');
    let editBtn = createElement('i');
    setAttribute(editBtn, 'class', 'fas fa-pen edit-btn');
    setAttribute(editBtn, 'data-toggle', 'modal');
    setAttribute(editBtn, 'data-target', '#myModal');
    setAttribute(editBtn, 'onclick', `populateFields(${JSON.stringify(element)});updateType('Update',${JSON.stringify(element.id)})`);
    appendChild(th8, editBtn);

    tr.append(th1, th2, th3, th4, th5, th6, th7, th8);
    appendChild(tableBody, tr);
  });
}
// auto populate fields in the modal during edit
function populateFields(obj) {
  let name = getEle('fullName');
  let job_title = getEle('title');
  let email = getEle('email');
  let mobile = getEle('work-phone');
  let twitter_id = getEle('twitter');
  let unique_external_id = getEle('uid');
  let company_id = getEle('company');
  let address = getEle('address');

  name.value = obj.name;
  job_title.value = obj.job_title;
  email.value = obj.email;
  mobile.value = obj.phone;
  twitter_id.value = obj.twitter_id;
  unique_external_id.value = obj.unique_external_id;
  company_id.value = obj.company_id;
  address.value = obj.address;
}

// get all form fields values to send to the api
function formFields() {
  let name = getEle('fullName').value;
  let job_title = getEle('title').value;
  let email = getEle('email').value;
  let mobile = getEle('work-phone').value;
  let twitter_id = getEle('twitter').value === '' ? null : getEle('twitter').value;
  let unique_external_id = getEle('uid').value;
  let company_id = parseInt(getEle('company').value);
  let address = getEle('address').value;

  return { name, email, mobile, twitter_id, unique_external_id, company_id, address, job_title };
}

// reset form after popup is closed
function reset() {
  form.reset();
}

//form validation method
function validate() {
  let name = getEle('fullName').value;
  let job_title = getEle('title').value;
  let email = getEle('email').value;
  let mobile = getEle('work-phone').value;
  let twitter_id = getEle('twitter').value;
  let unique_external_id = getEle('uid').value;
  let address = getEle('address').value;

  return name !== '' && job_title !== '' && (email !== '' || mobile !== '' || twitter_id !== '' || unique_external_id !== '') && address !== '';
}

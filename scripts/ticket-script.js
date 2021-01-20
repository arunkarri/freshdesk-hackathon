let domainUrl = 'https://newaccount1611042606132.freshdesk.com/';
let appKeyPass = 'OenXsS1NC350sQzIkJ3:X';

//dynamic color loader with color parameter
let loader = function (color) {
  return `<div class="spinner-border ${color} spinner-border-sm" role="status">
<span class="visually-hidden"></span>
</div>`;
};

//get ticket list api
async function getTickets() {
  try {
    let ticketReq = await fetch(`${domainUrl}/api/v2/tickets`, {
      headers: new Headers({
        Authorization: 'Basic ' + btoa(appKeyPass),
      }),
    });
    let ticketRes = await ticketReq.json();
    console.log(ticketRes);
    buildCardUI(ticketRes);
  } catch (error) {
    console.log(error);
  }
}

getTickets();

// get contacts api call to display name based on the requestor id
async function getContactDetail(id) {
  try {
    let contactReq = await fetch(`${domainUrl}/api/v2/contacts/${id}`, {
      headers: new Headers({
        Authorization: 'Basic ' + btoa(appKeyPass),
      }),
    });
    let contactRes = await contactReq.json();
    return contactRes.name;
  } catch (error) {
    console.log(error);
  }
}

// update ticket api call
async function updateTicket(id, priority, status) {
  console.log(priority, status);
  let priorityDrop = getEle(`priority-dropdown${id}`);
  let statusDrop = getEle(`status-dropdown${id}`);
  if (priority !== null) {
    priorityDrop.innerHTML = loader('text-primary');
  } else if (status !== undefined) {
    statusDrop.innerHTML = loader('text-success');
  }

  try {
    let endpoint = `${domainUrl}api/v2/tickets/${id}`;
    let input = {};

    if (priority !== null) {
      input = { priority };
    } else if (status !== undefined) {
      input = { status };
    }

    let updateReq = await fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(input),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(appKeyPass),
      }),
    });
    let updateRes = await updateReq.json();
    console.log(updateRes);
    if (priority !== null) {
      buildPriority(priorityDrop, updateRes);
    } else {
      buildStatus(statusDrop, updateRes);
    }
  } catch (error) {
    console.log(error);
  }
}

// date formatter function
function formatDate(date) {
  let createdDate = new Date(date);
  let today = new Date();

  let diff = Math.abs(today - createdDate);
  return Math.round(diff / (1000 * 3600));
}

// get priority value based on priority code
function getPriority(code, type) {
  let text = 'Low';
  let priorityClass = 'low';

  if (code === 2) {
    text = 'Medium';
    priorityClass = text.toLowerCase();
  } else if (code === 3) {
    text = 'High';
    priorityClass = text.toLowerCase();
  } else if (code === 4) {
    text = 'Urgent';
    priorityClass = text.toLowerCase();
  }

  if (type === 'text') {
    return text;
  } else {
    return priorityClass;
  }
}

// get status based on status code
function getStatus(code) {
  let text = 'Open';

  if (code === 3) {
    text = 'Pending';
  } else if (code === 4) {
    text = 'Resolved';
  } else if (code === 5) {
    text = 'Closed';
  }
  return text;
}

let priorities = [
  { value: 'Low', id: 1 },
  { value: 'Medium', id: 2 },
  { value: 'High', id: 3 },
  { value: 'Urgent', id: 4 },
];

//build priority dom without rebuilding the entire dom
function buildPriority(priorityDrop, element) {
  priorityDrop.innerHTML = '';
  let priorityBtn = createElement('button');
  setAttribute(priorityBtn, 'type', 'button');
  setAttribute(priorityBtn, 'class', 'btn btn-sm dropdown-toggle drop-menu');
  setAttribute(priorityBtn, 'data-toggle', 'dropdown');
  appendChild(priorityDrop, priorityBtn);

  let prioritySpan = createElement('span');
  setAttribute(prioritySpan, 'id', 'status');
  setAttribute(prioritySpan, 'class', getPriority(element.priority, 'class'));
  appendChild(priorityBtn, prioritySpan);

  let priorityText = createElement('span');
  priorityText.innerText = getPriority(element.priority, 'text');
  appendChild(priorityBtn, priorityText);

  let dropMenu = createElement('div');
  setAttribute(dropMenu, 'class', 'dropdown-menu');
  appendChild(priorityDrop, dropMenu);

  priorities.forEach((priority) => {
    let dropItem = createElement('a');
    setAttribute(dropItem, 'class', 'dropdown-item');
    setAttribute(dropItem, 'onclick', `updateTicket(${element.id}, ${priority.id})`);

    if (priority.value === getPriority(element.priority, 'text')) {
      dropItem.classList.add('active');
    } else {
      dropItem.classList.remove('active');
    }
    appendChild(dropMenu, dropItem);

    let labelClass = createElement('span');
    setAttribute(labelClass, 'class', priority.value.toLowerCase());
    appendChild(dropItem, labelClass);

    let label = createElement('span');
    label.innerText = priority.value;
    appendChild(dropItem, label);
  });
}

let statuses = [
  { value: 'Open', id: 2 },
  { value: 'Pending', id: 3 },
  { value: 'Resolved', id: 4 },
  { value: 'Closed', id: 5 },
];

//build status dom without rebuilding the entire dom
function buildStatus(statusDrop, element) {
  statusDrop.innerHTML = '';
  let statusBtn = createElement('button');
  setAttribute(statusBtn, 'type', 'button');
  setAttribute(statusBtn, 'class', 'btn btn-sm dropdown-toggle drop-menu');
  setAttribute(statusBtn, 'data-toggle', 'dropdown');
  appendChild(statusDrop, statusBtn);

  let statusImg = createElement('img');
  statusImg.src = 'images/pulse.png';
  setAttribute(statusImg, 'class', 'pulse');
  appendChild(statusBtn, statusImg);

  let statusText = createElement('span');
  statusText.innerText = getStatus(element.status);
  appendChild(statusBtn, statusText);

  let dropMenu = createElement('div');
  setAttribute(dropMenu, 'class', 'dropdown-menu');
  appendChild(statusDrop, dropMenu);

  statuses.forEach((status) => {
    let dropItem = createElement('a');
    setAttribute(dropItem, 'class', 'dropdown-item');
    setAttribute(dropItem, 'onclick', `updateTicket(${element.id}, null, ${status.id})`);

    if (status.value === getStatus(element.status)) {
      dropItem.classList.add('active');
    } else {
      dropItem.classList.remove('active');
    }
    appendChild(dropMenu, dropItem);

    let labelClass = createElement('span');
    setAttribute(labelClass, 'class', status.value.toLowerCase());
    appendChild(dropItem, labelClass);

    let label = createElement('span');
    label.innerText = status.value;
    appendChild(dropItem, label);
  });
}

//Build Ticket list dom
function buildCardUI(data) {
  data.forEach(async (element) => {
    // get contact details to display info
    let contactName = await getContactDetail(element.requester_id);

    let ticketView = getEle('ticket-view');

    let card = createElement('div');
    setAttribute(card, 'class', 'card');
    appendChild(ticketView, card);

    let cardBody = createElement('div');
    setAttribute(cardBody, 'class', 'card-body');
    appendChild(card, cardBody);

    let cardRow = createElement('div');
    setAttribute(cardRow, 'class', 'row');
    appendChild(cardBody, cardRow);

    let avatarCol = createElement('div');
    setAttribute(avatarCol, 'class', 'col-3');
    appendChild(cardRow, avatarCol);

    let avatar = createElement('div');
    setAttribute(avatar, 'class', 'avatar');
    avatar.innerText = contactName.slice(0, 1);
    appendChild(avatarCol, avatar);

    let infoCol = createElement('div');
    setAttribute(infoCol, 'class', 'col-5');
    appendChild(cardRow, infoCol);

    let br = createElement('br');
    appendChild(infoCol, br);

    let title = createElement('h6');
    setAttribute(title, 'class', 'card-title');
    title.innerText = element.subject;
    appendChild(infoCol, title);

    let id = createElement('span');
    setAttribute(id, 'class', 'text-secondary');
    id.innerText = ` #${element.id}`;
    appendChild(title, id);

    let bottomInfo = createElement('div');
    setAttribute(bottomInfo, 'class', 'card-bottom-text');
    appendChild(infoCol, bottomInfo);

    let mailIcon = createElement('i');
    setAttribute(mailIcon, 'class', 'far fa-envelope');
    appendChild(bottomInfo, mailIcon);

    let name = createElement('b');
    name.innerText = contactName;
    appendChild(bottomInfo, name);

    let separator1 = createElement('span');
    setAttribute(separator1, 'class', 'separator');
    appendChild(bottomInfo, separator1);

    let created = createElement('span');
    created.innerText = `Created ${formatDate(element.created_at)} hours ago`;
    appendChild(bottomInfo, created);

    let statusCol = createElement('div');
    setAttribute(statusCol, 'class', 'col-3');
    setAttribute(statusCol, 'id', 'status-col');
    appendChild(cardRow, statusCol);

    let priorityDrop = createElement('div');
    setAttribute(priorityDrop, 'class', 'dropdown');
    setAttribute(priorityDrop, 'id', `priority-dropdown${element.id}`);
    appendChild(statusCol, priorityDrop);

    let statusDrop = createElement('div');
    setAttribute(statusDrop, 'class', 'dropdown');
    setAttribute(statusDrop, 'id', `status-dropdown${element.id}`);
    appendChild(statusCol, statusDrop);

    buildPriority(priorityDrop, element);
    buildStatus(statusDrop, element);
  });
}

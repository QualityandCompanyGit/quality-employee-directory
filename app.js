const q = id => document.getElementById(id);

const clean = value => {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value).trim();
};

const setRowVisibility = (id, value) => {
  const element = q(id);

  if (element) {
    element.hidden = !clean(value);
  }
};

const createPhoneLink = value => {
  return clean(value).replace(/[^+\d]/g, '');
};

const setLink = (element, text, href) => {
  if (!element) {
    return;
  }

  element.textContent = text;

  if (text && href) {
    element.href = href;
  } else {
    element.removeAttribute('href');
  }
};

async function start() {
  const employeeId = new URLSearchParams(
    window.location.search
  ).get('id');

  if (!employeeId) {
    throw new Error('Missing employee ID');
  }

  /*
    This project uses one JSON file for each employee.

    Example:
    ?id=20 loads employees/20.json
  */

  const response = await fetch(
    `employees/${encodeURIComponent(employeeId)}.json`,
    {
      cache: 'no-store'
    }
  );

  if (!response.ok) {
    throw new Error(
      `Employee data could not be loaded: ${response.status}`
    );
  }

  const employee = await response.json();

  const employeeName = [
    clean(employee.salutation),
    clean(employee.firstName),
    clean(employee.lastName)
  ]
    .filter(Boolean)
    .join(' ');

  const jobTitle = clean(employee.jobTitle);
  const department = clean(employee.department);

  const displayedEmployeeId = clean(
    employee.employeeId ?? employee.id ?? employeeId
  );

  const status = clean(employee.status) || 'Active';
  const email = clean(employee.email);
  const workPhone = clean(employee.workPhone);
  const cellPhone = clean(employee.cellPhone);

  q('name').textContent =
    employeeName || 'Employee Profile';

  q('jobTitle').textContent = jobTitle;
  q('department').textContent = department;
  q('employeeId').textContent = displayedEmployeeId;
  q('status').textContent = status;

  setRowVisibility(
    'employeeIdRow',
    displayedEmployeeId
  );

  setRowVisibility('emailRow', email);
  setRowVisibility('workPhoneRow', workPhone);
  setRowVisibility('cellPhoneRow', cellPhone);

  const photo = q('photo');
  const fallbackPhoto = 'images/OIP.webp';

const hasEmployeePhoto = Boolean(clean(employee.photo));

photo.src = hasEmployeePhoto
  ? clean(employee.photo)
  : fallbackPhoto;

photo.classList.toggle(
  'placeholder-photo',
  !hasEmployeePhoto
);

photo.alt = employeeName
  ? `${employeeName} employee photo`
  : 'Employee photo';

photo.onerror = () => {
  photo.onerror = null;
  photo.src = fallbackPhoto;
  photo.classList.add('placeholder-photo');
};
  setLink(
    q('email'),
    email,
    email ? `mailto:${email}` : ''
  );

  setLink(
    q('workPhone'),
    workPhone,
    workPhone
      ? `tel:${createPhoneLink(workPhone)}`
      : ''
  );

  setLink(
    q('cellPhone'),
    cellPhone,
    cellPhone
      ? `tel:${createPhoneLink(cellPhone)}`
      : ''
  );

  const emailButton = q('emailButton');

  if (emailButton) {
    emailButton.hidden = !email;

    if (email) {
      emailButton.href = `mailto:${email}`;
    } else {
      emailButton.removeAttribute('href');
    }
  }

  const preferredPhone =
    workPhone || cellPhone;

  const phoneButton = q('phoneButton');

  if (phoneButton) {
    phoneButton.hidden = !preferredPhone;

    if (preferredPhone) {
      phoneButton.href =
        `tel:${createPhoneLink(preferredPhone)}`;
    } else {
      phoneButton.removeAttribute('href');
    }
  }

  document.title = employeeName
    ? `${employeeName} | Quality & Company`
    : 'Quality & Company Employee Profile';

  q('loading').hidden = true;
  q('error').hidden = true;
  q('profile').hidden = false;
}

start().catch(error => {
  console.error(error);

  q('loading').hidden = true;
  q('profile').hidden = true;
  q('error').hidden = false;
});

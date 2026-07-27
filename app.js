const q = id => document.getElementById(id);

const row = (id, value) => {
  const element = q(id);

  if (element) {
    element.hidden = !value;
  }
};

const clean = value => {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value).trim();
};

const phoneLink = value => {
  return clean(value).replace(/[^+\d]/g, '');
};

async function start() {
  const id = new URLSearchParams(
    window.location.search
  ).get('id');

  if (!id) {
    throw new Error('Missing employee ID');
  }

  const response = await fetch(
    `employees/${encodeURIComponent(id)}.json`,
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error(
      `Employee data load failed: ${response.status}`
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
  const employeeId = clean(employee.employeeId);
  const status = clean(employee.status) || 'Active';
  const email = clean(employee.email);
  const workPhone = clean(employee.workPhone);
  const cellPhone = clean(employee.cellPhone);

  q('name').textContent = employeeName;
  q('jobTitle').textContent = jobTitle;
  q('department').textContent = department;
  q('employeeId').textContent = employeeId;
  q('status').textContent = status;

  row('employeeIdRow', employeeId);
  row('emailRow', email);
  row('workPhoneRow', workPhone);
  row('cellPhoneRow', cellPhone);

  const photo = q('photo');
  const fallbackPhoto = 'images/OIP.webp';

  photo.src = clean(employee.photo) || fallbackPhoto;

  photo.alt = employeeName
    ? `${employeeName} employee photo`
    : 'Employee photo';

  photo.onerror = () => {
    photo.onerror = null;
    photo.src = fallbackPhoto;
  };

  const emailLink = q('email');

  emailLink.textContent = email;

  if (email) {
    emailLink.href = `mailto:${email}`;
  } else {
    emailLink.removeAttribute('href');
  }

  const workPhoneLink = q('workPhone');

  workPhoneLink.textContent = workPhone;

  if (workPhone) {
    workPhoneLink.href =
      `tel:${phoneLink(workPhone)}`;
  } else {
    workPhoneLink.removeAttribute('href');
  }

  const cellPhoneLink = q('cellPhone');

  cellPhoneLink.textContent = cellPhone;

  if (cellPhone) {
    cellPhoneLink.href =
      `tel:${phoneLink(cellPhone)}`;
  } else {
    cellPhoneLink.removeAttribute('href');
  }

  const emailButton = q('emailButton');

  emailButton.hidden = !email;

  if (email) {
    emailButton.href = `mailto:${email}`;
  } else {
    emailButton.removeAttribute('href');
  }

  const preferredPhone = workPhone || cellPhone;
  const phoneButton = q('phoneButton');

  phoneButton.hidden = !preferredPhone;

  if (preferredPhone) {
    phoneButton.href =
      `tel:${phoneLink(preferredPhone)}`;
  } else {
    phoneButton.removeAttribute('href');
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

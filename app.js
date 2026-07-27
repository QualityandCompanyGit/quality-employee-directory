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

const validLinkedInUrl = value => {
  const linkedIn = clean(value);

  if (!linkedIn) {
    return '';
  }

  if (
    linkedIn.startsWith('https://') ||
    linkedIn.startsWith('http://')
  ) {
    return linkedIn;
  }

  return `https://${linkedIn}`;
};

async function start() {
  const id = new URLSearchParams(location.search).get('id');

  if (!id) {
    throw new Error('Missing id');
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
  const linkedin = validLinkedInUrl(employee.linkedin);

  q('name').textContent = employeeName;
  q('jobTitle').textContent = jobTitle;
  q('department').textContent = department;
  q('employeeId').textContent = employeeId;
  q('status').textContent = status;

  row('employeeIdRow', employeeId);
  row('emailRow', email);
  row('workPhoneRow', workPhone);
  row('cellPhoneRow', cellPhone);
  row('linkedinRow', linkedin);

  const photo = q('photo');

  photo.src = clean(employee.photo) || 'images/OIP.webp';

  photo.alt = employeeName
    ? `${employeeName} employee photo`
    : 'Employee photo';

  photo.onerror = () => {
    photo.onerror = null;
    photo.src = 'images/OIP.webp';
  };

  q('email').textContent = email;

  if (email) {
    q('email').href = `mailto:${email}`;
  } else {
    q('email').removeAttribute('href');
  }

  q('workPhone').textContent = workPhone;

  if (workPhone) {
    q('workPhone').href = `tel:${phoneLink(workPhone)}`;
  } else {
    q('workPhone').removeAttribute('href');
  }

  q('cellPhone').textContent = cellPhone;

  if (cellPhone) {
    q('cellPhone').href = `tel:${phoneLink(cellPhone)}`;
  } else {
    q('cellPhone').removeAttribute('href');
  }

  if (linkedin) {
    q('linkedin').href = linkedin;
  } else {
    q('linkedin').removeAttribute('href');
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
    phoneButton.href = `tel:${phoneLink(preferredPhone)}`;
  } else {
    phoneButton.removeAttribute('href');
  }

  const linkedinButton = q('linkedinButton');

  linkedinButton.hidden = !linkedin;

  if (linkedin) {
    linkedinButton.href = linkedin;
  } else {
    linkedinButton.removeAttribute('href');
  }

  document.title = employeeName
    ? `${employeeName} | Quality & Company`
    : 'Employee Profile | Quality & Company';

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

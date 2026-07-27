const q = id => document.getElementById(id);

const row = (id, value) => {
  const element = q(id);

  if (element) {
    element.hidden = !value;
  }
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
    throw new Error(`Employee data load failed: ${response.status}`);
  }

  const employee = await response.json();

  const employeeName = [
    employee.salutation,
    employee.firstName,
    employee.lastName
  ].filter(Boolean).join(' ');

  q('name').textContent = employeeName;
  q('jobTitle').textContent = employee.jobTitle || '';
  q('department').textContent = employee.department || '';
  q('employeeId').textContent = employee.employeeId || '';
  q('status').textContent = employee.status || 'Active';

  const photo = q('photo');

  photo.src = employee.photo || 'images/OIP.webp';
  photo.alt = employeeName
    ? `${employeeName} profile photo`
    : 'Employee profile photo';

  photo.onerror = () => {
    photo.onerror = null;
    photo.src = 'images/OIP.webp';
  };

  q('email').textContent = employee.email || '';

  q('workPhone').textContent = employee.workPhone || '';

  q('cellPhone').textContent = employee.cellPhone || '';

  row('employeeIdRow', employee.employeeId);
  row('emailRow', employee.email);
  row('workPhoneRow', employee.workPhone);
  row('cellPhoneRow', employee.cellPhone);

  const emailRow = q('emailRow');

  if (emailRow) {
    emailRow.href = employee.email
      ? `mailto:${employee.email}`
      : '#';
  }

  const workPhoneRow = q('workPhoneRow');

  if (workPhoneRow) {
    workPhoneRow.href = employee.workPhone
      ? `tel:${employee.workPhone.replace(/[^+\d]/g, '')}`
      : '#';
  }

  const cellPhoneRow = q('cellPhoneRow');

  if (cellPhoneRow) {
    cellPhoneRow.href = employee.cellPhone
      ? `tel:${employee.cellPhone.replace(/[^+\d]/g, '')}`
      : '#';
  }

  const emailButton = q('emailButton');

  if (emailButton) {
    emailButton.hidden = !employee.email;
    emailButton.href = employee.email
      ? `mailto:${employee.email}`
      : '#';
  }

  const phoneButton = q('phoneButton');

  if (phoneButton) {
    const preferredPhone =
      employee.workPhone ||
      employee.cellPhone ||
      '';

    phoneButton.hidden = !preferredPhone;
    phoneButton.href = preferredPhone
      ? `tel:${preferredPhone.replace(/[^+\d]/g, '')}`
      : '#';
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

const q = id => document.getElementById(id);
const row = (id, value) => {
  q(id).hidden = !value;
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

  q('name').textContent = [
    employee.salutation,
    employee.firstName,
    employee.lastName
  ].filter(Boolean).join(' ');

  q('jobTitle').textContent = employee.jobTitle || '';
  q('department').textContent = employee.department || '';
  q('employeeId').textContent = employee.employeeId || '';
  q('status').textContent = employee.status || 'Active';

  q('photo').src = employee.photo || 'images/OIP.webp';
  q('photo').onerror = () => {
    q('photo').src = 'images/OIP.webp';
  };

  q('email').textContent = employee.email || '';
  q('email').href = employee.email
    ? `mailto:${employee.email}`
    : '#';

  q('workPhone').textContent = employee.workPhone || '';
  q('workPhone').href = employee.workPhone
    ? `tel:${employee.workPhone.replace(/[^+\d]/g, '')}`
    : '#';

  q('cellPhone').textContent = employee.cellPhone || '';
  q('cellPhone').href = employee.cellPhone
    ? `tel:${employee.cellPhone.replace(/[^+\d]/g, '')}`
    : '#';

  row('employeeIdRow', employee.employeeId);
  row('emailRow', employee.email);
  row('workPhoneRow', employee.workPhone);
  row('cellPhoneRow', employee.cellPhone);

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

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

const formatCanadianPhone = value => {
  const digits = clean(value).replace(/\D/g, '');

  if (digits.length === 11 && digits.startsWith('1')) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }

  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  return clean(value);
};

const normalizeWebsiteUrl = value => {
  const url = clean(value);

  if (!url) {
    return '';
  }

  if (
    url.startsWith('https://') ||
    url.startsWith('http://')
  ) {
    return url;
  }

  return `https://${url}`;
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
  const extension = clean(employee.extension);
  const linkedin = normalizeWebsiteUrl(employee.linkedin);

  q('name').textContent =
    employeeName || 'Employee Profile';

  q('jobTitle').textContent = jobTitle;
  q('department').textContent = department;
  q('employeeId').textContent = displayedEmployeeId;
  q('status').textContent = status;
  q('extension').textContent = extension;

  setRowVisibility(
    'employeeIdRow',
    displayedEmployeeId
  );

  setRowVisibility('emailRow', email);
  setRowVisibility('workPhoneRow', workPhone);
  setRowVisibility('extensionRow', extension);

  const photo = q('photo');
  const fallbackPhoto = 'images/OIP.webp';

  const hasEmployeePhoto = Boolean(
    clean(employee.photo)
  );

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
    formatCanadianPhone(workPhone),
    workPhone
      ? `tel:${createPhoneLink(workPhone)}`
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

  const phoneButton = q('phoneButton');

  if (phoneButton) {
    phoneButton.hidden = !workPhone;

    if (workPhone) {
      phoneButton.href =
        `tel:${createPhoneLink(workPhone)}`;
    } else {
      phoneButton.removeAttribute('href');
    }
  }

  const linkedinButton = q('linkedinButton');

  if (linkedinButton) {
    linkedinButton.hidden = !linkedin;

    if (linkedin) {
      linkedinButton.href = linkedin;
    } else {
      linkedinButton.removeAttribute('href');
    }
  }

  const saveContactButton = q('saveContactButton');

  if (saveContactButton) {
    const hasContactInformation = Boolean(
      employeeName ||
      email ||
      workPhone
    );

    saveContactButton.hidden = !hasContactInformation;

    if (hasContactInformation) {
      saveContactButton.href =
        `contacts/${encodeURIComponent(employeeId)}.vcf`;

      const contactFileName = [
        clean(employee.firstName),
        clean(employee.lastName)
      ]
        .filter(Boolean)
        .join('-')
        .replace(/[^a-zA-Z0-9-]/g, '');

      saveContactButton.download =
        `${contactFileName || 'employee-contact'}.vcf`;
    } else {
      saveContactButton.removeAttribute('href');
      saveContactButton.removeAttribute('download');
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

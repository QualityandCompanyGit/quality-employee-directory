const fs = require("fs");
const path = require("path");
const { QRCodeStyling } = require(
  "qr-code-styling/lib/qr-code-styling.common.js"
);
const nodeCanvas = require("canvas");
const { JSDOM } = require("jsdom");

const ROOT_FOLDER = path.resolve(__dirname, "..");
const EMPLOYEES_FOLDER = path.join(ROOT_FOLDER, "employees");
const QR_FOLDER = path.join(ROOT_FOLDER, "qr");

const BASE_PROFILE_URL =
  "https://qualityandcompanygit.github.io/quality-employee-directory/";

const COMPANY_BLUE = "#123B5D";
const WHITE = "#FFFFFF";

/**
 * Returns all numeric employee IDs found in employees/*.json.
 */
function getEmployeeIds() {
  if (!fs.existsSync(EMPLOYEES_FOLDER)) {
    throw new Error(`Employees folder not found: ${EMPLOYEES_FOLDER}`);
  }

  return fs
    .readdirSync(EMPLOYEES_FOLDER)
    .filter((filename) => /^\d+\.json$/i.test(filename))
    .map((filename) => path.basename(filename, ".json"))
    .sort((a, b) => Number(a) - Number(b));
}

/**
 * Validate one employee ID.
 */
function validateEmployeeId(employeeId) {
  if (!/^\d+$/.test(employeeId)) {
    throw new Error(`Invalid employee ID: ${employeeId}`);
  }

  const employeeFile = path.join(
    EMPLOYEES_FOLDER,
    `${employeeId}.json`
  );

  if (!fs.existsSync(employeeFile)) {
    throw new Error(`Employee JSON not found: ${employeeFile}`);
  }
}

/**
 * Common QR styling options.
 */
function createQrOptions(employeeId) {
  const profileUrl =
    `${BASE_PROFILE_URL}?id=${encodeURIComponent(employeeId)}`;

  return {
    width: 1200,
    height: 1200,
    data: profileUrl,
    margin: 60,

    qrOptions: {
      errorCorrectionLevel: "H"
    },

    dotsOptions: {
      color: COMPANY_BLUE,
      type: "rounded"
    },

    cornersSquareOptions: {
      color: COMPANY_BLUE,
      type: "extra-rounded"
    },

    cornersDotOptions: {
      color: COMPANY_BLUE,
      type: "dot"
    },

    backgroundOptions: {
      color: WHITE
    }
  };
}

/**
 * Generate PNG and SVG for one employee.
 */
async function generateEmployeeQr(employeeId) {
  validateEmployeeId(employeeId);

  const options = createQrOptions(employeeId);

  const pngFile = path.join(QR_FOLDER, `${employeeId}.png`);
  const svgFile = path.join(QR_FOLDER, `${employeeId}.svg`);

  const pngQr = new QRCodeStyling({
    jsdom: JSDOM,
    nodeCanvas,
    type: "canvas",
    ...options
  });

  const svgQr = new QRCodeStyling({
    jsdom: JSDOM,
    type: "svg",
    ...options
  });

  const pngBuffer = await pngQr.getRawData("png");
  const svgBuffer = await svgQr.getRawData("svg");

  fs.writeFileSync(pngFile, pngBuffer);
  fs.writeFileSync(svgFile, svgBuffer);

  console.log(`Generated QR for employee ${employeeId}`);
  console.log(`Profile: ${options.data}`);
  console.log(`PNG: qr/${employeeId}.png`);
  console.log(`SVG: qr/${employeeId}.svg`);
}

/**
 * Generate QR files.
 *
 * Usage:
 * node scripts/generate-qr.js
 * node scripts/generate-qr.js 13
 * node scripts/generate-qr.js 13 15 22
 */
async function main() {
  fs.mkdirSync(QR_FOLDER, { recursive: true });

  const requestedIds = process.argv.slice(2);

  const employeeIds =
    requestedIds.length > 0 ? requestedIds : getEmployeeIds();

  if (employeeIds.length === 0) {
    console.log("No employee JSON files were found.");
    return;
  }

  console.log(
    `Generating QR codes for ${employeeIds.length} employee(s).`
  );

  for (const employeeId of employeeIds) {
    await generateEmployeeQr(employeeId);
  }

  console.log("QR generation completed successfully.");
}

main().catch((error) => {
  console.error("QR generation failed.");
  console.error(error);
  process.exit(1);
});

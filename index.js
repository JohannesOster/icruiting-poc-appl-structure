const createApplicant = (props = {}) => {
  const applicantStructure = {
    g5c7470c: { type: "string" }, // fullname
    fb9484cf: { type: "number" }, // age
  };

  const appl = Object.entries(applicantStructure).reduce(
    (acc, [key, value]) => {
      if (!props[key]) return;
      if (typeof props[key] != value.type) {
        if (value.type == "number" && Number(props[key]) != NaN) {
          props[key] = Number(props[key]);
        } else throw new Error("Incorrect Data Type");
      }
      acc[key] = props[key];
      return acc;
    },
    {}
  );

  return appl;
};

const formView = [
  { name: "g5c7470c", component: "input", placeholder: "What's your name?" },
  {
    name: "fb9484cf",
    component: "input",
    type: "number",
    placeholder: "How old are you?",
  },
];

const tableView = [
  { element: "g5c7470c", type: "string", header: "Full Name" },
  { element: "fb9484cf", type: "number", header: "Age" },
];

const createComponent = (component, props = {}) => {
  const elem = document.createElement(component);
  Object.entries(props).forEach(([key, value]) => {
    elem.setAttribute(key, value);
  });
  return elem;
};

const form = document.getElementsByTagName("form")[0];
const generateFormView = () => {
  formView.reverse().forEach(({ component, ...props }) => {
    form.insertBefore(createComponent(component, props), form.firstChild);
  });
};

const insertApplicant = (tbody, applicant) => {
  const tr = createComponent("tr");
  tableView.forEach((column) => {
    const td = createComponent("td");
    td.textContent = applicant[column.element];
    tr.appendChild(td);
  });
  tbody.appendChild(tr);
};

const tbody = document.getElementsByTagName("tbody")[0];
const generateTableView = () => {
  const thead = document.getElementsByTagName("thead")[0];
  const theadRow = thead.getElementsByTagName("tr")[0];

  const icons = {
    string: "./assets/text_fields.svg",
    number: "./assets/numbers.svg",
  };

  tableView.forEach((column) => {
    const th = createComponent("th");
    const img = createComponent("img", { src: icons[column.type] });

    th.textContent = column.header;
    theadRow.appendChild(th);
    th.insertBefore(img, th.firstChild);
  });

  applicants.forEach((appl) => {
    insertApplicant(tbody, appl);
  });
};

const handleFormSubmnission = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = [...formData].reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

  const applicant = createApplicant(data);
  insertApplicant(tbody, applicant);

  event.target.reset();
};

form.addEventListener("submit", handleFormSubmnission);

generateFormView();
generateTableView();

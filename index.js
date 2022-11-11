const applicantStructure = {
  g5c7470c: { type: "string", name: "fullname" },
  fb9484cf: { type: "number", name: "age" },
  fb9484cf: { type: "string", name: "age" },
};

const formView = [
  { element: "g5c7470c", component: "input", placeholder: "What's your name?" },
  {
    element: "fb9484cf",
    component: "input",
    type: "number",
    placeholder: "How old are you?",
  },
];

const tableView = [
  { element: "g5c7470c", type: "string", header: "Full Name" },
  { element: "fb9484cf", type: "number", header: "Age" },
];

const applicants = [{ g5c7470c: "Herbert Buchner", fb9484cf: 32 }];

const createComponent = (component, props = {}) => {
  const elem = document.createElement(component);
  Object.entries(props).forEach(([key, value]) => {
    elem.setAttribute(key, value);
  });
  return elem;
};

const generateFormView = () => {
  const form = document.getElementsByTagName("form")[0];
  formView.reverse().forEach(({ component, ...props }) => {
    form.insertBefore(createComponent(component, props), form.firstChild);
  });
};

const generateTableView = () => {
  const thead = document.getElementsByTagName("thead")[0];
  const theadRow = thead.getElementsByTagName("tr")[0];
  const tbody = document.getElementsByTagName("tbody")[0];

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

  applicants.forEach((row) => {
    const tr = createComponent("tr");
    tableView.forEach((column) => {
      const td = createComponent("td");
      td.textContent = row[column.element];
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
};

generateFormView();
generateTableView();

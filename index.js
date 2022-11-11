const applicantStructure = {
  g5c7470c: { type: "string", name: "fullname" },
  fb9484cf: { type: "number", name: "age" },
};

const formView = [
  { element: "g5c7470c", component: "input", label: "What's your name?" },
  {
    element: "fb9484cf",
    component: "input",
    type: "number",
    label: "How old are you?",
  },
];

const tableView = [
  { element: "g5c7470c", type: "string", header: "Full Name" },
  { element: "fb9484cf", type: "number", header: "Age" },
];

const applicants = [{ g5c7470c: "Herbert Buchner", fb9484cf: 32 }];

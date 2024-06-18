const columns = [
  {name: "NAME", uid: "name",},
  {name: "Contact", uid: "contact",},
  {name: "STATUS", uid: "status",},
  {name: "KYC STATUS", uid: "kyc_verified",},
  {name: "Secure Pin", uid: "secure_pin_set",},
  {name: "CREATED AT", uid: "created_at",},
  {name: "UPDATED AT", uid: "updated_at",},
  {name: "ACTIONS", uid: "actions",},
];

const staffColumns = [
  {name: "NAME", uid: "name",},
  {name: "Contact", uid: "contact",},
  {name: "STATUS", uid: "status",},
  {name: "CREATED AT", uid: "created_at",},
  {name: "UPDATED AT", uid: "updated_at",},
  {name: "ACTIONS", uid: "actions",},
];

const statusOptions = [
  {name: "All", uid: "ALL"},
  {name: "Active", uid: "ACTIVE"},
  {name: "Inactive", uid: "INACTIVE"},
];

const sortOptions = [
  {name: "New to Old", uid: "NEW"},
  {name: "Old to New", uid: "OLD"},
]

export {columns, statusOptions, sortOptions, staffColumns};

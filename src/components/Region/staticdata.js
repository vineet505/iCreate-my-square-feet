const columns = [
  { name: "Icon", uid: "icon" },
  { name: "Region", uid: "title" },
  { name: "Description", uid: "description" },
  { name: "Posted at", uid: "created_at" },
  { name: "Status", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

export { columns, statusOptions };

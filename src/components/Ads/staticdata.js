const columns = [
    { name: "Icon", uid: "icon" },
    { name: "Title", uid: "title" },
    { name: "Description", uid: "description" },
    { name: "Posted at", uid: "created_at" },
    {name: "Updated at", uid: "updated_at"},
    { name: "Status", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];
  
  const statusOptions = [
    { name: "Active", uid: "active" },
    {name: "Inactive", uid: "inactive" },
  ];
  
  export { columns, statusOptions };
  
const columns = [
  {name: "Project Icon", uid: "project_logo"},
  {name: "Project Title", uid: "project_title",},
  {name: "Description", uid: "description",},
  {name: "Views", uid: "view_count",},
  {name: "Listed By", uid: "listed_by",},
  {name: "Investment", uid: "is_investment_property"},
  {name: "Category", uid: "category"},
  {name: "Type", uid: "listing_type"},
  {name: "Price", uid: "price"},
  {name:"ROI", uid: "roi_percentage"},
  {name: "Posted at", uid: "created_at"},
  {name: "Status", uid: "status"},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];

export {columns, statusOptions};

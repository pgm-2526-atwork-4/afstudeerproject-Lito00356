const isEmptyText = ({ value }) => {
  return value === null || value === undefined || value === "";
};

export default isEmptyText;

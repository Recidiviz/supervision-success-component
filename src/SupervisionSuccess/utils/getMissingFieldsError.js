function getMissingFieldsError(state, fields) {
  const isSingle = fields.length === 1;

  const stateSuffix = fields.includes("state")
    ? "missing for a row without a state name"
    : `missing for state ${state}`;

  return `Field${isSingle ? "" : "s"} ${fields.join(", ")} ${
    isSingle ? "is" : "are"
  } ${stateSuffix}.`;
}

export default getMissingFieldsError;

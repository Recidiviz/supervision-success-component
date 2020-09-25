function getMissingFieldsError(state, fields) {
  const isSingle = fields.length === 1;

  if (fields.includes("state")) {
    return "One of the rows missing the state name.";
  }

  return `Field${isSingle ? "" : "s"} ${fields.join(", ")} ${
    isSingle ? "is" : "are"
  } missing for state ${state}.`;
}

export default getMissingFieldsError;

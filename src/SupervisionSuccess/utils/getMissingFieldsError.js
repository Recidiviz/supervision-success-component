function getMissingFieldsError(fields) {
  const isSingle = fields.length === 1;

  return `Field${isSingle ? "" : "s"} ${fields.join(", ")} ${isSingle ? "is" : "are"} missing.`;
}

export default getMissingFieldsError;

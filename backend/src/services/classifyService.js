const classifyTrash = () => {
  const trashTypes = [
    "Plastik",
    "Kertas",
    "Logam",
    "Kaca",
    "Kardus",
    "Residu",
  ];

  const randomType =
    trashTypes[
      Math.floor(Math.random() * trashTypes.length)
    ];

  const randomConfidence =
    Math.floor(Math.random() * 10) + 90;

  return {
    prediction: randomType,
    confidence: randomConfidence,
  };
};

export default classifyTrash;
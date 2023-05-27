export const getValueByColumn = (item: any, column: string) => {
  const columns = column.split(".");
  let value = item;
  for (const col of columns) {
    value = value[col];
    if (value === undefined) {
      break;
    }
  }
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "object" && value !== null) {
    return value.name;
  }
  return value ? String(value).toLowerCase() : "";
};

export const sortItems = (items: any[], column: string, direction: number) => {
  const sorted = [...items];
  sorted.sort((a, b) => {
    const valueA = getValueByColumn(a, column);
    const valueB = getValueByColumn(b, column);

    if (column === "budget") {
      return (direction === 1 ? 1 : -1) * (valueA - valueB);
    }

    if (direction === 1) {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });
  return sorted;
};

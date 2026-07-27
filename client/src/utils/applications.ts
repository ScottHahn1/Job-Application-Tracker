export const formatStatus = (status: string) => {
  return status[0].toUpperCase() + status.slice(1);
}

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
import { format } from "date-fns";

const formatDate = (dateString: string) =>
  format(new Date(dateString), "d MMM yyyy");

export default formatDate;

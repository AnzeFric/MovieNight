import { Person } from "@/interfaces/movie";

export const formatReleaseYear = (year: number | null) => {
  if (!year) return "";
  return `, ${year}`;
};

export const formatLength = (length: number | null) => {
  if (!length) return "00:00";

  if (length < 60) {
    var str = `00:${length.toString().padStart(2, "0")}`;
  } else {
    const lengthH = Math.floor(length / 60);
    const lengthMin = Math.abs(length - 60 * Number(lengthH)).toString();
    var str = `${lengthH.toString().padStart(2, "0")}:${lengthMin.padStart(2, "0")}`;
  }
  return str;
};

export const formatPerson = (person: Person | null) => {
  if (!person) return "";

  return person.firstname + " " + person.lastname;
};

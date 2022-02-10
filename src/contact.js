const accentsMap = {
  a: "á|à|ã|â|À|Á|Ã|Â",
  e: "é|è|ê|É|È|Ê",
  i: "í|ì|î|Í|Ì|Î",
  o: "ó|ò|ô|õ|Ó|Ò|Ô|Õ",
  u: "ú|ù|û|ü|Ú|Ù|Û|Ü",
  c: "ç|Ç",
  n: "ñ|Ñ",
};

export const slugify = text =>
  Object.keys(accentsMap).reduce(
    (acc, cur) => acc.replace(new RegExp(accentsMap[cur], "g"), cur),
    text
  );

export const contacts = [
  {
    firstName: "Isidro",
    lastName: "Manzanillotla",
    numbers: [{ home: "1234567890" }, { fax: "1234567890" }],
  },
  {
    firstName: "Mike",
    lastName: "Wazowsky",
    numbers: [{ home: "1234567890" }, { fax: "1234567890" }],
  },
  {
    firstName: "Cockroach",
    lastName: "Boy",
    numbers: [{ home: "1234567890" }, { fax: "1234567890" }],
  },
  {
    firstName: "Pedro",
    lastName: "Parques",
    numbers: [{ home: "1234567890" }, { fax: "1234567890" }],
  },
  {
    firstName: "Perrito",
    lastName: "Loquito",
    numbers: [{ home: "1234567890" }, { fax: "1234567890" }],
  },
  {
    firstName: "Canela",
    lastName: "López",
    numbers: [{ mobile: "1234567890" }, { home: "1234567890" }],
  },
  {
    firstName: "Ana",
    lastName: "Linda",
    numbers: [
      { mobile: "1234567890" },
      { office: "1234567890" },
      { home: "1234567890" },
    ],
  },
  {
    firstName: "Carrera",
    lastName: "Trunca",
    numbers: [{ home: "1234567890" }],
  },
];

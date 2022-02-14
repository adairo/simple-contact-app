const accentsMap = {
  a: "á|à|ã|â|À|Á|Ã|Â",
  e: "é|è|ê|É|È|Ê",
  i: "í|ì|î|Í|Ì|Î",
  o: "ó|ò|ô|õ|Ó|Ò|Ô|Õ",
  u: "ú|ù|û|ü|Ú|Ù|Û|Ü",
  c: "ç|Ç",
  n: "ñ|Ñ",
};

export const slugify = text => {
  Object.keys(accentsMap).reduce(
    (acc, cur) => acc.replace(new RegExp(accentsMap[cur], "g"), cur),
    text
  );
};

function* genId() {
  let id = 10;
  while (true) {
    yield ++id;
  }
}

export const idGenerator = genId();

export const contacts = [
  {
    firstName: "Isidro",
    lastName: "Manzanillotla",
    number: "1234567890",
    id: 1,
  },
  {
    firstName: "Mike",
    lastName: "Wazowsky",
    number: "1234567890",
    id: 2,
  },
  {
    firstName: "Cockroach",
    lastName: "Boy",
    number: "232312312",
    id: 3,
  },
  {
    firstName: "Pedro",
    lastName: "Parques",
    number: "1234567890",
    id: 4,
  },
  {
    firstName: "Perrito",
    lastName: "Loquito",
    number: "1234567890",
    id: 5,
  },
  {
    firstName: "Canela",
    lastName: "López",
    number: "1234567890",
    id: 6,
  },
  {
    firstName: "Ana",
    lastName: "Linda",
    number: "1234567890",
    id: 7,
  },
  {
    firstName: "Carrera",
    lastName: "Trunca",
    number: "1234567890",
    id: 8,
  },
];

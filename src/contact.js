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
  return Object.keys(accentsMap).reduce(
    (acc, cur) => acc.replace(new RegExp(accentsMap[cur], "g"), cur),
    text
  );
};

function* genId() {
  let id = 0;
  while (true) {
    yield ++id;
  }
}

export const idGenerator = genId();

export const contacts = [
  {
    firstName: 'Linus',
    lastName: 'Torvaldo',
    number: "9887653212",
    id: 2
  },
  { 
    firstName: "Billy",
    lastName: "Joel",
    number: "7767654321",
    id: 1,
  }
];

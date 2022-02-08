export default class Contact {
    constructor(name, tNumbers = []) {
        this.name = name
        this.tNumbers = tNumbers
    }
}

export const contacts = [
    {
      name: "Ana",
      lastName: "Linda",
      numbers: [
          {mobile: "1234567890"},
          {office: "1234567890"},
          {home: "1234567890"}
      ]
    },
    {
      name: "Canela",
      lastName: "López",
      numbers: [
          {mobile: "1234567890"},
          {home: "1234567890"}
      ]
    },
    {
      name: "Carrera",
      lastName: "Trunca",
      numbers: [
          {home: "1234567890"}
      ]
    },
    {
      name: "Isidro",
      lastName: "Manzanillotla",
      numbers: [
          {home: "1234567890"},
          {fax: "1234567890"},
  
      ]
    },
    
  ];
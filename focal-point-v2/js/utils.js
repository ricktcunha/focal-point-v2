// Dados dos contatos empresariais - Adubos Real
// Cada objeto representa um contato/setor
const CONTACTS = [
  {
    setor: "Financeiro",
    nome: "Todas as áreas",
    responsavel: "Amanda",
    email: "amanda.dias@adubosreal.com.br",
    contato: "(35) 3112-2382",
    ramal: "",
    tipoContato: ["fixo"]
  },
  {
    setor: "RH",
    nome: "Todas áreas",
    responsavel: "Daniela",
    email: "daniela.vieira@adubosreal.com.br",
    contato: "(35) 99742-3797",
    ramal: "",
    tipoContato: ["celular"]
  },
  {
    setor: "Fiscal",
    nome: "Todas as áreas",
    responsavel: "Tatiana",
    email: "tatiana.vidal@adubosreal.com.br",
    contato: "(35) 99708-4204",
    ramal: "",
    tipoContato: ["celular"]
  },
  {
    setor: "Marketing",
    nome: "Todas as áreas",
    responsavel: "Tamara",
    email: "tamara.oliveira@adubosreal.com.br",
    contato: "(35) 99764-8280",
    ramal: "",
    tipoContato: ["celular"]
  },
  {
    setor: "Crédito e Recebimento",
    nome: "Crédito - Cadastro",
    responsavel: "Pamela",
    email: "pamela.sousa@adubosreal.com.br",
    contato: "(35) 98861-2714",
    ramal: "1103",
    tipoContato: ["celular", "ramal"]
  },
  {
    setor: "Crédito e Recebimento",
    nome: "Crédito – Recebimento",
    responsavel: "Tuany",
    email: "tuany.paiva@adubosreal.com.br",
    contato: "(35) 99888-1416",
    ramal: "",
    tipoContato: ["celular"]
  },
  {
    setor: "Crédito e Recebimento",
    nome: "Crédito – Pessoa Física (PF)",
    responsavel: "Josceane",
    email: "josceane.silva@adubosreal.com.br",
    contato: "(35) 98861-2715",
    ramal: "",
    tipoContato: ["celular"]
  },
  {
    setor: "Crédito e Recebimento",
    nome: "Crédito – Pessoa Jurídica (PJ)",
    responsavel: "Ana Cristina",
    email: "ana.bastos@adubosreal.com.br",
    contato: "(35) 99953-9224",
    ramal: "",
    tipoContato: ["celular"]
  },
  {
    setor: "Operações Comerciais - Logística",
    nome: "Operações Comerciais - Logística",
    responsavel: "Tamiris",
    email: "tamiris.pereira@adubosreal.com.br",
    contato: "(35) 99739-0615",
    ramal: "",
    tipoContato: ["celular"]
  },
  {
    setor: "Produtos da Linha",
    nome: "Defensivos e Sementes",
    responsavel: "Mário",
    email: "mario.filho@adubosreal.com.br",
    contato: "(35) 98861-2723",
    ramal: "",
    tipoContato: ["celular"]
  },
  {
    setor: "Produtos da Linha",
    nome: "Especialidades",
    responsavel: "Rafael",
    email: "rafael.domingos@adubosreal.com.br",
    contato: "(35) 99718-7129",
    ramal: "",
    tipoContato: ["celular"]
  },
  {
    setor: "Fertilizantes",
    nome: "Fertilizantes – Sul",
    responsavel: "Luiz Augusto",
    email: "luiz.fernandes@adubosreal.com.br",
    contato: "(19) 99626-8042",
    ramal: "",
    tipoContato: ["celular"]
  },
  {
    setor: "Fertilizantes",
    nome: "Fertilizantes – Leste (Unidades: ESP/BHE)",
    responsavel: "Erick",
    email: "erick.rossi@adubosreal.com.br",
    contato: "(35) 99909-2246",
    ramal: "",
    tipoContato: ["celular"]
  },
  {
    setor: "Fertilizantes",
    nome: "Fertilizantes – Leste (Demais Unidades)",
    responsavel: "Esrael",
    email: "esrael.junior@adubosreal.com.br",
    contato: "(35) 99953-2365",
    ramal: "",
    tipoContato: ["celular"]
  },
  {
    setor: "Fábricas",
    nome: "Fábrica - Pouso Alegre",
    responsavel: "Lucas",
    email: "lucas.altenis@adubosreal.com.br",
    contato: "(35) 99716-2079",
    ramal: "",
    tipoContato: ["celular"]
  },
  {
    setor: "Fábricas",
    nome: "Fábrica - Serra",
    responsavel: "Robson",
    email: "robson.conceicao@adubosreal.com.br",
    contato: "(35) 99830-2998",
    ramal: "",
    tipoContato: ["celular"]
  },
  {
    setor: "Fábricas",
    nome: "Fábrica - Mogi Mirim",
    responsavel: "Maique",
    email: "maique.rocha@adubosreal.com.br",
    contato: "(35) 99638-4034",
    ramal: "",
    tipoContato: ["celular"]
  },
  {
    setor: "Fábricas",
    nome: "Fábrica - Matozinhos",
    responsavel: "Bruno",
    email: "bruno.santos@adubosreal.com.br",
    contato: "(35) 99090-2834",
    ramal: "",
    tipoContato: ["celular"]
  },
  {
    setor: "TI",
    nome: "Todas as áreas",
    responsavel: "Lucas",
    email: "lucas.soares@adubosreal.com.br",
    contato: "(35) 3112-2382",
    ramal: "",
    tipoContato: ["fixo"]
  },
  {
    setor: "Compliance e Jurídico",
    nome: "Todas as áreas",
    responsavel: "Adelson",
    email: "adelson.nicacio@adubosreal.com.br",
    contato: "(35) 99937-1786",
    ramal: "",
    tipoContato: ["celular"]
  },
  {
    setor: "Compras e Frota Leve",
    nome: "Todas as áreas",
    responsavel: "Adelson",
    email: "adelson.nicacio@adubosreal.com.br",
    contato: "(35) 99937-1786",
    ramal: "",
    tipoContato: ["celular"]
  },
  {
    setor: "Operações Comerciais",
    nome: "Frota Pesada",
    responsavel: "Eliel",
    email: "eliel.silva@adubosreal.com.br",
    contato: "(35) 99996-1260",
    ramal: "",
    tipoContato: ["celular"]
  },
  {
    setor: "Operações Comerciais",
    nome: "Expedição",
    responsavel: "Diego",
    email: "diego.teixeira@adubosreal.com.br",
    contato: "(35) 99969-7281",
    ramal: "",
    tipoContato: ["celular"]
  },
  {
    setor: "Operações Comerciais",
    nome: "Logística",
    responsavel: "Victor Hugo",
    email: "victor.moraes@adubosreal.com.br",
    contato: "(35) 99180-1000",
    ramal: "",
    tipoContato: ["celular"]
  },
  {
    setor: "Operações Comerciais",
    nome: "CDs e Estoques",
    responsavel: "José Oliveira",
    email: "jose.oliveira@adubosreal.com.br",
    contato: "(11) 94465-6754",
    ramal: "",
    tipoContato: ["fixo"]
  },
  {
    setor: "Operações Comerciais",
    nome: "Planejamento",
    responsavel: "Thais",
    email: "thais.oliveira@adubosreal.com.br",
    contato: "(35) 99836-9824",
    ramal: "",
    tipoContato: ["celular"]
  },
  {
    setor: "Operações Comerciais",
    nome: "Faturamento",
    responsavel: "Larissa",
    email: "larissa.silva@adubosreal.com.br",
    contato: "(35) 99870-9514",
    ramal: "",
    tipoContato: ["celular"]
  }
];

// Exporta para uso global
window.CONTACTS = CONTACTS;

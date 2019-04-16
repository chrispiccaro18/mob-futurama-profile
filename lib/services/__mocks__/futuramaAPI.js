const characters = {
  Bender: 'sup',
  Fry: 'supp',
  Leela: 'sup',
  ProfessorFarnsworth: 'sup',
  Amy: 'sup',
  Lurr: 'sup',
  ZappBrannigan: 'sup',
  DrZoidberg: 'sup',
  Lindathereporter: 'sup',
  BobBarker: 'sup',
  Hermes: 'sup',
  MorganProctor: 'sup',
  Mom: 'sup',
  RobotMob: 'sup',
  GiantBender: 'sup',
  Kif: 'sup',
  Donbot: 'sup'
};

function getTagline(character) {
  return Promise.resolve(characters[character]);
}

module.exports = {
  getTagline
};


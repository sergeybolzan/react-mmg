export default class User {
  constructor(firstName, lastName, email, cardsBackId, difficultyId) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.cardsBackId = cardsBackId;
    this.difficultyId = difficultyId;
  }
}
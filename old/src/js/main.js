document.addEventListener('DOMContentLoaded', function() {
	class Timer {
		constructor() {
			this.seconds = 0;
			this.minutes = 0;
			this.hours = 0;
			this.currentTime = '';
		}

		formatTimeUnit(timeUnit) {
			return timeUnit ? (timeUnit > 9 ? timeUnit : "0" + timeUnit) : "00";
		}

		start(timeElement) {
			this._interval = setInterval(() => {
				this.seconds++;
				if (this.seconds >= 60) {
					this.seconds = 0;
					this.minutes++;
					if (this.minutes >= 60) {
						this.minutes = 0;
						this.hours++;
					}
				}
				this.currentTime = this.formatTimeUnit(this.hours) + ":" + this.formatTimeUnit(this.minutes) + ":" + this.formatTimeUnit(this.seconds);
				timeElement.textContent = this.currentTime;
			}, 1000);
		}

		stop() {
			clearInterval(this._interval);
		}
	}

	class User {
		constructor(firstName, lastName, email, cardsBack, difficulty) {
			this.firstName = firstName;
			this.lastName = lastName;
			this.email = email;
			this.cardsBack = cardsBack;
			this.difficulty = difficulty;
		}
	}

	let selectedCardsArray = [];
	let matchedCardsArray = [];

	let user = JSON.parse(localStorage.getItem('match-match-game-user'));
	if (!!user) {
		document.querySelector('#userFirstName').value = user.firstName;
		document.querySelector('#userLastName').value = user.lastName;
		document.querySelector('#userEmail').value = user.email;
		document.querySelector('#cardsBack [value="' + user.cardsBack + '"]').selected = true;
		document.querySelector('#gameDifficulty [value="' + user.difficulty + '"]').selected = true;
	}

	let timer = new Timer();

	// "START NEW GAME" button click.
	document.querySelector('.start-button-wrapper button').addEventListener('click', () => {
		document.querySelector('.start-game').style.visibility = 'hidden';
		document.querySelector('.game').style.visibility = 'visible';
		document.querySelector('body').style.background = '#f1bcb8';

		timer.start(document.querySelector('time'));
		saveUserToLocalStorage();
		startGame();
		document.querySelector('.cards').addEventListener('click', clickOnCard);
	});

	// "NEW GAME" buttons click
	document.querySelectorAll('.refresh-page-button').forEach(element => {
		element.addEventListener('click', () => {
			document.location.reload();
		});
	});

	/**
	 * Filling user fields from form elements and save to local storage
	 */
	function saveUserToLocalStorage() {
		let selectCardBack = document.querySelector('#cardsBack');
		let selectGameDifficulty = document.querySelector('#gameDifficulty');

		user = new User(
			document.querySelector('#userFirstName').value, 
			document.querySelector('#userLastName').value, 
			document.querySelector('#userEmail').value, 
			selectCardBack.options[selectCardBack.selectedIndex].value,
			selectGameDifficulty.options[selectGameDifficulty.selectedIndex].value
		);
		user.time = null;

		localStorage.setItem('match-match-game-user', JSON.stringify(user));
	}

	/**
	 * Creating cards html elements and appending they to '.cards' element. 
	 * Each card gets 'data-number' attribute with value from 'numbersArray', 
	 * which filled with numbers from 1 to 'user.difficulty / 2' two times and shuffled.
	 */
	function startGame() {
		let numbersArray = Array(user.difficulty / 2).fill(0).map((value, index, array) => index + 1);
		numbersArray = numbersArray.concat(numbersArray);
		numbersArray.sort(() => Math.random() - 0.5);
		
		let cards = document.querySelector('.cards');
		for (let i = 0; i < user.difficulty; i++) {
			let card = document.createElement('div');
			card.classList.add('card');
			if (user.difficulty === '6') {
				card.style.width = '33.33%';
				card.style.height = '40%';
			}
			if (user.difficulty === '12') card.style.height = '30%';
			
			let figure = document.createElement('figure');
			figure.dataset.number = numbersArray[i];
			
			let cardBack = document.createElement('span');
			cardBack.classList.add('cardBack', 'back-img-' + user.cardsBack);
			figure.appendChild(cardBack);

			let cardFront = document.createElement('span');
			cardFront.classList.add('cardFront', 'front-img-' + numbersArray[i]);
			figure.appendChild(cardFront);

			card.appendChild(figure);
			cards.appendChild(card);
		}
	}

	/**
	 * Function, called when user click on any card.
	 * Event processed when it bubbling to 'figure' element.
	 * @param event 
	 */
	function clickOnCard(event) {
		let target = event.target;
		while (target != this) {
			if (target.tagName === 'FIGURE') {
				if (matchedCardsArray.indexOf(target) !== -1 || selectedCardsArray.indexOf(target) !== -1) return;
				target.classList.toggle('selected');
				selectedCardsArray.push(target);

				// Second card flipped?
				if (selectedCardsArray.length === 2) {

					// Same cards?
					if (selectedCardsArray[0].dataset.number === selectedCardsArray[1].dataset.number) {
						selectedCardsArray.forEach((value) => {
							matchedCardsArray.push(value);

							// Hide found pair
							setTimeout(() => value.parentNode.classList.add('hideCard'), 500);
						});

						// All pairs found?
						if (matchedCardsArray.length.toString() === user.difficulty) {

							// Win
							setTimeout(() => endGame(), 1000);
						}
					} else {
						selectedCardsArray.forEach(value => {

							// Flip pair back
							setTimeout(() => value.classList.toggle('selected'), 500);
						});
					}

					// Clear array
					selectedCardsArray = [];
				}
				return;
			}
			target = target.parentNode;
		}
	}

	/**
	 * When all pairs are found, the player wins. Showing congratulations to the player.
	 * Timer time are saving to user value.
	 * Getting top10 table from local storage, adding current user result to table, and resaving table to local storage.
	 */
	function endGame() {
		timer.stop();
		user.time = timer.currentTime;
		document.querySelector('#result-time').textContent += user.time;

		let results = getResults();
		updateResults(results);
		buildResultsTable(results);
		document.querySelector('#tab' + user.difficulty).click();

		document.querySelector('.game').style.visibility = 'hidden';
		document.querySelector('.end-game').style.visibility = 'visible';
		document.querySelector('body').style.background = 'url(img/end-game-bg.jpg) no-repeat center center / cover';
	}

	/**
	 * Getting top10 table from local storage. If table not exist, it creating from own test object.
	 */
	function getResults() {
		let results = JSON.parse(localStorage.getItem('match-match-game-results'));
		if (!results) {
			results = {
				'6': [{ "firstName": "John", "lastName": "Connor", "email": "johnconnor@gmail.com", "cardsBack": "1", "difficulty": "6", "time": "00:00:25" }, { "firstName": "John", "lastName": "Connor", "email": "johnconnor@gmail.com", "cardsBack": "1", "difficulty": "6", "time": "00:00:30" }, { "firstName": "John", "lastName": "Connor", "email": "johnconnor@gmail.com", "cardsBack": "1", "difficulty": "6", "time": "00:00:35" }],
				'12': [{ "firstName": "John", "lastName": "Connor", "email": "johnconnor@gmail.com", "cardsBack": "1", "difficulty": "12", "time": "00:00:35" }, { "firstName": "John", "lastName": "Connor", "email": "johnconnor@gmail.com", "cardsBack": "1", "difficulty": "12", "time": "00:00:40" }, { "firstName": "John", "lastName": "Connor", "email": "johnconnor@gmail.com", "cardsBack": "1", "difficulty": "12", "time": "00:00:45" }],
				'16': [{ "firstName": "John", "lastName": "Connor", "email": "johnconnor@gmail.com", "cardsBack": "1", "difficulty": "16", "time": "00:00:45" }, { "firstName": "John", "lastName": "Connor", "email": "johnconnor@gmail.com", "cardsBack": "1", "difficulty": "16", "time": "00:00:50" }, { "firstName": "John", "lastName": "Connor", "email": "johnconnor@gmail.com", "cardsBack": "1", "difficulty": "16", "time": "00:00:55" },]
			};
		}
		return results;
	}

	/**
	 * Adding new result to table and saving it to local storage.
	 * @param results Top 10 table object
	 */
	function updateResults(results) {
		results[user.difficulty].push(user);
		results[user.difficulty].sort(sortUsersByTime);
		results[user.difficulty] = results[user.difficulty].slice(0, 10);
		localStorage.setItem('match-match-game-results', JSON.stringify(results));
	}

	/**
	 * Creating html table from top10 table object.
	 * @param results Top 10 table object
	 */
	function buildResultsTable(results) {
		for (let property in results) {
			let table = document.createElement('table');
			results[property].forEach(element => {
				let tableRow = document.createElement('tr');
				let tableData1 = document.createElement('td');
				let tableData2 = document.createElement('td');

				tableData1.textContent = element.lastName + ' ' + element.firstName;
				tableData2.textContent = element.time;

				tableRow.appendChild(tableData1);
				tableRow.appendChild(tableData2);
				table.appendChild(tableRow);
			});
			document.querySelector('#results-content' + property).appendChild(table);
		}
	}

	/**
	 * Converting time string to seconds for comparing.
	 * @param first First user for comparing
	 * @param second Second user for comparing
	 */
	function sortUsersByTime(first, second) {
		let firstTime = first.time.split(':');
		let secondTime = second.time.split(':');
		firstTime = firstTime[0] * 3600 + firstTime[1] * 60 + +firstTime[2];
		secondTime = secondTime[0] * 3600 + secondTime[1] * 60 + +secondTime[2];
		return firstTime - secondTime;
	}
});

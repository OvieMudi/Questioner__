
const dialogBox = document.querySelector('.dialogBox');
const submitBtn = document.getElementById('submitBtn');
const addMeetupBtn = document.getElementById('addMeetupBtn');

// eslint-disable-next-line no-undef
dialogPolyfill.registerDialog(dialogBox);


addMeetupBtn.addEventListener('click', (event) => {
  dialogBox.showModal();
  event.preventDefault();
});
submitBtn.addEventListener('click', () => {
  dialogBox.close();
});

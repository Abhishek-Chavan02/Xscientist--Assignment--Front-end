// Function to show a pop-up text when hovering over a text line
function showPopUpText(event) {
  const textElement = event.target;
  const popUpText = document.createElement('span');
  popUpText.textContent = 'Hovered!';
  popUpText.className = 'popup-text';
  textElement.appendChild(popUpText);

  // Position the pop-up text based on the mouse position
  popUpText.style.left = `${event.clientX - textElement.getBoundingClientRect().left}px`;
  popUpText.style.top = `${event.clientY - textElement.getBoundingClientRect().top - 30}px`;

  // Remove the pop-up text after a short delay
  setTimeout(() => {
    textElement.removeChild(popUpText);
  }, 1000); // Remove after 1 second
}

// Add mouseover event listeners to each text line
const textLines = document.querySelectorAll('.user-details p');
textLines.forEach((line) => {
  line.addEventListener('mouseover', showPopUpText);
});

// Function to fetch random user data from the API and update the user card
async function fetchRandomUser() {
  try {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    const user = data.results[0];

    // Update user card content
    document.querySelector('.username').textContent = `${user.login.username}`;
    document.querySelector('.full-name').textContent = `${user.name.first} ${user.name.last}`;
    document.querySelector('.gender').textContent = `${user.gender}`;
    document.querySelector('.dob').textContent = `DOB: ${new Date(user.dob.date).toLocaleDateString()}`;
    document.querySelector('.address').textContent = `${user.location.street.name}, ${user.location.city}`;
    document.querySelector('.email').textContent = `${user.email}`;
    
    // Update user avatar (profile picture)
    document.querySelector('.user-avatar').src = user.picture.large;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

// Add click event listener to the "Fetch New User" button
document.querySelector('.fetch-user-button').addEventListener('click', fetchRandomUser);

// Initial data load (you can remove this if not needed)
fetchRandomUser();

function userLogin(data) {
    // Display the user profile button
    const html = `
        <div id="container">
            <h2>Hi ${data.firstName}</h2> 
            <button id="profile">View Profile</button>
        </div>
    `;
    document.getElementById('user-profile').innerHTML = html;

    // Add event listener to the profile button
    document.getElementById('profile').addEventListener('click', function(event) {
        event.preventDefault();
        renderUserProfile(data);
    });
}

function renderUserProfile(data) {
    const html = `
        <div id="container">
            <h2>${data.firstName} ${data.lastName}</h2>
            <span>Maiden Name: ${data.maidenName}</span><br>
            <span>Age: ${data.age}</span><br>
            <span>Email: ${data.email}</span><br>
            <span>Phone: ${data.phone}</span><br>
            <span>Address: ${data.address.address}</span><br>
            <span>City: ${data.address.city}</span><br>
            <span>State: ${data.address.state}</span><br>
            <span>Zip: ${data.address.postalCode}</span><br>
            <span>Country: ${data.address.country}</span><br>
            <span>Gender: ${data.gender}</span><br>
            <span>Password: ${data.password}</span><br>
            <img src="${data.image}" alt="User Image"><br>
            <span>University: ${data.university}</span><br>
        </div>
    `;
    document.getElementById('user_profile_page').innerHTML = html;
}

function getUserByUsername(username) {
    return fetch('https://dummyjson.com/users')
        .then(function(res) {
            if (!res.ok) {
                throw new Error('Failed to fetch users');
            }
            return res.json();
        })
        .then(function(data) {
            const user = data.users.find(user => user.username === username);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        });
}

document.getElementById('login_button').addEventListener('click', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    getUserByUsername(username)
        .then(function(user) {
            if (user.password !== password) {
                throw new Error('Invalid password');
            }
            userLogin(user);
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('load_page').style.display = 'block'; 

        })
        .catch(function(err) {
            console.error(err);
            alert(err.message);
        });
});

// // Check if user is already logged in
// document.addEventListener('DOMContentLoaded', function() {
//     const username = localStorage.getItem('username');
//     if (username) {
//         const userData = JSON.parse(localStorage.getItem('userData'));
//         userLogin(userData);
//         document.getElementById('login-form').style.display = 'none';
//         document.getElementById('load_page').style.display = 'block';
//     }
// });

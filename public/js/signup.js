const signupHandler = async (e) => {
    e.preventDefault();

    const fname = document.querySelector('#fname-input').value.trim();
    const lname = document.querySelector('#lname-input').value.trim();
    const username = document.querySelector('#username-input').value.trim();
    const email = document.querySelector('#email-input').value.trim();
    const password = document.querySelector('#password-input').value.trim();

    if(username && email && password) {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({
                fname: fname,
                lname: lname,
                username: username,
                email: email,
                password: password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/api/user/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document
.querySelector('.signup-form')
.addEventListener('submit', signupHandler);
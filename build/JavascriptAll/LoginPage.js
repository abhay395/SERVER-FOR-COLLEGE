const errorSection = document.querySelector('#errorMessage')
async function login(e) {
    e.preventDefault()
    try {
        errorSection.innerHTML = ''
        const id = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
        })})
        const data = await id.json()
        console.log(data)
        window.location.href = "/Pages/AdminPanel.html";
    } catch (error) {
       errorSection.innerHTML = 'Invalid email or password'
    console.log(error)
    }
}

document.querySelector('#loginButton').addEventListener('click', login)
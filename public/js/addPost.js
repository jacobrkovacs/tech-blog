const addPostFormHandler = async (e) => {
    e.preventDefault();

    const title = document.querySelector('#post-title');
    const content = document.querySelector('#post-content');

    if(title && content) {
        const response = await fetch('/api/post/newPost', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                content: content
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if(response.ok) {
            alert("Post Added Succesfully!")
        }
    }
};

document
.querySelector('.post-form')
.addEventListener('submit', addPostFormHandler);
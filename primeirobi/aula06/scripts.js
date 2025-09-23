function handleClick () {

    const title = document.querySelector(".title");

    console.log(title);
    console.log(title.textContent)

    title.textContent = "Outro valor de título";
    title.parentElement.classList.toggle("dark-mode");

}
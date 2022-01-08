let registerEventListener = () => {
	let infos = document.querySelectorAll(".card > .info > .clickable");

    infos.forEach(element => {
        element.addEventListener("click", (event) => {
            console.log(event.target)

            event.target.nextElementSibling.classList.toggle("hide")
        });
    });
};

export { registerEventListener };

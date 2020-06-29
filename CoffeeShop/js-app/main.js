const url = "https://localhost:5001/api/beanvariety/";

const varietyContainer = document.querySelector("#varietyContainer");

let beanVarieties = [];

const button = document.querySelector("#run-button");
button.addEventListener("click", () => {
    getAllBeanVarieties()
        .then(response => {
            console.log(response);
            beanVarieties = response;
            renderVarieties();
        })
});

function getAllBeanVarieties() {
    return fetch(url).then(resp => resp.json());
}

const renderVarieties = () => {
    varietyContainer.innerHTML = "";
    varietyContainer.innerHTML += beanVarieties.map(variety => {
        return `
                <div class="card m-2" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${variety.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${variety.region}</h6>
                        <p class="card-text">${variety.notes}</p>
                    </div>
                </div>
        `;
    }).join('');
}
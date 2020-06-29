const url = "https://localhost:5001/api/beanvariety/";

const varietyContainer = document.querySelector("#varietyContainer");

let beanVarieties = [];

const button = document.querySelector("#run-button");
const addVarietyButton = document.querySelector("#add-variety-button");

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

addVarietyButton.addEventListener("click", event => {
    renderAddVarietyForm();
});

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

const renderAddVarietyForm = () => {
    varietyContainer.innerHTML = `
                <form class="container-sm m-2">
                    <h2 class="card-title">Add Bean Variety</h2>
                    <div class="form-group">
                        <label for="varietyAdd-name"></label>Name</label>
                        <input type="text" class="form-control" id="varietyAdd-name">
                    </div>
                    <div class="form-group">
                        <label for="varietyAdd-region"></label>Region</label>
                        <input type="text" class="form-control" id="varietyAdd-region">
                    </div>
                    <div class="form-group">
                        <label for="varietyAdd-notes"></label>Notes</label>
                        <textarea class="form-control" id="varietyAdd-notes" rows="3"></textarea>
                    </div>
                    <button id="varietyAdd-submit" type="submit" class="btn btn-primary">Submit</button>
                </form>
        `;
}
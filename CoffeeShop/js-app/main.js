const varietyContainer = document.querySelector("#varietyContainer");

let beanVarieties = [];

const button = document.querySelector("#run-button");
const addVarietyButton = document.querySelector("#add-variety-button");

/******
    Fetch functions
*******/

//get all bean varieties from the db
function getAllBeanVarieties() {
    return fetch("https://localhost:5001/api/beanvariety/")
        .then(resp => resp.json())
        .then(resp => beanVarieties = resp)
}

//add bean variety to the db
const addBeanVariety = (beanVariety) => {
    return fetch("https://localhost:5001/api/beanvariety", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(beanVariety)
    })
        .then(getAllBeanVarieties)
        .then(renderVarieties)
}

/******
    Event Listeners
*******/

//click that triggers the function that renders the bean varieties to the DOM
button.addEventListener("click", () => {
    getAllBeanVarieties()
        .then(response => {
            renderVarieties();
        })
});

//click that triggers the function that loads the add variety form on the DOM
addVarietyButton.addEventListener("click", event => {
    renderAddVarietyForm();
});

//click that runs when the add bean variety form is submitted
varietyContainer.addEventListener("submit", event => {
    event.preventDefault();
    if (event.target.id === "varietyAdd") {

        //get values from the form
        beanName = document.querySelector("#varietyAdd-name").value;
        beanRegion = document.querySelector("#varietyAdd-region").value;
        beanNotes = document.querySelector("#varietyAdd-notes").value;
        if (beanNotes === "") {
            beanNotes = null;
        }

        const newBeanVariety = {
            "name": beanName,
            "region": beanRegion,
            "notes": beanNotes
        }

        addBeanVariety(newBeanVariety);
    }
});

/******
    Functions that render stuff on the DOM
*******/

//renders the bean varieties onto the DOM
const renderVarieties = () => {
    console.log("Rendering...");
    console.log(beanVarieties);
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

//renders the add bean variety form onto the DOM
const renderAddVarietyForm = () => {
    varietyContainer.innerHTML = `
                <form id="varietyAdd" class="container-sm m-2">
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
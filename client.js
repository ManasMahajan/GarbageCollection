const tableBody = document.getElementById("table-body");

let count = 1;
function loadTable() {
    fetch("http://localhost:4545/")
        .then((res) => res.json())
        .then((data) => {
            tableBody.innerHTML = "";
            for (const bin of data) {
                binId = bin._id;
                binName = bin.name;
                binHeight = bin.height;
                binLocation = bin.location;
                binVolume = bin.volume;

                tableBody.innerHTML += `
                <tr>
                    <td>${count}</td>
                    <td>${binName}</td>
                    <td>${binLocation}</td>
                    <td>${binHeight}</td>
                    <td>${binVolume}</td>
                    <td>
                        <button id="btn-remove-bin" onclick="deleteBin()" data-id="${binId}" style="color:#009879"><i class="far fa-minus-square"></i></button>
                        <button id="btn-update-bin" onclick="updateBin()" data-id="${binId}" style="color:#009879"><i class="fas fa-edit"></i></button>
                    </td>
                </tr>
                `;
                count++;
            }
        });
}

loadTable();

function deleteBin() {
    const removeBinButton = document.getElementById("btn-remove-bin");
    const binId = removeBinButton.dataset.id;
    let url = "http://localhost:4545/" + binId;
    fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: null
    })
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data)
            loadTable()
        })
}

function updateBin() {
}



const addBinBtn = document.getElementById("add-bin-btn");
addBinBtn.addEventListener("click", () => {
    const binName = document.getElementById("name").value;
    const binHeight = document.getElementById("height").value;
    const binLocation = document.getElementById("location").value;
    const binVolume = document.getElementById("volume").value;
    const binLatitude = document.getElementById("lat").value;
    const binLongitude = document.getElementById("lng").value;

    const data = {
        name: binName,
        height: binHeight,
        volume: binVolume,
        location: binLocation,
        lat: binLatitude,
        lng: binLongitude,
    };
    console.log(binName);

    fetch("http://localhost:4545/bin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log("success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    loadTable();
});

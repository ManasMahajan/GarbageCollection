const tableBody = document.getElementById("table-body");

let count = 1;
fetch("http://localhost:4545/")
    .then(res => res.json())
    .then(data => {
        for (const bin of data) {
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
            </tr>
            `
            count++;
        }
    })

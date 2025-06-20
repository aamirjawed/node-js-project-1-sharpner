const form = document.getElementById("form");
const output = document.querySelector(".output");

let editMode = false;
let editUserId = null;

getAllUsers();

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const dob = document.getElementById("dob").value;
  const url = document.getElementById("url").value.trim();
  const birth_place = document.getElementById("birth_place").value.trim();
  const description = document.getElementById("description").value.trim();
  const no_of_matches = parseInt(
    document.getElementById("no_of_matches").value.trim()
  );

  try {
    let response = "";

    if(editMode){
        response  = await fetch(`http://localhost:3000/cricket-career/update-details/${editUserId}`, {
            method:'PUT',
            headers:{
                "Content-Type": "application/json",
            },
             body: JSON.stringify({ name, dob, url, birth_place, description, no_of_matches }),
        })
    }else{
    response = await fetch("http://localhost:3000/cricket-career/add-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        dob,
        url,
        birth_place,
        description,
        no_of_matches,
      }),
    });
}

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    form.reset();
    getAllUsers();
  } catch (error) {
    console.log("Error:", error.message);
  }
});

// get all users

async function getAllUsers() {
  try {
    const res = await fetch("http://localhost:3000/cricket-career/get-details");
    const allUsers = await res.json();

    output.innerHTML = "";

    allUsers.forEach((user) => {
      const li = document.createElement("li");
      li.classList.add("output-list");
      li.innerHTML = `
        <div>
            <img src="${user.url}" class="li-img" />
            <h1 class="li-heading">${user.name}</h1>
            <p class="li-dob">${user.dob}</p>
            <p>${user.birth_place}</p>
            <p>${user.no_of_matches}</p>
        </div>
        <div class="li-description">
            <p class="li-description-para">${user.description}</p>
        </div>
         <div>
            <button onclick="editUser(${user.id})" class="li-edit">Edit</button>
         </div>   
            
        `;

      output.appendChild(li);
    });
  } catch (error) {
    console.log(error.message);
  }
}

// update details
async function editUser(id) {
  try {
    const res = await fetch(
      `http://localhost:3000/cricket-career/user-details/${id}`
    );

    if (!res.ok) throw new Error("Failed to find the user");

    const user = await res.json();

    document.getElementById("name").value = user.name;
    // document.getElementById("dob").value = user.dob;
    document.getElementById("url").value = user.url;
    document.getElementById("birth_place").value = user.birth_place;
    document.getElementById("description").value = user.description;
    parseInt(document.getElementById("no_of_matches").value) =  user.no_of_matches;

    editMode = true;
    editUserId = id;
  } catch (error) {
    console.log("Edit error", error.message)
  }
}


async function searchUser() {
  try {
    const searchValue = document.getElementById('search').value.trim(); // fix selector
    const output = document.querySelector('.output');

    output.innerHTML = ""; // clear all previous content

    if (!searchValue) {
      output.innerHTML = "<li>Please enter a name to search.</li>";
      return;
    }

    const res = await fetch(`http://localhost:3000/cricket-career/users?name=${encodeURIComponent(searchValue)}`);
    const data = await res.json();

    if (res.status === 404 || data.length === 0) {
      output.innerHTML = "<li>No cricketer found.</li>";
      return;
    }

    // Render only search results
    data.forEach((user) => {
      const li = document.createElement("li");
      li.classList.add("output-list");
      li.innerHTML = `
        <div>
          <img src="${user.url}" class="li-img" />
          <h1 class="li-heading">${user.name}</h1>
          <p class="li-dob">${user.dob}</p>
          <p>${user.birth_place}</p>
          <p>${user.no_of_matches}</p>
        </div>
        <div class="li-description">
          <p class="li-description-para">${user.description}</p>
        </div>
        <div>
          <button onclick="editUser(${user.id})" class="li-edit">Edit</button>
        </div>   
      `;
      output.appendChild(li);
    });

  } catch (error) {
    console.error("Search failed:", error);
    document.querySelector('.output').innerHTML = "<li>Error occurred during search.</li>";
  }
}



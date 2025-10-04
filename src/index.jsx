const contentDiv = document.getElementById("content");

const pTag = contentDiv.appendChild(document.createElement("p"));

let data;

async function main() {
  /** @type {{near_earth_objects: {[key:string]: any[]}}} */
  data = await fetch("/api/data").then((res) => res.json());

  const allObjects = Object.values(data.near_earth_objects).flat();
  
  const select = document.createElement("select");
  allObjects.forEach(obj => {
    const option = document.createElement("option");
    option.value = obj.name;
    option.textContent = obj.name;
    select.appendChild(option);
  });
  contentDiv.insertBefore(select, pTag);

  const button = document.createElement("button");
  button.textContent = "Submit";
  button.onclick = () => {
    alert(`Selected: ${select.value}`);
  };
  contentDiv.insertBefore(button, pTag);
  
  console.log(allObjects[0]);
  
  // const str = allObjects.reduce((pre, cur) => {
  //   return pre + `Name: ${cur.name}, Max: ${cur.estimated_diameter.feet.estimated_diameter_max}\n`
  // }, "")
  // pTag.innerHTML = str;
}

main();

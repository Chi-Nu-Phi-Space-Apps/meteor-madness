const contentDiv = document.getElementById("content");

const pTag = contentDiv.appendChild(document.createElement("p"));

let data;

async function main() {
  /** @type {{near_earth_objects: {[key:string]: any[]}}} */
  data = await fetch("/api/data").then((res) => res.json());

  const allObjects = Object.values(data.near_earth_objects).flat();
  console.log(allObjects.reduce((pre, cur) => {
    return pre + cur.name + '\n';
  }, ""));

  pTag.innerHTML = JSON.stringify(allObjects);
}

main();

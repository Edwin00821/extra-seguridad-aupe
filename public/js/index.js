// ============================

let imgdatauri, _id;

function readURL(input) {
  const reader = new FileReader(),
    nombre = document.querySelector("#nombre").value;

  let data;
  if (input.files && input.files[0]) {
    reader.onload = async function (e) {
      imgdatauri = e.target.result;
      if (nombre === "") {
        alert("No se ha ingresado un nombre");
        input.value = "";
        return;
      }

      const formdata = new FormData();
      formdata.append(
        "archivo",
        document.querySelector("#fileToUpload").files[0],
        `/${document.querySelector("#fileToUpload").value}`
      );

      data = await fetch("/api/imagenes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          nombre,
        }),
      })
        .then((data) => data.text())
        .then((data) => JSON.parse(data)._id)
        .then(async (id) => {
          _id = id;
          return await fetch(`/api/uploads/${id}`, {
            method: "PUT",
            body: formdata,
            redirect: "follow",
          })
            .then((response) => response.text())
            .then((result) => JSON.parse(result)._id)
            .catch(console.log);
        })
        .catch(console.log);

      document.querySelector("#image1").src = `/api/uploads/${data}`;
    };
  } else {
    alert("No se ha seleccionado ninguna imagen");
  }
  reader.readAsDataURL(input.files[0]);
  return data;
}

function decode() {
  const input = document.querySelector("#pic"),
    key2 = document.querySelector("#key2").value;
  if (key2 === "") {
    alert("No se ha ingresado una clave");
    return;
  }

  let reader = new FileReader();
  if (input.files && input.files[0]) {
    reader.onload = async function (e) {
      const msnBD = await fetch("/api/imgKeys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          claveSecreta: key2,
        }),
      })
        .then((data) => data.text())
        .then((data) => JSON.parse(data))
        .then((data) => data.claveSecreta)
        .catch(console.warn);

      try {
        console.log(msnBD, key2);
        if (msnBD === key2)
          document.querySelector("#decoded").innerText = steg.decode(
            e.target.result
          );
        else
          document.querySelector("#decoded").innerText = "Clave incorrecta 😁";
      } catch (e) {
        console.log("Procesando imagen");
      }
    };
  }
  reader.readAsDataURL(input.files[0]);
}

function hideText() {
  try {
    document.querySelector("#image2").src = steg.encode(
      document.querySelector("#text").value,
      imgdatauri
    );

    if (document.querySelector("#text").value !== "") {
      const mensaje = document.querySelector("#text").value,
        key = document.querySelector("#key").value;

      fetch(`/api/imagenes/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          mensaje: document.querySelector("#text").value,
          claveSecreta: document.querySelector("#key").value,
        }),
      })
        .then((data) => data.text())
        .then((data) => JSON.parse(data))
        .catch(console.warn);
    }
  } catch (e) {
    console.log("Procesando imagen");
  }
}

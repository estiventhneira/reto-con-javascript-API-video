const $form = document.getElementsByClassName("home-input");
const $home = document.getElementById("home");

const $contenedorDeCarruselAccion = document.getElementsByClassName(
  "carrusel-contenedor-accion"
);

const $contenedorDeCarruselDrama = document.getElementsByClassName(
  "carrusel-contenedor-drama"
);

const $contenedorDeCarruselAnimation = document.getElementsByClassName(
  "carrusel-contenedor-animation"
);
const $pruebaImg = document.getElementById("prueba-img");

const BASE_API = "https://yts.mx/api/v2/list_movies.json";
const cantidadDePeliculas = 10;

(async function load() {
  async function getData(gendere) {
    const respuesta = await fetch(
      `${BASE_API}?genre=${gendere}&limit=${cantidadDePeliculas}`
    );
    const data = await respuesta.json();
    if (data.data.movie_count > 0) {
      return data;
    } else {
      throw new Error("Parece que la pelicula no existe");
    }
  }
  const Actionlist = await getData("action");
  console.log(Actionlist);
  const Dramalist = await getData("drama");
  console.log(Dramalist);
  const Animationlist = await getData("animation");
  console.log(Animationlist);

  function renderImageBackgroud(
    listaDePeliculas,
    ContenedorGeneroDelCarrusel,
    Genero
  ) {
    for (const key in listaDePeliculas.data.movies) {
      if (listaDePeliculas.data.movies.hasOwnProperty(key)) {
        function agregarElementoHTML(key) {
          ContenedorGeneroDelCarrusel[0].insertAdjacentHTML(
            "beforeend",
            `<div class="carrusel-item">
            <img class="lugar-de-peliculas-${Genero}[${key}]" alt="" />
            <div class="details">
              <div class="carrusel--img--details">
                <img
                  src="https://img.icons8.com/flat_round/64/000000/plus.png"
                />
                <img
                  src="https://img.icons8.com/flat_round/64/000000/play--v1.png"
                />
              </div>
              <p>Titulo Descriptivo</p>
              <p>2019 +16 114 min</p>
            </div>
          </div>`
          );
        }
        agregarElementoHTML(key);

        function renderizarPorGenero() {
          let modificador = document.getElementsByClassName(
            `lugar-de-peliculas-${Genero}[${key}]`
          );

          modificador[0].setAttribute(
            "src",
            `${listaDePeliculas.data.movies[key].large_cover_image}`
          );
          modificador[0].setAttribute("width", `100%`);
        }
        renderizarPorGenero();
      }
    }
  }
  console.log($contenedorDeCarruselAccion);
  console.log($contenedorDeCarruselDrama);

  renderImageBackgroud(Actionlist, $contenedorDeCarruselAccion, "accion");
  renderImageBackgroud(Dramalist, $contenedorDeCarruselDrama, "drama");
  renderImageBackgroud(
    Animationlist,
    $contenedorDeCarruselAnimation,
    "animation"
  );
})();

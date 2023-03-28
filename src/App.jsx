import { Card, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  // Estado inicial del objeto que contendrá los datos de los pokemones
  const [pokemones, setPokemones] = useState({});

  // Función para obtener los datos de un pokemon específico
  const obtenerPokemon = async (id) => {
    const peticion = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const respuesta = await peticion.json();

    // Se guarda la información del pokemon en un objeto
    const info = {
      nombre: respuesta.name,
      imagen: respuesta.sprites.front_default,
    };

    // Se actualiza el estado de 'pokemones' con el nuevo objeto
    setPokemones((estadoPrevio) => ({ ...estadoPrevio, [id]: info }));
  };

  // Función para obtener una lista de pokemones
  const obtenerListaPokemon = async (numero) => {
    const solicitudes = [];

    // Se llama la función 'obtenerPokemon' para cada ID de pokemon
    for (let i = 1; i < numero; i++) {
      solicitudes.push(obtenerPokemon(i));
    }

    // Se espera a que todas las solicitudes se completen antes de continuar
    await Promise.all(solicitudes);
  };

  // Se utiliza el useEffect para llamar a la función que obtiene la lista de pokemones
  useEffect(() => {
    obtenerListaPokemon(20);
  }, [])

  return (
    <>
      <div className="App">
        <Row>
          {Object.keys(pokemones).map((id) => {
            const { nombre, imagen } = pokemones[id];

            return (
              <Col key={id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={imagen} />
                  <Card.Body>
                    <Card.Title>{nombre}</Card.Title>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
}

export default App;

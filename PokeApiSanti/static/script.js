   const typeColors = {
      normal: "#A8A77A",
      fire: "#EE8130",
      water: "#6390F0",
      electric: "#F7D02C",
      grass: "#7AC74C",
      ice: "#96D9D6",
      fighting: "#C22E28",
      poison: "#A33EA1",
      ground: "#E2BF65",
      flying: "#A98FF3",
      psychic: "#F95587",
      bug: "#A6B91A",
      rock: "#B6A136",
      ghost: "#735797",
      dragon: "#6F35FC",
      dark: "#705746",
      steel: "#B7B7CE",
      fairy: "#D685AD"
    };

    function getTypeColor(type) {
      return typeColors[type] || "#999";
    }

    async function fetchPokemon(identifier) {
      const url = `https://pokeapi.co/api/v2/pokemon/${identifier.toString().toLowerCase()}`;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Pokémon no encontrado, verifique si escribio bien el nombre o escribio una ID que excede el maximo de pokemons actuales (Max 1025)");

        const data = await res.json();
        const card = document.getElementById("pokemonCard");
        card.style.display = "block";

        
        const primaryType = data.types[0].type.name;
        card.style.backgroundColor = getTypeColor(primaryType);

        
        document.getElementById("pokemonImage").src = data.sprites.front_default;
        document.getElementById("pokemonName").textContent = data.name.toUpperCase();

        
        const typeDiv = document.getElementById("pokemonTypes");
        typeDiv.innerHTML = "";
        data.types.forEach(typeInfo => {
          const span = document.createElement("span");
          span.className = "type-tag";
          span.textContent = typeInfo.type.name;
          span.style.backgroundColor = getTypeColor(typeInfo.type.name);
          typeDiv.appendChild(span);
        });

        
        document.getElementById("pokemonHeight").textContent = data.height / 10 + " m";
        document.getElementById("pokemonWeight").textContent = data.weight / 10 + " kg";

        
        const abilitiesUl = document.getElementById("pokemonAbilities");
        abilitiesUl.innerHTML = "";
        data.abilities.forEach(ability => {
          const li = document.createElement("li");
          li.textContent = ability.ability.name;
          abilitiesUl.appendChild(li);
        });

        
        const statsDiv = document.getElementById("pokemonStats");
        statsDiv.innerHTML = "";
        data.stats.forEach(stat => {
          const statWrapper = document.createElement("div");
          statWrapper.className = "stat";
          const label = document.createElement("strong");
          label.textContent = `${stat.stat.name}: ${stat.base_stat}`;
          const bar = document.createElement("div");
          bar.className = "stat-bar";
          const fill = document.createElement("div");
          fill.className = "stat-bar-fill";
          fill.style.width = stat.base_stat + "%";
          bar.appendChild(fill);
          statWrapper.appendChild(label);
          statWrapper.appendChild(bar);
          statsDiv.appendChild(statWrapper);
        });

      } catch (error) {
        alert(error.message);
        console.error(error);
      }
    }

    function getRandomPokemon() {
      const max = 1025;
      const randomId = Math.floor(Math.random() * max) + 1;
      fetchPokemon(randomId);
    }

    function searchPokemon() {
      const input = document.getElementById("searchInput").value.trim();
      if (input) {
        fetchPokemon(input);
      } else {
        alert("Por favor, escribe el nombre de un pokemon o su ID en la pokedex.");
      }
    }
import { RefObject } from "react";

export type PokemonAttributes = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Array<NamedAPIResource>;
  forms: Array<NamedAPIResource>;
  games_indices: Array<VersionGameIndex>;
  held_items: Array<PokemonHeldItem>;
  location_area_encounters: string;
  moves: Array<PokemonMove>;
  sprites: PokemonSprites;
  past_types: Array<PokemonTypePast>;
  species: NamedAPIResource;
  stats: Array<PokemonStat>;
  types: Array<PokemonType>;
};

export type PokemonSprites = {
  front_default: string;
  front_shiny: string;
  front_female: string;
  front_shiny_female: string;
  back_default: string;
  back_shiny: string;
  back_female: string;
  back_shiny_female: string;
};

export type PokemonSpecies = {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_diffrences: boolean;
  forms_switchable: boolean;
  growth_rate: NamedAPIResource;
  pokedex_numbers: PokemonSpeciesDexEntry;
  egg_groups: Array<NamedAPIResource>;
  color: NamedAPIResource;
  shape: NamedAPIResource;
  evolves_from_species: NamedAPIResource;
  evolution_chain: { url: Url };
  habitat: NamedAPIResource;
  generation: NamedAPIResource;
  names: Array<Name>;
  pal_park_encounters: Array<PalParkEncounterArea>;
  flavor_text_entries: Array<FlavorText>;
  genera: Array<Genus>;
  varieties: Array<PokemonSpeciesVariety>;
};

export type EvolutionChain = {
  id: number;
  baby_trigger_item: NamedAPIResource;
  chain: ChainLink;
};

export type ChainLink = {
  is_baby: boolean;
  species: NamedAPIResource;
  evolution_details: Array<EvolutionDetail>;
  evolves_to: Array<ChainLink>;
};

export type EvolutionDetail = {
  item: NamedAPIResource;
  trigger: NamedAPIResource;
  gender: number;
  held_item: NamedAPIResource;
  know_move: NamedAPIResource;
  known_move_type: NamedAPIResource;
  location: NamedAPIResource;
  min_level: number;
  min_hapiness: number;
  min_beauty: number;
  min_affection: number;
  needs_overworld_rain: boolean;
  party_species: NamedAPIResource;
  party_type: NamedAPIResource;
  relative_physical_stats: number;
  time_of_day: string;
  trade_species: NamedAPIResource;
  turn_upside_down: boolean;
};

export type Name = {
  name: string;
  language: NamedAPIResource;
};

export type Url = string;

export type NamedAPIResourceList = {
  count: number;
  next?: Url;
  previous?: Url;
  results: Array<NamedAPIResource>;
};

export type NamedAPIResource = {
  name: string;
  url: Url;
};

export type StateVariable<T> = {
  setPokemonData: T & ((prevState: T) => T);
};

export type PokemonInitialState = {
  pokemons: Array<NamedAPIResource>;
};

export type ModalInitialState = {
  isOpen: boolean;
  pokemon: NamedAPIResource | {};
};

export type ModalProps = {
  htmlRef: RefObject<HTMLElement>;
  navRef: RefObject<HTMLElement>;
};

export type PokemonCardProps = {
  pokemon: NamedAPIResource;
};

export type AddToPokedexProps = {
  isOnPokedex: boolean;
  pokemon: NamedAPIResource;
};

export type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  abilities: NamedAPIResource;
};

export type VersionGameIndex = {
  game_index: number;
  version: NamedAPIResource;
};

export type PokemonHeldItem = {
  item: NamedAPIResource;
  version_details: Array<PokemonHeldItemVersion>;
};

export type PokemonHeldItemVersion = {
  version: NamedAPIResource;
  rarity: number;
};

export type PokemonMove = {
  move: NamedAPIResourceList;
  version_group_details: Array<PokemonMoveVersion>;
};
export type PokemonMoveVersion = {
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
  level_learned_at: number;
};

export type PokemonTypePast = {
  generation: NamedAPIResource;
  types: Array<PokemonType>;
};

export type PokemonType = {
  slot: number;
  type: NamedAPIResource;
};

export type PokemonStat = {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
};

export type PokemonSpeciesDexEntry = {
  entry_number: number;
  pokedex: NamedAPIResource;
};

export type PalParkEncounterArea = {
  base_score: number;
  rate: number;
  area: NamedAPIResource;
};

export type FlavorText = {
  flavor_text: string;
  language: NamedAPIResource;
  version: NamedAPIResource;
};

export type Genus = {
  genus: string;
  language: NamedAPIResource;
};

export type PokemonSpeciesVariety = {
  is_default: boolean;
  pokemon: NamedAPIResource;
};

export type Evolution = {
  name: string;
  id: string;
  img?: string;
};

export type CustomPokemonSpecies = Pick<
  PokemonSpecies,
  "flavor_text_entries" | "base_happiness" | "capture_rate"
>;

export type CustomPokemonAttributes = Partial<PokemonAttributes> & {
  front_default: string;
} & CustomPokemonSpecies;

export type NavBarProps = {
  navRef: RefObject<HTMLElement>;
};

export type ResponseHandler = {
  isLoading: boolean;
  status: number;
  message?: string;
  pokeApi?: NamedAPIResourceList | {};
};

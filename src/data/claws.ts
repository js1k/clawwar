export type ClawEntry = {
  slug: string;
  name: string;
  title: string;
  species: string;
  className: string;
  scoreWeight: string;
  habitat: string;
  style: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  summary: string;
  strengths: string[];
  tags: string[];
  references: { label: string; href: string }[];
};

export const claws: ClawEntry[] = [
  {
    slug: "tiger",
    name: "Tiger Claw",
    title: "Ambush king with retractable hook pressure",
    species: "Panthera tigris",
    className: "Mammal",
    scoreWeight: "Power / grip / stealth",
    habitat: "Forest edges, mangroves, grassland",
    style: "Retractable claws keep a razor edge for grappling and deep tearing during a short-range explosion.",
    image:
      "https://images.unsplash.com/photo-1549480017-d76466a4b7e8?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Tiger paw pushing forward with visible claws",
    excerpt: "Heavy strike profile with strong puncture and hold control.",
    summary:
      "Tiger claws are optimized for ambush violence: sharp, curved, retractable, and backed by explosive forelimb strength. In Clawwar terms, they are the benchmark for hybrid offense.",
    strengths: ["Edge retention", "Takedown control", "Silent carry"],
    tags: ["apex", "retractable", "land"],
    references: [
      { label: "Wikipedia: Tiger", href: "https://en.wikipedia.org/wiki/Tiger" }
    ]
  },
  {
    slug: "harpy-eagle",
    name: "Harpy Eagle Talon",
    title: "Sky-drop execution hardware",
    species: "Harpia harpyja",
    className: "Bird",
    scoreWeight: "Penetration / lift / impact",
    habitat: "Tropical rainforest canopy",
    style: "Oversized talons convert altitude and body mass into a precision spike from above.",
    image:
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Bird of prey gripping with extended talons",
    excerpt: "Extreme puncture force with aerial control advantage.",
    summary:
      "Harpy eagle talons trade slashing sweep for brutal puncture. Their battlefield advantage is verticality: they arrive fast, hit hard, and disengage with prey still locked in.",
    strengths: ["Vertical attack angle", "Grip under load", "Precision puncture"],
    tags: ["aerial", "talon", "apex"],
    references: [
      {
        label: "National Geographic: Harpy Eagle",
        href: "https://www.nationalgeographic.com/animals/birds/facts/harpy-eagle"
      }
    ]
  },
  {
    slug: "brown-bear",
    name: "Brown Bear Claw",
    title: "Excavator-grade force with mauling reach",
    species: "Ursus arctos",
    className: "Mammal",
    scoreWeight: "Power / reach / armor bypass",
    habitat: "Mountain, forest, tundra",
    style: "Long non-retractable claws excel at digging, swiping, and opening space through raw kinetic force.",
    image:
      "https://images.unsplash.com/photo-1588167056840-13f9f4ddaf62?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Brown bear paw with long claws",
    excerpt: "Not the sharpest edge, but the hitbox and mass are elite.",
    summary:
      "Brown bear claws are less about finesse and more about overwhelming strike radius and torque. In direct contests they score through force application rather than surgical edge quality.",
    strengths: ["Reach", "Impact trauma", "Terrain utility"],
    tags: ["heavy", "land", "power"],
    references: [
      {
        label: "Smithsonian's National Zoo: Brown Bear",
        href: "https://nationalzoo.si.edu/animals/brown-bear"
      }
    ]
  },
  {
    slug: "lobster",
    name: "Lobster Claw",
    title: "Crushing specialist with asymmetrical loadout",
    species: "Homarus americanus",
    className: "Crustacean",
    scoreWeight: "Crush / defense / clamp",
    habitat: "Cold Atlantic seafloor",
    style: "One crusher and one cutter let the lobster play both tank and control roles in close quarters.",
    image:
      "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Lobster showing its large claws",
    excerpt: "A different branch of claw evolution built for mechanical domination.",
    summary:
      "Lobster claws are not true claws in the mammalian sense, but no Clawwar ranking is complete without them. They bring a distinct combat logic: pin, crush, and outlast.",
    strengths: ["Crushing power", "Defensive shell pairing", "Weapon specialization"],
    tags: ["aquatic", "crusher", "tank"],
    references: [
      {
        label: "NOAA Fisheries: American Lobster",
        href: "https://www.fisheries.noaa.gov/species/american-lobster"
      }
    ]
  },
  {
    slug: "sloth",
    name: "Sloth Claw",
    title: "Hook geometry optimized for permanent hang control",
    species: "Folivora",
    className: "Mammal",
    scoreWeight: "Grip / endurance / leverage",
    habitat: "Tropical forest canopy",
    style: "Massive curved hooks are tuned for suspension and branch lock, creating unusual control advantages despite low speed.",
    image:
      "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sloth hanging with long curved claws",
    excerpt: "Low tempo, high hook efficiency.",
    summary:
      "Sloth claws look almost exaggerated, but their curve is a serious functional design. In Clawwar they represent control mechanics over burst damage.",
    strengths: ["Hook depth", "Endurance hold", "Climb dominance"],
    tags: ["hook", "arboreal", "control"],
    references: [
      { label: "Britannica: Sloth", href: "https://www.britannica.com/animal/sloth" }
    ]
  },
  {
    slug: "velociraptor",
    name: "Velociraptor Sickle Claw",
    title: "Fossil meta pick with terror silhouette",
    species: "Velociraptor mongoliensis",
    className: "Dinosaur",
    scoreWeight: "Myth / form / predatory intent",
    habitat: "Late Cretaceous dune systems",
    style: "The enlarged second-toe sickle claw remains one of the most iconic offensive shapes in evolutionary weapon design.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/9d/Velociraptor_mongoliensis_%28white_background%29.jpg",
    imageAlt: "Velociraptor skeleton showing the sickle claw",
    excerpt: "Prehistoric prestige pick that dominates visual rankings.",
    summary:
      "Velociraptor is here as a fossil bracket entry. Exact combat use remains debated, but the claw's silhouette alone makes it essential to any all-time claw archive.",
    strengths: ["Iconic morphology", "Reach extension", "Historical interest"],
    tags: ["fossil", "sickle", "legend"],
    references: [
      {
        label: "American Museum of Natural History: Velociraptor",
        href: "https://www.amnh.org/explore/ology/paleontology/velociraptor"
      }
    ]
  }
];

export const clawsBySlug = Object.fromEntries(claws.map((claw) => [claw.slug, claw]));

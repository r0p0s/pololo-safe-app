export const MOCK_POLOLOS = [
  {
    id: "1",
    title: "Gasfiter para reparar fuga en lavaplatos",
    category: "Maestro / Reparaciones",
    categoryIcon: "Wrench",
    comuna: "Providencia",
    lat: -33.4262,
    lng: -70.6128,
    payment: 35000,
    urgency: "Hoy urgente",
    description: "Tengo una filtración debajo del lavaplatos en el departamento. Se requiere cambio de sifón o sellado.",
    author: {
      name: "Camila Silva",
      rating: 4.9,
      reviewsCount: 14,
      verifiedRUT: true,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    },
    createdAt: "Hace 15 min",
    status: "open"
  },
  {
    id: "2",
    title: "Apoyo con traslado de 5 cajas y sillón chico",
    category: "Transporte & Fletes",
    categoryIcon: "Truck",
    comuna: "Ñuñoa",
    lat: -33.4569,
    lng: -70.5979,
    payment: 25000,
    urgency: "Este fin de semana",
    description: "Necesito alguien con camioneta o flete pequeño para mover 5 cajas y un sillón de 2 cuerpos desde Ñuñoa a Macul.",
    author: {
      name: "Rodrigo Morales",
      rating: 4.8,
      reviewsCount: 9,
      verifiedRUT: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    createdAt: "Hace 1 hora",
    status: "open"
  },
  {
    id: "3",
    title: "Corte de césped y limpieza de jardín",
    category: "Jardinería & Aseo",
    categoryIcon: "Trees",
    comuna: "Las Condes",
    lat: -33.4114,
    lng: -70.5658,
    payment: 30000,
    urgency: "Mañana en la mañana",
    description: "Jardín pequeño (aprox 40m2). Cortar pasto y orillar. Tengo cortadora eléctrica en la casa.",
    author: {
      name: "Marcela Tapia",
      rating: 5.0,
      reviewsCount: 22,
      verifiedRUT: true,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    },
    createdAt: "Hace 2 horas",
    status: "open"
  },
  {
    id: "4",
    title: "Paseo de perro Golden (1 hora al día)",
    category: "Mascotas",
    categoryIcon: "Dog",
    comuna: "Santiago Centro",
    lat: -33.4442,
    lng: -70.6558,
    payment: 12000,
    urgency: "Recurrente",
    description: "Busco paseador responsable para 'Milo'. Es muy dócil. Paseo alrededor del Parque Forestal.",
    author: {
      name: "Ignacio Vera",
      rating: 4.7,
      reviewsCount: 6,
      verifiedRUT: true,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    },
    createdAt: "Hace 3 horas",
    status: "open"
  }
];

export const CATEGORIES = [
  { name: "Todos", icon: "Grid" },
  { name: "Maestro / Reparaciones", icon: "Wrench" },
  { name: "Transporte & Fletes", icon: "Truck" },
  { name: "Jardinería & Aseo", icon: "Trees" },
  { name: "Mascotas", icon: "Dog" },
  { name: "Clases & Apoyo", icon: "BookOpen" }
];

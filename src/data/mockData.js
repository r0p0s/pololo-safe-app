export const CATEGORIES = [
  "Todos",
  "Maestro/Reparaciones",
  "Transporte & Fletes",
  "Jardinería & Aseo",
  "Mascotas",
  "Clases & Apoyo",
  "Tecnología",
  "Limpieza"
];

export const MOCK_POLOLOS = [
  {
    id: "p1",
    title: "Reparar filtración en lavaplatos",
    category: "Maestro/Reparaciones",
    categoryIcon: "Wrench",
    comuna: "Providencia",
    lat: -33.429,
    lng: -70.612,
    payment: 25000,
    urgency: "high",
    description: "Necesito un gásfiter urgente. El lavaplatos tiene una fuga importante por debajo y no para de gotear. Idealmente hoy.",
    author: {
      name: "Camila R.",
      rating: 4.8,
      reviewsCount: 12,
      verifiedPhone: true,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    createdAt: "2026-09-23T10:00:00Z",
    status: "open"
  },
  {
    id: "p2",
    title: "Flete de sofá y cama 2 plazas",
    category: "Transporte & Fletes",
    categoryIcon: "Truck",
    comuna: "Ñuñoa",
    lat: -33.454,
    lng: -70.597,
    payment: 35000,
    urgency: "medium",
    description: "Me cambio a 5 cuadras y necesito trasladar un sofá y una cama de 2 plazas. Necesito a alguien con camioneta o furgón y que ayude a cargar.",
    author: {
      name: "Diego M.",
      rating: 5.0,
      reviewsCount: 4,
      verifiedPhone: true,
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80"
    },
    createdAt: "2026-09-22T14:30:00Z",
    status: "open"
  },
  {
    id: "p3",
    title: "Pasear dos perros grandes",
    category: "Mascotas",
    categoryIcon: "Dog",
    comuna: "Las Condes",
    lat: -33.411,
    lng: -70.573,
    payment: 12000,
    urgency: "low",
    description: "Busco paseador para 2 Golden Retrievers, 1 hora de paseo. Son tranquilos pero con mucha fuerza.",
    author: {
      name: "Valentina V.",
      rating: 4.9,
      reviewsCount: 25,
      verifiedPhone: true,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
    },
    createdAt: "2026-09-23T08:15:00Z",
    status: "open"
  },
  {
    id: "p4",
    title: "Armar mueble IKEA grande",
    category: "Maestro/Reparaciones",
    categoryIcon: "Hammer",
    comuna: "Santiago Centro",
    lat: -33.437,
    lng: -70.650,
    payment: 20000,
    urgency: "medium",
    description: "Necesito ayuda para armar un clóset PAX de IKEA. Tengo todas las herramientas, solo necesito manos extra y alguien que entienda las instrucciones.",
    author: {
      name: "Juan P.",
      rating: 4.5,
      reviewsCount: 8,
      verifiedPhone: false,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    createdAt: "2026-09-21T18:45:00Z",
    status: "in_progress"
  },
  {
    id: "p5",
    title: "Limpieza profunda de departamento",
    category: "Limpieza",
    categoryIcon: "SprayCan",
    comuna: "Macul",
    lat: -33.488,
    lng: -70.601,
    payment: 40000,
    urgency: "medium",
    description: "Depto 2 dorm, 2 baños. Necesito limpieza profunda para entregar el departamento. Incluye limpiar vidrios y horno.",
    author: {
      name: "Carolina S.",
      rating: 4.7,
      reviewsCount: 31,
      verifiedPhone: true,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    createdAt: "2026-09-23T09:20:00Z",
    status: "open"
  },
  {
    id: "p6",
    title: "Formatear y limpiar notebook",
    category: "Tecnología",
    categoryIcon: "Laptop",
    comuna: "La Reina",
    lat: -33.441,
    lng: -70.540,
    payment: 15000,
    urgency: "high",
    description: "Mi notebook anda muy lento. Necesito respaldar un par de carpetas y luego instalar Windows desde cero con Office.",
    author: {
      name: "Andrés B.",
      rating: 5.0,
      reviewsCount: 2,
      verifiedPhone: true,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    createdAt: "2026-09-23T11:05:00Z",
    status: "open"
  },
  {
    id: "p7",
    title: "Cortar pasto y limpiar jardín",
    category: "Jardinería & Aseo",
    categoryIcon: "Flower2",
    comuna: "Vitacura",
    lat: -33.393,
    lng: -70.584,
    payment: 30000,
    urgency: "low",
    description: "Jardín de 50m2. Hay que cortar el pasto, orillar y sacar malezas. Yo pongo las bolsas de basura, necesito que traigan cortapasto.",
    author: {
      name: "María José T.",
      rating: 4.6,
      reviewsCount: 15,
      verifiedPhone: true,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    },
    createdAt: "2026-09-20T16:20:00Z",
    status: "completed"
  },
  {
    id: "p8",
    title: "Clases de matemáticas 8vo básico",
    category: "Clases & Apoyo",
    categoryIcon: "GraduationCap",
    comuna: "Maipú",
    lat: -33.510,
    lng: -70.758,
    payment: 15000,
    urgency: "medium",
    description: "Busco profe para preparar prueba parcial de álgebra para mi hijo. Serían 2 horas en mi domicilio.",
    author: {
      name: "Rodrigo C.",
      rating: 0,
      reviewsCount: 0,
      verifiedPhone: false,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"
    },
    createdAt: "2026-09-22T09:10:00Z",
    status: "open"
  }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: "n1",
    type: "new_applicant",
    title: "¡Alguien quiere hacer tu pololo!",
    body: "Diego M. se ha postulado para 'Flete de sofá y cama'.",
    time: "Hace 10 minutos",
    read: false,
    pololoId: "p2"
  },
  {
    id: "n2",
    type: "message",
    title: "Nuevo mensaje",
    body: "Camila R.: 'Hola, ¿a qué hora te acomoda que pase?'",
    time: "Hace 1 hora",
    read: false,
    pololoId: "p1"
  },
  {
    id: "n3",
    type: "deal_accepted",
    title: "¡Oferta aceptada!",
    body: "Juan P. aceptó tu oferta para 'Armar mueble IKEA'.",
    time: "Ayer",
    read: true,
    pololoId: "p4"
  },
  {
    id: "n4",
    type: "new_nearby",
    title: "Nuevo pololo cerca tuyo",
    body: "Se necesita 'Pasear dos perros grandes' a 2km de tu ubicación.",
    time: "Ayer",
    read: true,
    pololoId: "p3"
  },
  {
    id: "n5",
    type: "rate_request",
    title: "Pololo completado",
    body: "Por favor califica a María José T. por 'Cortar pasto y limpiar jardín'.",
    time: "Hace 2 días",
    read: true,
    pololoId: "p7"
  }
];

export const MOCK_DEALS = [
  {
    id: "d1",
    pololoTitle: "Armar mueble IKEA grande",
    status: "in_progress",
    otherUser: {
      name: "Juan P.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      verifiedPhone: false
    },
    agreedPrice: 20000,
    lastMessage: "Ya voy en camino, llego en 15 minutos.",
    updatedAt: "2026-09-23T11:45:00Z"
  },
  {
    id: "d2",
    pololoTitle: "Cortar pasto y limpiar jardín",
    status: "completed",
    otherUser: {
      name: "María José T.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      verifiedPhone: true
    },
    agreedPrice: 30000,
    lastMessage: "Muchas gracias, quedó súper bien el jardín.",
    updatedAt: "2026-09-21T18:30:00Z"
  },
  {
    id: "d3",
    pololoTitle: "Flete de sofá y cama 2 plazas",
    status: "pending",
    otherUser: {
      name: "Diego M.",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80",
      verifiedPhone: true
    },
    agreedPrice: 35000,
    lastMessage: "¿A qué hora te acomoda más el sábado?",
    updatedAt: "2026-09-23T12:10:00Z"
  },
  {
    id: "d4",
    pololoTitle: "Reparar filtración en lavaplatos",
    status: "accepted",
    otherUser: {
      name: "Camila R.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      verifiedPhone: true
    },
    agreedPrice: 25000,
    lastMessage: "Perfecto, te espero tipo 17:00.",
    updatedAt: "2026-09-23T10:30:00Z"
  }
];

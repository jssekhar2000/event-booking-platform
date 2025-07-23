const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categoryImages = {
  Music: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
  Tech: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
  Food: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
  Business: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800",
  Sports: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
  default: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop&auto=format",
};

const sampleEvents = [
  {
    title: "Tech Conference 2025",
    shortDescription: "Annual technology summit",
    longDescription: "Explore AI, Web3, and emerging tech trends with industry leaders from across the globe.",
    category: "Tech",
    location: "San Francisco",
    price: 199,
  },
  {
    title: "Jazz in the Park",
    shortDescription: "Live music under the stars",
    longDescription: "An unforgettable evening of jazz performances from renowned artists at the city’s central park.",
    category: "Music",
    location: "New York",
    price: 49,
  },
  {
    title: "Startup Pitch Day",
    shortDescription: "Showcase your startup idea",
    longDescription: "Entrepreneurs pitch to investors and VCs in a live event packed with innovation and opportunity.",
    category: "Business",
    location: "Chicago",
    price: 99,
  },
  {
    title: "Street Food Fiesta",
    shortDescription: "Foodie heaven on wheels",
    longDescription: "Taste delicacies from top food trucks and chefs at this bustling outdoor food carnival.",
    category: "Food",
    location: "Los Angeles",
    price: 29,
  },
  {
    title: "AI & Robotics Expo",
    shortDescription: "Future of automation",
    longDescription: "Tech enthusiasts gather to explore the latest advancements in AI, robotics, and automation tools.",
    category: "Tech",
    location: "Austin",
    price: 149,
  },
  {
    title: "City Marathon 2025",
    shortDescription: "Run for a cause",
    longDescription: "Join runners across all levels to compete in the annual marathon and raise awareness for health.",
    category: "Sports",
    location: "Miami",
    price: 20,
  },
  {
    title: "Digital Marketing Bootcamp",
    shortDescription: "Master modern marketing",
    longDescription: "A 2-day deep dive into SEO, content marketing, social media, and paid campaigns by experts.",
    category: "Business",
    location: "San Francisco",
    price: 129,
  },
  {
    title: "Rock & Roll Nights",
    shortDescription: "Live band and drinks",
    longDescription: "Kick back with high-energy rock bands and local brews in a night filled with fun and rhythm.",
    category: "Music",
    location: "Austin",
    price: 59,
  },
  {
    title: "Sustainable Living Workshop",
    shortDescription: "Eco-conscious lifestyle",
    longDescription: "Learn how to adopt sustainable habits, reduce waste, and live green with daily practices.",
    category: "Food",
    location: "Chicago",
    price: 25,
  },
  {
    title: "Champions League Viewing Party",
    shortDescription: "Football fans unite",
    longDescription: "Watch the biggest football match of the year on a giant screen with snacks and fanfare.",
    category: "Sports",
    location: "New York",
    price: 35,
  },
];

const newData = [
    {
      "vendorId": 1,
      "title": "Summer Music Festival 2025",
      "shortDescription": "Live music under the stars",
      "longDescription": "Join us for an unforgettable night of music featuring top artists from around the world.\nThis spectacular event brings together the biggest names in music for a weekend of incredible performances,\namazing food, and unforgettable memories. Experience multiple stages, diverse music genres, and connect with fellow music lovers from around the globe.\n\nWhat to expect:\n• 3 days of non-stop music and entertainment\n• Food trucks featuring local and international cuisine\n• Art installations and interactive experiences\n• VIP areas with exclusive access and amenities\n• Camping options available on-site\n• Sustainability initiatives and eco-friendly practices\n\nThis festival is more than just music – it's a celebration of culture, community, and creativity.\nWhether you're a seasoned festival-goer or a first-timer, the Summer Music Festival promises an experience you'll never forget.",
      "date": "2025-08-15T19:00:00Z",
      "location": "Central Park Great Lawn, New York, NY",
      "mapUrl": "https://maps.google.com/?q=Central+Park+Great+Lawn,+New+York,+NY",
      "category": "Music",
      "totalTickets": 5000,
      "availableTickets": 3750,
      "price": 75,
      "originalPrice": 95,
      "imageUrl": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
      "amenities": [
        "Food & Drinks",
        "Parking",
        "Restrooms",
        "Security",
        "First Aid"
      ],
      "tags": [
        "Music",
        "Festival",
        "Outdoor",
        "Multiple Stages"
      ],
      "restrictions": {
        "age": "18+",
        "dressCode": "Casual outdoor attire recommended",
        "capacity": "5000 attendees"
      },
      "rating": 4.9,
      "reviewsCount": 324,
      "isFeatured": true,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Winter Jazz Nights",
      "shortDescription": "Cozy evenings with soulful jazz performances",
      "longDescription": "Escape the winter chill and immerse yourself in the warm melodies of jazz. Our 'Winter Jazz Nights' series features local and international jazz artists in an intimate setting. Enjoy exquisite music, delicious food, and a selection of fine wines and spirits.\n\nWhat to expect:\n• Live jazz performances every night\n• A rotating lineup of talented musicians\n• Gourmet food and drink menu available\n• Comfortable and cozy indoor venue\n• Perfect for a romantic evening or a sophisticated night out\n• Special guest appearances on select nights\n\nIndulge in an evening of smooth tunes and elegant ambiance.",
      "date": "2025-12-05T20:00:00Z",
      "location": "The Blue Note, New York, NY",
      "mapUrl": "http://googleusercontent.com/maps.google.com/1",
      "category": "Music",
      "totalTickets": 200,
      "availableTickets": 150,
      "price": 60,
      "originalPrice": 75,
      "imageUrl": "https://images.unsplash.com/photo-1514525253164-81e5170d1927?w=800",
      "amenities": [
        "Food & Drinks",
        "Restrooms",
        "Coat Check",
        "Table Service"
      ],
      "tags": [
        "Jazz",
        "Music",
        "Indoor",
        "Live Music",
        "Nightlife"
      ],
      "restrictions": {
        "age": "21+",
        "dressCode": "Smart casual",
        "capacity": "200 attendees"
      },
      "rating": 4.8,
      "reviewsCount": 180,
      "isFeatured": true,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Spring Garden Tour & Tea Party",
      "shortDescription": "Explore beautiful gardens and enjoy an elegant tea",
      "longDescription": "Welcome spring with our enchanting Garden Tour & Tea Party. Wander through exquisite private gardens bursting with seasonal blooms, followed by a delightful afternoon tea with delicate pastries and sandwiches. A perfect day for nature lovers and those seeking a serene escape.\n\nWhat to expect:\n• Guided tours of several stunning local gardens\n• Expert insights on horticulture and garden design\n• Traditional afternoon tea served in a charming setting\n• Photo opportunities amidst beautiful floral displays\n• Small group sizes for an intimate experience\n• Opportunity to purchase unique plants and garden accessories\n\nImmerse yourself in the beauty of spring and the charm of a classic tea party.",
      "date": "2026-04-20T11:00:00Z",
      "location": "Botanical Gardens & Private Estates, London, UK",
      "mapUrl": "http://googleusercontent.com/maps.google.com/2",
      "category": "Nature & Outdoors",
      "totalTickets": 100,
      "availableTickets": 75,
      "price": 50,
      "originalPrice": 65,
      "imageUrl": "https://images.unsplash.com/photo-1520627702581-22444341998f?w=800",
      "amenities": [
        "Restrooms",
        "Tea Service",
        "Parking",
        "Guided Tour"
      ],
      "tags": [
        "Garden",
        "Nature",
        "Outdoor",
        "Tea Party",
        "Spring"
      ],
      "restrictions": {
        "age": "12+",
        "dressCode": "Smart casual, comfortable walking shoes",
        "capacity": "100 attendees"
      },
      "rating": 4.7,
      "reviewsCount": 95,
      "isFeatured": false,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Tech Innovators Summit 2025",
      "shortDescription": "Pioneering the future of technology",
      "longDescription": "The 'Tech Innovators Summit' is the premier event for visionary leaders, groundbreaking startups, and established tech giants. Explore the latest trends in AI, blockchain, cybersecurity, and sustainable tech. Engage with thought leaders and discover the innovations shaping tomorrow.\n\nWhat to expect:\n• Keynote presentations from industry pioneers\n• Interactive panel discussions and Q&A sessions\n• Startup pitch competition and investor networking\n• Exhibition floor showcasing cutting-edge technologies\n• Workshops on emerging tech skills\n• Exclusive networking receptions\n\nJoin us to connect, learn, and be inspired by the future of technology.",
      "date": "2025-11-10T09:00:00Z",
      "location": "San Jose Convention Center, San Jose, CA",
      "mapUrl": "http://googleusercontent.com/maps.google.com/3",
      "category": "Technology",
      "totalTickets": 3000,
      "availableTickets": 2100,
      "price": 350,
      "originalPrice": 420,
      "imageUrl": "https://images.unsplash.com/photo-1518770660431-417d729db523?w=800",
      "amenities": [
        "Wi-Fi",
        "Catering",
        "Exhibition Hall",
        "Business Lounges"
      ],
      "tags": [
        "Technology",
        "Summit",
        "Innovation",
        "AI",
        "Cybersecurity"
      ],
      "restrictions": {
        "age": "18+",
        "dressCode": "Business professional/casual",
        "capacity": "3000 attendees"
      },
      "rating": 4.9,
      "reviewsCount": 250,
      "isFeatured": true,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Children's Storytelling Festival",
      "shortDescription": "Magical tales for young imaginations",
      "longDescription": "Ignite your child's imagination at our 'Children's Storytelling Festival'! Featuring celebrated authors, puppeteers, and interactive performers, this event brings beloved stories to life. With craft stations, character meet-and-greets, and enchanting performances, it's a day of pure wonder.\n\nWhat to expect:\n• Live storytelling sessions by professional narrators\n• Puppet shows and theatrical performances\n• Creative writing and drawing workshops for kids\n• Meet and greet with popular book characters\n• Face painting and balloon artists\n• Dedicated play zones and snack stations\n\nA perfect opportunity for children to fall in love with reading and the magic of stories.",
      "date": "2025-09-07T10:00:00Z",
      "location": "City Library Park, Boston, MA",
      "mapUrl": "http://googleusercontent.com/maps.google.com/4",
      "category": "Family & Kids",
      "totalTickets": 1500,
      "availableTickets": 1100,
      "price": 10,
      "originalPrice": 12,
      "imageUrl": "https://images.unsplash.com/photo-1542841499-199a6d0c4078?w=800",
      "amenities": [
        "Restrooms",
        "Food & Drinks",
        "Stroller Friendly",
        "First Aid"
      ],
      "tags": [
        "Kids",
        "Storytelling",
        "Family",
        "Education",
        "Children's Event"
      ],
      "restrictions": {
        "age": "3-10 years",
        "dressCode": "Casual",
        "capacity": "1500 attendees"
      },
      "rating": 4.8,
      "reviewsCount": 210,
      "isFeatured": true,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Global Food Fair 2025",
      "shortDescription": "A culinary journey around the world",
      "longDescription": "Embark on a gastronomic adventure at the 'Global Food Fair'! Sample authentic dishes from every continent, discover new flavors, and celebrate diverse culinary traditions. With cooking demonstrations, food trucks, and live cultural performances, it's a feast for the senses.\n\nWhat to expect:\n• Over 50 international food vendors\n• Live cooking demonstrations by celebrity chefs\n• Cultural music and dance performances\n• Artisan food market with gourmet products\n• Wine, beer, and non-alcoholic beverage pairings\n• Family-friendly activities and seating areas\n\nSatisfy your cravings and explore the world one bite at a time!",
      "date": "2025-09-20T11:00:00Z",
      "location": "Exhibition Grounds, Toronto, Canada",
      "mapUrl": "http://googleusercontent.com/maps.google.com/5",
      "category": "Food & Drink",
      "totalTickets": 8000,
      "availableTickets": 6200,
      "price": 20,
      "originalPrice": 25,
      "imageUrl": "https://images.unsplash.com/photo-1542838686-2a7e782970b5?w=800",
      "amenities": [
        "Food & Drinks",
        "Restrooms",
        "Parking",
        "Live Entertainment"
      ],
      "tags": [
        "Food",
        "International Cuisine",
        "Festival",
        "Cultural",
        "Cooking"
      ],
      "restrictions": {
        "age": "All Ages",
        "dressCode": "Casual",
        "capacity": "8000 attendees"
      },
      "rating": 4.9,
      "reviewsCount": 550,
      "isFeatured": true,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Mindfulness & Meditation Workshop",
      "shortDescription": "Find calm and focus in a chaotic world",
      "longDescription": "Discover the power of mindfulness and meditation in this transformative workshop. Learn practical techniques to reduce stress, improve focus, and cultivate inner peace. Suitable for beginners and experienced practitioners alike.\n\nWhat to expect:\n• Guided meditation sessions\n• Introduction to various mindfulness techniques\n• Breathing exercises for stress reduction\n• Discussions on incorporating mindfulness into daily life\n• Gentle stretching and relaxation exercises\n• Comfortable and serene environment\n\nInvest in your well-being and unlock a greater sense of calm and clarity.",
      "date": "2025-10-05T10:00:00Z",
      "location": "The Serenity Studio, San Francisco, CA",
      "mapUrl": "http://googleusercontent.com/maps.google.com/6",
      "category": "Health & Wellness",
      "totalTickets": 30,
      "availableTickets": 18,
      "price": 80,
      "originalPrice": 100,
      "imageUrl": "https://images.unsplash.com/photo-1544365737-0133c94f57c8?w=800",
      "amenities": [
        "Yoga Mats & Cushions",
        "Tea/Water",
        "Restrooms"
      ],
      "tags": [
        "Mindfulness",
        "Meditation",
        "Wellness",
        "Workshop",
        "Stress Relief"
      ],
      "restrictions": {
        "age": "16+",
        "dressCode": "Comfortable clothing",
        "capacity": "30 attendees"
      },
      "rating": 4.9,
      "reviewsCount": 70,
      "isFeatured": false,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "International Film Festival 2025",
      "shortDescription": "Celebrating global cinema excellence",
      "longDescription": "Experience the best of international cinema at our annual Film Festival. Featuring a diverse selection of independent films, documentaries, and foreign language masterpieces, along with Q&A sessions with filmmakers and industry events.\n\nWhat to expect:\n• Screenings of award-winning and critically acclaimed films\n• Red carpet events and gala premieres\n• Q&A sessions with directors, actors, and producers\n• Industry panels and networking opportunities\n• Short film showcases and emerging talent spotlights\n• Exclusive access to virtual screenings (select passes)\n\nA must-attend event for cinephiles and film industry professionals.",
      "date": "2025-10-15T18:00:00Z",
      "location": "Various Cinemas, Los Angeles, CA",
      "mapUrl": "http://googleusercontent.com/maps.google.com/7",
      "category": "Film & Cinema",
      "totalTickets": 4000,
      "availableTickets": 2800,
      "price": 120,
      "originalPrice": 150,
      "imageUrl": "https://images.unsplash.com/photo-1489599849927-2ee91-534125?w=800",
      "amenities": [
        "Cinema Access",
        "Restrooms",
        "Food & Drinks (available for purchase)",
        "Wi-Fi"
      ],
      "tags": [
        "Film",
        "Cinema",
        "Festival",
        "Independent Film",
        "Red Carpet"
      ],
      "restrictions": {
        "age": "18+ (some screenings 21+)",
        "dressCode": "Casual to formal depending on event",
        "capacity": "4000 attendees"
      },
      "rating": 4.8,
      "reviewsCount": 300,
      "isFeatured": true,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Urban Cycling Race & Expo",
      "shortDescription": "Speed, skill, and cycling innovation in the city",
      "longDescription": "Feel the adrenaline at the 'Urban Cycling Race & Expo'! Witness thrilling bicycle races across city circuits, explore the latest in cycling gear and technology, and participate in community rides. A celebration of cycling culture for enthusiasts and families.\n\nWhat to expect:\n• Professional and amateur cycling races\n• Expo featuring bike brands, accessories, and apparel\n• Bike maintenance workshops and clinics\n• Family-friendly fun rides and obstacle courses\n• Food trucks and entertainment\n• Opportunities to meet pro cyclists\n\nWhether you're a rider or a spectator, this event is a dynamic showcase of urban cycling.",
      "date": "2026-05-18T08:00:00Z",
      "location": "Downtown Core, Chicago, IL",
      "mapUrl": "http://googleusercontent.com/maps.google.com/8",
      "category": "Sports & Recreation",
      "totalTickets": 7000,
      "availableTickets": 5500,
      "price": 15,
      "originalPrice": 20,
      "imageUrl": "https://images.unsplash.com/photo-1541625946112-ee9614c5c453?w=800",
      "amenities": [
        "Restrooms",
        "Food & Drinks",
        "Bike Parking",
        "First Aid"
      ],
      "tags": [
        "Cycling",
        "Race",
        "Bike",
        "Outdoor",
        "Sports"
      ],
      "restrictions": {
        "age": "All Ages (race participation 16+)",
        "dressCode": "Casual activewear",
        "capacity": "7000 attendees"
      },
      "rating": 4.7,
      "reviewsCount": 350,
      "isFeatured": false,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Local Artisan Craft Market",
      "shortDescription": "Discover unique handmade treasures",
      "longDescription": "Support local talent at our 'Artisan Craft Market'! Browse an exquisite collection of handmade goods, including jewelry, ceramics, textiles, art, and more. Meet the makers, find unique gifts, and enjoy a vibrant community atmosphere with live music and food vendors.\n\nWhat to expect:\n• Over 100 local artisans and crafters\n• Wide variety of handmade products for sale\n• Live acoustic music performances\n• Food trucks and coffee vendors\n• Interactive craft demonstrations\n• Family-friendly environment with kids' activities\n\nFind something special and celebrate the creativity of our community.",
      "date": "2025-11-23T10:00:00Z",
      "location": "Community Square, Austin, TX",
      "mapUrl": "http://googleusercontent.com/maps.google.com/9",
      "category": "Arts & Crafts",
      "totalTickets": 5000,
      "availableTickets": 4200,
      "price": 0,
      "originalPrice": 0,
      "imageUrl": "https://images.unsplash.com/photo-1579783902671-9c16da947ed0?w=800",
      "amenities": [
        "Restrooms",
        "Food & Drinks",
        "Parking",
        "Pet-Friendly"
      ],
      "tags": [
        "Crafts",
        "Artisan",
        "Market",
        "Handmade",
        "Community"
      ],
      "restrictions": {
        "age": "All Ages",
        "dressCode": "Casual",
        "capacity": "5000 attendees"
      },
      "rating": 4.6,
      "reviewsCount": 190,
      "isFeatured": false,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Historical Reenactment: Medieval Fair",
      "shortDescription": "Step back in time to the Middle Ages",
      "longDescription": "Journey to a bygone era at our 'Medieval Fair'! Witness thrilling knightly tournaments, explore a bustling medieval village, interact with historical characters, and enjoy authentic food and entertainment from the Middle Ages.\n\nWhat to expect:\n• Live jousting and sword fighting demonstrations\n• Medieval village with artisans and craftspeople\n• Historical reenactments and character interactions\n• Traditional food and beverages of the era\n• Archery range and other period games\n• Period music and dance performances\n\nAn immersive historical experience for the whole family!",
      "date": "2026-06-01T10:00:00Z",
      "location": "Castle Grounds, Warwick, UK",
      "mapUrl": "http://googleusercontent.com/maps.google.com/10",
      "category": "Historical & Cultural",
      "totalTickets": 3500,
      "availableTickets": 2800,
      "price": 25,
      "originalPrice": 30,
      "imageUrl": "https://images.unsplash.com/photo-1555541786-90e8a71d8719?w=800",
      "amenities": [
        "Food & Drinks",
        "Restrooms",
        "Parking",
        "Family-Friendly"
      ],
      "tags": [
        "Medieval",
        "Reenactment",
        "History",
        "Fair",
        "Family"
      ],
      "restrictions": {
        "age": "All Ages",
        "dressCode": "Costumes welcome!",
        "capacity": "3500 attendees"
      },
      "rating": 4.8,
      "reviewsCount": 270,
      "isFeatured": true,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Stand-Up Comedy Showcase",
      "shortDescription": "A night of laughs with top comedic talent",
      "longDescription": "Get ready for an evening of side-splitting laughter at our 'Stand-Up Comedy Showcase'! Featuring a lineup of established comedians and rising stars, this show guarantees a hilarious night out. Grab a drink and prepare to laugh until your sides hurt.\n\nWhat to expect:\n• Performances by multiple stand-up comedians\n• Diverse comedic styles and observational humor\n• Full bar service available\n• Intimate comedy club setting\n• Opportunity to discover your new favorite comic\n• Special guest headliner\n\nPerfect for a fun date night or an evening out with friends.",
      "date": "2025-09-12T20:30:00Z",
      "location": "The Laugh Factory, Los Angeles, CA",
      "mapUrl": "http://googleusercontent.com/maps.google.com/11",
      "category": "Comedy",
      "totalTickets": 250,
      "availableTickets": 180,
      "price": 30,
      "originalPrice": 35,
      "imageUrl": "https://images.unsplash.com/photo-1549216093-41f8e124c653?w=800",
      "amenities": [
        "Bar Service",
        "Restrooms",
        "Seating"
      ],
      "tags": [
        "Comedy",
        "Stand-Up",
        "Live Show",
        "Nightlife",
        "Humor"
      ],
      "restrictions": {
        "age": "18+",
        "dressCode": "Casual",
        "capacity": "250 attendees"
      },
      "rating": 4.7,
      "reviewsCount": 130,
      "isFeatured": true,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Charity Fun Run & Walk 5K",
      "shortDescription": "Run for a cause, support the community",
      "longDescription": "Lace up your shoes for our annual 'Charity Fun Run & Walk 5K'! Join us to support a great cause while enjoying a refreshing outdoor activity. Whether you run, jog, or walk, every step helps make a difference in our community.\n\nWhat to expect:\n• Scenic 5K route for all fitness levels\n• Fundraising for a local charity (details on website)\n• T-shirt and finisher's medal for all participants\n• Post-race celebration with music and refreshments\n• Family-friendly atmosphere with activities for kids\n• Prizes for top finishers and fundraisers\n\nMake a positive impact and have fun doing it!",
      "date": "2025-10-26T08:00:00Z",
      "location": "Lakeside Park, Seattle, WA",
      "mapUrl": "http://googleusercontent.com/maps.google.com/12",
      "category": "Charity & Community",
      "totalTickets": 1000,
      "availableTickets": 850,
      "price": 30,
      "originalPrice": 35,
      "imageUrl": "https://images.unsplash.com/photo-1517649774659-cb18182281a4?w=800",
      "amenities": [
        "Restrooms",
        "Water Stations",
        "First Aid",
        "T-shirt"
      ],
      "tags": [
        "Run",
        "Walk",
        "Charity",
        "Fitness",
        "Outdoor",
        "Community"
      ],
      "restrictions": {
        "age": "All Ages (under 12 with adult)",
        "dressCode": "Athletic wear",
        "capacity": "1000 participants"
      },
      "rating": 4.9,
      "reviewsCount": 150,
      "isFeatured": true,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "DIY Home Renovation Workshop",
      "shortDescription": "Empowering homeowners with practical skills",
      "longDescription": "Tackle your home projects with confidence after attending our 'DIY Home Renovation Workshop'! Learn essential skills like plumbing basics, minor electrical repairs, painting techniques, and tiling. Our expert instructors will guide you through hands-on exercises.\n\nWhat to expect:\n• Practical demonstrations and hands-on practice\n• Basic plumbing and electrical troubleshooting\n• Professional painting and plastering tips\n• Tiling techniques for floors and walls\n• Q&A with experienced home improvement professionals\n• Safety guidelines for all DIY projects\n\nGain the knowledge and confidence to transform your home yourself!",
      "date": "2025-11-16T09:00:00Z",
      "location": "Home Depot Workshop Center, Dallas, TX",
      "mapUrl": "http://googleusercontent.com/maps.google.com/13",
      "category": "Workshops & Classes",
      "totalTickets": 40,
      "availableTickets": 25,
      "price": 75,
      "originalPrice": 90,
      "imageUrl": "https://images.unsplash.com/photo-1522204523234-872957b44781?w=800",
      "amenities": [
        "Tools Provided",
        "Materials Provided",
        "Restrooms",
        "Safety Gear"
      ],
      "tags": [
        "DIY",
        "Home Improvement",
        "Workshop",
        "Renovation",
        "Skills"
      ],
      "restrictions": {
        "age": "18+",
        "dressCode": "Work clothes, closed-toe shoes",
        "capacity": "40 attendees"
      },
      "rating": 4.6,
      "reviewsCount": 65,
      "isFeatured": false,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Anime & Manga Convention",
      "shortDescription": "Celebrate Japanese animation and comics",
      "longDescription": "Dive into the vibrant world of Japanese animation and comics at our 'Anime & Manga Convention'! Meet voice actors, illustrators, and cosplayers. Participate in panels, screenings, and gaming tournaments. A paradise for fans of all ages.\n\nWhat to expect:\n• Guest appearances by famous voice actors and artists\n• Anime screenings and premieres\n• Cosplay competition with spectacular costumes\n• Vendor hall with exclusive merchandise and collectibles\n• Gaming tournaments (video games, card games)\n• Workshops on drawing manga and animation techniques\n\nImmerse yourself in fandom and connect with fellow anime and manga enthusiasts.",
      "date": "2026-03-08T10:00:00Z",
      "location": "Convention Center, Tokyo, Japan",
      "mapUrl": "http://googleusercontent.com/maps.google.com/14",
      "category": "Conventions & Expos",
      "totalTickets": 9000,
      "availableTickets": 7000,
      "price": 40,
      "originalPrice": 50,
      "imageUrl": "https://images.unsplash.com/photo-1594901511252-942f9e4f5a31?w=800",
      "amenities": [
        "Restrooms",
        "Food & Drinks (available for purchase)",
        "Wi-Fi",
        "Exhibition Hall"
      ],
      "tags": [
        "Anime",
        "Manga",
        "Convention",
        "Cosplay",
        "Gaming",
        "Japan"
      ],
      "restrictions": {
        "age": "All Ages",
        "dressCode": "Cosplay encouraged!",
        "capacity": "9000 attendees"
      },
      "rating": 4.9,
      "reviewsCount": 400,
      "isFeatured": true,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Classical Ballet: The Nutcracker",
      "shortDescription": "A timeless holiday classic on stage",
      "longDescription": "Experience the enchanting magic of 'The Nutcracker' ballet this holiday season. This beloved classic, with its magnificent score by Tchaikovsky and dazzling choreography, is a cherished family tradition that will captivate audiences of all ages.\n\nWhat to expect:\n• Stunning performances by a professional ballet company\n• Tchaikovsky's iconic score performed live by an orchestra\n• Elaborate costumes and breathtaking set designs\n• A festive and heartwarming story for the holidays\n• Matinee and evening show options\n• Opportunities for pre-show backstage tours (select tickets)\n\nCreate unforgettable holiday memories with this exquisite ballet production.",
      "date": "2025-12-20T19:00:00Z",
      "location": "Opera House, Sydney, Australia",
      "mapUrl": "http://googleusercontent.com/maps.google.com/15",
      "category": "Performing Arts",
      "totalTickets": 2000,
      "availableTickets": 1200,
      "price": 85,
      "originalPrice": 100,
      "imageUrl": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
      "amenities": [
        "Restrooms",
        "Bar/Refreshments",
        "Coat Check",
        "Wheelchair Accessible"
      ],
      "tags": [
        "Ballet",
        "The Nutcracker",
        "Performing Arts",
        "Holiday",
        "Family"
      ],
      "restrictions": {
        "age": "5+",
        "dressCode": "Smart casual to formal",
        "capacity": "2000 attendees"
      },
      "rating": 4.9,
      "reviewsCount": 290,
      "isFeatured": true,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Summer Yoga in the Park",
      "shortDescription": "Find your flow in nature's embrace",
      "longDescription": "Rejuvenate your body and mind with our 'Summer Yoga in the Park' series. Join us for outdoor yoga sessions led by experienced instructors, surrounded by the tranquility of nature. All levels welcome, from beginners to seasoned yogis.\n\nWhat to expect:\n• Gentle to moderate Vinyasa flow classes\n• Experienced and certified yoga instructors\n• Beautiful park setting with fresh air\n• Focus on breathwork, flexibility, and strength\n• Bring your own mat and water bottle\n• Community connection and relaxation\n\nConnect with nature and enhance your well-being through the power of yoga.",
      "date": "2026-07-01T07:00:00Z",
      "location": "Hyde Park, London, UK",
      "mapUrl": "http://googleusercontent.com/maps.google.com/16",
      "category": "Health & Wellness",
      "totalTickets": 300,
      "availableTickets": 250,
      "price": 15,
      "originalPrice": 20,
      "imageUrl": "https://images.unsplash.com/photo-1506126616402-4017d862e3d9?w=800",
      "amenities": [
        "Restrooms (nearby)",
        "Water Access",
        "Open Space"
      ],
      "tags": [
        "Yoga",
        "Outdoor",
        "Fitness",
        "Wellness",
        "Summer"
      ],
      "restrictions": {
        "age": "13+",
        "dressCode": "Activewear",
        "capacity": "300 attendees"
      },
      "rating": 4.7,
      "reviewsCount": 110,
      "isFeatured": false,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "International Photography Exhibition",
      "shortDescription": "Capturing the world through the lens",
      "longDescription": "Immerse yourself in breathtaking imagery at the 'International Photography Exhibition'. Featuring works from acclaimed photographers worldwide, this exhibition explores diverse themes, cultures, and landscapes captured through the art of the lens.\n\nWhat to expect:\n• Curated collection of stunning photographs\n• Various genres: landscape, portrait, street, documentary\n• Artist talks and Q&A sessions\n• Photo walks and practical workshops\n• On-site print sales and photo book signing\n• Opportunities to meet featured photographers\n\nAn inspiring event for photography enthusiasts and art lovers alike.",
      "date": "2026-01-25T10:00:00Z",
      "location": "Gallery of Modern Art, Paris, France",
      "mapUrl": "http://googleusercontent.com/maps.google.com/17",
      "category": "Art & Culture",
      "totalTickets": 1800,
      "availableTickets": 1000,
      "price": 30,
      "originalPrice": 35,
      "imageUrl": "https://images.unsplash.com/photo-1517409477087-ddfe1e102ce2?w=800",
      "amenities": [
        "Restrooms",
        "Cafe",
        "Gift Shop",
        "Wheelchair Accessible"
      ],
      "tags": [
        "Photography",
        "Exhibition",
        "Art",
        "Culture",
        "Gallery"
      ],
      "restrictions": {
        "age": "All Ages",
        "dressCode": "Casual",
        "capacity": "1800 attendees"
      },
      "rating": 4.8,
      "reviewsCount": 160,
      "isFeatured": true,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Food & Wine Pairing Experience",
      "shortDescription": "Elevate your palate with expert pairings",
      "longDescription": "Savor an evening of exquisite tastes at our 'Food & Wine Pairing Experience'. Our sommelier and chef will guide you through a curated menu, perfectly matched with fine wines, enhancing the flavors and aroma of each dish.\n\nWhat to expect:\n• Multi-course tasting menu\n• Expertly selected wine pairings for each course\n• Guidance from a certified sommelier and executive chef\n• Learn about flavor profiles and pairing principles\n• Intimate dining setting\n• Q&A session with the sommelier and chef\n\nAn educational and delicious journey for wine and food enthusiasts.",
      "date": "2025-11-09T19:00:00Z",
      "location": "The Gourmet Cellar, Napa Valley, CA",
      "mapUrl": "http://googleusercontent.com/maps.google.com/18",
      "category": "Food & Drink",
      "totalTickets": 20,
      "availableTickets": 12,
      "price": 150,
      "originalPrice": 180,
      "imageUrl": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
      "amenities": [
        "Full Meal",
        "Wine Pairings",
        "Restrooms",
        "Private Dining"
      ],
      "tags": [
        "Wine",
        "Food",
        "Tasting",
        "Culinary",
        "Gourmet"
      ],
      "restrictions": {
        "age": "21+",
        "dressCode": "Smart casual",
        "capacity": "20 attendees"
      },
      "rating": 4.9,
      "reviewsCount": 55,
      "isFeatured": true,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Outdoor Adventure & Camping Expo",
      "shortDescription": "Gear up for your next great outdoor escape",
      "longDescription": "Plan your next adventure at the 'Outdoor Adventure & Camping Expo'! Discover the latest gear, explore exciting destinations, and learn essential skills for hiking, camping, climbing, and more. Featuring expert talks and interactive demonstrations.\n\nWhat to expect:\n• Exhibitors with camping, hiking, and outdoor gear\n• Destination showcases and travel planning resources\n• Workshops on knot tying, first aid, and survival skills\n• Live demonstrations of outdoor equipment\n• Rock climbing wall and adventure activities\n• Guest speakers sharing their expedition stories\n\nInspire your wanderlust and prepare for unforgettable outdoor experiences.",
      "date": "2026-03-22T09:00:00Z",
      "location": "Denver Convention Center, Denver, CO",
      "mapUrl": "http://googleusercontent.com/maps.google.com/19",
      "category": "Sports & Recreation",
      "totalTickets": 4500,
      "availableTickets": 3500,
      "price": 25,
      "originalPrice": 30,
      "imageUrl": "https://images.unsplash.com/photo-1504280390367-361c6d32c0f6?w=800",
      "amenities": [
        "Restrooms",
        "Food & Drinks",
        "Exhibition Hall",
        "Demonstration Areas"
      ],
      "tags": [
        "Outdoor",
        "Camping",
        "Hiking",
        "Adventure",
        "Expo"
      ],
      "restrictions": {
        "age": "All Ages",
        "dressCode": "Casual",
        "capacity": "4500 attendees"
      },
      "rating": 4.7,
      "reviewsCount": 200,
      "isFeatured": true,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Winter Holiday Craft Fair",
      "shortDescription": "Find unique handmade gifts and festive decor",
      "longDescription": "Get into the holiday spirit at our 'Winter Holiday Craft Fair'! Discover one-of-a-kind handmade gifts, festive decorations, and delicious seasonal treats from talented local artisans. Enjoy carols, hot cocoa, and a cheerful atmosphere.\n\nWhat to expect:\n• Diverse range of handcrafted holiday gifts\n• Local artisans showcasing their unique creations\n• Festive music and carolers\n• Hot cocoa, mulled wine, and holiday snacks\n• DIY ornament making station\n• Photo opportunities with Santa (select times)\n\nFind the perfect presents and embrace the joy of the holiday season.",
      "date": "2025-12-07T10:00:00Z",
      "location": "Convention Hall, Vancouver, Canada",
      "mapUrl": "http://googleusercontent.com/maps.google.com/20",
      "category": "Seasonal & Holiday",
      "totalTickets": 6000,
      "availableTickets": 5000,
      "price": 5,
      "originalPrice": 8,
      "imageUrl": "https://images.unsplash.com/photo-1507915594049-7c42b2f6f5b9?w=800",
      "amenities": [
        "Restrooms",
        "Food & Drinks",
        "Parking",
        "Family-Friendly"
      ],
      "tags": [
        "Holiday",
        "Crafts",
        "Market",
        "Christmas",
        "Gifts"
      ],
      "restrictions": {
        "age": "All Ages",
        "dressCode": "Casual, festive attire welcome",
        "capacity": "6000 attendees"
      },
      "rating": 4.7,
      "reviewsCount": 230,
      "isFeatured": false,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Beginner's Coding Bootcamp",
      "shortDescription": "Kickstart your career in tech with foundational coding skills",
      "longDescription": "Embark on a new career path with our 'Beginner's Coding Bootcamp'. This intensive program covers the fundamentals of programming, including Python, HTML, CSS, and JavaScript. Designed for absolute beginners, you'll gain practical skills to build web applications.\n\nWhat to expect:\n• Hands-on coding exercises and projects\n• Experienced instructors providing personalized support\n• Introduction to front-end and back-end development\n• Career guidance and job search resources\n• Access to online learning platform and community forum\n• Certificate of completion\n\nTransform your future and enter the exciting world of software development.",
      "date": "2026-02-10T09:00:00Z",
      "location": "Tech Academy, Bengaluru, India",
      "mapUrl": "http://googleusercontent.com/maps.google.com/21",
      "category": "Workshops & Classes",
      "totalTickets": 50,
      "availableTickets": 30,
      "price": 1200,
      "originalPrice": 1500,
      "imageUrl": "https://images.unsplash.com/photo-1547658717-d5da256f125a?w=800",
      "amenities": [
        "Wi-Fi",
        "Computers Provided",
        "Course Materials",
        "Coffee/Tea"
      ],
      "tags": [
        "Coding",
        "Bootcamp",
        "Programming",
        "Web Development",
        "Education"
      ],
      "restrictions": {
        "age": "18+",
        "dressCode": "Casual",
        "capacity": "50 attendees"
      },
      "rating": 4.8,
      "reviewsCount": 40,
      "isFeatured": true,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Classical Music Concert: Beethoven's 9th",
      "shortDescription": "An evening of powerful symphonic grandeur",
      "longDescription": "Experience the majestic power of Beethoven's Symphony No. 9, 'Choral', performed by a world-class orchestra and choir. This iconic masterpiece will fill the concert hall with its profound beauty and triumphant spirit. A truly unforgettable musical event.\n\nWhat to expect:\n• Full symphony orchestra and large choir performance\n• Renowned conductor and soloists\n• One of classical music's most celebrated works\n• Grand concert hall acoustics\n• Pre-concert lecture on Beethoven's Ninth Symphony\n• Elegant and inspiring atmosphere\n\nImmerse yourself in the timeless brilliance of classical music.",
      "date": "2026-02-28T19:30:00Z",
      "location": "Musikverein, Vienna, Austria",
      "mapUrl": "http://googleusercontent.com/maps.google.com/22",
      "category": "Music",
      "totalTickets": 1700,
      "availableTickets": 900,
      "price": 100,
      "originalPrice": 130,
      "imageUrl": "https://images.unsplash.com/photo-1514525253164-81e5170d1927?w=800",
      "amenities": [
        "Restrooms",
        "Coat Check",
        "Bar/Refreshments",
        "Wheelchair Accessible"
      ],
      "tags": [
        "Classical Music",
        "Orchestra",
        "Concert",
        "Beethoven",
        "Symphony"
      ],
      "restrictions": {
        "age": "8+",
        "dressCode": "Formal/Semi-formal",
        "capacity": "1700 attendees"
      },
      "rating": 5.0,
      "reviewsCount": 210,
      "isFeatured": true,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "International Book Fair 2025",
      "shortDescription": "A celebration of literature and storytelling",
      "longDescription": "Dive into the world of books at the 'International Book Fair'! Meet acclaimed authors, discover new releases, attend engaging panels, and explore a vast collection of genres. A paradise for book lovers of all ages.\n\nWhat to expect:\n• Author signings and meet-and-greets\n• Panels and discussions with literary figures\n• Book launches and readings\n• Publishers and booksellers showcasing new titles\n• Children's literature zone with activities\n• Workshops on writing and publishing\n\nExpand your literary horizons and connect with the vibrant world of books.",
      "date": "2025-11-01T09:00:00Z",
      "location": "Frankfurt Exhibition Center, Frankfurt, Germany",
      "mapUrl": "http://googleusercontent.com/maps.google.com/23",
      "category": "Literature & Books",
      "totalTickets": 7000,
      "availableTickets": 5500,
      "price": 20,
      "originalPrice": 25,
      "imageUrl": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800",
      "amenities": [
        "Restrooms",
        "Food & Drinks",
        "Wi-Fi",
        "Exhibition Hall"
      ],
      "tags": [
        "Books",
        "Literature",
        "Fair",
        "Authors",
        "Reading"
      ],
      "restrictions": {
        "age": "All Ages",
        "dressCode": "Casual",
        "capacity": "7000 attendees"
      },
      "rating": 4.8,
      "reviewsCount": 310,
      "isFeatured": true,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Eco-Friendly Living Fair",
      "shortDescription": "Sustainable solutions for a greener future",
      "longDescription": "Discover how to lead a more eco-conscious life at our 'Eco-Friendly Living Fair'. Explore sustainable products, learn about renewable energy, participate in zero-waste workshops, and connect with organizations dedicated to environmental protection.\n\nWhat to expect:\n• Green product exhibits and sustainable brands\n• Workshops on composting, upcycling, and sustainable gardening\n• Expert talks on climate change and conservation\n• Live demonstrations of eco-friendly practices\n• Organic food vendors and healthy lifestyle tips\n• Family activities focused on environmental awareness\n\nJoin us in building a healthier, more sustainable planet.",
      "date": "2026-04-12T10:00:00Z",
      "location": "Community Center, Portland, OR",
      "mapUrl": "http://googleusercontent.com/maps.google.com/24",
      "category": "Environment & Sustainability",
      "totalTickets": 2500,
      "availableTickets": 1900,
      "price": 10,
      "originalPrice": 15,
      "imageUrl": "https://images.unsplash.com/photo-1542838686-2a7e782970b5?w=800",
      "amenities": [
        "Restrooms",
        "Food & Drinks",
        "Recycling Stations",
        "Workshops"
      ],
      "tags": [
        "Eco-Friendly",
        "Sustainability",
        "Green Living",
        "Environment",
        "Fair"
      ],
      "restrictions": {
        "age": "All Ages",
        "dressCode": "Casual",
        "capacity": "2500 attendees"
      },
      "rating": 4.7,
      "reviewsCount": 180,
      "isFeatured": false,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Robotics & AI Expo for Kids",
      "shortDescription": "Future innovators explore AI and robotics",
      "longDescription": "Spark your child's interest in the future of technology at the 'Robotics & AI Expo for Kids'! This interactive event features fun workshops, robotic demonstrations, and hands-on activities designed to introduce young minds to artificial intelligence and robotics.\n\nWhat to expect:\n• Build-your-own-robot workshops\n• AI-powered game demonstrations\n• Robotic pet interactions\n• Coding challenges for beginners\n• Meet and learn from robotics experts\n• Educational and engaging exhibits\n\nInspire creativity and critical thinking in the next generation of engineers and scientists.",
      "date": "2026-01-18T10:00:00Z",
      "location": "Science Museum, Washington D.C., USA",
      "mapUrl": "http://googleusercontent.com/maps.google.com/25",
      "category": "Family & Kids",
      "totalTickets": 800,
      "availableTickets": 600,
      "price": 20,
      "originalPrice": 25,
      "imageUrl": "https://images.unsplash.com/photo-1515378790364-5047b1c313a4?w=800",
      "amenities": [
        "Restrooms",
        "Cafe",
        "Wheelchair Accessible",
        "Interactive Exhibits"
      ],
      "tags": [
        "Kids",
        "Robotics",
        "AI",
        "STEM",
        "Education",
        "Technology"
      ],
      "restrictions": {
        "age": "6-14 years",
        "dressCode": "Casual",
        "capacity": "800 attendees"
      },
      "rating": 4.9,
      "reviewsCount": 140,
      "isFeatured": true,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "International Wine Tasting & Education",
      "shortDescription": "Explore the world of wines with expert guidance",
      "longDescription": "Join us for an exquisite 'International Wine Tasting & Education' event. Discover new varietals, learn about winemaking regions, and develop your palate under the guidance of a master sommelier. Featuring wines from renowned vineyards worldwide.\n\nWhat to expect:\n• Guided tasting of 8-10 international wines\n• Insights into wine regions, grape varietals, and tasting notes\n• Pairing suggestions for food and wine\n• Q&A session with the sommelier\n• Take-home tasting notes and wine recommendations\n• Small group setting for an immersive experience\n\nEnhance your appreciation for wine and become a more confident connoisseur.",
      "date": "2025-10-19T18:00:00Z",
      "location": "The Wine Cellar, Paris, France",
      "mapUrl": "http://googleusercontent.com/maps.google.com/26",
      "category": "Food & Drink",
      "totalTickets": 25,
      "availableTickets": 15,
      "price": 110,
      "originalPrice": 130,
      "imageUrl": "https://images.unsplash.com/photo-1540325492167-9391ac6f6f96?w=800",
      "amenities": [
        "Wine Samples",
        "Snacks (cheese/bread)",
        "Restrooms",
        "Tasting Glasses"
      ],
      "tags": [
        "Wine",
        "Tasting",
        "Education",
        "Sommelier",
        "Food & Drink"
      ],
      "restrictions": {
        "age": "21+",
        "dressCode": "Smart casual",
        "capacity": "25 attendees"
      },
      "rating": 4.9,
      "reviewsCount": 60,
      "isFeatured": true,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "History of Ancient Civilizations Lecture Series",
      "shortDescription": "Journey through the cradle of human history",
      "longDescription": "Delve into the fascinating 'History of Ancient Civilizations' with our engaging lecture series. Led by renowned historians and archaeologists, explore the wonders of Egypt, Mesopotamia, Greece, and Rome, uncovering their enduring legacies.\n\nWhat to expect:\n• Expert lectures on key ancient civilizations\n• Interactive Q&A sessions\n• Visual presentations with archaeological discoveries\n• Insights into ancient art, politics, and daily life\n• Access to supplementary reading materials\n• Suitable for history enthusiasts of all levels\n\nExpand your knowledge and gain a deeper understanding of our shared past.",
      "date": "2026-03-01T18:00:00Z",
      "location": "British Museum, London, UK",
      "mapUrl": "http://googleusercontent.com/maps.google.com/27",
      "category": "History & Culture",
      "totalTickets": 150,
      "availableTickets": 90,
      "price": 45,
      "originalPrice": 55,
      "imageUrl": "https://images.unsplash.com/photo-1502421867175-ad34b172a5a5?w=800",
      "amenities": [
        "Lecture Hall",
        "Restrooms",
        "Accessible Seating",
        "Coffee/Tea"
      ],
      "tags": [
        "History",
        "Ancient Civilizations",
        "Lecture",
        "Culture",
        "Archaeology"
      ],
      "restrictions": {
        "age": "16+",
        "dressCode": "Casual",
        "capacity": "150 attendees"
      },
      "rating": 4.7,
      "reviewsCount": 85,
      "isFeatured": false,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Future of AI in Healthcare Summit",
      "shortDescription": "Transforming healthcare with artificial intelligence",
      "longDescription": "Join leading experts at the 'Future of AI in Healthcare Summit' to explore how artificial intelligence is revolutionizing patient care, diagnostics, drug discovery, and medical research. This summit brings together healthcare professionals, tech innovators, and policymakers.\n\nWhat to expect:\n• Keynotes on AI's impact on medical fields\n• Case studies of successful AI implementations in healthcare\n• Discussions on ethical considerations and regulatory challenges\n• Networking opportunities with industry leaders\n• Demonstrations of new AI-powered medical devices\n• Interactive workshops on data analysis for healthcare\n\nDiscover the cutting-edge advancements and future prospects of AI in healthcare.",
      "date": "2026-05-05T09:00:00Z",
      "location": "Boston Convention & Exhibition Center, Boston, MA",
      "mapUrl": "http://googleusercontent.com/maps.google.com/28",
      "category": "Technology",
      "totalTickets": 1800,
      "availableTickets": 1200,
      "price": 400,
      "originalPrice": 500,
      "imageUrl": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
      "amenities": [
        "Wi-Fi",
        "Catering",
        "Exhibition Area",
        "Networking Lounges"
      ],
      "tags": [
        "AI",
        "Healthcare",
        "Technology",
        "Summit",
        "Medical Innovation"
      ],
      "restrictions": {
        "age": "18+",
        "dressCode": "Business casual",
        "capacity": "1800 attendees"
      },
      "rating": 4.9,
      "reviewsCount": 170,
      "isFeatured": true,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "Outdoor Photography Tour: Cityscapes at Sunset",
      "shortDescription": "Capture the magic of urban twilight",
      "longDescription": "Join our 'Outdoor Photography Tour: Cityscapes at Sunset' and learn to capture stunning urban landscapes bathed in the golden hour and twilight glow. Our expert photographer will guide you to the best vantage points and provide tips on composition, exposure, and lighting.\n\nWhat to expect:\n• Guided tour to prime cityscape photography locations\n• Professional instruction on sunset and low-light photography\n• Tips on composition, camera settings, and gear\n• Hands-on practice and personalized feedback\n• Opportunity to capture iconic city landmarks\n• Small group size for individual attention\n\nPerfect for photographers of all levels looking to master beautiful cityscape shots.",
      "date": "2025-09-01T17:30:00Z",
      "location": "Brooklyn Bridge Park, New York, NY",
      "mapUrl": "http://googleusercontent.com/maps.google.com/29",
      "category": "Workshops & Classes",
      "totalTickets": 15,
      "availableTickets": 10,
      "price": 60,
      "originalPrice": 75,
      "imageUrl": "https://images.unsplash.com/photo-1517409477087-ddfe1e102ce2?w=800",
      "amenities": [
        "Guided Tour",
        "Photography Tips"
      ],
      "tags": [
        "Photography",
        "Outdoor",
        "Cityscape",
        "Workshop",
        "Sunset"
      ],
      "restrictions": {
        "age": "16+",
        "dressCode": "Comfortable walking shoes, weather-appropriate attire",
        "capacity": "15 attendees"
      },
      "rating": 4.8,
      "reviewsCount": 45,
      "isFeatured": false,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    },
    {
      "vendorId": 1,
      "title": "International Folk Dance Festival",
      "shortDescription": "A vibrant celebration of global traditions",
      "longDescription": "Experience the joy and energy of cultures worldwide at our 'International Folk Dance Festival'! Enjoy captivating performances from diverse dance troupes, participate in workshops, and celebrate the rich heritage of global folk traditions.\n\nWhat to expect:\n• Live performances by international folk dance groups\n• Audience participation dance workshops (e.g., Irish, Balkan, Bollywood)\n• Cultural food and craft stalls\n• Traditional music and costume displays\n• Family-friendly atmosphere and interactive activities\n• Grand finale performance by all participating groups\n\nImmerse yourself in a kaleidoscope of movement, music, and cultural exchange.",
      "date": "2026-06-15T14:00:00Z",
      "location": "Festival Grounds, Edinburgh, Scotland",
      "mapUrl": "http://googleusercontent.com/maps.google.com/30",
      "category": "Cultural & Arts",
      "totalTickets": 4000,
      "availableTickets": 3200,
      "price": 18,
      "originalPrice": 22,
      "imageUrl": "https://images.unsplash.com/photo-1518177309995-1f912e79e60d?w=800",
      "amenities": [
        "Restrooms",
        "Food & Drinks",
        "Seating Areas",
        "Parking"
      ],
      "tags": [
        "Dance",
        "Folk",
        "Cultural",
        "Festival",
        "International"
      ],
      "restrictions": {
        "age": "All Ages",
        "dressCode": "Casual",
        "capacity": "4000 attendees"
      },
      "rating": 4.8,
      "reviewsCount": 260,
      "isFeatured": true,
      "status": "APPROVED",
      "createdAt": "2025-07-23T16:04:14Z",
      "updatedAt": "2025-07-23T16:04:14Z"
    }
  ]

async function main() {
  const vendor = await prisma.vendor.findFirst();
  if (!vendor) {
    console.log('No vendor found. Please register a vendor first.');
    return;
  }

  const data = newData.map((e, i) => ({
    vendorId: vendor.id,
    date: new Date(Date.now() + i * 2 * 86400000),
  }));

  await prisma.event.createMany({
    data: newData,
    skipDuplicates: true,
  });
  console.log('10 real demo events inserted.');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

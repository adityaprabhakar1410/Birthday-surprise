/**
 * ====================================================================
 * BIRTHDAY SURPRISE WEBSITE CONFIGURATION
 * Easily customize text, names, dates, memories, photos & letter here!
 * ====================================================================
 */

const BIRTHDAY_CONFIG = {
  // Birthday Girl Details
  girlName: "Angel",
  titlePrefix: "Happy Birthday",
  subtitle: "To the Most Beautiful Girl in the World ❤️",
  nicknames: ["My Princess 👑", "Angel ✨", "Sissy 🥹", "Baby forever ❤️"],
  
  // Countdown Date (YYYY-MM-DDTHH:MM:SS)
  // If set in the past, countdown shows "00:00:00" and unlocks the reveal automatically
  targetDate: "2026-09-05T00:00:00",
  
  // Music & Synthesizer Settings
  music: {
    title: "Romantic Birthday Melody",
    artist: "Acoustic Synthesizer",
    autoPlaySynthesizer: true, // Uses Web Audio API romantic piano/acoustic synthesizer out of the box!
    audioSrc: "" // Optional custom MP3 URL if user wants to supply their own file
  },

  // About Her Section
  aboutHer: {
    title: "About The Birthday Girl ✨",
    subtitle: "A little crazy, a little dramatic, sometimes annoying… but honestly, that's what makes Angel, Angel. 😂❤️",
    cards: [
      {
        icon: "fa-heart",
        title: "Pure Golden Heart",
        desc: "She may act tough sometimes, but deep down she cares way more than she lets people know. 🥹❤️"
      },
      {
        icon: "fa-smile-beam",
        title: "Contagious Smile",
        desc: "That smile can change the whole mood of a room… and somehow gets her out of trouble too. 😂"
      },
      {
        icon: "fa-gem",
        title: "Grace & Charm",
        desc: "Looks innocent, acts innocent… and then suddenly the drama begins. 😂🎭"
      },
      {
        icon: "fa-magic",
        title: "Happy Soul",
        desc: "She knows how to enjoy the little things, laugh at the stupidest things, and make ordinary moments memorable ❤️"
      }
    ]
  },

  // Reasons Why She's Special
  reasons: [
    "She has this way of making people comfortable around her without even trying.",
    "She can turn the most random little moment into something worth remembering. 😂",
    "She cares about the people close to her, even when she doesn't always say it. ❤️",
    "She has her own little personality, her own opinions, and definitely her own rules. 😭😂",
    "She can be sweet one minute and unbelievably annoying the next. A true sister speciality. 😂",
    "She knows how to make people laugh, sometimes intentionally… sometimes not. 😭",
    "She has a soft side that she probably doesn't show everyone.",
    "Once she considers someone her person, she genuinely cares about them. 🫶🏻",
    "She doesn't need to pretend to be anyone else. Being Angel is already enough. ❤️",
    "And honestly… life would be a lot more boring without this little menace in it. 😂❤️",
  ],

  // Memory Timeline
  timeline: [
    {
      year: "Chapter 1",
      title: "The Little Angel 🐣",
      desc: "All those random little moments that probably didn't seem important at the time… but somehow became the memories we remember the most.",
      icon: "fa-sparkles",
      image: "images/image1.jpg",
      
    },
    {
      year: "Chapter 2",
      title: "Certified Annoying Sissy 😂",
      desc: "The fights. The arguments. The teasing. This moments. Basically… normal sibling activities. 😭😂",
      icon: "fa-comments"
      // image: "images/conversations.jpg"
    },
    {
      year: "Chapter 3",
      title: "Our Random Moments ✨",
      desc: "The stupid conversations, random laughs, inside jokes and moments that would make absolutely no sense to anyone else.",
      icon: "fa-star",
      // image: ""
    },
    {
      year: "Chapter 4",
      title: "Always My little baby ❤️",
      desc: "No matter how much we annoy each other, I'll always be glad that you're my sister.",
      icon: "fa-infinity",
      // image: "images/today-forever.jpg"
    }
  ],

  // Photo Gallery
  gallery: [
    {
      title: "Golden Hour Glow",
      category: "Romantic",
      image: "Angelphoto2.jpg",
      caption: "All those random little moments that probably didn't seem important at the time… but somehow became the memories we remember the most"
    },
    {
      title: "Sweet Birthday Cake",
      category: "Celebration",
      image: "Angelphoto3.jpg",
      caption: "The stupid conversations, random laughs, inside jokes and moments that would make absolutely no sense to anyone else."
    },
    {
      title: "Fresh Peonies & Peaches",
      category: "Flowers",
      image: "Angelphoto4.jpg",
      caption: "No matter how much we annoy each other, I'll always be glad that you're my sister. ❤️"
    },
    {
      title: "Cosmic Stargazing",
      category: "Memories",
      image: "Angelphoto1.jpg",
      caption: "The stars shine bright, but you outshine them all."
    }
  ],

  // Interactive Gift Boxes
  giftBoxes: [
    {
      id: 1,
      title: "🎟️ One Free Treat",
      badge: "Redeem Anytime",
      icon: "fa-hands-holding-child",
      color: "from-pink-500 to-rose-400",
      desc: "Redeem whenever you want. And yes, I'll actually have to honour it. Unfortunately. 😂"
    },
    {
      id: 2,
      title: "🫶🏻 Emergency Sibling Support",
      badge: "Birthday Queen Privilege",
      icon: "fa-moon",
      color: "from-purple-500 to-indigo-400",
      desc: "For those moments when you need someone to listen, help, or simply be there."
    },
    {
      id: 3,
      title: "👑 Angel's VIP Pass",
      badge: "Master Voucher",
      icon: "fa-wand-magic-sparkles",
      color: "from-amber-400 to-yellow-500",
      desc: "Name any wish in the world, big or small, and consider it granted! (Up to ₹1000.) 🎁"
    }
  ],

  // Love Letter
  loveLetter: {
    salutation: "Dear Angel ❤️,",
    paragraphs: ["Okay, first of all… HAPPIEST BIRTHDAYYY 😭🎂.I don't really know how to write one of those perfect birthday messages, so I'll just say what I actually mean.",
      "You're my lil baby🐣, and honestly, having you around means there's never a completely normal day. 😂 Theres always some drama, some random conversation, some argument, or something that makes us laugh for absolutely no reason.",
      "love the way you are  your little habits, your craziness , your sense of humour, your way of doing things, everything that makes you you.",
      "Again Happiest Birthday, Angel Love youu 3000, baby sissy. ❤️"
      ],
    closing: "Forever & Always With Love,",
    signoff: "Your Biggest supporter ❤️"
  },

  // // Future Dreams Together
  // dreams: [
  //   { icon: "fa-plane-departure", title: "Travel The World", desc: "Exploring cozy cobblestone streets & hidden beaches together." },
  //   { icon: "fa-house-chimney-heart", title: "Cozy Dream Nest", desc: "A cozy sanctuary filled with fairy lights, books, and warm tea." },
  //   { icon: "fa-camera-retro", title: "10,000 More Photos", desc: "Capturing a million candid smiles and joyful adventures." },
  //   { icon: "fa-heart-circle-bolt", title: "Growing Old Together", desc: "Holding hands at 80 and laughing at the exact same jokes." }
  // ],

  // Pre-loaded Wishes
  wishes: [
    { name: "Your Built-In Bestie 🫶🏻", text: "Happy Birthday to my favourite little menace! 😂❤️ Hope your day is as fun, crazy and amazing as you are" },
    { name: "Your Partner in Crime 😎", text: "Keep being the same crazy, funny and lovely Angel you are. Don't ever change… okay, maybe reduce the drama a little. 😂❤️" },
    { name: "Your Forever Annoying Sibling 🫂", text: "I'm really lucky to have a baby sister Iike you. We've had our fights, our stupid moments and a LOT of drama 😂, but I wouldn't trade you for anyone. Have the best birthday, Angel! ❤️" }
  ]
};

// Expose globally
window.BIRTHDAY_CONFIG = BIRTHDAY_CONFIG;

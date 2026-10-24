export interface ShayariItem {
  id: number;
  title: string;
  tagline: string;
  lines: string[];
}

export interface DateOption {
  id: string;
  title: string;
  icon: string;
  description: string;
  vibe: string;
  badge: string;
}

export const ROMANTIC_DATA = {
  recipientName: "Asmita",
  nickname: "Motku Ji",
  
  intro: {
    greeting: "Hey Asmita... ❤️",
    subtext: "Ek chhoti si baat kehni thi tumse...\nPar socha, kyun na use thoda special banaya jaaye? 🥹",
    callToAction: "Toh madam ji, ready ho apne liye banayi gayi ek chhoti si duniya explore karne ke liye? 🌹✨",
    buttonText: "Open Your Little Love Story 💌"
  },

  shayaris: [
    {
      id: 1,
      title: "Tumhari Muskurahat",
      tagline: "Shayari 1 💗",
      lines: [
        "Tumhari smile mein kuch toh khaas baat hai,",
        "Tumse baat ho toh dil ko ek alag sa sukoon milta hai,",
        "Pata nahi kya rishta hai tumhari muskurahat se,",
        "Bas tumhe hasta dekh kar mera din ban jaata hai. ❤️"
      ]
    },
    {
      id: 2,
      title: "Ek Chhoti Si Khwahish",
      tagline: "Shayari 2 🌙",
      lines: [
        "Na chaand chahiye, na taaron ki baraat,",
        "Bas tumhara saath ho aur hoti rahe dil ki baat,",
        "Ek coffee, thodi si hasi aur tumhara saath,",
        "Bas itni si khwahish hai meri is baar. ☕🌹"
      ]
    },
    {
      id: 3,
      title: "Sirf Tumhare Naam",
      tagline: "Shayari 3 💌",
      lines: [
        "Kuch baatein hain jo lafzon mein keh nahi paata,",
        "Tum saamne ho toh main kuch keh nahi paata,",
        "Isliye banayi hai ye chhoti si website,",
        "Taaki bata sakun ki tumhara saath mujhe kitna achha lagta hai. 🥹❤️"
      ]
    },
    {
      id: 4,
      title: "Date Wali Feeling",
      tagline: "Shayari 4 ✨",
      lines: [
        "Tumhare saath ek shaam bitani hai,",
        "Thodi si masti, thodi si baatein karni hain,",
        "Koi perfect plan nahi, bas tumhara saath chahiye,",
        "Ek pyari si date par tumhari smile dekhni hai. 🌷"
      ]
    }
  ],

  shayariButton: "Madam Ji, Ek Aur Shayari? 💕",

  letter: {
    salutation: "Dear Asmita... ❤️",
    paragraphs: [
      "Pata hai, main shayad duniya ka sabse perfect insaan nahi hoon, aur na hi mujhe pata hai ki kisi ko special feel kaise karaya jaata hai...",
      "Lekin ek baat zaroor pata hai.",
      "Main chahta tha ki tumhare liye kuch aisa banaun jo normal messages se thoda alag ho.",
      "Isliye ye chhoti si website banayi, sirf tumhare liye.",
      "Na koi badi demand hai, na koi pressure... bas dil mein ek chhoti si wish hai.",
      "Tumhare saath thoda waqt bitana, coffee pe baatein karna, bina kisi wajah ke hasna, aur kuch achhi memories banana. 🥹❤️"
    ],
    closing: "Ab ek chhota sa sawaal hai, Madam Ji... 🌹",
    buttonText: "Tell Me The Question 💖"
  },

  proposal: {
    leadIn: "Asmita Ji... Ek Chhoti Si Wish Hai Meri 🥹❤️",
    question: "Kya Tum Mere Saath Ek Pyari Si Date Par Chalogi? 🌹💗",
    subtext: "Bas tum, main, thodi si coffee, dher saari baatein aur kuch khoobsurat memories... ☕✨",
    yesButton: "YES, CHALO! ❤️",
    noButtonDefault: "NO, MADAM JI? 🙈",
    noPlayfulTexts: [
      "Pakka NO, Asmita Ji? 🥺",
      "Ek Baar Dil Se Soch Lo 🙈",
      "Itni Jaldi Kya Hai, Madam Ji? 😂",
      "Coffee Ka Plan Cancel Karogi? ☕🥹",
      "Aakhri Baar Soch Lo 💗"
    ]
  },

  celebration: {
    headline: "WAITTTT... SACCHIII? 🥹❤️",
    subHeadline: "Asmita Ji Ne YES Bol Diyaaaa!!! 😭💗",
    message: "Ab toh meri khushi ka koi thikana hi nahi hai! 🫶🏻🌹\n\nMadam Ji, aapne toh mera poora din bana diya.\n\nAb jaldi se ek cute sa date plan karte hain...\nCoffee meri taraf se, smile aapki taraf se. ☕😉❤️",
    buttonText: "Plan Our Little Date 💌"
  },

  dateOptions: [
    {
      id: "coffee",
      title: "Coffee & Heart-to-Heart Conversations",
      icon: "☕",
      description: "Cozy café, warm cappuccino, aur bina ruke dher saari baatein.",
      vibe: "Warm & Cozy",
      badge: "Most Popular 🌹"
    },
    {
      id: "walk",
      title: "Evening Walk Under the Stars",
      icon: "🌙",
      description: "Thandi hawa, taaron bhara aasmaan aur tumhara haath thoda kareeb.",
      vibe: "Dreamy & Peaceful",
      badge: "Magical ✨"
    },
    {
      id: "dessert",
      title: "Café & Dessert Date",
      icon: "🍰",
      description: "Delicious pastries, chocolates, aur tumhari meethi si smile.",
      vibe: "Sweet & Fun",
      badge: "Motku's Favorite 🍫"
    },
    {
      id: "sunset",
      title: "Sunset Together",
      icon: "🌅",
      description: "Golden hour glow, shaam ki laali aur sabse khoobsurat nazara: tum.",
      vibe: "Cinematic & Romantic",
      badge: "Golden Hour 🌟"
    },
    {
      id: "movie",
      title: "Movie & Snacks",
      icon: "🎬",
      description: "Ek achhi romantic ya comedy movie, dher saare popcorn aur masti.",
      vibe: "Chilled & Entertaining",
      badge: "Relaxing 🍿"
    },
    {
      id: "surprise",
      title: "A Surprise Date Planned Together",
      icon: "🎁",
      description: "Poora plan tumhare mood par! Jo Asmita ji bolengi, wahi hoga.",
      vibe: "Pure Excitement",
      badge: "VIP Madam Ji 👑"
    }
  ],

  dayOptions: [
    "Is Weekend (Saturday Shaam)",
    "Sunday Chill Vibes",
    "Next Week Ki Ek Pyari Evening",
    "Jab Madam Ji Ka Mood Ho ✨"
  ],

  timeOptions: [
    "Sunset Time (5:00 PM)",
    "Evening Coffee (6:30 PM)",
    "Starlit Night (8:00 PM)",
    "Madam Ji Decide Karengi ⏰"
  ],

  footer: {
    specialTitle: "♡ Meri Cute Si Madam (Motku) Ji Ke Liye ♡",
    loveNote: "Made with lots of love, a little courage, and a smile just for you. ❤️",
    dedication: "Ek chhoti si website... ek special si ladki ke naam. 🌹"
  }
};

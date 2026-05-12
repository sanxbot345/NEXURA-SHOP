import { Game, PaymentMethod } from './types';

export const GAMES: Game[] = [
  {
    id: 'mlbb',
    title: 'Mobile Legends',
    publisher: 'Moonton',
    category: 'MOBA',
    currencyName: 'Diamonds',
    coverUrl: 'https://play-lh.googleusercontent.com/0gB6KEvQzyQXS6Uscx7HNjjlRMRUzEvYFqWr0TlmwHw6cw3nNRNSR9xChp-EUrk3Cq1lqTlsE1DbPgc97YClXVU=s256-rw',
    bannerUrl: 'https://play-lh.googleusercontent.com/N2lEFp6dBrLcuynEm9bhKZl7Au_kMaASCrjeW23B-4nEG6nzNwL3VnoH4uq6LNIjLzAOldo95QGXJwMO_NoXh5I=w2048-h1080-rw',
    inputs: [
      { id: 'userId', label: 'User ID', placeholder: 'Masukkan User ID' },
      { id: 'zoneId', label: 'Zone ID', placeholder: 'Masukkan Zone ID' },
    ],
    products: [
      { id: 'ml-3', amount: 3, bonus: 0, price: 1500 },
      { id: 'ml-12', amount: 12, bonus: 1, price: 4000 },
      { id: 'ml-28', amount: 28, bonus: 3, price: 8500 },
      { id: 'ml-53', amount: 53, bonus: 6, price: 16000 },
      { id: 'ml-77', amount: 77, bonus: 9, price: 23000 },
      { id: 'ml-154', amount: 154, bonus: 16, price: 45000 },
      { id: 'ml-256', amount: 256, bonus: 40, price: 76000 },
      { id: 'ml-366', amount: 366, bonus: 45, price: 105000 },
      { id: 'ml-503', amount: 503, bonus: 65, price: 142000 },
      { id: 'ml-774', amount: 774, bonus: 101, price: 215000 },
      { id: 'ml-1708', amount: 1708, bonus: 302, price: 485000 },
      { id: 'ml-4003', amount: 4003, bonus: 827, price: 1140000 },
    ]
  },
  {
    id: 'ff',
    title: 'Free Fire',
    publisher: 'Garena',
    category: 'Battle Royale',
    currencyName: 'Diamonds',
    coverUrl: 'https://play-lh.googleusercontent.com/Tzh1vMigK1Cn7_KIaMvKBVQRQapIMWMMqqyA6UqJTAYRpino4vvX6ZvYcVjZ_D8g19-DfHKCVeO2QPWl8vHGzw=s256-rw',
    bannerUrl: 'https://play-lh.googleusercontent.com/TZWu-eJ3pXYsOsnhupHekSyy_Ab-fwd8ZvzJYc4ljdSu-0FFnm7hbI9sxobKjukrQVSIwZD6KMNcsVtJSiuDtw=w2048-h1080-rw',
    inputs: [
      { id: 'playerId', label: 'Player ID', placeholder: 'Masukkan Player ID' },
    ],
    products: [
      { id: 'ff-5', amount: 5, price: 1000 },
      { id: 'ff-50', amount: 50, price: 8000 },
      { id: 'ff-70', amount: 70, price: 10000 },
      { id: 'ff-140', amount: 140, price: 20000 },
      { id: 'ff-355', amount: 355, price: 50000 },
      { id: 'ff-720', amount: 720, price: 100000 },
      { id: 'ff-1450', amount: 1450, price: 200000 },
      { id: 'ff-2180', amount: 2180, price: 300000 },
      { id: 'ff-3640', amount: 3640, price: 500000 },
      { id: 'ff-7290', amount: 7290, price: 1000000 },
    ]
  },
  {
    id: 'pubgm',
    title: 'PUBG Mobile',
    publisher: 'Tencent Games',
    category: 'Battle Royale',
    currencyName: 'UC',
    coverUrl: 'https://play-lh.googleusercontent.com/zCSGnBtZk0Lmp1BAbyaZfLktDzHmC6oke67qzz3G1lBegAF2asyt5KzXOJ2PVdHDYkU=s256-rw',
    bannerUrl: 'https://play-lh.googleusercontent.com/8jjV3kxZOteLqsyJNdh3-GUpbfHX2dz6wDaWdh3sH5rwqbXNMjwS8vJdfexarxUEm08TdsX9NaXK2n892bZX5A=w2048-h1080-rw',
    inputs: [
      { id: 'playerId', label: 'Player ID', placeholder: 'Masukkan Player ID' },
    ],
    products: [
      { id: 'pubg-30', amount: 30, price: 6000 },
      { id: 'pubg-60', amount: 60, price: 12000 },
      { id: 'pubg-325', amount: 325, bonus: 25, price: 60000 },
      { id: 'pubg-660', amount: 660, bonus: 60, price: 120000 },
      { id: 'pubg-1800', amount: 1800, bonus: 300, price: 300000 },
      { id: 'pubg-3850', amount: 3850, bonus: 850, price: 600000 },
      { id: 'pubg-8100', amount: 8100, bonus: 2100, price: 1200000 },
    ]
  },
  {
    id: 'valo',
    title: 'Valorant',
    publisher: 'Riot Games',
    category: 'FPS',
    currencyName: 'VP',
    coverUrl: 'https://img.icons8.com/color/512/valorant.png',
    bannerUrl: 'https://images.unsplash.com/photo-1589241062272-c0a000072dfa?auto=format&fit=crop&w=1600&h=900&q=80',
    inputs: [
      { id: 'riotId', label: 'Riot ID#Tagline', placeholder: 'Contoh: Henz#1234' },
    ],
    products: [
      { id: 'val-125', amount: 125, price: 15000 },
      { id: 'val-420', amount: 420, price: 50000 },
      { id: 'val-700', amount: 700, price: 80000 },
      { id: 'val-1375', amount: 1375, price: 150000 },
      { id: 'val-2400', amount: 2400, price: 250000 },
      { id: 'val-4000', amount: 4000, price: 400000 },
      { id: 'val-8150', amount: 8150, price: 800000 },
    ]
  },
  {
    id: 'gi',
    title: 'Genshin Impact',
    publisher: 'HoYoverse',
    category: 'RPG',
    currencyName: 'Genesis Crystals',
    coverUrl: 'https://play-lh.googleusercontent.com/YQqyKaXX-63krqsfIzUEJWUWLINxcb5tbS6QVySdxbS7eZV7YB2dUjUvX27xA0TIGtfxQ5v-tQjwlT5tTB-O=s256-rw',
    bannerUrl: 'https://play-lh.googleusercontent.com/TtNdqYDFjV8P_PlkFAWSJwpZQWcnhS8VMDqNOj226MPqYdJM_OkxB4dgNoVb1wflbM1lwNSO_GGmapSd504cxQ=w2048-h1080-rw',
    inputs: [
      { id: 'uid', label: 'UID', placeholder: 'Masukkan UID (Server akan otomatis terdeteksi)' },
    ],
    products: [
      { id: 'gi-60', amount: 60, price: 16000 },
      { id: 'gi-300', amount: 300, bonus: 30, price: 79000 },
      { id: 'gi-980', amount: 980, bonus: 110, price: 249000 },
      { id: 'gi-1980', amount: 1980, bonus: 260, price: 479000 },
      { id: 'gi-3280', amount: 3280, bonus: 600, price: 799000 },
      { id: 'gi-6480', amount: 6480, bonus: 1600, price: 1599000 },
      { id: 'gi-welkin', amount: 1, bonus: 0, price: 79000 }, // Blessing of Welkin Moon
    ]
  },
  {
    id: 'hok',
    title: 'Honor of Kings',
    publisher: 'Level Infinite',
    category: 'MOBA',
    currencyName: 'Tokens',
    coverUrl: 'https://play-lh.googleusercontent.com/wP51NIIV-M3azRzzmYUbRpjgwFAOq794bOldPKX9iR0z9ijRJze6JfTEvi27u8rVMRab5xPMnBEsQsXFykViaw=s256-rw',
    bannerUrl: 'https://play-lh.googleusercontent.com/b3VhK0G1QmPYpsObx-vPnkXS1et0oQjNhPJlyJW7J8XolUKJ4XZx9OxpfztTx78_UtgErZIgTouBgB-slUU0=w2048-h1080-rw',
    inputs: [
      { id: 'playerid', label: 'Player ID', placeholder: 'Masukkan Player ID' },
    ],
    products: [
      { id: 'hok-16', amount: 16, price: 3500 },
      { id: 'hok-80', amount: 80, price: 16000 },
      { id: 'hok-240', amount: 240, bonus: 15, price: 48000 },
      { id: 'hok-400', amount: 400, bonus: 32, price: 80000 },
      { id: 'hok-560', amount: 560, bonus: 45, price: 110000 },
      { id: 'hok-800', amount: 800, bonus: 75, price: 160000 },
      { id: 'hok-1200', amount: 1200, bonus: 120, price: 240000 },
      { id: 'hok-2400', amount: 2400, bonus: 280, price: 480000 },
    ]
  },
  {
    id: 'codm',
    title: 'Call of Duty Mobile',
    publisher: 'Activision',
    category: 'FPS',
    currencyName: 'CP',
    coverUrl: 'https://play-lh.googleusercontent.com/cfGSXkDwxa1jW3TlhhkDJBN16-1_KEtEDhnILPcs9rXcC25g14XY6MRGCtlXHFHs0g=s256-rw',
    bannerUrl: 'https://play-lh.googleusercontent.com/UAlGNLgnQRVs-XrK_mUGJw1h_nlO1Ykv0jZK-YoRrRYIGIWmRdE_CCPB7U34jAiz4xLWUAqQ5Me7Daq7N_8=w2048-h1080-rw',
    inputs: [
      { id: 'openId', label: 'OpenID', placeholder: 'Masukkan OpenID' },
    ],
    products: [
      { id: 'codm-31', amount: 31, price: 5000 },
      { id: 'codm-62', amount: 62, price: 10000 },
      { id: 'codm-127', amount: 127, bonus: 10, price: 20000 },
      { id: 'codm-317', amount: 317, bonus: 40, price: 50000 },
      { id: 'codm-631', amount: 631, bonus: 100, price: 100000 },
      { id: 'codm-1373', amount: 1373, bonus: 250, price: 200000 },
      { id: 'codm-2059', amount: 2059, bonus: 400, price: 300000 },
      { id: 'codm-3563', amount: 3563, bonus: 800, price: 500000 },
    ]
  },
  {
    id: 'wildrift',
    title: 'League of Legends: Wild Rift',
    publisher: 'Riot Games',
    category: 'MOBA',
    currencyName: 'Wild Cores',
    coverUrl: 'https://play-lh.googleusercontent.com/7-kbcpgrCOE1mleJ9g0d61sJeoqKcQRIj4iFvJ8DjPlRIfocOWfOQsXzKWw2I5oHySVdbjR2fvzfCCz1FYQ-RQ=s256-rw',
    bannerUrl: 'https://play-lh.googleusercontent.com/jt-7irr3MLFJJ06aCvd3s0ctrAy5VtxiThmeYjnv0ngySJILEI-63MdztlRh-u9jNUDF=w2048-h1080-rw',
    inputs: [
      { id: 'riotId', label: 'Riot ID', placeholder: 'Contoh: Nama#TAG' },
    ],
    products: [
      { id: 'wr-420', amount: 420, price: 50000 },
      { id: 'wr-700', amount: 700, price: 80000 },
      { id: 'wr-1375', amount: 1375, price: 150000 },
      { id: 'wr-2400', amount: 2400, price: 250000 },
      { id: 'wr-4000', amount: 4000, price: 400000 },
      { id: 'wr-8150', amount: 8150, price: 800000 },
    ]
  },
  {
    id: 'roblox',
    title: 'Roblox',
    publisher: 'Roblox Corporation',
    category: 'Sandbox',
    currencyName: 'Robux',
    coverUrl: 'https://play-lh.googleusercontent.com/7cIIPlWm4m7AGqVpEsIfyL-HW4cQla4ucXnfalMft1TMIYQIlf2vqgmthlZgbNAQoaQ=s256-rw',
    bannerUrl: 'https://play-lh.googleusercontent.com/bTeiISUTvkwG2lgjVm1zcSKqhPyyRuYxoELc4MG1qRlidk5hS14iGFZnjMkSQhKqpr-vgnaKqhoXux639xY=w2048-h1080-rw',
    inputs: [
      { id: 'username', label: 'Username', placeholder: 'Masukkan Username Roblox' },
    ],
    products: [
      { id: 'rbx-80', amount: 80, price: 15000 },
      { id: 'rbx-400', amount: 400, price: 75000 },
      { id: 'rbx-800', amount: 800, price: 150000 },
      { id: 'rbx-1200', amount: 1200, price: 225000 },
      { id: 'rbx-1700', amount: 1700, price: 300000 },
      { id: 'rbx-4500', amount: 4500, price: 750000 },
    ]
  },
  {
    id: 'brawlstars',
    title: 'Brawl Stars',
    publisher: 'Supercell',
    category: 'Action',
    currencyName: 'Gems',
    coverUrl: 'https://play-lh.googleusercontent.com/IFACylsXgbKgfNXcLbFrzlNhkB6_5LH3IGNA-frTpTPNolzQxL8mI2B_4jnXe5lTCnQYZYIv9zNTQGWn_8QwLA=s256-rw',
    bannerUrl: 'https://play-lh.googleusercontent.com/HsUbuxa1JeBatvViMuP2KbyHEu0Kr2uSe-G4pHzsUocCiwjcBLjafaHT2iKrvoMd03w2=w2048-h1080-rw',
    inputs: [
      { id: 'playerTag', label: 'Player Tag', placeholder: 'Contoh: #ABC123XYZ' },
    ],
    products: [
      { id: 'bs-30', amount: 30, price: 29000 },
      { id: 'bs-80', amount: 80, price: 79000 },
      { id: 'bs-170', amount: 170, price: 159000 },
      { id: 'bs-360', amount: 360, price: 329000 },
      { id: 'bs-950', amount: 950, price: 799000 },
      { id: 'bs-2000', amount: 2000, price: 1599000 },
    ]
  },
  {
    id: 'coc',
    title: 'Clash of Clans',
    publisher: 'Supercell',
    category: 'Strategy',
    currencyName: 'Gems',
    coverUrl: 'https://play-lh.googleusercontent.com/sFmWfYbYp_2ea7VRMTnwd3gjIBrPGXHj_d_ab1_k1q1p2OMk4riGMF1vqxdhONOtTYOt_BVpk7a4AYcKU68LNGQ=s256-rw',
    bannerUrl: 'https://play-lh.googleusercontent.com/jfXDFtPpPH40wp9b1L6aRGHNMep6yZQdFXX8NPw3Oj610BDG-gwVbvopsbdwQfEZ-T0=w2048-h1080-rw',
    inputs: [
      { id: 'playerTag', label: 'Player Tag', placeholder: 'Contoh: #ABC123XYZ' },
    ],
    products: [
      { id: 'coc-80', amount: 80, price: 15000 },
      { id: 'coc-500', amount: 500, price: 79000 },
      { id: 'coc-1200', amount: 1200, price: 159000 },
      { id: 'coc-2500', amount: 2500, price: 329000 },
      { id: 'coc-6500', amount: 6500, price: 799000 },
      { id: 'coc-14000', amount: 14000, price: 1599000 },
    ]
  }
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'qris', name: 'QRIS', category: 'E-Wallet', fee: 0.007, iconUrl: 'https://api.iconify.design/bi:qr-code-scan.svg?color=%2300f0ff' },
  { id: 'gopay', name: 'GoPay', category: 'E-Wallet', fee: 0.02, iconUrl: 'https://api.iconify.design/ion:wallet.svg?color=%2300f0ff' },
  { id: 'dana', name: 'DANA', category: 'E-Wallet', fee: 0.015, iconUrl: 'https://api.iconify.design/ion:wallet.svg?color=%2300f0ff' },
  { id: 'ovo', name: 'OVO', category: 'E-Wallet', fee: 0.015, iconUrl: 'https://api.iconify.design/ion:wallet.svg?color=%2300f0ff' },
  
  { id: 'bca', name: 'BCA Virtual Account', category: 'Virtual Account', fee: 4000, iconUrl: 'https://api.iconify.design/mdi:bank.svg?color=%2300f0ff' },
  { id: 'mandiri', name: 'Mandiri Virtual Account', category: 'Virtual Account', fee: 4000, iconUrl: 'https://api.iconify.design/mdi:bank.svg?color=%2300f0ff' },
  { id: 'bni', name: 'BNI Virtual Account', category: 'Virtual Account', fee: 4000, iconUrl: 'https://api.iconify.design/mdi:bank.svg?color=%2300f0ff' },
  { id: 'bri', name: 'BRI Virtual Account', category: 'Virtual Account', fee: 4000, iconUrl: 'https://api.iconify.design/mdi:bank.svg?color=%2300f0ff' },
  
  { id: 'alfamart', name: 'Alfamart', category: 'Minimarket', fee: 2500, iconUrl: 'https://api.iconify.design/mdi:store.svg?color=%2300f0ff' },
  { id: 'indomaret', name: 'Indomaret', category: 'Minimarket', fee: 2500, iconUrl: 'https://api.iconify.design/mdi:store.svg?color=%2300f0ff' },
];

export const BANNERS = [
  {
    id: 1,
    imageUrl: '/banner1.png',
  },
  {
    id: 2,
    imageUrl: '/banner2.png',
  }
];

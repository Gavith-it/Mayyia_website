export type MenuItem = {
  name: string
}

export type MenuSubCategory = {
  name: string
  items: MenuItem[]
}

export type MenuCategory = {
  id: string
  name: string
  subCategories: MenuSubCategory[]
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'beverages',
    name: 'Beverages',
    subCategories: [
      {
        name: 'Welcome Drinks',
        items: [
          { name: 'Green Apple Juice' },
          { name: 'Watermelon Juice' },
          { name: 'Rose Milkshake' },
          { name: 'Lychee Milkshake' },
          { name: 'Sweet Lime Soda' },
          { name: 'Kiwi Punch' }
        ]
      },
      {
        name: 'Signature Mocktails',
        items: [
          { name: 'Orange Blossom' },
          { name: 'Pina Colada' },
          { name: 'Badam Honey Punch' },
          { name: 'Virgin Mojito' },
          { name: 'Citrus Fizz' },
          { name: 'Mango Mule' }
        ]
      },
      {
        name: 'Fresh Fruit Juices',
        items: [
          { name: 'Orange Nice' },
          { name: 'Black Grapes' },
          { name: 'Watermelon' },
          { name: 'Greenmelon' },
          { name: 'Coconut Water' },
          { name: 'Sweet Lime' }
        ]
      },
      {
        name: 'Hot Beverages',
        items: [
          { name: 'Premium Coffee' },
          { name: 'Masala Tea' },
          { name: 'Badam Milk' },
          { name: 'Lemon Tea' },
          { name: 'Green Tea' },
          { name: 'Mint Tea' }
        ]
      }
    ]
  },
  {
    id: 'appetizers',
    name: 'Appetizers & Chats',
    subCategories: [
      {
        name: 'Pass Around Snacks',
        items: [
          { name: 'Chatpat Kaju' },
          { name: 'Corn Cheese Balls' },
          { name: 'Mexican Nachos' },
          { name: 'Cheese Pineapple' },
          { name: 'Crispy Cashewnuts' },
          { name: 'Aloo Bonda' }
        ]
      },
      {
        name: 'Premium Starters',
        items: [
          { name: 'Gobi Manchurian' },
          { name: 'Paneer Tikka' },
          { name: 'Hara Bhara Kebab' },
          { name: 'Crispy Baby Corn' },
          { name: 'Vegetable Spring Roll' },
          { name: 'Dahi Kebab' }
        ]
      },
      {
        name: 'Street Chats',
        items: [
          { name: 'Pani Puri' },
          { name: 'Cheese Corn Bhel' },
          { name: 'Dahi Puri' },
          { name: 'Masala Puri' },
          { name: 'Papdi Chat' },
          { name: 'Pav Bhaji' }
        ]
      },
      {
        name: 'Soups & Continental',
        items: [
          { name: 'Tomato Orange Shorbha' },
          { name: 'Sweet Corn Veg Soup' },
          { name: 'Cream Of Almond' },
          { name: 'Cheese Garlic Bread' },
          { name: 'Bruschetta' },
          { name: 'Alfredo Pasta' }
        ]
      }
    ]
  },
  {
    id: 'mains',
    name: 'Main Course',
    subCategories: [
      {
        name: 'North Indian Gravies',
        items: [
          { name: 'Paneer Butter Masala' },
          { name: 'Veg Shahi Kurma' },
          { name: 'Dal Makhni' },
          { name: 'Kadai Mushroom' },
          { name: 'Malai Kofta' },
          { name: 'Kaju Mutter' }
        ]
      },
      {
        name: 'South Indian Classics',
        items: [
          { name: 'Vegetable Saagu' },
          { name: 'Bombay Saagu' },
          { name: 'Hithkavare Kootu' },
          { name: 'Veg Stew' },
          { name: 'Avial' },
          { name: 'Majjige Huli' }
        ]
      },
      {
        name: 'Sambar & Rasam',
        items: [
          { name: 'Mix Veg Sambar' },
          { name: 'Udupi Gulla Boluhuli' },
          { name: 'Mysore Rasam' },
          { name: 'Lemon Rasam' },
          { name: 'Tomato Rasam' },
          { name: 'Drumstick Rasam' }
        ]
      },
      {
        name: 'Chinese Mains',
        items: [
          { name: 'Veg Fried Rice' },
          { name: 'Hakka Noodles' },
          { name: 'American Chopsuey' },
          { name: 'Schezwan Fried Rice' },
          { name: 'Paneer Mushroom Rice' },
          { name: 'Chinese Noodles' }
        ]
      }
    ]
  },
  {
    id: 'breads-rice',
    name: 'Breads & Rice',
    subCategories: [
      {
        name: 'North Indian Rice',
        items: [
          { name: 'Vegetable Dum Biriyani' },
          { name: 'Hyderabadi Dum Biriyani' },
          { name: 'Jeera Rice' },
          { name: 'Peas Pulao' },
          { name: 'Paneer Makhni Biriyani' },
          { name: 'Kashmiri Pulao' }
        ]
      },
      {
        name: 'North Indian Breads',
        items: [
          { name: 'Butter Naan' },
          { name: 'Garlic Naan' },
          { name: 'Pudina Paratha' },
          { name: 'Tandoori Roti' },
          { name: 'Plain Kulcha' },
          { name: 'Rumali Roti' }
        ]
      },
      {
        name: 'South Indian Rice',
        items: [
          { name: 'Bisi Bele Bath' },
          { name: 'Puliyogare' },
          { name: 'Coconut Rice' },
          { name: 'Vangi Bath' },
          { name: 'Lemon Chithranna' },
          { name: 'Sweet Pongal' }
        ]
      },
      {
        name: 'South Indian Breads',
        items: [
          { name: 'Akki Rotti' },
          { name: 'Ragi Rotti' },
          { name: 'Jowa Rotti' },
          { name: 'Masala Dosa' },
          { name: 'Thatte Idli' },
          { name: 'Kerala Parota' }
        ]
      }
    ]
  },
  {
    id: 'accompaniments',
    name: 'Accompaniments',
    subCategories: [
      {
        name: 'Kosambari & Salads',
        items: [
          { name: 'Hesarubele Kosambari' },
          { name: 'Carrot & Beetroot Kosambari' },
          { name: 'Corn Kosambari' },
          { name: 'Green Salad' },
          { name: 'Russian Salad' },
          { name: 'Fresh Fruit Salad' }
        ]
      },
      {
        name: 'Pallyas (Dry Curry)',
        items: [
          { name: 'Mix Vegetable Pallya' },
          { name: 'Beans & Carrot Pallya' },
          { name: 'Thondekai & Cashew Pallya' },
          { name: 'Aloo Fry' },
          { name: 'Bhindi Fry' },
          { name: 'Suvarnagedde Chops' }
        ]
      },
      {
        name: 'Raita & Gojju',
        items: [
          { name: 'Pineapple Raita' },
          { name: 'Boondi Raita' },
          { name: 'Onion & Cucumber Raita' },
          { name: 'Mango Gojju' },
          { name: 'Grape Gojju' },
          { name: 'Capsicum Gojju' }
        ]
      },
      {
        name: 'Pickles & Papad',
        items: [
          { name: 'Tender Mango Pickle' },
          { name: 'Avakkai' },
          { name: 'Mixed Veg Pickle' },
          { name: 'Masala Papad' },
          { name: 'Rice Papad' },
          { name: 'Sabbaki Sandige' }
        ]
      }
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts & Sweets',
    subCategories: [
      {
        name: 'Signature Sweets',
        items: [
          { name: 'Classic Mysorepak' },
          { name: 'Kesar Kalakand' },
          { name: 'Jilebi with Rabdi' },
          { name: 'Badusha' },
          { name: 'Jamoon Paradise' },
          { name: 'Malpua' }
        ]
      },
      {
        name: 'Premium Bengali Sweets',
        items: [
          { name: 'Rasmalai' },
          { name: 'Angoor Malai' },
          { name: 'Rasagulla Cham Cham' },
          { name: 'Badam Basket' },
          { name: 'Pista Roll' },
          { name: 'Kaju Katli' }
        ]
      },
      {
        name: 'Traditional Payasam',
        items: [
          { name: 'Tender Coconut Payasa' },
          { name: 'Mango Sabudana Payasa' },
          { name: 'Wheat Payasam' },
          { name: 'Dry Fruit Payasam' },
          { name: 'Kadalebele Payasam' },
          { name: 'Gasgase Payasam' }
        ]
      },
      {
        name: 'Authentic Holige',
        items: [
          { name: 'Coconut Holige' },
          { name: 'Dal Holige' },
          { name: 'Badam Halwa Holige' },
          { name: 'Dry Fruit Holige' },
          { name: 'Kashi Halwa Holige' },
          { name: 'Chocolate Holige' }
        ]
      },
      {
        name: 'Ice Creams & Fruits',
        items: [
          { name: 'Matka Kulfi' },
          { name: 'Rose Petal Icecream' },
          { name: 'Cassata Slice' },
          { name: 'Dragon Fruit Platter' },
          { name: 'Australian Cherry' },
          { name: 'Blackcurrant Scoop' }
        ]
      }
    ]
  }
]

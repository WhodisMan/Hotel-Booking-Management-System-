import image1 from '../assets/showcase1.jpg'
import image2 from '../assets/showcase2.jpg'
import image3 from '../assets/showcase3.jpg'
import image4 from '../assets/showcase4.jpg'
import image5 from '../assets/showcase5.jpg'
import image6 from '../assets/showcase6.jpg'
import image7 from '../assets/showcase7.jpg'
import image8 from '../assets/showcase8.jpg'
import image9 from '../assets/showcase9.jpg'
import image10 from '../assets/showcase10.jpg'



export const HotelDetail =[
    {
        id: 1,
        image: image1,
        title: 'Atliq Grands',
        desc: 'Escape to our luxurious resort and spa, nestled in the heart of breathtaking natural surroundings. Indulge in world-class amenities, rejuvenating spa treatments, and exquisite dining experiences. Experience the ultimate in relaxation and serenity at our resort.',

      },
      {
        id: 2,
        image: image2,
        title: 'Atliq Exotica',
        desc: 'Discover the charm of our seaside boutique hotel, located steps away from pristine sandy beaches. Immerse yourself in the tranquil coastal ambiance and enjoy breathtaking ocean views from our stylishly designed rooms. Experience coastal living at its finest.',

      },
      {
        id: 3,
        image: image3,
        title: 'Atliq City',
        desc: 'Unwind in our cozy mountain retreat lodge, surrounded by stunning peaks and lush forests. Experience the beauty of nature with hiking trails, mountain biking, and winter sports activities. Relax by the fireplace in our rustic yet elegant accommodations.',
      },
      {
        id: 4,
        image: image4,
        title: 'Atliq Blu',
        desc: 'Immerse yourself in the vibrant city life at our urban chic boutique hotel. Located in the heart of the bustling metropolis, our hotel offers stylish rooms, modern amenities, and easy access to shopping, dining, and entertainment venues. Experience the urban charm and sophistication.',

      },
      {
        id: 5,
        image: image5,
        title: 'Atliq Bay',
        desc: 'Step back in time at our historic inn and spa, where classic elegance meets modern comfort. Explore the rich history of the area and relax in our luxurious spa facilities. Indulge in gourmet dining and experience the timeless charm of our meticulously restored accommodations.',

      },
      {
        id: 6,
        image: image6,
        title: 'Atliq Palace',
        desc: 'Escape to our tropical paradise resort, located on a pristine island with white sandy beaches and crystal-clear turquoise waters. Immerse yourself in the tropical oasis with palm trees, exotic wildlife, and a range of water activities. Experience paradise like never before.',

      },
]


export const HotelRoomDetail = [
  {
      id: 1,
      name: "Atliq Grands",
      slug: "Luxury",
      city: "Delhi",
      price: 1000,
      images: image1,
      pets: false,
      breakfast: false,
      featured: false,
      description:
        "Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.",
      extras: [
        "Plush pillows and breathable bed linens",
        "Soft, oversized bath towels",
        "Full-sized, pH-balanced toiletries",
        "Complimentary refreshments",
        "Adequate safety/security",
        "Internet",
        "Comfortable beds",
      ],
  },
  {
      id: 2,
      name: "Atliq Exotica",
      slug : "Luxury",
      city: "Mumbai",
      price: 2000,
      pets: false,
      breakfast: true,
      featured: true,
      images: image2,
      description:
        "Indulge in luxury with our Deluxe Suite. This spacious and elegantly designed suite offers a comfortable and relaxing environment. Featuring a king-size bed, a separate living area, and a private balcony with stunning views, the Deluxe Suite is the perfect choice for a memorable stay.",
      extras: [
        "King-size bed with premium bedding",
        "Private balcony with panoramic views",
        "Spacious living area with comfortable seating",
        "Luxurious bathroom with soaking tub and rainfall shower",
        "Complimentary breakfast included",
        "Mini bar with a selection of beverages and snacks",
        "Free high-speed Wi-Fi",
      ],
  },
  {
      id: 3,
      name: "Atliq City",
      slug: "Business",
      city: "Mumbai",
      price: 3000,
      capacity: 4,
      pets: true,
      breakfast: true,
      featured: false,
      images: image3,
      description:
        "Our Family Suite is the perfect accommodation for a family getaway. With ample space and thoughtful amenities, this suite offers a comfortable and enjoyable stay for the whole family. It features multiple bedrooms, a spacious living area, and a fully equipped kitchenette.",
      extras: [
        "Multiple bedrooms with comfortable bedding",
        "Separate living area with a cozy seating arrangement",
        "Fully equipped kitchenette with modern appliances",
        "Dining area for family meals",
        "Complimentary breakfast included",
        "Pet-friendly accommodation",
        "Free Wi-Fi throughout the suite",
      ],
  },
  {
      id: 4,
      name: "Atliq Blu",
      slug: "Luxury",
      city: "Bangalore",
      price: 2500,
      capacity: 2,
      pets: false,
      breakfast: true,
      featured: true,
      images: image4,
      description:
        "Experience the ultimate luxury with our Executive Suite. This opulent suite offers a sophisticated and lavish ambiance with a spacious bedroom, a separate living area, and a private terrace overlooking the stunning city skyline.",
      extras: [
        "Luxurious king-size bed with premium linens",
        "Spacious living area with elegant furniture",
        "Private terrace with panoramic city views",
        "En-suite bathroom with marble accents and a spa bathtub",
        "Complimentary breakfast included",
        "24-hour room service",
        "Access to exclusive executive lounge",
      ],
  },
  {
      id: 5,
      name: "Atliq Bay",
      slug: "Luxury",
      city: "Bangalore",
      price: 3000,
      capacity: 1,
      pets: false,
      breakfast: false,
      featured: false,
      images: image5,
      description:
        "Our Standard Room offers a comfortable and cozy space for a relaxing stay. Featuring a comfortable single bed and essential amenities, it is perfect for solo travelers or those on a budget.",
      extras: [
        "Comfortable single bed with fresh linens",
        "En-suite bathroom with a shower",
        "Basic toiletries provided",
        "Workspace with a desk and chair",
        "Free Wi-Fi access",
        "Television with cable channels",
        "Room cleaning service",
      ],
  },
  {
      id: 6,
      name: "Atliq Palace",
      slug: "luxury",
      city: "Hyderabad",
      price: 5000,
      capacity: 6,
      pets: false,
      breakfast: true,
      featured: true,
      images: image6,
      description:
        "Experience the epitome of luxury with our stunning Luxury Villa. This spacious and exquisite villa features multiple bedrooms, a private pool, and breathtaking ocean views. It offers an unparalleled level of comfort and elegance for an unforgettable vacation.",
      extras: [
        "Multiple luxurious bedrooms with en-suite bathrooms",
        "Expansive living area with elegant furnishings",
        "Fully equipped gourmet kitchen",
        "Private pool with sun loungers and a dining area",
        "Panoramic ocean views from the terrace",
        "Complimentary breakfast included",
        "24-hour personalized concierge service",
      ],
  },
]
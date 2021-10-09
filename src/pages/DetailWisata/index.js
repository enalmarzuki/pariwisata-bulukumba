import React from 'react';
import {IMGPenginapan1, IMGWisata1, IMGWisata2} from '../../assets';
import {Detail} from '../../components';

const rooms = [
  {
    id: 1,
    image: IMGWisata1,
    title: 'Pantai Appalarang',
  },
  {
    id: 2,
    image: IMGWisata2,
    title: 'Pantai Ara',
  },
];

export default function index({navigation}) {
  return (
    <Detail
      isLodgingDetail
      cardNavigation="DetailWisata"
      navigation={navigation}
      image={IMGWisata1}
      titleSection="Pantai Bira, Kel. Bira"
      subTitleSection="Pantai Bira, Kel. Bira"
      description="Villa yang berdiri sejak tahun 2002, menawarkan fasiltias yang sangat lengkap dan langsung menghadap ke pantai. Telah banyak artis dan pejabat yang mempercayai villa kami ketika mereka sedang liburan ke bulukumba."
      roomsData={rooms}
    />
  );
}

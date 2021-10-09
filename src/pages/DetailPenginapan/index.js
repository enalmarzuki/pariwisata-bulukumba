import React from 'react';
import {IMGKamar1, IMGKamar2, IMGPenginapan1} from '../../assets';
import {Detail} from '../../components';

const rooms = [
  {
    id: 1,
    image: IMGKamar1,
    title: 'Kamar Reguler',
    subTitle: 'Rp. 180.000 / Malam',
  },
  {
    id: 2,
    image: IMGKamar2,
    title: 'Kamar Keluarga',
    subTitle: 'Rp. 220.000 / Malam',
  },
];

export default function index({navigation}) {
  return (
    <Detail
      isLodgingDetail
      cardNavigation="DetailKamar"
      navigation={navigation}
      image={IMGPenginapan1}
      titleSection="Villa Samata"
      subTitleSection="Pantai Bira, Kel. Bira"
      description="Villa yang berdiri sejak tahun 2002, menawarkan fasiltias yang sangat lengkap dan langsung menghadap ke pantai. Telah banyak artis dan pejabat yang mempercayai villa kami ketika mereka sedang liburan ke bulukumba."
      roomsData={rooms}
    />
  );
}

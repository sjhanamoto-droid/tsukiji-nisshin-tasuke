export interface MenuItem {
  name: string;
  price?: string;
  description: string;
  image?: string;
}

export interface ShopDetail {
  id: string;
  name: string;
  subtitle: string;
  address: string;
  tel: string;
  hours: string;
  heroImage: string;
  description: string[];
  access: string[];
  menuHighlights: MenuItem[];
  gallery: string[];
  googleMapsUrl: string;
}

export const SHOP_DETAILS: Record<string, ShopDetail> = {
  tsukiji: {
    id: 'tsukiji',
    name: '築地うなぎ食堂',
    subtitle: '築地場外市場の老舗うなぎ専門店',
    address: '〒104-0045 東京都中央区築地4-13-18',
    tel: '0120-17-0521',
    hours: '10:00〜20:00（不定休）',
    heroImage: '/images/backgrounds/bg.jpg',
    description: [
      '築地場外市場に店を構える、うなぎ専門店「築地うなぎ食堂」。私たちは「うなぎを、もっと日常に」をコンセプトに、本格的なうなぎ料理をお手頃な価格でお届けしています。',
      '職人が一枚一枚丁寧に焼き上げるうなぎは、直火でパリッと香ばしく、身はふっくら柔らか。秘伝のタレが絡んだ艶やかな照りと香りが自慢です。',
      'テレビや雑誌でも多数紹介され、Uber Eatsでは5,000件以上のレビューで平均★4.6以上の高評価を獲得。特許取得のJetChef加熱容器を使った宅配サービスにも対応しており、ご自宅でも出来立ての美味しさをお楽しみいただけます。',
    ],
    access: [
      '東京メトロ日比谷線「築地駅」1番・2番出口より徒歩5分',
      '都営大江戸線「築地市場駅」A1出口より徒歩3分',
      '築地場外市場内',
    ],
    menuHighlights: [
      {
        name: '築地うな重『葵』',
        price: '¥2,380',
        description: '肉厚のうなぎにこだわりのブドウ山椒を添えた、当店定番の一品。香ばしい蒲焼きの旨みをご堪能ください。',
        image: '/images/menu/aoi.jpg',
      },
      {
        name: '築地うな重『白蒲葵』',
        price: '¥2,380',
        description: '蒲焼と白焼きを一度にお楽しみいただける人気No.1の葵弁当。粒ゆず胡椒で頂くうなぎはまさに絶品。',
        image: '/images/menu/shirokabaaoi.jpg',
      },
      {
        name: '築地うな重『王』',
        price: '¥3,480',
        description: '大ぶりなうなぎを丸々一尾盛り付けた最高級うな重。テレビでもたびたび紹介される贅沢な逸品。',
        image: '/images/menu/ou.jpg',
      },
    ],
    gallery: [
      '/images/backgrounds/bg.jpg',
    ],
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d810.4!2d139.77083!3d35.66550!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bdf2f88d74d%3A0x0ce59baa2e7a3edb!2z%E7%AF%89%E5%9C%B0%E3%81%86%E3%81%AA%E3%81%8E%E9%A3%9F%E5%A0%82!5e0!3m2!1sja!2sjp',
  },
  kaminoge: {
    id: 'kaminoge',
    name: '築地ダイニング 金のうなぎ 上野毛店',
    subtitle: '築地場外市場発祥のうなぎ専門店',
    address: '〒158-0093 東京都世田谷区上野毛1丁目17-6',
    tel: '03-6432-2076',
    hours: '平日 11:00〜15:00 / 17:00〜20:00、土日祝 11:00〜20:00',
    heroImage: '/images/kinunagi/main.jpg',
    description: [
      '築地場外市場で培った目利きと技術を活かし、厳選された青手のニホンウナギを使用。ボリューム満点の鰻をお手頃価格でお腹いっぱいお召し上がりいただけます。',
      '「うなぎは高くて特別な日にしか食べられない」という常識を覆し、日常的にうなぎを楽しんでいただけるよう、品質と価格のバランスにこだわり続けています。',
      'お酒のラインナップも充実しており、地酒とともにうなぎを楽しむ贅沢なひとときをお過ごしいただけます。テイクアウト・デリバリーにも対応。',
    ],
    access: [
      '東急大井町線「上野毛駅」より徒歩2分',
    ],
    menuHighlights: [
      {
        name: '金のうな重【極上】',
        price: '',
        description: 'ご飯とうなぎが同等の重量。看板メニューとして多くのお客様にご愛顧いただいている自慢の一品。',
        image: '/images/menu/gokujo.png',
      },
      {
        name: '金のうな重【大王】',
        price: '',
        description: 'うなぎの下にもう一切れ隠された、ボリューム満点の特別なうな重。食べ応え抜群。',
        image: '/images/menu/daiou.png',
      },
      {
        name: '極みのひつまぶし【極上】',
        price: '',
        description: '名古屋スタイルのひつまぶし。そのまま・薬味で・出汁で——三つの味わいをお楽しみください。',
        image: '/images/menu/hitsumabushi.png',
      },
      {
        name: '築地のうなぎ飯',
        price: '',
        description: 'ランチに人気のお手軽メニュー。リーズナブルに本格うなぎを堪能できます。',
        image: '/images/menu/unagimeshi.png',
      },
    ],
    gallery: [
      '/images/kinunagi/main.jpg',
      '/images/kinunagi/shop1.jpg',
      '/images/kinunagi/unagi-king.jpg',
      '/images/kinunagi/hitumabusi.jpg',
      '/images/kinunagi/shirokabayaki.jpg',
    ],
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d810.7!2d139.63938!3d35.61236!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f443598b9f99%3A0xa6ddbc89dfd1cab5!2z%E9%87%91%E3%81%AE%E3%81%86%E3%81%AA%E3%81%8E%20%E4%B8%8A%E9%87%8E%E6%AF%9B%E5%BA%97!5e0!3m2!1sja!2sjp',
  },
  nakamurabashi: {
    id: 'nakamurabashi',
    name: '築地ダイニング 金のうなぎ 中村橋店',
    subtitle: '築地場外市場発祥のうなぎ専門店',
    address: '〒176-0024 東京都練馬区中村3丁目13-8',
    tel: '03-5848-6671',
    hours: '平日 11:00〜15:00 / 17:00〜20:00、土日祝 11:00〜20:00',
    heroImage: '/images/kinunagi/shop2.jpg',
    description: [
      '築地場外市場発祥のうなぎ専門店「金のうなぎ」の2号店。練馬区中村橋エリアに、リーズナブルな価格で本格的な鰻料理をお届けします。',
      '上野毛店と同じく、厳選された青手のニホンウナギを使用。職人が丁寧に焼き上げる香ばしいうなぎを、お気軽にお楽しみいただけます。',
      'テイクアウト・デリバリーにも対応しておりますので、ご自宅でのお食事にもぜひご利用ください。',
    ],
    access: [
      '西武池袋線「中村橋駅」より徒歩3分',
    ],
    menuHighlights: [
      {
        name: '金のうな重【極上】',
        price: '',
        description: 'ご飯とうなぎが同等の重量。看板メニューとして多くのお客様にご愛顧いただいている自慢の一品。',
        image: '/images/menu/gokujo.png',
      },
      {
        name: '金のうな重【大王】',
        price: '',
        description: 'うなぎの下にもう一切れ隠された、ボリューム満点の特別なうな重。食べ応え抜群。',
        image: '/images/menu/daiou.png',
      },
      {
        name: '極みのひつまぶし【極上】',
        price: '',
        description: '名古屋スタイルのひつまぶし。そのまま・薬味で・出汁で——三つの味わいをお楽しみください。',
        image: '/images/menu/hitsumabushi.png',
      },
    ],
    gallery: [
      '/images/kinunagi/shop2.jpg',
      '/images/kinunagi/unagi-king.jpg',
      '/images/kinunagi/shirokabayaki.jpg',
    ],
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d810.0!2d139.63897!3d35.73393!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018edbd99afe6d5%3A0x750dff9f52c6446c!2z%E9%87%91%E3%81%AE%E3%81%86%E3%81%AA%E3%81%8E%20%E4%B8%AD%E6%9D%91%E6%A9%8B%E5%BA%97!5e0!3m2!1sja!2sjp',
  },
};

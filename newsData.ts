export interface NewsArticle {
  id: string;
  date: string;
  category: string;
  title: string;
  paragraphs: string[];
  images?: string[];
}

export const NEWS_ARTICLES: Record<string, NewsArticle> = {
  'nenmatsu-2025': {
    id: 'nenmatsu-2025',
    date: '2025.12.30',
    category: 'お知らせ',
    title: '年内は12月31日15時まで、年始は1月4日から営業となります。',
    paragraphs: [
      '平素より格別のご愛顧を賜り、誠にありがとうございます。',
      '年内の営業は12月31日15時までとさせていただきます。年始は1月4日から通常営業となります。',
      '本年も多くのお客様にご来店いただき、心より感謝申し上げます。来年もより一層心を込めたお料理とサービスをお届けできるよう、スタッフ一同精進してまいります。',
      '寒さが厳しい折、どうぞお身体にお気をつけて、よいお年をお迎えください。',
    ],
    images: ['/images/news/nenmatsu.jpeg'],
  },
  'singapore-hanabi-2025': {
    id: 'singapore-hanabi-2025',
    date: '2025.06.28',
    category: 'イベント',
    title: 'シンガポール伊勢丹 花火祭り 開催中！Jet Chef弁当が大盛況',
    paragraphs: [
      'シンガポールのWWPで開催されている伊勢丹の「花火祭り」に当店が出店中です。',
      '話題のJet Chef弁当が、シンガポール市場でも大変ご好評をいただいております。紐を引くだけで、いつでもどこでも熱々の美味しさをお楽しみいただけます。',
      'お近くにお越しの際は、ぜひお立ち寄りください。',
    ],
    images: [
      '/images/news/singapore1.jpg',
      '/images/news/singapore2.jpg',
      '/images/news/singapore3.jpg',
      '/images/news/singapore4.jpg',
    ],
  },
  'jetchef-patent-2025': {
    id: 'jetchef-patent-2025',
    date: '2025.06.17',
    category: '特許',
    title: 'JET CHEF、さらなる進化へ！特許取得のお知らせ',
    paragraphs: [
      'この度、当社の加熱容器技術「JET CHEF」が特許を取得いたしました。',
      '紐を引くだけで電子レンジ不要、いつでもどこでも温かいお弁当をお届けできるJET CHEFの技術が、正式に特許として認められました。',
      '築地うなぎ食堂 | 有限会社にっしん太助を今後ともよろしくお願いいたします。',
    ],
    images: [
      '/images/news/patent.png',
      '/images/news/jetchef-logo.png',
    ],
  },
  'yochan-bento-trademark': {
    id: 'yochan-bento-trademark',
    date: '2025.06.12',
    category: '商標',
    title: 'YO CHAN BENTOは当店の商標登録商品です。',
    paragraphs: [
      'YO CHAN BENTOは、有限会社築地にっしん太助の商標登録商品です。',
      '当店のオリジナルキャラクター「YO-chan」を冠したお弁当ブランドとして、商標登録が完了いたしました。',
      '今後ともYO CHAN BENTOをよろしくお願いいたします。',
    ],
    images: ['/images/news/trademark.png'],
  },
};

import { NavItem, ShopInfo, NewsItem, ColumnItem } from './types';
import { Home, Info, Gift, Heart, BookOpen, Utensils, MapPin } from 'lucide-react';
import React from 'react';
import { assetUrl } from './lib/assets';

export const NAV_ITEMS: NavItem[] = [
  { label: 'TOP', href: '#hero' },
  { label: '私たちについて', href: '#about' },
  { label: 'ご利用シーン', href: '#foryou' },
  { label: '社会貢献', href: '#givingback' },
  { label: 'ストーリー', href: '#story' },
  { label: 'JetChef', href: '#jetchef' },
  { label: '店舗案内', href: '#locations' },
];

export const SHOPS: ShopInfo[] = [
  {
    id: 'tsukiji',
    name: '築地うなぎ食堂',
    address: '東京都中央区築地4-13-18',
    tel: '0120-17-0521',
    hours: '10:00〜20:00（不定休）',
    image: assetUrl('/images/backgrounds/bg.jpg'),
    description: '築地場外市場の活気を感じながら、職人が焼き上げる本物の味を。観光の合間にも最適です。',
  },
  {
    id: 'kaminoge',
    name: '築地ダイニング 金のうなぎ 上野毛店',
    address: '東京都世田谷区上野毛1丁目17-6',
    tel: '03-6432-2076',
    hours: '平日 11:00〜15:00 / 17:00〜20:00、土日祝 11:00〜20:00',
    image: assetUrl('/images/kinunagi/main.jpg'),
    description: '築地場外市場発祥のうなぎ専門店。ボリューム満点の鰻をお手頃価格でお腹いっぱいお召し上がりいただけます。',
  },
  {
    id: 'nakamurabashi',
    name: '築地ダイニング 金のうなぎ 中村橋店',
    address: '東京都練馬区中村3丁目13-8',
    tel: '03-5848-6671',
    hours: '平日 11:00〜15:00 / 17:00〜20:00、土日祝 11:00〜20:00',
    image: assetUrl('/images/kinunagi/shop2.jpg'),
    description: '築地場外市場発祥のうなぎ専門店。リーズナブルな価格で本格的な鰻料理をお楽しみいただけます。',
  },
];

export const COLUMNS: ColumnItem[] = [
  {
    id: '1',
    date: '2025.08.16',
    category: 'JetChef',
    title: '会議室がレストランに — JET CHEF 紐を引くだけ、どこでも温かいお弁当',
    image: assetUrl('/images/blog/delivery-cover.jpg'),
  },
  {
    id: '2',
    date: '2025.07.18',
    category: 'JetChef',
    title: 'JETCHEFとは？ 電子レンジ不要で温まるお弁当容器に込められた想いと技術',
    image: assetUrl('/images/blog/about-cover.jpg'),
  },
];

export const NEWS: NewsItem[] = [
  {
    id: 'nenmatsu-2025',
    date: '2025.12.30',
    category: 'お知らせ',
    title: '年内は12月31日15時まで、年始は1月4日から営業となります。',
  },
  {
    id: 'singapore-hanabi-2025',
    date: '2025.06.28',
    category: 'イベント',
    title: 'シンガポール伊勢丹 花火祭り 開催中！Jet Chef弁当が大盛況',
  },
  {
    id: 'jetchef-patent-2025',
    date: '2025.06.17',
    category: '特許',
    title: 'JET CHEF、さらなる進化へ！特許取得のお知らせ',
  },
  {
    id: 'yochan-bento-trademark',
    date: '2025.06.12',
    category: '商標',
    title: 'YO CHAN BENTOは当店の商標登録商品です。',
  },
];

export const ICONS = {
  Home,
  Info,
  Gift,
  Heart,
  BookOpen,
  Utensils,
  MapPin,
};
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        'caramel-gold': '#D89A40',       // 主按鈕、主標題、品牌視覺焦點

        // Secondary
        'vanilla-white': '#FFF4E6',      // 柔和背景、卡片底色
        'sage-green': '#B8C38F',         // hover 狀態、icon 底色
        'blush-nude': '#EFD8C5',         // 區塊分隔與裝飾

        // Accent
        'pistachio-green': '#A0C49D',    // button hover、特價標籤
        'honey-rose': '#E7BBA8',         // 精選標籤
        'amber-brown': '#8C4A2F',        // 小 icon、強調小標

        // Neutrals
        'milk-white': '#FFFFFF',         // 主背景
        'vanilla-beige': '#FAF5EF',      // 卡片與次區塊背景
        'coffee-brown': '#7C5A42',       // 主標題文字
        'dark-brown': '#5C4433',         // 一般段落文字
        'taupe-gray': '#B2A49A',         // 說明文字、副標
      },
    },
  },
  plugins: [],
}

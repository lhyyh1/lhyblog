/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "ba1e78a77a634a7f722be92c20f38804"
  },
  {
    "url": "assets/css/0.styles.68704805.css",
    "revision": "dba05f8fa14fd76a10443016cf9ac282"
  },
  {
    "url": "assets/img/20190408122521988.97e69c1c.png",
    "revision": "97e69c1c90d58f72afdb72ea3dd02f47"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.5a62e4bb.js",
    "revision": "fa6dc45301a66065281ff6d9b7ba7b35"
  },
  {
    "url": "assets/js/11.d21d05c8.js",
    "revision": "af8df7c09d9d91212fa29b098f76bbd6"
  },
  {
    "url": "assets/js/12.9892c7c3.js",
    "revision": "e910c6092ec69cf48d53880913c02fba"
  },
  {
    "url": "assets/js/13.3f7be324.js",
    "revision": "629989300232b115a46f2d94d63da44b"
  },
  {
    "url": "assets/js/14.bf80a139.js",
    "revision": "7318e8fd82b081f69e1c67f45b1d984e"
  },
  {
    "url": "assets/js/15.9af29553.js",
    "revision": "01c0daa55060a1ce7bc63af7de87404b"
  },
  {
    "url": "assets/js/16.957e5c08.js",
    "revision": "e96f88311956569333fe362d671fb256"
  },
  {
    "url": "assets/js/17.d9ea814b.js",
    "revision": "b42191e1eb5d2ea045765288a34d8b41"
  },
  {
    "url": "assets/js/18.fe60a8a6.js",
    "revision": "2ae3cc2131b83bc1af605c7099c20225"
  },
  {
    "url": "assets/js/19.e8b06bfe.js",
    "revision": "6e8b041e9e7b8a16f7367a3016cde4eb"
  },
  {
    "url": "assets/js/2.8d81c5f1.js",
    "revision": "479f542df1e1dc5b1131d5e329f018ce"
  },
  {
    "url": "assets/js/20.87eff516.js",
    "revision": "5bd1f59a891f18a28a0e18231c923712"
  },
  {
    "url": "assets/js/21.8658752e.js",
    "revision": "e0bc06824c37492b570b867738c62105"
  },
  {
    "url": "assets/js/22.30a3bde4.js",
    "revision": "abef3c73c6d1f42944e8aea74371c6cb"
  },
  {
    "url": "assets/js/23.347d7883.js",
    "revision": "b3b3cad57f60a82b665597feeba00906"
  },
  {
    "url": "assets/js/24.f6b7f30e.js",
    "revision": "0a93f540d6959176f63227dc6aab0c0e"
  },
  {
    "url": "assets/js/25.697e1d58.js",
    "revision": "a967c4eeaae26c4659e0e53d5bf6841c"
  },
  {
    "url": "assets/js/26.e99e4e5b.js",
    "revision": "bc62e4fbe7225b0938fc85fa5070ed03"
  },
  {
    "url": "assets/js/27.ecc78804.js",
    "revision": "72ba2889c12efd19b1189c8861a897f0"
  },
  {
    "url": "assets/js/28.c084aee1.js",
    "revision": "22455fdc2b5839354e9398cf4ae788a2"
  },
  {
    "url": "assets/js/29.18f2e46b.js",
    "revision": "49a408b19bf84bf1e84fd054dad50a22"
  },
  {
    "url": "assets/js/3.4aea83a5.js",
    "revision": "e7f76c990d643a97b62d0820583bbad7"
  },
  {
    "url": "assets/js/30.a8b1171b.js",
    "revision": "67836bb017ddff787a111f504c1ac8e2"
  },
  {
    "url": "assets/js/31.36b6b75b.js",
    "revision": "a4611fcd8e3e2bca21125b84f56b395d"
  },
  {
    "url": "assets/js/32.ba9a9510.js",
    "revision": "e4833d12dd269355a73d71e0ce38dd06"
  },
  {
    "url": "assets/js/33.e25e1bf9.js",
    "revision": "85636a9065a1df117228292045e8217a"
  },
  {
    "url": "assets/js/34.f90e5e6f.js",
    "revision": "09dc4c290afd874c859a650cef701664"
  },
  {
    "url": "assets/js/35.5229d417.js",
    "revision": "1fdc4e4b95155ba1080a46f048de0c79"
  },
  {
    "url": "assets/js/36.e98c59e6.js",
    "revision": "6bc3b104067cc89eafa0e409c50cd7ce"
  },
  {
    "url": "assets/js/37.d6baccb3.js",
    "revision": "aa873aaeb334d29ac5564bf41a74bd2b"
  },
  {
    "url": "assets/js/38.d8129f3a.js",
    "revision": "99c8853cb81415da2484d236b76edbf4"
  },
  {
    "url": "assets/js/39.7c1e8322.js",
    "revision": "d461bbfd8170073a84754224643c69a8"
  },
  {
    "url": "assets/js/4.6d213030.js",
    "revision": "661ecfb2e757ba406a2041caf89b4bf2"
  },
  {
    "url": "assets/js/5.806ca713.js",
    "revision": "6c09a180df9ef6cc2bd1313136440596"
  },
  {
    "url": "assets/js/6.753e5d29.js",
    "revision": "eb1edfefb489bd0d7baf3cf11df093cf"
  },
  {
    "url": "assets/js/7.4ec49768.js",
    "revision": "3befbe4b6e9f5a20c79b17d6a76de950"
  },
  {
    "url": "assets/js/8.f32da868.js",
    "revision": "719ea8d36d03881dae3154a18753a597"
  },
  {
    "url": "assets/js/9.3f41e8d6.js",
    "revision": "b7d7ecbb5e1d80698efb60deaa568481"
  },
  {
    "url": "assets/js/app.5d93db53.js",
    "revision": "e4c604bba514f3a49f80aeb6bdf03f7c"
  },
  {
    "url": "css/style.css",
    "revision": "0b02a4d4eb08ff7da2c3269bff75c4ca"
  },
  {
    "url": "docker/index.html",
    "revision": "516266d691279511a87f1bd1d550b2f1"
  },
  {
    "url": "go/base/index.html",
    "revision": "625faeffd9e55fe410876804f453750f"
  },
  {
    "url": "go/concurrent/index.html",
    "revision": "b0a89a238a35a6b1ccc1c804dbec9ada"
  },
  {
    "url": "go/env/index.html",
    "revision": "fef1f435189e731802b2c2b1be527a5a"
  },
  {
    "url": "go/gin/index.html",
    "revision": "095b4987d64fe33133fc731450432890"
  },
  {
    "url": "go/grammar/index.html",
    "revision": "07f2ee781b3e6bbe49471b7e8b2e2270"
  },
  {
    "url": "go/map/index.html",
    "revision": "f36b6fe6de65314ff44567623c9f0fb1"
  },
  {
    "url": "go/skills/index.html",
    "revision": "c1ce0a77e264bcffcec88349fb15d88c"
  },
  {
    "url": "go/standard/index.html",
    "revision": "7f12dd5d208bc912c4cd09e669b2993d"
  },
  {
    "url": "go/struct/index.html",
    "revision": "5f9ca482f4bc39e104027e173ea15aeb"
  },
  {
    "url": "image/03b0aac181c745ca942dc253d43e3b98.png",
    "revision": "8a5218ea5c8963044858727a9aa68ab8"
  },
  {
    "url": "image/57f156c98cf342f3bb048fa5783bf189.png",
    "revision": "863fcc1f37f0afceb5152448a006e24c"
  },
  {
    "url": "image/76e5770ff3434511b530618d46699d3c.png",
    "revision": "97cd18aa4f66bc308377f24ff4a6048b"
  },
  {
    "url": "image/air.png",
    "revision": "2ffa3ac0342468e7f191a379a2abdc30"
  },
  {
    "url": "image/air1.png",
    "revision": "cfe2142d78d468545c12976c1dcc49a8"
  },
  {
    "url": "image/go01.png",
    "revision": "29bd96350c5f619008101534a321b523"
  },
  {
    "url": "image/go02.png",
    "revision": "8591a5eacde67da217994eaf674ffa48"
  },
  {
    "url": "image/go03.png",
    "revision": "007b94f839e07f01cfee2891dac10a55"
  },
  {
    "url": "image/go04.png",
    "revision": "9825fff0ec6ae07827dbc247c24131a5"
  },
  {
    "url": "image/go05.png",
    "revision": "b79744bb68cb1020fb2869bb2634743e"
  },
  {
    "url": "image/go06.png",
    "revision": "bdacacac2cc9564f6c9d46b99644c869"
  },
  {
    "url": "image/go07.png",
    "revision": "7bc1df07652f787461f4c1a6205b4a5c"
  },
  {
    "url": "image/go08.png",
    "revision": "a7247c732a448996df5e6c10947d18bb"
  },
  {
    "url": "image/go09.png",
    "revision": "a4d86a3d5f6a4ef1f3d281c57cbc0cd4"
  },
  {
    "url": "image/go10.png",
    "revision": "486aa25d14d8f7ffcaebe024f76e570c"
  },
  {
    "url": "image/hangjianju001.png",
    "revision": "9056cb9858e29c810d2233d996ab010f"
  },
  {
    "url": "image/logo.jpg",
    "revision": "17d2822ad16eb55bbbee41fd05b1800e"
  },
  {
    "url": "image/post01.png",
    "revision": "bd407cab58d27a4cd64534740dff1f56"
  },
  {
    "url": "image/print.png",
    "revision": "6b7882743b342c6dc21f757c1826fa8e"
  },
  {
    "url": "image/print01.png",
    "revision": "56b88a5bdaa045dc7a5517d9676d3fa6"
  },
  {
    "url": "image/setter.png",
    "revision": "bae82564352dab327da57ba679f094b8"
  },
  {
    "url": "image/vue01.png",
    "revision": "ddcf8f1d5979dd5ae5b2290d9096d392"
  },
  {
    "url": "image/vue02.png",
    "revision": "e46676678e55eb99c0a77f11c4ec5fa8"
  },
  {
    "url": "image/vue03.png",
    "revision": "d76110194c2a25d6a0147f23e6af57ab"
  },
  {
    "url": "index.html",
    "revision": "4ba51e92bbf43c1748ee623d78044b7b"
  },
  {
    "url": "js/decode/index.html",
    "revision": "b6d7a4b58712c7910b4859e9ea58fa90"
  },
  {
    "url": "js/JavaScript/index.html",
    "revision": "8b51c9dba5e312310d68a649d5fae2c8"
  },
  {
    "url": "mysql/index.html",
    "revision": "925ca42b2a17b8d0194be094cc9e75fe"
  },
  {
    "url": "nginx/index.html",
    "revision": "e5912497a5ebd3921f236ad9ff13e940"
  },
  {
    "url": "php/base/index.html",
    "revision": "04a379f03e76752283cff363c68643f3"
  },
  {
    "url": "php/laravel/index.html",
    "revision": "06ddb8fddcf1477c59a42b59cd1785a5"
  },
  {
    "url": "php/skill/index.html",
    "revision": "1597f5f941337f33db33d488bc7b3d5b"
  },
  {
    "url": "print/index.html",
    "revision": "ab3f313161adf49f5778073c6910adf7"
  },
  {
    "url": "python/base/index.html",
    "revision": "c5919486e3de2261d9404f638e2bf57f"
  },
  {
    "url": "python/machine/index.html",
    "revision": "d89ee34716cc123d802a694f6621c6f4"
  },
  {
    "url": "tool/index.html",
    "revision": "0999c6c5e7c8560ce69c93469914ffc3"
  },
  {
    "url": "vue/assembly/index.html",
    "revision": "631f3d580b82521cb690fcc944715029"
  },
  {
    "url": "vue/base/index.html",
    "revision": "529964c2acfdb1ece35ca701650a0c17"
  },
  {
    "url": "vue/instruction/index.html",
    "revision": "08a76ab73af494d8180d0de047cd7701"
  },
  {
    "url": "vue/problem/index.html",
    "revision": "b08aa7b20aadf2923147dbc2866a0b37"
  },
  {
    "url": "vue/regular/index.html",
    "revision": "dfb70f52a4be8a8e8df36d386495a347"
  },
  {
    "url": "vue/uniApp/index.html",
    "revision": "6742d18d8768876177495cfdd7f22e10"
  },
  {
    "url": "vue/utils/index.html",
    "revision": "726069e33a6f7980724a6b8b60e301ed"
  },
  {
    "url": "web/case/index.html",
    "revision": "02266e3e2b40838e87d68e6793a04f1a"
  },
  {
    "url": "web/layout/index.html",
    "revision": "7dcdb44206f1e8f78e53f0eae40768e6"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})

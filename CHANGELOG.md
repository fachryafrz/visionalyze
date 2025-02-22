# Changelog

## [1.1.1](https://github.com/fachryafrz/visionalyze/compare/v1.1.0...v1.1.1) (2025-02-22)


### Bug Fixes

* update image size limit message to reflect 5MB constraint ([92d8346](https://github.com/fachryafrz/visionalyze/commit/92d83467ae34aa39e6d06423d7480a65173c78c3))

## [1.1.0](https://github.com/fachryafrz/visionalyze/compare/v1.0.0...v1.1.0) (2025-02-22)


### Features

* add typewriter effect for input placeholders in image generation and upload components ([6c39d80](https://github.com/fachryafrz/visionalyze/commit/6c39d808eee2d1815f24b88c52ea3e5cd8fec633))
* persist selected tab in localStorage for tab state management ([557516e](https://github.com/fachryafrz/visionalyze/commit/557516e2d3cc75c00d6f5937a59ea5d33ede5d81))
* refactor tab state management to use zustand with persistence in localStorage ([a5f9c2f](https://github.com/fachryafrz/visionalyze/commit/a5f9c2f445229364f2003df106c69d7a51dfc1fa))

## 1.0.0 (2025-02-22)


### Features

* add @vercel/analytics package and integrate analytics component in layout ([2e68e6e](https://github.com/fachryafrz/visionalyze/commit/2e68e6eddf03f2882a70859035983622852d2f0e))
* add additional origin to whitelist in middleware for CORS support ([78040a4](https://github.com/fachryafrz/visionalyze/commit/78040a427dc2c72954d5900e59d3c6a6011a244e))
* add CORS headers configuration to next.config and remove middleware file ([fcf5199](https://github.com/fachryafrz/visionalyze/commit/fcf5199e3338d66b9479281d4d6e5cd666ab570a))
* add debounce functionality to input handling in ImageUpload; store selected tab in localStorage; introduce constants for tab management ([76ee415](https://github.com/fachryafrz/visionalyze/commit/76ee415307ed093e6d0d86e29fc923aea2e6c4de))
* add favicon and logo assets for light and dark themes; update layout metadata for icons ([51f3a67](https://github.com/fachryafrz/visionalyze/commit/51f3a67a979b1257c737fd5d8986c0c3bc98c0f6))
* add features and how-it-works components; enhance image response layout and styling ([037a5d0](https://github.com/fachryafrz/visionalyze/commit/037a5d0301ddc51cf81b2eb815b123c1b2624654))
* add generate tab and integrate image generation functionality ([1716c35](https://github.com/fachryafrz/visionalyze/commit/1716c355419617b5ab31fbba91310dc20371a99f))
* add Google Analytics integration and update environment configuration ([f0802d6](https://github.com/fachryafrz/visionalyze/commit/f0802d69309c86fa5446a23598184b6b9a32dba7))
* add image downloading functionality and update chat ID handling ([c075c40](https://github.com/fachryafrz/visionalyze/commit/c075c40a0399eef04c202888aa3639e5583a34f3))
* add image prop to AnalyzeButton and conditionally render clear button ([4c0eb9e](https://github.com/fachryafrz/visionalyze/commit/4c0eb9e37dbb095c6d13ff1e740b5603d1c3ce11))
* add loading state management to image upload component ([265e635](https://github.com/fachryafrz/visionalyze/commit/265e635fcbb500cd3f4e4f5b69b63528e7f7a26b))
* add Logo component for theme-based branding in ImageUpload; update layout to include logo ([42668d0](https://github.com/fachryafrz/visionalyze/commit/42668d02582f6342b5b1ee11267b377bd96ec94c))
* add README_TEXT_ONLY.md with project introduction, features, and usage instructions ([9e9069f](https://github.com/fachryafrz/visionalyze/commit/9e9069f9ee08f631769504d4e3ae9867911a1e38))
* add robots meta tag configuration for SEO optimization ([a9e6b9d](https://github.com/fachryafrz/visionalyze/commit/a9e6b9d8159ac26164c77af0c2af567adb5ae3f4))
* add siteName and url to Open Graph metadata ([ac99e9c](https://github.com/fachryafrz/visionalyze/commit/ac99e9cf2fcfd24aee96e54f546379a22d1d9633))
* add Tabs component for file upload and URL input; refactor ImageUpload for improved user experience ([04b5c68](https://github.com/fachryafrz/visionalyze/commit/04b5c686a4a167c1c7a150eb6d8b68d1ef01fdbf))
* add theme provider, navigation bar, and loading spinner components; enhance layout and styling ([0544c5a](https://github.com/fachryafrz/visionalyze/commit/0544c5a2c1d341c91f8c295d3c101030c169f8e9))
* adjust padding in ImageUpload and ImageResponse components for better layout consistency ([7d20a99](https://github.com/fachryafrz/visionalyze/commit/7d20a993048fa2794059ecbdf5dc96f91632ecca))
* ask information about image with ai ([25f3562](https://github.com/fachryafrz/visionalyze/commit/25f3562d27445be442941b782a4349e16265c55c))
* disable clear button during loading state in image upload component ([8b203fd](https://github.com/fachryafrz/visionalyze/commit/8b203fd0da5245b6a70569c94af468a60d87ed12))
* enable server actions with a body size limit of 5mb in Next.js configuration ([e16213d](https://github.com/fachryafrz/visionalyze/commit/e16213d0967f7f299cf648c7be10630ca411ea8b))
* enable server actions with a body size limit of 5mb in Next.js configuration ([3ed9823](https://github.com/fachryafrz/visionalyze/commit/3ed9823f9706b71c7f58aa8cbc8a2e5dafa59ec4))
* enhance image upload error handling and use axios for fetching images ([921fbfd](https://github.com/fachryafrz/visionalyze/commit/921fbfdb388828eba26bf4217b4733ce00cfe968))
* enhance layout in ImageUpload and Tabs components for improved responsiveness ([cdd71ea](https://github.com/fachryafrz/visionalyze/commit/cdd71ea593d34a70e0ef3c7397e11b7296a4aeae))
* expand AI model options and set default to 'gemini-2.0-flash-lite-preview-02-05' ([23d9a6a](https://github.com/fachryafrz/visionalyze/commit/23d9a6a4a2d5a5722c1490f7b4e4ea4a0203487b))
* implement AnalyzeButton component for image upload actions ([9ac47a9](https://github.com/fachryafrz/visionalyze/commit/9ac47a930803aa1006a8b97ca0af8ed4089eb694))
* implement CORS middleware and update image analysis API integration ([13c66dd](https://github.com/fachryafrz/visionalyze/commit/13c66dd6fa6efbac3c12e48cff9e9f1d8fdc37cf))
* implement rate limiting and origin validation for image analysis API ([61887d3](https://github.com/fachryafrz/visionalyze/commit/61887d3dc45d1ddd1095b48321963f135281e94f))
* update button styles in ImageResponse component for improved UI consistency ([657fd99](https://github.com/fachryafrz/visionalyze/commit/657fd99969396589c4ecbfc137df33f103cd844f))
* update CORS whitelist to include new preview URL ([11c5a5b](https://github.com/fachryafrz/visionalyze/commit/11c5a5b6c6b472c7c9439224e59f9ee70fa22913))
* update dependencies and enhance image upload feedback with toast notifications ([a9b34aa](https://github.com/fachryafrz/visionalyze/commit/a9b34aa88ac33aefaefa30450d540a2f58a18e7e))
* update heading in ImageResponse component from 'Image' to 'Title' for clarity ([bfce37b](https://github.com/fachryafrz/visionalyze/commit/bfce37b72b774f3a16e29660817944f3c1173738))
* update ImageUpload to use resolvedTheme for logo variant; improve theme handling ([fb90a0c](https://github.com/fachryafrz/visionalyze/commit/fb90a0ccf8e504258cf46e2e78f11a3def27589f))
* update layout metadata to use environment variables; remove navigation bar component ([7f27316](https://github.com/fachryafrz/visionalyze/commit/7f2731621a60f1108746d025acd013f6609246bf))
* update manifest and layout icons to use maskable icons ([e369709](https://github.com/fachryafrz/visionalyze/commit/e369709a55537bd470fd9bb92314f8aefe25fc68))
* update ModeToggle component to use 'ghost' variant in navigation bar ([6f9325b](https://github.com/fachryafrz/visionalyze/commit/6f9325b5fb222e3c2fec220cf971eb7f13bf755c))
* update README with project introduction, features, and license; add LICENSE file ([558f481](https://github.com/fachryafrz/visionalyze/commit/558f481f15cd4e81a2c300c05d98b9f29bd80e97))
* update robots meta tag configuration in layout ([4ac7e8f](https://github.com/fachryafrz/visionalyze/commit/4ac7e8f654b096871a5b853b6b165eb53c2a264a))
* update robots meta tags to disallow indexing and add robots configuration ([2b6a0b6](https://github.com/fachryafrz/visionalyze/commit/2b6a0b6b318ffe2b68c67f42dbd8079a298f6a94))
* update setAnalyze method to accept null; reset analyze state in ImageUpload on tab change; disable inputs and buttons during loading ([6b30316](https://github.com/fachryafrz/visionalyze/commit/6b3031647be6a8dadfe2ef201edb9b8de897e595))


### Bug Fixes

* "limiter" is not a valid Route export field. ([6abc0cb](https://github.com/fachryafrz/visionalyze/commit/6abc0cb91c6b514566908b6816f08def32388e93))
* chat id increment; process indicator when asking ([97b41e2](https://github.com/fachryafrz/visionalyze/commit/97b41e23178adbf7459eea6bf6370fa9e5179a10))
* remove spaces from keywords in image response button ([2adece0](https://github.com/fachryafrz/visionalyze/commit/2adece04283c1cb43e7db7cfffdf53c7b6e3dbf9))
* update response message to clarify ownership of the website ([9a09351](https://github.com/fachryafrz/visionalyze/commit/9a09351cfcb70a0a625d64f676bfd85b84424c33))
* update shadow style for active tab trigger in tabs component ([27ed29d](https://github.com/fachryafrz/visionalyze/commit/27ed29def2fa089ad1dfc55f6a71608ecc3c2e12))

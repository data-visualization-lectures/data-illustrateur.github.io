---
title: "ナイチンゲールのローズチャート"
title_en: "Nightingale's Rose Chart"
description: "クリミア戦争での死因を示すフローレンス・ナイチンゲールのローズダイアグラム。"
excerpt: "クリミア戦争での死因を示すフローレンス・ナイチンゲールのローズダイアグラム。"
date: 2020-11-04T09:19:42+01:00
lastmod: 2020-11-04T09:19:42+01:00
draft: false
weight: 50
images: [RoseChart.png]
categories: ["News"]
tags: ["security", "performance", "SEO"]
contributors: ["Henk Verlinde"]
pinned: false
homepage: false
dataset: "nightingale"
msc: "RoseChart"
chartType: "Rose Chart / Coxcomb Chart"
---
[フローレンス・ナイチンゲールのローズダイアグラム](https://www.historyofinformation.com/detail.php?entryid=3815)の再現。データソース: Nightingale, F., Farr, W., & Smith, A. (1859). A contribution to the sanitary history of the British army during the late war with Russia. John W. Parker and Son.

まず、円を描き、「Month」で分割し、さらに結果のパイを「Type」で分割します。

{{<demo-video>}}k5uRvZO3-tw{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/rose-chart-1.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

次に、任意の円弧を選択し、その厚さを「Death」にバインドします。デフォルトのスケールタイプは線形（linear）ですが、面積が死亡数を表すように「Square Root（平方根）」に変更します。

{{<demo-video>}}y60deFGMp-I{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/rose-chart-2.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

最後に、各円弧の塗りつぶし色を「Type」にバインドし、カラーマッピングをカスタマイズします。

{{<demo-video>}}JDI1-iqndUM{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/rose-chart-3.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->
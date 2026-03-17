---
title: "株価"
title_en: "Stock Prices"
description: "2000年1月1日から2010年3月1日までの、Amazon、Apple、IBM、Microsoftの4社の月次株価。[d3noob.org](https://bl.ocks.org/d3noob/08af723fe615c08f9536f656b55755b4)でd3.jsを使用して作成された元の視覚化。"
excerpt: "2000年1月1日から2010年3月1日までの4社の月次平均株価。"
date: 2020-11-04T09:19:42+01:00
lastmod: 2020-11-04T09:19:42+01:00
draft: false
weight: 50
images: [stocks.png]
categories: ["News"]
tags: ["security", "performance", "SEO"]
contributors: ["Henk Verlinde"]
pinned: false
homepage: false
dataset: "stocks"
msc: "MultiLineGraph"
chartType: "Multi-Line Graph"
---
Amazon、Apple、IBM、Microsoftの4社の2000年1月1日から2010年3月1日までの月次株価。[d3noob.org](https://bl.ocks.org/d3noob/08af723fe615c08f9536f656b55755b4)でd3.jsを使用して作成された元の視覚化。

まず、線を描き、「Company」で繰り返し、各線を「Date」で高密度化（densify）します。

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/stocks-1.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

{{<demo-video>}}YiSKo66fyUc{{</demo-video>}}


次に、任意の線を選択し、その線の色（stroke color）を「Company」にバインドします。また、線を太くするために線の幅を変更しましょう。

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/stocks-2.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->
{{<demo-video>}}OAXaSKoV9I4{{</demo-video>}}

次に、ダイレクト選択ツールを使用して線内の任意の頂点を選択し、そのX位置を「Date」に、Y位置を「Price」にバインドします。

{{<demo-video>}}kWVWPrF1288{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/stocks-3.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

最後に、すべての線を同じチャートに表示し、同じスケールを共有させたいと考えています。これを行うには、最上位のコレクションを選択し、レイアウトを「Grid（グリッド）」から「None（なし）」に変更します。その後、チャートを読みやすくするために軸の範囲を調整できます。

{{<demo-video>}}PXvLTio7TWo{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/stocks-4.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->
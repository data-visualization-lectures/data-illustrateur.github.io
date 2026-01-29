---
title: "ビットコイン価格: 2013年 - 2018年"
description: "2013年4月28日から2018年4月23日までのビットコイン価格の推移。"
excerpt: "2013年4月28日から2018年4月23日までのビットコイン価格に関する時系列データ。"
date: 2020-11-04T09:19:42+01:00
lastmod: 2020-11-04T09:19:42+01:00
draft: false
weight: 50
images: [figure.png]
categories: ["News"]
tags: ["security", "performance", "SEO"]
contributors: ["Henk Verlinde"]
pinned: false
homepage: false
dataset: "bitcoin-price"
#  "/app/csv/bitcoin-price.csv"
chartType: "Area Chart"
msc: "AreaChart"
---
このエリアチャートは、2013年4月28日から2018年4月23日までのビットコイン価格の変動を示しています。[元の視覚化](https://d3-graph-gallery.com/graph/area_basic.html)はhttps://d3-graph-gallery.com/からのものです。

まず、長方形を描き、塗りつぶしの色を金色に設定し、「date」で高密度化（densify）します。

{{<demo-video>}}3Fd4rMwZ6L0{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/bitcoin-prices-1.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

次に、上部の頂点のいずれかを選択し、そのX位置を「date」にバインドします。下部の頂点についても同様に行い、既存の日付スケールとマージすることを選択します。Data Illustrator は頂点のX位置とエリアマークのX位置を区別しますが、ここでは「date」をエンコードするために前者を使用しています。

{{<demo-video>}}P2IgQ_e0nPU{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/bitcoin-prices-2.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

 最後に、エリアマークを選択し、その高さを「value」にバインドします。デフォルトでは、エリアチャートのベースラインは下部にありますが、「baseline」プロパティコントロールを使用して、ベースラインを上部または中央に変更できます。

 {{<demo-video>}}v6CBfIIUfJ8{{</demo-video>}}

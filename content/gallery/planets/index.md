---
title: "ゴルディロックス惑星"
title_en: "Goldilocks Worlds"
description: "どの惑星が居住可能で、生命にとってちょうど良い環境なのか？ 温度と質量が重要です。"
excerpt: "どの惑星が居住可能で、生命にとってちょうど良い環境なのか？ 温度と質量が重要です。"
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
dataset: "planets"
msc: "BubblePlot"
chartType: "Bubble Plot"
---
このバブルプロットは、1626個の惑星と、そのうちのどれが居住可能かを示しています。温度は暑すぎず寒すぎない必要があります。質量も役割を果たします。小さな惑星は大気を持つことができず、大きな惑星は押しつぶされるような大気を持つでしょう。[元の視覚化](http://www.nationalgeographic.com/astrobiology/goldilocks-worlds/)はJohn TomanioとXaquin G.V.（NGM STAFF）によるものです。ソース: アレシボにあるプエルトリコ大学のPlanetary Habitability LaboratoryのAbel Méndez。


まず、円を描き、データの各行で繰り返し、そのX位置を「hzd」（ハビタブルゾーン距離）に、Y位置を「mass」にバインドします。質量の大きい惑星を下に表示したいので、Y軸を反転させる必要があります。これを行うには、軸ハンドルを開始点を超えてドラッグします。また、質量の小さい惑星をより広げたいので、対数スケール（log scale）を選択してYエンコーディングをカスタマイズします。

{{<demo-video>}}0meBKAxDong{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/planets-1.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

次に、「radius」データ属性を使用して円の半径を、「hzd」を使用して塗りつぶし色をエンコードします。hzdの値は-3.0から3.0の範囲であるため、Data Illustrator はデフォルトで発散カラースケールを選択します。赤-黄-青のスケールを選択してカスタマイズできます。その後、円の不透明度を0.5に設定し、背景色を黒に設定します。円を直接ドラッグしてサイズを変更することもでき、サイズエンコーディングは維持されます。最後に、軸と凡例の色を薄い灰色に変更して、暗い背景から目立つようにします。

{{<demo-video>}}NHLZ9Q30CJQ{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/planets-2.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->
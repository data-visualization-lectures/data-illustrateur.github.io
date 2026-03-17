---
title: "米国の州における肥満と教育"
title_en: "Obesity vs. Education in U.S. States"
description: "米国の各州において、肥満は教育レベルと反比例の関係にあります。"
excerpt: "米国の各州にわたる肥満レベルと教育レベルの反比例関係。"
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
dataset: "obesityEducation"
msc: "SlopeGraph"
chartType: "Slope Graph"
---
この視覚化は、平均して、肥満の割合が学士号以上の学位を持つ人口の割合と反比例することを示しています。各線は米国の州を表します。左側の軸は肥満の割合を表し、右側の軸は高等教育を受けた人々の割合を表します。Alberto Cairoによって作成された[元の視覚化](http://www.thefunctionalart.com/2012/03/functional-art-has-cover_21.html)。


まず、線を描き、「State」で繰り返し、結果のコレクションのレイアウトを「none（なし）」に設定します。次に、各線の最初の頂点を選択し、そのY位置を「Obesity Percentage」にバインドします。同様に、2番目の頂点のY位置を「BA Degree Percentage」にバインドします。これら2つのエンコーディングで同じスケールを共有したいため、「BA Degree Percentage」にバインドするときに「Merge with Obesity Percentage（Obesity Percentageとマージ）」オプションを選択します。

{{<demo-video>}}UkvL_EO_vF4{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/slope-graph-1.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

次に、線のスタイルを設定しましょう。頂点を選択し、その形状を半径4ピクセルの円に設定します。次に、線を選択し、その線の色（stroke color）をカテゴリカルフィールド「Obesity vs. Higher Education」にバインドします。デフォルトのカラースケールは意図したものと正確には異なるため、2つのカテゴリの色をカスタマイズできます。また、線の太さを太くし、不透明度を変更しましょう。

{{<demo-video>}}Yr4eVUowGKo{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/slope-graph-2.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

最後に、軸ハンドルをドラッグして範囲を広げましょう。スケールがマージされているため、一方の軸ハンドルをドラッグすると、もう一方にも影響します。「BA Degree Percentage」のY軸の向きを右に反転させて、2つの軸がより対称的に見えるようにすることができます。

{{<demo-video>}}aqvhxrc8bwk{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/slope-graph-3.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

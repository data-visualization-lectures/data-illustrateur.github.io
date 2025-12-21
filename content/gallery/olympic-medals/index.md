---
title: "オリンピックメダル 2012"
description: "2012年夏季オリンピックにおける国別の金、銀、銅メダル数。"
excerpt: "2012年夏季オリンピックにおける国別の金、銀、銅メダル数。"
date: 2020-11-04T09:19:42+01:00
lastmod: 2020-11-04T09:19:42+01:00
draft: false
weight: 50
images: [medals.png]
categories: ["News"]
tags: ["security", "performance", "SEO"]
contributors: ["Henk Verlinde"]
pinned: false
homepage: false
dataset: "olympic-medals"
msc: "StackedBarChart"
chartType: "Stacked Bar Chart"
---
この視覚化は、2012年夏季オリンピックの国内オリンピック委員会（NOC）別のメダル数を示しています。参加した204のNOCのうち、85が少なくとも1つのメダルを獲得しました。この視覚化では、上位20のNOCを示しています。

まず、長方形を描き、「Country_Code」で繰り返し、さらに「Medal_Type」で分割します。

{{<demo-video>}}HqcvWdJWwuI{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/olympic-medals-1.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

次に、任意の長方形を選択し、その幅を「Count」に、塗りつぶし色を「Medal_Type」にバインドします。その後、インタラクティブな凡例を使用してカラーマッピングをカスタマイズします。

{{<demo-video>}}hjKUIcQP9Fw{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/olympic-medals-2.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

最後に、一番上のコレクションのグリッドレイアウトの水平方向の重力（gravity）を「right（右）」に変更して、バーを右揃えにします。X軸が自動的に反転することに注目してください。また、Y軸の向きを「right（右）」に変更し、軸パスを非表示にします。

{{<demo-video>}}cdFrr3u9qnw{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/olympic-medals-3.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->
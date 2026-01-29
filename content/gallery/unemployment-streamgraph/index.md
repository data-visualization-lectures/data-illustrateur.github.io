---
title: "産業別失業"
description: "2000年から2010年までの4つの産業における失業者数。"
excerpt: "2000年から2010年までの4つの産業における失業者数。"
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
dataset: "unemployment-2"
msc: "StreamGraph"
chartType: "Stream Graph"
---
この視覚化は、2000年から2010年までの4つの産業（製造業、レジャー・接客業、ビジネスサービス、建設業）における失業者数をストリームグラフ形式で示しています。[元の視覚化](https://observablehq.com/@d3/streamgraph)はobservablehq.comからのものです。

まず、長方形を描き、「industry」で分割し、結果の任意の長方形を選択して「date」で高密度化（densify）します。

{{<demo-video>}}6p6OzSW3W4o{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/streamgraph-1.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

次に、結果のエリアマークのいずれかの上部頂点を選択し、そのX位置を「date」にバインドします。下部頂点についても同様に行い、既存の日付スケールとマージすることを選択します。Data Illustrator は頂点のX位置とエリアマークのX位置を区別しますが、ここでは「date」をエンコードするために前者を使用しています。

次に、任意のエリアマークを選択し、その高さを「unemployments」に、塗りつぶし色を「industry」にバインドします。「industry」のY軸は色の凡例があるため不要なので、選択して削除できます。最後に、スタックレイアウトを使用して構成されているエリアマークのコレクションを選択し、垂直方向の重力（gravity）を「middle」に変更します。

{{<demo-video>}}sguV0pGgGcc{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/streamgraph-2.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

---
title: "車の特徴"
title_en: "Features of Cars"
description: "70年代と80年代の車の特徴的な値。"
excerpt: "平行座標プロットの形式での70年代と80年代の車の特徴的な値。"
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
dataset: "cars"
msc: "ParallelCoordinates"
chartType: "Parallel Coordinates Plot"
---
この平行座標プロットは、406台の車の特徴を示しています。元の視覚化はRobert Spenceの本[Information Visualization: an Introduction](https://books.google.com/books?id=uOosBQAAQBAJ&dq=406+cars+visualization&source=gbs_navlinks_s)の69ページに掲載されています。

まず、6つの頂点を持つパスを描きます。パスを平らで水平にするには、パスを描くときに「Shift」キーを押します。最後の頂点を描いた後、「Esc」キーを押します。次に、そのパスを選択し、データの各行に対して繰り返します。結果のコレクションには406のパスが含まれます。パス間のギャップを1ピクセルに変更し、レイアウトを「none（なし）」に設定して、データバインディングに進めるようにしましょう。

{{<demo-video>}}4MFzxB_CCqc{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/pcp-1.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

次に、ダイレクト選択ツールを使用してパス内の各頂点を選択し、Y位置をそれぞれ「economy(mpg)」、「cylinders」、「displacement(cc)」、「power(hp)」、「weight(lb)」、「year」にバインドします。

{{<demo-video>}}Po-WwHQqTm0{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/pcp-2.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

「year」軸のラベル形式をカスタマイズすることもできます。最後に、任意のパスを選択して、その線の色（stroke color）をシリンダー数にバインドし、配色をカスタマイズして、不透明度を変更します。

{{<demo-video>}}uDwBLXrufFw{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/pcp-3.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->
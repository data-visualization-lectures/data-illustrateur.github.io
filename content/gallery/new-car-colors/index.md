---
title: "新車の色の人気度"
title_en: "Color Popularity among New Cars"
description: "北米における新車の色のランキングの経年変化。"
excerpt: "北米における新車の色のランキングの経年変化。"
date: 2020-11-04T09:19:42+01:00
lastmod: 2020-11-04T09:19:42+01:00
draft: false
weight: 50
images: [car-colors.png]
categories: ["News"]
tags: ["security", "performance", "SEO"]
contributors: ["Henk Verlinde"]
pinned: false
homepage: false
dataset: "newCarColors"
msc: "BumpChart"
chartType: "Bump Chart"
---
このバンプチャートは、北米における新車の色のランキングが長年にわたってどのように変化しているかを示しています。マゼンタ色は「その他」の色を表します。[元の視覚化](https://public.tableau.com/profile/rody.zakovich#!/vizhome/TheUntanglingofColorPopularityamongNewCarsinNorthAmerica/TheUntanglingofColorPopularityforNewCars)はRody Zakovichによってデザインされました。

まず、線を描き、「Color」で繰り返し、各線を「Year」で高密度化（densify）します。

{{<demo-video>}}4EkWgxpT2gA{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/car-colors-1.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

次に、任意の線上の任意の頂点を直接選択し、X位置を「Year」に、Y位置を「Rank」にバインドします。

{{<demo-video>}}Gs9pkSdp1sI{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/car-colors-2.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

次に、折れ線のコレクションのレイアウトを「None（なし）」に変更し、線が同じY軸を共有するようにします。チャートを大きくするために軸のサイズを変更しましょう。また、ランキングを上から下に配置する方が直感的であるため、Y軸ハンドルをドラッグして反転させることができます。

{{<demo-video>}}n51Mjsel0Yo{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/car-colors-3.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

次に、任意の線を選択し、その線の色（stroke color）を「Color」にバインドし、線を太くします。これらの変更は他のすべての線に適用されます。視覚的なスタイルもカスタマイズしましょう。線のカーブモードを「Bump X」に変更し、頂点の形状を半径4の円に更新します。デフォルトでは、頂点の色は線の色と一致することに注意してください。

{{<demo-video>}}xA92He6y0YU{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/car-colors-4.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

最後に、背景色を変更し、インタラクティブな凡例を通じてカラーマッピングをカスタマイズして、色がその名前と一致するようにします。軸のテキストの色を変更して、読みやすくすることもできます。

{{<demo-video>}}55UJW_kuTnE{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/car-colors-5.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->
---
title: "ボストンの天気 2015"
title_en: "Boston Weather 2015"
description: "2015年のボストンにおける日別最高気温と最低気温。"
excerpt: "2015年のボストン（マサチューセッツ州）における日別最高、最低、平均気温。"
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
dataset: "bostonWeather"
chartType: "Range Chart"
msc: "RangeChart"
---
このレンジチャートは、ボストンにおける1年間の日別最高、最低、平均気温を示しています。[Raureif](https://raureif.net/)の[Timm Kekeritz](http://kekeritz.com/)による[元の視覚化](http://weather-radials.com/)は極座標空間でしたが、ここではデカルト空間で同様のデザインを作成する方法を示しています。

まず、（Shiftキーを押しながら）垂直線を描き、線の太さを3に設定し、それを「date」で繰り返します。

{{<demo-video>}}0lYPDBNM4uI{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/boston-weather-1.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

次に、結果のコレクション内の任意の線を選択し、そのX位置を「date」にバインドします。これにより、線はコレクションのグリッドレイアウトから外れ、X軸が作成されます。次に、ダイレクト選択ツールを使用して任意の線の上部頂点を選択し、そのY位置を「maxTemp」にバインドします。次に、任意の線の下部頂点を直接選択し、そのY位置を「minTemp」にバインドします。ここで、新しいスケールを作成するか、「maxTemp」から作成された既存のスケールとマージするかのオプションがあることに注意してください。スケールをマージし、Y軸ハンドルをドラッグして範囲を広げましょう。

{{<demo-video>}}oMRWfabSsWU{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/boston-weather-2.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

最後に、任意の線を選択し、その線の色（stroke color）を「meanTemp」にバインドします。Data Illustrator は自動的に配色と凡例を選択します。凡例の方向を「Horizontal（水平）」に変更し、凡例をチャートの下に移動できます。

{{<demo-video>}}ADCLgA7hlKk{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/boston-weather-3.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

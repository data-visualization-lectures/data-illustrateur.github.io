---
title: "NBAドラフト指名の20年"
title_en: "Twenty Years of NBA Draft Picks"
description: "ドラフト順に並べられ、1989年から2008年までの全体的な貢献度で色分けされたNBAプレーヤー。"
excerpt: "ドラフト順に並べられ、1989年から2008年までの全体的な貢献度で色分けされたNBAプレーヤー。"
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
dataset: "nbaRedraft"
msc: "HeatMap"
chartType: "Heatmap"
---
このヒートマップは、各プレーヤーをVORP（Value over Replacement Player：代替選手に対する価値）で色付けしています。VORPは、BPMレートを、理論上の「代替選手」（最低年俸の選手やチームのローテーションに含まれない選手と定義される）が提供するものと比較して測定された、チームへの全体的な貢献度の推定値に変換したものです。十分なプレイ時間がなかったプレーヤーには、-20のVORPが使用されます。

The Puddingの[Russell Goldenberg](http://russellgoldenberg.com/)による[元の視覚化](https://pudding.cool/2017/03/redraft/)。


まず、薄い長方形を描き、データの各行で繰り返し、そのX位置を「Draft_Year」に、Y位置を「Draft_Pick」にバインドします。まず、軸ハンドルをドラッグしてXスケールを広げましょう。最初のドラフト指名が一番上に表示されるようにしたいので、Y軸を反転させる必要があります。これを行うには、軸ハンドルを開始点を超えてドラッグします。

{{<demo-video>}}dPXcmQmoRxY{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/nba-redraft-1.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

次に、「VORP」を使用して塗りつぶし色をエンコードします。VORP値には正と負の両方の数値が含まれるため、Data Illustrator はデフォルトで発散カラースケールを選択します。その後、背景色を黒に設定し、X軸の向きを上に変更します。最後に、軸と凡例の色を薄い灰色に変更して、暗い背景から目立つようにします。

{{<demo-video>}}CJbli-R2S-E{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/nba-redraft-2.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->
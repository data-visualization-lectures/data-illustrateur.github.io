---
title: "配色と凡例"
title_en: "Color Scheme and Legend"
description: ""
date: 2020-08-27T19:23:18+02:00
lastmod: 2020-08-27T19:23:18+02:00
draft: false
images: []
menu:
  tutorials:
    parent: "encode"
weight: 120
toc: false
---

<div data-i18n-ja>

[データバインディング (data binding)](../bind) アクションが実行され、塗りつぶしの色または線の色を使用して変数をエンコードする場合、Data Illustrator は自動的に配色を選択し、凡例を作成しようとします。凡例はキャンバス内を自由に移動できます。

変数がカテゴリカル（質的変数）である場合、カテゴリ選色が選択されます。凡例の各色をクリックし、カラーピッカーで目的の色を選択することで、カラーマッピングを編集できます。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/legend-categorical.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

変数が量的変数である場合、Data Illustrator はデータ値に基づいて適切な配色を選択しようとします。たとえば、データ値に正の値と負の値の両方が含まれる場合、デフォルトの配色は、0 に対応する中間点を持つ発散型の配色（ダイバージング）になります。そうでない場合、デフォルトの配色は順次型の配色（シーケンシャル）になります。それぞれの色プロパティコントロールの設定アイコン <img width="18px" src="../DI_ScaleSetting.png"> をクリックし、利用可能なオプションのリストから配色を変更することで、別の配色を選択できます。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/legend-quant.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

</div>

<div data-i18n-en>

When a [data binding](../bind) action is performed to encode a variable using fill color or stroke color, Data Illustrateur tries to automatically choose a color scheme and create a legend. You can freely move the legend around in the canvas.

If the variable is categorical, a categorical color scheme is chosen. You can edit the color mapping by clicking each color in the legend and choosing a desired color in the color picker. 

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/legend-categorical.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

If the variable is quantitative, Data Illustrateur will try to choose an appropriate color scheme based on the data values. For example, if the data values comprise both positive and negative values, the default color scheme will be diverging, with a mid point corresponding to 0. Otherwise, the default color scheme will be sequential. You can choose a different color scheme by click on the settings icon <img width="18px" src="../DI_ScaleSetting.png"> in the respective color property control and change the color scheme from a list of available options.  

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/legend-quant.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

</div>

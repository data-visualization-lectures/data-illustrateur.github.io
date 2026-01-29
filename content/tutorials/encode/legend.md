---
title: "配色と凡例"
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
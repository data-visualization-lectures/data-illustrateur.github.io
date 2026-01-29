---
title: "高密度化 (Densify)"
description: ""
date: 2020-08-27T19:23:18+02:00
lastmod: 2020-08-27T19:23:18+02:00
draft: false
images: []
menu:
  tutorials:
    parent: "generate"
weight: 85
toc: false
---
高密度化（densify）アクションも、実行するには図形とカテゴリカル変数が必要です。カテゴリカル変数と開始する図形を与えると、高密度化アクションは図形に頂点を追加し、各頂点を個別の値と対応するデータ行に関連付けます。

たとえば、企業の株価に関するデータセットにおいて、最初に線を「Company」で繰り返すとします。各線は個別の企業値と、同じ企業値を共有するデータ行に関連付けられています。下の図では、青い線は「Microsoft」に関連付けられ、オレンジの線は「Amazon」に関連付けられています。

ここで、各線を「Date」で高密度化したいと仮定します。高密度化アクションは各線を複数のセグメントに分割し、各頂点は個別の「Date」値に関連付けられます。最初の頂点は「2006年1月1日」と対応する行に、2番目の頂点は「2006年2月1日」に関連付けられる、といった具合です。

{{< figure src="../densify.png" width="500px" alt="divide by data" caption="" class="border-0 mx-auto text-center" >}}

Data Illustrator でデータによって図形を高密度化するには、図形を選択し、ツールバーの「densify」ボタンをクリックします。どの変数で図形を高密度化するかを尋ねるダイアログが表示されます。Data Illustrator は、図形がどのように高密度化されるかのプレビューも表示します。変数を変更すると、プレビューが更新されます。高密度化後、個々の頂点を選択し、データパネルでそれに添付されたデータ行を確認してください。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/densify.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

高密度化操作の結果は、以下の図に示すように、図形と向きによって異なります。

{{< figure src="../densify-outcomes.png" width="660px" alt="divide by data" caption="" class="border-0 mx-auto text-center" >}}
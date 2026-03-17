---
title: "高密度化 (Densify)"
title_en: "Densify"
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

<div data-i18n-ja>

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

</div>

<div data-i18n-en>

The densify action also requires a shape and a categorical variable to run. Given a categorical variable and a shape to start with, the densify action adds vertices to a shape, and associates each vertex with a distinct value and the corresponding data rows.

For example, let's say we first repeat a line by "Company" in a dataset about companies' stock prices. Each line is associated with a distinct company value, and the data rows sharing the same company value. In the figure below, the blue line is associated with "Microsoft" while the orange line is associated with "Amazon".

Now assume we want to densify each line by "Date". The densify action divides each line into multiple segments, and each vertex is associated with a distinct date value. The first vertex is associated with "Jan 1, 2006" and the corresponding row, the second vertex associated with "Feb 1, 2006", and so on.

{{< figure src="../densify.png" width="500px" alt="divide by data" caption="" class="border-0 mx-auto text-center" >}}

To densify a shape by data in Data Illustrateur, select the shape and click the "densify" button in the Tool Bar. A dialog will appear, asking you which variable you want to densify the shape by. Data Illustrateur will also show you a preview of how the shape will be densified. Changing the variable will update the preview. After densifying, select an individual vertex and see the data rows attached to it in the Data Panel.

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/densify.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

The outcome of a densify operation depends on the shape and the orientation, as illustrated in the figure below. 

{{< figure src="../densify-outcomes.png" width="660px" alt="divide by data" caption="" class="border-0 mx-auto text-center" >}}

</div>

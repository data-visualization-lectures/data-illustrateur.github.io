---
title: "分割 (Divide)"
title_en: "Divide"
description: ""
date: 2020-08-27T19:23:18+02:00
lastmod: 2020-08-27T19:23:18+02:00
draft: false
images: []
menu:
  tutorials:
    parent: "generate"
weight: 80
toc: false
---

<div data-i18n-ja>

繰り返しアクションと同様に、分割（divide）アクションも、実行するには図形とカテゴリカル変数が必要です。カテゴリカル変数と開始する図形を与えると、分割アクションは図形を分割し、各図形を個別の値と対応するデータ行に関連付けます。

2012年オリンピックメダルデータセットを再度例として使用すると、長方形を変数「Country」で分割したいとします。このデータセットには20個の個別のCountry値があります。分割アクションは、長方形を20個の小さな長方形に分割します。これらの長方形の最初のものは、最初の値（「米国」）と、「Country」値として「米国」を共有する3つのデータ行に関連付けられます。2番目の長方形は、2番目の値（「中国」）と中国を表す3つのデータ行に関連付けられる、といった具合です。

{{< figure src="../divide.png" width="400px" alt="divide by data" caption="" class="border-0 mx-auto text-center" >}}

Data Illustrator でデータによって図形を分割するには、図形を選択し、ツールバーの「divide」ボタンをクリックします。どの変数で図形を分割するかを尋ねるダイアログが表示されます。Data Illustrator は、図形がどのように分割されるかのプレビューも表示します。変数を変更すると、プレビューが更新されます。分割後、個々の図形をダブルクリックして選択し、データパネルでそれに添付されたデータ行を確認してください。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/divide.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

分割操作の結果は、図形と向きによって異なります。下の図は、異なる図形と向きに対して分割がどのように機能するかを示しています。

{{< figure src="../divide-outcomes.png" width="660px" alt="divide by data" caption="" class="border-0 mx-auto text-center" >}}

</div>

<div data-i18n-en>

Like the repeat action, the divide action also requires a shape and a categorical variable to run. Given a categorical variable and a shape to start with, the divide action divides the shape, and associates each shape with a distinct value and the corresponding data rows.

Using the 2012 Olympic Medal dataset as an example again, let's say we want to divide a rectangle by the variable "Country". In this dataset, there are 20 distinct Country values. The divide action will divide the rectangle into 20 smaller rectangles. The first of these rectangles is associated with the first value ("United States") and the three data rows which share "United States" as their "Country" value; the second rectangle is associated with the second value ("China") and the three data rows representing China, and so on.

{{< figure src="../divide.png" width="400px" alt="divide by data" caption="" class="border-0 mx-auto text-center" >}}

To divide a shape by data in Data Illustrateur, select the shape and click the "divide" button in the Tool Bar. A dialog will appear, asking you which variable you want to divide the shape by. Data Illustrateur will also show you a preview of how the shape will be divided. Changing the variable will update the preview. After dividing, double click on an individual shape to select it and see the data rows attached to it in the Data Panel.

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/divide.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

The outcome of a divide operation depends on the shape and the orientation. The figure below illustrates how divide works for different shapes and orientations.

{{< figure src="../divide-outcomes.png" width="660px" alt="divide by data" caption="" class="border-0 mx-auto text-center" >}}

</div>

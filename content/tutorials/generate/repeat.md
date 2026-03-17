---
title: "繰り返し (Repeat)"
title_en: "Repeat"
description: ""
date: 2020-08-27T19:23:18+02:00
lastmod: 2020-08-27T19:23:18+02:00
draft: false
images: []
menu:
  tutorials:
    parent: "generate"
weight: 70
toc: false
---

<div data-i18n-ja>

繰り返し（repeat）アクションを実行するには、図形とカテゴリカルデータ変数が必要です。図形は任意のタイプ（線、長方形、円など）にすることができます。データ変数はカテゴリカルで、2つ以上の異なる値を含んでいる必要があります。2012年オリンピックメダルデータセットを例にとると、「Row ID」はカテゴリカル変数で、60個の個別の値が含まれています。「Country」はもう1つのカテゴリカル変数で、20個の個別の値が含まれています。「Count」はカテゴリカル変数ではなく、数値変数です。

{{< figure src="../repeat.png" width="400px" alt="repeat by data" caption="" class="border-0 mx-auto text-center" >}}

カテゴリカル変数と開始する図形を与えると、繰り返しアクションは図形を複製し、各図形を個別の値と対応するデータ行に関連付けます。たとえば、選択された変数が「Row ID」の場合、最初の図形は「R1」と最初のデータ行に関連付けられ、2番目の図形は「R2」と2番目の行に関連付けられる、といった具合です。選択された変数が「Country」の場合、最初の図形は「Country」値として「米国」を共有する最初の値（「米国」）と3つのデータ行に関連付けられ、2番目の図形は2番目の値（「中国」）と中国を表す3つのデータ行に関連付けられる、といった具合です。

Data Illustrator でデータによって図形を繰り返すには、まず[データセットをインポートしておく](../../data)必要があります。図形を選択し、ツールバーの「Repeat」ボタンをクリックします。Data Illustrator は、元の図形に加えて1つの複製された図形を持つ、繰り返しアクションのプレビューを表示します。図形を繰り返すためのデータ変数を選択すると、プレビューがそれに応じて更新されます。繰り返し後、個々の図形をダブルクリックして選択し、データパネルでそれに添付されたデータ行を確認してください。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/repeat.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

</div>

<div data-i18n-en>

The repeat action requires a shape and a categorical data variable to run. The shape can be of any type (e.g. line, rectangle, circle). The data variable must be categorical, containing more than one distinct values. Using the 2012 Olympic medal dataset as an example, "Row ID" is a categorical variable, containing 60 distinct values. "Country" is another categorical variable, containing 20 distinct values. "Count" is not a categorical variable, it is numerical.

{{< figure src="../repeat.png" width="400px" alt="repeat by data" caption="" class="border-0 mx-auto text-center" >}}

Given a categorical variable and a shape to start with, the repeat action duplicates the shape, and associate each shape with a distinct value and the corresponding data rows. For example, if the chosen variable is "Row ID", the first shape is associated with "R1" and the first data row, the second shape associated with "R2" and the second row, and so on. If the chosen variable is "Country", the first shape is associated with the first value ("United States") and the three data rows which share "United States" as their "Country" value; the second shape is associated with the second value ("China") and the three data rows representing China, and so on.

To repeat a shape by data in Data Illustrateur, you must have [imported a dataset first](../../data). Select the shape and then click the "Repeat" button in the Tool Bar. Data Illustrateur will show a preview of the repeat action, with one duplicated shape in addition to the original one. You can choose the data variable to repeat the shape by, and the preview will update accordingly. After repeating, double click on an individual shape to select it and see the data rows attached to it in the Data Panel.

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/repeat.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

</div>

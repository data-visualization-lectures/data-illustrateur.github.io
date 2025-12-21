---
title: "コレクションと子要素の順序"
description: ""
date: 2020-08-27T19:23:18+02:00
lastmod: 2020-08-27T19:23:18+02:00
draft: false
images: []
menu:
  tutorials:
    parent: "groups"
weight: 90
toc: false
---
繰り返しおよび分割アクションは、図形の **コレクション (Collection)** を生成します。コレクションは、図形の「グループ」と考えることができます。コレクション内のすべての図形は同じタイプ（例：長方形、線、パス）であり、同じカテゴリカル変数の値を表します。コレクション内の各図形は、カテゴリカル変数のユニークな値を表します。

Data Illustrateur では、選択されたコレクションは、下の図に示すように、緑色の破線の境界線で描画されます。
コレクション内の図形を選択するには、図形をダブルクリックします。これによりコレクションが「開き」、境界線がより薄い緑色に変わります。

{{< figure src="../collection.png" width="600px" alt="divide by data" caption="" class="border-0 mx-auto text-center" >}}

#### 子要素の順序 (Children Order)
デフォルトでは、コレクション内の図形の順序は、それらがデータテーブル内で表すカテゴリカル変数値の順序によって決まります。データテーブル内の任意の変数を使用して、コレクション内の図形を昇順または降順でソートできます。これを行うには、コレクションを選択し、子要素をソートするデータ変数を選択して、トグルボタンをクリックして昇順または降順を切り替えます。

{{< rawhtml >}} 
<video width=800px class="tutorial-video" controls>
    <source src="/videos/children-order.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}
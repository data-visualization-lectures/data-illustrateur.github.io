---
title: "コレクションと子要素の順序"
title_en: "Collection & Children Order"
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

<div data-i18n-ja>

繰り返しおよび分割アクションは、図形の **コレクション (Collection)** を生成します。コレクションは、図形の「グループ」と考えることができます。コレクション内のすべての図形は同じタイプ（例：長方形、線、パス）であり、同じカテゴリカル変数の値を表します。コレクション内の各図形は、カテゴリカル変数のユニークな値を表します。

Data Illustrator では、選択されたコレクションは、下の図に示すように、緑色の破線の境界線で描画されます。
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

</div>

<div data-i18n-en>

The repeat and divide actions generate a **collection** of shapes. You may think of a collection as a "group" of shapes, where all the shapes in a collection have the same type (e.g., rectangle, line, path) and represent values of the same categorical variable. Each shape in a collection represents a unique value of the categorical variable. 

In Data Illustrateur, a selected collection is drawn with a green dashed border, as shown in the figure below. 
To select a shape inside a collection, double click on the shape. This will "open up" the collection, and its border is changed to a lighter shade of green.

{{< figure src="../collection.png" width="600px" alt="divide by data" caption="" class="border-0 mx-auto text-center" >}}

#### Children Order
By default, the order of the shapes in a collection is determined by the order of the categorical variable values they represent in the data table. You can use any variable in the data table to sort the shapes in a collection, either in ascending or descending order. To do this, select the collection, and choose the data variable to sort the children, and click the toggle button to switch between ascending or descending order.

{{< rawhtml >}} 
<video width=800px class="tutorial-video" controls>
    <source src="/videos/children-order.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

</div>

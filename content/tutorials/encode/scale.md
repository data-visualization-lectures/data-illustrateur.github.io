---
title: "スケール: タイプ、アグリゲーター、再利用"
description: ""
date: 2020-08-27T19:23:18+02:00
lastmod: 2020-08-27T19:23:18+02:00
draft: false
images: []
menu:
  tutorials:
    parent: "encode"
weight: 115
toc: false
---

[データバインディング (data binding)](../bind) アクションが実行されるたびに、Data Illustrator は基礎となるスケールを作成します。これは、変数のデータ値が視覚的プロパティの値にどのようにマッピングされるかを指定するものです。データ変数が数値の場合、デフォルトでは Data Illustrator は線形（リニア）スケールタイプを選択します。以下の例では、[ナイチンゲールのローズダイアグラム](https://www.historyofinformation.com/detail.php?entryid=3815)を作成するために、分割を2回実行しています。次に、「Death」変数を円弧の厚さにバインドします。デフォルトのスケールタイプは線形ですが、これでは誤解を招く可能性があります。本当に表現したいのは、円弧の面積を使用した死亡者数です。これを行うには、厚さプロパティコントロールの設定アイコン <img width="18px" src="../DI_ScaleSetting.png"> をクリックし、スケールタイプを「平方根 (square root)」に変更します。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/scale-type.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

オブジェクトが複数行のデータを表す場合、データがどのように集計（アグリゲート）されるかによって、視覚的プロパティにバインドされる最終的な値が決まります。以下の例では、コレクション内の各長方形は支出カテゴリを表し、4行のデータに対応しています。「Percentage」変数を長方形の高さにバインドすると、Data Illustrator はデフォルトのアグリゲーターとして「合計 (Sum)」を使用し、各長方形の4行の「Percentage」値の合計を計算します。この合計値を使用してスケールが作成されます。アグリゲーターを変更するには、図形を選択し、高さプロパティコントロールの設定アイコン <img width="18px" src="../DI_ScaleSetting.png"> をクリックします。ドロップダウンメニューから別のアグリゲーターを選択できます。視覚化と軸はそれに応じて更新されます。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/aggregator.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

特定の視覚化デザインには複数のデータバインディングが含まれており、これらのバインディングが同じスケールを共有することが理にかなっている場合があります。以下の例では、ガントチャートを作成したいと考えています。まず、長方形を「Task」で繰り返し、各長方形がタスクを表すようにします。次に、左側のセグメントを直接選択し、「Start Date」をそのX位置にバインドします。次に、右側のセグメントを直接選択し、そのX位置にバインドする変数を選択する際、ドロップダウンメニューには次のオプションが表示されます：1) 新しいスケールを作成する、2) 既存の「Start Date」スケールとマージする。このデザインでは、スケールをマージする方が理にかなっています。「End Date」を右側のセグメントのX位置にバインドしてスケールをマージすることを選択すると、左側と右側の両方のセグメントの位置を制御する単一のスケールと軸が作成されます。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/scale-reuse.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}
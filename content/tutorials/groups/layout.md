---
title: "レイアウト"
description: ""
date: 2020-08-27T19:23:18+02:00
lastmod: 2020-08-27T19:23:18+02:00
draft: false
images: []
menu:
  tutorials:
    parent: "groups"
weight: 95
toc: true
---
コレクション内のアイテムは、**レイアウト (layout)** を使用して配置できます。Data Illustrator は、グリッド (grid)、スタック (stack)、パック (pack)、ツリーマップ (treemap)、および なし (none) の各レイアウトを提供します。プロパティインスペクタパネルのコントロールを使用して、コレクションに適用されるレイアウトを変更できます。

### グリッドレイアウト (Grid Layout)
デフォルトでは、[繰り返し (repeat)](../../generate/repeat) 操作を使用して生成された図形は、グリッドレイアウトに配置されます。グリッドレイアウトのパラメータには、行数、行間隔、列数、列間隔、水平および垂直方向の重力 (gravity) が含まれます。重力パラメータは、各グリッドセル内の図形がセルの左、中央、右、上、中央、下のいずれに配置されるかを決定します。Data Illustrator では、すべてのパラメータをプロパティインスペクタのコントロールで変更できます。さらに、行間隔と列間隔は、グリッドの行と列の間にあるピンク色の長方形をドラッグすることで変更できます。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/grid.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

### スタックレイアウト (Stack Layout)
デフォルトでは、[分割 (divide)](../../generate/divide) 操作を使用して生成された図形は、スタックレイアウトに配置されます。
スタックレイアウトのパラメータには、方向 (orientation)、水平および垂直方向の重力 (gravity) が含まれます。重力パラメータは、各グリッドセル内の図形がセルの左、中央、右、上、中央、下のいずれに配置されるかを決定します。Data Illustrator では、すべてのパラメータをプロパティインスペクタのコントロールで変更できます。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/stack.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

### パックレイアウト (Pack Layout)
パックレイアウトは、以下の図に示すように、円のコレクションに適用できます。

{{< figure src="../pack.png" width="400px" alt="divide by data" caption="" class="border-0 mx-auto text-center" >}}

### ツリーマップレイアウト (Treemap Layout)
ツリーマップレイアウトは、以下の図に示すように、長方形のコレクションに適用できます。

{{< figure src="../treemap.png" width="400px" alt="divide by data" caption="" class="border-0 mx-auto text-center" >}}

### なし (None)
コレクションのレイアウトを「なし (None)」に変更することもできます。そうすると、図形を自由に移動させたり、図形の視覚的プロパティにデータエンコーディングを適用したりできるようになります。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/none.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}
---
title: "軸 (Axis)"
title_en: "Axis"
description: ""
date: 2020-08-27T19:23:18+02:00
lastmod: 2020-08-27T19:23:18+02:00
draft: false
images: []
menu:
  tutorials:
    parent: "encode"
weight: 107
toc: false
---

<div data-i18n-ja>

[繰り返し (repeat)](../../generate/repeat) アクションや[データバインディング (data binding)](../bind) アクションが実行されると、Data Illustrator は自動的に軸を作成しようとします。X軸は垂直方向に、Y軸は水平方向に自由に移動できます。プロパティインスペクタを使用して、軸のパスを表示するか、目盛りを表示するか、タイトルを表示するか、軸の方向、線の色、テキストの色、軸のパスの位置、目盛りのオフセット、目盛りのサイズ、ラベルのオフセット、ラベルのフォーマット、ラベルの回転など、軸のプロパティをカスタマイズすることもできます。下の図は、これらのプロパティの一部を示しています。

{{< figure src="../axis.png" width="650px" alt="axis components" caption="" class="border-0 mx-auto text-center" >}}

変数を位置にバインドした結果として軸が作成された場合、軸の範囲をカスタマイズできます。これを行うには、軸の上にマウスを置くと、緑色の範囲コントロールが表示されます。このコントロールをドラッグすると、軸の範囲の広がりを調整できます。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/axis-range.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

デフォルトでは、水平の数値軸は左から右へ、垂直の数値軸は下から上へと進みます。軸の方向を変更する必要がある場合は、範囲コントロールを開始点を超えてドラッグすると、軸が反転します。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/axis-flip.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

Data Illustrator は、レイアウトの重力 (gravity) プロパティに基づいて数値軸の方向を自動的に変更することも行います。たとえば、グリッドレイアウトを持つコレクション内で図形が上部に配置されている場合、軸は反転して上部から開始されます。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/axis-gravity.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

</div>

<div data-i18n-en>

When a [repeat](../../generate/repeat) action or a [data binding](../bind) action is performed, Data Illustrateur tries to automatically create an axis. An x-axis can be freely moved vertically, and a y-axis can be freely moved horizontally. You can also customize the following properties of an axis through the Property Inspector: whether to show axis path, whether to show axis ticks, whether to show axis title, axis orientation, stroke color, text color, position of axis path, tick offset, tick size, label offset, label format, and label rotation. The figure below illustrates some of these properties:

{{< figure src="../axis.png" width="650px" alt="axis components" caption="" class="border-0 mx-auto text-center" >}}

If an axis is created as a result of binding a variable to position, you can customize the axis range. To do so, hover over the axis, a green range control will appear. Dragging the control will adjust the axis range extent. 

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/axis-range.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

By default, a horizontal numerical axis goes from left to right, and a vertical one goes from bottom to top. If you need to change the direction of axis, dragging the range control past the starting point flips the axis. 

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/axis-flip.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

Data Illustrateur also automatically changes the direction of numerical axes based on the layout's gravity property. If shapes are aligned to the top inside a collection with a grid layout, for example, the axis will flip to start from the top.

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/axis-gravity.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

</div>

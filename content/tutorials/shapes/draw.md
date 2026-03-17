---
title: "描画と図形の操作"
title_en: "Draw and Manipulate Shapes"
description: ""
date: 2022-08-27T18:06:38-04:00
lastmod: 2022-08-27T18:06:38-04:00
draft: false
images: []
menu:
  tutorials:
    parent: "shapes"
weight: 45
toc: false
---

<div data-i18n-ja>

キャンバス上に長方形/円/線/リングを描画するには、ツールバーで対応する図形ツールを選択し、キャンバスをクリックして、図形が目的のサイズになるまでドラッグし、マウスを放します。長方形ツールを選択して描画する場合、Shiftキーを押したままにすると正方形になります。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/draw.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}


<!-- ; 楕円ツールを選択して描画する場合、Shiftキーを押したままにすると円になります。 -->
キャンバス上の図形のサイズを変更するには、アンカーハンドルの1つをドラッグします。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/resize.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

キャンバスにテキストアイテムを追加するには、テキストツールを選択し、キャンバスをクリックして入力を開始します。テキストを選択してアンカーハンドルをドラッグすることで、フォントサイズを変更できます。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/text.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

キャンバス上に自由形式のパスを描画するには、ペンツールを選択します。キャンバスをクリックするたびに新しい頂点が生成され、その点までパスが延長されます。閉じたパスを作成するには、最初の頂点をクリックしてパスを終了します。開いたパスを作成するには、作成したい最後の頂点をクリックした後に「Esc」キーを押します。「カーブモード (Curve Mode)」プロパティを通じて、頂点の接続方法を変更できます。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/path.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

</div>

<div data-i18n-en>

To draw a rectangle/circle/line/ring on the canvas, select the corresponding shape tool in the Tool Bar, click on the canvas and drag until the shape is your desired size, then release the mouse. If you draw with the rectangle tool selected, holding down the Shift key will give you a square.

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/draw.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}


<!-- ; if you draw with the ellipse tool selected, holding down the Shift key will give you a circle. -->
To resize a shape on the canvas, drag one of the anchor handles:

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/resize.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

To add a text item on the canvas, select the Text Tool, click on the canvas, and start typing. You can change the font size by selecting the text and dragging the anchor handle. 

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/text.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

To draw a freefrom path on the canvas, select the Pen Tool, every click on the canvas generates a new vertex and extends the path to that point. To create a closed path, finish the path by clicking on the first vertex. To create an open path, press the "esc" key after the last vertex you want to create. You can change how the vertices are connected through the "Curve Mode" property.

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/path.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

</div>

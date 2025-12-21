---
title: "描画と図形の操作"
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
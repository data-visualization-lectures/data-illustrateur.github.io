---
title: "軸 (Axis)"
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
[繰り返し (repeat)](../../generate/repeat) アクションや[データバインディング (data binding)](../bind) アクションが実行されると、Data Illustrateur は自動的に軸を作成しようとします。X軸は垂直方向に、Y軸は水平方向に自由に移動できます。プロパティインスペクタを使用して、軸のパスを表示するか、目盛りを表示するか、タイトルを表示するか、軸の方向、線の色、テキストの色、軸のパスの位置、目盛りのオフセット、目盛りのサイズ、ラベルのオフセット、ラベルのフォーマット、ラベルの回転など、軸のプロパティをカスタマイズすることもできます。下の図は、これらのプロパティの一部を示しています。

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

Data Illustrateur は、レイアウトの重力 (gravity) プロパティに基づいて数値軸の方向を自動的に変更することも行います。たとえば、グリッドレイアウトを持つコレクション内で図形が上部に配置されている場合、軸は反転して上部から開始されます。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/axis-gravity.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

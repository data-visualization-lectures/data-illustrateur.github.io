---
title: "頂点の位置エンコーディング"
description: ""
date: 2020-08-27T19:23:18+02:00
lastmod: 2020-08-27T19:23:18+02:00
draft: false
images: []
menu:
  tutorials:
    parent: "encode"
weight: 110
toc: true
---

Data Illustrateur のユニークな機能として、データを頂点やセグメントのプロパティにバインドする機能があります。この機能は、図形のプロパティだけでは記述が難しい視覚化デザインに便利です。データバインディングの動作は、頂点が手書きで描かれたものか、または[高密度化 (densify)](../../generate/densify) アクションによって生成されたものかによって異なります。

### 手書きで描かれた頂点
ラインツールまたはパスツールを使用してパスを描画する場合、頂点は手書きで描画されます。データを基にパスを繰り返した場合でも、Data Illustrateur は繰り返されたパス上の頂点を手書きで描画されたものとみなします。Data Illustrateur は現在、長方形、円、円弧の頂点へのデータのバインドを許可していません。

以下の例は、手書きで描画された頂点にデータをバインドして、三角形の棒グラフを作成する方法を示しています。まず、ペンツールを使用して三角形を描き、「Country」で繰り返します。次に、ダイレクト選択ツールを使用して上部の頂点を選択します。データにバインドされるすべての頂点がハイライト表示されます。頂点のY位置を変数「Count」にバインドします。ここで、データバインディングは各三角形の上部の頂点にのみ影響し、三角形の他の頂点は影響を受けないことに注意してください。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/bind-vertex-drawn.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

### 高密度化されたパス内の頂点
データによって線を[高密度化 (densify)](../../generate/densify)すると、頂点が生成され、データに関連付けられます。バインディングアクションは、パス上のすべての頂点に適用されます。以下の例では、各線が企業の経時的な株価を表す折れ線グラフの「スモールマルチプル（小さなグラフを並べたもの）」を作成します。まず、線に対して繰り返しアクションを実行し、線をグリッドレイアウトに配置します。各線は「company」を表します。次に、「Date」で線を高密度化します。最後に、「date」を頂点のX位置に、「price」を頂点のY位置にバインドします。最終的な結果は、グリッドに配置された折れ線グラフのセットになります。レイアウトパラメータを変更して、折れ線グラフをさまざまな方法で配置できます。

スモールマルチプルを前提として、コレクションのレイアウトを「なし (None)」に変更して、折れ線グラフが同じ軸を共有するようにすることもできます。レイアウトが削除されると、Data Illustrateur は自動的に折れ線グラフのスケールを統一し、多重折れ線グラフを作成します。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/bind-vertex-densified.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}
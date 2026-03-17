---
title: "データを視覚的プロパティにバインドする"
title_en: "Bind Data to Visual Property"
description: ""
date: 2020-08-27T19:23:18+02:00
lastmod: 2020-08-27T19:23:18+02:00
draft: false
images: []
menu:
  tutorials:
    parent: "encode"
weight: 105
toc: false
---

<div data-i18n-ja>

デフォルトでは、オブジェクト（つまり、図形やコレクション）は、一般的なベクターエディタで見られるものとまったく同じように動作します。移動させたり、サイズや色を変更したり、「削除」ボタンを押して削除したりできます。データビジュアライゼーションを作成するために、オブジェクトの視覚的プロパティを手動で変更することもできます。しかし、このプロセスは手間がかかり、エラーが発生しやすいものです。Data Illustrator は、図形、頂点、セグメント、およびコレクションの視覚的プロパティにデータをバインドするための自動サポートを提供します。

データバインディングを実行するには、まず[繰り返し (repeat)](../../generate/repeat)、[分割 (divide)](../../generate/divide)、または[高密度化 (densify)](../../generate/densify)操作を通じて、データをオブジェクトにアタッチする必要があります。図形またはコレクションが選択されている状態で、プロパティインスペクタにその視覚的プロパティが表示されます。プロパティをデータにバインドできる場合は、プロパティコントロールの横にバインディングボタン <img width="16px" src="../DI_Bind.png"> が表示されます。バインディングボタンをクリックすると、そのプロパティにバインドできるすべての適用可能な変数（列名）のドロップダウンメニューが表示されます。

{{< figure src="../PropertyInspector.png" width="600px" alt="divide by data" caption="" class="border-0 mx-auto text-center" >}}

以下の例では、長方形のコレクションを作成し、変数「count」を長方形の幅にバインドします。バインディングは、そのプロパティに対する制約と考えることができます。バインディングが作成されると、そのプロパティを操作したり変更したりすることはできなくなります。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/bind.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

バインディング後、「幅」のプロパティコントロールは、バインドされた変数を表示するように更新され、バインディングボタンは「バインディングの解除」ボタン <img width="16px" src="../DI_Unbind.png"> に置き換わります。このボタンをクリックするとバインディングが解除され、長方形の幅に対する制約が取り除かれます。これで、長方形の幅を自由に変更できるようになります。

</div>

<div data-i18n-en>

By default, objects (i.e. shapes and collections) behave exactly like those found in a typical vector editor. You can move them around, change their size and color, or delete them by pressing the "delete" button. To create data visualizations, we can manually alter the visual properties of objects. But this process is laborious and error-prone. Data Illustrateur provides automated support for binding data to visual properties of shapes, vertices, segments and collections.

To perform data binding, you need to first attach data to an object through the [repeat](../../generate/repeat), [divide](../../generate/divide), or [densify](../../generate/densify) operations. With a shape or a collection selected, the Property Inspector will display its visual properties. If a property can be bound to data, a binding button <img width="16px" src="../DI_Bind.png"> will appear next to the property control. Clicking on the binding button shows a drop-down menu of all the applicable variables (column names) that can be bound to the property. 

{{< figure src="../PropertyInspector.png" width="600px" alt="divide by data" caption="" class="border-0 mx-auto text-center" >}}

In the example below, we create a collection of rectangles, and then bind the variable "count" to the width of the rectangles. You can consider binding as a constraint on that property. Once the binding is created, you can no longer manipulate or change that property.

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/bind.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

After binding, the property control for "width" updates to show the binding variable, and the binding button is replaced by a "remove binding" button <img width="16px" src="../DI_Unbind.png">. Clicking on this button will remove the binding, and the constraint on rectangle width will be removed. Now you can freely change the width of the recangles.

</div>

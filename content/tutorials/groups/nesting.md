---
title: "ネスト (Nesting)"
description: ""
date: 2020-08-27T19:23:18+02:00
lastmod: 2020-08-27T19:23:18+02:00
draft: false
images: []
menu:
  tutorials:
    parent: "groups"
weight: 100
toc: false
---
コレクションはネスト（入れ子）することができます。つまり、コレクションの子要素は図形である必要はなく、コレクションにすることもできます。ネストされたコレクションを作成するには、コレクションに対して[繰り返し (repeat)](../../generate/repeat) 操作を適用するか、コレクション内の図形に対して[分割 (divide)](../../generate/divide) 操作を適用します。

### コレクションの繰り返し (Repeat a Collection)
この例では、まず円を分割して円グラフのコレクションを作成します。次に、その円グラフのコレクションを繰り返して、ネストされたコレクションを形成できます。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/divide-repeat.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}

### コレクション内の図形の分割 (Divide Shapes in a Collection)
この例では、まず繰り返しを使用して長方形のコレクションを作成します。次に、コレクション内の長方形を分割して、ネストされたコレクションを形成できます。

{{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/repeat-divide.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}}
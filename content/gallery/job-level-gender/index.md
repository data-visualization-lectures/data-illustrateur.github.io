---
title: "職務レベル別の女性の割合"
description: "職務レベルが上がるにつれて、女性の割合は低下します。"
excerpt: "米国の企業において職務レベルが上がるにつれて、女性の割合は低下します。"
date: 2020-11-04T09:19:42+01:00
lastmod: 2020-11-04T09:19:42+01:00
draft: false
weight: 50
images: [figure.png]
categories: ["News"]
tags: ["security", "performance", "SEO"]
contributors: ["Henk Verlinde"]
pinned: false
homepage: false
dataset: "gender-job-level"
msc: "MosaicPlot"
chartType: "Marimekko Chart / Mosaic Plot"
---
このモザイクプロットは、2016年の調査に基づき、米国の企業において職務レベルが上がるにつれて女性の割合が低下することを示しています。Emma Whyteによる[元の視覚化](http://www.womanindata.co.uk/2017/02/workout-wednesday-week-8-marimekko.html)。

まず、長方形を描き、「Job Type」で分割し、結果の任意の長方形を選択して「Gender」で再度分割します。

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/mosaic-1.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

{{<demo-video>}}LDTxqVUwrfc{{</demo-video>}}

次に、結果の長方形マークを選択した状態で、その幅を「Percent Total」に、高さを「Percent Gender」にバインドし、軸ハンドルをドラッグしてスケールの範囲をカスタマイズします。

{{<demo-video>}}MfMG9jKI0G0{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/mosaic-2.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

次に、幅の軸を選択して向きを変更し、職務タイプ（job type）の軸と重ならないように上部に表示させます。また、タイトルの削除や職務タイプ軸のラベルの回転など、追加の軸のカスタマイズを行います。

{{<demo-video>}}4hvR_8dYiZc{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/mosaic-3.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

最後に、任意の長方形を選択し、その塗りつぶし色を「Gender」にバインドします。カラーマッピングをカスタマイズし、境界をより明確に示すために長方形の境界線の色を白に変更できます。

{{<demo-video>}}s_1mPeY8PGM{{</demo-video>}}

<!-- {{< rawhtml >}} 
<video width=700px class="tutorial-video" controls>
    <source src="/videos/gallery/mosaic-4.mov" type="video/mp4">
    Your browser does not support the video tag.  
</video>
{{< /rawhtml >}} -->

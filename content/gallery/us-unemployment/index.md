---
title: "米国の失業率 1980 - 2015"
description: "1980年から2015年までの各米国の州の失業率（5年ごと）。"
excerpt: "1980年から2015年までの各米国の州の失業率（5年ごと）。"
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
dataset: "us_state_unemployment_final"
msc: "MultipleBarCharts"
chartType: "Small Multiples: Bar Chart"
---
この視覚化は、1980年から2015年までの各米国の州の失業率が5年ごとにどのように変化したかを示しています。バーの高さは、全国平均からの失業率の差を表しています。データソース: [連邦準備銀行](https://fred.stlouisfed.org/release?rid=112)。

まず、長方形を描き、「State」で繰り返し、結果の任意の長方形を選択して、そのX位置とY位置をそれぞれ「MapX」と「MapY」にバインドします。軸を再スケーリングして、長方形を展開します。

{{<demo-video>}}XMEvPgMVWYs{{</demo-video>}}

次に、任意の長方形を選択し、「Year」で分割します。これにより、個々の州の年を表す長方形のコレクションの束が得られます。その後、任意のコレクション内の任意の長方形を選択し、その高さを「Unemployment」に、塗りつぶし色を「US Avg」にバインドし、線の色（stroke color）を白に変更します。次に、「Above Average（平均以上）」が赤、「Below Average（平均以下）」が緑になるようにカラーマッピングをカスタマイズします。必要に応じて高さの軸を調整することもできます。

{{<demo-video>}}MtY1PEPK8UI{{</demo-video>}}

次に、テキストツールを使用してテキストアイテムを作成し、「State」で繰り返します。長方形に対して行ったのと同様に、テキストのX位置を「MapX」に、Y位置を「MapY」にバインドします。「MapX」については、長方形のコレクションと同じ軸を使用したいので、バインド時に「Merge with MapX（MapXとマージ）」オプションを選択します。「MapY」については、テキストが長方形と重ならないようにするため、代わりに「Create new scale（新しいスケールを作成）」オプションを選択します。

{{<demo-video>}}I4Q8YgJeXN8{{</demo-video>}}

最後に、軸ハンドルをドラッグして、テキストと長方形の間隔を調整します。実際の州名を使用するには、テキストアイテムのいずれかを選択し、その内容を「State」にバインドします。

{{<demo-video>}}gp-TEBZ4ptU{{</demo-video>}}

# simpleSuggest

## usage

```html
<!DOCTYPE html>
<html>
<head>
  <script src="simpleSuggest.js"></script>
  <script>
    window.addEventListener('load', function(){
      var suggest = new simpleSuggest;
      var list = ['JavaScript','JSON','Japan'];
      Array.prototype.forEach.call(document.getElementsByClassName('simpleSuggest'), function(x){
        suggest.addSuggest(x,list);
      });
    });
    suggest.addRemoveSuggest();
  </script>
  <link rel="stylesheet" href="simpleSuggest.css" type="text/css">
</head>
<body>
  <input class="simpleSuggest">
  <input class="simpleSuggest">
  <input class="simpleSuggest">
</body>
</html>
```

1. simpleSuggest.jsおよびsimpleSuggest.cssを読み込ませます。
2. 補完したい文字列を格納した配列を定義します。
3. `new simpleSuggest`します。
4. `addSuggest(inputElement, stringList)`でinputElementにsuggestイベントが追加されます。
5. 3でnewしたオブジェクトで`addRemoveSuggest()`を呼び出します。

# caution

エラーを返す処理などはまだ定義していません。

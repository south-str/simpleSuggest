# simpleSuggest

## usage

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="../json/equipment.js"></script>
    <script src="simpleSuggest.js"></script>
    <script>
window.addEventListener('load', function(){
  var suggest = new simpleSuggest;
  var list = ['JavaScript','JSON','Japan'];
  Array.prototype.forEach.call(document.getElementsByClassName('simpleSuggest'), function(x){
    suggest.addSuggest(x,eq);
  });
});
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

1. simpleSuggest.js$B$*$h$S(BsimpleSuggest.css$B$rFI$_9~$^$;$^$9!#(B
2. $BJd40$7$?$$J8;zNs$r3JG<$7$?G[Ns$rDj5A$7$^$9!#(B
3. new simpleSuggest$B$7$^$9!#(B
4. addSuggest(inputElement, stringList)$B$G(BinputElement$B$K(Bsuggest$B%$%Y%s%H$,DI2C$5$l$^$9!#(B

# caution

$B%(%i!<$rJV$9=hM}$J$I$O$^$@Dj5A$7$F$$$^$;$s!#(B

(function(){
  "use strict";

  //Module
  function simpleSuggest(){
  }

  //Header
  simpleSuggest["prototype"]["addSuggest"] = addSuggest;
  simpleSuggest["prototype"]["addRemoveSuggest"] = addRemoveSuggest;

  //Implementation
  function addSuggest(inputElement, list) {
    //window.addEventListener('load', function(){
      inputElement.addEventListener('input', function(){
        var suggestDiv = document.getElementById('suggest');
        var searchedList = searchList(inputElement.value, list);
        if(suggestDiv !== null) suggestDiv.parentNode.removeChild(suggestDiv);
        if(inputElement.value !== ''){
          if(searchedList.length !== 0){
            var suggest = createSuggest(inputElement, searchedList);
            inputElement.parentNode.appendChild(suggest);
            setSuggestStyle(suggest, inputElement);
          }
        }
      }, false);  //addEvent input

      inputElement.addEventListener('keydown', function(e){
        var suggestDiv = document.getElementById('suggest');
        if(suggestDiv === null && inputElement.value !== ''){
          var searchedList = searchList(inputElement.value, list);
          var suggest = createSuggest(inputElement, searchedList);
          inputElement.parentNode.appendChild(suggest);
          setSuggestStyle(suggest, inputElement);
        }else if(suggestDiv !== null){
          var suggestListElements = suggestDiv.firstChild.childNodes;
          var activeElement = document.activeElement;
          var activeElementsList = Array.prototype.filter.call(suggestListElements, function(elem){
            return activeElement === elem;
          });
          if(activeElementsList.length === 0 && suggestDiv !== null){
            if(e.keyIdentifier === 'Down'){
              suggestDiv.firstChild.firstChild.focus();
              e.preventDefault();
            }
            if(e.keyIdentifier === 'Up'){
              suggestDiv.firstChild.lastChild.focus();
              e.preventDefault();
            }
          }
        }
        if(e.keyIdentifier === 'U+001B' /*Esc*/){
          if(suggestDiv !== null) inputElement.parentNode.removeChild(suggestDiv);
        }
      }, false); //addEvent keydown

      //}); //addEvent load
  }

  function addRemoveSuggest(){
    document.addEventListener('click', function(e){
      var suggestDiv = document.getElementById('suggest');
      if(suggestDiv !== null){
        var isSuggestDiv = (e.target === suggestDiv) ? true : false;
        var isSuggestList = isTargetSuggestList(e.target, suggestDiv);
        var isSuggestListElement = isTargetSuggestListElements(e.target, suggestDiv);
        if(!isSuggestDiv && !isSuggestList && !isSuggestListElement){
          suggestDiv.parentNode.removeChild(suggestDiv);
        }
      }
    }, false); //addEvent click
  }

  //Helper
  //@inputElement input DOM element
  //@list string list for suggest
  function createSuggest(inputElement, list) {
    var suggestDiv = document.createElement('div');
    var suggestList = document.createElement('ul');
    suggestDiv.setAttribute('id', 'suggest');
    suggestList.setAttribute('id', 'suggestList');
    list.forEach(function(elem){
      var suggestListElements = document.createElement('li');
      suggestListElements.setAttribute('class', 'suggestListElements');
      suggestListElements.setAttribute('tabindex', 0);
      suggestListElements.innerHTML = elem;
      suggestListElements.addEventListener('click', function(){
        inputElement.value = suggestListElements.innerHTML;
        inputElement.focus();
        inputElement.parentNode.removeChild(suggestDiv);
      }, false);
      suggestListElements.addEventListener('keydown', function(e){
        var activeElement = document.activeElement;
        if(e.keyIdentifier == 'Down'){
          Array.prototype.forEach.call(suggestList.childNodes, function(elem, index, array){
            if(elem === activeElement){
              if(index === array.length - 1){
                array[0].focus();
              }else{
                array[index + 1].focus();
              }
            }
          });
          e.preventDefault();
        }
        if(e.keyIdentifier === 'Up'){
          Array.prototype.forEach.call(suggestList.childNodes, function(elem, index, array){
            if(elem === activeElement){
              if(index === 0){
                array[array.length - 1].focus();
              }else{
                array[index - 1].focus();
              }
            }
          });
          e.preventDefault();
        }
        if(e.keyIdentifier === 'U+001B' /*Esc*/){
          inputElement.parentNode.removeChild(suggestDiv);
          inputElement.focus();
          e.preventDefault();
        }
        if(e.keyIdentifier === 'Enter'){
          inputElement.value = suggestListElements.innerHTML;
          inputElement.focus();
          inputElement.parentNode.removeChild(suggestDiv);
          e.preventDefault();
        }
      }, false); //addEvent keydown
      suggestList.appendChild(suggestListElements);
    }); //list.forEach
    suggestDiv.appendChild(suggestList);
    return suggestDiv;
  }

  //@suggestDiv suggest DOM element
  function setSuggestStyle(suggestDiv, inputElement){
    if(suggestDiv.firstChild.hasChildNodes()){
      var inputRect = inputElement.getBoundingClientRect()
        , showResults = 6
        , results = suggestDiv.firstChild.childNodes.length
        , suggestListElementsHeight = suggestDiv.firstChild.firstChild.getBoundingClientRect().height
        , suggestDivHeight = (results > showResults)
        ? (suggestListElementsHeight * showResults)
        : (suggestListElementsHeight * results);
      //suggestDivのスタイルを定義する
      suggestDiv.style.height = suggestDivHeight + 'px';
      suggestDiv.style.left = inputRect.left + window.pageXOffset + 'px';
      if(results > showResults){
        var test = document.createElement('div')
          , scrollbarWidth = 0;
        test.style.bottom = '100%';
        test.style.height = '1px';
        test.style.position = 'absolute';
        test.style.width = 'calc(100vw - 100%)';
        document.body.appendChild(test);
        scrollbarWidth = + window.getComputedStyle(test, null).getPropertyValue('width').match(/[0-9]*/g).reduce(function(x,y){return x+y;});
        document.body.removeChild(test);
        suggestDiv.style.width = suggestDiv.firstChild.firstChild.getBoundingClientRect().width + scrollbarWidth + 'px';
        //console.log(suggestDiv.style.width, suggestDiv.firstChild.firstChild.getBoundingClientRect().width,scrollbarWidth );
      }
      if(window.innerHeight < suggestDivHeight + inputRect.bottom){
        suggestDiv.style.top = inputRect.top + window.pageYOffset - suggestDivHeight + 'px';
      }else{
        suggestDiv.style.top = inputRect.bottom + window.pageYOffset + 'px';
      }
      //suggestListのスタイルを定義する
      //suggestListElementsのスタイルを定義する
    }
  }

  //@str input string
  //@list string list for suggest
  function searchList(str, list){
    var escapeReg = /\\|\^|\$|\*|\+|\?|\.|\(|\)|\{|\}|\[|\]/ig;
    var escapedStr = str.replace(escapeReg, '\\$&');
    var listReg = new RegExp(escapedStr, 'i');
    return list.filter(function(x){
      return listReg.test(x);
    });
  }

  function isTargetSuggestList(target, suggestDiv){
    if(suggestDiv.hasChildNodes){
      if(target === suggestDiv.firstChild){
        return true;
      }
    }
    return false;
  }

  function isTargetSuggestListElements(target, suggestDiv){
    if(suggestDiv.hasChildNodes){
      if(suggestDiv.firstChild.hasChildNodes){
        var suggestListElementsTargetList = Array.prototype.filter.call(suggestDiv.firstChild.childNodes, function(elem){
          return (target === elem);
        });
        if(suggestListElementsTargetList.length !== 0){
          return true;
        }
      }
    }
    return false;
  }

  //Export
  window["simpleSuggest"] = simpleSuggest;
})();

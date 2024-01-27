const changeColorBtn = document.getElementById('color-btn');
let color = '#FF5511'

document.body.addEventListener('click', function (e){
  if(e.target.parentElement.id === 'board') {
    e.target.style.backgroundColor = color;

    let arr = Array.from(e.target.parentElement.children);
    let targ = arr.indexOf(e.target);
    let row = Math.floor(targ / 3);
    let grid = targ % 3;
    e.target.textContent = `${row} - ${grid}`;  
  }

});
changeColorBtn.addEventListener('click', function(e){
  const inputColor = changeColorBtn.parentElement.children[1];
  color = inputColor.value;

});

/**
 * Uzupełnij kod obu funkcji obługi zdarzeń w taki sposób aby:
 * - kliknięcie w dowolny element div leżący w div z klasą "board" zmieniało kolor tła na ten pobrany ze zmiennej 'color' oraz umieszczało wewnątrz
 *   współrzedne klikniętego wg wzoru
 *   0,0    0,1     0,2
 *   1,0    1,1     1,2
 *   2,0    2,1     2,2
 * - kliknięcie na przycisk w elemencie `article`  powinno pobrać do zmiennek 'color' wartość z elementu 'input'
 * - kliknięcie w dowolne inne  miejsce elementu 'body' nie powinno nic zmieniać
 * Uwaga!
 * nie można zmieniać pliku board.html
 */
/**
    Zaprojektuj formularz tworzenia pytania testowego
    - pole treści pytania jest wymagane
    - pole tytułu pytania jest wymagane
    - pole typu pytania (select)
        1 pojedynczy wybór (wiele opcji, jedna poprawna)
        2 wielokrotny wybór (wiele opcji, co najmniej jedna poprawna)
        3 otwarta odpowiedź ()
        4 dobór par ()
     W zależności od wyboru pola wyboru typu pytania zmienia się wygląd formularza poniżej:
        1 - dwa pola typu radio i przycisk `Dodaj opcję`, każda opcja ma przycisk `Usuń`
        2 - dwa pola typu checkbox i przycisk `Dodaj opcję`, każda opcja ma przycisk `Usuń`
        3 - pole tekstowe typu text area, przycisk `Dodaj odpowiedź`
        4 - dwie pary pól tesktowych, przycisk `Dodaj parę`, każda para ma przycisk `Usuń`
    Poprawne odpowiedź należy wyróżnić np. zielonym kolorem
    Zdefiniuj funkcję walidującą każdego typu pytania, która blokuje wysłanie żądania:
    1 - musi być wybrany jeden przycisk typu radio
    2 - choć jeden checkbox musi być zaznaczony
    3 - musi wystąpić choć jedna odpowiedź niepusta
    4 - muszą wystąpić co najmniej dwie pary 
 */

const form = document.getElementsByTagName('form')[0];
console.log(form);